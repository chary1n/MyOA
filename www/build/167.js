webpackJsonp([167],{

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/baobiao/hk-baobiao/hk-baobiao.ts
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
 * Generated class for the HkBaobiaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HkBaobiaoPage = (function () {
    function HkBaobiaoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = navParams.get('items');
    }
    HkBaobiaoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HkBaobiaoPage');
    };
    HkBaobiaoPage.prototype.transInt = function (item) {
        return parseFloat(item).toFixed(2);
    };
    HkBaobiaoPage.prototype.fmoney = function (s, n) {
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
    HkBaobiaoPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    return HkBaobiaoPage;
}());
HkBaobiaoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-hk-baobiao',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/baobiao/hk-baobiao/hk-baobiao.html"*/'<!--\n  Generated template for the HkBaobiaoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>{{items.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f7f7f7">\n  <div align="center" style="width:100%;height:120px;background:#1eabf1">\n    <p text-wrap style="width:65px;float:left;color:white;margin-left:30px;margin-top:40px">\n      余额合计人民币\n    </p>\n    <h1 style="float:right;color:white;margin-right:20px;margin-top:45px;width:200px;text-align:left">{{fmoney(transInt(items.total_amount),3)}}</h1>\n  </div>\n  <ion-list style="margin-top:10px">\n    <div *ngFor="let item of items.line_ids">\n    <div class="left_div" style="border-bottom: 1px solid #e7e5e7;">\n    <div class="left_btn">\n    </div>\n    <p class="left_p" >{{item.name}}</p> \n  </div>\n  <div class="right_div" style="border-bottom: 1px solid #e7e5e7">\n    <div style="width:33%;height:60px;float:left">\n      <p style="margin-top:7px;text-align:center;color:gray;">金额<p>\n      <p style="margin-top:-13px;text-align:center;color:#1eabf1">{{fmoney(transInt(item.amount),3)}}</p>\n    </div>\n    <div style="width:67%;height:60px;float:right">\n        <div style="width:50%;height:60px;float:left">\n          <p style="margin-top:7px;text-align:center;color:gray;">汇率<p>\n          <p style="margin-top:-13px;text-align:center;color:#1eabf1">{{fmoney(transInt(item.rate),3)}}</p>\n        </div>\n        <div style="width:50%;height:60px;float:right">\n          <p style="margin-top:7px;text-align:center;color:gray;">人民币<p>\n          <p style="margin-top:-13px;text-align:center;color:#1eabf1">{{fmoney(transInt(item.sub_total),3)}}</p>\n        </div>\n    </div>\n  </div>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/baobiao/hk-baobiao/hk-baobiao.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */]])
], HkBaobiaoPage);

//# sourceMappingURL=hk-baobiao.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/baobiao/hk-baobiao/hk-baobiao.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HkBaobiaoPageModule", function() { return HkBaobiaoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var hk_baobiao_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HkBaobiaoPageModule = (function () {
    function HkBaobiaoPageModule() {
    }
    return HkBaobiaoPageModule;
}());
HkBaobiaoPageModule = hk_baobiao_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            HkBaobiaoPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(HkBaobiaoPage),
        ],
    })
], HkBaobiaoPageModule);

//# sourceMappingURL=hk-baobiao.module.js.map

/***/ })

});
//# sourceMappingURL=167.js.map