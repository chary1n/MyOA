import { PersonService } from './../performance-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Utils } from '../../../../providers/Utils';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DomSanitizer } from '@angular/platform-browser';

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
  score = [1,2,3,4,5];
  rt_achievement='请输入';
  rt_advice='请输入';
  rt_insufficient='请输入';
  rt_salary_expectation;
  isShowFooter = true;
  user_heard;
  need_fresh = false;
  postedit = 0;
  description;
  isFirst;
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,
              public servicePerformance: PersonService, public storage: Storage,public toastCtrl: ToastController
              ,private sanitizer: DomSanitizer) {
              
                this.storage.get('user')
              .then(res => {
                  this.uid = res.result.res_data.user_id;
                 })
              this.item = this.navParams.get('item');
              console.log("item = "+ this.item)
              this.typeList = this.item.typeList  
              this.rt_achievement = this.item.rt_achievement.replace(/\n/g,"<br>")
              this.rt_advice = this.item.rt_advice.replace(/\n/g,"<br>")
              this.rt_insufficient = this.item.rt_insufficient.replace(/\n/g,"<br>")
              this.rt_salary_expectation = this.item.rt_salary_expectation
              this.description = this.item.description.replace(/\n/g,"<br>")
              this.isFirst = this.item.isFirst
              this.user_heard = this.item.user_img;

              if(!this.rt_achievement){
                this.rt_achievement='请输入';
              }
              if(!this.rt_insufficient){
                this.rt_insufficient='请输入';
              }
              if(!this.rt_advice){
                this.rt_advice='请输入';
              }  
  }
  
  assembleHTML(str){ 
    　　return this.sanitizer.bypassSecurityTrustHtml(str)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformanceStartPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh =this.navParams.get('need_fresh')
    if(this.need_fresh==true){
      this.postedit =this.navParams.get('postedit')
      if(this.postedit==1){
        this.rt_achievement =this.navParams.get('rt_achievement')
      }else if(this.postedit==2){
        this.rt_insufficient =this.navParams.get('rt_insufficient')
      }else if(this.postedit==3){
        this.rt_advice =this.navParams.get('rt_advice')
      }
      if(!this.rt_achievement){
        this.rt_achievement='请输入';
      }
      if(!this.rt_insufficient){
        this.rt_insufficient='请输入';
      }
      if(!this.rt_advice){
        this.rt_advice='请输入';
      }
      this.need_fresh = false
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
        'rt_achievement': this.changeStrEdit(this.rt_achievement),
        'rt_advice': this.changeStrEdit(this.rt_advice),
        'rt_insufficient': this.changeStrEdit(this.rt_insufficient),
        'rt_salary_expectation': this.rt_salary_expectation,
        'id': this.item.id,
        'subType': endList,
      }
      this.servicePerformance.get_performance_state(body).then(res =>{
        if(res.result.res_code==1){
          console.log(res)
        }
      })
    }
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  select(subeType,item){
    subeType.current_id = item
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
      'rt_achievement': this.changeStrEdit(this.rt_achievement),
      'rt_advice': this.changeStrEdit(this.rt_advice),
      'rt_insufficient': this.changeStrEdit(this.rt_insufficient),
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
    if(this.item.is_self){
      if(!this.rt_achievement || this.rt_achievement=='请输入'){
        myString = "   请输入工作总结"
      }
      if(!this.rt_insufficient || this.rt_insufficient=='请输入'){
        myString = "   请输入工作计划"
      }
      if(!this.rt_salary_expectation || this.rt_salary_expectation==0){
        myString = "   请输入匹配年薪"
      }
    }else{
      if(!this.rt_advice || this.rt_advice=='请输入'){
        myString = "   请输入意见与建议"
      }
    }
      let length = this.typeList.length
      for(var a=0; a<length; a++){
        for(var b=0; b<this.typeList[a].tagList.length; b++){
          for(var c=0; c<this.typeList[a].tagList[b].subType.length; c++){
            if(this.typeList[a].tagList[b].subType[c].current_id==0){
              myString = "   还有未打分项"
              break
            }
          }
        }
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
      'rt_achievement': this.changeStrEdit(this.rt_achievement),
      'rt_advice': this.changeStrEdit(this.rt_advice),
      'rt_insufficient': this.changeStrEdit(this.rt_insufficient),
      'rt_salary_expectation': this.rt_salary_expectation,
      'id': this.item.id,
      'subType': endList,
      'uid': this.uid
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
    if (num=='0'){
      str = "周"
    }else if(num=='1'){
      str = "月"
    }else if(num=='2'){
      str = "季"
    }else if(num=='3'){
      str = "半年"
    }else if(num=='4'){
      str = "年"
    }else if(num=='5'){
      str = '转正'
    }else{
      str=''
    }
    return str
  }

  isFinish(rt_state){
    let finish = false
    if(rt_state==1){
      finish = true
    }else if(rt_state==2){
      finish = false
    }
    return finish
  }  
//编辑工作内容
  editContent(rt_achievement){
    this.navCtrl.push('ContentEditPage',{
      'rt_achievement': this.changeStrEdit(rt_achievement)
    })
  }
//编辑工作计划
  editInsufficient(rt_insufficient){
    this.navCtrl.push('InsufficientEditPage',{
      'rt_insufficient': this.changeStrEdit(rt_insufficient)
    })
  }
//编辑意见与建议
  editAdvice(rt_advice){
    this.navCtrl.push('AdviceEditPage',{
      'rt_advice': this.changeStrEdit(rt_advice)
    })
  }


  changeStrEdit(str){
    let ret = ''
    if(str=='请输入'){
      ret=''
    }else{
      ret = str
    }
    return ret
  }

  notFirst(){
    this.isFirst = false
  }

  getTitle(){
    let title = ''
    if(this.isFirst==false){
      title=this.item.rt_appraisaled_employee_name+'的考评'
     }else{
      title='前言'
     }
     return title
  }
}
