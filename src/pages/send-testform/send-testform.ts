import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { Storage } from '@ionic/storage';
import { GeneralProvider } from '../../providers/general/general';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';

@IonicPage()
@Component({
  selector: 'page-send-testform',
  templateUrl: 'send-testform.html',
})
export class SendTestformPage {
  upgID:any
  testformLang:any
  language:any={}
  test:any
  dir:boolean
  testforms:any[]

  constructor(public navCtrl: NavController,public panel:ControlpanelProvider,public viewCtrl:ViewController,
                private upgradeService:UpgradeRequestsProvider,public navParams: NavParams,public storage:Storage,
                private plt:Platform,private general:GeneralProvider) {

                this.dir=this.plt.isRTL
                this.upgID=this.navParams.get('UpgReq_ID')  // upg req details id
                        //  console.log("upg id :"+this.navParams.get( 'UpgReq_ID'  ))
                this.testformLang=this.navParams.get('lang')

                console.log(this.upgID +"00"+ this.testformLang)
                this.panel.GetTestForm_ByLangID(this.testformLang).subscribe(
                  (res:any)=>{
                    this.testforms=res
                  }
                )

                this.panel.GetLanguages().subscribe((res:any[])=>{
                  for(let i=0;i<res.length;i++){
                    if(res[i].LangID==this.navParams.get('lang') ){
                            this.language=res[i]
                           // console.log(res[i])
                    }
                  }
                },(err:any)=>{

                })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SendTestformPage');
  }



  accept(){
    this.upgradeService.UpgradeRequestDetailsAdmin( this.upgID ,true).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }

  refuse(){
    this.upgradeService.UpgradeRequestDetailsAdmin( this.upgID ,false).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }

  UpgradeRequestDetails(){
      this.storage.get('Trans_user_id').then(val=>{
        if(val){
              this.upgradeService.UpgradeRequestDetails( this.upgID,this.test  ,val).subscribe(
                (res:any)=>{
                  setTimeout(()=>{
                     this.viewCtrl.dismiss()
                  },2000)
                },(err:any)=>{

                }
              )
        }else{

        }
      })
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

}
