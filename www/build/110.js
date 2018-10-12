webpackJsonp([110],{

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/late-list/late-list.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__first_service__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the LateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LateListPage = (function () {
    function LateListPage(navCtrl, navParams, statusBar, firService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.firService = firService;
        this.storage = storage;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].getViewController("FirstShowPage", navCtrl);
    }
    LateListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LateListPage');
    };
    LateListPage.prototype.goBack = function () {
        this.frontPage.data.need_fresh = true;
        this.navCtrl.pop();
    };
    LateListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.storage.get('user').then(function (res) {
            var body = {
                'uid': res.result.res_data.user_id
            };
            _this.firService.get_late_list(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.item = res.result.res_data.late;
                    if (_this.item && _this.item.length == 0) {
                        _this.navCtrl.pop();
                    }
                }
            });
        });
    };
    LateListPage.prototype.toDetail = function (sub) {
        this.navCtrl.push('CalendarDeatilpagePage', {
            'isEdit': false,
            'item': sub,
            'frontPage': 'LateListPage'
        });
    };
    return LateListPage;
}());
LateListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-late-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/late-list/late-list.html"*/'<!--\n  Generated template for the LateListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n          </ion-buttons>\n      <ion-title>逾期待办</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group>\n      <div *ngFor="let subItem of item" style="border-bottom:#f0f2f5 10px solid;padding: 1px">\n          <p style="padding-bottom: 10px;padding-left: 10px;font-size: 13px;color: #666666;border-bottom:#f0f2f5 1px solid;">\n            {{subItem.start}}\n          </p>\n          <div *ngFor="let sub of subItem.subList" style="height: 40px;margin-top: 15px;padding: 1px;border-bottom:#f0f2f5 1px solid;margin-bottom: -1px;cursor :pointer" tappable (click)="toDetail(sub)">\n              <p style="float: left;font-size: 12px;color: #666666;padding-left: 20px;margin-top: 3px">{{sub.event_time}}</p>\n              <p style="font-size: 12px;color: #666666;margin-left: 105px;margin-top: 0px">[{{sub.type_name}}] {{sub.subject}}</p>\n          </div>\n        </div>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/late-list/late-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__first_service__["a" /* FirstShowService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_0__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], LateListPage);

//# sourceMappingURL=late-list.js.map
// CONCATENATED MODULE: ./src/pages/first-show/late-list/late-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LateListPageModule", function() { return LateListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var late_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LateListPageModule = (function () {
    function LateListPageModule() {
    }
    return LateListPageModule;
}());
LateListPageModule = late_list_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            LateListPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(LateListPage),
        ],
    })
], LateListPageModule);

//# sourceMappingURL=late-list.module.js.map

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
//# sourceMappingURL=110.js.map