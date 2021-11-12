import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../helper/helper';
import { ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GeneralProvider } from '../general/general';
import { CustomConfigrations } from '../../CustomConfigrations';

@Injectable()
export class AdminProvider {
  url:string=''
  lang_url:string=''
  UserType_url:string='';
  UserType_full_url:string=''
  constructor(public general:GeneralProvider,public http1:Http,public toastCtrl:ToastController,
              private translate: TranslateService,public http: HttpClient,public config:CustomConfigrations) {
    console.log('Hello AdminProvider Provider');
  }
  // private link to create admin account

  sign_up_admin(){
    // http://kfal.careofme.net/TranslationAppAPI/User/Registration?Name=hani&Email=bareedon@gmail.com&Password=111&UserType=2&Gender=m&&Mobile=773363636
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/Registration?Name=salah&Email=hisham@nitcotek.com&Password=111&UserType=2&CountryID=1&CityID=1&Address=wewqweq&Age=23&Lat=10&Long=20")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  ChangeBlockStatus(UserID,Status){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/ChangeBlockStatus?UserID="+UserID+"&Status="+Status)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  SendCustomNotification(Title,Body,UserType){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/SendCustomNotification?Title="+Title+"&Body="+Body+"&UserType="+UserType)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetUserData(){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/GetUserData")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  EvaluationSelect(providerType,rate){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/EvaluationSelect?FlagType="+providerType+"&FlagOrder="+rate)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  UpdateInformation(Rules,FAQ,AboutUs){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Other/UpdateInformation?InfoID=1&Rules="+Rules+"&FAQ="+FAQ+"&AboutUs="+AboutUs)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetAllCompalinsForAdmin()
  {
    if(navigator.onLine){
      return this.http.get(this.config.Base_Url+"Other/GetAllCompalinsForAdmin")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  ShowAllRequestsForAdmin(){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/ShowAllRequestsForAdmin")
    }
    else{
      this.general. presentToastConnection()
    }
  }
  
  UpdateLanguageAcademicStatus(LangID, AcademicStatus){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Language/UpdateLanguageAcademicStatus?LangID="+ LangID+"&AcademicStatus="+AcademicStatus )
  
    }
    else{
      this.general. presentToastConnection()
    }
  }
  

  DirectAdminRegistration(params,FK_AdminID){
    if(navigator.onLine){   
      this.UserType_full_url=this.config.Base_Url+"User/DirectAdminRegistration?Name="+params.Name
      +"&Email="+params.UserEmail+
      "&Gender="+params.Gender+
      "&Mobile="+params.Mobile+
      "&FK_AdminID="+FK_AdminID

      for(let i=0;i< params.user_type.length;i++){
        console.log(params.user_type[i])
        this.UserType_url+="&UserType="+params.user_type[i]
      }
    
      return   this.http.get(this.UserType_full_url+this.UserType_url)
      
    }
    else{
      this.general. presentToastConnection()
    }
  }

  CheckCompleteDataFromDirectReg(UserID){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/CheckCompleteDataFromDirectReg?UserID="+UserID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  CompleteUserData(UserID,Fk_SpecializationParentID,FK_SpecializationChildID,Languages){
    if(navigator.onLine){
     this.url=this.config.Base_Url+"User/CompleteUserData?UserID="+UserID+"&Fk_SpecializationParentID="+Fk_SpecializationParentID+"&FK_SpecializationChildID="+FK_SpecializationChildID
    
     for(let i=0;i<Languages.length;i++){
      console.log(Languages[i])
      this.lang_url+="&Languages="+Languages[i]
    }
    console.log(this.lang_url)
    console.log(this.url+this.lang_url)
      return this.http.get(this.url+this.lang_url,{})
    }
    else{
      this.general. presentToastConnection()
    }
  }
//------------------------------------dicussions -------------------------------------------------//
// for admin only
AddNewTopic(TopicName,TopicContent,Fk_SpecializationParentID,FK_SpecializationChildID,FK_LanguageID,Age, FK_UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Discussion/AddDiscussionTopic?TopicName="+TopicName+
    "&TopicContent="+TopicContent+
    "&Fk_SpecializationParentID="+Fk_SpecializationParentID+
    "&FK_SpecializationChildID="+FK_SpecializationChildID+
    "&FK_LanguageID="+FK_LanguageID+
    "&Age="+Age+"&FK_UserID="+ FK_UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

joinDiscussionTable(FK_UserID,FK_EducationLevelID,Fk_SpecializationParentID,FK_SpecializationChildID,UniversityName,CollegeName){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Discussion/AddUserDiscussionRegistration?FK_UserID="+FK_UserID+
    "&FK_EducationLevelID="+FK_EducationLevelID+
    "&Fk_SpecializationParentID="+Fk_SpecializationParentID+
    "&FK_SpecializationChildID="+FK_SpecializationChildID+
    "&UniversityName="+UniversityName+
    "&CollegeName="+CollegeName
    )
  }
  else{
    this.general. presentToastConnection()
  }
}

GetAllDiscussionTopicsByAdminID(UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Discussion/GetAllDiscussionTopicsByAdminID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetAllDiscussionsByUserID(UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Discussion/GetAllDiscussionsByUserID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetAllDiscussionLogsByDiscussionTopicID(DiscussionTopicID){
  // by discuss not by user id
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Discussion/GetAllDiscussionLogsByDiscussionTopicID?DiscussionTopicID="+DiscussionTopicID)
  }
  else{
    this.general. presentToastConnection()
  }


}

AddDiscussionLog(Fk_UserID,Fk_DiscussionTopicID,UserDiscussionDetails,DiscussionDate){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Discussion/AddDiscussionLog?Fk_UserID="+Fk_UserID+
    "&Fk_DiscussionTopicID="+Fk_DiscussionTopicID+
    "&UserDiscussionDetails="+UserDiscussionDetails+
    "&DiscussionDate="+DiscussionDate
    )
  }
  else{
    this.general. presentToastConnection()
  }
}


ChangeAccountTypeActivationState(AccountType_ID,ActiveState){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"User/ChangeAccountTypeActivationState?AccountType_ID="+AccountType_ID+'&ActiveState='+ActiveState)
  }
  else{
    this.general. presentToastConnection()
  }
}
}

