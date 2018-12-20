import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events,ToastController } from 'ionic-angular';
import { PoService } from './../PoService';

import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the NewPoApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-po-approval',
  templateUrl: 'new-po-approval.html',
  providers: [PoService],
})
export class NewPoApprovalPage {
  po_arr = []
  frontpage
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams,public poService: PoService,public storage:Storage) {
    this.po_arr = this.navParams.get('po_arr')
    this.frontpage = Utils.getViewController("NewPurchaseOrderPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPoApprovalPage');
  }

  ionViewDidEnter(){
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.poService.get_po_approve({ 'uid': this.user_id }).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.po_arr = res.result.res_data
      }
    })
    }
  }

  orderDetail(items) {
    this.poService.get_po({'id':items.id})
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('NewPurchaseOrderDetailPage', {
            item: res.result,
            showNumber: false,
            state:items.state,
            frontPage: 'NewPoApprovalPage',
          })
        }
      })
  }

  changeState(state) {
    console.log(state)
    if (state == "draft") {
      return "草稿"
    } else if (state == "sent") {
      return "发送询价单"
    } else if (state == "reviewing") {
      return "审核中"
    } else if (state == "rejected") {
      return "已锁定"
    } else if (state == "purchase") {
      return "采购订单"
    } else if (state == "done") {
      return "已完成"
    } else if (state == "cancel") {
      return "已取消"
    }
  }
  changeDuizhang(state) {
    if (state == "no") {
      return "没有要对账的"
    } else if (state == "to invoice") {
      return "待对账"
    } else if (state == "invoiced") {
      return "已对账完成"
    } else {
      return state
    }
  }

  toFix(amount) {
    return amount.toFixed(2)
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  goBack(){
    // this.navCtrl.pop()
    this.frontpage.data.need_fresh = true;
    this.navCtrl.popTo(this.frontpage);
  }

}
