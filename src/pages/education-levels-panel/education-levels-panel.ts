import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-education-levels-panel',
  templateUrl: 'education-levels-panel.html',
})
export class EducationLevelsPanelPage {

  EducationLevels:any=[]
  dir:boolean
  constructor(public navCtrl: NavController,private viewCtrl:ViewController,
              public navParams: NavParams,private panel:ControlpanelProvider,
              private plt:Platform,private helper:HelperProvider,private alertCtrl:AlertController,private translate:TranslateService) {

                this.dir=this.plt.isRTL
                this.helper.presentLoading()
                this.panel.GetEducationLevel().subscribe(
                  (res:any)=>{
                  this.EducationLevels=res
                  this.helper.dismissLoading()
                },(err:any)=>{
                  this.helper.dismissLoading()
                })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationLevelsPanelPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  ionViewDidEnter(){
    this.panel.GetEducationLevel().subscribe(
      (res:any)=>{
      this.EducationLevels=res
    },(err:any)=>{
    })
  }

  delete(ID){
    const alert = this.alertCtrl.create({
      subTitle: this.translate.instant("Do you want to delete this Level?"),
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
            this.helper.presentLoading()
            this.panel.DeleteEducationLevel(ID).subscribe((res:any)=>{
              this.panel.GetEducationLevel().subscribe(
                (res:any)=>{
                this.EducationLevels=res
                 this.helper.dismissLoading()
              },(err:any)=>{
                this.helper.dismissLoading()
              })
            })
          }
        }
      ]
    });
    alert.present();

}

edit(ID,EducationNameAr,EducationNameEn){
  console.log(EducationNameAr+"  "+EducationNameEn)
  this.navCtrl.push('EducationLevelCreateEditPage',
  {
    'id':ID,
    'NameEn':EducationNameEn,
    'NameAr':EducationNameAr
  })
}

AdminProfile(_Fk_AdminID){
  this.navCtrl.push('ClientProfilePage',{'user_id':_Fk_AdminID})
}


addNewLevel(){
  this.navCtrl.push('EducationLevelCreateEditPage')
}

adminProfile(_Fk_AdminID){
  this.navCtrl.push('ClientProfilePage',{'user_id':_Fk_AdminID})
}

}
