webpackJsonp([55],{

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/improve-quotation/sales-info/sales-info.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__salesService__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the SalesInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SalesInfoPage = (function () {
    function SalesInfoPage(navCtrl, navParams, salesSearvice, storage, toastCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.salesSearvice = salesSearvice;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.mImproveQuotationPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("ImproveQuotationPage", navCtrl);
        this.salesSearvice.getTagsList().then(function (res) {
            _this.tagsList = res.result.res_data;
        });
        this.salesSearvice.getTeamList().then(function (res) {
            _this.salesTeamList = res.result.res_data;
        });
        this.salesSearvice.getAnalyticAccountList().then(function (res) {
            _this.analyAccountList = res.result.res_data;
        });
        this.storage.get('user')
            .then(function (res) {
            _this.salesMan = res.result.res_data.name;
            _this.salesManId = res.result.res_data.user_id;
        });
    }
    SalesInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SalesInfoPage');
    };
    SalesInfoPage.prototype.ionViewDidEnter = function () {
        var self = this;
        self.initView();
    };
    SalesInfoPage.prototype.initView = function () {
        this.salesInfo = this.navParams.get("salesInfo");
        console.log(this.salesInfo);
        if (this.salesInfo) {
            this.salesManId = this.salesInfo.salesMan;
            this.tag = this.salesInfo.tags;
            this.salesTeam = this.salesInfo.team;
            this.customerInfo = this.salesInfo.customerRefer;
            this.analyAccount = this.salesInfo.analytic_account;
        }
    };
    SalesInfoPage.prototype.goBack = function () {
        var _this = this;
        if (this.salesManId || this.tag || this.salesTeam || this.customerInfo || this.analyAccount) {
            this.alertCtrl.create({
                title: '提示',
                subTitle: '已输入内容，是否确认返回？',
                buttons: [{ text: '取消' },
                    {
                        text: '确定',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    }
                ]
            }).present();
        }
        else {
            this.navCtrl.pop();
        }
    };
    SalesInfoPage.prototype.save = function () {
        var mString = "";
        if (!this.salesTeam) {
            mString = mString + "请选择销售团队";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            this.mImproveQuotationPage.data.salesInfo = {
                salesMan: this.salesManId,
                tags: this.tag,
                team: this.salesTeam,
                customerRefer: this.customerInfo,
                analytic_account: this.analyAccount
            };
            this.navCtrl.pop();
        }
    };
    return SalesInfoPage;
}());
SalesInfoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-sales-info',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/improve-quotation/sales-info/sales-info.html"*/'<!--\n  Generated template for the DeliveryInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n    </ion-buttons>\n      <ion-title>销售信息</ion-title>\n      <ion-buttons end>\n        <button ion-button (click)=\'save()\'>\n             保存\n            </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item>\n    <ion-label item-start>\n      销售员\n    </ion-label>\n    <ion-label item-end>\n      {{salesMan}}\n    </ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>标签</ion-label>\n    <ion-select [(ngModel)]="tag">\n      <ion-option *ngFor="let item of tagsList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>销售团队\n      <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-select [(ngModel)]="salesTeam">\n      <!-- <ion-option value="1" >公司仓库</ion-option> -->\n      <ion-option *ngFor="let item of salesTeamList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>\n      客户参考\n    </ion-label>\n    <ion-input text-right placeholder="请输入客户参考信息" item-end [(ngModel)]="customerInfo">\n    </ion-input>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label>分析账户</ion-label>\n    <ion-select [(ngModel)]="analyAccount">\n      <ion-option *ngFor="let item of analyAccountList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/improve-quotation/sales-info/sales-info.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */]])
], SalesInfoPage);

//# sourceMappingURL=sales-info.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/improve-quotation/sales-info/sales-info.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesInfoPageModule", function() { return SalesInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var sales_info_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SalesInfoPageModule = (function () {
    function SalesInfoPageModule() {
    }
    return SalesInfoPageModule;
}());
SalesInfoPageModule = sales_info_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            SalesInfoPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(SalesInfoPage),
        ],
        exports: [
            SalesInfoPage
        ]
    })
], SalesInfoPageModule);

//# sourceMappingURL=sales-info.module.js.map

/***/ }),

/***/ 743:
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
//# sourceMappingURL=55.js.map