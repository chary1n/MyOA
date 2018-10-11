webpackJsonp([147],{

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/production-search/production-detail/bom/bom.ts
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
 * Generated class for the BomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BomPage = (function () {
    function BomPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.id = 0;
        this.item = this.navParams.get("item");
        console.log(this.item);
        if (this.item.bom) {
            this.fonts = this.analaysisBom(this.item.bom);
        }
        console.log(this.fonts);
    }
    BomPage.prototype.ionViewWillEnter = function () {
        var self = this;
        for (var i = 0; i <= this.id; i++) {
            self.handleActionOnFFS(i, 'collapse');
        }
    };
    BomPage.prototype.analaysisBom = function (bom) {
        // let bomItem  =  TreeModel ;
        var bomItem = { value: "", children: [], id: this.id };
        this.id = this.id + 1;
        bomItem.value = bom.name + "      " + (bom.process_id[1] ? bom.process_id[1] : "") + "      " + (bom.qty ? bom.qty : "");
        if (bom.bom_ids && bom.bom_ids.length > 0) {
            for (var _i = 0, _a = bom.bom_ids; _i < _a.length; _i++) {
                var item = _a[_i];
                {
                    bomItem.children.push(this.analaysisBom(item));
                }
            }
        }
        else {
            bomItem.children = undefined;
        }
        return bomItem;
    };
    BomPage.prototype.handleActionOnFFS = function (id, action) {
        var treeController = this.treeFFS.getControllerByNodeId(id);
        if (treeController && typeof treeController[action] === 'function') {
            treeController[action]();
        }
        else {
            console.log('There isn`t a controller for a node with id - ' + id);
        }
    };
    BomPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BomPage');
    };
    return BomPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('treeFFS'),
    __metadata("design:type", Object)
], BomPage.prototype, "treeFFS", void 0);
BomPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-bom',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/production-search/production-detail/bom/bom.html"*/'<!--\n  Generated template for the BomPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>BOM</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <tree #treeFFS [tree]="fonts" collapse>\n  </tree>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/production-search/production-detail/bom/bom.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], BomPage);

//# sourceMappingURL=bom.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/production-search/production-detail/bom/bom.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BomPageModule", function() { return BomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_tree__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng2_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var bom_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BomPageModule = (function () {
    function BomPageModule() {
    }
    return BomPageModule;
}());
BomPageModule = bom_module___decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            BomPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(BomPage), __WEBPACK_IMPORTED_MODULE_0_ng2_tree__["TreeModule"]
        ],
        exports: [
            BomPage
        ]
    })
], BomPageModule);

//# sourceMappingURL=bom.module.js.map

/***/ })

});
//# sourceMappingURL=147.js.map