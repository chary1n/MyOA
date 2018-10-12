webpackJsonp([5],{

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/reimbursement.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reimbursementService__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reimbursement_auto__ = __webpack_require__(896);
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
 * Generated class for the ReimbursementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ReimbursementPage = (function () {
    function ReimbursementPage(navCtrl, navParams, baoxiaoService, storage, reimbursementAutoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.baoxiaoService = baoxiaoService;
        this.storage = storage;
        this.reimbursementAutoService = reimbursementAutoService;
        this.pet = "2";
        this.isMoreData1 = true;
        this.isMoreData2 = true;
        this.limit = 20;
        this.offset = 0;
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.user_id = res.result.res_data.user_id;
            _this.baoxiaoService.getApprovalList(_this.limit, _this.offset, _this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.wait_approval_list = res.result.res_data;
                    var index = 0;
                    if (_this.wait_approval_list) {
                        for (var _i = 0, _a = _this.wait_approval_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            item.state = _this.changeState(item.state);
                            _this.wait_approval_list[index] = item;
                            index++;
                        }
                    }
                    console.log(_this.wait_approval_list);
                }
            });
        });
    }
    ReimbursementPage.prototype.ionViewDidEnter = function () {
        console.log(this.navParams);
        if (this.navParams.get('need_fresh') == true) {
            // console.log(111);
            this.reloadData();
            this.navParams.data.need_fresh = false;
        }
    };
    ReimbursementPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReimbursementPage');
    };
    ReimbursementPage.prototype.clickMyApply = function () {
    };
    ReimbursementPage.prototype.clickAlreadyApply = function () {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.already_approval_list = res.result.res_data;
                var index = 0;
                for (var _i = 0, _a = _this.already_approval_list; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.state = _this.changeState(item.state);
                    _this.already_approval_list[index] = item;
                    index++;
                }
            }
        });
    };
    ReimbursementPage.prototype.clickWaitMeApply = function () {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.wait_approval_list = res.result.res_data;
                var index = 0;
                if (_this.wait_approval_list) {
                    for (var _i = 0, _a = _this.wait_approval_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.state = _this.changeState(item.state);
                        _this.wait_approval_list[index] = item;
                        index++;
                    }
                }
                console.log(_this.wait_approval_list);
            }
        });
    };
    // 我要申请
    ReimbursementPage.prototype.apply = function () {
        this.navCtrl.push('MyApplyPage');
    };
    ReimbursementPage.prototype.approval_detail = function (item) {
        this.navCtrl.push('ReimbursementDetailPage', {
            item: item,
        });
    };
    ReimbursementPage.prototype.approved_detail = function (item) {
        this.navCtrl.push('ReimbursementDetailPage', {
            item: item,
        });
    };
    ReimbursementPage.prototype.changeState = function (state) {
        if (state == 'submit') {
            return "发送";
        }
        else if (state == 'manager1_approve') {
            return "1级审核";
        }
        else if (state == 'manager2_approve') {
            return "2级审核";
        }
        else if (state == 'manager3_approve') {
            return "General Manager Approve";
        }
        else if (state == 'approve') {
            return "已批准";
        }
        else if (state == 'post') {
            return "已过账";
        }
        else if (state == 'post') {
            return "已过账";
        }
        else if (state == 'done') {
            return "已支付";
        }
        else if (state == 'cancel') {
            return "已拒绝";
        }
        else {
            return state;
        }
    };
    ReimbursementPage.prototype.reloadData = function () {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.wait_approval_list = res.result.res_data;
                var index = 0;
                if (_this.wait_approval_list) {
                    for (var _i = 0, _a = _this.wait_approval_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.state = _this.changeState(item.state);
                        _this.wait_approval_list[index] = item;
                        index++;
                    }
                }
                console.log(_this.wait_approval_list);
            }
        });
    };
    ReimbursementPage.prototype.itemSelected = function (event) {
        var _this = this;
        var type;
        var search_text;
        if (event.id == 1) {
            type = "expense_no";
            search_text = event.name.replace("搜 单号：", "");
        }
        else if (event.id == 2) {
            type = "name";
            search_text = event.name.replace("搜 申请人：", "");
        }
        if (this.pet == "1") {
            this.baoxiaoService.searchApproveList(type, this.user_id, search_text).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.wait_approval_list = res.result.res_data;
                    var index = 0;
                    if (_this.wait_approval_list) {
                        for (var _i = 0, _a = _this.wait_approval_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            item.state = _this.changeState(item.state);
                            _this.wait_approval_list[index] = item;
                            index++;
                        }
                    }
                }
            });
        }
        else {
            this.baoxiaoService.searchAlreadyApproveList(type, this.user_id, search_text).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.already_approval_list = res.result.res_data;
                    var index = 0;
                    if (_this.already_approval_list) {
                        for (var _i = 0, _a = _this.already_approval_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            item.state = _this.changeState(item.state);
                            _this.already_approval_list[index] = item;
                            index++;
                        }
                    }
                }
            });
        }
    };
    ReimbursementPage.prototype.doRefresh = function (refresh) {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        if (this.pet == "1") {
            this.isMoreData1 = true;
            this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.wait_approval_list = res.result.res_data;
                    var index = 0;
                    if (_this.wait_approval_list) {
                        for (var _i = 0, _a = _this.wait_approval_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            item.state = _this.changeState(item.state);
                            _this.wait_approval_list[index] = item;
                            index++;
                        }
                    }
                    console.log(_this.wait_approval_list);
                }
                refresh.complete();
            });
        }
        else {
            this.isMoreData2 = true;
            this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.already_approval_list = res.result.res_data;
                    var index = 0;
                    for (var _i = 0, _a = _this.already_approval_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.state = _this.changeState(item.state);
                        _this.already_approval_list[index] = item;
                        index++;
                    }
                }
                refresh.complete();
            });
        }
    };
    ReimbursementPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.pet == "1") {
            if (this.isMoreData1 == true) {
                this.limit = 20;
                this.offset = this.offset + 20;
                this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1) {
                        if (res.result.res_data.length == 20) {
                            _this.isMoreData1 = true;
                        }
                        else {
                            _this.isMoreData1 = false;
                        }
                        var index = 0;
                        if (res.result.res_data) {
                            for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.wait_approval_list.push(item);
                            }
                            for (var _b = 0, _c = _this.wait_approval_list; _b < _c.length; _b++) {
                                var item = _c[_b];
                                item.state = _this.changeState(item.state);
                                _this.wait_approval_list[index] = item;
                                index++;
                            }
                        }
                        console.log(_this.wait_approval_list);
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
        else {
            if (this.isMoreData2 == true) {
                this.limit = 20;
                this.offset = this.offset + 20;
                this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1) {
                        if (res.result.res_data.length == 20) {
                            _this.isMoreData2 = true;
                        }
                        else {
                            _this.isMoreData2 = false;
                        }
                        var index = 0;
                        if (res.result.res_data) {
                            for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.already_approval_list.push(item);
                            }
                            for (var _b = 0, _c = _this.already_approval_list; _b < _c.length; _b++) {
                                var item = _c[_b];
                                item.state = _this.changeState(item.state);
                                _this.already_approval_list[index] = item;
                                index++;
                            }
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
    };
    return ReimbursementPage;
}());
ReimbursementPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-reimbursement',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/reimbursement.html"*/'<!--\n  Generated template for the ReimbursementPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>报销</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet">\n      <ion-segment-button tappable (click)=\'clickWaitMeApply()\' value="1">\n        待我审批\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickAlreadyApply()\' value="2">\n        我已审批\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n\n</ion-header>\n\n\n<ion-content>\n  <div [ngSwitch]="pet">\n    <ng-template [ngSwitchCase]=\'1\'>\n      <ion-auto-complete style="width: 95vw;margin-left:5vw;" (itemSelected)="itemSelected($event)" [dataProvider]="reimbursementAutoService"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of wait_approval_list\' tappable (click)=\'approval_detail(item)\'>\n          <h3 text-wrap>{{item.employee_name}}</h3>\n          <p text-wrap style="font-size:70%;float:right;color:gray;">{{item.create_date}}</p>\n          <h4 text-wrap style="font-size:80%;">{{item.expense_name}}</h4>\n          <p text-wrap style="font-size:70%;float:right;color:red;font-weight:bold"> {{item.state}} </p>\n          <p text-wrap style="font-size:80%;color:gray">金额总计(元)：{{item.amount}} </p>\n          <p text-wrap style="font-size:80%;color:gray">部门：{{item.department}} </p>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'2\'>\n      <ion-auto-complete style="width: 95vw;margin-left:5vw;" (itemSelected)="itemSelected($event)" [dataProvider]="reimbursementAutoService"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of already_approval_list\' tappable (click)=\'approved_detail(item)\'>\n          <h3 text-wrap>{{item.employee_name}}</h3>\n          <p text-wrap style="font-size:70%;float:right;color:gray;">{{item.create_date}}</p>\n          <h4 text-wrap style="font-size:80%;">{{item.expense_name}}</h4>\n          <p text-wrap style="font-size:70%;float:right;color:red;font-weight:bold"> {{item.state}} </p>\n          <p text-wrap style="font-size:80%;color:gray">金额总计(元)：{{item.amount}} </p>\n          <p text-wrap style="font-size:80%;color:gray">部门：{{item.department}} </p>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/reimbursement.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__reimbursementService__["a" /* ReimbursementService */], __WEBPACK_IMPORTED_MODULE_4__reimbursement_auto__["a" /* ReimbursementAutoService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__reimbursementService__["a" /* ReimbursementService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__reimbursement_auto__["a" /* ReimbursementAutoService */]])
], ReimbursementPage);

//# sourceMappingURL=reimbursement.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/reimbursement.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReimbursementPageModule", function() { return ReimbursementPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(739);
var reimbursement_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ReimbursementPageModule = (function () {
    function ReimbursementPageModule() {
    }
    return ReimbursementPageModule;
}());
ReimbursementPageModule = reimbursement_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ReimbursementPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ReimbursementPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */],
        ],
    })
], ReimbursementPageModule);

//# sourceMappingURL=reimbursement.module.js.map

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

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReimbursementService; });
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


var ReimbursementService = (function () {
    function ReimbursementService(httpservice) {
        this.httpservice = httpservice;
    }
    ReimbursementService.prototype.getApprovalList = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("wait_approval", body);
    };
    ReimbursementService.prototype.getAlreadApprovalList = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("already_approved", body);
    };
    ReimbursementService.prototype.confirm1 = function (sheet_id, user_id, reason, expense_line_ids) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: reason,
            expense_line_ids: expense_line_ids,
        });
        return this.httpservice.postBody("confirm_approve1", body);
    };
    ReimbursementService.prototype.confirm2 = function (sheet_id, user_id, reason, expense_line_ids) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: reason,
            expense_line_ids: expense_line_ids,
        });
        return this.httpservice.postBody("confirm_approve2", body);
    };
    ReimbursementService.prototype.confirm_approve3 = function (sheet_id, user_id, reason, expense_line_ids) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: reason,
            expense_line_ids: expense_line_ids,
        });
        return this.httpservice.postBody("confirm_approve3", body);
    };
    ReimbursementService.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_approve", body);
    };
    ReimbursementService.prototype.searchApproveList = function (type, user_id, search_text) {
        var body = JSON.stringify({
            type: type,
            user_id: user_id,
            search_text: search_text,
        });
        return this.httpservice.postBody("search_approve", body);
    };
    ReimbursementService.prototype.searchAlreadyApproveList = function (type, user_id, search_text) {
        var body = JSON.stringify({
            type: type,
            user_id: user_id,
            search_text: search_text,
        });
        return this.httpservice.postBody("search_already_approve", body);
    };
    return ReimbursementService;
}());
ReimbursementService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ReimbursementService);

//# sourceMappingURL=reimbursementService.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReimbursementAutoService; });
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



var ReimbursementAutoService = (function () {
    function ReimbursementAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    ReimbursementAutoService.prototype.getResults = function (keyword) {
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
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 申请人：" + keyword;
        arr.push(obj2);
        return arr;
    };
    return ReimbursementAutoService;
}());
ReimbursementAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], ReimbursementAutoService);

//# sourceMappingURL=reimbursement-auto.js.map

/***/ })

});
//# sourceMappingURL=5.js.map