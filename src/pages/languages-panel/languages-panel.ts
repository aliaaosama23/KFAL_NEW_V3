import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-languages-panel',
  templateUrl: 'languages-panel.html',
})
export class LanguagesPanelPage {
  Languages:any[]=[]
  dir:boolean
  constructor(private viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams,private general:GeneralProvider,private translate:TranslateService,
    private helper:HelperProvider,private plt:Platform,private panal:ControlpanelProvider,private alertCtrl:AlertController ) {

      this.dir=this.plt.isRTL

      this.helper.presentLoading()
      this.panal.GetLanguages().subscribe(
        (res:any)=>{
          this.Languages=res
          this.helper.dismissLoading()
        },(err:any)=>{
          this.helper.dismissLoading()
        }
      )
  }

  ionViewDidEnter(){

    this.panal.GetLanguages().subscribe(
      (res:any)=>{
        this.Languages=res

      },(err:any)=>{

      }
    )
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagesPanelPage');
  }

  delete(ID){
    const alert = this.alertCtrl.create({
      subTitle: this.translate.instant("Do you want to delete this language ?"),
      buttons: [
        {
          text:  this.translate.instant("no"),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: this.translate.instant("yes"),
          handler: () => {
            this.panal.DeleteLanguage(ID).subscribe(
              (res:any)=>{
                this.helper.presentLoading()
                this.panal.GetLanguages().subscribe(
                  (res:any)=>{
                    this.Languages=res
                    this.helper.dismissLoading()
                  },(err:any)=>{
                    this.helper.dismissLoading()
                  }
                )
              }
            )
          }
        }
      ]
    });
    alert.present();

}

updateStatus(Lang_ID,_Stasus){
  this.panal.UpdateLanguageAcademicStatus(Lang_ID,_Stasus).subscribe(
    (res:any)=>{
      if(res== "تم التعديل بنجاح"){
        this.helper.presentLoading()
        this.panal.GetLanguages().subscribe(
          (res:any)=>{
            this.Languages=res
            this.helper.dismissLoading()
          },(err:any)=>{
            this.helper.dismissLoading()
          }
        )
      }
    },(err:any)=>{

    }
  )
}

edit(Id,Name_ar,Name_en,abbr,status){
  console.log(Id,Name_ar,Name_en,abbr,status)
  this.navCtrl.push('LanguageCreateEditPage',
  {
    'id':Id,
    'NameAr':Name_ar,
    'NameEn':Name_en,
    'abbr':abbr,
    'status':status
  })
}

addNewLanguage(){
  this.navCtrl.push('LanguageCreateEditPage')
}

AdminProfile(_Fk_AdminID){
  this.navCtrl.push('ClientProfilePage',{'user_id':_Fk_AdminID})
}


}
