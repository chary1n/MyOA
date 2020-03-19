import { Storage } from '@ionic/storage';
import { FirstShowService } from './first_service';
import { IonicPage, NavController, NavParams, FabContainer, MenuController, Events, AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';
import { AppService } from '../../app/appService'
import { HttpService } from '../../providers/HttpService'
import { Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeService } from './../../providers/NativeService';
import { FirService } from './../../app/FirService';
import { FirstShowAutoService } from './firstAutoService';

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
  providers: [DatePipe, FirstShowService, AppService, NativeService, FirService, FirstShowAutoService]
})
export class FirstShowPage {
  @ViewChild('fab') fab: FabContainer;
  isDay = true
  isShen = false
  isMessage = false
  user_heard: string;
  currentWeek = 1;//当前第几周
  currentDate_date;//当前年月日
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
  itemList = [];//待办事项列表
  notSureList = []//没有确定日期的待办事项
  lateList = []//预期的待办事项
  dateNow = "今天"
  showLate = false//显示逾期
  lateNum = 0
  haveThing = []//有事件的list
  need_fresh = false;
  subNum;//是否显示没有添加日程
  recoup_num//补卡销卡数目
  vacation_num//休假单数目
  bx_num//报销
  sg_num//申购
  yf_num//预付
  jk_num//借款
  caigou_num = 0//采购
  sch_num = 0
  tousu_num = 0
  pay_num = 0 //付款
  pandian_num = 0 //盘点
  gongcheng_num = 0 //工程
  salary_approval_num = 0 //核薪单
  salary_adjust_approval_num = 0 // 调薪单
  dimission_num = 0 // 离职单待审核
  offer_num = 0 //审核offer
  intp_num = 0
  adjust_num = 0
  purchase_account_num = 0
  salary_allowance_count = 0
  salary_allowance_jx_count = 0
  salary_subsidy_count = 0

  isShowApprovalPoint = false
  all_approval = 0//审批总和
  show_approve
  type_id;//会议的类型
  event_list
  isShowBac = false
  un_read_list = []
  need_calendar
  me_type = []
  state_type = ''
  event_type_id = []
  event_type = []
  head_type = 'date'
  late_arr = []

  isShowCK = false //仓库权限

  limit = 20
  offset = 0
  isMoreData = true

  version: any;

  total_allowance_jj = 0

  message_reply_arr = []

  search_type
  search_text
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe,
    private firshowService: FirstShowService, public storage: Storage,
    public statusBar: StatusBar, public menu: MenuController, public event: Events,
    public appService: AppService, public platform: Platform, public inAppBrowser: InAppBrowser,
    public ctrl: AlertController, public appVersion: AppVersion, public nativeService: NativeService,
    public firService: FirService, public firstShowAutoService: FirstShowAutoService) {
    this.storage.get('user').then(res => {
      this.user_heard = res.result.res_data.user_ava;
      this.uid = res.result.res_data.user_id;
      for (let product of res.result.res_data.groups) {
        if (product.name == 'group_stock_manager') {
          this.isShowCK = true;
        }
      }
      if (HttpService.need_login) {
        this.toAutoLogin()
      }
      else {
        this.get_backlog_identify(this.currentYear, this.currentMonth)
        // this.get_approval_num()
        this.getType()
        this.storage.get('user_schedule_domain_new').then(res => {
          // console.log(res)
          if (res) {
            this.me_type = res.me_type
            this.state_type = res.state_type
            this.event_type_id = res.event_type_id
          }
          else {
            this.me_type = []
            this.state_type = 'all'
            this.event_type_id = []
          }
          // this.getDayData(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
        })
      }


    })
  }
  showback() {
    if (this.isShowBac) {
      this.isShowBac = false
    } else {
      this.isShowBac = true
      setTimeout(() => {
        var bac_div = document.getElementById('bac_div')
        var scroll_content
        for (var i = 0; i < document.getElementsByClassName('scroll-content').length; i++) {
          if (document.getElementsByClassName('scroll-content')[i]['outerText'][0] == '全') {
            scroll_content = document.getElementsByClassName('scroll-content')[i]
          }
        }
        bac_div.style.height = scroll_content.scrollHeight + "px"
      }, 1)

    }
  }
  //获取所有的待办类型
  getType() {
    console.log(HttpService.need_login)
    let body = {
      'uid': this.uid
    }
    this.firshowService.get_event_type(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        var temp_arr = []
        temp_arr.push({
          'display_name': '赞',
          'id': ''
        })
        temp_arr.push({
          'display_name': '日报',
          'id': ''
        })
        res.result.res_data.forEach(item => {
          if (item.display_name != '项目') {
            temp_arr.push(item)
          }
        });
        this.event_list = temp_arr
      }
    })
  }

  ionViewWillLeave() {
    // this.menu.enable(false)
    var bar = document.getElementsByClassName('tabbar').item(0);
    bar['style'].display = 'none';
    this.event.unsubscribe('search_domain_first')
  }

  ionViewWillEnter() {
    var tolbar = document.getElementsByClassName('tabbar').item(0);
    tolbar['style'].display = 'flex';
    this.menu.enable(true, 'menu5')

    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();

    if (this.platform.is("android")) {
      this.getVersionNumber();
    } else if (this.platform.is('ios')) {
      this.getiOSVersionNumber();
    }


  }


  //获取某一天的数据
  getDayData(date) {
    this.isMoreData = true
    let body = {
      'uid': this.uid,
      'date': date
    }
    let domain = {
      'me_type': this.me_type,
      'state_type': this.state_type,
      'event_type_id': this.event_type_id,
      'limit': this.limit,
      'offset': this.offset,
    }

    this.firshowService.get_schedule_list_with_domain_new(body, domain).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.isMoreData = true
        this.subNum = res.result.res_data.subNum
        this.itemList = res.result.res_data.wait
        this.notSureList = res.result.res_data.notSure
        this.lateList = res.result.res_data.late
        this.type_id = res.result.res_data.type_id
        if (this.dateNow == '今天' && res.result.res_data.num != 0) {
          this.showLate = true
          this.lateNum = res.result.res_data.num
        } else {
          this.showLate = false
        }
      }
    })
  }

  ionViewDidEnter() {
    var tolbar = document.getElementsByClassName('tabbar').item(0);
    tolbar['style'].display = 'flex';
    this.event.subscribe('search_domain_first', (data) => {
      console.log(data)
      this.me_type = data.me_type
      this.state_type = data.state_type
      this.event_type_id = data.event_type_id
      this.event_type = data.event_type
      this.storage.set('user_schedule_domain_new', {
        'me_type': this.me_type,
        'state_type': this.state_type,
        'event_type_id': this.event_type_id,
      })
      this.offset = 0
      this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())

    })
    if (HttpService.need_login) {
      this.storage.get('user')
        .then(res => {
          if (res) {
            this.uid = res.result.res_data.user_id;
            window.localStorage.setItem("id", res.result.res_data.user_id)
            this.storage.get('user_psd').then(res_db => {
              this.storage.get("loginIndex").then(res_index => {
                this.defultChoose(res_index)

                let db_name = res_db.db_name
                this.appService.toLogin(res_db.user_email, res_db.user_psd, res_db.db_name, "0.8.0")
                  .then(res => {
                    if (res.result && res.result.res_code == 1) {
                      HttpService.user_id = res.result.res_data.user_id;
                      HttpService.user = res.result.res_data;
                      HttpService.need_login = false;
                      this.head_type = 'date'
                      this.un_read_list = []
                      this.storage.get('user').then(res => {
                        this.uid = res.result.res_data.user_id
                        this.get_approval_num()
                        this.getAllMessageReply()
                        // this.firshowService.get_un_read_reply({ 'uid': this.uid }).then(res => {
                        //   if (res.result.res_data && res.result.res_code == 1) {
                        //     this.un_read_list = res.result.res_data.read_data
                        //     this.need_calendar = res.result.res_data.need_calendar
                        //   }
                        // })

                        if (this.isDay) {
                          this.storage.get('user_schedule_domain_new').then(res => {
                            console.log(res)
                            if (res) {
                              this.me_type = res.me_type
                              this.state_type = res.state_type
                              this.event_type_id = res.event_type_id
                            }
                            else {
                              this.me_type = []
                              this.state_type = 'all'
                              this.event_type_id = []
                            }
                            this.offset = 0
                            this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())
                          })

                          this.get_backlog_identify(this.currentYear, this.currentMonth)
                        }

                      })
                    }
                    else {
                    }
                  }).catch((error) => {
                  })
              })
            })
          }
        })
    }
    else {
      this.head_type = 'date'
      this.un_read_list = []
      this.storage.get('user').then(res => {
        this.uid = res.result.res_data.user_id
        this.get_approval_num()
        this.getAllMessageReply()
        // this.firshowService.get_un_read_reply({ 'uid': this.uid }).then(res => {
        //   if (res.result.res_data && res.result.res_code == 1) {
        //     this.un_read_list = res.result.res_data.read_data
        //     this.need_calendar = res.result.res_data.need_calendar
        //   }
        // })

        if (this.isDay) {
          this.storage.get('user_schedule_domain_new').then(res => {
            console.log(res)
            if (res) {
              this.me_type = res.me_type
              this.state_type = res.state_type
              this.event_type_id = res.event_type_id
            }
            else {
              this.me_type = []
              this.state_type = 'all'
              this.event_type_id = []
            }
            this.offset = 0
            this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())
          })

          this.get_backlog_identify(this.currentYear, this.currentMonth)
        }

      })
    }
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
    this.currentDate = this.currentDate_date.getFullYear() + '年' + (this.currentDate_date.getMonth() + 1) + '月'
    //   console.log("currentDate_date="+this.currentDate_date+"  this.currentDate="+this.currentDate+"   this.currentDay="+this.currentDay
    // +"    this.currentMonth="+this.currentMonth+"  this.currentYear="+this.currentYear)
    this.setSchedule(this.currentDate_date)
    for (var i = 0; i < this.currentDayList.length; i++) {
      if (this.currentDayList[i].d == this.currentDay && this.currentDayList[i].m == this.currentMonth) {
        this.currentWeek = Math.ceil((i + 1) / 7)
        break
      }
    }
    if (this.showIcon) {
      this.currentDayList = this.currentDayList.slice((this.currentWeek - 1) * 7, this.currentWeek * 7)
    } else {
      this.currentDayList = this.allDayList
    }
  }

  //控制按钮是否显示
  changeCalendar() {
    this.showIcon = false
    if (this.haveThing.length != 0) {
      for (var j = 0; j < this.allDayList.length; j++) {
        for (var a = 0; a < this.haveThing.length; a++) {
          if (this.haveThing[a]
            == this.allDayList[j].y + '-' + this.allDayList[j].m + '-' + this.allDayList[j].d) {
            this.allDayList[j].s = true
            break
          }
        }
      }
    }
    this.currentDayList = this.allDayList
  }

  changeCalendarAll() {
    this.showIcon = true
    for (var i = 0; i < this.currentDayList.length; i++) {
      if (this.currentDayList[i].d == this.currentDay) {
        this.currentWeek = Math.ceil((i + 1) / 7)
      }
    }
    this.currentDayList = this.currentDayList.slice((this.currentWeek - 1) * 7, this.currentWeek * 7)
  }

  //考勤
  kaoqin() {
    this.navCtrl.push('KaoqinPage')
  }

  setSchedule(currentObj) {

    let m = currentObj.getMonth() + 1
    let Y = currentObj.getFullYear()
    let d = currentObj.getDate();
    //获取上一个月有多少天
    let days = new Date(Y, m - 1, 0).getDate();
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
    //   console.log("currentDayNum="+currentDayNum+"   currentDayWeek="+currentDayWeek
    // +"    result="+result+"  firstKey="+firstKey+"   total_weeks="+total_weeks)
    var f = 0
    var num = 1//用来显示多出来的下个月的几个日期
    var snum = days - firstKey + 2//用来显示多出来的上个月的几个日期
    for (var i = 0; i < total_weeks * 7; i++) {
      let date_obj = {
        y: Y,
        m: m,
        d: 0,
        s: false
      }
      if (i < firstKey - 1) {
        if (date_obj.d == 0) {
          currentDayList[i] = {
            y: Y,
            m: m - 1,
            d: snum,
            s: false
          }
        }
        snum = snum + 1
      } else {
        if (f < currentDayNum) {
          date_obj.d = f + 1
          currentDayList[i] = date_obj
          f = currentDayList[i].d
        } else if (f >= currentDayNum) {
          currentDayList[i] = {
            y: Y,
            m: m + 1,
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

  choose_day(date) {
    this.head_type = 'date'
    if (date.m <= 0) {
      date.y = date.y - 1
      date.m = 12
    } else if (date.m > 12) {
      date.y = date.y + 1
      date.m = 1
    }
    var choose_date = date.y + "-" + date.m + "-" + date.d
    let isQuest = false
    if (date.m > this.currentMonth) {
      this.showIcon = false
      let str = ''
      if (date.m <= 12) {
        str = date.y + '/' + date.m + '/' + date.d
      } else {
        date.y = date.y + 1
        date.m = 1
        str = date.y + '/' + 1 + '/' + date.d
      }
      this.currentDate_date = new Date(str)
      this.currentDate = this.currentDate_date.getFullYear() + "年" + (this.currentDate_date.getMonth() + 1) + '月'
      this.offset = 0
      this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())
      this.setSchedule(new Date(str))
      this.get_backlog_identify(date.y, date.m)
    } else if (date.m < this.currentMonth) {
      this.showIcon = false
      let str = ''
      if (date.m <= 0) {
        date.y = date.y - 1
        date.m = 12
        str = date.y + '/' + 12 + '/' + date.d
      } else {
        str = date.y + '/' + date.m + '/' + date.d
      }
      this.currentDate_date = new Date(str)
      this.currentDate = this.currentDate_date.getFullYear() + "年" + (this.currentDate_date.getMonth() + 1) + '月'
      this.offset = 0
      this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())
      this.setSchedule(new Date(str))
      this.get_backlog_identify(date.y, date.m)
    } else {
      isQuest = true
    }
    this.currentDate_date = new Date(date.y + '/' + date.m + '/' + date.d)
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
    if (choose_date == (year + "-" + mon + "-" + da)) {
      this.dateNow = "今天"
    } else {
      this.dateNow = date.m + '月' + date.d + '日'
    }
    if (isQuest) {
      this.offset = 0
      this.getDayData(choose_date)
    }

    this.items_day = []
    this.currentDay = date.d
    this.currentMonth = date.m
    this.currentYear = date.y
  }

  add_month() {
    this.showIcon = false
    var Y = this.currentDate_date.getFullYear();
    var m = this.currentDate_date.getMonth() + 1;
    var d = this.currentDate_date.getDate();
    //获取下一个月有多少天
    let days = new Date(Y, m + 1, 0).getDate();
    if (d > days) {
      d = days
    }
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

    this.currentDate_date = new Date(str)
    this.currentYear = this.currentDate_date.getFullYear()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentDate = this.currentYear + "年" + this.currentMonth + '月'
    if ((this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate()) == this.getNowDay()) {
      this.dateNow = '今天'
    } else {
      this.dateNow = this.dateNow = (this.currentDate_date.getMonth() + 1) + '月' + this.currentDate_date.getDate() + '日'
    }
    this.offset = 0
    this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(Y, m)
  }

  getNowDay() {
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    //日
    var da = new Date(Y + "/" + m + "/" + d).getDate()
    //月
    var mon = new Date(Y + "/" + m + "/" + d).getMonth() + 1
    //年
    var year = new Date(Y + "/" + m + "/" + d).getFullYear()
    return year + "-" + mon + "-" + da
  }

  delete_month() {
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
    this.currentDate_date = new Date(str)
    // console.log(this.currentDate_date)
    this.currentYear = this.currentDate_date.getFullYear()
    this.currentMonth = this.currentDate_date.getMonth() + 1
    this.currentDate = this.currentDate_date.getFullYear() + "年" + (this.currentDate_date.getMonth() + 1) + '月'
    if ((this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate()) == this.getNowDay()) {
      this.dateNow = '今天'
    } else {
      this.dateNow = this.dateNow = (this.currentDate_date.getMonth() + 1) + '月' + this.currentDate_date.getDate() + '日'
    }
    this.offset = 0
    this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate())
    this.setSchedule(new Date(str))
    this.get_backlog_identify(Y, m)
  }


  gotoDeatil(item) {
    if (item.type_name == '项目') {
      // this.firshowService.get_event_detail({
      //   'uid': this.uid,
      //   'event_id': item.id
      // }).then(res => {
      //   if (res.result.res_data && res.result.res_code == 1) {
      //     item = res.result.res_data
      //     this.navCtrl.push('MeetingProjectPage', {
      //       'meeting_id': item.rt_meeeting_s_id,
      //       'isEdit': false,
      //       'uid': this.uid,
      //       'frontPage': 'FirstShowPage'
      //     })
      //   }
      // })
      this.navCtrl.push('MeetingProjectPage', {
        'item_id': item.id,
        'isEdit': false,
        'uid': this.uid,
        'frontPage': 'FirstShowPage'
      })
    }
    else {
      if (item.res_model_s == 'rt.performance.appraisal.detail' && item.res_id != false) {
        let body = {
          'res_model_s': 'rt.performance.appraisal.detail',
          'uid': this.uid,
          'id': item.res_id
        }
        this.firshowService.get_res_model(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.navCtrl.push('PerformanceStartPage', {
              'item': res.result.res_data
            })
          }
        })
      } else {
        if (this.type_id == item.type_id && item.is_meeting_sch == false) {
          this.navCtrl.push('MeetingPage', {
            'item_id': item.id,
            'isEdit': false,
            'uid': this.uid,
            'frontPage': 'FirstShowPage'
          })
        } else {
          this.navCtrl.push('CalendarDeatilpagePage', {
            'item_id': item.id,
            'isEdit': false,
            'frontPage': 'FirstShowPage'
          })
        }
      }
    }
  }

  latePage() {
    // this.navCtrl.push('LateListPage',{
    //   'me_type': this.me_type,
    //   'event_type_id': this.event_type_id
    // })
    this.late_arr = []
    let body = {
      'uid': this.uid,
      'me_type': this.me_type,
      'event_type_id': this.event_type_id,
    }
    this.firshowService.get_late_list(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.late_arr = res.result.res_data.late
      }
    })

    this.head_type = 'late'
  }

  //获取有事件的日期
  get_backlog_identify(year, month) {
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
        for (var i = 0; i < list.length; i++) {
          this.haveThing[i] = this.datePipe.transform(new Date(list[i]), 'yyyy-M-d')
        }
        if (this.haveThing.length != 0) {
          for (var j = 0; j < this.currentDayList.length; j++) {
            this.currentDayList[j].s = false
            for (var a = 0; a < this.haveThing.length; a++) {
              // console.log("this.currentDayList.length = "+j+"a = "+a)
              if (this.haveThing[a]
                == this.currentDayList[j].y + '-' + this.currentDayList[j].m + '-' + this.currentDayList[j].d) {
                this.currentDayList[j].s = true
              }
            }
          }
        }
      }
    })
  }

  // createMetting(fab: FabContainer){
  //   fab.close();
  //   this.navCtrl.push('MeetingPage', {
  //     'isEdit': true,
  //     'date': this.currentDate_date
  // })
  // }
  //创建新代办
  createWait(item, fab: FabContainer) {
    fab.close();
    this.isShowBac = false
    if (item.display_name == '项目') {
      this.navCtrl.push('MeetingProjectPage', {
        'isEdit': true,
        'date': this.currentDate_date,
        'frontPage': 'FirstShowPage',
        'create_new': true,
      })
    }
    else if (item.display_name == '任务' || item.display_name == '会议' || item.display_name == '日程' || item.display_name == '出差') {
      if (this.type_id == item.id) {
        this.navCtrl.push('MeetingPage', {
          'isEdit': true,
          'date': this.currentDate_date,
          'frontPage': 'FirstShowPage'
        })
      } else {
        this.navCtrl.push('CalendarDeatilpagePage', {
          'isEdit': true,
          'date': this.currentDate_date,
          'type_id': item.id,
          'type_name': item.display_name,
          'frontPage': 'FirstShowPage'
        })
      }
    }
    else if (item.display_name == '赞') {
      // this.navCtrl.push('RedWhiteCardPage')
      this.navCtrl.push('RedWhiteCardCreatePage', {
        'user_id': this.uid,
      })
    }
    else if (item.display_name == '日报') {
      // this.navCtrl.push('DailyReportPage')
      this.navCtrl.push('CreateDailyReportPage', {
        'report_type': 'day_daily',
        'user_id': this.uid
      })
    }
  }
  //跳转到我的页面
  // mePage(){
  //   let options: NativeTransitionOptions = {
  //     direction: 'right',
  //     duration: 300,
  //     iosdelay: 100,
  //     androiddelay: 150,
  //     fixedPixelsTop: 0,
  //     fixedPixelsBottom: 60
  //    };
  //    this.nativePageTransitions.slide(options);
  //   this.navCtrl.push('MePage', {
  //     'from': true
  //   })
  // }
  daything() {
    this.isDay = true
    this.isMessage = false
    this.isShen = false
  }

  consider() {
    this.isDay = false
    this.isMessage = false
    this.isShen = true
    this.get_approval_num()
  }

  message() {
    this.isDay = false
    this.isMessage = true
    this.isShen = false
  }

  toVacation() {
    this.navCtrl.push('VacationApprovalPage')
  }

  toBuka() {
    this.navCtrl.push('AttendaceRecoupPage')
  }

  //获取审批的数目
  get_approval_num() {
    let body = {
      'uid': this.uid
    }
    this.firshowService.get_approval_num(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.recoup_num = res.result.res_data.recoup_num
        this.vacation_num = res.result.res_data.vacation_num
        this.bx_num = res.result.res_data.bx_num
        this.sg_num = res.result.res_data.sg_num
        this.jk_num = res.result.res_data.jk_num
        this.yf_num = res.result.res_data.yf_num
        this.caigou_num = res.result.res_data.caigou_num
        this.sch_num = res.result.res_data.sch_num
        this.tousu_num = res.result.res_data.tousu_num
        this.pay_num = res.result.res_data.pay_num
        this.pandian_num = res.result.res_data.pandian_num
        this.gongcheng_num = res.result.res_data.gongcheng_num
        this.salary_approval_num = res.result.res_data.salary_approval_num
        this.salary_adjust_approval_num = res.result.res_data.salary_adjust_approval_num
        this.dimission_num = res.result.res_data.dimission_num
        this.offer_num = res.result.res_data.offer_num
        this.intp_num = res.result.res_data.intp_num
        this.adjust_num = res.result.res_data.adjust_num
        this.purchase_account_num = res.result.res_data.purchase_account_num
        this.salary_allowance_count = res.result.res_data.salary_allowance_count
        this.salary_subsidy_count = res.result.res_data.salary_subsidy_count
        this.salary_allowance_jx_count = res.result.res_data.salary_allowance_jx_count
        this.total_allowance_jj = res.result.res_data.total_allowance_jj
        this.all_approval = this.total_allowance_jj + this.salary_allowance_jx_count + this.salary_allowance_count + this.salary_subsidy_count + this.recoup_num + this.vacation_num + this.jk_num + this.bx_num + this.yf_num + this.sg_num + this.caigou_num + this.tousu_num + this.pay_num + this.gongcheng_num + this.salary_approval_num + this.salary_adjust_approval_num + this.dimission_num + this.offer_num + this.adjust_num + this.intp_num + this.purchase_account_num
        if (this.isShowCK) {
          this.all_approval += this.pandian_num
        }
        if (this.all_approval != 0) {
          this.isShowApprovalPoint = true
        } else {
          this.isShowApprovalPoint = false
        }
        if (this.all_approval > 99) {
          this.show_approve = "99+"
        }
        else {
          this.show_approve = this.all_approval
        }
      }
    })
  }

  toAll() {
    // this.navCtrl.push('AllSchedulePage')
    this.navCtrl.push('ChooseMenuPage')

  }

  closeFab() {
    this.isShowBac = false
    this.fab.close()
  }

  click_un_read_reply() {
    // console.log(this.un_read_list)
    this.navCtrl.push('UnreadReplyPage', {
      item: this.un_read_list
    })
  }

  toBX() {
    this.navCtrl.push('NewReimbursementPage')
  }

  toYF() {
    this.navCtrl.push('NewZanzhiPage', {
      zz_type: 'advance'
    })
  }

  toJK() {
    this.navCtrl.push('NewZanzhiPage', {
      zz_type: 'temp'
    })
  }

  toSG() {
    this.navCtrl.push('NewShengouPage')
  }

  showMenu() {
    setTimeout(() => {
      var menu = this.menu.get('menu5')
      menu.enable(true)
      menu.toggle()
    }, 10);

  }

  toCG() {
    this.navCtrl.push('NewPurchaseOrderPage')
  }

  click_head_date() {
    this.head_type = 'date'
  }

  click_head_wait() {
    this.head_type = 'wait'
  }

  toDetail_Late(sub) {
    if (sub.type_name == '项目') {
      this.navCtrl.push('MeetingProjectPage', {
        'item_id': sub.id,
        'isEdit': false,
        'uid': this.uid,
        'frontPage': 'AllSchedulePage'
      })
    }
    else {
      if (sub.type_name == '会议') {
        this.navCtrl.push('MeetingPage', {
          'item_id': sub.id,
          'isEdit': false,
          'uid': this.uid,
          'frontPage': 'AllSchedulePage',
        })
      } else {
        this.navCtrl.push('CalendarDeatilpagePage', {
          'item_id': sub.id,
          'isEdit': false,
          'frontPage': 'FirstShowPage'
        })
      }
    }
  }

  toDB() {
    this.navCtrl.push('WaitPccPage')
  }

  toTouSu() {
    this.navCtrl.push('WaitDealPage', {
      'uid': this.uid
    })
  }

  toPAY() {
    this.navCtrl.push('NewPayRequestPage')
  }

  toGC() {
    this.navCtrl.push('GongchengListPage')
  }

  toPD() {
    this.navCtrl.push('PandianListPage')
  }

  toHXD() {
    this.navCtrl.push('SalaryContractPage')
  }

  toTXD() {
    this.navCtrl.push('SalaryAdjustPage')
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData) {
      this.offset += 20
      let body = {
        'uid': this.uid,
        'date': this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate()
      }
      let domain = {
        'me_type': this.me_type,
        'state_type': this.state_type,
        'event_type_id': this.event_type_id,
        'limit': this.limit,
        'offset': this.offset,
      }

      this.firshowService.get_schedule_list_with_domain_new_more_data(body, domain).then(res => {
        infiniteScroll.complete()
        if (res.result.res_data && res.result.res_code == 1) {
          for (let item of res.result.res_data) {
            this.itemList.push(item)
          }
          if (res.result.res_data.length == 20) {
            this.isMoreData = true
          }
          else {
            this.isMoreData = false
          }
        }
        else {
          this.isMoreData = false
        }
      })
    }
    else {
      infiniteScroll.complete()
    }

  }

  toAutoLogin() {
    this.storage.get('user')
      .then(res => {
        if (res) {
          this.uid = res.result.res_data.user_id;
          window.localStorage.setItem("id", res.result.res_data.user_id)
          this.storage.get('user_psd').then(res_db => {
            this.storage.get("loginIndex").then(res_index => {
              this.defultChoose(res_index)

              let db_name = res_db.db_name
              this.appService.toLogin(res_db.user_email, res_db.user_psd, res_db.db_name, "0.8.0")
                .then(res => {
                  if (res.result && res.result.res_code == 1) {
                    HttpService.user_id = res.result.res_data.user_id;
                    HttpService.user = res.result.res_data;
                    HttpService.need_login = false;
                    this.get_backlog_identify(this.currentYear, this.currentMonth)
                    // this.get_approval_num()
                    this.getType()
                    this.storage.get('user_schedule_domain_new').then(res => {
                      // console.log(res)
                      if (res) {
                        this.me_type = res.me_type
                        this.state_type = res.state_type
                        this.event_type_id = res.event_type_id
                      }
                      else {
                        this.me_type = []
                        this.state_type = 'all'
                        this.event_type_id = []
                      }
                      // this.getDayData(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
                    })
                  }
                  else {
                  }
                }).catch((error) => {
                })
            })
          })
        }
      });
  }

  defultChoose(index) {
    if (index == 2) {
      HttpService.appUrl = "http://dr.robotime.com/"
    } else if (index == 3) {
      HttpService.appUrl = "http://erp.robotime.com/"
    } else if (index == 4) {
      HttpService.appUrl = "http://121.43.196.231:8888/"
    } else if (index == 1) {
      HttpService.appUrl = "http://js.robotime.com/"
    } else {
      HttpService.appUrl = HttpService.now_server_url
      // HttpService.appUrl = "http://192.168.2.10:8081/"
    }
  }

  getVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionCode().then((value: string) => {
        resolve(value);
        this.version = value;
        // console.log(this.version)
        this.nativeService.detectionUpgrade(this.version);
      }).catch(err => {
      });
    });
  }


  getiOSVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
        this.firService.get('fir_ios', 1).then(res => {
          // console.log(res)
          if (res.version > value) {
            this.ctrl.create({
              title: '发现新版本,是否立即升级？',
              subTitle: "更新内容：" + res.changelog,
              buttons: [
                {
                  text: '立即升级',
                  handler: () => {
                    this.openUrlByBrowser('http://fir.robotime.cn/MyOa');
                  }
                }
              ]
            }).present();
          }
        });
      }).catch(err => {
      });
    });
  }

  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }

  toLiZhi() {
    this.navCtrl.push('LeaveWorkPage')
  }

  toOffer() {
    this.navCtrl.push('ApplicantOfferApprovePage')
  }

  toINTP() {
    this.navCtrl.push('IntpPage')
  }

  to_adjust_department() {
    this.navCtrl.push('AdjustDepartmentPage')
  }

  toPurchaseAccount() {
    this.navCtrl.push('PurchaseAccountApprovalPage')
  }

  toTCD() {
    this.navCtrl.push('SalaryAllowancePage', {
      'type': '2'
    })
  }

  toBTD() {
    this.navCtrl.push('SalarySubsidyPage')
  }

  toJXJD() {
    this.navCtrl.push('SalaryAllowancePage', {
      'type': '1'
    })
  }

  toNZJ() {
    this.navCtrl.push('YearEndSalaryPage')
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  getAllMessageReply() {
    this.message_reply_arr = []
    let body = {
      'uid': this.uid
    }
    this.firshowService.get_meesage_reply(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.message_reply_arr = res.result.res_data
      }
    })
  }

  itemSelected(event) {
    this.search_type = ''
    this.search_text = ''
    if (event.id == 1) {
      this.search_type = "rt_context";
      this.search_text = event.name.replace("搜 动态内容：", "")
    }

    let body = {
      'type': this.search_type,
      'search_text': this.search_text,
      'uid': this.uid,
    }
    this.message_reply_arr = []
    this.firshowService.search_all_sch_reply(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.message_reply_arr = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.getAllMessageReply()
  }

  gotoRw(items) {
    this.navCtrl.push('CalendarDeatilpagePage', {
      'item_id': items.sch_id,
      'isEdit': false,
      'frontPage': 'FirstShowPage'
    })
  }

  click_reply(){
    this.navCtrl.push('MessageReplyMenuPage', {
      'uid': this.uid
    })
  }

}
