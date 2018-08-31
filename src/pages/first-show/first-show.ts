import { AppVersion } from '@ionic-native/app-version';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './first_service';
import { IonicPage, NavController, NavParams, MenuController ,Platform, Content} from 'ionic-angular';
import { Component, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FirService } from './../../app/FirService';
import { StatusBar } from '@ionic-native/status-bar';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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
  providers: [DatePipe, FirstShowService,FirService,NativePageTransitions]
})
export class FirstShowPage {
  @ViewChild(Content) content: Content;
  user_heard: string;
  currentWeek = 1;//当前第几周
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
  uid;
  itemList=[];//待办事项列表
  notSureList=[]//没有确定日期的待办事项
  lateList=[]//预期的待办事项
  dateNow = "今天"
  showLate = false//显示逾期
  lateNum = 0
  haveThing = []//有事件的list
  company:any;
  job:any;
  versionNumber :any ;
  version: any;
  name: string;
  need_fresh = false;
  subNum;//是否显示没有添加日程
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe: DatePipe,
              private firshowService: FirstShowService,public storage:Storage,public menuCtrl: MenuController,
              public platform :Platform,public appVersion:AppVersion,public firService: FirService,
              public statusBar:StatusBar,private nativePageTransitions: NativePageTransitions) {
              
        this.storage.get('user').then(res => {
        this.name = res.result.res_data.name;
        this.user_heard = res.result.res_data.user_ava;
        this.uid = res.result.res_data.user_id;
        this.getDayData(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
        this.get_backlog_identify(this.currentYear, this.currentMonth)
      })
  }
  ionViewDidEnter() {
    this.content.resize()
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh =this.navParams.get('need_fresh')
    if(this.need_fresh){
      this.getDayData(this.datePipe.transform((this.currentYear+'-'+this.currentMonth+'-'+this.currentDay), 'yyyy-MM-dd'))
      this.get_backlog_identify(this.currentYear, this.currentMonth)
    }
  }
  //获取某一天的数据
  getDayData(date){
    let body = {
      'uid': this.uid,
      'date': date
    }
    this.firshowService.get_schedule_list(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.subNum = res.result.res_data.subNum
        this.itemList = res.result.res_data.wait
        this.notSureList = res.result.res_data.notSure
        this.lateList = res.result.res_data.late
        if(this.dateNow=='今天' && res.result.res_data.num!=0){
          this.showLate = true
          this.lateNum = res.result.res_data.num
        }else{
          this.showLate = false
        }
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstShowPage');
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.currentDate_date = new Date(Y + "/" + m + "/" + d)
    //日
    this.currentDay = this.currentDate_date.getDate()
    //月
    this.currentMonth = this.currentDate_date.getMonth() + 1
    //年
    this.currentYear = this.currentDate_date.getFullYear()
    //月
    this.currentDate = this.currentDate_date.getFullYear()+'年'+(this.currentDate_date.getMonth() + 1) + '月'
  //   console.log("currentDate_date="+this.currentDate_date+"  this.currentDate="+this.currentDate+"   this.currentDay="+this.currentDay
  // +"    this.currentMonth="+this.currentMonth+"  this.currentYear="+this.currentYear)
    this.setSchedule(this.currentDate_date)
    for(var i=0;i<this.currentDayList.length;i++){
      if(this.currentDayList[i].d==this.currentDay && this.currentDayList[i].m==this.currentMonth){
        console.log("i="+i+"  currentWeek = "+Math.ceil((i+1)/7))
       this.currentWeek = Math.ceil((i+1)/7)
       break
      }
    }
    if(this.showIcon){
      this.currentDayList = this.currentDayList.slice((this.currentWeek-1)*7,this.currentWeek*7)
    }else{
      this.currentDayList = this.allDayList
    }
  }
  //控制按钮是否显示
  changeCalendar(){
    this.showIcon = false
    if(this.haveThing.length!=0){
      for(var j=0;j<this.allDayList.length;j++){
        for(var a=0;a<this.haveThing.length;a++){
          if (this.haveThing[a]
          ==this.allDayList[j].y+'-'+this.allDayList[j].m+'-'+this.allDayList[j].d){
            this.allDayList[j].s = true
            break
          }
        }
      }
    }
    this.currentDayList = this.allDayList
  }

  
  //滑动事件
  panEvent($event) {
    console.log('y='+$event.deltaY+" dirrection = "+$event.direction+ ' isFirst = '+$event.isFirst
        +' isFinal ='+$event.isFinal+' deltaTime = '+$event.deltaTime+' x = '+$event.center.x+' y = '+$event.center.y
      +' distance = '+$event.distance+' overallVelocity = '+$event.overallVelocity+ ' overallVelocityY = '+$event.overallVelocityY
    +' velocityY = '+$event.velocityY+' velocity = '+$event.velocity)
    if($event.center.y!=0){
      return
    }
    if(!this.showIcon){
      if($event.velocity<=0){
        this.showIcon=true
        for(var i=0;i<this.currentDayList.length;i++){
          if(this.currentDayList[i].d==this.currentDay){
           this.currentWeek = Math.ceil((i+1)/7)
          }
        }
        this.currentDayList=this.currentDayList.slice((this.currentWeek-1)*7,this.currentWeek*7)
      }
    }else{
      if($event.velocity>0){
        this.showIcon = false
        if(this.haveThing.length!=0){
          for(var j=0;j<this.allDayList.length;j++){
            for(var a=0;a<this.haveThing.length;a++){
              if (this.haveThing[a]==this.allDayList[j].y+'-'+this.allDayList[j].m+'-'+this.allDayList[j].d){
                this.allDayList[j].s = true
                break
              }
            }
          }
        }
          this.currentDayList = this.allDayList
      }
    }
  }


  setSchedule(currentObj){
    
    let m = currentObj.getMonth() + 1
    let Y = currentObj.getFullYear()
    let d = currentObj.getDate();
    //获取上一个月有多少天
    let days = new Date(Y, m-1, 0).getDate();
    //当天日期
    // let dayString = Y + '/' + m + '/' + d
    let currentDayNum = new Date(Y, m, 0).getDate()
    //当天是周几+1
    let currentDayWeek = currentObj.getUTCDay() + 1
    let result = currentDayWeek - (d % 7 - 1);
    let firstKey = result <= 0 ? 7 + result : result;
    let currentDayList = []
    //本月总共有几周
    var total_weeks = this.getWeeks(Y, m) 
    console.log("currentDayNum="+currentDayNum+"   currentDayWeek="+currentDayWeek
  +"    result="+result+"  firstKey="+firstKey+"   total_weeks="+total_weeks)
    var f = 0
    var num = 1//用来显示多出来的下个月的几个日期
    var snum = days-firstKey+2//用来显示多出来的上个月的几个日期
    for (var i = 0; i < total_weeks * 7; i++) {
      let date_obj = {
        y: Y,
        m: m,
        d: 0,
        s: false
      }
      if (i < firstKey - 1) {
        if (date_obj.d == 0){
          currentDayList[i] = {
             y: Y,
             m: m-1,
             d: snum,
             s: false
          }
        }  
        snum = snum+1 
      } else {
        if (f < currentDayNum) {
          date_obj.d = f + 1
          currentDayList[i] = date_obj
          f = currentDayList[i].d
        } else if (f >= currentDayNum) {
          currentDayList[i] = {
             y: Y,
             m: m+1,
             d: num,
             s: false
          }
          num = num + 1
        }
      }
      this.currentDayList = currentDayList
      this.allDayList = currentDayList
    }
  }

  getWeeks(y, m) {
    let str = new Date(y + "/" + m + '/1');
    // 当前年份
    let year = str.getFullYear();
    //  获取月份第一天是周几  周日是0
    let day = str.getDay();
    // console.log("day = "+day)
    // 获取当前月份的天数
    let days = new Date(year, m, 0).getDate();
    // 要减去开头的这几天
    let first = 0;
    day == 0 ? first = 1 : first = 8 - day;
    days = days - first;
    // console.log("first="+first+"  day="+day+"  days="+days)
    return 1 + Math.ceil(days / 7);
  }

  choose_day(date){
    if (date.m <= 0) {
      date.y = date.y - 1
      date.m = 12
    } else if (date.m > 12) {
      date.y = date.y + 1
        date.m = 1
      } 
    var choose_date = date.y + "-" + date.m + "-" + date.d
    let isQuest = false
    if(date.m>this.currentMonth){
      this.add_month()
    }else if(date.m<this.currentMonth){
      this.delete_month()
    }else{
      isQuest = true
    }
    this.currentDate_date =  new Date(date.y + '/' + date.m + '/' + date.d)
    this.currentYear = date.y
    this.currentMonth = date.m
    this.currentDay = date.d
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    //日
    var da = new Date(Y + "/" + m + "/" + d).getDate()
    //月
    var mon = new Date(Y + "/" + m + "/" + d).getMonth() + 1
    //年
    var year = new Date(Y + "/" + m + "/" + d).getFullYear()
    // console.log("choose_date="+choose_date+"   day = "+year+"/"+mon+"/"+da+"  vo.s="+date.s)
    if(choose_date==(year+"-"+mon+"-"+da)){
      this.dateNow = "今天"
    }else{
      this.dateNow = date.m+'月'+date.d+'日'
    }
    if(isQuest){
      this.getDayData(choose_date)
    }

    this.items_day = []
    this.currentDay = date.d
    this.currentMonth = date.m
    this.currentYear = date.y
  }

  add_month(){
    this.showIcon = false
    var Y = this.currentDate_date.getFullYear();
    var m = this.currentDate_date.getMonth() + 1;
    var d = this.currentDate_date.getDate();
    let str = ''
    // console.log(m)
      m = m + 1
      // console.log(m)
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
    this.currentYear = this.currentDate_date.getFullYear()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentDate = this.currentDate_date.getFullYear()+"年"+(this.currentDate_date.getMonth() + 1) + '月'  
    this.dateNow = (this.currentDate_date.getMonth() + 1) + '月'+this.currentDate_date.getDate()+'日'
    this.getDayData(this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(Y, m)
  }

  delete_month(){
    this.showIcon = false
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
    this.currentYear = this.currentDate_date.getFullYear()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentDate = this.currentDate_date.getFullYear()+"年"+(this.currentDate_date.getMonth() + 1) + '月'
    this.dateNow = (this.currentDate_date.getMonth() + 1) + '月'+this.currentDate_date.getDate()+'日'
    this.getDayData(this.currentDate_date.getFullYear()+'-'+(this.currentDate_date.getMonth() + 1)+'-'+this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(Y, m)
  }

  delete_day(){
    var timestamp = Date.parse(this.datePipe.transform(this.currentDate_date, 'yyyy-MM-dd').replace(/-/g, '/'));
    var timestamp_now = timestamp / 1000 - 24 * 60 * 60
    var date = new Date(timestamp_now * 1000)
    this.currentDate_date = date
    this.currentDate_day = (date.getMonth() + 1) + "月" + date.getDate() + "日"
    this.get_day_data(date)
  }

  add_day(){
    var timestamp = Date.parse(this.datePipe.transform(this.currentDate_date, 'yyyy-MM-dd').replace(/-/g, '/'));
    var timestamp_now = timestamp / 1000 + 24 * 60 * 60
    var date = new Date(timestamp_now * 1000)
    this.currentDate_date = date
    this.currentDate_day = (date.getMonth() + 1) + "月" + date.getDate() + "日"
    this.get_day_data(date)
  }

  get_day_data(date){
    // var timestamp = Date.parse(date);
    // var timestamp_now = timestamp / 1000 - 24 * 60 * 60
    // var date_later = new Date(timestamp_now * 1000)
  }

  gotoDeatil(item){
    if(item.res_model_s=='rt.performance.appraisal.detail' && item.res_id!=false){
      let body = {
        'res_model_s': 'rt.performance.appraisal.detail',
        'uid': this.uid,
        'id': item.res_id
      }
      this.firshowService.get_res_model(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.navCtrl.push('PerformanceStartPage',{
            'item': res.result.res_data
          })
        }
      })
    }else{
      this.navCtrl.push('CalendarDeatilpagePage',{
        'item': item,
        'isEdit': false
      })
    }
  }

  latePage(){
    this.navCtrl.push('LateListPage')
  }

  //获取有事件的日期
  get_backlog_identify(year, month){
    let body = {
      'uid': this.uid,
      'year': year,
      'month': month
    }
    this.firshowService.get_backlog_identify(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        let list = []
        list = res.result.res_data
        this.haveThing = []
        for(var i=0;i<list.length;i++){
          this.haveThing[i] = this.datePipe.transform(list[i], 'yyyy-M-d')
        }
        if(this.haveThing.length!=0){
          for(var j=0;j<this.currentDayList.length;j++){
            this.currentDayList[j].s = false
            for(var a=0;a<this.haveThing.length;a++){
              // console.log("this.currentDayList.length = "+j+"a = "+a)
              if (this.haveThing[a]
              ==this.currentDayList[j].y+'-'+this.currentDayList[j].m+'-'+this.currentDayList[j].d){
                this.currentDayList[j].s = true
              }
            }
          }
        }
      }
    })
  }


  //创建新代办
  createWait(){
    this.navCtrl.push('CalendarDeatilpagePage', {
        'isEdit': true,
        'date': this.currentDate_date
    })
  }
//跳转到我的页面
  mePage(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 300,
    iosdelay: 100,
    androiddelay: 150,
    fixedPixelsTop: 0,
    fixedPixelsBottom: 60
     };
     this.nativePageTransitions.slide(options);
    this.navCtrl.push('MePage', {
      'from': true
    })
  }
}
