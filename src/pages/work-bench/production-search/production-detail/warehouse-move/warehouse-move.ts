import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WarehouseMovePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-warehouse-move',
  templateUrl: 'warehouse-move.html',
})
export class WarehouseMovePage {
  items ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items =  this.navParams.get("item").stock_move ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarehouseMovePage');
  }

}
