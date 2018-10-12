webpackJsonp([91],{

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveryNotesPageModule", function() { return DeliveryNotesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__delivery_notes__ = __webpack_require__(887);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DeliveryNotesPageModule = (function () {
    function DeliveryNotesPageModule() {
    }
    return DeliveryNotesPageModule;
}());
DeliveryNotesPageModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__delivery_notes__["a" /* DeliveryNotesPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__delivery_notes__["a" /* DeliveryNotesPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__delivery_notes__["a" /* DeliveryNotesPage */]
        ]
    })
], DeliveryNotesPageModule);

//# sourceMappingURL=delivery-notes.module.js.map

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeliveryNotesPage; });
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
 * Generated class for the DeliveryNotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DeliveryNotesPage = (function () {
    function DeliveryNotesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = this.navParams.get('items');
        this.type = this.navParams.get('type');
    }
    DeliveryNotesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeliveryNotesPage');
    };
    DeliveryNotesPage.prototype.incoming_detail = function (item) {
        this.navCtrl.push('DeliveryNotesDetailPage', {
            item: item,
            type: this.type
        });
    };
    return DeliveryNotesPage;
}());
DeliveryNotesPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-delivery-notes',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/delivery-notes/delivery-notes.html"*/'<!--\n  Generated template for the DeliveryNotesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>单据列表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list>\n    <ion-item *ngFor=\'let item of items\' tappable (click) = \'incoming_detail(item)\'>\n      <p> </p>\n      <h2 style="font-size:75%;font-weight:bold;font-size:75%;">{{item.name}}</h2>\n      <h4 style="font-size:70%">安排日期：{{item.min_date}}</h4>\n      <p style="font-size:70%">目的位置区域：{{item.to_location}}</p>\n      <p style="font-size:70%">合作伙伴：{{item.parnter_id}}</p>\n      <p style="font-size:70%">源单据：{{item.origin}}</p>\n      <p style="font-size:70%">欠单于：{{item.back_order_id}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/delivery-notes/delivery-notes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], DeliveryNotesPage);

//# sourceMappingURL=delivery-notes.js.map

/***/ })

});
//# sourceMappingURL=91.js.map