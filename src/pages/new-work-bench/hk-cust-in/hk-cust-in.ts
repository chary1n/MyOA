import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../providers/Utils';
import { HkCustService } from './hkcustService'

import { HkCustAutoService } from './hkcustAutoService'
/**
 * Generated class for the HkCustInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hk-cust-in',
  templateUrl: 'hk-cust-in.html',
  providers: [HkCustAutoService, HkCustService]
})
export class HkCustInPage {
  // data_arr = []
  type = 'confirm'

  wait_arr = []
  done_arr = []
  limit = 20
  offset = 0
  isMoreData = true

  user_id

  cust_in_num = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public custService: HkCustService,
    public custAutoService: HkCustAutoService, public storage: Storage) {
      this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustInPage');
    this.reload_data()
  }

  ionViewWillEnter(){
    if (this.navParams.get('need_refresh') == true) {
      this.navParams.data.need_refresh = false;
      this.reload_data()
    }
    this.custService.get_total_hk_cust_in({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.cust_in_num = res.result.res_data
      }
      else{
        this.cust_in_num = 0
      }
    })

  }

  goBack() {
    this.navCtrl.pop()
  }

  click_wait() {
    this.type = 'confirm'
    this.reload_data()
  }

  click_done() {
    this.type = 'done'
    this.reload_data()
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "partner_id";
      search_text = event.name.replace("搜 客户：", "")
    }
    else if (event.id == 3) {
      type = "hk_account_id";
      search_text = event.name.replace("搜 账户：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
      'state': this.type,
    }
    this.wait_arr = []
    this.done_arr = []
    this.isMoreData = false
    this.custService.search_hk_cust_in_with_domain(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        if (this.type == 'confirm'){
          this.wait_arr = res.result.res_data
        }
        else{
          this.done_arr = res.result.res_data
        }
      }
    })
  }

  itemClearSelected(event) {
    this.reload_data()
  }

  reload_data() {
    this.done_arr = []
    this.wait_arr = []
    this.isMoreData = true;
    this.limit = 20
    this.offset = 0
    let body = {
      'limit': this.limit,
      'offset': this.offset,
      'type': this.type,
    }
    this.custService.get_total_hk_account_payment(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        if (this.type == 'confirm') {
          this.wait_arr = res.result.res_data
        }
        else {
          this.done_arr = res.result.res_data
        }
      }
    })
  }

  doRefresh(refresh) {
    this.reload_data()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.offset = this.offset + 20;
      this.custService.get_total_hk_account_payment({ 'limit': this.limit, 'offset': this.offset, 'type': this.type }).then((res) => {
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
            if (this.type == 'confirm') {
              this.wait_arr.push(item)
            }
            else {
              this.done_arr.push(item)
            }

          }

        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  payment_detail(item){
    this.navCtrl.push('HkCustInDetailPage', {
      user_id: this.user_id,
      item: item,
    })
  }

  cal_num(cust_num){
    if (cust_num <= 99){
      return cust_num
    }
    else{
      return '99+'
    }
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
