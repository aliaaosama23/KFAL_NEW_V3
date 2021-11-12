import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, ModalController, LoadingController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ProvidersProvider } from '../../providers/providers/providers';
import { ClientProvider } from '../../providers/client/client';
import { GeneralProvider } from '../../providers/general/general';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';

@IonicPage()
@Component({
  selector: 'page-translator-order-details',
  templateUrl: 'translator-order-details.html',
})
export class TranslatorOrderDetailsPage {
  filechoose:boolean=false
  Request_ID:any
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
  dir:boolean
  FilleName:any
  constructor(public viewCtrl:ViewController, public provider:ProvidersProvider,public alertCtrl: AlertController,
              public user:ClientProvider,public general:GeneralProvider,public toastCtrl:ToastController,private panel:ControlpanelProvider,
              public platform:Platform,private file1:File,public loadingCtrl:LoadingController, public modalCtrl: ModalController,
              private storage: Storage,public translate: TranslateService,public navCtrl: NavController,
              private androidPermissions: AndroidPermissions,private transfer: FileTransfer,private file: File,
              public navParams: NavParams) {

                    this.dir=this.platform.isRTL
                    console.log(this.dir)
                    this.FilleName=this.translate.instant("chooseFile")
                  this.Request_ID=this.navParams.get('Request_ID')
                  this.RequestType=this.navParams.get('Request_type')
                //  this.ProviderType=this.navParams.get('providerType')
                  this.storage.get("Trans_user_type").then((val:any)=>{
                    console.log("Trans_user_type  val"+val)
                    if(val==3){
                      this.ProviderType='translator'
                    }else  if(val==4){
                      this.ProviderType='Proofreader'
                    }
                  })
                this.reason="sdshdsdsadsdsa"
                console.log("Request_ID:"+this.Request_ID+"  RequestType:"+this.RequestType+"  ProviderType:"+this.ProviderType)

                let loading=this.loadingCtrl.create({})
                loading.present()
                this.user.GetRequestByID(this.navParams.get('Request_ID'))
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
                  this.panel.GetLanguages().subscribe(
                    (val:any[])=>{
                      loading.dismiss()
                        val.forEach(elem=>{
                          if(elem.Lang_ID== this.request_data.FK_Original_Lang_ID){
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
                      loading.dismiss()
                    })

                    this.RequestCode=res[0].RequestCode
               
                    if(this.request_data.Request_Orginal_File.substr(8)!=''  ){
                    this.FileName=this.request_data.Request_Orginal_File.substr(8)
                    //this.FileName=this.FileName.substring(0, this.FileName.indexOf('.'))
                  }else{
                      this.no_file_uploaded=true
                  }


                },(err:any)=>{
                  loading.dismiss()
                })
                console.log("Request_ID:"+this.Request_ID+"  RequestType:"+this.RequestType+"  ProviderType:"+this.ProviderType)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorOrderDetailsPage');
    this.Request_ID=this.navParams.get('Request_ID')
    this.RequestType=this.navParams.get('Request_type')
    this.storage.get("Trans_user_type").then((val:any)=>{
      console.log("Trans_user_type  val"+val)
      if(val==3){
        this.ProviderType='translator'
      }else  if(val==4){
        this.ProviderType='Proofreader'
      }
    })
    this.reason="sdshdsdsadsdsa"
  }

  dismiss(){
     this.viewCtrl.dismiss()
  }

  handleFileInput(src,files) {
    this.FilleName= document.getElementById("uploadFile");
    this.FilleName= src.target.files[0].name
   // alert(this.new)
    if(src.target.files && src.target.files[0]){
      console.log("file uploaded   :"+  src.target.files[0])
      var file=src.target.files[0]
      this.file1= file
     // alert( "111"+this.file1)
     this.filechoose=true
      let reader = new FileReader();
      reader.onload = (event:any) => {
       // this.base64Image= event.target.result;
      }
      reader.readAsDataURL(src.target.files[0]);
    }

   }

   reiewerbacktotranslator(){
        // call api to forward request back to translator
        this.storage.get('Trans_user_id').then((val:any)=>{
          this.provider. RefuseandBackToTranslator(this.navParams.get('Request_ID'),val,this.file1)
          .subscribe(
            (res:any)=>{
              let toast = this.toastCtrl.create({
                message: res,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
                  this.navCtrl.push('TranslatorHomePage')
              })
            }
          )
        })
   }

   workCompleted(){
    this.storage.get("Trans_user_type").then((val1:any)=>{
      console.log("Trans_user_type  val1:"+val1)
    this.storage.get('Trans_user_id').then((val:any)=>{
       if(val1==3){
            this.provider. DoneRequestByTranslator(this.navParams.get('Request_ID'),val,this.file1,moment(new Date()).format('llll'))
            .subscribe(
              (res:any)=>{
                let toast = this.toastCtrl.create({
                  message: res,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                toast.onDidDismiss(()=>{
                  this.navCtrl.push('TranslatorHomePage')
                })
              },(err:any)=>{
              })
       } else if(val1==4){
          this.provider.UpdateRequestDoneByReviewer(this.navParams.get('Request_ID'),val,this.file1,moment(new Date()).format('llll'))
          .subscribe(
                  (res:any)=>{
                    let toast = this.toastCtrl.create({
                      message: res,
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                    toast.onDidDismiss(()=>{
                      this.navCtrl.push('TranslatorHomePage')
                    })
                  },(err:any)=>{
                  })
                 }
    })

  })

   }

   apology(){
      //api to apologize for this request
      const prompt = this.alertCtrl.create({
        title: this.translate.instant("apologyReason"),
        inputs: [
          {
            name: 'title',
            placeholder:this.translate.instant('write')
          },
        ],
        buttons: [
          {
            text: this.translate.instant('send'),
            handler: data => {
              console.log('Saved clicked',data.title);

              this.storage.get('Trans_user_id').then((val:any)=>{
                this.provider.RollBackRequestFromTranslator(val,this.navParams.get('Request_ID'),data.title).subscribe(
                  (res:any)=>{
                  const toast = this.toastCtrl.create({
                    message: res,
                    duration: 3000
                  });
                  toast.present();
                  toast.onDidDismiss((data:any)=>{
                  this.navCtrl.setRoot('TranslatorHomePage')
                  })
                  },(err:any)=>{
                })
              })
            }
          }
        ],
        cssClass: 'alertCustomCss'
      });
      prompt.present();

   }

  filePreview(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          .then(status => {
            if(status.hasPermission) {
              const fileTransfer:FileTransferObject=this.transfer.create()
              let path=this.file.externalRootDirectory +'Download/' + this.request_data.Request_Orginal_File
              const url1 = encodeURI('http://kfal.careofme.net'+this.request_data.Request_Orginal_File)
              let loading=this.loadingCtrl.create({})
              loading.present()
              fileTransfer.download(url1,path ).then((entry) => {
                loading.dismiss()
                console.log('download complete: ' + path);
                const toast = this.toastCtrl.create({
                message: 'downloaded successfully',
                duration: 3000
                });
                toast.present();

              }, (error) => {
                loading.dismiss()
              });

            }
          });
  }

  chatWithTranslator(){
    this.storage.get('Trans_user_id').then((val:any)=>{

     this.navCtrl.push('MessagesPage',
         {
           'RequestCode':this.RequestCode,
            'TranslatorID':val
         })

    })
  }

  receiveNewRequest(){
    this.storage.get("Trans_user_type").then((val:any)=>{


    console.log("receiveNewRequest ")
    this.storage.get('Trans_user_id').then((ID:any)=>{
      console.log("id:  "+ID)
      if(val==3){
        this.provider. UpdateRequestByTranslator_check(this.navParams.get('Request_ID'),ID,moment(new Date()).format('llll')).subscribe(
          (res:any)=>{
              let toast = this.toastCtrl.create({
                message: res,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
               this.navCtrl.setRoot('TranslatorHomePage')
              })
          },(err:any)=>{

          }
        )
      }else if(val==4){
        console.log("id:  "+ID)
        console.log("id:  "+ID)
        this.provider.  UpdateRequestByReviewer(this.navParams.get('Request_ID'),ID,moment(new Date()).format('llll')).subscribe(
          (res:any)=>{
              let toast = this.toastCtrl.create({
                message: res,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              toast.onDidDismiss(()=>{
                this.navCtrl.setRoot('TranslatorHomePage')
              })
          },(err:any)=>{
            if(err.status==404){
              let toast = this.toastCtrl.create({
                message:this.translate.instant("error occured") ,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        )
      }
    })
  })
}

}
