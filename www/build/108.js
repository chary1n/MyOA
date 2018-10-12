webpackJsonp([108],{

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/tip/tip.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__first_service__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
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
 * Generated class for the TipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TipPage = (function () {
    function TipPage(navCtrl, navParams, firService, storage, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firService = firService;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alarmList = [];
        this.alarm_id = '-1';
        this.alarm_name = '不提醒';
        this.ischeck = false;
        this.type_app = false;
        this.type_notification = false;
        this.page = 'CalendarDeatilpagePage';
        this.page = this.navParams.get('page');
        this.frontPage = __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].getViewController(this.page, navCtrl);
        this.alarm_id = this.navParams.get('alarm_id');
        this.alarm_name = this.navParams.get('alarm_name');
        this.type_app = this.navParams.get('type_app');
        this.type_notification = this.navParams.get('type_notification');
        if (this.alarm_id == '-1') {
            this.ischeck = true;
        }
    }
    TipPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (res) {
            _this.uid = res.result.res_data.user_id;
            var body = {
                'uid': _this.uid
            };
            _this.firService.get_calendar_alarms(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.alarmList = res.result.res_data;
                    for (var i = 0; i < _this.alarmList.length; i++) {
                        if (_this.alarm_id == _this.alarmList[i].alarm_id) {
                            _this.alarmList[i].ischeck = true;
                        }
                    }
                }
            });
        });
    };
    TipPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TipPage');
    };
    TipPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    TipPage.prototype.finish = function () {
        if (this.alarm_id != '-1') {
            if (!this.type_app && !this.type_notification) {
                __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom('请选择提醒方式', this.toastCtrl);
                return;
            }
        }
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.pet = 1;
        this.frontPage.data.alarm_id = this.alarm_id;
        this.frontPage.data.alarm_name = this.alarm_name;
        this.frontPage.data.type_app = this.type_app;
        this.frontPage.data.type_notification = this.type_notification;
        this.navCtrl.popTo(this.frontPage);
    };
    TipPage.prototype.selectAlarm = function (item) {
        this.ischeck = false;
        for (var i = 0; i < this.alarmList.length; i++) {
            if (this.alarmList[i].alarm_id == item.alarm_id) {
                item.ischeck = true;
                this.alarm_id = item.alarm_id;
                this.alarm_name = item.alarm_name;
            }
            else {
                this.alarmList[i].ischeck = false;
            }
        }
    };
    TipPage.prototype.selectNo = function () {
        this.type_notification = false;
        this.type_app = false;
        this.ischeck = true;
        this.alarm_id = '-1';
        this.alarm_name = '不提醒';
        for (var i = 0; i < this.alarmList.length; i++) {
            this.alarmList[i].ischeck = false;
        }
    };
    return TipPage;
}());
TipPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-tip',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/tip/tip.html"*/'<!--\n  Generated template for the TipPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only tappable (click)="cancel()" style="font-size:14px;color: white;margin-left: 10px">\n                取消\n            </button>\n        </ion-buttons>\n        <ion-buttons right>\n            <button ion-button icon-only tappable (click)="finish()" style="font-size:14px;color: white;margin-right: 10px">\n                完成\n            </button>\n      </ion-buttons>\n      <ion-title style="text-align: center">提醒</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-item no-lines style="min-height: 20px;border-bottom: #f0f2f5 10px solid;border-top: #f0f2f5 10px solid;">\n        <ion-label style="font-size: 13px;" [ngClass]="{true:\'yesSelect\',false:\'noSelcet\'}[ischeck]">\n          不提醒\n        </ion-label>\n        <ion-checkbox  (click)="selectNo()" [checked]=ischeck></ion-checkbox>\n    </ion-item>\n    <ion-list>\n            <ion-item  no-lines *ngFor = \'let item of alarmList\' style="border-bottom: #f0f2f5 1px solid;min-height: 25px">\n                <ion-label style="font-size: 13px">{{item.alarm_name}}</ion-label>\n                <ion-checkbox  (click)="selectAlarm(item)" [checked]=item.ischeck></ion-checkbox>\n              </ion-item>\n    </ion-list>\n    <!-- <ion-list no-lines>\n      <ion-item no-lines *ngFor=\'let item of alarmList\' style="min-height: 20px;border-bottom: #f0f2f5 1px solid;" tappable (click)="selectAlarm(item)">\n          <ion-label style="font-size: 13px;" [ngClass]="{true:\'yesSelect\',false:\'noSelcet\'}[item.ischeck]">\n              {{item.alarm_name}}\n            </ion-label>\n      </ion-item>\n    </ion-list> -->\n    <ion-item-group *ngIf="!ischeck">\n            <ion-item no-lines style="min-height: 20px;border-top: #f0f2f5 10px solid;">\n                    <ion-label style="font-size: 10px">请选择提醒方式</ion-label>\n                </ion-item>\n                <ion-item no-lines style="min-height: 20px;padding-left: 0px;border-bottom:#f0f2f5 1px solid;">\n                    <ion-label style="font-size: 13px;padding-left: 15px">网页提醒</ion-label>\n                    <ion-toggle [(ngModel)]="type_notification"></ion-toggle>\n               </ion-item>\n              <ion-item no-lines style="min-height: 20px;padding-left: 0px;border-bottom:#f0f2f5 1px solid;">\n                     <ion-label style="font-size: 13px;padding-left: 15px">App提醒</ion-label>\n                     <ion-toggle [(ngModel)]="type_app"></ion-toggle>\n               </ion-item>\n    </ion-item-group>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/tip/tip.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__first_service__["a" /* FirstShowService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
], TipPage);

//# sourceMappingURL=tip.js.map
// CONCATENATED MODULE: ./src/pages/first-show/tip/tip.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipPageModule", function() { return TipPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var tip_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TipPageModule = (function () {
    function TipPageModule() {
    }
    return TipPageModule;
}());
TipPageModule = tip_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            TipPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(TipPage),
        ],
    })
], TipPageModule);

//# sourceMappingURL=tip.module.js.map

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
//# sourceMappingURL=108.js.map