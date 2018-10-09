import { AllScheduleService } from './all-schedule-service';
import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the AllSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-schedule',
  templateUrl: 'all-schedule.html',
  providers: [FirstShowService, AllScheduleService]
})
export class AllSchedulePage {
  uid
  dataList = []
  type_list = []
  meeting_id
  type_id = -1
  need_fresh = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firshowService: FirstShowService,
    public storage: Storage, public statusBar: StatusBar, public allScheduleService: AllScheduleService) {

    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
      let body = {
        'uid': this.uid
      }
      this.firshowService.get_all_schedule(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.dataList = res.result.res_data.data
          this.meeting_id = res.result.res_data.meeting_id
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].id == -1) {
              this.type_list = this.dataList[i].dataList
            }
          }
        }
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllSchedulePage');
  }

  ionViewDidEnter() {
    this.type_id = -1
    let body = {
      'uid': this.uid
    }
    this.firshowService.get_all_schedule(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.dataList = res.result.res_data.data
        this.meeting_id = res.result.res_data.meeting_id
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].id == -1) {
            this.type_list = this.dataList[i].dataList
          }
        }
      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh = this.navParams.get('need_fresh')
    this.type_list = []
    if (this.need_fresh) {
      let body = {
        'uid': this.uid
      }
      this.firshowService.get_all_schedule(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.meeting_id = res.result.res_data.meeting_id
          if (this.type_id == -1) {
            this.dataList = res.result.res_data.data
          } else {
            let listData = []
            listData = res.result.res_data.data
            for (let i = 0; i < listData.length; i++) {
              if (listData[i].id == this.type_id) {
                this.type_list = listData[i].dataList
                listData[i].select = true
              } else {
                listData[i].select = false
              }
            }
            this.dataList = listData
          }
        }
      })
    }
  }

  selectType(item) {
    this.type_id = item.id
    item.select = true
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].id != item.id) {
        this.dataList[i].select = false
      }
    }
    this.type_list = item.dataList
  }

  toDetail(item) {
    if (this.meeting_id == item.id) {
      this.navCtrl.push('MeetingPage', {
        'meeting_id': item.rt_meeeting_s_id,
        'isEdit': false,
        'uid': this.uid,
        'frontPage': 'AllSchedulePage',
      })
    } else {
      this.navCtrl.push('CalendarDeatilpagePage', {
        'item': item,
        'isEdit': false,
        'frontPage': 'AllSchedulePage',
      })
    }
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "subject";
      search_text = event.name.replace("搜 主题：", "")
    }
    else if (event.id == 2) {
      type = "create_uid";
      search_text = event.name.replace("搜 创建人：", "")
    }
    else if (event.id == 3) {
      type = "rt_project_principal";
      search_text = event.name.replace("搜 负责人：", "")
    }
    else if (event.id == 4) {
      type = "partner_ids";
      search_text = event.name.replace("搜 参与人：", "")
    }
    if (search_text)
      this.type_list = []
    let body = {
      'type': type,
      'search_text': search_text,
      'uid': this.uid,
      'event_type': this.type_id
    }
    this.firshowService.search_all_schedule(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.type_list = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].id == -1) {
        this.selectType(this.dataList[i])
      }
    }
  }
}
