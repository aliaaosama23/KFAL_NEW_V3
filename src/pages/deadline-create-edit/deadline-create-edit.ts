import { HelperProvider } from './../../providers/helper/helper';
import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-deadline-create-edit',
  templateUrl: 'deadline-create-edit.html',
})
export class DeadlineCreateEditPage {

  IsEditing:boolean
  _Hour:number=0
  _Price:number=0
  deadlineID:any
  dir:boolean
  constructor(public navCtrl: NavController,private plt:Platform, public navParams: NavParams,private viewCtrl:ViewController,
    private panel:ControlpanelProvider,private helper:HelperProvider) {
      this.dir=this.plt.isRTL
      if(this.navParams.get('id')!=undefined){
        console.log(this.navParams.get('id'))
        this.deadlineID=this.navParams.get('id')
        this._Hour=this.navParams.get('hour')
        this._Price=this.navParams.get('price')
      console.log(this._Hour+"  "+this._Price)
        this.IsEditing=true
      }else{
        this.IsEditing=false
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeadlineCreateEditPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  AddDeadline(){
    this.helper.presentLoading()
    this.panel.AddDeadlineHours(this._Hour,this._Price).subscribe(
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

  EditDeadline(){
    this.helper.presentLoading()
    this.panel.UpdateDeadlineHours(this.deadlineID,this._Hour,this._Price).subscribe(
      (res:any)=>{
        if(res=="تم التعديل بنجاح"){
          this.helper.dismissLoading()
          this.viewCtrl.dismiss()
        }

      },(err:any)=>{
        this.helper.dismissLoading()
      }
    )
  }
}
