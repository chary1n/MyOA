import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService } from './../baobiaoService'
declare let cordova: any;

/**
 * Generated class for the HkBaobiaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hk-baobiao',
  templateUrl: 'hk-baobiao.html',
  providers: [BaoBiaoService],
})
export class HkBaobiaoPage {
  item;
  now_date;
  show_date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
    public baoBiaoService: BaoBiaoService) {
    this.item = navParams.get('item')

    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.show_date = Y + '-' + m + '-' + d
    this.now_date = new Date(Y + "-" + m + "-" + d)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkBaobiaoPage');
  }

  ionViewDidEnter() {
    // if (this.navParams.get('need_fresh') == true) {
    //   this.navParams.data.need_fresh = false;
    //   this.reload_data()
    // }
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

  goBack() {
    this.navCtrl.pop()
  }

  click_more() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择操作',
      buttons: [
        {
          text: '编辑',
          handler: () => {
            this.click_edit()
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })

    actionSheet.present()
  }

  click_edit() {
    // this.navCtrl.push('EditHkBaobiaoPage', {
    //   line_ids: this.items.line_ids
    // })
  }

  reload_data(date) {
    this.baoBiaoService.get_hk_account_data({ 'date': date }).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.item = res.result.res_data
      }
    })
  }

  click_delete_day() {
    var d = this.now_date;
    d.setDate(d.getDate() - 1);
    var m = d.getMonth() + 1;
    this.show_date = d.getFullYear() + '-' + m + '-' + d.getDate();
    this.now_date = new Date(d.getFullYear() + "-" + m + "-" + d.getDate())
    this.reload_data(this.show_date)
  }

  click_add_day() {
    var d = new Date(this.now_date);
    d.setDate(d.getDate() + 1);
    var m = d.getMonth() + 1;
    this.show_date = d.getFullYear() + '-' + m + '-' + d.getDate();
    this.now_date = new Date(d.getFullYear() + "-" + m + "-" + d.getDate())
    this.reload_data(this.show_date)
  }

  toFix2(amount) {
    if (amount) {
      return parseFloat(amount).toFixed(2)
    }
    else {
      return '0.00'
    }
  }

  click_total_enter_total(){
    this.navCtrl.push('HkBaobiaoDetailPage', {
      'date': this.show_date,
      'payment_type': 'in',
    })
  }

  click_total_out_total(){
    this.navCtrl.push('HkBaobiaoDetailPage', {
      'date': this.show_date,
      'payment_type': 'out',
    })
  }

  click_total_enter_account(items){
    this.navCtrl.push('HkBaobiaoDetailPage', {
      'date': this.show_date,
      'account_id': items.account_id,
      'payment_type': 'in',
    })
  }

  click_total_out_account(items){
    this.navCtrl.push('HkBaobiaoDetailPage', {
      'date': this.show_date,
      'account_id': items.account_id,
      'payment_type': 'out',
    })
  }

}
