import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import * as moment from 'moment';
import { detachEmbeddedView } from '@angular/core/src/view';

@IonicPage()
@Component({
  selector: 'page-discussion-details',
  templateUrl: 'discussion-details.html',
})
export class DiscussionDetailsPage  // all discussion logs
 {
   dir:boolean
   allLogs:any[]=[]
   result:string
   nodata:boolean
   DiscussionName:string
   DiscussionTopic:string
   myLog:any
  constructor(public viewCtrl:ViewController, public navCtrl: NavController,public toastCtrl:ToastController,
              public general:GeneralProvider,private storage: Storage,public admin:AdminProvider,
              public navParams: NavParams,public platform:Platform,public loadingCtrl:LoadingController) {

                this.dir=this.platform.isRTL
                this.DiscussionName=this.navParams.get('name');
                this.DiscussionTopic=this.navParams.get('topic')
                // res=  [
                //   {
                //   "DiscussionLogID": 1,
                //   "Fk_UserID": 36,
                //   "User_Full_Name": "Adel",
                //   "Fk_DiscussionTopicID": 1,
                //   "TopicName": "Medicine",
                //   "UserDiscussionDetails": "HowAreYou",
                //   "DiscussionDate": "2020-03-24T00:00:00"
                //   },
                //   {

    this.admin.GetAllDiscussionLogsByDiscussionTopicID(this.navParams.get('id')).subscribe(
      (res:any)=>{
        if(typeof(res)!='string'){
          for(let i=0;i< res.length;i++)
                    {
                      res.date='';
                      res.time='';
                      res[i].date= moment(res[i].DiscussionDate).format('l')
                      res[i].time= moment(res[i].DiscussionDate).format('LT')
                    }
          this.nodata=false
          this.allLogs=res
        }else{
           this.result=res
           this.nodata=true
        }
      },(err:any)=>{
      })

  }

  addLog(){
      this.storage.get('Trans_user_id').then(val=>{
        if(val){
          let loading=this.loadingCtrl.create({})
          loading.present()

          this.admin.AddDiscussionLog(val,this.navParams.get('id'),this.myLog, moment(new Date()).format('llll')).subscribe(
            (res:any)=>{
             this.myLog=''
              this.admin.GetAllDiscussionLogsByDiscussionTopicID(this.navParams.get('id')).subscribe(
                (res:any)=>{
                  loading.dismiss()
                  if(typeof(res)!='string'){
                    for(let i=0;i< res.length;i++)
                    {
                      res.date='';
                      res.time='';
                      res[i].date= moment(res[i].DiscussionDate).format('l')
                      res[i].time= moment(res[i].DiscussionDate).format('LT')
                    }
                    this.nodata=false
                    this.allLogs=res
                  }else{
                     this.result=res
                     this.nodata=true
                  }
                },(err:any)=>{
                  loading.dismiss()
                })
            },(err:any)=>{
              loading.dismiss()
            }
          )

      }else{

      }
    })

  }
  dismiss(){
     this.viewCtrl.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussionDetailsPage');
  }

}
