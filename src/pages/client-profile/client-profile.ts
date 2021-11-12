import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Platform, ToastController, ModalController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ClientProvider } from '../../providers/client/client';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { UserModel} from '../../models/user.model';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
@IonicPage()
@Component({
  selector: 'page-client-profile',
  templateUrl: 'client-profile.html',
})
export class ClientProfilePage {
  userData:any={}
  my_languages:any[]=[]
  noLanguages:boolean
  isUpgraded:boolean=false
  noData:boolean=false
 email:any
 name:any
 mobileNumber:any
 password:any
 gender:any
 gender1:any
 show:boolean=false
 DataNotCompleted:boolean
 client:boolean=true
 alldata:any={}
 Password:any
 dir:boolean
 passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
 country_id:any
 countries:any[]=[]
 city_id:any
 cities:any[]=[]
 Address:any
 CountryName:any
 CityName:any
 userid:any
 comefrom:string
 isblocked:boolean
 IsJoin:boolean
 FK_SpecializationChildID:any
 Fk_SpecializationParentID:any
 languages:any[]=[]
 _languages:any[]=[]
 cv:any
 isUpgraing:boolean
 UserTypes:any[]=[]
  constructor(public translate: TranslateService,public viewCtrl:ViewController,public general:GeneralProvider,
              public toastCtrl:ToastController,public loadingCtrl:LoadingController,public modalCtrl: ModalController,
              public platform:Platform,public user:ClientProvider,public admin:AdminProvider,public event:Events,
              public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
              private panel:ControlpanelProvider,private helper:HelperProvider) {
                this.event.subscribe('isupgrade' ,()=>{
                  this.isUpgraded=true
                } )

                this.storage.get('isupgraded').then(
                  (val)=>
                      {
                        if(val==true){
                          this.isUpgraded=true
                        }else{
                          this.isUpgraded=false
                        }

                })

                console.log("admin account show other order accounts : "+this.navParams.get('user_id'))
                this.dir=this.platform.isRTL

              if(this.navParams.get('user_id')!=undefined){
                this.comefrom='adminPanel'
                this.userid=    this.navParams.get('user_id')
                console.log("++++"+this.userid)

              this.user.GetUserTypesByUserID(this.userid).subscribe((res:any)=>{
                console.log( 'GetUserTypesByUserID  :  '+JSON.stringify(res));
                if(res!="لا توجد بيانات متاحة "){
                  this.helper.SetUserTypes(res);
                  this.UserTypes=res;
                }else{
                  this.UserTypes=[];
                }
              
              })

              let loading=this.loadingCtrl.create({})
              loading.present()

              this.user.GetUserDataByUserID(this.userid).subscribe(
              (res:any)=>{
                this.userData=res.dt[0]
                this.storage.get('Password').then((val)=>{
                  console.log(val)
                  if(val){
                    this.Password=val
                  }
                })
                loading.dismiss()
                this.email=this.userData.User_Email
                this.name=this.userData.User_Full_Name
                this.mobileNumber=this.userData.User_Mobile

                this.checkForGender()

                this.checkIfClient(this.userData.User_Type)

                this.checkIfUserBlocked()

                this.checkProfileCompletion(this.userData)
              },(err)=>{
                loading.dismiss()
              })
              }
              else{
                this.comefrom='userprofile'
                this.storage.get('Trans_user_id').then(val=>{
                  if(val){

                    let loading=this.loadingCtrl.create({})
                    loading.present()
                    this.user.GetUserDataByUserID(val).subscribe(
                    (res:any)=>{

                      this.userData=res.dt[0]
                      if(res=="لا توجد بيانات متاحة لهذا المستخدم"){
                      this. noData=true
                        const toast = this.toastCtrl.create({
                          message:res,
                          duration: 5000
                        });
                        toast.present();

                      }else{

                      this.storage.get('Password').then((val)=>{
                        console.log(val)
                        if(val){
                          this.Password=val
                        }
                      })
                      loading.dismiss()

                      this.email=this.userData.User_Email
                      this.name=this.userData.User_Full_Name
                      this.mobileNumber=this.userData.User_Mobile

                     this.checkForGender();
                     this. checkProfileCompletion(this.userData);
                     this.checkIfJoinDiscussion();

                      if(this.userData.CV!=null){
                        this.cv= this.userData.CV
                      }

                      if(this.userData.Fk_SpecializationParentID!=null){
                          console.log("user has upgraded")
                            // this user has sent upgrade request
                                this.isUpgraing=true
                              this.user.GetUpgradeRequestsByUserID(val).subscribe(
                                (res:any)=>{
                                  console.log("all upg request s by this user"+res)
                                }
                              )

                              // set SpecializationParent
                              this.general.GetParentSp().subscribe(
                                (val:any[])=>{
                                    val.forEach(elem=>{
                                      if(elem.ID ==this.userData.Fk_SpecializationParentID){
                                        this.Fk_SpecializationParentID=elem.SpecializationName
                                      }
                                    })
                                    console.log(this.Fk_SpecializationParentID)
                                },(err)=>{})

                                if( this.userData.FK_SpecializationChildID!=null){
                                  // set SpecializationChild
                                this.general.GetChildSp(this.userData.Fk_SpecializationParentID).subscribe(
                                  (val:any[])=>{
                                      val.forEach(elem=>{
                                        if(elem.ID == this.userData.FK_SpecializationChildID){
                                          this.FK_SpecializationChildID=elem.SpecializationName
                                          console.log(elem.SpecializationName )
                                        }

                                      })
                                      console.log(this.FK_SpecializationChildID)
                                  },(err)=>{}
                                  )
                    }
                    }else{
                      this.isUpgraing=false
                    }

                

                      if(this.userData.User_Type==1){
                        this.client=true
                      }else{
                        this.storage.get('Trans_upgrade').then((val)=>{
                          if(val!=null){
                            if(val==true){
                              this.client=false
                            }else{
                              this.client=true
                            }
                          }else{
                            this.client=true
                          }
                        })
                      }


                      this._languages=res.Languages
                      if( this._languages.length!=0){
                        this.noLanguages=false

                        this.GetLanguages()
                        console.log('there are languages',JSON.stringify(this._languages))
                      }else{
                        this.noLanguages=true
                        console.log('no languages')
                      }

            

                    }
                    },(err)=>{
                      loading.dismiss()
                    })
                  }
                })
              }
  
            }

checkIfJoinDiscussion(){
  if(this.userData.IsJoin==null){
    this.IsJoin=false
  }else{
    this.IsJoin=this.userData.IsJoin
  }
}

checkForGender(){
  if(this.userData.Gender =="F"){
    console.log("gender is ..f")
    this.gender= this.translate.instant("female")
  }
  else if(this.userData.Gender =="M"){
    console.log("gender is ..m")
    this.gender= this.translate.instant("male")
  }else{
    this.gender=null
  }
}


checkIfUserBlocked(){
  if(this.userData.ISBlocked==null){
    this.isblocked=false
  }else{
    this.isblocked=this.userData.ISBlocked
  }
}

            
  checkProfileCompletion(userData){
    if(userData.FK_Country_ID==null && userData.FK_City_ID==null && userData.User_Address==null){
      this.DataNotCompleted=true
    }else{
      this.DataNotCompleted=false

          this.general.GetCountries().subscribe( (res:any[])=>{
            res.forEach(elem=>{
              if(elem.CountryID==this.country_id){
                this.CountryName=elem.CountryName
              }
            })
          }, (err:any)=>{ })

          this.country_id=userData.FK_Country_ID

          this.city_id=userData.FK_City_ID

          if(userData.User_Address=="undefined"){
            this.Address=""
          }else{
            this.Address=userData.User_Address
          }

          this.Get_City_By_Country_ID(this.country_id)
    }
  }

  Get_City_By_Country_ID(country_id){
    this.general.GetCityByCountryID(country_id)
    .subscribe((res:any)=>{
      this.cities=res
      this.cities.forEach(elem=>{
          if(elem.CityID== this.city_id){
            this.CityName=elem.CityName
          }
      })
  },(err:any)=>{})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientProfilePage');
  }


  blockuser(){
    console.log(this.isblocked)

    this.admin.ChangeBlockStatus( this.navParams.get('user_id'),this.isblocked).subscribe(
      (res:any)=>{
        const toast = this.toastCtrl.create({
          message: res,
          duration: 3000
        });
        toast.present();
      },(err:any)=>{

      }
    )
  }

  // this function need ton be modified after user type change
  checkIfClient(type){
    if(type==1){
      this.client=true
    }else{
      this.storage.get('Trans_upgrade').then((val)=>{
        if(val!=null){
          this.client=false
        }else{
          this.client=true
        }
      })
    }

  }

  trackUpgReq(){
    this.navCtrl.push('UpgradeTrackPage')
  }

  GetCityByCountryID(country_id){
    this.general.GetCityByCountryID(country_id)
    .subscribe((res:any)=>{this.cities=res },(err:any)=>{})
  }

  dismiss(){
     this.viewCtrl.dismiss()
  }

  edit(){
   this.navCtrl.push('ClientProfileEditPage')
  }

  showpass(){
    if(this.show){
      this.show=false
    }else{
      this.show=true
    }
  }

  hideShowPassword()
  {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  completeProfile(){
    const modal = this.modalCtrl.create('ClientProfileCompletePage');
    modal.present();
    modal.onDidDismiss((data)=>{
     console.log(data)
     this.updateUserProfile();
    })

  }

  GetLanguages(){
    console.log('get languages called')
    console.log('user languages '+JSON.stringify(this.languages))
    this.panel.GetLanguages().subscribe((res:any[])=>{
      this._languages.forEach(elem=>{
        res.forEach(lang=>{
          if(elem.LangID==lang.Lang_ID){
            if(this.dir==true){
              this.languages.push(lang._Lang_NameAr)
              console.log('user languages '+JSON.stringify(this.languages))
            }else{
              this.languages.push(lang._Lan_Name_En)
            }
          }
        })
      })
    },(err:any)=>{
    })
  }

  updateUserProfile(){
    console.log(".........................update user profile data .....................")
    this.comefrom='userprofile'
    this.storage.get('Trans_user_id').then(val=>{
      if(val){

        let loading=this.loadingCtrl.create({})
        loading.present()
        this.user.GetUserDataByUserID(val).subscribe(
        (res:any)=>{

          if(res=="لا توجد بيانات متاحة لهذا المستخدم"){
           this. noData=true
            const toast = this.toastCtrl.create({
              message:res,
              duration: 5000
            });
            toast.present();

          }else{

          this.storage.get('Password').then((val)=>{
            console.log(val)
            if(val){
              this.Password=val
            }
          })
          loading.dismiss()

          this.email=res.dt[0].User_Email
          this.name=res.dt[0].User_Full_Name

          if(res.dt[0].Gender=="F"){
            console.log("gender is ..f")
            this.gender= this.translate.instant("female")
          }
          else if(res.dt[0].Gender=="M"){
            console.log("gender is ..m")
            this.gender= this.translate.instant("male")
          }else{
            this.gender=null
          }


          if(res.dt[0].CV!=null){
            this.cv=  res.dt[0].CV
          }

          if(res.dt[0].Fk_SpecializationParentID!=null && res.dt[0].User_Type==1) {
               console.log("user has upgraded")
                // this user has sent upgrade request
                    this.isUpgraing=true
                   this.user.GetUpgradeRequestsByUserID(val).subscribe(
                     (res:any)=>{
                       console.log("all upg request s by this user"+res)
                     }
                   )

                // set SpecializationParent
                this.general.GetParentSp().subscribe(
                  (val:any[])=>{
                      val.forEach(elem=>{
                        if(elem.ID == res.dt[0].Fk_SpecializationParentID){
                          this.Fk_SpecializationParentID=elem.SpecializationName
                        }
                      })
                      console.log(this.Fk_SpecializationParentID)
                  },(err)=>{})

                  if( res.dt[0].FK_SpecializationChildID!=null){
                    // set SpecializationChild
                  this.general.GetChildSp(res.dt[0].Fk_SpecializationParentID).subscribe(
                    (val:any[])=>{
                        val.forEach(elem=>{
                          if(elem.ID == res.dt[0].FK_SpecializationChildID){
                            this.FK_SpecializationChildID=elem.SpecializationName
                            console.log(elem.SpecializationName )
                          }

                        })
                        console.log(this.FK_SpecializationChildID)
                    },(err)=>{}
                    )
                  }
        }else{
          this.isUpgraing=false
        }

          if(res.dt[0].IsJoin==null){
            this.IsJoin=false
          }else{
            this.IsJoin=res.dt[0].IsJoin
          }

          if(res.dt[0].User_Type==1){
            this.client=true
          }else{
            this.storage.get('Trans_upgrade').then((val)=>{
              if(val!=null){
                if(val==true){
                  this.client=false
                }else{
                  this.client=true
                }
              }else{
                this.client=true
              }
            })
          }


          // this.languages=res.Languages
          // if( this.languages.length!=0){
          //   this.noLanguages=false

          //   this.panel.GetLanguages().subscribe((res:any[])=>{
          //     this.languages.forEach(elem=>{
          //       res.forEach(lang=>{
          //         if(elem.LangID==lang.ID){
          //           if(this.dir==true){
          //             this.my_languages.push(lang.NameAr)
          //           }else{
          //             this.my_languages.push(lang.NameEn)
          //           }
          //         }
          //       })

          //     })
          //   },(err:any)=>{
          //   })
          // }else{
          //   this.noLanguages=true
          // }

          if(res.dt[0].FK_Country_ID==null && res.dt[0].FK_City_ID==null && res.dt[0].User_Address==null){
            this.DataNotCompleted=true
          }else{
            this.DataNotCompleted=false

                this.general.GetCountries().subscribe( (res:any[])=>{
                  res.forEach(elem=>{
                    if(elem.CountryID==this.country_id){
                      this.CountryName=elem.CountryName
                    }
                  })
                }, (err:any)=>{ })

                this.country_id=res.dt[0].FK_Country_ID

                this.city_id=res.dt[0].FK_City_ID

                if(res.dt[0].User_Address=="undefined"){
                  this.Address=""
                }else{
                  this.Address=res.dt[0].User_Address
                }

                this.general.GetCityByCountryID(this.country_id)
                  .subscribe((res:any)=>{
                    this.cities=res
                    this.cities.forEach(elem=>{
                        if(elem.CityID== this.city_id){
                          this.CityName=elem.CityName
                        }
                    })
                },(err:any)=>{})

          }
        }
        },(err)=>{
          loading.dismiss()
        })
      }
    })
  }

  upgradeProfile(){
    const modal = this.modalCtrl.create('ClientProfileUpgradePage');
    modal.present();
    modal.onDidDismiss((data)=>{
      this.isUpgraded=data
      this.storage.set('isupgraded',data)
     console.log(data)
    })
  }

  joinDiscussions(){
    const modal = this.modalCtrl.create('ClientProfileDiscussionPage');
    modal.present();
    modal.onDidDismiss((data)=>{
     this.updateUserProfile()
     console.log(data)
    })
  }

  doRefresh(refresher){


    this.event.subscribe('isupgrade' ,()=>{
      this.isUpgraded=true
    } )

    this.storage.get('isupgraded').then(
      (val)=>
          {
            if(val==true){
              this.isUpgraded=true
            }else{
              this.isUpgraded=false
            }

    })

    console.log("admin account show other order accounts : "+this.navParams.get('user_id'))
    this.dir=this.platform.isRTL

    if(this.navParams.get('user_id')!=undefined){
      this.comefrom='adminPanel'
      this.userid=    this.navParams.get('user_id')
      console.log("++++"+this.userid)

    this.user.GetUserTypesByUserID(this.userid).subscribe((res:any)=>{
      console.log( 'GetUserTypesByUserID  :  '+JSON.stringify(res));
      if(res!="لا توجد بيانات متاحة "){
        this.helper.SetUserTypes(res);
        this.UserTypes=res;
      }else{
        this.UserTypes=[];
      }
    
    })

    this.user.GetUserDataByUserID(this.userid).subscribe(
    (res:any)=>{
      this.userData=res.dt[0]
      this.storage.get('Password').then((val)=>{
        console.log(val)
        if(val){
          this.Password=val
        }
      })
      refresher.complete()

      this.email=this.userData.User_Email
      this.name=this.userData.User_Full_Name

      if(this.userData.Gender =="F"){
        console.log("gender is ..f")
        this.gender= this.translate.instant("female")
      }
      else if(this.userData.Gender =="M"){
        console.log("gender is ..m")
        this.gender= this.translate.instant("male")
      }else{
        this.gender=null
      }

      this.checkIfClient(this.userData.User_Type)

      if(this.userData.ISBlocked==null){
        this.isblocked=false
      }else{
        this.isblocked=this.userData.ISBlocked
      }

      if(this.userData.FK_Country_ID==null && this.userData.FK_City_ID==null && this.userData.User_Address==null){
        this.DataNotCompleted=true
      }else{
        this.DataNotCompleted=false


        this.CountryName=this.userData.Country_Name
        this.CityName=this.userData.City_Name

        console.log("city  :"+this.city_id)
      
        if(this.userData.User_Address=="undefined"){
          this.Address=""
        }else{
          this.Address=res.dt[0].User_Address
        }

        this.Get_City_By_Country_ID(this.userData.FK_Country_ID)
      }

    },(err)=>{
      refresher.complete()

    })
    }
    else{
      this.comefrom='userprofile'
      this.storage.get('Trans_user_id').then(val=>{
        if(val){

      
          this.user.GetUserDataByUserID(val).subscribe(
          (res:any)=>{

            this.userData=res.dt[0]
            if(res=="لا توجد بيانات متاحة لهذا المستخدم"){
            this. noData=true
              const toast = this.toastCtrl.create({
                message:res,
                duration: 5000
              });
              toast.present();

            }else{

            this.storage.get('Password').then((val)=>{
              console.log(val)
              if(val){
                this.Password=val
              }
            })
            refresher.complete()


            this.email=this.userData.User_Email
            this.name=this.userData.User_Full_Name

            if(this.userData.Gender=="f"){
              this.gender= this.translate.instant("female")
            }
            else if(this.userData.Gender=="m"){
              this.gender= this.translate.instant("male")
            }else{
              this.gender=null
            }

            if(this.userData.CV!=null){
              this.cv= this.userData.CV
            }

            if(this.userData.Fk_SpecializationParentID!=null){
                console.log("user has upgraded")
                  // this user has sent upgrade request
                      this.isUpgraing=true
                    this.user.GetUpgradeRequestsByUserID(val).subscribe(
                      (res:any)=>{
                        console.log("all upg request s by this user"+res)
                      }
                    )

                  // set SpecializationParent
                  this.general.GetParentSp().subscribe(
                    (val:any[])=>{
                        val.forEach(elem=>{
                          if(elem.ID ==this.userData.Fk_SpecializationParentID){
                            this.Fk_SpecializationParentID=elem.SpecializationName
                          }
                        })
                        console.log(this.Fk_SpecializationParentID)
                    },(err)=>{})

                    if( this.userData.FK_SpecializationChildID!=null){
                      // set SpecializationChild
                    this.general.GetChildSp(this.userData.Fk_SpecializationParentID).subscribe(
                      (val:any[])=>{
                          val.forEach(elem=>{
                            if(elem.ID == this.userData.FK_SpecializationChildID){
                              this.FK_SpecializationChildID=elem.SpecializationName
                              console.log(elem.SpecializationName )
                            }

                          })
                          console.log(this.FK_SpecializationChildID)
                      },(err)=>{}
                      )
                    }
          }else{
            this.isUpgraing=false
          }

            if(this.userData.IsJoin==null){
              this.IsJoin=false
            }else{
              this.IsJoin=this.userData.IsJoin
            }

            if(this.userData.User_Type==1){
              this.client=true
            }else{
              this.storage.get('Trans_upgrade').then((val)=>{
                if(val!=null){
                  if(val==true){
                    this.client=false
                  }else{
                    this.client=true
                  }
                }else{
                  this.client=true
                }
              })
            }

            this._languages=res.Languages
            if( this._languages.length!=0){
              this.noLanguages=false

              this.GetLanguages()
              console.log('there are languages',JSON.stringify(this._languages))
            }else{
              this.noLanguages=true
              console.log('no languages')
            }

          this. checkProfileCompletion(this.userData)

          }
          },(err)=>{
            refresher.complete()

          })
        }
      })
    }

  }


  changeUserTypeActivation(accpunttype,state){
    this.admin.ChangeAccountTypeActivationState(accpunttype,state).subscribe((res:any)=>{
      console.log('ChangeAccountTypeActivationState :'+JSON.stringify(res))
    })

  }
}
