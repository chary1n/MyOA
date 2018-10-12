webpackJsonp([159],{

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/delete-picture/delete-picture.ts
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
 * Generated class for the DeletePicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DeletePicturePage = (function () {
    function DeletePicturePage(navCtrl, navParams, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusbar = statusbar;
        this.need_back_chat = this.navParams.get('need_back_chat');
        this.need_back_retry = this.navParams.get('need_back_retry');
        if (this.need_back_chat) {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("GongdanNewChatPage", navCtrl);
        }
        else {
            if (this.need_back_retry) {
                this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("RebackGongdanPage", navCtrl);
            }
            else {
                this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("CreateGongdanPage", navCtrl);
            }
        }
        if (this.navParams.get('AddEmployeePage')) {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("AddEmployeePage", navCtrl);
        }
        else if (this.navParams.get('EmployeeDetailPage')) {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("EmployeeDetailPage", navCtrl);
        }
        this.item = this.navParams.get("item");
    }
    DeletePicturePage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    DeletePicturePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeletePicturePage');
    };
    DeletePicturePage.prototype.delete = function () {
        this.frontPage.data.isDeletePicture = true;
        this.navCtrl.popTo(this.frontPage);
    };
    return DeletePicturePage;
}());
DeletePicturePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-delete-picture',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/delete-picture/delete-picture.html"*/'<!--\n  Generated template for the DeletePicturePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="titleBlack">\n    <ion-title></ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only   (click)=\'delete()\'>\n            <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n<ion-content padding style="background:black">\n\n  <img src={{item}}>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/delete-picture/delete-picture.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], DeletePicturePage);

//# sourceMappingURL=delete-picture.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/delete-picture/delete-picture.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletePicturePageModule", function() { return DeletePicturePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var delete_picture_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DeletePicturePageModule = (function () {
    function DeletePicturePageModule() {
    }
    return DeletePicturePageModule;
}());
DeletePicturePageModule = delete_picture_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            DeletePicturePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(DeletePicturePage),
        ],
    })
], DeletePicturePageModule);

//# sourceMappingURL=delete-picture.module.js.map

/***/ })

});
//# sourceMappingURL=159.js.map