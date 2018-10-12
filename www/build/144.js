webpackJsonp([144],{

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/my-apply/my-apply.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
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


/**
 * Generated class for the MyApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyApplyPage = (function () {
    function MyApplyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detailList = [1, 2];
    }
    MyApplyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyApplyPage');
    };
    MyApplyPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    MyApplyPage.prototype.save = function () {
        this.navCtrl.pop();
    };
    MyApplyPage.prototype.addDetailItem = function () {
    };
    return MyApplyPage;
}());
MyApplyPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-my-apply',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/my-apply/my-apply.html"*/'<!--\n  Generated template for the MyApplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>报销申请</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'save()\'>\n        提交\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-item>\n    <ion-label class="left_label">申请人</ion-label>\n    <ion-label item-end class="right_label">ray</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>费用归属\n      <!-- <span style="color:red;"> *</span> -->\n    </ion-label>\n    <!-- <ion-select [(ngModel)]="salesTeam">\n            <ion-option *ngFor="let item of salesTeamList;" value={{item.id}}>{{item.name}}</ion-option>\n          </ion-select> -->\n  </ion-item>\n  <ion-item-divider class="divider" color="light"></ion-item-divider>\n  <ion-list>\n    <div *ngFor="let item of detailList">\n      <div class=\'redFont\' padding>\n        报销明细1\n      </div>\n      <ion-label>报销类别\n      </ion-label>\n      <!-- <ion-select [(ngModel)]="salesTeam">\n                    <ion-option *ngFor="let item of salesTeamList;" value={{item.id}}>{{item.name}}</ion-option>\n                  </ion-select> -->\n      <ion-item>\n        <ion-label class="left_label">报销金额(元)</ion-label>\n        <ion-input text-right class="right_label" placeholder="请输入数字" type="number"> </ion-input>\n      </ion-item>\n      <ion-grid>\n        <ion-row class="rowStyle">\n          <ion-col col-2 class="textCenter">\n            发票\n          </ion-col>\n          <ion-col col-3>\n            <img src=\'assets/img/photo.png\'>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-list>\n  <button block ion-button (check)=\'addDetailItem()\'> + 报销明细</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/reimbursement/my-apply/my-apply.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */]])
], MyApplyPage);

//# sourceMappingURL=my-apply.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/reimbursement/my-apply/my-apply.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyApplyPageModule", function() { return MyApplyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var my_apply_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyApplyPageModule = (function () {
    function MyApplyPageModule() {
    }
    return MyApplyPageModule;
}());
MyApplyPageModule = my_apply_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MyApplyPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MyApplyPage),
        ],
    })
], MyApplyPageModule);

//# sourceMappingURL=my-apply.module.js.map

/***/ })

});
//# sourceMappingURL=144.js.map