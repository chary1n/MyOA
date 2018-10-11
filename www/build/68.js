webpackJsonp([68],{

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/order/approve-order/approve-order.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__orderService__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the ApproveOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ApproveOrderPage = (function () {
    function ApproveOrderPage(navCtrl, navParams, orderService, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.toast = toast;
    }
    ApproveOrderPage.prototype.ionViewDidLoad = function () {
    };
    ApproveOrderPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.orderService.get_to_approve_po().then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.incomingOrder = res.result.res_data;
            }
        });
    };
    ApproveOrderPage.prototype.changeState = function (state) {
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
    ApproveOrderPage.prototype.changeDuizhang = function (state) {
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
    ApproveOrderPage.prototype.orderDetailShowNumber = function (items) {
        var _this = this;
        this.orderService.requestOrderDetail(items.id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('OrderDetailPage', {
                    item: res.result,
                    showNumber: true,
                    state: items.state,
                });
            }
        });
    };
    ApproveOrderPage.prototype.toFix = function (amount) {
        return amount.toFixed(2);
    };
    ApproveOrderPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    return ApproveOrderPage;
}());
ApproveOrderPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-approve-order',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order/approve-order/approve-order.html"*/'<!--\n  Generated template for the ApproveOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>待批准的订单</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n   <ion-list>\n        <ion-item *ngFor=\'let item of incomingOrder\' tappable (click)=\'orderDetailShowNumber(item)\'>\n          <div style="overflow:hidden">\n            <p text-wrap class="rightStateFont">{{changeState(item.state)}}</p>\n            <meter value={{item.shipping_rate}} max="100" class="progress_x"></meter>\n            <!-- <progress value={{item.shipping_rate}} max="100" class="progress_x"></progress> -->\n            <h2 text-wrap>{{item.name}}</h2>\n          </div>\n\n          <div style="overflow:hidden">\n            <p style="float:right">{{changeDuizhang(item.invoice_status)}}</p>\n            <p>交货日期 : {{changeDate(item.handle_date) | date:"yyyy-MM-dd"}}</p>\n          </div>\n\n\n          <div class="totalStyleRight" style="overflow:hidden">\n            <p text-wrap text-right>汇总数量：{{item.amount_total}}</p>\n            <p text-wrap text-right>汇总金额(元):{{toFix(item.product_count)}}</p>\n          </div>\n          <p text-wrap>负责人：{{item.creater}}</p>\n          <p text-wrap style="width:180px">供应商 ：{{item.supplier}}</p>\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order/approve-order/approve-order.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__orderService__["a" /* orderService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__orderService__["a" /* orderService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["E" /* ToastController */]])
], ApproveOrderPage);

//# sourceMappingURL=approve-order.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/order/approve-order/approve-order.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApproveOrderPageModule", function() { return ApproveOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var approve_order_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ApproveOrderPageModule = (function () {
    function ApproveOrderPageModule() {
    }
    return ApproveOrderPageModule;
}());
ApproveOrderPageModule = approve_order_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ApproveOrderPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ApproveOrderPage),
        ],
    })
], ApproveOrderPageModule);

//# sourceMappingURL=approve-order.module.js.map

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
//# sourceMappingURL=68.js.map