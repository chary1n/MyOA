import { ReturnOrderDetailPage } from './../return-order-detail/return-order-detail';
import { OrderDetailPage } from './../order-detail/order-detail';
import { orderService } from './orderService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

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
  limit=20;
  offset= 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public orderService: orderService,
    public loadingCtrl: LoadingController) {
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

  doRefresh1(refresh) {
    this.limit = 20;
    this.offset = 0;
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.orderService.requestMakeOrderByMRP(0, 20).then((res) => {
        console.log(res)
        loading.dismiss();
        refresh.complete();
        this.orderMRP = res.result.res_data;
      })
    });
  }

  
  doInfinite1(infiniteScroll) {
    this.limit = 20;
    this.offset =this.offset+20;
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
        loading.dismiss();
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          for (let item of item_data) {
            this.orderMRP.push(item);
          }
        }
        infiniteScroll.complete();
      })
    });
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


 doRefresh4(refresh) {
    this.limit = 20;
    this.offset = 0;
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.orderService.requestReturnOrder(0, 20).then((res) => {
        console.log(res)
        loading.dismiss();
        refresh.complete();
        this.returnOrder = res.result.res_data;
      })
    });
  }

  doInfinite4(infiniteScroll) {
    this.limit = 20;
    this.offset += 20;
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.orderService.requestReturnOrder(this.limit, this.offset).then((res) => {
        console.log(res)
        loading.dismiss();
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          for (let item of item_data) {
            this.returnOrder.push(item);
          }
        }
        infiniteScroll.complete();
      })
    });
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
