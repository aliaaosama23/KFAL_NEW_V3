import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, Platform } from 'ionic-angular';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { HelperProvider } from '../../providers/helper/helper';
import {Storage} from '@ionic/storage';
import { GeneralProvider } from '../../providers/general/general';

@IonicPage()
@Component({
  selector: 'page-specialization-create-edit',
  templateUrl: 'specialization-create-edit.html',
})
export class SpecializationCreateEditPage {
   id:any
   spName:any
   parentID:any=null
   ISEditing:boolean
   dir:boolean
  constructor(public navCtrl: NavController, private plt:Platform,
              public navParams: NavParams,private helper:HelperProvider,private viewCtrl:ViewController,
              private controlpanel:ControlpanelProvider,private storage:Storage,private toastCtrl:ToastController) {
                
                this.dir=this.plt.isRTL
                this.parentID=this.navParams.get('parentID')
                console.log( "===="+ this.parentID)
                if(this.navParams.get('id')!=undefined){
                    console.log(this.navParams.get('id'))
                    this.id=this.navParams.get('id')
                    this.spName=this.navParams.get('spName')
                    console.log(this.id +" "+this.spName)
                    this.ISEditing=true
                  }else{
                    this.ISEditing=false
                  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecializationCreateEditPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }


  AddSpecialization(){

    this.storage.get("Trans_user_id").then((val:any)=>{
      if(val){
        this.helper.presentLoading()
        this.controlpanel.AddSpecialization(this.spName,this.parentID,val).subscribe(
          (res:any)=>{
            if(res=="تم الحفظ بنجاح"){
              this.helper.dismissLoading()
              let toast = this.toastCtrl.create({
                message:res,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.viewCtrl.dismiss()
              })
            }
          },(err:any)=>{

          }
        )
      }

    })


  }

  EditSpecialization(){
    this.helper.presentLoading()
    this.storage.get("Trans_user_id").then((adminID)=>{
      if(adminID){
    this.controlpanel.UpdateSpecialization(this.id,this.spName,this.parentID,adminID) .subscribe(
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
