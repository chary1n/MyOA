webpackJsonp([37],{

/***/ 620:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/first-show/select-person/auto_select_person.ts
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



var SelectPersonAuto = (function () {
    function SelectPersonAuto(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    SelectPersonAuto.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var arr = [];
        obj1.name = "搜 名字：" + keyword;
        arr.push(obj1);
        return arr;
    };
    return SelectPersonAuto;
}());
SelectPersonAuto = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], SelectPersonAuto);

//# sourceMappingURL=auto_select_person.js.map
// CONCATENATED MODULE: ./src/pages/first-show/select-person/select-person.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__first_service__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_Utils__ = __webpack_require__(239);
var select_person___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var select_person___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SelectPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectPersonPage = (function () {
    function SelectPersonPage(navCtrl, navParams, statusBar, firstShow, storage, autoSelect) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.firstShow = firstShow;
        this.storage = storage;
        this.autoSelect = autoSelect;
        this.selectList = [];
        this.isMoreData = true;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_6__providers_Utils__["a" /* Utils */].getViewController("CalendarDeatilpagePage", navCtrl);
        this.type = this.navParams.get('type');
        if (this.type == 1) {
            this.selectList = this.navParams.get('selectList');
        }
        else if (this.type == 2) {
            this.partner_id_s_id = this.navParams.get('partner_id_s_id');
        }
        this.limit = 40;
        this.offset = 0;
    }
    SelectPersonPage.prototype.choosePeople = function (item) {
        if (this.type == 1) {
            item.ischeck = !item.ischeck;
            if (item.ischeck) {
                this.selectList.push(item);
            }
            else {
                for (var i = 0; i < this.selectList.length; i++) {
                    if (item.partner_id == this.selectList[i].partner_id) {
                        this.selectList.splice(i, 1);
                        break;
                    }
                }
            }
        }
        else if (this.type == 2) {
            if (item.partner_id == this.partner_id_s_id) {
                this.navCtrl.pop();
            }
            else {
                this.frontPage.data.need_fresh = true;
                this.frontPage.data.pet = 5;
                this.frontPage.data.partner_id_s_id = item.partner_id;
                this.frontPage.data.partner_id_s_name = item.partner_name;
                this.navCtrl.popTo(this.frontPage);
            }
        }
    };
    SelectPersonPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectPersonPage');
    };
    SelectPersonPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.storage.get('user').then(function (res) {
            _this.uid = res.result.res_data.user_id;
            var body = {
                'uid': _this.uid,
                'limit': _this.limit,
                'offset': _this.offset
            };
            _this.firstShow.get_all_partner(body).then(function (res) {
                if (res.result.res_data && res.result.res_code == 1) {
                    _this.employeeList = res.result.res_data;
                    _this.origin_data = _this.employeeList;
                    if (_this.type == 1) {
                        _this.setCheck();
                    }
                    else if (_this.type == 2) {
                        for (var j = 0; j < _this.employeeList.length; j++) {
                            if (_this.employeeList[j].partner_id == _this.partner_id_s_id) {
                                _this.employeeList[j].ischeck = true;
                            }
                        }
                    }
                }
            });
        });
    };
    SelectPersonPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SelectPersonPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    SelectPersonPage.prototype.finish = function () {
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.pet = 3;
        this.frontPage.data.selectList = this.selectList;
        this.navCtrl.popTo(this.frontPage);
    };
    // searchByKeyword(event){
    //   if(!event.target.value){
    //     return
    //   }
    //   this.isMoreData = false
    //   let body = {
    //     'uid': this.uid,
    //     'name': event.target.value
    //   }
    //   this.firstShow.search_one_partner(body).then(res => {
    //     if (res.result && res.result.res_code == 1) {
    //       this.employeeList = res.result.res_data;
    //       if(this.type==1){
    //         this.setCheck()
    //       }else if(this.type==2){
    //         for (let j = 0; j < this.employeeList.length; j++) {
    //           if(this.employeeList[j].partner_id==this.partner_id_s_id){
    //             this.employeeList[j].ischeck=true
    //           }
    //         }
    //       }
    //     }
    //   })
    // }
    SelectPersonPage.prototype.itemClearSelected = function (event) {
        this.employeeList = this.origin_data;
        this.isMoreData = true;
    };
    SelectPersonPage.prototype.itemSelected = function (event) {
        var _this = this;
        var search_text;
        if (event.id == 1) {
            search_text = event.name.replace("搜 名字：", "");
        }
        this.isMoreData = false;
        var body = {
            'uid': this.uid,
            'name': search_text
        };
        this.firstShow.search_one_partner(body).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.employeeList = res.result.res_data;
                if (_this.type == 1) {
                    _this.setCheck();
                }
                else if (_this.type == 2) {
                    for (var j = 0; j < _this.employeeList.length; j++) {
                        if (_this.employeeList[j].partner_id == _this.partner_id_s_id) {
                            _this.employeeList[j].ischeck = true;
                        }
                    }
                }
            }
        });
    };
    // clearText() {
    //   this.employeeList = this.origin_data
    // //   this.limit = 40;
    // //   this.offset = 0;
    //   this.isMoreData = true
    // }
    SelectPersonPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData == true) {
            this.limit = 40;
            this.offset += 40;
            var body = {
                'uid': this.uid,
                'limit': this.limit,
                'offset': this.offset
            };
            this.firstShow.get_all_partner(body).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    if (res.result.res_data) {
                        if (res.result.res_data.length == 40) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                            var item = _a[_i];
                            _this.employeeList.push(item);
                            _this.setCheck();
                            _this.origin_data = _this.employeeList;
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                }
                else {
                    _this.isMoreData = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    //比较选中的人
    SelectPersonPage.prototype.setCheck = function () {
        // for (let i = 0; i < this.employeeList.length; i++) {
        //   if(this.selectList.indexOf(this.employeeList[i].partner_id)!=-1){
        //     this.employeeList[i].ischeck=true
        //   }
        // }
        for (var i = 0; i < this.selectList.length; i++) {
            for (var j = 0; j < this.employeeList.length; j++) {
                if (this.selectList[i].partner_id == this.employeeList[j].partner_id) {
                    this.employeeList[j].ischeck = true;
                    break;
                }
            }
        }
    };
    return SelectPersonPage;
}());
SelectPersonPage = select_person___decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-select-person',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/select-person/select-person.html"*/'<!--\n  Generated template for the SelectPersonPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left *ngIf="type==1">\n            <button ion-button icon-only tappable (click)="cancel()" style="font-size:14px;color: white;margin-left: 10px">\n                取消\n            </button>\n        </ion-buttons>\n        <ion-buttons right *ngIf="type==1">\n            <button ion-button icon-only tappable (click)="finish()" style="font-size:14px;color: white;margin-right: 10px">\n                完成\n            </button>\n      </ion-buttons>\n      <ion-buttons left *ngIf="type==2">\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n          </ion-buttons>\n      <ion-title style="text-align: center">通讯录</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content (pan)="panEvent($event)">\n        <div class="header_div_class">\n                <ion-auto-complete class="searchbar_class" (itemSelected)="itemSelected($event)" (itemClearSelected)="itemClearSelected($event)" [dataProvider]="autoSelect"></ion-auto-complete>\n        </div>\n    <!-- <ion-searchbar placeholder = "搜索" (ionInput)="searchByKeyword($event)" (ionClear)="clearText()"></ion-searchbar> -->\n\n    <ion-list>\n      <ion-item  no-lines *ngFor = \'let item of employeeList\' style="border-bottom: #f0f2f5 1px solid;min-height: 25px">\n          <ion-label>{{item.partner_name}}</ion-label>\n          <ion-checkbox  (click)="choosePeople(item)" [checked]=item.ischeck></ion-checkbox>\n        </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/first-show/select-person/select-person.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__first_service__["a" /* FirstShowService */], SelectPersonAuto]
    }),
    select_person___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1__first_service__["a" /* FirstShowService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], SelectPersonAuto])
], SelectPersonPage);

//# sourceMappingURL=select-person.js.map
// CONCATENATED MODULE: ./src/pages/first-show/select-person/select-person.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectPersonPageModule", function() { return SelectPersonPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(739);
var select_person_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SelectPersonPageModule = (function () {
    function SelectPersonPageModule() {
    }
    return SelectPersonPageModule;
}());
SelectPersonPageModule = select_person_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            SelectPersonPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(SelectPersonPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], SelectPersonPageModule);

//# sourceMappingURL=select-person.module.js.map

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

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstShowService; });
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


var FirstShowService = (function () {
    function FirstShowService(httpService) {
        this.httpService = httpService;
    }
    FirstShowService.prototype.delete_reply = function (body) {
        return this.httpService.postBody("delete_reply", body);
    };
    FirstShowService.prototype.read_total_reply = function (body) {
        return this.httpService.postBody("read_total_reply", body);
    };
    FirstShowService.prototype.get_un_read_reply = function (body) {
        return this.httpService.postBodyNoLoading("get_un_read_reply", body);
    };
    FirstShowService.prototype.get_employee_detail = function (user_id) {
        var body = JSON.stringify({
            user_id: user_id,
        });
        return this.httpService.postBody("get_employee_detail", body, 1);
    };
    FirstShowService.prototype.update_zan = function (body) {
        return this.httpService.postBodyNoLoading("update_zan", body);
    };
    FirstShowService.prototype.reply_to = function (body) {
        return this.httpService.postBody("reply_to", body);
    };
    FirstShowService.prototype.get_event_detail = function (body) {
        return this.httpService.postBodyNoLoading("get_event_detail", body);
    };
    FirstShowService.prototype.get_schedule_list = function (body) {
        return this.httpService.postBody("get_schedule_list", body);
    };
    FirstShowService.prototype.get_backlog_identify = function (body) {
        return this.httpService.postBodyNoLoading("get_backlog_identify", body);
    };
    //跳转到相应的模块
    FirstShowService.prototype.get_res_model = function (body) {
        return this.httpService.postBody("get_res_model", body);
    };
    FirstShowService.prototype.delete_res_model = function (body) {
        return this.httpService.postBody("delete_res_model", body);
    };
    FirstShowService.prototype.get_event_type = function (body) {
        return this.httpService.postBodyNoLoading("get_event_type", body);
    };
    FirstShowService.prototype.get_all_partner = function (body) {
        return this.httpService.postBody("get_all_partner", body);
    };
    FirstShowService.prototype.get_calendar_alarms = function (body) {
        return this.httpService.postBody("get_calendar_alarms", body);
    };
    FirstShowService.prototype.create_new_schedule = function (body) {
        return this.httpService.postBody("create_new_schedule", body);
    };
    FirstShowService.prototype.write_wait_thing = function (body) {
        return this.httpService.postBody("write_wait_thing", body);
    };
    FirstShowService.prototype.finish_wait_thing = function (body) {
        return this.httpService.postBody("write_wait_thing", body);
    };
    FirstShowService.prototype.cancel_wait_thing = function (body) {
        return this.httpService.postBody("cancel_wait_thing", body);
    };
    FirstShowService.prototype.search_one_partner = function (body) {
        return this.httpService.postBodyNoLoading("search_one_partner", body);
    };
    FirstShowService.prototype.get_late_list = function (body) {
        return this.httpService.postBody("get_late_list", body);
    };
    //获取审批页面的数目
    FirstShowService.prototype.get_approval_num = function (body) {
        return this.httpService.postBodyNoLoading("get_approval_num", body);
    };
    FirstShowService.prototype.create_meeting = function (body) {
        return this.httpService.postBody("create_meeting", body);
    };
    FirstShowService.prototype.get_meeting = function (body) {
        return this.httpService.postBodyNoLoading("get_meeting", body);
    };
    FirstShowService.prototype.create_meeting_line = function (body) {
        return this.httpService.postBody("create_meeting_line", body);
    };
    // delete_meeting_line(body){
    //     return this.httpService.postBody("delete_meeting_line", body);
    // }
    FirstShowService.prototype.delete_meeting = function (body) {
        return this.httpService.postBody("delete_meeting", body);
    };
    FirstShowService.prototype.write_meeting = function (body) {
        return this.httpService.postBody("write_meeting", body);
    };
    // get_meeting_line(body){
    //     return this.httpService.postBody("get_meeting_line", body);
    // }
    FirstShowService.prototype.change_meeting = function (body) {
        return this.httpService.postBody("change_meeting", body);
    };
    FirstShowService.prototype.get_all_schedule = function (body) {
        return this.httpService.postBody("get_all_schedule", body);
    };
    FirstShowService.prototype.search_all_schedule = function (body) {
        return this.httpService.postBody("search_all_schedule", body);
    };
    return FirstShowService;
}());
FirstShowService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], FirstShowService);

//# sourceMappingURL=first_service.js.map

/***/ })

});
//# sourceMappingURL=37.js.map