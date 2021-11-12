import { ClientProvider } from './../../providers/client/client';
import { HelperProvider } from './../../providers/helper/helper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-hometype',
  templateUrl: 'hometype.html',
})
export class HometypePage {
  @ViewChild(Content) mycontent: Content;

  RequestType:any=0
  dir:boolean
  beforePulling:boolean=true
  afterPulling:boolean=false
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,private storage:Storage,
              public navParams: NavParams,public plt:Platform,private helper:HelperProvider,private user:ClientProvider) {
                this.dir=this.plt.isRTL
                this.menuCtrl.enable(true)
                //this.mycontent.scrollToBottom();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HometypePage');
  }

  startScrolling(ev){
    console.log('start scroll :  '+JSON.stringify(ev))
  }

  onScroll(ev){
    console.log('on scroll '+JSON.stringify( ev))
    
    if(ev.scrollTop<=260 && ev.directionY=="up"  ){
      console.log('scroll < 140  ev.directionY=="up"')
      this.beforePulling=false
      this.afterPulling=true
      
    }else{
      this.beforePulling=true
      this.afterPulling=false
 
    }
  
  } 
  scrolltobottom(){
    console.log('scroll to bottom')
    this.mycontent.scrollToBottom(1000);
  }
  toggleMenu(){
    this.menuCtrl.toggle()
  }

  
 
  openPage(page) {
    this.navCtrl.push(page)
  }

  Home(){
    // this.storage.get("Trans_user_type").then((val:any)=>{
    //   console.log("current user  :"+val)
    //   if(val==1){ // this user is client
    //     this.storage.get('Trans_upgrade').then((res:any)=>{
    //       if(res){
    //         this.navCtrl.push('MainPage')
    //       }else{
    //         this.navCtrl.push('HometypePage')
    //       }
    //     })
    //   }else{
    //     this.navCtrl.push('MainPage')   // this user is provider: translator or reviewer or admin
    //   }
    // })
    this.storage.get("Trans_user_id").then((UserId)=>{
      if(UserId){
        this.user.GetUserTypesByUserID(UserId).subscribe((res:any)=>{
            console.log( 'GetUserTypesByUserID  :  '+JSON.stringify(res));
            this.navCtrl.setRoot('MainPage') ;
            this.helper.SetUserTypes(res);
        })
      }
    })
  }

  Orders(){

    this.navCtrl.push('ClientOrdersPage') 
    // this.storage.get("Trans_user_type").then((val:any)=>{
    //   console.log("current user  :"+val)
    //   if(val==1){
    //     this.navCtrl.push('ClientOrdersPage')  // this user is client
    //   }else{
    //     if(val==3){
    //       this.navCtrl.push('TranslatorHomePage',{'type':'translator'})   // this user is provider: translator or reviewer or admin
    //     }
    //     if(val==4){
    //       this.navCtrl.push('TranslatorHomePage',{'type':'Proofreader'})   // this user is provider: translator or reviewer or admin
    //     }
    //     if(val==2){
    //       this.navCtrl.push('AdminOrdersDashboardPage')   // this user is  admin
    //     }
    //   }
    // })
  }
 
  // doRefresh(event) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.complete();
  //     this.beforePulling=!this.beforePulling
  //   }, 100);
  // }
}
