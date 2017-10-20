import { Utils } from './../../../../../providers/Utils';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the AddProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-production',
  templateUrl: 'add-production.html',
})
export class AddProductionPage {
  mNumber: number
  deliveryRuls: any
  mPrice: number
  total: any = 0;
  item: any;
  name: any;
  pro_spec: any;
  pro_code: any;
  pro_uom: any;
  productionItem: any;
  mcreateQuotesPage: any;
  // 从上个界面传过来的修改的item 
  changeItem;
  @ViewChild('mNumberCon') mNumberConpent;
  @ViewChild('mPriceCon') mPriceCon;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private alertCtrl: AlertController) {
    this.mcreateQuotesPage = Utils.getViewController("CreateQuotesPage", navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductionPage');
  }
  ionViewDidEnter() {
    this.productionItem = this.navParams.get("productionItem")
    console.log(this.productionItem)
    this.changeItem = this.navParams.get("item")
    if (this.changeItem) {
      this.productionItem = this.changeItem;
    }
    if (this.productionItem) {
      this.item = this.productionItem
      this.name = this.productionItem.name;
      this.pro_spec = this.productionItem.inner_spec;
      this.pro_code = this.productionItem.inner_code;
      this.pro_uom = this.productionItem.uom;
      this.mNumber = this.productionItem.orderNumber;
      this.mPrice = this.productionItem.orderPrice;
    } else {
      this.name = "请选择产品";
      this.pro_spec = "根据产品自动带出";
      this.pro_code = "根据产品自动带出";
      this.pro_uom = "根据产品自动带出";
    }


  }

  save() {
    let alertString = ""
    if (!this.productionItem) {
      alertString = alertString + "请选择产品"
    }
    this.mNumber = this.mNumberConpent._value;
    if (!this.mNumber) {
      alertString = alertString + "  请填写订购数量"
    }
    this.mPrice = this.mPriceCon._value;
    if (!this.mPrice) {
      alertString = alertString + "  请填写产品单价"
    }
    // 都填写了
    if (alertString == "") {
      this.productionItem.orderNumber = this.mNumber;
      this.productionItem.orderPrice = this.mPrice;
      this.mcreateQuotesPage.data.productItem = this.productionItem;
      this.mcreateQuotesPage.data.isAdd = true;
      this.mcreateQuotesPage.data.isChange = this.changeItem ? true : false;
      this.navCtrl.pop();
    } else {
      Utils.toastButtom(alertString, this.toast);
    }

  }

  seleteProduction() {
    this.navCtrl.push('ProductionListPage')
  }

  change() {
    if (this.mNumber && this.mPrice) {
      this.total = this.mNumber * this.mPrice
    }
  }

  goBack() {
    this.mNumber = this.mNumberConpent._value
    console.log(this.mNumber);
    if (this.mNumber || this.mPrice || this.productionItem) {
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

}
