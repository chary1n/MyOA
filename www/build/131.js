webpackJsonp([131],{

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/add-employee/prompt/gongpai/gongpai.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EmployeeService__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_nfc__ = __webpack_require__(251);
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
 * Generated class for the GongpaiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GongpaiPage = (function () {
    function GongpaiPage(navCtrl, navParams, nfc, modalCtrl, toast, employeeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nfc = nfc;
        this.modalCtrl = modalCtrl;
        this.toast = toast;
        this.employeeService = employeeService;
        this.isFinish = false;
        this.isShowNotFind = false;
        this.isShowFail = false;
        this.isFindNFC = false;
        this.item = this.navParams.get("item");
        this.startNFC();
    }
    GongpaiPage.prototype.startNFC = function () {
        var _this = this;
        this.nfc.addTagDiscoveredListener(function () {
            console.log("开启nfc成功");
            _this.startFindTimer();
        }, function (err) {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom("激活nfc失败", _this.toast);
        }).subscribe(function (event) {
            var NFC_id = _this.nfc.bytesToHexString(event.tag.id);
            if (NFC_id) {
                _this.isFindNFC = true;
            }
            var upDate_item = {
                id: _this.item.id,
                // id: 255,
                edit_id: __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].user_id,
                card_num: NFC_id,
            };
            _this.startRequestTimer();
            _this.employeeService.update_nfc_number(upDate_item).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    // Utils.toastButtom("绑定成功", this.toast)
                    _this.isFinish = true;
                }
                else {
                    _this.isShowFail = true;
                }
            });
        });
    };
    GongpaiPage.prototype.startFindTimer = function () {
        var that = this;
        var timer = self.setTimeout(function () {
            if (!that.isFindNFC) {
                that.isShowNotFind = true;
                console.log("this.isShowNotFind = true");
            }
        }, 5000);
    };
    GongpaiPage.prototype.startRequestTimer = function () {
        var that = this;
        var timer = self.setTimeout(function () {
            if (!that.isFinish) {
                that.isShowFail = true;
            }
        }, 5000);
    };
    GongpaiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GongpaiPage');
    };
    GongpaiPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    GongpaiPage.prototype.finish = function () {
        this.navCtrl.pop();
    };
    GongpaiPage.prototype.clickCancel = function () {
        this.isShowFail = false;
        this.isShowNotFind = false;
        this.isFinish = false;
        this.startNFC();
    };
    return GongpaiPage;
}());
GongpaiPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_6__angular_core__["Component"]({
        selector: 'page-gongpai',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/prompt/gongpai/gongpai.html"*/'<!--\n  Generated template for the GongpaiPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons *ngIf="!isFinish" left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>绑定工牌</ion-title>\n    <ion-buttons *ngIf="isFinish" end>\n      <button ion-button (click)=\'finish()\'>\n        完成\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-backdrop *ngIf="isShowNotFind || isShowFail" style="opacity: 0.6;">\n  </ion-backdrop>\n\n\n</ion-header>\n\n\n<ion-content>\n\n\n  <ion-backdrop *ngIf="isShowNotFind || isShowFail" disable-activated role="presentation" tappable style="opacity: 0.6; transition-delay: initial; transition-property: none;">\n  </ion-backdrop>\n\n  <div *ngIf="isShowNotFind" class="alert_div_fail" style="opacity: 1.0;">\n    <img style="width:90px;height:90px;margin-top:30px;" src="assets/img/not_find_nfc.png" />\n    <p style="color:black;font-size:20px">未识别到工牌</p>\n    <p style="color:gray;font-size:14px;margin-top:-16px">请移开后重试</p>\n    <div tappable (click)="clickCancel()" class="alert_btn_fail">\n      我知道了\n    </div>\n  </div>\n  <div *ngIf="isShowFail" class="alert_div_fail" style="opacity: 1.0;">\n    <img style="width:110px;height:110px;margin-top:30px;" src="assets/img/fail.png" />\n    <p style="color:black;font-size:20px">绑定失败</p>\n    <p style="color:gray;font-size:14px;margin-top:-16px">请移开后重试</p>\n    <div tappable (click)="clickCancel()" class="alert_btn_fail">\n      我知道了\n    </div>\n  </div>\n\n\n  <div *ngIf="isFinish">\n    <div style="text-align:center">\n      <img style="width:60px;height:60px;margin-top:39px;" src="assets/img/finished.png">\n      <p style="font-size: 16px;\n                  color: #8a9199;\n                  line-height: 0px;margin-top:30px">绑定成功</p>\n      <p>\n    </div>\n  </div>\n\n  <div *ngIf="!isFinish">\n    <div style="text-align:center">\n      <img style="width:120px;height:120px;margin-top:39px;" src="assets/img/near_nfc.png">\n      <p style="font-size: 16px;\n          color: #8a9199;\n          line-height: 0px;margin-top:30px">请将NFC手机靠近工牌</p>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/add-employee/prompt/gongpai/gongpai.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__EmployeeService__["a" /* EmployeeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_nfc__["a" /* NFC */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["v" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__EmployeeService__["a" /* EmployeeService */]])
], GongpaiPage);

//# sourceMappingURL=gongpai.js.map
// CONCATENATED MODULE: ./src/pages/add-employee/prompt/gongpai/gongpai.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GongpaiPageModule", function() { return GongpaiPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var gongpai_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GongpaiPageModule = (function () {
    function GongpaiPageModule() {
    }
    return GongpaiPageModule;
}());
GongpaiPageModule = gongpai_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            GongpaiPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(GongpaiPage),
        ],
    })
], GongpaiPageModule);

//# sourceMappingURL=gongpai.module.js.map

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
//# sourceMappingURL=131.js.map