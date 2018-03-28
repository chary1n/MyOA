import { NavController, NavParams, IonicPage,AlertController,ToastController,Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../../providers/Utils';
import { Toast } from '@ionic-native/toast';
declare let cordova: any;

/**
 * Generated class for the EditReimbursementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-reimbursement',
  templateUrl: 'edit-reimbursement.html',
})
export class EditReimbursementPage {
  productList;
  amount: any;
  remark;
  remarks;  //备注
  mBaoxiaoApplyPage;
  production;
  productIndex;
  changeItem;
  taxIndex
  taxList;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.mBaoxiaoApplyPage = Utils.getViewController("ReimbursementDetailPage", navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditReimbursementPage');
  }

  ionViewDidEnter() {
    this.productList = this.navParams.get("product");
    this.changeItem = this.navParams.get("item");
    this.taxList = this.navParams.get("taxList");
    if (this.changeItem) {
      this.production = this.changeItem;
      this.amount = this.production.unit_amount;
      this.remark = this.production.name;
      this.remarks = this.production.description;
      for(let i = 0 ;i<this.productList.length;i++){
        if((new RegExp(this.production.product_id).test(this.productList[i].name)) || this.production.product_id == this.productList[i].name){
          this.productIndex = i
        }
      }
      // console.log(this.production.tax_ids[0].displayname)
      for(let i = 0 ;i<this.taxList.length;i++){
        if(this.taxList[i].name== this.production.tax_ids[0].display_name){
          this.taxIndex = i
        }
      }
      console.log(this.taxIndex)
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
    if (this.productIndex!=0 &&!this.productIndex) {
      mString = mString + "   请选择费用类别"
    }
    if (!this.amount) {
      mString = mString + "   请填写金额"
    }
    if (!this.remark) {
      mString = mString + "   请填写消费用途"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      if (this.amount && this.remark) {
        this.production = [];
        // this.production.productId = this.productList[this.productIndex].id;
        this.production.product_id = this.productList[this.productIndex].name;
        this.production.unit_amount = this.amount;
        this.production.name = this.remark;
        this.production.description = this.remarks;
        // this.production.tax_ids[0].display_name = this.taxIndex ;
        console.log(this.taxIndex)
        if(this.taxIndex==0||this.taxIndex){
          this.production.tax_ids= [{
            display_name:this.taxList[this.taxIndex].name,
          }];
        }
        this.production.productIndex = this.productIndex;
        this.mBaoxiaoApplyPage.data.production = this.production;
        this.mBaoxiaoApplyPage.data.isAdd = true;
        this.mBaoxiaoApplyPage.data.isChange = this.changeItem ? true : false;;
        this.navCtrl.pop();
      }
    }
  }

}
