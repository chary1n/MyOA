import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { EmployeeService } from './../EmployeeService'

/**
 * Generated class for the SelectBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-bank',
  templateUrl: 'select-bank.html',
  providers: [EmployeeService],
})
export class SelectBankPage {
  partner_arr = []
  show_partner_arr = []
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public employeeService: EmployeeService) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.employeeService.get_all_bank({}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.partner_arr = res.result.res_data
        for (let i = 0; i < this.partner_arr.length; i++) {
          this.show_partner_arr.push(this.partner_arr[i])
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectBankPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  searchByKeyword(event) {
    this.show_partner_arr = []
    for (let i = 0; i < this.partner_arr.length; i++) {
      if ((new RegExp(event.target.value).test(this.partner_arr[i].name))) {
        this.show_partner_arr.push(this.partner_arr[i])
      }
    }
  }

  clearText() {
    this.show_partner_arr = []
    for (let i = 0; i < this.partner_arr.length; i++) {
      this.show_partner_arr.push(this.partner_arr[i])
    }
  }

  choose_one(item) {
    this.frontPage.data.need_update_bank = true
    this.frontPage.data.bank_card_opening_bank = item.bank_id
    this.frontPage.data.bank_card_opening_bank_name = item.name
    this.navCtrl.popTo(this.frontPage)
  }


}
