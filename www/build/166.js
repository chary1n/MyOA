webpackJsonp([166],{

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/cardinfo/cardinfo.ts
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
 * Generated class for the CardinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CardinfoPage = (function () {
    function CardinfoPage(actionSheetCtrl) {
        this.actionSheetCtrl = actionSheetCtrl;
    }
    CardinfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardinfoPage');
    };
    CardinfoPage.prototype.takePhoto = function () {
        {
            var actionSheet = this.actionSheetCtrl.create({
                title: '请选择添加方式',
                buttons: [
                    {
                        text: '手动输入',
                        handler: function () {
                            console.log('Destructive clicked');
                        }
                    },
                    {
                        text: '扫描名片',
                        handler: function () {
                            console.log('Archive clicked');
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    return CardinfoPage;
}());
CardinfoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-cardinfo',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/cardinfo/cardinfo.html"*/'<!--\n  Generated template for the CardinfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" class="nav_bar">\n    <ion-title>客户</ion-title>\n   <ion-buttons end>\n      <button ion-button icon-only tappable (click)="takePhoto()">\n        <p>添加</p>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/cardinfo/cardinfo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], CardinfoPage);

//# sourceMappingURL=cardinfo.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/cardinfo/cardinfo.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardinfoPageModule", function() { return CardinfoPageModule; });
/* harmony import */ var cardinfo_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var cardinfo_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var cardinfo_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CardinfoPageModule = (function () {
    function CardinfoPageModule() {
    }
    return CardinfoPageModule;
}());
CardinfoPageModule = cardinfo_module___decorate([
    cardinfo_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CardinfoPage,
        ],
        imports: [
            cardinfo_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CardinfoPage),
        ],
        exports: [
            CardinfoPage
        ]
    })
], CardinfoPageModule);

//# sourceMappingURL=cardinfo.module.js.map

/***/ })

});
//# sourceMappingURL=166.js.map