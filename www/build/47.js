webpackJsonp([47],{

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/edit-new-shengou/edit-new-shengou.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shengouService__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the EditNewShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditNewShengouPage = (function () {
    function EditNewShengouPage(navCtrl, navParams, shengouService, alertCtrl, storage, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shengouService = shengouService;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.isAdd = false;
        this.isChange = false;
        this.item = this.navParams.get('item');
        console.log(this.item.state);
        this.frontPage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController("ShengoupagePage", navCtrl);
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.partner_id = res.result.res_data.partner_id;
            if (_this.item.state == "cancel") {
                _this.shengouService.get_all_departments(_this.partner_id).then(function (res) {
                    if (res.result.res_data.all_departments) {
                        _this.departmentList = res.result.res_data.all_departments.res_data;
                        for (var _i = 0, _a = res.result.res_data.all_departments.res_data; _i < _a.length; _i++) {
                            var item = _a[_i];
                            console.log(item + " " + _this.item.department);
                            if (item.id == _this.item.department.id) {
                                _this.department = item.id;
                            }
                        }
                    }
                });
            }
        });
    }
    EditNewShengouPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditNewShengouPage');
    };
    EditNewShengouPage.prototype.ionViewWillEnter = function () {
        this.isAdd = this.navParams.get("isAdd");
        this.isChange = this.navParams.get("isChange");
        if (this.isAdd) {
            console.log(this.production);
            this.production = this.navParams.get('production');
            if (this.production) {
                this.item.line_ids.push(this.production);
            }
            this.navParams.data.isAdd = false;
        }
        if (this.isChange) {
            var changeItem = this.item.line_ids[this.item.line_ids.length - 1];
            this.item.line_ids.splice(this.index, 1, changeItem);
            this.item.line_ids.pop();
            this.navParams.data.isChange = false;
        }
        this.getTotalAmount();
    };
    EditNewShengouPage.prototype.getTotalAmount = function () {
        if (this.item.line_ids) {
            var total = 0;
            for (var _i = 0, _a = this.item.line_ids; _i < _a.length; _i++) {
                var item = _a[_i];
                total = total + parseFloat((parseFloat(item.price_unit) * parseFloat(item.quantity)).toFixed(2));
            }
            this.total = total.toFixed(2);
        }
    };
    EditNewShengouPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    EditNewShengouPage.prototype.changeProductItem = function (i) {
        this.index = i;
        console.log(this.item.line_ids[i]);
        this.navCtrl.push('EditShengouPage', {
            item: this.item.line_ids[i], index: i
            // , product: this.productList
        });
    };
    EditNewShengouPage.prototype.deleteProductItem = function (i) {
        this.item.line_ids.splice(i, 1);
        this.getTotalAmount();
    };
    EditNewShengouPage.prototype.addApplyDetail = function () {
        this.navCtrl.push('EditAddShengouPage');
    };
    EditNewShengouPage.prototype.reApply = function () {
        var _this = this;
        var mString = "";
        if (!this.department) {
            mString = mString + "   请选择部门";
        }
        if (this.item.line_ids.length <= 0) {
            mString = mString + "   请填写申购明细";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            var ctrl_1 = this.alertCtrl;
            var productionList = [];
            for (var _i = 0, _a = this.item.line_ids; _i < _a.length; _i++) {
                var item = _a[_i];
                var pro = {
                    description: item.description,
                    quantity: parseInt(item.quantity),
                    // department_id: parseInt(this.department),
                    product_id: parseInt(item.product_id.id),
                    price_unit: parseFloat(item.price_unit)
                };
                productionList.push(pro);
            }
            var mbody = {
                line_ids: productionList,
                create_uid: this.user_id,
                total_amount: this.total,
            };
            var body = {
                data: mbody
            };
            this.shengouService.reset_shengou(this.user_id, this.item.sheet_id, body, this.department).then(function (res) {
                if (res.result.res_data.success == 1) {
                    console.log(res.result.res_data.success);
                    ctrl_1.create({
                        title: '提示',
                        subTitle: "重新申请成功,等待审核",
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
            });
        }
    };
    EditNewShengouPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    EditNewShengouPage.prototype.transInt = function (intValue, intOtherValue) {
        return (parseFloat(intValue) * parseFloat(intOtherValue)).toFixed(2);
    };
    return EditNewShengouPage;
}());
EditNewShengouPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-edit-new-shengou',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/edit-new-shengou/edit-new-shengou.html"*/'<!--\n  Generated template for the BaoxiaoApplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-list>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">申请人</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.employee_name}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf = "item.state != \'cancel\'">\n      <ion-label style="font-size:85%;font-weight:bold">部门（费用归属）</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{item.department.id}}</ion-label>\n    </ion-item>\n\n    <ion-item *ngIf = "item.state == \'cancel\'">\n    <ion-label style="color:black">部门(费用归属)</ion-label> \n    <ion-select [(ngModel)]="department" class="normal-select">\n      <ion-option *ngFor="let item of departmentList;" value={{item.id}} \n       >{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n    <ion-item>\n    <ion-label class="total_amount">金额总计（元）：{{total}}</ion-label>\n  </ion-item>\n  </ion-list>\n\n  <ion-list style="margin-top:10px" lines>\n      <ion-item-sliding  *ngFor=\'let items of item.line_ids;let i = index\'>\n      <ion-item (click)="changeProductItem(i)">\n        <div tappable>申购明细{{i+1}}</div>\n          <p text-wrap style="font-size:80%;color:gray;">产品：{{items.product_id.name}}</p>\n          <p text-wrap style="font-size:80%;">单价：{{items.price_unit}}        数量：{{items.quantity}} 小计：{{transInt(items.price_unit,items.quantity)}}</p>\n          <p text-wrap style="font-size:80%;color:gray">费用说明：{{items.description}} </p>\n      </ion-item>\n      <ion-item-options *ngIf = "item.state == \'cancel\'" side="right">\n          <button ion-button color="primary" (click)="changeProductItem(i)">\n              <ion-icon name="create"></ion-icon>\n              修改\n            </button>\n          <button ion-button color="primary" (click)="deleteProductItem(i)">\n                <ion-icon name="trash"></ion-icon>\n                删除\n              </button>\n        </ion-item-options>\n      </ion-item-sliding>\n  </ion-list>\n  <button *ngIf = "item.state == \'cancel\'" ion-button full (click)="addApplyDetail()">\n    + 申购明细\n  </button>\n\n  <div style="margin:10px;">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let items of item.message_ids\' style="overflow:hidden" class="middle_item">\n          <img item-start style="width:40px;" src={{items.create_person_ava}}>\n          <div style="overflow:hidden">\n          <span style="margin-top:3px;color:black;font-size:80%;float:left">{{items.create_person}}</span>\n\n          <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(items.create_time) | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n          </div>\n          <p *ngIf="items.old_state || items.new_state" style="font-size:80%;">{{items.old_state}}=>{{items.new_state}}</p>\n          <p text-wrap style="font-size:80%;">{{items.description}}</p>\n    </ion-item>\n  </ion-list>\n  \n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <button ion-button ion-start style=\'width:66%\' clear> 金额总计 (元) : {{total}}</button>\n    <button ion-button ion-end style=\'width:30%\' (click)=\'reApply()\'>重新提交</button>\n  </ion-toolbar>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/edit-new-shengou/edit-new-shengou.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__shengouService__["a" /* ShenGouService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__shengouService__["a" /* ShenGouService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], EditNewShengouPage);

//# sourceMappingURL=edit-new-shengou.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/edit-new-shengou/edit-new-shengou.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditNewShengouPageModule", function() { return EditNewShengouPageModule; });
/* harmony import */ var edit_new_shengou_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var edit_new_shengou_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var edit_new_shengou_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditNewShengouPageModule = (function () {
    function EditNewShengouPageModule() {
    }
    return EditNewShengouPageModule;
}());
EditNewShengouPageModule = edit_new_shengou_module___decorate([
    edit_new_shengou_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EditNewShengouPage,
        ],
        imports: [
            edit_new_shengou_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EditNewShengouPage),
        ],
    })
], EditNewShengouPageModule);

//# sourceMappingURL=edit-new-shengou.module.js.map

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
//# sourceMappingURL=47.js.map