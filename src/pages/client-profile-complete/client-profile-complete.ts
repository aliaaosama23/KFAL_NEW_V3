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
  selector: 'page-client-profile-complete',
  templateUrl: 'client-profile-complete.html',
})
export class ClientProfileCompletePage {

  countries:any[]=[]
  cities:any[]=[]
  Age:any
  country_id:any
  city_id:any
  Address:any
 dir:boolean
  constructor(public menuCtrl: MenuController,public platform:Platform,
    public loadingCtrl:LoadingController,public viewCtrl:ViewController,
              public events: Events,public toastCtrl:ToastController,
              public user:ClientProvider,public navCtrl: NavController,public general:GeneralProvider,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              public translate: TranslateService,public navParams: NavParams) {
                 this.dir=this.platform.isRTL
                 this.general.GetCountries().subscribe( (res:any)=>{this.countries=res}, (err:any)=>{ })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfileCompletePage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  GetCityByCountryID(country_id){
    this.general.GetCityByCountryID(country_id)
    .subscribe((res:any)=>{this.cities=res },(err:any)=>{})
  }

  saveProfile(){
    // call api to complete profile data

    console.log("age :"+this.Age+"country  :"+this.country_id+"city  :"+this.city_id+"address  :"+this.Address)

    this.storage.get('Trans_user_id').then(val=>{


      this.user.CompleteRegistration(val,this.country_id,this.city_id,this.Address,this.Age).subscribe(
        (res:any)=>{
           let toast = this.toastCtrl.create({
              message: res,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            toast.onDidDismiss(()=>{
              this.viewCtrl.dismiss()
            })
        },
        (err:any)=>{
        }
      )

    })

  }
}
