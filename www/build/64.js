webpackJsonp([64],{

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/bill-detail/bill-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pay_requestService__ = __webpack_require__(882);
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
 * Generated class for the BillDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BillDetailPage = (function () {
    function BillDetailPage(navCtrl, navParams, paymentRequestService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.paymentRequestService = paymentRequestService;
        this.process = "40%";
        this.show_type = "one";
        this.items = this.navParams.get('items');
    }
    BillDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BillDetailPage');
    };
    BillDetailPage.prototype.click_one = function () {
        this.show_type = "one";
    };
    BillDetailPage.prototype.click_two = function () {
        this.show_type = "two";
    };
    BillDetailPage.prototype.cal = function (item) {
        return item.qty_received / item.product_qty * 100;
    };
    BillDetailPage.prototype.fixTwo = function (item) {
        return parseFloat(item).toFixed(2);
    };
    return BillDetailPage;
}());
BillDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-bill-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/pay-request/bill-detail/bill-detail.html"*/'<!--\n  Generated template for the BillDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{items.move_name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n    <ion-item class="item_class" no-lines>\n      <div text-wrap style="float:right;font-size:80%;width:65%;color:gray;line-height:20px;text-align:right"> ¥{{fixTwo(items.amount_untaxed)}} </div>\n      <div class="left_label"> 未税金额 </div>\n    </ion-item>\n  <ion-item class="item_class" no-lines>\n    <div text-wrap style="float:right;font-size:80%;width:65%;color:gray;line-height:20px;text-align:right"> ¥{{fixTwo(items.amount_tax)}}</div>\n    <div class="left_label"> 税金 </div>\n  </ion-item>\n  <ion-item class="item_class" no-lines>\n    <div text-wrap style="float:right;font-size:80%;width:65%;color:#ff2e51;line-height:20px;text-align:right">¥{{fixTwo(items.amount_total)}}</div>\n    <div class="left_label" > 总计 </div>\n  </ion-item>\n  <ion-item class="item_class" no-lines>\n    <div text-wrap style="float:right;font-size:80%;width:65%;color:gray;line-height:20px;text-align:right">¥{{fixTwo(items.residual)}}</div>\n    <div class="left_label"> 截止金额 </div>\n  </ion-item>\n\n<ion-item align="center" no-lines style="margin-top:15px;height:40px;min-height:40px;border-width:0.5px;border-color:#f0f0f0;border-style:solid;width:101%;margin-left:-2px;margin-right:-4px;">\n  <ion-grid class="grid_class" *ngIf="show_type == \'one\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p class="test_one">账单</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p style="color:#b6d9f2">订单明细</p>\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n <ion-grid class="grid_class" *ngIf="show_type == \'two\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p style="color:#b6d9f2">账单</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p class="test_two">订单明细</p>\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-item>\n\n<ion-list no-lines *ngIf="show_type == \'one\'" style="margin-top:1px">\n    <div *ngFor="let item of items.invoice_line_ids;let i = index" [ngClass]="{true:\'list_class\',false:\'\'}[i != 0]" >\n      <ion-item no-lines style="height:25px;min-height:35px;" no-lines>\n        <div text-wrap style="float:right;font-size:80%;width:40%;color:#e0540e;text-align:right;margin-right:7px"></div>\n        <div  style="font-size:80%;width:40%;margin-top:5px;">{{item.name}} </div>\n      </ion-item> \n      <ion-item style="height:25px;min-height:25px;" no-lines>\n        <div style="font-size:80%;width:40%;color:gray;margin-top:-2px">科目：{{item.account_id}}</div>\n      </ion-item>\n      <ion-item style="height:25px;min-height:25px;" no-lines>\n        <div text-wrap style="float:right;font-size:80%;width:70%;color:gray;margin-top:-2px;text-align:left">原始单价：¥{{item.price_unit}}</div>\n        <div  style="font-size:80%;width:40%;color:gray;margin-top:-2px">数量：¥{{item.quantity}}</div>\n      </ion-item>\n      <ion-item style="height:25px;min-height:25px;">\n        <div style="float:right;color:#ff2e51;width:30%;font-size:80%;margin-right:10px;text-align:right">¥{{fixTwo(item.price_subtotal)}}</div>\n        <div text-wrap style="float:right;font-size:80%;width:37.5%;color:gray;margin-top:-2px;text-align:left">税金：{{item.invoice_line_tax_ids}}</div>\n        <div style="font-size:80%;width:40%;color:gray;margin-top:-2px">单价：¥{{fixTwo(item.price_unit)}}</div>\n        \n      </ion-item>\n      <ion-item no-lines class="divider_header_class">\n\n      </ion-item>\n    </div>\n  </ion-list> \n\n  <ion-list no-lines *ngIf="show_type == \'two\'" style="margin-top:1px">\n    <div *ngFor="let item of items.order_line;let i = index" [ngClass]="{true:\'list_class\',false:\'\'}[i != 0]" >\n      <ion-item style="height:25px;min-height:35px;" no-lines>\n        <div text-wrap style="float:right;font-size:80%;width:40%;color:#e0540e;text-align:right;margin-right:7px"></div>\n        <div  style="font-size:80%;width:40%;margin-top:5px;">{{item.name}} </div>\n      </ion-item> \n      <ion-item style="height:25px;min-height:25px;" no-lines>\n        <div style="font-size:80%;width:40%;color:gray;margin-top:-2px">订单关联：{{item.po_name}}</div>\n      </ion-item>\n      <ion-item style="height:25px;min-height:25px;" no-lines>\n        <div>\n        <div class="progress-outer" style="float:right">\n          <div class="progress-inner" [style.width]="item.qty_received / item.product_qty * 100 + \'%\'">\n          </div>\n        </div>\n        <span  style="font-size:80%;width:40%;color:gray;margin-top:-2px;float:left;line-height:36px;">已接收／订购：{{item.qty_received}}/{{item.product_qty}}</span>\n        </div>\n      </ion-item>\n      <ion-item style="height:25px;min-height:25px;">\n        <div style="float:right;color:#e0540e;width:30%;font-size:80%;margin-right:10px;text-align:right">¥{{fixTwo(item.price_subtotal)}}</div>\n        <div text-wrap style="float:right;font-size:80%;width:30%;color:gray;margin-top:-2px;text-align:left">单价：{{item.price_unit}}</div>\n        <div style="font-size:80%;width:40%;color:gray;margin-top:-2px">开单数量：{{item.qty_invoiced}}</div>\n        \n      </ion-item>\n      <ion-item no-lines class="divider_header_class">\n\n  </ion-item>\n    </div>\n  </ion-list> \n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/pay-request/bill-detail/bill-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__pay_requestService__["a" /* PaymentRequestService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__pay_requestService__["a" /* PaymentRequestService */]])
], BillDetailPage);

//# sourceMappingURL=bill-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/bill-detail/bill-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillDetailPageModule", function() { return BillDetailPageModule; });
/* harmony import */ var bill_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var bill_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var bill_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BillDetailPageModule = (function () {
    function BillDetailPageModule() {
    }
    return BillDetailPageModule;
}());
BillDetailPageModule = bill_detail_module___decorate([
    bill_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            BillDetailPage,
        ],
        imports: [
            bill_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(BillDetailPage),
        ],
    })
], BillDetailPageModule);

//# sourceMappingURL=bill-detail.module.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentRequestService; });
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


var PaymentRequestService = (function () {
    function PaymentRequestService(httpservice) {
        this.httpservice = httpservice;
    }
    PaymentRequestService.prototype.get_payment_request_list = function (type, limit, offset, user_id, is_plus, need_all) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit,
            type: type,
            is_plus: is_plus,
            need_all: need_all,
        });
        return this.httpservice.postBody("get_payment_request_list", body);
    };
    PaymentRequestService.prototype.reject_payment = function (id, user_id) {
        var body = JSON.stringify({
            payment_id: id,
            user_id: user_id,
        });
        return this.httpservice.postBody("reject_payment", body);
    };
    PaymentRequestService.prototype.confirm_payment = function (id, user_id) {
        var body = JSON.stringify({
            payment_id: id,
            user_id: user_id,
        });
        return this.httpservice.postBody("confirm_payment", body);
    };
    PaymentRequestService.prototype.manager_confirm = function (id, user_id) {
        var body = JSON.stringify({
            payment_id: id,
            user_id: user_id,
        });
        return this.httpservice.postBody("manager_confirm", body);
    };
    PaymentRequestService.prototype.get_bill_detail = function (id) {
        var body = JSON.stringify({
            payment_id: id,
        });
        return this.httpservice.postBody("get_bill_detail", body);
    };
    PaymentRequestService.prototype.search_payment = function (search_name, payment_type, user_id, search_type, search_domain, need_all) {
        var body = JSON.stringify({
            search_name: search_name,
            payment_type: payment_type,
            user_id: user_id,
            search_type: search_type,
            search_domain: search_domain,
            need_all: need_all,
        });
        return this.httpservice.postBody("search_payment", body);
    };
    return PaymentRequestService;
}());
PaymentRequestService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], PaymentRequestService);

//# sourceMappingURL=pay-requestService.js.map

/***/ })

});
//# sourceMappingURL=64.js.map