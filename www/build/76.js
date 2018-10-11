webpackJsonp([76],{

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/visit-list/visit-list.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__writejournalService__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_date_picker__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the VisitListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitListPage = (function () {
    function VisitListPage(navCtrl, navParams, statusBar, datePicker, storage, writejournalService, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.datePicker = datePicker;
        this.storage = storage;
        this.writejournalService = writejournalService;
        this.toastCtrl = toastCtrl;
        this.dataList = [];
        this.isMine = false;
        this.team_list = [];
        this.isShowNull = false;
        this.admin = false;
        this.manager = false;
        this.person_id = -1;
        this.startDate_visit = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(), 'yyyy-MM-dd');
        this.endDate_visit = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(), 'yyyy-MM-dd');
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            if (res.result.res_data.team) {
                _this.saleTeam = res.result.res_data.team.team_name;
                _this.team_id = res.result.res_data.team.team_id;
                _this.getStartList();
            }
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == "group_sale_manager") {
                    _this.admin = true;
                    _this.getStartList();
                    break;
                }
                if (product.name == "group_sale_salesman_all_leads") {
                    _this.manager = true;
                    _this.writejournalService.get_sale_team(_this.user_id).then(function (res) {
                        if (res.result.res_code == 1 && res.result) {
                            console.log(res);
                            var list = res.result.res_data;
                            var length = list.length;
                            for (var i = 0; i < length; i++) {
                                _this.team_list[i] = list[i].team_id;
                            }
                            _this.getStartList();
                        }
                    });
                }
            }
            //请求team成员
            var body = {
                team_id: _this.team_id
            };
            _this.writejournalService.get_saleteam_person(body).then(function (res) {
                if (res.result.res_code == 1 && res.result) {
                    console.log(res);
                    _this.teamGroup = res.result.res_data;
                }
            });
        });
    }
    //初始请求
    VisitListPage.prototype.getStartList = function () {
        var _this = this;
        var bodyone = {
            today: true,
            todayTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(), 'yyyy-MM-dd'),
            uid: this.user_id,
            team_id: this.team_id,
            admin: this.admin,
            manager: this.manager,
            team_list: this.team_list
        };
        this.writejournalService.get_visit_list(bodyone).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.dataList = res.result.res_data;
            }
        });
    };
    VisitListPage.prototype.ionViewDidEnter = function () {
        console.log('visit   person_id = ' + this.navParams.get('person_id'));
        console.log('visit   team_id = ' + this.navParams.get('team_id'));
        if (this.navParams.get('person_id') || this.navParams.get('team_id')) {
            this.admin = false;
            this.manager = false;
            this.person_id = this.navParams.get('person_id');
            this.team_id = this.navParams.get('team_id');
            this.navParams.data.person_id = false;
            this.navParams.data.team_id = false;
            this.getList();
        }
    };
    VisitListPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    VisitListPage.prototype.getList = function () {
        var _this = this;
        this.dataList = [];
        var body;
        if (this.person_id == -1) {
            body = {
                startTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
                endTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
                uid: this.user_id,
                team_id: this.team_id,
                admin: this.admin,
                manager: this.manager,
                team_list: this.team_list
            };
        }
        else {
            body = {
                mine: true,
                startTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
                endTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
                uid: this.person_id,
                team_id: this.team_id,
                admin: this.admin,
                manager: this.manager,
                team_list: this.team_list
            };
        }
        this.writejournalService.get_visit_list(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.dataList = res.result.res_data;
            }
        });
    };
    VisitListPage.prototype.getTime = function (startT, endT) {
        // return Utils.dateFormat(new Date(startT), 'yyyy-MM-dd HH:mm')+" ~ "+Utils.dateFormat(new Date(endT), 'HH:mm')
        return startT + "~" + endT.split(" ")[1];
    };
    VisitListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitListPage');
    };
    VisitListPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    //筛选
    VisitListPage.prototype.clickMenu = function () {
        this.navCtrl.push('VisitBiaoqianPage', {
            item: this.teamGroup,
            team_id: this.team_id
        });
    };
    VisitListPage.prototype.chooseStartDate_visit = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.startDate_visit),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.endDate_visit >= __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(date), 'yyyy-MM-dd')) {
                _this.startDate_visit = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(date), 'yyyy-MM-dd');
                _this.dateChanged();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    VisitListPage.prototype.chooseEndDate_visit = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.endDate_visit),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (__WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(date), 'yyyy-MM-dd') >= _this.startDate_visit) {
                _this.endDate_visit = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(date), 'yyyy-MM-dd');
                _this.dateChanged();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    //日期更改后刷新数据
    VisitListPage.prototype.dateChanged = function () {
        var _this = this;
        var body;
        if (this.person_id == -1) {
            body = {
                startTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
                endTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
                uid: this.user_id,
                team_id: this.team_id,
                admin: this.admin,
                manager: this.manager,
                team_list: this.team_list
            };
        }
        else {
            body = {
                mine: true,
                startTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
                endTime: __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
                uid: this.person_id,
                team_id: this.team_id,
                admin: this.admin,
                manager: this.manager,
                team_list: this.team_list
            };
        }
        this.writejournalService.get_visit_list(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.dataList = res.result.res_data;
            }
        });
    };
    VisitListPage.prototype.visitDetail = function (item) {
        this.navCtrl.push('VisitDetailPage', {
            item: item
        });
    };
    return VisitListPage;
}());
VisitListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-visit-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/visit-list/visit-list.html"*/'<!--\n  Generated template for the VisitListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>拜访记录</ion-title>\n    \n    <!-- <ion-buttons right>\n        <button ion-button (click)="getMine()" style="color:white;font-size:14px">\n            {{person}}\n          </button>\n    </ion-buttons> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f2f5">\n    <div style="height:40px;overflow: hidden;background:white;">\n      \n        <img src= "assets/img/gongdan/rili.png" height="18px" width="18px" style="margin-left:10px;margin-top:11px;float:left">\n        <p style="float:left;margin-left:10px;line-height:14px;color:#8A9199">\n          <span tappable (click)="chooseStartDate_visit()">{{startDate_visit + " - "}}</span><span tappable (click)="chooseEndDate_visit()">{{endDate_visit}}</span>   \n        </p>\n        <img src= "assets/img/work_bench/shaixuan.png" height="18px" width="18px" style="margin-right:10px;margin-top:11px;float:right" tappable (click)="clickMenu()">\n        <p tappable (click)="clickMenu()" style="float:right;margin-top:10px;color:gray;margin-right:5px;border-left:#f0f2f5 1px solid;width:40px;text-align:right">筛选</p>\n    </div>\n    <div align="center" *ngIf="!dataList || !dataList.length || dataList.length == 0">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/journal_sheet/null_state.png">\n      <p style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">空空如也～</p>\n    </div>\n    <ion-item-group no-lines style="background:#f0f2f5;"> \n        <div *ngFor="let item of dataList" style="margin-top:10px;background-color:white;padding-left:20px;padding-bottom:1px" tappable (click)="visitDetail(item)">\n          <img src="{{item.user_image}}" style="float:left;line-height:35px;height:35px;width:35px;margin-top:10px" class="image1">\n          <p style="font-size:14px;color:#2e3133;margin-left:45px;padding-top:20px">{{item.name}}</p>\n          <p style="font-size:12px;color:#b8c4cc;margin-left:43px;height:10px">拜访日期: {{getTime(item.visit_date_begin,item.visit_date_end)}}</p>\n          <p text-wrap style="font-size:12px;color:#b8c4cc;margin-left:43px;line-height:11px">拜访客户: {{item.partner_name}}</p>\n        </div>\n    </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/visit-list/visit-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__writejournalService__["a" /* WriteJournalService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_date_picker__["a" /* DatePicker */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_0__writejournalService__["a" /* WriteJournalService */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
], VisitListPage);

//# sourceMappingURL=visit-list.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/visit-list/visit-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitListPageModule", function() { return VisitListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var visit_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VisitListPageModule = (function () {
    function VisitListPageModule() {
    }
    return VisitListPageModule;
}());
VisitListPageModule = visit_list_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            VisitListPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(VisitListPage),
        ],
    })
], VisitListPageModule);

//# sourceMappingURL=visit-list.module.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WriteJournalService; });
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


var WriteJournalService = (function () {
    function WriteJournalService(httpservice) {
        this.httpservice = httpservice;
    }
    //创建拜访记录
    WriteJournalService.prototype.create_visit_journal = function (body) {
        return this.httpservice.postBody("create_visit", body);
    };
    //获取拜访列表
    WriteJournalService.prototype.get_visit_list = function (body) {
        return this.httpservice.postBody("get_visit_list", body);
    };
    //获取管理的销售团队
    WriteJournalService.prototype.get_sale_team = function (uid) {
        var body = JSON.stringify({
            uid: uid
        });
        return this.httpservice.postBody("get_sale_team", body);
    };
    //获取所有的销售团队
    WriteJournalService.prototype.get_all_sale_team = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_sale_team", body);
    };
    //获取团队的销售员
    WriteJournalService.prototype.get_saleteam_person = function (body) {
        return this.httpservice.postBody("get_saleteam_person", body);
    };
    return WriteJournalService;
}());
WriteJournalService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], WriteJournalService);

//# sourceMappingURL=writejournalService.js.map

/***/ })

});
//# sourceMappingURL=76.js.map