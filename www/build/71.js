webpackJsonp([71],{

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/new-production/new-product-detail/new-product-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_productionService__ = __webpack_require__(753);
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
 * Generated class for the NewProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var NewProductDetailPage = (function () {
    function NewProductDetailPage(navCtrl, navParams, newProductionService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.newProductionService = newProductionService;
        this.item = navParams.get('item');
    }
    NewProductDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewProductDetailPage');
    };
    NewProductDetailPage.prototype.clickBom = function () {
        var _this = this;
        this.newProductionService.product_bom_stock_move(this.item.id, "bom").then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.navCtrl.push('BomPage', {
                    item: res.result.res_data,
                });
            }
        });
    };
    NewProductDetailPage.prototype.clickStockMove = function () {
        var _this = this;
        this.newProductionService.get_stock_moves_by_product_id(this.item.id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('NewStockMovePage', {
                    item: res.result.res_data,
                });
            }
        });
    };
    return NewProductDetailPage;
}());
NewProductDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-new-product-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/new-product-detail/new-product-detail.html"*/'<!--\n  Generated template for the NewProductDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div style="background-color:white;height:70px;margin-top:20px" align="center">\n         <img  style="width:66px;margin-top:10px;border-radius:33px;" src={{item.product_img}}><br>\n  </div>\n  <ion-grid>\n  <ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "createInfo()">\n         <div align="center">\n          <p style="color:#5bc5f3;font-size:25px">{{item.qty_available}}</p>\n          <p style="color:gray;margin-top:-20px">库存</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "callPhone()">\n        <div align="center">\n         <p style="color:#5bc5f3;font-size:25px">{{item.virtual_qty}}</p>\n          <p style="color:gray;margin-top:-20px">预测</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "sendEmail()">\n        <div align="center" >\n         <p style="color:#5bc5f3;font-size:25px">{{item.outgoing_qty}}</p>\n          <p style="color:gray;margin-top:-20px">在产</p> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n<ion-item-divider color="light"></ion-item-divider>\n<ion-item-group class="group_bottom">\n    <ion-item>\n      <ion-label class="left_label">内部参考</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{item.categ_id}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">产品名称</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{item.name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">位置</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{item.location}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">国内简称</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{item.inner_code}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">国内类型</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{item.inner_spec}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">产品规格</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{item.product_specs}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">内部类别</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{item.default_code}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n  <ion-item-divider color="light"></ion-item-divider>\n  <ion-item-group class="group_bottom">\n    <ion-item tappable (click)="clickBom()">\n      <ion-label class="left_label">BOM</ion-label>\n      <ion-label text-wrap class="right_label" item-end>></ion-label>\n    </ion-item>\n    <ion-item tappable (click)="clickStockMove()">\n      <ion-label class="left_label">库存移动</ion-label>\n      <ion-label text-wrap class="right_label" item-end>></ion-label>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/new-product-detail/new-product-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__new_productionService__["a" /* NewProductionService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__new_productionService__["a" /* NewProductionService */]])
], NewProductDetailPage);

//# sourceMappingURL=new-product-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/new-production/new-product-detail/new-product-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewProductDetailPageModule", function() { return NewProductDetailPageModule; });
/* harmony import */ var new_product_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var new_product_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var new_product_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewProductDetailPageModule = (function () {
    function NewProductDetailPageModule() {
    }
    return NewProductDetailPageModule;
}());
NewProductDetailPageModule = new_product_detail_module___decorate([
    new_product_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            NewProductDetailPage,
        ],
        imports: [
            new_product_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(NewProductDetailPage),
        ],
    })
], NewProductDetailPageModule);

//# sourceMappingURL=new-product-detail.module.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProductionService; });
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


var NewProductionService = (function () {
    function NewProductionService(httpservice) {
        this.httpservice = httpservice;
    }
    NewProductionService.prototype.search_product_category_no_loading = function (type, parent_id) {
        var body = JSON.stringify({
            type: type,
            parent_id: parent_id,
        });
        return this.httpservice.postBodyNoLoading("search_product_category", body);
    };
    NewProductionService.prototype.search_product_category = function (type, parent_id) {
        var body = JSON.stringify({
            type: type,
            parent_id: parent_id,
        });
        return this.httpservice.postBody("search_product_category", body);
    };
    NewProductionService.prototype.get_production_detail = function (categ_id) {
        var body = JSON.stringify({
            categ_id: categ_id,
        });
        return this.httpservice.postBody("search_product_detail", body);
    };
    NewProductionService.prototype.product_bom_stock_move = function (id, type) {
        var body = JSON.stringify({
            id: id,
            type: type,
        });
        return this.httpservice.postBody("product_bom_stock_move", body);
    };
    NewProductionService.prototype.search_product = function (type, search_text) {
        var body = JSON.stringify({
            search_text: search_text,
            type: type,
        });
        return this.httpservice.postBody("search_product", body);
    };
    NewProductionService.prototype.get_stock_moves_by_product_id = function (product_id) {
        var body = JSON.stringify({
            product_id: product_id,
        });
        return this.httpservice.postBody("get_stock_moves_by_product_id", body);
    };
    return NewProductionService;
}());
NewProductionService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], NewProductionService);

//# sourceMappingURL=new-productionService.js.map

/***/ })

});
//# sourceMappingURL=71.js.map