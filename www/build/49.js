webpackJsonp([49],{

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/create-shengou/add-shengou-detail/add-shengou-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shengouService__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(238);
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
 * Generated class for the AddShengouDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddShengouDetailPage = (function () {
    function AddShengouDetailPage(navCtrl, navParams, shenGouService, alertCtrl, toastCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shenGouService = shenGouService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.mShenGoupage = __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].getViewController("CreateShengouPage", navCtrl);
        this.shenGouService.get_all_products().then(function (res) {
            console.log(res);
            if (res.result.res_code == 1) {
                _this.productList = res.result.res_data.res_data;
            }
        });
    }
    AddShengouDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddShengouDetailPage');
    };
    AddShengouDetailPage.prototype.ionViewWillLeave = function () {
        if (this.platform.is('ios')) {
            cordova.plugins.Keyboard.close();
        }
    };
    AddShengouDetailPage.prototype.panEvent = function ($event) {
        if (this.platform.is('ios')) {
            cordova.plugins.Keyboard.close();
        }
    };
    AddShengouDetailPage.prototype.ionViewDidEnter = function () {
        this.changeItem = this.navParams.get("item");
        if (this.changeItem) {
            this.production = this.changeItem;
            this.amount = this.production.amount;
            this.remark = this.production.remark;
            this.productIndex = this.production.productIndex;
            this.unit = this.production.unit;
        }
    };
    AddShengouDetailPage.prototype.goBack = function () {
        var _this = this;
        if (this.productIndex || this.amount || this.remark) {
            this.alertCtrl.create({
                title: '提示',
                subTitle: '已输入内容，是否确认返回？',
                buttons: [{ text: '取消' },
                    {
                        text: '确定',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    }
                ]
            }).present();
        }
        else {
            this.navCtrl.pop();
        }
    };
    AddShengouDetailPage.prototype.save = function () {
        var mString = "";
        if (!this.productIndex) {
            mString = mString + "   请选择产品";
        }
        if (!this.amount) {
            mString = mString + "   请填写金额";
        }
        if (!this.unit) {
            mString = mString + "   请填写数量";
        }
        if (!this.remark) {
            mString = mString + "   请填写费用说明";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            if (this.productIndex && this.amount && this.remark) {
                var intString = "";
                if (parseFloat(this.amount) <= 0) {
                    intString = intString + "   单价不能为0";
                }
                if (parseFloat(this.unit) <= 0) {
                    intString = intString + "   数量不能为0";
                }
                if (intString != "") {
                    __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].toastButtom(intString, this.toastCtrl);
                }
                else {
                    this.production = [];
                    for (var _i = 0, _a = this.productList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.name == this.productIndex) {
                            this.production.productId = item.id;
                        }
                    }
                    this.production.productName = this.productIndex;
                    this.production.amount = this.amount;
                    this.production.remark = this.remark;
                    this.production.unit = this.unit;
                    this.production.productIndex = this.productIndex;
                    this.mShenGoupage.data.production = this.production;
                    this.mShenGoupage.data.isAdd = true;
                    this.mShenGoupage.data.isChange = this.changeItem ? true : false;
                    ;
                    this.navCtrl.pop();
                }
            }
        }
    };
    return AddShengouDetailPage;
}());
AddShengouDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-add-shengou-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/create-shengou/add-shengou-detail/add-shengou-detail.html"*/'<!--\n  Generated template for the AddApplyDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>申购明细</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'save()\'>\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content (pan)="panEvent($event)">\n\n  <ion-item>\n    <ion-label style="color:black">产品</ion-label>\n    <ion-select [(ngModel)]="productIndex" class="normal-select">\n      <ion-option *ngFor="let item of productList;let i = index;" >{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label style="color:black">单价 (元)\n    </ion-label>\n    <ion-input  #mNumberCon  item-end  text-wrap type="number" text-right [(ngModel)]="amount"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color:black">数量\n    </ion-label>\n    <ion-input  #mNumberCon  item-end  text-wrap type="number" text-right [(ngModel)]="unit"></ion-input>\n  </ion-item>\n\n  <ion-item no-lines>\n\n    <ion-label>申购说明</ion-label>\n\n  </ion-item>\n  <ion-item>\n    <ion-textarea  rows = "15"  text-wrap placeholder=\'请输入申购明细描述\'  [(ngModel)]="remark" class=\'area_class\' >\n    </ion-textarea>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/create-shengou/add-shengou-detail/add-shengou-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */]])
], AddShengouDetailPage);

//# sourceMappingURL=add-shengou-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/create-shengou/add-shengou-detail/add-shengou-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddShengouDetailPageModule", function() { return AddShengouDetailPageModule; });
/* harmony import */ var add_shengou_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var add_shengou_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var add_shengou_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddShengouDetailPageModule = (function () {
    function AddShengouDetailPageModule() {
    }
    return AddShengouDetailPageModule;
}());
AddShengouDetailPageModule = add_shengou_detail_module___decorate([
    add_shengou_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AddShengouDetailPage,
        ],
        imports: [
            add_shengou_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AddShengouDetailPage),
        ],
    })
], AddShengouDetailPageModule);

//# sourceMappingURL=add-shengou-detail.module.js.map

/***/ }),

/***/ 745:
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
//# sourceMappingURL=49.js.map