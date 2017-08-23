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
  providers :[SalesSearvice]
})
export class CreateQuotesPage {
  deliveryRuls: string = "一次性发货"
  deliveryRulsList ;
  taxList ;
  tax: string
  seleteDate: any
  products: any
  isAdd = false;
  items: any[];
  noTaxTotal: number;
  taxTotal: number;
  total: number;
  customer;
  customerName  = "请选择客户";
  priceForm ;
  priceFormList ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private datePicker: DatePicker,private salesSearvive:SalesSearvice,
    private toastCtrl :ToastController) {
    this.items = [];
    this.salesSearvive.getDeliveryList().then(res=>{
      this.deliveryRulsList = res.result.res_data
    })
    this.salesSearvive.getTaxList().then(res=>{
      this.taxList = res.result.res_data
    })
    this.salesSearvive.getPriceFormList().then(res=>{
      this.priceFormList = res.result.res_data
    })
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CreateQuotesPage');
  }



  ionViewDidEnter() {
    let item = this.navParams.get("productItem")
    this.isAdd = this.navParams.get("isAdd")
    if (this.isAdd) {
      this.items.push(item);
      this.navParams.data.isAdd= false ;
    }
    this.customer = this.navParams.get("customer")
    if(this.customer){
      this.customerName = this.customer.name
    }
  }


  improveQuotation() {
    if(this.customer){
      this.navCtrl.push(ImproveQuotationPage,{id:this.customer.id})
    }else{
      Utils.toastButtom("请先选择客户",this.toastCtrl)
    }
  }

  addProductions() {
    this.isAdd = false;
    this.navCtrl.push(AddProductionPage)
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

}
