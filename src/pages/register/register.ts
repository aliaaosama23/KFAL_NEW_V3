import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  lang:any
  myform:FormGroup
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';
  policy:boolean=false
  constructor(public menuCtrl: MenuController,public platform:Platform,public loadingCtrl:LoadingController,
              public events: Events,public toastCtrl:ToastController, public alertCtrl:AlertController,
              public user:ClientProvider,public navCtrl: NavController,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              public translate: TranslateService,public modalCtrl:ModalController,
              public navParams: NavParams) {
                this.menuCtrl.enable(false)
                this.myform =  this.formBuilder.group({
                  UserEmail: ['', Validators.compose([Validators.required,Validators.email])],
                  Name:['', Validators.compose([Validators.required])],
                  Password:['', Validators.compose([Validators.required])],
                  ConfirmPassword:['', Validators.compose([Validators.required])],
                  Gender:['', Validators.compose([Validators.required])],
                  Mobile:['', Validators.compose([Validators.required])]
                });

                this.storage.get('Trans_language').then((val:any)=>{
                  console.log("lang   :"+val)
                  console.log("costr ")
                  if(val!=null){
                    if(val=='ar'){
                      this.helper.changeLanguage('ar')
                      this.platform.setDir('rtl',true)
                      this.helper.set_language('ar')
                      this.lang='ar'
                    }else{
                      this.helper.changeLanguage('en')
                      this.platform.setDir('ltr',true)
                      this.helper.set_language('en')
                      this.lang='en'
                    }
                  }else{
                    this.helper.changeLanguage('en')
                     this.platform.setDir('ltr',true)
                     this.helper.set_language('en')
                     this.lang='en'
                  }
                })
  }

  goPolicyPage(){
    this.navCtrl.push('RulesPage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.storage.get('Trans_language').then((val:any)=>{
      console.log("lang   :"+val)
      if(val!=null){
        if(val=='ar'){
          this.helper.changeLanguage('ar')
          this.platform.setDir('rtl',true)
          this.helper.set_language('ar')
          this.lang='ar'
        }else{
          this.helper.changeLanguage('en')
          this.platform.setDir('ltr',true)
          this.helper.set_language('en')
          this.lang='en'
        }
      }else{
        this.helper.changeLanguage('en')
         this.platform.setDir('ltr',true)
         this.helper.set_language('en')
         this.lang='en'
      }
    })
  }

  ionViewDidEnter(){
    this.storage.get('Trans_language').then((val:any)=>{
      console.log("lang   :"+val)
      if(val!=null){
        if(val=='ar'){
          this.helper.changeLanguage('ar')
          this.platform.setDir('rtl',true)
          this.helper.set_language('ar')
          this.lang='ar'
        }else{
          this.helper.changeLanguage('en')
          this.platform.setDir('ltr',true)
          this.helper.set_language('en')
          this.lang='en'
        }
      }else{
        this.helper.changeLanguage('en')
         this.platform.setDir('ltr',true)
         this.helper.set_language('en')
         this.lang='en'
      }
    })
  }

  change(lang){
    console.log("lang0 "+lang)
    if(lang=='en'){
      this.helper.changeLanguage(lang)
      this.platform.setDir('ltr', true)
      this.lang="en"
      this.events.publish('trans_lang','en')
      this.storage.set("Trans_language",'en')
    }else if(lang=='ar'){
      this.helper.changeLanguage(lang)
      this.platform.setDir('rtl', true)
      this.lang="ar"
      this.events.publish('trans_lang','ar')
      this.storage.set("Trans_language",'ar')
    }
  }

  changeLanguage(){
    let languageModal = this.modalCtrl.create('ChooseLanguagePage',{'name':this.translate.instant("app language choose")});
    languageModal.present();
    languageModal.onDidDismiss((chosenLanguage:any)=>{
      this.lang=chosenLanguage.data
      console.log(this.lang)
      if(chosenLanguage.data==1){
        this.helper.changeLanguage('ar')
        this.platform.setDir('rtl', true)
        this.storage.set("Trans_language",'ar')
      }else{
        this.helper.changeLanguage('en')
        this.platform.setDir('ltr', true)
        this.storage.set("Trans_language",'en')
      }
    })
  }


  hideShowPassword()
  {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowPassword1()
  {
    this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
  }

  Login(){
    this.navCtrl.push('LoginPage')
  }

  register(){
   console.log("policy   :"+this.policy)
    if(this.myform.value.Password==this.myform.value.ConfirmPassword){
      if(this.policy){
        // call api to register new
        let loading =this.loadingCtrl.create({})
        loading.present()
        this.user.sign_up(this.myform.value).subscribe(
          (res:any)=>{
            loading.dismiss()
            let toast = this.toastCtrl.create({
              message: res,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            toast.onDidDismiss(() => {
              if(res=="تم تسجيل بيانات هذا الايمل من قبل"){
              }else if(res=="تم ارسال كود التفعيل عبر البريد الالكترونى بنجاح"){
              this.navCtrl.push('CodeVerificationPage',{'email':this.myform.value.UserEmail})
              }
            });


          },(err:any)=>{
            loading.dismiss()
          })
      }else{
        let toast = this.toastCtrl.create({
          message:this.translate.instant('must accept policy'),
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    }else{
      let toast = this.toastCtrl.create({
        message:this.translate.instant("both passwords msut be equal"),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  set_policy(){
    console.log(this.policy)
    //!this.policy
  }

}
