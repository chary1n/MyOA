webpackJsonp([142],{

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/wait-me-apply/wait-me-apply.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
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


/**
 * Generated class for the WaitMeApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var WaitMeApplyPage = (function () {
    function WaitMeApplyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    WaitMeApplyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WaitMeApplyPage');
    };
    WaitMeApplyPage.prototype.agree = function () {
    };
    WaitMeApplyPage.prototype.disagree = function () {
    };
    return WaitMeApplyPage;
}());
WaitMeApplyPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-wait-me-apply',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/wait-me-apply/wait-me-apply.html"*/'<!--\n  Generated template for the WaitMeApplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>报销详细</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n<ion-footer>\n  <button ion-button (click)="agree()" > 通过</button>\n  <button ion-button (click)="disagree()"> 不通过</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/wait-me-apply/wait-me-apply.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */]])
], WaitMeApplyPage);

//# sourceMappingURL=wait-me-apply.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/wait-me-apply/wait-me-apply.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaitMeApplyPageModule", function() { return WaitMeApplyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var wait_me_apply_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WaitMeApplyPageModule = (function () {
    function WaitMeApplyPageModule() {
    }
    return WaitMeApplyPageModule;
}());
WaitMeApplyPageModule = wait_me_apply_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            WaitMeApplyPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(WaitMeApplyPage),
        ],
    })
], WaitMeApplyPageModule);

//# sourceMappingURL=wait-me-apply.module.js.map

/***/ })

});
//# sourceMappingURL=142.js.map