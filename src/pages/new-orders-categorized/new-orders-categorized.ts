import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-orders-categorized',
  templateUrl: 'new-orders-categorized.html',
})
export class NewOrdersCategorizedPage {
  orders:any[]
  dir:boolean
  constructor(public navCtrl: NavController,public viewCtrl:ViewController,public plt:Platform,
    public menuCtrl:MenuController, public navParams: NavParams) {
    this.orders=this.navParams.get('orders');
    this.dir=this.plt.isRTL;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewOrdersCategorizedPage');
  }

  doRefresh($event){

  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  toggleMenu(){
    this.menuCtrl.toggle()
 }

 OrderDetails(Request_ID,type){
  this.navCtrl.push('TranslatorOrderDetailsPage',{'Request_ID':Request_ID,'Request_type':type,'providerType':this.navParams.get('type')})
}
}
