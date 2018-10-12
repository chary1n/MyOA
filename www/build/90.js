webpackJsonp([90],{

/***/ 654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/at-me-list/at-me-list.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gongdanService__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the AtMeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AtMeListPage = (function () {
    function AtMeListPage(navCtrl, navParams, gongdanService, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gongdanService = gongdanService;
        this.statusbar = statusbar;
        this.gongdanList = [];
        this.gongdanList = this.navParams.get("gongdanList");
        this.title = this.navParams.get('title');
        this.userName = __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user.name;
    }
    AtMeListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyGongdanListPage');
    };
    AtMeListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            assign: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            reply: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            isSearchOrder: true,
            isRead: false
        });
        this.gongdanService.searchAtMeWithLoading(body).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.gongdanList = res.result.res_data;
            }
        });
    };
    AtMeListPage.prototype.toDetail = function (item) {
        var _this = this;
        this.gongdanService.getGongdanDetail(item.work_order_id).then(function (res) {
            console.log(res);
            if (res.result.res_data && res.result.res_code == 1) {
                _this.navCtrl.push('GongdanDetailPage', {
                    items: res.result.res_data,
                });
            }
        });
    };
    AtMeListPage.prototype.changeDate = function (date) {
        if (date) {
            var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
            return new_date;
        }
    };
    AtMeListPage.prototype.isReadStyle = function (item) {
        return item.isRead;
        // return false 
    };
    AtMeListPage.prototype.changePriority = function (priority) {
        if (priority == "1") {
            return "低";
        }
        else if (priority == "2") {
            return "中";
        }
        else if (priority == "3") {
            return "高";
        }
    };
    // changeState(state){
    //   if(state="unaccept"){
    //     return "未设置受理人"
    //   }else if(state="unassign"){
    //     return "未指派"
    //   }else if(state="process"){
    //     return "处理中"
    //   }else if(state="check"){
    //     return "待审核"
    //   }
    // }
    AtMeListPage.prototype.changeState = function (item) {
        var state_str = "";
        if (item == "unaccept") {
            state_str = "等待受理";
        }
        else if (item == "process") {
            state_str = "受理中";
        }
        else if (item == "check") {
            state_str = "待验收";
        }
        else if (item == "done") {
            state_str = "已完成";
        }
        else if (item == "draft") {
            state_str = "草稿";
        }
        return state_str;
    };
    AtMeListPage.prototype.getProprityImgSrc = function (item) {
        if (item.priority == "3") {
            return "assets/img/work_bench/up_one.png";
        }
        else if (item.priority == "2") {
            return "assets/img/work_bench/up_two.png";
        }
        else if (item.priority == "1") {
            return "assets/img/work_bench/up_three.png";
        }
    };
    return AtMeListPage;
}());
AtMeListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-at-me-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/at-me-list/at-me-list.html"*/'<!--\n  Generated template for the AtMeListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>我的消息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background:white">\n  <ion-item-group no-lines style="background:white;">\n    <div *ngFor="let item of gongdanList" (click)="toDetail(item)">\n      <div style="margin-top:10px;margin-bottom:10px;">\n        <img src={{item.create_user.user_ava}} style="width:10px;height:10px;margin-top:5px;margin-left:10px;">\n        <span p style="float:right;margin-right:10px;color:#fba796;font-size:13px;">\n          {{changeState(item.issue_state)}}\n        </span>\n        <span p style="font-size:12px;color:#8a9299;margin-left:5px">\n          {{item.at_me_create_user.name}}\n          <span p style="font-size:12px;color:#8a9299;margin-left:5px">\n            {{(changeDate(item.at_me_time) | date:\'yyyy-MM-dd HH:mm\')}}\n          </span>\n        </span>\n      </div>\n      <P  *ngIf="item.at_me_type==\'reply\'" \n      [ngClass]="{true:\'isRead\',false:\'noRead\'}[isReadStyle(item)]"\n      text-wrap style="margin-left:15px;margin-right:15px;font-size:18px;margin-top:3px">\n        {{item.at_me_description}}\n      </P>\n      <P  *ngIf="item.at_me_type!=\'reply\'" \n      [ngClass]="{true:\'isRead\',false:\'noRead\'}[isReadStyle(item)]"\n      text-wrap style="margin-left:15px;margin-right:15px;font-size:18px;margin-top:3px">\n        {{item.at_me_description}} @{{userName}}\n      </P>\n\n      <div style="padding:10px;">\n        <div style="background:#f8f8f8;">\n          <div>\n            <span class="title_class_style" \n            [ngClass]="{true:\'isRead\',false:\'noRead\'}[isReadStyle(item)]"\n             style="margin-left:10px;margin-top:10px; display: inline-block;\n             white-space: nowrap;\n             vertical-align: bottom;\n             overflow: hidden;\n             width:70%;\n             text-overflow: ellipsis;">\n              {{item.title}}\n            </span>\n          </div>\n          <div style="margin-top:5px;margin-bottom:10px;">\n            <img src={{item.create_user.user_ava}} style="width:10px;height:10px;margin-top:5px;margin-left:10px;">\n            <span p style="font-size:12px;color:#8a9299;margin-left:5px">\n              {{item.create_user.name}}\n              <span p style="font-size:12px;color:#8a9299;margin-left:5px">\n                {{(changeDate(item.create_time) | date:\'yyyy-MM-dd HH:mm\')}}\n              </span>\n            </span>\n          </div>\n          <div style="height:1px;background:white">\n          </div>\n        </div>\n\n      </div>\n      <div style="height:1px;background:#ececec"></div>\n    </div>\n  </ion-item-group>\n  <div align="center" *ngIf="!gongdanList || gongdanList.length == 0">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/nodataimg.png">\n      <p style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">空空如也～</p>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/at-me-list/at-me-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__gongdanService__["a" /* GongDanService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], AtMeListPage);

//# sourceMappingURL=at-me-list.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/at-me-list/at-me-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtMeListPageModule", function() { return AtMeListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var at_me_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AtMeListPageModule = (function () {
    function AtMeListPageModule() {
    }
    return AtMeListPageModule;
}());
AtMeListPageModule = at_me_list_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AtMeListPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AtMeListPage),
        ],
    })
], AtMeListPageModule);

//# sourceMappingURL=at-me-list.module.js.map

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
//# sourceMappingURL=90.js.map