webpackJsonp([109],{

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/meeting/meeting.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__first_service__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__(25);
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
 * Generated class for the MeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MeetingPage = (function () {
    function MeetingPage(navCtrl, navParams, storage, datePipe, statusBar, firService, toastCtrl, sanitizer, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.datePipe = datePipe;
        this.statusBar = statusBar;
        this.firService = firService;
        this.toastCtrl = toastCtrl;
        this.sanitizer = sanitizer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.isEdit = false; //是否是编辑状态
        this.search = false; //是否显示搜索
        this.change = false;
        this.selectList = [];
        this.start_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
        this.stop_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
        this.start_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.stop_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.need_fresh = false;
        this.pet = 0;
        this.rt_alarm_type = '不提醒';
        this.rt_alarm_type_id = '-1';
        this.rt_type_app = false;
        this.rt_type_notification = false;
        this.item_tip_name = '不提醒';
        this.rt_is_sure_time = false;
        this.rt_allday = false;
        this.showPeopleList = [];
        this.employeeList = [];
        this.storeList = [];
        this.linshiString = '';
        this.name = '';
        this.rt_location = '';
        this.rt_description = '';
        this.rt_hint = '';
        this.rt_meeting_ids = [];
        this.need_show_more_icon = true;
        this.isShowTip = false;
        this.title_meeting = '新建会议';
        this.title_meeting_two = '会议';
        this.showIcon = false;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController(this.navParams.get('frontPage'), navCtrl);
        this.isEdit = this.navParams.get('isEdit');
        this.storage.get('user').then(function (res) {
            _this.user = res.result.res_data;
            _this.uid = res.result.res_data.user_id;
            if (_this.isEdit == true) {
                var current_day = new Date();
                current_day = _this.navParams.get('date');
                _this.rt_project_principal_id = _this.user.partner_id;
                _this.rt_project_principal = _this.user.partner_name;
                _this.selectList.push({
                    'partner_id': _this.rt_project_principal_id,
                    'partner_name': _this.rt_project_principal,
                    'ischeck': true
                });
                _this.start_datetime = new Date(current_day.getTime() + 8 * 60 * 60 * 1000).toISOString();
                _this.stop_datetime = new Date(current_day.getTime() + 8 * 60 * 60 * 1000).toISOString();
                _this.start_date = _this.datePipe.transform(current_day, 'yyyy-MM-dd');
                _this.stop_date = _this.datePipe.transform(current_day, 'yyyy-MM-dd');
            }
            else {
                _this.meeting_id = _this.navParams.get('meeting_id');
                _this.uid = _this.navParams.get('uid');
                _this.get_all_data();
            }
        });
    }
    MeetingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MeetingPage');
    };
    //获取页面数据
    MeetingPage.prototype.get_all_data = function () {
        var _this = this;
        var body = {
            'uid': this.uid,
            'meeting_id': this.meeting_id
        };
        var that = this;
        this.firService.get_meeting(body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.item = res.result.res_data;
                if (_this.user.partner_id == _this.item.rt_project_principal.id || _this.uid == _this.item.create_uid) {
                    _this.need_show_more_icon = true;
                }
                else {
                    _this.need_show_more_icon = false;
                }
                _this.item_change();
            }
        });
    };
    MeetingPage.prototype.item_change = function () {
        if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
            this.isShowTip = true;
        }
        else {
            this.isShowTip = false;
        }
        this.rt_is_sure_time = this.item.rt_is_sure_time;
        this.name = this.item.name;
        this.rt_project_principal = this.item.rt_project_principal.name;
        this.rt_meeting_ids = this.item.rt_meeting_ids;
        this.selectList = this.item.rt_meeting_participant;
        this.rt_alarm_type_id = this.item.rt_alarm_type;
        this.rt_alarm_type = this.item.rt_alarm_type_name;
        this.item_tip_name = '';
        if (this.item.rt_alarm_type == '-1') {
            this.item_tip_name = this.item.rt_alarm_type_name;
        }
        else if (this.item.rt_type_app && !this.item.rt_type_notification) {
            this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒)';
        }
        else if (this.item.rt_type_notification && !this.item.rt_type_app) {
            this.item_tip_name = this.item.rt_alarm_type_name + '(网页提醒)';
        }
        else if (this.item.rt_type_app && this.item.rt_type_notification) {
            this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒、网页提醒)';
        }
        this.rt_location = this.item.rt_location;
        this.rt_description = this.item.rt_description.replace(/\n/g, "<br>");
        this.rt_hint = this.item.rt_hint.replace(/\n/g, "<br>");
        this.rt_meeting_state = this.item.rt_meeting_state;
        if (this.item.rt_allday && this.item.rt_meeting_start && this.item.rt_meeting_stop) {
            this.item_start = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'MM-dd');
            this.item_stop = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'MM-dd');
        }
        else if (this.item.rt_meeting_start && this.item.rt_meeting_stop) {
            this.item_start = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'MM-dd HH:mm');
            this.item_stop = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'MM-dd HH:mm');
        }
        if (this.rt_is_sure_time == true) {
        }
        else {
            this.start_date = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'yyyy-MM-dd');
            this.stop_date = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'yyyy-MM-dd');
            this.start_datetime = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z';
            this.stop_datetime = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z';
        }
    };
    //滑动事件
    MeetingPage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    MeetingPage.prototype.goBack = function () {
        this.frontPage.data.need_fresh = true;
        this.navCtrl.pop();
    };
    MeetingPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.need_fresh = this.navParams.get('need_fresh');
        this.pet = this.navParams.get('pet');
        if (this.need_fresh == true) {
            if (this.pet == 1) {
                this.rt_alarm_type_id = this.navParams.get('alarm_id');
                this.rt_alarm_type = this.navParams.get('alarm_name');
                this.rt_type_app = this.navParams.get('type_app');
                this.rt_type_notification = this.navParams.get('type_notification');
                this.item_tip_name = '';
                if (this.rt_alarm_type_id == '-1') {
                    this.item_tip_name = this.navParams.get('alarm_name');
                }
                else if (this.rt_type_app && !this.rt_type_notification) {
                    this.item_tip_name = this.navParams.get('alarm_name') + '(App提醒)';
                }
                else if (this.rt_type_notification && !this.rt_type_app) {
                    this.item_tip_name = this.navParams.get('alarm_name') + '(网页提醒)';
                }
                else if (this.rt_type_app && this.rt_type_notification) {
                    this.item_tip_name = this.navParams.get('alarm_name') + '(App提醒、网页提醒)';
                }
            }
            else if (this.pet == 2) {
                this.frontPage.data.need_fresh = true;
                this.navCtrl.pop();
            }
            else if (this.pet == 4) {
                this.get_all_data();
            }
        }
        var need_fresh_reply = this.navParams.get('need_fresh_reply');
        if (need_fresh_reply) {
            this.get_all_data();
        }
    };
    //取消新建待办事项
    MeetingPage.prototype.cancel = function () {
        cordova.plugins.Keyboard.close();
        if (this.search) {
            this.title_meeting = '新建会议';
            if (this.edit && this.search && this.change) {
                this.title_meeting_two = '会议';
            }
            this.search = false;
            if (this.select_type == 1) {
                this.selectList = this.storeList;
            }
        }
        else {
            this.navCtrl.pop();
        }
    };
    //新建待办事项完成
    MeetingPage.prototype.stateFinish = function () {
        var _this = this;
        cordova.plugins.Keyboard.close();
        if (this.search) {
            this.title_meeting = '新建会议';
            if (this.edit && this.search && this.change) {
                this.title_meeting_two = '会议';
            }
            this.search = false;
            return;
        }
        var body = this.handleData();
        if (body) {
            this.firService.create_meeting(body).then(function (res) {
                if (res.result.res_code == 1) {
                    _this.frontPage.data.need_fresh = true;
                    _this.navCtrl.popTo(_this.frontPage);
                }
            });
        }
    };
    //时间待定的按钮
    MeetingPage.prototype.notSureClick = function () {
        if (this.rt_is_sure_time && this.rt_allday) {
            this.rt_allday = false;
        }
    };
    //全天的按钮
    MeetingPage.prototype.allDayClick = function () {
        if (this.rt_is_sure_time && this.rt_allday) {
            this.rt_is_sure_time = false;
        }
    };
    //删除一个人员
    MeetingPage.prototype.closePartner = function (item) {
        for (var i = 0; i < this.showPeopleList.length; i++) {
            if (item.partner_id == this.showPeopleList[i].partner_id) {
                this.showPeopleList.splice(i, 1);
                break;
            }
        }
    };
    //选择负责人
    MeetingPage.prototype.selectPartnerId = function () {
        var _this = this;
        this.title_meeting = '负责人';
        this.title_meeting_two = '负责人';
        this.showPeopleList = [];
        this.showPeopleList.push({
            'partner_id': this.rt_project_principal_id,
            'partner_name': this.rt_project_principal,
            'ischeck': true
        });
        this.search = true;
        this.select_type = 2;
        setTimeout(function () {
            _this.nameInput.setFocus(); //输入框获取焦点
        });
    };
    //选择参与人员
    MeetingPage.prototype.selectPartner = function () {
        var _this = this;
        this.title_meeting = '参与人员';
        this.title_meeting_two = '参与人员';
        this.showPeopleList = this.selectList;
        this.storeList = [];
        this.storeList = this.storeList.concat(this.selectList);
        this.search = true;
        this.select_type = 1;
        setTimeout(function () {
            _this.nameInput.setFocus(); //输入框获取焦点
        });
    };
    MeetingPage.prototype.searchInput = function ($event) {
        var _this = this;
        console.log('sadfasd= ' + $event);
        if ($event == '') {
            this.employeeList = [];
        }
        else {
            var body = {
                'uid': this.uid,
                'name': $event
            };
            this.firService.search_one_partner(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.employeeList = res.result.res_data;
                    if (_this.select_type == 1) {
                        _this.setCheck();
                    }
                    else if (_this.select_type == 2) {
                        for (var j = 0; j < _this.employeeList.length; j++) {
                            if (_this.employeeList[j].partner_id == _this.rt_project_principal) {
                                _this.employeeList[j].ischeck = true;
                            }
                        }
                    }
                }
            });
        }
    };
    //比较选中的人
    MeetingPage.prototype.setCheck = function () {
        for (var i = 0; i < this.selectList.length; i++) {
            for (var j = 0; j < this.employeeList.length; j++) {
                if (this.selectList[i].partner_id == this.employeeList[j].partner_id) {
                    this.employeeList[j].ischeck = true;
                    break;
                }
            }
        }
    };
    MeetingPage.prototype.choosePeople = function (item) {
        this.linshiString = '';
        this.employeeList = [];
        if (this.select_type == 1) {
            item.ischeck = !item.ischeck;
            if (item.ischeck) {
                this.showPeopleList.push(item);
            }
            else {
                for (var i = 0; i < this.showPeopleList.length; i++) {
                    if (item.partner_id == this.showPeopleList[i].partner_id) {
                        break;
                    }
                }
            }
        }
        else if (this.select_type == 2) {
            this.title_meeting = '新建会议';
            this.title_meeting_two = '会议';
            if (item.partner_id == this.rt_project_principal_id) {
                this.search = false;
                return;
            }
            else {
                this.search = false;
                this.showPeopleList = [];
                //接下来的逻辑是，（前提，负责人默认是参与人）,选的负责人如果已经在选择的人里面了，就不加，不在里面，就加，避免重复
                this.rt_project_principal_id = item.partner_id;
                this.rt_project_principal = item.partner_name;
                if (!this.selectList || this.selectList.length <= 0) {
                    return;
                }
                var plus = false;
                for (var i_1 = 0; i_1 < this.selectList.length; i_1++) {
                    if (this.selectList[i_1].partner_id == item.partner_id) {
                        plus = false;
                        break;
                    }
                    else {
                        plus = true;
                    }
                }
                if (plus) {
                    this.selectList.push({
                        'partner_id': item.partner_id,
                        'partner_name': item.partner_name,
                        'ischeck': true
                    });
                }
            }
        }
    };
    //选择提醒
    MeetingPage.prototype.selectTip = function () {
        this.navCtrl.push('TipPage', {
            'page': 'MeetingPage',
            'alarm_id': this.rt_alarm_type_id,
            'alarm_name': this.rt_alarm_type,
            'type_app': this.rt_type_app,
            'type_notification': this.rt_type_notification
        });
    };
    //处理所有数据
    MeetingPage.prototype.handleData = function () {
        var myString = "";
        if (!this.name) {
            myString = "    请输入主题";
        }
        if (!this.selectList || this.selectList.length == 0) {
            myString = "    请选择参与人员";
        }
        if (myString != "") {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom(myString, this.toastCtrl);
        }
        else {
            var partner_ids = [];
            if (this.selectList && this.selectList.length > 0) {
                for (var i = 0; i < this.selectList.length; i++) {
                    partner_ids[i] = this.selectList[i].partner_id;
                }
            }
            if (!this.rt_alarm_type_id) {
                this.rt_alarm_type_id = '-1';
            }
            var body = {};
            if (this.rt_allday == true && this.start_date && this.stop_date && this.rt_is_sure_time == false) {
                console.log('start = ' + this.start_date + '  stop = ' + this.stop_date);
                if (new Date(this.start_date.replace(/-/g, "/")).getTime() > new Date(this.stop_date.replace(/-/g, "/")).getTime()) {
                    __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('开始时间不能大于结束时间！', this.toastCtrl);
                    return;
                }
                body = {
                    'uid': this.uid,
                    'rt_is_sure_time': this.rt_is_sure_time,
                    'rt_allday': this.rt_allday,
                    'name': this.name,
                    'rt_meeting_participant': partner_ids,
                    'rt_meeting_start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
                    'rt_meeting_stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
                    'rt_alarm_type': this.rt_alarm_type_id,
                    'rt_location': this.rt_location,
                    'rt_description': this.rt_description,
                    'rt_project_principal': this.rt_project_principal_id,
                    'rt_type_app': this.rt_type_app,
                    'rt_type_notification': this.rt_type_notification,
                    'rt_hint': this.rt_hint,
                    'rt_start_date': this.start_date,
                    'rt_stop_date': this.stop_date
                };
            }
            else {
                if (this.rt_is_sure_time == true) {
                    body = {
                        'uid': this.uid,
                        'rt_is_sure_time': this.rt_is_sure_time,
                        'rt_allday': this.rt_allday,
                        'name': this.name,
                        'rt_meeting_participant': partner_ids,
                        'rt_alarm_type': this.rt_alarm_type_id,
                        'rt_location': this.rt_location,
                        'rt_description': this.rt_description,
                        'rt_project_principal': this.rt_project_principal_id,
                        'rt_type_app': this.rt_type_app,
                        'rt_type_notification': this.rt_type_notification,
                        'rt_meeting_start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
                        'rt_meeting_stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
                        'rt_hint': this.rt_hint,
                    };
                }
                else {
                    if (this.start_datetime && this.stop_datetime) {
                        var startTime = void 0;
                        var stopTime = void 0;
                        if (this.start_datetime.indexOf('T') != -1) {
                            startTime = new Date(this.start_datetime).getTime();
                        }
                        else {
                            startTime = new Date(this.start_datetime.replace(/-/g, "/")).getTime();
                        }
                        if (this.stop_datetime.indexOf('T') != -1) {
                            stopTime = new Date(this.stop_datetime).getTime();
                        }
                        else {
                            stopTime = new Date(this.stop_datetime.replace(/-/g, "/")).getTime();
                        }
                        if (startTime > stopTime) {
                            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('开始时间不能大于结束时间！', this.toastCtrl);
                            return;
                        }
                        if (this.start_datetime.indexOf('T') != -1) {
                            this.start_datetime = this.datePipe.transform(new Date(new Date(this.start_datetime).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
                        }
                        else {
                            this.start_datetime = this.datePipe.transform(new Date(new Date(this.start_datetime.replace(/-/g, "/")).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
                        }
                        if (this.stop_datetime.indexOf('T') != -1) {
                            this.stop_datetime = this.datePipe.transform(new Date(new Date(this.stop_datetime).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
                        }
                        else {
                            this.stop_datetime = this.datePipe.transform(new Date(new Date(this.stop_datetime.replace(/-/g, "/")).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
                        }
                    }
                    body = {
                        'uid': this.uid,
                        'rt_is_sure_time': this.rt_is_sure_time,
                        'rt_allday': this.rt_allday,
                        'name': this.name,
                        'rt_meeting_participant': partner_ids,
                        'rt_meeting_start': this.start_datetime,
                        'rt_meeting_stop': this.stop_datetime,
                        'rt_alarm_type': this.rt_alarm_type_id,
                        'rt_location': this.rt_location,
                        'rt_description': this.rt_description,
                        'rt_project_principal': this.rt_project_principal_id,
                        'rt_type_app': this.rt_type_app,
                        'rt_type_notification': this.rt_type_notification,
                        'rt_hint': this.rt_hint,
                    };
                }
            }
            return body;
        }
    };
    MeetingPage.prototype.addMeeting = function () {
        if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
            this.navCtrl.push('CalendarDeatilpagePage', {
                'isEdit': true,
                'type': 1,
                'meeting_id': this.meeting_id,
                'frontPage': 'MeetingPage'
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('只有负责人和创建人可以添加任务', this.toastCtrl);
        }
    };
    MeetingPage.prototype.lookDetail = function (item) {
        this.navCtrl.push('CalendarDeatilpagePage', {
            'item': item,
            'isEdit': false,
            'type': 1,
            'frontPage': 'MeetingPage'
        });
    };
    MeetingPage.prototype.delete = function () {
        var _this = this;
        if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
            var body = {
                'id': this.item.id,
                'uid': this.uid
            };
            this.firService.delete_meeting(body).then(function (res) {
                // if (res.result.res_code == 1){
                _this.frontPage.data.need_fresh = true;
                _this.navCtrl.pop();
                // }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('只有负责人和创建人可以删除', this.toastCtrl);
        }
    };
    //点击编辑
    MeetingPage.prototype.edit = function () {
        this.title_meeting_two = "会议";
        this.content.resize();
        this.rt_description = this.item.rt_description;
        this.rt_hint = this.item.rt_hint;
        if (this.item.state == false) {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('完成状态不可编辑', this.toastCtrl);
            return;
        }
        if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
            this.isEdit = true;
            this.change = true;
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('只有负责人和创建人可以编辑', this.toastCtrl);
        }
    };
    //编辑完成
    MeetingPage.prototype.changeFinish = function () {
        var _this = this;
        cordova.plugins.Keyboard.close();
        if (this.search) {
            this.search = false;
            return;
        }
        var body = this.handleData();
        body['meeting_id'] = this.item.id;
        this.firService.write_meeting(body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.isEdit = false;
                _this.change = false;
                _this.content.resize();
                _this.item = res.result.res_data;
                _this.item_change();
            }
        });
    };
    //编辑取消
    MeetingPage.prototype.changeCancel = function () {
        cordova.plugins.Keyboard.close();
        if (this.search) {
            this.search = false;
            if (this.select_type == 1) {
                this.selectList = this.storeList;
            }
        }
        else {
            this.isEdit = false;
            this.change = false;
            this.content.resize();
        }
    };
    //标记完成
    MeetingPage.prototype.finish = function () {
        var _this = this;
        if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
            var body = {
                'meeting_id': this.item.id,
                'uid': this.uid,
                'rt_meeting_state': 'open'
            };
            this.firService.change_meeting(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.item = res.result.res_data;
                    _this.item_change();
                }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('只有负责人和创建人可以标记完成', this.toastCtrl);
        }
    };
    //标记为代办
    MeetingPage.prototype.completion_event = function () {
        var _this = this;
        if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
            var body = {
                'meeting_id': this.item.id,
                'uid': this.uid,
                'rt_meeting_state': 'draft'
            };
            this.firService.change_meeting(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.item = res.result.res_data;
                    _this.item_change();
                }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom('只有负责人和创建人可以标记完成', this.toastCtrl);
        }
    };
    MeetingPage.prototype.assembleHTML = function (str) {
        return this.sanitizer.bypassSecurityTrustHtml(str);
    };
    MeetingPage.prototype.changeDate = function (date) {
        if (date) {
            var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
            return new_date;
        }
    };
    MeetingPage.prototype.only_reply_to = function (items) {
        this.navCtrl.push('CalendarChatPage', {
            item: items,
            res_id: this.item.id,
            navCtrl: 'MeetingPage',
            type: 'rt.meeting',
        });
    };
    MeetingPage.prototype.reply_to = function (items) {
        var _this = this;
        if (items.create_uid_id == this.uid) {
            var actionSheet = this.actionSheetCtrl.create({
                title: '是否删除此回复',
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                            _this.firService.delete_reply({ 'uid': _this.uid, 'reply_id': items.msg_id }).then(function (res) {
                                if (res.result.res_code == 1) {
                                    __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("删除成功", _this.toastCtrl);
                                    _this.get_all_data();
                                }
                            });
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            this.navCtrl.push('CalendarChatPage', {
                item: items,
                res_id: this.item.id,
                navCtrl: 'MeetingPage',
                type: 'rt.meeting',
            });
        }
    };
    MeetingPage.prototype.send = function () {
        var _this = this;
        if (this.context_message.length == 0 || this.context_message.match(/^\s+$/g)) {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("回复不可为空", this.toastCtrl);
        }
        else {
            var body = {
                'uid': this.uid,
                'res_id': this.item.id,
                'context': this.context_message,
                'parent_id': false,
                'type': 'rt.meeting',
            };
            this.firService.reply_to(body).then(function (res) {
                if (res.result.res_code == 1) {
                    _this.context_message = '';
                    __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("回复成功", _this.toastCtrl);
                    _this.get_all_data();
                }
            });
        }
    };
    MeetingPage.prototype.refresh_view = function () {
        var _this = this;
        this.firService.get_event_detail({ 'uid': this.uid,
            'event_id': this.item.id }).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.item = res.result.res_data;
            }
        });
    };
    MeetingPage.prototype.click_more = function () {
        var _this = this;
        if (this.rt_meeting_state) {
            var actionSheet = this.actionSheetCtrl.create({
                title: '',
                buttons: [
                    {
                        text: '标记完成',
                        handler: function () {
                            _this.finish();
                        }
                    }, {
                        text: '编辑',
                        handler: function () {
                            _this.edit();
                        }
                    },
                    {
                        text: '删除',
                        handler: function () {
                            _this.delete();
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            var actionSheet = this.actionSheetCtrl.create({
                title: '',
                buttons: [
                    {
                        text: '标记为待办',
                        //  role: 'destructive',
                        handler: function () {
                            _this.completion_event();
                        }
                    },
                    {
                        text: '删除',
                        handler: function () {
                            _this.delete();
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    MeetingPage.prototype.cancel_zan = function (items) {
        var _this = this;
        var body = {
            'uid': this.uid,
            'type': 'delete',
            'msg_id': items.msg_id,
        };
        this.firService.update_zan(body).then(function (res) {
            if (res.result.res_code == 1) {
                _this.get_all_data();
            }
        });
    };
    MeetingPage.prototype.update_zan = function (items) {
        var _this = this;
        var body = {
            'uid': this.uid,
            'type': 'add',
            'msg_id': items.msg_id,
        };
        this.firService.update_zan(body).then(function (res) {
            if (res.result.res_code == 1) {
                _this.get_all_data();
            }
        });
    };
    MeetingPage.prototype.delete_reply = function (items) {
        var _this = this;
        if (items.create_uid_id == this.uid) {
            var actionSheet = this.actionSheetCtrl.create({
                title: '是否删除此回复',
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                            _this.firService.delete_reply({ 'uid': _this.uid, 'reply_id': items.msg_id }).then(function (res) {
                                if (res.result.res_code == 1) {
                                    __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("删除成功", _this.toastCtrl);
                                    _this.get_all_data();
                                }
                            });
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    MeetingPage.prototype.onScroll = function () {
        console.log('111');
        var node = document.getElementById('mytextarea');
        if (node.style.textShadow === '') {
            node.style.textShadow = 'rgba(0,0,0,0) 0 0 0';
        }
        else {
            node.style.textShadow = '';
        }
    };
    MeetingPage.prototype.down_view = function () {
        this.showIcon = false;
    };
    MeetingPage.prototype.up_view = function () {
        this.showIcon = true;
    };
    return MeetingPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"](__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
], MeetingPage.prototype, "content", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('nameInput'),
    __metadata("design:type", Object)
], MeetingPage.prototype, "nameInput", void 0);
MeetingPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-meeting',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/meeting/meeting.html"*/'<!--\n  Generated template for the MeetingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header *ngIf="change || search" no-border>\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only tappable (click)="changeCancel()" style="font-size:14px;color: white;margin-left: 10px">\n                取消\n            </button>\n        </ion-buttons>\n        <ion-buttons right>\n            <button ion-button icon-only tappable (click)="changeFinish()" style="font-size:14px;color: white;margin-right: 10px">\n                完成\n            </button>\n        </ion-buttons>\n        <ion-title style="text-align: center">{{title_meeting_two}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-header *ngIf="!isEdit && !search" no-border>\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n\n        <ion-title>会议</ion-title>\n        <img *ngIf=\'need_show_more_icon\' tappable (click)=\'click_more()\' style="float: right;\n    margin-right: 5px;width: 30px;" src="assets/img/more_btn_white.png" />\n    </ion-navbar>\n</ion-header>\n\n<ion-header *ngIf="isEdit && !change || search" no-border>\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only tappable (click)="cancel()" style="font-size:14px;color: white;margin-left: 10px">\n               取消\n           </button>\n        </ion-buttons>\n        <ion-buttons right>\n            <button ion-button icon-only tappable (click)="stateFinish()" style="font-size:14px;color: white;margin-right: 10px">\n               完成\n           </button>\n        </ion-buttons>\n        <ion-title style="text-align: center">{{title_meeting}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content on-scroll="onScroll()" style="background-color: #f0f2f5" (pan)="panEvent($event)">\n    <div style="background-color: white" *ngIf="search && !showIcon">\n        <div style="justify-content:space-around;white-space: pre-line;width: 100%;display: inline-block;\n            position: relative;top: -12px;">\n            <span round style=\'background-color:#f0f2f5;flex :1 1 100%;color: #999999;font-size: 12px;padding: 0 1rem;height: 20px;\'\n                *ngFor="let item of showPeopleList" ion-button>\n                      {{item.partner_name}}\n            <ion-icon  *ngIf="select_type==1" name="close" style="font-size: 23px;margin-left: 15px;width: 20px" tappable (click)="closePartner(item)"></ion-icon>\n            </span>\n        </div>\n        <ion-input #nameInput type="search" style="width: 100%;border-bottom: #c3c5c9 1px solid;padding-left: 10px;" (ngModelChange)="searchInput($event)"\n            [(ngModel)]="linshiString"></ion-input>\n        <!-- <ion-searchbar #searchbar id="searchbar" placeholder = "搜索"   (search)="searchByKeyword($event)" (ionClear)="clearText()"></ion-searchbar> -->\n        <ion-list>\n            <ion-item no-lines *ngFor=\'let item of employeeList\' tappable (click)="choosePeople(item)" style="border-bottom: #f0f2f5 1px solid;min-height: 25px">\n                <ion-label>{{item.partner_name}}</ion-label>\n            </ion-item>\n        </ion-list>\n    </div>\n    <div *ngIf="!isEdit && !search && !showIcon">\n        <div style="background-color: white">\n            <div style="padding: 1px;border-bottom:#f0f2f5 1px solid;margin-left: 20px;background-color: white">\n                <span style="background-color: #409eff;width: 3px;border-radius: 3px;height: 13px;float: left;margin-top: 18px;margin-left: -12px"></span>\n                <p style="font-size: 14px;color: #2e3133">主题：{{name}}</p>\n            </div>\n        </div>\n        <ion-item-group>\n            <ion-item no-lines style="min-height: 25px;height: 30px;">\n                <p item-start style="color: #2e3133;font-size: 13px">负责人</p>\n                <p item-start style="margin-left: 7%;color: #8d9296;font-size: 13px">{{rt_project_principal}}</p>\n            </ion-item>\n            <ion-item no-lines>\n                <div style="position: relative;margin-bottom: -11px;margin-top: -11px">\n                    <span style="    display: inline-block;position: absolute;\n                      top: calc(50% - 11px);display: inline-block;font-size: 13px"> 参与人员</span>\n                    <div style="justify-content:space-around;white-space: pre-line;width: 80%;display: inline-block;\n                    position: relative;top: -12px;\n                    left: 22%;">\n                        <span round style=\'background-color:#f0f2f5;flex :1 1 100%;color: #999999\' *ngFor="let item of selectList" ion-button>\n                              {{item.partner_name}}\n                      </span>\n                    </div>\n                </div>\n            </ion-item>\n            <ion-item no-lines style="min-height: 25px;height: 30px;" *ngIf=\'rt_is_sure_time\'>\n                <p item-start style="color: #2e3133;font-size: 13px">时间</p>\n                <p item-start style="margin-left: 10%;color: #8d9296;font-size: 13px">时间待定</p>\n            </ion-item>\n            <ion-item no-lines style="min-height: 25px;height: 30px;" *ngIf="!rt_is_sure_time">\n                <p item-start style="color: #2e3133;font-size: 13px">时间</p>\n                <div style="background-color: white;padding: 1px;text-align: left;margin-left: 10%">\n                    <span style="margin-left: 5px;font-size:12px;color:#999999;width:40%;">{{item_start}}</span>\n                    <span style="color:#c2c7cc;font-size: 12px">至</span>\n                    <span style="font-size:12px;color:#999999;width:40%;">{{item_stop}}</span>\n                </div>\n            </ion-item>\n            <ion-item no-lines style="min-height: 25px;height: 30px;">\n                <p item-start style="color: #2e3133;font-size: 13px">提醒</p>\n                <p item-start style="margin-left: 10%;color: #8d9296;font-size: 13px">{{item_tip_name}}</p>\n            </ion-item>\n            <ion-item no-lines style="min-height: 25px;height: 30px;">\n                <p item-start style="color: #2e3133;font-size: 13px">地点</p>\n                <p item-start style="margin-left: 10%;color: #8d9296;font-size: 13px">{{rt_location}}</p>\n            </ion-item>\n        </ion-item-group>\n        <div style="padding: 1px;border-bottom:#f0f2f5 1px solid;border-top:#f0f2f5 1px solid;background-color: white">\n            <p style="margin-left: 15px;font-size: 13px">内容</p>\n            <div [innerHTML]="assembleHTML(rt_description)" style="word-wrap:break-word;color:#8d9296;margin: 5px;padding: 10px;width:90%"></div>\n        </div>\n        <div style="padding: 1px;border-bottom:#f0f2f5 1px solid;background-color: white" *ngIf="isShowTip">\n            <p style="margin-left: 15px;font-size: 13px">提示</p>\n            <div [innerHTML]="assembleHTML(rt_hint)" style="word-wrap:break-word;color:#8d9296;margin: 5px;padding: 10px;width:90%"></div>\n        </div>\n        <div style="background-color: white">\n            <div style="padding: 1px;border-bottom:#f0f2f5 1px solid;margin-left: 20px;background-color: white">\n                <span style="background-color: #409eff;width: 3px;border-radius: 3px;height: 13px;float: left;margin-top: 18px;margin-left: -12px"></span>\n                <p style="font-size: 14px;color: #2e3133">会议任务</p>\n            </div>\n        </div>\n        <ion-item-group no-lines style="background-color: white" *ngIf="rt_meeting_ids && rt_meeting_ids.length>0">\n            <ion-item no-lines tappable (click)="lookDetail(item)" *ngFor="let item of rt_meeting_ids" style="background-color: white;border-bottom:#f0f2f5 1px solid;">\n                <p item-start style="font-size: 12px;width: 40px">{{item.event_time}}</p>\n                <ion-label item-end [ngClass]="{true:\'notFinish\',false:\'finish\'}[item.state]">[{{item.type_name}}]:{{item.subject}}</ion-label>\n            </ion-item>\n        </ion-item-group>\n        <div style="padding: 1px;text-align: center;background-color: white">\n            <button (click)="addMeeting()" ion-button style="border-radius: 34px;height: 2.5em;font-size: 13px" outline>+ 会议任务</button>\n        </div>\n    </div>\n    <div *ngIf="isEdit  && !search && !showIcon">\n        <ion-item no-lines style="min-height: 20px;padding-left: 0px;border-bottom:#f0f2f5 1px solid;">\n            <ion-label style="font-size: 13px;padding-left: 15px">主题\n                <span style="color: red">*</span>\n            </ion-label>\n            <ion-input type="text" text-right style="font-size: 13px;color: #8d9296" [(ngModel)]="name" placeholder="请输入"></ion-input>\n        </ion-item>\n        <ion-item no-lines style="min-height: 20px;border-bottom: #f0f2f5 1px solid;" tappable (click)="selectPartnerId()">\n            <ion-label style="color:#2e3133;font-size:13px;">负责人</ion-label>\n            <p item-end style="font-size: 12px;margin-right: -5px">{{rt_project_principal}}</p>\n            <img item-end src="assets/img/journal_sheet/right_icon.png" style="height:10px;">\n        </ion-item>\n        <button ion-item no-lines tappable (click)="selectPartner()" style="border-bottom:#f0f2f5 1px solid;">\n                    <div style="position: relative;margin-bottom: -11px;margin-top: -11px">\n                      <span style="    display: inline-block;\n                        position: absolute;\n                        top: calc(50% - 11px);display: inline-block;font-size: 13px">参与人员\n                        <span style="color: red">*</span></span>\n                \n                      <div style="justify-content:space-around;white-space: pre-line;width: 200px;display: inline-block;\n                      position: relative;top: -12px;\n                      left: 88px;">\n                        <span round style=\'background-color:#f0f2f5;flex :1 1 100%;color: #999999\' *ngFor="let item of selectList" ion-button>\n                                {{item.partner_name}}\n                        </span>\n                      </div>\n                    </div>\n                \n                  </button>\n        <ion-item no-lines style="min-height: 20px;padding-left: 0px;border-bottom:#f0f2f5 1px solid;">\n            <ion-label style="font-size: 13px;padding-left: 15px">时间待定</ion-label>\n            <ion-toggle [(ngModel)]="rt_is_sure_time" (ionChange)="notSureClick()"></ion-toggle>\n        </ion-item>\n        <ion-item no-lines style="min-height: 20px;padding-left: 0px;border-bottom:#f0f2f5 1px solid;">\n            <ion-label style="font-size: 13px;padding-left: 15px">全天</ion-label>\n            <ion-toggle [(ngModel)]="rt_allday" (ionChange)="allDayClick()"></ion-toggle>\n        </ion-item>\n        <ion-grid *ngIf="!rt_is_sure_time" style="border-bottom: #f0f2f5 10px solid;background-color: white;">\n            <ion-row style="height:45px;text-align:center;">\n                <ion-col col-5>\n                    <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                        <ion-datetime *ngIf="!rt_allday" text-wrap cancelText="取消" doneText="确定" [(ngModel)]="start_datetime" min="2017-01" max="2100-12"\n                            style="width: 170px;color:#5C6166;font-size:12px;word-wrap:break-word;padding-left: 0px;padding-right: 0px;margin-left: 5px"\n                            displayFormat="YYYY年MM月DD日 HH:mm" pickerFormat="YYYY年 MM月 DD日 HH:mm"></ion-datetime>\n                        <ion-datetime *ngIf="rt_allday" text-wrap cancelText="取消" doneText="确定" [(ngModel)]="start_date" min="2017-01" max="2100-12"\n                            style="color:#5C6166;font-size:12px;word-wrap:break-word;overflow:hidden;padding-left: 0px;padding-right: 0px;margin-left: 5px"\n                            displayFormat="YYYY年MM月DD日" pickerFormat="YYYY年 MM月 DD日"></ion-datetime>\n                    </div>\n                </ion-col>\n                <span style="color:#c2c7cc;float: left;height: 48px;line-height: 48px;font-size: 12px;margin-right: 18px">至</span>\n                <ion-col col-5>\n                    <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                        <ion-datetime *ngIf="!rt_allday" text-wrap cancelText="取消" doneText="确定" [(ngModel)]="stop_datetime" min="2017-01" max="2100-12"\n                            style="width: 170px;color:#5C6166;font-size:12px;word-wrap:break-word;overflow:hidden;padding-left: 0px;padding-right: 0px;margin-left: 5px"\n                            displayFormat="YYYY年MM月DD日 HH:mm" pickerFormat="YYYY年 MM月 DD日 HH:mm"></ion-datetime>\n                        <ion-datetime *ngIf="rt_allday" text-wrap cancelText="取消" doneText="确定" [(ngModel)]="stop_date" min="2017-01" max="2100-12"\n                            style="color:#5C6166;font-size:12px;word-wrap:break-word;padding-left: 0px;padding-right: 0px;margin-left: 5px"\n                            displayFormat="YYYY年MM月DD日" pickerFormat="YYYY年 MM月 DD日"></ion-datetime>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n        <ion-item-group *ngIf="!rt_is_sure_time">\n            <ion-item no-lines style="min-height: 20px;border-bottom: #f0f2f5 1px solid;" tappable (click)="selectTip()">\n                <ion-label style="color:#2e3133;font-size:13px;">提醒</ion-label>\n                <p item-end style="font-size: 12px;margin-right: -5px">{{item_tip_name}}</p>\n                <img item-end src="assets/img/journal_sheet/right_icon.png" style="height:10px;">\n            </ion-item>\n        </ion-item-group>\n        <ion-item no-lines style="min-height: 20px;padding-left: 0px;border-bottom:#f0f2f5 1px solid;border-top: #f0f2f5 10px solid;">\n            <ion-label style="font-size: 13px;padding-left: 15px">地点</ion-label>\n            <ion-input type="text" text-right style="font-size: 12px;color: #abb0b4" [(ngModel)]="rt_location" placeholder="请输入"></ion-input>\n        </ion-item>\n        <div style="padding: 1px;background-color: white;border-bottom: #f0f2f5 1px solid">\n            <p style="font-size: 13px;margin-left: 15px">内容</p>\n            <textarea id="mytextarea" [(ngModel)]="rt_description" placeholder="请输入" style="border-bottom: #f0f2f5 30px solid;margin-left: 5px;line-height: 20px;font-size: 12px;color: #abb0b4;height: 100px;padding: 10px;width: 100%;\n                    border-bottom:white 0px solid;\n                    border-top:white 0px solid;\n                    border-left:white 0px solid;\n                    border-right:white 0px solid;overflow-y: visible;height:100px"></textarea>\n        </div>\n        <div style="padding: 1px;border-bottom: #f0f2f5 30px solid;background-color: white;">\n            <p style="font-size: 13px;margin-left: 15px">提示</p>\n            <textarea id="mytextarea" [(ngModel)]="rt_hint" placeholder="请输入" style="margin-left: 5px;line-height: 20px;font-size: 12px;color: #abb0b4;height: 100px;padding: 10px;width: 100%;\n                      border-bottom:white 0px solid;\n                      border-top:white 0px solid;\n                      border-left:white 0px solid;\n                      border-right:white 0px solid;overflow-y: visible;"></textarea>\n        </div>\n    </div>\n    <ion-icon *ngIf="showIcon" name="arrow-down" tappable (click)="down_view()" class="icon_class_down"></ion-icon>\n    <ion-icon *ngIf="!showIcon" name="arrow-up" tappable (click)="up_view()" class="icon_class"></ion-icon>\n    <div *ngIf=\'item && !isEdit && !search && !change\' class="differ_div_class">\n        <div *ngIf=\'item.message_length > 0\'>\n            评论 ( {{item.message_length}} )\n        </div>\n        <div *ngIf=\'item.message_length == 0\'>\n            暂无评论\n        </div>\n    </div>\n\n    <ion-list *ngIf=\'item && !isEdit && !search && !change\' class="message_list">\n        <div *ngFor="let items of item.message_ids" class="div_message">\n            <ion-item no-lines style="height:40px;min-height:50px">\n                <ion-grid style="background:white">\n                    <ion-row>\n                        <ion-col tappable (click)=\'delete_reply(items)\' col-2>\n                            <img src={{items.create_user_ava}} class="img_message_ava">\n                        </ion-col>\n                        <ion-col tappable (click)=\'delete_reply(items)\' col-7>\n                            <p class="name_message">\n                                <span>{{items.create_uid}}</span><span style="margin-left:10px">{{changeDate(items.create_date) | date:\'MM-dd HH:mm\'}}</span>\n                            </p>\n                        </ion-col>\n                        <ion-col col-3>\n                            <img src="assets/img/work_bench/feedback.png" class="reply_small_icon" tappable (click)="only_reply_to(items)">\n                            <img *ngIf=\'items.is_me_zan\' src="assets/img/yi_zan.png" class="zan_small_icon" tappable (click)=\'cancel_zan(items)\'>\n                            <img *ngIf=\'!items.is_me_zan\' src="assets/img/un_zan.png" class="zan_small_icon" tappable (click)=\'update_zan(items)\'>\n                            <span *ngIf=\'items.zan_count >= 0\' class="img_span_class">{{items.zan_count}}</span>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-item>\n            <ion-item tappable (click)=\'delete_reply(items)\' no-lines style="margin-top:-5px">\n                <p text-wrap [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.child_ids.length > 0]" class="">\n                    <span></span><span style="color:#1f6699;"></span><span>{{items.context}}</span>\n                    <!--<ion-grid *ngIf="items.record_images.length > 0" style="margin-top:-5px;margin-bottom:5px">-->\n                    <!--<ion-row style="margin-right:5px;">\n              <ion-col style="height:80px" *ngFor="let image of items.record_images" col-3>\n                <img style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" src={{image}} imageViewer/>\n              </ion-col>\n            </ion-row>-->\n                    <!--</ion-grid>-->\n                </p>\n\n            </ion-item>\n            <!--<ion-item no-lines *ngIf="items.record_type == \'assign\'" style="height:20px;min-height:40px;margin-top:-5px">\n        <p [ngClass]="{true:\'content_message_zhipai\',false:\'content_message_zhipai_no_lines\'}[items.reply_record_line_ids.length > 0]"\n          class="">{{items.content}}</p>\n        <p *ngIf="items.reply_uid.name" [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]"\n          style="color:#1f6699" tappable (click)="clickUser(items.reply_uid)">{{"@" + items.reply_uid.name}}</p>\n        <p *ngIf="!items.reply_uid.name" [ngClass]="{true:\'content_message_empty\',false:\'content_message_empty_no_lines\'}[items.reply_record_line_ids.length > 0]">Empty</p>\n      </ion-item>-->\n\n            <div no-lines *ngFor="let line of items.child_ids;" [ngClass]="{true:\'item_class_image\',false:\'item_calss_one\'}[false]" tappable\n                (click)=\'reply_to(line)\'>\n                <p [ngClass]="{true:\'item_class_image_p\',false:\'item_class_normal_p\'}[false]">\n                    <span style="color:#1f6699;">{{line.create_uid + "："}} </span>\n                    <span style="color:#1f6699;">@{{line.reply_name}} </span>\n                    <span style="color:8a9299">{{line.context}}</span>\n                </p>\n            </div>\n        </div>\n    </ion-list>\n</ion-content>\n\n<ion-footer *ngIf="!isEdit && !search && !change" class="footer_class">\n    <ion-input #contextInput id=\'contextInput\' class="input_class" [(ngModel)]="context_message" placeholder="写下你的评论..."></ion-input>\n    <button ion-button icon-only tappable (click)="send()" class="btn_class">\n                发送\n      </button>\n</ion-footer>\n\n<!--<ion-footer *ngIf="!isEdit" style="border-top:#f0f2f5 1px solid;background-color: white;">\n    <div style="background:white" *ngIf="!isEdit">\n        <span align="center" *ngIf="rt_meeting_state" style=\'width:40%;float:right;background-color:#1897f2;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="finish()">\n        标记完成\n        </span>\n        <span align="center" *ngIf="!rt_meeting_state" style=\'width:40%;float:right;background-color:#1897f2;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="completion_event()">\n        标记为待办\n        </span>\n        <span align="center" *ngIf="!rt_meeting_state" style=\'width: 60%; float:right;height:44px;line-height:44px;font-size:15px;color: #1897f2\' tappable (click)="delete()">\n        删除\n        </span>\n        <span align="center" *ngIf="rt_meeting_state" style=\'width: 30%; float:right;height:44px;line-height:44px;font-size:15px;color: #1897f2\' tappable (click)="delete()">\n        删除\n        </span>\n        <span align="center" *ngIf="rt_meeting_state" style=\'width:30%;float:right;height:44px;line-height:44px;font-size:15px;color: #1897f2\' tappable (click)="edit()">\n        编辑\n        </span>\n    </div>\n</ion-footer>-->'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/meeting/meeting.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_6__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__first_service__["a" /* FirstShowService */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["DomSanitizer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], MeetingPage);

//# sourceMappingURL=meeting.js.map
// CONCATENATED MODULE: ./src/pages/first-show/meeting/meeting.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeetingPageModule", function() { return MeetingPageModule; });
/* harmony import */ var meeting_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var meeting_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var meeting_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MeetingPageModule = (function () {
    function MeetingPageModule() {
    }
    return MeetingPageModule;
}());
MeetingPageModule = meeting_module___decorate([
    meeting_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MeetingPage,
        ],
        imports: [
            meeting_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MeetingPage),
        ],
    })
], MeetingPageModule);

//# sourceMappingURL=meeting.module.js.map

/***/ }),

/***/ 741:
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
//# sourceMappingURL=109.js.map