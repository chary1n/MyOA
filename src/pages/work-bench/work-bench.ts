import { SalesOrderPage } from './salesOrder/salesOrder';
import { OrderPage } from './order/order';
import { InspectionDetailPage } from './inspection-detail/inspection-detail';
import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage} from './incoming/incoming';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierListPage } from './supplier-list/supplier-list';
import { CustomerPage } from './../customer/customer';
import { WorkBenchModel} from './../../model/WorkBenchModel';
import { Storage} from '@ionic/storage';

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
  dataSource:any
  model:WorkBenchModel
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkBenchPage');
    
  }

  ionViewDidEnter()
  {
    let isShowPurchase = false;
    let isShowSale = false;
    this.storage.get('user')
      .then(res => {
        console.log(res);
        for (let product of res.result.res_data.groups) {
          if (product.name == 'group_purchase_user' || product.name == 'group_purchase_manager') {
            isShowPurchase = true;
          }
          if (product.name == 'group_sale_salesman' || product.name == 'group_sale_manager' || product.name == 'group_sale_salesman_all_leads')
          {
            isShowSale = true;
          }
        }
        let newArr = [];
        if (isShowPurchase)
        {
          newArr.push(new WorkBenchModel('assets/img/shenpi.png','采购入库'));
          newArr.push(new WorkBenchModel('assets/img/shenpi.png','供应商'));
          newArr.push(new WorkBenchModel('assets/img/shenpi.png','采购订单'));
        }
        if (isShowSale)
        {
          newArr.push(new WorkBenchModel('assets/img/shenpi.png','客户查询'));
          newArr.push(new WorkBenchModel('assets/img/shenpi.png','产品查询'));
          newArr.push(new WorkBenchModel('assets/img/shenpi.png','销售订单'));
        }
        this.dataSource = newArr;
      });
  }

  click(item)
  {
    if (item.title == '采购入库')
    {
      this.navCtrl.push(IncomingPage);
    }
    else if (item.title == '供应商')
    {
      this.navCtrl.push(SupplierListPage);
    }
    else if (item.title == '采购订单')
    {
      this.navCtrl.push(OrderPage);
    }else if (item.title == '销售订单')
    {
      this.navCtrl.push(SalesOrderPage);
    }
    else if (item.title == '客户查询')
    {
      this.navCtrl.push(CustomerPage);
    }
  }

}
