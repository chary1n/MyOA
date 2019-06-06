import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController,ModalController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { ShopService } from './../shopService'

/**
 * Generated class for the SelectShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-shop-list',
  templateUrl: 'select-shop-list.html',
  providers: [ShopService]
})
export class SelectShopListPage {
  shop_arr = []
  frontPage
  show_shop_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService) {
    this.frontPage = Utils.getViewController('AA', this.navCtrl)
    let body = {

    }
    if (this.navParams.get('partner_top_id')){
      body['partner_top_id'] = this.navParams.get('partner_top_id')
    }
    this.shopService.get_total_shop(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.shop_arr = res.result.res_data
        for (let i = 0; i < this.shop_arr.length; i ++){
          this.show_shop_arr.push(this.shop_arr[i])
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectShopListPage');
  }

  choose_one(item){
    this.frontPage.data.need_update_shop = true
    this.frontPage.data.visit_shop_id = item.shop_id
    this.frontPage.data.visit_shop_name = item.name
    this.frontPage.data.partner_id = item.rt_partner_top_id_id
    this.frontPage.data.partner_name = item.rt_partner_top_id
    this.navCtrl.popTo(this.frontPage)
  }

  goBack(){
    this.navCtrl.pop()
  }

  searchByKeyword(event) {
    this.show_shop_arr = []
    for (let i = 0; i < this.shop_arr.length; i ++){
      if ((new RegExp(event.target.value).test(this.shop_arr[i].name))){
        this.show_shop_arr.push(this.shop_arr[i])
      }
    }
  }

  clearText(){
    this.show_shop_arr = []
    for (let i = 0; i < this.shop_arr.length; i ++){
          this.show_shop_arr.push(this.shop_arr[i])
        }
  }

}
