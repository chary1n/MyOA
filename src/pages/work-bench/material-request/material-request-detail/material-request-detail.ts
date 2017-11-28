import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MaterialRequestDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-material-request-detail',
  templateUrl: 'material-request-detail.html',
})
export class MaterialRequestDetailPage {
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    console.log(this.item)
    this.item.review_process_line_ids = this.item.review_process_line_ids.reverse()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialRequestDetailPage');
  }

  changeType(state){
    if (state.toLowerCase() == "pick_type"){
      return "产线领用"
    }
    else if (state.toLowerCase() == "proofing"){
      return "工程领用"
    }
    else
    {
      return state
    }
  }

  changeState(state){
    if (state.toLowerCase() == "canceled")
    {
      return "已取消";
    }
    else if (state.toLowerCase() == "to_submit")
    {
      return "待提交";
    }
    else if (state.toLowerCase() == "submitted")
    {
      return "已提交";
    }
    else if (state.toLowerCase() == "to_approved")
    {
      return "待审批";
    }
    else if (state.toLowerCase() == "review_ing")
    {
      return "审核中";
    }
    else if (state.toLowerCase() == "approved_finish")
    {
      return "等待领料";
    }
    else if (state.toLowerCase() == "finish_pick")
    {
      return "完成";
    }
    else if (state.toLowerCase() == "refused")
    {
      return "已拒绝";
    }
  }

  changeStateWithName(item){
    if (item.who_review_now.name)
    {
      return this.changeState(item.picking_state) + '/' +item.who_review_now.name
    } 
    else
    {
      return this.changeState(item.picking_state)
    }
  }

  changeName(i,name){
    return i + "." + name;
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  changeShenpiState(state){
    if (state.state.toLowerCase() == "waiting_review")
    {
      return "等待审核"
    }
    else if (state.state.toLowerCase() == "review_success")
    {
      if (state.last_review_line_id)
      {
        return "审核通过"
      }
      else
      {
        return "提交审核"
      }
    }
    else if (state.state.toLowerCase() == "review_fail")
    {
      return "审核不通过"
    }
    else if (state.state.toLowerCase() == "review_canceled")
    {
      return "取消审核"
    }
  }

}
