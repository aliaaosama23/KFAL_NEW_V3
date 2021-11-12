import { HelperProvider } from './../../providers/helper/helper';
import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-language-create-edit',
  templateUrl: 'language-create-edit.html',
})
export class LanguageCreateEditPage {
  LangID:any
  ISEditing:boolean
  Lang_Name='';
  Lan_Name_En='';
  LangAbbreviation='';
  Stasus:boolean=false;
  dir:boolean

  constructor( public navCtrl: NavController,private plt:Platform, public navParams: NavParams,private panel:ControlpanelProvider,
              private helper:HelperProvider,private viewCtrl:ViewController,private storage:Storage) {
        
                this.dir=this.plt.isRTL
                if(this.navParams.get('id')!=undefined){
              console.log("pppp")
              this.LangID=this.navParams.get('id')
              console.log(this.LangID)
              this.Lang_Name=this.navParams.get('NameAr')
              this.Lan_Name_En=this.navParams.get('NameEn')
              this.LangAbbreviation=this.navParams.get('abbr')
              this.Stasus=this.navParams.get('status')
              this.ISEditing=true
              console.log(this.Lang_Name+"  "+this.Lan_Name_En+"  "+this.LangAbbreviation )
            }else{
              this.ISEditing=false
            }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguageCreateEditPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  AddLanguage(){
      this.helper.presentLoading()
      this.storage.get("Trans_user_id").then((adminID)=>{
        if(adminID){
          this.panel.AddLanguage(this.Lang_Name,this.Lan_Name_En,this.LangAbbreviation,this.Stasus,adminID).subscribe(
            (res:any)=>{
                if(res=="تم الحفظ بنجاح"){
                  this.helper.dismissLoading()
                  this.viewCtrl.dismiss()
                }
            },(err:any)=>{
              this.helper.dismissLoading()
            }
          )
        }
      })

  }


  changestatus(){
    console.log(this.Stasus)
    //this.Stasus=!this.Stasus
  }

  EditLanguage(){
      this.helper.presentLoading()
      this.storage.get("Trans_user_id").then((adminID)=>{
        if(adminID){
      this.panel.UpdateLanguage(this.LangID,this.Lang_Name,this.Lan_Name_En,this.LangAbbreviation,this.Stasus,adminID).subscribe(
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
