import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events, ToastController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NewPayService } from './new-pay-service'
import { NewPayAutoService } from './new-pay-auto-service'
import { NewPayMeAutoService } from './new-pay-me-auto-service'
/**
 * Generated class for the NewPayRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-pay-request',
  templateUrl: 'new-pay-request.html',
  providers: [NewPayService, NewPayAutoService, NewPayMeAutoService],
})
export class NewPayRequestPage {
  inner_type = 'wait_me'
  me_list = []
  wait_me_list = []
  total_list = []
  is_manager = false
  user_id;
  is_ios = false
  can_load_more
  limit = 20
  offset
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    public storage: Storage, public payService: NewPayService, public newPayAutoService: NewPayAutoService,
    public newPayMeAutoService: NewPayMeAutoService) {
    if (this.platform.is('ios')) {
      this.is_ios = true
    }
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.limit = 20
        this.offset = 0
        this.getData()
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPayRequestPage');
  }

  ionViewWillEnter() {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id

      }
      )
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.limit = 20
      this.offset = 0
      this.getData();
      this.navParams.data.need_fresh = false;
    }
  }

  click_wait_me() {
    this.can_load_more = true
    this.inner_type = 'wait_me'
    this.limit = 20
    this.offset = 0
    this.getData()
  }

  click_me() {
    this.can_load_more = true
    this.inner_type = 'me'
    this.limit = 20
    this.offset = 0
    this.getData()
  }

  click_total() {
    this.can_load_more = true
    this.inner_type = 'total'
    this.limit = 20
    this.offset = 0
    this.getData()
  }

  getData() {
    let body = {
      'limit': this.limit,
      'offset': this.offset,
      'user_id': this.user_id,
      'type': this.inner_type,
    }
    this.payService.get_all_pay_list(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        if (this.inner_type == 'me') {
          this.me_list = res.result.res_data
        }
        else if (this.inner_type == 'wait_me') {
          this.wait_me_list = res.result.res_data
        }
        else if (this.inner_type == 'total') {
          this.total_list = res.result.res_data
        }
      }
    })
  }

  itemSelected(event) {
    this.can_load_more = false
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = 'create_uid'
      search_text = event.name.replace('搜 申请人：', '')
    }
    else if (event.id == 3) {
      type = 'partner_id'
      search_text = event.name.replace('搜 供应商：', '')
    }
    if (this.inner_type == 'wait_me') {
      this.wait_me_list = []
    }
    else if (this.inner_type == 'total') {
      this.total_list = []
    }
    let body = {
      'type': type,
      'search_text': search_text,
      'user_id': this.user_id,
      'inner_type': this.inner_type,
    }

    this.payService.search_payment(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        if (this.inner_type == 'wait_me') {
          this.wait_me_list = res.result.res_data
        }
        else if (this.inner_type == 'total') {
          this.total_list = res.result.res_data
        }
      }
    })
  }

  itemMeSelected(event) {
    this.can_load_more = false
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = 'partner_id'
      search_text = event.name.replace('搜 供应商：', '')
    }
    this.me_list = []
    let body = {
      'type': type,
      'search_text': search_text,
      'user_id': this.user_id,
      'inner_type': this.inner_type,
    }
    this.payService.search_payment(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.me_list = res.result.res_data
      }
    })
  }

  itemClearMeSelected(event) {
    // this.click_me()
    this.can_load_more = true
    this.limit = 20
    this.offset = 0
    this.getData()
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  changeState(state) {
    if (state == 'draft') {
      return "草稿";
    }
    else if (state == 'cancel') {
      return "被拒";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'rejected') {
      return "被拒";
    }
    else if (state == 'paid') {
      return "已支付";
    }
    else if (state == 'done') {
      return "审核完成";
    }
    else {
      return '';
    }
  }

  changeType(type) {
    if (type == 'advance') {
      return "预付款";
    }
    else if (type == 'normal') {
      return "结算款";
    }
    else {
      return ''
    }
  }

  approved_detail(item) {
    this.navCtrl.push('NewPayRequestDetailPage', {
      'item': item,
      'user_id': this.user_id,
      'frontPage': 'NewPayRequestPage',
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  doInfinite(infiniteScroll) {
    if (this.can_load_more) {
      this.offset += 20
      let body = {
        'limit': this.limit,
        'offset': this.offset,
        'user_id': this.user_id,
        'type': this.inner_type,
      }
      this.payService.get_all_pay_list(body).then(res => {
        infiniteScroll.complete()
        if (res.result.res_data && res.result.res_code == 1) {
          if (res.result.res_data.length == 20) {
            this.can_load_more = true
          }
          else {
            this.can_load_more = false
          }
          for (let item of res.result.res_data) {
            if (this.inner_type == 'me') {
              this.me_list.push(item)
            }
            else if (this.inner_type == 'wait_me') {
              this.wait_me_list.push(item)
            }
            else if (this.inner_type == 'total') {
              this.total_list.push(item)
            }
          }
        }
        else
        {
          this.can_load_more = false
        }
      })
    }
    else {
      infiniteScroll.complete()
    }
  }

  doRefresh(refresh) {
    this.can_load_more = true
    this.limit = 20
    this.offset = 0
    this.getData()
    refresh.complete();
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
