webpackJsonp([172],{

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/apply/baoxiao-apply/add-apply-detail/add-apply-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
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
 * Generated class for the AddApplyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddApplyDetailPage = (function () {
    function AddApplyDetailPage(navCtrl, navParams, platform, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.taxIndex = 0;
        this.mBaoxiaoApplyPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("BaoxiaoApplyPage", navCtrl);
    }
    AddApplyDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddApplyDetailPage');
    };
    AddApplyDetailPage.prototype.ionViewDidEnter = function () {
        this.productList = this.navParams.get("product");
        this.changeItem = this.navParams.get("item");
        this.taxList = this.navParams.get("taxList");
        if (this.changeItem) {
            this.production = this.changeItem;
            this.amount = this.production.amount;
            this.remark = this.production.remark;
            this.remarks = this.production.remarks;
            for (var i = 0; i < this.productList.length; i++) {
                if (this.productList[i].id == this.production.productId) {
                    this.productIndex = i;
                }
            }
            for (var i = 0; i < this.taxList.length; i++) {
                if (this.taxList[i].name == this.production.tax) {
                    this.taxIndex = i;
                }
            }
        }
    };
    AddApplyDetailPage.prototype.ionViewWillLeave = function () {
        if (this.platform.is('ios')) {
            cordova.plugins.Keyboard.close();
        }
    };
    AddApplyDetailPage.prototype.goBack = function () {
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
    AddApplyDetailPage.prototype.save = function () {
        if (parseFloat(this.amount) <= 0) {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom("金额必须大于0", this.toastCtrl);
            return;
        }
        var mString = "";
        if (this.productIndex != 0 && !this.productIndex) {
            mString = mString + "   请选择费用类别";
        }
        if (!this.amount) {
            mString = mString + "   请填写金额";
        }
        if (!this.remark) {
            mString = mString + "   请填写消费用途";
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            if (this.amount && this.remark) {
                this.production = [];
                this.production.productId = this.productList[this.productIndex].id;
                this.production.productName = this.productList[this.productIndex].name;
                this.production.amount = this.amount;
                this.production.remark = this.remark;
                this.production.remarks = this.remarks;
                this.production.taxIndex = this.taxIndex;
                if (this.taxIndex == 0 || this.taxIndex) {
                    this.production.tax = this.taxList[this.taxIndex].name;
                }
                this.production.productIndex = this.productIndex;
                this.mBaoxiaoApplyPage.data.production = this.production;
                this.mBaoxiaoApplyPage.data.isAdd = true;
                this.mBaoxiaoApplyPage.data.isChange = this.changeItem ? true : false;
                ;
                this.navCtrl.pop();
            }
        }
    };
    return AddApplyDetailPage;
}());
AddApplyDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-add-apply-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/apply/baoxiao-apply/add-apply-detail/add-apply-detail.html"*/'<!--\n  Generated template for the AddApplyDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>报销明细</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'save()\'>\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-item>\n    <ion-label style="color:black">消费用途   <span style="color:red;"> *</span></ion-label>\n    <ion-input [(ngModel)]="remark" placeholder="例如xx-xx火车票，xx接待午餐费" text-right></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color:black">费用类别   <span style="color:red;"> *</span></ion-label>\n    <ion-select [(ngModel)]="productIndex" class="normal-select">\n      <ion-option *ngFor="let item of productList;let i = index;" value={{i}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color:black">税金</ion-label>\n    <ion-select [(ngModel)]="taxIndex" class="normal-select">\n      <ion-option *ngFor="let item of taxList;let i = index;" value={{i}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-item>\n    <ion-label style="color:black">金额 (元)   <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-input #mNumberCon item-end text-wrap type="number" text-right [(ngModel)]="amount"></ion-input>\n  </ion-item>\n\n  <ion-item no-lines>\n\n    <ion-label>备注</ion-label>\n\n  </ion-item>\n  <ion-item>\n    <ion-textarea rows="15" style="margin-left:10px;" text-wrap placeholder=\'请输入该消费用途的具体事由\' [(ngModel)]="remarks" class=\'area_class\'>\n    </ion-textarea>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/apply/baoxiao-apply/add-apply-detail/add-apply-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], AddApplyDetailPage);

//# sourceMappingURL=add-apply-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/apply/baoxiao-apply/add-apply-detail/add-apply-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddApplyDetailPageModule", function() { return AddApplyDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var add_apply_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var add_apply_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddApplyDetailPageModule = (function () {
    function AddApplyDetailPageModule() {
    }
    return AddApplyDetailPageModule;
}());
AddApplyDetailPageModule = add_apply_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AddApplyDetailPage,
        ],
        imports: [
            add_apply_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AddApplyDetailPage),
        ],
    })
], AddApplyDetailPageModule);

//# sourceMappingURL=add-apply-detail.module.js.map

/***/ })

});
//# sourceMappingURL=172.js.map