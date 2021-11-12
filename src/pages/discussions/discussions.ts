import { Component } from '@angular/core';
import { IonicPage, NavController,Platform, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { HelperProvider } from '../../providers/helper/helper';

@IonicPage()
@Component({
  selector: 'page-discussions',
  templateUrl: 'discussions.html',
})
export class DiscussionsPage {
  result:string=''
   UserID:number
   nodata:boolean
   dir:boolean
   general_feilds:any[]=[]
   specific_feilds:any[]=[]
   document_levels:any[]=[]
   deadlines:any[]=[]
   GeneralFeild:any
  // Isadmin:boolean
   MyDiscussions:any[]
   IsAdmin:boolean=false
   UserTypeCurrentState:number
  constructor(public viewCtrl:ViewController, public navCtrl: NavController,public toastCtrl:ToastController,
    public general:GeneralProvider,private storage: Storage,public admin:AdminProvider,private panel:ControlpanelProvider,
              public navParams: NavParams,public platform:Platform,private helper:HelperProvider,
              public loadingCtrl:LoadingController) {

                this.dir=this.platform.isRTL;

                this.UserTypeCurrentState=this.helper.UserTypeCurrentState;
                console.log(this.UserTypeCurrentState)
                if(this.UserTypeCurrentState==2){
                  this.storage.get('Trans_user_id').then(val=>{
                    if(val){
                        this.admin.GetAllDiscussionTopicsByAdminID(val).subscribe((res:any)=>{
                          console.log("discussions made by admin :  "+JSON.stringify(res))
                        })
                    }
                  })
                
                }
                // this.storage.get('isadmin').then(val=>{
                //   if(val==true){
                //     this.Isadmin=true
                //   }else{
                //    this.Isadmin=false
                //   }
                // })

              // call api to get all available general_feilds
              this.panel.GetParentSp().subscribe((res:any)=>{this.general_feilds=res},(err:any)=>{})

              // call api to get all available document levels
              this.panel.GetEducationLevel().subscribe((res:any)=>{
                this.document_levels=res
                },(err:any)=>{})

              //  this.storage.get("Trans_user_type"	).then((userID:any)=>{
              //    console.log('discussions :  '+JSON.stringify(userID));
              //   this.UserID=userID
              
              // })

                this.storage.get('Trans_user_id').then(val=>{
                  if(val){
                    let loading=this.loadingCtrl.create({})
                    loading.present()
                 
                    // this.general.GetAllUserTypes().subscribe((res:any[])=>{
                    //     for(let i=0;i<res.length;i++){
                    //       if(res[0].UserTypeID==this.helper.UserTypeCurrentState)   {

                    //       }
                    //     }
                       
                    // })
      
                //  call api to get all discussions
                    this.admin.GetAllDiscussionsByUserID(val).subscribe(
                      (res:any)=>{
                        if(!(res=="لا توجد بيانات متاحة")){
                              this.nodata=false
                              this.MyDiscussions=res
                        }else{
                          this.result=res
                          this.nodata=true
                        }
                        loading.dismiss()
                      },(err:any)=>{
                        loading.dismiss()
                      })
                  }else{
                  }
          })
      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad DiscussionsPage');
      }

      DiscussionDetails(DiscussionTopic_ID,DiscussionName,DiscussionTopic){
         this.navCtrl.push('DiscussionDetailsPage',{'id':DiscussionTopic_ID,'name':DiscussionName,'topic':DiscussionTopic})
      }

      select_general_feild(){
        let loading=this.loadingCtrl.create({})
        loading.present()
          this.general.GetChildSp(this.GeneralFeild).subscribe((res:any)=>{
            loading.dismiss()
            this.specific_feilds=res
          },(err:any)=>{
            loading.dismiss()
          })
      }

      // for admin only for start new discussion
        addnewDiscission(){
        this.navCtrl.push('AdminAddDiscussionPage')
        }

        dismiss(){
        this.viewCtrl.dismiss()
        }
}
