import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GeneralProvider } from '../../providers/general/general';
import { AdminProvider } from '../../providers/admin/admin';
import { Storage } from '@ionic/storage';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';

@IonicPage()
@Component({
  selector: 'page-client-profile-discussion',
  templateUrl: 'client-profile-discussion.html',
})
export class ClientProfileDiscussionPage {
  general_feilds:any[]=[]
  specific_feilds:any[]=[]
  document_levels:any[]=[]
  general_feild_id:any
  education_grade:any
  University:any
  college:any
  dir:boolean
  spicific_feild_id:any
  GeneralFeild:any
  constructor(public general:GeneralProvider,public admin:AdminProvider,private storage: Storage,private panel:ControlpanelProvider,
              public viewCtrl:ViewController,public platform:Platform,public loadingCtrl:LoadingController,
              public translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
                
                this.dir=this.platform.isRTL
              // call api to get all available general_feilds
              this.general.GetParentSp().subscribe((res:any)=>{this.general_feilds=res},(err:any)=>{})

              // call api to get all available document levels
              this.panel.GetEducationLevel().subscribe((res:any)=>{this.document_levels=res},(err:any)=>{})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfileDiscussionPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  select_general_feild(){
    let loading=this.loadingCtrl.create({})
    loading.present()
   this.general.GetChildSp(this.general_feild_id).subscribe((res:any)=>{
     loading.dismiss()
     this.specific_feilds=res
   },(err:any)=>{
     loading.dismiss()
   })
  }

  JoinDisscusion(){
    // call api to join discussions
    this.storage.get('Trans_user_id').then(val=>{
      if(val!=null){
        this.admin.joinDiscussionTable(val,this.education_grade,this.general_feild_id,this.spicific_feild_id,this.University,this.college).subscribe(
          (res:any)=>{
            // if success dismiss view
            if(res=="تمت الاضافة بنجاح "){
              this.viewCtrl.dismiss()
            }
          },(err:any)=>{

          }
        )
      }
    })

  }

}
