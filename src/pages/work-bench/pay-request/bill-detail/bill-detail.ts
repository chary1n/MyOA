import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { PaymentRequestService} from './../pay-requestService';
/**
 * Generated class for the BillDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html',
  providers:[PaymentRequestService],
})
export class BillDetailPage {
  items;
  show_type;
  constructor(public navCtrl: NavController, public navParams: NavParams,public paymentRequestService:PaymentRequestService) {
    this.show_type = "one"
    this.items = this.navParams.get('items')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillDetailPage');
  }

  click_one(){
    this.show_type = "one"
  }

  click_two(){
    this.show_type = "two"
  }

  cal(item){
    return item.qty_received / item.product_qty * 100
  }
}
