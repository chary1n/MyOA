webpackJsonp([135],{

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/sales-detail/purchase-back-order/purchase-back-order.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the PurchaseBackOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PurchaseBackOrderPage = (function () {
    function PurchaseBackOrderPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = navParams.get('items');
    }
    PurchaseBackOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PurchaseBackOrderPage');
    };
    PurchaseBackOrderPage.prototype.createBackOrder = function () {
    };
    return PurchaseBackOrderPage;
}());
PurchaseBackOrderPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-purchase-back-order',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/sales-detail/purchase-back-order/purchase-back-order.html"*/'<!--\n  Generated template for the PurchaseBackOrderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{items.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group >\n    <ion-item-divider class="divider" color="light"></ion-item-divider>\n    <ion-item>\n      <ion-label class="left_label">客户</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.customer}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">开票地址</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.shipping_address}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">退货地址</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.invoice_address}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">参考订单号</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="color:#55c4f5">{{items.so}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">物流信息</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="color:#55c4f5">{{items.tracking_number}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">退货原因</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.remark}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">退货日期</ion-label>\n      <ion-label item-end class="right_label">{{items.date}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">税率</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.tax}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">未含税金额</ion-label>\n      <ion-label text-wrap item-end class="right_label">¥{{items.amount_untaxed}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">税金</ion-label>\n      <ion-label text-wrap item-end class="right_label">¥{{items.amount_tax}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">总计</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="font-size:105%;font-weight:bold;color:#fc6621">¥{{items.amount_total}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n  <ion-item-group *ngFor=\'let item_detail of items.return_line;\'>\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-grid style="border-bottom: 1px solid lightgray;">\n      <ion-row style="height:44px;">\n        <ion-col col-auto>\n        </ion-col>\n        <ion-col>\n          <ion-label text-wrap>{{item_detail.product_name}}</ion-label>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n    <ion-item style="margin-top:10px" no-lines>\n      <ion-label item-start style="font-size:75%">计量单位：{{item_detail.product_uom}}</ion-label>\n      <ion-label item-end style="font-size:75%">退货：¥{{item_detail.price_unit}}*{{item_detail.product_uom_qty}}</ion-label>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-label item-start style="font-size:75%">对账状态：{{item_detail.invoice_status[1]}}</ion-label>\n      <ion-label item-end style="font-size:75%">收到：¥{{item_detail.price_unit}}*{{item_detail.qty_delivered}}</ion-label>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-label item-start></ion-label>\n      <ion-label item-end style="font-size:75%">待对账：¥{{item_detail.price_unit}}*{{item_detail.qty_to_invoice}}</ion-label>\n    </ion-item>\n    <ion-item>\n       <ion-label item-start></ion-label>\n      <ion-label item-end style="font-size:75%">小计：{{item_detail.price_subtotal}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n\n<!-- <ion-footer>\n    <ion-toolbar  >\n         <button ion-button style=\'width:100%\' tappable (click)=\'createBackOrder()\'>创建退货对账单</button> \n      </ion-toolbar>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/sales-detail/purchase-back-order/purchase-back-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], PurchaseBackOrderPage);

//# sourceMappingURL=purchase-back-order.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/sales-detail/purchase-back-order/purchase-back-order.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseBackOrderPageModule", function() { return PurchaseBackOrderPageModule; });
/* harmony import */ var purchase_back_order_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var purchase_back_order_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var purchase_back_order_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PurchaseBackOrderPageModule = (function () {
    function PurchaseBackOrderPageModule() {
    }
    return PurchaseBackOrderPageModule;
}());
PurchaseBackOrderPageModule = purchase_back_order_module___decorate([
    purchase_back_order_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PurchaseBackOrderPage,
        ],
        imports: [
            purchase_back_order_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PurchaseBackOrderPage),
        ],
        exports: [
            PurchaseBackOrderPage
        ]
    })
], PurchaseBackOrderPageModule);

//# sourceMappingURL=purchase-back-order.module.js.map

/***/ })

});
//# sourceMappingURL=135.js.map