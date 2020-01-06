import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { NewPoAutoService } from './new-purchase-order-auto-service'
import { PoService } from './PoService'
import { NewReturnAutoService } from './new-purchase-return-auto-service'
/**
 * Generated class for the NewPurchaseOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-purchase-order',
  templateUrl: 'new-purchase-order.html',
  providers: [NewPoAutoService, PoService, NewReturnAutoService],
})
export class NewPurchaseOrderPage {
  is_ios = false
  type = 'po'
  limit = 20;
  offset = 0;
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true;
  po_arr = []
  xun_arr = []
  return_arr = []
  user_id
  approve_arr = []
  approve_arr_length = 0
  can_load_more = true

  need_fresh = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public alertCtrl: AlertController, public platform: Platform, public newPoAutoService: NewPoAutoService,
    public poService: PoService, public newReturnAutoService: NewReturnAutoService) {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.clickPO()
      })
    if (this.platform.is('ios')) {
      this.is_ios = true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPurchaseOrderPage');
  }

  ionViewDidEnter(){
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      if (this.type == 'po'){
        this.clickPO()
      }
      else if (this.type == 'xun'){
        this.clickXun()
      }
      else if (this.type == 'return'){
        this.clickReturn()
      }
    }
  }

  itemPOSelected(event) {
    this.can_load_more = false
    let type;
    let search_text;
    let data;
    if (event.id == 2) {
      data = 'product_id'
      search_text = event.name.replace("搜 产品：", "")
    }
    else if (event.id == 1) {
      data = 'name'
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 3) {
      data = 'create_uid'
      search_text = event.name.replace("搜 负责人：", "")
    }
    else if (event.id == 4) {
      data = 'rt_team_id'
      search_text = event.name.replace("搜 采购团队：", "")
    }
    let body = {
      'state': this.type,
      'data': data,
      'search_text': search_text,
    }
    this.poService.search_po(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        if (this.type == 'po') {
          this.po_arr = res.result.res_data
        }
        else if (this.type == 'xun') {
          this.xun_arr = res.result.res_data
        }
      }
    })
  }

  itemClearPOSelected($event) {
    if (this.type == 'po') {
      this.clickPO()
    }
    else if (this.type == 'xun') {
      this.clickXun()
    }
  }

  itemSelected(event) {
    this.can_load_more = false
    let data = ''
    let search_text = ''
    if (event.id == 1) {
      data = 'name'
      search_text = event.name.replace("搜 单号：", "")
    }
    let body = {
      'data': data,
      'search_text': search_text,
    }
    this.poService.search_return(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.return_arr = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.clickReturn() 
  }



  goBack() {
    this.navCtrl.pop()
  }

  clickReturn() {
     this.can_load_more = true
    this.type = 'return'
    this.isMoreData3 = true;
    this.limit = 20;
    this.offset = 0;
    let body = {
      'offset': this.offset,
      'limit': this.limit,
      'user_id': this.user_id
    }
    this.poService.get_prma(body).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.return_arr = res.result.res_data;
      }
    })
  }

  clickPO() {
     this.can_load_more = true
    this.type = 'po'
    this.isMoreData1 = true;
    this.limit = 20;
    this.offset = 0;
    let body = {
      'state': this.type,
      'offset': this.offset,
      'limit': this.limit,
      'user_id': this.user_id
    }
    this.poService.get_po(body).then((res) => {
      console.log(res)
      this.po_arr = res.result.res_data;
    })
    this.poService.get_po_approve({ 'uid': this.user_id }).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.approve_arr = res.result.res_data
        if (this.approve_arr){
          this.approve_arr_length = this.approve_arr.length
        }
        else
        {
          this.approve_arr_length = 0
        }
        
      }
    })
  }

  clickXun() {
     this.can_load_more = true
    this.type = 'xun'
    this.isMoreData2 = true;
    this.limit = 20;
    this.offset = 0;
    let body = {
      'state': this.type,
      'offset': this.offset,
      'limit': this.limit,
      'user_id': this.user_id
    }
    this.poService.get_po(body).then((res) => {
      console.log(res)
      this.xun_arr = res.result.res_data;
    })
  }

  doRefresh1(refresh) {
     this.can_load_more = true
    if (this.type == 'po') {
      this.isMoreData1 = true;
    }
    else if (this.type == 'xun') {
      this.isMoreData2 = true;
    }

    this.limit = 20;
    this.offset = 0;
    let body = {
      'state': this.type,
      'offset': this.offset,
      'limit': this.limit,
      'user_id': this.user_id
    }
    this.poService.get_po(body).then((res) => {
      console.log(res)
      refresh.complete();
      if (this.type == 'po') {
        this.po_arr = res.result.res_data;
      }
      else if (this.type == 'xun') {
        this.xun_arr = res.result.res_data;
      }

    })
  }

  doInfinite1(infiniteScroll) {
    if (this.can_load_more) {
      let more_data = false
      if (this.type == 'po') {
        more_data = this.isMoreData1
      }
      else if (this.type == 'xun') {
        more_data = this.isMoreData2
      }
      if (more_data) {
        this.limit = 20;
        this.offset = this.offset + 20;
        let body = {
          'state': this.type,
          'offset': this.offset,
          'limit': this.limit,
          'user_id': this.user_id
        }
        this.poService.get_po(body).then((res) => {
          let item_data = [];
          if (res.result.res_data) {
            item_data = res.result.res_data;
            if (item_data.length == 20) {
              if (this.type == 'po') {
                this.isMoreData1 = true;
              }
              else if (this.type == 'xun') {
                this.isMoreData2 = true;
              }
            }
            else {
              if (this.type == 'po') {
                this.isMoreData1 = false;
              }
              else if (this.type == 'xun') {
                this.isMoreData2 = false;
              }
            }
            for (let item of item_data) {
              // this.po_arr.push(item);
              if (this.type == 'po') {
                this.po_arr.push(item);
              }
              else if (this.type == 'xun') {
                this.xun_arr.push(item);
              }
            }
          }
          else {
            if (this.type == 'po') {
              this.isMoreData1 = false;
            }
            else if (this.type == 'xun') {
              this.isMoreData2 = false;
            }
          }
          infiniteScroll.complete();
        })
      } else {
        infiniteScroll.complete();
      }
    }
  }

  doRefresh4(refresh) {
     this.can_load_more = true
    this.isMoreData3 = true;
    this.limit = 20;
    this.offset = 0;
    let body = {
      'offset': this.offset,
      'limit': this.limit,
      'user_id': this.user_id
    }
    this.poService.get_prma(body).then((res) => {
      refresh.complete();
      if (res.result && res.result.res_code == 1) {

        this.return_arr = res.result.res_data;
      }
    })
  }

  doInfinite4(infiniteScroll) {
    if (this.can_load_more) {
      if (this.isMoreData3) {
        this.limit = 20;
        this.offset = this.offset + 20;
        let body = {
          'offset': this.offset,
          'limit': this.limit,
          'user_id': this.user_id
        }
        this.poService.get_prma(body).then((res) => {
          let item_data = [];
          if (res.result.res_data) {
            item_data = res.result.res_data;
            if (item_data.length == 20) {
              this.isMoreData3 = true
            }
            else {
              this.isMoreData3 = false
            }
            for (let item of item_data) {
              this.return_arr.push(item);
            }
          }
          else {
            this.isMoreData3 = false
          }
          infiniteScroll.complete();
        })
      } else {
        infiniteScroll.complete();
      }
    }

  }

  changeState(state) {
    console.log(state)
    if (state == "draft") {
      return "草稿"
    } else if (state == "sent") {
      return "发送询价单"
    } else if (state == "reviewing") {
      return "审核中"
    } else if (state == "rejected") {
      return "已锁定"
    } else if (state == "purchase") {
      return "采购订单"
    } else if (state == "done") {
      return "已完成"
    } else if (state == "cancel") {
      return "已取消"
    }
  }
  changeDuizhang(state) {
    if (state == "no") {
      return "没有要对账的"
    } else if (state == "to invoice") {
      return "待对账"
    } else if (state == "invoiced") {
      return "已对账完成"
    } else {
      return state
    }
  }

  toFix(amount) {
    return amount.toFixed(2)
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  orderDetail(items) {
    this.poService.get_po({ 'id': items.id })
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('NewPurchaseOrderDetailPage', {
            item: res.result,
            showNumber: false,
            state: items.state,
            frontPage: 'NewPurchaseOrderPage',
          })
        }
      })
  }

  clickApproval() {
    this.navCtrl.push('NewPoApprovalPage', {
      'po_arr': this.approve_arr
    })
  }

  returnOrderDetail(item) {
    let body = {
      'id': item.id
    }
    this.poService.get_prma(body)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('ReturnOrderDetailPage', {
            item: res.result,
            id: item.id,
          })
        }
      })
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
