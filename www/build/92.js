webpackJsonp([92],{

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi-detail/zanzhi-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commonUseServices__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the ZanzhiDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ZanzhiDetailPage = (function () {
    function ZanzhiDetailPage(navCtrl, navParams, alertCtrl, storage, commonServices, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.commonServices = commonServices;
        this.toastCtrl = toastCtrl;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("ZanzhiPage", navCtrl);
        this.res_data = this.navParams.get('item');
        this.state = this.res_data.state;
        this.pet = this.navParams.get('pet');
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.user_id = res.result.res_data.user_id;
        });
        console.log(this.res_data);
    }
    ZanzhiDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ZanzhiDetailPage');
    };
    ZanzhiDetailPage.prototype.conform = function () {
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
    ZanzhiDetailPage.prototype.submit = function (reason) {
        var _this = this;
        var ctrl = this.alertCtrl;
        this.commonServices.confirm(this.res_data.id, this.user_id, reason, this.res_data.state).then(function (res) {
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
    ZanzhiDetailPage.prototype.cancel = function () {
        this.showPrompt();
    };
    ZanzhiDetailPage.prototype.showPrompt = function () {
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
                            _this.commonServices.refuse(_this.res_data.id, data.title, _this.user_id).then(function (res) {
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
    ZanzhiDetailPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    ZanzhiDetailPage.prototype.callbackOrder = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '确定撤回暂支单?',
            inputs: [
                {
                    name: 'descrption',
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        console.log(data['descrption']);
                        if (data['descrption']) {
                            _this.commonServices.callbackOrder(data['descrption'], _this.res_data.id).then(function (res) {
                                if (res.result && res.result.res_code == 1) {
                                    _this.alertCtrl.create({
                                        title: '提示',
                                        subTitle: "撤回成功",
                                        buttons: [
                                            {
                                                text: '确定',
                                                handler: function () {
                                                    _this.frontPage.data.need_fresh = true;
                                                    _this.navCtrl.pop();
                                                }
                                            }
                                        ]
                                    }).present();
                                }
                            });
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom("请填写撤回理由", _this.toastCtrl);
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ZanzhiDetailPage.prototype.editOrder = function () {
        this.navCtrl.push("ZanzhiApplyPage", { res_data: this.res_data });
    };
    ZanzhiDetailPage.prototype.submitOrder = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "确定提交审核?",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.commonServices.submitOrder(_this.res_data.id).then(function (res) {
                            if (res.result && res.result.res_code == 1) {
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.pop();
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    ZanzhiDetailPage.prototype.changeState = function (state) {
        if (state == 'draft') {
            return '草稿';
        }
        else if (state == "confirm") {
            return '确认';
        }
        else if (state == "manager1_approve") {
            return '1级审核';
        }
        else if (state == "manager2_approve") {
            return '2级审核';
        }
        else if (state == "manager3_approve") {
            return 'General Manager Approved';
        }
        else if (state == "approve") {
            return '批准';
        }
        else if (state == "paid") {
            return '已支付';
        }
        else if (state == "cancel") {
            return '取消';
        }
        else {
            return state;
        }
    };
    return ZanzhiDetailPage;
}());
ZanzhiDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-zanzhi-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/zanzhi/zanzhi-detail/zanzhi-detail.html"*/'<!--\n  Generated template for the ApplyDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{res_data.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n\n  <ion-item>\n    <ion-grid style="background:white">\n      <ion-row>\n        <ion-col col-2>\n          <img src={{res_data.create_person_ava}} class="imgHeard">\n        </ion-col>\n        <ion-col col-7 style="padding-top:14px">\n          <span style="font-size:80%;">{{res_data.employee}} </span>\n        </ion-col>\n        <ion-col col-3 style="padding-top:14px">\n          <span style="margin-left:5px;font-size:80%;color:#E0540E">{{changeState(state)}} </span>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n  <ion-item no-lines>\n      <div text-wrap style="float:right;font-size:80%;width:70%"> {{res_data.to_approve_id}} </div>\n      <div class="left_label" style="font-size:80%;width:30%"> 待审核人 </div>\n    </ion-item>\n  <ion-item no-lines>\n    <div text-wrap style="float:right;font-size:80%;width:70%"> {{res_data.bank_account_id}} </div>\n    <div class="left_label" style="font-size:80%;width:30%"> 银行账户 </div>\n  </ion-item>\n  <ion-item>\n    <div text-wrap style="float:right;font-size:80%;width:70%">{{res_data.remark}}</div>\n    <div class="left_label" style="font-size:80%;width:30%"> 备注 </div>\n  </ion-item>\n  <ion-item no-lines>\n    <ion-label class="left_label" style="font-size:80%">暂支余额 : {{res_data.payment_reminding}} </ion-label>\n    <ion-label style="color:#E0540E;" text-right>申请金额 : {{res_data.amount}} </ion-label>\n  </ion-item>\n  <ion-item no-lines>\n    <ion-label style="font-size:80%" text-right> 可用金额 : {{res_data.pre_payment_reminding}}</ion-label>\n  </ion-item>\n\n  <div style="margin:10px;">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let item of res_data.message_ids\' class="middle_item">\n      <img item-start style="width:40px;" src={{item.create_person_ava}}>\n      <div style="overflow:hidden">\n        <span style="margin-top:3px;color:black;font-size:80%;float:left">{{item.create_person}}</span>\n\n        <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(item.create_time)| date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n      </div>\n      <p *ngIf="item.old_state || item.new_state" style="font-size:80%;">{{item.old_state}}=>{{item.new_state}}</p>\n      <p text-wrap style="font-size:80%;">{{item.description}}</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n  <div style="display:flex ;justify-content:space-around">\n    <button *ngIf="pet==\'1\'" round ion-start style=\'width:40%;margin-left:5%; background-color:red\' ion-button (click)="cancel()">\n      拒绝\n    </button>\n    <button *ngIf="pet==\'1\'" ion-end round style=\'width:40%;float:right;margin-right:5%;background-color:#1eabfe\' ion-button\n      (click)="conform()">\n      通过\n    </button>\n    <button *ngIf="pet==\'0\'&& state!=\'paid\' && state!=\'cancel\'" round style=\'background-color:#f5a623;flex :1 1 100%\' ion-button (click)="callbackOrder()">\n      撤回申请\n    </button>\n    <button *ngIf="pet==\'0\'&& state==\'cancel\'" round style=\'background-color:#f5a623;flex :1 1 100%\' ion-button (click)="editOrder()">\n      编辑\n    </button>\n    <button *ngIf="pet==\'0\'&& state==\'draft\'" round style=\'background-color:#f5a623;flex :1 1 100%\' ion-button (click)="submitOrder()">\n      提交审核\n    </button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/zanzhi/zanzhi-detail/zanzhi-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__commonUseServices__["a" /* CommonUseServices */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1__commonUseServices__["a" /* CommonUseServices */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
], ZanzhiDetailPage);

//# sourceMappingURL=zanzhi-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/zanzhi/zanzhi-detail/zanzhi-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZanzhiDetailPageModule", function() { return ZanzhiDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var zanzhi_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ZanzhiDetailPageModule = (function () {
    function ZanzhiDetailPageModule() {
    }
    return ZanzhiDetailPageModule;
}());
ZanzhiDetailPageModule = zanzhi_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ZanzhiDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ZanzhiDetailPage),
        ],
    })
], ZanzhiDetailPageModule);

//# sourceMappingURL=zanzhi-detail.module.js.map

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
//# sourceMappingURL=92.js.map