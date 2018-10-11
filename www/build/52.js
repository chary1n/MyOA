webpackJsonp([52],{

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/share-knowledge/shareknowledgeService.ts
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


var ShareknowledgeService = (function () {
    function ShareknowledgeService(httpservice) {
        this.httpservice = httpservice;
    }
    ShareknowledgeService.prototype.getblogList = function (type, limit, offset) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            type: type,
        });
        return this.httpservice.postBody("get_blog_list", body);
    };
    ShareknowledgeService.prototype.getblogCloum = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_blog_colum", body);
    };
    //二级标签
    ShareknowledgeService.prototype.getblogDetailFrom = function (tag_id) {
        var body = JSON.stringify({
            is_tag_id: true,
            is_first: false,
            tag_id: tag_id,
        });
        return this.httpservice.postBody("get_blog_list", body);
    };
    //一级标签
    ShareknowledgeService.prototype.getblogDetailfirst = function (tag_id) {
        var body = JSON.stringify({
            is_tag_id: true,
            is_first: true,
            tag_id: tag_id,
        });
        return this.httpservice.postBody("get_blog_list", body);
    };
    //搜索
    ShareknowledgeService.prototype.getSearchList = function (search_type, search_body) {
        var body = JSON.stringify({
            type: "search",
            search_type: search_type,
            search_body: search_body,
        });
        return this.httpservice.postBody("get_blog_list", body);
    };
    return ShareknowledgeService;
}());
ShareknowledgeService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ShareknowledgeService);

//# sourceMappingURL=shareknowledgeService.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/share-knowledge/share-service.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var share_service___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var share_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var share_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShareAutoService = (function () {
    function ShareAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    ShareAutoService.prototype.getResults = function (keyword) {
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
        var obj3 = {
            name: "",
            id: 3,
        };
        var arr = [];
        obj1.name = "搜 标题:" + keyword;
        arr.push(obj1);
        obj2.name = "搜 正文:" + keyword;
        arr.push(obj2);
        obj3.name = "搜 发布人:" + keyword;
        arr.push(obj3);
        return arr;
    };
    return ShareAutoService;
}());
ShareAutoService = share_service___decorate([
    share_service___WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    share_service___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], ShareAutoService);

//# sourceMappingURL=share-service.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/share-knowledge/share-knowledge.ts
/* harmony import */ var share_knowledge___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
var share_knowledge___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var share_knowledge___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ShareKnowledgePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ShareKnowledgePage = (function () {
    function ShareKnowledgePage(navCtrl, navParams, shareknowledgeService, toastCtrl, shareAutoService, statusBar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareknowledgeService = shareknowledgeService;
        this.toastCtrl = toastCtrl;
        this.shareAutoService = shareAutoService;
        this.statusBar = statusBar;
        this.pet = "1";
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.shareknowledgeService.getblogList("hot", 20, 0).then(function (res) {
            _this.hotBlogList = res.result.res_data;
        });
    }
    ShareKnowledgePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShareKnowledgePage');
    };
    ShareKnowledgePage.prototype.ionViewDidEnter = function () {
        console.log(this.navParams);
    };
    ShareKnowledgePage.prototype.itemSelected0 = function (event) {
        var _this = this;
        var type;
        var search_text;
        if (event.id == 1) {
            type = "name";
            search_text = event.name.replace("搜 标题:", "");
        }
        else if (event.id == 2) {
            type = "content";
            search_text = event.name.replace("搜 正文:", "");
        }
        else if (event.id == 3) {
            type = "create_uid";
            search_text = event.name.replace("搜 发布人:", "");
        }
        console.log(search_text);
        this.shareknowledgeService.getSearchList(type, search_text).then(function (res) {
            console.log(res);
            if (res.result.res_data != null && res.result.res_code == 1) {
                if (res.result.res_data.length > 0) {
                    _this.navCtrl.push('ShareknowlelistPage', {
                        item: res.result.res_data,
                        tag_name: '搜索',
                    });
                }
            }
        });
    };
    ShareKnowledgePage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    ShareKnowledgePage.prototype.clickHot = function () {
        var _this = this;
        this.shareknowledgeService.getblogList("hot", 20, 0).then(function (res) {
            _this.hotBlogList = res.result.res_data;
        });
    };
    ShareKnowledgePage.prototype.clickAll = function () {
        var _this = this;
        this.shareknowledgeService.getblogList("all", 20, 0).then(function (res) {
            _this.allBlogList = res.result.res_data;
        });
    };
    ShareKnowledgePage.prototype.clickColum = function () {
        var _this = this;
        this.shareknowledgeService.getblogCloum().then(function (res) {
            console.log(res);
            _this.columBlogList = res.result.res_data;
        });
    };
    ShareKnowledgePage.prototype.getblogDetail = function (item) {
        this.navCtrl.push('ShareknowledgedetailPage', {
            item: item,
        });
    };
    ShareKnowledgePage.prototype.getblogDetailFrom = function (tag_ids) {
        var _this = this;
        if (!tag_ids.tag_id) {
            __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom("分类下暂无文章", this.toastCtrl);
        }
        else {
            this.shareknowledgeService.getblogDetailFrom(tag_ids.tag_id)
                .then(function (res) {
                _this.navCtrl.push('ShareknowlelistPage', {
                    item: res.result.res_data,
                    tag_name: tag_ids.tag_name,
                });
            });
        }
    };
    ShareKnowledgePage.prototype.getblogDetailfirst = function (tag_ids) {
        var _this = this;
        if (!tag_ids.id) {
            __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom("分类下暂无文章", this.toastCtrl);
        }
        else {
            this.shareknowledgeService.getblogDetailfirst(tag_ids.id)
                .then(function (res) {
                _this.navCtrl.push('ShareknowlelistPage', {
                    item: res.result.res_data,
                    tag_name: tag_ids.name
                });
            });
        }
    };
    ShareKnowledgePage.prototype.doRefresh = function (refresh) {
        var _this = this;
        if (this.pet == "1") {
            this.shareknowledgeService.getblogList("hot", 20, 0).then(function (res) {
                refresh.complete();
                _this.hotBlogList = res.result.res_data;
            });
        }
        else if (this.pet == "2") {
            this.shareknowledgeService.getblogList("all", 20, 0).then(function (res) {
                refresh.complete();
                _this.allBlogList = res.result.res_data;
            });
        }
        else if (this.pet == "3") {
            this.shareknowledgeService.getblogCloum().then(function (res) {
                console.log(res);
                refresh.complete();
                _this.columBlogList = res.result.res_data;
            });
        }
    };
    ShareKnowledgePage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    return ShareKnowledgePage;
}());
ShareKnowledgePage = share_knowledge___decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    share_knowledge___WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-share-knowledge',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/share-knowledge/share-knowledge.html"*/'<!--\n  Generated template for the ShareKnowledgePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>知识分享</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet"> \n      <ion-segment-button tappable (click)=\'clickHot()\' value="1">\n        热门\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickAll()\' value="2">\n        全部\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickColum()\' value="3">\n        分类\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-auto-complete style="width: 94vw; margin-left:3vw" (itemSelected)="itemSelected0($event)" [dataProvider]="shareAutoService"></ion-auto-complete>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n  <div [ngSwitch]="pet">\n        \n    <ng-template [ngSwitchCase]=\'1\' style="margin-top:10px;">\n      <ion-list>\n        <ion-item  no-lines *ngFor=\'let item of hotBlogList\' tappable (click)=\'getblogDetail(item)\' class="middle_item">\n          <h4 text-wrap style="font-size:14px;font-weight:bold">{{item.name}}</h4>\n          <p text-wrap style="font-size:12px;color:gray"> {{item.subtitle}} </p>\n          <p text-wrap style="font-size:12px;color:gray">来自分类：{{item.blog_id.blog_name}}/{{item.tag_ids.tag_name}} </p>\n          <img src={{item.create_uid.create_img}} class="image1" style="float:left;">\n          <p text-wrap style="font-size:12px;line-height:27px;margin-left: 35px;">{{item.create_uid.create_name}}</p>\n        </ion-item> \n      </ion-list>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'2\' style="margin-top:10px;">\n        <ion-list>\n          <ion-item no-lines *ngFor=\'let item of allBlogList\' tappable (click)=\'getblogDetail(item)\' class="middle_item">\n            <h4 text-wrap style="font-size:100%;font-weight:bold">{{item.name}}</h4>\n            <p text-wrap style="font-size:70%;color:gray"> {{item.subtitle}} </p>\n            <p text-wrap style="font-size:70%;color:gray">来自分类：{{item.blog_id.blog_name}}/{{item.tag_ids.tag_name}}</p>\n            <img src={{item.create_uid.create_img}} class="image1" style="float:left;">\n            <p text-wrap style="font-size:70%;line-height:27px;margin-left: 35px;">{{item.create_uid.create_name}}</p>\n          </ion-item>\n        </ion-list>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\'3\' style="margin-top:5px;">\n          <ion-list>\n            <ion-item *ngFor=\'let item of columBlogList\' tappable (click)=\'getblogDetailfirst(item)\'>\n              <img src="assets/img/colum_blog.png" class="image2" style="float:left;">\n              <h4 text-wrap style="font-size:80%;font-weight:bold;color:#04AAF4;line-height:12px;margin-left: 20px">{{item.name}}</h4>\n              <ion-grid>\n                      <ion-row>\n                          <ion-col col-5 class="gridview" wider  *ngFor=\'let items of item.blog_tag_ids\' (click)=\'getblogDetailFrom(items);$event.stopPropagation()\'>{{items.tag_name}}</ion-col>\n                      </ion-row>\n              </ion-grid>\n            </ion-item>\n          </ion-list>\n          \n        </ng-template>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/share-knowledge/share-knowledge.html"*/,
        providers: [ShareknowledgeService, ShareAutoService],
    }),
    share_knowledge___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        ShareknowledgeService, __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["E" /* ToastController */],
        ShareAutoService, __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], ShareKnowledgePage);

//# sourceMappingURL=share-knowledge.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/share-knowledge/share-knowledge.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareKnowledgePageModule", function() { return ShareKnowledgePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(738);
var share_knowledge_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ShareKnowledgePageModule = (function () {
    function ShareKnowledgePageModule() {
    }
    return ShareKnowledgePageModule;
}());
ShareKnowledgePageModule = share_knowledge_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ShareKnowledgePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ShareKnowledgePage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], ShareKnowledgePageModule);

//# sourceMappingURL=share-knowledge.module.js.map

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




/***/ })

});
//# sourceMappingURL=52.js.map