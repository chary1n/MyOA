webpackJsonp([119],{

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/xiansuo-detail/xiansuo-detail.ts
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
 * Generated class for the XiansuoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var XiansuoDetailPage = (function () {
    function XiansuoDetailPage(navCtrl, navParams, alertCtrl, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.callNumber = callNumber;
        this.items = navParams.get('items');
        var tag = this.items.tags.length > 0 ? this.items.tags[0] : "";
        var level = '';
        var priority = '';
        if (this.items.level == 1) {
            level = " 1st";
        }
        else if (this.items.level == 2) {
            level = " 2nd";
        }
        else if (this.items.level == 3) {
            level = " 3rd";
        }
        if (this.items.priority) {
            priority = " 星级:" + this.items.priority;
        }
        this.biaoqian = tag + level + priority;
    }
    XiansuoDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad XiansuoDetailPage');
    };
    XiansuoDetailPage.prototype.contact_detail = function () {
        this.navCtrl.push('ContactListPage', {
            contactList: this.items.contracts,
        });
    };
    XiansuoDetailPage.prototype.callPhone = function () {
        var _this = this;
        //  alert(this.items.phone);
        if (this.items.phone != 'false' && this.items.phone != '') {
            var confirm_1 = this.alertCtrl.create({
                title: this.items.phone,
                buttons: [
                    {
                        text: '取消',
                        handler: function () {
                        }
                    },
                    {
                        text: '确定',
                        handler: function () {
                            _this.call(_this.items.phone);
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    XiansuoDetailPage.prototype.call = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    return XiansuoDetailPage;
}());
XiansuoDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-xiansuo-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/xiansuo-detail/xiansuo-detail.html"*/'<!--\n  Generated template for the XiansuoDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>线索详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n<ion-item-group >\n    <ion-item-divider class="divider" color="light"></ion-item-divider>\n\n    <ion-item>\n      <ion-label class="left_label">公司</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">联系人</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.contact_name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">Email</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.email_from}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">职位</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.function}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">国家</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.country}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">地址</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.street}}</ion-label>\n    </ion-item>\n    <ion-item tappable (click)="callPhone()">\n      <ion-label class="left_label">电话</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="color:#55c4f5">{{items.phone}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">来源</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.crm_source_id}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">销售团队</ion-label>\n      <ion-label item-end class="right_label">{{items.team}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">销售员</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.saler}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">标签</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{biaoqian}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/xiansuo-detail/xiansuo-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */]])
], XiansuoDetailPage);

//# sourceMappingURL=xiansuo-detail.js.map
// CONCATENATED MODULE: ./src/pages/customer/xiansuo-detail/xiansuo-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XiansuoDetailPageModule", function() { return XiansuoDetailPageModule; });
/* harmony import */ var xiansuo_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var xiansuo_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var xiansuo_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var XiansuoDetailPageModule = (function () {
    function XiansuoDetailPageModule() {
    }
    return XiansuoDetailPageModule;
}());
XiansuoDetailPageModule = xiansuo_detail_module___decorate([
    xiansuo_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            XiansuoDetailPage,
        ],
        imports: [
            xiansuo_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(XiansuoDetailPage),
        ],
    })
], XiansuoDetailPageModule);

//# sourceMappingURL=xiansuo-detail.module.js.map

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

/***/ })

});
//# sourceMappingURL=119.js.map