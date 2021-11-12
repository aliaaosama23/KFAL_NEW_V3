import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../helper/helper';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GeneralProvider } from '../general/general';
import { CustomConfigrations } from '../../CustomConfigrations';

@Injectable()
export class ClientProvider {
   url:string=''
   lang_url:string=''
  constructor(public general:GeneralProvider, public http1:Http,private config:CustomConfigrations,
    public toastCtrl:ToastController,private translate: TranslateService,
    public http: HttpClient,public helper:HelperProvider) {
    console.log('Hello ClientProvider Provider');
  }

  sign_up(params){
    //string Name, string Email, string Password, short UserType, string Gender
  // UserEmail  Name   Password     Gender
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/Registration?Name="+params.Name
      +"&Email="+params.UserEmail+
      "&Password="+params.Password+
      "&UserType=1"+
      "&Gender="+params.Gender+
      "&Mobile="+params.Mobile)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  CompleteRegistration(UserID,CountryID,CityID,Address,Age){
    //int UserID, int CountryID, int CityID, string Address, int Age, string Lat, string Long

    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/CompleteRegistration?UserID="+UserID+"&CountryID="+CountryID+"&CityID="+CityID+"&Address="+Address+"&Age="+Age+"&Lat=10&Long=20")
    }
    else{
      this.general.presentToastConnection()
    }
  }

  CheckVerificationEmailCode(UserEmail ,Code){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/CheckVerificationEmailCode?Email="+UserEmail +"&VerificationCode="+Code )
    }
    else{
      this.general.presentToastConnection()
    }
  }

  sign_in(params,DeviceID){
    console.log('login services : '+DeviceID)
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/Login?Email="+params.UserEmail+"&Password="+params.Password+"&DeviceID="+DeviceID)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  SendForgetPassword(Email){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/SendForgetPassword?Email="+Email)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  ConfirmResetPassword(params){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"User/ConfirmResetPassword?Email="+params.Email+"&VerficationCode="+params.VerficationCode+"&NewPassword="+params.NewPassword)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  AddUserComplain( UserID,date,CompalinText){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Other/AddUserComplain?UserID="+UserID+"&CompalinText="+CompalinText+"&Date="+date)
    }
    else{
      this.general. presentToastConnection()
    }
}
//------------------------------------- reuest create ----------------------------------------//
CreateRequest(RequestDate,UserID,OriginalLangID,TargetLangID,RequestDeadlineHours,RequestValue,
  NumOfPages,OrginalFile,RequstNotes,education_level,general_feild,specific_feild,type){
    const formData: FormData = new FormData();
    formData.append('RequestDate', RequestDate);
    formData.append('UserID', UserID);
    formData.append('OriginalLangID', OriginalLangID);
    formData.append('TargetLangID',TargetLangID);
    formData.append('RequestDeadlineHours', RequestDeadlineHours);
    formData.append('RequestValue', RequestValue);
    formData.append('NumOfPages',  NumOfPages);
    formData.append('OrginalFile', OrginalFile);
    formData.append('RequstNotes', RequstNotes);
    formData.append('EducationLevelID', education_level);
    formData.append('SpecializationParentID',   general_feild);
    formData.append('SpecializationChildID',  specific_feild);
    formData.append('RequestStatusID','1')
    formData.append('RequestType',type)
   console.log( OrginalFile.name)

  if(navigator.onLine){
    if(OrginalFile.name==undefined){
      const toast = this.toastCtrl.create({
        message: this.translate.instant("make sure of uploding file"),
        duration: 3000
      });
      toast.present();
      this.helper.dismissLoading()
    }else{


      let ex=OrginalFile.name.split('.').pop();
      console.log("++++"+ex)
     // if(ex=='pdf' || ex=='jpg' || ex=='png' || ex=='bmb' ){

        const endpoint=this.config.Base_Url+"Request/AddRequest?RequestDate="
        +RequestDate+"&UserID="+UserID+
        "&OriginalLangID="+OriginalLangID+
        "&TargetLangID="+TargetLangID+
        "&RequestDeadlineHours="+RequestDeadlineHours+
        "&RequestValue="+RequestValue+
        "&NumOfPages="+ NumOfPages+
        "&OrginalFile="+  OrginalFile.name+
        "&RequstNotes="+RequstNotes+
        "&EducationLevelID="+education_level+
        "&SpecializationParentID="+ general_feild+
        "&SpecializationChildID="+ specific_feild+
        "&RequestStatusID=1&RequestType="+ type
        return this.http.post(endpoint, formData)
      // }else{
      //   const toast = this.toastCtrl.create({
      //     message: "file type not supported,choose another file",
      //     duration: 3000
      //   });
      //   toast.present();
      //   toast.onDidDismiss(()=>{
      //     this.helper.dismissLoading()

      //   })
      // }

    }

  }
  else{
    this.general. presentToastConnection()
  }
}

//------------------------------------- reuest Update ----------------------------------------//

UpdateRequest(RequestID,RequestCode,RequestDate,UserID,OriginalLangID,
  TargetLangID,RequestDeadlineHours,RequestValue,
  NumOfPages,OrginalFile,RequstNotes,education_level,general_feild,specific_feild){
    const formData: FormData = new FormData();
    formData.append('RequestDate', RequestDate);
    formData.append('UserID', UserID);
    formData.append('OriginalLangID', OriginalLangID);
    formData.append('TargetLangID',TargetLangID);
    formData.append('RequestDeadlineHours', RequestDeadlineHours);
    formData.append('RequestValue', RequestValue);
    formData.append('NumOfPages',  NumOfPages);
    formData.append('OrginalFile', OrginalFile);
    formData.append('RequstNotes', RequstNotes);
    formData.append('EducationLevelID', education_level);
    formData.append('SpecializationParentID',   general_feild);
    formData.append('SpecializationChildID',  specific_feild);
    formData.append('RequestStatusID','1')
   console.log("11111  :"+ OrginalFile.name)

  if(navigator.onLine){
    if(OrginalFile.name==undefined){
      const toast = this.toastCtrl.create({
        message:  this.translate.instant("make sure of uploding file"),
        duration: 3000
      });
      toast.present();
      this.helper.dismissLoading()
    }  else if(OrginalFile==null){
      this.helper.dismissLoading()
         const endpoint=this.config.Base_Url+"Request/UpdateRequest?RequestID="+RequestID+
          "&RequestCode="+RequestCode+
          "&RequestDate="+RequestDate+
          "&UserID="+UserID+
          "&OriginalLangID="+OriginalLangID+
          "&TargetLangID="+TargetLangID+
          "&RequestDeadlineHours="+RequestDeadlineHours+
          "&RequestValue="+RequestValue+
          "&NumOfPages="+ NumOfPages+
          "&OrginalFile="+  null+
          "&RequstNotes="+RequstNotes+
          "&EducationLevelID="+education_level+
          "&SpecializationParentID="+ general_feild+
          "&SpecializationChildID="+ specific_feild+
          "&RequestStatusID=1"
          return this.http.post(endpoint, formData)
        }
        else{
          this.helper.dismissLoading()
          const endpoint=this.config.Base_Url+"Request/UpdateRequest?RequestID="+RequestID+
          "&RequestCode="+RequestCode+
          "&RequestDate="+RequestDate+
          "&UserID="+UserID+
          "&OriginalLangID="+OriginalLangID+
          "&TargetLangID="+TargetLangID+
          "&RequestDeadlineHours="+RequestDeadlineHours+
          "&RequestValue="+RequestValue+
          "&NumOfPages="+ NumOfPages+
          "&OrginalFile="+  OrginalFile.name+
          "&RequstNotes="+RequstNotes+
          "&EducationLevelID="+education_level+
          "&SpecializationParentID="+ general_feild+
          "&SpecializationChildID="+ specific_feild+
          "&RequestStatusID=1"
          return this.http.post(endpoint, formData)
        }
  }
  else{
    this.general. presentToastConnection()
  }
}

cancel_new_request(RequestID,RequestCode){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/CancelRequest?RequestID="+RequestID+"&RequestCod="+RequestCode)
  }
  else{
    this.general. presentToastConnection()
  }
}


GetAllRequestsByUserId(UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/GetRequestByUserID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetRequestByID(RequestID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/GetRequestByID?RequestID="+RequestID)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetFeedbackForRequest(RequestID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Other/GetFeedbackForRequest?RequestID="+RequestID)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetUserDataByUserID(UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"User/GetUserDataByUserID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

UpdateProfile(UserID,Email,CV,Languages){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"User/UpdateProfile?UserID="+UserID+"&Email="+Email+"&CV="+CV+"&Languages="+Languages)
  }
  else{
    this.general. presentToastConnection()
  }
}

CloseRequest(RequestID,UserID,RateNumber,Comments){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/CloseRequest?RequestID="+RequestID+"&UserID="+UserID+"&RateNumber="+RateNumber+"&Comments="+Comments)
  }
  else{
    this.general. presentToastConnection()
  }
}

RollBackRequestFromUser(RequestID,UserID,RefusedReson){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/RollBackRequestFromUser?RequestID="+RequestID+"&UserID="+UserID+"&RefusedReson="+RefusedReson)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetUserWalletPointsByUserID(UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"User/GetUserWalletPointsByUserID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

upgrade_client_account(UserID,cv,Languages){
  let headers=new HttpHeaders().set('Content-Type','application/json').set('Accept','application/json');

    const formData: FormData = new FormData();
    formData.append('UserID', UserID);
    formData.append('CV', cv);
    formData.append('Languages',JSON.stringify(Languages));
      console.log( cv.name)
  if(navigator.onLine){
    const endpoint=this.config.Base_Url+"User/UpgradeUser?UserID="+UserID+"&CV="+cv.name //.split('.').slice(0, -1).join('.') //+"&Languages="+JSON.stringify(Languages)
    return this.http.post(endpoint, JSON.stringify(formData),{headers:headers})
  }
  else{
    this.general. presentToastConnection()
  }
}

UpgradeUserWithoutLang(UserID,cv,Languages,UserType){
  if(cv==null){
    console.log(cv)
    const formData: FormData = new FormData();
    formData.append('UserID', UserID);
    formData.append('CV', null);
    if(navigator.onLine){
        const endpoint=this.config.Base_Url+"User/UpgradeUserWithoutLang?UserID="+UserID+"&CV=null&UserType="+UserType //.split('.').slice(0, -1).join('.') //+"&Languages="+JSON.stringify(Languages)
        return this.http.post(endpoint,formData)
    }
    else{
      this.general. presentToastConnection()
    }
  }else{
    console.log(cv)
    const formData: FormData = new FormData();
    formData.append('UserID', UserID);
    formData.append('CV', cv);
      console.log( cv.name)
    if(navigator.onLine){
        const endpoint=this.config.Base_Url+"User/UpgradeUserWithoutLang?UserID="+UserID+"&CV="+cv.name+"&UserType="+UserType //.split('.').slice(0, -1).join('.') //+"&Languages="+JSON.stringify(Languages)
        return this.http.post(endpoint,formData)
    }
    else{
      this.general. presentToastConnection()
    }
  }
}

UpgradeRequest(UserID,UserTypeOLd,UserTypeNew,Fk_SpecializationParentID,FK_SpecializationChildID,Languages){
  if(navigator.onLine){
  
    this.url= this.config.Base_Url+"UpgradeRequest/AddUpgradeRequest?UserID="+UserID+"&UserTypeOLd="+UserTypeOLd+"&UserTypeNew="+UserTypeNew
     +"&Fk_SpecializationParentID="+Fk_SpecializationParentID+"&FK_SpecializationChildID="+FK_SpecializationChildID
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

UpgradeRequest1(UserID,UserTypeOLd,UserTypeNew,Fk_SpecializationParentID,FK_SpecializationChildID,Languages,cv,document){
  if(navigator.onLine){
    let formData=new FormData;
    formData.append('', cv);
    formData.append('OrginalFile', document);
    this.url= this.config.Base_Url+"UpgradeRequest/AddUpgradeRequest?UserID="+UserID+"&UserTypeOLd="+UserTypeOLd+"&UserTypeNew="+UserTypeNew
     +"&Fk_SpecializationParentID="+Fk_SpecializationParentID+"&FK_SpecializationChildID="+FK_SpecializationChildID
     +"&cv"+cv.name+"&document"+document.name

     for(let i=0;i<Languages.length;i++){
     console.log(Languages[i])
     this.lang_url+="&Languages="+Languages[i]
   }

    //return this.http.get(this.url+this.lang_url,{})
    return this.http.post(this.url+this.lang_url, formData)
  }
  else{
    this.general. presentToastConnection()
  }
}

// UpgradeRequest ==>https://kfal.careofme.net/TranslationAppAPI/
UploadUpgReqFile(ReqID,file){
  if(navigator.onLine){
    const formData: FormData = new FormData();
    formData.append('IMG', file);
    return   this.http.post(this.config.Base_Url+"UpgradeRequest/UploadUpgReqFile/"+ReqID,formData)
  }
  else{
    this.general. presentToastConnection()
  }
}

//UpgradeRequest/UploadUpgUserDocument

UploadUpgUserDocument(ReqID,file){
  if(navigator.onLine){
    const formData: FormData = new FormData();
    formData.append('IMG', file);
    return   this.http.post(this.config.Base_Url+"UpgradeRequest/UploadUpgUserDocument/"+ReqID,formData)
  }
  else{
    this.general. presentToastConnection()
  }
}


GetUpgradeRequestsByUserID(userid){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetUpgradeRequestsByUserID?FK_User_ID="+userid)
  }
  else{
    this.general. presentToastConnection()
  }
}


GetUserNotification(DeviceID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Notifications/GetUserNotification?DeviceID="+DeviceID)
  }
  else{
    this.general. presentToastConnection()
  }
}


UpdateUserAccountType(AccountType_ID,UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"User/UpdateUserAccountType?AccountType_ID="+AccountType_ID+"&UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}


GetUserTypesByUserID(UserID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"User/GetUserTypesByUserID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}
  // sign_in_touch_id(UserEmail,Password,DeviceID){
  //   if(navigator.onLine){
  //     return   this.http.get(this.config.Base_Url+"User/Login?Email="+UserEmail+"&Password="+Password+"&DeviceID="+DeviceID)
  //    }
  //   else{
  //     this.general.presentToastConnection()
  //   }
  // }
  // وهترجعلة كود على الايميل هيدخل بيه تتاكدى انه صح وبعدين هيروح لشاشة تانيه وفيها اى بى اى تانيه وهى
}