import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AttendanceService} from '../attendanceService';
import { DatePipe } from '@angular/common';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the AttendanceAllDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attendance-all-data',
  templateUrl: 'attendance-all-data.html',
  providers: [AttendanceService,DatePipe],
})
export class AttendanceAllDataPage {
  user_ava;
  user_name;
  currentDate;
  currentDate_date;
  items_day = [];
  user;
  currentDayList = []
  currentDay = 0;
  currentMonth = 0;
  currentYear = 0;
  addBuKaPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public attendanceService:AttendanceService,
              public datePipe: DatePipe,public storage: Storage) {

    if (this.navParams.get('edit')){
        this.addBuKaPage = Utils.getViewController("AttendanceRecoupDetailEditPage", navCtrl);
    }
    else{
        this.addBuKaPage = Utils.getViewController("AttendanceRecoupAddDetailPage", navCtrl);
    }
    
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    this.currentDate = (this.currentDate_date.getMonth() + 1) + '月'
    this.currentDay = this.currentDate_date.getDate()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentYear = this.currentDate_date.getFullYear()
    this.setSchedule(this.currentDate_date)

    this.storage.get('user').then(res => {
      this.user = res.result.res_data
      this.attendanceService.get_today_attendance(this.formatTime_day_start(new Date()),this.formatTime_day_end(new Date()),this.user.user_id).then(res => {
            // console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
              this.items_day = res.result.res_data
              if (this.items_day.length * 140 + 30 > 400){
                this.change_divClass_height(this.items_day.length * 140 + 30)
              }
            }
        })
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceAllDataPage');
  }

  change_divClass_height(height){
     let elementContent = document.getElementById("divClass");
     return elementContent.style.height = height + "px"
  }

  formatTime_day_start(date){
    
    let timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
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

  formatTime_odoo(date){
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [year, this.formatO(month), this.formatO(day)].join('-') + ' ' + [this.formatO(hour), this.formatO(minute), this.formatO(second)].join(':')
  }

  formatO(date){
    return String(date).length == 2 ? date : '0' + date
  }

  calcStart(item){
    let timestamp_e = Date.parse(item.check_in.replace(/-/g, '/'))
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    return time_str
  }

  calcEnd(item){
    let timestamp_e = Date.parse(item.check_out.replace(/-/g, '/'))
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    return time_str
  }

  setSchedule(currentObj){
    
    let m = currentObj.getMonth() + 1
    let Y = currentObj.getFullYear()
    let d = currentObj.getDate();
    let dayString = Y + '/' + m + '/' + currentObj.getDate()
    let currentDayNum = new Date(Y, m, 0).getDate()
    let currentDayWeek = currentObj.getUTCDay() + 1
    let result = currentDayWeek - (d % 7 - 1);
    let firstKey = result <= 0 ? 7 + result : result;
    let currentDayList = []
    var total_weeks = this.getWeeks(Y, m)
    var f = 0
    for (var i = 0; i < total_weeks * 7; i++) {
      let data = []
      let date_obj = {
        y: Y,
        m: m,
        d: 0,
      }
      if (i < firstKey - 1) {
        if (date_obj.d == 0)
        {
          currentDayList[i] = {
             y: Y,
        m: m,
        d: "",
          }
        }
        
      } else {
        if (f < currentDayNum) {
          date_obj.d = f + 1
          currentDayList[i] = date_obj
          f = currentDayList[i].d
        } else if (f >= currentDayNum) {
          currentDayList[i] = {
             y: Y,
        m: m,
        d: "",
          }
        }
      }
      this.currentDayList = currentDayList
    }
  }

  getWeeks(y, m) {
    let str = new Date(y + "/" + m + '/1');
    // 当前年份
    let year = str.getFullYear();
    //  获取月份第一天是周几  周日是0
    let day = str.getDay();
    // 获取当前月份的天数
    let days = new Date(year, m, 0).getDate();
    // 要减去开头的这几天
    let first = 0;
    day == 0 ? first = 1 : first = 8 - day;
    days = days - first;
    return 1 + Math.ceil(days / 7);
  }

  choose_day(date){
    this.items_day = []
    var choose_date = date.y + "/" + date.m + "/" + date.d
    this.currentDay = date.d
    this.currentMonth = date.m
    this.currentYear = date.y
    var timestamp = Date.parse(choose_date);
    var timestamp_now = timestamp / 1000 
    var timestamp_later = timestamp / 1000
    var date_before = new Date(timestamp_now * 1000)
    var date_later = new Date(timestamp_later * 1000)

    this.attendanceService.get_today_attendance(this.formatTime_day_start(date_before),this.formatTime_day_end(date_later),this.user.user_id).then(res => {
            console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
              this.items_day = res.result.res_data
              if (this.items_day.length * 140 + 30 > 400){
                this.change_divClass_height(this.items_day.length * 140 + 30)
              }
            }
        })
  }

  add_month(){
    var Y = this.currentDate_date.getFullYear();
    var m = this.currentDate_date.getMonth() + 1;
    var d = this.currentDate_date.getDate();
    let str = ''
    console.log(m)
      m = m + 1
      console.log(m)
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
      } else {
        Y = Y + 1
        m = 1
        str = Y + '/' + 1 + '/' + d
      }

    this.currentDate_date =  new Date(str)
    // console.log(this.currentDate_date)
    // console.log()
    this.currentDate = (this.currentDate_date.getMonth() + 1) + '月'  
    this.setSchedule(new Date(str))
  }

  delete_month(){
    var Y = this.currentDate_date.getFullYear();
    var m = this.currentDate_date.getMonth() + 1;
    var d = this.currentDate_date.getDate();
    let str = ''
    m = m - 1
      if (m <= 0) {
        Y = Y - 1
        m = 12
        str = Y + '/' + 12 + '/' + d
      } else {
        str = Y + '/' + m + '/' + d
      }
    this.currentDate_date =  new Date(str)
    // console.log(this.currentDate_date)
    this.currentDate = (this.currentDate_date.getMonth() + 1) + '月'
    this.setSchedule(new Date(str))
  }

  delete_attendance(item){
    let work_type = item.check_out ? "下班" : "上班"
    let time ;
    if (work_type == "上班"){
      time = item.check_in
    }
    else
    {
      time = item.check_out
    }
    let timestamp_e = Date.parse(time.replace(/-/g, '/'))
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [date_end.getFullYear(), this.formatO((date_end.getMonth() + 1)), this.formatO(date_end.getDate())].join('-') + ' ' + [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    this.addBuKaPage.data.time = time_str;
    this.addBuKaPage.data.work_type = work_type;
    this.addBuKaPage.data.attendance_id = item.attendance_id
    this.navCtrl.pop();
  }

}
