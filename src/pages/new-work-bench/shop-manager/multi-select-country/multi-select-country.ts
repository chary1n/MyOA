import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShopService } from './../shopService'

/**
 * Generated class for the MultiSelectCountryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-multi-select-country',
  templateUrl: 'multi-select-country.html',
  providers: [ShopService],
})
export class MultiSelectCountryPage {
  title
  data_arr = []
  type
  selected_arr = []
  searchString = ''
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService) {
    this.type = this.navParams.get('type')
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.selected_arr = this.navParams.get('selected_arr')
    if (this.type == 'state') {
      this.title = '选择大洲'
      this.shopService.get_total_continent({}).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.data_arr = res.result.res_data
        }
      })
    }
    else {
      this.title = '选择国家'
      this.shopService.get_total_countrys({}).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.data_arr = res.result.res_data
        }
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultiSelectCountryPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  fetch_is_in_arr(item) {
    let is_has = false
    for (let i = 0; i < this.selected_arr.length; i++) {
      if (this.selected_arr[i].value == item.value) {
        is_has = true
      }
    }
    return !is_has
  }

  closeChoose(item) {
    for (var i = 0; i < this.selected_arr.length; i++) {
      if (item.value == this.selected_arr[i].value) {
        this.selected_arr.splice(i, 1)
        break
      }
    }
  }

  searchInput(event) {
    // 'name': event
  }

  choose(item) {
    if (this.fetch_is_in_arr(item)) {
      this.selected_arr.push(item)
    }
  }

  click_save(){
    if (this.type == 'state'){
      this.frontPage.data.need_update_states = true
      this.frontPage.data.selectStateList = this.selected_arr
    }
    else{
      this.frontPage.data.need_update_countrys = true
      this.frontPage.data.selectCountryList = this.selected_arr
    }
    this.navCtrl.popTo(this.frontPage)
  }

}
