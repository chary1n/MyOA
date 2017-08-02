import { ReturnOrderDetailPage } from './../return-order-detail/return-order-detail';
import { OrderDetailPage } from './../order-detail/order-detail';
import { orderService } from './orderService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [orderService]
})
export class OrderPage {
  pet: string = "puppies";
  incomingOrder: any;
  orderMRP: any;
  priceOrder: any;
  returnOrder: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public orderService: orderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  clickOne() {
    this.orderService.requestMakeOrderByMRP(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.orderMRP = res.result.res_data
          console.log(this.orderMRP)
        }
      })

  }
  clickTwo() {
    this.orderService.requestPriceOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.priceOrder = res.result.res_data
          console.log(this.priceOrder)
        }
      })

  }

  clickThree() {
    this.orderService.requestIncomingOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.incomingOrder = res.result.res_data
          console.log(this.incomingOrder)
        }
      })

  }

  clickFour() {
    this.orderService.requestReturnOrder(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.returnOrder = res.result.res_data
          console.log(this.returnOrder)
        }
      })

  }

  orderDetail(id) {
    this.orderService.requestOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push(OrderDetailPage, {
            item: res.result
          })
        }
      })
  }

  returnOrderDetail(id) {
    this.orderService.requestReturnOrderDetail(id)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push(ReturnOrderDetailPage, {
            item: res.result
          })
        }
      })
  }

  //搜索
  getItems(ev: any) {
    let searchText = ev.target.value;
    if (searchText && searchText.trim() != '') {

        return '1';
      }
    }

}
