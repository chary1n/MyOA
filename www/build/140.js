webpackJsonp([140],{

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/add-production/add-production.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the AddProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddProductionPage = (function () {
    function AddProductionPage(navCtrl, navParams, toast, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.alertCtrl = alertCtrl;
        this.total = 0;
        this.mcreateQuotesPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("CreateQuotesPage", navCtrl);
    }
    AddProductionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddProductionPage');
    };
    AddProductionPage.prototype.ionViewDidEnter = function () {
        this.productionItem = this.navParams.get("productionItem");
        console.log(this.productionItem);
        this.changeItem = this.navParams.get("item");
        if (this.changeItem) {
            this.productionItem = this.changeItem;
        }
        if (this.productionItem) {
            this.item = this.productionItem;
            this.name = this.productionItem.name;
            this.pro_spec = this.productionItem.inner_spec;
            this.pro_code = this.productionItem.inner_code;
            this.pro_uom = this.productionItem.uom;
            this.mNumber = this.productionItem.orderNumber;
            this.mPrice = this.productionItem.orderPrice;
        }
        else {
            this.name = "请选择产品";
            this.pro_spec = "根据产品自动带出";
            this.pro_code = "根据产品自动带出";
            this.pro_uom = "根据产品自动带出";
        }
    };
    AddProductionPage.prototype.save = function () {
        var alertString = "";
        if (!this.productionItem) {
            alertString = alertString + "请选择产品";
        }
        this.mNumber = this.mNumberConpent._value;
        if (!this.mNumber) {
            alertString = alertString + "  请填写订购数量";
        }
        this.mPrice = this.mPriceCon._value;
        if (!this.mPrice) {
            alertString = alertString + "  请填写产品单价";
        }
        // 都填写了
        if (alertString == "") {
            this.productionItem.orderNumber = this.mNumber;
            this.productionItem.orderPrice = this.mPrice;
            this.mcreateQuotesPage.data.productItem = this.productionItem;
            this.mcreateQuotesPage.data.isAdd = true;
            this.mcreateQuotesPage.data.isChange = this.changeItem ? true : false;
            this.navCtrl.pop();
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom(alertString, this.toast);
        }
    };
    AddProductionPage.prototype.seleteProduction = function () {
        this.navCtrl.push('ProductionListPage');
    };
    AddProductionPage.prototype.change = function () {
        if (this.mNumber && this.mPrice) {
            this.total = this.mNumber * this.mPrice;
        }
    };
    AddProductionPage.prototype.goBack = function () {
        var _this = this;
        this.mNumber = this.mNumberConpent._value;
        console.log(this.mNumber);
        if (this.mNumber || this.mPrice || this.productionItem) {
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
    return AddProductionPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('mNumberCon'),
    __metadata("design:type", Object)
], AddProductionPage.prototype, "mNumberConpent", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('mPriceCon'),
    __metadata("design:type", Object)
], AddProductionPage.prototype, "mPriceCon", void 0);
AddProductionPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-add-production',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/add-production/add-production.html"*/'<!--\n  Generated template for the AddProductionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>添加产品</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'save()\'>\n         保存\n        </button>\n    </ion-buttons>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-item (click)="seleteProduction()"> \n        <ion-label  >产品\n        <span style="color:red;"> *</span>\n        </ion-label>\n        <ion-label item-end text-wrap   text-right >{{name}}</ion-label>\n      </button>\n\n  <ion-item>\n    <ion-label>订购数量\n      <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-input style="direction:rtl" #mNumberCon placeholder="请填写数量" type="number" [(ngModel)]="mNumber" (ionChange)="change()"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>国内简称\n    </ion-label>\n    <ion-label text-right item-end>{{pro_code}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>国内型号\n    </ion-label>\n    <ion-label item-end text-right> {{pro_spec}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>计量单位\n    </ion-label>\n    <ion-label item-end text-right>{{pro_uom}}</ion-label>\n  </ion-item>\n\n  <ion-item>\n    <ion-label>单价 ￥\n      <span style="color:red;"> *</span>\n    </ion-label>\n    <ion-input style="direction:rtl" #mPriceCon placeholder="请填写产品单价" type="number" [(ngModel)]="mPrice" (ionChange)="change()"></ion-input>\n  </ion-item>\n\n  <ion-label item-end style="text-align:right;">\n    小计 ： <span style="color:red;">￥ {{total}}</span>\n  </ion-label>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/create-quotes/add-production/add-production.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], AddProductionPage);

//# sourceMappingURL=add-production.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/create-quotes/add-production/add-production.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddProductionPageModule", function() { return AddProductionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var add_production_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddProductionPageModule = (function () {
    function AddProductionPageModule() {
    }
    return AddProductionPageModule;
}());
AddProductionPageModule = add_production_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AddProductionPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AddProductionPage),
        ],
        exports: [
            AddProductionPage
        ]
    })
], AddProductionPageModule);

//# sourceMappingURL=add-production.module.js.map

/***/ })

});
//# sourceMappingURL=140.js.map