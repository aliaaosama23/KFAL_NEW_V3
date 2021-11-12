import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';
import { GeneralProvider } from '../general/general';
import { HelperProvider } from '../helper/helper';
import moment from 'moment';
import { CustomConfigrations } from '../../CustomConfigrations';

@Injectable()
export class UpgradeRequestsProvider {

  url:string=''
  lang_url:string=''
 constructor(public general:GeneralProvider, public http1:Http,public toastCtrl:ToastController,private helper:HelperProvider,
            private translate: TranslateService,public http: HttpClient,public config:CustomConfigrations) {
                  console.log('Hello UpgradeRequests Provider');
 }

  //---------------------------------------- User Side -----------------------------------------------------//

  
  // 1- user add request 
    UpgradeRequest(UserID,UserTypeOLd,UserTypeNew,Fk_SpecializationParentID,FK_SpecializationChildID,Languages){
      if(navigator.onLine){
        let header=new HttpHeaders()
        let body={
          'Languages': JSON.stringify( Languages)
        }
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
        this.general.presentToastConnection()
      }
    }

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

    GetUpgradeRequestDetailsByUserID(FK_User_ID){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetUpgradeRequestDetailsByUserID?FK_User_ID="+FK_User_ID)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    // user recieve test form
    UpgradeRequestDetailsUser(UpgReqDetails_ID){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/UpgradeRequestDetailsUser?UpgReqDetails_ID="+UpgReqDetails_ID+
        "&UserRecivedDate="+moment(new Date()).format('llll'))
      }
      else{
        this.general. presentToastConnection()
      }
    }

    // user upload translated test
    UpgradeRequestDetailsUserTranslatedTestForm(UpgReqDetails_ID,TranslatedTestForm){
      if(navigator.onLine){
        if(TranslatedTestForm.name==undefined){
          const toast = this.toastCtrl.create({
            message: this.translate.instant("make sure of uploding file"),
            duration: 3000
          });
          toast.present();
          this.helper.dismissLoading()
        }else{
          const formData: FormData = new FormData();
          formData.append('UpgReqDetails_ID', UpgReqDetails_ID);
          formData.append('TranslatedTestFormDate',moment(new Date()).format('llll'));
          formData.append('TranslatedTestForm', TranslatedTestForm); // file
          return   this.http.post(this.config.Base_Url+"UpgradeRequest/UpgradeRequestDetailsUserTranslatedTestForm?UpgReqDetails_ID="+UpgReqDetails_ID+
        "&TranslatedTestForm="+TranslatedTestForm+"&TranslatedTestFormDate="+moment(new Date()).format('llll'),formData)
        }
      }
      else{
        this.general. presentToastConnection()
      }
    }

  //---------------------------------------- Admin Side -----------------------------------------------------//

    // 2- admin get all upgrade requets

    GetAllUpgradeRequests(){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetUpgradeRequests")
      }
      else{
        this.general.presentToastConnection()
      }
    }

    GetUpgradeRequestsByLangID(Fk_LangID)
    {
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetUpgradeRequestsByLangID?Fk_LangID="+Fk_LangID)
      }
      else{
        this.general.presentToastConnection()
      }
    }

    GetAllRequestsToAdminWaitingForAccept(){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetAllRequestsToAdminWaitingForAccept")
      }
      else{
        this.general. presentToastConnection()
      }
    }
    
    // admin get request details

    GetUpgradeRequestByReqID(ReqID){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetUpgradeRequestByReqID?UpgReq_ID="+ReqID)
      }
      else{
        this.general.presentToastConnection()
      }
    }
  
    // direct action for upgrade request 

    Directactionforupgradebyadmin(Req_ID,ReqStatus,Notes){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/AdminDirectUpgrade_Requests?Req_ID="+Req_ID+
        "&ReqStatus="+ReqStatus
        +"&ReqStatusDate="+moment(new Date()).format('llll')+"&Notes="+Notes)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    // admin send test form to client
    UpgradeRequestDetails(FK_UpgReq_ID,FK_TestForm_ID,TestFormSendUser){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/AddUpgradeRequestDetails?FK_UpgReq_ID="+FK_UpgReq_ID+
        "&FK_TestForm_ID="+FK_TestForm_ID
        +"&TestFormSendDate="+moment(new Date()).format('llll')+"&TestFormSendUser="+TestFormSendUser)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    // admin final desicion after send test form to client
    UpgradeRequestDetailsAdmin(UpgReqDetails_ID,ReqStatus){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/UpgradeRequestDetailsAdmin?UpgReqDetails_ID="+UpgReqDetails_ID+
      "&ReqStatusDate="+moment(new Date()).format('llll')+
      "&ReqStatus="+ReqStatus)
      }
      else{
        this.general. presentToastConnection()
      }
    }
   
    AdminAcceptUpgradeRequests(Req_ID,ReqDate,ReqState){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/AdminUpgradeRequests?Req_ID="+Req_ID+"&ReqDate="+ReqDate+"&ReqState="+ReqState)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    AdminUpgradeRequests(Req_ID,ReqDate){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"User/UpgradeRequest?Req_ID="+Req_ID+"&ReqDate="+ReqDate)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    UpdateRequestToApproveByAdmin(AdminID,RequstID,StatusID)
    {
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"Request/UpdateRequestToApproveByAdmin?AdminID="+AdminID+
        "&RequstID="+RequstID+"&StatusID="+StatusID)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    UpdateRequestToRefusedByAdmin(AdminID, RequstID, StatusID)
    {
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"Request/UpdateRequestToRefusedByAdmin?AdminID="+AdminID+
        "&RequstID="+RequstID+"&StatusID="+StatusID)
      }
      else{
        this.general. presentToastConnection()
      }
    }
  //---------------------------------------- Reviewer Side -----------------------------------------------------//

    GetRequestsTestFormsForReviewer(Reviewer_ID)
    {
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/GetRequestsTestFormsForReviewer?Reviewer_ID="+Reviewer_ID)
      }
      else{
        this.general. presentToastConnection()
      }
    }

    // 8- reviewer recive a translated test form
    UpgradeRequestDetailsReviewer(UpgReqDetails_ID,FK_Reviewer_ID){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/UpgradeRequestDetailsReviewer?UpgReqDetails_ID="+UpgReqDetails_ID+
        "&FK_Reviewer_ID="+FK_Reviewer_ID+"&ReviewerReceivedDate="+moment(new Date()).format('llll'))
      }
      else{
        this.general. presentToastConnection()
      }
    }

    //9- reviewer complete
    UpgradeRequestDetailsReviewerFinishReview(UpgReqDetails_ID,ReviewerComment ,ReviewerStatus){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"UpgradeRequest/UpgradeRequestDetailsReviewerFinishReview?UpgReqDetails_ID="+UpgReqDetails_ID+
      "&ReviewerFinishedDate="+moment(new Date()).format('llll')+
      "&ReviewerComment="+ReviewerComment+"&ReviewerStatus="+ReviewerStatus)
      }
      else{
        this.general. presentToastConnection()
      }
    }

}
