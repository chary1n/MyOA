webpackJsonp([17],{

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/salesOrder-auto.ts
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



var SalesOrderAutoService = (function () {
    function SalesOrderAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    SalesOrderAutoService.prototype.getResults = function (keyword) {
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
        var obj4 = {
            name: "",
            id: 4,
        };
        var obj5 = {
            name: "",
            id: 5,
        };
        var obj6 = {
            name: "",
            id: 6,
        };
        var arr = [];
        obj1.name = "搜 订单:" + keyword;
        arr.push(obj1);
        obj2.name = "搜 客户:" + keyword;
        arr.push(obj2);
        obj3.name = "搜 产品:" + keyword;
        arr.push(obj3);
        obj4.name = "搜 销售员:" + keyword;
        arr.push(obj4);
        obj5.name = "搜 销售团队:" + keyword;
        arr.push(obj5);
        obj6.name = "搜 PI号码:" + keyword;
        arr.push(obj6);
        return arr;
    };
    return SalesOrderAutoService;
}());
SalesOrderAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], SalesOrderAutoService);

//# sourceMappingURL=salesOrder-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/salesOrder.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__salesService__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
var salesOrder___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var salesOrder___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { CreateQuotesPage } from './create-quotes/create-quotes';

// import { SalesDetailPage } from './sales-detail/sales-detail';



// import { PurchaseBackOrderPage } from './sales-detail/purchase-back-order/purchase-back-order';
/**
 * Generated class for the SalesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalesOrderPage = (function () {
    function SalesOrderPage(navCtrl, navParams, actionSheetCtrl, salesSearvice, storage, salesAuto) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.salesSearvice = salesSearvice;
        this.storage = storage;
        this.salesAuto = salesAuto;
        this.pet = "2";
        this.limit = 20;
        this.offset = 0;
        this.isMoreData1 = true;
        this.isMoreData2 = true;
        this.isMoreData3 = true;
        this.isMoreData4 = true;
        var self = this;
        this.storage.get('user')
            .then(function (res) {
            self.userId = res.result.res_data.user_id;
            console.log(res);
            _this.clickTwo();
        });
    }
    SalesOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalesPage');
    };
    SalesOrderPage.prototype.ionViewDidEnter = function () {
    };
    SalesOrderPage.prototype.itemSelected = function (event) {
        var _this = this;
        var type;
        var search_text;
        if (event.id == 1) {
            type = "name";
            search_text = event.name.replace("搜 订单:", "");
        }
        else if (event.id == 2) {
            type = "partner_id";
            search_text = event.name.replace("搜 客户:", "");
        }
        else if (event.id == 3) {
            type = "product_id";
            search_text = event.name.replace("搜 产品:", "");
        }
        else if (event.id == 4) {
            type = "user_id";
            search_text = event.name.replace("搜 销售员:", "");
        }
        else if (event.id == 5) {
            type = "team_id";
            search_text = event.name.replace("搜 销售团队:", "");
        }
        else if (event.id == 6) {
            type = "pi_number";
            search_text = event.name.replace("搜 PI号码:", "");
        }
        this.salesSearvice.searchSalesOrder(type, search_text, this.pet).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                if (_this.pet == "1") {
                    _this.quotesOrder = res.result.res_data;
                }
                else if (_this.pet == "2") {
                    _this.salesOrder = res.result.res_data;
                }
            }
        });
    };
    SalesOrderPage.prototype.clickOne = function () {
        var _this = this;
        this.salesSearvice.getQuotesList(0, 20, this.userId)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.quotesOrder = res.result.res_data;
                console.log(_this.quotesOrder);
            }
        });
    };
    SalesOrderPage.prototype.doRefresh1 = function (refresh) {
        var _this = this;
        this.isMoreData1 = true;
        this.limit = 20;
        this.offset = 0;
        this.salesSearvice.getQuotesList(0, 20, this.userId).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.quotesOrder = res.result.res_data;
        });
    };
    SalesOrderPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData1 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.salesSearvice.getQuotesList(this.offset, this.limit, this.userId).then(function (res) {
                console.log(_this.offset);
                console.log(_this.limit);
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData1 = true;
                    }
                    else {
                        _this.isMoreData1 = false;
                    }
                    for (var _i = 0, item_data_1 = item_data; _i < item_data_1.length; _i++) {
                        var item = item_data_1[_i];
                        _this.quotesOrder.push(item);
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
    };
    SalesOrderPage.prototype.clickTwo = function () {
        var _this = this;
        this.salesSearvice.getSalesOrder(0, 20, this.userId)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.salesOrder = res.result.res_data;
                console.log(_this.salesOrder);
            }
        });
    };
    SalesOrderPage.prototype.doRefresh2 = function (refresh) {
        var _this = this;
        this.isMoreData2 = true;
        this.limit = 20;
        this.offset = 0;
        this.salesSearvice.getSalesOrder(0, 20, this.userId).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.salesOrder = res.result.res_data;
        });
    };
    SalesOrderPage.prototype.doInfinite2 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData2 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.salesSearvice.getSalesOrder(this.offset, this.limit, this.userId).then(function (res) {
                console.log(_this.offset);
                console.log(_this.limit);
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData2 = true;
                    }
                    else {
                        _this.isMoreData2 = false;
                    }
                    for (var _i = 0, item_data_2 = item_data; _i < item_data_2.length; _i++) {
                        var item = item_data_2[_i];
                        _this.salesOrder.push(item);
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
    };
    SalesOrderPage.prototype.clickThree = function () {
        var _this = this;
        this.salesSearvice.getSalesReturn(0, 20, this.userId)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.salesReturnOrder = res.result.res_data;
                console.log(_this.salesReturnOrder);
            }
        });
    };
    SalesOrderPage.prototype.doRefresh3 = function (refresh) {
        var _this = this;
        this.isMoreData3 = true;
        this.limit = 20;
        this.offset = 0;
        this.salesSearvice.getSalesReturn(0, 20, this.userId).then(function (res) {
            console.log(res);
            refresh.complete();
            if (res.result && res.result.res_code == 1) {
                _this.salesReturnOrder = res.result.res_data;
                console.log(_this.salesReturnOrder);
            }
        });
    };
    SalesOrderPage.prototype.doInfinite3 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData3 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.salesSearvice.getSalesReturn(this.offset, this.limit, this.userId).then(function (res) {
                console.log(_this.offset);
                console.log(_this.limit);
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData3 = true;
                    }
                    else {
                        _this.isMoreData3 = false;
                    }
                    for (var _i = 0, item_data_3 = item_data; _i < item_data_3.length; _i++) {
                        var item = item_data_3[_i];
                        _this.salesReturnOrder.push(item);
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
    };
    SalesOrderPage.prototype.searchClick1 = function () {
        var _this = this;
        this.isMoreData1 = false;
        this.salesSearvice.searchQuotesList(this.searchName1, this.userId)
            .then(function (res) {
            _this.quotesOrder = res.result.res_data;
        });
    };
    SalesOrderPage.prototype.searchClick2 = function () {
        var _this = this;
        this.isMoreData2 = false;
        this.salesSearvice.searchSalesList(this.searchName2, this.userId)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.salesOrder = res.result.res_data;
            }
        });
    };
    SalesOrderPage.prototype.searchClick3 = function () {
        var _this = this;
        this.isMoreData3 = false;
        this.salesSearvice.searchSalesReturnList(this.searchName3, this.userId)
            .then(function (res) {
            _this.salesReturnOrder = res.result.res_data;
        });
    };
    SalesOrderPage.prototype.orderDetail1 = function (mid) {
        this.navCtrl.push('SalesDetailPage', {
            id: mid, type: "quotesOrder"
        });
    };
    SalesOrderPage.prototype.orderDetail2 = function (mid) {
        this.navCtrl.push('SalesDetailPage', {
            id: mid, type: "salesOrder",
        });
    };
    SalesOrderPage.prototype.viewJiaohuoOrder = function (item) {
        this.navCtrl.push('JiaohuoListPage', { id: item.id });
    };
    SalesOrderPage.prototype.orderDetail3 = function (mid) {
        var _this = this;
        this.salesSearvice.getSalesReturnOrderDetail(mid).then(function (res) {
            console.log(res);
            _this.navCtrl.push('PurchaseBackOrderPage', {
                items: res.result.res_data
            });
        });
    };
    //点击创建
    SalesOrderPage.prototype.create = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '请选择订单类型',
            buttons: [
                {
                    text: '报价单',
                    //  role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.createQuotes();
                    }
                },
                // {
                //   text: '销售退货',
                //   handler: () => {
                //     console.log('Archive clicked');
                //     this.createSalesReturn();
                //  }
                // },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // 报价单
    SalesOrderPage.prototype.createQuotes = function () {
        this.navCtrl.push('CreateQuotesPage');
    };
    // 销售退货
    SalesOrderPage.prototype.createSalesReturn = function () {
    };
    return SalesOrderPage;
}());
SalesOrderPage = salesOrder___decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-salesOrder',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/salesOrder.html"*/'<!--\n  Generated template for the SalesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>订单</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'create()\'>\n       创建\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet">\n      <ion-segment-button tappable (click)=\'clickOne()\' value="1">\n        报价单\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickTwo()\' value="2">\n        销售订单\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickThree()\' value="3">\n        销售退货\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content >\n\n  <div [ngSwitch]="pet">\n\n    <ng-template [ngSwitchCase]=\'1\'>\n      <ion-auto-complete style="width: 100vw;" (itemSelected)="itemSelected($event)" [dataProvider]="salesAuto"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh1($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n\n        <figure class="circle"></figure>\n        <ion-item *ngFor=\'let item of quotesOrder\' tappable (click)=\'orderDetail1(item.id)\'>\n          <p text-wrap style="font-size:100%;float:right;color:#fc6621;">报价单</p>\n          <h2 text-wrap>{{item.name}}</h2>\n          <h4 text-wrap style="font-size:70%;">单据日期 {{item.date_order}}</h4>\n          <p text-wrap style="font-size:125%;float:right;color:#000000;font-weight:bold"> {{item.amount_total}} </p>\n          <p text-wrap>{{item.team}} 销售员 :{{item.salesman}}</p>\n          <p text-wrap>客户 : {{item.customer}}</p>\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite1($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'2\'>\n      <ion-auto-complete style="width: 100vw;" (itemSelected)="itemSelected($event)" [dataProvider]="salesAuto"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh2($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of salesOrder\' tappable (click)=\'orderDetail2(item.id)\'>\n          <p text-wrap style="font-size:70%;float:right;">{{item.invoice_status[1]}}</p>\n          <p text-wrap *ngIf="item.state==\'cancel\'" style="font-size:70%;float:right;color:red;margin-right:10px">已取消</p>\n          <h2 text-wrap>{{item.name}}</h2>\n          <h2 text-wrap style="font-size:70%;">交货日期 {{item.validity_date}}</h2>\n          <p text-wrap style="font-size:125%;float:right;color:#000000;font-weight:bold"> {{item.amount_total}} </p>\n          <p text-wrap>{{item.team}} 销售员 :{{item.salesman}}</p>\n          <p text-wrap>客户 : {{item.customer}}</p>\n          <!-- <p text-wrap> PI号码 :{{item.pi_number}}  </p> -->\n          <div style="overflow:hidden">\n            <button ion-button outline round style="float:right">订单详情</button>\n            <button ion-button outline round style="float:right" (click)=\'viewJiaohuoOrder(item);$event.stopPropagation();\'>查看交货单</button>\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite2($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'3\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <div>\n              <ion-input [(ngModel)]="searchName3" placeholder="输入订单编号" style="margin-left:20px;;"></ion-input>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div><button (click)=\'searchClick3()\' class="searchFont">搜索</button></div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-refresher (ionRefresh)="doRefresh3($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of salesReturnOrder\' tappable (click)=\'orderDetail3(item.id)\'>\n          <p text-wrap style="font-size:100%;float:right;color:#fc6621;">{{item.state[1]}}</p>\n          <h2 text-wrap>{{item.name}}</h2>\n          <h4 text-wrap style="font-size:70%;word-break:break-all">退货日期 {{item.date}}</h4>\n          <p text-wrap style="font-size:125%;float:right;color:#000000;font-weight:bold"> {{item.amount_total}} </p>\n          <p text-wrap>客户 : {{item.customer}} </p>\n          <p text-wrap>退货原因 :{{item.remark}}</p>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll (ionInfinite)="doInfinite3($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/salesOrder.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */], SalesOrderAutoService]
    }),
    salesOrder___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        SalesOrderAutoService])
], SalesOrderPage);

//# sourceMappingURL=salesOrder.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/salesOrder.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderPageModule", function() { return SalesOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic2_auto_complete__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
var salesOrder_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SalesOrderPageModule = (function () {
    function SalesOrderPageModule() {
    }
    return SalesOrderPageModule;
}());
SalesOrderPageModule = salesOrder_module___decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"]({
        declarations: [
            SalesOrderPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* IonicPageModule */].forChild(SalesOrderPage), __WEBPACK_IMPORTED_MODULE_0_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
        entryComponents: [],
        exports: [
            SalesOrderPage,
        ]
    })
], SalesOrderPageModule);

//# sourceMappingURL=salesOrder.module.js.map

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

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesSearvice; });
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


var SalesSearvice = (function () {
    function SalesSearvice(httpservice) {
        this.httpservice = httpservice;
    }
    SalesSearvice.prototype.getQuotesList = function (moffset, mlimit, id) {
        var body = JSON.stringify({
            type: 'in',
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    };
    SalesSearvice.prototype.getSalesOrder = function (moffset, mlimit, id) {
        var body = JSON.stringify({
            type: 'not in',
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    };
    SalesSearvice.prototype.getSalesReturn = function (moffset, mlimit, id) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_sale_orders", body);
    };
    SalesSearvice.prototype.getSalesOrderDetail = function (mid) {
        var body = JSON.stringify({
            id: mid
        });
        return this.httpservice.postBody("get_sale_orders_details", body);
    };
    SalesSearvice.prototype.getSalesReturnOrderDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_sale_return_details", body);
    };
    SalesSearvice.prototype.searchQuotesList = function (number, id) {
        var body = JSON.stringify({
            name: number,
            model: "sale.order",
            state: "draft",
            user_id: id
        });
        return this.httpservice.postBody("search_sale_orders", body);
    };
    SalesSearvice.prototype.searchSalesList = function (number, id) {
        var body = JSON.stringify({
            name: number,
            model: "sale.order",
            state: "purchase",
            user_id: id
        });
        return this.httpservice.postBody("search_sale_orders", body);
    };
    SalesSearvice.prototype.searchSalesReturnList = function (number, id) {
        var body = JSON.stringify({
            name: number,
            model: "return.goods",
            user_id: id
        });
        return this.httpservice.postBody("search_sale_orders", body);
    };
    SalesSearvice.prototype.cancelOrder = function (mid) {
        var body = JSON.stringify({
            id: mid,
        });
        return this.httpservice.postBody("cancel_order", body);
    };
    SalesSearvice.prototype.confirmOrder = function (mid) {
        var body = JSON.stringify({
            id: mid,
        });
        return this.httpservice.postBody("confirm_order", body);
    };
    // 获取产品列表
    SalesSearvice.prototype.getProducts = function (moffset, mlimit) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
        });
        return this.httpservice.postBody("get_products", body);
    };
    SalesSearvice.prototype.searchProduction = function (mName) {
        var body = JSON.stringify({
            name: mName
        });
        return this.httpservice.postBody("get_products", body);
    };
    SalesSearvice.prototype.searchProductionByScan = function (mName) {
        var body = JSON.stringify({
            name: mName
        });
        return this.httpservice.postBody("search_products_by_material_no", body);
    };
    // 仓库列表
    SalesSearvice.prototype.getWareHouseList = function () {
        var body = JSON.stringify({
            type: "warehouse"
        });
        return this.httpservice.postBody("get_all_customers", body);
    };
    // 送货策略
    SalesSearvice.prototype.getDeliveryRulsList = function () {
        var body = JSON.stringify({
            type: "picking_policy"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    };
    // 销售团队
    SalesSearvice.prototype.getTeamList = function () {
        var body = JSON.stringify({
            type: "team"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    };
    // 分析账户
    SalesSearvice.prototype.getAnalyticAccountList = function () {
        var body = JSON.stringify({
            type: "analytic_account"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    };
    // 获取贸易术语
    SalesSearvice.prototype.getIncotermList = function () {
        var body = JSON.stringify({
            type: "incoterm"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    };
    // 获取标签
    SalesSearvice.prototype.getTagsList = function () {
        var body = JSON.stringify({
            type: "tags"
        });
        return this.httpservice.postBody("get_all_customers", body);
    };
    // 获取财务列表
    SalesSearvice.prototype.getFiscalList = function () {
        var body = JSON.stringify({
            type: "fiscal"
        });
        return this.httpservice.postBody("get_all_customers", body);
    };
    // 获取交货规则
    SalesSearvice.prototype.getDeliveryList = function () {
        var body = JSON.stringify({
            type: "delivery"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    };
    // 获取税金列表
    SalesSearvice.prototype.getTaxList = function () {
        var body = JSON.stringify({
            type: "tax"
        });
        return this.httpservice.postBodyNoLoading("get_all_customers", body);
    };
    // 获取付款条款列表
    SalesSearvice.prototype.getPaymentTermList = function () {
        var body = JSON.stringify({
            type: "payment_term"
        });
        return this.httpservice.postBody("get_all_customers", body);
    };
    // 获取价格表
    SalesSearvice.prototype.getPriceFormList = function () {
        var body = JSON.stringify({
            type: "pricelist"
        });
        return this.httpservice.postBody("get_all_customers", body);
    };
    // 获取送货地址
    SalesSearvice.prototype.getDeliveryAddressList = function (mid) {
        var body = JSON.stringify({
            type: "delivery",
            id: mid
        });
        return this.httpservice.postBodyNoLoading("choose_customer", body);
    };
    // 获取发票地址
    SalesSearvice.prototype.getPaymentAddressList = function (mid) {
        var body = JSON.stringify({
            type: "invoice",
            id: mid
        });
        return this.httpservice.postBodyNoLoading("choose_customer", body);
    };
    // 创建报价单
    SalesSearvice.prototype.createSoOrder = function (mbody) {
        var body = JSON.stringify(mbody);
        return this.httpservice.postBody("create_so_order_draft", body);
    };
    // 获取产品详细
    SalesSearvice.prototype.getProductionDetailById = function (mid) {
        var body = JSON.stringify({
            id: mid
        });
        return this.httpservice.postBody("product_details", body);
    };
    // 获取产品详细
    SalesSearvice.prototype.getProductionDetailByCode = function (mCode) {
        var body = JSON.stringify({
            code: mCode
        });
        return this.httpservice.postBody("product_details", body);
    };
    // 设置为报价单的接口
    SalesSearvice.prototype.setToQuotes = function (mId) {
        var body = JSON.stringify({
            id: mId
        });
        return this.httpservice.postBody("to_draft", body);
    };
    SalesSearvice.prototype.searchSalesOrder = function (type, search_text, pet) {
        var body = JSON.stringify({
            type: type,
            search_text: search_text,
            pet: pet,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("search_sales_order", body);
    };
    return SalesSearvice;
}());
SalesSearvice = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], SalesSearvice);

//# sourceMappingURL=salesService.js.map

/***/ })

});
//# sourceMappingURL=17.js.map