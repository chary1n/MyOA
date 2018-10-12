webpackJsonp([44],{

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/vacation-approval/vacation-detail/vacation-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vacationService__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
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
 * Generated class for the VacationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VacationDetailPage = (function () {
    function VacationDetailPage(navCtrl, navParams, vacationService, storage, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.vacationService = vacationService;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.data_arr = [];
        this.is_manager = false;
        this.delete_arr = [];
        this.data = this.navParams.get('data_item');
        this.data_arr = this.data.detail_lines;
        this.storage.get('user').then(function (res) {
            _this.user = res.result.res_data;
            if (res.result.res_data.user_id == _this.data.to_approve_user_id) {
                _this.is_manager = true;
            }
        });
    }
    VacationDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VacationDetailPage');
        // cordova.plugins.Keyboard.close();
    };
    VacationDetailPage.prototype.ionViewWillEnter = function () {
    };
    VacationDetailPage.prototype.click_confirm = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否确定同意？",
            inputs: [
                {
                    name: 'title',
                    placeholder: '审核意见'
                },
            ],
            buttons: [{
                    text: '取消',
                    handler: function (data) {
                        // cordova.plugins.Keyboard.close();
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        // cordova.plugins.Keyboard.close();
                        if (data.title) {
                            _this.vacationService.pass_vacation(_this.user.user_id, _this.data.vacation_id, data.title).then(function (res) {
                                if (res.result && res.result.res_code == 1) {
                                    __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("操作成功", _this.toastCtrl);
                                    _this.navCtrl.pop();
                                }
                            });
                        }
                        else {
                            _this.vacationService.pass_vacation(_this.user.user_id, _this.data.vacation_id, false).then(function (res) {
                                if (res.result && res.result.res_code == 1) {
                                    __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("操作成功", _this.toastCtrl);
                                    _this.navCtrl.pop();
                                }
                            });
                        }
                    }
                }]
        }).present();
    };
    VacationDetailPage.prototype.click_refuse = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否确定拒绝？",
            inputs: [
                {
                    name: 'title',
                    placeholder: '拒绝原因(必填)'
                },
            ],
            buttons: [{
                    text: '取消',
                    handler: function (data) {
                        // cordova.plugins.Keyboard.close();
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        // cordova.plugins.Keyboard.close();
                        if (data.title) {
                            _this.vacationService.refuse_vacation(_this.user.user_id, _this.data.vacation_id, data.title).then(function (res) {
                                if (res.result && res.result.res_code == 1) {
                                    __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("操作成功", _this.toastCtrl);
                                    _this.navCtrl.pop();
                                }
                            });
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请填写拒绝原因", _this.toastCtrl);
                        }
                    }
                }]
        }).present();
    };
    return VacationDetailPage;
}());
VacationDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-vacation-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/vacation-approval/vacation-detail/vacation-detail.html"*/'<!--\n  Generated template for the AttendanceRecoupDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>休假明细</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color:#f0f2f5">\n  <ion-item style="min-height:60px;height:60px;">\n    <ion-grid class="bg_main">\n      <ion-row>\n        <ion-col col-2>\n          <img src="{{data.employee_avatar}}" class="imgHeard">\n        </ion-col>\n        <ion-col col-7 style="padding-top:17px">\n          <span class="name_class">{{data.employee_name}}</span>\n        </ion-col>\n        <ion-col col-3 style="padding-top:17px">\n          <span class="state_class">{{data.state}}</span>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n  <ion-item no-lines>\n      <div text-wrap class="order_class"> {{data.rt_name}}</div>\n      <div class="left_label" > 单号 </div>\n    </ion-item>\n  <ion-item no-lines>\n    <div text-wrap class="order_class"> {{data.department_name}} </div>\n    <div class="left_label"> 部门 </div>\n  </ion-item>\n  <ion-item no-lines>\n    <div text-wrap class="order_class"> {{data.to_approve_name}} </div>\n    <div class="left_label"> 待审核人 </div>\n  </ion-item>\n \n  <div *ngIf="data_arr.length > 0" class="list_header_class">\n    休假明细\n  </div>\n  <ion-list no-lines>\n  <ion-item-sliding no-lines *ngFor=\'let item of data_arr;let i = index\'>\n  <ion-item *ngIf="!item.need_delete" style="border-bottom: solid 1px #f0f2f5;" class="item_class_1">\n    <div [ngClass]="{true:\'list_body_class\',false:\'list_body_class_no_bottom_line\'}[i != data_arr.length - 1]" tappable (click)="click_edit(item,i)">\n      <div class="body_type_class">\n        <div class="shu_class">\n        </div>\n        <div class="title_class">\n          {{item.type}}：{{item.sub_total}}h\n        </div>\n      </div>\n      <div class="body_time_class">\n        时间：{{item.start}} - {{item.end}}\n      </div>\n      <div text-wrap class="body_remark_class">\n        备注：{{item.remark}}\n      </div>\n    </div>\n  </ion-item>\n  <ion-item-options *ngIf="data.state == \'草稿\'">\n        <button ion-button color="danger" (click)="deleteItem(item,i)">\n          <ion-icon name="trash"></ion-icon>\n          删除\n        </button>\n    </ion-item-options>\n  </ion-item-sliding>\n  </ion-list>\n  <button class="btn_class" *ngIf="data.state == \'草稿\'" ion-button full (click)="add_detail()">\n    + 补卡销卡明细\n  </button>\n  <div class="shenpi_class">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let item of data.message_ids\' class="middle_item">\n      <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{item.create_person_ava}}>\n      <div style="overflow:hidden">\n        <span style="margin-top:3px;color:black;font-size:80%;float:left">{{item.create_person}}</span>\n\n        <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{item.create_time}}</span>\n      </div>\n      <p *ngIf="item.old_state || item.new_state" style="font-size:80%;">{{item.old_state}}=>{{item.new_state}}</p>\n      <p text-wrap style="font-size:80%;">{{item.description}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n    <div *ngIf=\'is_manager\' class="footer_class">\n        <div class="left_btn" tappable (click)=\'click_refuse()\'>\n          拒绝\n        </div>\n        <div class="right_btn" tappable (click)=\'click_confirm()\'>\n          同意\n        </div>\n    </div>\n    <!--<div *ngIf=\'!is_manager\' class="footer_class">\n      <div *ngIf="data.state == \'草稿\'" class="footer_class">\n         <div class="save_btn" tappable (click)=\'click_save()\'>\n          保存\n        </div>\n         <div class="right_btn" tappable (click)=\'click_submit()\'>\n          提交\n        </div>\n      </div>\n       \n        <div class="full_btn" *ngIf="data.state != \'草稿\'" tappable (click)=\'click_back()\'>\n          撤回\n        </div>\n    </div>-->\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/vacation-approval/vacation-detail/vacation-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__vacationService__["a" /* VacationService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__vacationService__["a" /* VacationService */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], VacationDetailPage);

//# sourceMappingURL=vacation-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/vacation-approval/vacation-detail/vacation-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VacationDetailPageModule", function() { return VacationDetailPageModule; });
/* harmony import */ var vacation_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var vacation_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var vacation_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VacationDetailPageModule = (function () {
    function VacationDetailPageModule() {
    }
    return VacationDetailPageModule;
}());
VacationDetailPageModule = vacation_detail_module___decorate([
    vacation_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            VacationDetailPage,
        ],
        imports: [
            vacation_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(VacationDetailPage),
        ],
    })
], VacationDetailPageModule);

//# sourceMappingURL=vacation-detail.module.js.map

/***/ }),

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VacationService; });
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


var VacationService = (function () {
    function VacationService(httpservice) {
        this.httpservice = httpservice;
    }
    VacationService.prototype.get_is_department = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department", body);
    };
    VacationService.prototype.get_total_vacation = function (user_id, need_approve) {
        var body = JSON.stringify({
            user_id: user_id,
            need_approve: need_approve,
        });
        return this.httpservice.postBody("get_total_vacation", body);
    };
    VacationService.prototype.pass_vacation = function (user_id, vacation_id, remark) {
        var body = JSON.stringify({
            user_id: user_id,
            vacation_id: vacation_id,
            remark: remark,
        });
        return this.httpservice.postBody("pass_vacation", body);
    };
    VacationService.prototype.refuse_vacation = function (user_id, vacation_id, remark) {
        var body = JSON.stringify({
            user_id: user_id,
            vacation_id: vacation_id,
            remark: remark,
        });
        return this.httpservice.postBody("refuse_vacation", body);
    };
    VacationService.prototype.search_vacation = function (type, search_text, user_id) {
        var body = JSON.stringify({
            type: type,
            search_text: search_text,
            user_id: user_id,
        });
        return this.httpservice.postBody("search_vacation", body);
    };
    return VacationService;
}());
VacationService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], VacationService);

//# sourceMappingURL=vacationService.js.map

/***/ })

});
//# sourceMappingURL=44.js.map