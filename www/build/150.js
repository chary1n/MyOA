webpackJsonp([150],{

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/content-edit/content-edit.ts
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
 * Generated class for the ContentEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContentEditPage = (function () {
    function ContentEditPage(navCtrl, navParams, statusBar, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.rt_achievement = this.navParams.get('rt_achievement').replace(/<br>/g, "\n");
        this.frontPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("PerformanceStartPage", navCtrl);
    }
    ContentEditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContentEditPage');
    };
    ContentEditPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    ContentEditPage.prototype.cancel = function () {
        var _this = this;
        if (!this.rt_achievement) {
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
    ContentEditPage.prototype.save = function () {
        this.frontPage.data.rt_achievement = this.rt_achievement.replace(/\n/g, "<br>");
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.postedit = 1;
        this.navCtrl.popTo(this.frontPage);
    };
    return ContentEditPage;
}());
ContentEditPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-content-edit',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/content-edit/content-edit.html"*/'<!--\n  Generated template for the ContentEditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true" align-items-center>\n    <ion-buttons left>\n        <button ion-button icon-only tappable (click)="cancel()" style="font-size:14px;color: white;margin-left: 10px">\n            取消\n        </button>\n    </ion-buttons>\n    <ion-buttons right>\n        <button ion-button icon-only tappable (click)="save()" style="font-size:14px;color: white;margin-right: 10px">\n            完成\n        </button>\n  </ion-buttons>\n  <ion-title style="text-align: center">工作总结</ion-title>\n</ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<div style="border-bottom:#f0f2f5 1px solid;">\n    <p style="color:#949ca1;font-size: 12px;margin-left: 25px">1.工作成绩：完成的重要事项，工作中的收获提升以及感悟</p>\n    <p style="color:#949ca1;font-size: 12px;margin-left: 25px;">2.工作不足：遇到的内外部问题、失误，如何避免或者改进</p>\n</div>\n<textarea [(ngModel)]="rt_achievement" cols="20" placeholder="请输入" style="border-bottom:white 0px solid;\n    border-top:white 0px solid;\n    border-left:white 0px solid;\n    border-right:white 0px solid;\n    margin-left: 15px;height: 250px;padding: 5px;width:90%"></textarea>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/content-edit/content-edit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
], ContentEditPage);

//# sourceMappingURL=content-edit.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/content-edit/content-edit.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentEditPageModule", function() { return ContentEditPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var content_edit_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContentEditPageModule = (function () {
    function ContentEditPageModule() {
    }
    return ContentEditPageModule;
}());
ContentEditPageModule = content_edit_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ContentEditPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ContentEditPage),
        ],
    })
], ContentEditPageModule);

//# sourceMappingURL=content-edit.module.js.map

/***/ })

});
//# sourceMappingURL=150.js.map