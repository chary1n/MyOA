import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController,ToastController} from 'ionic-angular';
import { ShenGouService} from './../../shengouService'
import { Utils } from './../../../../../providers/Utils';

/**
 * Generated class for the AddShengouDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-shengou-detail',
  templateUrl: 'add-shengou-detail.html',
  providers:[ShenGouService]
})
export class AddShengouDetailPage {
  amount;
  unit;
  remark;
  productList;
  productIndex;
  production;
  changeItem;
  mShenGoupage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public shenGouService:ShenGouService,
  public alertCtrl:AlertController,public toastCtrl:ToastController) {
    this.mShenGoupage = Utils.getViewController("CreateShengouPage", navCtrl);

    this.shenGouService.get_all_products().then((res) => {
      console.log(res);
      if (res.result.res_code == 1)
      {
        this.productList = res.result.res_data.res_data;
      }
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShengouDetailPage');
  }

  ionViewDidEnter() {
    this.changeItem = this.navParams.get("item");
    if (this.changeItem) {
      this.production = this.changeItem;
      this.amount = this.production.amount;
      this.remark = this.production.remark;
      this.productIndex = this.production.productIndex;
      this.unit = this.production.unit;
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
        console.log(this.productIndex);
        this.production = [];
        for (let item of this.productList) {
          if(item.name == this.productIndex){
            this.production.productId = item.id;
          }
        }
        this.production.productName = this.productIndex;
        this.production.amount = this.amount;
        this.production.remark = this.remark;
        this.production.unit = this.unit;
        this.production.productIndex = this.productIndex;
        this.mShenGoupage.data.production = this.production;
        this.mShenGoupage.data.isAdd = true;
        this.mShenGoupage.data.isChange = this.changeItem ? true : false;;
        this.navCtrl.pop();
      }
    }
  }
}
