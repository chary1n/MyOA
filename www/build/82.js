webpackJsonp([82],{

/***/ 653:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gongdanService__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the GongdanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var GongdanPage = (function () {
    function GongdanPage(navCtrl, navParams, statusbar, gongdanService, platform, datePipe, datePicker, toastCtrl, menu, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusbar = statusbar;
        this.gongdanService = gongdanService;
        this.platform = platform;
        this.datePipe = datePipe;
        this.datePicker = datePicker;
        this.toastCtrl = toastCtrl;
        this.menu = menu;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.unacceptTitle = "待受理";
        this.unassignTitle = "待验收";
        this.processTitle = "受理中";
        this.dataList = [];
        this.doneTongji = 0;
        this.checkTongji = 0;
        this.unacceptTongji = 0;
        this.processTongji = 0;
        this.startDate_gongdan = this.datePipe.transform('2018-01-01', 'yyyy-MM-dd');
        this.endDate_gongdan = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.total_number = 0;
        this.more_48_number = 0;
        this.searchAtMeNumber = 0;
        this.biaoqianList = [];
        this.biaoqian_select_ids = [];
        this.tag_ids = [];
        this.department = false;
        this.brand_ids = [];
        this.area_ids = [];
        this.category_ids = [];
        this.inner_type = "all";
        this.is_android = this.platform.is('android');
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.user_id = res.result.res_data.user_id;
            _this.click_gongdan();
            if (res.result.res_data.department) {
                _this.department = true;
            }
            if ((new RegExp("js.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/S-header.png";
            }
            else if ((new RegExp("dr.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/D-header.png";
            }
            else if ((new RegExp("erp.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/R-header.png";
            }
            else if ((new RegExp("ber.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/B-header.png";
            }
        });
    }
    GongdanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GongdanPage');
        // this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    };
    GongdanPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    GongdanPage.prototype.ionViewDidEnter = function () {
        console.log(this.navParams.get('need_fresh'));
        if (this.navParams.get('need_fresh') == true) {
            this.navParams.data.need_fresh = false;
            // this.reload_statics()
            this.getDataList(this.page_issue_state);
        }
        // console.log(this.navParams.get('select_ids') )
        // if (this.navParams.get('select_ids')&&(this.navParams.get('select_ids').length || this.navParams.get('select_ids').length == 0)) {
        //   this.biaoqian_select_ids = this.navParams.data.select_ids
        //   this.navParams.data.select_ids = [];
        //   this.reload_statics()
        //   this.getDataList(this.page_issue_state)
        // }
        var need_load = false;
        if (this.navParams.get('brand_list') && (this.navParams.get('brand_list').length || this.navParams.get('brand_list').length == 0)) {
            this.brand_ids = this.navParams.get('brand_list');
            this.navParams.data.brand_list = false;
            need_load = true;
        }
        if (this.navParams.get('area_list') && (this.navParams.get('area_list').length || this.navParams.get('area_list').length == 0)) {
            this.area_ids = this.navParams.get('area_list');
            this.navParams.data.area_list = false;
            need_load = true;
        }
        if (this.navParams.get('category_list') && (this.navParams.get('category_list').length || this.navParams.get('category_list').length == 0)) {
            this.category_ids = this.navParams.get('category_list');
            this.navParams.data.category_list = false;
            need_load = true;
        }
        if (need_load) {
            this.getDataList(this.page_issue_state);
        }
        if (this.show_type == "me") {
            this.click_me();
        }
    };
    GongdanPage.prototype.click_me = function () {
        var _this = this;
        // this.looper(this.canvas);
        this.show_type = "me";
        this.gongdanService.my_work_order_statistics().then(function (res) {
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.processNumber = res.result.res_data.process;
                _this.unassignNumber = res.result.res_data.check;
            }
            console.log(res);
        });
        this.searchAtMeNumberFunction();
    };
    GongdanPage.prototype.click_gongdan = function () {
        this.endDate_gongdan = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
            this.startDate_gongdan = this.datePipe.transform('2018-01-01', 'yyyy-MM-dd');
        this.dataList = [];
        this.show_type = "gongdan";
        this.inner_type = "all";
        this.getDataList(null);
    };
    GongdanPage.prototype.click_tongji = function () {
        this.show_type = "tongji";
        this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
            this.startDate = new Date().getFullYear() + '-01-01';
        this.dateChanged();
    };
    GongdanPage.prototype.looper = function (canvas) {
        var ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 100;
        //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
        function requestAnimFrame(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
        ;
        // 波浪大小
        var boHeight = canvas.height / 10;
        var posHeight = canvas.height / 1.2;
        //初始角度为0  
        var step = 0;
        //定义三条不同波浪的颜色  
        var lines = [
            "rgba(0,255,255, 0.2)",
            "rgba(200,236,253, 0.2)"
        ];
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            step++;
            //画3个不同颜色的矩形  
            for (var j = lines.length - 1; j >= 0; j--) {
                ctx.fillStyle = lines[j];
                //每个矩形的角度都不同，每个之间相差45度  
                var angle = (step + j * 50) * Math.PI / 180;
                var deltaHeight = Math.sin(angle) * boHeight;
                var deltaHeightRight = Math.cos(angle) * boHeight;
                ctx.beginPath();
                ctx.moveTo(0, posHeight + deltaHeight);
                ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.lineTo(0, posHeight + deltaHeight);
                ctx.closePath();
                ctx.fill();
            }
            requestAnimFrame(loop);
        }
        loop();
    };
    GongdanPage.prototype.goBack = function () {
        this.navCtrl.pop();
        this.statusbar.backgroundColorByHexString("#ffffff");
        this.statusbar.styleDefault();
    };
    GongdanPage.prototype.click_detail = function () {
        this.navCtrl.push('GongdanDetailPage');
    };
    // 我提交的工单  xd
    GongdanPage.prototype.mySubmitList = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            create_uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            contantDraft: true
        });
        this.requestWorkOrderSearch(body, "我提交的");
    };
    // 我受理中的
    GongdanPage.prototype.myProcessList = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            assign_uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            issue_state: "process",
        });
        this.requestWorkOrderSearch(body, "我受理中的");
    };
    // 待他人验收
    GongdanPage.prototype.waitOtherAssign = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            assign_uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            issue_state: "check",
        });
        this.requestWorkOrderSearch(body, '待他人验收的');
    };
    // 我已完成的
    GongdanPage.prototype.myFinished = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            assign_uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            issue_state: "done",
        });
        this.requestWorkOrderSearch(body, "我已完成的");
    };
    // 我回复过的
    GongdanPage.prototype.myReply = function () {
        var body = JSON.stringify({
            isSearchOrder: true,
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            create_uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            record_type: 'reply'
        });
        this.requestWorkOrderSearch(body, "我回复过的");
    };
    // 我指派过的
    GongdanPage.prototype.myAssigned = function () {
        var body = JSON.stringify({
            isSearchOrder: true,
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            create_uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            record_type: 'assign'
        });
        this.requestWorkOrderSearch(body, "我指派过的");
    };
    GongdanPage.prototype.searchAtMe = function () {
        this.navCtrl.push("AtMeListPage");
    };
    GongdanPage.prototype.searchAtMeNumberFunction = function () {
        var _this = this;
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            assign: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            reply: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            isSearchOrder: true,
            isRead: false,
            isNumber: true
        });
        this.gongdanService.searchAtMe(body).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.searchAtMeNumber = res.result.res_data.length;
            }
            else {
                _this.searchAtMeNumber = 0;
            }
        });
    };
    GongdanPage.prototype.more48Hour = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: this.startDate,
            end_date: this.datePipe.transform(new Date(new Date().getTime() - 3600000 * 48), 'yyyy-MM-dd'),
            issue_state: 'unaccept'
        });
        console.log(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
        console.log(body);
        this.requestWorkOrderSearch(body, '超过48小时未受理');
    };
    GongdanPage.prototype.moreThan_48_Hour_number = function () {
        var _this = this;
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: this.startDate,
            end_date: this.datePipe.transform(new Date(new Date().getTime() - 3600000 * 48), 'yyyy-MM-dd'),
            issue_state: 'unaccept'
        });
        this.gongdanService.work_order_searchNoLoading(body).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                if (res.result.res_data) {
                    _this.more_48_number = res.result.res_data.length;
                }
                else {
                    _this.more_48_number = 0;
                }
            }
        });
    };
    GongdanPage.prototype.chooseStartDate = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.startDate),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.endDate >= _this.datePipe.transform(date, 'yyyy-MM-dd')) {
                _this.startDate = _this.datePipe.transform(date, 'yyyy-MM-dd');
                _this.dateChanged();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    GongdanPage.prototype.chooseStartDate_gongdan = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.startDate_gongdan),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.endDate_gongdan >= _this.datePipe.transform(date, 'yyyy-MM-dd')) {
                _this.startDate_gongdan = _this.datePipe.transform(date, 'yyyy-MM-dd');
                // this.reload_statics()
                _this.getDataList(_this.page_issue_state);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    GongdanPage.prototype.chooseEndDate = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.endDate),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.datePipe.transform(date, 'yyyy-MM-dd') >= _this.startDate) {
                _this.endDate = _this.datePipe.transform(new Date(new Date(date).getTime()), 'yyyy-MM-dd');
                _this.dateChanged();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    GongdanPage.prototype.chooseEndDate_gongdan = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.endDate_gongdan),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.datePipe.transform(date, 'yyyy-MM-dd') >= _this.startDate_gongdan) {
                _this.endDate_gongdan = _this.datePipe.transform(date, 'yyyy-MM-dd');
                // this.reload_statics()
                _this.getDataList(_this.page_issue_state);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    GongdanPage.prototype.dateChanged = function () {
        var _this = this;
        this.gongdanService.work_order_statisticsWithTime(this.startDate, this.datePipe.transform(new Date(new Date(this.endDate).getTime() + 3600000 * 24), 'yyyy-MM-dd')).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.processTongji = res.result.res_data.process ? parseInt(res.result.res_data.process) : 0;
                _this.unacceptTongji = res.result.res_data.unaccept ? parseInt(res.result.res_data.unaccept) : 0;
                _this.checkTongji = res.result.res_data.check ? parseInt(res.result.res_data.check) : 0;
                _this.doneTongji = res.result.res_data.done ? parseInt(res.result.res_data.done) : 0;
                var total = _this.processTongji + _this.checkTongji + _this.doneTongji + _this.unacceptTongji;
                _this.total_number = total;
                if (total == 0) {
                    _this.drawRings(0, 0, 0, 1);
                }
                else {
                    _this.drawRings(_this.processTongji / total, _this.unacceptTongji / total, _this.checkTongji / total, _this.doneTongji / total);
                }
            }
        });
        this.moreThan_48_Hour_number();
    };
    GongdanPage.prototype.requestWorkOrderSearch = function (body, title) {
        var _this = this;
        if (title === void 0) { title = ""; }
        this.gongdanService.work_order_search(body).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push("MyGongdanListPage", { gongdanList: res.result.res_data, title: title });
            }
        });
    };
    GongdanPage.prototype.processTongjiWithTime = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: this.startDate,
            end_date: this.endDate,
            issue_state: 'process'
        });
        this.requestWorkOrderSearch(body);
    };
    GongdanPage.prototype.doneTongjiWithTime = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: this.startDate,
            end_date: this.endDate,
            issue_state: 'done'
        });
        this.requestWorkOrderSearch(body);
    };
    GongdanPage.prototype.checkTongjiWithTime = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: this.startDate,
            end_date: this.endDate,
            issue_state: 'check'
        });
        this.requestWorkOrderSearch(body);
    };
    GongdanPage.prototype.unacceptTongjiWithTime = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: this.startDate,
            end_date: this.endDate,
            issue_state: 'unaccept'
        });
        this.requestWorkOrderSearch(body);
    };
    GongdanPage.prototype.createGongdan = function () {
        if (this.department) {
            this.navCtrl.push("CreateGongdanPage");
        }
        else {
            var ctrl = this.alertCtrl;
            ctrl.create({
                title: '提示',
                subTitle: "该用户没有设置员工,请联系管理员",
                buttons: [{
                        text: '确定',
                        handler: function () {
                        }
                    }
                ]
            }).present();
        }
    };
    GongdanPage.prototype.drawRings = function (a, b, c, d) {
        var data = [a, b, c, d]; //五个扇形的占比
        var dataColor = ["#1897f2", '#faa619', '#fce63a', '#c3e369']; //五个扇形的颜色
        var angleStart = 0, angleEnd, angle;
        var Q3Canvas = document.getElementById('rings');
        Q3Canvas.width = 200;
        Q3Canvas.height = 200;
        var ctx = Q3Canvas.getContext("2d");
        for (var i = 0; i < data.length; i++) {
            angle = 2 * Math.PI * data[i];
            angleEnd = angleStart + angle;
            ctx.beginPath();
            ctx.fillStyle = dataColor[i];
            ctx.arc(Q3Canvas.width / 2, Q3Canvas.height / 2, Q3Canvas.width / 2, angleStart, angleEnd);
            ctx.lineTo(Q3Canvas.width / 2, Q3Canvas.height / 2);
            ctx.closePath();
            ctx.fill();
            angleStart = angleEnd; //设置画下一个扇形的起点位置
        }
        ;
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(Q3Canvas.width / 2, Q3Canvas.height / 2, Q3Canvas.width / 4, 0, 360);
        ctx.closePath();
        ctx.fill();
    };
    GongdanPage.prototype.changeState = function (item) {
        var state_str = "";
        if (item == "unaccept") {
            state_str = "待受理";
        }
        else if (item == "process") {
            state_str = "受理中";
        }
        else if (item == "check") {
            state_str = "待验收";
        }
        else if (item == "done") {
            state_str = "已完成";
        }
        else if (item == "draft") {
            state_str = "草稿";
        }
        return state_str;
    };
    GongdanPage.prototype.unacceptClick = function () {
        this.getDataList("unaccept");
    };
    GongdanPage.prototype.processClick = function () {
        this.getDataList("process");
    };
    GongdanPage.prototype.unassignClick = function () {
        this.getDataList("check");
    };
    GongdanPage.prototype.allClick = function () {
        this.getDataList(null);
    };
    GongdanPage.prototype.getDataList = function (state) {
        var _this = this;
        this.dataList = [];
        this.page_issue_state = state;
        this.gongdanService.work_order_search(JSON.stringify({
            start_date: this.startDate_gongdan,
            end_date: this.datePipe.transform(new Date(new Date(this.endDate_gongdan).getTime() + 3600000 * 24), 'yyyy-MM-dd'),
            uid: this.user_id,
            issue_state: state,
            category_ids: this.category_ids,
            brand_ids: this.brand_ids,
            area_ids: this.area_ids,
        })).then(function (res) {
            console.log(res);
            if (res.result.res_data) {
                for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                    var item = _a[_i];
                    _this.dataList.push(item);
                }
            }
        });
        this.reload_statics();
    };
    GongdanPage.prototype.gongdanDetail = function (item) {
        var _this = this;
        this.gongdanService.getGongdanDetail(item.work_order_id).then(function (res) {
            console.log(res);
            if (res.result.res_data && res.result.res_code == 1) {
                _this.navCtrl.push('GongdanDetailPage', {
                    items: res.result.res_data,
                    biaoqian_list: _this.biaoqianList,
                });
            }
        });
    };
    GongdanPage.prototype.search_gongdan = function () {
        this.navCtrl.push("GongdanSearchPage");
    };
    GongdanPage.prototype.clickMenu = function () {
        this.navCtrl.push('GongdanBiaoqianPage', {
            brand_ids: this.brand_ids,
            area_ids: this.area_ids,
            category_ids: this.category_ids,
        });
        // this.menu.open()
        // this.gongdanService.get_all_biaoqian().then(res => {
        //   console.log(res)
        //   if (res.result.res_data && res.result.res_code == 1) {
        //     this.biaoqianList = res.result.res_data.res_data;
        //   }
        // })
    };
    GongdanPage.prototype.changeDate = function (date) {
        if (date) {
            var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
            return new_date;
        }
    };
    GongdanPage.prototype.reload_statics = function () {
        var _this = this;
        this.gongdanService.work_order_statistics(this.startDate_gongdan, this.datePipe.transform(new Date(new Date(this.endDate_gongdan).getTime() + 3600000 * 24), 'yyyy-MM-dd'), this.brand_ids, this.area_ids, this.category_ids, this.user_id).then(function (res) {
            if (res.result.res_data) {
                if (res.result.res_data.unaccept) {
                    _this.unacceptTitle = "待受理" + " " + res.result.res_data.unaccept;
                }
                else {
                    _this.unacceptTitle = "待受理";
                }
                if (res.result.res_data.check) {
                    _this.unassignTitle = "待验收" + " " + res.result.res_data.check;
                }
                else {
                    _this.unassignTitle = "待验收";
                }
                if (res.result.res_data.process) {
                    _this.processTitle = "受理中" + " " + res.result.res_data.process;
                }
                else {
                    _this.processTitle = "受理中";
                }
            }
            else {
                _this.unacceptTitle = "待受理";
                _this.unassignTitle = "待验收";
                _this.processTitle = "受理中";
            }
        });
    };
    GongdanPage.prototype.click_all = function () {
        this.inner_type = "all";
        this.allClick();
    };
    GongdanPage.prototype.click_one = function () {
        this.inner_type = "first";
        this.unacceptClick();
    };
    GongdanPage.prototype.click_two = function () {
        this.inner_type = "second";
        this.processClick();
    };
    GongdanPage.prototype.click_three = function () {
        this.inner_type = "third";
        this.unassignClick();
    };
    GongdanPage.prototype.changeSelectStartDate = function (event) {
        if (this.endDate_gongdan >= this.datePipe.transform(event, 'yyyy-MM-dd')) {
            this.startDate_gongdan = this.datePipe.transform(event, 'yyyy-MM-dd');
            this.reload_statics();
            this.getDataList(this.page_issue_state);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", this.toastCtrl);
        }
    };
    GongdanPage.prototype.changeSelectEndDate = function (event) {
        if (this.datePipe.transform(event, 'yyyy-MM-dd') >= this.startDate_gongdan) {
            this.endDate_gongdan = this.datePipe.transform(event, 'yyyy-MM-dd');
            this.reload_statics();
            this.getDataList(this.page_issue_state);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", this.toastCtrl);
        }
    };
    return GongdanPage;
}());
GongdanPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-gongdan',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan.html"*/'<!--\n  Generated template for the GongdanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-header no-border>\n\n  <ion-navbar hideBackButton="true" color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button icon-only>\n        <img style="width:30px" src={{company_type}} />\n      </button>\n    </ion-buttons>\n\n    <div align="center" style="height:30px;margin-left:10px">\n        <div style="width:33%;float:right;text-align:left" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'tongji\']" align="center" tappable (click)="click_tongji()">\n        统计\n        </div>\n        <div style="width:33%;float:right" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'gongdan\']" align="center" tappable (click)="click_gongdan()">\n        工单池\n        </div>\n        <div style="width:33%;float:left;text-align:right" [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'me\']" align="center" tappable (click)="click_me()">\n        我的\n        </div> \n    </div>\n\n    <!--<ion-grid [ngClass]="{true:\'head_grid_android\',false:\'head_grid_ios\'}[is_android]">\n      <ion-row [ngClass]="{true:\'row_class_android\',false:\'row_class_ios\'}[is_android]" align-items-center>\n        <ion-col tappable (click)="click_me()">\n          <div align="center">\n            <p [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'me\']" >我的</p>\n          </div>\n        </ion-col>\n        <ion-col tappable (click)="click_gongdan()">\n          <div align="center">\n            <p [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'gongdan\']" >工单池</p>\n          </div>\n        </ion-col>\n\n        <ion-col tappable (click)="click_tongji()">\n          <div align="center">\n            <p [ngClass]="{true:\'test_choose\',false:\'test_one\'}[show_type == \'tongji\']" >统计</p>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>-->\n    <ion-buttons style="margin-right:11px" end>\n      <button ion-button icon-only (click)="search_gongdan()">\n        <img style="width:20px" src="assets/img/work_bench/search_icon.png" />\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  \n</ion-header>\n\n\n<ion-content [ngClass]="{true:\'back_me\',false:\'back_other\'}[show_type == \'me\']">\n  <div style="height:40px;overflow: hidden;background:white;" *ngIf="show_type == \'gongdan\'">\n      \n      <img src= "assets/img/gongdan/rili.png" height="18px" width="18px" style="margin-left:10px;margin-top:11px;float:left">\n      <p style="float:left;margin-left:10px;line-height:14px;color:gray">\n        <span tappable (click)="chooseStartDate_gongdan()">{{startDate_gongdan + " - "}}</span><span tappable (click)="chooseEndDate_gongdan()">{{endDate_gongdan}}</span>   \n      </p>\n      <img src= "assets/img/work_bench/shaixuan.png" height="18px" width="18px" style="margin-right:10px;margin-top:11px;float:right" tappable (click)="clickMenu()">\n      <p tappable (click)="clickMenu()" style="float:right;margin-top:10px;color:gray;margin-right:5px;border-left:#f0f2f5 1px solid;width:40px;text-align:right">筛选</p>\n    </div>\n  <div *ngIf="show_type == \'gongdan\'" style="margin-top:-1px">\n    <ion-item align="center" no-lines style="margin-top:10px;height:40px;min-height:40px;border-bottom:#f0f2f5 1px solid;width:101%;margin-left:-2px;margin-right:-4px;">\n\n  <ion-grid style="background-color:white;">\n      <!--<ion-row [ngClass]="{true:\'row_class_android\',false:\'row_class_ios\'}[is_android]" align-items-center>\n        <ion-col tappable>\n          <div align="center" tappable (click)="unacceptClick()">\n            <img class="sub_header" src="assets/img/work_bench/wait_shouli.png">\n            <br>\n            <p class="sub_header_p"></p>\n          </div>\n        </ion-col>\n        <ion-col tappable >\n          <div align="center" tappable (click)="processClick()">\n            <img class="sub_header" src="assets/img/work_bench/shouli_ing.png">\n            <br>\n            <p class="sub_header_p"></p>\n          </div>\n        </ion-col>\n        <ion-col tappable >\n          <div align="center" tappable (click)="unassignClick()">\n            <img class="sub_header" src="assets/img/work_bench/wait_yanshou.png">\n            <br>\n            <p class="sub_header_p"></p>\n          </div>\n        </ion-col>\n      </ion-row>-->\n\n\n      <ion-row class="row_class" align-items-center>\n        <ion-col tappable (click) = "click_all()">\n        <div align="center" >\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'all\']">全部</p> \n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'first\']">{{unacceptTitle}}</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'second\']">{{processTitle}}</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_three()">\n        <div align="center" >\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'third\']">{{unassignTitle}}</p> \n        </div>\n      </ion-col>\n      \n      </ion-row>\n    </ion-grid>\n    </ion-item>\n</div>\n\n  <div *ngIf="show_type == \'gongdan\'">\n    \n    <ion-item-group no-lines class="item_group_class" >\n      <div *ngFor="let item of dataList" style="margin-top:10px;background-color:white" tappable (click)="gongdanDetail(item)">\n        <div>\n          <img *ngIf="item.priority == 3" src="assets/img/work_bench/up_one.png" class="priority_icon">\n          <img *ngIf="item.priority == 2" src="assets/img/work_bench/up_two.png" class="priority_icon">\n          <img *ngIf="item.priority == 1" src="assets/img/work_bench/up_three.png" class="priority_icon">\n          <span class="title_class_style">\n            {{item.title}}\n          </span>\n          <span p class="data_list_state">\n            {{changeState(item.issue_state)}}\n          </span>\n        </div>\n        <P text-wrap class="data_list_desprition">\n          {{item.description}}\n        </P>\n        <ion-grid *ngIf="item.work_order_images" style="margin-top:-20px;margin-left:5px">\n          <ion-row style="margin-right:5px;">\n            <ion-col style="height:80px" *ngFor="let image of item.work_order_images" col-3>\n              <img src={{image}} style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" imageViewer/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <div class="creater_div">\n          <img src={{item.create_user.user_ava}} class="create_ava">\n          <span p class="creater_name">\n            {{item.create_user.name + " " + (changeDate(item.create_time) | date:\'MM-dd HH:mm\')}}\n          </span>\n          <div style="margin-right:10px;float:right;margin-top:2px">\n            <img style="width:15px;" src="assets/img/work_bench/feedback.png" />\n            <p style="font-size:14px;color:#c2c8cc;float:right;margin-top:-1px;margin-left:5px">{{item.comment_count}}</p>\n          </div>\n          <!--<span *ngIf="item.assign_user.name" class="assign_name">\n            {{"受理人： "+ item.assign_user.name}}\n          </span>\n          <span *ngIf="!item.assign_user.name" class="assign_name">\n            未指派受理人\n          </span>-->\n          <!--<img *ngIf="item.assign_user.name" src="assets/img/work_bench/lianjie.png" class="assign_ava">-->\n        </div>\n        <div style="height:1px;background:white">\n        </div>\n      </div>\n    </ion-item-group>\n    <div align="center" *ngIf="!dataList.length || dataList.length == 0">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/nodataimg.png">\n      <p style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">空空如也～</p>\n    </div>\n  </div>\n  <div  *ngIf="show_type == \'me\'">\n    <ion-fab style="margin-bottom:90px;position:fixed;" bottom right edge>\n    <button style="box-shadow:1px 2px 10px #888888" (click)="createGongdan()" ion-fab mini><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n    <div style="width:100%;height:139px;padding:15px;text-align:center;background:#1897f2">\n      <!-- <canvas \n     style="background:#ffffff;height:80px;width:100%;position:absolute;top:0px;left:0px;z-index:1;" id="canvas"> -->\n      <div style="text-align:center; border-radius: 5px;background:white;margin-top:-37px;height:100%">\n        <div style="position:relative;width:70px;margin:0 auto;margin-top:30px" taggable (click)="searchAtMe()">\n          <img style="margin-top:16px ;width:50px " src="assets/img/gongdan/xiaoxi.png">\n          <div style="margin-top:1px">我的消息</div>\n          <span *ngIf="searchAtMeNumber"   style="position:absolute;\n          width:20px;height:20px;border-radius:10px;background-color:red;\n          display:inline-block;color:white;line-height:20px;right:-6px;top:11px;text-align:center;font-size:12px">{{searchAtMeNumber}}</span>\n        </div>\n      </div>\n    </div>\n    <div >\n    <!--<ion-list style="background-color:white;">-->\n      <div style="height:10px;background:white">\n\n      </div>\n\n      <button ion-item (click)="mySubmitList()" >\n        <ion-avatar item-start>\n          <img src="assets/img/gongdan/myApply.png" class="imgStyle"  style=" border-radius: 0px;    width: 29px;\n          height: 29px; ">\n        </ion-avatar>\n        <ion-label>我提交的</ion-label>\n      </button>\n\n      <button ion-item (click)="myProcessList()">\n        <ion-avatar item-start>\n          <img src="assets/img/gongdan/shouli.png" class="imgStyle"   style=" border-radius: 0px;     width: 29px;\n          height: 29px;">\n        </ion-avatar>\n        <ion-label>我受理中的\n          <span style="float:right;color:#bbc3cc"> {{processNumber}}</span>\n        </ion-label>\n      </button>\n\n      <button ion-item (click)="waitOtherAssign()">\n        <ion-avatar item-start>\n          <img src="assets/img/gongdan/daiyanshou.png" class="imgStyle"  style=" border-radius: 0px;    width: 29px;\n          height: 29px; ">\n        </ion-avatar>\n        <ion-label>待他人验收的\n          <span style="float:right;color:#bbc3cc"> {{unassignNumber}}</span>\n        </ion-label>\n      </button>\n\n      <button ion-item (click)="myFinished()">\n        <ion-avatar item-start>\n          <img src="assets/img/gongdan/yiwancheng.png" class="imgStyle" style=" border-radius: 0px;    width: 29px;\n          height: 29px; ">\n        </ion-avatar>\n        <ion-label>我已完成的</ion-label>\n      </button>\n\n      <button ion-item (click)="myReply()">\n        <ion-avatar item-start>\n          <img src="assets/img/gongdan/huifu.png" class="imgStyle" style=" border-radius: 0px;     width: 29px;\n          height: 29px;">\n        </ion-avatar>\n        <ion-label>我回复过的</ion-label>\n      </button>\n\n      <button ion-item (click)="myAssigned()" no-lines>\n        <ion-avatar item-start>\n          <img src="assets/img/gongdan/zhipai.png" class="imgStyle" style=" border-radius: 0px;    width: 29px;\n          height: 29px; ">\n        </ion-avatar>\n\n        <ion-label>我指派过的\n\n        </ion-label>\n      </button>\n      <div style="background:#f0f2f5;width:100%;height:200px">\n      </div>\n    <!--</ion-list>-->\n    </div>\n\n  </div>\n  <div *ngIf="show_type == \'tongji\'" style="background:#f0f2f5">\n    <div style="height:40px;overflow: hidden;background:white;padding-top:8px">\n     \n      <img src= "assets/img/gongdan/rili.png"  width="18px" style="margin-left:10px;">\n      <span style="margin-left:10px;width:60px" tappable (click)="chooseStartDate()">\n          {{startDate}} \n      </span>\n        -\n      <span tappable (click)="chooseEndDate()" tappable style="width:60px">\n        {{endDate}}\n      </span>\n\n      <span style="width:100px;text-align:right;margin-right:20px;margin-left:70px">\n        发布总数:{{total_number}}\n      </span>\n\n    </div>\n  \n    <div style="background:#ffffff;height:157px;margin-top:10px">\n        <div style="background:#ffffff;height:1px"  ></div>\n      <div style="float:right; margin-right:60px">\n        <canvas id="rings" style="width:100px;height:100px;margin-top:23px"></canvas>\n      </div>\n      <div>\n        <div class="div_x" (click)="processTongjiWithTime()" >\n          <span class="div_span_number"> {{processTongji}}</span>\n          <span class="div_span">受理中</span>\n          <div class="small_rang" style="background:#1897f2 "> </div>\n        </div>\n        <div class="div_x"  (click)="unacceptTongjiWithTime()">\n          <span class="div_span_number"> {{unacceptTongji}}</span>\n          <span class="div_span">未受理</span>\n          <div class="small_rang" style="background:#faa619 "> </div>\n        </div>\n\n        <div class="div_x"  (click)="checkTongjiWithTime()">\n          <span>\n            <span class="div_span_number"> {{checkTongji}}</span>\n            <span class="div_span">待验收</span>\n            <div class="small_rang" style="background:#fce63a "> </div>\n          </span>\n        </div>\n        <div class="div_x"  (click)="doneTongjiWithTime()">\n          <span class="div_span_number"> {{doneTongji}}</span>\n          <span class="div_span">已完成</span>\n          <div class="small_rang" style="background:#c3e369 "> </div>\n        </div>\n      </div>\n    </div>\n\n    <button ion-item (click)="more48Hour()" style="margin-top:10px" no-lines>\n      <ion-avatar item-start>\n        <img src="assets/img/gongdan/tixing.png" style="padding:10px">\n      </ion-avatar>\n      <ion-label no-lines>超过48小时未受理\n        <span style="float:right"> {{more_48_number}}</span>\n      </ion-label>\n    </button>\n\n  </div>\n</ion-content>\n\n<!--\n<ion-footer style="background:#f0f2f5" *ngIf="show_type == \'me\'"  no-border>\n  <button ion-button tappable style=\'width:70%;margin-left:15%\'   round (click)="createGongdan()">\n    新建工单\n  </button>\n</ion-footer>-->\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_6__angular_common__["DatePipe"]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_common__["DatePipe"],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_date_picker__["a" /* DatePicker */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["u" /* MenuController */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
], GongdanPage);

//# sourceMappingURL=gongdan.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GongdanPageModule", function() { return GongdanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer_dist_es2015_src_module__ = __webpack_require__(244);
var gongdan_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GongdanPageModule = (function () {
    function GongdanPageModule() {
    }
    return GongdanPageModule;
}());
GongdanPageModule = gongdan_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            GongdanPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(GongdanPage), __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer_dist_es2015_src_module__["a" /* IonicImageViewerModule */]
        ],
    })
], GongdanPageModule);

//# sourceMappingURL=gongdan.module.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GongDanService; });
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


var GongDanService = (function () {
    function GongDanService(httpservice) {
        this.httpservice = httpservice;
    }
    GongDanService.prototype.create_work_order = function (body) {
        return this.httpservice.postBody("create_work_order", body, 1);
    };
    GongDanService.prototype.my_work_order_statistics = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("my_work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_search = function (body) {
        return this.httpservice.postBody("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_searchNoLoading = function (body) {
        return this.httpservice.postBodyNoLoading("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_statistics = function (start_date, end_date, brand_ids, area_ids, category_ids, user_id) {
        var body = JSON.stringify({
            uid: user_id,
            start_date: start_date,
            end_date: end_date,
            brand_ids: brand_ids,
            area_ids: area_ids,
            category_ids: category_ids,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_statistics_search = function (start_date, end_date, tag_ids, search_type, search_text) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date,
            tag_ids: tag_ids,
            search_type: search_type,
            search_text: search_text,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics_search", body, 1);
    };
    GongDanService.prototype.work_order_statisticsWithTime = function (start_date, end_date) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date
        });
        return this.httpservice.postBody("work_order_statistics", body, 1);
    };
    GongDanService.prototype.searchAtMe = function (body) {
        return this.httpservice.postBodyNoLoading("searchAtMe", body, 1);
    };
    GongDanService.prototype.searchAtMeWithLoading = function (body) {
        return this.httpservice.postBody("searchAtMe", body, 1);
    };
    GongDanService.prototype.getDepartment = function () {
        var body = JSON.stringify({
            partner_id: 1
        });
        return this.httpservice.postBody("get_all_departments", body);
    };
    GongDanService.prototype.getGongdanDetail = function (id) {
        var body = JSON.stringify({
            work_order_id: id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("work_order_search_by_id", body, 1);
    };
    GongDanService.prototype.work_order_add_record = function (content, reply_uid, record_type, work_order_id, parent_id, record_imgs) {
        var body = JSON.stringify({
            content: content,
            reply_uid: reply_uid,
            record_type: record_type,
            work_order_id: work_order_id,
            parent_id: parent_id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            record_imgs: record_imgs,
        });
        return this.httpservice.postBody("work_order_add_record", body, 1);
    };
    GongDanService.prototype.get_all_employees = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_employees", body);
    };
    GongDanService.prototype.get_department_employees = function (department_ids) {
        var body = JSON.stringify({
            department_ids: department_ids
        });
        return this.httpservice.postBody("get_department_employees", body);
    };
    GongDanService.prototype.work_order_action = function (uid, work_order_id, action_type, assign_uid) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            action_type: action_type,
            assign_uid: assign_uid,
        });
        return this.httpservice.postBody("work_order_action", body, 1);
    };
    GongDanService.prototype.work_order_retract = function (uid, work_order_id, need_unlink) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            need_unlink: need_unlink,
        });
        return this.httpservice.postBody("work_order_retract", body, 1);
    };
    GongDanService.prototype.commit_draft = function (body) {
        return this.httpservice.postBody("commit_draft", body, 1);
    };
    GongDanService.prototype.search_gongdan = function (search_text, search_type) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            search_text: search_text,
            search_type: search_type,
        });
        return this.httpservice.postBody("search_gongdan", body, 1);
    };
    GongDanService.prototype.get_all_biaoqian = function () {
        return this.httpservice.postBody("get_all_biaoqian", {}, 1);
    };
    GongDanService.prototype.update_biaoqian = function (work_order_id, category_ids, brand_ids, area_ids) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            work_order_id: work_order_id,
            category_ids: category_ids,
            brand_ids: brand_ids,
            area_ids: area_ids,
        });
        return this.httpservice.postBody("update_biaoqian", body, 1);
    };
    GongDanService.prototype.get_employee_detail = function (user_id) {
        var body = JSON.stringify({
            user_id: user_id,
        });
        return this.httpservice.postBody("get_employee_detail", body, 1);
    };
    GongDanService.prototype.search_biaoqian = function (search_type, search_text) {
        var body = JSON.stringify({
            search_type: search_type,
            search_text: search_text
        });
        return this.httpservice.postBody("search_biaoqian", body, 1);
    };
    return GongDanService;
}());
GongDanService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], GongDanService);

//# sourceMappingURL=gongdanService.js.map

/***/ })

});
//# sourceMappingURL=82.js.map