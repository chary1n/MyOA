import { NavParams } from 'ionic-angular/navigation/nav-params';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Storage } from '@ionic/storage';
import { RedWhiteService} from './redwhiteService'
import { RedWhiteAutoService} from './resWhiteAutoService'

/**
 * Generated class for the RedWhiteCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-red-white-card',
  templateUrl: 'red-white-card.html',
  providers: [RedWhiteService, RedWhiteAutoService]
})
export class RedWhiteCardPage {
  uid
  type = 'get'
  card_list
  isMoreData = true

  limit = 20
  offset = 0
  constructor(public navCtrl: NavController, public navParams: NavParams ,public storage: Storage, 
    public redService: RedWhiteService, public redWhiteAutoService: RedWhiteAutoService) {
      this.type = 'get'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedWhiteCardPage');
  }

  ionViewDidEnter() {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id
      this.refresh_data()
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_create() {
    this.type = 'create'
    this.refresh_data()
  }

  click_get() {
    this.type = 'get'
    this.refresh_data()
  }

  click_all() {
    this.type = 'all'
    this.refresh_data()
  }

  refresh_data() {
    this.offset = 0
    this.isMoreData = true
    this.card_list = []
    this.redService.get_red_white_card_list({ 'uid': this.uid , 'type': this.type, 'limit': this.limit, 'offset': this.offset}).then(res_result => {
      if (res_result.result.res_data && res_result.result.res_code == 1) {
        this.card_list = res_result.result.res_data
      }
    })
  }

  doRefresh(refresh) {
    this.refresh_data()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.offset = this.offset + 20;
      this.redService.get_red_white_card_list({'uid': this.uid , 'limit': this.limit, 'offset': this.offset, 'type': this.type }).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          this.card_list.push(item_data)

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
      type = "remark";
      search_text = event.name.replace("搜 原因：", "")
    }
    else if (event.id == 2) {
      type = "user_id";
      search_text = event.name.replace("搜 员工：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
      'select_type': this.type,
      'uid': this.uid,
    }
    

    this.card_list = []
    this.isMoreData = false
    this.redService.get_red_white_card_list_with_domain(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.card_list = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.refresh_data()
  }

  card_detail(item) {
    this.navCtrl.push('RedWhiteCardDetailPage', {
      'card_id': item.card_id,
      'user_id': this.uid
    })
  }

  click_create_card() {
    this.navCtrl.push('RedWhiteCardCreatePage', {
      'user_id': this.uid,
    })
  }

}
