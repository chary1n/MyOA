import { HttpService } from './../../../../providers/HttpService';
import { GongDanService } from './../gongdanService';
import { IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the AtMeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-at-me-list',
  templateUrl: 'at-me-list.html',
  providers:[GongDanService]
})
export class AtMeListPage {

  gongdanList ;
  title ;
  userName ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public gongdanService :GongDanService,public statusbar:StatusBar) {
     this.gongdanList =  this.navParams.get("gongdanList")
     this.title = this.navParams.get('title')
     this.userName = HttpService.user.name
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGongdanListPage');
  }

  ionViewWillEnter(){

     this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  
    let body = JSON.stringify({
      uid: HttpService.user_id,
      assign: HttpService.user_id,
      reply: HttpService.user_id,
      isSearchOrder: true,
      isRead: false
    });
    this.gongdanService.searchAtMeWithLoading(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.gongdanList = res.result.res_data
      }
    })
  }

  toDetail(item){
    this.gongdanService.getGongdanDetail(item.work_order_id).then(res=>{
      console.log(res)
      if(res.result.res_data && res.result.res_code == 1){
        this.navCtrl.push('GongdanDetailPage',{
          items:res.result.res_data,
        })
      }
    })
  }

  changeDate(date){
    if(date){
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }


  isReadStyle(item){
    return item.isRead
    // return false 
  }

  changePriority(priority){
    if(priority=="1"){
      return "低"
    }else if(priority=="2"){
      return "中"
    }else if(priority=="3"){
      return "高"
    }
  }

  // changeState(state){
  //   if(state="unaccept"){
  //     return "未设置受理人"
  //   }else if(state="unassign"){
  //     return "未指派"
  //   }else if(state="process"){
  //     return "处理中"
  //   }else if(state="check"){
  //     return "待审核"
  //   }
  // }

  changeState(item) {
    let state_str = "";
    if (item == "unaccept") {
      state_str = "等待受理"
    }
    else if (item == "process") {
      state_str = "受理中"
    }
    else if (item == "check"){
      state_str = "待验收"
    }
    else if (item == "done"){
      state_str = "已完成"
    }
    else if (item == "draft"){
      state_str = "草稿"
    }
    return state_str
  }


  getProprityImgSrc(item){
    if(item.priority=="3"){
      return  "assets/img/work_bench/up_one.png"
    }else if(item.priority=="2"){
      return  "assets/img/work_bench/up_two.png"
    }else if(item.priority=="1"){
      return  "assets/img/work_bench/up_three.png"
    }
  }

}
