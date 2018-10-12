webpackJsonp([83],{

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-zhipai/gongdan-zhipai.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gongdanService__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(239);
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
 * Generated class for the GongdanZhipaiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GongdanZhipaiPage = (function () {
    function GongdanZhipaiPage(navCtrl, navParams, gongDanService, toast, statusbar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gongDanService = gongDanService;
        this.toast = toast;
        this.statusbar = statusbar;
        this.select_list = [];
        this.item = this.navParams.get('item');
        console.log(this.item);
        this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("GongdanPage", navCtrl);
        this.gongDanService.get_department_employees(this.item.effective_department_ids).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.employeeList = res.result.res_data;
                _this.origin_data = _this.employeeList;
            }
        });
    }
    GongdanZhipaiPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    GongdanZhipaiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GongdanZhipaiPage');
    };
    GongdanZhipaiPage.prototype.itemSelect = function (item) {
        var is_has = false;
        this.select_list.splice(0, 1);
        this.select_list.push(item.user_id.id);
    };
    GongdanZhipaiPage.prototype.is_select = function (item) {
        var is_has = false;
        for (var i = 0, len = this.select_list.length, value = void 0; i < len; i++) {
            if (this.select_list[i] == item.user_id.id) {
                is_has = true;
                break;
            }
        }
        return is_has;
    };
    GongdanZhipaiPage.prototype.confirm = function () {
        var _this = this;
        console.log(this.select_list);
        if (!this.select_list[0]) {
            __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("请选择指派人", this.toast);
        }
        else {
            this.gongDanService.work_order_action(__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id, this.item.work_order_id, "assign", this.select_list[0]).then(function (res) {
                if (res.result.res_code == 1) {
                    __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("指派成功", _this.toast);
                    _this.frontPage.data.need_fresh = true;
                    _this.navCtrl.popTo(_this.frontPage);
                }
            });
        }
    };
    GongdanZhipaiPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.employeeList = this.origin_data.filter(function (item) {
                console.log(item);
                if (item.name != '') {
                    console.log(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.employeeList = this.origin_data;
        }
    };
    return GongdanZhipaiPage;
}());
GongdanZhipaiPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-gongdan-zhipai',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-zhipai/gongdan-zhipai.html"*/'<!--\n  Generated template for the GongdanZhipaiPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>指派</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'confirm()\'>\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  \n</ion-header>\n\n\n<ion-content >\n  <ion-searchbar placeholder = "搜索" (ionInput)="getItems($event)"></ion-searchbar>\n  <div style="overflow:scroll;margin-top:2px;">\n    <ion-list>\n      <ion-item tappable (click) = "itemSelect(item)" *ngFor = \'let item of employeeList\'>\n        <ion-avatar item-start>\n            <img src={{item.image}}>\n        </ion-avatar>\n        <h2>{{item.name}}</h2>\n        <p>{{item.job_id.name}}</p>\n        <img *ngIf="is_select(item)" item-end style="float:right;width:18px;" src="assets/img/work_bench/checkbox_true.png">\n      </ion-item>\n  </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-zhipai/gongdan-zhipai.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__gongdanService__["a" /* GongDanService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__gongdanService__["a" /* GongDanService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]])
], GongdanZhipaiPage);

//# sourceMappingURL=gongdan-zhipai.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-zhipai/gongdan-zhipai.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GongdanZhipaiPageModule", function() { return GongdanZhipaiPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var gongdan_zhipai_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GongdanZhipaiPageModule = (function () {
    function GongdanZhipaiPageModule() {
    }
    return GongdanZhipaiPageModule;
}());
GongdanZhipaiPageModule = gongdan_zhipai_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            GongdanZhipaiPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(GongdanZhipaiPage),
        ],
    })
], GongdanZhipaiPageModule);

//# sourceMappingURL=gongdan-zhipai.module.js.map

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
//# sourceMappingURL=83.js.map