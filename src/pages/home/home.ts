import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, LoadingController, ToastController, Platform, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file';
import { GeneralProvider } from '../../providers/general/general';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  filechoose:boolean=false
  choose_general_feild:boolean=false
  langFrom:string=""
  langTo:string=""
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
  notices:string=""
  data:any={}
  ReviewType:number
  chooseTypeReviweing:boolean=false
  lang1:any
  lang2:any
  dir:boolean
  choosefile:any=''

  constructor(public loadingCtrl:LoadingController,public general:GeneralProvider,private panel:ControlpanelProvider,
             public toastCtrl:ToastController,public platform:Platform,public viewCtrl:ViewController,
             public modalCtrl: ModalController,public menuCtrl:MenuController, private file1:File,
             public translate: TranslateService,public navCtrl: NavController,public navParams: NavParams) {

                this.ReviewType=this.navParams.get('type')
                console.log("request type   :  "+this.ReviewType)

                  this.dir=this.platform.isRTL
                      this.choosefile=this.translate.instant("chooseFile")
                      this.FilleName=''
                      this.menuCtrl.enable(true)

                    this.general.GetParentSp().subscribe((res:any)=>{this.general_feilds=res},(err:any)=>{})

                    this.panel.GetEducationLevel().subscribe((res:any)=>{
                      this.document_levels=res
                        },(err:any)=>{})

                    this.general.GetDeadlines().subscribe((res:any)=>{
                        res.forEach(elem=>{
                          elem.isselected=false
                        })
                      this.deadlines=res
                    },(err:any)=>{})

                    this.langFrom=   this.translate.instant("langugae from")
                    this.langTo=this.translate.instant( "langugae to")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

   selectType(){
     this.ReviewType
   }

dismiss(){
  this.viewCtrl.dismiss()
}
  toggleMenu(){
    this.menuCtrl.toggle()
  }


  chooseLangFrom(){
    let languageModal = this.modalCtrl.create('ChooseLanguagePage',
    {
      'name':this.translate.instant("file_language")
    });
   
    languageModal.onDidDismiss((chosenLanguage:any)=>{
      this.lang1=chosenLanguage.data
      console.log("chosen lang"+this.lang1)
          let loading=this.loadingCtrl.create({
            spinner: 'Show ios',
          })
          loading.present()
          this.panel.GetLanguages().subscribe((res:any[])=>{
            loading.dismiss()
              res.forEach(elem=>{

                if(elem.Lang_ID==chosenLanguage.data){
                  if(this.dir==true ){
                    this.langFrom=elem._Lang_NameAr
                  }
                  if(this.dir==false ){
                    this.langFrom=elem._Lan_Name_En
                  }

                }
              })
              if(this.ReviewType==3){
                  this.langTo=this.langFrom
              }else{

              }
          },(err:any)=>{
            loading.dismiss()
          })
    })
    languageModal.present();
  }

  chooseLangTo(){
    let languageModal = this.modalCtrl.create('ChooseLanguagePage',{'name':this.translate.instant("translated_to")});
    languageModal.present();
    languageModal.onDidDismiss((chosenLanguage:any)=>{
      this.lang2=chosenLanguage.data
      let loading=this.loadingCtrl.create({
        spinner: 'Show ios',
      })
      loading.present()
      this.panel.GetLanguages().subscribe((res:any[])=>{
        loading.dismiss()
          res.forEach(elem=>{
            if(elem.Lang_ID==chosenLanguage.data){
              if(this.dir==true ){
                this.langTo=elem._Lang_NameAr
              }
              if(this.dir==false ){
                this.langTo=elem._Lan_Name_En
              }
            }
          })
          // if(this.lang1==this.lang2 && chosenLanguage.data==2){
          //   console.log("00000")
          //   this.chooseTypeReviweing=true
          // }else{
          //   console.log("11111")
          //  this.chooseTypeReviweing=false
          // }
      },(err:any)=>{
        loading.dismiss()
      })
    })
  }

  select_general_feild(){
    let loading=this.loadingCtrl.create({})
    loading.present()
   this.general.GetChildSp(this.GeneralFeild).subscribe((res:any)=>{
     loading.dismiss()
     this.specific_feilds=res
   },(err:any)=>{
     loading.dismiss()
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


   saveRequest(){
    if(this.filechoose){
      if(this.lang1==undefined){
           let toast = this.toastCtrl.create({
             message: this.translate.instant("choose original language"),
             duration: 3000,
             position: 'bottom'
           });
           toast.present();
         }else{
           console.log(this.ReviewType +"     " +this.lang2)
             if(this.lang2==undefined && this.ReviewType!=3){
               let toast = this.toastCtrl.create({
                 message: this.translate.instant("choose translated language"),
                 duration: 3000,
                 position: 'bottom'
               });
               toast.present();
             }
             else{
               if(this.No_of_pages==0){
                 let toast = this.toastCtrl.create({
                   message: this.translate.instant("choose pages number"),
                   duration: 3000,
                   position: 'bottom'
                 });
                 toast.present();
               }else{
                 if(this.GeneralFeild==0){
                  let toast = this.toastCtrl.create({
                    message: this.translate.instant("choose GeneralFeild"),
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                 }else{
                   if(this.SpecificFeild==0){
                    let toast = this.toastCtrl.create({
                      message: this.translate.instant("choose SpecificFeild"),
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                   }else{
                       if(this.Deadline==0){
                        let toast = this.toastCtrl.create({
                          message: this.translate.instant("choose Deadline"),
                          duration: 3000,
                          position: 'bottom'
                        });
                        toast.present();
                       }else{
                         if(this.ReviewType==3){
                          this.data= {
                            'langfrom':this.lang1,
                            'langto':this.lang1,
                            'GeneralFeild':this.GeneralFeild,
                            'SpecificFeild':this.SpecificFeild,
                            'level':this.Level,
                            'Deadline':this.Deadline,
                            'pages':this.No_of_pages,
                            'amount':this.No_of_pages*this.PagePrice,
                            'file':this.file1,
                            'notices':this.notices,
                            'ReviewType':this.ReviewType
                            }
                          this.navCtrl.push('PaymentMethodsPage',{'data':this.data})
                         }else{
                          this.data= {
                            'langfrom':this.lang1,
                            'langto':this.lang2,
                            'GeneralFeild':this.GeneralFeild,
                            'SpecificFeild':this.SpecificFeild,
                            'level':this.Level,
                            'Deadline':this.Deadline,
                            'pages':this.No_of_pages,
                            'amount':this.No_of_pages*this.PagePrice,
                            'file':this.file1,
                            'notices':this.notices,
                            'ReviewType':this.ReviewType
                            }
                          this.navCtrl.push('PaymentMethodsPage',{'data':this.data})
                         }

                       }
                   }
                 }

               }
             }
       }
    }else{
      let toast = this.toastCtrl.create({
        message: this.translate.instant("make sure of uploding file"),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
   }
}

