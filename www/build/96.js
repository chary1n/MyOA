webpackJsonp([96],{

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/baobiao/baobiao-detail/baobiao-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__baobiaoService__ = __webpack_require__(896);
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
 * Generated class for the BaobiaoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BaobiaoDetailPage = (function () {
    function BaobiaoDetailPage(navCtrl, navParams, baoBiaoService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.baoBiaoService = baoBiaoService;
        this.now = new Date();
        this.item = navParams.get('item');
    }
    BaobiaoDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BaobiaoDetailPage');
    };
    BaobiaoDetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    BaobiaoDetailPage.prototype.transInt = function (item) {
        return parseFloat(item).toFixed(2);
    };
    BaobiaoDetailPage.prototype.fmoney = function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1].substr(0, 2);
        var t = "";
        var i;
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    };
    return BaobiaoDetailPage;
}());
BaobiaoDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-baobiao-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/baobiao/baobiao-detail/baobiao-detail.html"*/'<!--\n  Generated template for the BaobiaoDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="bar-calm">\n \n  <ion-navbar color="gongdan-color" hideBackButton="true" >\n     <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>资金日报</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content style="background:#f7f7f7">\n  <ion-list style="background-color:#1eabf1">\n    <ion-item style="background:#1eabf1">\n      <p style="color:white">今天 {{now|date:\'yyyy-MM-dd\'}}</p>\n    </ion-item>\n    <div no-lines style="background:#1eabf1;height:52px">\n      <div style="height:52px;width:50%;float:left" align="center">\n        <div style="background-color:#3fd5c5;width:10px;height:10px;float:left;margin-top:22px;margin-left:16px">\n      </div> \n      <p style="margin-top:17px;color:white;margin-left:33px;text-align:left">收入 {{fmoney(transInt(item.debit_all))}}</p>\n      </div>\n      <div style="height:52px;width:50%;float:right">\n        <div style="background-color:#fec564;width:10px;height:10px;float:left;margin-top:22px">\n      </div> \n      <p style="margin-top:17px;color:white;margin-left:17px;text-align:left">支出 {{fmoney(transInt(item.credit_all))}}</p>\n      </div>\n      \n\n      \n      \n\n    </div>\n  </ion-list>\n  <ion-grid class="row_class" >\n  <ion-row align-items-center>\n      <ion-col>\n         <div align="center">\n          <p class="first_class">月初</p>\n          <p text-wrap class="second_class">{{fmoney(transInt(item.month_begin),3)}}</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center">\n         <p class="first_class">期初</p>\n          <p text-wrap class="second_class">{{fmoney(transInt(item.last_day_balance_all),3)}}</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center" >\n         <p class="first_class">期末</p>\n          <p text-wrap class="second_class">{{fmoney(transInt(item.balance_all),3)}}</p> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n<ion-item-group style="background:white;" *ngFor="let items of item.account_list;">\n  <ion-list-header color="light" style="min-height:1px;height:10px;"></ion-list-header>\n  <ion-grid style="border-bottom: 1px solid #e7e5e7;">\n      <ion-row style="height:30px;">\n        <ion-col col-auto>\n        </ion-col>\n        <ion-col>\n          <ion-label style="margin-top:0px" text-wrap>{{items.name}}</ion-label>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n  <div class="left_div" style="border-right: 1px solid #e7e5e7;border-bottom: 1px solid #e7e5e7;">\n    <div class="left_btn">\n    </div>\n    <p class="left_p" >收入 {{fmoney(transInt(items.debit),3)}}</p> \n    <div class="right_btn">\n    </div>\n    <p class="right_p" >支出 {{fmoney(transInt(items.credit),3)}}</p> \n  </div>\n  <div class="right_div" style="border-bottom: 1px solid #e7e5e7">\n    <div style="width:33%;height:60px;float:left">\n      <p style="margin-top:9px;text-align:center;color:gray">月初<p>\n      <p style="margin-top:-8px;text-align:center;font-size:11px;color:#1eabf1">{{fmoney(transInt(items.month_begin),3)}}</p>\n    </div>\n    <div style="width:67%;height:60px;float:right">\n        <div style="width:50%;height:60px;float:left">\n          <p style="margin-top:9px;text-align:center;color:gray">期初<p>\n          <p style="margin-top:-8px;text-align:center;font-size:11px;color:#1eabf1">{{fmoney(transInt(items.last_day_balance),3)}}</p>\n        </div>\n        <div style="width:50%;height:60px;float:right">\n          <p style="margin-top:9px;text-align:center;color:gray">期末<p>\n          <p style="margin-top:-8px;text-align:center;font-size:11px;color:#1eabf1">{{fmoney(transInt(items.balance),3)}}</p>\n        </div>\n    </div>\n  </div>\n</ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/baobiao/baobiao-detail/baobiao-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__baobiaoService__["a" /* BaoBiaoService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__baobiaoService__["a" /* BaoBiaoService */]])
], BaobiaoDetailPage);

//# sourceMappingURL=baobiao-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/baobiao/baobiao-detail/baobiao-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaobiaoDetailPageModule", function() { return BaobiaoDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var baobiao_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BaobiaoDetailPageModule = (function () {
    function BaobiaoDetailPageModule() {
    }
    return BaobiaoDetailPageModule;
}());
BaobiaoDetailPageModule = baobiao_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            BaobiaoDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(BaobiaoDetailPage),
        ],
    })
], BaobiaoDetailPageModule);

//# sourceMappingURL=baobiao-detail.module.js.map

/***/ }),

/***/ 896:
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
//# sourceMappingURL=96.js.map