import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { GeneralProvider } from '../../providers/general/general';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  admin:boolean
  contactMessage:string=""
  contactTitle:string=""
  dir:boolean
  constructor(public viewCtrl:ViewController, private translate: TranslateService,private helper:HelperProvider,
    public navCtrl: NavController, public navParams: NavParams,public general:GeneralProvider,
    public platform:Platform,private storage: Storage,public toastCtrl:ToastController) {
      this.dir=this.platform.isRTL

    this.helper.getAdminObservable().subscribe((isAdmin:any)=>{
      this.admin=isAdmin;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  sendContactMsg(){
    // call api to send message to app manager
      this.general.Contact('bareedon@gmail.com',this.contactTitle,this.contactMessage).subscribe(
        (res:any)=>{
          const toast = this.toastCtrl.create({
            message:this.translate.instant("complaint sent successfully"),
            duration: 5000
          });
          toast.present();
          toast.onDidDismiss(()=>{
            this.viewCtrl.dismiss()
          })
        },(err:any)=>{
        }
      )

  }

  dismiss(){
    this.viewCtrl.dismiss()
  }


}
