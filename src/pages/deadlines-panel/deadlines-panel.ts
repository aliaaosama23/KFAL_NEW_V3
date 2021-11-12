import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { GeneralProvider } from '../../providers/general/general';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-deadlines-panel',
  templateUrl: 'deadlines-panel.html',
})
export class DeadlinesPanelPage {

  Deadlines:any[]=[]
  dir:boolean
  constructor(public navCtrl: NavController, public navParams: NavParams,private general:GeneralProvider,private translate:TranslateService,
    private helper:HelperProvider,private viewCtrl:ViewController, private plt:Platform,private panal:ControlpanelProvider,private alertCtrl:AlertController ) {

      this.dir=this.plt.isRTL

    this.helper.presentLoading()
    this.panal.GetAllDeadlineHours().subscribe(
      (res:any)=>{
        this.Deadlines=res
        this.helper.dismissLoading()
      },(err:any)=>{
        this.helper.dismissLoading()
      }
    )
  }

  ionViewDidEnter(){
    this.panal.GetAllDeadlineHours().subscribe(
      (res:any)=>{
        this.Deadlines=res
      },(err:any)=>{
      }
    )
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  delete(ID){
    const alert = this.alertCtrl.create({
      subTitle: this.translate.instant("Do you want to delete this Deadline ?"),
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
            this.panal.DeleteDeadlineHours(ID).subscribe(
              (res:any)=>{
                this.helper.presentLoading()
                this.panal.GetAllDeadlineHours().subscribe(
                  (res:any)=>{
                    this.Deadlines=res
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

edit(Id,hour,price){
  console.log(hour+"  "+price)
  this.navCtrl.push('DeadlineCreateEditPage',
  {
    'id':Id,
    'hour':hour,
    'price':price
  })
}

addNewDeadline(){
  this.navCtrl.push('DeadlineCreateEditPage')
}
}
