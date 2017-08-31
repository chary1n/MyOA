import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bom',
  templateUrl: 'bom.html',
})
export class BomPage {
  item ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item")
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BomPage');
  }
  
}
