import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController, ModalController } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';
import { ClientProvider } from '../../providers/client/client';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';

@IonicPage()
@Component({
  selector: 'page-upgrade-request-details',
  templateUrl: 'upgrade-request-details.html',
})
export class UpgradeRequestDetailsPage {
  isopen:boolean
  testforms:any[]
  test1:any
  upgrdeID:any
  FK_User_ID:any
  RequestDetailsLogs:any[]=[]
  dir:boolean
  languages:any[]=[]
  user_frist_name:any
  user:any
  UpgReqDetails:any={}
  UserCV:any
  UserName:any
  UpgReqResult:any
  NOResult:boolean
  Reviewer:string=''
  RequestDetailsLastLog:any={}

  constructor(private plt:Platform, public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
              private admin:AdminProvider,private testform:UpgradeRequestsProvider, public general:GeneralProvider,
              public upgradeService:UpgradeRequestsProvider,
              private user1:ClientProvider,public toastCtrl:ToastController,private androidPermissions: AndroidPermissions,
              private transfer: FileTransfer,private file: File,public modalCtrl:ModalController,private storage:Storage) {

                   this.dir=this.plt.isRTL
                   this.UserCV=this.navParams.get('CV');
                   this.UserName=this.navParams.get('name');

                   console.log(this.navParams.get('CV'))
                   console.log(this.navParams.get('name'))
                   this.upgrdeID=this.navParams.get('UpgReq_ID')
                   console.log(this.upgrdeID)
                  
                this.user1.GetUserDataByUserID( this.navParams.get('FK_User_ID') ).subscribe(
                        (res:any)=>{
                          this.user_frist_name=res.dt[0].User_Full_Name
                          this.user=res.dt[0].User_Full_Name.charAt(0)
                        },(err:any)=>{}
                )

                this.upgradeService.GetUpgradeRequestByReqID(this.upgrdeID).subscribe(
                      (res:any)=>{
                        if(res!="لا توجد طلبات متاحة فى هذا التوقيت"){
     
                           this.RequestDetailsLogs=res
                           this.RequestDetailsLastLog=this.RequestDetailsLogs[this.RequestDetailsLogs.length-1]
                      
                          this.NOResult=false
                        }else{
                          this.UpgReqResult=res
                          this.NOResult=true
                        }
                  },(err:any)=>{})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeRequestDetailsPage');
  }


  open_client_profile(){
    this.navCtrl.push('ClientProfilePage',{'user_id': this.navParams.get('FK_User_ID')})
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  download(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if(status.hasPermission) {
        const fileTransfer:FileTransferObject=this.transfer.create()
        let path=this.file.externalRootDirectory +'Download/' + this.UpgReqDetails.CV
        const url1 = encodeURI('http://kfal.careofme.net'+this.UpgReqDetails.CV)
        fileTransfer.download(url1,path ).then((entry) => {
          console.log('download complete  successed: ' + path);
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

  languageTests(langID,UpgReq_ID ){
    console.log("0000000"+ UpgReq_ID)
    const modal = this.modalCtrl.create('SendTestformPage',{'UpgReq_ID':UpgReq_ID,'lang':this.navParams.get('Language')});
    modal.present();
    modal.onDidDismiss((data)=>{
      this.viewCtrl.dismiss()
    })
  }

  Directactionforupgradebyadmin(upgID,status,Notes ){
    this.storage.get("Trans_user_id").then((val)=>{
      if(val){
        this.testform.Directactionforupgradebyadmin( this.upgrdeID,status, Notes+":"+val ).subscribe(
          (res:any)=>{
            if(res=="تم بنجاح"){
              this.viewCtrl.dismiss()
            }
          },(err:any)=>{
          }
        )
      }
    })
  }


  adminFinalDescion(requestDetailsID,status){
    this.testform.UpgradeRequestDetailsAdmin(requestDetailsID ,status).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }



}
