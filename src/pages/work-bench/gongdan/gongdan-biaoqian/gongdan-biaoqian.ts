import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the GongdanBiaoqianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-biaoqian',
  templateUrl: 'gongdan-biaoqian.html',
  providers:[GongDanService],
})
export class GongdanBiaoqianPage {
  biaoqian_select_ids = [];
  biaoqianList = [];
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongdanService:GongDanService) {
    this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
    this.biaoqian_select_ids =  this.navParams.get('select_ids')
    if (!this.biaoqian_select_ids)
    {
      this.biaoqian_select_ids = []
    }
    this.gongdanService.get_all_biaoqian().then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1) {
        this.biaoqianList = res.result.res_data.res_data;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanBiaoqianPage');
  }

  clickbiaoqian(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.biaoqian_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.biaoqian_select_ids.push(item.id)
    }
    else {
      this.biaoqian_select_ids.splice(index - 1, 1)
    }
  }

  cancel_biaoqian() {
    this.biaoqian_select_ids = []
  }

  confirm_biaoqian() {
    this.frontPage.data.select_ids = this.biaoqian_select_ids;
    this.navCtrl.popTo(this.frontPage);
  }

  isChoose(item) {
    let isChoose = false;
    for (let biaoqian of this.biaoqian_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }

}
