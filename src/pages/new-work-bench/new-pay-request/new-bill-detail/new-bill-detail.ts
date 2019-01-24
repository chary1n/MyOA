import { HttpService } from './../../../../providers/HttpService';
import { NavController, NavParams, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NewPayService } from './../new-pay-service'

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
  providers: [NewPayService]
})
export class NewBillDetailPage {
  item
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public newPayService: NewPayService) {
    this.item = this.navParams.get('item')
    this.user_id = this.navParams.get('user_id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBillDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_dk(items) {
    this.newPayService.get_pay_detail({ 'pay_id': items.payment_id }).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('NewPayRequestDetailPage', {
          'item': res.result.res_data,
          'user_id': this.user_id,
          'frontPage': 'NewBillDetailPage',
        })
      }
    })
  }

}
