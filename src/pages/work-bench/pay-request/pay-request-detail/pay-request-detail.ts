import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PaymentRequestService} from './../pay-requestService';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the PayRequestDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay-request-detail',
  templateUrl: 'pay-request-detail.html',
  providers: [PaymentRequestService],
})
export class PayRequestDetailPage {
  item;
  isShowFooter = false;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
    public payService:PaymentRequestService,public alertCtrl:AlertController) {

    this.frontPage = Utils.getViewController("PayRequestPage", navCtrl)
    this.item = this.navParams.get('item');
    this.storage.get('user')
      .then(res => {
        if(this.item.state == "posted"){
          if(this.item.approve_id.id == res.result.res_data.user_id)
          {
            this.isShowFooter = true;
          }
          else
          {
            this.isShowFooter = false;
          }
        }
        else
        {
          this.isShowFooter = false;
        }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayRequestDetailPage');
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  cancel(){
     let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否确定拒绝?",
        buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            let ctrl_cancel = this.alertCtrl;
            this.payService.reject_payment(this.item.id).then(res => {
                if (res) {
                   if (res.result.res_data.success == 1) {
                      ctrl_cancel.create({
              title: '提示',
              subTitle: "已拒绝",
              buttons: [{
                text: '确定',
                handler: () => {
                  this.frontPage.data.need_fresh = true;
                  this.navCtrl.popTo(this.frontPage);
                }
              }
              ]
            }).present();
                   }
                }
            })
          }
        }
        ],
      }).present();
  }

  conform(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否确定通过?",
        buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            let ctrl_cancel = this.alertCtrl;
            this.payService.confirm_payment(this.item.id).then(res => {
                if (res) {
                   if (res.result.res_data.success == 1) {
                      ctrl_cancel.create({
              title: '提示',
              subTitle: "已通过",
              buttons: [{
                text: '确定',
                handler: () => {
                  this.frontPage.data.need_fresh = true;
                  this.navCtrl.popTo(this.frontPage);
                }
              }
              ]
            }).present();
                   }
                }
            })
          }
        }
        ],
      }).present();
  }

  getState(items){
    if(items.state == "paid"){
      return "已支付"
    }
    else if (items.state == "open"){
      return "打开"
    }
  }

  clickBillDetail(items){
    this.payService.get_bill_detail(items.id).then(res => {
      console.log(res)
        if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.navCtrl.push('BillDetailPage',{
              items:res.result.res_data,
            })
        }
    })
  }

}
