import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PurchaseBackOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-purchase-back-order',
  templateUrl: 'purchase-back-order.html',
})
export class PurchaseBackOrderPage {
  items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseBackOrderPage');
  }

  createBackOrder()
  {
    
  }

}
