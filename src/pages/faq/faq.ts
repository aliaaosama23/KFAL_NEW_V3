import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  faq:string=""
  dir:boolean
  isediting:boolean=false
  isadmin:boolean=false
  constructor(public viewCtrl:ViewController,private helper:HelperProvider,
     public navCtrl: NavController,public platform:Platform,public general:GeneralProvider,
    public navParams: NavParams,public admin:AdminProvider,private storage: Storage) {
    this.dir=this.platform.isRTL
    this.general.GetInformation().subscribe(
      (res:any)=>{
            this.faq=res[0]._FAQ
      },(err:any)=>{
      }
    )

  this.helper.getAdminObservable().subscribe((isAdmin:any)=>{
    this.admin=isAdmin;
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
    this.isediting=true
  }

  update(){
    this.isediting=false
    this.admin.UpdateInformation(null,this.faq,null).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }
}
