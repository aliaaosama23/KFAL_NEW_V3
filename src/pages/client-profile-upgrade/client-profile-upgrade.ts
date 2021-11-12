import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, Platform, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';
import { ClientProvider } from '../../providers/client/client';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';

@IonicPage()
@Component({
  selector: 'page-client-profile-upgrade',
  templateUrl: 'client-profile-upgrade.html',
})
export class ClientProfileUpgradePage {
  isupgraded:boolean=false
  FilleName:any
  FilleName1:any
  languages:any[]=[]
  general_feilds:any[]=[]
  specific_feilds:any[]=[]
  language_id:any[]=[]
  general_feild_id:any
  specific_feild_id:any
  ReqID:any
  dir:boolean
  upgradeType:number=3
  constructor(public loadingCtrl:LoadingController, public admin:AdminProvider,public event:Events,private panel:ControlpanelProvider,
              private storage: Storage,public general:GeneralProvider,public user:ClientProvider,private file2:File,
              public translate: TranslateService,public viewCtrl:ViewController,private file1:File,public platform:Platform,
              public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {

                this.dir=this.platform.isRTL
                this.FilleName=this.translate.instant("upload")
                this.FilleName1=this.translate.instant("upload")
                // call api to get all available languages
                this.panel.GetLanguages().subscribe((res:any)=>{this.languages=res},(err:any)=>{})

                // call api to get all available general_feilds
                this.general.GetParentSp().subscribe((res:any)=>{this.general_feilds=res},(err:any)=>{})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfileUpgradePage');
  }

  set_general_feild(SpParentID){
    let loading=this.loadingCtrl.create({})
    loading.present()
   // check if the selected general feild is academic
     // call api to get all available specific_feilds

   this.general.GetChildSp(SpParentID).subscribe((res:any)=>{
     loading.dismiss()
     this.specific_feilds=res
   },(err:any)=>{
     loading.dismiss()
   })
 }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  handleFileInput(src,files) {
    this.FilleName= document.getElementById("uploadFile");
    this.FilleName= src.target.files[0].name

    if(src.target.files && src.target.files[0]){
      console.log(src.target.files[0])
      var file=src.target.files[0]
      this.file1= file

      let reader = new FileReader();
      reader.onload = (event:any) => {
       // this.base64Image= event.target.result;
      }
      reader.readAsDataURL(src.target.files[0]);
    }

   // this.upload(this.file1)
  }
  handleFileInput1(src,files) {
    this.FilleName1= document.getElementById("uploadFile");
    this.FilleName1= src.target.files[0].name
   // alert(this.new)
    if(src.target.files && src.target.files[0]){
      console.log(src.target.files[0])
      var file=src.target.files[0]
      this.file2= file
     // alert( "111"+this.file1)
      let reader = new FileReader();
      reader.onload = (event:any) => {
       // this.base64Image= event.target.result;
      }
      reader.readAsDataURL(src.target.files[0]);
    }

   // this.upload(this.file1)
  }

  Upgrade(){
    // call api to upgrade client profile
    //if(this.language_id.length>=2){

    console.log("file  :"+this.file1+"g feild   :"+this.general_feild_id+"s feild   :"+this.specific_feild_id+"langauges   :"+JSON.stringify(this.language_id))
    this.storage.get('Trans_user_id').then(val=>{
      if(val){
      this.user.UpgradeRequest(val,1,this.upgradeType,this.general_feild_id,this.specific_feild_id,this.language_id).subscribe(
        (result:any)=>{
            if(result=="لا يمكن اتمام هذا الطلب حيث ان هناك طلب ترقية قيد التنفيذ"){
              const toast = this.toastCtrl.create({
                message: result,
                duration: 3000
              })
              toast.present();
            }
            else{
               for(let i=0;i<result.length;i++){
                 console.log("for loop on all request loop no  :"+result[i])
                if(this.FilleName=='upload file'){
                  console.log("no file for cv");
                  const toast = this.toastCtrl.create({
                    message:  this.translate.instant("make sure of uploding file"),
                    duration: 3000
                  })
                  toast.present();

                 }else{
                   console.log("file for cv");
                  this.user.UploadUpgReqFile(result[i].UpgReq_ID,  this.file1).subscribe(
                    (res:any)=>{
                       if (res=="تم الرفع بنجاح"){
                          this.checkDocument(result[i].UpgReq_ID)
                       }
                    },(err:any)=>{
                    }
                  )

                 }
               }
               this.storage.set('isupgrade',true)
               this.event.publish('isupgrade',true)
           }

        },
        (err:any)=>{
          const toast = this.toastCtrl.create({
            message:JSON.stringify( err),
            duration: 3000
          })
          toast.present();
        }
      )
    }
   })
 // }else{

 // }
  }

  checkDocument(UpgReq_ID){
    if(this.FilleName1!='upload file'){
      console.log("file for user document");
      this.user.UploadUpgUserDocument(UpgReq_ID,this.file2).subscribe(
        (res:any)=>{
           if (res=="تم الرفع بنجاح"){
            const toast = this.toastCtrl.create({
              message:  this.translate.instant("upgrade request send successfully"),
              duration: 3000
            })
            toast.present();
            setTimeout(()=>{
              this.viewCtrl.dismiss()
            },3000)
           /*  toast.onDidDismiss(()=>{
              this.viewCtrl.dismiss(true)

            }) */
           }
        },(err:any)=>{
        }
      )
     }else{
      const toast = this.toastCtrl.create({
        message:  this.translate.instant("upgrade request send successfully"),
        duration: 3000
      })
      toast.present();
      toast.onDidDismiss(()=>{
        this.viewCtrl.dismiss(true)
        this.storage.set('isupgrade',true)
        this.event.publish('isupgrade',true)
      })
     }
  }
}
