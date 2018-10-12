webpackJsonp([63],{

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/pay-request-detail/pay-request-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pay_requestService__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
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
 * Generated class for the PayRequestDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PayRequestDetailPage = (function () {
    function PayRequestDetailPage(navCtrl, navParams, storage, payService, alertCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.payService = payService;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.isShowFooter = false;
        this.to_approve_ids = "";
        this.is_ios = this.platform.is('ios');
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("PayRequestPage", navCtrl);
        this.item = this.navParams.get('item');
        console.log(this.item.to_approve_ids.res_data);
        if (this.item.to_approve_ids.res_data) {
            for (var _i = 0, _a = this.item.to_approve_ids.res_data; _i < _a.length; _i++) {
                var approve_id = _a[_i];
                this.to_approve_ids = this.to_approve_ids + " " + approve_id.name;
                console.log(this.to_approve_ids + "," + approve_id.name);
            }
        }
        this.storage.get('user')
            .then(function (res) {
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == 'purchase_manager_plus') {
                    _this.power = true;
                }
            }
            _this.user_id = res.result.res_data.user_id;
            if (_this.item.state == "posted" || _this.item.state == "manager") {
                _this.isShowFooter = true;
            }
            else {
                _this.isShowFooter = false;
            }
        });
    }
    PayRequestDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PayRequestDetailPage');
    };
    PayRequestDetailPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    PayRequestDetailPage.prototype.cancel = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否确定拒绝?",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        var ctrl_cancel = _this.alertCtrl;
                        _this.payService.reject_payment(_this.item.id, _this.user_id).then(function (res) {
                            if (res) {
                                if (res.result.res_data.success == 1) {
                                    ctrl_cancel.create({
                                        title: '提示',
                                        subTitle: "已拒绝",
                                        buttons: [{
                                                text: '确定',
                                                handler: function () {
                                                    _this.frontPage.data.need_fresh = true;
                                                    _this.navCtrl.popTo(_this.frontPage);
                                                }
                                            }
                                        ]
                                    }).present();
                                }
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    PayRequestDetailPage.prototype.conform = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否确定通过?",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        var ctrl_cancel = _this.alertCtrl;
                        _this.payService.confirm_payment(_this.item.id, _this.user_id).then(function (res) {
                            if (res) {
                                if (res.result.res_data.success == 1) {
                                    ctrl_cancel.create({
                                        title: '提示',
                                        subTitle: "操作成功",
                                        buttons: [{
                                                text: '确定',
                                                handler: function () {
                                                    _this.frontPage.data.need_fresh = true;
                                                    _this.navCtrl.popTo(_this.frontPage);
                                                }
                                            }
                                        ]
                                    }).present();
                                }
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    PayRequestDetailPage.prototype.send_manager = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否通过?",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        var ctrl_cancel = _this.alertCtrl;
                        _this.payService.manager_confirm(_this.item.id, _this.user_id).then(function (res) {
                            if (res) {
                                if (res.result.res_data.success == 1) {
                                    ctrl_cancel.create({
                                        title: '提示',
                                        subTitle: "操作成功",
                                        buttons: [{
                                                text: '确定',
                                                handler: function () {
                                                    _this.frontPage.data.need_fresh = true;
                                                    _this.navCtrl.popTo(_this.frontPage);
                                                }
                                            }
                                        ]
                                    }).present();
                                }
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    PayRequestDetailPage.prototype.getState = function (items) {
        if (items.state == "paid") {
            return "已支付";
        }
        else if (items.state == "open") {
            return "打开";
        }
    };
    PayRequestDetailPage.prototype.clickBillDetail = function (items) {
        var _this = this;
        this.payService.get_bill_detail(items.id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
                _this.navCtrl.push('BillDetailPage', {
                    items: res.result.res_data,
                });
            }
        });
    };
    PayRequestDetailPage.prototype.changeState = function (item) {
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
    PayRequestDetailPage.prototype.fixTwo = function (item) {
        return parseFloat(item).toFixed(2);
    };
    return PayRequestDetailPage;
}());
PayRequestDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-pay-request-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/pay-request/pay-request-detail/pay-request-detail.html"*/'<!--\n  Generated template for the PayRequestDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n\n  <ion-item no-lines style="height:40px;min-height:40px">\n    <ion-grid style="background:white">\n      <ion-row>\n        <ion-col col-2>\n          <img src={{item.create_person_ava}} class="imgHeard">\n        </ion-col>\n        <ion-col col-7 >\n          <p style="font-size:80%;line-height:40px;margin-top:2px;color:black">{{item.create_uid.name}}</p>\n        </ion-col>\n        <ion-col col-3 >\n          <p style="font-size:80%;color:#fd9f89;float:right;line-height:40px;margin-top:2px">{{changeState(item.state)}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n  <ion-item no-lines class="divider_header_class">\n\n  </ion-item>\n  <ion-item no-lines class="item_clas">\n      <div text-wrap style="float:right;font-size:70%;width:70%;color:gray;margin-top:1.5px"> {{item.parent_id.name}} </div>\n      <div class="left_label" > 合作伙伴 </div>\n    </ion-item>\n  <ion-item no-lines class="item_clas">\n    <div text-wrap style="float:right;font-size:70%;width:70%;color:gray;margin-top:1.5px"> {{item.bank_id.name}}</div>\n    <div class="left_label" > 银行账户 </div>\n  </ion-item>\n  <ion-item no-lines class="item_clas">\n    <div text-wrap style="float:right;font-size:70%;width:70%;color:gray;margin-top:1.5px">{{item.receive_date}}</div>\n    <div class="left_label" > 付款日期 </div>\n  </ion-item>\n  <ion-item no-lines class="item_clas">\n    <div text-wrap style="float:right;font-size:70%;width:70%;color:gray;margin-top:1.5px">{{to_approve_ids}}</div>\n    <div class="left_label" > 待审核人 </div>\n  </ion-item>\n  <ion-item no-lines class="item_clas_remark">\n    <p text-wrap style="float:right;font-size:70%;width:70%;color:gray;margin-top:1.5px">{{item.remark}}</p>\n    <div class="left_label"> 备注 </div>\n  </ion-item>\n  <ion-item no-lines class="divider_class">\n\n  </ion-item>\n  <ion-item no-lines style="height:45px;min-height:45px">\n    <div text-wrap style="float:right;font-size:95%;width:50%;color:#1997f2;text-align:right">申请金额：¥{{item.amount}}</div>\n  </ion-item>\n  <div style="margin:10px;font-size:13px;color:gray;">供应商对账单</div>\n  <ion-list>\n    <div *ngFor="let items of item.invoice_ids" style="margin-top:10px" tappable (click)="clickBillDetail(items)">\n      <ion-item style="height:25px;min-height:35px;margin-top:3px;" no-lines>\n        <div text-wrap style="float:right;font-size:70%;width:50%;color:#fd9f89;text-align:right;margin-right:7px;margin-top:7px">{{getState(items)}}</div>\n        <div style="font-size:90%;width:50%;margin-top:7px">{{items.number}} </div>\n      </ion-item> \n      <ion-item style="height:25px;min-height:25px;margin-top:-5px" no-lines>\n        <div text-wrap style="float:right;font-size:70%;width:50%;color:gray;margin-top:-2px">源单据：{{items.origin}}</div>\n        <div style="font-size:70%;width:50%;color:gray;margin-top:-2px">开票日期：{{items.date_invoice}}</div>\n      </ion-item>\n      <ion-item no-lines style="height:25px;min-height:25px;margin-top:-5px;">\n        <div text-wrap style="float:right;font-size:70%;width:50%;color:gray;">税金：{{items.tax}}</div>\n        <div style="font-size:70%;width:50%;color:gray;">截止日期：{{items.date_due}}</div>\n      </ion-item>\n      <ion-item no-lines style="height:5px;min-height:5px;color:white;border-bottom:1px #f0f2f5 solid">\n\n      </ion-item>\n      <ion-item no-lines style="height:5px;min-height:5px;color:white;">\n\n      </ion-item>\n      <ion-item style="height:20px;min-height:20px" no-lines>\n        <div text-wrap style="float:right;font-size:70%;width:50%;color:#bbc2cc;text-align:right;margin-top:3px">¥{{fixTwo(items.amount_total)}}</div>\n        <div style="font-size:70%;width:50%;text-align:left;color:#bbc2cc;margin-top:2px"> 总计 </div>\n      </ion-item>\n      <ion-item style="height:20px;min-height:25px" no-lines>\n        <div text-wrap style="float:right;font-size:80%;width:50%;color:#2e3133;text-align:right;">¥{{fixTwo(items.amount_total_o)}}</div>\n        <div style="font-size:80%;width:50%;text-align:left;color:#2e3133;margin-top:-2px">待支付</div>\n      </ion-item>\n      \n    </div>\n  </ion-list>  \n\n  <div [ngClass]="{true:\'ios_style\',false:\'other_style\'}[is_ios]" >审批记录</div>\n  <ion-list style="padding-bottom:30px;margin-top:10px">\n    <ion-item no-lines *ngFor=\'let items of item.message_ids\' class="middle_item">\n      <img style="width:30px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{items.create_person_ava}}>\n\n      <div style="overflow:hidden">\n        <span style="margin-top:-2px;color:black;font-size:80%;float:left">{{items.create_person}}</span>\n\n        <span style="font-size:70%;margin-top:-2px;margin-left:-5px;float:right;color:#bbc2cc">{{changeDate(items.create_time) | date:\'MM-dd HH:mm\'}}</span>\n      </div>\n      <p *ngIf="items.old_state || items.new_state" style="font-size:80%;margin-top:5px;">{{items.old_state}}=>{{items.new_state}}</p>\n      <p text-wrap style="font-size:80%;margin-top:5px;">{{items.description}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer *ngIf = "isShowFooter">\n  <div *ngIf = "this.item.state == \'manager\' && this.power" style="background:#f0f0f0">\n    <!--<button  style=\'width:48%;margin-left:5px;background-color:#fba958\' ion-button (click)="cancel()">\n      拒绝\n    </button>\n    <button style=\'width:48%;margin-right:5px;float:right;background-color:#1eabfe\' ion-button\n      (click)="conform()">\n      通过\n    </button>-->\n    <span align="center" style=\'width:50%;float:left; background-color:#fba958;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="cancel()">\n      拒绝\n    </span>\n    <span align="center" style=\'width:50%;float:right;background-color:#1eabfe;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="conform()">\n      通过\n    </span>\n  </div>\n\n  <div *ngIf = "this.item.state == \'posted\'" style="background:#f0f0f0">\n    <!--<button  style=\'width:48%;margin-left:5px; background-color:#fba958\' ion-button (click)="cancel()">\n      拒绝\n    </button>\n    <button style=\'width:48%;float:right;margin-right:5px;background-color:#1eabfe\' ion-button\n      (click)="send_manager()">\n      送审经理\n    </button>-->\n    <span align="center" style=\'width:50%;float:left; background-color:#fba958;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="cancel()">\n      拒绝\n    </span>\n    <span align="center" style=\'width:50%;float:right;background-color:#1eabfe;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="send_manager()">\n      通过\n    </span>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/pay-request/pay-request-detail/pay-request-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__pay_requestService__["a" /* PaymentRequestService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__pay_requestService__["a" /* PaymentRequestService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */]])
], PayRequestDetailPage);

//# sourceMappingURL=pay-request-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/pay-request/pay-request-detail/pay-request-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PayRequestDetailPageModule", function() { return PayRequestDetailPageModule; });
/* harmony import */ var pay_request_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var pay_request_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var pay_request_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PayRequestDetailPageModule = (function () {
    function PayRequestDetailPageModule() {
    }
    return PayRequestDetailPageModule;
}());
PayRequestDetailPageModule = pay_request_detail_module___decorate([
    pay_request_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PayRequestDetailPage,
        ],
        imports: [
            pay_request_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PayRequestDetailPage),
        ],
    })
], PayRequestDetailPageModule);

//# sourceMappingURL=pay-request-detail.module.js.map

/***/ }),

/***/ 882:
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
//# sourceMappingURL=63.js.map