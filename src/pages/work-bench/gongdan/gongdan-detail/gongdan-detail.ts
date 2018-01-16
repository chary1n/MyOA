import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { HttpService } from './../../../../providers/HttpService';

/**
 * Generated class for the GongdanDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-detail',
  templateUrl: 'gongdan-detail.html',
  providers:[GongDanService],
})
export class GongdanDetailPage {
  item;
  message_item;
  isShowZhiPai = false;
  isShowCheHui = false;
  isShowRefuse = false;
  isShowConfirm = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar:StatusBar,
    public gongDanService:GongDanService) {
    this.item = this.navParams.get('items').work_order
    this.message_item = this.navParams.get('items').records
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    if (this.item.issue_state == "unaccept" || this.item.issue_state == "process"){
      if (this.item.create_user.id == HttpService.user_id){
        this.isShowZhiPai = true
        this.isShowCheHui = true
      }
    }
    else{
      if (this.item.create_user.id == HttpService.user_id){
        this.isShowRefuse = true
        this.isShowConfirm = true
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanDetailPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.gongDanService.getGongdanDetail(this.item.work_order_id).then(res => {
      console.log(res)
      if(res.result.res_data && res.result.res_code == 1){
        this.item = res.result.res_data.work_order;
        this.message_item = res.result.res_data.records;
      }
    })
    }
  }

  changeState(item){
    let state_str="";
    if (item == "unaccept"){
      state_str = "等待受理"
    }
    else if (item == "process"){
      state_str = "受理中"
    }
    else if (item == "unassign"){
      state_str = "待验收"
    }
    return state_str
  }

  replyClick(){
    this.navCtrl.push('GongdanChatPage',{
      item:this.item,
      parent_id:null,
    })
  }

  reply_to(items){
    this.navCtrl.push('GongdanChatPage',{
      item:this.item,
      parent_id:items.record_id,
    })
  }

  getContent(items){
    let content = ""
    if (items.record_type == "reply"){
      content = "回复：" + items.content
    }
    return content
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  chehui(){

  }

  zhipai(){

  }


  // 回复类型 ：('reply', '回复'),
  //       ('create ', '创建'),
  //       ('assign', '指派'),
  //       ('check', '审核'),
  //       ('reject', '驳回'),
  //       ('finish', '完成')

}
