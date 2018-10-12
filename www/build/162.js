webpackJsonp([162],{

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/delivery-notes-detail/delivery-notes-detail.ts
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
 * Generated class for the DeliveryNotesDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DeliveryNotesDetailPage = (function () {
    function DeliveryNotesDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = navParams.get('item');
        this.type = navParams.get('type');
        if (this.type == 'purchase') {
            this.loc_text = '源位置区域';
        }
        else {
            this.loc_text = '目的位置区域';
        }
    }
    DeliveryNotesDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeliveryNotesDetailPage');
    };
    return DeliveryNotesDetailPage;
}());
DeliveryNotesDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-delivery-notes-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/delivery-notes-detail/delivery-notes-detail.html"*/'<!--\n  Generated template for the DeliveryNotesDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group >\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">合作伙伴</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.parnter_id}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label  style="font-size:85%;font-weight:bold">{{loc_text}}</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.location_id}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">快递单号</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.tracking_number}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">加急</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.emergency}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">安排的日期</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.min_date}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">源单据</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.origin}}</ion-label>\n    </ion-item>\n      <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">状态</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{item.state}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n  \n  <ion-item-group *ngFor=\'let item_detail of item.products;\'>\n      <ion-item-divider color="light" *ngIf="item_detail.pack_id != -1"></ion-item-divider>\n\n\n<ion-grid style="border-bottom: 1px solid lightgray;" *ngIf="item_detail.pack_id != -1">\n  \n    <ion-row style="height:44px;">\n      \n      <ion-col col-auto>\n         <!-- <ion-label style="color:darkgray">产品{{i}}</ion-label>  -->\n      </ion-col>\n      <ion-col>\n        <ion-label text-wrap>{{item_detail.product_name}}</ion-label>\n      </ion-col>\n    </ion-row>\n    \n</ion-grid>\n\n     \n      <ion-item style="margin-top:10px" no-lines *ngIf="item_detail.pack_id != -1">\n        <ion-label item-start style="font-size:75%">计量单位：{{item_detail.uom}}</ion-label>\n        <ion-label item-end style="font-size:75%">待办：{{item_detail.ordered_qty}}</ion-label>\n      </ion-item>\n      <ion-item no-lines *ngIf="item_detail.pack_id != -1" > \n        <ion-label item-start style="font-size:75%">从->至：{{item_detail.from_loc}}->{{item_detail.to_loc}}</ion-label>\n        <ion-label item-end style="font-size:75%">完成：{{item_detail.qty_done}}</ion-label>\n      </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/delivery-notes-detail/delivery-notes-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], DeliveryNotesDetailPage);

//# sourceMappingURL=delivery-notes-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/delivery-notes-detail/delivery-notes-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryNotesDetailPageModule", function() { return DeliveryNotesDetailPageModule; });
/* harmony import */ var delivery_notes_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var delivery_notes_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var delivery_notes_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DeliveryNotesDetailPageModule = (function () {
    function DeliveryNotesDetailPageModule() {
    }
    return DeliveryNotesDetailPageModule;
}());
DeliveryNotesDetailPageModule = delivery_notes_detail_module___decorate([
    delivery_notes_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            DeliveryNotesDetailPage,
        ],
        imports: [
            delivery_notes_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(DeliveryNotesDetailPage),
        ],
        exports: [
            DeliveryNotesDetailPage
        ]
    })
], DeliveryNotesDetailPageModule);

//# sourceMappingURL=delivery-notes-detail.module.js.map

/***/ })

});
//# sourceMappingURL=162.js.map