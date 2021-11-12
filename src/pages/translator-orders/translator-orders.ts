import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-translator-orders',
  templateUrl: 'translator-orders.html',
})
export class TranslatorOrdersPage {
  Orders:any[]=[]
  OrdersType:string=""
  providerType:string=""
  dir:boolean
  acendingOrders:any[]=[]
  constructor(public viewCtrl:ViewController, public translate:TranslateService,public platform:Platform,
    public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
      this.dir=this.platform.isRTL
     this.OrdersType=this.navParams.get('type')
     console.log("OrdersType   :"+this.OrdersType)
      this.storage.get("Trans_user_type").then((val:any)=>{
          if(val==3){
            this.providerType="translator"
          }else if(val==4){
            this.providerType="proofreader"
          }
      })
     this.providerType=this.navParams.get('providerType')
     for(let i=0;i<this.navParams.get('orders').length;i++)
      {
        this.navParams.get('orders')[i].date=" "
          this.navParams.get('orders')[i].month=""
          this.navParams.get('orders')[i].day=""
          this.navParams.get('orders')[i].date= moment(this.navParams.get('orders')[i].Request_Date).format('ll').split(',')[0]
          this.navParams.get('orders')[i].month=this.navParams.get('orders')[i].date.split(' ')[0]
          this.navParams.get('orders')[i].day=this.navParams.get('orders')[i].date.split(' ')[1]

      }
     this.Orders=this.navParams.get('orders')

    //  this.acendingOrders=this.Orders.sort
    //  ((a, b) => {
    //    return <any>(b.FK_Request_Deadline_Hours) - <any>new Date(a.FK_Request_Deadline_Hours);
    //  });
    //  console.log("acendingOrders according to speed"+JSON.stringify( this.acendingOrders))


     this.Orders=this.Orders.reverse()




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorOrdersPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  OrderDetails(Request_ID,type){
    this.navCtrl.push('TranslatorOrderDetailsPage',{'Request_ID':Request_ID,'Request_type':this.navParams.get('type'),'providerType':this.navParams.get('providerType')})
  }
}
