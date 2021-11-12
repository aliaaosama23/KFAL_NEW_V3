import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, ViewController, LoadingController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import {SettingsProvider} from '../../providers/settings/settings';
import { HelperProvider } from '../../providers/helper/helper';
import { GeneralProvider } from '../../providers/general/general';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  notificationSound:any
  preferedLanguage:any
  Languages:any[]=[]
  currentlang:any
  selectedTheme: any;
  dir:boolean
  language_list:string = 'opened';
  // ios-arrow-down-outline
  // ios-arrow-up-outline
  IconName:string="ios-arrow-down-outline"
  constructor(public loadingCtrl:LoadingController,public general:GeneralProvider,private settings: SettingsProvider,
              public helper:HelperProvider,public event:Events,private storage: Storage, public viewCtrl:ViewController,
              public translate: TranslateService,public navCtrl: NavController,public platform: Platform,
              public navParams: NavParams,private panel:ControlpanelProvider) {

       this.dir=this.platform.isRTL

       this.storage.get('notificationStatus').then((val:any)=>{
        if(val!=null){
          this.notificationSound=val
        }else{
          this.notificationSound=true
        }
      })

      this.storage.get('Trans_language').then((val:any)=>{
        console.log("lang   :"+val)
        if(val!=null){
          if(val=='ar'){
           this.helper.changeLanguage('ar')
            this.platform.setDir('rtl',true)
            this.helper.set_language('ar')
            this.preferedLanguage='ar'
          }else{
            this.helper.changeLanguage('en')
            this.platform.setDir('ltr',true)
            this.helper.set_language('en')
            this.preferedLanguage='en'
          }
        }else{
          this.helper.changeLanguage('en')
            this.platform.setDir('ltr',true)
            this.helper.set_language('en')
            this.preferedLanguage='en'
        }
      })

      this.selectedTheme=this.settings.getActiveTheme()

      let loading=this.loadingCtrl.create({})
      loading.present()
      this.panel.GetLanguages().subscribe((res:any[])=>{
        this.Languages=res
        loading.dismiss()
      },(err:any)=>{
        loading.dismiss()
      })

      this.storage.get('Trans_language').then((val)=>{
        console.log("stored language  :"+val)
        this.currentlang=val
        if(val=='ar'){
          this.platform.setDir('rtl',true)
        }else{
          this.platform.setDir('ltr',true)
        }
      })
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'light-theme') {
      this.settings.setActiveTheme('dark-theme');
    } else {
      this.settings.setActiveTheme('light-theme');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  set_language(){
    if(this.preferedLanguage=='ar'){
      this.platform.setDir('rtl',true)
      this.helper.changeLanguage('ar')
      this.storage.set('Trans_language',this.preferedLanguage)
    }else{
      this.platform.setDir('ltr',true)
      this.translate.use(this.preferedLanguage)
      this.helper.changeLanguage(this.preferedLanguage)
      this.storage.set('Trans_language',this.preferedLanguage)
    }
    this.currentlang=this.preferedLanguage
    this.event.publish('language','ar')
  }


  changeStatus(){
    !this.notificationSound
    console.log(this.notificationSound)
    this.helper.set_notification_status(this.notificationSound)
    this.storage.set('notificationStatus',this.notificationSound)
  }

  change_list_status(){
    this.language_list = this.language_list === 'closed' ? 'opened' : 'closed';
    this.IconName = this.IconName === 'ios-arrow-up-outline' ? 'ios-arrow-down-outline' : 'ios-arrow-up-outline';
  }

}
