import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-specialization-panel',
  templateUrl: 'specialization-panel.html',
})
export class SpecializationPanelPage {
  GeneralFeild:any
  dir:boolean
  GeneralFeilds:any=[]
  SpecificFeilds:any=[]
  isSelected:boolean=false
  noSpecificFeilds:any=''
  fristGeneralFeildID:number
  constructor(public navCtrl: NavController,private viewCtrl:ViewController, public navParams: NavParams,private panel:ControlpanelProvider,private translate:TranslateService,
    private helper:HelperProvider,private plt:Platform,private loadingCtrl:LoadingController,private alertCtrl:AlertController ) {

      this.dir=this.plt.isRTL

    this.helper.presentLoading()
    this.panel.GetParentSp().subscribe(
      (res:any)=>{
        this.GeneralFeilds=res
        this.GeneralFeild=this.GeneralFeilds[0].ID
        console.log('frsit id : '+this.GeneralFeild)
        
        this.helper.dismissLoading()
      },(err:any)=>{
        this.helper.dismissLoading()
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecializationPanelPage');
  }

  ionViewDidEnter(){
    this.panel.GetParentSp().subscribe(
      (res:any)=>{
        this.GeneralFeilds=res
        console.log("did enter"+ this.GeneralFeild)
        if(this.GeneralFeild!=undefined ){
           this.chooseFeild()
        }
      },(err:any)=>{
      }
    )
  }

  chooseFeild(){
        this.isSelected=true
        let loading=this.loadingCtrl.create({})
        loading.present()
      this.panel.GetChildSp(this.GeneralFeild).subscribe(
        (res:any)=>{
        loading.dismiss()
          if(typeof(res)!='string'){
            this.SpecificFeilds=res
          }else{
             this.noSpecificFeilds=res
          }
      },(err:any)=>{
        loading.dismiss()
      })
      console.log(this.isSelected)
  }

  delete(ID){
    const alert = this.alertCtrl.create({
      subTitle: this.translate.instant("Do you want to delete this specialization ?"),
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
            this.panel.DeleteSpecialization(ID) .subscribe(
              (res:any)=>{
                this.helper.presentLoading()
                this.panel.GetChildSp(this.GeneralFeild).subscribe(
                  (res:any)=>{
                    this.SpecificFeilds=res
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


  edit(Id,spName){
    console.log(Id,spName)
    this.navCtrl.push('SpecializationCreateEditPage',
    {
      'id':Id,
      'spName':spName,
      'parentID':this.GeneralFeild
    })
  }

  AdminProfile(_Fk_AdminID){
    this.navCtrl.push('ClientProfilePage',{'user_id':_Fk_AdminID})
  }


  addNewSpecialization(){
    this.navCtrl.push('SpecializationCreateEditPage')
  }

  addNewSpecializationchild(){
    this.navCtrl.push('SpecializationCreateEditPage',{'parentID':this.GeneralFeild})
  }
  
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
