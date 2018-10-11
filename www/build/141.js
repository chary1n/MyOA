webpackJsonp([141],{

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/return-order-detail/return-order-detail.ts
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


var ReturnOrderDetailPage = (function () {
    function ReturnOrderDetailPage(navCtrl, navParams, popoverCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.item = navParams.get('item').res_data;
        this.id = navParams.get('id');
        // console.log(this.item)
    }
    ReturnOrderDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReturnOrderDetailPage');
    };
    ReturnOrderDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.events.unsubscribe('click:return.goods');
        this.events.unsubscribe('delivery_back');
        this.events.subscribe('click:return.goods', function (eventData) {
            _this.navCtrl.push('PoContactPage', {
                items: eventData,
                type: "back_order"
            });
            _this.events.unsubscribe('click:return.goods');
            _this.popover.dismiss();
        });
        this.events.subscribe('delivery_back', function (eventData) {
            _this.navCtrl.push('DeliveryNotesPage', {
                items: eventData,
                type: "back_order"
            });
            _this.events.unsubscribe('delivery_back');
            _this.popover.dismiss();
        });
    };
    ReturnOrderDetailPage.prototype.returnProductDetail = function (detail) {
        this.navCtrl.push("ReturnProductDetailPage", { "data": detail });
    };
    ReturnOrderDetailPage.prototype.presentPopover = function (ev) {
        this.popover = this.popoverCtrl.create('ReturnPopoverPage', {
            id: this.id
        });
        this.popover.present({
            ev: ev
        });
    };
    return ReturnOrderDetailPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('content', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], ReturnOrderDetailPage.prototype, "content", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('popoverText', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], ReturnOrderDetailPage.prototype, "text", void 0);
ReturnOrderDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-return-order-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/return-order-detail/return-order-detail.html"*/'<!--\n  Generated template for the OrderDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="presentPopover($event)">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <div style="margin-top:10px">\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.supplier}} </div>\n      <div class="left_label,div_left" text-right> 供应商 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.partner_invoice_add}} </div>\n      <div class="left_label,div_left" text-right> 开票地址 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.partner_shipping_add}} </div>\n      <div class="left_label,div_left" text-right> 退货地址 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.refer_po}} </div>\n      <div class="left_label,div_left" text-right> 参考订单号 </div>\n    </div>\n\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.tracking_number}} </div>\n      <div class="left_label,div_left" text-right> 物流信息 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.remark}} </div>\n      <div class="left_label,div_left" text-right> 退货原因 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.date}} </div>\n      <div class="left_label,div_left" text-right> 退货日期 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.tax}} </div>\n      <div class="left_label,div_left" text-right> 税率 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_untaxed}} </div>\n      <div class="left_label,div_left" text-right> 未含税金额 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_tax}} </div>\n      <div class="left_label,div_left" text-right> 税金 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_total}} </div>\n      <div class="left_label,div_left" text-right> 总计 </div>\n    </div>\n\n  </div>\n  <ion-label class="div_label"> 产品明细</ion-label>\n\n  <ion-list>\n    <ion-item *ngFor=\'let detail of item.prma_line_products;let i  = index\' (click)="returnProductDetail(detail)">\n      <!-- <p>退货产品 {{i+1}} {{detail.name}}</p>\n      <p>计量单位 {{detail.uom}}</p>\n      <p>退货 {{detail.product_uom_qty}} * {{detail.price_unit}}</p>\n      <h2> 对账状态 {{detail.invoice_status[1]}}</h2>\n      <p style="float:right;color:#1e1e1e;font-weight:bold;font-size:70%;">收到 : {{detail.qty_delivered}} * {{detail.price_unit}}</p>\n      <p style="float:right">待对账 : {{detail.qty_to_invoice}} * {{detail.price_unit}}</p>\n      <p>小计 : {{detail.price_subtotal}}</p> -->\n\n      <h3 text-wrap>产品 {{i+1}} {{detail.name}}</h3>\n      <!-- <progress value={{detail.shipping_rate?detail.shipping_rate:1}}  max="100" ></progress> -->\n      <div>\n          <p style="float:right;margin-right:20px">待对账数量:{{detail.qty_to_invoice}}</p>\n        <p>退货/收到: {{detail.product_uom_qty}} /{{detail.qty_delivered}}</p>\n      </div>\n    </ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/return-order-detail/return-order-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["A" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Events */]])
], ReturnOrderDetailPage);

//# sourceMappingURL=return-order-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/return-order-detail/return-order-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReturnOrderDetailPageModule", function() { return ReturnOrderDetailPageModule; });
/* harmony import */ var return_order_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var return_order_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var return_order_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReturnOrderDetailPageModule = (function () {
    function ReturnOrderDetailPageModule() {
    }
    return ReturnOrderDetailPageModule;
}());
ReturnOrderDetailPageModule = return_order_detail_module___decorate([
    return_order_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ReturnOrderDetailPage,
        ],
        imports: [
            return_order_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ReturnOrderDetailPage),
        ],
        exports: [
            ReturnOrderDetailPage
        ]
    })
], ReturnOrderDetailPageModule);

//# sourceMappingURL=return-order-detail.module.js.map

/***/ })

});
//# sourceMappingURL=141.js.map