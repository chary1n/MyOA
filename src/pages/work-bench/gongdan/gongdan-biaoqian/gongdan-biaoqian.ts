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
  brand_select_ids = [];
  area_select_ids = [];
  cate_select_ids = [];
  brandList = [];
  areaList = [];
  cateList = [];
  allSelectList = [];
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongdanService:GongDanService) {
    this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
    // this.brand_select_ids =  this.navParams.get('brand_select_ids')
    // this.area_select_ids = this.navParams.get('area_select_ids')
    // this.cate_select_ids = this.navParams.get('cate_select_ids')
    this.gongdanService.get_all_biaoqian().then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1) {
        if (res.result.res_data.brand_list)
        {
          this.brandList = res.result.res_data.brand_list.res_data
        }
        if (res.result.res_data.area_list)
        {
          this.areaList = res.result.res_data.area_list.res_data
        }
        if (res.result.res_data.category_list)
        {
          this.cateList = res.result.res_data.category_list.res_data
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanBiaoqianPage');
  }

  clickbrand(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.brand_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.brand_select_ids.push(item.id)
    }
    else {
      this.brand_select_ids.splice(index - 1, 1)
    }
  }

  clickarea(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.area_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.area_select_ids.push(item.id)
      this.allSelectList.push(item.id)
    }
    else {
      this.area_select_ids.splice(index - 1, 1)
      let index_biaoqian = 0
      for (let biaoqian of this.allSelectList) {
      index_biaoqian++
      if (biaoqian == item.id) {
        this.allSelectList.splice(index_biaoqian - 1,1)
        break
      }
    }
    }
  }

  clickcate(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.cate_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.cate_select_ids.push(item.id)
      this.allSelectList.push(item.id)
    }
    else {
      this.cate_select_ids.splice(index - 1, 1)
      let index_biaoqian = 0
      for (let biaoqian of this.allSelectList) {
      index_biaoqian++
      if (biaoqian == item.id) {
        this.allSelectList.splice(index_biaoqian - 1,1)
        break
      }
    }
    }
  }

  cancel_biaoqian() {
    this.cate_select_ids = []
    this.brand_select_ids = []
    this.area_select_ids = []
    this.allSelectList = []
  }

  confirm_biaoqian() {
    this.frontPage.data.brand_list = this.brand_select_ids;
    this.frontPage.data.area_list = this.area_select_ids;
    this.frontPage.data.category_list = this.cate_select_ids
    this.navCtrl.popTo(this.frontPage);
  }

  isChooseBrand(item) {
    let isChoose = false;
    for (let biaoqian of this.brand_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }
  isChooseArea(item) {
    let isChoose = false;
    for (let biaoqian of this.area_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }

  isChooseCate(item) {
    let isChoose = false;
    for (let biaoqian of this.cate_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }

  goBack(){
    this.navCtrl.pop();
  }

}
