webpackJsonp([8],{

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/new-production/new-production.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_productionService__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__new_production_auto__ = __webpack_require__(901);
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
 * Generated class for the NewProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var NewProductionPage = (function () {
    function NewProductionPage(navCtrl, navParams, newProductionService, newProductionAutoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.newProductionService = newProductionService;
        this.newProductionAutoService = newProductionAutoService;
        this.menus = [];
        this.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.chengpinArr = [];
        this.categories = [];
        this.newProductionService.search_product_category_no_loading("若态物料", null).then(function (res_2) {
            if (res_2.result && res_2.result.res_code == 1) {
                _this.menus = res_2.result.res_data;
                _this.newProductionService.search_product_category(null, _this.menus[0].id).then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1) {
                        _this.categories = res.result.res_data;
                        //   this.newProductionService.search_product_category(null,this.categories[0].id).then(res_1 =>{
                        //       if (res_1.result && res_1.result.res_code == 1) {
                        //         this.chengpinArr = res_1.result.res_data;
                        //       }
                        // })
                    }
                });
            }
        });
    }
    NewProductionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewProductionPage');
        // this.initSwiper();
    };
    NewProductionPage.prototype.initSwiper = function () {
        this.swiper = new Swiper('.pageMenuSlides .swiper-container', {
            slidesPerView: 4,
            spaceBetween: 0,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 0
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 0
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 0
                },
                320: {
                    slidesPerView: 4,
                    spaceBetween: 0
                },
            }
        });
    };
    NewProductionPage.prototype.selectPageMenu = function ($event, index) {
        var _this = this;
        this.setStyle(index);
        this.categories = [];
        this.chengpinArr = [];
        this.newProductionService.search_product_category(null, this.menus[index].id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.categories = res.result.res_data;
            }
        });
        // this.contentSlides.slideTo(index);
    };
    NewProductionPage.prototype.slideChanged = function () {
        // let index = this.contentSlides.getActiveIndex();
        // this.setStyle(index);
        // this.swiper.slideTo(index, 300);
    };
    NewProductionPage.prototype.setStyle = function (index) {
        var slides = document.getElementsByClassName('pageMenuSlides')[0].getElementsByClassName('swiper-slide');
        if (index < slides.length) {
            for (var i = 0; i < slides.length; i++) {
                var s = slides[i];
                s.className = "swiper-slide";
            }
            slides[index].className = "swiper-slide bottomLine";
        }
    };
    NewProductionPage.prototype.itemClick = function (item, event) {
        var _this = this;
        var initSelected = document.getElementsByClassName('menuItem');
        if (initSelected[0].classList.contains("active")) {
            initSelected[0].classList.remove("active");
        }
        if (this.selectedMenuTarget) {
            this.selectedMenuTarget.classList.remove("active");
        }
        event.currentTarget.classList.add("active");
        this.selectedMenuTarget = event.currentTarget;
        console.log(item.id);
        if (item.child_id.length > 0) {
            this.getListByParent_id(item.id);
        }
        else {
            this.newProductionService.get_production_detail(item.id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('NewProductListPage', {
                        item: res.result.res_data,
                    });
                }
            });
        }
    };
    NewProductionPage.prototype.doInfinite = function (infiniteScroll) {
        infiniteScroll.complete();
    };
    NewProductionPage.prototype.getListByParent_id = function (parent_id) {
        var _this = this;
        this.newProductionService.search_product_category(null, parent_id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.chengpinArr = res.result.res_data;
            }
        });
    };
    NewProductionPage.prototype.chenpinItemClick = function (item) {
        var _this = this;
        if (item.child_id.length > 0) {
            this.newProductionService.search_product_category(null, item.id).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('MoreLevelListPage', {
                        item: res.result.res_data,
                        title: item.name,
                    });
                }
            });
        }
        else {
            this.newProductionService.get_production_detail(item.id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('NewProductListPage', {
                        item: res.result.res_data,
                    });
                }
            });
        }
    };
    NewProductionPage.prototype.itemSelected = function (event) {
        var _this = this;
        if (event.id == 1) {
            var search_text = event.name.replace("搜 产品名：", "");
            this.newProductionService.search_product("name", search_text).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('NewProductListPage', {
                        item: res.result.res_data,
                    });
                }
            });
        }
        else {
            var search_text = event.name.replace("搜 料号：", "");
            this.newProductionService.search_product("default_code", search_text).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('NewProductListPage', {
                        item: res.result.res_data,
                    });
                }
            });
        }
    };
    return NewProductionPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('contentSlides'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["C" /* Slides */])
], NewProductionPage.prototype, "contentSlides", void 0);
NewProductionPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-new-production',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/new-production.html"*/'<!--\n  Generated template for the NewProductionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>产品</ion-title>\n\n  </ion-navbar>\n  \n</ion-header>\n\n\n<ion-content scroll="false">\n  <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected) = "itemSelected($event)"  [dataProvider]="newProductionAutoService"></ion-auto-complete>\n\n  <div class="pageMenuSlides">\n    <div class="swiper-container" align="center">\n      <div class="swiper-wrapper" *ngFor="let item of menus;let i=index;" align="center">\n        <div  class="swiper-slide {{i==0?\'bottomLine\':\'\'}}"  tappable (click)="selectPageMenu($event,i)">{{item.name}}</div>\n      </div>\n    </div>\n  </div>\n  <ion-slides #contentSlides>\n    <!--1-->\n  <ion-slide>\n    <ion-grid no-padding >\n    <ion-row>\n      <ion-col col-3 class="menus">\n        <ion-scroll scrollY="true" style="height:100%">\n          <ion-list no-lines>\n            <ion-item text-wrap tappable class="menuItem" *ngFor="let item of categories;let i=index" style="border-bottom: 1px solid lightgray" text-center (click)="itemClick(item,$event)">\n              {{item.name}}\n              \n              \n              <!--<p class="menuItem_left" [ngClass]="{\'active\': i==0}" >{{item.name}}</p> \n              <p class="menuItem_left" [ngClass]="{\'active\': i==0}">></p>-->\n            </ion-item>             \n          </ion-list>\n        </ion-scroll>\n      </ion-col>\n      <ion-col class="items">\n        <ion-list no-lines>\n          <ion-item tappable *ngFor="let item of chengpinArr" style="border-bottom: 1px solid lightgray" (click)="chenpinItemClick(item)">\n            <p class="item_label" style="float:left">{{item.name}}</p>\n            <p *ngIf="item.child_id.length > 0" style="float:right">></p>\n          </ion-item>\n        </ion-list>\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  </ion-slide>\n     \n</ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/new-production.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__new_productionService__["a" /* NewProductionService */], __WEBPACK_IMPORTED_MODULE_3__new_production_auto__["a" /* NewProductionAutoService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__new_productionService__["a" /* NewProductionService */],
        __WEBPACK_IMPORTED_MODULE_3__new_production_auto__["a" /* NewProductionAutoService */]])
], NewProductionPage);

//# sourceMappingURL=new-production.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/new-production/new-production.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewProductionPageModule", function() { return NewProductionPageModule; });
/* harmony import */ var new_production_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var new_production_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(739);
var new_production_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NewProductionPageModule = (function () {
    function NewProductionPageModule() {
    }
    return NewProductionPageModule;
}());
NewProductionPageModule = new_production_module___decorate([
    new_production_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            NewProductionPage,
        ],
        imports: [
            new_production_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(NewProductionPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */],
        ],
    })
], NewProductionPageModule);

//# sourceMappingURL=new-production.module.js.map

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

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProductionService; });
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


var NewProductionService = (function () {
    function NewProductionService(httpservice) {
        this.httpservice = httpservice;
    }
    NewProductionService.prototype.search_product_category_no_loading = function (type, parent_id) {
        var body = JSON.stringify({
            type: type,
            parent_id: parent_id,
        });
        return this.httpservice.postBodyNoLoading("search_product_category", body);
    };
    NewProductionService.prototype.search_product_category = function (type, parent_id) {
        var body = JSON.stringify({
            type: type,
            parent_id: parent_id,
        });
        return this.httpservice.postBody("search_product_category", body);
    };
    NewProductionService.prototype.get_production_detail = function (categ_id) {
        var body = JSON.stringify({
            categ_id: categ_id,
        });
        return this.httpservice.postBody("search_product_detail", body);
    };
    NewProductionService.prototype.product_bom_stock_move = function (id, type) {
        var body = JSON.stringify({
            id: id,
            type: type,
        });
        return this.httpservice.postBody("product_bom_stock_move", body);
    };
    NewProductionService.prototype.search_product = function (type, search_text) {
        var body = JSON.stringify({
            search_text: search_text,
            type: type,
        });
        return this.httpservice.postBody("search_product", body);
    };
    NewProductionService.prototype.get_stock_moves_by_product_id = function (product_id) {
        var body = JSON.stringify({
            product_id: product_id,
        });
        return this.httpservice.postBody("get_stock_moves_by_product_id", body);
    };
    return NewProductionService;
}());
NewProductionService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], NewProductionService);

//# sourceMappingURL=new-productionService.js.map

/***/ }),

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProductionAutoService; });
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



var NewProductionAutoService = (function () {
    function NewProductionAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    NewProductionAutoService.prototype.getResults = function (keyword) {
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
        obj1.name = "搜 产品名：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 料号：" + keyword;
        arr.push(obj2);
        return arr;
    };
    return NewProductionAutoService;
}());
NewProductionAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], NewProductionAutoService);

//# sourceMappingURL=new-production-auto.js.map

/***/ })

});
//# sourceMappingURL=8.js.map