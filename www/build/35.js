webpackJsonp([35],{

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/change-kucun/change-kucun-detail/change-kucun-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__changeKucunService__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the ChangeKucunDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChangeKucunDetailPage = (function () {
    function ChangeKucunDetailPage(navCtrl, navParams, alertCtrl, changeKucunService, toastCtrl, storage, statusBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.changeKucunService = changeKucunService;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.statusBar = statusBar;
        this.pet = "2";
        this.isShow = false;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.item = this.navParams.get('item');
        this.user_id = this.navParams.get('user_id');
        // this.clickKucun();
        this.clickPandian();
        this.frontPage = __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].getViewController("ChangeKucunPage", navCtrl);
        this.isShow = this.item.isShow;
    }
    ChangeKucunDetailPage.prototype.changeDate = function (date) {
        var new_date = date.replace(' ', 'T') + 'Z';
        return new_date;
    };
    // clickKucun(){
    //     this.move_ids = this.item.move_ids;
    // }
    ChangeKucunDetailPage.prototype.clickPandian = function () {
        this.line_ids = this.item.line_ids;
    };
    ChangeKucunDetailPage.prototype.changeType = function (type) {
        var new_type;
        switch (type) {
            case 'none':
                new_type = "所有产品";
                break;
            case 'category':
                new_type = "一个产品类别";
                break;
            case 'product':
                new_type = "仅一个产品";
                break;
            case 'partial':
                new_type = "手动选择产品";
                break;
        }
        return new_type;
    };
    ChangeKucunDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangeKucunDetailPage');
    };
    ChangeKucunDetailPage.prototype.refuse = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '确定拒绝?',
            message: '拒绝后将删除单据',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.changeKucunService.changeStateKucun("draft", _this.item.id, _this.user_id).then(function (res) {
                            console.log('拒绝 ' + res.result.res_data);
                            if (res.result && res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom("删除成功", _this.toastCtrl);
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                            else if (res.error) {
                                __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom(res.error.data.message, _this.toastCtrl);
                            }
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ChangeKucunDetailPage.prototype.pass = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '确定通过?',
            message: '',
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.changeKucunService.changeStateKucun("done", _this.item.id, _this.user_id).then(function (res) {
                            console.log('通过 ' + res.result.res_data);
                            if (res.result && res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom("通过成功", _this.toastCtrl);
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                            else if (res.error) {
                                __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom(res.error.data.message, _this.toastCtrl);
                            }
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ChangeKucunDetailPage.prototype.changeRemark = function (remark) {
        var new_remark;
        if ('transfer' == remark) {
            new_remark = "物料转换";
        }
        else if ('adjust' == remark) {
            new_remark = "库存调整";
        }
        return new_remark;
    };
    ChangeKucunDetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    return ChangeKucunDetailPage;
}());
ChangeKucunDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-change-kucun-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/change-kucun/change-kucun-detail/change-kucun-detail.html"*/'<!--\n  Generated template for the ChangeKucunDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f2f5">\n  <ion-item >\n      <div style="background:white">\n          <img src={{item.create_img}} class="image1" style="float:left;margin-left:10px;">   \n          <p text-wrap style="font-size:80%;color:#2e3133;line-height:30px;margin-left:10px;float:left">{{item.create_name}}</p>\n          <p text-warp style="font-size:80%;color:#fd9f89;line-height:30px;float:right;margin-right:25px">进行中</p>\n      </div>\n  </ion-item>\n  <div style="background:white">\n    <div class="div_all">\n        <p text-wrap style="font-size:85%;float:left">盘点日期</p>\n        <p text-wrap style="font-size:80%;float:left;margin-left:15px;color:#8a9299"> {{changeDate(item.date) | date:"yyyy.MM.dd HH:mm"}} </p>\n    </div>\n    <div class="div_all">\n        <p text-wrap style="font-size:85%;float:left">盘点位置</p>\n        <p text-wrap style="font-size:80%;float:left;margin-left:15px;color:#8a9299"> {{item.location_name}} </p>\n    </div>\n    <div class="div_all">      \n        <p text-wrap style="font-size:85%;float:left">盘点类型</p>\n        <p text-wrap style="font-size:80%;float:left;margin-left:15px;color:#8a9299">{{changeType(item.filter)}}</p>\n    </div>\n    <div class="div_all">\n        <p text-wrap style="font-size:85%;float:left">来源备注</p>\n        <p text-wrap style="font-size:80%;float:left;margin-left:15px;color:#8a9299"> {{changeRemark(item.remark)}} </p>\n    </div>\n  </div>\n  <!-- <ion-toolbar no-border-top style="margin-top:15px;">\n      <ion-segment [(ngModel)]="pet" style="background:white"> \n        <ion-segment-button tappable (click)=\'clickKucun()\' value="1">\n          库存调整\n        </ion-segment-button>\n        <ion-segment-button tappable (click)=\'clickPandian()\' value="2">\n          盘点明细\n        </ion-segment-button>\n      </ion-segment>\n    </ion-toolbar>\n    <div [ngSwitch]="pet">\n        \n        <ng-template [ngSwitchCase]=\'1\'>\n          <ion-list>\n            <ion-item  no-lines *ngFor=\'let item of move_ids\' tappable style="margin-top:10px">\n              <h4 text-wrap style="font-size:90%;">{{item.name}}</h4>\n              <p text-wrap style="font-size:70%;color:gray"> 来源位置：{{item.location_id_from}} </p>\n              <p text-wrap style="font-size:70%;color:gray">目的位置：{{item.location_dest_id}} </p>\n              <p text-wrap style="font-size:70%;color:#1997f2;float:left">数量：{{item.product_qty}}</p>\n              <p text-warp style="font-size:70%;color:#fd9f89;float:right;margin-right:25px">进行中</p>\n            </ion-item> \n          </ion-list>\n        </ng-template>\n    \n        <ng-template [ngSwitchCase]=\'2\'> -->\n            <!--<ion-row align-items-center style="background:white;height:40px;margin-top:10px">\n                <ion-col tappable>\n                   <div align="center" >\n                    <p style="color:#1997f2" class="test_one">盘点明细</p>\n                  </div>\n                </ion-col>\n              </ion-row>-->\n               <div style="background:white;height:40px">\n                <p align="center" style="color:#1997f2;line-height:40px">盘点明细</p>\n              </div> \n              <div style="background:#f0f2f5">\n                  <ion-list>\n                      <ion-item no-lines *ngFor=\'let item of line_ids\' tappable style="margin-top:10px;">\n                        <h4 text-wrap style="font-size:90%;">{{item.product_name}}</h4>\n                        <p text-wrap style="font-size:70%;color:gray;margin-top:15px"> 地点：{{item.location_name}} </p>\n                        <p text-wrap style="font-size:70%;color:gray;float:left;margin-top:12px">理论数量：{{item.theoretical_qty}}</p>\n                        <p text-warp style="font-size:70%;color:#1997f2;float:right;margin-top:12px">实际数量：{{item.product_qty}}</p>\n                      </ion-item>\n                    </ion-list>\n              </div>\n          <!-- </ng-template>\n        </div> -->\n</ion-content>\n\n<ion-footer *ngIf="isShow">\n          <div style="background:#f0f0f0">\n    <span align="center" style=\'width:50%;float:left; background-color:#fba958;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="refuse()">\n      拒绝\n    </span>\n    <span align="center" style=\'width:50%;float:right;background-color:#1eabfe;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="pass()">\n      通过\n    </span>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/change-kucun/change-kucun-detail/change-kucun-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__changeKucunService__["a" /* ChangeKucunService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_0__changeKucunService__["a" /* ChangeKucunService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], ChangeKucunDetailPage);

//# sourceMappingURL=change-kucun-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/change-kucun/change-kucun-detail/change-kucun-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeKucunDetailPageModule", function() { return ChangeKucunDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(738);
var change_kucun_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ChangeKucunDetailPageModule = (function () {
    function ChangeKucunDetailPageModule() {
    }
    return ChangeKucunDetailPageModule;
}());
ChangeKucunDetailPageModule = change_kucun_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ChangeKucunDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ChangeKucunDetailPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], ChangeKucunDetailPageModule);

//# sourceMappingURL=change-kucun-detail.module.js.map

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

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeKucunService; });
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


var ChangeKucunService = (function () {
    function ChangeKucunService(httpservice) {
        this.httpservice = httpservice;
    }
    ChangeKucunService.prototype.getwaitList = function (state, user_id) {
        var body = JSON.stringify({
            state: state,
            user_id: user_id
        });
        return this.httpservice.postBody("get_wait_meapply", body);
    };
    ChangeKucunService.prototype.getsearchList = function (state, searchText, type, user_id) {
        var body = JSON.stringify({
            state: state,
            searchText: searchText,
            type: type,
            user_id: user_id
        });
        return this.httpservice.postBody("get_wait_meapply", body);
    };
    ChangeKucunService.prototype.changeStateKucun = function (state, id, user_id) {
        var body = JSON.stringify({
            state: state,
            id: id,
            user_id: user_id
        });
        return this.httpservice.postBody("change_wait_meapply", body);
    };
    return ChangeKucunService;
}());
ChangeKucunService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ChangeKucunService);

//# sourceMappingURL=changeKucunService.js.map

/***/ })

});
//# sourceMappingURL=35.js.map