webpackJsonp([20],{

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/pay-request-auto.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentAutoService = (function () {
    function PaymentAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    PaymentAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var obj2 = {
            name: "",
            id: 2,
        };
        var obj3 = {
            name: "",
            id: 3,
        };
        var arr = [];
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 创建人：" + keyword;
        arr.push(obj2);
        obj3.name = "搜 合作伙伴：" + keyword;
        arr.push(obj3);
        return arr;
    };
    return PaymentAutoService;
}());
PaymentAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], PaymentAutoService);

//# sourceMappingURL=pay-request-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/pay-two-request-auto.ts
/* harmony import */ var pay_two_request_auto___WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var pay_two_request_auto___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var pay_two_request_auto___WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(240);
/* harmony import */ var pay_two_request_auto___WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(pay_two_request_auto___WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var pay_two_request_auto___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var pay_two_request_auto___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentTwoAutoService = (function () {
    function PaymentTwoAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    PaymentTwoAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var obj2 = {
            name: "",
            id: 2,
        };
        var arr = [];
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 申请人：" + keyword;
        arr.push(obj2);
        return arr;
    };
    return PaymentTwoAutoService;
}());
PaymentTwoAutoService = pay_two_request_auto___decorate([
    pay_two_request_auto___WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    pay_two_request_auto___metadata("design:paramtypes", [pay_two_request_auto___WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], PaymentTwoAutoService);

//# sourceMappingURL=pay-two-request-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/pay-request.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pay_requestService__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(67);
var pay_request___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var pay_request___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the PayRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PayRequestPage = (function () {
    function PayRequestPage(navCtrl, navParams, paymentService, storage, paymentAutoService, paymentTwoAutoService, statusBar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.paymentService = paymentService;
        this.storage = storage;
        this.paymentAutoService = paymentAutoService;
        this.paymentTwoAutoService = paymentTwoAutoService;
        this.statusBar = statusBar;
        this.isMoreData = true;
        this.is_plus = false;
        this.is_manager = false;
        this.need_all = false;
        this.count = 0;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.pet = "2";
        this.waitMeTitle = "待我审批";
        this.storage.get('user')
            .then(function (res) {
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == 'purchase_manager_plus') {
                    _this.is_plus = true;
                }
                else if (product.name == 'purchase_manager_1') {
                    _this.is_manager = true;
                }
            }
            if (_this.is_plus && _this.is_manager) {
                _this.need_all = true;
            }
            _this.user_id = res.result.res_data.user_id;
            _this.limit = 20;
            _this.offset = 0;
            _this.paymentService.get_payment_request_list("wait_me", _this.limit, _this.offset, _this.user_id, _this.is_plus, _this.need_all).then(function (res) {
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.waitMeList = res.result.res_data;
                    _this.count = res.result.res_data.length;
                    if (res.result.res_data.length) {
                        _this.waitMeTitle = "待我审批(" + res.result.res_data.length + ")";
                    }
                    else {
                        _this.waitMeTitle = "待我审批(0)";
                        _this.count = 0;
                    }
                }
                else {
                    _this.waitMeList = [];
                    _this.waitMeTitle = "待我审批(0)";
                    _this.count = 0;
                }
            });
        });
    }
    PayRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PayRequestPage');
    };
    PayRequestPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.navParams);
        if (this.navParams.get('need_fresh') == true) {
            this.navParams.data.need_fresh = false;
            this.paymentService.get_payment_request_list("wait_me", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.waitMeList = res.result.res_data;
                    _this.count = res.result.res_data.length;
                    if (res.result.res_data.length) {
                        _this.waitMeTitle = "待我审批(" + res.result.res_data.length + ")";
                    }
                    else {
                        _this.waitMeTitle = "待我审批(0)";
                        _this.count = 0;
                    }
                }
                else {
                    _this.waitMeList = [];
                    _this.waitMeTitle = "待我审批(0)";
                    _this.count = 0;
                }
            });
        }
    };
    PayRequestPage.prototype.clickMyApply = function () {
        var _this = this;
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        this.paymentService.get_payment_request_list("me", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
            console.log(res.result.res_data.length);
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.meList = res.result.res_data;
            }
            else {
                _this.meList = [];
            }
        });
    };
    PayRequestPage.prototype.clickWaitMeApply = function () {
        var _this = this;
        this.pet = "2";
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        this.paymentService.get_payment_request_list("wait_me", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.waitMeList = res.result.res_data;
                _this.count = res.result.res_data.length;
                if (res.result.res_data.length) {
                    _this.waitMeTitle = "待我审批(" + res.result.res_data.length + ")";
                }
                else {
                    _this.waitMeTitle = "待我审批(0)";
                    _this.count = 0;
                }
            }
            else {
                _this.waitMeList = [];
                _this.waitMeTitle = "待我审批(0)";
                _this.count = 0;
            }
        });
    };
    PayRequestPage.prototype.clickAlreadyApply = function () {
        var _this = this;
        this.pet = "3";
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        this.paymentService.get_payment_request_list("already", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
            // console.log(res.result.res_data.length)
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.alreadyList = res.result.res_data;
            }
            else {
                _this.alreadyList = [];
            }
        });
    };
    PayRequestPage.prototype.clickMe = function (item) {
        this.navCtrl.push('PayRequestDetailPage', {
            item: item,
        });
    };
    PayRequestPage.prototype.clickEdit = function (item) {
        this.navCtrl.push('PayRequestDetailPage', {
            item: item,
        });
    };
    PayRequestPage.prototype.clickALready = function (item) {
        this.navCtrl.push('PayRequestDetailPage', {
            item: item,
        });
    };
    PayRequestPage.prototype.doRefresh = function (refresh) {
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        if (this.pet == "1") {
            this.clickMyApply();
            refresh.complete();
        }
        else if (this.pet == "2") {
            this.clickWaitMeApply();
            refresh.complete();
        }
        else if (this.pet == "3") {
            this.clickAlreadyApply();
            refresh.complete();
        }
    };
    PayRequestPage.prototype.doInfinite = function (infinite) {
        var _this = this;
        if (this.isMoreData == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            if (this.pet == "1") {
                this.paymentService.get_payment_request_list("me", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
                    var item_data = [];
                    console.log(res);
                    if (res.result.res_data) {
                        item_data = res.result.res_data;
                        if (item_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, item_data_1 = item_data; _i < item_data_1.length; _i++) {
                            var item = item_data_1[_i];
                            _this.meList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    infinite.complete();
                });
            }
            if (this.pet == "2") {
                this.paymentService.get_payment_request_list("wait_me", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
                    var item_data = [];
                    if (res.result.res_data) {
                        item_data = res.result.res_data;
                        if (item_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, item_data_2 = item_data; _i < item_data_2.length; _i++) {
                            var item = item_data_2[_i];
                            _this.waitMeList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    infinite.complete();
                });
            }
            else if (this.pet == "3") {
                this.paymentService.get_payment_request_list("already", this.limit, this.offset, this.user_id, this.is_plus, this.need_all).then(function (res) {
                    var item_data = [];
                    if (res.result.res_data) {
                        item_data = res.result.res_data;
                        if (item_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, item_data_3 = item_data; _i < item_data_3.length; _i++) {
                            var item = item_data_3[_i];
                            _this.alreadyList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    infinite.complete();
                });
            }
        }
        else {
            infinite.complete();
        }
    };
    PayRequestPage.prototype.itemSelected = function (event) {
        var _this = this;
        var search_text;
        var payment_type;
        var search_type;
        var search_domain;
        var need_all = false;
        if (event.id == 1) {
            search_text = event.name.replace("搜 单号：", "");
            search_domain = "name";
        }
        else if (event.id == 2) {
            search_text = event.name.replace("搜 创建人：", "");
            search_domain = "create_uid";
        }
        else if (event.id == 3) {
            search_text = event.name.replace("搜 合作伙伴：", "");
            search_domain = "partner_id";
        }
        if (this.pet == "1") {
            payment_type = "me";
            search_type = "";
        }
        else if (this.pet == "2") {
            payment_type = "wait_me";
            search_type = this.is_plus ? "need" : "no_need";
            need_all = this.need_all ? true : false;
        }
        else {
            payment_type = "already";
            search_type = "";
        }
        this.paymentService.search_payment(search_text, payment_type, this.user_id, search_type, search_domain, need_all).then(function (res) {
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.isMoreData = false;
                if (_this.pet == "1") {
                    _this.meList = res.result.res_data;
                }
                else if (_this.pet == "2") {
                    _this.waitMeList = res.result.res_data;
                }
                else {
                    _this.alreadyList = res.result.res_data;
                    ;
                }
            }
            else {
                _this.meList = [];
            }
        });
    };
    PayRequestPage.prototype.changeState = function (item) {
        var state = "";
        if (item == "draft") {
            state = "草稿";
        }
        else if (item == "posted") {
            state = "提交";
        }
        else if (item == "confirm") {
            state = "确认";
        }
        else if (item == "manager") {
            state = "经理审核";
        }
        else if (item == "done") {
            state = "完成";
        }
        else if (item == "cancel") {
            state = "取消";
        }
        return state;
    };
    PayRequestPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    return PayRequestPage;
}());
PayRequestPage = pay_request___decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-pay-request',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/pay-request/pay-request.html"*/'<!--\n  Generated template for the PayRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>付款审核</ion-title>\n  </ion-navbar>\n  <!--<ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet">\n      <ion-segment-button tappable (click)=\'clickWaitMeApply()\' value="2">\n        {{waitMeTitle}}\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickAlreadyApply()\' value="3">\n        我已审批\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>-->\n<ion-grid style="background-color:#2597ec;height:40px;">\n  <ion-row class="row_class" align-items-center>\n      <ion-col tappable (click)=\'clickWaitMeApply()\'>\n         <div align="center">\n          <p [ngClass]="{true:\'select\',false:\'un_select\'}[pet == 2]">待我审批</p>\n          <span *ngIf="count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:25%;top:-2px;text-align:center;font-size:14px">{{count}}</span>\n\n        </div>\n      </ion-col>\n      <ion-col tappable (click)=\'clickAlreadyApply()\'>\n        <div align="center">\n          <p [ngClass]="{true:\'select\',false:\'un_select\'}[pet == 3]">我已审批</p>\n        </div>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <div [ngSwitch]="pet">\n\n<ng-template [ngSwitchCase]=\'2\'>\n      <ion-auto-complete style="width: 94vw;margin-left:3vw;" (itemSelected)="itemSelected($event)" [dataProvider]="paymentAutoService"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n  <ion-item-group style="background-color:#f2f2f2;margin-top:-10px">\n    <ion-item no-lines style="margin-top:10px;height:90px;min-height:90px" *ngFor=\'let item of waitMeList\' tappable (click) = "clickMe(item)">\n      <p style="float:right;color:#fd9f89;font-size:12px;margin-top:3px">{{changeState(item.state)}}</p>\n      <p style="font-size:16px;color:black;">{{item.name}}</p>      \n      <!--<p style="font-size:13px;float:right;margin-top:3px;">¥{{item.amount}}</p>-->\n      <p style="margin-top:3px;font-size:13px;height:22px">合作伙伴：{{item.parent_id.name}}</p>     \n      <!--</ion-item>-->\n      <div style="height:30px;min-height:30px;border-top:1px #f0f2f5 solid">\n          <p  style="margin-top:10px;float:right;font-size:12px;color:#bbc2cc">申请金额：¥{{item.amount}}</p>\n          <p ion-start style="margin-top:10px;font-size:12px;color:#bbc2cc">{{item.create_uid.name}} {{item.create_date}}</p>   \n      </div>\n    </ion-item>\n  </ion-item-group>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ng-template>\n\n  <ng-template [ngSwitchCase]=\'3\'>\n      <ion-auto-complete style="width: 94vw;margin-left:3vw;" (itemSelected)="itemSelected($event)" [dataProvider]="paymentAutoService"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n  <ion-item-group style="background-color:#f2f2f2;margin-top:-10px">\n    <ion-item no-lines style="margin-top:10px;height:90px;min-height:90px" *ngFor=\'let item of alreadyList\' tappable (click) = "clickMe(item)">\n      <!--<ion-item lines style="height:50px;min-height:50px;">-->\n      <p style="float:right;color:#fd9f89;font-size:12px;margin-top:3px">{{changeState(item.state)}}</p>\n      <!--<button ion-button style="background-color:clear;color:clear;border-color:clear;border-width:0px;margin-left:10px;" small></button>-->\n      <p style="font-size:16px;color:black;">{{item.name}}</p>      \n      <!--<p style="margin-top:3px;">创建人：{{item.create_uid.name}} {{item.create_date}}</p>-->\n      <!--<p style="font-size:13px;float:right;margin-top:3px;">¥{{item.amount}}</p>-->\n      <p style="margin-top:3px;font-size:13px;height:22px">合作伙伴：{{item.parent_id.name}}</p>     \n      <!--</ion-item>-->\n      <div style="height:30px;min-height:30px;border-top:1px #f0f2f5 solid">\n         <p  style="margin-top:10px;float:right;font-size:12px;color:#bbc2cc">申请金额：¥{{item.amount}}</p>\n          <p ion-start style="margin-top:10px;font-size:12px;color:#bbc2cc">{{item.create_uid.name}} {{item.create_date}}</p>      \n      </div>\n    </ion-item>\n  </ion-item-group>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ng-template>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/pay-request/pay-request.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__pay_requestService__["a" /* PaymentRequestService */], PaymentAutoService, PaymentTwoAutoService],
    }),
    pay_request___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__pay_requestService__["a" /* PaymentRequestService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], PaymentAutoService, PaymentTwoAutoService,
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */]])
], PayRequestPage);

//# sourceMappingURL=pay-request.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/pay-request.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayRequestPageModule", function() { return PayRequestPageModule; });
/* harmony import */ var pay_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var pay_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(738);
var pay_request_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PayRequestPageModule = (function () {
    function PayRequestPageModule() {
    }
    return PayRequestPageModule;
}());
PayRequestPageModule = pay_request_module___decorate([
    pay_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PayRequestPage,
        ],
        imports: [
            pay_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PayRequestPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */],
        ],
    })
], PayRequestPageModule);

//# sourceMappingURL=pay-request.module.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoCompleteModule; });
/* unused harmony export AutoCompleteComponent */
/* unused harmony export BoldPrefix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);






// searchbar default options
var defaultOpts = {
    cancelButtonText: 'Cancel',
    showCancelButton: false,
    debounce: 250,
    placeholder: '搜索',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'off',
    type: 'search',
    value: '',
    noItems: '',
    clearOnEdit: false,
    clearInput: false
};
var AutoCompleteComponent = (function () {
    /**
     * create a new instace
     */
    function AutoCompleteComponent() {
        this.hideListOnSelection = true;
        this.showListChanged = false;
        this.keyword = null;
        this.suggestions = [];
        this._showList = false;
        this.itemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemClearSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.ionAutoInput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoFocus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.options = {};
        // set default options
        this.defaultOpts = defaultOpts;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "showList", {
        /**
         * @return {?}
         */
        get: function () {
            return this._showList;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._showList === value) {
                return;
            }
            this._showList = value;
            this.showListChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoCompleteComponent.prototype.ngAfterViewChecked = function () {
        if (this.showListChanged) {
            this.showListChanged = false;
            this.showList ? this.itemsShown.emit() : this.itemsHidden.emit();
        }
    };
    /**
     * get items for auto-complete
     * @return {?}
     */
    AutoCompleteComponent.prototype.getItems = function () {
        var _this = this;
        var /** @type {?} */ result;
        if (this.showResultsFirst && !this.keyword) {
            this.keyword = '';
        }
        else if (this.keyword.trim() === '') {
            this.suggestions = [];
            return;
        }
        if (typeof this.dataProvider === 'function') {
            result = this.dataProvider(this.keyword);
        }
        else {
            result = this.dataProvider.getResults(this.keyword);
        }
        // if result is instanceof Subject, use it asObservable
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]) {
            result = result.asObservable();
        }
        // if query is async
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"]) {
            result
                .subscribe(function (results) {
                _this.suggestions = results;
                _this.showItemList();
            }, function (error) { return console.error(error); });
        }
        else {
            this.suggestions = result;
            this.showItemList();
        }
        // emit event
        this.ionAutoInput.emit(this.keyword);
    };
    /**
     * show item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.showItemList = function () {
        this.showList = true;
    };
    /**
     * hide item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.hideItemList = function () {
        this.showList = this.alwaysShowList;
    };
    /**
     * select item from list
     *
     * @param {?} selection
     *
     * @return {?}
     */
    AutoCompleteComponent.prototype.select = function (selection) {
        // this.keyword = this.dataProvider.labelAttribute == null || selection[this.dataProvider.labelAttribute] == null
        //     ? selection : selection[this.dataProvider.labelAttribute];
        // if (this.hideListOnSelection) {
        //     this.hideItemList();
        // }
        // // emit selection event
        this.hideItemList();
        this.itemSelected.emit(selection);
        this.selection = selection;
    };
    /**
     * get current selection
     * @return {?}
     */
    AutoCompleteComponent.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * get current input value
     * @return {?}
     */
    AutoCompleteComponent.prototype.getValue = function () {
        return this.keyword;
    };
    /**
     * set current input value
     * @param {?} value
     * @return {?}
     */
    AutoCompleteComponent.prototype.setValue = function (value) {
        this.keyword = value;
        return;
    };
    /**
     * /**
     * clear current input value
     * @param {?=} hideItemList
     * @return {?}
     */
    AutoCompleteComponent.prototype.clearValue = function (hideItemList) {
        if (hideItemList === void 0) { hideItemList = false; }
        this.keyword = null;
        this.selection = null;
        if (hideItemList) {
            this.hideItemList();
            this.itemClearSelected.emit(true)
        }
        return;
    };
    /**
     * set focus of searchbar
     * @return {?}
     */
    AutoCompleteComponent.prototype.setFocus = function () {
        if (this.searchbarElem) {
            this.searchbarElem.setFocus();
        }
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onFocus = function () {
        this.autoFocus.emit();
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onBlur = function () {
        this.autoBlur.emit();
    };
    /**
     * handle document click
     * @param {?} event
     * @return {?}
     */
    AutoCompleteComponent.prototype.documentClickHandler = function (event) {
        if ((this.searchbarElem
            && !this.searchbarElem._elementRef.nativeElement.contains(event.target))
            ||
                (!this.inputElem && this.inputElem._elementRef.nativeElement.contains(event.target))) {
            this.hideItemList();
        }
    };
    return AutoCompleteComponent;
}());
AutoCompleteComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                host: {
                    '(document:click)': 'documentClickHandler($event)',
                },
                template: "\n      <ion-input\n              #inputElem\n              (keyup)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [clearOnEdit]=\"options.clearOnEdit == null ? defaultOpts.clearOnEdit : options.clearOnEdit\"\n              [clearInput]=\"options.clearInput == null ? defaultOpts.clearInput : options.clearInput\"\n              [ngClass]=\"{'hidden': !useIonInput}\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-input>\n      <ion-searchbar\n              #searchbarElem\n              (ionInput)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [cancelButtonText]=\"options.cancelButtonText == null ? defaultOpts.cancelButtonText : options.cancelButtonText\"\n              [showCancelButton]=\"options.showCancelButton == null ? defaultOpts.showCancelButton : options.showCancelButton\"\n              [debounce]=\"options.debounce == null ? defaultOpts.debounce : options.debounce\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [autocomplete]=\"options.autocomplete == null ? defaultOpts.autocomplete : options.autocomplete\"\n              [autocorrect]=\"options.autocorrect == null ? defaultOpts.autocorrect : options.autocorrect\"\n              [spellcheck]=\"options.spellcheck == null ? defaultOpts.spellcheck : options.spellcheck\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [ngClass]=\"{'hidden': useIonInput}\"\n              (ionClear)=\"clearValue(true)\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-searchbar>\n      <ng-template #defaultTemplate let-attrs=\"attrs\">\n          <span [innerHTML]='(attrs.labelAttribute ? attrs.data[attrs.labelAttribute] : attrs.data) | boldprefix:attrs.keyword'></span>\n      </ng-template>\n      <ul *ngIf=\"suggestions.length > 0 && showList\">\n          <li *ngFor=\"let suggestion of suggestions\" (tap)=\"select(suggestion);$event.srcEvent.stopPropagation()\">\n              <ng-template\n                      [ngTemplateOutlet]=\"template || defaultTemplate\"\n                      [ngOutletContext]=\"\n                        {attrs:{ data: suggestion, keyword: keyword, labelAttribute: dataProvider.labelAttribute }}\"></ng-template>\n          </li>\n      </ul>\n      <p *ngIf=\"suggestions.length == 0 && showList && options.noItems\">{{ options.noItems }}</p>\n  ",
                selector: 'ion-auto-complete'
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteComponent.ctorParameters = function () { return []; };
AutoCompleteComponent.propDecorators = {
    'dataProvider': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'keyword': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showResultsFirst': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'alwaysShowList': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'hideListOnSelection': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'useIonInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'autoFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'autoBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemClearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsShown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsHidden': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'ionAutoInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'searchbarElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['searchbarElem',] },],
    'inputElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['inputElem',] },],
};

/**
 * bolds the beggining of the matching string in the item
 */
var BoldPrefix = (function () {
    function BoldPrefix() {
    }
    /**
     * @param {?} value
     * @param {?} keyword
     * @return {?}
     */
    BoldPrefix.prototype.transform = function (value, keyword) {
        if (!keyword)
            return value;
        var /** @type {?} */ escaped_keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(escaped_keyword, 'gi'), function (str) { return str.bold(); });
    };
    return BoldPrefix;
}());
BoldPrefix.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"], args: [{
                name: 'boldprefix'
            },] },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BoldPrefix.ctorParameters = function () { return []; };

var AutoCompleteModule = (function () {
    function AutoCompleteModule() {
    }
    /**
     * @return {?}
     */
    AutoCompleteModule.forRoot = function () {
        return {
            ngModule: AutoCompleteModule,
            providers: []
        };
    };
    return AutoCompleteModule;
}());
AutoCompleteModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* IonicModule */]
                ],
                declarations: [
                    AutoCompleteComponent,
                    BoldPrefix
                ],
                exports: [
                    AutoCompleteComponent,
                    BoldPrefix
                ]
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteModule.ctorParameters = function () { return []; };




/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentRequestService; });
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


var PaymentRequestService = (function () {
    function PaymentRequestService(httpservice) {
        this.httpservice = httpservice;
    }
    PaymentRequestService.prototype.get_payment_request_list = function (type, limit, offset, user_id, is_plus, need_all) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit,
            type: type,
            is_plus: is_plus,
            need_all: need_all,
        });
        return this.httpservice.postBody("get_payment_request_list", body);
    };
    PaymentRequestService.prototype.reject_payment = function (id, user_id) {
        var body = JSON.stringify({
            payment_id: id,
            user_id: user_id,
        });
        return this.httpservice.postBody("reject_payment", body);
    };
    PaymentRequestService.prototype.confirm_payment = function (id, user_id) {
        var body = JSON.stringify({
            payment_id: id,
            user_id: user_id,
        });
        return this.httpservice.postBody("confirm_payment", body);
    };
    PaymentRequestService.prototype.manager_confirm = function (id, user_id) {
        var body = JSON.stringify({
            payment_id: id,
            user_id: user_id,
        });
        return this.httpservice.postBody("manager_confirm", body);
    };
    PaymentRequestService.prototype.get_bill_detail = function (id) {
        var body = JSON.stringify({
            payment_id: id,
        });
        return this.httpservice.postBody("get_bill_detail", body);
    };
    PaymentRequestService.prototype.search_payment = function (search_name, payment_type, user_id, search_type, search_domain, need_all) {
        var body = JSON.stringify({
            search_name: search_name,
            payment_type: payment_type,
            user_id: user_id,
            search_type: search_type,
            search_domain: search_domain,
            need_all: need_all,
        });
        return this.httpservice.postBody("search_payment", body);
    };
    return PaymentRequestService;
}());
PaymentRequestService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], PaymentRequestService);

//# sourceMappingURL=pay-requestService.js.map

/***/ })

});
//# sourceMappingURL=20.js.map