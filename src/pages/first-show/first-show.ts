import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { Component ,ElementRef,ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the FirstShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-first-show',
  templateUrl: 'first-show.html',
  providers: [DatePipe]
})
export class FirstShowPage {
  currentDate_date ;//当前年月日
  currentDayList = []
  allDayList = []
  currentDay = 0;
  currentMonth = 0;
  currentYear = 0;
  items_day = []
  currentDate;
  currentDate_day;
  showIcon = true;//显示日历向下按钮
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe: DatePipe,
              private elementRef: ElementRef,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstShowPage');
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    this.currentDate = (this.currentDate_date.getMonth() + 1) + '月'
    this.currentDay = this.currentDate_date.getDate()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentYear = this.currentDate_date.getFullYear()
    console.log("currentDate_date="+this.currentDate_date+"  this.currentDate="+this.currentDate+"   this.currentDay="+this.currentDay
  +"    this.currentMonth="+this.currentMonth+"  this.currentYear="+this.currentYear)
    this.setSchedule(this.currentDate_date)
    if(this.showIcon){
      this.currentDayList = this.currentDayList.slice(0,7)
    }else{
      this.currentDayList = this.allDayList
    }
  }
  //控制按钮是否显示
  changeCalendar(){
    this.showIcon = false
    this.currentDayList = this.allDayList
  }

  panEvent($event) {
    if(!this.showIcon){
      console.log('y='+$event.deltaY)
      if($event.deltaY<-100){
        this.currentDayList=this.currentDayList.slice(0,7)
        this.showIcon=true
      }
    }
  }

  setSchedule(currentObj){
    
    let m = currentObj.getMonth() + 1
    let Y = currentObj.getFullYear()
    let d = currentObj.getDate();
    //当天日期
    let dayString = Y + '/' + m + '/' + d
    let currentDayNum = new Date(Y, m, 0).getDate()
    //当天是周几+1
    let currentDayWeek = currentObj.getUTCDay() + 1
    let result = currentDayWeek - (d % 7 - 1);
    let firstKey = result <= 0 ? 7 + result : result;
    let currentDayList = []
    //本月总共有几周
    var total_weeks = this.getWeeks(Y, m) 
    console.log("dayString="+dayString+"  currentDayNum="+currentDayNum+"   currentDayWeek="+currentDayWeek
  +"    result="+result+"  firstKey="+firstKey+"   total_weeks="+total_weeks)
    var f = 0
    for (var i = 0; i < total_weeks * 7; i++) {
      let data = []
      let date_obj = {
        y: Y,
        m: m,
        d: 0,
      }
      if (i < firstKey - 1) {
        if (date_obj.d == 0){
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
      this.allDayList = currentDayList
      // console.log("this.currentDayList = "+this.currentDayList)
    }
  }

  getWeeks(y, m) {
    let str = new Date(y + "/" + m + '/1');
    // 当前年份
    let year = str.getFullYear();
    //  获取月份第一天是周几  周日是0
    let day = str.getDay();
    console.log("day = "+day)
    // 获取当前月份的天数
    let days = new Date(year, m, 0).getDate();
    // 要减去开头的这几天
    let first = 0;
    day == 0 ? first = 1 : first = 8 - day;
    days = days - first;
    console.log("first="+first+"  day="+day+"  days="+days)
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
  }
}
