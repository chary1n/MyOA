webpackJsonp([129],{

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/change-password/change-password.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_loginService__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangePasswordPage = (function () {
    function ChangePasswordPage(navCtrl, statusBar, navParams, loginservice, ctrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.navParams = navParams;
        this.loginservice = loginservice;
        this.ctrl = ctrl;
        this.storage = storage;
        this.storage.get("user_psd").then(function (res) {
            if (res) {
                _this.dbname = res.db_name;
                _this.email = res.user_email;
            }
        });
        // this.storage.get("user").then((res) => {
        //   if (res.result) {
        //     this.user_id = res.result.res_data.user_id
        //   }
        // });
        this.storage.get("login").then(function (res) {
            if (res) {
                _this.remerberPassword = res.remerberPassword;
            }
        });
        this.is_me = this.navParams.get('is_me');
    }
    ChangePasswordPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.finish = function () {
        var _this = this;
        this.loginservice.change_password(this.old_pwd, this.new_password, this.confirm_pwd, this.dbname, __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id).then(function (res) {
            console.log(res);
            if (res.result.new_password) {
                _this.ctrl.create({
                    title: '提示',
                    subTitle: '密码修改成功',
                    buttons: [{
                            text: '确定',
                            handler: function () {
                                _this.loginservice.toLogin(_this.email, _this.new_password, _this.dbname, 'value')
                                    .then(function (res) {
                                    console.log(res);
                                    if (res.result && res.result.res_code == 1) {
                                        __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id = res.result.res_data.user_id;
                                        __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user = res.result.res_data;
                                        _this.storage.set("user_psd", {
                                            user_email: _this.email,
                                            user_psd: _this.new_password,
                                            db_name: _this.dbname,
                                            url: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].appUrl
                                        });
                                        if (_this.remerberPassword) {
                                            _this.storage.get("history_users").then(function (res) {
                                                if (res) {
                                                    var arr = res;
                                                    var need_add = true;
                                                    var index = 0;
                                                    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                                                        var item = arr_1[_i];
                                                        if (item.email == _this.email) {
                                                            arr.splice(index, 1);
                                                            arr.push({
                                                                email: _this.email,
                                                                password: _this.new_password,
                                                            });
                                                            need_add = false;
                                                            break;
                                                        }
                                                        index = index + 1;
                                                    }
                                                    if (need_add) {
                                                        arr.push({
                                                            email: _this.email,
                                                            password: _this.new_password,
                                                        });
                                                    }
                                                    _this.storage.set("history_users", arr);
                                                }
                                                else {
                                                    var arr = [];
                                                    arr.push({
                                                        email: _this.email,
                                                        password: _this.new_password,
                                                    });
                                                    _this.storage.set("history_users", arr);
                                                }
                                            });
                                        }
                                        _this.storage.set("user", res).then(function () {
                                            if (_this.is_me) {
                                                _this.navCtrl.pop();
                                            }
                                            else {
                                                _this.navCtrl.setRoot('NewTabsPage');
                                            }
                                            // this.jpush.setAlias(res.result.res_data.user_id);
                                        });
                                    }
                                    else if (res.result && res.result.res_code == -1) {
                                        alert(res.result.res_data.error);
                                    }
                                });
                            }
                        }
                    ]
                }).present();
            }
            else {
                _this.ctrl.create({
                    title: res.result.title,
                    subTitle: res.result.error,
                    buttons: [{
                            text: '确定',
                        }
                    ]
                }).present();
            }
        });
    };
    ChangePasswordPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_6__angular_core__["Component"]({
        selector: 'page-change-password',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/change-password/change-password.html"*/'<!--\n  Generated template for the ChangePasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>修改密码</ion-title>\n   \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-item>\n      <ion-label fixed style="color: black;">旧密码</ion-label>\n      <ion-input type="password"  placeholder="请输入当前密码" [(ngModel)]="old_pwd"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label fixed style="color: black;">新密码</ion-label>\n      <ion-input type="password" placeholder="6-20字符,包含英文数字" [(ngModel)]="new_password" ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label fixed style="color: black;">确认密码</ion-label>\n      <ion-input type="password" placeholder="再次输入新密码" [(ngModel)]="confirm_pwd"></ion-input>\n    </ion-item>\n\n  <button ion-button  tappable (click)=\'finish()\' style="   background: #2597ec;width: 70%;margin-left:15%;margin-top:70px;border-radius: 25px;"> 完成 </button>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/change-password/change-password.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__login_loginService__["a" /* LoginService */],]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__login_loginService__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], ChangePasswordPage);

//# sourceMappingURL=change-password.js.map
// CONCATENATED MODULE: ./src/pages/change-password/change-password.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageModule", function() { return ChangePasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var change_password_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangePasswordPageModule = (function () {
    function ChangePasswordPageModule() {
    }
    return ChangePasswordPageModule;
}());
ChangePasswordPageModule = change_password_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ChangePasswordPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ChangePasswordPage),
        ],
    })
], ChangePasswordPageModule);

//# sourceMappingURL=change-password.module.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginService = (function () {
    function LoginService(httpService) {
        this.httpService = httpService;
    }
    LoginService.prototype.getDBInfo = function () {
        return this.httpService.getNoLoading('get_db_list', null, 1);
    };
    LoginService.prototype.toLogin = function (logins, passwords, dbs, app_version) {
        var body = JSON.stringify({
            login: logins,
            password: passwords,
            db: dbs,
            app_version: app_version,
        });
        return this.httpService.postBodyNoLoading('login', body, 1);
    };
    LoginService.prototype.change_password = function (old_psw, new_psw, confirm_psw, db_name, user_id) {
        var body = JSON.stringify({
            old_psw: old_psw,
            new_psw: new_psw,
            confirm_psw: confirm_psw,
            uid: user_id,
            db_name: db_name
        });
        return this.httpService.postBody('web/session/change_password_oa', body, 2);
    };
    return LoginService;
}());
LoginService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */]])
], LoginService);

//# sourceMappingURL=loginService.js.map

/***/ })

});
//# sourceMappingURL=129.js.map