webpackJsonp([146],{

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/production-search/production-detail/production-detail.ts
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
 * Generated class for the ProductionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductionDetailPage = (function () {
    function ProductionDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = navParams.get("item");
        console.log(this.item);
        this.imgRes = this.item.image;
    }
    ProductionDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductionDetailPage');
    };
    ProductionDetailPage.prototype.warehouseMobile = function () {
        this.navCtrl.push('WarehouseMovePage', { item: this.item });
    };
    ProductionDetailPage.prototype.clickBOM = function () {
        this.navCtrl.push('BomPage', { item: this.item });
    };
    return ProductionDetailPage;
}());
ProductionDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-production-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/production-search/production-detail/production-detail.html"*/'<!--\n  Generated template for the ProductionDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="divCenter">\n    <img src={{imgRes}} class="image1" />\n  </div>\n\n  <ion-grid class="grid_header">\n    <ion-row class="row_class" align-items-center>\n      <ion-col>\n        <div style="border-color:black;border:1px" class="first_div">\n          <h3>库存</h3><br>\n          <h2>{{item.qty_available}}</h2>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div class="first_div">\n          <h3>预测</h3><br>\n          <h2>{{item.virtual_qty}}</h2>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <button ion-item (click)="clickBOM()">\n      <ion-label>BOM \n    </ion-label>\n    <ion-label text-right item-end class="itemLabelRight">></ion-label>\n    </button>\n\n  <ion-item>\n    <ion-label>内部参考\n    </ion-label>\n    <ion-label text-right item-end class="itemLabelRight">{{item.code}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>产品名\n    </ion-label>\n    <ion-label text-right text-wrap item-end class="itemLabelRight">{{item.name}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>位置\n    </ion-label>\n    <ion-label text-right item-end class="itemLabelRight">{{item.area}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>国内简称\n    </ion-label>\n    <ion-label text-right item-end class="itemLabelRight">{{item.inner_spec}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>国内类型\n    </ion-label>\n    <ion-label text-right item-end class="itemLabelRight">{{item.inner_code}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>产品规格\n    </ion-label>\n    <ion-label text-right item-end text-wrap class="itemLabelRight">{{item.product_specs}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>内部类别\n    </ion-label>\n    <ion-label text-right item-end text-wrap class="itemLabelRight">{{item.categ_id}}</ion-label>\n  </ion-item>\n\n  <button ion-item (click)="warehouseMobile()">\n        <ion-label  >库存移动\n      </ion-label>\n          <ion-label text-right item-end class="itemLabelRight">></ion-label>\n\n      </button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/production-search/production-detail/production-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], ProductionDetailPage);

//# sourceMappingURL=production-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/production-search/production-detail/production-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductionDetailPageModule", function() { return ProductionDetailPageModule; });
/* harmony import */ var production_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var production_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var production_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProductionDetailPageModule = (function () {
    function ProductionDetailPageModule() {
    }
    return ProductionDetailPageModule;
}());
ProductionDetailPageModule = production_detail_module___decorate([
    production_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ProductionDetailPage,
        ],
        imports: [
            production_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ProductionDetailPage),
        ],
        exports: [
            ProductionDetailPage
        ]
    })
], ProductionDetailPageModule);

//# sourceMappingURL=production-detail.module.js.map

/***/ })

});
//# sourceMappingURL=146.js.map