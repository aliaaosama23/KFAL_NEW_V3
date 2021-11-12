import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as moment from 'moment';
import { AdminProvider } from '../../providers/admin/admin';
import { ClientProvider } from '../../providers/client/client';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';
import { isThisTypeNode } from 'typescript';

@IonicPage()
@Component({
  selector: 'page-upgrade-requests',
  templateUrl: 'upgrade-requests.html',
})
export class UpgradeRequestsPage {
  languages: any[] = []
  upgradeRequests: any[] = []
  providerRequests: any[] = []
  academicReviewerRequests: any[] = []
  filteredarray: any[] = []
  dir: boolean
  acceptStatus: boolean
  requestStatus: boolean
  nodata: boolean = false
  waitingAcceptUpgRequests: any[] = []
  language: number = 1
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public admin: AdminProvider, private panel: ControlpanelProvider,
              public viewCtrl: ViewController, public translate: TranslateService, 
              public toastCtrl: ToastController, private UpgReqService: UpgradeRequestsProvider,
              private androidPermissions: AndroidPermissions, private transfer: FileTransfer,
              public user: ClientProvider,private file: File, public platform: Platform,
              private testforms: TestformsProvider, private loadingCtrl: LoadingController,
              private upgradeService: UpgradeRequestsProvider) {

                    this.dir = this.platform.isRTL

                    this.chooseLanguage(this.language);

                    let loading = this.loadingCtrl.create({
                      spinner: 'Show ios',
                    })
                    loading.present()
                    this.panel.GetLanguages().subscribe((res: any) => {
                      loading.dismiss()
                      this.languages = res
                    }, (err: any) => {
                      loading.dismiss()
                    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeRequestsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  requestDetails(FK_User_ID, CV, user_name) {
    console.log("user :" + FK_User_ID)
    console.log("cv is :" + CV)

    this.navCtrl.push('UpgradeRequestDetailsPage',
      {
        'FK_User_ID': FK_User_ID,
        'cv': CV,
        'name': user_name,
        //'RequestID':
      }
    )
  }

  // admin accept this request
  changeStatus(ReqID, status) {
    this.UpgReqService.AdminAcceptUpgradeRequests(ReqID, moment(new Date()).format('llll'), true).subscribe(
      (res: any) => {
        const toast = this.toastCtrl.create({
          message: res,
          duration: 3000
        });
        toast.present();
        toast.onDidDismiss(() => {
          this.upgradeService.GetAllUpgradeRequests().subscribe(
            (res: any) => {
              if (res == "لا توجد طلبات متاحة فى هذا التوقيت") {
                this.nodata = true
              } else {
                this.nodata = false
                this.upgradeRequests = res

                for (let i = 0; i < this.upgradeRequests.length; i++) {
                  this.upgradeRequests[i].username = ""
                  this.upgradeRequests[i].status = false
                }

                for (let i = 0; i < this.upgradeRequests.length; i++) {
                  if (this.upgradeRequests[i].User_Type_Old == 1) {
                    this.upgradeRequests[i].status = false
                  } else {
                    this.upgradeRequests[i].status = true
                  }
                  this.upgradeRequests[i].CV = this.upgradeRequests[i].CV.substr(8)
                }

                // get all users and replace user id in request by his name
                for (let i = 0; i < this.upgradeRequests.length; i++) {
                  this.user.GetUserDataByUserID(this.upgradeRequests[i].FK_User_ID).subscribe(
                    (res: any[]) => {
                      this.upgradeRequests[i].username = res[0].User_Full_Name
                    }, (err: any) => {
                    }
                  )
                }

              }


            }, (err: any) => { })
        })
      }, (err: any) => {

      }
    )
  }


  downloadFile(CV) {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          const fileTransfer: FileTransferObject = this.transfer.create()
       //   let file_path = this.file.dataDirectory
          let path = this.file.externalRootDirectory + 'Download/' + CV
          const url1 = encodeURI('http://kfal.careofme.net' + CV)
          fileTransfer.download(url1, path).then((entry) => {
            console.log('download complete: ' + JSON.stringify(entry));
            const toast = this.toastCtrl.create({
              message: 'downloaded successfully',
              duration: 3000
            });
            toast.present();

          }, (error) => {
            const toast = this.toastCtrl.create({
              message: JSON.stringify(error),
              duration: 3000
            });
            toast.present();
          });

        }
      });
  }

  doRefresh(refresher) {
    this.dir = this.platform.isRTL

    this.chooseLanguage(this.language);
    
    this.panel.GetLanguages().subscribe((res: any) => {
      this.languages = res
      refresher.complete();
    }, (err: any) => {
      refresher.complete();
    })

  }

  UpgradeRequestDetails(UpgReq_ID, FK_User_ID, CV, lang) {
    console.log('request details  :  ' + UpgReq_ID, FK_User_ID, CV, lang)
    console.log('language is  : ' + this.language)
    if (this.language == undefined) {
      this.navCtrl.push('UpgradeRequestDetailsPage',
        {
          'UpgReq_ID': UpgReq_ID,
          'FK_User_ID': FK_User_ID,
          'CV': CV,
          'Language': lang
        })
    } else {
      this.navCtrl.push('UpgradeRequestDetailsPage',
        {
          'UpgReq_ID': UpgReq_ID,
          'FK_User_ID': FK_User_ID,
          'CV': CV,
          'Language': this.language
        })
    }

  }

  chooseLanguage(language) {
    console.log('call choose language :  ' + this.language)
    this.UpgReqService.GetUpgradeRequestsByLangID(language).subscribe(
      (res: any) => {
        //console.log(JSON.stringify(res))
        res=="لا توجد طلبات متاحة فى هذا التوقيت" ? this.upgradeRequests = [] : this.upgradeRequests = res
           
      }, (err: any) => {
        console.log(JSON.stringify(err))
      }
    )
  }

}
