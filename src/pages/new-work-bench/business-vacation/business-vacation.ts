import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BusinessService } from './businessService'
import { BusinessAutoService} from './businessAuto'
import { BusinessMeAutoService} from './businessMeAuto'
declare let cordova: any;
/**
 * Generated class for the VacationApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-business-vacation',
  templateUrl: 'business-vacation.html',
  providers: [BusinessService, BusinessAutoService, BusinessMeAutoService],
})
export class BusinessVacationPage {
  inner_type = 'wait_me'
  me_list = []
  wait_me_list = []
  is_manager = false
  user_id;
  is_ios = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform,
    public businessService: BusinessService, public businessAutoService: BusinessAutoService, public businessMeAutoService: BusinessMeAutoService) {
    if (this.platform.is('ios')) {
      this.is_ios = true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VacationApprovalPage');
    // cordova.plugins.Keyboard.close();
  }

  ionViewWillEnter() {

    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        if (this.inner_type == 'wait_me') {
          this.click_wait_me()
        }
        else {
          this.click_me()
        }
      }
      )
  }

  click_me() {
    this.inner_type = 'me'
    this.me_list = []
    let body = {
      'user_id' :this.user_id,
      'type': 'me',
    }
    this.businessService.get_total_bus_vacation(body).then(my_data => {
      if (my_data.result.res_data && my_data.result.res_code == 1) {
        this.me_list = my_data.result.res_data
      }
    })
  }

  click_wait_me() {
    this.inner_type = 'wait_me'
    this.wait_me_list = []
    let body = {
      'user_id' :this.user_id,
      'type': 'wait_me',
    }
    this.businessService.get_total_bus_vacation(body).then(my_data => {
      if (my_data.result.res_data && my_data.result.res_code == 1) {
        this.wait_me_list = my_data.result.res_data
      }
    })
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "rt_name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "create_uid";
      search_text = event.name.replace("搜 申请人：", "")
    }
    else if (event.id == 3) {
      type = "rt_subject";
      search_text = event.name.replace("搜 主题：", "")
    }
    this.wait_me_list = []
    let body = {
      'type': this.inner_type,
      'search_type': type,
      'search_text': search_text,
      'user_id': this.user_id
    }
    this.businessService.search_bus_vacation(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.wait_me_list = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    if (this.inner_type == 'wait_me') {
      this.click_wait_me()
    }
    else {
      this.click_me()
    }
  }

  itemMeSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "rt_name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = 'to_approval_employees'
      search_text = event.name.replace('搜 待审核人：', '')
    }
    else if (event.id == 3) {
      type = "rt_subject";
      search_text = event.name.replace("搜 主题：", "")
    }
    this.me_list = []
    let body = {
      'type': this.inner_type,
      'search_type': type,
      'search_text': search_text,
      'user_id': this.user_id
    }
    this.businessService.search_bus_vacation(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.me_list = res.result.res_data
      }
    })
  }

  itemClearMeSelected(event) {
    this.click_me()
  }

  approval_detail(item) {
    this.navCtrl.push('BusinessVacationDetailPage', {
     user_id: this.user_id,
     data: item
    })
  }

  goBack() {
    this.navCtrl.pop()
  }



}
