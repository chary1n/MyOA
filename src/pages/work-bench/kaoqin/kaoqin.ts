import { BLE } from '@ionic-native/ble';
import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './kaoqinService';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Platform,AlertController ,ToastController,LoadingController} from 'ionic-angular';
import { Utils } from '../../../providers/Utils';
/**
 * Generated class for the KaoqinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kaoqin',
  templateUrl: 'kaoqin.html',
  providers:[KaoQinService,DatePipe,BLE],
})
export class KaoqinPage {
  isWrite = true;
  isLook = false;
  writeImg;
  lookImg;
  show_type = "me"
  user_ava;
  user_name;
  user;
  items;
  divHeight;
  scan_list = []
  device_list = []
  currentDate_date ;
  currentDayList = []
  currentDay = 0;
  currentMonth = 0;
  currentYear = 0;
  items_day = []
  currentDate;
  currentDate_day;
  is_show_tongji = false;
  is_attendance
  total_employees
  attendance_count = 0;
  is_ble_on = false;
  isShowOnAlert = false;
  isShowOffAlert = false;
  show_date_str;
  fail_times;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
    public kaoqinService:KaoQinService,private datePipe: DatePipe,private ble:BLE,
    private toastCtrl: ToastController,private loading:LoadingController,private elementRef: ElementRef,
    private alertCtrl:AlertController) {
      this.fail_times = 0
      this.kaoqinService.get_ble_device().then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.device_list = res.result.res_data
        }
      })
      


      
      
      this.storage.get('user')
      .then(res => {
        // console.log(res)
        this.kaoqinService.get_is_department(res.result.res_data.user_id).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            // console.log(res)
            this.is_show_tongji = res.result.res_data.is_manager
          }
      })
      })
      

  }

  ionViewDidLoad() {
    
    this.change_divClass_height(400)
    this.storage.get('user')
      .then(res => {
        // console.log(res)
        this.user = res.result.res_data
        this.user_ava = res.result.res_data.user_ava
        this.user_name = res.result.res_data.name
        
        this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()),this.formatTime_day_end(new Date()),this.user.user_id).then(res => {
            // console.log(res)

            if (res.result.res_data && res.result.res_code == 1) {
              this.items = res.result.res_data
              let count = 0
              if (this.items.length * 140 + 30 > 400){
                this.change_divClass_height(this.items.length * 140 + 30)
              }
              for (let item of this.items) {
                if(item.check_in){
                        count += 1
                      }
                if(item.check_out){
                  count += 1
                }
              }
              this.attendance_count = count
            }
        })
      }) 
    this.writeImg = "assets/img/journal_sheet/write_logcolor.png"
    this.lookImg = "assets/img/journal_sheet/look_log.png"
    
    
  }

  openBle(){
    // this.ble.enable().then(res=>{
    //   console.log(res)
    // });
  }

  scan(){
    // this.ble.scan([], 5).subscribe(device => {
    //   console.log(JSON.stringify(device));
    //   });
  }

  chooseWrite(){
      this.isWrite = true
      this.isLook = false
      this.writeImg = "assets/img/journal_sheet/write_logcolor.png"
      this.lookImg = "assets/img/journal_sheet/look_log.png"
  }

  chooseLook(){
    this.items_day = []
    this.isWrite = false
    this.isLook = true
    this.writeImg = "assets/img/journal_sheet/write_log.png"
    this.lookImg = "assets/img/journal_sheet/look_logcolor.png"
    this.show_type = "me"
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    this.currentDate = (this.currentDate_date.getMonth() + 1) + '月'
    this.currentDay = this.currentDate_date.getDate()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentYear = this.currentDate_date.getFullYear()
    this.setSchedule(this.currentDate_date)
    
    this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()),this.formatTime_day_end(new Date()),this.user.user_id).then(res => {
            // console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
              this.items_day = res.result.res_data
              if (this.items_day.length * 140 + 30 > 400){
                this.change_divClass_height(this.items_day.length * 140 + 30)
              }
            }
        })
  
  }

  click_me(){
    this.show_type = "me"
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    this.currentDate = (this.currentDate_date.getMonth() + 1) + '月'
    this.currentDay = this.currentDate_date.getDate()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentYear = this.currentDate_date.getFullYear()
    this.setSchedule(this.currentDate_date)
    this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()),this.formatTime_day_end(new Date()),this.user.user_id).then(res => {
            // console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
              this.items_day = res.result.res_data
              if (this.items_day.length * 140 + 30 > 400){
                this.change_divClass_height(this.items_day.length * 140 + 30)
              }
            }
        })
  }

  click_day(){
    this.show_type = "day"
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    this.currentDate_day = (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日"
    this.get_day_data(this.currentDate_date)
  }

  click_month(){
    this.show_type = "month"
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

  calcStart(item){
    let timestamp_e = Date.parse(item.check_in.replace(/-/g, '/'))
    // console.log(timestamp_e)
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    return time_str
  }

  calcEnd(item){
    let timestamp_e = Date.parse(item.check_out.replace(/-/g, '/'))
    // console.log(timestamp_e)
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    return time_str
  }

  formatO(date){
    return String(date).length == 2 ? date : '0' + date
  }

  change_divClass_height(height){
     let elementContent = document.getElementById("divClass");
     return elementContent.style.height = height + "px"
  }

  start_work(){
    let that = this
    this.ble.isEnabled().then(function(){
        let loading = that.loading.create({  
      content: '签到中...'  ,
      enableBackdropDismiss: true
    }); 
    let isHas = false
    let is_kaoqin_ok = false
    let is_ok = false
    loading.present(); 
    let list = []
    that.ble.scan([], 5).subscribe(device => {
      console.log(device.name)
      isHas = false
      let company_name = ""
      console.log(that.device_list)
      for (let item_device of that.device_list) {

          if (device.name == item_device.device_name)
            {
              isHas = true
              is_kaoqin_ok = true
              company_name = item_device.company_name
              that.ble.stopScan()
              loading.dismiss()
              break;
            }         
      }
      if (isHas && !is_ok){
            let timestamp = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));;
            let timestamp_now = timestamp / 1000 - 8 * 60 * 60
            let date = new Date(timestamp_now * 1000)

            let timestamp_cal = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
            let timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60
            let date_cal = new Date(timestamp_cal_now * 1000)

            let data_obj = {
              "employee_id":that.user.user_id,
              "check_in":that.formatTime_odoo(date),
              "day_start":that.formatTime_day_start(new Date()),
              "day_end":that.formatTime_day_end(new Date()),
              "company_name":company_name,
            }
            that.kaoqinService.employee_attendance(data_obj).then(res => {
                console.log(res)
                if (res.result.res_data && res.result.res_code == 1) {
                  that.fail_times = 0;
                  is_ok = true
                  //  Utils.toastButtom(, that.toastCtrl)
                    let timestamp_cal = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                    let timestamp_cal_now = timestamp_cal / 1000
                    let date_cal = new Date(timestamp_cal_now * 1000)
                    that.show_date_str = [that.formatO(date_cal.getHours()), that.formatO(date_cal.getMinutes())].join(':')

                    that.isShowOnAlert = true
                    let count = 0
                    that.items = res.result.res_data
                    if (that.items.length * 140 + 30 > 400){
                        that.change_divClass_height(that.items.length * 140 + 30)
                    }
                    for (let item of that.items) {
                      if(item.check_in){
                        count += 1
                      }
                      if(item.check_out){
                        count += 1
                      }
                    }
                    that.attendance_count = count
                }
            })
        }
        
    });
    
    let timer = self.setTimeout(function(){
        loading.dismiss()   
        that.ble.stopScan()
        if (!is_kaoqin_ok){
          that.fail_times = that.fail_times + 1
          
          if(that.fail_times >= 3)
          {
              that.showAlert("蓝牙考勤失败次数过多？")
          }
          else
          {
              Utils.toastButtom("不在考勤机范围内,请重试。", that.toastCtrl)
          }
        }
        
    },5000)
    },function(){
        Utils.toastButtom("请打开蓝牙", that.toastCtrl)
       
    }) 
      
  }

  end_work(){
    let that = this
    this.ble.isEnabled().then(function(){
        let loading = that.loading.create({  
      content: '签退中...'  ,
      enableBackdropDismiss: true
    }); 
    let isHas = false
    let is_ok = false
    let is_kaoqin_ok = false
    loading.present(); 
    let list = []
    that.ble.scan([], 5).subscribe(device => {
      console.log(device.name)
      isHas = false
      let company_name = ""
      console.log(that.device_list)
      for (let item_device of that.device_list) {
      
          if (device.name == item_device.device_name)
            {
              is_kaoqin_ok = true
              isHas = true
              company_name = item_device.company_name
              that.ble.stopScan()
              loading.dismiss()
              break;
            }         
      }
      if (isHas && !is_ok){
            let timestamp = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));;
            let timestamp_now = timestamp / 1000 - 8 * 60 * 60
            let date = new Date(timestamp_now * 1000)

            let timestamp_cal = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
            let timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60
            let date_cal = new Date(timestamp_cal_now * 1000)

            let data_obj = {
              "employee_id":that.user.user_id,
              "check_out":that.formatTime_odoo(date),
              "day_start":that.formatTime_day_start(new Date()),
              "day_end":that.formatTime_day_end(new Date()),
              "attendance_off": true,
              "company_name":company_name,
            }
            that.kaoqinService.employee_attendance(data_obj).then(res => {
                console.log(res)
                if (res.result.res_data && res.result.res_code == 1) {
                   that.fail_times = 0;
                   is_ok = true
                  // Utils.toastButtom("签退成功", that.toastCtrl)
                    let timestamp_cal = Date.parse(that.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
                    let timestamp_cal_now = timestamp_cal / 1000
                    let date_cal = new Date(timestamp_cal_now * 1000)
                    that.show_date_str = [that.formatO(date_cal.getHours()), that.formatO(date_cal.getMinutes())].join(':')

                    that.isShowOffAlert = true
                    let count = 0
                    that.items = res.result.res_data
                    if (that.items.length * 140 + 30 > 400){
                        that.change_divClass_height(that.items.length * 140 + 30)
                    }
                    for (let item of that.items) {
                      if(item.check_in){
                        count += 1
                      }
                      if(item.check_out){
                        count += 1
                      }
                    }
                    that.attendance_count = count
                }
            })
        }
        
    });
    
    let timer = self.setTimeout(function(){
        loading.dismiss()   
        that.ble.stopScan()
        if (!is_kaoqin_ok){
          that.fail_times = that.fail_times + 1
          if(that.fail_times >= 3)
          {
              that.showAlert("蓝牙考勤失败次数过多？")
          }
          else
          {
              Utils.toastButtom("不在考勤机范围内,请重试。", that.toastCtrl)
          }
        }
        
    },5000)
    },function(){
        Utils.toastButtom("请打开蓝牙", that.toastCtrl)
        // that.showAlert("蓝牙考勤失败次数过多？")
    }) 
      
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

  setTimeSchedule(currentObj){
    this.currentDay = currentObj.getDate()
    this.currentMonth = currentObj.getMonth()
    this.currentYear = currentObj.getFullYear()
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
          currentDayList[i] = date_obj
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

    this.kaoqinService.get_today_attendance(this.formatTime_day_start(date_before),this.formatTime_day_end(date_later),this.user.user_id).then(res => {
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

  delete_day(){
    var timestamp = Date.parse(this.datePipe.transform(this.currentDate_date, 'yyyy-MM-dd').replace(/-/g, '/'));
    var timestamp_now = timestamp / 1000 - 24 * 60 * 60
    var timestamp_later = timestamp / 1000
    var date = new Date(timestamp_now * 1000)
    this.currentDate_date = date
    this.currentDate_day = (date.getMonth() + 1) + "月" + date.getDate() + "日"
    this.get_day_data(date)
  }

  add_day(){
    var timestamp = Date.parse(this.datePipe.transform(this.currentDate_date, 'yyyy-MM-dd').replace(/-/g, '/'));
    var timestamp_now = timestamp / 1000 + 24 * 60 * 60
    var timestamp_later = timestamp / 1000
    var date = new Date(timestamp_now * 1000)
    this.currentDate_date = date
    this.currentDate_day = (date.getMonth() + 1) + "月" + date.getDate() + "日"
    this.get_day_data(date)
  }

  get_day_data(date){
    var timestamp = Date.parse(date);
    var timestamp_now = timestamp / 1000 - 24 * 60 * 60
    var date_later = new Date(timestamp_now * 1000)
    this.kaoqinService.get_employee_attendance(this.formatTime_day_start(date),this.formatTime_day_end(date),this.user.user_id).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.total_employees = res.result.res_data.total
        this.is_attendance = res.result.res_data.attendance_on
      }
    })
  }

  click_un_attendance(){
    this.navCtrl.push('KaoqinPeoplePage',{
      manager_id:this.user.user_id,
      type:"未打卡",
      current_date:this.currentDate_date,
    })
  }

  click_attendance(){
    this.navCtrl.push('KaoqinPeoplePage',{
      manager_id:this.user.user_id,
      type:"已打卡",
      current_date:this.currentDate_date,
    })
  }

  showAlert(msg){
    let prompt = this.alertCtrl.create({
      title: '提示',
      subTitle: msg,
      buttons: [
        {
          text: '取消',
          handler: data => {
            
          }
        },
        {
          text: '确定',
          handler: data => {
            this.navCtrl.push('KaoqinPhotoPage')
          }
        }
      ]
    });
    prompt.present();
  }

  clickCancel(){
    this.isShowOnAlert = false
    this.isShowOffAlert = false
  }
}
