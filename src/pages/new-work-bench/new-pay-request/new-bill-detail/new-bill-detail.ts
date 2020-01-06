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

  fmoney(s, n)   
  {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1].substr(0,2);   
   let t = ""; 
   let i;  
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   
   return t.split("").reverse().join("") + "." + r;   
  } 

  transInt(item){
    if (item) {
      return parseFloat(item).toFixed(2)
    }
    else {
      return '0.00'
    }
    
  }

}
