webpackJsonp([93],{

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi-apply/zanzhi-apply.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commonUseServices__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
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
 * Generated class for the ZanzhiApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ZanzhiApplyPage = (function () {
    function ZanzhiApplyPage(navCtrl, navParams, commonService, toastCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonService = commonService;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.name = __WEBPACK_IMPORTED_MODULE_5__providers_HttpService__["a" /* HttpService */].user.name;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].getViewController("ZanzhiPage", navCtrl);
        this.commonService.get_zanzhi_reminding().then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.pre_payment_reminding = res.result.res_data.pre_payment_reminding;
                _this.bank_account_id = res.result.res_data.bank_account_id;
            }
        });
    }
    ZanzhiApplyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ZanzhiApplyPage');
    };
    ZanzhiApplyPage.prototype.ionViewWillEnter = function () {
        var res_data = this.navParams.get("res_data");
        if (res_data) {
            this.remarks = res_data.remark;
            this.amount = res_data.amount;
            this.isedit = true;
            this.order_id = res_data.id;
        }
    };
    ZanzhiApplyPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ZanzhiApplyPage.prototype.save = function () {
        var _this = this;
        var mString = "";
        if (parseFloat(this.amount) <= 0) {
            __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("金额必须大于0元", this.toastCtrl);
            return;
        }
        if (!this.amount) {
            mString = mString + "   请填写金额";
        }
        if (!this.remarks) {
            mString = mString + "   请填写暂支原因";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            if (this.isedit) {
                this.alertCtrl.create({
                    title: '提示',
                    subTitle: "是否立即提交审核?",
                    buttons: [
                        {
                            text: '不提交',
                            handler: function () {
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        },
                        {
                            text: '提交',
                            handler: function () {
                                _this.toEditSave(true);
                            }
                        },
                    ]
                }).present();
            }
            else {
                this.alertCtrl.create({
                    title: '提示',
                    subTitle: "已保存,是否立即提交审核?",
                    buttons: [
                        {
                            text: '暂不提交',
                            handler: function () {
                                _this.toSave(false);
                            }
                        },
                        {
                            text: '提交',
                            handler: function () {
                                _this.toSave(true);
                            }
                        },
                    ]
                }).present();
            }
        }
    };
    ZanzhiApplyPage.prototype.toEditSave = function (submit) {
        var _this = this;
        this.commonService.save_edit_zanzhi(this.amount, this.remarks, submit, this.order_id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.frontPage.data.need_fresh = true;
                _this.navCtrl.popTo(_this.frontPage);
            }
        });
    };
    ZanzhiApplyPage.prototype.toSave = function (submit) {
        var _this = this;
        this.commonService.save_zanzhi(this.amount, this.remarks, submit).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.frontPage.data.need_fresh = true;
                _this.navCtrl.pop();
            }
        });
    };
    return ZanzhiApplyPage;
}());
ZanzhiApplyPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"]({
        selector: 'page-zanzhi-apply',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/zanzhi/zanzhi-apply/zanzhi-apply.html"*/'<!--\n  Generated template for the BaoxiaoApplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title *ngIf="!editItem">新建暂支</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n\n  <ion-item>\n    <ion-label>申请人\n    </ion-label>\n    <ion-label item-end text-right>{{name}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n      <ion-label style="color:black">申请金额 (元)   <span style="color:red;"> *</span>\n      </ion-label>\n      <ion-input #mNumberCon  placeholder=\'请填写金额\' item-end text-wrap type="number" text-right [(ngModel)]="amount"></ion-input>\n    </ion-item>\n  \n\n  <ion-item no-lines>\n    <ion-label>备注\n      <span style="color:red;"> *</span>\n    </ion-label>\n\n  </ion-item>\n  <ion-item>\n    <ion-textarea rows="10" style="margin-left:10px;" text-wrap placeholder=\'请备注暂支原因\' [(ngModel)]="remarks" class=\'area_class\'>\n    </ion-textarea>\n  </ion-item>\n\n\n  <ion-item>\n      <div>银行账户\n        <span style="color:rgb(139, 138, 138);font-size:80%"> (默认打到您的工资卡账户)</span>\n      </div>\n      <div >{{bank_account_id}}</div>\n    </ion-item>\n\n  <ion-item>\n    <ion-label>暂支余额\n    </ion-label>\n    <ion-label item-end text-right>{{pre_payment_reminding}}</ion-label>\n  </ion-item>\n\n\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <button ion-button ion-start style=\'width:66%\' clear> 申请金额 (元) : {{amount}}</button>\n    <button ion-button ion-end style=\'width:30%\' (click)=\'save()\'> 保存</button>\n  </ion-toolbar>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/zanzhi/zanzhi-apply/zanzhi-apply.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__commonUseServices__["a" /* CommonUseServices */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__commonUseServices__["a" /* CommonUseServices */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
], ZanzhiApplyPage);

//# sourceMappingURL=zanzhi-apply.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi-apply/zanzhi-apply.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZanzhiApplyPageModule", function() { return ZanzhiApplyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var zanzhi_apply_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ZanzhiApplyPageModule = (function () {
    function ZanzhiApplyPageModule() {
    }
    return ZanzhiApplyPageModule;
}());
ZanzhiApplyPageModule = zanzhi_apply_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ZanzhiApplyPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ZanzhiApplyPage),
        ],
    })
], ZanzhiApplyPageModule);

//# sourceMappingURL=zanzhi-apply.module.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUseServices; });
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


var CommonUseServices = (function () {
    function CommonUseServices(httpservice) {
        this.httpservice = httpservice;
    }
    CommonUseServices.prototype.getApplyList = function (moffset, mlimit, id) {
        id = parseInt(id);
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    };
    CommonUseServices.prototype.getApplyListNoLoading = function (moffset, mlimit, id) {
        id = parseInt(id);
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_applylist", body);
    };
    CommonUseServices.prototype.searchApplyList = function (id, type, data) {
        var body = JSON.stringify({
            offset: 0,
            limit: 100,
            user_id: id,
            type: type,
            data: data
        });
        return this.httpservice.postBody("get_applylist", body);
    };
    CommonUseServices.prototype.getApplyDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_applylist_detail", body);
    };
    CommonUseServices.prototype.getLeaveDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_leavelist_detail", body);
    };
    CommonUseServices.prototype.getLeaveList = function (moffset, mlimit, id) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_leavelist", body);
    };
    //  获取暂支金额,部门,产品名
    CommonUseServices.prototype.getPaymentReminding = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_payment_reminding", body);
    };
    // 撤回
    CommonUseServices.prototype.get_retract = function (descrpiction, id, userId) {
        var body = JSON.stringify({
            active_id: id,
            description: descrpiction,
            user_id: userId
        });
        return this.httpservice.postBody("get_retract", body);
    };
    // 提交审核
    CommonUseServices.prototype.submit_apply = function (id, userId) {
        var body = JSON.stringify({
            id: id,
            user_id: userId
        });
        return this.httpservice.postBody("submit_apply", body);
    };
    // 创建审批单草稿
    CommonUseServices.prototype.createApply = function (data) {
        var body = JSON.stringify(data);
        console.log("JSON 的body 是" + body);
        return this.httpservice.postBody("create_apply_order", body);
    };
    CommonUseServices.prototype.get_leaveType = function () {
        var body = JSON.stringify({
            limit: 10
        });
        return this.httpservice.postBody("get_leaveType", body);
    };
    CommonUseServices.prototype.get_shengou_item = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id
        });
        return this.httpservice.postBody("get_shengou_item", body);
    };
    // 暂支
    CommonUseServices.prototype.get_zanzhi_list = function (id, limit, offset, type) {
        var body = JSON.stringify({
            user_id: id,
            limit: limit,
            offset: offset,
            type: type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    };
    CommonUseServices.prototype.get_zanzhi_listNoLoading = function (id, limit, offset, type) {
        var body = JSON.stringify({
            user_id: id,
            limit: limit,
            offset: offset,
            type: type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    };
    CommonUseServices.prototype.searchZanzhiList = function (id, type, data, text) {
        var body = JSON.stringify({
            user_id: id,
            type: type,
            data: data,
            text: text
        });
        return this.httpservice.postBody("search_zanzhi_list", body);
    };
    CommonUseServices.prototype.confirm = function (sheet_id, user_id, title, type) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: title,
            type: type
        });
        return this.httpservice.postBody("confirm_zanzhi", body);
    };
    CommonUseServices.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_zanzhi", body);
    };
    CommonUseServices.prototype.get_zanzhi_reminding = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
        });
        return this.httpservice.postBody("get_zanzhi_reminding", body);
    };
    CommonUseServices.prototype.save_zanzhi = function (amount, remark, submit) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            amount: amount,
            remark: remark,
            submit: submit
        });
        return this.httpservice.postBody("create_zanzhi", body);
    };
    CommonUseServices.prototype.save_edit_zanzhi = function (amount, remark, submit, id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            amount: amount,
            remark: remark,
            submit: submit,
            order_id: id
        });
        return this.httpservice.postBody("save_edit_zanzhi", body);
    };
    CommonUseServices.prototype.submitOrder = function (id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            id: id
        });
        return this.httpservice.postBody("submit_order", body);
    };
    CommonUseServices.prototype.callbackOrder = function (description, id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            id: id,
            description: description
        });
        return this.httpservice.postBody("callback_order", body);
    };
    CommonUseServices.prototype.get_apply_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_apply_count", body);
    };
    CommonUseServices.prototype.get_shengou_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_shengou_count", body);
    };
    CommonUseServices.prototype.get_all_need_do = function (user_id, is_plus, isShowKucun, need_all) {
        var body = JSON.stringify({
            user_id: user_id,
            is_plus: is_plus,
            is_kucun: isShowKucun,
            need_all: need_all,
        });
        return this.httpservice.postBodyNoLoading("get_all_need_do", body);
    };
    CommonUseServices.prototype.get_all_num = function (body) {
        return this.httpservice.postBodyNoLoading("get_all_num", body);
    };
    return CommonUseServices;
}());
CommonUseServices = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], CommonUseServices);

//# sourceMappingURL=commonUseServices.js.map

/***/ })

});
//# sourceMappingURL=93.js.map