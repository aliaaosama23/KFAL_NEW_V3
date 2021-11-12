import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, MenuController, LoadingController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HelperProvider } from '../../providers/helper/helper';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  dir:string="";
  Isadmin:boolean=false
  direction:boolean=false
  UserTypes:any[]=[]
  constructor(public toastCtrl: ToastController,public events:Events,
    public user:ClientProvider,public navParams:NavParams,private clientService:ClientProvider,
     private storage: Storage,public platform:Platform,public helper:HelperProvider,public menuCtrl:MenuController,
     public translate :TranslateService,public navCtrl: NavController,public loadingCtrl:LoadingController) {
     this.menuCtrl.enable(true)
     this.direction=this.platform.isRTL

     this.UserTypes=this.navParams.get('Types') ==undefined ? this.helper.UserTypes:this.navParams.get('Types')
     console.log('user types :  '+ JSON.stringify(this.UserTypes))
     console.log("constructor direction   :"+this.direction)
     
        this.helper.getAdminObservable().subscribe((isAdmin:any)=>{
          this.Isadmin=isAdmin;
        })

        this.events.subscribe('language', (val)=>{
          console.log( "language    :"+ val)
          console.log(this.platform.isRTL)
                if(val=='ar'){
                  this.direction=true
                }else{
                  this.direction=false
                }
        })
  }

  toggleMenu(){
    this.menuCtrl.toggle()
 }

  ionViewDidLoad() {
    this.direction=this.platform.isRTL
    console.log(" ionViewDidLoad direction   :"+this.direction)
    console.log('ionViewDidLoad MainPage');
  }

  client(){
    this.storage.set('Trans_user_type',1)
    this.navCtrl.setRoot('HometypePage')
  }


  provider(type,usertype){
     this.storage.get('Trans_user_id').then(val=>{
     if(val){
      let loading= this.loadingCtrl.create({})
       loading.present()
      this.user.UpgradeUserWithoutLang(val,null,null,usertype).subscribe(
        (res:any)=>{
          loading.dismiss()
        this.helper.set_type(usertype)
        this.storage.set('Trans_user_type',usertype)
        console.log(usertype)
        this.navCtrl.push('TranslatorNewOrdersPage',{'type':type,'UserType':usertype})
        },(err:any)=>{
          loading.dismiss()
        })
      }
    })
  }

  admin(type,typeNumber){
   // go admin pages
   this.storage.get('Trans_user_id').then(val=>{
    if(val){
     // let loading= this.loadingCtrl.create({})
      // loading.present()
      // this.user.UpgradeUserWithoutLang(val,null,null,typeNumber).subscribe(
      //   (res:any)=>{
      //     loading.dismiss()
      //       this.helper.set_type(typeNumber)
            this.storage.set('Trans_user_type',typeNumber)
            this.navCtrl.push('AdminHomePage')
          // },(err:any)=>{
          //   loading.dismiss()
          // })

    }
   })
  }


  GoProfile(FK_UserTypeID, AccountType,UserID){
    console.log('go profile  :  ' +AccountType)
    console.log('user id :  '+UserID)
    this.helper.set_currentProfile(FK_UserTypeID)
    this.helper.presentLoading()
   this.clientService.UpdateUserAccountType(AccountType,UserID).subscribe((res:any)=>{
     this.helper.dismissLoading()
     this.helper.SetCurrentActiveUserType(FK_UserTypeID)
     if(FK_UserTypeID==1){ this.navCtrl.setRoot('OwnerHomePage') }
     if(FK_UserTypeID==3){ this.navCtrl.setRoot('HometypePage') }
     if(FK_UserTypeID==2){ this.navCtrl.setRoot('AdminHomePage') }
     if(FK_UserTypeID==4 )
     { 
       // translator 
        this.navCtrl.push('TranslatorNewOrdersPage',{'type':'translator','UserType':FK_UserTypeID})
      }
      if(FK_UserTypeID==5 )
      { 
       // reviewer 
      this.navCtrl.push('TranslatorNewOrdersPage',{'type':'Proofreader','UserType':FK_UserTypeID})
      }
      if(FK_UserTypeID==6)
      { 
       //  academic reviewer 
      this.navCtrl.push('TranslatorNewOrdersPage',{'type':'Proofreader','UserType':FK_UserTypeID})
      }
   },(err:any)=>{
    this.helper.dismissLoading()
   })
  }

}
