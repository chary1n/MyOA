webpackJsonp([46],{

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/edit-shengou/edit-shengou.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shengouService__ = __webpack_require__(746);
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
 * Generated class for the EditShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditShengouPage = (function () {
    function EditShengouPage(navCtrl, navParams, shenGouService, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shenGouService = shenGouService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.mShenGoupage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController("EditNewShengouPage", navCtrl);
    }
    EditShengouPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditShengouPage');
    };
    EditShengouPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.changeItem = this.navParams.get("item");
        console.log(this.changeItem);
        if (this.changeItem) {
            this.production = this.changeItem;
            console.log(this.production.product_id.name);
            this.amount = this.production.price_unit;
            this.remark = this.production.description;
            this.unit = this.production.quantity;
            this.shenGouService.get_all_products().then(function (res) {
                if (res.result.res_code == 1) {
                    _this.productList = res.result.res_data.res_data;
                    for (var _i = 0, _a = _this.productList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if ((new RegExp(_this.production.product_id.name).test(item.name)) || _this.production.product_id.name == item.name) {
                            _this.productIndex = item.name;
                        }
                    }
                }
            });
        }
    };
    EditShengouPage.prototype.goBack = function () {
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
    EditShengouPage.prototype.save = function () {
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
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            if (this.productIndex && this.amount && this.remark && this.unit) {
                var intString = "";
                if (parseFloat(this.amount) <= 0) {
                    intString = intString + "   单价不能为0";
                }
                if (parseFloat(this.unit) <= 0) {
                    intString = intString + "   数量不能为0";
                }
                if (intString != "") {
                    __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom(intString, this.toastCtrl);
                }
                else {
                    console.log(this.productIndex);
                    this.production = [];
                    for (var _i = 0, _a = this.productList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.name == this.productIndex) {
                            this.production.product_id = {
                                id: item.id,
                                name: this.productIndex
                            };
                        }
                    }
                    this.production.price_unit = this.amount;
                    this.production.description = this.remark;
                    this.production.quantity = this.unit;
                    this.mShenGoupage.data.production = this.production;
                    this.mShenGoupage.data.isAdd = true;
                    this.mShenGoupage.data.isChange = this.changeItem ? true : false;
                    ;
                    this.navCtrl.pop();
                }
            }
        }
    };
    return EditShengouPage;
}());
EditShengouPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-edit-shengou',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/edit-shengou/edit-shengou.html"*/'<!--\n  Generated template for the AddApplyDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>申购明细</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'save()\'>\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <ion-item>\n    <ion-label style="color:black">产品</ion-label>\n    <ion-select [(ngModel)]="productIndex" class="normal-select">\n      <ion-option *ngFor="let item of productList;let i = index;" >{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label style="color:black">单价 (元)\n    </ion-label>\n    <ion-input  #mNumberCon  item-end  text-wrap type="number" text-right [(ngModel)]="amount"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color:black">数量\n    </ion-label>\n    <ion-input  #mNumberCon  item-end  text-wrap type="number" text-right [(ngModel)]="unit"></ion-input>\n  </ion-item>\n\n  <ion-item no-lines>\n\n    <ion-label>申购说明</ion-label>\n\n  </ion-item>\n  <ion-item>\n    <ion-textarea  rows = "15"  text-wrap placeholder=\'请输入申购明细描述\'  [(ngModel)]="remark" class=\'area_class\' >\n    </ion-textarea>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/edit-shengou/edit-shengou.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shengouService__["a" /* ShenGouService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__shengouService__["a" /* ShenGouService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], EditShengouPage);

//# sourceMappingURL=edit-shengou.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/edit-shengou/edit-shengou.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditShengouPageModule", function() { return EditShengouPageModule; });
/* harmony import */ var edit_shengou_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var edit_shengou_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var edit_shengou_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditShengouPageModule = (function () {
    function EditShengouPageModule() {
    }
    return EditShengouPageModule;
}());
EditShengouPageModule = edit_shengou_module___decorate([
    edit_shengou_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EditShengouPage,
        ],
        imports: [
            edit_shengou_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EditShengouPage),
        ],
    })
], EditShengouPageModule);

//# sourceMappingURL=edit-shengou.module.js.map

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
//# sourceMappingURL=46.js.map