webpackJsonp([56],{

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/improve-quotation/improve-quotation.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_date_picker__ = __webpack_require__(243);
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



// import { SalesInfoPage } from './sales-info/sales-info';
// import { DeliveryInfoPage } from './delivery-info/delivery-info';


/**
 * Generated class for the ImproveQuotationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ImproveQuotationPage = (function () {
    function ImproveQuotationPage(navCtrl, navParams, salesSearvice, datePicker, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.salesSearvice = salesSearvice;
        this.datePicker = datePicker;
        this.toastCtrl = toastCtrl;
        this.deliveryCallback = function (params) {
            return new Promise(function (resolve, reject) {
                if (typeof (params) != 'undefined') {
                    resolve("ok");
                }
                else {
                    reject(Error("error"));
                }
            });
        };
        this.mCreateQuotesPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("CreateQuotesPage", navCtrl);
        this.customerID = this.navParams.get("id");
        this.salesSearvice.getPaymentTermList().then(function (res) {
            console.log(res);
            _this.paymentList = res.result.res_data;
        });
        // this.salesSearvice.getTaxList().then(res=>{
        //   console.log(res)
        //   this.taxList= res.result.res_data
        // })
        // this.salesSearvice.getDeliveryList().then(res=>{
        //   console.log(res)
        //   this.deliveryRulsList= res.result.res_data
        // })
        this.salesSearvice.getDeliveryAddressList(this.customerID).then(function (res) {
            _this.deliveryAddressList = res.result.res_data;
        });
        this.salesSearvice.getPaymentAddressList(this.customerID).then(function (res) {
            _this.invoiceAddressList = res.result.res_data;
        });
        this.seleteDate = new Date().toISOString().split("T")[0];
    }
    ImproveQuotationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImproveQuotationPage');
    };
    ImproveQuotationPage.prototype.initView = function () {
        this.improveQuotaInfo = this.navParams.get("improveQuotaInfo");
        console.log(this.improveQuotaInfo);
        if (this.improveQuotaInfo) {
            this.invoiceAddress = this.improveQuotaInfo.invoiceAddress;
            this.deliveryAddress = this.improveQuotaInfo.deliveryAddress;
            this.PINumber = this.improveQuotaInfo.PINumber;
            this.dateTime = this.improveQuotaInfo.billsDate;
            this.payment = this.improveQuotaInfo.payment_term;
            this.remarks = this.improveQuotaInfo.remarks;
            this.deliveryInfo = this.improveQuotaInfo.deliveryInfo;
            this.salesInfo = this.improveQuotaInfo.salesInfo;
        }
    };
    ImproveQuotationPage.prototype.ionViewDidEnter = function () {
        this.deliveryInfo = this.navParams.get("deliveryInfo");
        this.salesInfo = this.navParams.get("salesInfo");
        this.initView();
    };
    ImproveQuotationPage.prototype.chooseDate = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        }).then(function (date) { return _this.seleteDate = date; }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    ImproveQuotationPage.prototype.clickDeliveryInfo = function () {
        this.navCtrl.push('DeliveryInfoPage', { deliveryInfo: this.deliveryInfo });
    };
    ImproveQuotationPage.prototype.clickSalesInfo = function () {
        this.navCtrl.push('SalesInfoPage', { salesInfo: this.salesInfo });
    };
    // seleteCustomer() {
    //   this.navCtrl.push(CustomerListPage);
    // }
    ImproveQuotationPage.prototype.save = function () {
        var mString = "";
        if (!this.invoiceAddressList) {
            this.invoiceAddress = this.customerID;
        }
        if (!this.deliveryAddressList) {
            this.deliveryAddress = this.customerID;
        }
        if (!this.invoiceAddress) {
            mString = mString + "   请填写发票地址";
        }
        if (!this.deliveryAddress) {
            mString = mString + "   请填写送货地址";
        }
        if (!this.deliveryInfo) {
            mString = mString + "   请完善送货信息";
        }
        if (!this.salesInfo) {
            mString = mString + "   请完善销售信息";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            this.dateTime = new Date().getTime();
            this.mCreateQuotesPage.data.improveQuotesInfo = {
                invoiceAddress: this.invoiceAddress,
                deliveryAddress: this.deliveryAddress,
                PINumber: this.PINumber,
                billsDate: this.dateTime,
                payment_term: this.payment,
                remarks: this.remarks,
                deliveryInfo: this.deliveryInfo,
                salesInfo: this.salesInfo
            };
            this.navCtrl.pop();
        }
    };
    return ImproveQuotationPage;
}());
ImproveQuotationPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-improve-quotation',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/improve-quotation/improve-quotation.html"*/'<!--\n  Generated template for the ImproveQuotationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>完善报价单信息页</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'save()\'>\n           保存\n          </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <!-- <button ion-item (click)="seleteCustomer()"> \n        <ion-label item-start >客户\n        <span style="color:red;"> *</span>\n        </ion-label>\n        <ion-note item-end >{{customer}}</ion-note>\n      </button> -->\n\n  <ion-item>\n    <ion-label >发票地址\n      <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-select *ngIf="invoiceAddressList" [(ngModel)]="invoiceAddress">\n      <ion-option *ngFor="let item of invoiceAddressList;" value={{item.id}}>{{item.address}}</ion-option>\n    </ion-select>\n    <ion-label *ngIf="!invoiceAddressList" item-end text-right>\n      此客户未添加发票地址\n    </ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label >送货地址\n        <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-select *ngIf="deliveryAddressList" [(ngModel)]="deliveryAddress">\n      <ion-option *ngFor="let item of deliveryAddressList;" value={{item.id}}>{{item.address}}</ion-option>\n    </ion-select>\n    <ion-label *ngIf="!deliveryAddressList" item-end text-right>\n      此客户未添加送货地址\n    </ion-label>\n  </ion-item>\n\n  <!-- <ion-item>\n    <ion-label>交货规则</ion-label>\n    <span style="color:red;"> *</span>\n    <ion-select [(ngModel)]="deliveryRuls">\n      <ion-option *ngFor="let item of deliveryRulsList;" value={{item[0]}}>{{item[1]}}</ion-option>\n    </ion-select>\n  </ion-item> -->\n\n  <ion-item>\n    <ion-label >PI号码\n    </ion-label>\n    <ion-input placeholder="请输入PI号码" [(ngModel)]="PINumber" text-right></ion-input>\n  </ion-item>\n\n  <!-- <ion-item>\n    <ion-label>税率</ion-label>\n    <span style="color:red;"> *</span>\n    <ion-select [(ngModel)]="tax">\n      <ion-option *ngFor="let item of taxList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item> -->\n\n  <!-- <ion-item (click)="chooseDate()">\n    <ion-label>请选择交货日期</ion-label>\n    <span style="color:red;"> *</span>\n    <ion-label>{{seleteDate}}</ion-label>\n  </ion-item> -->\n\n\n  <ion-item>\n    <ion-label>单据日期</ion-label>\n    <ion-label text-right>{{seleteDate}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>付款条款</ion-label>\n    <span style="color:red;"> *</span>\n    <ion-select [(ngModel)]="payment">\n      <ion-option *ngFor="let item of paymentList;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n\n  <ion-item>\n    <ion-label >备注\n    </ion-label>\n    <ion-input placeholder="请输入订单备注信息" [(ngModel)]="remarks" text-right></ion-input>\n  </ion-item>\n\n  <button ion-item (click)="clickDeliveryInfo()">\n    <ion-label  >送货信息\n    <span style="color:red;"> *</span>\n  </ion-label>\n  </button>\n\n  <button ion-item (click)="clickSalesInfo()">\n    <ion-label  >销售信息\n    <span style="color:red;"> *</span>\n  </ion-label>\n  </button>\n\n  <!-- <button ion-item>\n    <ion-label item-start (click)="clickBillingInfo()">开票信息\n  </ion-label>\n  </button> -->\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/improve-quotation/improve-quotation.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__salesService__["a" /* SalesSearvice */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_date_picker__["a" /* DatePicker */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["E" /* ToastController */]])
], ImproveQuotationPage);

//# sourceMappingURL=improve-quotation.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/improve-quotation/improve-quotation.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImproveQuotationPageModule", function() { return ImproveQuotationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var improve_quotation_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ImproveQuotationPageModule = (function () {
    function ImproveQuotationPageModule() {
    }
    return ImproveQuotationPageModule;
}());
ImproveQuotationPageModule = improve_quotation_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ImproveQuotationPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ImproveQuotationPage),
        ],
        exports: [
            ImproveQuotationPage
        ]
    })
], ImproveQuotationPageModule);

//# sourceMappingURL=improve-quotation.module.js.map

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
//# sourceMappingURL=56.js.map