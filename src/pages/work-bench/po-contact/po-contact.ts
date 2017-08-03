import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PoContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-po-contact',
  templateUrl: 'po-contact.html',
})
export class PoContactPage {
  items:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoContactPage');
  }

}
