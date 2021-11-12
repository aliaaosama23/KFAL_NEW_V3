import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ProvidersProvider } from '../../providers/providers/providers';
@IonicPage()
@Component({
  selector: 'page-toggle-acount',
  templateUrl: 'toggle-acount.html',
})
export class ToggleAcountPage {
UserID:number;
TranslatorID:number;
ReviewerID:number;
  constructor(public translate: TranslateService,public viewCtrl:ViewController,
              public toastCtrl:ToastController,public provider:ProvidersProvider,
              public platform:Platform,public navCtrl: NavController,
              public navParams: NavParams,private storage: Storage) {
                         console.log('user id :'+ this.navParams.get('userId'))
                         console.log('translatorId :' + this.navParams.get('translatorId'))
                         console.log( 'reviewerId :'+ this.navParams.get('reviewerId'))
                         this.UserID=this.navParams.get('userId')
                         this.TranslatorID=this.navParams.get('translatorId')
                         this.ReviewerID=this.navParams.get('reviewerId')
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToggleAcountPage');
  }

  userprofile(){
    this.navCtrl.push('ClientProfilePage',{'user_id': this.navParams.get('userId')})
  }

  providerprofile(Id){
    this.navCtrl.push('ClientProfilePage',{'user_id': Id})
  }

}
