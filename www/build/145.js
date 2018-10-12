webpackJsonp([145],{

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/production-search/production-detail/warehouse-move/warehouse-move.ts
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
 * Generated class for the WarehouseMovePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var WarehouseMovePage = (function () {
    function WarehouseMovePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = this.navParams.get("item").stock_move;
    }
    WarehouseMovePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WarehouseMovePage');
    };
    return WarehouseMovePage;
}());
WarehouseMovePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-warehouse-move',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/production-search/production-detail/warehouse-move/warehouse-move.html"*/'<!--\n  Generated template for the WarehouseMovePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>库存移动</ion-title>\n  </ion-navbar>\n  <ion-grid >\n      <ion-row>\n        <ion-col col-4>\n          产品名\n        </ion-col>\n        <ion-col col-2>\n          数量\n        </ion-col>\n        <ion-col col-3>\n          来源位置\n        </ion-col>\n        <ion-col col-3>\n          目的位置\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n    <ion-list *ngFor="let item of items;let i =index">\n        <ion-grid >\n          <ion-row>\n            <ion-col col-4>\n              {{item.name}}\n            </ion-col>\n            <ion-col col-2>\n              {{item.product_uom_qty}}\n            </ion-col>\n            <ion-col col-3>\n              {{item.location}}\n            </ion-col>\n            <ion-col col-3>\n              {{item.location_dest}}\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/production-search/production-detail/warehouse-move/warehouse-move.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], WarehouseMovePage);

//# sourceMappingURL=warehouse-move.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/production-search/production-detail/warehouse-move/warehouse-move.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarehouseMovePageModule", function() { return WarehouseMovePageModule; });
/* harmony import */ var warehouse_move_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var warehouse_move_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var warehouse_move_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WarehouseMovePageModule = (function () {
    function WarehouseMovePageModule() {
    }
    return WarehouseMovePageModule;
}());
WarehouseMovePageModule = warehouse_move_module___decorate([
    warehouse_move_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            WarehouseMovePage,
        ],
        imports: [
            warehouse_move_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(WarehouseMovePage),
        ],
        exports: [
            WarehouseMovePage
        ]
    })
], WarehouseMovePageModule);

//# sourceMappingURL=warehouse-move.module.js.map

/***/ })

});
//# sourceMappingURL=145.js.map