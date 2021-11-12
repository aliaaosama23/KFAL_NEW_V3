import { Component } from '@angular/core';
import { IonicPage, NavController, Platform,NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ClientProvider } from '../../providers/client/client';
@IonicPage()
@Component({
  selector: 'page-client-orders',
  templateUrl: 'client-orders.html',
})
export class ClientOrdersPage {
  orderType:string="new"
  date:any
  day:any
  month:any
  year:any
  time1:any
  time2:any
  OrderCode:any
  requests:any[]=[]
  new_requests:any[]=[]
  current_requests:any[]=[]
  received_requests:any[]=[]
  dir:boolean
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,
     private storage: Storage, public user:ClientProvider, public viewCtrl:ViewController,
     private translate: TranslateService,public platform:Platform,
    public navCtrl: NavController, public navParams: NavParams) {
       this.dir=this.platform.isRTL
      // call api to get all types od requests (new ,current,received)
      this.storage.get('Trans_user_id').then(val=>{
        if(val){
          let loading=this.loadingCtrl.create({})
          loading.present()
         this.user.GetAllRequestsByUserId(val).subscribe(
          (res:any)=>{
            if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
              loading.dismiss()
            }else{
              loading.dismiss()
              for(let i=0;i< res.length;i++)
              {
                  res[i].date=" "
                  res[i].month=""
                  res[i].day=""
                  res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                  res[i].month=res[i].date.split(' ')[0]
                  res[i].day=res[i].date.split(' ')[1]
                  res[i].Request_Orginal_File=  (res[i].Request_Orginal_File) //.substr(8)
              }

                // new:pending translator and admin to approve
                this.new_requests=[]
                res.forEach(elem=>{
                    if(elem.FK_Request_Status_ID==1 || elem.FK_Request_Status_ID==2 || elem.FK_Request_Status_ID==3  ){
                      this.new_requests.push(elem)
                      this.new_requests.reverse()
                    }
                  })
                  this.current_requests=[]
                // current: approved a translator take it to his own current requests
                res.forEach(elem=>{
                  if(elem.FK_Request_Status_ID==5 || elem.FK_Request_Status_ID==6){
                    this.current_requests.push(elem)
                    this.current_requests.reverse()
                  }
                })
                this.received_requests=[]
                //received: Proofreader forward this request to the client
                res.forEach(elem=>{
                  if(elem.FK_Request_Status_ID==8 || elem.FK_Request_Status_ID==13){
                    this.received_requests.push(elem)
                    this.received_requests.reverse()
                  }
                })
            }

          },(err)=>{
            loading.dismiss()
          })

        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientOrdersPage');
  }

  ionViewDidEnter(){
          // call api to get all types od requests (new ,current,received)
          this.storage.get('Trans_user_id').then(val=>{
            if(val){

             this.user.GetAllRequestsByUserId(val).subscribe(
              (res:any)=>{
                if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
                }else{
                  for(let i=0;i< res.length;i++)
                  {
                      res[i].date=" "
                      res[i].month=""
                      res[i].day=""
                      res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                      res[i].month=res[i].date.split(' ')[0]
                      res[i].day=res[i].date.split(' ')[1]
                      res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)//.substr(8)
                  }

                    // new:pending translator and admin to approve
                    this.new_requests=[]
                    res.forEach(elem=>{
                        if(elem.FK_Request_Status_ID==1 || elem.FK_Request_Status_ID==2 || elem.FK_Request_Status_ID==3  ){
                          this.new_requests.push(elem)
                          this.new_requests.reverse()
                        }
                      })
                      this.current_requests=[]
                    // current: approved a translator take it to his own current requests
                    res.forEach(elem=>{
                      if(elem.FK_Request_Status_ID==5 || elem.FK_Request_Status_ID==6){
                        this.current_requests.push(elem)
                        this.current_requests.reverse()
                      }
                    })
                    this.received_requests=[]
                    //received: Proofreader forward this request to the client
                    res.forEach(elem=>{
                      if(elem.FK_Request_Status_ID==8 || elem.FK_Request_Status_ID==13){
                        this.received_requests.push(elem)
                        this.received_requests.reverse()
                      }
                    })
                }

              },(err)=>{
              })

            }
          })
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  OrderDetails( request_id,request_type){
    // call api tp get order details
    this.navCtrl.push('ClientOrderDetailsPage',{'request_id':request_id,'request_type':request_type})
  }


  addOrder(){
    this.navCtrl.push('MainpagePage')
  }

  doRefresh(refresher)
  {
        // call api to get all types od requests (new ,current,received)
        this.storage.get('Trans_user_id').then(val=>{
          if(val){

           this.user.GetAllRequestsByUserId(val).subscribe(
            (res:any)=>{
              if(res=="لا توجد طلبات متاحة متاحة فى هذا التوقيت"){
                refresher.complete()
              }else{
                refresher.complete()
                for(let i=0;i< res.length;i++)
                {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    res[i].Request_Orginal_File=  (res[i].Request_Orginal_File)//.substr(8)
                }

                  // new:pending translator and admin to approve
                  this.new_requests=[]
                  res.forEach(elem=>{
                      if(elem.FK_Request_Status_ID==1 || elem.FK_Request_Status_ID==2 || elem.FK_Request_Status_ID==3  ){
                        this.new_requests.push(elem)
                        this.new_requests.reverse()
                      }
                    })
                    this.current_requests=[]
                  // current: approved a translator take it to his own current requests
                  res.forEach(elem=>{
                    if(elem.FK_Request_Status_ID==5 || elem.FK_Request_Status_ID==6){
                      this.current_requests.push(elem)
                      this.current_requests.reverse()
                    }
                  })
                  this.received_requests=[]
                  //received: Proofreader forward this request to the client
                  res.forEach(elem=>{
                    if(elem.FK_Request_Status_ID==8 || elem.FK_Request_Status_ID==13){
                      this.received_requests.push(elem)
                      this.received_requests.reverse()
                    }
                  })
              }

            },(err)=>{
              refresher.complete()
            })

          }
        })
}
}
