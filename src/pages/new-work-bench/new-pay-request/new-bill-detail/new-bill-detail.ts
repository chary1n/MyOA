import { HttpService } from './../../../../providers/HttpService';
import { NavController, NavParams, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
/**
 * Generated class for the NewBillDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-bill-detail',
  templateUrl: 'new-bill-detail.html',
})
export class NewBillDetailPage {
  item
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBillDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

}
