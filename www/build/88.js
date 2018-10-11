webpackJsonp([88],{

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/who-can-see/who-can-see.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gongdanService__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the WhoCanSeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var WhoCanSeePage = (function () {
    function WhoCanSeePage(navCtrl, navParams, gongdanService, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gongdanService = gongdanService;
        this.statusbar = statusbar;
        this.showDepartmentList = false;
        this.direction = "↓";
        this.need_pop_reback = this.navParams.get('need_pop_reback');
        if (this.need_pop_reback) {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("RebackGongdanPage", navCtrl);
        }
        else {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("CreateGongdanPage", navCtrl);
        }
        this.companyIschoosed = this.navParams.get("companyIschoosed");
    }
    WhoCanSeePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WhoCanSeePage');
    };
    WhoCanSeePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
        this.chooseList = this.navParams.get('chooseList');
        this.departmentList = this.navParams.get('departmentList');
        if (!this.departmentList) {
            this.gongdanService.getDepartment().then(function (res) {
                console.log(res);
                if (res.result.res_code == 1) {
                    _this.departmentList = res.result.res_data.all_departments.res_data;
                }
            });
        }
        if (this.chooseList) {
            this.companyIschoosed = false;
            this.chooseDepartmentName = this.navParams.get('chooseDepartmentName');
            console.log(this.chooseDepartmentName);
        }
        console.log(this.chooseList);
    };
    WhoCanSeePage.prototype.conform = function () {
        this.frontPage.data.companyIschoosed = this.companyIschoosed;
        if (this.companyIschoosed) {
            this.frontPage.data.chooseList = [];
        }
        else {
            this.frontPage.data.chooseList = this.chooseList;
        }
        this.frontPage.data.chooseDepartmentName = this.chooseDepartmentName;
        this.frontPage.data.departmentList = this.departmentList;
        this.navCtrl.popTo(this.frontPage);
    };
    WhoCanSeePage.prototype.chooseCompany = function () {
        this.companyIschoosed = !this.companyIschoosed;
        if (this.companyIschoosed) {
            for (var i = 0; i < this.departmentList.length; i++) {
                this.departmentList[i].ischeck = false;
            }
            this.chooseList = [];
            this.chooseDepartmentName = "";
        }
        console.log(this.companyIschoosed);
    };
    WhoCanSeePage.prototype.chooseDepartment = function () {
        this.showDepartmentList = !this.showDepartmentList;
        if (this.showDepartmentList) {
            this.direction = "↑";
        }
        else {
            this.direction = "↓";
        }
    };
    WhoCanSeePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    WhoCanSeePage.prototype.chooseItem = function (item) {
        item.ischeck = !item.ischeck;
        this.conformClick();
    };
    WhoCanSeePage.prototype.conformClick = function () {
        this.chooseList = [];
        for (var i = 0; i < this.departmentList.length; i++) {
            if (this.departmentList[i].ischeck) {
                this.chooseList.push(this.departmentList[i].id);
                this.chooseDepartmentName = this.chooseDepartmentName + this.departmentList[i].name;
            }
        }
        if (this.chooseList.length > 0) {
            this.companyIschoosed = false;
        }
    };
    return WhoCanSeePage;
}());
WhoCanSeePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-who-can-see',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/who-can-see/who-can-see.html"*/'<!--\n  Generated template for the WhoCanSeePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n\n  <ion-navbar hideBackButton="true" color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>谁可以看</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)=\'conform()\'>\n        确定\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <ion-item>\n    <ion-label> 全公司</ion-label>\n    <ion-checkbox (click)="chooseCompany()" [checked]="companyIschoosed" ></ion-checkbox>\n  </ion-item>\n\n  <ion-item  (click)="chooseDepartment()">\n      <span style="float:right;text-align: right;" class="span_x">{{direction}}</span>\n    指定部门\n  </ion-item>\n  <ion-list *ngIf="showDepartmentList" >\n    <ion-item *ngFor="let item of departmentList;let i = index">\n      <ion-label> {{item.name}}</ion-label>\n      <ion-checkbox (click)="chooseItem(item)" [checked]=item.ischeck></ion-checkbox>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/who-can-see/who-can-see.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__gongdanService__["a" /* GongDanService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_nav_params__["a" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */]])
], WhoCanSeePage);

//# sourceMappingURL=who-can-see.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/who-can-see/who-can-see.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhoCanSeePageModule", function() { return WhoCanSeePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var who_can_see_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WhoCanSeePageModule = (function () {
    function WhoCanSeePageModule() {
    }
    return WhoCanSeePageModule;
}());
WhoCanSeePageModule = who_can_see_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            WhoCanSeePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(WhoCanSeePage),
        ],
    })
], WhoCanSeePageModule);

//# sourceMappingURL=who-can-see.module.js.map

/***/ }),

/***/ 739:
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
//# sourceMappingURL=88.js.map