import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomingDetailPage } from './../incoming-detail/incoming-detail'

/**
 * Generated class for the DeliveryNotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-notes',
  templateUrl: 'delivery-notes.html',
})
export class DeliveryNotesPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryNotesPage');
  }
  incoming_detail(item) {
    this.navCtrl.push(IncomingDetailPage, {
      type: "purchase",
      item: item,
    });
  }
}
