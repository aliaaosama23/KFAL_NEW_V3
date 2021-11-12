import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ClientProvider } from '../../providers/client/client';
import { AdminProvider } from '../../providers/admin/admin';
import { HelperProvider } from '../../providers/helper/helper';
@IonicPage()
@Component({
  selector: 'page-complaints',
  templateUrl: 'complaints.html',
})
export class ComplaintsPage {
  complaintMessage:string=""
  admin:boolean=false
  allcomplains:any[]=[]
  clientname:any
  dir:boolean
  constructor(public toastCtrl:ToastController, public user:ClientProvider,public admin1:AdminProvider,
              private storage: Storage, private translate: TranslateService,private helper:HelperProvider,
              public viewCtrl:ViewController, public navCtrl: NavController,
               public navParams: NavParams,public platform:Platform) {
    this.dir=this.platform.isRTL

    this.helper.getAdminObservable().subscribe((val)=>{
      console.log('current profile is admin '+val);
      if(val){
        this.admin=true
        this.admin1.GetAllCompalinsForAdmin()
        .subscribe(
          (res:any)=>{
            this.allcomplains=[]
             if(typeof(res)!='string'){
                for(let i=0;i< res.length;i++)
                {
                    res[i].date=" "
                    res[i].month=""
                    res[i].day=""
                    res[i].UserName=""
                    res[i].date= moment(res[i].Date).format('ll').split(',')[0]
                    res[i].month=res[i].date.split(' ')[0]
                    res[i].day=res[i].date.split(' ')[1]
                    // this.user.GetUserDataByUserID(res[i].FK_UserID).subscribe(
                    // (userData:any)=>{
                    //   res[i].UserName=userData[0].User_Full_Name
                    // })
                }
               this.allcomplains=res
             }else{
              this.allcomplains=[]
             }
          },(err:any)=>{
          }
        )
      }else{
        this.admin=false
      }
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintsPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  sendComplaint(){
    // call api to send message to app manager
    this.storage.get('Trans_user_id').then(val=>{
        this.user.AddUserComplain(val,moment(new Date()).format('llll'),this.complaintMessage).subscribe(
          (res:any)=>{
            const toast = this.toastCtrl.create({
              message:this.translate.instant("complaint sent successfully"),
              duration: 5000
            });
            toast.present();
            toast.onDidDismiss(()=>{
              this.viewCtrl.dismiss()
            })
          },(err:any)=>{
          }
        )
    })
  }

  open_client_profile(Id){

  }
}
