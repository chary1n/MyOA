webpackJsonp([30],{

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi-auto.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(241);
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



var ZanzhiAutoService = (function () {
    function ZanzhiAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    ZanzhiAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var obj2 = {
            name: "",
            id: 2,
        };
        var arr = [];
        obj1.name = "搜 员工:" + keyword;
        arr.push(obj1);
        obj2.name = "搜 单号:" + keyword;
        arr.push(obj2);
        return arr;
    };
    return ZanzhiAutoService;
}());
ZanzhiAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], ZanzhiAutoService);

//# sourceMappingURL=zanzhi-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commonUseServices__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
var zanzhi___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var zanzhi___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ZanzhiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ZanzhiPage = (function () {
    function ZanzhiPage(navCtrl, navParams, commonServices, zanzhiAutoServices, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonServices = commonServices;
        this.zanzhiAutoServices = zanzhiAutoServices;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.pet = "1";
        this.isMoreData1 = true;
        this.isMoreData2 = true;
        this.limit = 20;
        this.offset = 0;
        this.isMoreData = true;
        this.department = false;
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            if (res.result.res_data.department) {
                _this.department = true;
            }
            _this.user_id = res.result.res_data.user_id;
            _this.refreshCount();
        });
    }
    ZanzhiPage.prototype.refreshCount = function () {
        var _this = this;
        this.commonServices.get_zanzhi_listNoLoading(this.user_id, this.limit, this.offset, "wait_apply").then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.wait_approval_list = res.result.res_data.data;
                _this.wait_approval_count = res.result.res_data.count;
            }
        });
    };
    ZanzhiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ZanzhiPage');
    };
    ZanzhiPage.prototype.ionViewDidEnter = function () {
        console.log(this.navParams);
        if (this.navParams.get('need_fresh') == true) {
            this.navParams.data.need_fresh = false;
            this.addData();
        }
        this.refreshCount();
    };
    ZanzhiPage.prototype.addData = function () {
        var _this = this;
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        this.commonServices.get_zanzhi_list(this.user_id, 20, 0, this.getType()).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                var list = res.result.res_data.data;
                if (_this.pet == "0") {
                    _this.applyList = list;
                }
                else if (_this.pet == '1') {
                    _this.wait_approval_list = list;
                }
                else if (_this.pet == '2') {
                    _this.already_approval_list = list;
                }
            }
        });
    };
    ZanzhiPage.prototype.doRefresh = function (refresh) {
        var _this = this;
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        this.commonServices.get_zanzhi_list(this.user_id, 20, 0, this.getType()).then(function (res) {
            refresh.complete();
            if (res.result && res.result.res_code == 1) {
                var list = res.result.res_data.data;
                if (_this.pet == "0") {
                    _this.applyList = list;
                }
                else if (_this.pet == '1') {
                    _this.wait_approval_list = list;
                }
                else if (_this.pet == '2') {
                    _this.already_approval_list = list;
                }
            }
        });
    };
    ZanzhiPage.prototype.doInfinite = function (infinite) {
        var _this = this;
        if (this.isMoreData == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.commonServices.get_zanzhi_list(this.user_id, this.limit, this.offset, this.getType()).then(function (res) {
                var item_data = [];
                if (res.result.res_data.data) {
                    item_data = res.result.res_data.data;
                    if (item_data.length == 20) {
                        _this.isMoreData = true;
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    for (var _i = 0, item_data_1 = item_data; _i < item_data_1.length; _i++) {
                        var item = item_data_1[_i];
                        if (_this.pet == "0") {
                            _this.applyList.push(item);
                        }
                        else if (_this.pet == '1') {
                            _this.wait_approval_list.push(item);
                        }
                        else if (_this.pet == '2') {
                            _this.already_approval_list.push(item);
                        }
                    }
                }
                else {
                    _this.isMoreData = false;
                }
                infinite.complete();
            });
        }
        else {
            infinite.complete();
        }
    };
    ZanzhiPage.prototype.clickState = function () {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        this.commonServices.get_zanzhi_list(this.user_id, 20, 0, this.getType()).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                var list = res.result.res_data.data;
                if (_this.pet == "0") {
                    _this.applyList = list;
                }
                else if (_this.pet == '1') {
                    _this.wait_approval_list = list;
                }
                else if (_this.pet == '2') {
                    _this.already_approval_list = list;
                }
            }
        });
    };
    ZanzhiPage.prototype.itemSelected = function (event) {
        var _this = this;
        var type;
        var search_text;
        var data;
        if (event.id == 1) {
            data = 'employee_id';
            search_text = event.name.replace("搜 员工:", "");
        }
        else if (event.id == 2) {
            data = 'name';
            search_text = event.name.replace("搜 单号:", "");
        }
        this.commonServices.searchZanzhiList(this.user_id, this.getType(), data, search_text).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                var list = res.result.res_data;
                if (_this.pet == "0") {
                    _this.applyList = list;
                }
                else if (_this.pet == '1') {
                    _this.wait_approval_list = list;
                }
                else if (_this.pet == '2') {
                    _this.already_approval_list = list;
                }
            }
        });
    };
    ZanzhiPage.prototype.getType = function () {
        var type;
        if (this.pet == "0") {
            type = "apply";
        }
        else if (this.pet == '1') {
            type = "wait_apply";
        }
        else if (this.pet == '2') {
            type = "applyed";
        }
        return type;
    };
    ZanzhiPage.prototype.click_detail = function (item) {
        this.navCtrl.push("ZanzhiDetailPage", { item: item, pet: this.pet });
    };
    ZanzhiPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    ZanzhiPage.prototype.showActionSheet = function () {
        if (this.department) {
            this.navCtrl.push("ZanzhiApplyPage");
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
    ZanzhiPage.prototype.changeState = function (state) {
        if (state == 'draft') {
            return '草稿';
        }
        else if (state == "confirm") {
            return '确认';
        }
        else if (state == "manager1_approve") {
            return '1级审核';
        }
        else if (state == "manager2_approve") {
            return '2级审核';
        }
        else if (state == "manager3_approve") {
            return 'General Manager Approved';
        }
        else if (state == "approve") {
            return '批准';
        }
        else if (state == "paid") {
            return '已支付';
        }
        else if (state == "cancel") {
            return '取消';
        }
        else {
            return state;
        }
    };
    return ZanzhiPage;
}());
ZanzhiPage = zanzhi___decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-zanzhi',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/zanzhi/zanzhi.html"*/'<!--\n  Generated template for the ApplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n    <ion-navbar color="gongdan-color">\n      <ion-title>暂支</ion-title>\n    </ion-navbar>\n  \n    <ion-toolbar no-border-top>\n      <ion-segment [(ngModel)]="pet">\n        <ion-segment-button tappable (click)=\'clickState()\' value="0">\n          我的暂支\n        </ion-segment-button>\n        <ion-segment-button tappable (click)=\'clickState()\' value="1">\n          待我审批({{wait_approval_count}})\n        </ion-segment-button>\n        <ion-segment-button tappable (click)=\'clickState()\' value="2">\n          我已审批\n        </ion-segment-button>\n      </ion-segment>\n    </ion-toolbar>\n  </ion-header>\n  \n  \n  <ion-content style="background:#f0f0f0">\n    <div [ngSwitch]="pet" >\n      <ng-template [ngSwitchCase]=\'0\'>\n        <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected)="itemSelected($event)" [dataProvider]="zanzhiAutoServices"></ion-auto-complete>\n        <ion-refresher (ionRefresh)="doRefresh($event)">\n          <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n        <ion-list >\n          <ion-item *ngFor=\'let item of applyList\' tappable (click)=\'click_detail(item)\'>\n            <p text-wrap style="float:right;color:#000000;font-size:80%;color:gray;">{{changeDate(item.apply_date) | date:\'yyyy-MM-dd \'}}</p>\n            <p text-wrap style="font-size:100%;color:#000000;">{{item.name}}</p>\n            <p text-wrap style="float:right;color:red;font-weight:bold;font-size:70%;"> {{changeState(item.state)}} </p>\n            <p text-wrap style="font-size:80%;color:gray">申请金额(元)：{{item.amount}} </p>\n          </ion-item>\n        </ion-list>\n        \n        <ion-infinite-scroll immediate-check="false" (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n        \n      </ng-template>\n      \n  \n        \n      <ng-template [ngSwitchCase]=\'1\'>\n          <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected)="itemSelected($event)" [dataProvider]="zanzhiAutoServices"></ion-auto-complete>\n          <ion-refresher (ionRefresh)="doRefresh($event)">\n          <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n        <ion-list>\n          <ion-item *ngFor=\'let item of wait_approval_list\' tappable (click)=\'click_detail(item)\'>\n            <p text-wrap style="float:right;color:#000000;font-size:80%;color:gray;">{{changeDate(item.apply_date) | date:\'yyyy-MM-dd \'}}</p>\n            <p text-wrap style="font-size:100%;color:#000000;">{{item.name}}  <span style="margin-left:20px"> {{item.employee}}</span></p>\n            <p text-wrap style="float:right;color:red;font-weight:bold;font-size:70%;"> {{changeState(item.state)}} </p>\n            <p text-wrap style="font-size:80%;color:gray">申请金额(元)：{{item.amount}} </p>\n          </ion-item>\n        </ion-list>\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n      </ng-template>\n  \n      <ng-template [ngSwitchCase]=\'2\'>\n          <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected)="itemSelected($event)" [dataProvider]="zanzhiAutoServices"></ion-auto-complete>\n          <ion-refresher (ionRefresh)="doRefresh($event)">\n          <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n        <ion-list >\n          <ion-item *ngFor=\'let item of already_approval_list\' tappable (click)=\'click_detail(item)\'>\n            <p text-wrap style="float:right;color:#000000;font-size:80%;color:gray;">{{changeDate(item.apply_date) | date:\'yyyy-MM-dd \'}}</p>\n            <p text-wrap style="font-size:100%;color:#000000;">{{item.name}}  <span style="margin-left:20px"> {{item.employee}}</span></p>\n            <p text-wrap style="float:right;color:red;font-weight:bold;font-size:70%;"> {{changeState(item.state)}} </p>\n            <p text-wrap style="font-size:80%;color:gray">申请金额(元)：{{item.amount}} </p>\n          </ion-item>\n        </ion-list>\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n      </ng-template>\n    </div>\n  </ion-content>\n\n  <ion-footer *ngIf="pet == \'0\'">\n      <button ion-button (click)="showActionSheet()" full> 我要申请</button>\n    </ion-footer>\n\n  \n  '/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/zanzhi/zanzhi.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__commonUseServices__["a" /* CommonUseServices */], ZanzhiAutoService]
    }),
    zanzhi___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__commonUseServices__["a" /* CommonUseServices */],
        ZanzhiAutoService,
        __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], ZanzhiPage);

//# sourceMappingURL=zanzhi.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZanzhiPageModule", function() { return ZanzhiPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic2_auto_complete__ = __webpack_require__(739);
/* harmony import */ var zanzhi_module___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var zanzhi_module___WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var zanzhi_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ZanzhiPageModule = (function () {
    function ZanzhiPageModule() {
    }
    return ZanzhiPageModule;
}());
ZanzhiPageModule = zanzhi_module___decorate([
    zanzhi_module___WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            ZanzhiPage,
        ],
        imports: [
            zanzhi_module___WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(ZanzhiPage), __WEBPACK_IMPORTED_MODULE_0_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], ZanzhiPageModule);

//# sourceMappingURL=zanzhi.module.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoCompleteModule; });
/* unused harmony export AutoCompleteComponent */
/* unused harmony export BoldPrefix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(240);
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

/***/ 741:
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
//# sourceMappingURL=30.js.map