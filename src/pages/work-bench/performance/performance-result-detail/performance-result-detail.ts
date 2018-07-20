import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


/**
 * Generated class for the PerformanceResultDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-performance-result-detail',
  templateUrl: 'performance-result-detail.html',
})
export class PerformanceResultDetailPage {
  item;
  typeList;
  rt_achievement;
  rt_insufficient;
  rt_advice;
  rt_salary_expectation;
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,) {
    this.item = this.navParams.get('item')
    this.typeList = this.item.typeList
    this.rt_achievement = this.item.rt_achievement.replace(/<br>/g,"\n")
    this.rt_insufficient = this.item.rt_insufficient.replace(/<br>/g,"\n")
    this.rt_advice = this.item.rt_advice.replace(/<br>/g,"\n")
    this.rt_salary_expectation = this.item.rt_salary_expectation
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformanceResultDetailPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  changeStr(num){
    let str
    if (num=="1"){
      str = "考核中"
    }else if(num=="0"){
      str = "草稿"
    }else{
      str = "完成"
    }
    return str
  }

  changeCycle(num){
    let str=''
    if (num=='0'){
      str = "周"
    }else if(num=="1"){
      str = "月"
    }else if(num=='2'){
      str = "季"
    }else if(num=='3'){
      str = "半年"
    }else if(num=='4'){
      str = "年"
    }else{
      str=''
    }
    return str
  }
}
