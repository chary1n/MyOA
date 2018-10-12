webpackJsonp([151],{

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/advice-edit/advice-edit.ts
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
 * Generated class for the AdviceEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdviceEditPage = (function () {
    function AdviceEditPage(navCtrl, navParams, statusBar, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.rt_advice = this.navParams.get('rt_advice').replace(/<br>/g, "\n");
        this.frontPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("PerformanceStartPage", navCtrl);
    }
    AdviceEditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdviceEditPage');
    };
    AdviceEditPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    AdviceEditPage.prototype.cancel = function () {
        var _this = this;
        if (!this.rt_advice) {
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
    AdviceEditPage.prototype.save = function () {
        // debugger;
        this.frontPage.data.rt_advice = this.rt_advice.replace(/\n/g, "<br>");
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.postedit = 3;
        this.navCtrl.popTo(this.frontPage);
    };
    return AdviceEditPage;
}());
AdviceEditPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-advice-edit',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/advice-edit/advice-edit.html"*/'<!--\n  Generated template for the AdviceEditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n        <ion-navbar color="gongdan-color" hideBackButton="true">\n                <ion-buttons left>\n                    <button ion-button icon-only tappable (click)="cancel()" style="font-size:14px;color: white;margin-left: 10px">\n                        取消\n                    </button>\n                </ion-buttons>\n                <ion-buttons right>\n                    <button ion-button icon-only tappable (click)="save()" style="font-size:14px;color: white;margin-right: 10px">\n                        完成\n                    </button>\n              </ion-buttons>\n              <ion-title style="text-align: center">意见与建议</ion-title>\n            </ion-navbar>\n            \n</ion-header>\n\n\n<ion-content>\n        <div>\n                <textarea [(ngModel)]="rt_advice" cols="20"  placeholder="请输入" style="border-bottom:white 0px solid;\n                border-top:white 0px solid;\n                border-left:white 0px solid;\n                border-right:white 0px solid;\n                margin: 15px;height: 300px;padding: 10px;width:90%"></textarea>\n            </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/advice-edit/advice-edit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
], AdviceEditPage);

//# sourceMappingURL=advice-edit.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/advice-edit/advice-edit.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdviceEditPageModule", function() { return AdviceEditPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var advice_edit_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdviceEditPageModule = (function () {
    function AdviceEditPageModule() {
    }
    return AdviceEditPageModule;
}());
AdviceEditPageModule = advice_edit_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AdviceEditPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AdviceEditPage),
        ],
    })
], AdviceEditPageModule);

//# sourceMappingURL=advice-edit.module.js.map

/***/ })

});
//# sourceMappingURL=151.js.map