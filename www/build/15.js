webpackJsonp([15],{

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/supplier-detail/supplier-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supplier_list_supplierlistService__ = __webpack_require__(887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(744);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { ContactListPage} from './../contact-list/contact-list'

/**
 * Generated class for the SupplierDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SupplierDetailPage = (function () {
    function SupplierDetailPage(navCtrl, navParams, supplierService, alertCtrl, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.supplierService = supplierService;
        this.alertCtrl = alertCtrl;
        this.callNumber = callNumber;
        this.show_type = "one";
        this.items = navParams.get('items');
        if (this.items.category.length == 1) {
            this.category = this.items.category[0];
        }
        else if (this.items.category.length == 2) {
            this.category = this.items.category[0] + '、' + this.items.category[1];
        }
        else {
            this.category = '';
        }
        this.area = this.items.street[0].continent;
        console.log(this.items);
    }
    SupplierDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SupplierDetailPage');
        this.limit = 20;
        this.offset = 0;
    };
    SupplierDetailPage.prototype.contact_detail = function () {
        console.log(this.items.contracts);
        this.navCtrl.push('ContactListPage', {
            contactList: this.items.contracts,
        });
    };
    SupplierDetailPage.prototype.callPhone = function (number) {
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
        else {
            var confirm_2 = this.alertCtrl.create({
                title: "该供应商没有录入手机号",
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                        }
                    }
                ]
            });
            confirm_2.present();
        }
    };
    SupplierDetailPage.prototype.call = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    SupplierDetailPage.prototype.click_one = function () {
        this.show_type = "one";
    };
    SupplierDetailPage.prototype.click_two = function () {
        this.show_type = "two";
        console.log(this.items.contracts);
    };
    return SupplierDetailPage;
}());
SupplierDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-supplier-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/supplier-detail/supplier-detail.html"*/'<!--\n  Generated template for the SupplierDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{items.name}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-grid style="margin-top:0px;width:100%;background:white" class="grid_header">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "createInfo()">\n         <div align="center" style="margin-top:10px">\n          <!--<img style="width:44px;" src="assets/img/write_message.png"><br>\n          <p style="color:#5bc5f3">新增记录</p>-->\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "callPhone()">\n        <div align="center" style="margin-top:10px">\n         <img  style="width:44px;" src="assets/img/call_phone.png"><br>\n          <p style="color:#5bc5f3">打电话</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "sendEmail()">\n        <div align="center" >\n         <!--<img style="width:44px;" src="assets/img/send_email.png"><br>\n          <p style="color:#5bc5f3">发邮件</p> -->\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n  <!--<ion-grid class="grid_header">\n<ion-row class="row_class" align-items-center>\n      <ion-col >\n         <div class="first_div" >\n          <h3>订单</h3><br>\n          <h2>{{items.purchase_order_count}}</h2>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div class="first_div" >\n          <h3>对账</h3><br>\n          <h2>{{items.invoice}}</h2>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div class="first_div" >\n          <h3>付款</h3><br>\n          <h2>{{items.payment_count}}</h2> \n        </div>\n      </ion-col>\n      <ion-col>\n        <div class="first_div">\n          <h3>入库</h3><br>\n          <h2>{{items.put_in_storage}}</h2> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>-->\n<ion-item align="center" no-lines style="height:40px;border-width:0.5px;border-color:lightgray;border-style:solid;width:101%;margin-left:-2px;margin-right:-4px;margin-top:-10px">\n    <ion-grid *ngIf="show_type == \'one\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col>\n         <div align="center" >\n          <p class="test_one">基本信息</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p>联系人&地址</p>\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n\n  <ion-grid *ngIf="show_type == \'two\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p>基本信息</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center">\n          <p class="test_two">联系人&地址</p>\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-item>\n<ion-grid *ngIf="show_type == \'one\'" class="row_class" style="background:white;height:100px;">\n  <ion-row align-items-center>\n      <ion-col>\n         <div align="center">\n          <p class="first_class">{{items.purchase_order_count}}</p>\n          <p  class="second_class">采购订单</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center">\n         <p class="first_class">{{items.put_in_storage}}</p>\n          <p text-wrap class="second_class">采购确认</p>\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n\n<ion-item-group  *ngIf = "show_type == \'two\'" >\n    <ion-item *ngFor=\'let item of items.contracts\'>\n       <span style="font-weight:bold;margin-top:10px">{{item.name}}</span>\n       <span ion-button  style="background-color:#c9c9c9;color:gray;margin-top:-4px;background-color:white;color:#5bc5f3;border-color:#5bc5f3;border-width:1px;border-style:solid;" small>{{item.type[1]}}</span>\n      <p *ngIf = "item.type[1] != \'Contact\' && item.type[1] != \'联系人\'">地址：{{item.street}}</p>\n      <p *ngIf = "item.function">工作岗位：{{item.function}}</p>\n      <p>Email：{{item.email}}</p>\n      <p>电话：{{item.phone}}</p>\n    </ion-item>\n  </ion-item-group>\n\n<!--<ion-item-group>\n  <ion-item-divider item-height="20" color="light"></ion-item-divider>\n  <ion-item tappable (click) = \'contact_detail()\'>\n      <ion-label class="left_label">联系人&地址</ion-label>\n      <ion-label class="right_label" item-end>{{items.contracts_count}} ></ion-label>\n    </ion-item>\n</ion-item-group>-->\n<ion-item-group style="margin-top:10px" *ngIf = "show_type == \'one\'">\n    <!--<ion-item-divider class="divider" color="light"></ion-item-divider>-->\n    <ion-item>\n      <ion-label class="left_label">公司</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">地址</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{area}}</ion-label>\n    </ion-item>\n    <ion-item tappable (click)="callPhone(\'15751158935\')">\n      <ion-label class="left_label">电话</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="color:#55c4f5">{{items.phone}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">Email</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="color:#55c4f5">{{items.email}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">网站</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.website}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">语言</ion-label>\n      <ion-label item-end class="right_label">{{items.lang}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">快递账号</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.express_sample_record}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n\n  \n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/supplier-detail/supplier-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__supplier_list_supplierlistService__["a" /* SupplierlistService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__supplier_list_supplierlistService__["a" /* SupplierlistService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */]])
], SupplierDetailPage);

//# sourceMappingURL=supplier-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/supplier-detail/supplier-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierDetailPageModule", function() { return SupplierDetailPageModule; });
/* harmony import */ var supplier_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var supplier_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var supplier_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SupplierDetailPageModule = (function () {
    function SupplierDetailPageModule() {
    }
    return SupplierDetailPageModule;
}());
SupplierDetailPageModule = supplier_detail_module___decorate([
    supplier_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            SupplierDetailPage,
        ],
        imports: [
            supplier_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(SupplierDetailPage),
        ],
        exports: [
            SupplierDetailPage
        ]
    })
], SupplierDetailPageModule);

//# sourceMappingURL=supplier-detail.module.js.map

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

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierlistService; });
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


var SupplierlistService = (function () {
    function SupplierlistService(httpservice) {
        this.httpservice = httpservice;
    }
    SupplierlistService.prototype.getSupplierList = function (mlimit, moffset) {
        var body = JSON.stringify({
            limit: mlimit,
            offset: moffset
        });
        return this.httpservice.postBody("get_supplier", body);
    };
    SupplierlistService.prototype.getSupplierDetai = function (limit, offset, id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            id: id,
        });
        return this.httpservice.postBody("get_supplier", body);
    };
    SupplierlistService.prototype.searchSupplier = function (name) {
        var body = JSON.stringify({
            name: name,
        });
        return this.httpservice.postBody("search_supplier", body);
    };
    return SupplierlistService;
}());
SupplierlistService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], SupplierlistService);

//# sourceMappingURL=supplierlistService.js.map

/***/ })

});
//# sourceMappingURL=15.js.map