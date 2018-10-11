webpackJsonp([19],{

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoContactPageModule", function() { return PoContactPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__po_contact__ = __webpack_require__(755);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PoContactPageModule = (function () {
    function PoContactPageModule() {
    }
    return PoContactPageModule;
}());
PoContactPageModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__po_contact__["a" /* PoContactPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__po_contact__["a" /* PoContactPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__po_contact__["a" /* PoContactPage */]
        ]
    })
], PoContactPageModule);

//# sourceMappingURL=po-contact.module.js.map

/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallNumber; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @name Call Number
 * @description
 * Call a number directly from your Cordova/Ionic application.
 * **NOTE**: The iOS Simulator (and maybe Android Simulators) do not provide access to the phone subsystem.
 *
 * @usage
 * ```typescript
 * import { CallNumber } from '@ionic-native/call-number';
 *
 * constructor(private callNumber: CallNumber) { }
 *
 * ...
 *
 *
 * this.callNumber.callNumber("18001010101", true)
 *   .then(() => console.log('Launched dialer!'))
 *   .catch(() => console.log('Error launching dialer'));
 *
 * ```
 */
var CallNumber = (function (_super) {
    __extends(CallNumber, _super);
    function CallNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Calls a phone number
     * @param numberToCall {string} The phone number to call as a string
     * @param bypassAppChooser {boolean} Set to true to bypass the app chooser and go directly to dialer
     * @return {Promise<any>}
     */
    CallNumber.prototype.callNumber = function (numberToCall, bypassAppChooser) {
        return;
    };
    /**
     * Check if call feature is available
     * @return {Promise<any>}
     */
    CallNumber.prototype.isCallSupported = function () {
        return;
    };
    CallNumber.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    CallNumber.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            callbackOrder: 'reverse'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Boolean]),
        __metadata("design:returntype", Promise)
    ], CallNumber.prototype, "callNumber", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            callbackOrder: 'reverse'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], CallNumber.prototype, "isCallSupported", null);
    CallNumber = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'CallNumber',
            plugin: 'call-number',
            pluginRef: 'plugins.CallNumber',
            repo: 'https://github.com/Rohfosho/CordovaCallNumberPlugin',
            platforms: ['Android', 'iOS']
        })
    ], CallNumber);
    return CallNumber;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PoContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(744);
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
 * Generated class for the PoContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PoContactPage = (function () {
    function PoContactPage(navCtrl, navParams, callNumber, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.alertCtrl = alertCtrl;
        this.items = this.navParams.get('items');
    }
    PoContactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PoContactPage');
    };
    PoContactPage.prototype.calling = function (item) {
        var _this = this;
        if (item.phone != 'false' && item.phone != '') {
            var confirm_1 = this.alertCtrl.create({
                title: item.phone,
                buttons: [
                    {
                        text: '取消',
                        handler: function () {
                        }
                    },
                    {
                        text: '确定',
                        handler: function () {
                            _this.call(item.phone);
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    PoContactPage.prototype.call = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    return PoContactPage;
}());
PoContactPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-po-contact',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/po-contact/po-contact.html"*/'<!--\n  Generated template for the PoContactPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>联系电话</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group >\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-label style="font-weight:bold;margin-left:20px">供应商</ion-label>\n      <ion-list *ngFor=\'let item of items.supplier\'>\n        <ion-item ng-style="line-height:30px;">\n          <ion-label item-start style="font-size:85%">{{item.name}}</ion-label>\n          <ion-label item-end tappable (click) = "calling(item)" style="color:#55c4f5;font-size:85%;text-align:right;">{{item.phone}}</ion-label>\n        </ion-item>\n      </ion-list>\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-label style="font-weight:bold;margin-left:20px">仓库</ion-label>\n      <ion-list *ngFor=\'let item of items.ck\'>\n        <ion-item style="line-height:30px;">\n          <ion-label item-start style="font-size:85%">{{item.name}}</ion-label>\n          <ion-label item-end tappable (click) = "calling(item)" style="color:#55c4f5;font-size:85%;text-align:right;">{{item.phone}}</ion-label>\n        </ion-item>\n      </ion-list>\n\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-label style="font-weight:bold;margin-left:20px">生产</ion-label>\n    <ion-list *ngFor=\'let item of items.sc\'>\n      <ion-item >\n         <ion-label item-start style="font-size:85%">{{item.name}}</ion-label>\n        <ion-label item-end tappable (click) = "calling(item)" style="color:#55c4f5;font-size:85%;text-align:right;">{{item.phone}}</ion-label>\n       </ion-item>\n    </ion-list>\n\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-label style="font-weight:bold;margin-left:20px">品检</ion-label>\n    <ion-list *ngFor=\'let item of items.pj\'>\n      <ion-item >\n         <ion-label item-start style="font-size:85%">{{item.name}}</ion-label>\n        <ion-label item-end tappable (click) = "calling(item)" style="color:#55c4f5;font-size:85%;text-align:right;">{{item.phone}}</ion-label>\n       </ion-item>\n    </ion-list>\n\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-label style="font-weight:bold;margin-left:20px">采购</ion-label>\n    <ion-list *ngFor=\'let item of items.cg\'>\n      <ion-item >\n         <ion-label item-start style="font-size:85%">{{item.name}}</ion-label>\n        <ion-label item-end tappable (click) = "calling(item)" style="color:#55c4f5;font-size:85%;text-align:right;">{{item.phone}}</ion-label>\n       </ion-item>\n    </ion-list>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/po-contact/po-contact.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], PoContactPage);

//# sourceMappingURL=po-contact.js.map

/***/ })

});
//# sourceMappingURL=19.js.map