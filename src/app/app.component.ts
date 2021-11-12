import { ClientProvider } from './../providers/client/client';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController, Events, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HelperProvider } from '../providers/helper/helper';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { GeneralProvider } from '../providers/general/general';

var config = {
  apiKey: "AIzaSyBa3K0isRBhcIhby_y-CMlLPipyYBImdxY",
  authDomain: "kfal-957c5.firebaseio.com",
  databaseURL: "https://kfal-957c5.firebaseio.com",
  projectId: "kfal-957c5",
  storageBucket: "kfal-957c5.appspot.com",
  messagingSenderId: "992142184038"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  notifications: any[] = []
  @ViewChild(Nav) nav: Nav;
  rootPage: any = '';
  pages: Array<{ title: string, component: any, icon: any }>;
  lang: any
  user_type: any
  mysidemenu: string = ''
  appUrl: string = "";
  dir: any
  direction: boolean
  constructor(public helper: HelperProvider, public translate: TranslateService, private push: Push,
    public alertCtrl: AlertController, public events: Events,
    public general: GeneralProvider, private user: ClientProvider,
    private socialSharing: SocialSharing, public platform: Platform, private device: Device,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, private storage: Storage, public menuCtrl: MenuController) {

    this.direction = this.platform.isRTL
    console.log("direction is rtl :  " + this.direction)

    this.events.subscribe('language', (val) => {
      console.log('language changed : ' + val)
      if (val == 'ar') {
        this.dir = 'right'
      } else {
        this.dir = 'left'
      }
    })
    console.log("side is :" + this.dir)

    firebase.initializeApp(config);

    console.log("current notification_status: " + this.helper.notification_status)

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //console.log("lang changed detected", event);
      // this.translate.setDefaultLang(event.lang);
      this.helper.changeLanguage(event.lang)
    })

    this.storage.get('notificationStatus').then((val: any) => {
      if (val != null) {
        this.helper.notification_status = val
      } else {
        this.helper.notification_status = false
      }
    })
    console.log("helper notification_status: " + this.helper.notification_status)

    this.events.subscribe('trans_lang', (val: any) => {
      console.log("event :" + val)
      console.log(typeof (val))
      this.helper.changeLanguage(val)
      // this.translate.setDefaultLang(val)
    })

    this.GetUserTypesByUserID()


    this.storage.get('Trans_language').then((val: any) => {
      console.log("app component stored language :" + val)
      this.lang = val
      if (val == null) {
        this.helper.changeLanguage('en')
        this.platform.setDir('ltr', true)
        this.helper.set_language('en')
        this.storage.set('Trans_language', 'en')
      } else {
        this.helper.changeLanguage(this.lang)
        this.storage.set('Trans_language', this.lang)
        if (val == 'ar') {
          this.platform.setDir('rtl', true)
          this.dir = 'right'
        }
        if (val == 'en') {
          this.platform.setDir('ltr', true)
          this.dir = 'left'
        }
        this.helper.set_language(val)
      }
    })

   this.initializeApp();
    this.GetDeviceId();

  }

  GetUserTypesByUserID() {
    this.storage.get("Trans_user_id").then((UserId) => {
      if (UserId) {
        this.user.GetUserTypesByUserID(UserId).subscribe((res: any) => {
          console.log('GetUserTypesByUserID  :  ' + JSON.stringify(res));
          this.rootPage = 'MainPage';
          this.helper.SetUserTypes(res);
        })
      }else{
        this.rootPage = 'LoginPage';
      }
    })
  }

  getDimsensions() {
    console.log('width is' + window.screen.width + 'height is ' + window.screen.height)
  }

  GetDeviceId() {
     this.helper.set_device_id(this.device.uuid)
    console.log('Device UUID is: ' + this.device.uuid);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getDimsensions()

      const options: PushOptions = {
        android: {
          'senderID': '992142184038',
          forceShow: true,
          sound: this.helper.notification_status,
          clearNotifications: false
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration').subscribe((registration: any) => {
        console.log('Device registered', JSON.stringify(registration))
      });


      pushObject.on('notification').subscribe((notification: any) => {
        alert('Received a notification' + JSON.stringify(notification))
        console.log('Received a notification title ' + notification.title)

        if (notification.title == " اضافة طلب جديد  ") {
          this.nav.push('AdminOrderDetailsPage', {
            'Request_ID': notification.additionalData.AdditionalData.RequestID,
            'Request_type': 'new'
          })
        }

        if (notification.title == " اضافة طلب جديد للترجمة ") {
          this.nav.push('TranslatorOrderDetailsPage', {
            'Request_ID': notification.additionalData.AdditionalData.RequestID,
            'Request_type': 'new'
          })
        }

        if (notification.title == " الموافقه علي الطلب") {
          this.nav.push('ClientOrderDetailsPage', {
            'request_id': notification.additionalData.AdditionalData.RequestID,
            'Request_type': 'new'
          })
        }

      });

      pushObject.on('error').subscribe((error: any) => {
        console.error('Error with Push plugin', error);
        alert('Error with Push plugin' + JSON.stringify(error))
      });

      this.storage.get('Trans_language').then((val: any) => {
        console.log("lang   :" + val)
        if (val != null) {
          if (val == 'ar') {
            this.helper.changeLanguage('ar')
            this.platform.setDir('rtl', true)
            this.helper.set_language('ar')
            this.lang = 'ar'
          } else {
            this.helper.changeLanguage('en')
            this.platform.setDir('ltr', true)
            this.helper.set_language('en')
            this.lang = 'en'
          }
        } else {
          this.helper.changeLanguage('en')
          this.platform.setDir('ltr', true)
          this.helper.set_language('en')
          this.lang = 'en'
        }
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu() {
    this.menuCtrl.close()
  }

  openPage(page) {
    this.nav.push(page)
  }

  Home() {
    // this.storage.get("Trans_user_type").then((val:any)=>{
    //   console.log("current user  :"+val)
    //   if(val==1){ // this user is client
    //     this.storage.get('Trans_upgrade').then((res:any)=>{
    //       if(res){
    //         this.nav.push('MainPage')
    //       }else{
    //         this.nav.push('HometypePage')
    //       }
    //     })
    //   }else{
    //     this.nav.push('MainPage')   // this user is provider: translator or reviewer or admin
    //   }
    // })

    this.storage.get("Trans_user_id").then((UserId) => {
      if (UserId) {
        this.user.GetUserTypesByUserID(UserId).subscribe((res: any) => {
          console.log('GetUserTypesByUserID  :  ' + JSON.stringify(res));
          this.nav.setRoot('MainPage');
          this.helper.SetUserTypes(res);
        })
      }
    })

  }

  sendInvitaion() {
    this.storage.get('Trans_user_id').then(val => {
      if (val) {

        this.general.CreateInvitation(val).subscribe(
          (res: any) => {
            // let appUrl="http://onelink.to/62kyjh"
            let appUrl = "https://bit.ly/2zJbGTQ"

            this.socialSharing.share("download kfal app ,your invitation code " + res, '', '', appUrl)

          }, (err: any) => {

          })


      } else {

      }

    })

  }


  logout() {
    this.translate.get("logout").subscribe(
      value => {
        this.translate.get("yes").subscribe(
          value1 => {
            this.translate.get("no").subscribe(
              value2 => {
                const alert = this.alertCtrl.create({
                  subTitle: value,
                  buttons: [
                    {
                      text: value2,
                      role: 'cancel',
                      handler: () => {
                      }
                    },
                    {
                      text: value1,
                      handler: () => {
                        // this.storage.remove("userEmail")
                        // this.storage.remove('Trans_user_id')
                        //  this.storage.remove('Password')
                        this.storage.remove('logined_in')
                        //this.storage.remove('Trans_user_type')
                        // this.storage.remove('isadmin')
                        // this.storage.remove('Trans_upgrade')

                        this.storage.get('Trans_login_touch_id').then((val: any) => {
                          if (val == true) {

                          } else {
                            this.storage.clear()
                          }
                        })

                        // call api to log out and unregister from receive notification
                        this.nav.setRoot('LoginPage')
                      }
                    }
                  ]
                });
                alert.present();
              })
          })
      })
  }
}
