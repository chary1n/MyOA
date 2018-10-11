webpackJsonp([154],{

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/delete-kaoqin-photo/delete-kaoqin-photo.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the DeleteKaoqinPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DeleteKaoqinPhotoPage = (function () {
    function DeleteKaoqinPhotoPage(navCtrl, navParams, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusbar = statusbar;
        this.item = this.navParams.get("item");
        this.frontPage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController("KaoqinPhotoPage", navCtrl);
    }
    DeleteKaoqinPhotoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeleteKaoqinPhotoPage');
    };
    DeleteKaoqinPhotoPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    DeleteKaoqinPhotoPage.prototype.delete = function () {
        this.frontPage.data.isDeletePicture = true;
        this.navCtrl.popTo(this.frontPage);
    };
    return DeleteKaoqinPhotoPage;
}());
DeleteKaoqinPhotoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-delete-kaoqin-photo',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/delete-kaoqin-photo/delete-kaoqin-photo.html"*/'<!--\n  Generated template for the DeleteKaoqinPhotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="titleBlack">\n    <ion-title></ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only   (click)=\'delete()\'>\n            <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n<ion-content padding style="background:black">\n\n  <img src={{item}}>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/delete-kaoqin-photo/delete-kaoqin-photo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]])
], DeleteKaoqinPhotoPage);

//# sourceMappingURL=delete-kaoqin-photo.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/delete-kaoqin-photo/delete-kaoqin-photo.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteKaoqinPhotoPageModule", function() { return DeleteKaoqinPhotoPageModule; });
/* harmony import */ var delete_kaoqin_photo_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var delete_kaoqin_photo_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var delete_kaoqin_photo_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DeleteKaoqinPhotoPageModule = (function () {
    function DeleteKaoqinPhotoPageModule() {
    }
    return DeleteKaoqinPhotoPageModule;
}());
DeleteKaoqinPhotoPageModule = delete_kaoqin_photo_module___decorate([
    delete_kaoqin_photo_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            DeleteKaoqinPhotoPage,
        ],
        imports: [
            delete_kaoqin_photo_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(DeleteKaoqinPhotoPage),
        ],
    })
], DeleteKaoqinPhotoPageModule);

//# sourceMappingURL=delete-kaoqin-photo.module.js.map

/***/ })

});
//# sourceMappingURL=154.js.map