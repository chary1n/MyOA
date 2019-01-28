import { HttpService } from './../../../../providers/HttpService';
import { NavController, NavParams, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Utils } from './../../../../providers/Utils';
import { NewPayService } from './../new-pay-service'
/**
 * Generated class for the NewPayRequestDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-pay-request-detail',
  templateUrl: 'new-pay-request-detail.html',
  providers: [NewPayService],
})
export class NewPayRequestDetailPage {
  item
  isShowFooter = false
  user_id
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public newPayService: NewPayService,
    public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.item = this.navParams.get('item')
    this.user_id = this.navParams.get('user_id')
    this.frontPage = Utils.getViewController(this.navParams.get('frontPage'), navCtrl)
    if (this.item.approval_user_id == this.user_id) {
      this.isShowFooter = true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPayRequestDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  changeState(state) {
    if (state == 'draft') {
      return "草稿";
    }
    else if (state == 'cancel') {
      return "被拒";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'rejected') {
      return "被拒";
    }
    else if (state == 'paid') {
      return "已支付";
    }
    else if (state == 'done') {
      return "审核完成";
    }
    else {
      return '';
    }
  }

  changeType(type) {
    if (type == 'advance') {
      return "预付款";
    }
    else if (type == 'normal') {
      return "结算款";
    }
    else {
      return ''
    }
  }

  getState(items) {
    if (items.state == "paid") {
      return "已支付"
    }
    else if (items.state == "open") {
      return "打开"
    }
  }

  changeBillState(state) {
    if (state == 'no') {
      return '无需开票'
    }
    else if (state == 'wait') {
      return '欠票'
    }
    else if (state == 'done') {
      return '完成'
    }
    else {
      return ''
    }
  }

  fixTwo(item) {
    return parseFloat(item).toFixed(2)
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  conform() {
    // let body = this.calDetail();
    let ctrl = this.alertCtrl;

    ctrl.create({
      title: '提示',
      message: "填写审批备注",
      inputs: [
        {
          name: 'title',
          placeholder: '审批备注(选填)'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '通过',
          handler: data => {
            if (data.title) {
              let body = {
                'user_id': this.user_id,
                'remark': data.title,
                'pay_id': this.item.id,
                'is_pass': true,
              }
              this.newPayService.approval_pay_request(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom("已通过", this.toastCtrl)
                    this.frontPage.data.need_fresh = true;
                    this.navCtrl.popTo(this.frontPage);
                  }
                }
              })
            }
            else {
              let body = {
                'user_id': this.user_id,
                'remark': '',
                'pay_id': this.item.id,
                'is_pass': true,
              }
              this.newPayService.approval_pay_request(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom("已通过", this.toastCtrl)
                    this.frontPage.data.need_fresh = true;
                    this.navCtrl.popTo(this.frontPage);
                  }
                }
              })
            }
          }
        }]
    }).present();
  }

  cancel() {
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "输入拒绝的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title) {
              let body = {
                'user_id': this.user_id,
                'remark': data.title,
                'pay_id': this.item.id,
                'is_pass': false,
              }
              this.newPayService.approval_pay_request(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom("已拒绝", this.toastCtrl)
                    this.frontPage.data.need_fresh = true;
                    this.navCtrl.popTo(this.frontPage);
                  }
                }
              })
            }
            else {
              Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
            }
          }
        }
      ]
    }).present();
  }

  click_po_detail(po_id){
    this.newPayService.get_po({ 'id': po_id })
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('NewPurchaseOrderDetailPage', {
            item: res.result,
            showNumber: false,
            state: res.result.res_data.state,
            frontPage: 'NewPayRequestDetailPage',
          })
        }
      })
  }

  clickBillDetail(items){
    let body = {
      'bill_id': items.id,
      'user_id': this.user_id
    }
    this.newPayService.get_bill_detail(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('NewBillDetailPage',{
          'item':res.result.res_data,
          'user_id': this.user_id,
        })
      }
    })
  }
}
