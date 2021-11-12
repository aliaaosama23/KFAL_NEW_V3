import { GeneralProvider } from './../../providers/general/general';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';
import { AdminProvider } from '../../providers/admin/admin';
@IonicPage()
@Component({
  selector: 'page-admin-add-user',
  templateUrl: 'admin-add-user.html',
})
export class AdminAddUserPage {
  dir:boolean
  myform:FormGroup
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';
  UserTypes:any[]=[]
  constructor(public menuCtrl: MenuController,public platform:Platform,public loadingCtrl:LoadingController,
    public events: Events,public toastCtrl:ToastController, public alertCtrl:AlertController,
    public navCtrl: NavController,public user:ClientProvider,private admin:AdminProvider,
    public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
    public translate: TranslateService,public modalCtrl:ModalController,public viewCtrl:ViewController,
    public navParams: NavParams,private general:GeneralProvider) {
    this.dir=this.platform.isRTL
    this.myform =  this.formBuilder.group({
      UserEmail: ['', Validators.compose([Validators.required,Validators.email])],
      Name:['', Validators.compose([Validators.required])],
      //Password:['', Validators.compose([Validators.required])],
    //  ConfirmPassword:['', Validators.compose([Validators.required])],
      Gender:['', Validators.compose([Validators.required])],
      Mobile:['', Validators.compose([Validators.required])],
      user_type:['', Validators.compose([Validators.required])]
    });

    this.helper.presentLoading()
    this.general.GetAllUserTypes().subscribe((res:any)=>{
     this.UserTypes=res;
     this.helper.dismissLoading()
    },(err:any)=>{
      console.log('get user types err  :  '+JSON.stringify(err))
      this.helper.dismissLoading()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddUserPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
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


  register(){
    console.log(JSON.stringify(this.myform.value))
    if(this.myform.value.Password==this.myform.value.ConfirmPassword){

        // call api to register new
        let loading =this.loadingCtrl.create({'content':this.translate.instant('please wait ...')})
        loading.present()
        this.storage.get('Trans_user_id').then((adminID)=>{
          if(adminID){
            console.log(adminID)
            this.admin.DirectAdminRegistration(this.myform.value,adminID).subscribe(
              (res:any)=>{
                loading.dismiss()
                let toast = this.toastCtrl.create({
                  message: res,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                toast.onDidDismiss(() => {
                //  this.storage.set('Trans_logined_in',true)
                // 
                  if(res=="تم تسجيل بيانات هذا الايمل من قبل"){
                  }
                  else if(res=="تم ارسال كود التفعيل عبر البريد الالكترونى بنجاح"){
                    this.viewCtrl.dismiss()
                  }
                  else if(res=="تم ارسال بيانات التسجيل عبر البريد الالكترونى بنجاح"){
                    this.viewCtrl.dismiss()
                  }
                });
              },(err:any)=>{
                loading.dismiss()
              })
          }

        })

    }else{
      let toast = this.toastCtrl.create({
        message:this.translate.instant("both passwords msut be equal"),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }
  UserTypesSelected(){
    console.log(JSON.stringify(this.myform.value))
  }
}
