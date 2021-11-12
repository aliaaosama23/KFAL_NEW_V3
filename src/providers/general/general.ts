import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../helper/helper';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { CustomConfigrations } from '../../CustomConfigrations';

@Injectable()
export class GeneralProvider {

  constructor(public http1:Http,public toastCtrl:ToastController,private translate: TranslateService,
    public http: HttpClient,public helper:HelperProvider,private config:CustomConfigrations) {
    console.log('Hello GeneralProvider Provider');
  }

    GetCurrencies(){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"CountryCity/GetCurrencies")
      }
      else{
        this.presentToastConnection()
      }
    }
    
    GetCountries(){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"CountryCity/GetCountries")
    }
    else{
      this.presentToastConnection()
    }
  }

  GetCityByCountryID(CountryID){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"CountryCity/GetCityByCountryID?CountryID="+CountryID)
    }
    else{
      this.presentToastConnection()
    }
  }

  GetCities(){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"CountryCity/GetCities")
    }
    else{
      this.presentToastConnection()
    }
  }

  CreateInvitation(UserID){
  /*   const formData: FormData = new FormData();
    formData.append('', UserID);
    formData.append('platform', platform); */
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/CreateInvitation?FK_UserIDSender="+UserID);
    }
    else{
      this.presentToastConnection()
    }
  }

  GetParentSp(){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Specialization/GetParentSp")
    }
    else{
      this.presentToastConnection()
    }
  }

  GetChildSp(SpParentID){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Specialization/GetChildSp/"+SpParentID)
    }
    else{
      this.presentToastConnection()
    }
  }

  GetDeadlines(){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"DeadlineHours/GetDeadlineHours")
    }
    else{
      this.presentToastConnection()
    }
  }

  presentToastConnection(){
    this.translate.get("connection error").subscribe(
      val=>{
        let toast = this.toastCtrl.create({
          message:val,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    }

    Contact(MailTo,Subject,Body){
      if(navigator.onLine){
          return   this.http.get(this.config.Base_Url+'Other/ContactUs?MailTo='+MailTo+'&Subject='+Subject+'&Body='+Body)
        }
        else{
          this.presentToastConnection()
        }
    }

    GetInformation(){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"Other/GetInformation")
      }
      else{
        this.presentToastConnection()
      }
    }

    GetAllUserTypes(){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"User/GetAllUserTypes")
      }
      else{
        this.presentToastConnection()
      }
    }
}
