webpackJsonp([21],{

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/order/order-auto.ts
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



var OrderAutoService = (function () {
    function OrderAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    OrderAutoService.prototype.getResults = function (keyword) {
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
        var arr = [];
        obj1.name = "搜 订单:" + keyword;
        arr.push(obj1);
        obj2.name = "搜 产品:" + keyword;
        arr.push(obj2);
        obj3.name = "搜 采购负责人:" + keyword;
        arr.push(obj3);
        obj4.name = "搜 源单据:" + keyword;
        arr.push(obj4);
        return arr;
    };
    return OrderAutoService;
}());
OrderAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], OrderAutoService);

//# sourceMappingURL=order-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/order/order.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__orderService__ = __webpack_require__(743);
/* harmony import */ var order___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var order___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var order___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { ReturnOrderDetailPage } from './../return-order-detail/return-order-detail';
// import { OrderDetailPage } from './../order-detail/order-detail';




/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderPage = (function () {
    // @ViewChild('mainSegment') mainSegment: Segment;
    function OrderPage(navCtrl, navParams, orderService, orderAuto) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.orderAuto = orderAuto;
        this.pet = "3";
        this.limit = 20;
        this.offset = 0;
        this.isMoreData1 = true;
        this.isMoreData2 = true;
        this.isMoreData3 = true;
        this.isMoreData4 = true;
        this.to_approve_arr = [];
    }
    OrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderPage');
        // this.mainSegment.setValue('1')
        // this.clickThree()
    };
    OrderPage.prototype.ionViewDidEnter = function () {
        if (this.pet == "3") {
            this.clickThree();
        }
    };
    OrderPage.prototype.clickOne = function () {
        var _this = this;
        this.orderService.requestMakeOrderByMRP(0, 20)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.orderMRP = res.result.res_data;
                console.log(_this.orderMRP);
            }
        });
    };
    OrderPage.prototype.doRefresh1 = function (refresh) {
        var _this = this;
        this.isMoreData1 = true;
        this.limit = 20;
        this.offset = 0;
        this.orderService.requestMakeOrderByMRP(0, 20).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.orderMRP = res.result.res_data;
        });
    };
    OrderPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData1 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then(function (res) {
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
                        _this.orderMRP.push(item);
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
    OrderPage.prototype.clickTwo = function () {
        var _this = this;
        this.orderService.requestPriceOrder(0, 20)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.priceOrder = res.result.res_data;
                console.log(_this.priceOrder);
            }
        });
    };
    OrderPage.prototype.doRefresh2 = function (refresh) {
        var _this = this;
        this.isMoreData2 = true;
        this.limit = 20;
        this.offset = 0;
        this.orderService.requestPriceOrder(0, 20).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.priceOrder = res.result.res_data;
        });
    };
    OrderPage.prototype.doInfinite2 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData2 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then(function (res) {
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
                        _this.priceOrder.push(item);
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
    OrderPage.prototype.clickThree = function () {
        var _this = this;
        this.orderService.requestIncomingOrder(0, 20)
            .then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.incomingOrder = res.result.res_data;
                console.log(_this.incomingOrder);
            }
        });
        this.orderService.get_to_approve_po().then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.to_approve_arr = res.result.res_data;
                if (_this.to_approve_arr) {
                    _this.to_approve_title = _this.to_approve_arr.length + " >";
                }
                else {
                    _this.to_approve_title = "0" + " >";
                }
            }
        });
    };
    OrderPage.prototype.doRefresh3 = function (refresh) {
        var _this = this;
        this.isMoreData3 = true;
        this.limit = 20;
        this.offset = 0;
        this.orderService.requestIncomingOrder(0, 20).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.incomingOrder = res.result.res_data;
        });
    };
    OrderPage.prototype.doInfinite3 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData3 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.orderService.requestMakeOrderByMRP(this.offset, this.limit).then(function (res) {
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
                        _this.incomingOrder.push(item);
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
    OrderPage.prototype.clickFour = function () {
        var _this = this;
        this.orderService.requestReturnOrder(0, 20)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.returnOrder = res.result.res_data;
                console.log(_this.returnOrder);
            }
        });
    };
    OrderPage.prototype.doRefresh4 = function (refresh) {
        var _this = this;
        this.isMoreData4 = true;
        this.limit = 20;
        this.offset = 0;
        this.orderService.requestReturnOrder(0, 20).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.returnOrder = res.result.res_data;
        });
    };
    OrderPage.prototype.doInfinite4 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData4 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.orderService.requestReturnOrder(this.offset, this.limit).then(function (res) {
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData4 = true;
                    }
                    else {
                        _this.isMoreData4 = false;
                    }
                    for (var _i = 0, item_data_4 = item_data; _i < item_data_4.length; _i++) {
                        var item = item_data_4[_i];
                        _this.returnOrder.push(item);
                    }
                }
                else {
                    _this.isMoreData4 = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    OrderPage.prototype.orderDetail = function (items) {
        var _this = this;
        this.orderService.requestOrderDetail(items.id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('OrderDetailPage', {
                    item: res.result,
                    showNumber: false,
                    state: items.state,
                });
            }
        });
    };
    // 显示开单数量和已接收
    OrderPage.prototype.orderDetailShowNumber = function (id) {
        var _this = this;
        this.orderService.requestOrderDetail(id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('OrderDetailPage', {
                    item: res.result,
                    showNumber: true
                });
            }
        });
    };
    OrderPage.prototype.returnOrderDetail = function (id) {
        var _this = this;
        this.orderService.requestReturnOrderDetail(id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('ReturnOrderDetailPage', {
                    item: res.result,
                    id: id,
                });
            }
        });
    };
    OrderPage.prototype.itemSelected = function (event) {
        var _this = this;
        var type;
        var search_text;
        if (event.id == 1) {
            type = "name";
            search_text = event.name.replace("搜 订单:", "");
        }
        else if (event.id == 2) {
            type = "product_id";
            search_text = event.name.replace("搜 产品:", "");
        }
        else if (event.id == 3) {
            type = "create_uid";
            search_text = event.name.replace("搜 采购负责人:", "");
        }
        else if (event.id == 4) {
            type = "origin";
            search_text = event.name.replace("搜 源单据:", "");
        }
        this.orderService.search(this.pet, type, search_text).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                if (_this.pet == "1") {
                    _this.isMoreData1 = false;
                    _this.orderMRP = res.result.res_data;
                }
                else if (_this.pet == "2") {
                    _this.isMoreData2 = false;
                    _this.priceOrder = res.result.res_data;
                }
                else if (_this.pet == "3") {
                    _this.isMoreData3 = false;
                    _this.incomingOrder = res.result.res_data;
                }
                else if (_this.pet == "4") {
                    _this.isMoreData4 = false;
                    _this.returnOrder = res.result.res_data;
                }
            }
        });
    };
    OrderPage.prototype.returnOrderSearchClick = function () {
        var _this = this;
        this.orderService.returnOrderSearchByPO(this.returnOrderSearchName)
            .then(function (res) {
            _this.isMoreData4 = false;
            _this.returnOrder = res.result.res_data;
        });
    };
    OrderPage.prototype.changeState = function (state) {
        console.log(state);
        if (state == "draft") {
            return "询价单";
        }
        else if (state == "make_by_mrp") {
            return "由MRP生成";
        }
        else if (state == "sent") {
            return "发送询价单";
        }
        else if (state == "to approve") {
            return "待批准";
        }
        else if (state == "done") {
            return "已锁定";
        }
        else if (state == "cancel") {
            return "已取消";
        }
        else if (state == "purchase") {
            return "采购订单";
        }
    };
    OrderPage.prototype.changeDuizhang = function (state) {
        if (state == "no") {
            return "待出货";
        }
        else if (state == "to invoice") {
            return "待对账";
        }
        else if (state == "invoiced") {
            return "已对账完成";
        }
        else {
            return state;
        }
    };
    OrderPage.prototype.toFix = function (amount) {
        return amount.toFixed(2);
    };
    OrderPage.prototype.to_approve_click = function () {
        this.navCtrl.push('ApproveOrderPage', {
            incomingOrder: this.to_approve_arr,
        });
    };
    OrderPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    return OrderPage;
}());
OrderPage = order___decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    order___WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-order',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order/order.html"*/'<ion-header>\n  <ion-navbar color="gongdan-color" no-border-bottom>\n    <ion-title>\n      订单\n    </ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet">\n      <ion-segment-button tappable (click)=\'clickOne()\' value="1">MRP\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickTwo()\' value="2">\n        询价单\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickThree()\' value="3">\n        采购订单\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickFour()\' value="4">\n        采购退货\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div [ngSwitch]="pet">\n\n    <ng-template [ngSwitchCase]=\'1\'>\n\n      <ion-auto-complete style="width: 100vw;" (itemSelected)="itemSelected($event)" [dataProvider]="orderAuto"></ion-auto-complete>\n\n      <ion-refresher (ionRefresh)="doRefresh1($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of orderMRP\' tappable (click)=\'orderDetail(item)\'>\n          <div style="overflow:hidden">\n            <p text-wrap class="rightStateFont">{{changeState(item.state)}}</p>\n            <meter value={{item.shipping_rate}} max="100" class="progress_x"></meter>\n            <!-- <progress value={{item.shipping_rate}} max="100" class="progress_x"></progress> -->\n            <h2 text-wrap>{{item.name}}</h2>\n          </div>\n\n          <div style="overflow:hidden">\n            <p style="float:right">{{changeDuizhang(item.invoice_status)}}</p>\n            <p>交货日期 : {{changeDate(item.handle_date) | date:"yyyy-MM-dd"}}</p>\n          </div>\n\n\n          <div class="totalStyleRight" style="overflow:hidden">\n            <p text-wrap text-right>汇总数量：{{item.amount_total}}</p>\n            <p text-wrap text-right>汇总金额(元):{{toFix(item.product_count)}}</p>\n          </div>\n          <p text-wrap>负责人：{{item.creater}}</p>\n          <p text-wrap style="width:180px">供应商 ：{{item.supplier}}</p>\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite1($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'2\'>\n      <ion-auto-complete style="width: 100vw;" (itemSelected)="itemSelected($event)" [dataProvider]="orderAuto"></ion-auto-complete>\n\n      <ion-refresher (ionRefresh)="doRefresh2($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of priceOrder\' tappable (click)=\'orderDetail(item)\'>\n          <div style="overflow:hidden">\n            <p text-wrap class="rightStateFont">{{changeState(item.state)}}</p>\n            <meter value={{item.shipping_rate}} max="100" class="progress_x"></meter>\n            <!-- <progress value={{item.shipping_rate}} max="100" class="progress_x"></progress> -->\n            <h2 text-wrap>{{item.name}}</h2>\n          </div>\n\n          <div style="overflow:hidden">\n            <p style="float:right">{{changeDuizhang(item.invoice_status)}}</p>\n            <p>交货日期 : {{changeDate(item.handle_date) | date:"yyyy-MM-dd"}}</p>\n          </div>\n\n\n          <div class="totalStyleRight" style="overflow:hidden">\n            <p text-wrap text-right>汇总数量：{{item.amount_total}}</p>\n            <p text-wrap text-right>汇总金额(元):{{toFix(item.product_count)}}</p>\n          </div>\n          <p text-wrap>负责人：{{item.creater}}</p>\n          <p text-wrap style="width:180px">供应商 ：{{item.supplier}}</p>\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite2($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'3\'>\n      <ion-auto-complete style="width: 100vw;" (itemSelected)="itemSelected($event)" [dataProvider]="orderAuto"></ion-auto-complete>\n      <ion-item tappable (click)="to_approve_click()" style="border-bottom: 1px lightgray solid;">\n        <p>待批准</p>\n        <p item-end>{{to_approve_title}}</p>\n      </ion-item>\n      <ion-refresher (ionRefresh)="doRefresh3($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of incomingOrder\' tappable (click)=\'orderDetailShowNumber(item.id)\'>\n          <div style="overflow:hidden">\n            <p text-wrap class="rightStateFont">{{changeState(item.state)}}</p>\n            <meter value={{item.shipping_rate}} max="100" class="progress_x"></meter>\n            <!-- <progress value={{item.shipping_rate}} max="100" class="progress_x"></progress> -->\n            <h2 text-wrap>{{item.name}}</h2>\n          </div>\n\n          <div style="overflow:hidden">\n            <p style="float:right">{{changeDuizhang(item.invoice_status)}}</p>\n            <p>交货日期 : {{changeDate(item.handle_date) | date:"yyyy-MM-dd"}}</p>\n          </div>\n\n\n          <div class="totalStyleRight" style="overflow:hidden">\n            <p text-wrap text-right>汇总数量：{{item.amount_total}}</p>\n            <p text-wrap text-right>汇总金额(元):{{toFix(item.product_count)}}</p>\n          </div>\n          <p text-wrap>负责人：{{item.creater}}</p>\n          <p text-wrap style="width:180px">供应商 ：{{item.supplier}}</p>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll (ionInfinite)="doInfinite3($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'4\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <div>\n              <ion-input [(ngModel)]="returnOrderSearchName" placeholder="输入订单编号" style="margin-left:20px;;"></ion-input>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div>\n              <button (click)=\'returnOrderSearchClick()\' class="searchFont">搜索</button>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-refresher (ionRefresh)="doRefresh4($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of returnOrder\' tappable (click)=\'returnOrderDetail(item)\'>\n          <p text-wrap class="rightStateFont">退货单</p>\n          <h2 text-wrap>{{item.name}}</h2>\n          <h4 text-wrap>{{item.order_line}}</h4>\n          <p text-wrap>退货日期：{{item.date}}</p>\n          <p text-wrap class="totalStyleRight">退货金额：{{item.amount_total}}</p>\n          <p text-wrap>供应商 ：{{item.supplier}}</p>\n          <p text-wrap>退货原因 :{{item.remark}}</p>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll immediate-check="false" (ionInfinite)="doInfinite4($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order/order.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__orderService__["a" /* orderService */], OrderAutoService],
    }),
    order___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__orderService__["a" /* orderService */], OrderAutoService])
], OrderPage);

//# sourceMappingURL=order.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/order/order.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPageModule", function() { return OrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic2_auto_complete__ = __webpack_require__(738);
/* harmony import */ var order_module___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var order_module___WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var order_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OrderPageModule = (function () {
    function OrderPageModule() {
    }
    return OrderPageModule;
}());
OrderPageModule = order_module___decorate([
    order_module___WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            OrderPage,
        ],
        imports: [
            order_module___WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(OrderPage), __WEBPACK_IMPORTED_MODULE_0_ionic2_auto_complete__["a" /* AutoCompleteModule */]
        ],
        exports: [
            OrderPage
        ]
    })
], OrderPageModule);

//# sourceMappingURL=order.module.js.map

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

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return orderService; });
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


var orderService = (function () {
    function orderService(httpservice) {
        this.httpservice = httpservice;
    }
    orderService.prototype.button_approve = function (po_id) {
        var body = JSON.stringify({
            po_id: po_id,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("button_approve", body);
    };
    orderService.prototype.get_to_approve_po = function () {
        var body = JSON.stringify({
            state: 'purchase',
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_to_approve_po", body);
    };
    // 采购订单
    orderService.prototype.requestIncomingOrder = function (moffset, mlimit) {
        var body = JSON.stringify({
            state: 'purchase',
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    // 询价单
    orderService.prototype.requestPriceOrder = function (moffset, mlimit) {
        var body = JSON.stringify({
            state: 'draft',
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    // make By MRp
    orderService.prototype.requestMakeOrderByMRP = function (moffset, mlimit) {
        var body = JSON.stringify({
            state: 'make_by_mrp',
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    // 获取订单详细
    orderService.prototype.requestOrderDetail = function (mid) {
        var body = JSON.stringify({
            id: mid,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    //采购退货
    orderService.prototype.requestReturnOrder = function (moffset, mlimit) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_prma", body);
    };
    //采购退货详情
    orderService.prototype.requestReturnOrderDetail = function (mid) {
        var body = JSON.stringify({
            id: mid,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_prma", body);
    };
    //联系人
    orderService.prototype.get_contact_phone_number = function (id, model) {
        var body = JSON.stringify({
            id: id,
            model: model
        });
        return this.httpservice.postBody("get_contact_phone_number", body);
    };
    orderService.prototype.get_delivery_notes = function (id) {
        var body = JSON.stringify({
            id: id,
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    };
    orderService.prototype.get_purchase_delivery_notes = function (id) {
        var body = JSON.stringify({
            id: id,
            receive: 1,
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    };
    orderService.prototype.get_back_delivery_notes = function (id) {
        var body = JSON.stringify({
            id: id,
            prma: "1"
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    };
    orderService.prototype.search = function (pet, type, search_text) {
        if (pet == "1") {
            return this.orderSearchByPO1(search_text, type);
        }
        else if (pet == "2") {
            return this.orderSearchByPO2(search_text, type);
        }
        else if (pet == "3") {
            return this.orderSearchByPO3(search_text, type);
        }
        else if (pet == "4") {
            // return this.returnOrderSearchByPO(search_text,type)
        }
    };
    //  Mrp 查询
    orderService.prototype.orderSearchByPO1 = function (number, type) {
        var body = JSON.stringify({
            po_number: number,
            model: "purchase.order",
            state: "make_by_mrp",
            type: type
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    // 询价单
    orderService.prototype.orderSearchByPO2 = function (number, type) {
        var body = JSON.stringify({
            po_number: number,
            model: "purchase.order",
            state: "draft",
            type: type
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    // 采购订单
    orderService.prototype.orderSearchByPO3 = function (number, type) {
        var body = JSON.stringify({
            po_number: number,
            model: "purchase.order",
            state: "purchase",
            type: type
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    orderService.prototype.returnOrderSearchByPO = function (number) {
        var body = JSON.stringify({
            po_number: number,
            model: "return.goods",
            state: "return",
            type: "name"
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    orderService.prototype.get_product_detail_by_id = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_product_detail_by_id", body);
    };
    return orderService;
}());
orderService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], orderService);

//# sourceMappingURL=orderService.js.map

/***/ })

});
//# sourceMappingURL=21.js.map