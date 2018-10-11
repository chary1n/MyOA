webpackJsonp([123],{

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCustomerPageModule", function() { return AddCustomerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_customer__ = __webpack_require__(893);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddCustomerPageModule = (function () {
    function AddCustomerPageModule() {
    }
    return AddCustomerPageModule;
}());
AddCustomerPageModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add_customer__["a" /* AddCustomerPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_customer__["a" /* AddCustomerPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__add_customer__["a" /* AddCustomerPage */]
        ]
    })
], AddCustomerPageModule);

//# sourceMappingURL=add-customer.module.js.map

/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the AddCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddCustomerPage = (function () {
    function AddCustomerPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.company_name = '苏州麦田科技有限公司';
        this.country = '请选择 >';
        this.come_from = '请选择 >';
        this.qudao = '请选择 >';
    }
    AddCustomerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AddCustomerPage');
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.team = res.result.res_data.department;
            _this.people = res.result.res_data.name;
        });
    };
    return AddCustomerPage;
}());
AddCustomerPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-add-customer',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/add-customer/add-customer.html"*/'<!--\n  Generated template for the AddCustomerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>addCustomer</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group >\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">公司</ion-label>\n      <ion-label text-wrap item-end style="font-size:65%;text-align:right;">{{company_name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label  style="font-size:85%;font-weight:bold">国家</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{country}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">来源</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{come_from}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">渠道</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{qudao}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">销售团队</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{team}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">销售员</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{people}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">标签</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{tips}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">感兴趣的产品</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{products}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/add-customer/add-customer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], AddCustomerPage);

//# sourceMappingURL=add-customer.js.map

/***/ })

});
//# sourceMappingURL=123.js.map