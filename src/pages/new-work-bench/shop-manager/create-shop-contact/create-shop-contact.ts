import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the CreateShopContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-shop-contact',
  templateUrl: 'create-shop-contact.html',
})
export class CreateShopContactPage {
  address
  country_name
  country_id
  state_name
  state_id

  contact_name
  job
  phone
  email
  remark

  frontPage
  can_show_footer = true

 
  typeList = [{ name: '联系人', id: 'contact' }, { name: '开票地址', id: 'invoice' },{ name: '送货地址', id: 'delivery' },{ name: '其他地址', id: 'other' }]
  type
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController('MainContactListPage', this.navCtrl)
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShopContactPage');
  }

  ionViewWillEnter() {
    if (this.navParams.get('need_update_address') == true) {
      if (this.navParams.data.country_choose_id){
        this.country_id = this.navParams.data.country_choose_id
        this.country_name = this.navParams.data.country_choose_name
      }
      if (this.navParams.data.state_choose_id){
        this.state_id = this.navParams.data.state_choose_id
        this.state_name = this.navParams.data.state_choose_name
      }
      if (this.navParams.data.detail_address){
        this.address = this.navParams.data.detail_address
      }
      this.navParams.data.need_update_address = false;
    }
  }

  choose_address(){
    this.navCtrl.push('ChooseAddressPage',{
      state_id: this.state_id,
      country_id: this.country_id,
      country_name: this.country_name,
      detail_address: this.address,
    })
  }

  goBack(){
    this.navCtrl.pop()
  }

  save_contact(){
    if (!this.contact_name) {
      Utils.toastButtom('请填写名称', this.toastCtrl)
      return
    }
    if (!this.type) {
      Utils.toastButtom('请选择类型', this.toastCtrl)
      return
    }

    let body = {
      'name': this.contact_name,
      'job': this.job,
      'country_name': this.country_name,
      'country_id': this.country_id,
      'state_name': this.state_name,
      'state_id': this.state_id,
      'address': this.address,
      'phone': this.phone,
      'email': this.email,
      'remark': this.remark,
      'type': this.type,
    }

    this.can_show_footer = false
    this.frontPage.data.need_update_contact_list = true
    this.frontPage.data.new_contact = body
    this.navCtrl.popTo(this.frontPage)
  }

}
