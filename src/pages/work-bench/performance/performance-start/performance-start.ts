import { PersonService } from './../performance-service';
import { IncomingDetailPage } from './../../incoming-detail/incoming-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Utils } from '../../../../providers/Utils';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the PerformanceStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-performance-start',
  templateUrl: 'performance-start.html',
  providers: [PersonService],
})
export class PerformanceStartPage {
  uid;
  item;
  typeList=[];
  rt_achievement;
  rt_advice;
  rt_insufficient;
  rt_salary_expectation
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,
              public servicePerformance: PersonService, public storage: Storage,public toastCtrl: ToastController) {

              this.item = this.navParams.get('item');
              console.log("item = "+ this.item)
              this.typeList = this.item.typeList
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformanceStartPage');
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

  select(subeType, score, item){
    subeType.current_id = item.id
    let length = score.length
    for(var i=0; i < length; i++){
      if(score[i].id<=subeType.current_id){
        score[i].value = 2
      }else{
        score[i].value = 1
      }
    }
  }

  save(){
    let list = []
    let length = this.item.typeList.length
    for(var i=0; i<length; i++){
      for(var j=0; j<this.item.typeList[i].subType.length; j++){
        list[j] = {
          'type_id': this.item.typeList[i].id,
          'id': this.item.typeList[i].subType[j].id,
          'priority': this.item.typeList[i].subType[j].current_id
        }
      }
    }
    let body = {
      'save': true,
      'rt_achievement': this.rt_achievement,
      'rt_advice': this.rt_advice,
      'rt_insufficient': this.rt_insufficient,
      'rt_salary_expectation': this.rt_salary_expectation,
      'id': this.item.id,
      'subType': list,
    }
    this.servicePerformance.get_performance_state(body).then(res =>{
      if(res.result.res_code==1){
        console.log(res)
        Utils.toastButtom("保存成功", this.toastCtrl)
        this.navCtrl.pop();
      }
    })
  }

  commit(){
    let list = []
    let length = this.item.typeList.length
    for(var i=0; i<length; i++){
      for(var j=0; j<this.item.typeList[i].subType.length; j++){
        list[j] = {
          'type_id': this.item.typeList[i].id,
          'id': this.item.typeList[i].subType[j].id,
          'priority': this.item.typeList[i].subType[j].current_id
        }
      }
    }
    let body = {
      'commit': true,
      'rt_achievement': this.rt_achievement,
      'rt_advice': this.rt_advice,
      'rt_insufficient': this.rt_insufficient,
      'rt_salary_expectation': this.rt_salary_expectation,
      'id': this.item.id,
      'subType': list,
    }
    this.servicePerformance.get_performance_state(body).then(res =>{
      if(res.result.res_code==1){
        console.log(res)
        Utils.toastButtom("提交成功", this.toastCtrl)
        this.navCtrl.pop();
      }
    })
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
    let str
    if (num=="0"){
      str = "周"
    }else if(num=="1"){
      str = "月"
    }else{
      str = "年"
    }
    return str
  }
}
