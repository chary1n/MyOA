webpackJsonp([156],{

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/new-delete/new-delete.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_ionic_page__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the NewDeletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewDeletePage = (function () {
    function NewDeletePage(navCtrl, navParams, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusbar = statusbar;
        this.need_back_write = this.navParams.get('need_back_write');
        this.item = this.navParams.get("item");
        if (this.need_back_write) {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("WriteJournalPage", navCtrl);
        }
    }
    NewDeletePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewDeletePage');
    };
    NewDeletePage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    NewDeletePage.prototype.delete = function () {
        this.frontPage.data.isDeletePicture = true;
        this.navCtrl.popTo(this.frontPage);
    };
    return NewDeletePage;
}());
NewDeletePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-new-delete',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/new-delete/new-delete.html"*/'<!--\n  Generated template for the NewDeletePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="titleBlack">\n    <ion-title></ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only   (click)=\'delete()\'>\n            <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n<ion-content padding style="background:black">\n\n  <img src={{item}}>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/new-delete/new-delete.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], NewDeletePage);

//# sourceMappingURL=new-delete.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/new-delete/new-delete.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewDeletePageModule", function() { return NewDeletePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var new_delete_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewDeletePageModule = (function () {
    function NewDeletePageModule() {
    }
    return NewDeletePageModule;
}());
NewDeletePageModule = new_delete_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            NewDeletePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(NewDeletePage),
        ],
    })
], NewDeletePageModule);

//# sourceMappingURL=new-delete.module.js.map

/***/ })

});
//# sourceMappingURL=156.js.map