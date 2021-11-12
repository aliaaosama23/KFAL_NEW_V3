import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams, ModalController, LoadingController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ClientProvider } from '../../providers/client/client';
import { GeneralProvider } from '../../providers/general/general';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
@IonicPage()
@Component({
  selector: 'page-client-order-details',
  templateUrl: 'client-order-details.html',
})
export class ClientOrderDetailsPage {

  langFrom:string=""
  langTo:string=""
  RequestCode:any
  UserID:any
  TranslatorID:any
  general_feild:any
  specific_feild:any
  file_level:any
  deadline:any
  number_of_pages:any
  expected_amount:any
  notices:any
  FileName:any
  RequestType:string=""

  specialization:any
  languageFrom:any
  languageTo:any
  file_name:any
  request_type:any
  take_action:boolean=true
  request_data:any={}
  no_file_uploaded:boolean=false
  language:any
  reason:any
  dir:boolean
  request_status:any=0
  rate:number=0
  comment:string=""
  RequestID:number
  constructor(public viewCtrl:ViewController, public user:ClientProvider,public general:GeneralProvider,
    public toastCtrl:ToastController,public platform:Platform,public alertCtrl:AlertController,
     public loadingCtrl:LoadingController, public modalCtrl: ModalController,private storage: Storage,
     public translate: TranslateService,public navCtrl: NavController,private androidPermissions: AndroidPermissions,
     private transfer: FileTransfer,private panel:ControlpanelProvider,
     private file: File, public navParams: NavParams) {
      this.RequestID=this.navParams.get('request_id')
      console.log('Request id is '+this.RequestID)
      this.dir=this.platform.isRTL
        this.RequestType=this.navParams.get('request_type')
        let loading=this.loadingCtrl.create({})
        loading.present()
        this.user.GetRequestByID(this.navParams.get('request_id'))
        .subscribe((res:any[])=>{
          for(let i=0;i< res.length;i++)
          {
            if(res[i].Request_Date!=null){
              res[i].Request_Date= moment(res[i].Request_Date).format('L');
            }else{
              res[i].Request_Date=null
            }
          }
          this.request_data=res[0]
          this.request_status=this.request_data.FK_Request_request_status_ID
          this.panel.GetLanguages().subscribe(
            (val:any[])=>{
                val.forEach(elem=>{
                  if(elem.Lang_ID== this.request_data.FK_Original_Lang_ID){
                    if(this.platform.isRTL){
                      this.langFrom=elem._Lang_NameAr
                    }else{
                      this.langFrom=elem._Lan_Name_En
                    }
                  }
                  if(elem.Lang_ID == this.request_data.FK_Target_Lang_ID){
                    if(this.platform.isRTL){
                      this.langTo=elem._Lang_NameAr
                    }else{
                      this.langTo=elem._Lan_Name_En
                    }
                  }

                })
            },(err)=>{})

          this.general.GetParentSp().subscribe(
            (val:any[])=>{
                val.forEach(elem=>{
                  if(elem.ID == this.request_data.Fk_SpecializationParentID){
                    this.general_feild=elem.SpecializationName
                  }
                })
            },(err)=>{}
          )

          this.general.GetChildSp(this.request_data.Fk_SpecializationParentID).subscribe(
            (val:any[])=>{
                val.forEach(elem=>{
                  if(elem.ID == this.request_data.FK_SpecializationChildID){
                    this.specific_feild=elem.SpecializationName
                  }
                })
            },(err)=>{}
          )


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

            this.user.GetFeedbackForRequest(this.navParams.get('request_id')).subscribe(
              (res:any)=>{
                this.rate=res[0].RateNumber
                this.comment=res[0].Comments
              },
              (err:any)=>{
              }
            )
            this.RequestCode=res[0].RequestCode
            this.UserID=res[0].FK_User_ID
            this.TranslatorID=res[0].FK_Ttranslator_ID
          if(this.request_data.Request_Orginal_File.substr(8)!=''  ){
            this.FileName=this.request_data.Request_Orginal_File.substr(8)
           // this.FileName=this.FileName.substring(0, this.FileName.indexOf('.'))
          }else{
              this.no_file_uploaded=true
          }

          loading.dismiss()

        },(err:any)=>{
          loading.dismiss()
        })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientOrderDetailsPage');
  }

  filePreview(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          .then(request_status => {
            if(request_status.hasPermission) {
              const fileTransfer:FileTransferObject=this.transfer.create()
              let path=this.file.externalRootDirectory +'Download/' + this.request_data.Request_Orginal_File
              const url1 = encodeURI('http://kfal.careofme.net'+this.request_data.Request_Orginal_File)
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

  
// downloadDoc(doc: Document) {
// 	this.doc = doc;

//     this.file.createDir(this.file.externalRootDirectory, 'my_downloads', false).then(response => {
// 		console.log('Directory created',response);
// 		const fileTransfer: TransferObject = this.transfer.create();
// 	    fileTransfer.download(this.doc.url,this.file.externalRootDirectory + '/my_downloads/' + this.doc.name + '.docx').then((entry) => {
// 	    	console.log('file download response',entry);
// 	    })
// 	    .catch((err) =>{
// 	    	console.log('error in file download',err);
// 	    });

// 	}).catch(err => {
// 		console.log('Could not create directory "my_downloads" ',err);
// 	}); 
//  }

  acceptReceivedRequest(){
    let Modal = this.modalCtrl.create('ClientOrderFeedbackPage',{'type':'acceptReceivedRequest','request_id':this.navParams.get('request_id')} );
     Modal.present();
  }

  refuseReceivedRequest(){
    let Modal = this.modalCtrl.create('ClientOrderFeedbackPage',{'type':'refuseReceivedRequest','request_id':this.navParams.get('request_id')} );
    Modal.present();
  }

  TranslatorContact(){
    this.storage.get('Trans_user_id').then((val:any)=>{
    this.navCtrl.push('ChatPage',{
      'RequestCode':this.RequestCode,
      'UserId':val,
      'TranslatorId':this.TranslatorID
    })
  })
  }

  CancelRequest(){
  // call api to cancel request
    this.user.cancel_new_request(this.navParams.get('request_id'),this.RequestCode).subscribe(
      (res:any)=>{

          let toast = this.toastCtrl.create({
              message:res.RequestCode,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            toast.onDidDismiss(() => {
              this.viewCtrl.dismiss()
          });
      },
      (err:any)=>{
        // cancellation done successfully
      }
    )
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
    console.log('event emitter emit from parent')
    // call api to edit this request as soon as it is new
    this.navCtrl.push('ClientOrderEditPage',
        {
          'request_id':this.request_data.Request_ID
        }
    )
  }

}
