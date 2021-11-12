import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TranslateService } from '@ngx-translate/core';
import { GeneralProvider } from '../../providers/general/general';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';
@IonicPage()
@Component({
  selector: 'page-upgrade-track',
  templateUrl: 'upgrade-track.html',
})
export class UpgradeTrackPage {
  upgradeReqDetails:any
  dir:boolean
  upgradeupgradeService:any[]
  FilleName: any;
  UpgReqDetails_ID:any
  languages:any[]
  nodata:boolean=true
  result:string=''
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl:LoadingController,private storage:Storage,private general:GeneralProvider,
              public viewCtrl:ViewController,public plt:Platform, private androidPermissions: AndroidPermissions,
              private transfer: FileTransfer,public toastCtrl:ToastController,private file1:File,private panel:ControlpanelProvider,
              private file: File,private upgradeService:UpgradeRequestsProvider,private translate:TranslateService) {

                this.FilleName=this.translate.instant("uploadTranslatedTest")
                this.dir=this.plt.isRTL

                this.panel.GetLanguages().subscribe(
                  (res:any)=>{
                    this.languages=res
                  }
                )


                this.storage.get('Trans_user_id').then(val=>{
                  if(val){
                    let loading=this.loadingCtrl.create({})
                    loading.present()
                    this.upgradeService.GetUpgradeRequestDetailsByUserID(val).subscribe(
                      (res:any)=>{

                        if(typeof(res)=='string'){
                              this.nodata=true
                              this.result=res
                        }else{

                              this.nodata=false
                        this.upgradeupgradeService=res

                        for(let i=0;i<this.upgradeupgradeService.length;i++){
                          this.upgradeupgradeService[i].languageAR=''
                          this.upgradeupgradeService[i].languageEN=''
                        }


                        for(let i=0;i<this.upgradeupgradeService.length;i++){
                          for(let j=0;j<this.languages.length;j++){
                            if(this.languages[j].Lang_ID==this.upgradeupgradeService[i].Lang_ID  ){
                                       this.upgradeupgradeService[i].languageAR=this.languages[j]._Lang_NameAr
                                       this.upgradeupgradeService[i].languageEN=this.languages[j]._Lan_Name_En
                            }
                          }
                        }

                        console.log("tests:  "+JSON.stringify(this.upgradeupgradeService))

                        this.upgradeReqDetails=res[0].UpgReq_ID
                        this.UpgReqDetails_ID=res[0].UpgReqDetails_ID
                      }

                          loading.dismiss()


                      },(err:any)=>{
                          loading.dismiss()
                      }
                    )
                  }else{

                  }
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeTrackPage');
  }


  dismiss(){
    this.viewCtrl.dismiss()
  }


  download(TestForm){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if(status.hasPermission) {
        const fileTransfer:FileTransferObject=this.transfer.create()
        let path=this.file.externalRootDirectory +'Download/' +TestForm
        const url1 = encodeURI('http://kfal.careofme.net'+TestForm)
        fileTransfer.download(url1,path ).then((entry) => {
          console.log('download complete: ' + path);
          const toast = this.toastCtrl.create({
          message: 'downloaded successfully',
          duration: 3000
          });
          toast.present();

        }, (error) => {
          console.log("download error"+JSON.stringify(error))
        });

      }
    });
  }

  handleFileInput(src,files,test) {
    this.FilleName= document.getElementById("uploadFile");
    this.FilleName= src.target.files[0].name
    if(src.target.files && src.target.files[0]){
      console.log("file uploaded   :"+  src.target.files[0])
      var file=src.target.files[0]
      this.file1= file
      let reader = new FileReader();
      reader.onload = (event:any) => {
       // this.base64Image= event.target.result;
      }
      reader.readAsDataURL(src.target.files[0]);
      console.log(test)
    }

   }

   send(){
    this.upgradeService.UpgradeRequestDetailsUserTranslatedTestForm(this.UpgReqDetails_ID,this.file1).subscribe(
      (res:any)=>{
        let toast=this.toastCtrl.create({
          'message':res,
          'duration':3000
        })
        toast.present()
        toast.onDidDismiss(()=>{
                  this.viewCtrl.dismiss()
        })
      },(err:any)=>{

      }
    )
   }

   recieve(){
      this.upgradeService.UpgradeRequestDetailsUser(this.UpgReqDetails_ID).subscribe(
        (res:any)=>{
          let toast=this.toastCtrl.create({
            'message':res,
            'duration':3000
          })
          toast.present()
          toast.onDidDismiss(()=>{
          })
        },(err:any)=>{

        }
      )
   }

}
