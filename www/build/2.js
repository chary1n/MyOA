webpackJsonp([2],{

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/popover-order/popover-order.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_orderService__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__po_contact_po_contact__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__delivery_notes_delivery_notes__ = __webpack_require__(887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(745);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PopoverOrderPage = (function () {
    function PopoverOrderPage(viewCtrl, orderService, pocontactCtrl, deliveryCtrl, events) {
        this.viewCtrl = viewCtrl;
        this.orderService = orderService;
        this.pocontactCtrl = pocontactCtrl;
        this.deliveryCtrl = deliveryCtrl;
        this.events = events;
        this.id = viewCtrl.getNavParams().get('id');
    }
    PopoverOrderPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverOrderPage.prototype.click_phone = function () {
        var _this = this;
        this.orderService.get_contact_phone_number(this.id, "purchase.order").then(function (res) {
            var item_detai = res.result.res_data;
            if (item_detai) {
                _this.events.publish('click:purchase.order', item_detai);
            }
        });
    };
    PopoverOrderPage.prototype.delivery = function () {
        var _this = this;
        this.orderService.get_delivery_notes(this.id).then(function (res) {
            var item_detai = res.result.res_data;
            if (item_detai) {
                _this.events.publish('delivery', item_detai);
            }
        });
    };
    return PopoverOrderPage;
}());
PopoverOrderPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        template: "\n    <ion-list>\n      <button ion-item tappable (click)=\"click_phone()\">\u8054\u7CFB\u7535\u8BDD</button>\n      <button ion-item tappable (click)=\"delivery()\">\u9001\u8D27</button>\n    </ion-list>\n  ",
        providers: [__WEBPACK_IMPORTED_MODULE_2__order_orderService__["a" /* orderService */], __WEBPACK_IMPORTED_MODULE_3__po_contact_po_contact__["a" /* PoContactPage */], __WEBPACK_IMPORTED_MODULE_4__delivery_notes_delivery_notes__["a" /* DeliveryNotesPage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["G" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__order_orderService__["a" /* orderService */], __WEBPACK_IMPORTED_MODULE_3__po_contact_po_contact__["a" /* PoContactPage */], __WEBPACK_IMPORTED_MODULE_4__delivery_notes_delivery_notes__["a" /* DeliveryNotesPage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Events */]])
], PopoverOrderPage);

//# sourceMappingURL=popover-order.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/popover-order/popover-order.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverOrderPageModule", function() { return PopoverOrderPageModule; });
/* harmony import */ var popover_order_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var popover_order_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var popover_order_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopoverOrderPageModule = (function () {
    function PopoverOrderPageModule() {
    }
    return PopoverOrderPageModule;
}());
PopoverOrderPageModule = popover_order_module___decorate([
    popover_order_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PopoverOrderPage,
        ],
        imports: [
            popover_order_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PopoverOrderPage),
        ],
        exports: [
            PopoverOrderPage
        ]
    })
], PopoverOrderPageModule);

//# sourceMappingURL=popover-order.module.js.map

/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return orderService; });
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


var orderService = (function () {
    function orderService(httpservice) {
        this.httpservice = httpservice;
    }
    orderService.prototype.button_approve = function (po_id) {
        var body = JSON.stringify({
            po_id: po_id,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("button_approve", body);
    };
    orderService.prototype.get_to_approve_po = function () {
        var body = JSON.stringify({
            state: 'purchase',
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_to_approve_po", body);
    };
    // 采购订单
    orderService.prototype.requestIncomingOrder = function (moffset, mlimit) {
        var body = JSON.stringify({
            state: 'purchase',
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    // 询价单
    orderService.prototype.requestPriceOrder = function (moffset, mlimit) {
        var body = JSON.stringify({
            state: 'draft',
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    // make By MRp
    orderService.prototype.requestMakeOrderByMRP = function (moffset, mlimit) {
        var body = JSON.stringify({
            state: 'make_by_mrp',
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    // 获取订单详细
    orderService.prototype.requestOrderDetail = function (mid) {
        var body = JSON.stringify({
            id: mid,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_po", body);
    };
    //采购退货
    orderService.prototype.requestReturnOrder = function (moffset, mlimit) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_prma", body);
    };
    //采购退货详情
    orderService.prototype.requestReturnOrderDetail = function (mid) {
        var body = JSON.stringify({
            id: mid,
            user_id: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("get_prma", body);
    };
    //联系人
    orderService.prototype.get_contact_phone_number = function (id, model) {
        var body = JSON.stringify({
            id: id,
            model: model
        });
        return this.httpservice.postBody("get_contact_phone_number", body);
    };
    orderService.prototype.get_delivery_notes = function (id) {
        var body = JSON.stringify({
            id: id,
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    };
    orderService.prototype.get_purchase_delivery_notes = function (id) {
        var body = JSON.stringify({
            id: id,
            receive: 1,
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    };
    orderService.prototype.get_back_delivery_notes = function (id) {
        var body = JSON.stringify({
            id: id,
            prma: "1"
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    };
    orderService.prototype.search = function (pet, type, search_text) {
        if (pet == "1") {
            return this.orderSearchByPO1(search_text, type);
        }
        else if (pet == "2") {
            return this.orderSearchByPO2(search_text, type);
        }
        else if (pet == "3") {
            return this.orderSearchByPO3(search_text, type);
        }
        else if (pet == "4") {
            // return this.returnOrderSearchByPO(search_text,type)
        }
    };
    //  Mrp 查询
    orderService.prototype.orderSearchByPO1 = function (number, type) {
        var body = JSON.stringify({
            po_number: number,
            model: "purchase.order",
            state: "make_by_mrp",
            type: type
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    // 询价单
    orderService.prototype.orderSearchByPO2 = function (number, type) {
        var body = JSON.stringify({
            po_number: number,
            model: "purchase.order",
            state: "draft",
            type: type
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    // 采购订单
    orderService.prototype.orderSearchByPO3 = function (number, type) {
        var body = JSON.stringify({
            po_number: number,
            model: "purchase.order",
            state: "purchase",
            type: type
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    orderService.prototype.returnOrderSearchByPO = function (number) {
        var body = JSON.stringify({
            po_number: number,
            model: "return.goods",
            state: "return",
            type: "name"
        });
        return this.httpservice.postBody("search_purchase_order", body);
    };
    orderService.prototype.get_product_detail_by_id = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_product_detail_by_id", body);
    };
    return orderService;
}());
orderService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], orderService);

//# sourceMappingURL=orderService.js.map

/***/ }),

/***/ 745:
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

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PoContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(745);
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

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeliveryNotesPage; });
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
 * Generated class for the DeliveryNotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DeliveryNotesPage = (function () {
    function DeliveryNotesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = this.navParams.get('items');
        this.type = this.navParams.get('type');
    }
    DeliveryNotesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeliveryNotesPage');
    };
    DeliveryNotesPage.prototype.incoming_detail = function (item) {
        this.navCtrl.push('DeliveryNotesDetailPage', {
            item: item,
            type: this.type
        });
    };
    return DeliveryNotesPage;
}());
DeliveryNotesPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-delivery-notes',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/delivery-notes/delivery-notes.html"*/'<!--\n  Generated template for the DeliveryNotesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>单据列表</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list>\n    <ion-item *ngFor=\'let item of items\' tappable (click) = \'incoming_detail(item)\'>\n      <p> </p>\n      <h2 style="font-size:75%;font-weight:bold;font-size:75%;">{{item.name}}</h2>\n      <h4 style="font-size:70%">安排日期：{{item.min_date}}</h4>\n      <p style="font-size:70%">目的位置区域：{{item.to_location}}</p>\n      <p style="font-size:70%">合作伙伴：{{item.parnter_id}}</p>\n      <p style="font-size:70%">源单据：{{item.origin}}</p>\n      <p style="font-size:70%">欠单于：{{item.back_order_id}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/delivery-notes/delivery-notes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], DeliveryNotesPage);

//# sourceMappingURL=delivery-notes.js.map

/***/ })

});
//# sourceMappingURL=2.js.map