webpackJsonp([130],{

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/add-employee/prompt/prompt.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EmployeeService__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
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
 * Generated class for the PromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PromptPage = (function () {
    function PromptPage(navCtrl, navParams, toast, employeeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.employeeService = employeeService;
        this.item = this.navParams.get("data");
    }
    PromptPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PromptPage');
    };
    PromptPage.prototype.finish = function () {
        this.navCtrl.push("EmployeeDetailPage", { item: this.item });
    };
    PromptPage.prototype.ionViewDidEnter = function () {
    };
    PromptPage.prototype.addEmployee = function () {
        this.navCtrl.push("AddEmployeePage");
    };
    PromptPage.prototype.perfectEmployee = function () {
        this.navCtrl.push("EmployeeDetailPage", {
            item: this.item, isModify: true
        });
    };
    PromptPage.prototype.generate_qr_code = function () {
        this.navCtrl.push("QRcodePage", { data: __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */].appUrl + "," + this.item.id, item: this.item });
        // this.navCtrl.push("QRcodePage", { data:"123123123", item: this.item })
    };
    PromptPage.prototype.generate_nfc = function () {
        this.navCtrl.push("GongpaiPage", { item: this.item });
    };
    return PromptPage;
}());
PromptPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_6__angular_core__["Component"]({
        selector: 'page-prompt',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/prompt/prompt.html"*/'<!--\n  Generated template for the PromptPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-title>新增员工</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'finish()\'>\n        完成\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n  <div style="text-align:center">\n    <img style="width:60px;height:60px;margin-top:39px;" src="assets/img/finished.png">\n    <p style="font-size: 16px;\n    color: #8a9199;\n    line-height: 0px;margin-top:30px">保存成功</p>\n    <p>\n      <button ion-button style=\'    width: 320px;\n      height: 50px;\n      font-size: 20px;\n      border-radius: 5px;\n      margin-top: 30px;\n      background: #409eff;\' (click)="addEmployee()"> 继续添加员工</button>\n    </p>\n\n    <p>\n      <button ion-button style=\'width:30%;font-size:16px\' (click)="generate_nfc()" clear>绑定工牌 </button>\n      <button ion-button clear style="    width: 5%;\n      line-height: 22px;\n      font-size: 23px;">|</button>\n\n\n      <button ion-button style=\'width:37%;font-size:16px\' (click)="generate_qr_code()" clear> 生成员工二维码</button>\n    </p>\n\n\n\n\n  </div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/prompt/prompt.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__EmployeeService__["a" /* EmployeeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__["a" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_0__EmployeeService__["a" /* EmployeeService */]])
], PromptPage);

//# sourceMappingURL=prompt.js.map
// CONCATENATED MODULE: ./src/pages/add-employee/prompt/prompt.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromptPageModule", function() { return PromptPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var prompt_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PromptPageModule = (function () {
    function PromptPageModule() {
    }
    return PromptPageModule;
}());
PromptPageModule = prompt_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PromptPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PromptPage),
        ],
    })
], PromptPageModule);

//# sourceMappingURL=prompt.module.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
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


var EmployeeService = (function () {
    function EmployeeService(httpservice) {
        this.httpservice = httpservice;
    }
    EmployeeService.prototype.get_all_department = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_all_department", body);
    };
    // 获取民族
    EmployeeService.prototype.get_employee_list = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_employee_list", body);
    };
    EmployeeService.prototype.getDepartmentNoLoading = function () {
        var body = JSON.stringify({
            partner_id: 1
        });
        return this.httpservice.postBodyNoLoading("get_all_departments", body);
    };
    EmployeeService.prototype.create_employee = function (data) {
        var body = JSON.stringify(data);
        return this.httpservice.postBody("create_employee", body);
    };
    EmployeeService.prototype.get_employee_info = function (id_list, is_all) {
        var body = JSON.stringify({
            id_list: id_list,
            is_all: is_all
        });
        return this.httpservice.postBodyNoLoading("get_employee_info", body);
    };
    EmployeeService.prototype.update_employee = function (data) {
        var body = JSON.stringify(data);
        return this.httpservice.postBody("update_employee", body);
    };
    EmployeeService.prototype.update_nfc_number = function (data) {
        var body = JSON.stringify(data);
        return this.httpservice.postBody("update_nfc_number", body);
    };
    return EmployeeService;
}());
EmployeeService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], EmployeeService);

//# sourceMappingURL=EmployeeService.js.map

/***/ })

});
//# sourceMappingURL=130.js.map