import { Utils } from './../../../../../providers/Utils';
import { CustomerListPage } from './../customer-list/customer-list';
import { DatePicker } from '@ionic-native/date-picker';
import { SalesSearvice } from './../../salesService';
import { BillingInfoPage } from './billing-info/billing-info';
// import { SalesInfoPage } from './sales-info/sales-info';
// import { DeliveryInfoPage } from './delivery-info/delivery-info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ImproveQuotationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-improve-quotation',
  templateUrl: 'improve-quotation.html',
  providers: [SalesSearvice]
})
export class ImproveQuotationPage {
  remarks: any;
  myDate: any;
  PINumber;
  customer;
  seleteDate;
  paymentList: any;
  payment: any;
  taxList;
  tax;
  deliveryRuls;
  deliveryRulsList;
  invoiceAddress;
  invoiceAddressList;
  deliveryAddress;
  deliveryAddressList;
  customerID;
  deliveryInfo;
  salesInfo;
  mCreateQuotesPage;
  improveQuotaInfo;
  dateTime ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salesSearvice: SalesSearvice,
    private datePicker: DatePicker, private toastCtrl: ToastController) {
    this.mCreateQuotesPage = Utils.getViewController("CreateQuotesPage", navCtrl);
    this.customerID = this.navParams.get("id")
    this.salesSearvice.getPaymentTermList().then(res => {
      console.log(res)
      this.paymentList = res.result.res_data
    })
    // this.salesSearvice.getTaxList().then(res=>{
    //   console.log(res)
    //   this.taxList= res.result.res_data
    // })
    // this.salesSearvice.getDeliveryList().then(res=>{
    //   console.log(res)
    //   this.deliveryRulsList= res.result.res_data
    // })
    this.salesSearvice.getDeliveryAddressList(this.customerID).then(res => {
      this.deliveryAddressList = res.result.res_data
    })
    this.salesSearvice.getPaymentAddressList(this.customerID).then(res => {
      this.invoiceAddressList = res.result.res_data
    })
    this.seleteDate = new Date().toISOString().split("T")[0];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImproveQuotationPage');

   
  }

  initView(){
    this.improveQuotaInfo = this.navParams.get("improveQuotaInfo")
    console.log(this.improveQuotaInfo)
    if(this.improveQuotaInfo){
      this.invoiceAddress = this.improveQuotaInfo.invoiceAddress
      this.deliveryAddress = this.improveQuotaInfo.deliveryAddress
      this.PINumber = this.improveQuotaInfo.PINumber
      this.dateTime = this.improveQuotaInfo.billsDate
      this.payment = this.improveQuotaInfo.payment_term
      this.remarks = this.improveQuotaInfo.remarks
      this.deliveryInfo = this.improveQuotaInfo.deliveryInfo
      this.salesInfo = this.improveQuotaInfo.salesInfo
    }
  }


  ionViewDidEnter() {
    this.deliveryInfo = this.navParams.get("deliveryInfo")
    this.salesInfo = this.navParams.get("salesInfo")
    this.initView()
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


  clickDeliveryInfo() {
    this.navCtrl.push('DeliveryInfoPage', { deliveryInfo: this.deliveryInfo })
  }


  deliveryCallback = (params) => {
    return new Promise((resolve, reject) => {
      if (typeof (params) != 'undefined') {
        resolve("ok");
      } else {
        reject(Error("error"))
      }
    })

  }

  clickSalesInfo() {
    this.navCtrl.push('SalesInfoPage', { salesInfo: this.salesInfo })
  }

  // seleteCustomer() {
  //   this.navCtrl.push(CustomerListPage);
  // }

  save() {
    let mString = "";
    if (!this.invoiceAddressList) {
      this.invoiceAddress = this.customerID
    }
    if (!this.deliveryAddressList) {
      this.deliveryAddress = this.customerID
    }
    if (!this.invoiceAddress) {
      mString = mString + "   请填写发票地址"
    }
    if (!this.deliveryAddress) {
      mString = mString + "   请填写送货地址"
    }
    if (!this.deliveryInfo) {
      mString = mString + "   请完善送货信息"
    }
    if (!this.salesInfo) {
      mString = mString + "   请完善销售信息"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      this.dateTime = new Date().getTime();
      this.mCreateQuotesPage.data.improveQuotesInfo = {
        invoiceAddress: this.invoiceAddress,
        deliveryAddress: this.deliveryAddress,
        PINumber: this.PINumber,
        billsDate: this.dateTime,
        payment_term: this.payment,
        remarks: this.remarks,
        deliveryInfo: this.deliveryInfo,
        salesInfo: this.salesInfo
      }
      this.navCtrl.pop();
    }
  }



  // clickBillingInfo(){
  //   this.navCtrl.push(BillingInfoPage)
  // }


}
