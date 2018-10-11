webpackJsonp([74],{

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/kaoqin-people/kaoqin-people.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kaoqinService__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the KaoqinPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KaoqinPeoplePage = (function () {
    function KaoqinPeoplePage(navCtrl, navParams, kaoQinService, datePipe) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.kaoQinService = kaoQinService;
        this.datePipe = datePipe;
        this.items = [];
        this.manager_id = this.navParams.get('manager_id');
        this.type = this.navParams.get('type');
        this.current_date = this.navParams.get('current_date');
        var timestamp = Date.parse(this.current_date);
        var timestamp_now = timestamp / 1000 - 24 * 60 * 60;
        var date_later = new Date(timestamp_now * 1000);
        this.kaoQinService.get_department_employee_attendance(this.manager_id, this.formatTime_day_start(this.current_date), this.formatTime_day_end(this.current_date)).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                if (_this.type == "未打卡") {
                    _this.items = res.result.res_data.un_attendance;
                }
                else {
                    _this.items = res.result.res_data.attendance;
                }
            }
        });
    }
    KaoqinPeoplePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KaoqinPeoplePage');
    };
    KaoqinPeoplePage.prototype.formatTime_day_start = function (date) {
        var timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd').replace(/-/g, '/'));
        var timestamp_now = timestamp / 1000 - 24 * 60 * 60;
        var date_now = new Date(timestamp_now * 1000);
        var year = date_now.getFullYear();
        var month = date_now.getMonth() + 1;
        var day = date_now.getDate();
        var hour = 16;
        var minute = 0;
        var second = 0;
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    };
    KaoqinPeoplePage.prototype.formatTime_day_end = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = 15;
        var minute = 59;
        var second = 59;
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    };
    return KaoqinPeoplePage;
}());
KaoqinPeoplePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-kaoqin-people',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/kaoqin-people/kaoqin-people.html"*/'<!--\n  Generated template for the KaoqinPeoplePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{type}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n  <ion-item *ngFor="let item of items">\n    <ion-avatar item-start>\n      <img src={{item.user_ava}}>\n    </ion-avatar>\n    <ion-label style="color:#3e3133">{{item.name}}</ion-label>\n    <p [ngClass]="{true:\'label_attendance\',false:\'label_un_attendance\'}[type == \'已打卡\']" item-end style="float:right">{{type}}</p>\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/kaoqin-people/kaoqin-people.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__kaoqinService__["a" /* KaoQinService */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__kaoqinService__["a" /* KaoQinService */],
        __WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"]])
], KaoqinPeoplePage);

//# sourceMappingURL=kaoqin-people.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/kaoqin-people/kaoqin-people.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KaoqinPeoplePageModule", function() { return KaoqinPeoplePageModule; });
/* harmony import */ var kaoqin_people_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var kaoqin_people_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var KaoqinPeoplePageModule = (function () {
    function KaoqinPeoplePageModule() {
    }
    return KaoqinPeoplePageModule;
}());
KaoqinPeoplePageModule = kaoqin_people_module___decorate([
    kaoqin_people_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            KaoqinPeoplePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(KaoqinPeoplePage),
        ],
    })
], KaoqinPeoplePageModule);

//# sourceMappingURL=kaoqin-people.module.js.map

/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KaoQinService; });
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


var KaoQinService = (function () {
    function KaoQinService(httpservice) {
        this.httpservice = httpservice;
    }
    KaoQinService.prototype.get_today_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_today_attendance", body);
    };
    KaoQinService.prototype.employee_attendance = function (data_params) {
        var body = JSON.stringify(data_params);
        return this.httpservice.postBodyNoLoading("employee_attendance", body);
    };
    KaoQinService.prototype.get_ble_device = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_ble_device", body);
    };
    KaoQinService.prototype.get_employee_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBodyNoLoading("get_employee_attendance", body);
    };
    KaoQinService.prototype.get_is_department = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department", body);
    };
    KaoQinService.prototype.get_department_employee_attendance = function (manager_id, day_start, day_end) {
        var body = JSON.stringify({
            manager_id: manager_id,
            day_start: day_start,
            day_end: day_end,
        });
        return this.httpservice.postBody("get_department_employee_attendance", body);
    };
    KaoQinService.prototype.trans_location = function (latitude, longti) {
        var url_str = "http://api.map.baidu.com/geoconv/v1/?coords=" + longti + "," + latitude + "&from=1&to=5&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7";
        return this.httpservice.getWithUrl(url_str);
    };
    KaoQinService.prototype.get_location_now = function (latitude, longti) {
        var url_str = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latitude + "," + longti + "&output=json&pois=1&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7";
        return this.httpservice.getLocationWithUrl(url_str);
    };
    KaoQinService.prototype.location_attendance = function (data_params) {
        var body = JSON.stringify(data_params);
        return this.httpservice.postBody("location_attendance", body);
    };
    KaoQinService.prototype.get_month_attendance = function (month_str, user_id) {
        var body = JSON.stringify({
            month_str: month_str,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_month_attendance", body);
    };
    return KaoQinService;
}());
KaoQinService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], KaoQinService);

//# sourceMappingURL=kaoqinService.js.map

/***/ })

});
//# sourceMappingURL=74.js.map