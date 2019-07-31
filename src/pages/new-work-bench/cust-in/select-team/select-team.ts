import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { CustService } from './../custService'

/**
 * Generated class for the SelectTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-team',
  templateUrl: 'select-team.html',
  providers: [CustService]
})
export class SelectTeamPage {
  title
  data_arr = []
  show_data_arr = []

  frontPage

  type

  team_id

  payment_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public custService: CustService) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.type = this.navParams.get('type')
    if (this.type == 'team') {
      this.title = '选择销售团队'
      this.custService.get_total_team({}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.data_arr = res.result.res_data
          for (let i = 0; i < this.data_arr.length; i++) {
            this.show_data_arr.push(this.data_arr[i])
          }
        }
      })
    }
    else if (this.type == 'sale_man'){
      this.title = '选择销售员'
      this.team_id = this.navParams.get('team_id')
      this.custService.get_total_sale_man({'team_id': this.team_id}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.data_arr = res.result.res_data
          for (let i = 0; i < this.data_arr.length; i++) {
            this.show_data_arr.push(this.data_arr[i])
          }
        }
      })
    }
    else if (this.type == 'sale_order'){
      this.title = '选择销售订单'
      this.payment_id = this.navParams.get('payment_id')
      this.custService.get_total_sale_order({'partner_id': this.navParams.get('partner_id')}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.data_arr = res.result.res_data
          for (let i = 0; i < this.data_arr.length; i++) {
            this.show_data_arr.push(this.data_arr[i])
          }
        }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCountryPage');
  }
  goBack() {
    this.navCtrl.pop()
  }

  searchByKeyword(event) {
    this.show_data_arr = []
    for (let i = 0; i < this.data_arr.length; i++) {
      if ((new RegExp(event.target.value).test(this.data_arr[i].name))) {
        this.show_data_arr.push(this.data_arr[i])
      }
    }
  }

  clearText() {
    this.show_data_arr = []
    for (let i = 0; i < this.data_arr.length; i++) {
      this.show_data_arr.push(this.data_arr[i])
    }
  }

  choose_one(item) {
    if (this.type == 'team') {
      this.frontPage.data.need_update_team = true
      this.frontPage.data.team_id = item.id
      this.frontPage.data.team_name = item.name
      this.navCtrl.popTo(this.frontPage)
    }
    else if (this.type == 'sale_man') {
      this.frontPage.data.need_update_sale_man = true
      this.frontPage.data.sale_man_id = item.id
      this.frontPage.data.sale_man = item.name
      this.frontPage.data.team_id = item.team_id
      this.frontPage.data.team_name = item.team_name
      this.navCtrl.popTo(this.frontPage)
    }
    else if (this.type == 'sale_order'){
      this.frontPage.data.need_update_sale_order = true
      this.frontPage.data.sale_order_id = item.id
      this.frontPage.data.sale_order_name = item.name
      this.frontPage.data.order_amount_total = item.order_amount_total
      this.frontPage.data.order_out_amount = item.order_out_amount
      this.frontPage.data.to_receive_amount = item.to_receive_amount
      this.frontPage.data.sale_order_currency_id = item.sale_order_currency_id
      this.frontPage.data.sale_order_currency_rate = item.rate
      this.frontPage.data.sale_order_currency_name = item.currency_name
      this.custService.get_so_is_in_use({'payment_id': this.payment_id, 'sale_order_id': item.id}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data){
          if (res.result.res_data.is_in){
            this.frontPage.data.is_in = true
          }
          else{
            this.frontPage.data.is_in = false
          }
        }
        else{
          this.frontPage.data.is_in = false
        }
        this.navCtrl.popTo(this.frontPage)
      })
    }
    else{
      this.navCtrl.popTo(this.frontPage)
    }

    
  }

}
