import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShopService } from './../shopService'

/**
 * Generated class for the ChooseAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-choose-address',
  templateUrl: 'choose-address.html',
  providers: [ShopService],
})
export class ChooseAddressPage {
  island_name
  island_id
  state_id
  state_name
  country_id
  country_name
  country_total
  detail_address

  islandColumns = []
  countryColumns = []

  frontPage
  now_city_arr = []
  total_city_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService,
    public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)

    // this.shopService.get_total_country_state({}).then(res => {
    //   if (res.result.res_code == 1 && res.result.res_data) {
    //     let dic_country = {
    //       'name': 'parent',
    //       'options': res.result.res_data.country_list
    //     }
    //     let dic_state = {
    //       'name': 'child',
    //       'parentCol': 'parent',
    //       'options': res.result.res_data.state_list
    //     }

    //     let dic_island = {
    //       'name': 'parent',
    //       'options': res.result.res_data.continent_list
    //     }
    //     this.countryColumns.push(dic_country)
    //     this.countryColumns.push(dic_state)

    //     this.islandColumns.push(dic_island)
    //   }
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseAddressPage');
    this.shopService.get_total_states({}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.total_city_arr = res.result.res_data
        this.now_city_arr = res.result.res_data
        if (this.navParams.get('state_id')) {
          this.state_id = this.navParams.get('state_id')
        }
        if (this.navParams.get('country_id')) {
          this.country_id = this.navParams.get('country_id')
          this.country_name = this.navParams.get('country_name')
          this.now_city_arr = []
          for (let i = 0; i < this.total_city_arr.length; i++) {
            if (this.total_city_arr[i].parentVal == this.country_id) {
              this.now_city_arr.push(this.total_city_arr[i])
            }
          }
        }
        if (this.navParams.get('detail_address')) {
          this.detail_address = this.navParams.get('detail_address')
        }
      }
    })
  }

  ionViewWillEnter() {
    if (this.navParams.get('need_update_country') == true) {
      this.country_id = this.navParams.data.country_id
      this.country_name = this.navParams.data.country_name
      this.navParams.data.need_update_country = false;
      this.now_city_arr = []
      for (let i = 0; i < this.total_city_arr.length; i++) {
        if (this.total_city_arr[i].parentVal == this.country_id) {
          this.now_city_arr.push(this.total_city_arr[i])
        }
      }
    }
  }


  goBack() {
    this.navCtrl.pop()
  }

  choose_country() {
    this.navCtrl.push('SelectCountryPage')
  }

  submit() {
    // if (!this.country_total){
    //   Utils.toastButtom('请选择国家/市', this.toastCtrl)
    // }
    // let country_choose_id
    // let country_choose_name
    // let state_choose_id
    // let state_choose_name

    // let mixed_arr = this.country_total.split('/')
    // if (mixed_arr[0] != 'null'){
    //   for (let i = 0;i < this.countryColumns[0].options.length; i ++){
    //     if (mixed_arr[0] == this.countryColumns[0].options[i].value){
    //       country_choose_id = this.countryColumns[0].options[i].value
    //       country_choose_name = this.countryColumns[0].options[i].text
    //     }
    //   }
    // }
    // if (mixed_arr[1] != 'null'){
    //   for (let i = 0;i < this.countryColumns[1].options.length; i ++){
    //     if (mixed_arr[1] == this.countryColumns[1].options[i].value){
    //       state_choose_id = this.countryColumns[1].options[i].value
    //       state_choose_name = this.countryColumns[1].options[i].text
    //     }
    //   }
    // }

    for (let i = 0; i < this.total_city_arr.length; i++) {
      if (this.total_city_arr[i].value == this.state_id) {
        this.state_name = this.total_city_arr[i].text
        break
      }
    }

    this.frontPage.data.need_update_address = true
    if (this.country_name) {
      this.frontPage.data.country_choose_id = this.country_id
      this.frontPage.data.country_choose_name = this.country_name
    }
    if (this.state_name) {
      this.frontPage.data.state_choose_id = this.state_id
      this.frontPage.data.state_choose_name = this.state_name
    }
    if (this.detail_address) {
      this.frontPage.data.detail_address = this.detail_address
    }
    this.navCtrl.popTo(this.frontPage)
  }
}
