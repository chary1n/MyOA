webpackJsonp([45],{

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/myshengoudetail/myshengoudetail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shengouService__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the MyshengoudetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyshengoudetailPage = (function () {
    function MyshengoudetailPage(navCtrl, navParams, shengouService, alertCtrl, storage, toastCtrl) {
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
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("ShengoupagePage", navCtrl);
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.partner_id = res.result.res_data.partner_id;
            // if (this.item.state == "cancel")
            // {
            //   this.shengouService.get_all_departments(this.partner_id).then((res) => {
            //   if (res.result.res_data.all_departments)
            //   {
            //     this.departmentList = res.result.res_data.all_departments.res_data;
            //     for (let item of res.result.res_data.all_departments.res_data) {
            //       console.log(item + " " + this.item.department)
            //       if(item.id == this.item.department.id)
            //       {
            //         this.department = item.id;
            //       }
            //     }
            //   }
            // })
            // }
        });
    }
    MyshengoudetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyshengoudetailPage');
    };
    MyshengoudetailPage.prototype.ionViewWillEnter = function () {
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
    MyshengoudetailPage.prototype.getTotalAmount = function () {
        if (this.item.line_ids) {
            var total = 0;
            for (var _i = 0, _a = this.item.line_ids; _i < _a.length; _i++) {
                var item = _a[_i];
                total = total + parseFloat(item.price_unit) * parseFloat(item.quantity);
            }
            this.total = total;
        }
    };
    MyshengoudetailPage.prototype.changeProductItem = function (i) {
        this.index = i;
        console.log(this.item.line_ids[i]);
        this.navCtrl.push('EditShengouPage', {
            item: this.item.line_ids[i], index: i
            // , product: this.productList
        });
    };
    MyshengoudetailPage.prototype.deleteProductItem = function (i) {
        this.item.line_ids.splice(i, 1);
        this.getTotalAmount();
    };
    MyshengoudetailPage.prototype.backApply = function () {
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
                            _this.shengouService.refuse_shengou(_this.user_id, data.title, _this.item.sheet_id).then(function (res) {
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
                            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请填写拒绝原因", _this.toastCtrl);
                            //           ctrl.create({
                            //               title: '提示',
                            //               subTitle: "请填写拒绝原因",
                            //               buttons: [{
                            //             text: '确定',
                            //                 handler: () => {
                            //          }
                            //          }
                            //   ]
                            // }).present();
                        }
                    }
                }
            ]
        }).present();
    };
    MyshengoudetailPage.prototype.reApply = function () {
        this.navCtrl.push('EditNewShengouPage', {
            item: this.item,
        });
        // let ctrl = this.alertCtrl;
        // let productionList = []
        // for (let item of this.item.line_ids) {
        //   let pro = {
        //     description: item.description,
        //     quantity:parseInt(item.quantity),
        //     // department_id: parseInt(this.department),
        //     product_id: parseInt(item.product_id.id),
        //     price_unit: parseInt(item.price_unit)
        //   }
        //   productionList.push(pro)
        // }
        // let mbody = {
        //   line_ids: productionList,
        //   create_uid:this.user_id,
        //   total_amount:this.total,
        // }
        // let body = {
        //   data: mbody
        // }
        // this.shengouService.reset_shengou(this.user_id,this.item.sheet_id,body).then((res) => {
        //     if (res.result.res_data.success == 1)
        //       {
        //         console.log(res.result.res_data.success)
        //         ctrl.create({
        //               title: '提示',
        //               subTitle: "重新申请成功,等待审核",
        //               buttons: [{
        //             text: '确定',
        //                 handler: () => {
        //                 this.frontPage.data.need_fresh = true;
        //           this.navCtrl.popTo(this.frontPage,{
        //             need_fresh:true,
        //           });
        //          }
        //          }
        //   ]
        // }).present();
        //       }
        // })
    };
    MyshengoudetailPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    MyshengoudetailPage.prototype.addApplyDetail = function () {
        this.navCtrl.push('EditAddShengouPage');
    };
    MyshengoudetailPage.prototype.edit = function (i) {
        if (this.item.state == 'cancel') {
            this.index = i;
            console.log(this.item.line_ids[i]);
            this.navCtrl.push('EditShengouPage', {
                item: this.item.line_ids[i], index: i
            });
        }
    };
    MyshengoudetailPage.prototype.pushApply = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        this.shengouService.push_apply(this.item.sheet_id, this.user_id).then(function (res) {
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
    };
    MyshengoudetailPage.prototype.transInt = function (intValue, intOtherValue) {
        return (parseFloat(intValue) * parseInt(intOtherValue)).toFixed(2);
    };
    return MyshengoudetailPage;
}());
MyshengoudetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-myshengoudetail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/myshengoudetail/myshengoudetail.html"*/'<!--\n  Generated template for the ReimbursementDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-list>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">申请人</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.employee_name}}</ion-label>\n    </ion-item>\n    <ion-item>\n        <ion-label style="font-size:85%;font-weight:bold">待审核人</ion-label>\n        <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.to_approve_id}}</ion-label>\n      </ion-item>\n    <ion-item >\n      <ion-label style="font-size:85%;font-weight:bold">部门（费用归属）</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{item.department.name}}</ion-label>\n    </ion-item>\n\n    <!--<ion-item *ngIf = "item.state == \'cancel\'">\n    <ion-label style="color:black">部门(费用归属)</ion-label> \n    <ion-select [(ngModel)]="department" class="normal-select">\n      <ion-option *ngFor="let item of departmentList;" value={{item.id}} \n       >{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>-->\n\n    <ion-item>\n    <ion-label class="total_amount">金额总计（元）：{{item.total_amount}}</ion-label>\n  </ion-item>\n  </ion-list>\n\n  <ion-list style="margin-top:10px" lines>\n      <ion-item-sliding  *ngFor=\'let items of item.line_ids;let i = index\'>\n      <ion-item>\n        <div tappable (click) = "edit(i)">申购明细{{i+1}}</div>\n          <p text-wrap style="font-size:80%;color:gray;">产品：{{items.product_id.name}}</p>\n          <p text-wrap style="font-size:80%;">单价：{{items.price_unit}}        数量：{{items.quantity}} 小计：{{transInt(items.price_unit,items.quantity)}}</p>\n          <p text-wrap style="font-size:80%;color:gray">费用说明：{{items.description}} </p>\n      </ion-item>\n      <!--<ion-item-options *ngIf = "item.state == \'cancel\'" side="right">\n          <button ion-button color="primary" (click)="changeProductItem(i)">\n              <ion-icon name="create"></ion-icon>\n              修改\n            </button>\n          <button ion-button color="primary" (click)="deleteProductItem(i)">\n                <ion-icon name="trash"></ion-icon>\n                删除\n              </button>\n        </ion-item-options>-->\n      </ion-item-sliding>\n  </ion-list>\n  <!--<button *ngIf = "item.state == \'cancel\'" ion-button full (click)="addApplyDetail()">\n    + 申购明细\n  </button>-->\n\n  <div style="margin:10px;">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let items of item.message_ids\' style="overflow:hidden" class="middle_item">\n          <!--<img item-start style="width:40px;" src={{items.create_person_ava}}>-->\n          <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{items.create_person_ava}}>\n\n          <div style="overflow:hidden">\n          <span style="margin-top:3px;color:black;font-size:80%;float:left">{{items.create_person}}</span>\n\n          <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(items.create_time) | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n          </div>\n          <p *ngIf="items.old_state || items.new_state" style="font-size:80%;">{{items.old_state}}=>{{items.new_state}}</p>\n          <p text-wrap style="font-size:80%;">{{items.description}}</p>\n    </ion-item>\n  </ion-list>\n  \n</ion-content>\n\n<ion-footer *ngIf = "item.state != \'done\'">\n  <button  *ngIf="item.state ==\'draft\'" ion-end style=\'width:48%\' ion-button (click)="pushApply()">\n    提交申请\n  </button>\n  <button  *ngIf="item.state == \'draft\'" ion-start style=\'width:48%\' ion-button (click)="backApply()">\n    撤回申请\n  </button>\n  <button  *ngIf="item.state!= \'cancel\' && item.state != \'draft\'" ion-start full ion-button (click)="backApply()">\n    撤回申请\n  </button>\n  <button *ngIf="item.state == \'cancel\'"  ion-button full (click)="reApply()">\n    编辑\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/shengoupage/myshengoudetail/myshengoudetail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__shengouService__["a" /* ShenGouService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], MyshengoudetailPage);

//# sourceMappingURL=myshengoudetail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/shengoupage/myshengoudetail/myshengoudetail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyshengoudetailPageModule", function() { return MyshengoudetailPageModule; });
/* harmony import */ var myshengoudetail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var myshengoudetail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var myshengoudetail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyshengoudetailPageModule = (function () {
    function MyshengoudetailPageModule() {
    }
    return MyshengoudetailPageModule;
}());
MyshengoudetailPageModule = myshengoudetail_module___decorate([
    myshengoudetail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MyshengoudetailPage,
        ],
        imports: [
            myshengoudetail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MyshengoudetailPage),
        ],
    })
], MyshengoudetailPageModule);

//# sourceMappingURL=myshengoudetail.module.js.map

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
//# sourceMappingURL=45.js.map