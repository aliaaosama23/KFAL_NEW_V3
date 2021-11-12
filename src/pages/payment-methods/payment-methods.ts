import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})
export class PaymentMethodsPage {

  constructor(private translate: TranslateService,public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodsPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  itemSelected(paymentMethod){
    this.navCtrl.push('PaymentDataPage',{name:paymentMethod,'data':this.navParams.get('data')})
  }

}
