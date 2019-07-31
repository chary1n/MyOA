import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { NewCustomerService } from './../new-customerService'
import { Utils } from './../../../../providers/Utils';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the NewCustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-customer-detail',
  templateUrl: 'new-customer-detail.html',
  providers: [NewCustomerService, CallNumber],
})
export class NewCustomerDetailPage {
  item
  user_id
  detail_type = 'info'
  starArr = ['1', '1', '1', '1', '1']
  isMoreData = true
  limit = 20
  offset = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public newCustomerService: NewCustomerService,
  public alertCtrl:AlertController, public callNumber: CallNumber) {
    this.user_id = this.navParams.get('user_id')
    this.item = this.navParams.get('item')
    this.newCustomerService.get_customer_detail({ 'partner_id': this.item.partner_id }).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCustomerDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_dongtai() {
    this.item.rt_partner_down_ids = []
    this.detail_type = 'dongtai'
    this.limit = 20
    this.offset = 0
    this.isMoreData = true
    let body = {
      'limit': this.limit,
      'offset': this.offset,
      'partner_id': this.item.shop_id,
    }
    this.newCustomerService.get_partner_messages(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item.message_ids = res.result.res_data
      }
    })
  }

  click_info() {
    this.detail_type = 'info'
    this.item.message_ids = []
    this.item.rt_partner_down_ids = []
  }

  click_contact() {
    this.detail_type = 'contact'
    this.item.message_ids = []
    this.item.rt_partner_down_ids = []
  }

  click_shops() {
    this.detail_type = 'shops'
    this.item.message_ids = []
    this.item.rt_partner_down_ids = []
  }

  click_attachments() {
    this.item.message_ids = []
    this.detail_type = 'attachment'
    this.isMoreData = true
    this.limit = 20;
    this.offset = 0;
    this.newCustomerService.get_customer_shops({ 'limit': this.limit, 'offset': this.offset, 'partner_id': this.item.shop_id }).then((res) => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item.rt_partner_down_ids = res.result.res_data
      }
    })
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
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

  click_shop_detail(item) {
    this.navCtrl.push('ShopDetailPage', {
      item: item,
      user_id: this.user_id,
    })
  }

  click_record_name(items) {
    // var el = document.createElement('div');
    // el.innerHTML = items.so_detail
    // var so_id = el.getElementsByTagName('strong')[0].getAttribute('data-oe-id')
    // this.navCtrl.push('SalesDetailPage', {
    //   id: parseInt(so_id), type: "salesOrder",
    // })
  }

  exchangeHTML(html_data) {
    var el = document.createElement('div');
    el.innerHTML = html_data
    return el.innerText
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      if (this.detail_type == 'attachment') {
        this.newCustomerService.get_customer_shops({ 'limit': this.limit, 'offset': this.offset, 'partner_id': this.item.shop_id }).then((res) => {
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
              this.item.rt_partner_down_ids.push(item);
            }
          }
          else {
            this.isMoreData = false;
          }
          infiniteScroll.complete();
        })
      }
      else if(this.detail_type == 'dongtai'){
        this.newCustomerService.get_partner_messages({ 'limit': this.limit, 'offset': this.offset, 'partner_id': this.item.shop_id }).then((res) => {
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
              this.item.message_ids.push(item);
            }
          }
          else {
            this.isMoreData = false;
          }
          infiniteScroll.complete();
        })
      }
    } else {
      infiniteScroll.complete();
    }
  }

  callPhone(phone) {
    //  alert(this.items.phone);
    if (phone != 'false' && phone != '') {
      let confirm = this.alertCtrl.create({
        title: phone,
        buttons: [
          {
            text: '取消',
            handler: () => {
            }
          },
          {
            text: '确定',
            handler: () => {
              this.call(phone);
            }
          }]
      }).present();
    }
  }

  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}
