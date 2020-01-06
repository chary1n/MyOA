import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService } from './baobiaoService'

declare let cordova: any;

/**
 * Generated class for the BaobiaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-baobiao',
  templateUrl: 'baobiao.html',
  providers: [BaoBiaoService],
})
export class BaobiaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public baobiaoService: BaoBiaoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaobiaoPage');
  }

  zijin() {
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var date = Y + '-' + m + '-' + d
    this.baobiaoService.getZijin({ 'date': date }).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('BaobiaoDetailPage', {
          item: res.result.res_data,
        })
      }
    })
  }

  xianggang() {
    // this.baobiaoService.account_hk().then(res => {
    //   console.log(res)
    //   if (res.result&&res.result.res_code == 1) {

    //   this.navCtrl.push('HkBaobiaoPage',{
    //     items:res.result.res_data[0],
    //    })
    //   }
    // })
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var date = Y + '-' + m + '-' + d
    this.baobiaoService.get_hk_account_data({ 'date': date }).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('HkBaobiaoPage', {
          item: res.result.res_data,
        })
      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

}
