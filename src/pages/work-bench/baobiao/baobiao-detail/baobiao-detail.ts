import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService } from './../baobiaoService'
import { Storage } from '@ionic/storage';
declare let cordova: any;

/**
 * Generated class for the BaobiaoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-baobiao-detail',
  templateUrl: 'baobiao-detail.html',
  providers: [BaoBiaoService],
})
export class BaobiaoDetailPage {
  now;
  item;
  now_date;
  show_date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public baoBiaoService: BaoBiaoService) {
    this.now = new Date();
    this.item = navParams.get('item')
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.show_date = Y + '-' + m + '-' + d
    this.now_date = new Date(Y + "-" + m + "-" + d)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaobiaoDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  transInt(item) {
    return parseFloat(item).toFixed(2)
  }

  fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1].substr(0, 2);
    let t = "";
    let i;
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }

    return t.split("").reverse().join("") + "." + r;
  }

  click_total_enter_total() {
    this.navCtrl.push('BaobiaoDetailLinePage', {
      'type': 'enter',
      'date': this.show_date,
    })
  }

  click_total_out_total() {
    this.navCtrl.push('BaobiaoDetailLinePage', {
      'type': 'out',
      'date': this.show_date,
    })
  }

  click_total_enter_account(item) {
    this.navCtrl.push('BaobiaoDetailLinePage', {
      'type': 'enter',
      'account_id': item.account_id,
      'header_name': item.name,
      'header_type': '收入',
      'header_amount': this.fmoney(this.transInt(item.debit), 3),
      'date': this.show_date,
    })
  }

  click_total_out_account(item) {
    this.navCtrl.push('BaobiaoDetailLinePage', {
      'type': 'out',
      'account_id': item.account_id,
      'header_name': item.name,
      'header_type': '支出',
      'header_amount': this.fmoney(this.transInt(item.credit), 3),
      'date': this.show_date,
    })
  }

  click_delete_day() {
    var d = this.now_date;
    d.setDate(d.getDate() - 1);
    var m = d.getMonth() + 1;
    this.show_date = d.getFullYear() + '-' + m + '-' + d.getDate();
    this.now_date = new Date(d.getFullYear() + "-" + m + "-" + d.getDate())
    this.baoBiaoService.getZijin({'date': this.show_date}).then(res => {
      if (res.result&&res.result.res_code == 1) {
        this.item = res.result.res_data
      }
    })
  }

  click_add_day() {
    var d = new Date(this.now_date);
    d.setDate(d.getDate() + 1);
    var m = d.getMonth() + 1;
    this.show_date = d.getFullYear() + '-' + m + '-' + d.getDate();
    this.now_date = new Date(d.getFullYear() + "-" + m + "-" + d.getDate())
    this.baoBiaoService.getZijin({'date': this.show_date}).then(res => {
      if (res.result&&res.result.res_code == 1) {
        this.item = res.result.res_data
      }
    })
  }
}
