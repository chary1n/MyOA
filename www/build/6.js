webpackJsonp([6],{

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/sales-detail/sales-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_invoice_create_invoice__ = __webpack_require__(885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__salesService__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__order_orderService__ = __webpack_require__(743);
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
 * Generated class for the SalesDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalesDetailPage = (function () {
    function SalesDetailPage(navCtrl, navParams, popoverCtrl, salesSearvice, alertCtrl, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.salesSearvice = salesSearvice;
        this.alertCtrl = alertCtrl;
        this.toast = toast;
        this.item = "";
        this.id = this.navParams.get('id');
        this.type = this.navParams.get("type");
        this.popover = this.popoverCtrl.create('PopoverPage', {
            item: this,
            id: this.id,
        });
        this.salesSearvice.getSalesOrderDetail(this.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                var detail = res.result.res_data;
                _this.item = detail;
                _this.jiaohuoLength = _this.item.picking_ids.length;
                if (!_this.jiaohuoLength) {
                    _this.jiaohuoLength = 0;
                }
                _this.state = detail.state;
                console.log(_this.item);
            }
        });
    }
    SalesDetailPage.prototype.ionViewWillLeave = function () {
        this.popover.dismiss();
    };
    SalesDetailPage.prototype.presentPopover = function (myEvent) {
        this.popover = this.popoverCtrl.create('PopoverPage', {
            item: this
        });
        this.popover.present({ ev: myEvent });
    };
    SalesDetailPage.prototype.cancelOrder = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '确定取消订单?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.doCancelOrder();
                    }
                }
            ]
        });
        alert.present();
    };
    // 取消订单
    SalesDetailPage.prototype.doCancelOrder = function () {
        var _this = this;
        this.salesSearvice.cancelOrder(this.id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.pop();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom(res.error.data.arguments[0], _this.toast);
            }
        });
    };
    SalesDetailPage.prototype.cancelOrdercreateInvoice = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__create_invoice_create_invoice__["a" /* CreateInvoicePage */], { id: this.id });
    };
    SalesDetailPage.prototype.setToQuotes = function () {
        var _this = this;
        this.salesSearvice.setToQuotes(this.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.pop();
            }
        });
    };
    SalesDetailPage.prototype.conformSales = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '确定转为销售订单?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.salesSearvice.confirmOrder(_this.id)
                            .then(function (res) {
                            console.log(res);
                            if (res.result && res.result.res_code == 1) {
                                var toast = _this.toast.create({
                                    message: '成功转为销售单',
                                    duration: 1500,
                                    position: 'middle'
                                });
                                toast.onDidDismiss(function () {
                                    _this.type = "salesOrder";
                                    console.log(_this.type + "this.type是");
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toast.create({
                                    message: '未设置税金',
                                    duration: 1500,
                                    position: 'middle'
                                });
                                toast.present();
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    SalesDetailPage.prototype.toProductDetail = function (detail) {
        this.navCtrl.push('BaojiaDetailPage', { 'detail': detail });
    };
    SalesDetailPage.prototype.toJiaohuoDetail = function () {
        if (this.jiaohuoLength) {
            this.navCtrl.push('JiaohuoListPage', { id: this.id });
        }
    };
    return SalesDetailPage;
}());
SalesDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-sales-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/sales-detail/sales-detail.html"*/'<!--\n  Generated template for the SalesDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="presentPopover($event)">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div style="margin-top:20px" (click)="toJiaohuoDetail()" *ngIf="type==\'salesOrder\'" >\n        <div style="text-align:center;font-size:200%;color:#04aaf4">{{jiaohuoLength}} </div>\n        <div style="text-align:center;margin-top:10px"> 交货</div>\n      </div>\n\n  <div style="margin-top:10px">\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.customer}} </div>\n      <div class="left_label,div_left" text-right> 客户 </div>\n    </div>\n    <div class="div_all">\n        <div text-wrap class="div_right"> {{item.create_date}} </div>\n        <div class="left_label,div_left" text-right> 单据日期 </div>\n      </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.validity_date}} </div>\n      <div class="left_label,div_left" text-right> 交货日期 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.pi_number}} </div>\n      <div class="left_label,div_left" text-right> PI号码 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right" *ngIf="item.delivery_rule"> {{item.delivery_rule[1]}} </div>\n      <div class="left_label,div_left" text-right> 交货规则 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_untaxed}} </div>\n      <div class="left_label,div_left" text-right> 未含税金额 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_tax}} </div>\n      <div class="left_label,div_left" text-right> 税金 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> <span style="color:#e0540e">{{item.amount_total}} </span></div>\n      <div class="left_label,div_left" text-right> 总计 </div>\n    </div>\n\n\n      <div class="div_all">\n          <div text-wrap class="div_right"> {{item.remark}} </div>\n          <div class="left_label,div_left" text-right> 备注信息 </div>\n        </div>\n\n  </div>\n\n  <ion-label class="div_label"> 产品明细</ion-label>\n  <ion-list>\n    <ion-item *ngFor=\'let detail of item.order_line;let i  = index\' (click)="toProductDetail(detail)">\n      <h3 text-wrap>产品 {{i+1}} {{detail.name}}</h3>\n      <div style="display:flex ;justify-content:space-around">\n        <p style="flex :1 1 100%">库存:{{detail.qty_invoiced}}</p>\n        <p style="flex :1 1 100%">订购:{{detail.qty}}</p>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<!-- <ion-footer>\n  <ion-toolbar>\n    <button ion-button *ngIf="type!=\'salesOrder\'" ion-start style=\'width:48%\' tappable (click)=\'cancelOrder()\'> 取消订单 </button>\n    <button ion-button *ngIf="type!=\'salesOrder\'" ion-end style=\'width:48%\' tappable (click)=\'conformSales()\'> 确认销售</button>\n    <button ion-button *ngIf="type==\'salesOrder\'&&state!=\'cancel\'" full tappable (click)=\'cancelOrder()\'> 取消订单</button>\n    <button ion-button *ngIf="type==\'salesOrder\'&&state==\'cancel\'" full tappable (click)=\'setToQuotes()\'> 设为报价单</button>\n  </ion-toolbar>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/sales-detail/sales-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */], __WEBPACK_IMPORTED_MODULE_5__order_orderService__["a" /* orderService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["A" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["E" /* ToastController */]])
], SalesDetailPage);

//# sourceMappingURL=sales-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/sales-detail/sales-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesDetailPageModule", function() { return SalesDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var sales_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SalesDetailPageModule = (function () {
    function SalesDetailPageModule() {
    }
    return SalesDetailPageModule;
}());
SalesDetailPageModule = sales_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            SalesDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(SalesDetailPage),
        ],
        exports: [
            SalesDetailPage
        ]
    })
], SalesDetailPageModule);

//# sourceMappingURL=sales-detail.module.js.map

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

/***/ }),

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateInvoicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__salesService__ = __webpack_require__(742);
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
 * Generated class for the CreateInvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CreateInvoicePage = (function () {
    function CreateInvoicePage(navCtrl, navParams, salesSearvice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.salesSearvice = salesSearvice;
    }
    CreateInvoicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateInvoicePage');
    };
    CreateInvoicePage.prototype.create = function () {
    };
    return CreateInvoicePage;
}());
CreateInvoicePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-create-invoice',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/sales-detail/create-invoice/create-invoice.html"*/'<!--\n  Generated template for the CreateInvoicePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>创建发票</ion-title>\n\n  <ion-buttons end>\n      <button ion-button (click)=\'create()\'>\n       创建\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n    <ion-item>\n        <ion-label>你要开什么发票\n          <span style="color:red;"> *</span> </ion-label>\n        <ion-select [(ngModel)]="invoice">\n          <ion-option *ngFor="let item of invoiceList;" value={{item.id}}>{{item.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n\n\n  <ion-item>\n      <ion-label>首付总额\n        <span style="color:red;"> *</span> </ion-label>\n      <ion-select [(ngModel)]="total">\n        <ion-option *ngFor="let item of totalList;" value={{item.id}}>{{item.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/sales-detail/create-invoice/create-invoice.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__salesService__["a" /* SalesSearvice */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__salesService__["a" /* SalesSearvice */]])
], CreateInvoicePage);

//# sourceMappingURL=create-invoice.js.map

/***/ })

});
//# sourceMappingURL=6.js.map