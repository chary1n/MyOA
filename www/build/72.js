webpackJsonp([72],{

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/new-production/more-level-list/more-level-list.ts
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
 * Generated class for the MoreLevelListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MoreLevelListPage = (function () {
    function MoreLevelListPage(navCtrl, navParams, newProductionService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.newProductionService = newProductionService;
        this.item = navParams.get('item');
        this.title = navParams.get('title');
    }
    MoreLevelListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MoreLevelListPage');
    };
    MoreLevelListPage.prototype.itemClick = function (item) {
        var _this = this;
        if (item.child_id.length > 0) {
            this.newProductionService.search_product_category(null, item.id).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('MoreLevelListPage', {
                        item: res.result.res_data,
                        title: item.name,
                    });
                }
            });
        }
        else {
            this.newProductionService.get_production_detail(item.id).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.navCtrl.push('NewProductListPage', {
                        item: res.result.res_data,
                    });
                }
            });
        }
    };
    return MoreLevelListPage;
}());
MoreLevelListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-more-level-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/more-level-list/more-level-list.html"*/'<!--\n  Generated template for the MoreLevelListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item tappable *ngFor="let items of item" (click)="itemClick(items)">\n      <p style="color:black;float:left;">{{items.name}}</p>\n      <p *ngIf="items.child_id.length > 0" style="float:right">></p> \n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/more-level-list/more-level-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__new_productionService__["a" /* NewProductionService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__new_productionService__["a" /* NewProductionService */]])
], MoreLevelListPage);

//# sourceMappingURL=more-level-list.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/new-production/more-level-list/more-level-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoreLevelListPageModule", function() { return MoreLevelListPageModule; });
/* harmony import */ var more_level_list_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var more_level_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var more_level_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MoreLevelListPageModule = (function () {
    function MoreLevelListPageModule() {
    }
    return MoreLevelListPageModule;
}());
MoreLevelListPageModule = more_level_list_module___decorate([
    more_level_list_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MoreLevelListPage,
        ],
        imports: [
            more_level_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MoreLevelListPage),
        ],
    })
], MoreLevelListPageModule);

//# sourceMappingURL=more-level-list.module.js.map

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
//# sourceMappingURL=72.js.map