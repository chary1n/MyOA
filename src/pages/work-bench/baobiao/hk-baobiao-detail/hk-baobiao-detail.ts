import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService} from './../baobiaoService'
declare let cordova: any;


/**
 * Generated class for the HkBaobiaoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hk-baobiao-detail',
  templateUrl: 'hk-baobiao-detail.html',
  providers: [BaoBiaoService]
})
export class HkBaobiaoDetailPage {
  date
  account_id
  payment_type
  item
  constructor(public navCtrl: NavController, public navParams: NavParams, public baoBiaoService: BaoBiaoService) {
    this.date = this.navParams.get('date')
    this.account_id = this.navParams.get('account_id')
    this.payment_type = this.navParams.get('payment_type')
    var body = {
      'date': this.date,
      'payment_type': this.payment_type,
    }
    if (this.account_id){
      body['account_id'] = this.account_id
    }
    this.baoBiaoService.get_hk_account_detail(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.item = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkBaobiaoDetailPage');
  }

  goBack(){
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
}
