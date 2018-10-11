webpackJsonp([134],{

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/share-knowledge/shareknowlelist/shareknowlelist.ts
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
 * Generated class for the ShareknowlelistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ShareknowlelistPage = (function () {
    function ShareknowlelistPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.blogList = this.navParams.get('item');
        this.tag_name = this.navParams.get('tag_name');
    }
    ShareknowlelistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShareknowlelistPage');
    };
    ShareknowlelistPage.prototype.getblogDetail = function (item) {
        this.navCtrl.push('ShareknowledgedetailPage', {
            item: item,
        });
    };
    return ShareknowlelistPage;
}());
ShareknowlelistPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-shareknowlelist',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/share-knowledge/shareknowlelist/shareknowlelist.html"*/'<!--\n  Generated template for the ShareknowlelistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{tag_name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="background:#f0f0f0">\n\n    <ion-list>\n        <ion-item no-lines *ngFor=\'let item of blogList\' tappable (click)=\'getblogDetail(item)\' class="middle_item">\n            <h4 text-wrap style="font-size:100%;font-weight:bold">{{item.name}}</h4>\n            <p text-wrap style="font-size:70%;color:gray"> {{item.subtitle}} </p>\n            <p text-wrap style="font-size:70%;color:gray">来自分类：{{item.blog_id.blog_name}}/{{item.tag_ids.tag_name}} </p>\n            <img src={{item.create_uid.create_img}} class="image1" style="float:left;">\n            <p text-wrap style="font-size:70%;line-height:27px;margin-left: 35px;">{{item.create_uid.create_name}}</p>\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/share-knowledge/shareknowlelist/shareknowlelist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], ShareknowlelistPage);

//# sourceMappingURL=shareknowlelist.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/share-knowledge/shareknowlelist/shareknowlelist.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareknowlelistPageModule", function() { return ShareknowlelistPageModule; });
/* harmony import */ var shareknowlelist_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var shareknowlelist_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var shareknowlelist_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ShareknowlelistPageModule = (function () {
    function ShareknowlelistPageModule() {
    }
    return ShareknowlelistPageModule;
}());
ShareknowlelistPageModule = shareknowlelist_module___decorate([
    shareknowlelist_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ShareknowlelistPage,
        ],
        imports: [
            shareknowlelist_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ShareknowlelistPage),
        ],
    })
], ShareknowlelistPageModule);

//# sourceMappingURL=shareknowlelist.module.js.map

/***/ })

});
//# sourceMappingURL=134.js.map