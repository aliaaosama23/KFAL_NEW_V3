import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../helper/helper';
import { ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GeneralProvider } from '../general/general';
import { CustomConfigrations } from '../../CustomConfigrations';

@Injectable()
export class ProvidersProvider {

  constructor(public general:GeneralProvider,public http1:Http,public toastCtrl:ToastController,
    private translate: TranslateService,public http: HttpClient,public config:CustomConfigrations) {
    console.log('Hello ProvidersProvider Provider');
  }
  AllNewRequestsForTranslate(TranslatorID){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/AllNewRequestsForTranslate?TranslatorID="+TranslatorID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

 //-------------------------------------- 2-AllNewRequestsForTranslate ----------------------------------------//
  // الموافقه علي طلب جديد +  للتاكد اذا الطلب دة حد اخده او لا
  UpdateRequestByTranslator_check(RequestID,TranslatorID,ReqTransStDate){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/UpdateRequestByTranslator?RequestID="+RequestID
      +"&TranslatorID="+TranslatorID+"&ReqTransStDate="+ReqTransStDate)
    }
    else{
      this.general. presentToastConnection()
    }
  }
  //------------------------------------- 3- GetAllRequestsByTranslatorID -------------------------------------//
    //  الطلبات الحالية  عند المترجم
    AllcurrentRequests(TranslatorID){
      if(navigator.onLine){
        return   this.http.get(this.config.Base_Url+"Request/GetAllRequestsByTranslatorID?TranslatorID="+TranslatorID)
      }
      else{
        this.general. presentToastConnection()
      }
    }


  // ده معناه ان المترجم خلص وDone
  //------------------------------------- 4- DoneRequestByTranslator -------------------------------------//

  DoneRequestByTranslator(RequestID,TranslatorID,target_file,ReqTransEndDate){
      const formData: FormData = new FormData();
      formData.append('RequestID', RequestID);
      formData.append('TranslatorID', TranslatorID);
      formData.append('RequestTranslatedFile', target_file);
      formData.append('ReqTransEndDate', ReqTransEndDate);
      console.log("11111 dssddsa :"+ target_file.name)

      if(navigator.onLine){
                // if(target_file.name==undefined){
                //   const toast = this.toastCtrl.create({
                //     message: "تأكد من رفع الملف المراد ترجمته",
                //     duration: 3000
                //   });
                //   toast.present();

                // }else{
                  if(target_file.name!=undefined){
                    let ex=target_file.name.split('.').pop();
                    console.log("++++"+ex)
                    if(ex=='pdf' || ex=='jpg' ||  ex=='jpeg' || ex=='png' || ex=='bmb'  ){
                      const endpoint=this.config.Base_Url+"Request/DoneRequestByTranslator?RequestID="+RequestID+
                      "&TranslatorID="+TranslatorID+
                      "&RequestTranslatedFile="+target_file.name+"&ReqTransEndDate="+ReqTransEndDate
                      return this.http.post(endpoint, formData)
                    }else{
                      const toast = this.toastCtrl.create({
                        message: "file type not supported,choose another file",
                        duration: 3000
                      });
                      toast.present();
                      toast.onDidDismiss(()=>{
                        //this.helper.dismissLoading()
                      })
                    }
                  }else{
                    const toast = this.toastCtrl.create({
                          message: "تأكد من رفع الملف المترجم",
                          duration: 3000
                        });
                        toast.present();
                  }

        }
   //   }
      else{
        this.general. presentToastConnection()
      }
  }

  // اعتذار عن تكمله الطلب
   //TranslationAppAPI/Request/RollBackRequestFromTranslator
   RollBackRequestFromTranslator(TranslatorID,RequestID,TranslatorRefusedReson){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/RollBackRequestFromTranslator?RequestID="+RequestID+"&TranslatorID="+TranslatorID+"&TranslatorRefusedReson="+TranslatorRefusedReson)
    }
    else{
      this.general. presentToastConnection()
    }
   }
 ///-----------------------------------   reviewer --------------------------------------------------------//

// ------------------------------------5- GetAllRequestsDoneForReview ----------------------------------//
 // بانتظار التدقيق عند المترجم  -- بالطلبات الجديدة للتدقيق
  GetAllRequestsDoneForReview(ReviewerID){
    if(navigator.onLine){
      return   this.http.get(this.config.Base_Url+"Request/GetAllRequestsDoneForReview?ReviewerID="+ReviewerID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

// ------------------------------------6- UpdateRequestDoneByReviewer ----------------------------------//
UpdateRequestByReviewer(RequestID,ReviewerID,ReqRevStDate){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/UpdateRequestByReviewer?RequestID="+RequestID
    +"&ReviewerID="+ReviewerID+"&RqRevStDate="+ReqRevStDate)
  }
  else{
    this.general. presentToastConnection()
  }
}
// ------------------------------------7- GetAllRequestsDoneForReview ----------------------------------//

GetAllRequestsByReviewerID(ReviewerID){
  if(navigator.onLine){
    return   this.http.get(this.config.Base_Url+"Request/GetAllRequestsByReviewerID?ReviewerID="+ReviewerID)
  }
  else{
    this.general. presentToastConnection()
  }
}

// ------------------------------------8- UpdateRequestDoneByReviewer ----------------------------------//
// if translated file is ok without any comments or errors
UpdateRequestDoneByReviewer(RequestID,ReviewerID,file,ReqRevEndDate){

const formData: FormData = new FormData();
formData.append('RequestID', RequestID);
formData.append('ReviewerID', ReviewerID);
formData.append('RequestReviewedFile', file);
formData.append('ReqRevEndDate', ReqRevEndDate);
console.log("RequestReviewedFile name     :"+ file.name)

    if(navigator.onLine){
     // return   this.http.get(this.config.Base_Url+"Request/UpdateRequestDoneByReviewer?RequestID="+RequestID+"&ReviewerID="+ReviewerID)
     if(file.name!=undefined){
      let ex=file.name.split('.').pop();
      console.log("++++"+ex)
      if(ex=='pdf' || ex=='jpg' ||  ex=='jpeg' || ex=='png' || ex=='bmb' ){
        const endpoint=this.config.Base_Url+"Request/UpdateRequestDoneByReviewer?RequestID="+RequestID
        +"&ReviewerID="+ReviewerID+"&RequestReviewedFile="+file.name
        +"&RqRevEndDate="+ReqRevEndDate
        return this.http.post(endpoint, formData)
      }else{
        const toast = this.toastCtrl.create({
          message: this.translate.instant("file type not supported,choose another file") ,
          duration: 3000
        });
        toast.present();
        toast.onDidDismiss(()=>{
          //this.helper.dismissLoading()
        })
      }
    }else{
      const toast = this.toastCtrl.create({
            message: this.translate.instant("make sure uploded reviewed file"),
            duration: 3000
          });
          toast.present();
    }
    }
    else{
      this.general. presentToastConnection()
    }
  }

   // if translated file is ok without any comments or errors
   RefuseandBackToTranslator(RequestID,ReviewerID,file){

    const formData: FormData = new FormData();
    formData.append('RequestID', RequestID);
    formData.append('ReviewerID', ReviewerID);
    formData.append('RequestReviewedFile', file);
    console.log("RequestReviewedFile name     :"+ file.name)

    if(navigator.onLine){
     // return   this.http.get(this.config.Base_Url+"Request/UpdateRequestDoneByReviewer?RequestID="+RequestID+"&ReviewerID="+ReviewerID)
     if(file.name!=undefined){
      let ex=file.name.split('.').pop();
      console.log("++++"+ex)
      if(ex=='pdf' || ex=='jpg' || ex=='png' ||ex=='jpeg' || ex=='bmb' ){
        const endpoint=this.config.Base_Url+"Request/RejectRequestByReviewer?RequestID="+RequestID+"&ReviewerID="+ReviewerID+"&RequestReviewedFile="+file.name
        return this.http.post(endpoint, formData)
      }else{
        const toast = this.toastCtrl.create({
          message: this.translate.instant("file type not supported,choose another file") ,
          duration: 3000
        });
        toast.present();
        toast.onDidDismiss(()=>{
          //this.helper.dismissLoading()
        })
      }
    }else{
      const toast = this.toastCtrl.create({
            message: this.translate.instant("make sure uploded reviewed file"),
            duration: 3000
          });
          toast.present();
    }
    }
    else{
      this.general. presentToastConnection()
    }
  }
}
