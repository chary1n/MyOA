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
              this.rt_achievement = this.item.rt_achievement
              this.rt_advice = this.item.rt_advice
              this.rt_insufficient = this.item.rt_insufficient
              this.rt_salary_expectation = this.item.rt_salary_expectation
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
    let endList = []
    let midList = []
    let length = this.typeList.length
    for(var i=0; i<length; i++){
      midList = []
      for(var j=0; j<this.typeList[i].tagList.length; j++){
        list = []
        for(var k=0; k<this.typeList[i].tagList[j].subType.length; k++){
          list[k] = {
            'type_id': this.typeList[i].id,
            'id': this.typeList[i].tagList[j].subType[k].id,
            'priority': this.typeList[i].tagList[j].subType[k].current_id
          }
        }
        midList = midList.concat(list)
      }
      endList = endList.concat(midList)
    }
    let body = {
      'save': true,
      'rt_achievement': this.rt_achievement,
      'rt_advice': this.rt_advice,
      'rt_insufficient': this.rt_insufficient,
      'rt_salary_expectation': this.rt_salary_expectation,
      'id': this.item.id,
      'subType': endList,
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
    let myString = ""
      if(!this.rt_achievement){
        myString = "   请输入工作成果总结"
      }
      if(!this.rt_advice){
        myString = "   请输入工作中不足"
      }
      if(!this.rt_insufficient){
        myString = "   请输入意见与建议"
      }
      if(myString != ""){
        Utils.toastButtom(myString, this.toastCtrl)
      }else{
        let list = []
    let endList = []
    let midList = []
    let length = this.typeList.length
    for(var i=0; i<length; i++){
      midList = []
      for(var j=0; j<this.typeList[i].tagList.length; j++){
        list = []
        for(var k=0; k<this.typeList[i].tagList[j].subType.length; k++){
          list[k] = {
            'type_id': this.typeList[i].id,
            'id': this.typeList[i].tagList[j].subType[k].id,
            'priority': this.typeList[i].tagList[j].subType[k].current_id
          }
        }
        midList = midList.concat(list)
      }
      endList = endList.concat(midList)
    }
    let body = {
      'commit': true,
      'rt_achievement': this.rt_achievement,
      'rt_advice': this.rt_advice,
      'rt_insufficient': this.rt_insufficient,
      'rt_salary_expectation': this.rt_salary_expectation,
      'id': this.item.id,
      'subType': endList,
    }
    this.servicePerformance.get_performance_state(body).then(res =>{
      if(res.result.res_code==1){
        console.log(res)
        Utils.toastButtom("提交成功", this.toastCtrl)
        this.navCtrl.pop();
      }
    })
  }
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
