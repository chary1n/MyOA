import { Utils } from './../../../../providers/Utils';
import { SalesSearvice } from './../salesService';
import { CustomerListPage } from './customer-list/customer-list';
import { DatePicker } from '@ionic-native/date-picker';
import { AddProductionPage } from './add-production/add-production';
import { ImproveQuotationPage } from './improve-quotation/improve-quotation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CreateQuotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-quotes',
  templateUrl: 'create-quotes.html',
  providers: [SalesSearvice]
})
export class CreateQuotesPage {
  deliveryRuls: string = "一次性发货"
  deliveryRulsList;
  taxList;
  tax: string
  seleteDate: any
  products: any
  isAdd = false;
  isChange = false;
  items: any[];
  noTaxTotal: number;
  taxTotal: number;
  total: number;
  customer;
  customerName = "请选择客户";
  priceForm;
  priceFormList;
  mimproveQuotesInfo;
  index ;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private datePicker: DatePicker, private salesSearvive: SalesSearvice,
    private toastCtrl: ToastController) {
    this.items = [];
    this.salesSearvive.getDeliveryList().then(res => {
      this.deliveryRulsList = res.result.res_data
    })
    this.salesSearvive.getTaxList().then(res => {
      this.taxList = res.result.res_data
    })
    this.salesSearvive.getPriceFormList().then(res => {
      this.priceFormList = res.result.res_data
    })
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CreateQuotesPage');
  }



  ionViewDidEnter() {
    let item = this.navParams.get("productItem")
    this.mimproveQuotesInfo = this.navParams.get("improveQuotesInfo")
    this.isAdd = this.navParams.get("isAdd")
    this.isChange = this.navParams.get("isChange")
    if (this.isAdd) {
      this.items.push(item);
      this.navParams.data.isAdd = false;
    }
    if(this.isChange){
      this.items.splice(this.index , 1);
      this.navParams.data.isChange = false ;
    }
    this.customer = this.navParams.get("customer")
    if (this.customer) {
      this.customerName = this.customer.name
    }

  }


  improveQuotation() {
    if (this.customer) {
      this.navCtrl.push(ImproveQuotationPage, {
        id: this.customer.id,
        improveQuotaInfo: this.mimproveQuotesInfo
      })
    } else {
      Utils.toastButtom("请先选择客户", this.toastCtrl)
    }
  }

  addProductions() {
    this.isAdd = false;
    this.navCtrl.push(AddProductionPage)
  }


  changeProductItem(i) {
    this.index = i ;
    this.navCtrl.push(AddProductionPage, { item: this.items[i], index: i })
  }

  deleteProductItem(i) {
    this.items.splice(i, 1)
  }

  chooseDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
    }).then(
      date => this.seleteDate = date,
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  seleteCustomer() {
    this.navCtrl.push(CustomerListPage);
  }

  save() {
    let mString = "";
    if (!this.customerName) {
      mString = mString + "   请选择客户"
    }
    if (!this.deliveryRuls) {
      mString = mString + "   请选择交货规则"
    }
    if (!this.tax) {
      mString = mString + "   请选择税率"
    }
    if (!this.seleteDate) {
      mString = mString + "   请选择交货日期"
    }
    if (!this.mimproveQuotesInfo) {
      mString = mString + "   请完善报价单"
    }
    if (this.items.length == 0) {
      mString = mString + "   请选择产品"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      let mbody = {
        cusomer: this.customer.id,
        delivery: this.deliveryRuls,
        tax: this.tax,
        deliveryDate: this.seleteDate,
        improveQuotation: this.mimproveQuotesInfo,
        productions: this.items
      }
      let body = {
        data: mbody
      }
      this.salesSearvive.createSoOrder(body).then(res => {
        console.log(res)
        if(res.result&&res.result.res_code==1){
          this.navCtrl.pop()
        }
      })
    }
  }
}
