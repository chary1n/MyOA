webpackJsonp([175],{

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/msg/msg.ts
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
 * Generated class for the MsgPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MsgPage = (function () {
    function MsgPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MsgPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MsgPage');
    };
    MsgPage.prototype.click_detail = function () {
        this.navCtrl.push('MsgDetailPage', {});
    };
    return MsgPage;
}());
MsgPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-msg',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/msg/msg.html"*/'<!--\n  Generated template for the MsgPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>我的消息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <!--<ion-list style="margin-top:10px;">\n    <ion-item >\n     <ion-item tappable (click) = "click_detail()" no-lines style="height:40px;">\n       <ion-avatar item-start>\n        <img src="assets/img/shenpi.png">\n      </ion-avatar>\n      <h2>Hamm</h2>\n      <p>You heard of Kung Fu? Well get ready for pork chop.You heard of Kung Fu? Well get ready for pork chop.You heard of Kung Fu? Well get ready for pork chop.</p>\n     </ion-item>\n    </ion-item>\n  </ion-list>-->\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/msg/msg.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], MsgPage);

//# sourceMappingURL=msg.js.map
// CONCATENATED MODULE: ./src/pages/msg/msg.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MsgPageModule", function() { return MsgPageModule; });
/* harmony import */ var msg_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var msg_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var msg_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MsgPageModule = (function () {
    function MsgPageModule() {
    }
    return MsgPageModule;
}());
MsgPageModule = msg_module___decorate([
    msg_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MsgPage
        ],
        imports: [
            msg_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MsgPage),
        ],
        exports: [
            MsgPage
        ],
        entryComponents: [MsgPage],
    })
], MsgPageModule);

//# sourceMappingURL=msg.module.js.map

/***/ })

});
//# sourceMappingURL=175.js.map