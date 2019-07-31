import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { NewCustomerService } from './new-customerService'
import { NewCustomerAutoService } from './new-customerAutoService'
/**
 * Generated class for the NewCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-customer',
  templateUrl: 'new-customer.html',
  providers: [NewCustomerService, NewCustomerAutoService],
})
export class NewCustomerPage {
  detail_type = 'customer'
  data_arr = ['1', 'i']
  starArr = ['1', '1', '1', '1', '1']
  limit = 20;
  offset = 0;
  isMoreData = true;
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public customerAutoService: NewCustomerAutoService,
    public customerService: NewCustomerService, public storage: Storage) {
    this.storage.get('user')
      .then(res => {
        console.log(res);
        this.user_id = res.result.res_data.user_id;
        this.reload_data(null)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCustomerPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_customer() {
    this.detail_type = 'customer'
    this.reload_data(null)
  }

  click_hd_customer() {
    this.detail_type = 'hd_customer'
    this.reload_data(null)
  }

  click_xs_customer() {
    this.detail_type = 'xs_customer'
    this.reload_data(null)
  }

  click_gh_customer() {
    this.detail_type = 'gh_customer'
    this.reload_data(null)
  }

  doRefresh(refresh) {
    this.reload_data(refresh)
  }

  reload_data(refresh) {
    this.isMoreData = true
    this.offset = 0
    this.data_arr = []
    let body = {
      'type': this.detail_type,
      'user_id': this.user_id,
      'limit': this.limit,
      'offset': this.offset,
    }
    this.customerService.get_total_customer_with_domain(body).then(res => {
      if (refresh) {
        refresh.complete()
      }
      if (res.result.res_code == 1 && res.result.res_data) {
        this.data_arr = res.result.res_data
      }
    })
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.offset = this.offset + 20;
      let body = {
        'type': this.detail_type,
        'limit': this.limit,
        'offset': this.offset,
        'user_id': this.user_id,
      }
      this.customerService.get_total_customer_with_domain(body).then((res) => {
        if (res.result && res.result.res_code == 1) {
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
        }
        else {
          infiniteScroll.complete();
        }
      })
    } else {
      infiniteScroll.complete();
    }
  }

  itemClearSelected(event) {
    this.reload_data(null)
  }

  itemSelected(event) {
    this.isMoreData = false
    let type;
    let search_text;
    let data;
    if (event.id == 2) {
      data = 'team_id'
      search_text = event.name.replace("搜 销售团队：", "")
    }
    else if (event.id == 1) {
      data = 'name'
      search_text = event.name.replace("搜 客户：", "")
    }
    else if (event.id == 3) {
      data = 'user_id'
      search_text = event.name.replace("搜 销售员：", "")
    }
    let body = {
      'search_type': data,
      'search_text': search_text,
      'type': this.detail_type,
      'user_id': this.user_id,
    }
    this.data_arr = []
    this.customerService.search_partner_with_domain(body).then((res) => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.data_arr = res.result.res_data;
      }
    })
  }

  partner_detail(item){
    this.navCtrl.push('NewCustomerDetailPage', {
      item: item,
      user_id: this.user_id,
    })
  }

}
