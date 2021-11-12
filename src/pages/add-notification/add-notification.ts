import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AdminProvider } from '../../providers/admin/admin';


@IonicPage()
@Component({
  selector: 'page-add-notification',
  templateUrl: 'add-notification.html',
})
export class AddNotificationPage {
  notificationTitle:any
  notificationMessage:any
  UserType:string=""
  dir:boolean
  constructor(public navCtrl: NavController,public admin:AdminProvider,
              public viewCtrl:ViewController,public translate: TranslateService,
              public navParams: NavParams,public platform:Platform,public toastCtrl:ToastController) {
                this.dir=this.platform.isRTL
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  send(){
    this.UserType=JSON.parse("[" + this.UserType + "]");
    this.admin.SendCustomNotification(this.notificationTitle,this.notificationMessage,this.UserType).subscribe(
      (res:any)=>{
        const toast = this.toastCtrl.create({
          message:this.translate.instant("notification sent successfully"),
          duration: 5000
        });
        toast.present();
        toast.onDidDismiss(()=>{
          this.viewCtrl.dismiss()
        })
      },(err:any)=>{

      })
  }

}
