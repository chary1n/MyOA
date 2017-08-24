import { Utils } from './../../../../../../providers/Utils';
import { SalesSearvice } from './../../../salesService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the DeliveryInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-info',
  templateUrl: 'delivery-info.html',
  providers: [SalesSearvice]

})
export class DeliveryInfoPage {
  wareHouseList: any;
  wareHouse: any;
  deliveryRuls: any;
  tradeTerms: any;
  deliveryRulsList: any;
  tradeTermsList: any;
  mImproveQuotationPage;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salesSearvice: SalesSearvice, private toastCtrl: ToastController,
    private viewCtrl: ViewController) {
    this.mImproveQuotationPage = Utils.getViewController("ImproveQuotationPage", navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryInfoPage');
    this.salesSearvice.getWareHouseList().then(res => {
      console.log(res)
      this.wareHouseList = res.result.res_data
    })
    this.salesSearvice.getDeliveryRulsList().then(res => {
      console.log(res)
      this.deliveryRulsList = res.result.res_data
    })
    this.salesSearvice.getIncotermList().then(res => {
      console.log(res)
      this.tradeTermsList = res.result.res_data
    })
  }

  save() {
    let mString = "";
    if (!this.wareHouse) {
      mString = mString + "   请选择仓库"
    }
    if (!this.deliveryRuls) {
      mString = mString + "   请选择送货策略"
    }

    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    }else{
      this.mImproveQuotationPage.data.deliveryInfo = { 
        warehouse:this.wareHouse,
        incoterm :this.tradeTerms,
        picking_policy:this.deliveryRuls
      }
      this.navCtrl.pop();
    }

  }



}
