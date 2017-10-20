import { Utils } from './../../../../../providers/Utils';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the AddApplyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-apply-detail',
  templateUrl: 'add-apply-detail.html',
})
export class AddApplyDetailPage {
  productList;
  amount: number;
  remark;
  mBaoxiaoApplyPage;
  production;
  productIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.productList = this.navParams.get("product");
    this.mBaoxiaoApplyPage = Utils.getViewController("BaoxiaoApplyPage", navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddApplyDetailPage');
  }
  goBack() {
    if (this.productIndex || this.amount || this.remark) {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
    else {
      this.navCtrl.pop();
    }
  }

  save() {
    let mString = "";
    if (!this.productIndex) {
      mString = mString + "   请选择产品"
    }
    if (!this.amount) {
      mString = mString + "   请填写金额"
    }
    if (!this.remark) {
      mString = mString + "   请填写费用说明"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      if (this.productIndex && this.amount && this.remark) {
        this.production = [];
        this.production.productId = this.productList[this.productIndex].id;
        this.production.productName = this.productList[this.productIndex].name;
        this.production.amount = this.amount;
        this.production.remark = this.remark;
        this.mBaoxiaoApplyPage.data.production = this.production;
        this.mBaoxiaoApplyPage.data.isAdd = true;
        this.navCtrl.pop();
      }
    }
  }

}
