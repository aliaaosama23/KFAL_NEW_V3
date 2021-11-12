import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';


@IonicPage()
@Component({
  selector: 'page-code-verification',
  templateUrl: 'code-verification.html',
})
export class CodeVerificationPage {
  comefrom:any
  myform:FormGroup
  language:any
  user_name:any
  password:any
  languages:any[]=[]
  login_form:boolean=true
  constructor(public menuCtrl: MenuController,public platform:Platform,
    public loadingCtrl:LoadingController,
              public events: Events,public toastCtrl:ToastController,public viewCtrl:ViewController,
              public user:ClientProvider,
              public navCtrl: NavController,public formBuilder: FormBuilder,
              public helper:HelperProvider,private storage: Storage,
              private translate: TranslateService,public navParams: NavParams) {

                this.menuCtrl.enable(false)
                this.myform=  this.formBuilder.group({
                  number1: ['', Validators.compose([Validators.required,Validators.maxLength(1),Validators.minLength(1)])],
                  number2: ['', Validators.compose([Validators.required,Validators.maxLength(1),Validators.minLength(1)])],
                  number3: ['', Validators.compose([Validators.required,Validators.maxLength(1),Validators.minLength(1)])],
                  number4: ['', Validators.compose([Validators.required,Validators.maxLength(1),Validators.minLength(1)])],
                  number5: ['', Validators.compose([Validators.required,Validators.maxLength(1),Validators.minLength(1)])],
                  number6: ['', Validators.compose([Validators.required,Validators.maxLength(1),Validators.minLength(1)])],
                });

               this.comefrom= this.navParams.get('comefrom')


              }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  back(){
    this.viewCtrl.dismiss()
  }

  send(){
    let code=this.myform.value.number1+this.myform.value.number2+this.myform.value.number3+this.myform.value.number4+
    this.myform.value.number5+this.myform.value.number6
    // call api to send verification code and go to be logged to the system

        this.storage.get('userEmail').then(val => {
          this.user.CheckVerificationEmailCode(this.navParams.get('email'),code)
          .subscribe(
              (res:any)=>{
                let toast = this.toastCtrl.create({
                  message: res,
                  duration: 3000,
                  position: 'bottom'
                });

                toast.present();
                toast.onDidDismiss(() => {
                  if(res=="تم استكمال بيانات التسجيل بنجاح"){
                    // if(this.comefrom=='verification'){
                    //   this.storage.get('Trans_user_type').then((val:any)=>{
                    //         if(val!=null){
                    //             if(val==1){
                    //               this.navCtrl.setRoot('HomePage')
                    //             } else {
                    //               this.navCtrl.setRoot('MainPage')
                    //             }
                    //         }
                    //      })
                    // } else{
                      this.navCtrl.setRoot('LoginPage')
                   // }
                  }else{
                    let toast = this.toastCtrl.create({
                      message: "قم بادخال كود التفعيل المرسل لبريدك",
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                  }
                });
              },(err:any)=>{
              })
        })
  }

  next(el) {
    el.setFocus();
  }

}
