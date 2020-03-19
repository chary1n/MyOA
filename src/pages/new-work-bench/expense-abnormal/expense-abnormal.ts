import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../providers/Utils';
import { ExpAbService } from './expenseAbService'
import { ExpAbAutoService} from './expenseAbAutoService'
/**
 * Generated class for the ExpenseAbnormalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-expense-abnormal',
  templateUrl: 'expense-abnormal.html',
  providers: [ExpAbService, ExpAbAutoService],
})
export class ExpenseAbnormalPage {
  user_id
  type
  show_data
  wait_count = 0
  limit = 10
  offset = 0
  isMoreData = true
  constructor(public navCtrl: NavController, public navParams: NavParams, public expAbService: ExpAbService,
    public storage: Storage, public expAbAutoService: ExpAbAutoService) {
    this.type = 'approved'
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.reload_data()
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ExpenseAbnormalPage');
  }

  reload_data() {
    this.show_data = []
    var body = {
      'type': this.type,
      'user_id': this.user_id,
      'limit': this.limit,
      'offset': this.offset
    }
    this.expAbService.get_all_expense_abnormal_data(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.show_data = res.result.res_data.data
        this.wait_count = res.result.res_data.count
      }
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

  click_wait() {
    this.offset = 0
    this.type = 'approved'
    this.reload_data()
  }

  click_done() {
    this.offset = 0
    this.type = 'all'
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
      type = "create_uid";
      search_text = event.name.replace("搜 创建人：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
      'state': this.type,
      'user_id': this.user_id
    }
    this.show_data = []
    this.isMoreData = false
    this.expAbService.search_expense_abnormal_data(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.show_data = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.offset = 0
    this.reload_data()
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
      return '0.00'
    }
  }

  doRefresh(refresh) {
    this.offset = 0
    this.reload_data()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.offset = this.offset + 10;
      var body = {
        'type': this.type,
        'user_id': this.user_id,
        'limit': this.limit,
        'offset': this.offset
      }
      this.expAbService.get_all_expense_abnormal_data(body).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data.data;
          if (item_data.length == 10) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            this.show_data.push(item)
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

  payment_detail(item) {
    this.navCtrl.push('ExpenseAbnormalDetailPage', {
      item: item
    })
  }

  goBack() {
    this.navCtrl.pop()
  }
}
