import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {

  rules:string=""
  dir:boolean
  isediting:boolean=false
  isadmin:boolean=false
  constructor(public viewCtrl:ViewController, public navCtrl: NavController,public platform:Platform,
              public navParams: NavParams,public admin:AdminProvider,public general:GeneralProvider,
              private storage: Storage,private helper:HelperProvider) {
                      this.dir=this.platform.isRTL
                      this.general.GetInformation().subscribe(
                        (res:any)=>{
                              this.rules=res[0]._Rules
                        },(err:any)=>{
                        }
                      )

                    this.helper.getAdminObservable().subscribe((isAdmin:any)=>{
                      this.admin=isAdmin;
                    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RulesPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
    this.isediting=true
  }

  update(){
    this.isediting=false
    this.admin.UpdateInformation(this.rules,null,null).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }
}
