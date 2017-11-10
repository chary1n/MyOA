import { Utils } from './../../../../../providers/Utils';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
declare let cordova: any; 

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
  amount: any;
  remark;
  mBaoxiaoApplyPage;
  production;
  productIndex;
  changeItem;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.productList = this.navParams.get("product");
    this.mBaoxiaoApplyPage = Utils.getViewController("BaoxiaoApplyPage", navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddApplyDetailPage');
  }

  ionViewDidEnter() {
    this.productList = this.navParams.get("product");
    this.changeItem = this.navParams.get("item");
    if (this.changeItem) {
      this.production = this.changeItem;
      this.amount = this.production.amount;
      this.remark = this.production.remark;
      for(let i = 0 ;i<this.productList.length;i++){
        if(this.productList[i].id== this.production.productId){
          this.productIndex = i
        }
      }
    }
  }

  ionViewWillLeave(){
    if(this.platform.is('ios')){
      cordova.plugins.Keyboard.close();
    }
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
    if (parseFloat(this.amount) <= 0)
    {
      Utils.toastButtom("金额必须大于0",this.toastCtrl)
      return;
    }
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
        this.production.productIndex = this.productIndex;
        this.mBaoxiaoApplyPage.data.production = this.production;
        this.mBaoxiaoApplyPage.data.isAdd = true;
        this.mBaoxiaoApplyPage.data.isChange = this.changeItem ? true : false;;
        this.navCtrl.pop();
      }
    }
  }

}
