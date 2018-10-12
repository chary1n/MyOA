webpackJsonp([149],{

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/insufficient-edit/insufficient-edit.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
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
 * Generated class for the InsufficientEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InsufficientEditPage = (function () {
    function InsufficientEditPage(navCtrl, navParams, statusBar, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.rt_insufficient = this.navParams.get('rt_insufficient').replace(/<br>/g, "\n");
        this.frontPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("PerformanceStartPage", navCtrl);
    }
    InsufficientEditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InsufficientEditPage');
    };
    InsufficientEditPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    InsufficientEditPage.prototype.cancel = function () {
        var _this = this;
        if (!this.rt_insufficient) {
            this.navCtrl.popTo(this.frontPage);
        }
        else {
            this.alertCtrl.create({
                title: '提示',
                subTitle: '已输入内容，是否确认返回？',
                buttons: [{ text: '取消' },
                    {
                        text: '确定',
                        handler: function () {
                            _this.navCtrl.popTo(_this.frontPage);
                        }
                    }
                ]
            }).present();
        }
    };
    InsufficientEditPage.prototype.save = function () {
        this.frontPage.data.rt_insufficient = this.rt_insufficient.replace(/\n/g, "<br>");
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.postedit = 2;
        this.navCtrl.popTo(this.frontPage);
    };
    return InsufficientEditPage;
}());
InsufficientEditPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-insufficient-edit',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/insufficient-edit/insufficient-edit.html"*/'<!--\n  Generated template for the InsufficientEditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n        <ion-navbar color="gongdan-color" hideBackButton="true">\n                <ion-buttons left>\n                    <button ion-button icon-only tappable (click)="cancel()" style="font-size:14px;color: white;margin-left: 10px">\n                        取消\n                    </button>\n                </ion-buttons>\n                <ion-buttons right>\n                    <button ion-button icon-only tappable (click)="save()" style="font-size:14px;color: white;margin-right: 10px">\n                        完成\n                    </button>\n              </ion-buttons>\n              <ion-title style="text-align: center">工作计划</ion-title>\n            </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <div style="border-bottom:#f0f2f5 1px solid;">\n                <p style="color:#949ca1;font-size: 12px;margin-left: 25px;">1.近期计划；2.长期规划</p>\n    </div>\n            <textarea [(ngModel)]="rt_insufficient" placeholder="请输入" cols="20" style="border-bottom:white 0px solid;\n                border-top:white 0px solid;\n                border-left:white 0px solid;\n                border-right:white 0px solid;\n                margin: 15px;height: 280px;padding: 5px;width:90%"></textarea>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/insufficient-edit/insufficient-edit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
], InsufficientEditPage);

//# sourceMappingURL=insufficient-edit.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/insufficient-edit/insufficient-edit.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsufficientEditPageModule", function() { return InsufficientEditPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var insufficient_edit_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InsufficientEditPageModule = (function () {
    function InsufficientEditPageModule() {
    }
    return InsufficientEditPageModule;
}());
InsufficientEditPageModule = insufficient_edit_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            InsufficientEditPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(InsufficientEditPage),
        ],
    })
], InsufficientEditPageModule);

//# sourceMappingURL=insufficient-edit.module.js.map

/***/ })

});
//# sourceMappingURL=149.js.map