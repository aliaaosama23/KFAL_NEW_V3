import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ClientProvider } from '../../providers/client/client';
@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  walletType:string="points"
  dir:boolean
  points:any
  money:any
  constructor(public translate: TranslateService,public loadingCtrl:LoadingController,
              public viewCtrl:ViewController,public storage:Storage,private client:ClientProvider,
              public navCtrl: NavController, public navParams: NavParams,public platform:Platform) {
                this.dir=this.platform.isRTL

                this.storage.get('Trans_user_id').then(val=>{
                  if(val){
                    let loading=this.loadingCtrl.create({})
                    loading.present()
                    this.client.GetUserWalletPointsByUserID(val).subscribe(
                      (res:any)=>{
                        console.log(JSON.stringify(res))
                        if(res[0].Points==null){
                          this.points=0
                        }else{
                          this.points=res[0].Points
                        }
                        if(res[0].Money==null){
                          this.money=0
                        }else{
                        this.money=res[0].Money
                        }
                        loading.dismiss()
                      console.log(this.points +"   "+this.money)
                      },(err:any)=>{

                        loading.dismiss()
                      }
                    )

                  }else{

                  }
                })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

}
