import { ControlpanelProvider } from './../../providers/controlpanel/controlpanel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ViewController, AlertController } from 'ionic-angular';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { GeneralProvider } from '../../providers/general/general';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-add-test-form',
  templateUrl: 'add-test-form.html',
})
export class AddTestFormPage {
  languages:any[]=[]
  dir:boolean
  language:number
  FilleName:any
  filechoose:boolean=false
  testforms:any[]=[]
  nodataResult:any
  constructor(private testform:TestformsProvider, public navCtrl: NavController,private plt:Platform,private alertCtrl:AlertController,
              public navParams: NavParams,private general:GeneralProvider, private file1:File,private toastCtrl:ToastController,
              private storage: Storage,private translate:TranslateService,public viewCtrl:ViewController,private helper:HelperProvider,
              private panel:ControlpanelProvider,private iab: InAppBrowser,) {

                this.FilleName=this.translate.instant("choose file")

                this.dir=this.plt.isRTL

                  this.panel.GetLanguages().subscribe(
                    (res:any)=>{
                      this.languages=res
                      this.language=this.languages[0].Lang_ID
                      this. GetTestForm_ByLangID(this.language)
                      console.log('frist language id '+this.language)
                    }
                  )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTestFormPage');
  }

  handleFileInput(src,files) {
    this.FilleName= document.getElementById("uploadFile");
    this.FilleName= src.target.files[0].name
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

   dismiss(){
      this.viewCtrl.dismiss()
   }

   chooselanguage(){
    // this.panel.GetTestForm_ByLangID(this.language).subscribe(
    //   (res:any)=>{
    //     if(typeof(res)!='string'){
    //       this.testforms=res
    //       this.testforms=this.testforms.reverse()
    //     }else{
    //        this.nodataResult=res
    //     }
    //   })
    this.GetTestForm_ByLangID(this.language)
   }

   removeTest(TestID){
    const alert = this.alertCtrl.create({
      subTitle: this.translate.instant("Do you want to delete this TestForm?"),
      buttons: [
        {
          text:  this.translate.instant("no"),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: this.translate.instant("yes"),
          handler: () => {
            this.helper.presentLoading()
            this.panel.DeleteTestForm_ByTestID(TestID).subscribe(
              (res:any)=>{
               // if(res=="تم الحذف بنجاح"){
                 this.helper.dismissLoading()
                   this. GetTestForm_ByLangID(this.language)
             //   }
              },(err:any)=>{
                this.helper.dismissLoading()
              }
            )
          }
        }
      ]
    });
    alert.present();
   }

   previewTest(FileName){
     console.log(FileName)
     console.log("https://kfal.careofme.net/Images/"+FileName)
    this.iab.create("https://kfal.careofme.net/Images/"+FileName,'_system','location=yes');
   }

   GetTestForm_ByLangID(language:number){
    this.helper.presentLoading()
    this.panel.GetTestForm_ByLangID(language).subscribe(
      (res:any)=>{
        this.testforms=[]
        this.helper.dismissLoading()
            console.log(res)
            if(typeof(res)!='string'){
              this.testforms=res
              this.testforms=this.testforms.reverse()
              console.log(JSON.stringify(this.testforms))
            }else{
              this.nodataResult=res
            }
      },(err:any)=>{
        this.helper.dismissLoading()
    })
   }
   
   add(){
      this.storage.get('Trans_user_id').then(val=>{
        if(val){
            this.panel.AddTestForm(this.file1,this.language,val).subscribe(
              (res:any)=>{
                if(res=="تم اضافة نموذج اختبار"){
                  const toast = this.toastCtrl.create({
                    message:res,
                    duration: 5000
                  });
                  toast.present();
                  toast.onDidDismiss(()=>{
                    this.helper.presentLoading()
                    this.FilleName=this.translate.instant("choose file")
                      this.panel.GetTestForm_ByLangID(this.language).subscribe(
                        (res:any)=>{
                          this.testforms=res
                          this.testforms=this.testforms.reverse()
                          this.helper.dismissLoading()
                        },(err:any)=>{
                          this.helper.dismissLoading()
                        }
                      )
                  })
                }
              }
            )
        }else{

        }
      })
   }
}
