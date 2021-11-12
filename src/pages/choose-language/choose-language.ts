import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Platform } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { GeneralProvider } from '../../providers/general/general';
@IonicPage()
@Component({
  selector: 'page-choose-language',
  templateUrl: 'choose-language.html',
})
export class ChooseLanguagePage {
  languages:any[]=[]
  chosenlanguage:any
  name:any
  dir:boolean
  constructor(public viewCtrl:ViewController, public loadingCtrl: LoadingController,private panel:ControlpanelProvider,
              public user:ClientProvider,public general:GeneralProvider,  public navCtrl: NavController,
              public navParams: NavParams,public platform:Platform) {

                this.dir=this.platform.isRTL
                    this.name=this.navParams.get('name')
                // call api to get all available languages
                // let loading=this.loadingCtrl.create({
                //   spinner: 'Show ios',
                // })
               // loading.present()
                this.panel.GetLanguages().subscribe((res:any)=>{
               //   loading.dismiss()
                  this.languages=res
                },(err:any)=>{
                //  loading.dismiss()
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseLanguagePage');
  }

  dismiss(){
    this.viewCtrl.dismiss({'data':this.chosenlanguage})
  }
  change(){
    console.log('selected '+this.chosenlanguage)
    this.viewCtrl.dismiss({'data':this.chosenlanguage})
  }
}
