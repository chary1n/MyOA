webpackJsonp([160],{

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/choose-department/choose-department.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the ChooseDepartmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChooseDepartmentPage = (function () {
    function ChooseDepartmentPage(navCtrl, navParams, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusbar = statusbar;
        this.chooseList = [];
        this.chooseDepartmentName = '';
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("WhoCanSeePage", navCtrl);
    }
    ChooseDepartmentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChooseDepartmentPage');
    };
    ChooseDepartmentPage.prototype.ionViewWillEnter = function () {
        this.departmentList = this.navParams.get('departmentList');
        console.log(this.departmentList);
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    ChooseDepartmentPage.prototype.chooseItem = function (item) {
        item.ischeck = !item.ischeck;
    };
    ChooseDepartmentPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ChooseDepartmentPage.prototype.conform = function () {
        for (var i = 0; i < this.departmentList.length; i++) {
            if (this.departmentList[i].ischeck) {
                this.chooseList.push(this.departmentList[i].id);
                this.chooseDepartmentName = this.chooseDepartmentName + this.departmentList[i].name;
            }
        }
        console.log(this.chooseList);
        this.frontPage.data.chooseList = this.chooseList;
        this.frontPage.data.chooseDepartmentName = this.chooseDepartmentName;
        this.frontPage.data.departmentList = this.departmentList;
        this.navCtrl.popTo(this.frontPage);
    };
    return ChooseDepartmentPage;
}());
ChooseDepartmentPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-choose-department',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/choose-department/choose-department.html"*/'<!--\n  Generated template for the ChooseDepartmentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton="true" color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>指定部门</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'conform()\'>\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header> \n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let item of departmentList;let i = index">\n      <ion-label> {{item.name}}</ion-label>\n      <ion-checkbox (click)="chooseItem(item)" [checked]=item.ischeck></ion-checkbox>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/choose-department/choose-department.html"*/,
        providers: []
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__["a" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], ChooseDepartmentPage);

//# sourceMappingURL=choose-department.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/choose-department/choose-department.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseDepartmentPageModule", function() { return ChooseDepartmentPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var choose_department_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseDepartmentPageModule = (function () {
    function ChooseDepartmentPageModule() {
    }
    return ChooseDepartmentPageModule;
}());
ChooseDepartmentPageModule = choose_department_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ChooseDepartmentPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ChooseDepartmentPage),
        ],
    })
], ChooseDepartmentPageModule);

//# sourceMappingURL=choose-department.module.js.map

/***/ })

});
//# sourceMappingURL=160.js.map