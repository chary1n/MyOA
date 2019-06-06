import { NavController, NavParams, IonicPage, ActionSheetController, Content, Platform, ModalController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Utils } from './../../../providers/Utils';
import { ShopService } from './shopService'

import { ShopAutoService} from './shopAutoService'

/**
 * Generated class for the ShopManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-manager',
  templateUrl: 'shop-manager.html',
  providers: [Geolocation, ShopService, ShopAutoService],
})
export class ShopManagerPage {
  // stepCount = 100;
  // pointCount = [];
  // Result = [];
  // NoisIndex = [];
  // Time = new Date();
  // M_PI = 3.14159265358979324;
  // A = 6378245.0;
  // EE = 0.00669342162296594323;
  // X_PI = this.M_PI * 3000.0 / 180.0;

  map: any;
  myGeo: any;
  myIcon: any;

  shop_arr = []
  user_id

  limit = 20
  offset = 0

  isMoreData=true
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public shopService: ShopService, public geolocation: Geolocation, public modalController: ModalController,
    public actionSheetCtrl: ActionSheetController, public shopAutoService: ShopAutoService, public storage: Storage) {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
      });
  }

  ionViewDidLoad() {


  }

  ionViewDidEnter() {
    this.reload_data()
  }

  reload_data(){
    this.isMoreData = true;
    this.limit = 20
    this.offset = 0
    this.shop_arr = []
    this.shopService.get_total_shop({'limit': this.limit, 'offset': this.offset}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.shop_arr = res.result.res_data
      }
    })
  }

  goBack() {
    this.navCtrl.pop();
    // let modal = this.modalController.create("ModalLocationPage", {
    // })
    // modal.present()
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 门店：", "")
    }
    else if (event.id == 2) {
      type = "rt_partner_top_id";
      search_text = event.name.replace("搜 客户：", "")
    }
    else if (event.id == 3) {
      type = "user_id";
      search_text = event.name.replace("搜 销售员：", "")
    }
    else if (event.id == 4) {
      type = "contacts_partner_id";
      search_text = event.name.replace("搜 联系人：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
    }
    this.shop_arr = []
    this.shopService.search_shop_by_domain(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.shop_arr = res.result.res_data
      }
    })
  }

  itemClearSelected(event){
    this.reload_data()
  }

  click_shop_detail(item){
    this.navCtrl.push('ShopDetailPage', {
      item: item,
      user_id: this.user_id,
    })
  }

  add_visit_record(){
    this.navCtrl.push('ShopVisitPage',{
      user_id: this.user_id,
    })
  }

  add_shop(){
    this.navCtrl.push('AddShopPage',{
      user_id: this.user_id
    })
  }

  doRefresh(refresh) {
    this.reload_data()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.shopService.get_total_shop({'limit': this.limit, 'offset': this.offset}).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            this.shop_arr.push(item);
          }
        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  click_GPS(){
    this.navCtrl.push('SearchGpsPage')
  }

  search_visit(){
    this.navCtrl.push('TotalVisitPage',{
      user_id: this.user_id,
    })
  }
}
