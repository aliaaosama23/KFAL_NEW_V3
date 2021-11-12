import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  data = { type:'client', user:'', message:'',deviceid:'',regid:'' };

  @ViewChild (Content) content:Content;
  hide:any=false
  mymessage:any
  offStatus:boolean = false;
  rooms:any=[]
  plat:any
  user:any
  msg:any
  RequestCode:any=""
  UserID:any
  TranslatorID:any
  dir:boolean
  constructor(public plt:Platform,public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.dir=this.plt.isRTL

    this.RequestCode=this.navParams.get('RequestCode')
    this.data.user=this.navParams.get('UserId')

    this.user=this.data.user
    this.data.type="Client"


    if(this.plt.is('ios'))
    {
      this.plat="ios"
    }
    else if (this.plt.is('android')){
      this.plat="android"
    }


    firebase.database().ref('chatrooms/'+this.RequestCode+'/chats').on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      console.log(JSON.stringify(this.rooms))
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
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
          let newData = firebase.database().ref('chatrooms/'+this.RequestCode+'/chats').push();
        newData.set({
          type:this.data.type,
          user:this.data.user,
          message:this.data.message,
          devid:this.data.deviceid,
          regid:this.data.regid,
          sendDate:moment(new Date()).format('llll')

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
