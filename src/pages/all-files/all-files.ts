import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ClientProvider } from '../../providers/client/client';
import { ProvidersProvider } from '../../providers/providers/providers';
import { AdminProvider } from '../../providers/admin/admin';

@IonicPage()
@Component({
  selector: 'page-all-files',
  templateUrl: 'all-files.html',
})
export class AllFilesPage {
  date:any
  day:any
  month:any
  year:any
  time1:any
  time2:any
  OrderCode:any
  myInput:any
  shouldShowCancel:boolean=false
  allOrders:any[]=[]
  nodata:string=""
  dir:boolean
  constructor(public admin:AdminProvider, public toastCtrl:ToastController, public loadingCtrl:LoadingController,public provider:ProvidersProvider,
     public translate: TranslateService,public viewCtrl:ViewController, public user:ClientProvider,

    public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public platform:Platform) {
    this.dir=this.platform.isRTL
      this.storage.get('Trans_user_type').then((trans_val:any)=>{
        if(trans_val	==1){
          this.storage.get('Trans_user_id').then(val=>{
            if(val){
              let loading=this.loadingCtrl.create({
                content:"waiting ..."
              })
              loading.present()
             this.user.GetAllRequestsByUserId(val).subscribe(
              (res:any)=>{
                loading.dismiss()
                if(typeof(res)=='string'){
                  this.nodata=res
                }else{
                  for(let i=0;i< res.length;i++)
                  {
                      res[i].date=" "
                      res[i].month=""
                      res[i].day=""
                      res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                      res[i].month=res[i].date.split(' ')[0]
                      res[i].day=res[i].date.split(' ')[1]
                      res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)
                  }
                   this.allOrders=res
                }
              },(err)=>{
                loading.dismiss()
              })
            }
          })
        }
        if(trans_val==2){
          this.storage.get('Trans_user_id').then(val=>{
            if(val){
              let loading=this.loadingCtrl.create({
                content:"waiting ..."
              })
              loading.present()
             this.admin.ShowAllRequestsForAdmin ().subscribe(
              (res:any)=>{
                loading.dismiss()
                if(typeof(res)=='string'){
                  this.nodata=res
                }else{

                  for(let i=0;i< res.length;i++)
                  {

                      res[i].date=" "
                      res[i].month=""
                      res[i].day=""
                      res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                      res[i].month=res[i].date.split(' ')[0]
                      res[i].day=res[i].date.split(' ')[1]
                      res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)
                  }
                   this.allOrders=res
                }
              },(err)=>{
                loading.dismiss()
              })
            }
          })
        }
        if(trans_val==3){
          console.log( "type  :"+ trans_val)
          this.storage.get('Trans_user_id').then((val)=>{
            this.provider.AllcurrentRequests(val).subscribe(
              (res:any)=>{

               // if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت")){
                  if(typeof(res)=='string'){
                    console.log("res is string")
                    this.allOrders=[]
                    this.nodata=res
                  }else{
                      console.log("res is not string")
                      for(let i=0;i< res.length;i++)
                      {
                        res[i].date=" "
                        res[i].month=""
                        res[i].day=""
                        res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                        res[i].month=res[i].date.split(' ')[0]
                        res[i].day=res[i].date.split(' ')[1]
                        res[i].Request_Orginal_File=(res[i].Request_Orginal_File)
                      }
                      this.allOrders=res
                  }
                }  )
             // })
          })
        }
        if(trans_val==4){
          let loading=this.loadingCtrl.create({
            content:"waiting ..."
          })
          loading.present()
          this.storage.get('Trans_user_id').then((val:any)=>{
            this.provider.GetAllRequestsByReviewerID(val).subscribe((res2:any)=>{
              loading.dismiss()
          //  if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
                if(typeof(res2)=='string'){
                  this.allOrders=[]
                  this.nodata=res2
                }else{
                  for(let i=0;i< res2.length;i++)
                    {
                      res2[i].date=" "
                      res2[i].month=""
                      res2[i].day=""
                      res2[i].date= moment(res2[i].FK_User_ID).format('ll').split(',')[0]
                      res2[i].month=res2[i].date.split(' ')[0]
                      res2[i].day=res2[i].date.split(' ')[1]
                      res2[i].Request_Orginal_File=  (res2[i].Request_Orginal_File)
                    }
                    this.allOrders=res2
                  this.allOrders=res2
                }
            //  }
            },(err:any)=>{
              loading.dismiss()
            })
          })
        }

      })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllFilesPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  OrderDetails( request_id,request_type){
    // call api tp get order details
    this.storage.get('Trans_user_type').then((val:any)=>{


      if(val==1){
        this.navCtrl.push('ClientOrderDetailsPage',{'request_id':request_id,'request_type':request_type})
      }

      else if(val==2){
        this.navCtrl.push('AdminOrderDetailsPage',{'Request_ID':request_id,'Request_type':request_type})
      }

      else if(val==3){
        this.navCtrl.push('TranslatorOrderDetailsPage',{'Request_ID':request_id,'Request_type':request_type,'providerType':'transator'})
      }

      else if(val==4){
        this.navCtrl.push('TranslatorOrderDetailsPage',{'Request_ID':request_id,'Request_type':request_type,'providerType':'Proofreader'})
      }


    })
  }

  onInput(ev){
   console.log(ev)
      let val = ev.target.value;
      if (val && val.trim() != '') {
        // //  console.log("get item value..."+val)
      this.allOrders = this.allOrders.filter((item) => {
        //  //  console.log("filtered items..."+JSON.stringify(item))
        return (item.Request_Orginal_File.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onCancel($event){

    this.storage.get('Trans_user_type').then((val:any)=>{
      if(val==1){
        this.storage.get('Trans_user_id').then(val=>{
          if(val){
            let loading=this.loadingCtrl.create({
              content:"waiting ..."
            })
            loading.present()
           this.user.GetAllRequestsByUserId(val).subscribe(
            (res:any)=>{
              if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
                this.nodata=res
              }else{
                loading.dismiss()
                for(let i=0;i< res.length;i++)
                {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)
                }
                 this.allOrders=res
              }
            },(err)=>{
              loading.dismiss()
            })
          }
        })
      }
      if(val==2){
        this.storage.get('Trans_user_id').then(val=>{
          if(val){
            let loading=this.loadingCtrl.create({
              content:"waiting ..."
            })
            loading.present()
           this.user.GetAllRequestsByUserId(val).subscribe(
            (res:any)=>{
              if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
                this.nodata=res
              }else{
                loading.dismiss()
                for(let i=0;i< res.length;i++)
                {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)
                }
                 this.allOrders=res
              }
            },(err)=>{
              loading.dismiss()
            })
          }
        })
      }
      if(val==3){
        this.storage.get('Trans_user_id').then((val)=>{
          this.provider.AllcurrentRequests(val).subscribe(
            (res:any)=>{
              if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت" || res=="لا توجد طلبات متاحة فى هذا التوقيت")){
                if(typeof(res)=='string'){
                  this.allOrders=[]
                  this.nodata=res
                }else{
                  for(let i=0;i< res.length;i++)
                  {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)
                  }
                  this.allOrders=res
                }
              }
            })
        })
      }
      if(val==4){
        let loading=this.loadingCtrl.create({
          content:"waiting ..."
        })
        loading.present()
        this.storage.get('Trans_user_id').then((val:any)=>{
          this.provider.GetAllRequestsByReviewerID(val).subscribe((res2:any)=>{
            loading.dismiss()
            if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
              if(typeof(res2)=='string'){
                this.allOrders=[]
                this.nodata=res2
              }else{
                for(let i=0;i< res2.length;i++)
                  {
                    res2[i].date=" "
                    res2[i].month=""
                    res2[i].day=""
                    res2[i].date= moment(res2[i].FK_User_ID).format('ll').split(',')[0]
                    res2[i].month=res2[i].date.split(' ')[0]
                    res2[i].day=res2[i].date.split(' ')[1]
                    res2[i].Request_Orginal_File=  (res2[i].Request_Orginal_File)
                  }
                  this.allOrders=res2
                this.allOrders=res2
              }
            }
          },(err:any)=>{
            loading.dismiss()
          })
        })
      }

    })
  }

  doRefresh(refresher){

   this.storage.get("Trans_user_type").then((trans_val:any)=>{
      if(trans_val==1){
        this.storage.get('Trans_user_id').then(val=>{
          if(val){

           this.user.GetAllRequestsByUserId(val).subscribe(
            (res:any)=>{
              refresher.complete()
              if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
                this.nodata=res
              }else{
                for(let i=0;i< res.length;i++)
                {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)
                }
                 this.allOrders=res
              }
            },(err)=>{
              refresher.complete()
            })
          }
        })
      }
      if(trans_val==2){
        this.storage.get('Trans_user_id').then(val=>{
          if(val){
           this.user.GetAllRequestsByUserId(val).subscribe(
            (res:any)=>{
              refresher.complete()

              if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
                this.nodata=res
              }else{
                for(let i=0;i< res.length;i++)
                {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File).substr(8)
                }
                 this.allOrders=res
              }
            },(err)=>{
              refresher.complete()
            })
          }
        })
      }
      if(trans_val==3){
        this.storage.get('Trans_user_id').then((val)=>{
          this.provider.AllcurrentRequests(val).subscribe(
            (res:any)=>{
              refresher.complete()
              //  "لا توجد طلبات لديك فى هذاالتوقيت"
              if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت" || res=="لا توجد طلبات متاحة فى هذا التوقيت")){
                if(typeof(res)=='string'){
                  this.allOrders=[]
                  this.nodata=res
                  console.log(this.nodata)
                }else{

                  for(let i=0;i< res.length;i++)
                  {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].FK_User_ID).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File).substr(8)
                  }
                  this.allOrders=res
                }
              }
            },(err=>{
              refresher.complete()
            }))
        })
      }
      if(trans_val==4){

        this.storage.get('Trans_user_id').then((val:any)=>{
          this.provider.GetAllRequestsByReviewerID(val).subscribe((res2:any)=>{
            refresher.complete()
            if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
              if(typeof(res2)=='string'){
                this.allOrders=[]
                this.nodata=res2
              }else{
                for(let i=0;i< res2.length;i++)
                  {
                    res2[i].date=" "
                    res2[i].month=""
                    res2[i].day=""
                    res2[i].date= moment(res2[i].FK_User_ID).format('ll').split(',')[0]
                    res2[i].month=res2[i].date.split(' ')[0]
                    res2[i].day=res2[i].date.split(' ')[1]
                    res2[i].Request_Orginal_File=  (res2[i].Request_Orginal_File).substr(8)
                  }
                  this.allOrders=res2
                this.allOrders=res2
              }
            }
          },(err:any)=>{
            refresher.complete()
          })
        })
      }

    })
  }
}
