import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HelperProvider } from '../../providers/helper/helper';
import * as moment from 'moment';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-payment-data',
  templateUrl: 'payment-data.html',
})
export class PaymentDataPage {
  name:any
  CardNumber:any
  ExpireationDate:any
  CVC:any
  data:any={}

  constructor(public toastCtrl:ToastController, public helper:HelperProvider,
    public user:ClientProvider, private storage: Storage,public viewCtrl:ViewController, public translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
    this.name=this.navParams.get('name')
    this.data=this.navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentDataPage');
  }

  dismiss(){
     this.viewCtrl.dismiss()
  }

  saveRequest(){

    this.storage.get('Trans_user_id').then(val=>{
      if(val){
           this.helper.presentLoading()
            this.user.CreateRequest( moment(new Date()).format('llll'),val,
            this.data.langfrom,
            this.data.langto,
            this.data.Deadline,
            this.data.amount,
            this.data.pages,
            this.data.file,
            this.data.notices,
            this.data.level,
            this.data.GeneralFeild,
            this.data.SpecificFeild,
            this.data.ReviewType
            ).subscribe(
              (data:any)=>{
                this.helper.dismissLoading()
                const toast = this.toastCtrl.create({
                  message: this.translate.instant("result"),
                  duration: 3000
                });
                toast.present();
                toast.onDidDismiss(()=>{

             // this.myform.reset()
              this.data={}
           //   document.getElementById('file').replaceWith(document.getElementById('file').val('').clone(true))
         //  this.myInputVariable.nativeElement.value = "";
         this.navCtrl.setRoot('HometypePage')
              // علشان نبقي نفضيه بعد كدة
              //document.getElementById('file')
                })
              },(err:any)=>{
                this.helper.dismissLoading()
                if(err.status==400){
                  const toast = this.toastCtrl.create({
                    message: this.translate.instant( "make sure of complete all data"),
                    duration: 3000
                  });
                  toast.present();
                }
                const toast = this.toastCtrl.create({
                  message: err.Message,
                  duration: 3000
                });
                toast.present();
              })
      }else{
      }
    })

  }

}
