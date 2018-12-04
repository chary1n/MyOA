import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ActionSheetController, AlertController } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

declare let cordova: any;
import 'jquery'
declare var $: any;
/**
 * Generated class for the MeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-meeting-check-in',
  templateUrl: 'meeting-check-in.html',
  providers: [FirstShowService]
})
export class MeetingCheckInPage {
  check_in_list = []
  is_check_in
  meeting_id
  meeting_line_id
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams, public firService: FirstShowService
    , public storage: Storage, public toastCtrl: ToastController) {
    this.meeting_id = this.navParams.get('meeting_id')
    this.uid = this.navParams.get('uid')
    this.meeting_line_id = this.navParams.get('meeting_line_id')
    let body = {}
    if (this.meeting_id) {
      body = {
        'meeting_id': this.meeting_id,
        'uid': this.uid
      }
    }
    else if (this.meeting_line_id) {
      body = {
        'meeting_line_id': this.meeting_line_id,
        'uid': this.uid
      }
    }
    this.firService.meeting_check_in(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.check_in_list = res.result.res_data.rt_check_in_ids
        this.is_check_in = res.result.res_data.rt_is_show_sign
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetingCheckInPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_check() {
    let body = {}
    if (this.meeting_id) {
      body = {
        'meeting_id': this.meeting_id,
        'uid': this.uid
      }
    }
    else if (this.meeting_line_id) {
      body = {
        'meeting_line_id': this.meeting_line_id,
        'uid': this.uid
      }
    }
    this.firService.check_in(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.check_in_list = res.result.res_data.rt_check_in_ids
        this.is_check_in = res.result.res_data.rt_is_show_sign
        Utils.toastButtom('签到成功', this.toastCtrl)
      }
    })
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  refresh() {
    let body = {}
    if (this.meeting_id) {
      body = {
        'meeting_id': this.meeting_id,
        'uid': this.uid
      }
    }
    else if (this.meeting_line_id) {
      body = {
        'meeting_line_id': this.meeting_line_id,
        'uid': this.uid
      }
    }
    this.firService.meeting_check_in(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.check_in_list = res.result.res_data.rt_check_in_ids
        this.is_check_in = res.result.res_data.rt_is_show_sign
      }
    })
  }

}
