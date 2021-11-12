import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController, AlertController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';


@IonicPage()
@Component({
  selector: 'page-translated-test-for-reviewer',
  templateUrl: 'translated-test-for-reviewer.html',
})
export class TranslatedTestForReviewerPage {
  UpgReqDetailsID:any
  TranslatedTestForm:any
  FK_UpgReq_ID:any
  dir:boolean
  lang:any
  giveFeedback:boolean=false
  comment:any
  placeholder:any
  reviewStatus:boolean
  constructor(public navCtrl: NavController, public navParams: NavParams,private plt:Platform,private viewCtrl:ViewController,
              private androidPermissions: AndroidPermissions,private file: File,private transfer: FileTransfer,
              private toastCtrl:ToastController ,private testforms:UpgradeRequestsProvider,public storage:Storage,
              private alertCtrl:AlertController,private translate:TranslateService) {
''
                    this.dir=this.plt.isRTL
                    this.placeholder=this.translate.instant("enter your comment")
                    this.UpgReqDetailsID=this.navParams.get('UpgReqDetailsID')
                    this.TranslatedTestForm =this.navParams.get('TranslatedTestForm')
                    this.FK_UpgReq_ID=this.navParams.get('FK_UpgReq_ID')

                    console.log("id:----"+  this.navParams.get('UpgReqDetailsID'))
                    if(this.dir==true){
                      this.lang=this.navParams.get('lang_ar')
                    }else{
                      this.lang=this.navParams.get('lang_en')
                    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatedTestForReviewerPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  download(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if(status.hasPermission) {
        const fileTransfer:FileTransferObject=this.transfer.create()
        let path=this.file.externalRootDirectory +'Download/' +this.TranslatedTestForm
        const url1 = encodeURI('http://kfal.careofme.net'+this.TranslatedTestForm)
        fileTransfer.download(url1,path ).then((entry) => {
          console.log('download complete: ' + path);
          const toast = this.toastCtrl.create({
          message: 'downloaded successfully',
          duration: 3000
          });
          toast.present();

        }, (error) => {
        });

      }
    });
  }


  reviewerRecieve(){
    this.storage.get("Trans_user_id").then((val)=>{
      if(val!=null){
        this.testforms.UpgradeRequestDetailsReviewer(this.UpgReqDetailsID,val).subscribe(
          (res:any)=>{
            const toast = this.toastCtrl.create({
              message: res,
              duration: 3000
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.download()
              })
          }
        )
      }
    })
  }

 reviewerFeedback(status){
  this.giveFeedback=true
  this.reviewStatus=status
}

reviewerFinished(){
  this.testforms.UpgradeRequestDetailsReviewerFinishReview (this.UpgReqDetailsID,this.comment,this.reviewStatus).subscribe(
        (res:any)=>{
          const toast = this.toastCtrl.create({
            message: res,
            duration: 3000
            });
            toast.present();
            toast.onDidDismiss(()=>{
              this.viewCtrl.dismiss()
            })
        },(err:any)=>{

        })
}



}
