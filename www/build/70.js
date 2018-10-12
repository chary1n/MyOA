webpackJsonp([70],{

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/order-detail/order-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_orderService__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrderDetailPage = (function () {
    function OrderDetailPage(navCtrl, navParams, popoverCtrl, events, storage, orderService, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.storage = storage;
        this.orderService = orderService;
        this.toast = toast;
        this.is_manager = false;
        this.item = navParams.get('item').res_data;
        this.state = navParams.get('state');
        this.showNumber = navParams.get('showNumber');
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("GongdanPage", navCtrl);
        console.log(this.state);
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            if (_this.state == "to approve") {
                for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                    var product = _a[_i];
                    if (product.name == 'group_purchase_manager') {
                        _this.is_manager = true;
                    }
                }
            }
        });
    }
    OrderDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderDetailPage');
    };
    OrderDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.events.unsubscribe('click:purchase.order');
        this.events.unsubscribe('delivery');
        this.events.subscribe('click:purchase.order', function (eventData) {
            _this.navCtrl.push('PoContactPage', {
                items: eventData
            });
            _this.events.unsubscribe('click:purchase.order');
            _this.popover.dismiss();
        });
        this.events.subscribe('delivery', function (eventData) {
            _this.navCtrl.push('DeliveryNotesPage', {
                items: eventData,
                type: "purchase"
            });
            _this.events.unsubscribe('delivery');
            _this.popover.dismiss();
        });
    };
    OrderDetailPage.prototype.toProductDetail = function (detail) {
        this.navCtrl.push("ProductDetailPage", { "data": detail });
    };
    OrderDetailPage.prototype.presentPopover = function (ev) {
        this.popover = this.popoverCtrl.create('PopoverOrderPage', {
            id: this.item.id
        });
        this.popover.present({
            ev: ev
        });
    };
    OrderDetailPage.prototype.approve = function () {
        var _this = this;
        this.orderService.button_approve(this.item.id).then(function (res) {
            console.log(res);
            if (res.result.res_code == 1) {
                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("批准成功", _this.toast);
                // this.frontPage.data.need_fresh = true;
                _this.navCtrl.pop();
            }
        });
    };
    OrderDetailPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    return OrderDetailPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('content', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], OrderDetailPage.prototype, "content", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('popoverText', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], OrderDetailPage.prototype, "text", void 0);
OrderDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-order-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order-detail/order-detail.html"*/'<!--\n  Generated template for the OrderDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="presentPopover($event)">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <div style="margin-top:10px">\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.supplier}} </div>\n      <div class="left_label,div_left" text-right> 供应商 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{changeDate(item.data_order) | date:"yyyy-MM-dd"}}</div>\n      <div class="left_label,div_left" text-right> 单据日期 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{changeDate(item.date_planned) | date:"yyyy-MM-dd"}}</div>\n      <div class="left_label,div_left" text-right> 交期 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.tax.tax_id}} </div>\n      <div class="left_label,div_left" text-right> 税率 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.currency.currency_name}} </div>\n      <div class="left_label,div_left" text-right> 币种 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_untaxed}} </div>\n      <div class="left_label,div_left" text-right> 未含税金额 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.amount_tax}} </div>\n      <div class="left_label,div_left" text-right> 税金 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> <span style="color:#e0540e">{{item.amount_total}}</span> </div>\n      <div class="left_label,div_left" text-right> 总计 </div>\n    </div>\n\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.product_count}} </div>\n      <div class="left_label,div_left" text-right> 总数量 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.notes}} </div>\n      <div class="left_label,div_left" text-right> 备注信息 </div>\n    </div>\n  </div>\n    <ion-label class="div_label"> 产品明细</ion-label>\n  <ion-list>\n    <ion-item *ngFor=\'let detail of item.order_lines;let i  = index\' (click)="toProductDetail(detail)">\n      <!-- <p text-wrap>产品 {{i+1}} {{detail.name}}</p>\n      <h2 text-wrap> 规格 {{detail.specs}}</h2>\n      <h4 text-wrap>交期 {{item.date_planned}}</h4>\n      <p>订购： {{detail.product_qty}} * ￥ {{detail.price_unit}}</p>\n      <p>计量单位 {{detail.product_uom}}</p>\n      <p *ngIf="showNumber" style="float:right;color:#1e1e1e;font-weight:bold;font-size:70%;">已接收 {{detail.qty_received}} * ￥ {{detail.price_unit}}</p>\n      <p *ngIf="showNumber" style="float:right">开单数量 : {{detail.qty_invoiced}} * ￥ {{detail.price_unit}}</p>\n      <p>小计 {{detail.price_subtotal}}</p> -->\n      <h3 text-wrap>产品 {{i+1}} {{detail.name}}</h3>\n      <div>\n      <progress value={{detail.shipping_rate?detail.shipping_rate:1}}  max="100" ></progress>\n      <p style="float:right;margin-right:20px">单价:{{detail.price_unit}}</p>\n      </div>\n      <div>\n          <p style="float:right;margin-right:20px">开单数量:{{detail.qty_invoiced}}</p>\n        <p>已接收/订购： {{detail.qty_received}} /{{detail.product_qty}}</p>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer style="background:#f0f2f5" *ngIf="is_manager" >\n  <button ion-button tappable style=\'width:70%;margin-left:15%\'   round (click)="approve()">\n    批准订单\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order-detail/order-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__order_orderService__["a" /* orderService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["A" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__order_orderService__["a" /* orderService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], OrderDetailPage);

//# sourceMappingURL=order-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/order-detail/order-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailPageModule", function() { return OrderDetailPageModule; });
/* harmony import */ var order_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var order_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var order_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OrderDetailPageModule = (function () {
    function OrderDetailPageModule() {
    }
    return OrderDetailPageModule;
}());
OrderDetailPageModule = order_detail_module___decorate([
    order_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            OrderDetailPage
        ],
        imports: [
            order_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(OrderDetailPage),
        ],
        exports: [
            OrderDetailPage
        ]
    })
], OrderDetailPageModule);

//# sourceMappingURL=order-detail.module.js.map

/***/ }),

/***/ 744:
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
//# sourceMappingURL=70.js.map