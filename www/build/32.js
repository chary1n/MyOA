webpackJsonp([32],{

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/create-shengou/create-shengou.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonUseServices__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shengouService__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(239);
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
 * Generated class for the CreateShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CreateShengouPage = (function () {
    function CreateShengouPage(navCtrl, navParams, storage, commonService, shenGouService, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.commonService = commonService;
        this.shenGouService = shenGouService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        // 添加的报销明细
        this.items = [];
        this.total = 0;
        this.data = [];
        this.isAdd = false;
        this.isChange = false;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("ShengoupagePage", navCtrl);
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.user_id = res.result.res_data.user_id;
            _this.user_name = res.result.res_data.name;
            _this.partner_id = res.result.res_data.partner_id;
            // this.department_id = res.result.res_data.department_id
            _this.shenGouService.get_all_departments(_this.user_id).then(function (res) {
                console.log(res);
                if (res.result.res_data.employee_id) {
                    _this.employee_id = res.result.res_data.employee_id;
                }
                if (res.result.res_data.all_departments) {
                    _this.departmentList = res.result.res_data.all_departments.res_data;
                }
                if (res.result.res_data.default_department) {
                    _this.department = res.result.res_data.default_department.res_data[0].id;
                }
            });
        });
    }
    CreateShengouPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateShengouPage');
    };
    CreateShengouPage.prototype.ionViewWillEnter = function () {
        this.isAdd = this.navParams.get("isAdd");
        this.isChange = this.navParams.get("isChange");
        if (this.isAdd) {
            console.log(this.production);
            this.production = this.navParams.get('production');
            if (this.production) {
                this.items.push(this.production);
            }
            this.navParams.data.isAdd = false;
        }
        if (this.isChange) {
            var changeItem = this.items[this.items.length - 1];
            this.items.splice(this.index, 1, changeItem);
            this.items.pop();
            this.navParams.data.isChange = false;
        }
        this.getTotalAmount();
    };
    CreateShengouPage.prototype.changeProductItem = function (i) {
        this.index = i;
        this.navCtrl.push('AddShengouDetailPage', {
            item: this.items[i], index: i
            // , product: this.productList
        });
    };
    CreateShengouPage.prototype.addApplyDetail = function () {
        this.navCtrl.push('AddShengouDetailPage', {});
    };
    CreateShengouPage.prototype.getTotalAmount = function () {
        if (this.items) {
            var total = 0;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                console.log(parseFloat((parseFloat(item.amount) * parseFloat(item.unit)).toFixed(2)));
                total = total + parseFloat((parseFloat(item.amount) * parseFloat(item.unit)).toFixed(2));
            }
            this.total = parseFloat(total.toFixed(2));
        }
    };
    CreateShengouPage.prototype.goBack = function () {
        var _this = this;
        if (this.items.length > 0) {
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
    CreateShengouPage.prototype.deleteProductItem = function (i) {
        this.items.splice(i, 1);
        this.getTotalAmount();
    };
    CreateShengouPage.prototype.save = function () {
        var _this = this;
        var mString = "";
        if (!this.department) {
            mString = mString + "   请选择部门";
        }
        if (this.items.length <= 0) {
            mString = mString + "   请填写申购明细";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            this.alertCtrl.create({
                title: '提示',
                subTitle: '是否提交?',
                buttons: [{ text: '取消' },
                    {
                        text: '确定',
                        handler: function () {
                            _this.createApply();
                        }
                    }
                ]
            }).present();
        }
    };
    CreateShengouPage.prototype.createApply = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        var productionList = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var pro = {
                description: item.remark,
                quantity: parseInt(item.unit),
                // department_id: parseInt(this.department),
                product_id: parseInt(item.productId),
                price_unit: parseFloat(item.amount)
            };
            productionList.push(pro);
        }
        var mbody = {
            department_id: parseInt(this.department),
            employee_id: parseInt(this.employee_id),
            line_ids: productionList,
            create_uid: this.user_id,
            total_amount: this.total,
        };
        var body = {
            data: mbody
        };
        // console.log(body)
        this.shenGouService.create_shengou(body).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                // this.navCtrl.pop()
                ctrl.create({
                    title: '提示',
                    subTitle: "是否立即提交审核？",
                    buttons: [
                        {
                            text: '暂不提交',
                            handler: function () {
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        }, {
                            text: '立即提交',
                            handler: function () {
                                _this.shenGouService.push_apply(res.result.res_data.sheet_id, _this.user_id).then(function (res) {
                                    if (res.result.res_data.success == 1) {
                                        console.log(res.result.res_data.success);
                                        ctrl.create({
                                            title: '提示',
                                            subTitle: "提交审核成功",
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
                        }
                    ]
                }).present();
            }
        });
    };
    CreateShengouPage.prototype.transInt = function (intValue, intOtherValue) {
        return (parseFloat(intValue) * parseInt(intOtherValue)).toFixed(2);
    };
    return CreateShengouPage;
}());
CreateShengouPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-create-shengou',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/create-shengou/create-shengou.html"*/'<!--\n  Generated template for the BaoxiaoApplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>新建申购</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-item>\n    <ion-label>申请人\n      <!-- <span style="color:red;"> *</span> -->\n    </ion-label>\n    <ion-label item-end text-right>{{user_name}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color:black">部门(费用归属)</ion-label> \n    <ion-select [(ngModel)]="department" class="normal-select" okText="确定" cancelText="取消">\n      <ion-option *ngFor="let item of departmentList;" value={{item.id}} \n       >{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-list style="margin-top:10px" lines>\n      <ion-item-sliding  *ngFor=\'let item of items;let i = index\'>\n      <ion-item tappable (click) = "changeProductItem(i)">\n        <div >申购明细{{i+1}}</div>\n        <p text-wrap class="team_p">产品：{{item.productName}}</p>\n        <p text-wrap class="team_p">单价：{{item.amount}}    数量：{{item.unit}} 小计：{{(transInt(item.amount,item.unit))}} </p>\n        <p text-wrap class="team_p">费用说明：{{item.remark}}</p>\n      </ion-item>\n      <ion-item-options side="right">\n          <button ion-button color="primary" (click)="changeProductItem(i)">\n              <ion-icon name="create"></ion-icon>\n              修改\n            </button>\n          <button ion-button color="primary" (click)="deleteProductItem(i)">\n                <ion-icon name="trash"></ion-icon>\n                删除\n              </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n\n\n\n  <button ion-button full (click)="addApplyDetail()">\n    + 申购明细\n  </button>\n\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <button ion-button ion-start style=\'width:66%\' clear> 金额总计 (元) : {{total}}</button>\n    <button ion-button ion-end style=\'width:30%\' (click)=\'save()\'> 保存</button>\n  </ion-toolbar>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/create-shengou/create-shengou.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__commonUseServices__["a" /* CommonUseServices */], __WEBPACK_IMPORTED_MODULE_4__shengouService__["a" /* ShenGouService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__commonUseServices__["a" /* CommonUseServices */], __WEBPACK_IMPORTED_MODULE_4__shengouService__["a" /* ShenGouService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], CreateShengouPage);

//# sourceMappingURL=create-shengou.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/create-shengou/create-shengou.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateShengouPageModule", function() { return CreateShengouPageModule; });
/* harmony import */ var create_shengou_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var create_shengou_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var create_shengou_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreateShengouPageModule = (function () {
    function CreateShengouPageModule() {
    }
    return CreateShengouPageModule;
}());
CreateShengouPageModule = create_shengou_module___decorate([
    create_shengou_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CreateShengouPage,
        ],
        imports: [
            create_shengou_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CreateShengouPage),
        ],
    })
], CreateShengouPageModule);

//# sourceMappingURL=create-shengou.module.js.map

/***/ }),

/***/ 741:
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
//# sourceMappingURL=32.js.map