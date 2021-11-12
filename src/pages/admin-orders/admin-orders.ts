import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-admin-orders',
  templateUrl: 'admin-orders.html',
})
export class AdminOrdersPage {
  dir:boolean
  newOrders:any[]=[]
  currentOrders:any[]=[]
  apologyOrders:any[]=[]
  waitOrsers:any[]=[]
  backOrders:any[]=[]
  closedOrders:any[]=[]
  ordersType:string=""
  orders:any[]=[]
  backOrderType:any='new' //  from review or from client

  // items = ['item1', 'item2', 'item3', 'item4'];

  // addItem(newItem: string) {
  //   this.items.push(newItem);
  // }
  constructor(public menuCtrl:MenuController, public loadingCtrl:LoadingController,
    public platform:Platform,
     public translate: TranslateService,public viewCtrl:ViewController,
      public navCtrl: NavController, public navParams: NavParams) {
        this.dir=this.platform.isRTL
        console.log(this.dir)
          this.ordersType= this.navParams.get('type')
          console.log(this.ordersType)
          this.orders=this.navParams.get('orders')
          for(let i=0;i<this.orders.length;i++)
            {
              this.orders[i].date=" "
              this.orders[i].month=""
              this.orders[i].day=""
              this.orders[i].date= moment(this.orders[i].Request_Date).format('ll').split(',')[0]
              this.orders[i].month=this.orders[i].date.split(' ')[0]
              this.orders[i].day=this.orders[i].date.split(' ')[1]
            }
            this.orders.reverse()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOrdersPage');
  }


  ionViewDidEnter() {
    console.log('ionViewDidLoad AdminOrdersPage');
  }

  OrderDetails(Request_ID,type){
    this.navCtrl.push('AdminOrderDetailsPage',{'Request_ID':Request_ID,'Request_type':this.translate.instant(type) })
  }

  showRequestDetails(Request_ID){
    console.log('fire show request details ')
    //this.navCtrl.push('AdminOrderDetailsPage',{'Request_ID':Request_ID,'Request_type':this.translate.instant(type) })
  }

  doRefresh(refresher){
    this.ordersType= this.navParams.get('type')
    this.orders=this.navParams.get('orders')
    for(let i=0;i<this.orders.length;i++)
        {
          this.orders[i].date=" "
          this.orders[i].month=""
          this.orders[i].day=""
          this.orders[i].date= moment(this.orders[i].Request_Date).format('ll').split(',')[0]
          this.orders[i].month=this.orders[i].date.split(' ')[0]
          this.orders[i].day=this.orders[i].date.split(' ')[1]
        }
        refresher.complete()
  }


  dismiss(){
    this.viewCtrl.dismiss()
  }
}
