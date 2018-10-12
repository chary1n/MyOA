webpackJsonp([77],{

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/visit-biaoqian/visit-biaoqian.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__writejournalService__ = __webpack_require__(752);
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
 * Generated class for the VisitBiaoqianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitBiaoqianPage = (function () {
    function VisitBiaoqianPage(navCtrl, navParams, statusBar, writeService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.writeService = writeService;
        this.storage = storage;
        this.person_id = -1;
        this.isShowTeam = false;
        this.team_id = -1;
        this.teamPerson = this.navParams.get('item');
        this.team_id = this.navParams.get('team_id');
        this.frontPage = __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].getViewController("VisitListPage", navCtrl);
        console.log(this.teamPerson);
    }
    VisitBiaoqianPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitBiaoqianPage');
    };
    VisitBiaoqianPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            console.log(res.result.res_data.groups);
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == "group_sale_manager") {
                    _this.isShowTeam = true;
                    _this.writeService.get_all_sale_team().then(function (res) {
                        res.res_data;
                        if (res.result.res_code == 1 && res.result) {
                            console.log(res);
                            _this.teamList = res.result.res_data;
                        }
                    });
                    break;
                }
                if (product.name == "group_sale_salesman_all_leads") {
                    _this.isShowTeam = true;
                    _this.writeService.get_sale_team(_this.user_id).then(function (res) {
                        res.res_data;
                        if (res.result.res_code == 1 && res.result) {
                            console.log(res);
                            _this.teamList = res.result.res_data;
                        }
                    });
                }
            }
        });
    };
    VisitBiaoqianPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    //重置
    VisitBiaoqianPage.prototype.cancel_biaoqian = function () {
        this.person_id = -1;
        for (var _i = 0, _a = this.teamPerson; _i < _a.length; _i++) {
            var items = _a[_i];
            if (items.user_id == -1) {
                items.is_choose = true;
                this.isCheck(items);
            }
            else {
                items.is_choose = false;
            }
        }
        this.team_id = -1;
        for (var _b = 0, _c = this.teamList; _b < _c.length; _b++) {
            var items = _c[_b];
            items.isChoose = false;
        }
    };
    //完成
    VisitBiaoqianPage.prototype.confirm_biaoqian = function () {
        console.log('biaoqian=>person_id = ' + this.person_id);
        this.frontPage.data.person_id = this.person_id;
        this.frontPage.data.team_id = this.team_id;
        this.navCtrl.popTo(this.frontPage);
    };
    VisitBiaoqianPage.prototype.isCheck = function (item) {
        var isChoose = false;
        isChoose = item.is_choose;
        return isChoose;
    };
    VisitBiaoqianPage.prototype.isShowBack = function (item) {
        var isShow = false;
        isShow = item.isChoose;
        return isShow;
    };
    //点击团队
    VisitBiaoqianPage.prototype.checkTeam = function (item) {
        var _this = this;
        this.team_id = item.team_id;
        for (var _i = 0, _a = this.teamList; _i < _a.length; _i++) {
            var items = _a[_i];
            if (items.team_id == this.team_id) {
                items.isChoose = true;
            }
            else {
                items.isChoose = false;
            }
        }
        var body = {
            team_id: item.team_id
        };
        this.writeService.get_saleteam_person(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.teamPerson = res.result.res_data;
            }
        });
    };
    VisitBiaoqianPage.prototype.checkOther = function (item) {
        var personId = item.user_id;
        this.person_id = personId;
        console.log('personId = ' + personId);
        for (var _i = 0, _a = this.teamPerson; _i < _a.length; _i++) {
            var items = _a[_i];
            if (items.user_id == personId) {
                items.is_choose = true;
            }
            else {
                items.is_choose = false;
            }
        }
    };
    return VisitBiaoqianPage;
}());
VisitBiaoqianPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-visit-biaoqian',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/visit-biaoqian/visit-biaoqian.html"*/'<!--\n  Generated template for the VisitBiaoqianPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>筛选</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n        <div text-aligh:center style="background:#f0f2f5;padding:1px;" *ngIf="isShowTeam">\n          <p  style="font-size:12px;color:#8a9399;padding-left:15px;line-height:5px">销售团队</p>\n      </div>\n      <ion-grid *ngIf="isShowTeam">\n          <ion-row style="text-align:center;height:50px;line-height:50px">\n              <ion-col  col-3 *ngFor=\'let item of teamList\' tappable (click)="checkTeam(item)">\n                <div style="padding:1px;" [ngClass]="{true:\'backcolor1\',false:\'backcolor_normal\'}[isShowBack(item)]">\n                  <p text-wrap  style="font-size:13px;height:25px;line-height:10px;padding-top:5px">\n                      {{item.team_name}}\n                  </p>\n                </div>\n              </ion-col>\n            </ion-row>\n      </ion-grid>\n    <div text-aligh:center style="background:#f0f2f5;padding:1px;margin-top:180px">\n        <p  style="font-size:12px;color:#8a9399;padding-left:15px;line-height:5px">销售员</p>\n    </div>\n    <ion-grid>\n        <ion-row style="text-align:center;height:50px;line-height:50px">\n            <ion-col  col-3 *ngFor=\'let item of teamPerson\' tappable (click)="checkOther(item)">\n              <div style="padding:1px;" [ngClass]="{true:\'backcolor1\',false:\'backcolor_normal\'}[isCheck(item)]">\n                <p text-wrap  style="font-size:13px;height:25px;line-height:10px;padding-top:5px">\n                    {{item.user_name}}\n                </p>\n              </div>\n            </ion-col>\n          </ion-row>\n    </ion-grid>\n</ion-content>\n\n<ion-footer >\n    <div style="background:white">\n<span align="center" style=\'width:50%;float:left; background-color:#fba958;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="cancel_biaoqian()">\n重置\n</span>\n<span align="center" style=\'width:50%;float:right;background-color:#1eabfe;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="confirm_biaoqian()">\n完成\n</span>\n</div>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/visit-biaoqian/visit-biaoqian.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__writejournalService__["a" /* WriteJournalService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__writejournalService__["a" /* WriteJournalService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], VisitBiaoqianPage);

//# sourceMappingURL=visit-biaoqian.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/visit-biaoqian/visit-biaoqian.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitBiaoqianPageModule", function() { return VisitBiaoqianPageModule; });
/* harmony import */ var visit_biaoqian_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var visit_biaoqian_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var visit_biaoqian_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VisitBiaoqianPageModule = (function () {
    function VisitBiaoqianPageModule() {
    }
    return VisitBiaoqianPageModule;
}());
VisitBiaoqianPageModule = visit_biaoqian_module___decorate([
    visit_biaoqian_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            VisitBiaoqianPage,
        ],
        imports: [
            visit_biaoqian_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(VisitBiaoqianPage),
        ],
    })
], VisitBiaoqianPageModule);

//# sourceMappingURL=visit-biaoqian.module.js.map

/***/ }),

/***/ 752:
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
//# sourceMappingURL=77.js.map