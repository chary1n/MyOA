webpackJsonp([69],{

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/order-detail/product-detail/product-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__order_orderService__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__ = __webpack_require__(242);
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
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductDetailPage = (function () {
    function ProductDetailPage(navCtrl, navParams, orderservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderservice = orderservice;
        this.item = this.navParams.get("data");
        console.log(this.item);
    }
    ProductDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductDetailPage');
    };
    ProductDetailPage.prototype.pushToDetail = function () {
        var _this = this;
        this.orderservice.get_product_detail_by_id(this.item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push("NewProductDetailPage", { "item": res.result.res_data });
            }
        });
    };
    return ProductDetailPage;
}());
ProductDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-product-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order-detail/product-detail/product-detail.html"*/'<!--\n  Generated template for the ProductDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <div >\n    <ion-item class="div_all"  (click)="pushToDetail()">\n      <div text-wrap class="div_right" style="color:#04aaf4"> {{item.name}} </div>\n      <div class="left_label,div_left" style="color:#04aaf4;margin-top:0px" text-right> 产品 </div>\n    </ion-item>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.specs}} </div>\n      <div class="left_label,div_left" text-right> 规格 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.product_qty}} </div>\n      <div class="left_label,div_left" text-right> 订购数量 </div>\n    </div>\n\n    <div class="div_all">\n        <div text-wrap class="div_right"> {{item.qty_available}} </div>\n        <div class="left_label,div_left" text-right> 库存 </div>\n      </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.qty_received}} </div>\n      <div class="left_label,div_left" text-right> 已接收数量 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.qty_invoiced}} </div>\n      <div class="left_label,div_left" text-right> 开单数量 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.product_uom}} </div>\n      <div class="left_label,div_left" text-right> 计量单位 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.price_unit}} </div>\n      <div class="left_label,div_left" text-right> 单价 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.price_subtotal}} </div>\n      <div class="left_label,div_left" text-right>小计 </div>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/order-detail/product-detail/product-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__order_orderService__["a" /* orderService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0__order_orderService__["a" /* orderService */]])
], ProductDetailPage);

//# sourceMappingURL=product-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/order-detail/product-detail/product-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailPageModule", function() { return ProductDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var product_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var product_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProductDetailPageModule = (function () {
    function ProductDetailPageModule() {
    }
    return ProductDetailPageModule;
}());
ProductDetailPageModule = product_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ProductDetailPage,
        ],
        imports: [
            product_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ProductDetailPage),
        ],
    })
], ProductDetailPageModule);

//# sourceMappingURL=product-detail.module.js.map

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
//# sourceMappingURL=69.js.map