import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  myform:FormGroup
  constructor(public menuCtrl: MenuController,public platform:Platform,
              public loadingCtrl:LoadingController,public viewCtrl:ViewController,
              public events: Events,public toastCtrl:ToastController,
              public user:ClientProvider,public navCtrl: NavController,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              public translate: TranslateService,public navParams: NavParams) {
                this.myform =  this.formBuilder.group({
                  VerficationCode: ['', Validators.compose([Validators.required,Validators.maxLength(6),Validators.minLength(6)])],
                  NewPassword:['', Validators.compose([Validators.required])]
                });
              }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  changePassword(){
    let params={
      'Email':this.navParams.get('email') ,
      'VerficationCode':this.myform.value.VerficationCode ,
      'NewPassword':this.myform.value.NewPassword
    }
    this.user.ConfirmResetPassword(params).subscribe(
      (res:any)=>{
          let toast = this.toastCtrl.create({
            message: res,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          toast.onDidDismiss(()=>{
            if(res=="تم تعديل كلمة المرور الجديدة"){
              this.navCtrl.setRoot('LoginPage')
            }
    })
      },(err:any)=>{
      }
    )
  }

  back(){
this.viewCtrl.dismiss()
  }

}
