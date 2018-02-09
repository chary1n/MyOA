import { orderService } from './../orderService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController} from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the ApproveOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-approve-order',
  templateUrl: 'approve-order.html',
  providers:[orderService],
})
export class ApproveOrderPage {
  incomingOrder;
  constructor(public navCtrl: NavController, public navParams: NavParams,public orderService: orderService,
    public toast:ToastController) {
    
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.orderService.get_to_approve_po().then(res => {
      if (res.result && res.result.res_code == 1)
        {
          this.incomingOrder = res.result.res_data
        }
    })
  }


  changeState(state){
    console.log(state)
    if(state=="draft"){
      return "询价单"
    }else  if(state=="make_by_mrp"){
      return "由MRP生成"
    }else  if(state=="sent"){
      return "发送询价单"
    }else  if(state=="to approve"){
      return "待批准"
    }else  if(state=="done"){
      return "已锁定"
    }else  if(state=="cancel"){
      return "已取消"
    }else  if(state=="purchase"){
      return "采购订单"
    }
  }
  changeDuizhang(state){
    if(state=="no"){
      return "待出货"
    }else  if(state=="to invoice"){
      return "待对账"
    }else  if(state=="invoiced"){
      return "已对账完成"
    }else {
      return state
    }
  }

  orderDetailShowNumber(items) {
    this.orderService.requestOrderDetail(items.id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('OrderDetailPage', {
            item: res.result,
            showNumber: true,
            state:items.state,
          })
        }
      })
  }

  toFix(amount){
    return amount.toFixed(2)
  }

}
