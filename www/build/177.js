webpackJsonp([177],{

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/me/phone-number/phone-number.ts
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
 * Generated class for the PhoneNumberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PhoneNumberPage = (function () {
    function PhoneNumberPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PhoneNumberPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PhoneNumberPage');
    };
    // cancel(){
    //   this.navCtrl.setRoot(EditInformationPage)
    // }
    PhoneNumberPage.prototype.savePhoneNumber = function () {
        console.log(this.phoneNumber);
    };
    return PhoneNumberPage;
}());
PhoneNumberPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-phone-number',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/me/phone-number/phone-number.html"*/'<!--\n  Generated template for the PhoneNumberPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n   <ion-navbar color="gongdan-color" no-border-top>\n    <!-- <ion-buttons start (click)=\'cancel()\'>\n      <button ion-button icon-only >\n        <ion-icon > 取消</ion-icon>\n      </button>\n    </ion-buttons> -->\n    <ion-buttons end tappable tappable (click)=\'savePhoneNumber()\'>\n      <button ion-button icon-only>\n        <ion-icon > 完成</ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>手机号码</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n   <ion-item >\n      <ion-label floating>请输入手机号码</ion-label>\n      <ion-input type="number" [(ngModel)]="phoneNumber"></ion-input>\n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/me/phone-number/phone-number.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], PhoneNumberPage);

//# sourceMappingURL=phone-number.js.map
// CONCATENATED MODULE: ./src/pages/me/phone-number/phone-number.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneNumberPageModule", function() { return PhoneNumberPageModule; });
/* harmony import */ var phone_number_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var phone_number_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var phone_number_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PhoneNumberPageModule = (function () {
    function PhoneNumberPageModule() {
    }
    return PhoneNumberPageModule;
}());
PhoneNumberPageModule = phone_number_module___decorate([
    phone_number_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PhoneNumberPage,
        ],
        imports: [
            phone_number_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PhoneNumberPage),
        ],
    })
], PhoneNumberPageModule);

//# sourceMappingURL=phone-number.module.js.map

/***/ })

});
//# sourceMappingURL=177.js.map