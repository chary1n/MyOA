import { orderService } from './../../order/orderService';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the ReturnProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-return-product-detail',
  templateUrl: 'return-product-detail.html',
  providers:[orderService]
})
export class ReturnProductDetailPage {

  item;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public orderservice: orderService) {
    this.item = this.navParams.get("data")
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnProductDetailPage');
  }

  pushToDetail() {
    this.orderservice.get_product_detail_by_id(this.item.id).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push("NewProductDetailPage", { "item": res.result.res_data })
      }
    })
  }

}
