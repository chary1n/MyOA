webpackJsonp([78],{

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/journal-sheet.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__writejournalService__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(238);
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
 * Generated class for the JournalSheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JournalSheetPage = (function () {
    function JournalSheetPage(navCtrl, navParams, statusBar, writejournalService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.writejournalService = writejournalService;
        this.storage = storage;
        this.isWrite = true;
        this.isLook = false;
        this.num = 0;
        this.title = '写日志';
        this.admin = false;
        this.manager = false;
        this.team_list = [];
    }
    JournalSheetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JournalSheetPage');
        this.writeImg = "assets/img/journal_sheet/write_logcolor.png";
        this.lookImg = "assets/img/journal_sheet/look_log.png";
    };
    JournalSheetPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            if (res.result.res_data.team) {
                _this.team_id = res.result.res_data.team.team_id;
                _this.getStartList();
            }
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == "group_sale_manager") {
                    _this.admin = true;
                    _this.getStartList();
                    break;
                }
                if (product.name == "group_sale_salesman_all_leads") {
                    _this.manager = true;
                    _this.writejournalService.get_sale_team(_this.user_id).then(function (res) {
                        if (res.result.res_code == 1 && res.result) {
                            console.log(res);
                            var list = res.result.res_data;
                            var length = list.length;
                            for (var i = 0; i < length; i++) {
                                _this.team_list[i] = list[i].team_id;
                            }
                            _this.getStartList();
                        }
                    });
                }
            }
        });
    };
    //获取数目
    JournalSheetPage.prototype.getStartList = function () {
        var _this = this;
        var body = {
            today: true,
            num: true,
            todayTime: __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].dateFormat(new Date(), 'yyyy-MM-dd'),
            uid: this.user_id,
            team_id: this.team_id,
            admin: this.admin,
            manager: this.manager,
            team_list: this.team_list
        };
        this.writejournalService.get_visit_list(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.num = res.result.res_data.num;
            }
        });
    };
    JournalSheetPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    JournalSheetPage.prototype.visit = function () {
        this.navCtrl.push('WriteJournalPage');
        // this.navCtrl.push('WriteJournalPage',{team: this.team})
    };
    JournalSheetPage.prototype.chooseWrite = function () {
        this.isWrite = true;
        this.isLook = false;
        this.writeImg = "assets/img/journal_sheet/write_logcolor.png";
        this.lookImg = "assets/img/journal_sheet/look_log.png";
        this.title = '写日志';
    };
    JournalSheetPage.prototype.chooseLook = function () {
        this.isWrite = false;
        this.isLook = true;
        this.writeImg = "assets/img/journal_sheet/write_log.png";
        this.lookImg = "assets/img/journal_sheet/look_logcolor.png";
        this.title = '看日志';
    };
    JournalSheetPage.prototype.get_visit_list = function () {
        this.navCtrl.push("VisitListPage");
    };
    return JournalSheetPage;
}());
JournalSheetPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-journal-sheet',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/journal-sheet.html"*/'<!--\n  Generated template for the JournalSheetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f2f5">\n    <div class=\'dividingLine\'>\n    </div>\n    <div class=\'writebackgroud\' *ngIf="isWrite">\n        <ion-grid>\n            <ion-row>\n                <ion-col  tappable (click)="visit()" style="margin-left:20px">\n                      <img style="width: 55px; height: 55px;" src="assets/img/journal_sheet/record_visit.png">\n                      <div style="color:#333333">拜访记录</div>\n                  </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n    <div *ngIf="isLook" style="background:#ffffff">\n      <ion-grid>\n        <ion-row style="height:100px;text-align:center;">\n          <ion-col col-6 style="\n          border-right: 1px rgb(230, 230, 230) solid;\n          border-bottom: 1px rgb(230, 230, 230) solid;\n          display:flex; align-items:center\n          " tappable (click)="get_visit_list()">\n          <div style="padding:1px;margin-left: auto;margin-right: auto;">\n              <p text-wrap style="font-size:14px;color:#333333;line-height:14px;">拜访记录</p>\n              <p style="font-size:12px;color:#666666;line-height:12px;">今日\n                <span style="color:#1897f2;font-size:12px;">{{num}}</span>\n              </p>\n          </div>\n          </ion-col>\n          <ion-col col-6 style="\n          border-bottom: 1px rgb(230, 230, 230) solid;\n          display:flex; align-items:center\n          ">\n          <div style="padding:1px;margin-left: auto;margin-right: auto;">\n              <!-- <p text-wrap style="font-size:14px;color:#333333;line-height:14px;">XXXXXX</p>\n              <p style="font-size:12px;color:#666666;line-height:12px;">一些指标\n                <span style="color:#1897f2;font-size:12px;">5%</span>\n              </p> -->\n          </div>\n          </ion-col>\n        </ion-row>\n        <ion-row style="height:100px;text-align:center;">\n            <ion-col col-6 style="\n            border-right: 1px rgb(230, 230, 230) solid;\n            display:flex; align-items:center\n            ">\n            <div style="padding:1px;margin-left: auto;margin-right: auto;">\n                <!-- <p text-wrap style="font-size:14px;color:#333333;line-height:14px;">XXXXXX</p>\n                <p style="font-size:12px;color:#666666;line-height:12px;">一些指标\n                  <span style="color:#1897f2;font-size:12px;">5%</span>\n                </p> -->\n            </div>\n            </ion-col>\n            <ion-col col-6 style="display:flex; align-items:center">\n                <div style="padding:1px;margin-left: auto;margin-right: auto;">\n                    <!-- <p text-wrap style="font-size:14px;color:#333333;line-height:14px;">XXXXXX</p>\n                    <p style="font-size:12px;color:#666666;line-height:12px;">一些指标\n                      <span style="color:#1897f2;font-size:12px;">5%</span>\n                    </p> -->\n                </div>\n            </ion-col>\n          </ion-row>\n      </ion-grid>\n    </div>\n</ion-content>\n<ion-footer>\n    <div style="background:#ffffff;">\n<ion-grid>\n    <ion-row style="text-align:center;height:50px">\n      <ion-col col-6 style="display:flex; align-items:center" tappable (click)="chooseWrite()">\n      <div style="margin-left: auto;margin-right: auto;">\n          <img src={{writeImg}} style="width:30px;height:30px">\n          <p  text-wrap style="font-size:10px;line-height:1px;"\n          [ngClass]="{true:\'textcolor1\',false:\'textcolor_normal\'}[isWrite]">写日志</p>\n      </div>\n      </ion-col>\n      <ion-col col-6 style="display:flex; align-items:center" tappable (click)="chooseLook()">\n      <div style="margin-left: auto;margin-right: auto;">\n        <img src={{lookImg}} style="width:30px;height:30px">\n          <p text-wrap style="font-size:10px;line-height:1px;"\n          [ngClass]="{true:\'textcolor1\',false:\'textcolor_normal\'}[isLook]">看日志</p>\n      </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/journal-sheet.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__writejournalService__["a" /* WriteJournalService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_0__writejournalService__["a" /* WriteJournalService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], JournalSheetPage);

//# sourceMappingURL=journal-sheet.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/journal-sheet.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JournalSheetPageModule", function() { return JournalSheetPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var journal_sheet_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var JournalSheetPageModule = (function () {
    function JournalSheetPageModule() {
    }
    return JournalSheetPageModule;
}());
JournalSheetPageModule = journal_sheet_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            JournalSheetPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(JournalSheetPage),
        ],
    })
], JournalSheetPageModule);

//# sourceMappingURL=journal-sheet.module.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WriteJournalService; });
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


var WriteJournalService = (function () {
    function WriteJournalService(httpservice) {
        this.httpservice = httpservice;
    }
    //创建拜访记录
    WriteJournalService.prototype.create_visit_journal = function (body) {
        return this.httpservice.postBody("create_visit", body);
    };
    //获取拜访列表
    WriteJournalService.prototype.get_visit_list = function (body) {
        return this.httpservice.postBody("get_visit_list", body);
    };
    //获取管理的销售团队
    WriteJournalService.prototype.get_sale_team = function (uid) {
        var body = JSON.stringify({
            uid: uid
        });
        return this.httpservice.postBody("get_sale_team", body);
    };
    //获取所有的销售团队
    WriteJournalService.prototype.get_all_sale_team = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_sale_team", body);
    };
    //获取团队的销售员
    WriteJournalService.prototype.get_saleteam_person = function (body) {
        return this.httpservice.postBody("get_saleteam_person", body);
    };
    return WriteJournalService;
}());
WriteJournalService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], WriteJournalService);

//# sourceMappingURL=writejournalService.js.map

/***/ })

});
//# sourceMappingURL=78.js.map