webpackJsonp([107],{

/***/ 621:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/unread-reply/unread-reply.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__first_service__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the UnreadReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UnreadReplyPage = (function () {
    function UnreadReplyPage(navCtrl, navParams, showService, toast, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showService = showService;
        this.toast = toast;
        this.storage = storage;
        this.item = [];
        this.storage.get('user').then(function (res) {
            _this.uid = res.result.res_data.user_id;
        });
        this.item = [];
        var item_need = this.navParams.get('item');
        var data_arr = [];
        for (var i = 0; i < item_need.length; i++) {
            var item_one = item_need[i][0];
            data_arr.push(item_one.msg_id);
            this.item.push(item_one);
        }
        this.showService.read_total_reply({ 'list': data_arr }).then(function (res) {
        });
    }
    UnreadReplyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UnreadReplyPage');
    };
    UnreadReplyPage.prototype.changeDate = function (date) {
        if (date) {
            var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
            return new_date;
        }
    };
    UnreadReplyPage.prototype.gotoDeatil = function (item) {
        var _this = this;
        if (item.res_model_s == 'rt.performance.appraisal.detail' && item.res_id != false) {
            var body = {
                'res_model_s': 'rt.performance.appraisal.detail',
                'uid': this.uid,
                'id': item.res_id
            };
            this.showService.get_res_model(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.navCtrl.push('PerformanceStartPage', {
                        'item': res.result.res_data
                    });
                }
            });
        }
        else {
            if (item.is_meeting == false) {
                this.showService.get_event_detail({ 'uid': this.uid,
                    'event_id': item.event_id }).then(function (res) {
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
                this.showService.get_event_detail({ 'uid': this.uid,
                    'event_id': item.event_id }).then(function (res) {
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
    return UnreadReplyPage;
}());
UnreadReplyPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-unread-reply',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/unread-reply/unread-reply.html"*/'<!--\n  Generated template for the UnreadReplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border >\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>未读回复</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color:#f0f2f5">\n  <div *ngFor="let items of item" tappable (click)="gotoDeatil(items)" class="div_message">\n      <ion-item no-lines style="height:40px;min-height:50px">\n        <ion-grid style="background:white">\n          <ion-row>\n            <ion-col col-2>\n              <img src={{items.create_user_ava}} class="img_message_ava">\n            </ion-col>\n            <ion-col col-7>\n              <p class="name_message">\n                <span>{{items.create_uid}}</span><span style="margin-left:10px">{{changeDate(items.create_date) | date:\'MM-dd HH:mm\'}}</span>\n              </p>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n      <ion-item no-lines style="margin-top:-8px">\n        <p text-wrap class="content_message_no_lines">\n          <span></span><span style="color:#1f6699;" ></span><span>{{items.context}}</span>\n        </p>\n      </ion-item>\n\n      <div class="parent_class" text-wrap>\n        <p class="context_p_class" >[{{items.subject_type}}] {{items.subject_name}}</p>\n        <!--<p class="name_p_class">\n          <span>{{item_one.create_uid}}</span>\n          <span>{{changeDate(item_one.create_date) | date:\'MM-dd HH:mm\'}}</span>\n        </p>-->\n      </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/unread-reply/unread-reply.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UnreadReplyPage);

//# sourceMappingURL=unread-reply.js.map
// CONCATENATED MODULE: ./src/pages/first-show/unread-reply/unread-reply.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnreadReplyPageModule", function() { return UnreadReplyPageModule; });
/* harmony import */ var unread_reply_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var unread_reply_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var unread_reply_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UnreadReplyPageModule = (function () {
    function UnreadReplyPageModule() {
    }
    return UnreadReplyPageModule;
}());
UnreadReplyPageModule = unread_reply_module___decorate([
    unread_reply_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            UnreadReplyPage,
        ],
        imports: [
            unread_reply_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(UnreadReplyPage),
        ],
    })
], UnreadReplyPageModule);

//# sourceMappingURL=unread-reply.module.js.map

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
//# sourceMappingURL=107.js.map