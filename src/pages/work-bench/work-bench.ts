import { ProductionSearchPage } from './production-search/production-search';
import { SalesOrderPage } from './salesOrder/salesOrder';
import { OrderPage } from './order/order';
import { InspectionDetailPage } from './inspection-detail/inspection-detail';
import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage } from './incoming/incoming';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierListPage } from './supplier-list/supplier-list';
import { CustomerPage } from './../customer/customer';
import { WorkBenchModel } from './../../model/WorkBenchModel';
import { Storage } from '@ionic/storage';
import { CamCardPage } from './../customer/cam-card/cam-card'
import { ProductlistPage } from './../customer/productlist/productlist';
import { BiaoQianPage } from './../customer/biao-qian/biao-qian';

/**
 * Generated class for the WorkBenchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-work-bench',
  templateUrl: 'work-bench.html',
})
export class WorkBenchPage {
  dataSource: any
  model: WorkBenchModel
  isShowPurchase = false;
  isShowSale = false;
  isHR = false ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkBenchPage');
  }

  ionViewDidEnter() {

    this.storage.get('user')
      .then(res => {
        console.log(res);
        for (let product of res.result.res_data.groups) {
          if (product.name == 'group_purchase_user' || product.name == 'group_purchase_manager') {
            this.isShowPurchase = true;
          }
          if (product.name == 'group_sale_salesman' || product.name == 'group_sale_manager' || product.name == 'group_sale_salesman_all_leads') {
            this.isShowSale = true;
          }
        }
      });
  }

  clickInComingWareHouse() {
    this.navCtrl.push(IncomingPage);
  }
  supplierList() {
    this.navCtrl.push(SupplierListPage);
  }

  purchaseOrder() {
    this.navCtrl.push(OrderPage);
  }

  salesOrder() {
    this.navCtrl.push(SalesOrderPage);
  }

  customerSearch() {
    this.navCtrl.push(CustomerPage);
  }

  camCard() {
    this.navCtrl.push(CamCardPage);
  }

  ProductionSearch() {
    this.navCtrl.push(ProductionSearchPage);
  }

  reimbursement(){
    this.navCtrl.push('ReimbursementPage')
  }

}
