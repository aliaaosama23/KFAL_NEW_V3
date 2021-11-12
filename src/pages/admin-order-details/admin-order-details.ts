import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, ModalController, LoadingController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PopoverController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { GeneralProvider } from '../../providers/general/general';
import { AdminProvider } from '../../providers/admin/admin';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';

@IonicPage()
@Component({
  selector: 'page-admin-order-details',
  templateUrl: 'admin-order-details.html',
})
export class AdminOrderDetailsPage {
  request_status:number
  complete:boolean=false
  rate:number=0
  comment:any;
  dir:boolean
  filechoose:boolean=false
  RequestID:any
  RequestType:string=""
  ProviderType:string=""
  langFrom:string=""
  langTo:string=""
  RequestCode:any
  general_feild:any
  specific_feild:any
  file_level:any
  deadline:any
  number_of_pages:any
  expected_amount:any
  notices:any
  FileName:any

  languageFrom:any
  languageTo:any
  file_name:any
  take_action:boolean=true
  request_data:any={}
  no_file_uploaded:boolean=false
  language:any
  reason:any

  FilleName:any
  user_frist_name:string
  user:any
  UserId:any
  translatorId:any
  reviewerId:any
  constructor(public viewCtrl:ViewController,public user1:ClientProvider,public general:GeneralProvider,public admin:UpgradeRequestsProvider,
              public alertCtrl: AlertController,private iab: InAppBrowser,public popoverCtrl: PopoverController,
              public toastCtrl:ToastController,public platform:Platform,private file1:File,
              public loadingCtrl:LoadingController, public modalCtrl: ModalController,private storage: Storage,
              public translate: TranslateService,public navCtrl: NavController,private helper:HelperProvider,
              private androidPermissions: AndroidPermissions,private panel:ControlpanelProvider,
              private file: File, public navParams: NavParams) {

                this.dir=this.platform.isRTL
                this.FilleName=this.translate.instant("chooseFile")
                this.RequestID=this.navParams.get('Request_ID')
                this.RequestType=this.navParams.get('Request_type')
                console.log("type of request.."+ this.navParams.get('Request_type'))
                this.ProviderType=this.navParams.get('providerType')
                this.reason="sdshdsdsadsdsa"

                let loading=this.loadingCtrl.create({})
                loading.present()
                this.user1.GetRequestByID(this.navParams.get('Request_ID'))
                .subscribe((res:any[])=>{
                  loading.dismiss()
                  for(let i=0;i< res.length;i++)
                  {
                    if(res[i].Request_Date!=null){
                      res[i].Request_Date= moment(res[i].Request_Date).format('L');
                    }else{
                      res[i].Request_Date=null
                    }
                  }
                    this.request_data=res[0]  // set all request details
                   // console.log('request_data '+JSON.stringify(this.request_data))
                    this.RequestCode=res[0].RequestCode
                    this.UserId=res[0].FK_User_ID
                  //  console.log("admin request details => user id"+this.UserId)
                    this.translatorId=res[0].FK_Ttranslator_ID
                    this.reviewerId=res[0].FK_Reviewer_ID
                    this.request_status=res[0].FK_Request_Status_ID
                 //   console.log(this.request_status)
                  this.user1.GetUserDataByUserID(res[0].FK_User_ID).subscribe(
                    (res:any)=>{
                      this.user_frist_name=res.dt[0].User_Full_Name
                      this.user=res.dt[0].User_Full_Name.charAt(0)
                    },(err:any)=>{})

                  this.GetLanguages()

                  if(this.request_data.Request_Orginal_File.substr(8)!=''  ){
                    this.FileName=this.request_data.Request_Orginal_File.substr(8)
                    this.FileName=this.FileName.substring(0, this.FileName.indexOf('.'))
                  }else{
                      this.no_file_uploaded=true
                  }

                  this.GetRequestSpecification()

                this.panel.GetEducationLevel().subscribe(
                  (val:any[])=>{
                      val.forEach(elem=>{
                        if(elem._EducationLevel_ID == this.request_data.FK_EducationLevelID){
                          if(this.dir==true){
                            this.file_level=elem.EducationNameAr
                          }else{
                            this.file_level=elem.EducationNameEn
                          }
                        }
                      })
                  },(err)=>{})

                if(res[0].FK_Request_Status_ID==13){
                      this.complete=true
                    this.user1.GetFeedbackForRequest(this.navParams.get('Request_ID')).subscribe(
                          (res:any)=>{
                            this.rate=res[0].RateNumber
                            this.comment=res[0].Comments
                          },
                          (err:any)=>{
                          }
                        )
                }

    },(err:any)=>{
      loading.dismiss()
    })


  }

  GetRequestSpecification(){
    this.general.GetParentSp().subscribe(
      (val:any[])=>{
          val.forEach(elem=>{
            if(elem.ID == this.request_data.Fk_SpecializationParentID){
              this.general_feild=elem.SpecializationName
            }
          })
      },(err)=>{})

    this.general.GetChildSp(this.request_data.Fk_SpecializationParentID).subscribe(
      (val:any[])=>{
          val.forEach(elem=>{
            if(elem.ID == this.request_data.FK_SpecializationChildID){
              this.specific_feild=elem.SpecializationName
            }
          })
      },(err)=>{})
  }

  GetLanguages(){
    this.helper.presentLoading()
    this.panel.GetLanguages().subscribe(
      (val:any[])=>{
         this.helper.dismissLoading()
          val.forEach(elem=>{
            if(elem.Lang_ID == this.request_data.FK_Original_Lang_ID){
              if(this.platform.isRTL){
                this.langFrom=elem._Lang_NameAr
              }else{
                this.langFrom=elem._Lan_Name_En
              }
            }
            if(elem.Lang_ID== this.request_data.FK_Target_Lang_ID){
              if(this.platform.isRTL){
                this.langTo=elem._Lang_NameAr
              }else{
                this.langTo=elem._Lan_Name_En
              }
            }
          })
      },(err)=>{
        this.helper.dismissLoading()
      })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOrderDetailsPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  filePreview(){
       this.iab.create("http://kfal.careofme.net"+this.request_data.Request_Orginal_File,'_system','location=yes');
  }

   // request status is   1 or 3
  open_client_profile(){
    this.navCtrl.push('ClientProfilePage',{'user_id': this.UserId})
  }

   // request status is not  1 or 3
  chooseAccount(myEvent){
    let popover = this.popoverCtrl.create('ToggleAcountPage',
        {
          'userId':this.UserId,
          'translatorId':this.translatorId,
          'reviewerId':this.reviewerId
        });
    popover.present({
      ev: myEvent
    });
  }

  accept(){
      this.storage.get('Trans_user_id').then((val:any)=>{
        this.admin.UpdateRequestToApproveByAdmin(val,this.navParams.get('Request_ID'),3)
        .subscribe(
          (res:any)=>{
            if(res=="تم الموافقة على الطلب بنجاح و تحويله الى الترجمة"){
              let toast = this.toastCtrl.create({
                message: this.translate.instant("this request is accepted and forward for translation"),
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.navCtrl.setRoot('AdminHomePage');
              })
            }

          },
          (err:any)=>{
          }
        )
    })
  }

  refuse(){// send status to know type refuse or accept
      this.storage.get('Trans_user_id').then((val:any)=>{
        this.admin.UpdateRequestToRefusedByAdmin (val,this.navParams.get('Request_ID'),14)
        .subscribe(
          (res:any)=>{
            if(res=="تم رفض الطلب "){
              let toast = this.toastCtrl.create({
                message: this.translate.instant("Request refused by admin"),
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.viewCtrl.dismiss()
              })
            }

          },
          (err:any)=>{
          }
        )
    })
  }

  
}
