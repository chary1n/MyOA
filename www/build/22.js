webpackJsonp([22],{

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/material-request/shenhe-material-request/shenpi-material-auto.ts
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



var ShenPiMaterialAutoService = (function () {
    function ShenPiMaterialAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    ShenPiMaterialAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var arr = [];
        obj1.name = "搜 姓名：" + keyword;
        arr.push(obj1);
        return arr;
    };
    return ShenPiMaterialAutoService;
}());
ShenPiMaterialAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], ShenPiMaterialAutoService);

//# sourceMappingURL=shenpi-material-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/shenhe-material-request/shenhe-material-request.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__materialService__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
var shenhe_material_request___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var shenhe_material_request___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ShenheMaterialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ShenheMaterialRequestPage = (function () {
    function ShenheMaterialRequestPage(navCtrl, navParams, mService, storage, spMaterialAutoService, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mService = mService;
        this.storage = storage;
        this.spMaterialAutoService = spMaterialAutoService;
        this.toastCtrl = toastCtrl;
        this.type = navParams.get('type');
        this.item = navParams.get('item');
        console.log(this.item);
        // this.grid_height={height:667-340+'px'}
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("MaterialRequestPage", navCtrl);
        if (this.type == "final") {
            this.title = "送终审";
        }
        else {
            this.title = "送审";
        }
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.partner_id = res.result.res_data.partner_id;
            _this.employeeList = [];
            _this.touxianList = [];
            _this.mService.get_final_review().then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                        var items = _a[_i];
                        if (items.review_type == "picking_review_line") {
                            _this.employeeList.push(items.final_review_partner_id);
                            _this.line_final = items.final_review_partner_id.id;
                            console.log(_this.line_final);
                            _this.touxianList.push("产线领用终审人");
                        }
                        else if (items.review_type == "picking_review_project") {
                            _this.employeeList.push(items.final_review_partner_id);
                            _this.product_final = items.final_review_partner_id.id;
                            console.log(_this.product_final);
                            _this.touxianList.push("工程领用终审人");
                        }
                    }
                }
            });
        });
    }
    ShenheMaterialRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShenheMaterialRequestPage');
    };
    ShenheMaterialRequestPage.prototype.itemSelected = function (event) {
        var _this = this;
        var search_text = event.name.replace("搜 姓名：", "");
        this.mService.search_employee(search_text).then(function (res) {
            _this.employeeList = [];
            _this.touxianList = [];
            console.log(res);
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                    var items = _a[_i];
                    _this.employeeList.push(items.partner_id);
                    console.log(_this.product_final);
                    if (_this.product_final == items.partner_id.id) {
                        _this.touxianList.push("工程领用终审人");
                    }
                    else if (_this.line_final == items.partner_id.id) {
                        _this.touxianList.push("产线领用终审人");
                    }
                    else {
                        _this.touxianList.push("");
                    }
                }
            }
        });
    };
    ShenheMaterialRequestPage.prototype.itemSelect = function (item) {
        this.select_name = item;
        this.select = this.select_name.name;
    };
    ShenheMaterialRequestPage.prototype.upload = function () {
        var _this = this;
        if (this.type == "final") {
            if (this.select_name) {
                if (this.item.picking_type == "pick_type") {
                    if (this.select_name.id == this.line_final) {
                        this.mService.action_to_next(this.item.id, this.beizhuText, this.user_id, true, this.item.picking_type, this.select_name.name, parseInt(this.select_name.id)).then(function (res) {
                            if (res.result.res_data.success == 1) {
                                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("送审成功", _this.toastCtrl);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        });
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom(this.select_name.name + "不是产线领用终审人", this.toastCtrl);
                    }
                }
                else {
                    if (this.select_name.id == this.product_final) {
                        this.mService.action_to_next(this.item.id, this.beizhuText, this.user_id, true, this.item.picking_type, this.select_name.name, parseInt(this.select_name.id)).then(function (res) {
                            if (res.result.res_data.success == 1) {
                                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("送审成功", _this.toastCtrl);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        });
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom(this.select_name.name + "不是工程领用终审人", this.toastCtrl);
                    }
                }
            }
            else {
                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请选择终审人", this.toastCtrl);
            }
        }
        else {
            if (this.select_name) {
                if (this.item.picking_type != "pick_type") {
                    if (this.select_name.id == this.product_final) {
                        this.mService.action_to_next(this.item.id, this.beizhuText, this.user_id, false, this.item.picking_type, this.select_name.name, parseInt(this.select_name.id)).then(function (res) {
                            if (res.result.res_data.success == 1) {
                                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("送审成功", _this.toastCtrl);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        });
                    }
                    else {
                        console.log(this.select_name.id);
                        console.log(this.product_final + 'xxxx');
                        __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的审核人", this.toastCtrl);
                    }
                }
                else {
                    if (this.select_name.id == this.line_final) {
                        this.mService.action_to_next(this.item.id, this.beizhuText, this.user_id, false, this.item.picking_type, this.select_name.name, parseInt(this.select_name.id)).then(function (res) {
                            if (res.result.res_data.success == 1) {
                                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("送审成功", _this.toastCtrl);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        });
                    }
                    else {
                        console.log(this.select_name.id);
                        console.log(this.line_final + 'mmmm');
                        __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的审核人", this.toastCtrl);
                    }
                }
            }
            else {
                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请选择审核人", this.toastCtrl);
            }
        }
    };
    return ShenheMaterialRequestPage;
}());
ShenheMaterialRequestPage = shenhe_material_request___decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-shenhe-material-request',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/shenhe-material-request/shenhe-material-request.html"*/'<!--\n  Generated template for the ShenheMaterialRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content scroll="false" style="background:#f0f0f0">\n <ion-auto-complete  style="width: 100vw;" (itemSelected)="itemSelected($event)" [dataProvider]="spMaterialAutoService"></ion-auto-complete>\n  <div style="overflow:scroll;margin-top:2px;height:70%">\n    <ion-list >\n      <ion-item tappable (click) = "itemSelect(item)" *ngFor = \'let item of employeeList;let i = index\'>\n        <div>\n          <span>{{item.name}}</span><span style="margin-left:15px;margin-top:-5px;color:red;font-size:10px">{{touxianList[i]}}</span>\n        </div>\n      </ion-item>\n  </ion-list>\n  </div>\n \n  <div class="buttom_div">\n    <p style="margin-top:-5px;"></p>\n    <span style="margin-left:20px;color:gray">提交给..审核：</span> <span *ngIf="select_name" style="font-size:17px;">{{select}}</span><span *ngIf="!select_name" style="color:gray;">(上方搜索框输入关键字搜索审核人)</span>\n    <ion-textarea rows="15" placeholder="备注" [(ngModel)]="beizhuText" style="margin-top:10px;height:115px;margin-left:4.5%;width:91%;border: 1px solid #e2e2e4;overflow:hidden;border-radius:1px;"></ion-textarea>\n    <button ion-button  style=\'background-color:#1eabfe;border-radius:20px;width:25%;float:right;margin-right:4.5%;height:35px\' tappable (click)=\'upload()\' full>提交</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/shenhe-material-request/shenhe-material-request.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__materialService__["a" /* materialService */], ShenPiMaterialAutoService],
    }),
    shenhe_material_request___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__materialService__["a" /* materialService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], ShenPiMaterialAutoService, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], ShenheMaterialRequestPage);

//# sourceMappingURL=shenhe-material-request.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/shenhe-material-request/shenhe-material-request.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShenheMaterialRequestPageModule", function() { return ShenheMaterialRequestPageModule; });
/* harmony import */ var shenhe_material_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var shenhe_material_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(739);
var shenhe_material_request_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ShenheMaterialRequestPageModule = (function () {
    function ShenheMaterialRequestPageModule() {
    }
    return ShenheMaterialRequestPageModule;
}());
ShenheMaterialRequestPageModule = shenhe_material_request_module___decorate([
    shenhe_material_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ShenheMaterialRequestPage,
        ],
        imports: [
            shenhe_material_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ShenheMaterialRequestPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], ShenheMaterialRequestPageModule);

//# sourceMappingURL=shenhe-material-request.module.js.map

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

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return materialService; });
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


var materialService = (function () {
    function materialService(httpservice) {
        this.httpservice = httpservice;
    }
    materialService.prototype.get_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_material_request_list", body);
    };
    materialService.prototype.get_wait_me_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_wait_me_material_request_list", body);
    };
    materialService.prototype.get_already_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_already_material_request_list", body);
    };
    materialService.prototype.get_final_review = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_final_review", body);
    };
    materialService.prototype.search_employee = function (name) {
        var body = JSON.stringify({
            name: name,
        });
        return this.httpservice.postBody("search_employee", body);
    };
    materialService.prototype.action_pass = function (id, remark, create_uid) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
        });
        return this.httpservice.postBody("action_pass", body);
    };
    materialService.prototype.action_deny = function (id, remark, create_uid) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
        });
        return this.httpservice.postBody("action_deny", body);
    };
    materialService.prototype.action_to_next = function (id, remark, create_uid, to_last_review, type, partner_name, partner_id) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
            to_last_review: to_last_review,
            type: type,
            partner_name: partner_name,
            partner_id: partner_id,
        });
        return this.httpservice.postBody("action_to_next", body);
    };
    materialService.prototype.search_material_request = function (search_text, type, user_id, waitme_type) {
        var body = JSON.stringify({
            search_text: search_text,
            type: type,
            user_id: user_id,
            waitme_type: waitme_type,
        });
        return this.httpservice.postBody("search_material_request", body);
    };
    return materialService;
}());
materialService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], materialService);

//# sourceMappingURL=materialService.js.map

/***/ })

});
//# sourceMappingURL=22.js.map