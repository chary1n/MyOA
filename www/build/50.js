webpackJsonp([50],{

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/audited-purchase/audited-purchase.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shengouService__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
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
 * Generated class for the AuditedPurchasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AuditedPurchasePage = (function () {
    function AuditedPurchasePage(navCtrl, navParams, shengouService, alertCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shengouService = shengouService;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.item = this.navParams.get('item');
        this.title = this.item.name;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].getViewController("ShengoupagePage", navCtrl);
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.user_id = res.result.res_data.user_id;
        });
        console.log(this.item.state);
        var to_approve_name = this.item.to_approve_id;
        if (this.item.state == 'submit' || this.item.state == 'manager1_approve' || this.item.state == 'manager2_approve' || this.item.state == "manager3_approve") {
            this.storage.get('user')
                .then(function (res) {
                if (res.result.res_data.name != to_approve_name) {
                    _this.isShowFooter = false;
                }
                else {
                    _this.isShowFooter = true;
                }
            });
        }
        else {
            this.isShowFooter = false;
        }
        console.log(this.item);
    }
    AuditedPurchasePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReimbursementDetailPage');
    };
    AuditedPurchasePage.prototype.conform = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "填写审批备注",
            inputs: [
                {
                    name: 'title',
                    placeholder: '审批备注(选填)'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.submit(data.title);
                    }
                }
            ],
        }).present();
    };
    AuditedPurchasePage.prototype.submit = function (reason) {
        var _this = this;
        var ctrl = this.alertCtrl;
        this.shengouService.confirm1(this.item.sheet_id, this.user_id, reason, this.item.state).then(function (res) {
            if (res) {
                if (res.result.res_data.success == 1) {
                    console.log(res.result.res_data.success);
                    ctrl.create({
                        title: '提示',
                        subTitle: "审批成功",
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
    };
    AuditedPurchasePage.prototype.cancel = function () {
        this.showPrompt();
    };
    AuditedPurchasePage.prototype.showPrompt = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "输入拒绝的原因",
            inputs: [
                {
                    name: 'title',
                    placeholder: '拒绝原因'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        if (data.title) {
                            _this.shengouService.refuse(_this.item.sheet_id, data.title, _this.user_id).then(function (res) {
                                if (res) {
                                    if (res.result.res_data.success == 1) {
                                        console.log(res.result.res_data.success);
                                        ctrl.create({
                                            title: '提示',
                                            subTitle: "拒绝成功",
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
                        else {
                            ctrl.create({
                                title: '提示',
                                subTitle: "请填写拒绝原因",
                                buttons: [{
                                        text: '确定',
                                        handler: function () {
                                        }
                                    }
                                ]
                            }).present();
                        }
                    }
                }
            ]
        }).present();
    };
    AuditedPurchasePage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    return AuditedPurchasePage;
}());
AuditedPurchasePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"]({
        selector: 'page-audited-purchase',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/audited-purchase/audited-purchase.html"*/'<!--\n  Generated template for the AuditedPurchasePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-list>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">申请人</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.employee_name}}</ion-label>\n    </ion-item>\n    <ion-item>\n        <ion-label style="font-size:85%;font-weight:bold">待审核人</ion-label>\n        <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.to_approve_id}}</ion-label>\n      </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">部门（费用归属）</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{item.department.name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="total_amount">金额总计（元）：{{item.total_amount}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-item-group>\n    <ion-item *ngFor=\'let items of item.line_ids\'>\n      <h3 text-wrap>申购明细</h3>\n      <p text-wrap style="font-size:80%;color:gray;">产品：{{items.product_id.name}}</p>\n      <p text-wrap style="font-size:80%;">单价：{{items.price_unit}}       数量:{{items.quantity}} 小计：{{items.price_unit * items.quantity}}</p>\n      <p text-wrap style="font-size:80%;color:gray">费用说明：{{items.description}} </p>\n    </ion-item>\n  </ion-item-group>\n\n  <div style="margin:10px;">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let items of item.message_ids\' style="overflow:hidden" class="middle_item">\n      <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{items.create_person_ava}}>\n\n      <div style="overflow:hidden">\n        <span style="margin-top:3px;color:black;font-size:80%;float:left">{{items.create_person}}</span>\n\n        <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(items.create_time) | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n      </div>\n      <p *ngIf="items.old_state || items.new_state" style="font-size:80%;">{{items.old_state}}=>{{items.new_state}}</p>\n      <p text-wrap style="font-size:80%;">{{items.description}}</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer *ngIf="isShowFooter">\n  <ion-toolbar>\n    <button ion-button ion-end style=\'width:50%;float:right;background-color:#1eabfe\' tappable (click)=\'conform()\' full>通过</button>\n    <button ion-button ion-start style=\'width:50%;background-color:red\' tappable (click)=\'cancel()\' full>拒绝</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/audited-purchase/audited-purchase.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
], AuditedPurchasePage);

//# sourceMappingURL=audited-purchase.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/audited-purchase/audited-purchase.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuditedPurchasePageModule", function() { return AuditedPurchasePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var audited_purchase_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AuditedPurchasePageModule = (function () {
    function AuditedPurchasePageModule() {
    }
    return AuditedPurchasePageModule;
}());
AuditedPurchasePageModule = audited_purchase_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AuditedPurchasePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AuditedPurchasePage),
        ],
    })
], AuditedPurchasePageModule);

//# sourceMappingURL=audited-purchase.module.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShenGouService; });
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


var ShenGouService = (function () {
    function ShenGouService(httpservice) {
        this.httpservice = httpservice;
    }
    ShenGouService.prototype.getshengouList = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_shengoulist", body);
    };
    ShenGouService.prototype.refuse_shengou = function (user_id, reason, sheet_id) {
        var body = JSON.stringify({
            reason: reason,
            sheet_id: sheet_id,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_shengou", body);
    };
    ShenGouService.prototype.reset_shengou = function (user_id, sheet_id, data, department_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            line_data: data,
            department_id: department_id,
        });
        return this.httpservice.postBody("reset_shengou", body);
    };
    ShenGouService.prototype.get_all_departments = function (user_id) {
        var body = JSON.stringify({
            partner_id: user_id,
        });
        return this.httpservice.postBody("get_all_departments", body);
    };
    ShenGouService.prototype.get_all_products = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_products", body);
    };
    ShenGouService.prototype.create_shengou = function (data) {
        var body = JSON.stringify(data);
        console.log("JSON 的body 是" + body);
        return this.httpservice.postBody("create_shengou", body);
    };
    ShenGouService.prototype.search_shengou = function (search_text, user_id) {
        var body = JSON.stringify({
            search_text: search_text,
            user_id: user_id,
        });
        return this.httpservice.postBody("search_shengou", body);
    };
    ShenGouService.prototype.search_wait_me_audit = function (search_text, user_id) {
        var body = JSON.stringify({
            search_text: search_text,
            user_id: user_id,
            type: 'wait'
        });
        return this.httpservice.postBody("search_shengou2", body);
    };
    ShenGouService.prototype.search_audited = function (search_text, user_id) {
        var body = JSON.stringify({
            search_text: search_text,
            user_id: user_id,
            type: 'audited'
        });
        return this.httpservice.postBody("search_shengou2", body);
    };
    ShenGouService.prototype.get_audited_purchase = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
            type: "audited"
        });
        return this.httpservice.postBody("audited_purchase", body);
    };
    ShenGouService.prototype.get_wait_audit_purchase = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
            type: "wait"
        });
        return this.httpservice.postBody("audited_purchase", body);
    };
    ShenGouService.prototype.confirm1 = function (sheet_id, user_id, title, type) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: title,
            type: type
        });
        return this.httpservice.postBody("confirm_purchase", body);
    };
    ShenGouService.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_audit", body);
    };
    ShenGouService.prototype.getAuditDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_audit_detail", body);
    };
    ShenGouService.prototype.push_apply = function (sheet_id, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
        });
        return this.httpservice.postBody("push_apply", body);
    };
    ShenGouService.prototype.get_shengou_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_shengou_count", body);
    };
    return ShenGouService;
}());
ShenGouService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ShenGouService);

//# sourceMappingURL=shengouService.js.map

/***/ })

});
//# sourceMappingURL=50.js.map