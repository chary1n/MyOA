webpackJsonp([11],{

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/customer-detail/customer-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CustomerService__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_web_intent__ = __webpack_require__(255);
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
 * Generated class for the CustomerDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerDetailPage = (function () {
    function CustomerDetailPage(navCtrl, navParams, alertCtrl, callNumber, appAvailability, platform, customerService, webintent) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.callNumber = callNumber;
        this.appAvailability = appAvailability;
        this.platform = platform;
        this.customerService = customerService;
        this.webintent = webintent;
        this.items = navParams.get('items');
        var index = 0;
        for (var _i = 0, _a = this.items.message_ids; _i < _a.length; _i++) {
            var item = _a[_i];
            // console.log(new Date(item.date.replace(' ','T')+'Z').getTime())
            // let newDate = new Date(item.date.replace(' ','T')+'Z').getTime()+8*3600;
            item.date = new Date(item.date.replace(' ', 'T') + 'Z').getTime();
            this.items.message_ids[index] = item;
            // item.body = item.body.compile()
            index++;
        }
        this.show_type = "one";
        var tag = '';
        if (this.items.tag.length == 1) {
            tag = this.items.tag[0];
        }
        else if (this.items.tag.length == 2) {
            tag = this.items.tag[0] + "/" + this.items.tag[1];
        }
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
        if (this.items.product_series.length > 0) {
            var index_1 = 0;
            var name_1 = '';
            for (var _b = 0, _c = this.items.product_series; _b < _c.length; _b++) {
                var item_pro = _c[_b];
                if (name_1 != '') {
                    name_1 = name_1 + ',' + item_pro.name;
                }
                else {
                    name_1 = item_pro.name;
                }
                index_1++;
            }
            this.productName = name_1;
        }
    }
    CustomerDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerDetailPage');
    };
    CustomerDetailPage.prototype.contact_detail = function () {
        this.navCtrl.push('ContactListPage', {
            contactList: this.items.contracts,
        });
    };
    CustomerDetailPage.prototype.ionViewDidEnter = function () {
        console.log(this.navParams);
        if (this.navParams.get('need_fresh') == true) {
            this.reload_info();
            this.navParams.data.need_fresh = false;
        }
    };
    CustomerDetailPage.prototype.callPhone = function () {
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
                            _this.customerService.get_all_message_label().then(function (res) {
                                console.log(res);
                                if (res.result.res_code == 1) {
                                    var result_arr = ["question"];
                                    for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                        var item = _a[_i];
                                        if (item.name == "电话") {
                                            result_arr.push(item.id);
                                            var obj = {
                                                body: "<p>" + "电话:" + _this.items.phone + "</p>",
                                                res_id: _this.items.id,
                                                create_uid: _this.create_uid,
                                                message_label_ids: result_arr,
                                                author_id: _this.author_id,
                                            };
                                            console.log(obj);
                                            _this.customerService.createInfo(obj).then(function (res) {
                                                console.log(res);
                                                if (res) {
                                                    if (res.result.res_data.success == 1) {
                                                        _this.reload_info();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            var confirm_2 = this.alertCtrl.create({
                title: "该客户没有录入手机号",
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
    CustomerDetailPage.prototype.call = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    CustomerDetailPage.prototype.click_one = function () {
        this.show_type = "one";
    };
    CustomerDetailPage.prototype.click_two = function () {
        this.show_type = "two";
    };
    CustomerDetailPage.prototype.click_three = function () {
        this.show_type = "three";
    };
    CustomerDetailPage.prototype.sendEmail = function () {
        this.openAppWith('alicloudmail://', 'com.alibaba.cloudmail');
    };
    CustomerDetailPage.prototype.openAppWith = function (ios_bundle_id, android_bundle_id) {
        var app;
        if (this.platform.is('ios')) {
            app = ios_bundle_id;
        }
        else if (this.platform.is('android')) {
            var sApp = startApp.set({
                "component": ["com.alibaba.cloudmail", "com.alibaba.alimei.activity.Welcome"]
            });
            sApp.start(function () {
                console.log("OK");
            }, function (error) {
                alert("请先下载阿里邮箱");
            });
            return;
        }
        var ctrl = this.alertCtrl;
        this.appAvailability.check(app).then(function () {
            var browser = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]();
            browser.create(app, '_system', 'location=yes');
            // window.open('camcard://','_system',  'location=yes');
        }, function () {
            console.log('1');
            ctrl.create({
                title: '提示',
                subTitle: "请先下载阿里邮箱",
                buttons: [
                    {
                        text: '取消',
                        handler: function () {
                        }
                    }, {
                        text: '跳转下载',
                        handler: function () {
                            var browser = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]();
                            browser.create('https://itunes.apple.com/cn/app/a-li-you-xiang/id923828102?mt=8');
                        }
                    }
                ]
            }).present();
        });
    };
    CustomerDetailPage.prototype.createInfo = function () {
        this.navCtrl.push('CreateInfoPage', {
            res_id: this.items.id,
        });
    };
    CustomerDetailPage.prototype.call_contact = function (item) {
        var _this = this;
        if (item.phone != 'false' && item.phone != '') {
            var confirm_3 = this.alertCtrl.create({
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
                            console.log("start");
                            _this.customerService.get_all_message_label().then(function (res) {
                                console.log(res);
                                if (res.result.res_code == 1) {
                                    var result_arr = ["question"];
                                    for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                                        var item_1 = _a[_i];
                                        if (item_1.name == "电话") {
                                            result_arr.push(item_1.id);
                                            var obj = {
                                                body: "<p>" + "电话:" + item_1.phone + "</p>",
                                                res_id: _this.items.id,
                                                create_uid: _this.create_uid,
                                                message_label_ids: result_arr,
                                                author_id: _this.author_id,
                                            };
                                            console.log(obj);
                                            _this.customerService.createInfo(obj).then(function (res) {
                                                console.log(res);
                                                if (res) {
                                                    if (res.result.res_data.success == 1) {
                                                        _this.reload_info();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                            _this.call(item.phone);
                        }
                    }
                ]
            });
            confirm_3.present();
        }
    };
    CustomerDetailPage.prototype.reload_info = function () {
        var _this = this;
        this.customerService.customer_details(this.items.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.items = res.result.res_data;
                var index = 0;
                for (var _i = 0, _a = _this.items.message_ids; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.date = new Date(item.date.replace(' ', 'T') + 'Z').getTime();
                    _this.items.message_ids[index] = item;
                    index++;
                }
            }
        });
    };
    return CustomerDetailPage;
}());
CustomerDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-customer-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/customer-detail/customer-detail.html"*/'<!--\n  Generated template for the CustomerDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{items.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-grid style="margin-top:10px;width:80%;" class="grid_header">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "createInfo()">\n         <div align="center">\n          <img style="width:44px;" src="assets/img/write_message.png"><br>\n          <p style="color:#5bc5f3">新增记录</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "callPhone()">\n        <div align="center">\n         <img  style="width:44px;" src="assets/img/call_phone.png"><br>\n          <p style="color:#5bc5f3">打电话</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "sendEmail()">\n        <div align="center" >\n         <img style="width:44px;" src="assets/img/send_email.png"><br>\n          <p style="color:#5bc5f3">发邮件</p> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n\n<ion-item align="center" no-lines style="height:40px;border-width:0.5px;border-color:lightgray;border-style:solid;width:101%;margin-left:-2px;margin-right:-4px;margin-top:-10px">\n    <ion-grid *ngIf="show_type == \'one\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col>\n         <div align="center" >\n          <p class="test_one">基本信息</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p>联系人&地址</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_three()">\n        <div align="center" >\n          <p>跟进记录</p> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n\n  <ion-grid *ngIf="show_type == \'two\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p>基本信息</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center">\n          <p class="test_two">联系人&地址</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_three()">\n        <div align="center" >\n          <p>跟进记录</p> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n\n  <ion-grid *ngIf="show_type == \'three\'">\n<ion-row class="row_class" align-items-center>\n      <ion-col tappable (click) = "click_one()">\n         <div align="center" >\n          <p>基本信息</p>\n        </div>\n      </ion-col>\n      <ion-col tappable (click) = "click_two()">\n        <div align="center">\n          <p>联系人&地址</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center" >\n          <p class="test_three">跟进记录</p> \n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-item>\n\n  <ion-grid  style="width:70%;" *ngIf="show_type == \'one\'">\n    <ion-row class="row_class" align-items-center>\n      <ion-col>\n         <div align="center" >\n          <h2 style="color:#55c4f5">{{items.purchase_count}}</h2>\n          <p style="color:gray">订单</p>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div align="center">\n          <h2 style="color:#55c4f5">{{items.supplier}}</h2>\n          <p style="color:gray">对账</p>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n<ion-item-group class="group_bottom" *ngIf="show_type == \'one\'">\n    <ion-item>\n      <ion-label class="left_label">公司</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">国家</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.country}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">地址</ion-label>\n      <ion-label text-wrap class="right_label" item-end>{{items.address}}</ion-label>\n    </ion-item>\n    <ion-item tappable (click)="callPhone()">\n      <ion-label class="left_label">电话</ion-label>\n      <ion-label text-wrap item-end class="right_label" style="color:#55c4f5">{{items.phone}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">来源</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.crm_source}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">渠道</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.source}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">销售团队</ion-label>\n      <ion-label item-end class="right_label">{{items.team}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">销售员</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{items.user_id}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">标签</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{biaoqian}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">感兴趣的产品</ion-label>\n      <ion-label text-wrap item-end class="right_label">{{productName}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n\n  <ion-item-group *ngIf = "show_type == \'two\'" style="background-color:#f2f2f2">\n    <ion-item no-lines style="margin-top:10px;" *ngFor=\'let item of items.contracts\'>\n      <img style="width:20px;margin-top:-60px;" item-start src="assets/img/user_avater.png">\n      <button ion-button style="background-color:white;color:#55c4f5;border-color:#55c4f5;border-width:1px;border-style:solid;margin-left:10px;" small>{{item.type[1]}}</button>\n      <p style="font-size:15px;color:black;float:left;margin-top:7px;">{{item.name}}</p>\n      <p style="margin-top:3px;">地址：{{item.street}}</p>\n      <p >Email：{{item.email}}</p>\n      <p tappable (click) = "call_contact(item)">电话：{{item.phone}}</p>\n    </ion-item>\n  </ion-item-group>\n\n  <ion-item-group *ngIf = "show_type == \'three\'" style="background-color:#f2f2f2">\n    <ion-item *ngFor=\'let item of items.message_ids\' no-lines style="margin-top:10px;">\n      <img style="width:5;" item-start src="">\n      <p style="float:right;margin-top:3px;">{{item.date | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n      <p style="font-size:15px;color:black;">{{item.create_uid[0].name}}</p>\n     <!--<ion-item class="div_test" style="width:200px;">-->\n       <!--<ion-label text-wrap>{{item.body}}</ion-label>-->\n      <p text-wrap style="margin-top:3px;width:100%;">{{item.body}}</p>\n        <!--{{item.body}}-->\n      \n        <!--<javascript >{{item.body}}</javascript>-->\n     <!--</ion-item>-->\n      <!--<javascript >{{item.body}}</javascript>-->\n    </ion-item>\n  </ion-item-group>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/customer-detail/customer-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_5__CustomerService__["a" /* CustomerService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_web_intent__["a" /* WebIntent */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__["a" /* AppAvailability */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__CustomerService__["a" /* CustomerService */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_web_intent__["a" /* WebIntent */]])
], CustomerDetailPage);

//# sourceMappingURL=customer-detail.js.map
// CONCATENATED MODULE: ./src/pages/customer/customer-detail/customer-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerDetailPageModule", function() { return CustomerDetailPageModule; });
/* harmony import */ var customer_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var customer_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var customer_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerDetailPageModule = (function () {
    function CustomerDetailPageModule() {
    }
    return CustomerDetailPageModule;
}());
CustomerDetailPageModule = customer_detail_module___decorate([
    customer_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CustomerDetailPage,
        ],
        imports: [
            customer_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CustomerDetailPage),
        ],
        exports: [
            CustomerDetailPage
        ]
    })
], CustomerDetailPageModule);

//# sourceMappingURL=customer-detail.module.js.map

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

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerService; });
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


var CustomerService = (function () {
    function CustomerService(httpservice) {
        this.httpservice = httpservice;
    }
    CustomerService.prototype.customer_details = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("customer_details", body);
    };
    CustomerService.prototype.curstomer_clues_details = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_clue_details", body);
    };
    //获取线索
    CustomerService.prototype.get_clues = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_clues", body);
    };
    //潜在客户
    CustomerService.prototype.getQianZaiCustomer = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            is_order: "False",
            public_partners: "!=",
            user_id: user_id,
        });
        return this.httpservice.postBody("get_customers", body);
    };
    //客户
    CustomerService.prototype.getNormalCustomer = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            is_order: "True",
            user_id: user_id
        });
        return this.httpservice.postBody("get_customers", body);
    };
    //公海客户
    CustomerService.prototype.getPublicCustomer = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            public_partners: "=",
            user_id: user_id
        });
        return this.httpservice.postBody("get_customers", body);
    };
    CustomerService.prototype.searchClues = function (mName, mId) {
        var body = JSON.stringify({
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_clues", body);
    };
    CustomerService.prototype.searchHiddenCustomer = function (mName, mId) {
        var body = JSON.stringify({
            type: "not_public",
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_customer", body);
    };
    CustomerService.prototype.searchNormalCustomer = function (mName, mId) {
        var body = JSON.stringify({
            type: "simple",
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_customer", body);
    };
    CustomerService.prototype.searchPublicCustomer = function (mName, mId) {
        var body = JSON.stringify({
            type: "public",
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_customer", body);
    };
    CustomerService.prototype.createInfo = function (obj) {
        var body = JSON.stringify({
            body: obj.body,
            res_id: obj.res_id,
            message_label_ids: obj.message_label_ids,
            author_id: obj.author_id,
            create_uid: obj.create_uid,
        });
        return this.httpservice.postBody("create_info", body);
    };
    CustomerService.prototype.get_all_message_label = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_message_label", body);
    };
    return CustomerService;
}());
CustomerService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], CustomerService);

//# sourceMappingURL=CustomerService.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppAvailability; });
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
 * @name App Availability
 * @description
 * This plugin allows you to check if an app is installed on the user's device. It requires an URI Scheme (e.g. twitter://) on iOS or a Package Name (e.g com.twitter.android) on Android.
 *
 * Requires Cordova plugin: cordova-plugin-appavailability. For more info, please see the [AppAvailability plugin docs](https://github.com/ohh2ahh/AppAvailability).
 *
 * @usage
 * ```typescript
 * import { AppAvailability } from '@ionic-native/app-availability';
 * import { Platform } from 'ionic-angular';
 *
 * constructor(private appAvailability: AppAvailability, private platform: Platform) { }
 *
 * ...
 *
 * let app;
 *
 * if (this.platform.is('ios')) {
 *   app = 'twitter://';
 * } else if (this.platform.is('android')) {
 *   app = 'com.twitter.android';
 * }
 *
 * this.appAvailability.check(app)
 *   .then(
 *     (yes: string) => console.log(app + ' is available'),
 *     (no: string) => console.log(app + ' is NOT available')
 *   );
 * ```
 */
var AppAvailability = (function (_super) {
    __extends(AppAvailability, _super);
    function AppAvailability() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks if an app is available on device
     * @param {string} app Package name on android, or URI scheme on iOS
     * @returns {Promise<boolean>}
     */
    AppAvailability.prototype.check = function (app) { return; };
    AppAvailability.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    AppAvailability.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AppAvailability.prototype, "check", null);
    AppAvailability = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'AppAvailability',
            plugin: 'cordova-plugin-appavailability',
            pluginRef: 'appAvailability',
            repo: 'https://github.com/ohh2ahh/AppAvailability',
            platforms: ['Android', 'iOS']
        })
    ], AppAvailability);
    return AppAvailability;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=11.js.map