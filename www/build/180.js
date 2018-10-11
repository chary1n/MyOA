webpackJsonp([180],{

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/add-employee/prompt/gongpai/popmodal/popmodal.ts
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
 * Generated class for the PopmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopmodalPage = (function () {
    function PopmodalPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PopmodalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopmodalPage');
    };
    return PopmodalPage;
}());
PopmodalPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-popmodal',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/prompt/gongpai/popmodal/popmodal.html"*/'<!--\n  Generated template for the PopmodalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n\n\n\n\n<div  class="alert_div_fail" style="opacity: 1.0;">\n    <img style="width:110px;height:110px;margin-top:30px;" src="assets/img/fail_icon.png" />    \n    <p style="color:black;font-size:20px">绑定失败</p>\n    <p style="color:gray;font-size:14px;margin-top:-16px">请移开后重试</p>\n    <div tappable (click)="clickCancel()" class="alert_btn_fail">\n      我知道了\n    </div>    \n  </div>\n\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/prompt/gongpai/popmodal/popmodal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */]])
], PopmodalPage);

//# sourceMappingURL=popmodal.js.map
// CONCATENATED MODULE: ./src/pages/add-employee/prompt/gongpai/popmodal/popmodal.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopmodalPageModule", function() { return PopmodalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var popmodal_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopmodalPageModule = (function () {
    function PopmodalPageModule() {
    }
    return PopmodalPageModule;
}());
PopmodalPageModule = popmodal_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PopmodalPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PopmodalPage),
        ],
    })
], PopmodalPageModule);

//# sourceMappingURL=popmodal.module.js.map

/***/ })

});
//# sourceMappingURL=180.js.map