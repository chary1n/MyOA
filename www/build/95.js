webpackJsonp([95],{

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/baobiao/baobiao.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__baobiaoService__ = __webpack_require__(897);
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
 * Generated class for the BaobiaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BaobiaoPage = (function () {
    function BaobiaoPage(navCtrl, navParams, baobiaoService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.baobiaoService = baobiaoService;
    }
    BaobiaoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BaobiaoPage');
    };
    BaobiaoPage.prototype.zijin = function () {
        var _this = this;
        this.baobiaoService.getZijin().then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('BaobiaoDetailPage', {
                    item: res.result.res_data,
                });
            }
        });
    };
    BaobiaoPage.prototype.xianggang = function () {
        var _this = this;
        this.baobiaoService.account_hk().then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('HkBaobiaoPage', {
                    items: res.result.res_data[0],
                });
            }
        });
    };
    return BaobiaoPage;
}());
BaobiaoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-baobiao',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/baobiao/baobiao.html"*/'<!--\n  Generated template for the BaobiaoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>报表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f7f7f7">\n  <ion-list>\n    <ion-item>\n      <img style="width:15px;float:left;margin-top:7px" src="assets/img/work_bench/zhishifenxiang.png">\n      <p style="margin-left:20px;font-size:15px;margin-top:5px">财务报表</p>\n    </ion-item>\n    <button ion-item (click)="zijin()">\n      <ion-label style="margin-left:20px;font-size:15px">资金日报</ion-label>\n    </button>\n    <button ion-item (click)="xianggang()">\n      <ion-label style="margin-left:20px;font-size:15px">香港账户</ion-label>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/baobiao/baobiao.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__baobiaoService__["a" /* BaoBiaoService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__baobiaoService__["a" /* BaoBiaoService */]])
], BaobiaoPage);

//# sourceMappingURL=baobiao.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/baobiao/baobiao.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaobiaoPageModule", function() { return BaobiaoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var baobiao_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BaobiaoPageModule = (function () {
    function BaobiaoPageModule() {
    }
    return BaobiaoPageModule;
}());
BaobiaoPageModule = baobiao_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            BaobiaoPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(BaobiaoPage),
        ],
    })
], BaobiaoPageModule);

//# sourceMappingURL=baobiao.module.js.map

/***/ }),

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaoBiaoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
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


var BaoBiaoService = (function () {
    function BaoBiaoService(httpservice) {
        this.httpservice = httpservice;
    }
    BaoBiaoService.prototype.getZijin = function () {
        var body = JSON.stringify({
            body: "body",
        });
        return this.httpservice.postBody('get_account_data', body, 1);
    };
    BaoBiaoService.prototype.account_hk = function () {
        var body = JSON.stringify({
            body: "body",
        });
        return this.httpservice.postBody('account_hk', body, 1);
    };
    return BaoBiaoService;
}());
BaoBiaoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], BaoBiaoService);

//# sourceMappingURL=baobiaoService.js.map

/***/ })

});
//# sourceMappingURL=95.js.map