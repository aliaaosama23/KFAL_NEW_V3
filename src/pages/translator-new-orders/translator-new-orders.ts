import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ProvidersProvider } from '../../providers/providers/providers';
import { GeneralProvider } from '../../providers/general/general';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';

@IonicPage()
@Component({
  selector: 'page-translator-new-orders',
  templateUrl: 'translator-new-orders.html',
})
export class TranslatorNewOrdersPage {
  upgradeTranslatedTests:any[]=[]
  res:any[]=[]
  filtered:boolean=false
  count:number
  filter:string
  speedvalue:any
  providerType:string=""
  newOrders:any[]=[]
  Orders:any[]=[]
  deadlines:any[]=[]
  dir:boolean
  nodata:boolean
  constructor(public menuCtrl:MenuController, public translate:TranslateService,public loadingCtrl:LoadingController,
    public navCtrl: NavController, public storage:Storage,public general:GeneralProvider,public plt:Platform,
    public navParams: NavParams,public provider:ProvidersProvider,private testform:UpgradeRequestsProvider) {
      this.dir=this.plt.isRTL


      this.menuCtrl.enable(true)
     this.providerType=this.navParams.get('type')
   console.log('providerType  :'+  this.providerType)
    this.storage.get("Trans_user_type").then((val:any)=>{
      if(val==3){
        this.providerType="translator"
      }else if(val==4){
        this.providerType="Proofreader"
      }
      })

      // call api to get all available document levels
      let loading=this.loadingCtrl.create({})
      this.general.GetDeadlines().subscribe((res:any)=>{
        this.deadlines=res
        loading.dismiss()
      },(err:any)=>{
        loading.dismiss()
      })
      this.storage.get('Trans_user_id').then(userId=>{
        if(userId){
            if(this.providerType=='translator'){
              let loading=this.loadingCtrl.create({})
              loading.present()

              this.provider.AllNewRequestsForTranslate(userId).subscribe(
                (res:any)=>{
                  loading.dismiss()
                    if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت" || res=="لا توجد طلبات متاحة فى هذا التوقيت")){
                      if(typeof(res)=='string'){
                        this.newOrders=[]
                        this.nodata=true
                      }else{
                        this.nodata=false
                        for(let i=0;i< res.length;i++)
                          {
                              res[i].date=" "
                              res[i].month=""
                              res[i].day=""
                              res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                              res[i].month=res[i].date.split(' ')[0]
                              res[i].day=res[i].date.split(' ')[1]
                          }
                          this.newOrders=[]
                          res.forEach(elem=>{
                            if(elem.FK_Request_Status_ID==3){
                              this.newOrders.push(elem)
                            }
                          })
                          console.log('new orders '+JSON.stringify(this.newOrders))
                          this.newOrders.reverse()
                          this.general.GetDeadlines().subscribe((res:any)=>{
                            this.deadlines=res
                            for(let i=0;i<this.deadlines.length;i++){
                              this.deadlines[i].count=0
                            }

                            for(let i=0;i<this.deadlines.length;i++){

                              var search = this.deadlines[i].Houre
                              var result =  this.newOrders.filter((val) =>{
                                  return val.FK_Request_Deadline_Hours=== search;
                              }).length;
                              console.log(result)
                              this.deadlines[i].count=result
                            }
                          },(err:any)=>{})
                      }
                  }else{
                    this.nodata=true
                  }
                },(err:any)=>{
                  loading.dismiss()
                })
            }
            if(this.providerType=='Proofreader'){
              // upgrade tests  - these requests appear to academic reviewers only
              this.testform.GetRequestsTestFormsForReviewer(userId).subscribe(
                (res:any)=>{
                    if(typeof(res)=='string'){

                    }else{
                      this.upgradeTranslatedTests=res
                    }
                },(err:any)=>{
              })

              // translated requests  - these requests appear to  reviewers only
              let loading=this.loadingCtrl.create({})
              loading.present()
              this.provider.GetAllRequestsDoneForReview(userId).subscribe(
                (res:any)=>{
                  loading.dismiss()
                    if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت" || res=="لا توجد طلبات متاحة فى هذا التوقيت")){
                      if(typeof(res)=='string'){
                        this.newOrders=[]
                        this.nodata=true
                      }else{
                        this.nodata=false
                        this.newOrders=[]
                        for(let i=0;i< res.length;i++)
                          {
                              res[i].date=" "
                              res[i].month=""
                              res[i].day=""
                              res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                              res[i].month=res[i].date.split(' ')[0]
                              res[i].day=res[i].date.split(' ')[1]
                          }
                        this.newOrders=res
                        this.newOrders.reverse()

                        this.general.GetDeadlines().subscribe((res:any)=>{
                          this.deadlines=res
                          for(let i=0;i<this.deadlines.length;i++){
                            this.deadlines[i].count=0
                          }

                          for(let i=0;i<this.deadlines.length;i++){

                            var search = this.deadlines[i].Houre
                            var result =  this.newOrders.filter((val) =>{
                                return val.FK_Request_Deadline_Hours=== search;
                            }).length;
                            this.deadlines[i].count=result
                          }
                        },(err:any)=>{})
                      }
                    }else{
                      this.nodata=true
                    }

                },(err:any)=>{
                  loading.dismiss()
                })
              }
        }
    })

  }

  showOrders(orders){
    this.navCtrl.push('NewOrdersCategorizedPage',{'orders':orders,'type':this.providerType});
  }

  filterBy(filter){
    this.filtered=true
    this.Orders=[]
    this.newOrders.forEach(elem=>{
      if(elem.FK_Request_Deadline_Hours==filter){
        this.Orders.push(elem)
      }
  })
  this.navCtrl.push('NewOrdersCategorizedPage',{'orders':this.Orders,'type':this.providerType});
  }

  doRefresh( refresher){
    this.menuCtrl.enable(true)
    this.providerType=this.navParams.get('type')
  console.log('providerType  :'+  this.providerType)
   this.storage.get("Trans_user_type").then((val:any)=>{
     if(val==3){
       this.providerType="translator"
     }else if(val==4){
       this.providerType="Proofreader"
     }
     })

     // call api to get all available document levels

     this.general.GetDeadlines().subscribe((res:any)=>{
       this.deadlines=res
       refresher.complete()
     },(err:any)=>{
      refresher.complete()
     })
     this.storage.get('Trans_user_id').then(userId=>{
       if(userId){
           if(this.providerType=='translator'){
             this.provider.AllNewRequestsForTranslate(userId).subscribe(
               (res:any)=>{
                refresher.complete()
                   if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت" || res=="لا توجد طلبات متاحة فى هذا التوقيت")){
                     if(typeof(res)=='string'){
                       this.newOrders=[]
                       this.nodata=true
                     }else{
                       this.nodata=false
                       for(let i=0;i< res.length;i++)
                         {
                             res[i].date=" "
                             res[i].month=""
                             res[i].day=""
                             res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                             res[i].month=res[i].date.split(' ')[0]
                             res[i].day=res[i].date.split(' ')[1]
                         }
                         this.newOrders=[]
                         res.forEach(elem=>{
                           if(elem.FK_Request_Status_ID==3){
                             this.newOrders.push(elem)
                           }
                         })
                         this.newOrders.reverse()
                         this.general.GetDeadlines().subscribe((res:any)=>{
                           this.deadlines=res
                           for(let i=0;i<this.deadlines.length;i++){
                             this.deadlines[i].count=0
                           }

                           for(let i=0;i<this.deadlines.length;i++){

                             var search = this.deadlines[i].Houre
                             var result =  this.newOrders.filter((val) =>{
                                 return val.FK_Request_Deadline_Hours=== search;
                             }).length;
                             this.deadlines[i].count=result
                           }
                         },(err:any)=>{})
                     }
                 }else{
                   this.nodata=true
                 }
                 },(err:any)=>{
                  refresher.complete()
                 })
           }
           if(this.providerType=='Proofreader'){

                   // upgrade tests
             this.testform.GetRequestsTestFormsForReviewer(userId).subscribe(
               (res:any)=>{
                   if(typeof(res)=='string'){

                   }else{
                     this.upgradeTranslatedTests=res
                   }
               },(err:any)=>{

               })

             this.provider.GetAllRequestsDoneForReview(userId).subscribe(
               (res:any)=>{
                refresher.complete()
                   if(!(res=="لا توجد طلبات لديك فى هذاالتوقيت" || res=="لا توجد طلبات متاحة فى هذا التوقيت")){
                     if(typeof(res)=='string'){
                       this.newOrders=[]
                       this.nodata=true
                     }else{
                       this.nodata=false
                       this.newOrders=[]
                       for(let i=0;i< res.length;i++)
                         {
                             res[i].date=" "
                             res[i].month=""
                             res[i].day=""
                             res[i].date= moment(res[i].Request_Date).format('ll').split(',')[0]
                             res[i].month=res[i].date.split(' ')[0]
                             res[i].day=res[i].date.split(' ')[1]
                         }
                       this.newOrders=res
                       this.newOrders.reverse()

                       this.general.GetDeadlines().subscribe((res:any)=>{
                         this.deadlines=res
                         for(let i=0;i<this.deadlines.length;i++){
                           this.deadlines[i].count=0
                         }

                         for(let i=0;i<this.deadlines.length;i++){

                           var search = this.deadlines[i].Houre
                           var result =  this.newOrders.filter((val) =>{
                               return val.FK_Request_Deadline_Hours=== search;
                           }).length;
                           this.deadlines[i].count=result
                         }
                       },(err:any)=>{})
                     }
                   }else{
                     this.nodata=true
                   }

               },(err:any)=>{
                refresher.complete()
               })
             }
       }
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatorNewOrdersPage');
  }

  toggleMenu(){
     this.menuCtrl.toggle()
  }

  OrderDetails(Request_ID,type){
    this.navCtrl.push('TranslatorOrderDetailsPage',{'Request_ID':Request_ID,'Request_type':type,'providerType':this.navParams.get('type')})
  }

  translatedTests(UpgReqDetailsID,TranslatedTestForm,FK_UpgReq_ID,lang_ar,lang_en){
    this.navCtrl.push('TranslatedTestForReviewerPage',
    {
      'UpgReqDetailsID':UpgReqDetailsID ,
      'TranslatedTestForm':TranslatedTestForm,
      'FK_UpgReq_ID':FK_UpgReq_ID,
      'lang_ar':lang_ar,
      'lang_en':lang_en})
  }

}
