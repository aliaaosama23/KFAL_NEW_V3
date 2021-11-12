import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HelperProvider {
  email:any
  currentLang:any
  lang_direction:any
  is_login:boolean=true
  language:any
  token:any
  PlayerID:any
  loading:any
  trans_user_type:any
  notification_status:boolean
  isadmin:boolean=false
  registrationId=""
  device_id=""
  UserTypes:any=[];
  UserTypeCurrentState:any
  private theme: BehaviorSubject<String>;
  private currentProfile=new BehaviorSubject(0);
  private adminProfile=new BehaviorSubject(false);
   
 
  constructor(public loadingCtrl:LoadingController,public translate: TranslateService,
      public http: HttpClient) {
    this.theme = new BehaviorSubject('dark-theme');
  }

//------------------------------------- current profile  -------------------------------------------------//
  set_currentProfile(newVal){
     console.log('current profile id :'+newVal)
     if(newVal==2){
          this.set_admin(true);
     }
     if(newVal!=2){
      this.set_admin(false);
 }
     this.currentProfile.next(newVal) ;
  }
  
  getcurrentProfileObservable(): Observable<number>{
    return this.currentProfile.asObservable();
  }

  set_admin(newVal){
    console.log('current profile is admin :'+newVal)
   
    this.adminProfile.next(newVal) ;
 }
 
 getAdminObservable(): Observable<boolean>{
   return this.adminProfile.asObservable();
 }
//----------------------------------------------------------------------------------------//
  // get device id from push plugin
  set_registration_id(va){
    console.log( 'helper service   registration id is :'+va);
   this.registrationId=va
  }

  // get device id from firebase plugin
  set_device_id(va){
    console.log('helper service  device id is :'+va);
   this.device_id=va
  }

  set_notification_status(va){
    this.notification_status=va
    console.log( "helper notification_status: "+ this.notification_status)
  }

  set_type(va){
    this.trans_user_type=va
  }

  set_email(va){
    this.email=va
  }

  set_PlayerID(va){
    this.PlayerID=va
  }

  set_token(va){
    this.token=va
  }

  set_is_login(va){
    this.is_login=va
  }

  set_language(va){
    this.currentLang=va
  }

 

  presentLoading(){
    this.loading=this.loadingCtrl.create({})
    this.loading.present()
  }

  dismissLoading(){
    this.loading.dismiss()
  }


  setActiveTheme(val) {
      this.theme.next(val);
  }

  getActiveTheme() {
      return this.theme.asObservable();
  }

  changeLanguage(language){
    this.translate.use(language)
    this.translate.setDefaultLang(language)
  }

  UserIsAdmin(va){
    this.isadmin=va

  }

  SetUserTypes(va){
    this.UserTypes=va;
  }

  SetCurrentActiveUserType(va){
    //current account  type id
    console.log('current user type :  '+va);
    this.UserTypeCurrentState=va;
  }
}
