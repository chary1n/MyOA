webpackJsonp([73],{

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/material-request/edit-material-request/edit-material-request.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__materialService__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(238);
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
 * Generated class for the EditMaterialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditMaterialRequestPage = (function () {
    function EditMaterialRequestPage(navCtrl, navParams, mService, storage, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mService = mService;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("MaterialRequestPage", navCtrl);
        this.item = navParams.get('item');
        console.log(this.item);
        this.isShow = "normal";
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.partner_id = res.result.res_data.partner_id;
            _this.mService.get_final_review().then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    console.log(_this.item.picking_type);
                    console.log(res.result.res_data);
                    if (_this.item.picking_type == "pick_type") {
                        console.log(1);
                        for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                            var items = _a[_i];
                            if (items.review_type == "picking_review_line") {
                                if (items.final_review_partner_id.id == _this.partner_id) {
                                    _this.isShow = "final";
                                }
                            }
                        }
                    }
                    else if (_this.item.picking_type == "proofing") {
                        console.log(2);
                        for (var _b = 0, _c = res.result.res_data; _b < _c.length; _b++) {
                            var items = _c[_b];
                            console.log(items.review_type);
                            if (items.review_type == "picking_review_project") {
                                if (items.final_review_partner_id.id == _this.partner_id) {
                                    _this.isShow = "final";
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    EditMaterialRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditMaterialRequestPage');
    };
    EditMaterialRequestPage.prototype.changeType = function (state) {
        if (state.toLowerCase() == "pick_type") {
            return "产线领用";
        }
        else if (state.toLowerCase() == "proofing") {
            return "工程领用";
        }
        else {
            return state;
        }
    };
    EditMaterialRequestPage.prototype.changeState = function (state) {
        if (state.toLowerCase() == "canceled") {
            return "已取消";
        }
        else if (state.toLowerCase() == "to_submit") {
            return "待提交";
        }
        else if (state.toLowerCase() == "submitted") {
            return "已提交";
        }
        else if (state.toLowerCase() == "to_approved") {
            return "待审批";
        }
        else if (state.toLowerCase() == "review_ing") {
            return "审核中";
        }
        else if (state.toLowerCase() == "approved_finish") {
            return "等待领料";
        }
        else if (state.toLowerCase() == "finish_pick") {
            return "完成";
        }
        else if (state.toLowerCase() == "refused") {
            return "已拒绝";
        }
    };
    EditMaterialRequestPage.prototype.changeStateWithName = function (item) {
        if (item.who_review_now.name) {
            return this.changeState(item.picking_state) + '/' + item.who_review_now.name;
        }
        else {
            return this.changeState(item.picking_state);
        }
    };
    EditMaterialRequestPage.prototype.changeName = function (i, name) {
        return i + "." + name;
    };
    EditMaterialRequestPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    EditMaterialRequestPage.prototype.changeShenpiState = function (state) {
        if (state.state.toLowerCase() == "waiting_review") {
            return "等待审核";
        }
        else if (state.state.toLowerCase() == "review_success") {
            if (state.last_review_line_id) {
                return "审核通过";
            }
            else {
                return "提交审核";
            }
        }
        else if (state.state.toLowerCase() == "review_fail") {
            return "审核不通过";
        }
        else if (state.state.toLowerCase() == "review_canceled") {
            return "取消审核";
        }
    };
    EditMaterialRequestPage.prototype.cancel = function () {
        this.showPrompt();
    };
    EditMaterialRequestPage.prototype.showPrompt = function () {
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
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        if (data.title) {
                            _this.mService.action_deny(_this.item.id, data.title, _this.user_id).then(function (res) {
                                if (res.result.res_data.success == 1) {
                                    __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("已拒绝", _this.toastCtrl);
                                    _this.frontPage.data.need_fresh = true;
                                    _this.navCtrl.popTo(_this.frontPage);
                                }
                                else {
                                    __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请求失败", _this.toastCtrl);
                                }
                            });
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请填写拒绝原因", _this.toastCtrl);
                        }
                    }
                }
            ]
        }).present();
    };
    EditMaterialRequestPage.prototype.confirm = function () {
        this.navCtrl.push('ShenheMaterialRequestPage', {
            item: this.item,
            type: "normal",
        });
    };
    EditMaterialRequestPage.prototype.confirmFinal = function () {
        this.navCtrl.push('ShenheMaterialRequestPage', {
            item: this.item,
            type: "final",
        });
    };
    EditMaterialRequestPage.prototype.confirmOK = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "填写审批备注",
            inputs: [
                {
                    name: 'title',
                    placeholder: '审批备注'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        var remark_str = "";
                        if (data.title) {
                            remark_str = data.title;
                        }
                        else {
                            remark_str = "";
                        }
                        _this.mService.action_pass(_this.item.id, remark_str, _this.user_id).then(function (res) {
                            if (res.result.res_data.success == 1) {
                                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("终审通过", _this.toastCtrl);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                            else {
                                __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请求失败", _this.toastCtrl);
                            }
                        });
                    }
                }
            ]
        }).present();
        // this.navCtrl.push('ShenheMaterialRequestPage',{
        //   item:this.item,
        // })
    };
    return EditMaterialRequestPage;
}());
EditMaterialRequestPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-edit-material-request',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/edit-material-request/edit-material-request.html"*/'<!--\n  Generated template for the MaterialRequestDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color"> \n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-list>\n    <!--<ion-item>\n        <img item-start style="width:40px;float:left" src="{{item.user_ava}}">\n      <span style="margin-top:50px">{{item.my_create_uid.name}}</span>\n      <span style="float:right;color:#de5622;font-size:13px;">{{changeStateWithName(item)}}</span>\n    </ion-item>-->\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">交货日期</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.delivery_date}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">领料类型</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{changeType(item.picking_type)}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">领料原因</ion-label>\n      <ion-label item-end text-wrap style="font-size:75%;text-align:right;">{{item.picking_cause}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">备注</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.remark}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-item-group >\n\n    <ion-item >\n      <ion-label style="font-size:80%;color:#00a7f1;float:left;font-weight:bold;margin-top:12px;">● 领料明细</ion-label>\n    </ion-item>\n    <ion-item  *ngFor=\'let items of item.line_ids;let i = index\'>    \n      <p text-wrap>{{changeName(i+1,items.product_id.name)}}</p>\n      <div style="margin-top:5px">\n        <span style="float:left;color:gray;font-size:80%;margin-top:-2px">需求：{{items.product_qty}}</span>\n        <span style="font-size:80%;color:gray;float:left;margin-left:20px;margin-top:-2px">库存：{{items.qty_available}}</span>\n        <!--<span style="font-size:80%;color:gray;float:left;margin-left:20px;margin-top:-2px">领料：{{items.quantity_done}}</span>-->\n      </div>  \n    </ion-item>\n  </ion-item-group>\n\n  <div *ngIf="item.review_process_line_ids.length > 0" style="margin:10px;color:gray">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let items of item.review_process_line_ids\' style="overflow:hidden" class="middle_item">\n          <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{items.user_ava}}>\n          <div style="overflow:hidden">\n          <span style="margin-top:3px;color:black;font-size:80%;float:left">{{items.write_uid.name}}</span>\n\n          <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(items.write_date) | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n          </div>\n          <p  style="font-size:80%;margin-top:2px;">{{changeShenpiState(items)}}</p>\n          <p *ngIf="items.remark" text-wrap style="font-size:80%;margin-left:50px">备注：{{items.remark}}</p>\n          \n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer *ngIf = "isShow == \'normal\'">\n  <ion-toolbar >\n    <ion-grid style="width:100%;height:44px">\n    <ion-row class="row_class" align-items-center>\n      <ion-col>\n         <div >\n             <button ion-button  style=\'background-color:red;border-radius:20px;height:40px\' tappable (click)=\'cancel()\' full>拒绝</button>\n        </div>\n      </ion-col>\n      <ion-col>\n        <div >\n          <button ion-button  style=\'background-color:#1eabfe;border-radius:20px;height:40px\' tappable (click)=\'confirm()\' full>送审</button>\n        </div>\n      </ion-col>\n      <!--<ion-col>\n        <div align="center">\n            <button ion-button  style=\'background-color:#1eabfe;border-radius:20px;\' tappable (click)=\'confirmFinal()\' full>送终审</button>\n        </div>\n      </ion-col>-->\n    </ion-row>\n  </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n\n<ion-footer *ngIf = "isShow == \'final\'">\n  <ion-toolbar>\n    <ion-grid style="width:100%;height:44px">\n    <ion-row class="row_class" align-items-center>\n      <ion-col>\n         <div>\n             <button ion-button  style=\'background-color:red;border-radius:20px;height:40px\' tappable (click)=\'cancel()\' full>拒绝</button>\n        </div>\n      </ion-col>\n\n      <ion-col>\n        <div>\n            <button ion-button  style=\'background-color:#1eabfe;border-radius:20px;height:40px\' tappable (click)=\'confirmOK()\' full>通过</button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n\n\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/edit-material-request/edit-material-request.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__materialService__["a" /* materialService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__materialService__["a" /* materialService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], EditMaterialRequestPage);

//# sourceMappingURL=edit-material-request.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/edit-material-request/edit-material-request.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMaterialRequestPageModule", function() { return EditMaterialRequestPageModule; });
/* harmony import */ var edit_material_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var edit_material_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var edit_material_request_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditMaterialRequestPageModule = (function () {
    function EditMaterialRequestPageModule() {
    }
    return EditMaterialRequestPageModule;
}());
EditMaterialRequestPageModule = edit_material_request_module___decorate([
    edit_material_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EditMaterialRequestPage,
        ],
        imports: [
            edit_material_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EditMaterialRequestPage),
        ],
    })
], EditMaterialRequestPageModule);

//# sourceMappingURL=edit-material-request.module.js.map

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return materialService; });
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


var materialService = (function () {
    function materialService(httpservice) {
        this.httpservice = httpservice;
    }
    materialService.prototype.get_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_material_request_list", body);
    };
    materialService.prototype.get_wait_me_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_wait_me_material_request_list", body);
    };
    materialService.prototype.get_already_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_already_material_request_list", body);
    };
    materialService.prototype.get_final_review = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_final_review", body);
    };
    materialService.prototype.search_employee = function (name) {
        var body = JSON.stringify({
            name: name,
        });
        return this.httpservice.postBody("search_employee", body);
    };
    materialService.prototype.action_pass = function (id, remark, create_uid) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
        });
        return this.httpservice.postBody("action_pass", body);
    };
    materialService.prototype.action_deny = function (id, remark, create_uid) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
        });
        return this.httpservice.postBody("action_deny", body);
    };
    materialService.prototype.action_to_next = function (id, remark, create_uid, to_last_review, type, partner_name, partner_id) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
            to_last_review: to_last_review,
            type: type,
            partner_name: partner_name,
            partner_id: partner_id,
        });
        return this.httpservice.postBody("action_to_next", body);
    };
    materialService.prototype.search_material_request = function (search_text, type, user_id, waitme_type) {
        var body = JSON.stringify({
            search_text: search_text,
            type: type,
            user_id: user_id,
            waitme_type: waitme_type,
        });
        return this.httpservice.postBody("search_material_request", body);
    };
    return materialService;
}());
materialService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], materialService);

//# sourceMappingURL=materialService.js.map

/***/ })

});
//# sourceMappingURL=73.js.map