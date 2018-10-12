webpackJsonp([114],{

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/calendar-chat/calendar-chat.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__first_service__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the CalendarChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarChatPage = (function () {
    function CalendarChatPage(navCtrl, navParams, showService, toast, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showService = showService;
        this.toast = toast;
        this.storage = storage;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController(this.navParams.get('navCtrl'), navCtrl);
        this.item = this.navParams.get('item');
        this.res_id = this.navParams.get('res_id');
        this.type = this.navParams.get('type');
        this.storage.get('user').then(function (res) {
            _this.uid = res.result.res_data.user_id;
        });
    }
    CalendarChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalendarChatPage');
    };
    CalendarChatPage.prototype.release = function () {
        var _this = this;
        if (this.beizhuText.length == 0 || this.beizhuText.match(/^\s+$/g)) {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("回复不可为空", this.toast);
        }
        else {
            var body = {
                'uid': this.uid,
                'res_id': this.res_id,
                'context': this.beizhuText,
                'parent_id': this.item.msg_id,
                'type': this.type,
            };
            this.showService.reply_to(body).then(function (res) {
                if (res.result.res_code == 1) {
                    _this.beizhuText = '';
                    __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("回复成功", _this.toast);
                    _this.frontPage.data.need_fresh_reply = true;
                    _this.navCtrl.popTo(_this.frontPage);
                }
            });
        }
    };
    return CalendarChatPage;
}());
CalendarChatPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-calendar-chat',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/calendar-chat/calendar-chat.html"*/'<!--\n  Generated template for the GongdanNewChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>回复</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'release()\'>\n        发表\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n    <ion-textarea #mytextarea autofocus id="area_id" rows="15" placeholder="输入回复" [(ngModel)]="beizhuText" style="margin-top:10px;height:115px;margin-left:4.5%;width:91%;border: 1px solid #e2e2e4;overflow:hidden;border-radius:1px;padding-left:5px;background:#eeeeee;color:gray"></ion-textarea>\n\n</ion-header>\n\n\n<ion-content id="main_class" style="position:relative;">\n <ion-grid style="margin-left:6px;">\n    <ion-row>\n      <ion-col style="height:116px" tappable (click)="clickPicture(item)" col-3 *ngFor="let item of imgList">\n        <img src={{item}} style="position:absolute;clip:rect(0px,106px,106px,0px);"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <!--<div id="chat_top_div" style="border-top:#f0f2f5 1px solid;position:absolute;bottom:0px;height:40px;width:100%;visibility:hidden;background:white"  >\n    <img style="width:30px;margin-top:5px;margin-left:10px" src="assets/img/work_bench/pic.png" tappable (click)="addImg()">\n    <img style="width:30px;margin-top:5px;float:left;margin-left:10px;" src="assets/img/work_bench/at_me.png" tappable (click)="addUser()">\n  </div>-->\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/calendar-chat/calendar-chat.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__first_service__["a" /* FirstShowService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], CalendarChatPage);

//# sourceMappingURL=calendar-chat.js.map
// CONCATENATED MODULE: ./src/pages/first-show/calendar-chat/calendar-chat.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarChatPageModule", function() { return CalendarChatPageModule; });
/* harmony import */ var calendar_chat_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var calendar_chat_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var calendar_chat_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CalendarChatPageModule = (function () {
    function CalendarChatPageModule() {
    }
    return CalendarChatPageModule;
}());
CalendarChatPageModule = calendar_chat_module___decorate([
    calendar_chat_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CalendarChatPage,
        ],
        imports: [
            calendar_chat_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CalendarChatPage),
        ],
    })
], CalendarChatPageModule);

//# sourceMappingURL=calendar-chat.module.js.map

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
//# sourceMappingURL=114.js.map