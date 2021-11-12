import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  myform:FormGroup
  constructor(public menuCtrl: MenuController,public platform:Platform,
    public loadingCtrl:LoadingController,public viewCtrl:ViewController,
              public events: Events,public toastCtrl:ToastController,
              public user:ClientProvider,public navCtrl: NavController,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              public translate: TranslateService,public navParams: NavParams) {

      this.myform =  this.formBuilder.group({
        UserEmail: ['', Validators.compose([Validators.required,Validators.email])]
      });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  back(){
    this.viewCtrl.dismiss()
  }

  send(){
    this.user.SendForgetPassword(this.myform.value.UserEmail).subscribe(
      (res:any)=>{
           let toast = this.toastCtrl.create({
            message: res,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          toast.onDidDismiss(()=>{
            if(res=="تم ارسال كود التفعيل عبر البريد الالكترونى بنجاح"){
              this.navCtrl.push('ChangePasswordPage',{'email':this.myform.value.UserEmail})
            }

          })
      },(err:any)=>{
      }
    )
  }
}
