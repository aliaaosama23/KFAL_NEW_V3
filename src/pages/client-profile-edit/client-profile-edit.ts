import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';
import { GeneralProvider } from '../../providers/general/general';

@IonicPage()
@Component({
  selector: 'page-client-profile-edit',
  templateUrl: 'client-profile-edit.html',
})
export class ClientProfileEditPage {
  show:boolean=false
  email:any
  name:any
  password:any
  gender:any
  Age:any
  country_id:any
  city_id:any
  Address:any
  countries:any[]=[]
  cities:any[]=[]

  DataNotCompleted:boolean=false
  client:boolean=true
  alldata:any={}
  Password:any
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  dir:boolean
  constructor(public menuCtrl: MenuController,public platform:Platform,
    public loadingCtrl:LoadingController,public viewCtrl:ViewController,
              public events: Events,public toastCtrl:ToastController,public general:GeneralProvider,
              public user:ClientProvider,public navCtrl: NavController,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              public translate: TranslateService,public navParams: NavParams) {
this.dir=this.platform.isRTL

      this.general.GetCountries().subscribe( (res:any)=>{this.countries=res}, (err:any)=>{ })

      this.storage.get('Trans_user_id').then(val=>{
        if(val){
          let loading=this.loadingCtrl.create({})
          loading.present()
          this.user.GetUserDataByUserID(val).subscribe(
          (res:any)=>{
            this.storage.get('Password').then((val)=>{
              if(val){
                this.Password=val
              }
            })
            loading.dismiss()
            this.alldata=res.dt[0]
            this.email=res.dt[0].User_Email
            this.name=res.dt[0].User_Full_Name
            this.gender=res.dt[0].Gender
            this.country_id=res.dt[0].FK_Country_ID
            this.city_id=res.dt[0].FK_City_ID
            this.Address=res.dt[0].User_Address
            if(this.country_id!=null){
              this.general.GetCityByCountryID(  this.country_id)
              .subscribe((res:any)=>{this.cities=res },(err:any)=>{})
            }
          
            if(this.gender=="F"){
              this.gender= this.translate.instant("female")
            }
            if(this.gender=="M"){
              this.gender= this.translate.instant("male")
            }
            this.Address=res.dt[0].User_Address
            this.Age=res.dt[0].User_Age
          },(err)=>{
            loading.dismiss()
          })
        }
      })
  }

  hideShowPassword()
  {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfileEditPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  editProfile(){
    // api to edit profile

    //this.email  this.name   this.Password   this.Age   this.country_id  this.city_id   this.Address

      this.storage.get('Trans_user_id').then(val=>{
      this.user.UpdateProfile(val,this.email ,null,null).subscribe(
        (res:any)=>{
          const toast = this.toastCtrl.create({
            message: res,
            duration: 3000
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

  showpass(){
    if(this.show){
      this.show=false
    }else{
     this.show=true
    }
  }


  GetCityByCountryID(country_id){
    this.general.GetCityByCountryID(country_id)
    .subscribe((res:any)=>{this.cities=res },(err:any)=>{})
  }

}
