import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
 about:string=""
 dir:boolean
 isediting:boolean=false
 isadmin:boolean=false
  constructor(public viewCtrl:ViewController, public navCtrl: NavController,public platform:Platform,public general:GeneralProvider,
              public navParams: NavParams,public admin:AdminProvider,private storage: Storage,private helper:HelperProvider) {
                this.dir=this.platform.isRTL
                this.general.GetInformation().subscribe(
                  (res:any)=>{
                        this.about=res[0]._AbouUs
                  },(err:any)=>{
                  }
                )

              this.helper.getAdminObservable().subscribe((isAdmin:any)=>{
                this.isadmin=isAdmin;
              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
    this.isediting=true
  }

  update(){
    this.isediting=false
    this.admin.UpdateInformation(null,null,this.about).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }


}
