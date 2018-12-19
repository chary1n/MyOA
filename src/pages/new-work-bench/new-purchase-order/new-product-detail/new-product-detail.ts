import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

/**
 * Generated class for the NewProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-product-detail',
  templateUrl: 'new-product-detail.html',
})
export class NewProductDetailPage {

  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("data")
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

}