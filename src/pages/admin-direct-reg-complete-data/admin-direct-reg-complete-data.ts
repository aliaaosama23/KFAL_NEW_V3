import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, Platform, Events } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { GeneralProvider } from '../../providers/general/general';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-admin-direct-reg-complete-data',
  templateUrl: 'admin-direct-reg-complete-data.html',
})
export class AdminDirectRegCompleteDataPage {
  languages:any[]=[]
  general_feilds:any[]=[]
  specific_feilds:any[]=[]
  language_id:any[]=[]
  general_feild_id:any
  specific_feild_id:any
  dir:boolean
  constructor(private panel:ControlpanelProvider,private general:GeneralProvider,private loadingCtrl:LoadingController,
              private viewCtrl:ViewController,private admin:AdminProvider,private storage:Storage, 
              public translate: TranslateService,private plt:Platform,private navCtrl:NavController) {
      this.dir=this.plt.isRTL
     // call api to get all available languages
     this.panel.GetLanguages().subscribe((res:any)=>{this.languages=res},(err:any)=>{})

     // call api to get all available general_feilds
     this.general.GetParentSp().subscribe((res:any)=>{this.general_feilds=res},(err:any)=>{})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDirectRegCompleteDataPage');
  }


  set_general_feild(SpParentID){
    let loading=this.loadingCtrl.create({})
    loading.present()
   // check if the selected general feild is academic
     // call api to get all available specific_feilds

   this.general.GetChildSp(SpParentID).subscribe((res:any)=>{
     loading.dismiss()
     this.specific_feilds=res
   },(err:any)=>{
     loading.dismiss()
   })
 }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  CompleteData(){
    this.storage.get('Trans_user_id').then(val=>{
      if(val){
      this.admin.CompleteUserData(val,this.general_feild_id,this.specific_feild_id,this.language_id)
      .subscribe((val:any)=>{
           console.log('complate data res is '+val);
           if(val=="تم ادخال المجال العام والخاص"){
            this.navCtrl.setRoot('MainPage',{'user_type':3})
            console.log("this user has upgraded his account")
            this.storage.set('Trans_upgrade',true)
           }
      })

    }
    })
  }

}
