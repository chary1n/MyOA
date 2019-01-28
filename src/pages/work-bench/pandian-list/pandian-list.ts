import { PandianService } from './pandianService';
import { PandianAutoService } from './pandianautoservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PandianListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  providers: [PandianAutoService, PandianService],
  selector: 'page-pandian-list',
  templateUrl: 'pandian-list.html',
})
export class PandianListPage {
  isMoreData = true;
  wait_approval_list = [];
  limit = 30;
  offset = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public pandianAutoService: PandianAutoService
            , public pandianService: PandianService) {
              this.initData()
  }

  initData(){
    let body = {
      'limit': 30,
      'offset': 0
    }
    this.pandianService.get_stock_inventory(body).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PandianListPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.initData();
      this.navParams.data.need_fresh = false;
    }
  }

  doInfinite(event) {
    if (this.isMoreData == true) {
      if(this.wait_approval_list.length<30){
        event.complete();
        return
      }
      this.limit = 30;
      this.offset = this.offset + 30;
      let body = {
        'limit': this.limit,
        'offset': this.offset
      }
      this.pandianService.get_stock_inventory(body).then(res => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length > 0) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            this.wait_approval_list.push(item)
          }
        }else {
          this.isMoreData = false;
        }
        event.complete();
      })
    } else {
      event.complete();
    }
  }


  approved_detail(item){
    this.navCtrl.push('PandianDetailPage', {
      item: item,
    });
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 盘点名称：", "")
    }
    else if (event.id == 2) {
      type = "location";
      search_text = event.name.replace("搜 盘点位置：", "")
    }
    else if (event.id == 3) {
      type = "create";
      search_text = event.name.replace("搜 创建人：", "")
    }
    let body={
      'search_text': search_text,
      'type': type
    }
    this.pandianService.search_stock_inventory(body).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
      }
    })
  }


  itemClearSelected(event) {
    this.initData()
  }

  goBack() {
    this.navCtrl.pop()
  }

  changeState(state) {
    if (state == 'draft') {
      return "草稿";
    }
    else if (state == 'cancel') {
      return "已取消";
    }
    else if (state == 'confirm') {
      return "进行中";
    }
    else if (state == 'done') {
      return "完成";
    }
    else {
      return state;
    }
  }
}
