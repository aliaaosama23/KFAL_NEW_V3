import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
})
export class MainpagePage {
  RequestType:any=0
  dir:boolean
  beforePulling:boolean=true
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,
              public navParams: NavParams,public plt:Platform,private viewCtrl:ViewController) {
                this.dir=this.plt.isRTL
                this.menuCtrl.enable(true)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainpagePage');
  }

  chooseRequestType(type){
    this.RequestType=type
  } 


makeRequest(){
    this.navCtrl.push('HomePage',
       {'type':this.RequestType}
    )
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }
}