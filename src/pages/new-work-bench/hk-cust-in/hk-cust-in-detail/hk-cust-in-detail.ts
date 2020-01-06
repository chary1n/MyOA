import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { HkCustService } from './../hkcustService'

/**
 * Generated class for the HkCustInDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hk-cust-in-detail',
  templateUrl: 'hk-cust-in-detail.html',
  providers: [HkCustService],
})
export class HkCustInDetailPage {
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

  sale_order_id
  sale_order_name

  need_count // 应收
  already_count // 已收
  un_count // 未收

  sale_order_currency_id

  final_rate
  final_remark
  constructor(public navCtrl: NavController, public navParams: NavParams, public custService: HkCustService,
    public toastCtrl: ToastController) {
    this.user_id = this.navParams.get('user_id')
    this.item = this.navParams.get('item')
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.custService.get_hk_account_payment_detail({ 'payment_id': this.item.payment_id }).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item = res.result.res_data
        this.final_rate = res.result.res_data.rate
        this.final_remark = res.result.res_data.remark
        if (this.item.state != 'wait') {
          this.set_data()
        }
        else {
          this.custService.get_me_sale_team({ 'user_id': this.user_id }).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
              this.team_id = res.result.res_data.team_id
              this.team_name = res.result.res_data.team_name
              this.sale_man = res.result.res_data.sale_man
              this.sale_man_id = res.result.res_data.sale_man_id
            }
          })
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
    // this.sale_order_id = this.item.sale_order_id
    // this.sale_order_name = this.item.sale_order_name
    this.need_count = this.item.order_amount_total
    this.already_count = this.item.order_out_amount
    this.un_count = this.item.to_receive_amount
    this.sale_order_currency_id = this.item.sale_order_currency_id
  }

  ionViewWillEnter() {
    if (this.navParams.get('need_update') == true) {
      this.partner_id = this.navParams.data.partner_id
      this.partner_name = this.navParams.data.partner_name
      this.sale_order_id = ''
      this.sale_order_name = ''
      this.need_count = ''
      this.already_count = ''
      this.un_count = ''
      this.sale_order_currency_id = ''
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
    if (this.navParams.get('need_update_sale_order') == true) {
      // this.sale_order_id = this.navParams.data.sale_order_id
      // this.sale_order_name = this.navParams.data.sale_order_name
      this.need_count = this.navParams.data.order_amount_total
      this.sale_order_currency_id = this.navParams.data.sale_order_currency_id
      // if (this.navParams.data.sale_order_currency_rate > 0) {
      //   this.final_rate = this.item.hk_account_id_rate / this.navParams.data.sale_order_currency_rate
      // }
      // if (this.navParams.data.is_in) {
      //   this.already_count = this.navParams.data.order_out_amount
      //   this.un_count = this.need_count - this.already_count
      // }
      // else {
      //   this.already_count = this.navParams.data.order_out_amount + (this.item.account * this.final_rate)
      //   this.un_count = this.need_count - this.already_count
      // }
      // this.final_rate = this.toFix4(this.item.hk_account_id_rate / this.navParams.data.sale_order_currency_rate)
      // if (this.navParams.data.sale_order_currency_name) {
      //   this.item.rate_text = this.item.hk_account_id_currency_name + '/' + this.navParams.data.sale_order_currency_name
      // }
      // else {
      //   this.item.rate_text = this.item.hk_account_id_currency_name + '/' + this.item.hk_account_id_currency_name
      // }
      this.navParams.data.need_update_sale_order = false
    }
  }

  goBack() {
    this.can_show_footer = false
    this.navCtrl.pop()
  }

  choose_partner() {
    if (this.item.state == 'wait') {
      this.navCtrl.push('SelectPartnerPage')
    }
  }

  choose_team() {
    if (this.item.state == 'wait') {
      this.navCtrl.push('SelectTeamPage', {
        type: 'team',
      })
    }

  }

  choose_sale_man() {
    if (this.item.state == 'wait') {
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
    // if (!this.sale_order_id) {
    //   Utils.toastButtom('请选择销售订单', this.toastCtrl)
    //   return
    // }

    let body = {
      'user_id': this.user_id,
      'team_id': this.team_id,
      'partner_id': this.partner_id,
      'sale_man_id': this.sale_man_id,
      'payment_id': this.item.payment_id,
      // 'sale_order_id': this.sale_order_id,
      'rate': parseFloat(this.final_rate),
      'remark': this.final_remark,
    }

    this.custService.confirm_hk_account_payment(body).then(res => {
      if (res.result.res_code == 1) {
        this.frontPage.data.need_refresh = true
        this.navCtrl.popTo(this.frontPage)
        Utils.toastButtom('操作成功', this.toastCtrl)
      }
    })
  }

  choose_sale_order() {
    if (this.item.state == 'wait') {
      if (this.partner_id) {
        this.navCtrl.push('SelectTeamPage', {
          type: 'sale_order',
          partner_id: this.partner_id,
          payment_id: this.item.payment_id
        })
      }
      else {
        Utils.toastButtom('请先选择客户', this.toastCtrl)
      }
    }
  }

  toFix2(amount) {
    if (amount) {
      return parseFloat(amount).toFixed(2)
    }
    else {
      return ''
    }
  }

  toFix4(amount) {
    if (amount) {
      return parseFloat(amount).toFixed(4)
    }
    else {
      return ''
    }
  }

  watch(event) {
    setTimeout(() => {
      this.final_rate = /^\d+\.?\d{0,4}$/.test(this.final_rate) ? this.final_rate : this.final_rate.split('.')[1].length == 4 ? this.final_rate : this.final_rate = this.final_rate.split('.')[0] + '.' + this.final_rate.split('.')[1].substr(0, 4)
      this.already_count = this.navParams.data.order_out_amount + (this.item.account * this.final_rate)
      this.un_count = this.navParams.data.to_receive_amount - (this.item.account * this.final_rate)
    }, 100)
  }

  fmoney(s, n)   
  {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1].substr(0,2);   
   let t = ""; 
   let i;  
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   
   return t.split("").reverse().join("") + "." + r;   
  } 

  transInt(item){
    if (item) {
      return parseFloat(item).toFixed(2)
    }
    else {
      return 0.00
    }
  }
}
