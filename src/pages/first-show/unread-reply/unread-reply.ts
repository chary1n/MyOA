import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UnreadReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unread-reply',
  templateUrl: 'unread-reply.html',
})
export class UnreadReplyPage {
  item = [];
  uid;
  item_need
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController,
    public storage: Storage) {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
      this.item = []
      this.item_need = this.navParams.get('item')
      var data_arr = []
      for (let i = 0; i < this.item_need.length; i++) {
        var item_one = this.item_need[i][0]
        data_arr.push(item_one.msg_id)
        this.item.push(item_one)
      }
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnreadReplyPage');
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  gotoDeatil(item) {
    if (item.subject_type == '项目') {
      this.showService.get_event_detail({
        'uid': this.uid,
        'event_id': item.event_id
      }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          item = res.result.res_data
          this.navCtrl.push('MeetingProjectPage', {
            'meeting_id': item.rt_meeeting_s_id,
            'isEdit': false,
            'uid': this.uid,
            'frontPage': 'FirstShowPage'
          })
        }
      })
    }
    else {
      if (item.res_model_s == 'rt.performance.appraisal.detail' && item.res_id != false) {
        let body = {
          'res_model_s': 'rt.performance.appraisal.detail',
          'uid': this.uid,
          'id': item.res_id
        }
        this.showService.get_res_model(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.navCtrl.push('PerformanceStartPage', {
              'item': res.result.res_data
            })
          }
        })
      } else {
        if (item.is_meeting == false) {
          this.showService.get_event_detail({
            'uid': this.uid,
            'event_id': item.event_id
          }).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
              item = res.result.res_data
              this.navCtrl.push('MeetingPage', {
                'meeting_id': item.rt_meeeting_s_id,
                'isEdit': false,
                'uid': this.uid,
                'frontPage': 'FirstShowPage'
              })
            }
          })



        } else {
          this.showService.get_event_detail({
            'uid': this.uid,
            'event_id': item.event_id
          }).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
              item = res.result.res_data
              this.navCtrl.push('CalendarDeatilpagePage', {
                'item': item,
                'isEdit': false,
                'frontPage': 'FirstShowPage'
              })
            }
          })

        }
      }
    }

  }

  readAll() {
    var data_arr = []
    for (let i = 0; i < this.item_need.length; i++) {
      var item_one = this.item_need[i][0]
      data_arr.push(item_one.msg_id)
    }
    this.showService.read_total_reply({ 'list': data_arr, 'uid': this.uid }).then(res => {

    })
  }

  goBack(){
    this.navCtrl.pop()
  }

}
