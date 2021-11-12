import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, MenuController, LoadingController, ToastController, ModalOptions, ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ProvidersProvider } from '../../providers/providers/providers';

@IonicPage()
@Component({
  selector: 'page-translator-home',
  templateUrl: 'translator-home.html',
})

export class TranslatorHomePage {
  providerType:string=""
  lang:any
  RequestsForTranslate:any[]=[]  // all new requests for translator to choose one
  Requestscurrent:any[]=[] // all current requests in progress by translator
  RequestsForReviewer:any[]=[] // all requests complete translation and ready for review
  RequestsRollBackFromTranslator:any[]=[] // all requests roll back from another translators
  RequestsRollBackFromReviewer:any[]=[] // all requests roll back from reviewer
  RequestsCompletedForTranslator:any[]=[] // all requests Completed for translators

  // for reviewer
  RequestsNewForReviewer:any[]=[]
  RequestsBackFromUser:any[]=[]
  RequestsCurrentForReviewer:any[]=[]

  //newRequests:any[]=[]
  rollbackRequests:any[]=[]
  AllRequestsDone:any[]=[]
  requestsForReview:boolean=false
  dir:boolean
  constructor( public toastCtrl: ToastController,public loadingCtrl:LoadingController,
               public viewCtrl:ViewController,private menuCtrl:MenuController, private storage: Storage,
               public provider:ProvidersProvider,public helper:HelperProvider,
               public translate:TranslateService,public platform:Platform,public navCtrl: NavController,
               public navParams: NavParams) {
                  this.dir=this.platform.isRTL
                  this.menuCtrl.enable(true)
                  this.providerType=this.navParams.get('type')
                  console.log("provider type:  "+this.providerType)

          this.storage.get("Trans_user_type").then((val:any)=>{
            if(val==3){
              this.providerType='translator'
              // let loading=this.loadingCtrl.create({})
              // loading.present()
              this.storage.get('Trans_user_id').then((val)=>{

              this.provider.AllNewRequestsForTranslate(val).subscribe(
                (res1:any)=>{
               // loading.dismiss()
               if(!(res1=="لا توجد طلبات لديك فى هذاالتوقيت" || res1=="لا توجد طلبات متاحة فى هذا التوقيت")){
                    if(typeof(res1)=='string'){
                      this.RequestsForTranslate=[]
                    }else{
                      this.RequestsForTranslate=[]
                      res1.forEach(elem=>{
                        if(elem.FK_Request_Status_ID==3){
                          this.RequestsForTranslate.push(elem)
                        }
                      })
                  }
                }

                    this.provider.AllcurrentRequests(val).subscribe(
                      (res2:any)=>{
                       // loading.dismiss()
                        if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
                          if(typeof(res2)=='string'){
                            this.Requestscurrent=[]
                          }else{
                            this.Requestscurrent=[]
                            this.RequestsRollBackFromReviewer=[]
                            res2.forEach(elem=>{
                              if(elem.FK_Request_Status_ID==5){
                                this.Requestscurrent.push(elem)
                              }
                            })
                            this.RequestsRollBackFromReviewer=[]
                            res2.forEach(elem=>{
                              if(elem.FK_Request_Status_ID==9){
                                this.RequestsRollBackFromReviewer.push(elem)
                              }
                            })
                          }
                        }
                        this.provider.GetAllRequestsDoneForReview(val).subscribe(
                          (res3:any)=>{
                         //   loading.dismiss()
                             if(!(res3=="لا توجد طلبات متاحة فى هذا التوقيت")){
                                    if(typeof(res3)=='string'){
                                      this.RequestsRollBackFromTranslator=[]
                                    }else{
                                       this.RequestsForReviewer=res3
                                  }
                                }
                            this.provider.AllNewRequestsForTranslate(val).subscribe(
                              (res4:any)=>{
                            //     loading.dismiss()
                                  if(!(res4=="لا توجد طلبات لديك فى هذاالتوقيت" || res4=="لا توجد طلبات متاحة فى هذا التوقيت")){
                                    if(typeof(res4)=='string'){
                                      this.RequestsRollBackFromTranslator=[]
                                    }else{
                                      this.RequestsRollBackFromTranslator=[]
                                      res4.forEach(elem=>{
                                        if(elem.FK_Request_Status_ID==11){
                                          this.RequestsRollBackFromTranslator.push(elem)
                                        }
                                      })
                                  }
                                }
                          },(err:any)=>{
                           // loading.dismiss()
                          }
                          )
                    })
                })
              },(err:any)=>{
               // loading.dismiss()
            })

      })

          }else if(val==4){
            this.providerType='Proofreader'
            let loading=this.loadingCtrl.create({})
            loading.present()
            this.provider. GetAllRequestsDoneForReview(val).subscribe(
              (res1:any)=>{

                if(!(res1=="لا توجد طلبات لديك فى هذاالتوقيت" || res1=="لا توجد طلبات متاحة فى هذا التوقيت")){
                  if(typeof(res1)=='string'){
                    this.RequestsNewForReviewer=[]
                  }else{
                    this.RequestsNewForReviewer=[]
                    res1.forEach(elem=>{
                      if(elem.FK_Request_Status_ID==6){
                       this.RequestsNewForReviewer.push(elem)
                      }
                    })
                    this. RequestsBackFromUser=[]
                    res1.forEach(elem=>{
                      if(elem.FK_Request_Status_ID==12){
                       this. RequestsBackFromUser.push(elem)
                      }
                    })
                  }
                }
                this.storage.get('Trans_user_id').then((val:any)=>{
                  this.provider.GetAllRequestsByReviewerID(val).subscribe(
                    (res2:any)=>{
                    loading.dismiss()
                    if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
                      if(typeof(res2)=='string'){
                        this.RequestsCurrentForReviewer=[]
                      }else{
                        this.RequestsCurrentForReviewer=res2
                      }
                    }
                  },(err:any)=>{
                    loading.dismiss()
                  })
                })
              },(err:any)=>{
                loading.dismiss()
              })
          }
        })

     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorHomePage');
  }

  toggleMenu(){
    this.menuCtrl.toggle()
  }

  orderDetails(){
    this.navCtrl.push('TranslatorOrderDetailsPage')
  }

  goOrders(page,ordersType,orders){
    this.navCtrl.push(page,{'type':ordersType,'orders':orders,'providerType':this.navParams.get('type')})
  }

  dismiss(){
   this.viewCtrl.dismiss()
  }

  doRefresh(refresher){

     this.providerType=this.navParams.get('type')
     console.log("provider type:  "+this.providerType)
      this.storage.get("Trans_user_type").then((val:any)=>{
        if(val==3){
          this.providerType='translator'
          this.storage.get('Trans_user_id').then((val)=>{
          this.provider.AllNewRequestsForTranslate(val).subscribe(
            (res1:any)=>{
             if(!(res1=="لا توجد طلبات لديك فى هذاالتوقيت" || res1=="لا توجد طلبات متاحة فى هذا التوقيت")){
                  if(typeof(res1)=='string'){
                    this.RequestsForTranslate=[]
                  }else{
                    this.RequestsForTranslate=[]
                    res1.forEach(elem=>{
                      if(elem.FK_Request_Status_ID==3){
                        this.RequestsForTranslate.push(elem)
                      }
                    })
                }
              }

                  this.provider.AllcurrentRequests(val).subscribe(
                    (res2:any)=>{
                      refresher.complete()
                      if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
                        if(typeof(res2)=='string'){
                          this.Requestscurrent=[]
                        }else{
                          this.Requestscurrent=[]
                          this.RequestsRollBackFromReviewer=[]
                          res2.forEach(elem=>{
                            if(elem.FK_Request_Status_ID==5){
                              this.Requestscurrent.push(elem)
                            }
                          })
                          this.RequestsRollBackFromReviewer=[]
                          res2.forEach(elem=>{
                            if(elem.FK_Request_Status_ID==9){
                              this.RequestsRollBackFromReviewer.push(elem)
                            }
                          })
                        }
                      }
                      this.provider.GetAllRequestsDoneForReview(val).subscribe(
                        (res3:any)=>{
                          refresher.complete()
                           if(!(res3=="لا توجد طلبات متاحة فى هذا التوقيت")){
                                  if(typeof(res3)=='string'){
                                    this.RequestsRollBackFromTranslator=[]
                                  }else{
                                     this.RequestsForReviewer=res3
                                }
                              }
                          this.provider.AllNewRequestsForTranslate(val).subscribe(
                            (res4:any)=>{
                              refresher.complete()
                                if(!(res4=="لا توجد طلبات لديك فى هذاالتوقيت" || res4=="لا توجد طلبات متاحة فى هذا التوقيت")){
                                  if(typeof(res4)=='string'){
                                    this.RequestsRollBackFromTranslator=[]
                                  }else{
                                    this.RequestsRollBackFromTranslator=[]
                                    res4.forEach(elem=>{
                                      if(elem.FK_Request_Status_ID==11){
                                        this.RequestsRollBackFromTranslator.push(elem)
                                      }
                                    })
                                }
                              }
                        },(err:any)=>{
                          refresher.complete()
                        }
                        )
                  })
              })
            },(err:any)=>{
              refresher.complete()
          })

    })

        }else if(val==4){
          this.providerType='Proofreader'

          this.provider. GetAllRequestsDoneForReview(val).subscribe(
            (res1:any)=>{
              refresher.complete()
              if(!(res1=="لا توجد طلبات لديك فى هذاالتوقيت" || res1=="لا توجد طلبات متاحة فى هذا التوقيت")){
                if(typeof(res1)=='string'){
                  this.RequestsNewForReviewer=[]
                }else{
                  this.RequestsNewForReviewer=[]
                  res1.forEach(elem=>{
                    if(elem.FK_Request_Status_ID==6){
                     this.RequestsNewForReviewer.push(elem)
                    }
                  })
                  this. RequestsBackFromUser=[]
                  res1.forEach(elem=>{
                    if(elem.FK_Request_Status_ID==12){
                     this. RequestsBackFromUser.push(elem)
                    }
                  })
                }
              }
              this.storage.get('Trans_user_id').then((val:any)=>{
                this.provider.GetAllRequestsByReviewerID(val).subscribe((res2:any)=>{
                  refresher.complete()
                  if(!(res2=="لا توجد طلبات لديك فى هذاالتوقيت" || res2=="لا توجد طلبات متاحة فى هذا التوقيت")){
                    if(typeof(res2)=='string'){
                      this.RequestsCurrentForReviewer=[]
                    }else{
                      this.RequestsCurrentForReviewer=res2
                    }
                  }
                },(err:any)=>{
                  refresher.complete()
                })
              })
            },(err:any)=>{
              refresher.complete()
            })
        }
      })
  }
}
