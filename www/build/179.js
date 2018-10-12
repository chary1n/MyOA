webpackJsonp([179],{

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/add-employee/q-rcode/q-rcode.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screenshot__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_library__ = __webpack_require__(254);
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
 * Generated class for the QRcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QRcodePage = (function () {
    function QRcodePage(navCtrl, navParams, platform, toast, photoLibrary, screenshot) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.toast = toast;
        this.photoLibrary = photoLibrary;
        this.screenshot = screenshot;
        this.QRData = this.navParams.get("data");
        this.item = this.navParams.get("item");
    }
    QRcodePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QRcodePage');
    };
    QRcodePage.prototype.savePhone = function () {
        var _this = this;
        this.screenshot.save('jpg', 20, "name").then(function (res) {
            if (_this.platform.is("ios")) {
                _this.saveImage(res.filePath);
            }
        }, function (err) {
            __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("保存失败", _this.toast);
        });
    };
    QRcodePage.prototype.saveImage = function (imgUrl) {
        cordova.plugins.photoLibrary.requestAuthorization(function () {
            // User gave us permission to his library, retry reading it!   
            cordova.plugins.photoLibrary.getLibrary(function (_a) {
                var library = _a.library;
                //var url = 'file:///...'; // file or remote URL. url can also be dataURL, but giving it a file path is much faster   
                var album = 'OA';
                cordova.plugins.photoLibrary.saveImage("file://" + imgUrl, album, function (libraryItem) {
                    __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("保存失败", this.toast);
                }, function (err) {
                    __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("保存失败", this.toast);
                });
            }, function (err) {
                if (err.startsWith('Permission')) {
                    // call requestAuthorization, and retry   
                }
                // Handle error - it's not permission-related   
                console.log('权限' + err);
            });
        }, function (err) {
            // User denied the access   
            alert('用户拒绝访问' + err);
        }, // if options not provided, defaults to {read: true}.   
        {
            read: true,
            write: true
        });
    };
    return QRcodePage;
}());
QRcodePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-q-rcode',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/q-rcode/q-rcode.html"*/'<!--\n  Generated template for the QRcodePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>员工二维码</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f2f5">\n\n  <div style="text-align: center;\n  margin-top: 30px;\n  width: 80%;\n  height: 360px;\n  background:white;\n  border-radius: 5px;\n  margin-left: 10%;">\n\n    <div style="text-align:center;padding-top:20px">\n      <qr-code *ngIf="QRData" [value]="QRData" [size]="250"></qr-code>\n      <p class="p_font"> {{item.name}}</p>\n    </div>\n  </div>\n\n  <p class="p_button" tappable (click)="savePhone()"> 保存到手机</p>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/q-rcode/q-rcode.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_library__["a" /* PhotoLibrary */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["z" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_library__["a" /* PhotoLibrary */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_screenshot__["a" /* Screenshot */]])
], QRcodePage);

//# sourceMappingURL=q-rcode.js.map
// CONCATENATED MODULE: ./src/pages/add-employee/q-rcode/q-rcode.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QRcodePageModule", function() { return QRcodePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_qrcode__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var q_rcode_module___WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var q_rcode_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var QRcodePageModule = (function () {
    function QRcodePageModule() {
    }
    return QRcodePageModule;
}());
QRcodePageModule = q_rcode_module___decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            QRcodePage,
        ],
        imports: [
            q_rcode_module___WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(QRcodePage), __WEBPACK_IMPORTED_MODULE_0_angular2_qrcode__["a" /* QRCodeModule */]
        ],
    })
], QRcodePageModule);

//# sourceMappingURL=q-rcode.module.js.map

/***/ })

});
//# sourceMappingURL=179.js.map