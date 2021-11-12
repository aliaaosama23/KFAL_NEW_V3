import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Platform } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  data = { type:'', user:'', message:'',deviceid:'',regid:'' };

  @ViewChild(Content) content:Content;
  hide:any=false
  mymessage:any
  requestCode:any=""
  offStatus:boolean = false;
  chats:any=[]
  plat:any
  user:any
  msg:any
  type:any
  dir:boolean
  constructor(public plt:Platform,public viewCtrl:ViewController,
              public navCtrl: NavController, public navParams: NavParams) {
    this.dir=this.plt.isRTL

    this.requestCode=this.navParams.get('RequestCode')
    this.data.user=this.navParams.get('TranslatorID')

    this.user=this.data.user
    this.data.type='Translator'

    if(this.plt.is('ios'))
    {
      this.plat="ios"
    }
    else if (this.plt.is('android')){
      this.plat="android"
    }
    firebase.database().ref('chatrooms/'+this.requestCode+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300); 
        }
      }, 1000);
    });
    // firebase.messaging().onMessage(()=>{
    //   firebase.messaging().
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }


  sendMessage()
  {
    if(this.data.message == '')
    {}
  else
  {
      let newData = firebase.database().ref('chatrooms/'+this.requestCode+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.user,
      message:this.data.message,
      devid:this.data.deviceid,
      regid:this.data.regid,
      sendDate:Date.now()

    });
    this.data.message = '';

  }
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
