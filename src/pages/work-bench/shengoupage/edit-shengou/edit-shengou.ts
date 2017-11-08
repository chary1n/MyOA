import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController,ToastController} from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShenGouService} from './../shengouService'

/**
 * Generated class for the EditShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-shengou',
  templateUrl: 'edit-shengou.html',
  providers:[ShenGouService],
})
export class EditShengouPage {
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
    this.mShenGoupage = Utils.getViewController("MyshengoudetailPage", navCtrl);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShengouPage');
  }

  ionViewDidEnter() {
    this.changeItem = this.navParams.get("item");
    console.log(this.changeItem);
    if (this.changeItem) {
      this.production = this.changeItem;
      console.log(this.production.product_id.name)
      this.amount = this.production.price_unit;
      this.remark = this.production.description;
      this.unit = this.production.quantity;
      this.shenGouService.get_all_products().then((res) => {
        if (res.result.res_code == 1)
        {
         this.productList = res.result.res_data.res_data;
         for (let item of this.productList) {
           
          if ((new RegExp(this.production.product_id.name).test(item.name)) || this.production.product_id.name == item.name)
          {
            this.productIndex = item.name;
          }
         }
        }
      })
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
    if (!this.unit) {
      mString = mString + "   请填写数量"
    }
    if (!this.remark) {
      mString = mString + "   请填写费用说明"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      if (this.productIndex && this.amount && this.remark && this.unit) {
        console.log(this.productIndex);
        this.production = [];
        for (let item of this.productList) {
          if(item.name == this.productIndex){
            this.production.product_id = {
              id:item.id,
              name:this.productIndex
            };
          }
        }
        this.production.price_unit = this.amount;
        this.production.description = this.remark;
        this.production.quantity = this.unit;

        this.mShenGoupage.data.production = this.production;
        this.mShenGoupage.data.isAdd = true;
        this.mShenGoupage.data.isChange = this.changeItem ? true : false;;
        this.navCtrl.pop();
      }
    }
  }

}
