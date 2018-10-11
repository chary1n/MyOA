webpackJsonp([104],{

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/new-work-bench/new-work-bench.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__work_bench_commonUseServices__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the NewWorkBenchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewWorkBenchPage = (function () {
    function NewWorkBenchPage(navCtrl, navParams, statusbar, services, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusbar = statusbar;
        this.services = services;
        this.storage = storage;
        this.inner_type = 'normal';
        this.performance = 0;
        this.vacation_num = 0;
        this.recoup_num = 0;
    }
    NewWorkBenchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewWorkBenchPage');
    };
    NewWorkBenchPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    NewWorkBenchPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            var uid = res.result.res_data.user_id;
            _this.storage.get("loginIndex").then(function (res) {
                _this.loginIndex = res;
                console.log("loginIndex = " + _this.loginIndex);
                _this.services.get_all_num({
                    'uid': uid
                }).then(function (res) {
                    if (res.result.res_code == 1 && res.result) {
                        console.log(res);
                        _this.performance = res.result.res_data.performance;
                        _this.vacation_num = res.result.res_data.vacation_num;
                        _this.recoup_num = res.result.res_data.recoup_num;
                    }
                });
            });
        });
    };
    NewWorkBenchPage.prototype.click_attendance = function () {
        this.navCtrl.push('KaoqinPage');
    };
    NewWorkBenchPage.prototype.click_vacation = function () {
        this.navCtrl.push('VacationApprovalPage');
    };
    NewWorkBenchPage.prototype.click_recoup = function () {
        this.navCtrl.push('AttendaceRecoupPage');
    };
    NewWorkBenchPage.prototype.click_chuchai = function () {
        this.navCtrl.push('ChuchaiPage');
    };
    NewWorkBenchPage.prototype.click_jixiao = function () {
        this.navCtrl.push('PerformancePage');
    };
    NewWorkBenchPage.prototype.toAll = function () {
        this.navCtrl.push('AllSchedulePage');
    };
    return NewWorkBenchPage;
}());
NewWorkBenchPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-new-work-bench',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/new-work-bench/new-work-bench.html"*/'<!--\n  Generated template for the NewWorkBenchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>工作台</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <div class="row_class"  align-items-center>\n        <div class="left_div" align="center" tappable (click) = "click_normal()">\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'normal\']">通用</p> \n        </div> \n  </div>\n  <ion-grid class="grid_class">\n    <div class="header_div_class">\n      考勤休假\n    </div>\n    <ion-row class="body_row_class" align-items-center>\n      <ion-col class="col_class" tappable (click)="click_attendance()" col-3>\n        <div class="body_class" align="center">\n          <img class="body_img_class" src="assets/img/work_bench/attendance_fang.png">\n          <div class="text_class">\n            考勤\n          </div>\n        </div>\n      </ion-col>\n\n      <ion-col class="col_class" tappable (click)="click_vacation()" col-3>\n        <div *ngIf="vacation_num > 0" align="center" [ngClass]="{true:\'big_number_class\',false:\'number_class\'}[vacation_num >= 10]" >\n            {{vacation_num}}\n          </div>\n        <div class="body_class" align="center">\n          <img class="body_img_class" src="assets/img/work_bench/vacation_fang.png">\n          <div class="text_class">\n            休假\n          </div>\n        </div>\n      </ion-col>\n\n      <ion-col class="col_class" tappable (click)="click_recoup()" col-3>\n        <div *ngIf="recoup_num > 0" align="center" [ngClass]="{true:\'big_number_class\',false:\'number_class\'}[recoup_num >= 10]">\n            {{recoup_num}}\n          </div>\n        <div class="body_class" align="center">\n          <img class="body_img_class" src="assets/img/work_bench/recoup_fang.png">\n          <div class="text_class">\n            补卡\n          </div>\n        </div>\n      </ion-col>\n\n      <!--<ion-col class="col_class" tappable (click)="click_chuchai()" col-3>\n        <div class="body_class" align="center">\n          <img class="body_img_class" src="assets/img/work_bench/chuchai_fang.png">\n          <div class="text_class">\n            出差\n          </div>\n        </div>\n      </ion-col>-->\n    </ion-row>\n\n    <div class="sub_header_div_class">\n      工作汇报\n    </div>\n    <ion-row class="body_row_class" align-items-center>\n        <ion-col class="col_class" tappable (click)="toAll()" col-3>\n            <div class="body_class" align="center">\n              \n              <img class="body_img_class" src="assets/img/waitthing.png">\n              <div class="text_class">\n              待办\n              </div>\n            </div>\n          </ion-col>\n      <ion-col class="col_class" tappable (click)="click_jixiao()" col-3>\n        <div *ngIf="performance > 0" align="center" [ngClass]="{true:\'big_number_class\',false:\'number_class\'}[performance >= 10]">\n            {{performance}}\n          </div>\n        <div class="body_class" align="center">\n          \n          <img class="body_img_class" src="assets/img/work_bench/performance_fang.png">\n          <div class="text_class">\n            绩效\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/new-work-bench/new-work-bench.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__work_bench_commonUseServices__["a" /* CommonUseServices */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__work_bench_commonUseServices__["a" /* CommonUseServices */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], NewWorkBenchPage);

//# sourceMappingURL=new-work-bench.js.map
// CONCATENATED MODULE: ./src/pages/new-work-bench/new-work-bench.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewWorkBenchPageModule", function() { return NewWorkBenchPageModule; });
/* harmony import */ var new_work_bench_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var new_work_bench_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var new_work_bench_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewWorkBenchPageModule = (function () {
    function NewWorkBenchPageModule() {
    }
    return NewWorkBenchPageModule;
}());
NewWorkBenchPageModule = new_work_bench_module___decorate([
    new_work_bench_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            NewWorkBenchPage,
        ],
        imports: [
            new_work_bench_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(NewWorkBenchPage),
        ],
    })
], NewWorkBenchPageModule);

//# sourceMappingURL=new-work-bench.module.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUseServices; });
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


var CommonUseServices = (function () {
    function CommonUseServices(httpservice) {
        this.httpservice = httpservice;
    }
    CommonUseServices.prototype.getApplyList = function (moffset, mlimit, id) {
        id = parseInt(id);
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    };
    CommonUseServices.prototype.getApplyListNoLoading = function (moffset, mlimit, id) {
        id = parseInt(id);
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_applylist", body);
    };
    CommonUseServices.prototype.searchApplyList = function (id, type, data) {
        var body = JSON.stringify({
            offset: 0,
            limit: 100,
            user_id: id,
            type: type,
            data: data
        });
        return this.httpservice.postBody("get_applylist", body);
    };
    CommonUseServices.prototype.getApplyDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_applylist_detail", body);
    };
    CommonUseServices.prototype.getLeaveDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_leavelist_detail", body);
    };
    CommonUseServices.prototype.getLeaveList = function (moffset, mlimit, id) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_leavelist", body);
    };
    //  获取暂支金额,部门,产品名
    CommonUseServices.prototype.getPaymentReminding = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_payment_reminding", body);
    };
    // 撤回
    CommonUseServices.prototype.get_retract = function (descrpiction, id, userId) {
        var body = JSON.stringify({
            active_id: id,
            description: descrpiction,
            user_id: userId
        });
        return this.httpservice.postBody("get_retract", body);
    };
    // 提交审核
    CommonUseServices.prototype.submit_apply = function (id, userId) {
        var body = JSON.stringify({
            id: id,
            user_id: userId
        });
        return this.httpservice.postBody("submit_apply", body);
    };
    // 创建审批单草稿
    CommonUseServices.prototype.createApply = function (data) {
        var body = JSON.stringify(data);
        console.log("JSON 的body 是" + body);
        return this.httpservice.postBody("create_apply_order", body);
    };
    CommonUseServices.prototype.get_leaveType = function () {
        var body = JSON.stringify({
            limit: 10
        });
        return this.httpservice.postBody("get_leaveType", body);
    };
    CommonUseServices.prototype.get_shengou_item = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id
        });
        return this.httpservice.postBody("get_shengou_item", body);
    };
    // 暂支
    CommonUseServices.prototype.get_zanzhi_list = function (id, limit, offset, type) {
        var body = JSON.stringify({
            user_id: id,
            limit: limit,
            offset: offset,
            type: type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    };
    CommonUseServices.prototype.get_zanzhi_listNoLoading = function (id, limit, offset, type) {
        var body = JSON.stringify({
            user_id: id,
            limit: limit,
            offset: offset,
            type: type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    };
    CommonUseServices.prototype.searchZanzhiList = function (id, type, data, text) {
        var body = JSON.stringify({
            user_id: id,
            type: type,
            data: data,
            text: text
        });
        return this.httpservice.postBody("search_zanzhi_list", body);
    };
    CommonUseServices.prototype.confirm = function (sheet_id, user_id, title, type) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: title,
            type: type
        });
        return this.httpservice.postBody("confirm_zanzhi", body);
    };
    CommonUseServices.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_zanzhi", body);
    };
    CommonUseServices.prototype.get_zanzhi_reminding = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
        });
        return this.httpservice.postBody("get_zanzhi_reminding", body);
    };
    CommonUseServices.prototype.save_zanzhi = function (amount, remark, submit) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            amount: amount,
            remark: remark,
            submit: submit
        });
        return this.httpservice.postBody("create_zanzhi", body);
    };
    CommonUseServices.prototype.save_edit_zanzhi = function (amount, remark, submit, id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            amount: amount,
            remark: remark,
            submit: submit,
            order_id: id
        });
        return this.httpservice.postBody("save_edit_zanzhi", body);
    };
    CommonUseServices.prototype.submitOrder = function (id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            id: id
        });
        return this.httpservice.postBody("submit_order", body);
    };
    CommonUseServices.prototype.callbackOrder = function (description, id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            id: id,
            description: description
        });
        return this.httpservice.postBody("callback_order", body);
    };
    CommonUseServices.prototype.get_apply_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_apply_count", body);
    };
    CommonUseServices.prototype.get_shengou_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_shengou_count", body);
    };
    CommonUseServices.prototype.get_all_need_do = function (user_id, is_plus, isShowKucun, need_all) {
        var body = JSON.stringify({
            user_id: user_id,
            is_plus: is_plus,
            is_kucun: isShowKucun,
            need_all: need_all,
        });
        return this.httpservice.postBodyNoLoading("get_all_need_do", body);
    };
    CommonUseServices.prototype.get_all_num = function (body) {
        return this.httpservice.postBodyNoLoading("get_all_num", body);
    };
    return CommonUseServices;
}());
CommonUseServices = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], CommonUseServices);

//# sourceMappingURL=commonUseServices.js.map

/***/ })

});
//# sourceMappingURL=104.js.map