webpackJsonp([158],{

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/incoming-detail/incoming-detail.ts
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
 * Generated class for the IncomingDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var IncomingDetailPage = (function () {
    function IncomingDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = navParams.get('item');
        this.type = navParams.get('type');
        this.isPop = navParams.get('isPop');
        this.count = 1;
        console.log('ionViewDidEnter IncomingDetailPage');
    }
    IncomingDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IncomingDetailPage');
    };
    IncomingDetailPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter IncomingDetailPage');
        this.item = this.navParams.get('item');
        this.isPop = this.navParams.get('isPop');
        this.count = 1;
    };
    IncomingDetailPage.prototype.toInspectionPage = function () {
        this.navCtrl.push("InspectionDetailPage", { item: this.item });
    };
    IncomingDetailPage.prototype.moreDetail = function () {
    };
    return IncomingDetailPage;
}());
IncomingDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-incoming-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/incoming-detail/incoming-detail.html"*/'<!--\n  Generated template for the IncomingDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.parnter_id}} </div>\n      <div class="left_label,div_left"> 合作伙伴 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.location_id}} </div>\n      <div class="left_label,div_left"> 源位置区域 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.tracking_number}} </div>\n      <div class="left_label,div_left"> 快递单号 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.emergency}} </div>\n      <div class="left_label,div_left"> 加急 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.min_date}} </div>\n      <div class="left_label,div_left"> 安排的日期 </div>\n    </div>\n\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.origin}} </div>\n      <div class="left_label,div_left"> 源单据 </div>\n    </div>\n\n    <!-- <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">状态</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.state}}</ion-label>\n    </ion-item> -->\n  </ion-item-group>\n\n  <ion-label   style="background:#f2f2f2;padding-left:16px;padding-top:8px;padding-bottom:8px"> 产品明细</ion-label>\n\n  <ion-item-group *ngFor=\'let item_detail of item.pack_operation_product_ids;let i = index\'>\n     <div *ngIf="item_detail.pack_id != -1" padding>\n      <div style="font-size:80%"> {{i+1}}.{{item_detail.product_id.name}}</div>\n        <span class="span_x" col-3>待入库：{{item_detail.product_qty}}</span>\n        <span class="span_x" col-3>完成：{{item_detail.qty_done}}</span>\n        <span class="span_x" col-3>不良品：<span style="color:red"> {{item_detail.rejects_qty}} </span></span>\n    </div>\n</ion-item-group>  \n</ion-content>\n\n<ion-footer *ngIf=\'!isPop\' style="background:white">\n    <button ion-button full tappable round (click)=\'toInspectionPage()\'>查看品检结果</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/incoming-detail/incoming-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], IncomingDetailPage);

//# sourceMappingURL=incoming-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/incoming-detail/incoming-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IncomingDetailPageModule", function() { return IncomingDetailPageModule; });
/* harmony import */ var incoming_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var incoming_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var incoming_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IncomingDetailPageModule = (function () {
    function IncomingDetailPageModule() {
    }
    return IncomingDetailPageModule;
}());
IncomingDetailPageModule = incoming_detail_module___decorate([
    incoming_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            IncomingDetailPage,
        ],
        imports: [
            incoming_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(IncomingDetailPage),
        ],
        exports: [
            IncomingDetailPage
        ]
    })
], IncomingDetailPageModule);

//# sourceMappingURL=incoming-detail.module.js.map

/***/ })

});
//# sourceMappingURL=158.js.map