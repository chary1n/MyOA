import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the SearchScheduleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-schedule-list',
  templateUrl: 'search-schedule-list.html',
})
export class SearchScheduleListPage {
  data_list = []
  meeting_id
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data_list = this.navParams.get('data_list')
    this.meeting_id = this.navParams.get('meeting_id')
    this.uid = this.navParams.get('uid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchScheduleListPage');
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

  goBack() {
    this.navCtrl.pop()
  }

}
