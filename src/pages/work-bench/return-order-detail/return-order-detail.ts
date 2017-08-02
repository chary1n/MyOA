import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReturnOrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-return-order-detail',
  templateUrl: 'return-order-detail.html',
})
export class ReturnOrderDetailPage {
  item: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item').res_data
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnOrderDetailPage');
  }

}
