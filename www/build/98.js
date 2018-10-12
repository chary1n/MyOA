webpackJsonp([98],{

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-recoup-create/attendance-recoup-create.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__attendanceService__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(35);
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
 * Generated class for the AttendanceRecoupCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AttendanceRecoupCreatePage = (function () {
    function AttendanceRecoupCreatePage(navCtrl, navParams, storage, datePipe, attendanceService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.datePipe = datePipe;
        this.attendanceService = attendanceService;
        this.alertCtrl = alertCtrl;
        this.data_arr = [];
    }
    AttendanceRecoupCreatePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AttendanceRecoupCreatePage');
        this.storage.get('user').then(function (res) {
            console.log(res);
            _this.user = res.result.res_data;
            _this.user_name = res.result.res_data.name;
            _this.department_name = res.result.res_data.department;
        });
    };
    AttendanceRecoupCreatePage.prototype.ionViewWillEnter = function () {
        var data = this.navParams.get("data");
        console.log(this.navParams.get('item_index'));
        if (this.navParams.get('item_index')) {
            if (data) {
                this.data_arr.splice(this.navParams.get('item_index'), 1, data);
                this.navParams.data.data = false;
            }
            this.navParams.data.item_index = false;
        }
        else {
            if (data) {
                this.data_arr.push(data);
                this.navParams.data.data = false;
            }
        }
    };
    AttendanceRecoupCreatePage.prototype.add_detail = function () {
        this.navCtrl.push('AttendanceRecoupAddDetailPage', {
            is_edit: false,
        });
    };
    AttendanceRecoupCreatePage.prototype.change_type = function (type) {
        var str = '';
        if (type == 0) {
            str = '申请补卡';
        }
        else {
            str = '申请销卡';
        }
        return str;
    };
    AttendanceRecoupCreatePage.prototype.change_work_type = function (type) {
        var str = '';
        if (type == 0) {
            str = '上班';
        }
        else {
            str = '下班';
        }
        return str;
    };
    AttendanceRecoupCreatePage.prototype.cal_time = function (time) {
        return time.replace('T', ' ').replace('Z', '');
    };
    AttendanceRecoupCreatePage.prototype.save = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        this.attendanceService.save_edit_attendance(this.data_arr, this.user.user_id, this.month_time).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                ctrl.create({
                    title: '提示',
                    message: "保存成功",
                    buttons: [
                        {
                            text: '确定',
                            handler: function (data) {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                }).present();
            }
        });
    };
    AttendanceRecoupCreatePage.prototype.submit = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        this.attendanceService.submit_edit_attendance(this.data_arr, this.user.user_id, this.month_time).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                ctrl.create({
                    title: '提示',
                    message: "提交成功",
                    buttons: [
                        {
                            text: '确定',
                            handler: function (data) {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                }).present();
            }
        });
    };
    AttendanceRecoupCreatePage.prototype.click_edit = function (item, i) {
        console.log(i);
        this.navCtrl.push('AttendanceRecoupAddDetailPage', {
            is_edit: true,
            item_data: item,
            item_index: i,
        });
    };
    return AttendanceRecoupCreatePage;
}());
AttendanceRecoupCreatePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-attendance-recoup-create',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendance-recoup-create/attendance-recoup-create.html"*/'<!--\n  Generated template for the AttendanceRecoupCreatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>新建补卡销卡</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color:#f0f2f5">\n  <ion-item class="item_class">\n    <ion-label class="left_label">申请人</ion-label>\n    <ion-label item-end class="right_label">{{user_name}}</ion-label>\n  </ion-item>\n  <ion-item class="item_class">\n    <ion-label class="left_label">部门</ion-label>\n    <ion-label item-end class="right_label">{{department_name}}</ion-label>\n  </ion-item>\n  <ion-item no-lines class="item_class">\n    <ion-label class="left_label">月份</ion-label>\n    <ion-datetime placeholder=\'请选择 >\' style="font-size:80%" item-end displayFormat="YYYY-MM" pickerFormat="YYYY MM" [(ngModel)]="month_time" cancelText="取消" doneText="确定"></ion-datetime>\n  </ion-item>\n  <div *ngIf="data_arr.length > 0" class="list_header_class">\n    补卡销卡明细\n  </div>\n  <div *ngFor=\'let item of data_arr;let i=index\'>\n    <div class="list_body_class" tappable (click)="click_edit(item,i)">\n      <div class="body_type_class">\n        <div class="shu_class">\n        </div>\n        <div class="title_class">\n          {{change_type(item.type)}}-{{change_work_type(item.work_type)}}\n        </div>\n      </div>\n      <div class="body_time_class">\n        时间：{{cal_time(item.time)}}\n      </div>\n      <div text-wrap class="body_remark_class">\n        备注：{{item.remark}}\n      </div>\n    </div>\n  </div>\n  <button class="btn_class" ion-button full (click)="add_detail()">\n    + 补卡销卡明细\n  </button>\n</ion-content>\n<ion-footer>\n    <div class="footer_class">\n        <div class="left_btn" tappable (click)="save()">\n          保存\n        </div>\n        <div class="right_btn" tappable (click)="submit()">\n          提交\n        </div>\n      </div>\n</ion-footer>\n\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendance-recoup-create/attendance-recoup-create.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_3__attendanceService__["a" /* AttendanceService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["DatePipe"],
        __WEBPACK_IMPORTED_MODULE_3__attendanceService__["a" /* AttendanceService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], AttendanceRecoupCreatePage);

//# sourceMappingURL=attendance-recoup-create.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-recoup-create/attendance-recoup-create.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceRecoupCreatePageModule", function() { return AttendanceRecoupCreatePageModule; });
/* harmony import */ var attendance_recoup_create_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var attendance_recoup_create_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var attendance_recoup_create_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AttendanceRecoupCreatePageModule = (function () {
    function AttendanceRecoupCreatePageModule() {
    }
    return AttendanceRecoupCreatePageModule;
}());
AttendanceRecoupCreatePageModule = attendance_recoup_create_module___decorate([
    attendance_recoup_create_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AttendanceRecoupCreatePage,
        ],
        imports: [
            attendance_recoup_create_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AttendanceRecoupCreatePage),
        ],
    })
], AttendanceRecoupCreatePageModule);

//# sourceMappingURL=attendance-recoup-create.module.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttendanceService; });
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


var AttendanceService = (function () {
    function AttendanceService(httpservice) {
        this.httpservice = httpservice;
    }
    AttendanceService.prototype.get_is_department = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department", body);
    };
    AttendanceService.prototype.get_all_edit_card = function (user_id, need_approve) {
        var body = JSON.stringify({
            user_id: user_id,
            need_approve: need_approve,
        });
        return this.httpservice.postBody("get_all_edit_card", body);
    };
    AttendanceService.prototype.get_today_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_today_attendance", body);
    };
    AttendanceService.prototype.save_edit_attendance = function (lines, user_id, month_time) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            month_time: month_time,
        });
        return this.httpservice.postBody("save_edit_attendance", body);
    };
    AttendanceService.prototype.submit_edit_attendance = function (lines, user_id, month_time) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            month_time: month_time,
        });
        return this.httpservice.postBody("submit_edit_attendance", body);
    };
    AttendanceService.prototype.refuse_edit_card = function (user_id, remark, edit_id) {
        var body = JSON.stringify({
            remark: remark,
            user_id: user_id,
            edit_id: edit_id,
        });
        return this.httpservice.postBody("refuse_edit_card", body);
    };
    AttendanceService.prototype.confirm_edit_card = function (user_id, remark, edit_id) {
        var body = JSON.stringify({
            remark: remark,
            user_id: user_id,
            edit_id: edit_id,
        });
        return this.httpservice.postBody("confirm_edit_card", body);
    };
    AttendanceService.prototype.back_edit_card = function (user_id, remark, edit_id) {
        var body = JSON.stringify({
            remark: remark,
            user_id: user_id,
            edit_id: edit_id,
        });
        return this.httpservice.postBody("back_edit_card", body);
    };
    AttendanceService.prototype.submit_edit_card = function (user_id, lines, edit_id, delete_arr) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            edit_id: edit_id,
            delete_arr: delete_arr,
        });
        return this.httpservice.postBody("submit_edit_card", body);
    };
    AttendanceService.prototype.save_edit_card = function (user_id, lines, edit_id, delete_arr) {
        var body = JSON.stringify({
            lines: lines,
            user_id: user_id,
            edit_id: edit_id,
            delete_arr: delete_arr,
        });
        return this.httpservice.postBody("save_edit_card", body);
    };
    AttendanceService.prototype.search_edit_card = function (type, search_text, user_id) {
        var body = JSON.stringify({
            type: type,
            search_text: search_text,
            user_id: user_id,
        });
        return this.httpservice.postBody("search_edit_card", body);
    };
    return AttendanceService;
}());
AttendanceService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], AttendanceService);

//# sourceMappingURL=attendanceService.js.map

/***/ })

});
//# sourceMappingURL=98.js.map