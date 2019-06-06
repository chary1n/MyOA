import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { CustService } from './../custService'

/**
 * Generated class for the CustInDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cust-in-detail',
  templateUrl: 'cust-in-detail.html',
  providers: [CustService],
})
export class CustInDetailPage {
  user_id
  item

  partner_name
  partner_id

  team_name
  team_id

  sale_man
  sale_man_id

  can_show_footer = true

  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public custService: CustService,
    public toastCtrl: ToastController) {
    this.user_id = this.navParams.get('user_id')
    this.item = this.navParams.get('item')
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.custService.get_account_payment_detail({ 'payment_id': this.item.payment_id }).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item = res.result.res_data
        if (this.item.state != 'confirm') {
          this.set_data()
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustInDetailPage');
  }

  set_data() {
    this.partner_name = this.item.partner_name
    this.team_name = this.item.team_name
    this.sale_man = this.item.user_id
  }

  ionViewWillEnter() {
    if (this.navParams.get('need_update') == true) {
      this.partner_id = this.navParams.data.partner_id
      this.partner_name = this.navParams.data.partner_name
      this.navParams.data.need_update = false;
    }
    if (this.navParams.get('need_update_sale_man') == true) {
      this.sale_man = this.navParams.data.sale_man
      this.sale_man_id = this.navParams.data.sale_man_id
      this.team_id = this.navParams.data.team_id
      this.team_name = this.navParams.data.team_name
      this.navParams.data.need_update_sale_man = false;
    }
    if (this.navParams.get('need_update_team') == true) {
      if (this.navParams.data.team_id != this.team_id) {
        this.sale_man = ''
        this.sale_man_id = ''
      }
      this.team_id = this.navParams.data.team_id
      this.team_name = this.navParams.data.team_name
      this.navParams.data.need_update_team = false;
    }
  }

  goBack() {
    this.can_show_footer = false
    this.navCtrl.pop()
  }

  choose_partner() {
    if (this.item.state == 'confirm') {
      this.navCtrl.push('SelectPartnerPage')
    }
  }

  choose_team() {
    if (this.item.state == 'confirm') {
      this.navCtrl.push('SelectTeamPage', {
        type: 'team',
      })
    }

  }

  choose_sale_man() {
    if (this.item.state == 'confirm') {
      this.navCtrl.push('SelectTeamPage', {
        type: 'sale_man',
        team_id: this.team_id
      })
    }

  }

  click_confirm() {
    if (!this.partner_id) {
      Utils.toastButtom('请选择客户', this.toastCtrl)
      return
    }
    if (!this.team_id) {
      Utils.toastButtom('请选择销售团队', this.toastCtrl)
      return
    }
    if (!this.sale_man_id) {
      Utils.toastButtom('请选择销售员', this.toastCtrl)
      return
    }

    let body = {
      'user_id': this.user_id,
      'team_id': this.team_id,
      'partner_id': this.partner_id,
      'sale_man_id': this.sale_man_id,
      'payment_id': this.item.payment_id,
    }

    this.custService.confirm_account_payment(body).then(res => {
      if (res.result.res_code == 1) {
        this.frontPage.data.need_refresh = true
        this.navCtrl.popTo(this.frontPage)
        Utils.toastButtom('操作成功', this.toastCtrl)
      }
    })
  }

}
