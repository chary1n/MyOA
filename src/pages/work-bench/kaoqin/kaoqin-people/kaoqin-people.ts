import { BLE } from '@ionic-native/ble';
import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './../kaoqinService';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Platform,AlertController ,ToastController,LoadingController} from 'ionic-angular';

/**
 * Generated class for the KaoqinPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kaoqin-people',
  templateUrl: 'kaoqin-people.html',
  providers:[KaoQinService,DatePipe],
})
export class KaoqinPeoplePage {
  manager_id;
  type;
  current_date;
  items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public kaoQinService:KaoQinService,
  public datePipe :DatePipe) {
    this.manager_id = this.navParams.get('manager_id')
    this.type = this.navParams.get('type')
    this.current_date = this.navParams.get('current_date')
    var timestamp = Date.parse(this.current_date);
    var timestamp_now = timestamp / 1000 - 24 * 60 * 60
    var date_later = new Date(timestamp_now * 1000)
    this.kaoQinService.get_department_employee_attendance(this.manager_id,this.formatTime_day_start(this.current_date),this.formatTime_day_end(this.current_date)).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        if (this.type == "未打卡"){
          this.items = res.result.res_data.un_attendance
        }
        else
        {
          this.items = res.result.res_data.attendance
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KaoqinPeoplePage');
  }

  formatTime_day_start(date){
    
    let timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd').replace(/-/g, '/'));
    let timestamp_now = timestamp / 1000 - 24 * 60 * 60
    let date_now = new Date(timestamp_now * 1000)
    let year = date_now.getFullYear()
    let month = date_now.getMonth() + 1
    let day = date_now.getDate()
    let hour = 16
    let minute = 0
    let second = 0
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

  formatTime_day_end(date){
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = 15
    let minute = 59
    let second = 59
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

}
