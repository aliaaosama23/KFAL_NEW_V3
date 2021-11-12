import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-control-panel',
  templateUrl: 'control-panel.html',
})
export class ControlPanelPage {
  dir:boolean
  ControlPanelItems=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,private plt:Platform,
    private viewCtrl:ViewController) {
    this.dir=this.plt.isRTL
    this.ControlPanelItems=[
      {'control': 'Languages','page':'LanguagesPanelPage'},
      {'control': 'Specialization','page':'SpecializationPanelPage'},
      {'control': 'Education Levels','page':'EducationLevelsPanelPage'},
      {'control': 'Deadlines','page':'DeadlinesPanelPage'},
      {'control': 'testforms','page':'AddTestFormPage'},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPanelPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  GoControlPage(page){
    this.navCtrl.push(page)
  }

  LangugesPanel(){
    this.navCtrl.push('LanguagesPanelPage')
  }

  DeadlinesPanel(){
    this.navCtrl.push('DeadlinesPanelPage')
  }

  TestformPanel(){
    this.navCtrl.push('AddTestFormPage')
  }
}
