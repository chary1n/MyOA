webpackJsonp([103],{

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/apply/apply-detail/apply-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commonUseServices__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the ApplyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ApplyDetailPage = (function () {
    function ApplyDetailPage(navCtrl, navParams, alertCtrl, commonService, toastCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.commonService = commonService;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.res_data = navParams.get('res_data');
        console.log(this.res_data);
        this.id = this.res_data.id;
        console.log(this.res_data);
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.userId = res.result.res_data.user_id;
        });
    }
    ApplyDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ApplyDetailPage');
    };
    ApplyDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.commonService.getApplyDetail(this.id).then(function (res) {
            if (res.result && res.result.res_data) {
                console.log(res);
                _this.res_data = res.result.res_data;
            }
        });
    };
    ApplyDetailPage.prototype.callbackApply = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '请填写撤回理由',
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
                            _this.commonService.get_retract(data['descrption'], _this.res_data.id, _this.userId).then(function (res) {
                                if (res.result && res.result.res_code == 1) {
                                    _this.alertCtrl.create({
                                        title: '提示',
                                        subTitle: "撤回成功",
                                        buttons: [
                                            {
                                                text: '确定',
                                                handler: function () {
                                                    _this.navCtrl.pop();
                                                }
                                            }
                                        ]
                                    }).present();
                                }
                            });
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_1__providers_Utils__["a" /* Utils */].toastButtom("请填写撤回理由", _this.toastCtrl);
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ApplyDetailPage.prototype.submitApply = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '确定提交审核?',
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
                        _this.commonService.submit_apply(_this.res_data.id, _this.userId).then(function (res) {
                            console.log(res);
                            if (res.result && res.result.res_code == 1) {
                                _this.alertCtrl.create({
                                    title: '提示',
                                    subTitle: "提交成功",
                                    buttons: [
                                        {
                                            text: '确定',
                                            handler: function () {
                                                _this.navCtrl.pop();
                                            }
                                        }
                                    ]
                                }).present();
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ApplyDetailPage.prototype.edit_apply = function () {
        this.navCtrl.push("BaoxiaoApplyPage", { data: this.res_data });
    };
    return ApplyDetailPage;
}());
ApplyDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-apply-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/apply/apply-detail/apply-detail.html"*/'<!--\n  Generated template for the ApplyDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{res_data.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-item>\n    <ion-label class="left_label">申请人</ion-label>\n    <ion-label item-end class="right_label">{{res_data.employee}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label class="left_label">部门（费用归属）</ion-label>\n    <ion-label item-end class="right_label">{{res_data.department}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label class="left_label">待审核人</ion-label>\n    <ion-label item-end class="right_label">{{res_data.to_approve_name}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label class="left_label">暂支余额</ion-label>\n    <ion-label item-end class="right_label">{{res_data.pre_payment_reminding}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label class="total_amount">金额总计（元）：{{res_data.payment}}</ion-label>\n  </ion-item>\n\n  <ion-list style="margin-top:10px" nolines *ngFor=\'let item of res_data.expense_line_ids;let i = index\'>\n    <ion-item>\n      <div class="detail_div">\n        <span style="font-size:80%;color:#00a7f1;float:left;font-weight:bold;margin-top:-2px">● {{item.name}}</span>\n        <span style="float:right;font-size:80%;margin-top:-2px">金额：￥{{item.amount}}</span>\n        <span *ngIf="item.tax" style="font-size:80%;color:gray;float:right;margin-right:20px;margin-top:-2px">税金：{{item.tax}}</span>\n      </div>\n      <p text-wrap style="font-size:80%;color:gray;margin-top:5px;">消费用途：{{item.description}}</p>\n      <p text-wrap style="font-size:80%;color:gray;margin-top:2px;">备注：{{item.remarks}} </p>\n    </ion-item>\n  </ion-list>\n  <div style="margin:10px;">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let item of res_data.message_ids\' class="middle_item">\n      <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{item.create_person_ava}}>\n\n      <div style="overflow:hidden">\n        <span style="margin-top:3px;color:black;font-size:80%;float:left">{{item.create_person}}</span>\n\n        <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{item.create_time}}</span>\n      </div>\n      <p *ngIf="item.old_state || item.new_state" style="font-size:80%;">{{item.old_state}}=>{{item.new_state}}</p>\n      <p text-wrap style="font-size:80%;">{{item.description}}</p>\n    </ion-item>\n  </ion-list>\n    \n</ion-content>\n\n<ion-footer>\n  <button *ngIf="res_data.state==\'draft\' " ion-end style=\'width:48%\' ion-button (click)="submitApply()">\n    提交申请\n  </button>\n  <button *ngIf="res_data.state==\'draft\'" ion-start style=\'width:48%\' ion-button (click)="callbackApply()">\n    撤回申请\n  </button>\n\n  <button *ngIf="res_data.state==\'cancel\'" ion-start full ion-button (click)="edit_apply()">\n    编辑\n  </button>\n\n\n  <button *ngIf="res_data.state!=\'cancel\' && res_data.state!=\'draft\' && res_data.state!=\'post\'&& res_data.state!=\'done\' " ion-start\n    full ion-button (click)="callbackApply()">\n    撤回申请\n  </button>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/apply/apply-detail/apply-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__commonUseServices__["a" /* CommonUseServices */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__commonUseServices__["a" /* CommonUseServices */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["E" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
], ApplyDetailPage);

//# sourceMappingURL=apply-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/apply/apply-detail/apply-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplyDetailPageModule", function() { return ApplyDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var apply_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ApplyDetailPageModule = (function () {
    function ApplyDetailPageModule() {
    }
    return ApplyDetailPageModule;
}());
ApplyDetailPageModule = apply_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ApplyDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ApplyDetailPage),
        ],
    })
], ApplyDetailPageModule);

//# sourceMappingURL=apply-detail.module.js.map

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

/***/ })

});
//# sourceMappingURL=103.js.map