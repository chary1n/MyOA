webpackJsonp([26],{

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-search/gongdan-search-auto.ts
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



var GongDanAutoService = (function () {
    function GongDanAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    GongDanAutoService.prototype.getResults = function (keyword) {
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
        obj1.name = "搜 申请人：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 受理人：" + keyword;
        arr.push(obj2);
        obj3.name = "搜 标题：" + keyword;
        arr.push(obj3);
        return arr;
    };
    return GongDanAutoService;
}());
GongDanAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], GongDanAutoService);

//# sourceMappingURL=gongdan-search-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-search/gongdan-search.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var gongdan_search___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gongdanService__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_date_picker__ = __webpack_require__(242);
var gongdan_search___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var gongdan_search___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the GongdanSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GongdanSearchPage = (function () {
    function GongdanSearchPage(navCtrl, navParams, gongDanAutoService, gongdanService, datePipe, toastCtrl, datePicker, statusbar, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gongDanAutoService = gongDanAutoService;
        this.gongdanService = gongdanService;
        this.datePipe = datePipe;
        this.toastCtrl = toastCtrl;
        this.datePicker = datePicker;
        this.statusbar = statusbar;
        this.platform = platform;
        this.dataList = [];
        this.unacceptTitle = "待受理";
        this.unassignTitle = "待验收";
        this.processTitle = "受理中";
        this.has_data = false;
        this.brand_ids = [];
        this.area_ids = [];
        this.category_ids = [];
        this.is_ios = this.platform.is('ios');
        this.endDate_gongdan = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
            this.startDate_gongdan = this.datePipe.transform('2018-01-01', 'yyyy-MM-dd');
        this.gongdanService.get_all_biaoqian().then(function (res) {
            console.log(res);
            if (res.result.res_data && res.result.res_code == 1) {
                _this.biaoqianList = res.result.res_data.res_data;
            }
        });
    }
    GongdanSearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GongdanSearchPage');
    };
    GongdanSearchPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    GongdanSearchPage.prototype.ionViewDidEnter = function () {
        var need_load = false;
        if (this.navParams.get('brand_list') && (this.navParams.get('brand_list').length || this.navParams.get('brand_list').length == 0)) {
            this.brand_ids = this.navParams.get('brand_list');
            this.navParams.data.brand_list = false;
            need_load = true;
        }
        if (this.navParams.get('area_list') && (this.navParams.get('area_list').length || this.navParams.get('area_list').length == 0)) {
            this.area_ids = this.navParams.get('area_list');
            this.navParams.data.area_list = false;
            need_load = true;
        }
        if (this.navParams.get('category_list') && (this.navParams.get('category_list').length || this.navParams.get('category_list').length == 0)) {
            this.category_ids = this.navParams.get('category_list');
            this.navParams.data.category_list = false;
            need_load = true;
        }
        if (need_load) {
            if (this.search_text) {
                this.getDataList(this.page_issue_state);
            }
        }
    };
    GongdanSearchPage.prototype.itemSelected = function (event) {
        this.dataList = [];
        var search_text;
        var search_type;
        if (event.id == 1) {
            search_text = event.name.replace("搜 申请人：", "");
            search_type = "write_uid";
        }
        else if (event.id == 2) {
            search_text = event.name.replace("搜 受理人：", "");
            search_type = "assign_uid";
        }
        else if (event.id == 3) {
            search_text = event.name.replace("搜 标题：", "");
            search_type = "name";
        }
        this.search_text = search_text;
        this.search_type = search_type;
        // this.gongdanService.search_gongdan(search_text,search_type).then(res => {
        //     if (res.result.res_data) {
        //     for (let item of res.result.res_data) {
        //       this.dataList.push(item)
        //     }
        //   }
        // })
        this.inner_type = "all";
        this.getDataList(null);
    };
    GongdanSearchPage.prototype.gongdanDetail = function (item) {
        var _this = this;
        this.gongdanService.getGongdanDetail(item.work_order_id).then(function (res) {
            console.log(res);
            if (res.result.res_data && res.result.res_code == 1) {
                _this.navCtrl.push('GongdanDetailPage', {
                    items: res.result.res_data,
                    biaoqian_list: _this.biaoqianList,
                });
            }
        });
    };
    GongdanSearchPage.prototype.changeState = function (item) {
        var state_str = "";
        if (item == "unaccept") {
            state_str = "等待受理";
        }
        else if (item == "process") {
            state_str = "受理中";
        }
        else if (item == "check") {
            state_str = "待验收";
        }
        else if (item == "done") {
            state_str = "已完成";
        }
        else if (item == "draft") {
            state_str = "草稿";
        }
        return state_str;
    };
    GongdanSearchPage.prototype.getDataList = function (state) {
        var _this = this;
        this.dataList = [];
        this.page_issue_state = state;
        if (!state) {
            this.has_data = false;
        }
        this.gongdanService.work_order_search(JSON.stringify({
            start_date: this.startDate_gongdan,
            end_date: this.datePipe.transform(new Date(new Date(this.endDate_gongdan).getTime() + 3600000 * 24), 'yyyy-MM-dd'),
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            issue_state: state,
            search_type: this.search_type,
            search_text: this.search_text,
            category_ids: this.category_ids,
            brand_ids: this.brand_ids,
            area_ids: this.area_ids,
        })).then(function (res) {
            console.log(res);
            if (res.result.res_data) {
                for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                    var item = _a[_i];
                    _this.dataList.push(item);
                }
            }
            if (!state) {
                if (_this.dataList.length > 0) {
                    _this.has_data = true;
                }
            }
        });
        this.reload_statics();
    };
    GongdanSearchPage.prototype.reload_statics = function () {
        var _this = this;
        this.gongdanService.work_order_statistics_search(null, null, [], this.search_type, this.search_text).then(function (res) {
            console.log(res);
            if (res.result.res_data) {
                if (res.result.res_data.unaccept) {
                    _this.unacceptTitle = "待受理" + " (" + res.result.res_data.unaccept + ")";
                }
                else {
                    _this.unacceptTitle = "待受理";
                }
                if (res.result.res_data.check) {
                    _this.unassignTitle = "待验收" + " (" + res.result.res_data.check + ")";
                }
                else {
                    _this.unassignTitle = "待验收";
                }
                if (res.result.res_data.process) {
                    _this.processTitle = "受理中" + " (" + res.result.res_data.process + ")";
                }
                else {
                    _this.processTitle = "受理中";
                }
            }
            else {
                _this.unacceptTitle = "待受理";
                _this.unassignTitle = "待验收";
                _this.processTitle = "受理中";
            }
        });
    };
    GongdanSearchPage.prototype.click_all = function () {
        this.inner_type = "all";
        this.allClick();
    };
    GongdanSearchPage.prototype.click_one = function () {
        this.inner_type = "first";
        this.unacceptClick();
    };
    GongdanSearchPage.prototype.click_two = function () {
        this.inner_type = "second";
        this.processClick();
    };
    GongdanSearchPage.prototype.click_three = function () {
        this.inner_type = "third";
        this.unassignClick();
    };
    GongdanSearchPage.prototype.unacceptClick = function () {
        this.getDataList("unaccept");
    };
    GongdanSearchPage.prototype.processClick = function () {
        this.getDataList("process");
    };
    GongdanSearchPage.prototype.unassignClick = function () {
        this.getDataList("check");
    };
    GongdanSearchPage.prototype.allClick = function () {
        this.getDataList(null);
    };
    GongdanSearchPage.prototype.clickback = function () {
        this.navCtrl.pop();
    };
    GongdanSearchPage.prototype.clickMenu = function () {
        this.navCtrl.push('GongdanBiaoqianPage', {
            brand_ids: this.brand_ids,
            area_ids: this.area_ids,
            category_ids: this.category_ids,
            need_back_search: true,
        });
    };
    GongdanSearchPage.prototype.chooseStartDate_gongdan = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.startDate_gongdan),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.endDate_gongdan >= _this.datePipe.transform(date, 'yyyy-MM-dd')) {
                _this.startDate_gongdan = _this.datePipe.transform(date, 'yyyy-MM-dd');
                _this.getDataList(_this.page_issue_state);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    GongdanSearchPage.prototype.chooseEndDate_gongdan = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(this.endDate_gongdan),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
            cancelButtonLabel: "取消",
            cancelText: "取消",
            doneButtonLabel: "确定",
            locale: "zh-Hans",
        }).then(function (date) {
            if (_this.datePipe.transform(date, 'yyyy-MM-dd') >= _this.startDate_gongdan) {
                _this.endDate_gongdan = _this.datePipe.transform(date, 'yyyy-MM-dd');
                // this.reload_statics()
                _this.getDataList(_this.page_issue_state);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("请选择正确的日期", _this.toastCtrl);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    return GongdanSearchPage;
}());
GongdanSearchPage = gongdan_search___decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    gongdan_search___WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-gongdan-search',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-search/gongdan-search.html"*/'<!--\n  Generated template for the GongdanSearchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>工单搜索</ion-title>\n    \n  </ion-navbar>\n\n</ion-header>-->\n\n\n<ion-content style="background:#f0f2f5">\n  <div align="center" style="background:#2597ec;">\n    <ion-auto-complete style="width: 80vw;margin-left:3vw" (itemSelected) = "itemSelected($event)"  [dataProvider]="gongDanAutoService"></ion-auto-complete>\n    <p style="margin-right:16px;color:white;float:right"  tappable (click)="clickback()">取消</p>\n  </div>\n    <div *ngIf="(unacceptTitle + processTitle + unassignTitle).length > 9 || dataList.length || has_data > 0" style="height:40px;width:100%;background:white;">\n      \n      <img src= "assets/img/gongdan/rili.png" height="18px" width="18px" style="margin-left:10px;margin-top:11px;float:left">\n      <p style="float:left;margin-left:10px;line-height:14px;color:gray">\n        <span tappable (click)="chooseStartDate_gongdan()">{{startDate_gongdan + " - "}}</span><span tappable (click)="chooseEndDate_gongdan()">{{endDate_gongdan}}</span>   \n      </p>\n       <img src= "assets/img/work_bench/shaixuan.png" height="18px" width="18px" style="margin-right:-35px;margin-top:11px;float:right" tappable (click)="clickMenu()">\n      <p tappable (click)="clickMenu()" style="float:right;margin-top:10px;color:gray;margin-right:-12px;border-left:#f0f2f5 1px solid;width:40px;text-align:right">筛选</p>\n    </div>   \n    <ion-item *ngIf="(unacceptTitle + processTitle + unassignTitle).length > 9 || dataList.length || has_data > 0" align="center" no-lines style="margin-top:10px;height:40px;min-height:40px;border-bottom:#f0f2f5 1px solid;width:101%;margin-left:-2px;margin-right:-4px;">\n\n  <ion-grid  style="background-color:white;">\n      <ion-row class="row_class" align-items-center>\n        <ion-col tappable (click) = "click_all()">\n        <div align="center" >\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'all\']">全部</p> \n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'first\']">{{unacceptTitle}}</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'second\']">{{processTitle}}</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_three()">\n        <div align="center" >\n          <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[inner_type == \'third\']">{{unassignTitle}}</p> \n        </div>\n      </ion-col>\n      \n      </ion-row>\n    </ion-grid>\n    </ion-item>\n\n    <ion-item-group no-lines class="item_group_class" >\n      <div *ngFor="let item of dataList" style="margin-top:10px;background-color:white" tappable (click)="gongdanDetail(item)">\n        <div>\n          <img *ngIf="item.priority == 1" src="assets/img/work_bench/up_one.png" class="priority_icon">\n          <img *ngIf="item.priority == 2" src="assets/img/work_bench/up_two.png" class="priority_icon">\n          <img *ngIf="item.priority == 3" src="assets/img/work_bench/up_three.png" class="priority_icon">\n          <span class="title_class_style">\n            {{item.title}}\n          </span>\n          <span p class="data_list_state">\n            {{changeState(item.issue_state)}}\n          </span>\n        </div>\n        <P text-wrap class="data_list_desprition">\n          {{item.description}}\n        </P>\n        <ion-grid *ngIf="item.work_order_images" style="margin-top:-20px;margin-left:5px">\n          <ion-row style="margin-right:5px;">\n            <ion-col *ngFor="let image of item.work_order_images" col-3>\n              <img src={{image}}>\n\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <div class="creater_div">\n          <img src={{item.create_user.user_ava}} class="create_ava">\n          <span p class="creater_name">\n            {{item.create_user.name + " " +item.create_time}}\n          </span>\n          <span *ngIf="!item.assign_user.name" class="assign_name">未指派受理人</span>\n          <span *ngIf="item.assign_user.name" class="assign_name">\n            {{"受理人： "+ item.assign_user.name}}\n          </span>\n          <img *ngIf="item.assign_user.name" src="assets/img/work_bench/lianjie.png" class="assign_ava">\n        </div>\n        <div style="height:1px;background:white">\n        </div>\n      </div>\n    </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-search/gongdan-search.html"*/,
        providers: [GongDanAutoService, __WEBPACK_IMPORTED_MODULE_4__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_7__angular_common__["DatePipe"]]
    }),
    gongdan_search___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], GongDanAutoService,
        __WEBPACK_IMPORTED_MODULE_4__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_7__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["E" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_date_picker__["a" /* DatePicker */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["z" /* Platform */]])
], GongdanSearchPage);

//# sourceMappingURL=gongdan-search.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-search/gongdan-search.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GongdanSearchPageModule", function() { return GongdanSearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(738);
var gongdan_search_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GongdanSearchPageModule = (function () {
    function GongdanSearchPageModule() {
    }
    return GongdanSearchPageModule;
}());
GongdanSearchPageModule = gongdan_search_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            GongdanSearchPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(GongdanSearchPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
    })
], GongdanSearchPageModule);

//# sourceMappingURL=gongdan-search.module.js.map

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

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GongDanService; });
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


var GongDanService = (function () {
    function GongDanService(httpservice) {
        this.httpservice = httpservice;
    }
    GongDanService.prototype.create_work_order = function (body) {
        return this.httpservice.postBody("create_work_order", body, 1);
    };
    GongDanService.prototype.my_work_order_statistics = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("my_work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_search = function (body) {
        return this.httpservice.postBody("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_searchNoLoading = function (body) {
        return this.httpservice.postBodyNoLoading("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_statistics = function (start_date, end_date, brand_ids, area_ids, category_ids, user_id) {
        var body = JSON.stringify({
            uid: user_id,
            start_date: start_date,
            end_date: end_date,
            brand_ids: brand_ids,
            area_ids: area_ids,
            category_ids: category_ids,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_statistics_search = function (start_date, end_date, tag_ids, search_type, search_text) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date,
            tag_ids: tag_ids,
            search_type: search_type,
            search_text: search_text,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics_search", body, 1);
    };
    GongDanService.prototype.work_order_statisticsWithTime = function (start_date, end_date) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date
        });
        return this.httpservice.postBody("work_order_statistics", body, 1);
    };
    GongDanService.prototype.searchAtMe = function (body) {
        return this.httpservice.postBodyNoLoading("searchAtMe", body, 1);
    };
    GongDanService.prototype.searchAtMeWithLoading = function (body) {
        return this.httpservice.postBody("searchAtMe", body, 1);
    };
    GongDanService.prototype.getDepartment = function () {
        var body = JSON.stringify({
            partner_id: 1
        });
        return this.httpservice.postBody("get_all_departments", body);
    };
    GongDanService.prototype.getGongdanDetail = function (id) {
        var body = JSON.stringify({
            work_order_id: id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("work_order_search_by_id", body, 1);
    };
    GongDanService.prototype.work_order_add_record = function (content, reply_uid, record_type, work_order_id, parent_id, record_imgs) {
        var body = JSON.stringify({
            content: content,
            reply_uid: reply_uid,
            record_type: record_type,
            work_order_id: work_order_id,
            parent_id: parent_id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            record_imgs: record_imgs,
        });
        return this.httpservice.postBody("work_order_add_record", body, 1);
    };
    GongDanService.prototype.get_all_employees = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_employees", body);
    };
    GongDanService.prototype.get_department_employees = function (department_ids) {
        var body = JSON.stringify({
            department_ids: department_ids
        });
        return this.httpservice.postBody("get_department_employees", body);
    };
    GongDanService.prototype.work_order_action = function (uid, work_order_id, action_type, assign_uid) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            action_type: action_type,
            assign_uid: assign_uid,
        });
        return this.httpservice.postBody("work_order_action", body, 1);
    };
    GongDanService.prototype.work_order_retract = function (uid, work_order_id, need_unlink) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            need_unlink: need_unlink,
        });
        return this.httpservice.postBody("work_order_retract", body, 1);
    };
    GongDanService.prototype.commit_draft = function (body) {
        return this.httpservice.postBody("commit_draft", body, 1);
    };
    GongDanService.prototype.search_gongdan = function (search_text, search_type) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            search_text: search_text,
            search_type: search_type,
        });
        return this.httpservice.postBody("search_gongdan", body, 1);
    };
    GongDanService.prototype.get_all_biaoqian = function () {
        return this.httpservice.postBody("get_all_biaoqian", {}, 1);
    };
    GongDanService.prototype.update_biaoqian = function (work_order_id, category_ids, brand_ids, area_ids) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            work_order_id: work_order_id,
            category_ids: category_ids,
            brand_ids: brand_ids,
            area_ids: area_ids,
        });
        return this.httpservice.postBody("update_biaoqian", body, 1);
    };
    GongDanService.prototype.get_employee_detail = function (user_id) {
        var body = JSON.stringify({
            user_id: user_id,
        });
        return this.httpservice.postBody("get_employee_detail", body, 1);
    };
    GongDanService.prototype.search_biaoqian = function (search_type, search_text) {
        var body = JSON.stringify({
            search_type: search_type,
            search_text: search_text
        });
        return this.httpservice.postBody("search_biaoqian", body, 1);
    };
    return GongDanService;
}());
GongDanService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], GongDanService);

//# sourceMappingURL=gongdanService.js.map

/***/ })

});
//# sourceMappingURL=26.js.map