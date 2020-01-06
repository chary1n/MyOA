import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PurchaseAccountAutoService } from './purchaseAccountAutoService'
import { PurchaseAccountService } from './purchaseAccountService'
/**
 * Generated class for the PurchaseAccountApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-purchase-account-approval',
  templateUrl: 'purchase-account-approval.html',
  providers: [PurchaseAccountService, PurchaseAccountAutoService],
})
export class PurchaseAccountApprovalPage {
  account_num = 0
  type = 'confirm'
  user_id
  limit=20
  offset=0
  data_arr=[]
  isMoreData=true
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public purchaseAccountService: PurchaseAccountService, public purchaseAccountAutoService: PurchaseAccountAutoService) {
      this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.reload_data()
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseAccountApprovalPage');
  }

  cal_num(cust_num){
    if (cust_num <= 99){
      return cust_num
    }
    else{
      return '99+'
    }
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

  reload_data(){
    this.isMoreData = true
    this.offset = 0
    this.account_num = 0
    this.data_arr = []
    let body = {
      'user_id': this.user_id,
      'type': this.type,
      'limit': this.limit,
      'offset': this.offset,
    }
    this.purchaseAccountService.get_purchase_account(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.data_arr = res.result.res_data
        this.account_num = res.result.erp_time
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
      let body = {
        'user_id': this.user_id,
        'type': this.type,
        'limit': this.limit,
        'offset': this.offset,
      }
      this.purchaseAccountService.get_purchase_account(body).then((res) => {
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
            this.data_arr.push(item)
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

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "number";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "origin";
      search_text = event.name.replace("搜 源单据：", "")
    }
    else if (event.id == 3) {
      type = "user_id";
      search_text = event.name.replace("搜 负责人：", "")
    }
    else if (event.id == 4) {
      type = "partner_id";
      search_text = event.name.replace("搜 供应商：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
      'state': this.type,
      'user_id': this.user_id,
    }
    this.data_arr = []
    this.isMoreData = false
    this.purchaseAccountService.search_purchase_account(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.data_arr = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.reload_data()
  }

  payment_detail(item){
    this.navCtrl.push('PurchaseAccountApprovalDetailPage', {
      item: item,
      user_id: this.user_id,
    })
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.reload_data()
    }
  }

  toFix2(amount) {
    if (amount) {
      return parseFloat(amount).toFixed(2)
    }
    else {
      return '0.00'
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
    return parseFloat(item).toFixed(2)
  }

}
