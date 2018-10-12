webpackJsonp([112],{

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/finish-scheule/finish-scheule.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__first_service__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
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
 * Generated class for the FinishScheulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FinishScheulePage = (function () {
    function FinishScheulePage(navCtrl, navParams, statusBar, datePipe, firService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.datePipe = datePipe;
        this.firService = firService;
        this.toastCtrl = toastCtrl;
        this.allDay = false;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("CalendarDeatilpagePage", navCtrl);
        this.body = this.navParams.get('body');
        this.start = this.datePipe.transform(new Date(new Date(this.body['start'].replace(/-/g, "/")).getTime() + 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm');
        this.stop = this.datePipe.transform(new Date(new Date(this.body['stop'].replace(/-/g, "/")).getTime() + 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm');
        this.relly_start_time = this.datePipe.transform(new Date(this.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z';
        this.relly_stop_time = this.datePipe.transform(new Date(this.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z';
    }
    FinishScheulePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FinishScheulePage');
    };
    FinishScheulePage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    FinishScheulePage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    FinishScheulePage.prototype.finish = function () {
        var _this = this;
        // console.log('start = '+this.relly_start_time+'  stop = '+this.relly_stop_time)
        var startTime;
        var stopTime;
        if (this.relly_start_time.indexOf('T') != -1) {
            startTime = new Date(this.relly_start_time).getTime();
        }
        else {
            startTime = new Date(this.relly_start_time.replace(/-/g, "/")).getTime();
        }
        if (this.relly_stop_time.indexOf('T') != -1) {
            stopTime = new Date(this.relly_stop_time).getTime();
        }
        else {
            stopTime = new Date(this.relly_stop_time.replace(/-/g, "/")).getTime();
        }
        if (startTime > stopTime) {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom('开始时间不能大于结束时间！', this.toastCtrl);
            return;
        }
        // console.log("过来了")
        if (this.relly_start_time.indexOf('T') != -1) {
            this.relly_start_time = this.datePipe.transform(new Date(new Date(this.relly_start_time).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
        }
        else {
            this.relly_start_time = this.datePipe.transform(new Date(new Date(this.relly_start_time.replace(/-/g, "/")).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
        }
        if (this.relly_stop_time.indexOf('T') != -1) {
            this.relly_stop_time = this.datePipe.transform(new Date(new Date(this.relly_stop_time).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
        }
        else {
            this.relly_stop_time = this.datePipe.transform(new Date(new Date(this.relly_stop_time.replace(/-/g, "/")).getTime() - 2 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
        }
        this.body['state'] = 'open';
        this.body['relly_start_time'] = this.relly_start_time;
        this.body['relly_stop_time'] = this.relly_stop_time;
        this.body['start'] = this.datePipe.transform(new Date(new Date(this.body['start'].replace(/-/g, "/")).getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
        this.body['stop'] = this.datePipe.transform(new Date(new Date(this.body['stop'].replace(/-/g, "/")).getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss');
        this.firService.finish_wait_thing(this.body).then(function (res) {
            if (res.result.res_data && res.result.res_code == 1) {
                _this.item = res.result.res_data;
                _this.frontPage.data.need_fresh = true;
                _this.frontPage.data.item = _this.item;
                _this.frontPage.data.pet = 2;
                _this.navCtrl.popTo(_this.frontPage);
            }
        });
    };
    return FinishScheulePage;
}());
FinishScheulePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-finish-scheule',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/finish-scheule/finish-scheule.html"*/'<!--\n  Generated template for the FinishScheulePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n          </ion-buttons>\n      <ion-title>确认完成信息</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n\n\n<ion-content>\n\n  <ion-item no-lines style="min-height: 20px;border-bottom: #f0f2f5 1px solid;">\n    <ion-label style="font-size: 13px">实际</ion-label>\n  </ion-item>\n  <ion-grid  *ngIf="!not_sure_time" style="border-bottom: #f0f2f5 10px solid;background-color: white;">\n        <ion-row style="height:40px;text-align:center;">\n            <ion-col col-5>\n            <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                <ion-datetime *ngIf="!allDay" text-wrap cancelText="取消" doneText="确定"  [(ngModel)]="relly_start_time"  min="2017-01" max="2100-12"\n                   style="width: 170px;color:#5C6166;font-size:12px;word-wrap:break-word;padding-left: 0px;padding-right: 0px;margin-left: 5px" displayFormat="YYYY-MM-DD HH:mm" pickerFormat="YYYY年 MM月 DD日 HH:mm"></ion-datetime>\n            </div>\n            </ion-col>\n            <span style="color:#666666;float: left;height: 48px;line-height: 48px;font-size: 12px;margin-right: 18px">至</span>\n            <ion-col col-5>\n            <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                <ion-datetime *ngIf="!allDay" text-wrap cancelText="取消" doneText="确定"  [(ngModel)]="relly_stop_time"  min="2017-01" max="2100-12"\n                   style="width: 170px;color:#5C6166;font-size:12px;word-wrap:break-word;overflow:hidden;padding-left: 0px;padding-right: 0px;margin-left: 5px" displayFormat="YYYY-MM-DD HH:mm" pickerFormat="YYYY年 MM月 DD日 HH:mm"></ion-datetime>\n            </div>\n            </ion-col>\n          </ion-row>\n    </ion-grid>\n\n  <ion-item no-lines style="min-height: 20px;border-bottom: #dbdddf 1px solid;background-color: #f0f2f5">\n      <ion-label style="font-size: 13px;color:#999999;">计划</ion-label>\n    </ion-item>\n    <div  style="background-color: #f0f2f5;padding: 1px;text-align: left;height: 40px;">\n            <span style="margin-left: 15px;font-size:12px;color:#999999;height: 40px;line-height:40px;width:40%;">{{start}}</span>\n            <span style="color:#999999;font-size: 12px;margin-left: 10px;margin-right: 10px">至</span>\n            <span style="font-size:12px;color:#999999;height: 40px;line-height:40px;width:40%;">{{stop}}</span>\n       </div>\n\n</ion-content>\n\n<ion-footer>\n        <div style="background:white" >\n            <span align="center"  style=\'width:100%;float:right;background-color:#1897f2;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="finish()">\n            完成\n            </span>\n        </div>\n</ion-footer>'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/finish-scheule/finish-scheule.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_5__angular_common__["DatePipe"]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_1__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
], FinishScheulePage);

//# sourceMappingURL=finish-scheule.js.map
// CONCATENATED MODULE: ./src/pages/first-show/finish-scheule/finish-scheule.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinishScheulePageModule", function() { return FinishScheulePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var finish_scheule_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FinishScheulePageModule = (function () {
    function FinishScheulePageModule() {
    }
    return FinishScheulePageModule;
}());
FinishScheulePageModule = finish_scheule_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            FinishScheulePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(FinishScheulePage),
        ],
    })
], FinishScheulePageModule);

//# sourceMappingURL=finish-scheule.module.js.map

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
//# sourceMappingURL=112.js.map