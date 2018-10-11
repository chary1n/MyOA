webpackJsonp([16],{

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/shengouAutoService.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShenGouAutoService = (function () {
    function ShenGouAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    ShenGouAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var arr = [];
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        return arr;
    };
    return ShenGouAutoService;
}());
ShenGouAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], ShenGouAutoService);

//# sourceMappingURL=shengouAutoService.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/shengoupage.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shengouService__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_HttpService__ = __webpack_require__(100);
var shengoupage___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var shengoupage___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ShengoupagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ShengoupagePage = (function () {
    function ShengoupagePage(navCtrl, navParams, shengouService, storage, shenGouAutoService, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shengouService = shengouService;
        this.storage = storage;
        this.shenGouAutoService = shenGouAutoService;
        this.alertCtrl = alertCtrl;
        this.pet = "2";
        this.isMoreData1 = true;
        this.isMoreData2 = true;
        this.isMoreData3 = true;
        this.wait_approval_count = 0;
        this.department = false;
        this.storage.get('user')
            .then(function (res) {
            if (res.result.res_data.department) {
                _this.department = true;
            }
            _this.user_id = res.result.res_data.user_id;
            _this.limit = 20;
            _this.offset = 0;
            _this.shengouService.get_wait_audit_purchase(_this.limit, _this.offset, _this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.wait_me_audit_list = res.result.res_data;
                }
            });
        });
    }
    ShengoupagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShengoupagePage');
    };
    ShengoupagePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.navParams);
        if (this.navParams.get('need_fresh') == true) {
            this.reloadData(null);
            this.navParams.data.need_fresh = false;
        }
        this.shengouService.get_shengou_count(__WEBPACK_IMPORTED_MODULE_5__providers_HttpService__["a" /* HttpService */].user_id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.wait_approval_count = res.result.res_data.acount;
            }
        });
    };
    ShengoupagePage.prototype.clickMyApply = function () {
        this.reloadData(null);
    };
    ShengoupagePage.prototype.clickWaitMeApply = function () {
        this.reloadData(null);
    };
    ShengoupagePage.prototype.clickAlreadyApply = function () {
        this.reloadData(null);
    };
    ShengoupagePage.prototype.changeState = function (item) {
        if (item == "draft") {
            return "草稿";
        }
        else if (item == "submit") {
            return "提交";
        }
        else if (item == "manager1_approve") {
            return "一级审核";
        }
        else if (item == "manager2_approve") {
            return "二级审核";
        }
        else if (item == "manager3_approve") {
            return "三级审核";
        }
        else if (item == "cancel") {
            return "取消";
        }
        else if (item == "approve") {
            return "批准";
        }
        else if (item == "done") {
            return "完成";
        }
    };
    ShengoupagePage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    ShengoupagePage.prototype.shengou_detail = function (item) {
        this.navCtrl.push('MyshengoudetailPage', {
            item: item,
        });
    };
    ShengoupagePage.prototype.reloadData = function (refresh) {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        if (this.pet == "1") {
            this.isMoreData1 = true;
            this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then(function (res) {
                // console.log(res.result.res_data)
                if (res.result && res.result.res_code == 1) {
                    _this.myApplyList = res.result.res_data;
                }
            });
            this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then(function (res) {
                console.log(res.result.res_data);
                if (refresh) {
                    refresh.complete();
                }
                if (res.result && res.result.res_code == 1) {
                    _this.myApplyList = res.result.res_data;
                }
            });
        }
        else if (this.pet == "3") {
            this.isMoreData3 = true;
            this.shengouService.get_audited_purchase(this.limit, this.offset, this.user_id).then(function (res) {
                console.log(res.result.res_data);
                if (refresh) {
                    refresh.complete();
                }
                if (res.result && res.result.res_code == 1) {
                    _this.audited_list = res.result.res_data;
                }
            });
        }
        else if (this.pet == "2") {
            this.isMoreData2 = true;
            this.shengouService.get_wait_audit_purchase(this.limit, this.offset, this.user_id).then(function (res) {
                console.log(res.result.res_data);
                if (refresh) {
                    refresh.complete();
                }
                if (res.result && res.result.res_code == 1) {
                    _this.wait_me_audit_list = res.result.res_data;
                }
            });
        }
    };
    ShengoupagePage.prototype.createApply = function () {
        if (this.department) {
            this.navCtrl.push('CreateShengouPage', {});
        }
        else {
            var ctrl = this.alertCtrl;
            ctrl.create({
                title: '提示',
                subTitle: "该用户没有设置员工,请联系管理员",
                buttons: [{
                        text: '确定',
                        handler: function () {
                        }
                    }
                ]
            }).present();
        }
    };
    ShengoupagePage.prototype.doRefresh = function (refresh) {
        this.reloadData(refresh);
    };
    ShengoupagePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.pet == "1") {
            if (this.isMoreData1 == true) {
                this.limit = 20;
                this.offset += 20;
                this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then(function (res) {
                    // console.log(res)
                    if (res.result && res.result.res_code == 1) {
                        if (res.result.res_data) {
                            if (res.result.res_data.length == 20) {
                                _this.isMoreData1 = true;
                            }
                            else {
                                _this.isMoreData1 = false;
                            }
                            for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.myApplyList.push(item);
                            }
                        }
                        else {
                            _this.isMoreData1 = false;
                        }
                    }
                    else {
                        _this.isMoreData1 = false;
                    }
                    infiniteScroll.complete();
                });
            }
            else {
                infiniteScroll.complete();
            }
        }
        else if (this.pet == "2") {
            if (this.isMoreData2 == true) {
                this.limit = 20;
                this.offset += 20;
                this.shengouService.get_wait_audit_purchase(this.limit, this.offset, this.user_id).then(function (res) {
                    // console.log(res.result.res_data)
                    if (res.result && res.result.res_code == 1) {
                        if (res.result.res_data) {
                            if (res.result.res_data.length == 20) {
                                _this.isMoreData2 = true;
                            }
                            else {
                                _this.isMoreData2 = false;
                            }
                            for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.wait_me_audit_list.push(item);
                            }
                        }
                        else {
                            _this.isMoreData2 = false;
                        }
                    }
                    else {
                        _this.isMoreData2 = false;
                    }
                    infiniteScroll.complete();
                });
            }
            else {
                infiniteScroll.complete();
            }
        }
        else if (this.pet == "3") {
            if (this.isMoreData3 == true) {
                this.limit = 20;
                this.offset += 20;
                this.shengouService.get_audited_purchase(this.limit, this.offset, this.user_id).then(function (res) {
                    // console.log(res.result.res_data)
                    if (res.result && res.result.res_code == 1) {
                        if (res.result.res_data) {
                            if (res.result.res_data.length == 20) {
                                _this.isMoreData3 = true;
                            }
                            else {
                                _this.isMoreData3 = false;
                            }
                            for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.myApplyList.push(item);
                            }
                        }
                        else {
                            _this.isMoreData3 = false;
                        }
                    }
                    else {
                        _this.isMoreData3 = false;
                    }
                    infiniteScroll.complete();
                });
            }
            else {
                infiniteScroll.complete();
            }
        }
    };
    ShengoupagePage.prototype.itemSelected = function (event) {
        var _this = this;
        var search_text = event.name.replace("搜 单号：", "");
        if (this.pet == "1") {
            this.shengouService.search_shengou(search_text, this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.myApplyList = res.result.res_data;
                }
                else {
                    _this.myApplyList = [];
                }
            });
        }
        else if (this.pet == "2") {
            this.shengouService.search_wait_me_audit(search_text, this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.wait_me_audit_list = res.result.res_data;
                }
                else {
                    _this.wait_me_audit_list = [];
                }
            });
        }
        else if (this.pet == "3") {
            this.shengouService.search_audited(search_text, this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.audited_list = res.result.res_data;
                }
                else {
                    _this.audited_list = [];
                }
            });
        }
    };
    ShengoupagePage.prototype.audited_detail = function (item) {
        var _this = this;
        this.shengouService.getAuditDetail(item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push("AuditedPurchasePage", { item: res.result.res_data });
            }
        });
    };
    ShengoupagePage.prototype.wait_audit_detail = function (item) {
        var _this = this;
        this.shengouService.getAuditDetail(item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push("AuditedPurchasePage", { item: res.result.res_data });
            }
        });
    };
    return ShengoupagePage;
}());
ShengoupagePage = shengoupage___decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-shengoupage',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/shengoupage.html"*/'<!--\n  Generated template for the ShengoupagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>申购</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet"> \n      <ion-segment-button tappable (click)=\'clickMyApply()\' value="1">\n        我的申购\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickWaitMeApply()\' value="2">\n        待我审批({{wait_approval_count}})\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickAlreadyApply()\' value="3">\n        我已审批\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-auto-complete style="width: 93vw;margin-left:4vw" (itemSelected) = "itemSelected($event)"  [dataProvider]="shenGouAutoService"></ion-auto-complete>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n  <div [ngSwitch]="pet" >\n\n    <ng-template [ngSwitchCase]=\'1\'>\n       <ion-list>\n        <ion-item *ngFor=\'let item of myApplyList\' tappable (click)=\'shengou_detail(item)\'>\n          <!--<h3 text-wrap>{{item.employee_name}}</h3>-->\n          <p text-wrap style="font-size:70%;float:right;color:gray;">{{changeDate(item.create_date) | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n          <h4 text-wrap style="font-size:90%;">{{item.name}}</h4>\n          <p text-wrap style="font-size:70%;float:right;color:red;font-weight:bold"> {{changeState(item.state)}} </p>\n          <p text-wrap style="font-size:80%;color:gray">金额总计(元)：{{item.total_amount}} </p>\n          <p text-wrap style="font-size:80%;color:gray">部门：{{item.department.name}} </p>\n        </ion-item>\n      </ion-list>\n          \n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'2\'>\n      <ion-list>\n        <ion-item *ngFor=\'let item of wait_me_audit_list\' tappable (click)=\'wait_audit_detail(item)\'>\n          <h3 text-wrap>{{item.employee}}</h3>\n          <p text-wrap style="font-size:70%;float:right;color:gray;">{{item.apply_date}}</p>\n          <h4 text-wrap style="font-size:80%;">{{item.name}}</h4>\n          <p text-wrap style="font-size:70%;float:right;color:red;font-weight:bold"> {{changeState(item.state)}} </p>\n          <p text-wrap style="font-size:80%;color:gray">金额总计(元)：{{item.total_amount}} </p>\n          <p text-wrap style="font-size:80%;color:gray">部门：{{item.department}} </p>\n        </ion-item>\n      </ion-list>          \n    </ng-template>\n\n\n    <ng-template [ngSwitchCase]=\'3\'>\n      <ion-list>\n      <ion-item *ngFor=\'let item of audited_list\' tappable (click)=\'audited_detail(item)\'>\n        <h3 text-wrap>{{item.employee}}</h3>\n        <p text-wrap style="font-size:70%;float:right;color:gray;">{{item.apply_date}}</p>\n        <h4 text-wrap style="font-size:80%;">{{item.name}}</h4>\n        <p text-wrap style="font-size:70%;float:right;color:red;font-weight:bold"> {{changeState(item.state)}} </p>\n        <p text-wrap style="font-size:80%;color:gray">金额总计(元)：{{item.total_amount}} </p>\n        <p text-wrap style="font-size:80%;color:gray">部门：{{item.department}} </p>\n      </ion-item>\n    </ion-list>        \n  </ng-template>\n\n\n  </div>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n\n<ion-footer *ngIf = "pet == \'1\'">\n  <button  ion-button full (click)="createApply()">\n  我要申请\n  </button>\n</ion-footer>    \n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/shengoupage.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */], ShenGouAutoService],
    }),
    shengoupage___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], ShenGouAutoService, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ShengoupagePage);

//# sourceMappingURL=shengoupage.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/shengoupage.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShengoupagePageModule", function() { return ShengoupagePageModule; });
/* harmony import */ var shengoupage_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var shengoupage_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(738);
var shengoupage_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ShengoupagePageModule = (function () {
    function ShengoupagePageModule() {
    }
    return ShengoupagePageModule;
}());
ShengoupagePageModule = shengoupage_module___decorate([
    shengoupage_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ShengoupagePage,
        ],
        imports: [
            shengoupage_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ShengoupagePage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], ShengoupagePageModule);

//# sourceMappingURL=shengoupage.module.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoCompleteModule; });
/* unused harmony export AutoCompleteComponent */
/* unused harmony export BoldPrefix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);






// searchbar default options
var defaultOpts = {
    cancelButtonText: 'Cancel',
    showCancelButton: false,
    debounce: 250,
    placeholder: '搜索',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'off',
    type: 'search',
    value: '',
    noItems: '',
    clearOnEdit: false,
    clearInput: false
};
var AutoCompleteComponent = (function () {
    /**
     * create a new instace
     */
    function AutoCompleteComponent() {
        this.hideListOnSelection = true;
        this.showListChanged = false;
        this.keyword = null;
        this.suggestions = [];
        this._showList = false;
        this.itemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemClearSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.ionAutoInput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoFocus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.options = {};
        // set default options
        this.defaultOpts = defaultOpts;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "showList", {
        /**
         * @return {?}
         */
        get: function () {
            return this._showList;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._showList === value) {
                return;
            }
            this._showList = value;
            this.showListChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoCompleteComponent.prototype.ngAfterViewChecked = function () {
        if (this.showListChanged) {
            this.showListChanged = false;
            this.showList ? this.itemsShown.emit() : this.itemsHidden.emit();
        }
    };
    /**
     * get items for auto-complete
     * @return {?}
     */
    AutoCompleteComponent.prototype.getItems = function () {
        var _this = this;
        var /** @type {?} */ result;
        if (this.showResultsFirst && !this.keyword) {
            this.keyword = '';
        }
        else if (this.keyword.trim() === '') {
            this.suggestions = [];
            return;
        }
        if (typeof this.dataProvider === 'function') {
            result = this.dataProvider(this.keyword);
        }
        else {
            result = this.dataProvider.getResults(this.keyword);
        }
        // if result is instanceof Subject, use it asObservable
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]) {
            result = result.asObservable();
        }
        // if query is async
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"]) {
            result
                .subscribe(function (results) {
                _this.suggestions = results;
                _this.showItemList();
            }, function (error) { return console.error(error); });
        }
        else {
            this.suggestions = result;
            this.showItemList();
        }
        // emit event
        this.ionAutoInput.emit(this.keyword);
    };
    /**
     * show item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.showItemList = function () {
        this.showList = true;
    };
    /**
     * hide item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.hideItemList = function () {
        this.showList = this.alwaysShowList;
    };
    /**
     * select item from list
     *
     * @param {?} selection
     *
     * @return {?}
     */
    AutoCompleteComponent.prototype.select = function (selection) {
        // this.keyword = this.dataProvider.labelAttribute == null || selection[this.dataProvider.labelAttribute] == null
        //     ? selection : selection[this.dataProvider.labelAttribute];
        // if (this.hideListOnSelection) {
        //     this.hideItemList();
        // }
        // // emit selection event
        this.hideItemList();
        this.itemSelected.emit(selection);
        this.selection = selection;
    };
    /**
     * get current selection
     * @return {?}
     */
    AutoCompleteComponent.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * get current input value
     * @return {?}
     */
    AutoCompleteComponent.prototype.getValue = function () {
        return this.keyword;
    };
    /**
     * set current input value
     * @param {?} value
     * @return {?}
     */
    AutoCompleteComponent.prototype.setValue = function (value) {
        this.keyword = value;
        return;
    };
    /**
     * /**
     * clear current input value
     * @param {?=} hideItemList
     * @return {?}
     */
    AutoCompleteComponent.prototype.clearValue = function (hideItemList) {
        if (hideItemList === void 0) { hideItemList = false; }
        this.keyword = null;
        this.selection = null;
        if (hideItemList) {
            this.hideItemList();
            this.itemClearSelected.emit(true)
        }
        return;
    };
    /**
     * set focus of searchbar
     * @return {?}
     */
    AutoCompleteComponent.prototype.setFocus = function () {
        if (this.searchbarElem) {
            this.searchbarElem.setFocus();
        }
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onFocus = function () {
        this.autoFocus.emit();
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onBlur = function () {
        this.autoBlur.emit();
    };
    /**
     * handle document click
     * @param {?} event
     * @return {?}
     */
    AutoCompleteComponent.prototype.documentClickHandler = function (event) {
        if ((this.searchbarElem
            && !this.searchbarElem._elementRef.nativeElement.contains(event.target))
            ||
                (!this.inputElem && this.inputElem._elementRef.nativeElement.contains(event.target))) {
            this.hideItemList();
        }
    };
    return AutoCompleteComponent;
}());
AutoCompleteComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                host: {
                    '(document:click)': 'documentClickHandler($event)',
                },
                template: "\n      <ion-input\n              #inputElem\n              (keyup)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [clearOnEdit]=\"options.clearOnEdit == null ? defaultOpts.clearOnEdit : options.clearOnEdit\"\n              [clearInput]=\"options.clearInput == null ? defaultOpts.clearInput : options.clearInput\"\n              [ngClass]=\"{'hidden': !useIonInput}\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-input>\n      <ion-searchbar\n              #searchbarElem\n              (ionInput)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [cancelButtonText]=\"options.cancelButtonText == null ? defaultOpts.cancelButtonText : options.cancelButtonText\"\n              [showCancelButton]=\"options.showCancelButton == null ? defaultOpts.showCancelButton : options.showCancelButton\"\n              [debounce]=\"options.debounce == null ? defaultOpts.debounce : options.debounce\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [autocomplete]=\"options.autocomplete == null ? defaultOpts.autocomplete : options.autocomplete\"\n              [autocorrect]=\"options.autocorrect == null ? defaultOpts.autocorrect : options.autocorrect\"\n              [spellcheck]=\"options.spellcheck == null ? defaultOpts.spellcheck : options.spellcheck\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [ngClass]=\"{'hidden': useIonInput}\"\n              (ionClear)=\"clearValue(true)\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-searchbar>\n      <ng-template #defaultTemplate let-attrs=\"attrs\">\n          <span [innerHTML]='(attrs.labelAttribute ? attrs.data[attrs.labelAttribute] : attrs.data) | boldprefix:attrs.keyword'></span>\n      </ng-template>\n      <ul *ngIf=\"suggestions.length > 0 && showList\">\n          <li *ngFor=\"let suggestion of suggestions\" (tap)=\"select(suggestion);$event.srcEvent.stopPropagation()\">\n              <ng-template\n                      [ngTemplateOutlet]=\"template || defaultTemplate\"\n                      [ngOutletContext]=\"\n                        {attrs:{ data: suggestion, keyword: keyword, labelAttribute: dataProvider.labelAttribute }}\"></ng-template>\n          </li>\n      </ul>\n      <p *ngIf=\"suggestions.length == 0 && showList && options.noItems\">{{ options.noItems }}</p>\n  ",
                selector: 'ion-auto-complete'
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteComponent.ctorParameters = function () { return []; };
AutoCompleteComponent.propDecorators = {
    'dataProvider': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'keyword': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showResultsFirst': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'alwaysShowList': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'hideListOnSelection': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'useIonInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'autoFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'autoBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemClearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsShown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsHidden': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'ionAutoInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'searchbarElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['searchbarElem',] },],
    'inputElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['inputElem',] },],
};

/**
 * bolds the beggining of the matching string in the item
 */
var BoldPrefix = (function () {
    function BoldPrefix() {
    }
    /**
     * @param {?} value
     * @param {?} keyword
     * @return {?}
     */
    BoldPrefix.prototype.transform = function (value, keyword) {
        if (!keyword)
            return value;
        var /** @type {?} */ escaped_keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(escaped_keyword, 'gi'), function (str) { return str.bold(); });
    };
    return BoldPrefix;
}());
BoldPrefix.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"], args: [{
                name: 'boldprefix'
            },] },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BoldPrefix.ctorParameters = function () { return []; };

var AutoCompleteModule = (function () {
    function AutoCompleteModule() {
    }
    /**
     * @return {?}
     */
    AutoCompleteModule.forRoot = function () {
        return {
            ngModule: AutoCompleteModule,
            providers: []
        };
    };
    return AutoCompleteModule;
}());
AutoCompleteModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* IonicModule */]
                ],
                declarations: [
                    AutoCompleteComponent,
                    BoldPrefix
                ],
                exports: [
                    AutoCompleteComponent,
                    BoldPrefix
                ]
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteModule.ctorParameters = function () { return []; };




/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShenGouService; });
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


var ShenGouService = (function () {
    function ShenGouService(httpservice) {
        this.httpservice = httpservice;
    }
    ShenGouService.prototype.getshengouList = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_shengoulist", body);
    };
    ShenGouService.prototype.refuse_shengou = function (user_id, reason, sheet_id) {
        var body = JSON.stringify({
            reason: reason,
            sheet_id: sheet_id,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_shengou", body);
    };
    ShenGouService.prototype.reset_shengou = function (user_id, sheet_id, data, department_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            line_data: data,
            department_id: department_id,
        });
        return this.httpservice.postBody("reset_shengou", body);
    };
    ShenGouService.prototype.get_all_departments = function (user_id) {
        var body = JSON.stringify({
            partner_id: user_id,
        });
        return this.httpservice.postBody("get_all_departments", body);
    };
    ShenGouService.prototype.get_all_products = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_products", body);
    };
    ShenGouService.prototype.create_shengou = function (data) {
        var body = JSON.stringify(data);
        console.log("JSON 的body 是" + body);
        return this.httpservice.postBody("create_shengou", body);
    };
    ShenGouService.prototype.search_shengou = function (search_text, user_id) {
        var body = JSON.stringify({
            search_text: search_text,
            user_id: user_id,
        });
        return this.httpservice.postBody("search_shengou", body);
    };
    ShenGouService.prototype.search_wait_me_audit = function (search_text, user_id) {
        var body = JSON.stringify({
            search_text: search_text,
            user_id: user_id,
            type: 'wait'
        });
        return this.httpservice.postBody("search_shengou2", body);
    };
    ShenGouService.prototype.search_audited = function (search_text, user_id) {
        var body = JSON.stringify({
            search_text: search_text,
            user_id: user_id,
            type: 'audited'
        });
        return this.httpservice.postBody("search_shengou2", body);
    };
    ShenGouService.prototype.get_audited_purchase = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
            type: "audited"
        });
        return this.httpservice.postBody("audited_purchase", body);
    };
    ShenGouService.prototype.get_wait_audit_purchase = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
            type: "wait"
        });
        return this.httpservice.postBody("audited_purchase", body);
    };
    ShenGouService.prototype.confirm1 = function (sheet_id, user_id, title, type) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: title,
            type: type
        });
        return this.httpservice.postBody("confirm_purchase", body);
    };
    ShenGouService.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_audit", body);
    };
    ShenGouService.prototype.getAuditDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_audit_detail", body);
    };
    ShenGouService.prototype.push_apply = function (sheet_id, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
        });
        return this.httpservice.postBody("push_apply", body);
    };
    ShenGouService.prototype.get_shengou_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_shengou_count", body);
    };
    return ShenGouService;
}());
ShenGouService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ShenGouService);

//# sourceMappingURL=shengouService.js.map

/***/ })

});
//# sourceMappingURL=16.js.map