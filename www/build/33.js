webpackJsonp([33],{

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/reimbursement-detail/reimbursement-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reimbursementService__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__commonUseServices__ = __webpack_require__(741);
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
 * Generated class for the ReimbursementDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ReimbursementDetailPage = (function () {
    function ReimbursementDetailPage(navCtrl, navParams, baoxiaoService, alertCtrl, storage, toastCtrl, commonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.baoxiaoService = baoxiaoService;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.commonService = commonService;
        this.isAdd = false;
        this.isChange = false;
        this.item = this.navParams.get('item');
        this.title = this.item.expense_name;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("ApplyPage", navCtrl);
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.user_id = res.result.res_data.user_id;
            if (_this.user_id != 1) {
                _this.commonService.getPaymentReminding(_this.user_id).then(function (res) {
                    if (res.result && res.result.res_code == 1) {
                        console.log(res.result.res_data);
                        _this.productList = res.result.res_data.product.res_data;
                        _this.taxList = res.result.res_data.taxList.res_data;
                        // console.log(this.taxList)
                    }
                });
            }
        });
        console.log(this.item.state);
        var to_approve_name = this.item.to_approve_id;
        if (this.item.state == '发送' || this.item.state == '1级审核' || this.item.state == '2级审核') {
            this.isShowFooter = true;
            this.storage.get('user')
                .then(function (res) {
                if (res.result.res_data.name != to_approve_name) {
                    _this.isShowFooter = false;
                }
            });
        }
        else {
            this.isShowFooter = false;
        }
        console.log(this.isShowFooter + "      this.isShowFooter" + __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id + "   " + this.item.to_approve_id);
        console.log(this.item);
    }
    ReimbursementDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReimbursementDetailPage');
    };
    ReimbursementDetailPage.prototype.ionViewWillEnter = function () {
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
    ReimbursementDetailPage.prototype.getTotalAmount = function () {
        if (this.item.line_ids) {
            var total = 0;
            for (var _i = 0, _a = this.item.line_ids; _i < _a.length; _i++) {
                var item = _a[_i];
                total = total + parseFloat(item.unit_amount);
            }
            this.item.amount = total;
        }
    };
    ReimbursementDetailPage.prototype.conform = function () {
        var _this = this;
        var body = this.calDetail();
        var ctrl = this.alertCtrl;
        if (this.item.state == '发送') {
            var ctrl_1 = this.alertCtrl;
            ctrl_1.create({
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
                        handler: function (data) {
                            // console.log('Cancel clicked');
                        }
                    },
                    {
                        text: '通过',
                        handler: function (data) {
                            if (data.title) {
                                _this.baoxiaoService.confirm1(_this.item.sheet_id, _this.user_id, data.title, body).then(function (res) {
                                    if (res) {
                                        if (res.result.res_data.success == 1) {
                                            console.log(res.result.res_data.success);
                                            ctrl_1.create({
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
                            }
                            else {
                                _this.baoxiaoService.confirm1(_this.item.sheet_id, _this.user_id, null, body).then(function (res) {
                                    if (res) {
                                        if (res.result.res_data.success == 1) {
                                            console.log(res.result.res_data.success);
                                            ctrl_1.create({
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
                            }
                        }
                    }
                ]
            }).present();
        }
        else if (this.item.state == '1级审核') {
            var ctrl_2 = this.alertCtrl;
            ctrl_2.create({
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
                        handler: function (data) {
                            // console.log('Cancel clicked');
                        }
                    },
                    {
                        text: '通过',
                        handler: function (data) {
                            if (data.title) {
                                _this.baoxiaoService.confirm2(_this.item.sheet_id, _this.user_id, data.title, body).then(function (res) {
                                    if (res) {
                                        if (res.result.res_data.success == 1) {
                                            console.log(res.result.res_data.success);
                                            ctrl_2.create({
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
                            }
                            else {
                                _this.baoxiaoService.confirm2(_this.item.sheet_id, _this.user_id, null, body).then(function (res) {
                                    if (res) {
                                        if (res.result.res_data.success == 1) {
                                            console.log(res.result.res_data.success);
                                            ctrl_2.create({
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
                            }
                        }
                    }
                ]
            }).present();
        }
        else if (this.item.state == '2级审核') {
            var ctrl_3 = this.alertCtrl;
            ctrl_3.create({
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
                        handler: function (data) {
                            // console.log('Cancel clicked');
                        }
                    },
                    {
                        text: '通过',
                        handler: function (data) {
                            if (data.title) {
                                _this.baoxiaoService.confirm_approve3(_this.item.sheet_id, _this.user_id, data.title, body).then(function (res) {
                                    if (res) {
                                        if (res.result.res_data.success == 1) {
                                            console.log(res.result.res_data.success);
                                            ctrl_3.create({
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
                            }
                            else {
                                _this.baoxiaoService.confirm_approve3(_this.item.sheet_id, _this.user_id, null, body).then(function (res) {
                                    if (res) {
                                        if (res.result.res_data.success == 1) {
                                            console.log(res.result.res_data.success);
                                            ctrl_3.create({
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
                            }
                        }
                    }
                ]
            }).present();
        }
    };
    ReimbursementDetailPage.prototype.cancel = function () {
        this.showPrompt();
    };
    ReimbursementDetailPage.prototype.showPrompt = function () {
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
                            _this.baoxiaoService.refuse(_this.item.sheet_id, data.title, _this.user_id).then(function (res) {
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
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("请填写拒绝原因", _this.toastCtrl);
                        }
                    }
                }
            ]
        }).present();
    };
    ReimbursementDetailPage.prototype.getTax = function (items) {
        if (items.tax_ids) {
            if (items.tax_ids[0]) {
                if (items.tax_ids[0].display_name) {
                    return items.tax_ids[0].display_name;
                }
                else {
                    return "";
                }
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    };
    ReimbursementDetailPage.prototype.changeProductItem = function (i) {
        this.index = i;
        console.log(this.item.line_ids[i]);
        this.navCtrl.push('EditReimbursementPage', {
            item: this.item.line_ids[i],
            index: i,
            product: this.productList,
            taxList: this.taxList,
        });
    };
    ReimbursementDetailPage.prototype.calDetail = function () {
        var self = this;
        var productionList = [];
        for (var _i = 0, _a = this.item.line_ids; _i < _a.length; _i++) {
            var item = _a[_i];
            var taxId = void 0;
            for (var _b = 0, _c = this.taxList; _b < _c.length; _b++) {
                var tax_detail = _c[_b];
                if (item.tax_ids.length > 0) {
                    if (tax_detail.name == item.tax_ids[0].display_name) {
                        taxId = tax_detail.id;
                    }
                }
                else {
                    taxId = 4;
                }
            }
            var productIndex = void 0;
            for (var i = 0; i < this.productList.length; i++) {
                if ((new RegExp(item.product_id).test(this.productList[i].name)) || item.product_id == this.productList[i].name) {
                    productIndex = this.productList[i].id;
                }
            }
            var pro = {
                name: item.name,
                product_id: parseInt(productIndex),
                unit_amount: parseFloat(item.unit_amount),
                taxid: taxId,
                remarks: item.description,
                line_id: item.line_id,
            };
            productionList.push(pro);
        }
        var mbody = {
            expense_line_ids: productionList,
        };
        var body = {
            data: mbody
        };
        return body;
    };
    ReimbursementDetailPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    return ReimbursementDetailPage;
}());
ReimbursementDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-reimbursement-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/reimbursement-detail/reimbursement-detail.html"*/'<!--\n  Generated template for the ReimbursementDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-list>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">申请人</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.employee_name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">待审核人</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.to_approve_id}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">部门（费用归属）</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{item.department}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">暂支余额</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{item.pre_payment_reminding}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="total_amount">金额总计（元）：{{item.amount}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-item-group>\n    <ion-item tappable (click)="changeProductItem(i)" *ngFor=\'let items of item.line_ids;let i = index\' style="margin-top:8px;">\n      <div class="detail_div">\n        <span style="font-size:80%;color:#00a7f1;float:left;font-weight:bold;margin-top:-2px">● {{items.product_id}}</span>\n        <span style="float:right;font-size:80%;margin-top:-2px">金额：￥{{items.unit_amount}}</span>\n        <span *ngIf="items.tax_ids.length > 0" style="font-size:80%;color:gray;float:right;margin-right:20px;margin-top:-2px">税金：{{getTax(items)}}</span>\n      </div>\n\n      <p text-wrap style="font-size:80%;color:gray;margin-top:5px;">消费用途：{{items.name}}</p>\n      <p text-wrap style="font-size:80%;color:gray;margin-top:2px;">备注：{{items.description}} </p>\n    </ion-item>\n    <!--<ion-item-options *ngIf="item.state" side="right">\n          <button ion-button color="primary" (click)="changeProductItem(i)">\n              <ion-icon name="create"></ion-icon>\n              修改\n            </button>\n        </ion-item-options>-->\n  </ion-item-group>\n\n  <div style="margin:10px;">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let items of item.message_ids\' style="overflow:hidden" class="middle_item">\n      <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{items.create_person_ava}}>\n      <div style="overflow:hidden">\n        <span style="margin-top:3px;color:black;font-size:80%;float:left">{{items.create_person}}</span>\n\n        <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(items.create_time) | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n      </div>\n      <p *ngIf="items.old_state || items.new_state" style="font-size:80%;">{{items.old_state}}=>{{items.new_state}}</p>\n      <p text-wrap style="font-size:80%;">{{items.description}}</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer *ngIf="isShowFooter">\n    <button ion-button ion-end round style=\'width:40%;float:right;margin-right:5%;background-color:#1eabfe\' tappable (click)=\'conform()\'\n      full>通过</button>\n    <button ion-button ion-start round style=\'width:40%;margin-left:5%; background-color:red\' tappable (click)=\'cancel()\' full>拒绝</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/reimbursement-detail/reimbursement-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__reimbursementService__["a" /* ReimbursementService */], __WEBPACK_IMPORTED_MODULE_6__commonUseServices__["a" /* CommonUseServices */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__reimbursementService__["a" /* ReimbursementService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__commonUseServices__["a" /* CommonUseServices */]])
], ReimbursementDetailPage);

//# sourceMappingURL=reimbursement-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/reimbursement-detail/reimbursement-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReimbursementDetailPageModule", function() { return ReimbursementDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var reimbursement_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var reimbursement_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReimbursementDetailPageModule = (function () {
    function ReimbursementDetailPageModule() {
    }
    return ReimbursementDetailPageModule;
}());
ReimbursementDetailPageModule = reimbursement_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ReimbursementDetailPage,
        ],
        imports: [
            reimbursement_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ReimbursementDetailPage),
        ],
    })
], ReimbursementDetailPageModule);

//# sourceMappingURL=reimbursement-detail.module.js.map

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

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReimbursementService; });
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


var ReimbursementService = (function () {
    function ReimbursementService(httpservice) {
        this.httpservice = httpservice;
    }
    ReimbursementService.prototype.getApprovalList = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("wait_approval", body);
    };
    ReimbursementService.prototype.getAlreadApprovalList = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("already_approved", body);
    };
    ReimbursementService.prototype.confirm1 = function (sheet_id, user_id, reason, expense_line_ids) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: reason,
            expense_line_ids: expense_line_ids,
        });
        return this.httpservice.postBody("confirm_approve1", body);
    };
    ReimbursementService.prototype.confirm2 = function (sheet_id, user_id, reason, expense_line_ids) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: reason,
            expense_line_ids: expense_line_ids,
        });
        return this.httpservice.postBody("confirm_approve2", body);
    };
    ReimbursementService.prototype.confirm_approve3 = function (sheet_id, user_id, reason, expense_line_ids) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: reason,
            expense_line_ids: expense_line_ids,
        });
        return this.httpservice.postBody("confirm_approve3", body);
    };
    ReimbursementService.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_approve", body);
    };
    ReimbursementService.prototype.searchApproveList = function (type, user_id, search_text) {
        var body = JSON.stringify({
            type: type,
            user_id: user_id,
            search_text: search_text,
        });
        return this.httpservice.postBody("search_approve", body);
    };
    ReimbursementService.prototype.searchAlreadyApproveList = function (type, user_id, search_text) {
        var body = JSON.stringify({
            type: type,
            user_id: user_id,
            search_text: search_text,
        });
        return this.httpservice.postBody("search_already_approve", body);
    };
    return ReimbursementService;
}());
ReimbursementService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ReimbursementService);

//# sourceMappingURL=reimbursementService.js.map

/***/ })

});
//# sourceMappingURL=33.js.map