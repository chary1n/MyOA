webpackJsonp([58],{

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/create-quotes.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__salesService__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_date_picker__ = __webpack_require__(243);
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


// import { CustomerListPage } from './customer-list/customer-list';

// import { AddProductionPage } from './add-production/add-production';
// import { ImproveQuotationPage } from './improve-quotation/improve-quotation';


/**
 * Generated class for the CreateQuotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CreateQuotesPage = (function () {
    function CreateQuotesPage(navCtrl, navParams, datePicker, salesSearvive, toastCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePicker = datePicker;
        this.salesSearvive = salesSearvive;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.deliveryRuls = "一次性发货";
        this.isAdd = false;
        this.isChange = false;
        this.customerName = "请选择客户";
        this.items = [];
        this.salesSearvive.getDeliveryList().then(function (res) {
            _this.deliveryRulsList = res.result.res_data;
            _this.deliveryRuls = res.result.res_data[0][0];
        });
        this.salesSearvive.getTaxList().then(function (res) {
            _this.taxList = res.result.res_data;
        });
        this.salesSearvive.getPriceFormList().then(function (res) {
            _this.priceFormList = res.result.res_data;
        });
    }
    CreateQuotesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateQuotesPage');
    };
    CreateQuotesPage.prototype.ionViewDidEnter = function () {
        var item = this.navParams.get("productItem");
        this.mimproveQuotesInfo = this.navParams.get("improveQuotesInfo");
        this.isAdd = this.navParams.get("isAdd");
        this.isChange = this.navParams.get("isChange");
        if (this.isAdd) {
            this.items.push(item);
            this.navParams.data.isAdd = false;
        }
        if (this.isChange) {
            this.items.splice(this.index, 1);
            this.navParams.data.isChange = false;
        }
        this.customer = this.navParams.get("customer");
        if (this.customer) {
            this.customerName = this.customer.name;
        }
    };
    CreateQuotesPage.prototype.improveQuotation = function () {
        if (this.customer) {
            this.navCtrl.push('ImproveQuotationPage', {
                id: this.customer.id,
                improveQuotaInfo: this.mimproveQuotesInfo
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom("请先选择客户", this.toastCtrl);
        }
    };
    CreateQuotesPage.prototype.addProductions = function () {
        this.isAdd = false;
        this.navCtrl.push('AddProductionPage');
    };
    CreateQuotesPage.prototype.changeProductItem = function (i) {
        this.index = i;
        this.navCtrl.push('AddProductionPage', { item: this.items[i], index: i });
    };
    CreateQuotesPage.prototype.deleteProductItem = function (i) {
        this.items.splice(i, 1);
    };
    CreateQuotesPage.prototype.chooseDate = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        }).then(function (date) { return _this.seleteDate = date; }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    CreateQuotesPage.prototype.seleteCustomer = function () {
        this.navCtrl.push('CustomerListPage', { type: "createQuotes" });
    };
    CreateQuotesPage.prototype.save = function () {
        var _this = this;
        var mString = "";
        if (!this.customerName) {
            mString = mString + "   请选择客户";
        }
        if (!this.deliveryRuls) {
            mString = mString + "   请选择交货规则";
        }
        if (!this.tax) {
            mString = mString + "   请选择税率";
        }
        if (!this.seleteDate) {
            mString = mString + "   请选择交货日期";
        }
        if (!this.mimproveQuotesInfo) {
            mString = mString + "   请完善报价单";
        }
        if (this.items.length == 0) {
            mString = mString + "   请选择产品";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            var mbody = {
                cusomer: this.customer.id,
                delivery: this.deliveryRuls,
                tax: this.tax,
                deliveryDate: this.seleteDate,
                improveQuotation: this.mimproveQuotesInfo,
                productions: this.items
            };
            var body = {
                data: mbody
            };
            this.salesSearvive.createSoOrder(body).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.pop();
                }
            });
        }
    };
    CreateQuotesPage.prototype.goBack = function () {
        var _this = this;
        if (this.customerName || this.tax || this.seleteDate
            || this.mimproveQuotesInfo || this.items.length > 0) {
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
    return CreateQuotesPage;
}());
CreateQuotesPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-create-quotes',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/create-quotes.html"*/'<!--\n  Generated template for the CreateQuotesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>创建报价单</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item (click)="seleteCustomer()">\n    <ion-label>客户\n      <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-label item-end text-right>{{customerName}}</ion-label>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label>交货规则\n      <span style="color:red;"> *</span> </ion-label>\n    <ion-select [(ngModel)]="deliveryRuls">\n      <ion-option *ngFor="let item of deliveryRulsList;" value={{item[0]}}>{{item[1]}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n\n\n  <ion-item>\n    <ion-label>税率\n      <span style="color:red;"> *</span> </ion-label>\n    <ion-select [(ngModel)]="tax">\n      <ion-option *ngFor="let item of taxList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label>请选择交货日期\n      <span style="color:red;"> *</span> </ion-label>\n    <ion-datetime displayFormat="DDD DD.MM.YYYY" min="2017" max="2020" [(ngModel)]="seleteDate"></ion-datetime>\n  </ion-item>\n\n\n  <!-- <ion-item>\n    <ion-label>价格表</ion-label>\n    <span style="color:red;"> *</span>\n    <ion-select [(ngModel)]="priceForm">\n      <ion-option *ngFor="let item of priceFormList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item> -->\n\n\n  <ion-label style="color:blue;text-align:center" (click)="improveQuotation()">\n    完善报价单信息 <span style="color:red;"> *</span>\n  </ion-label>\n\n  <ion-list lines>\n    <ion-item-sliding *ngFor=\'let detail of items;let i  = index\' >\n      <ion-item >\n        <h2 text-wrap>产品 {{i+1}} {{detail.name}}</h2>\n        <p text-wrap> 国内简称 {{detail.inner_spec}}</p>\n        <p text-wrap>国内型号 {{detail.inner_code}}</p>\n        <p>计量单位 {{detail.uom}}</p>\n        <p>订购： {{detail.orderNumber}} * {{detail.orderPrice}}</p>\n        <p>小计 ￥{{detail.orderNumber * detail.orderPrice}}</p>\n      </ion-item>\n      <ion-item-options side="right">\n        <button ion-button color="primary" (click)="changeProductItem(i)">\n            <ion-icon name="create"></ion-icon>\n            修改\n          </button>\n        <button ion-button color="primary" (click)="deleteProductItem(i)">\n              <ion-icon name="trash"></ion-icon>\n              删除\n            </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-item-divider class="divider" color="light"></ion-item-divider>\n  <ion-label style="color:blue;text-align:center" (click)="addProductions()">\n    + 添加产品\n  </ion-label>\n\n</ion-content>\n\n<ion-footer style="background:gainsboro">\n  <ion-toolbar>\n    <button ion-button full (click)="save()"> 保存</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/create-quotes.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__salesService__["a" /* SalesSearvice */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_date_picker__["a" /* DatePicker */], __WEBPACK_IMPORTED_MODULE_1__salesService__["a" /* SalesSearvice */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */]])
], CreateQuotesPage);

//# sourceMappingURL=create-quotes.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/create-quotes.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateQuotesPageModule", function() { return CreateQuotesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var create_quotes_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreateQuotesPageModule = (function () {
    function CreateQuotesPageModule() {
    }
    return CreateQuotesPageModule;
}());
CreateQuotesPageModule = create_quotes_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CreateQuotesPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CreateQuotesPage),
        ],
        exports: [
            CreateQuotesPage
        ]
    })
], CreateQuotesPageModule);

//# sourceMappingURL=create-quotes.module.js.map

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
//# sourceMappingURL=58.js.map