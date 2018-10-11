webpackJsonp([53],{

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-list.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__salesService__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
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
 * Generated class for the JiaohuoListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var JiaohuoListPage = (function () {
    function JiaohuoListPage(navCtrl, navParams, salesSearvice) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.salesSearvice = salesSearvice;
        var id = this.navParams.get("id");
        this.salesSearvice.getSalesOrderDetail(id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.items = res.result.res_data.picking_ids;
                console.log(_this.items);
            }
        });
    }
    JiaohuoListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JiaohuoListPage');
    };
    JiaohuoListPage.prototype.changeState = function (state) {
        if (state == "draft") {
            return '草稿';
        }
        else if (state == "partially_available") {
            return '部分可用';
        }
        else if (state == "confirmed") {
            return '等待可用';
        }
        else if (state == "assigned") {
            return '可用';
        }
        else if (state == "done") {
            return '完成';
        }
        else if (state == "cancel") {
            return '取消';
        }
        else if (state == "waiting") {
            return '等待其它作业';
        }
        else {
            return state;
        }
    };
    JiaohuoListPage.prototype.jiaohuoDetail = function (item) {
        this.navCtrl.push("JiaohuoDetailPage", {
            item: item
        });
    };
    JiaohuoListPage.prototype.viewWuliu = function (item) {
        this.navCtrl.push("WuliuDetailPage", {
            'item': item
        });
    };
    return JiaohuoListPage;
}());
JiaohuoListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-jiaohuo-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-list.html"*/'<!--\n  Generated template for the JiaohuoListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>交货</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n    <ion-list>\n        <ion-item *ngFor=\'let item of items\' tappable (click)=\'jiaohuoDetail(item)\'>\n          <p text-wrap style="float:right;color:#e0540e">{{changeState(item.state)}}</p>\n          <h2 text-wrap>{{item.name}}</h2>\n          <p text-wrap>安排的日期 {{item.min_date}}</p>\n          <p text-wrap>目的位置区域: {{item.location_dest_id}}</p>\n          <p text-wrap>合作伙伴 : {{item.partner_id}}</p>\n          <p text-wrap>源单据:{{item.origin}}</p>\n          <p text-wrap>欠单于:{{item.backorder}}</p>\n          <div style="overflow:hidden">\n            <button ion-button outline round style="float:right">交货详情</button>\n            <button ion-button outline round style="float:right" (click)=\'viewWuliu(item);$event.stopPropagation();\'>查看物流</button>\n          </div>\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__salesService__["a" /* SalesSearvice */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__salesService__["a" /* SalesSearvice */]])
], JiaohuoListPage);

//# sourceMappingURL=jiaohuo-list.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JiaohuoListPageModule", function() { return JiaohuoListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var jiaohuo_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var jiaohuo_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var JiaohuoListPageModule = (function () {
    function JiaohuoListPageModule() {
    }
    return JiaohuoListPageModule;
}());
JiaohuoListPageModule = jiaohuo_list_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            JiaohuoListPage,
        ],
        imports: [
            jiaohuo_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(JiaohuoListPage),
        ],
    })
], JiaohuoListPageModule);

//# sourceMappingURL=jiaohuo-list.module.js.map

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
//# sourceMappingURL=53.js.map