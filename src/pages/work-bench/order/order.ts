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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public orderService: orderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  clickOne() {

  }
  clickTwo() {

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

  }




}
