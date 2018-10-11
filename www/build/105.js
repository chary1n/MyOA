webpackJsonp([105],{

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/me/edit-information/edit-information.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editInformationService__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
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


// import { PhoneNumberPage } from './../phone-number/phone-number';



/**
 * Generated class for the EditInformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditInformationPage = (function () {
    function EditInformationPage(navCtrl, navParams, storage, actionSheetCtrl, nativeService, editInformationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nativeService = nativeService;
        this.editInformationService = editInformationService;
        this.job = '';
        this.isChange = false; //头像是否改变标识
    }
    EditInformationPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (res) {
            _this.name = res.result.res_data.name;
            _this.user_heard = res.result.res_data.user_ava;
            _this.company = res.result.res_data.company;
            _this.jobName = res.result.res_data.job;
            _this.storage.get("loginIndex").then(function (res) {
                _this.loginIndex = res;
                if (_this.loginIndex == 0) {
                    if (_this.jobName == false) {
                        _this.job = '';
                    }
                    else {
                        if (_this.jobName.length == 1) {
                            _this.job = _this.jobName[0];
                        }
                        else {
                            var length_1 = _this.jobName.length;
                            for (var i = 0; i < length_1 - 1; i++) {
                                _this.job = _this.job + _this.jobName[i] + ',';
                            }
                            _this.job = _this.job + _this.jobName[length_1 - 1];
                        }
                    }
                }
                else {
                    if (_this.jobName == false) {
                        _this.job = '';
                    }
                    else {
                        _this.job = _this.jobName;
                    }
                }
            });
            _this.department = res.result.res_data.department;
            if (_this.department == false) {
                _this.department = '';
            }
            _this.barcode = res.result.res_data.barcode;
            _this.phone = res.result.res_data.phone;
            if (_this.phone == false) {
                _this.phone = '';
            }
        });
    };
    EditInformationPage.prototype.changeHeardImg = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '拍照',
                    //  role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.getPicture(1);
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: function () {
                        console.log('Archive clicked');
                        _this.getPicture(0);
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EditInformationPage.prototype.toPhoneNumberPage = function () {
        this.navCtrl.push("PhoneNumberPage");
    };
    EditInformationPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            allowEdit: true,
            quality: 6,
            circle: true
        };
        if (type == 1) {
            this.nativeService.getPictureByCamera(options).subscribe(function (img_url) {
                _this.getPictureSuccess(img_url);
            });
        }
        else {
            this.nativeService.getPictureByPhotoLibrary(options).subscribe(function (img_url) {
                _this.getPictureSuccess(img_url);
            });
        }
    };
    EditInformationPage.prototype.getPictureSuccess = function (img_url) {
        var _this = this;
        this.isChange = true;
        this.user_heard = img_url;
        this.editInformationService.pushHeardImage(img_url.split(",")[1])
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.storage.get('user').then(function (userBean) {
                    userBean.result.res_data.user_ava = res.result.res_data.user_ava;
                    _this.storage.set('user', userBean);
                });
            }
        });
    };
    return EditInformationPage;
}());
EditInformationPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"]({
        selector: 'page-edit-information',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/me/edit-information/edit-information.html"*/'<!--\n  Generated template for the EditInformationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>个人信息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n  <ion-list>\n    <ion-item tappable (click)=\'changeHeardImg()\'>\n      <ion-label>头像</ion-label>\n      <img src={{user_heard}} class="image1" item-end alt="">\n      <!-- <ion-icon name="arrow-forward" item-end class="image1"></ion-icon> -->\n    </ion-item>\n    <ion-item>\n      <ion-label>昵称</ion-label>\n      <ion-label item-end>{{name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>公司</ion-label>\n      <ion-label item-end text-wrap>{{company}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>部门</ion-label>\n      <ion-label item-end >{{department}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>职位</ion-label>\n       <ion-label item-end>{{job}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>工号</ion-label>\n       <ion-label item-end >{{barcode}}</ion-label>\n    </ion-item>\n    <ion-item >\n      <ion-label>手机号码</ion-label>\n      <ion-label item-end >{{phone}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/me/edit-information/edit-information.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__editInformationService__["a" /* EditInformationService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_0__editInformationService__["a" /* EditInformationService */]])
], EditInformationPage);

//# sourceMappingURL=edit-information.js.map
// CONCATENATED MODULE: ./src/pages/me/edit-information/edit-information.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditInformationPageModule", function() { return EditInformationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var edit_information_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditInformationPageModule = (function () {
    function EditInformationPageModule() {
    }
    return EditInformationPageModule;
}());
EditInformationPageModule = edit_information_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EditInformationPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EditInformationPage),
        ],
    })
], EditInformationPageModule);

//# sourceMappingURL=edit-information.module.js.map

/***/ }),

/***/ 891:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditInformationService; });
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


var EditInformationService = (function () {
    function EditInformationService(httpService) {
        this.httpService = httpService;
    }
    EditInformationService.prototype.pushHeardImage = function (imageBase64) {
        var body = JSON.stringify({
            img: imageBase64,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpService.postBody('change_img', body, 1);
    };
    EditInformationService.prototype.pushHeardImageWithUid = function (imageBase64, uid) {
        var body = JSON.stringify({
            img: imageBase64,
            uid: uid
        });
        return this.httpService.postBodyNoLoading('change_img', body, 1);
    };
    return EditInformationService;
}());
EditInformationService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], EditInformationService);

//# sourceMappingURL=editInformationService.js.map

/***/ })

});
//# sourceMappingURL=105.js.map