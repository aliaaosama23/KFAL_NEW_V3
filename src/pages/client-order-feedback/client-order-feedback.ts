import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, Events, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ClientProvider } from '../../providers/client/client';


@IonicPage()
@Component({
  selector: 'page-client-order-feedback',
  templateUrl: 'client-order-feedback.html',
})
export class ClientOrderFeedbackPage {
  ModalType:any
  rate:number=0
  dir:boolean
  comment:string=""
  refuseReason:string=""
  type:string=""
  constructor(public toastCtrl:ToastController,public translate:TranslateService,
              public storage:Storage, public user:ClientProvider,public viewCtrl:ViewController,
              public navCtrl: NavController,public events:Events, public platform:Platform,
              public navParams: NavParams) {
                  this.dir=this.platform.isRTL
                  this.type=this.navParams.get('type')
                  console.log("type  :"+this.type)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientOrderFeedbackPage');
  }

  logRatingChange($event){
    console.log(JSON.stringify($event))
    this.events.subscribe('star-rating:changed', (starRating) => {
      console.log("current rating....."+  starRating)
      this.rate=starRating
    })
  }

  send(){
    this.storage.get('Trans_user_id').then(val=>{

      if(this.type=='acceptReceivedRequest'){
        this.user.CloseRequest(this.navParams.get('request_id'),val,this.rate,this.comment).subscribe(
          (res:any)=>{
            const toast = this.toastCtrl.create({
              message: this.translate.instant("your feedback sent"),
              duration: 3000
            });
            toast.present();
            toast.onDidDismiss(()=>{
              this.viewCtrl.dismiss()
            })
          },
          (err:any)=>{
          })
        }
        if(this.type=='refuseReceivedRequest'){
          this.user.RollBackRequestFromUser(this.navParams.get('request_id'),val,this.refuseReason).subscribe(
            (res:any)=>{
              const toast = this.toastCtrl.create({
                message: this.translate.instant("your feedback sent"),
                duration: 3000
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.viewCtrl.dismiss()
              })
            },
            (err:any)=>{
            })
        }
    })
}

back(){
  this.viewCtrl.dismiss()
}

}
