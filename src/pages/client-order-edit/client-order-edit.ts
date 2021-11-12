import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController, Platform, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ClientProvider } from '../../providers/client/client';
import { GeneralProvider } from '../../providers/general/general';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';

@IonicPage()
@Component({
  selector: 'page-client-order-edit',
  templateUrl: 'client-order-edit.html',
})
export class ClientOrderEditPage {
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
  status:any=0
  code:any
  filechoose:boolean=false
  choose_general_feild:boolean=false

  GeneralFeild:number=0
  SpecificFeild:number=0
  Level:number=0
  Deadline:number=0
  No_of_pages:number=0
  PagePrice:number=0
  FilleName:any
  noticeLenght:number=0
  general_feilds:any[]=[]
  specific_feilds:any[]=[]
  document_levels:any[]=[]
  deadlines:any[]=[]

  data:any={}
  ReviewType:number=0
  chooseTypeReviweing:boolean=false
  lang1:any
  lang2:any

  constructor(public viewCtrl:ViewController, public user:ClientProvider,public general:GeneralProvider,
    public toastCtrl:ToastController,public platform:Platform,private file1:File,private storage: Storage,
     public loadingCtrl:LoadingController, public modalCtrl: ModalController,
     public translate: TranslateService,public navCtrl: NavController,private panel:ControlpanelProvider,
     private androidPermissions: AndroidPermissions,private transfer: FileTransfer,
     private file: File, public navParams: NavParams) {

      this.dir=this.platform.isRTL
      console.log(this.dir)

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

        this.RequestCode= this.request_data.RequestCode

        this.status=this.request_data.FK_Request_Status_ID

        this.panel.GetLanguages().subscribe(
          (val:any[])=>{
              val.forEach(elem=>{
                if(elem.Lang_ID  == this.request_data.FK_Original_Lang_ID){
                  if(this.dir==true){
                    this.langFrom=elem._Lang_NameAr
                  }else{
                    this.langFrom=elem._Lan_Name_En
                  }

                }
                console.log(this.langFrom)
                if(elem.Lang_ID== this.request_data.FK_Target_Lang_ID){
                  if(this.dir==true){
                    this.langTo=elem._Lang_NameAr
                  }else{
                    this.langTo=elem._Lan_Name_En
                  }

                }

                console.log(this.langTo)

              })
          },(err)=>{})


        this.general.GetParentSp().subscribe(
          (val:any[])=>{
            this.general_feilds=val
              val.forEach(elem=>{
                if(elem.ID == this.request_data.Fk_SpecializationParentID){
                  this.general_feild=elem.ID
                }
              })
          },(err)=>{})

        this.general.GetChildSp(this.request_data.Fk_SpecializationParentID).subscribe(
            (val:any[])=>{
              this.specific_feilds=val
                val.forEach(elem=>{
                  if(elem.ID == this.request_data.FK_SpecializationChildID){
                    this.specific_feild=elem.ID
                  }
                })
            },(err)=>{})

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
    console.log('ionViewDidLoad ClientOrderEditPage');
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  chooseLangFrom(){
    let languageModal = this.modalCtrl.create('ChooseLanguagePage',{'name':this.translate.instant("file_language")});
    languageModal.present();
    languageModal.onDidDismiss((chosenLanguage:any)=>{
          let loading=this.loadingCtrl.create({
            spinner: 'Show ios',
          })
          loading.present()
          this.panel.GetLanguages().subscribe((res:any[])=>{
            loading.dismiss()
              res.forEach(elem=>{
                if(elem.Lang_ID==chosenLanguage.data){
                  if(this.platform.isRTL){
                    this.langFrom=elem._Lang_NameAr
                  }else{
                    this.langFrom=elem._Lan_Name_En
                  }
                }
              })
          },(err:any)=>{
            loading.dismiss()
          })

    })
  }

  chooseLangTo(){
    let languageModal = this.modalCtrl.create('ChooseLanguagePage',{'name':this.translate.instant("translated_to")});
    languageModal.present();
    languageModal.onDidDismiss((chosenLanguage:any)=>{
      let loading=this.loadingCtrl.create({
        spinner: 'Show ios',
      })
      loading.present()
      this.panel.GetLanguages().subscribe((res:any[])=>{
        loading.dismiss()
          res.forEach(elem=>{
            if(elem.Lang_ID==chosenLanguage.data){
              if(this.platform.isRTL){
                this.langTo=elem._Lang_NameAr
              }else{
                this.langTo=elem._Lan_Name_En
              }
            }
          })
      },(err:any)=>{
        loading.dismiss()
      })
    })
  }


  select_deadline(deadline){
    this.PagePrice=deadline.Price
     this.Deadline=deadline.DeadlineID
     this.deadlines.forEach(element => {
       if(element.DeadlineID==deadline.DeadlineID)
       {
         element.isselected=true
       }
       else
       {
        element.isselected=false
       }
     });
  }

  increase(){
    this.No_of_pages++
  }

  decrease(){
    if( this.No_of_pages>=1  )
    {
      this.No_of_pages--
    }

  }

  filePreview(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          .then(status => {
            if(status.hasPermission) {
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
  handleFileInput(src,files) {
    this.FilleName= document.getElementById("uploadFile");
    this.FilleName= src.target.files[0].name
   // alert(this.new)
    if(src.target.files && src.target.files[0]){
      console.log(src.target.files[0])
      var file=src.target.files[0]
      this.file1= file
     // alert( "111"+this.file1)
      let reader = new FileReader();
      reader.onload = (event:any) => {
       // this.base64Image= event.target.result;
      }
      reader.readAsDataURL(src.target.files[0]);
    }

   // this.upload(this.file1)
   this.navCtrl.push('PaymentMethodsPage')
  }

  updateRequest(){

    // this.user.UpdateRequest(
    //   this.navParams.get('request_id'),
    //   this.navParams.get('code'),
    //   this.request_data.Request_Date,
    //   this.request_data.FK_User_ID,
    //   this.langFrom,
    //   this.langTo,
    //   )
    // .subscribe(

    // )


  }

  select_general_feild(){
    let loading=this.loadingCtrl.create({})
    loading.present()
   this.general.GetChildSp(this.general_feild).subscribe((res:any)=>{
     loading.dismiss()
     this.specific_feilds=res
   },(err:any)=>{
     loading.dismiss()
   })
  }

}
