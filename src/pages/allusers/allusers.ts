import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AdminProvider } from '../../providers/admin/admin';
@IonicPage()
@Component({
  selector: 'page-allusers',
  templateUrl: 'allusers.html',
})
export class AllusersPage {
  users:any[]=[]
  allusers:any[]=[]
  dir:boolean
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl:LoadingController,public viewCtrl:ViewController,
              public translate: TranslateService,private admin:AdminProvider,
              public platform:Platform) {
      this.dir=this.platform.isRTL
       // this.users=this.navParams.get('allusers')
      
       let loading=this.loadingCtrl.create({})
       loading.present()  
        this.admin.GetUserData().subscribe(
          (res:any)=>{
            console.log('all users  :'+ JSON.stringify(res))
            this.users=res
            loading.dismiss()
           
            console.log(this.users.length)
          },(err:any)=>{
            loading.dismiss()
          }
        )

        for(let i=0;i<this.users.length;i++){
          this.users[i].Type=""
          if(this.users[i].User_Type==2){
            this.users[i].Type=this.translate.instant("Admin")
          }
          if(this.users[i].User_Type==3){
            this.users[i].Type=this.translate.instant("Translator")
          }
          if(this.users[i].User_Type==4){
            this.users[i].Type=this.translate.instant("Reviewer")
          }
          if(this.users[i].User_Type==1){
            this.users[i].Type=this.translate.instant("Client")
          }

        }

        this.allusers=this.users.reverse()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllusersPage');
  }

  ionViewDidEnter(){
 //   this.users=this.navParams.get('allusers')
    this.dir=this.platform.isRTL
    this.admin.GetUserData().subscribe(
      (res:any)=>{
          this.users=res
        console.log(this.users.length)
      },(err:any)=>{
      }
    )

    for(let i=0;i<this.users.length;i++){
      this.users[i].Type=""
      if(this.users[i].User_Type==2){
        this.users[i].Type=this.translate.instant("Admin")
      }
      if(this.users[i].User_Type==3){
        this.users[i].Type=this.translate.instant("Translator")
      }
      if(this.users[i].User_Type==4){
        this.users[i].Type=this.translate.instant("Reviewer")
      }
      if(this.users[i].User_Type==1){
        this.users[i].Type=this.translate.instant("Client")
      }

    }

    this.allusers=this.users.reverse()
  }
  dismiss(){
   this.viewCtrl.dismiss()
  }

  showProfile(User_ID){
    console.log('admin  user id : '+User_ID)
   this.navCtrl.push('ClientProfilePage',{'user_id':User_ID})
  }

  addnewUser(){
    // admin add new user
    this.navCtrl.push('AdminAddUserPage')
  }

  doRefresh(refresher){
    //this.users=this.navParams.get('allusers')
        this.dir=this.platform.isRTL

        this.admin.GetUserData().subscribe(
          (res:any)=>{
              this.users=res
            console.log(this.users.length)
          },(err:any)=>{
          }
        )
        for(let i=0;i<this.users.length;i++){
          this.users[i].Type=""
          if(this.users[i].User_Type==2){
            this.users[i].Type=this.translate.instant("Admin")
          }
          if(this.users[i].User_Type==3){
            this.users[i].Type=this.translate.instant("Translator")
          }
          if(this.users[i].User_Type==4){
            this.users[i].Type=this.translate.instant("Reviewer")
          }
          if(this.users[i].User_Type==1){
            this.users[i].Type=this.translate.instant("Client")
          }

        }

        this.allusers=this.users.reverse()
        refresher.complete()
  }
}
