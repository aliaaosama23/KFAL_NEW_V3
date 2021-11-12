import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
dir:boolean
notifications:any[]=[]
title:any
body:any
admin:boolean
  constructor(public translate: TranslateService,public viewCtrl:ViewController,

              public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
              public platform:Platform,private user:ClientProvider) {

                this.storage.get('notifications').then((val)=>{
                  if(val!=null){
                    console.log("notifications   :"+  JSON.stringify(val))
                    this.notifications=val
                  }else{
                    this.notifications=[]
                  }

                })

                this.storage.get('UserDeviceID').then((UserDeviceID)=>{
                  if(UserDeviceID!=null){
                      this.user.GetUserNotification(UserDeviceID).subscribe((res:any)=>{
                      console.log('user notifications : '+JSON.stringify(res))
                    })
                  }
                })
                
                this.dir=this.platform.isRTL
                this.storage.get("Trans_user_type").then((val:any)=>{
                  if(val==2){
                    this.admin=true
                  }else{
                    this.admin=false
                  }
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  addcustomNotification(){
    this.navCtrl.push('AddNotificationPage')
  }

}
