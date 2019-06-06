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
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
  public baoBiaoService: BaoBiaoService) {
    this.items = navParams.get('items')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HkBaobiaoPage');
  }

  ionViewDidEnter(){
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.reload_data()
    }
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
    this.navCtrl.push('EditHkBaobiaoPage', {
      line_ids: this.items.line_ids
    })
  }

  reload_data(){
    this.baoBiaoService.account_hk().then(res => {
      console.log(res)
      if (res.result&&res.result.res_code == 1) {
       this.items = res.result.res_data[0]
      }
    })
  }

}
