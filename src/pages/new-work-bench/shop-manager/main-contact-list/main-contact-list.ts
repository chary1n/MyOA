import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShopService } from './../shopService'

/**
 * Generated class for the MainContactListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main-contact-list',
  templateUrl: 'main-contact-list.html',
})
export class MainContactListPage {
  contact_list = []
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.frontPage = Utils.getViewController('AddShopPage', this.navCtrl)
    this.contact_list = this.navParams.get('contact_arr')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainContactListPage');
  }

  ionViewWillEnter(){
    if (this.navParams.get('need_update_contact_list') == true) {
      this.contact_list.push(this.navParams.get('new_contact'))
      this.navParams.data.need_update_contact_list = false
    }
  }

  goBack(){
    this.frontPage.data.need_update_main_contact_list = true
    this.frontPage.data.main_contact_list = this.contact_list
    this.navCtrl.popTo(this.frontPage)
  }

  create_contact(){
    this.navCtrl.push('CreateShopContactPage')
  }
  
  choose_contact(item, i){
    this.frontPage.data.need_update_choose_main_contact = true
    this.frontPage.data.main_contact_list = this.contact_list
    this.frontPage.data.choosed_contact = item
    this.frontPage.data.choose_index = i
    this.navCtrl.popTo(this.frontPage)
  }

  deleteItem(item,i){
    this.contact_list.splice(i, 1)
  }

  exchangeType(type) {
    if (type == "contact") {
      return "联系人";
    }
    else if (type == "invoice") {
      return "开票地址";
    }
    else if (type == "delivery") {
      return "送货地址";
    }
    else if (type == "other") {
      return "其他地址";
    }
    else {
      return type;
    }
  }

}
