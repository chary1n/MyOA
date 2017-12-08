import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Utils } from './../../../../providers/Utils';
import { CommonUseServices } from './../../commonUseServices';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { HttpService } from '../../../../providers/HttpService';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the ZanzhiApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-zanzhi-apply',
  templateUrl: 'zanzhi-apply.html',
  providers: [CommonUseServices]
})
export class ZanzhiApplyPage {
  pre_payment_reminding;
  bank_account_id;
  name;
  remarks;
  amount;
  frontPage;
  isedit;
  order_id;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonUseServices, public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.name = HttpService.user.name
    this.frontPage = Utils.getViewController("ZanzhiPage", navCtrl)
    this.commonService.get_zanzhi_reminding().then(res => {
      if (res.result && res.result.res_code == 1) {
        this.pre_payment_reminding = res.result.res_data.pre_payment_reminding
        this.bank_account_id = res.result.res_data.bank_account_id
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZanzhiApplyPage');
  }

  ionViewWillEnter() {
    let res_data = this.navParams.get("res_data")
    if (res_data) {
      this.remarks = res_data.remark
      this.amount = res_data.amount
      this.isedit = true
      this.order_id = res_data.id
    }
  }

  goBack() {
    this.navCtrl.pop()
  }

  save() {
    let mString = "";
    if(parseFloat(this.amount) <= 0){
      Utils.toastButtom("金额必须大于0元", this.toastCtrl)
      return
    }
    if (!this.amount) {
      mString = mString + "   请填写金额"
    }
    if (!this.remarks) {
      mString = mString + "   请填写暂支原因"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      if(this.isedit){
        this.alertCtrl.create({
          title: '提示',
          subTitle: "是否立即提交审核?",
          buttons: [
            {
              text: '不提交',
              handler: () => {
                this.frontPage.data.need_fresh = true;
                this.navCtrl.popTo(this.frontPage)
              }
            },
            {
              text: '提交',
              handler: () => {
                  this.toEditSave(true)
              }
            },
          ]
        }).present();
      }else{
        this.alertCtrl.create({
          title: '提示',
          subTitle: "已保存,是否立即提交审核?",
          buttons: [
            {
              text: '暂不提交',
              handler: () => {
                  this.toSave(false)
              }
            },
            {
              text: '提交',
              handler: () => {
                  this.toSave(true)
              }
            },
          ]
        }).present();
      }
    }
  }

  toEditSave(submit){
    this.commonService.save_edit_zanzhi(this.amount, this.remarks, submit,this.order_id).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.frontPage.data.need_fresh = true;
        this.navCtrl.popTo(this.frontPage)
      }
    })
  }


  toSave(submit) {
    this.commonService.save_zanzhi(this.amount, this.remarks, submit).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.frontPage.data.need_fresh = true;
        this.navCtrl.pop()
      }
    })
  }
}
