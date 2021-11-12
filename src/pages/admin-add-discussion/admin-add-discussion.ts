import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GeneralProvider } from '../../providers/general/general';
import { AdminProvider } from '../../providers/admin/admin';
import { Storage } from '@ionic/storage';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';


@IonicPage()
@Component({
  selector: 'page-admin-add-discussion',
  templateUrl: 'admin-add-discussion.html',
})
export class AdminAddDiscussionPage {
  //saturation:number=100
  general_feilds: any[] = []
  specific_feilds: any[] = []
  general_feild_id: any
  dir: boolean
  spicific_feild_id: any
  GeneralFeild: any
  SpecificFeild: any
  Languages: any[] = []
  age: number
  TopicName: string
  TopicContent: string
  language: any
  constructor(public general: GeneralProvider, public admin: AdminProvider, private storage: Storage,
    private toastCtrl: ToastController, public viewCtrl: ViewController, public platform: Platform,
    public loadingCtrl: LoadingController, public translate: TranslateService, public navCtrl: NavController,
    public navParams: NavParams, private panel: ControlpanelProvider) {
    this.dir = this.platform.isRTL
    // call api to get all available general_feilds
    this.general.GetParentSp().subscribe((res: any) => { this.general_feilds = res }, (err: any) => { })

    let loading = this.loadingCtrl.create({})
    loading.present()
    this.panel.GetLanguages().subscribe((res: any[]) => {
      this.Languages = res
      loading.dismiss()
    }, (err: any) => {
      loading.dismiss()
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddDiscussionPage');
  }

  select_general_feild() {
    let loading = this.loadingCtrl.create({})
    loading.present()
    this.general.GetChildSp(this.GeneralFeild).subscribe((res: any) => {
      loading.dismiss()
      this.specific_feilds = res
    }, (err: any) => {
      loading.dismiss()
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  publishDiscussion() {
    this.storage.get('Trans_user_id').then(val => {
      if (val) {
        this.admin.AddNewTopic(this.TopicName, this.TopicContent, this.GeneralFeild, this.SpecificFeild, this.language, this.age, val).subscribe(
          (res: any) => {
            if (res == "تمت الاضافة بنجاح ") {
              this.viewCtrl.dismiss()
            } else {
              let toast = this.toastCtrl.create({
                message: res,
                duration: 3000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                this.viewCtrl.dismiss()
              });

              toast.present();
            }

          }, (err: any) => {

          })
      }
    })

  }

}
