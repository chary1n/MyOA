webpackJsonp([111],{

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/first-show.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__first_service__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the FirstShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FirstShowPage = (function () {
    function FirstShowPage(navCtrl, navParams, datePipe, firshowService, storage, statusBar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePipe = datePipe;
        this.firshowService = firshowService;
        this.storage = storage;
        this.statusBar = statusBar;
        this.isDay = true;
        this.isShen = false;
        this.isMessage = false;
        this.currentWeek = 1; //当前第几周
        this.currentDayList = [];
        this.allDayList = [];
        this.currentDay = 0;
        this.currentMonth = 0;
        this.currentYear = 0;
        this.items_day = [];
        this.showIcon = true; //显示日历向下按钮
        this.itemList = []; //待办事项列表
        this.notSureList = []; //没有确定日期的待办事项
        this.lateList = []; //预期的待办事项
        this.dateNow = "今天";
        this.showLate = false; //显示逾期
        this.lateNum = 0;
        this.haveThing = []; //有事件的list
        this.need_fresh = false;
        this.isShowApprovalPoint = false;
        this.all_approval = 0; //审批总和
        this.isShowBac = false;
        this.un_read_list = [];
        this.storage.get('user').then(function (res) {
            _this.user_heard = res.result.res_data.user_ava;
            _this.uid = res.result.res_data.user_id;
            _this.getDayData(_this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
            _this.get_backlog_identify(_this.currentYear, _this.currentMonth);
            _this.get_approval_num();
            _this.getType();
        });
    }
    FirstShowPage.prototype.showback = function () {
        if (this.isShowBac) {
            this.isShowBac = false;
        }
        else {
            this.isShowBac = true;
        }
    };
    //获取所有的待办类型
    FirstShowPage.prototype.getType = function () {
        var _this = this;
        var body = {
            'uid': this.uid
        };
        this.firshowService.get_event_type(body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.event_list = res.result.res_data;
            }
        });
    };
    FirstShowPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.un_read_list = [];
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.storage.get('user').then(function (res) {
            _this.uid = res.result.res_data.user_id;
            _this.get_approval_num();
            _this.firshowService.get_un_read_reply({ 'uid': _this.uid }).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.un_read_list = res.result.res_data;
                }
            });
            _this.need_fresh = _this.navParams.get('need_fresh');
            if (_this.need_fresh) {
                _this.getDayData(_this.datePipe.transform((_this.currentYear + '-' + _this.currentMonth + '-' + _this.currentDay), 'yyyy-MM-dd'));
                _this.get_backlog_identify(_this.currentYear, _this.currentMonth);
            }
        });
    };
    //获取某一天的数据
    FirstShowPage.prototype.getDayData = function (date) {
        var _this = this;
        var body = {
            'uid': this.uid,
            'date': date
        };
        this.firshowService.get_schedule_list(body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.subNum = res.result.res_data.subNum;
                _this.itemList = res.result.res_data.wait;
                _this.notSureList = res.result.res_data.notSure;
                _this.lateList = res.result.res_data.late;
                _this.type_id = res.result.res_data.type_id;
                if (_this.dateNow == '今天' && res.result.res_data.num != 0) {
                    _this.showLate = true;
                    _this.lateNum = res.result.res_data.num;
                }
                else {
                    _this.showLate = false;
                }
            }
        });
    };
    FirstShowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FirstShowPage');
        var Y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        var d = new Date().getDate();
        this.currentDate_date = new Date(Y + "/" + m + "/" + d);
        //日
        this.currentDay = this.currentDate_date.getDate();
        //月
        this.currentMonth = this.currentDate_date.getMonth() + 1;
        //年
        this.currentYear = this.currentDate_date.getFullYear();
        //月
        this.currentDate = this.currentDate_date.getFullYear() + '年' + (this.currentDate_date.getMonth() + 1) + '月';
        //   console.log("currentDate_date="+this.currentDate_date+"  this.currentDate="+this.currentDate+"   this.currentDay="+this.currentDay
        // +"    this.currentMonth="+this.currentMonth+"  this.currentYear="+this.currentYear)
        this.setSchedule(this.currentDate_date);
        for (var i = 0; i < this.currentDayList.length; i++) {
            if (this.currentDayList[i].d == this.currentDay && this.currentDayList[i].m == this.currentMonth) {
                this.currentWeek = Math.ceil((i + 1) / 7);
                break;
            }
        }
        if (this.showIcon) {
            this.currentDayList = this.currentDayList.slice((this.currentWeek - 1) * 7, this.currentWeek * 7);
        }
        else {
            this.currentDayList = this.allDayList;
        }
    };
    //控制按钮是否显示
    FirstShowPage.prototype.changeCalendar = function () {
        this.showIcon = false;
        if (this.haveThing.length != 0) {
            for (var j = 0; j < this.allDayList.length; j++) {
                for (var a = 0; a < this.haveThing.length; a++) {
                    if (this.haveThing[a]
                        == this.allDayList[j].y + '-' + this.allDayList[j].m + '-' + this.allDayList[j].d) {
                        this.allDayList[j].s = true;
                        break;
                    }
                }
            }
        }
        this.currentDayList = this.allDayList;
    };
    FirstShowPage.prototype.changeCalendarAll = function () {
        this.showIcon = true;
        for (var i = 0; i < this.currentDayList.length; i++) {
            if (this.currentDayList[i].d == this.currentDay) {
                this.currentWeek = Math.ceil((i + 1) / 7);
            }
        }
        this.currentDayList = this.currentDayList.slice((this.currentWeek - 1) * 7, this.currentWeek * 7);
    };
    //考勤
    FirstShowPage.prototype.kaoqin = function () {
        this.navCtrl.push('KaoqinPage');
    };
    FirstShowPage.prototype.setSchedule = function (currentObj) {
        var m = currentObj.getMonth() + 1;
        var Y = currentObj.getFullYear();
        var d = currentObj.getDate();
        //获取上一个月有多少天
        var days = new Date(Y, m - 1, 0).getDate();
        //当天日期
        // let dayString = Y + '/' + m + '/' + d
        var currentDayNum = new Date(Y, m, 0).getDate();
        //当天是周几+1
        var currentDayWeek = currentObj.getUTCDay() + 1;
        var result = currentDayWeek - (d % 7 - 1);
        var firstKey = result <= 0 ? 7 + result : result;
        var currentDayList = [];
        //本月总共有几周
        var total_weeks = this.getWeeks(Y, m);
        //   console.log("currentDayNum="+currentDayNum+"   currentDayWeek="+currentDayWeek
        // +"    result="+result+"  firstKey="+firstKey+"   total_weeks="+total_weeks)
        var f = 0;
        var num = 1; //用来显示多出来的下个月的几个日期
        var snum = days - firstKey + 2; //用来显示多出来的上个月的几个日期
        for (var i = 0; i < total_weeks * 7; i++) {
            var date_obj = {
                y: Y,
                m: m,
                d: 0,
                s: false
            };
            if (i < firstKey - 1) {
                if (date_obj.d == 0) {
                    currentDayList[i] = {
                        y: Y,
                        m: m - 1,
                        d: snum,
                        s: false
                    };
                }
                snum = snum + 1;
            }
            else {
                if (f < currentDayNum) {
                    date_obj.d = f + 1;
                    currentDayList[i] = date_obj;
                    f = currentDayList[i].d;
                }
                else if (f >= currentDayNum) {
                    currentDayList[i] = {
                        y: Y,
                        m: m + 1,
                        d: num,
                        s: false
                    };
                    num = num + 1;
                }
            }
            this.currentDayList = currentDayList;
            this.allDayList = currentDayList;
        }
    };
    FirstShowPage.prototype.getWeeks = function (y, m) {
        var str = new Date(y + "/" + m + '/1');
        // 当前年份
        var year = str.getFullYear();
        //  获取月份第一天是周几  周日是0
        var day = str.getDay();
        // console.log("day = "+day)
        // 获取当前月份的天数
        var days = new Date(year, m, 0).getDate();
        // 要减去开头的这几天
        var first = 0;
        day == 0 ? first = 1 : first = 8 - day;
        days = days - first;
        // console.log("first="+first+"  day="+day+"  days="+days)
        return 1 + Math.ceil(days / 7);
    };
    FirstShowPage.prototype.choose_day = function (date) {
        if (date.m <= 0) {
            date.y = date.y - 1;
            date.m = 12;
        }
        else if (date.m > 12) {
            date.y = date.y + 1;
            date.m = 1;
        }
        var choose_date = date.y + "-" + date.m + "-" + date.d;
        var isQuest = false;
        if (date.m > this.currentMonth) {
            this.showIcon = false;
            var str = '';
            if (date.m <= 12) {
                str = date.y + '/' + date.m + '/' + date.d;
            }
            else {
                date.y = date.y + 1;
                date.m = 1;
                str = date.y + '/' + 1 + '/' + date.d;
            }
            this.currentDate_date = new Date(str);
            this.currentDate = this.currentDate_date.getFullYear() + "年" + (this.currentDate_date.getMonth() + 1) + '月';
            this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate());
            this.setSchedule(new Date(str));
            this.get_backlog_identify(date.y, date.m);
        }
        else if (date.m < this.currentMonth) {
            this.showIcon = false;
            var str = '';
            if (date.m <= 0) {
                date.y = date.y - 1;
                date.m = 12;
                str = date.y + '/' + 12 + '/' + date.d;
            }
            else {
                str = date.y + '/' + date.m + '/' + date.d;
            }
            this.currentDate_date = new Date(str);
            this.currentDate = this.currentDate_date.getFullYear() + "年" + (this.currentDate_date.getMonth() + 1) + '月';
            this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate());
            this.setSchedule(new Date(str));
            this.get_backlog_identify(date.y, date.m);
        }
        else {
            isQuest = true;
        }
        this.currentDate_date = new Date(date.y + '/' + date.m + '/' + date.d);
        this.currentYear = date.y;
        this.currentMonth = date.m;
        this.currentDay = date.d;
        var Y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        var d = new Date().getDate();
        //日
        var da = new Date(Y + "/" + m + "/" + d).getDate();
        //月
        var mon = new Date(Y + "/" + m + "/" + d).getMonth() + 1;
        //年
        var year = new Date(Y + "/" + m + "/" + d).getFullYear();
        // console.log("choose_date="+choose_date+"   day = "+year+"/"+mon+"/"+da+"  vo.s="+date.s)
        if (choose_date == (year + "-" + mon + "-" + da)) {
            this.dateNow = "今天";
        }
        else {
            this.dateNow = date.m + '月' + date.d + '日';
        }
        if (isQuest) {
            this.getDayData(choose_date);
        }
        this.items_day = [];
        this.currentDay = date.d;
        this.currentMonth = date.m;
        this.currentYear = date.y;
    };
    FirstShowPage.prototype.add_month = function () {
        this.showIcon = false;
        var Y = this.currentDate_date.getFullYear();
        var m = this.currentDate_date.getMonth() + 1;
        var d = this.currentDate_date.getDate();
        //获取下一个月有多少天
        var days = new Date(Y, m + 1, 0).getDate();
        if (d > days) {
            d = days;
        }
        var str = '';
        // console.log(m)
        m = m + 1;
        // console.log(m)
        if (m <= 12) {
            str = Y + '/' + m + '/' + d;
        }
        else {
            Y = Y + 1;
            m = 1;
            str = Y + '/' + 1 + '/' + d;
        }
        this.currentDate_date = new Date(str);
        this.currentYear = this.currentDate_date.getFullYear();
        this.currentMonth = this.currentDate_date.getMonth() + 1;
        this.currentDate = this.currentYear + "年" + this.currentMonth + '月';
        if ((this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate()) == this.getNowDay()) {
            this.dateNow = '今天';
        }
        else {
            this.dateNow = this.dateNow = (this.currentDate_date.getMonth() + 1) + '月' + this.currentDate_date.getDate() + '日';
        }
        this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate());
        this.setSchedule(new Date(str));
        this.get_backlog_identify(Y, m);
    };
    FirstShowPage.prototype.getNowDay = function () {
        var Y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        var d = new Date().getDate();
        //日
        var da = new Date(Y + "/" + m + "/" + d).getDate();
        //月
        var mon = new Date(Y + "/" + m + "/" + d).getMonth() + 1;
        //年
        var year = new Date(Y + "/" + m + "/" + d).getFullYear();
        return year + "-" + mon + "-" + da;
    };
    FirstShowPage.prototype.delete_month = function () {
        this.showIcon = false;
        var Y = this.currentDate_date.getFullYear();
        var m = this.currentDate_date.getMonth() + 1;
        var d = this.currentDate_date.getDate();
        var str = '';
        m = m - 1;
        if (m <= 0) {
            Y = Y - 1;
            m = 12;
            str = Y + '/' + 12 + '/' + d;
        }
        else {
            str = Y + '/' + m + '/' + d;
        }
        this.currentDate_date = new Date(str);
        // console.log(this.currentDate_date)
        this.currentYear = this.currentDate_date.getFullYear();
        this.currentMonth = this.currentDate_date.getMonth() + 1;
        this.currentDate = this.currentDate_date.getFullYear() + "年" + (this.currentDate_date.getMonth() + 1) + '月';
        if ((this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate()) == this.getNowDay()) {
            this.dateNow = '今天';
        }
        else {
            this.dateNow = this.dateNow = (this.currentDate_date.getMonth() + 1) + '月' + this.currentDate_date.getDate() + '日';
        }
        this.getDayData(this.currentDate_date.getFullYear() + '-' + (this.currentDate_date.getMonth() + 1) + '-' + this.currentDate_date.getDate());
        this.setSchedule(new Date(str));
        this.get_backlog_identify(Y, m);
    };
    FirstShowPage.prototype.gotoDeatil = function (item) {
        var _this = this;
        if (item.res_model_s == 'rt.performance.appraisal.detail' && item.res_id != false) {
            var body = {
                'res_model_s': 'rt.performance.appraisal.detail',
                'uid': this.uid,
                'id': item.res_id
            };
            this.firshowService.get_res_model(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.navCtrl.push('PerformanceStartPage', {
                        'item': res.result.res_data
                    });
                }
            });
        }
        else {
            if (this.type_id == item.type_id && item.is_meeting_sch == false) {
                this.firshowService.get_event_detail({ 'uid': this.uid,
                    'event_id': item.id }).then(function (res) {
                    if (res.result.res_data && res.result.res_code == 1) {
                        item = res.result.res_data;
                        _this.navCtrl.push('MeetingPage', {
                            'meeting_id': item.rt_meeeting_s_id,
                            'isEdit': false,
                            'uid': _this.uid,
                            'frontPage': 'FirstShowPage'
                        });
                    }
                });
            }
            else {
                this.firshowService.get_event_detail({ 'uid': this.uid,
                    'event_id': item.id }).then(function (res) {
                    if (res.result.res_data && res.result.res_code == 1) {
                        item = res.result.res_data;
                        _this.navCtrl.push('CalendarDeatilpagePage', {
                            'item': item,
                            'isEdit': false,
                            'frontPage': 'FirstShowPage'
                        });
                    }
                });
            }
        }
    };
    FirstShowPage.prototype.latePage = function () {
        this.navCtrl.push('LateListPage');
    };
    //获取有事件的日期
    FirstShowPage.prototype.get_backlog_identify = function (year, month) {
        var _this = this;
        var body = {
            'uid': this.uid,
            'year': year,
            'month': month
        };
        this.firshowService.get_backlog_identify(body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                var list = [];
                list = res.result.res_data;
                _this.haveThing = [];
                for (var i = 0; i < list.length; i++) {
                    _this.haveThing[i] = _this.datePipe.transform(new Date(list[i]), 'yyyy-M-d');
                }
                if (_this.haveThing.length != 0) {
                    for (var j = 0; j < _this.currentDayList.length; j++) {
                        _this.currentDayList[j].s = false;
                        for (var a = 0; a < _this.haveThing.length; a++) {
                            // console.log("this.currentDayList.length = "+j+"a = "+a)
                            if (_this.haveThing[a]
                                == _this.currentDayList[j].y + '-' + _this.currentDayList[j].m + '-' + _this.currentDayList[j].d) {
                                _this.currentDayList[j].s = true;
                            }
                        }
                    }
                }
            }
        });
    };
    // createMetting(fab: FabContainer){
    //   fab.close();
    //   this.navCtrl.push('MeetingPage', {
    //     'isEdit': true,
    //     'date': this.currentDate_date
    // })
    // }
    //创建新代办
    FirstShowPage.prototype.createWait = function (item, fab) {
        fab.close();
        this.isShowBac = false;
        if (this.type_id == item.id) {
            this.navCtrl.push('MeetingPage', {
                'isEdit': true,
                'date': this.currentDate_date,
                'frontPage': 'FirstShowPage'
            });
        }
        else {
            this.navCtrl.push('CalendarDeatilpagePage', {
                'isEdit': true,
                'date': this.currentDate_date,
                'type_id': item.id,
                'type_name': item.display_name,
                'frontPage': 'FirstShowPage'
            });
        }
    };
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
    FirstShowPage.prototype.daything = function () {
        this.isDay = true;
        this.isMessage = false;
        this.isShen = false;
    };
    FirstShowPage.prototype.consider = function () {
        this.isDay = false;
        this.isMessage = false;
        this.isShen = true;
    };
    FirstShowPage.prototype.message = function () {
        this.isDay = false;
        this.isMessage = true;
        this.isShen = false;
    };
    FirstShowPage.prototype.toVacation = function () {
        this.navCtrl.push('VacationApprovalPage');
    };
    FirstShowPage.prototype.toBuka = function () {
        this.navCtrl.push('AttendaceRecoupPage');
    };
    //获取审批的数目
    FirstShowPage.prototype.get_approval_num = function () {
        var _this = this;
        var body = {
            'uid': this.uid
        };
        this.firshowService.get_approval_num(body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.recoup_num = res.result.res_data.recoup_num;
                _this.vacation_num = res.result.res_data.vacation_num;
                _this.all_approval = _this.recoup_num + _this.vacation_num;
                if (_this.all_approval != 0) {
                    _this.isShowApprovalPoint = true;
                }
                else {
                    _this.isShowApprovalPoint = false;
                }
            }
        });
    };
    FirstShowPage.prototype.toAll = function () {
        this.navCtrl.push('AllSchedulePage');
    };
    FirstShowPage.prototype.closeFab = function () {
        this.isShowBac = false;
        this.fab.close();
    };
    FirstShowPage.prototype.click_un_read_reply = function () {
        console.log(this.un_read_list);
        this.navCtrl.push('UnreadReplyPage', {
            item: this.un_read_list
        });
    };
    return FirstShowPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["ViewChild"]('fab'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* FabContainer */])
], FirstShowPage.prototype, "fab", void 0);
FirstShowPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-first-show',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/first-show.html"*/'<!--\n  Generated template for the FirstShowPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header no-border>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n\n    <!-- <button ion-button style="background-color: transparent;margin: 0px;height: 35px;">\n            <img src={{user_heard}} class="image1" tappable (click)="mePage()">\n        </button> -->\n    <!--<ion-title>首页</ion-title>-->\n    <div align="center" style="height:30px;margin-left:10px">\n      <div style="width:33%;float:right;text-align:left" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[isMessage]" align="center"\n        tappable (click)="message()">\n        <p [ngClass]="{true:\'p_message_line_height_select\',false:\'p_message_line_height\'}[isMessage]">消息</p>\n      </div>\n      <div style="width:33%;float:right" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[isShen]" align="center" tappable (click)="consider()">\n        <p [ngClass]="{true:\'p_shenhe_line_height_select\',false:\'p_shenhe_line_height\'}[isShen]">审核</p>\n        <span *ngIf="isShowApprovalPoint" [ngClass]="{true:\'big_span_bac\',false:\'normal_span_bac\'}[all_approval>=10]">\n            {{all_approval}}\n          </span>\n      </div>\n      <div style="width:33%;float:left;text-align:right" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[isDay]" align="center"\n        tappable (click)="daything()">\n        <p [ngClass]="{true:\'p_daiban_line_height_select\',false:\'p_daiban_line_height\'}[isDay]">待办</p>\n      </div>\n      <button ion-button class="icon_class" tappable (click)="kaoqin()">\n            <ion-icon name=\'pin\' style="color: white;font-size: 23px"></ion-icon>\n        </button>\n\n    </div>\n  </ion-navbar>\n  <ion-backdrop *ngIf="isShowBac" style="opacity: 0.9; background-color: white;">\n  </ion-backdrop>\n\n\n</ion-header>\n\n<ion-content>\n  <!--<ion-grid style="border-bottom:#f0f2f5 1px solid">\n        <ion-row style="max-height:50px;margin-top: -15px">\n          <ion-col tappable  (click)="daything()" style="text-align: center">\n            <p style="padding-bottom:5px;width:35px;margin-left:auto;margin-right:auto"\n            [ngClass]="{true:\'selected\',false:\'normal\'}[isDay]">日程</p>\n          </ion-col>\n          <ion-col tappable  (click)="consider()" style="text-align: center">\n            <p style="padding-bottom:5px;width:35px;margin-left:auto;margin-right:auto"\n            [ngClass]="{true:\'selected\',false:\'normal\'}[isShen]">审核</p>\n            <span  *ngIf="isShowApprovalPoint" [ngClass]="{true:\'big_span_bac\',false:\'normal_span_bac\'}[all_approval>=10]">\n            {{all_approval}}\n            </span>\n          </ion-col>\n          <ion-col tappable  (click)="message()" style="text-align: center">\n              <p style="padding-bottom:5px;width:35px;margin-left:auto;margin-right:auto"\n              [ngClass]="{true:\'selected\',false:\'normal\'}[isMessage]">消息\n              <!-- <span  *ngIf="isShowBuyPoint" style="margin-top:6px;position:absolute;width:8px;height:8px;border-radius:8px;background-color:red;display:inline-block;color:white;text-align:center;margin-left:5px"></span> -->\n  <!--</p>\n            </ion-col>\n        </ion-row>\n    </ion-grid>-->\n  <div align="center" tappable (click)="click_un_read_reply()" *ngIf="un_read_list.length > 0">\n    <div class="un_read_class">\n      {{un_read_list.length}}条新回复\n    </div>\n  </div>\n  <div *ngIf=\'isDay\'>\n    <div style="padding: 1px;text-align: center;height: 37px;">\n      <p style="font-size: 13px;color: #2597ec;float: right;margin-right: 15px;margin-top: 10px" tappable (click)="toAll()">全部待办XX</p>\n      <p class="month_message">\n        <span tappable (click)="delete_month()">{{"<"}}</span><span style="margin-left:10px">{{currentDate}}</span>\n        <span style="margin-left:10px" tappable (click)="add_month()">{{">"}}</span>\n      </p>\n    </div>\n    <ion-backdrop *ngIf="isShowBac" tappable (click)="closeFab()" disable-activated role="presentation" style="opacity: 0.9; background-color: white;transition-delay: initial;filter: blur(0px);">\n    </ion-backdrop>\n    <ion-fab style="margin-bottom:90px;position:fixed;opacity: 1.0;" bottom right edge #fab>\n      <button (click)="showback()" style="box-shadow:1px 2px 10px #888888;width: 50px;height: 50px;line-height: 50px;background-color: #2597ec"\n        ion-fab mini><ion-icon name="add" style="color: white;line-height: 50px"></ion-icon></button>\n      <ion-fab-list side="top" style="float: right;text-align: right">\n        <!-- <button ion-fab (click)="createMetting(fab)" style="border-radius: 25px;width: 70px;background-color: #E98553;color: white">会议</button> -->\n        <button *ngFor="let item of event_list" [ngClass]="{\'fabBcOne\':event_list.indexOf(item)%3==0,\'fabBcTwo\':event_list.indexOf(item)%3==1,\'fabBcThree\':event_list.indexOf(item)%3==2}"\n          ion-fab (click)="createWait(item, fab)">{{item.display_name}}</button>\n      </ion-fab-list>\n    </ion-fab>\n    <div class="box-flex" style="margin-left: 10px;margin-right: 10px;margin-top: 10px">\n      <div class="flex-item">\n        <div class="item-content-header">一</div>\n      </div>\n      <div class="flex-item">\n        <div class="item-content-header">二</div>\n      </div>\n      <div class="flex-item">\n        <div class="item-content-header">三</div>\n      </div>\n      <div class="flex-item">\n        <div class="item-content-header">四</div>\n      </div>\n      <div class="flex-item">\n        <div class="item-content-header">五</div>\n      </div>\n      <div class="flex-item">\n        <div class="item-content-header">六</div>\n      </div>\n      <div class="flex-item">\n        <div class="item-content-header">日</div>\n      </div>\n    </div>\n    <div class="box-flex" style=\'margin-top:-10px;margin-left: 10px;margin-right: 10px\' id=\'box-flex\'>\n      <div id="flex-item" class="flex-item" *ngFor="let vo of currentDayList" tappable (click)="choose_day(vo)" [ngClass]="{true:\'item-content bk-color-day\',false:\'item-content\'}[currentDay == vo.d && currentMonth == vo.m && currentYear == vo.y]"\n        style="line-height: 44px;">\n        <p style="height: 16px;margin-top: -3px" [ngClass]="{\'pBac\':currentMonth == vo.m && currentYear == vo.y,\'pBacNormal\':currentMonth != vo.m,\'pNormal\':currentDay == vo.d && currentMonth == vo.m && currentYear == vo.y}">{{vo.d}}</p>\n        <p *ngIf="vo.s==true" [ngClass]="{true:\'circleB\',false:\'circleA\'}[currentDay == vo.d && currentMonth == vo.m && currentYear == vo.y]"></p>\n      </div>\n\n      <ion-icon *ngIf="showIcon" name="arrow-down" tappable (click)="changeCalendar()" style="color: #999999;width: 100%;margin-top: 15px;text-align: center"></ion-icon>\n      <ion-icon *ngIf="!showIcon" name="arrow-up" tappable (click)="changeCalendarAll()" style="color: #999999;width: 100%;margin-top: 15px;text-align: center"></ion-icon>\n      <ion-item no-lines style="margin-top: 5px;padding: 1px;border-bottom:#f0f2f5 1px solid;border-top:#f0f2f5 1px solid;min-height: 25px">\n        <ion-label style="font-size: 13px;margin-left: 15px;color: black;font-weight:bold;">{{dateNow}}</ion-label>\n        <div style="padding: 1px;" item-end class="divBac" *ngIf="showLate" tappable (click)="latePage()">\n          <p style="font-size: 10px;color: #E98553;margin-top: auto;margin-bottom: auto">{{lateNum}}个待办已逾期\n            <ion-icon name="arrow-forward" style="color: #E98553;margin-top: auto;margin-bottom: auto"></ion-icon>\n          </p>\n        </div>\n      </ion-item>\n    </div>\n    <div>\n      <ion-item no-lines *ngIf="itemList.length == 0" style="min-height: 20px;padding-left: 0px;">\n        <ion-label style="font-size: 13px;padding-left: 15px;text-align:center;width:100%;color:#999999;">没有添加待办</ion-label>\n      </ion-item>\n      <ion-list style="width: 100%;border-top:#f0f2f5 1px solid;">\n        <ion-item no-lines style="height: 50px;;min-height: 25px;" *ngFor="let item of itemList" tappable (click)="gotoDeatil(item)">\n          <p item-start *ngIf="!item.allday" style="font-size: 12px;width: 40px">{{item.event_time}}\n          </p>\n          <p item-start *ngIf="item.allday" style="font-size: 12px;width: 40px;opacity: 0;">{{item.event_time}}\n          </p>\n          <div item-start style="height: 105%;;width: 10px">\n            <div style="position: absolute;width: 1px;border-left:#f0f2f5 1px solid;height: 40%;margin-left: 4px;"></div>\n            <img *ngIf="item.state" src="assets/img/circle.png" style="padding-top: 20px">\n            <img *ngIf="!item.state" src="assets/img/finish_circle.png" style="padding-top: 20px">\n            <div style="position: absolute;width: 1px;border-left:#f0f2f5 1px solid;height: 70%;margin-left: 4px;margin-top: -5px"></div>\n          </div>\n          <ion-label item-end [ngClass]="{true:\'notFinish\',false:\'finish\'}[item.state]">[{{item.type_name}}]:{{item.rt_project_principal_display_name}}-{{item.subject}}</ion-label>\n        </ion-item>\n        <ion-item no-lines style="margin-top: 5px;padding: 1px;border-bottom:#f0f2f5 1px solid;border-top:#f0f2f5 1px solid;min-height: 25px" *ngIf="notSureList.length > 0"> \n          <ion-label style="font-size: 13px;margin-left: 15px;color: black;font-weight:bold;">时间待定</ion-label>\n        </ion-item>\n        <ion-item no-lines style="height: 50px;;min-height: 25px;" *ngFor="let item of notSureList" tappable (click)="gotoDeatil(item)">\n          <!--<p item-start *ngIf="notSureList.indexOf(item)==0" style="font-size: 13px;width: 40px;color: black;">任务\n          </p>\n          <p item-start *ngIf="notSureList.indexOf(item)!=0" style="font-size: 13px;width: 40px;color: #666666;opacity: 0;">任务\n          </p>-->\n          <p item-start style="font-size: 12px;width: 40px">   \n          </p>\n          <div item-start style="height: 105%;;width: 10px">\n            <div style="position: absolute;width: 1px;border-left:#f0f2f5 1px solid;height: 40%;margin-left: 4px;"></div>\n            <img *ngIf="item.state" src="assets/img/circle.png" style="padding-top: 20px">\n            <img *ngIf="!item.state" src="assets/img/finish_circle.png" style="padding-top: 20px">\n            <div style="position: absolute;width: 1px;border-left:#f0f2f5 1px solid;height: 70%;margin-left: 4px;margin-top: -5px"></div>\n          </div>\n          <ion-label item-end [ngClass]="{true:\'notFinish\',false:\'finish\'}[item.state]">[{{item.type_name}}]:{{item.rt_project_principal_display_name}}-{{item.subject}}</ion-label>\n        </ion-item>\n      </ion-list>\n    </div>\n  </div>\n  <div *ngIf=\'isShen\'>\n    <div *ngIf="vacation_num!=0 || recoup_num!=0">\n      <div style="padding: 1px;border-bottom:#f0f2f5 1px solid;margin-left: 20px">\n        <span style="background-color: #409eff;width: 3px;border-radius: 3px;height: 13px;float: left;margin-top: 16px;margin-left: -12px"></span>\n        <p style="font-size: 13px;color: #409eff;">人力资源</p>\n      </div>\n      <ion-item-group>\n        <div *ngIf="vacation_num!=0" style="min-height: 45px;border-bottom:#f0f2f5 1px solid;margin-left: 20px;padding: 1px" tappable\n          (click)=\'toVacation()\'>\n          <p style="margin-right: 15px;float: right;">{{vacation_num}}</p>\n          <p style="font-size: 13px;">休假</p>\n        </div>\n        <div *ngIf="recoup_num!=0" style="min-height: 45px;border-bottom:#f0f2f5 1px solid;margin-left: 20px;padding: 1px" tappable\n          (click)=\'toBuka()\'>\n          <p style="margin-right: 15px;float: right;">{{recoup_num}}</p>\n          <p style="font-size: 13px;">补卡</p>\n        </div>\n      </ion-item-group>\n    </div>\n    <div align="center" *ngIf="vacation_num==0 && recoup_num==0">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/journal_sheet/null_state.png">\n      <p style="width:120px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">没有待审批的～</p>\n    </div>\n  </div>\n  <div *ngIf=\'isMessage\'>\n    <div align="center">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/journal_sheet/null_state.png">\n      <p style="width:120px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">暂时没有消息～</p>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/first-show.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_1__first_service__["a" /* FirstShowService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"],
        __WEBPACK_IMPORTED_MODULE_1__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], FirstShowPage);

//# sourceMappingURL=first-show.js.map
// CONCATENATED MODULE: ./src/pages/first-show/first-show.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirstShowPageModule", function() { return FirstShowPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var first_show_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FirstShowPageModule = (function () {
    function FirstShowPageModule() {
    }
    return FirstShowPageModule;
}());
FirstShowPageModule = first_show_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            FirstShowPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(FirstShowPage),
        ],
    })
], FirstShowPageModule);

//# sourceMappingURL=first-show.module.js.map

/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstShowService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FirstShowService = (function () {
    function FirstShowService(httpService) {
        this.httpService = httpService;
    }
    FirstShowService.prototype.delete_reply = function (body) {
        return this.httpService.postBody("delete_reply", body);
    };
    FirstShowService.prototype.read_total_reply = function (body) {
        return this.httpService.postBody("read_total_reply", body);
    };
    FirstShowService.prototype.get_un_read_reply = function (body) {
        return this.httpService.postBodyNoLoading("get_un_read_reply", body);
    };
    FirstShowService.prototype.get_employee_detail = function (user_id) {
        var body = JSON.stringify({
            user_id: user_id,
        });
        return this.httpService.postBody("get_employee_detail", body, 1);
    };
    FirstShowService.prototype.update_zan = function (body) {
        return this.httpService.postBodyNoLoading("update_zan", body);
    };
    FirstShowService.prototype.reply_to = function (body) {
        return this.httpService.postBody("reply_to", body);
    };
    FirstShowService.prototype.get_event_detail = function (body) {
        return this.httpService.postBodyNoLoading("get_event_detail", body);
    };
    FirstShowService.prototype.get_schedule_list = function (body) {
        return this.httpService.postBody("get_schedule_list", body);
    };
    FirstShowService.prototype.get_backlog_identify = function (body) {
        return this.httpService.postBodyNoLoading("get_backlog_identify", body);
    };
    //跳转到相应的模块
    FirstShowService.prototype.get_res_model = function (body) {
        return this.httpService.postBody("get_res_model", body);
    };
    FirstShowService.prototype.delete_res_model = function (body) {
        return this.httpService.postBody("delete_res_model", body);
    };
    FirstShowService.prototype.get_event_type = function (body) {
        return this.httpService.postBodyNoLoading("get_event_type", body);
    };
    FirstShowService.prototype.get_all_partner = function (body) {
        return this.httpService.postBody("get_all_partner", body);
    };
    FirstShowService.prototype.get_calendar_alarms = function (body) {
        return this.httpService.postBody("get_calendar_alarms", body);
    };
    FirstShowService.prototype.create_new_schedule = function (body) {
        return this.httpService.postBody("create_new_schedule", body);
    };
    FirstShowService.prototype.write_wait_thing = function (body) {
        return this.httpService.postBody("write_wait_thing", body);
    };
    FirstShowService.prototype.finish_wait_thing = function (body) {
        return this.httpService.postBody("write_wait_thing", body);
    };
    FirstShowService.prototype.cancel_wait_thing = function (body) {
        return this.httpService.postBody("cancel_wait_thing", body);
    };
    FirstShowService.prototype.search_one_partner = function (body) {
        return this.httpService.postBodyNoLoading("search_one_partner", body);
    };
    FirstShowService.prototype.get_late_list = function (body) {
        return this.httpService.postBody("get_late_list", body);
    };
    //获取审批页面的数目
    FirstShowService.prototype.get_approval_num = function (body) {
        return this.httpService.postBodyNoLoading("get_approval_num", body);
    };
    FirstShowService.prototype.create_meeting = function (body) {
        return this.httpService.postBody("create_meeting", body);
    };
    FirstShowService.prototype.get_meeting = function (body) {
        return this.httpService.postBodyNoLoading("get_meeting", body);
    };
    FirstShowService.prototype.create_meeting_line = function (body) {
        return this.httpService.postBody("create_meeting_line", body);
    };
    // delete_meeting_line(body){
    //     return this.httpService.postBody("delete_meeting_line", body);
    // }
    FirstShowService.prototype.delete_meeting = function (body) {
        return this.httpService.postBody("delete_meeting", body);
    };
    FirstShowService.prototype.write_meeting = function (body) {
        return this.httpService.postBody("write_meeting", body);
    };
    // get_meeting_line(body){
    //     return this.httpService.postBody("get_meeting_line", body);
    // }
    FirstShowService.prototype.change_meeting = function (body) {
        return this.httpService.postBody("change_meeting", body);
    };
    FirstShowService.prototype.get_all_schedule = function (body) {
        return this.httpService.postBody("get_all_schedule", body);
    };
    FirstShowService.prototype.search_all_schedule = function (body) {
        return this.httpService.postBody("search_all_schedule", body);
    };
    return FirstShowService;
}());
FirstShowService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], FirstShowService);

//# sourceMappingURL=first_service.js.map

/***/ })

});
//# sourceMappingURL=111.js.map