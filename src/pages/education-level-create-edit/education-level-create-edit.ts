import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-education-level-create-edit',
  templateUrl: 'education-level-create-edit.html',
})
export class EducationLevelCreateEditPage {
  id:any
  NameAr:any=''
  NameEn:any=''
  IsEditing:boolean
  dir:boolean
  constructor(public navCtrl: NavController,private plt:Platform, public navParams: NavParams,
              private helper:HelperProvider,private panel:ControlpanelProvider,
              private storage:Storage,private viewCtrl:ViewController) {
   this.dir=this.plt.isRTL
   
                if(this.navParams.get('id')!=undefined){
      console.log(this.navParams.get('id'))
      this.id=this.navParams.get('id')
      this.NameAr=this.navParams.get('NameAr')
      this.NameEn=this.navParams.get('NameEn')
      console.log(this.id +" "+this.NameAr+" "+this.NameEn)
      this.IsEditing=true
    }else{
      this.IsEditing=false
    }

  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationLevelCreateEditPage');
  }

  AddLevel(){
   this.helper.presentLoading()
   this.storage.get("Trans_user_id").then((adminID)=>{
    this.panel.AddEducationLevel(this.NameAr,this.NameEn,adminID).subscribe(
      (res:any)=>{
        if(res=="تم الحفظ بنجاح"){
          this.helper.dismissLoading()
          this.viewCtrl.dismiss()
        }
      },(err:any)=>{
        this.helper.dismissLoading()
      }
    )
   })

  }

  EditLevel(){
    this.helper.presentLoading()
    this.storage.get("Trans_user_id").then((adminID)=>{
      if(adminID){
    this.panel.UpdateEducationLevel(this.id,this.NameAr,this.NameEn,adminID).subscribe(
      (res:any)=>{
          if(res=="تم التعديل بنجاح"){
            this.helper.dismissLoading()
            this.viewCtrl.dismiss()
          }
          if(res=="تاكد من البيانات السابق ادخالها" ){
            this.helper.dismissLoading()
          }
      },(err:any)=>{
        this.helper.dismissLoading()
      }
    )
      }
    })
  }
}
