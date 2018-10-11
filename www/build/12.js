webpackJsonp([12],{

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/providers/UrlServer.ts
var UrlServer = (function () {
    function UrlServer() {
    }
    UrlServer.setBaseUrl = function (url) {
        this.base_url = url;
    };
    UrlServer.getBaseUrl = function () {
        return this.base_url;
    };
    return UrlServer;
}());

//# sourceMappingURL=UrlServer.js.map
// CONCATENATED MODULE: ./src/pages/login/login.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_FirService__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_JPush__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loginService__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_app_version__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_browser__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














// import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, loading, loginservice, storage, platform, appVersion, jpush, urlServer, ctrl, inAppBrowser, firService, nativeService, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.loginservice = loginservice;
        this.storage = storage;
        this.platform = platform;
        this.appVersion = appVersion;
        this.jpush = jpush;
        this.urlServer = urlServer;
        this.ctrl = ctrl;
        this.inAppBrowser = inAppBrowser;
        this.firService = firService;
        this.nativeService = nativeService;
        this.toastCtrl = toastCtrl;
        this.isSelected0 = true;
        this.isSelected1 = false;
        this.isSelected2 = false;
        this.isSelected3 = false;
        this.isSelected4 = false;
        this.history_arr = [];
        this.email_length = 0;
        this.autoLogin = false;
        this.remerberPassword = false;
        this.chooseIndex = 0;
        this.storage.get("login").then(function (res) {
            if (res) {
                _this.autoLogin = res.autoLogin;
                _this.remerberPassword = res.remerberPassword;
            }
        });
        this.storage.get('user_psd').then(function (res) {
            _this.email = res.user_email;
            _this.password = res.user_psd;
            _this.isDisabled = false;
        });
        this.storage.get("loginIndex").then(function (res) {
            _this.defultChoose(res);
        });
        this.isDisabled = true;
        this.reset();
        if (!__WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].need_back_login) {
            this.storage.get("login").then(function (res) {
                _this.storage.get("user").then(function (user) {
                    __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].need_back_login = true;
                    console.log(__WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].need_back_login);
                    if (res) {
                        if (res.autoLogin && user) {
                            _this.toAutoLogin();
                        }
                        else if (res.remerberPassword) {
                            _this.storage.get('user_psd').then(function (res) {
                                _this.email = res.user_email;
                                _this.password = res.user_psd;
                                _this.isDisabled = false;
                            });
                        }
                    }
                });
            });
        }
    }
    LoginPage.prototype.getVersionNumber = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getVersionCode().then(function (value) {
                resolve(value);
                _this.version = value;
                console.log(_this.version);
                _this.nativeService.detectionUpgrade(_this.version);
            }).catch(function (err) {
            });
        });
    };
    LoginPage.prototype.getiOSVersionNumber = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getVersionNumber().then(function (value) {
                _this.firService.get('fir_ios', 1).then(function (res) {
                    console.log(res);
                    if (res.version > value) {
                        _this.ctrl.create({
                            title: '发现新版本,是否立即升级？',
                            subTitle: "更新内容：" + res.changelog,
                            buttons: [
                                {
                                    text: '立即升级',
                                    handler: function () {
                                        _this.openUrlByBrowser('http://fir.im/MyOa');
                                    }
                                }
                            ]
                        }).present();
                    }
                });
            }).catch(function (err) {
            });
        });
    };
    LoginPage.prototype.openUrlByBrowser = function (url) {
        this.inAppBrowser.create(url, '_system');
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        // if (this.platform.is("android")) {
        //   this.getVersionNumber();
        // }
        // else if (this.platform.is('ios')) {
        //   this.getiOSVersionNumber();
        // }
    };
    LoginPage.prototype.defultChoose = function (index) {
        if (index == 2) {
            this.chooseDiy();
        }
        else if (index == 3) {
            this.chooseWanju();
        }
        else if (index == 4) {
            this.chooseBanchang();
        }
        else if (index == 1) {
            this.chooseJiangsu();
        }
        else {
            this.chooseNewJiangsu();
        }
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        if (this.platform.is("android")) {
            this.getVersionNumber();
        }
        else if (this.platform.is('ios')) {
            this.getiOSVersionNumber();
        }
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.toAutoLogin = function () {
        var _this = this;
        this.storage.get('user')
            .then(function (res) {
            if (res) {
                window.localStorage.setItem("id", res.result.res_data.user_id);
                _this.storage.get('user_psd').then(function (res) {
                    __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl = res.url;
                    if (_this.chooseIndex == 0) {
                        _this.navCtrl.setRoot('NewTabsPage');
                    }
                    else {
                        _this.navCtrl.setRoot('NewTabsPage');
                        // this.navCtrl.setRoot('TabsPage');
                    }
                    console.log(res);
                    _this.appVersion.getVersionNumber().then(function (value) {
                        var loading = _this.loading.create({
                            content: '加载中',
                            enableBackdropDismiss: true
                        });
                        loading.present();
                        _this.loginservice.toLogin(res.user_email, res.user_psd, res.db_name, value)
                            .then(function (res) {
                            loading.dismiss();
                            console.log(res);
                            if (res.result && res.result.res_code == 1) {
                                loading.dismiss();
                                __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].user_id = res.result.res_data.user_id;
                                __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].user = res.result.res_data;
                                _this.storage.set('loginIndex', _this.chooseIndex);
                                _this.storage.set("user", res).then(function () {
                                });
                                if (res.user_psd == '123456' && _this.chooseIndex == 0) {
                                    _this.ctrl.create({
                                        title: '提示',
                                        subTitle: "你的登录密码是初始密码，请立即修改。",
                                        enableBackdropDismiss: false,
                                        buttons: [{
                                                text: '确定',
                                                handler: function () {
                                                    _this.navCtrl.push('ChangePasswordPage');
                                                }
                                            }
                                        ]
                                    }).present();
                                    return;
                                }
                            }
                            else {
                                loading.dismiss();
                                _this.navCtrl.setRoot('LoginPage');
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                        });
                    });
                });
            }
        });
    };
    LoginPage.prototype.reset = function () {
        this.img1 = "assets/img/jiangsuruotai.png";
        this.img2 = "assets/img/diy.png";
        this.img3 = "assets/img/ruobeier.png";
        this.img4 = "assets/img/banchang.png";
    };
    LoginPage.prototype.chooseNewJiangsu = function () {
        this.isSelected0 = true;
        this.isSelected1 = false;
        this.isSelected2 = false;
        this.isSelected3 = false;
        this.isSelected4 = false;
        this.chooseIndex = 0;
        __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl = "http://service.linkloving.net:8888/";
        // HttpService.appUrl = "http://10.0.0.5:8081/"
        this.reset();
        this.img1 = "assets/img/jiangsuruotai_clicked.png";
        this.password_src = "assets/img/S_password.png";
        this.email_src = "assets/img/S_email.png";
    };
    LoginPage.prototype.chooseJiangsu = function () {
        this.isSelected0 = false;
        this.isSelected1 = true;
        this.isSelected2 = false;
        this.isSelected3 = false;
        this.isSelected4 = false;
        this.chooseIndex = 1;
        // HttpService.appUrl = "http://192.168.1.170:8069/"
        // HttpService.appUrl = "http://192.168.1.134:8111/"
        __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl = "http://js.robotime.com/";
        this.reset();
        this.img1 = "assets/img/jiangsuruotai_clicked.png";
        this.password_src = "assets/img/S_password.png";
        this.email_src = "assets/img/S_email.png";
    };
    LoginPage.prototype.chooseDiy = function () {
        this.isSelected0 = false;
        this.isSelected2 = true;
        this.isSelected1 = false;
        this.isSelected3 = false;
        this.isSelected4 = false;
        this.chooseIndex = 2;
        __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl = "http://dr.robotime.com/";
        // HttpService.appUrl = "http://192.168.1.131:8888/"
        // HttpService.appUrl = "http://192.168.2.64:8069/"
        this.reset();
        this.img2 = "assets/img/diy_clicked.png";
        this.password_src = "assets/img/D_password.png";
        this.email_src = "assets/img/D_email.png";
    };
    LoginPage.prototype.chooseWanju = function () {
        this.isSelected0 = false;
        this.isSelected3 = true;
        this.isSelected2 = false;
        this.isSelected1 = false;
        this.isSelected4 = false;
        this.chooseIndex = 3;
        __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl = "http://erp.robotime.com/";
        // HttpService.appUrl = "http://192.168.1.9:8081/"
        this.reset();
        this.img3 = "assets/img/ruobeier_clicked.png";
        this.password_src = "assets/img/R_password.png";
        this.email_src = "assets/img/R_email.png";
    };
    LoginPage.prototype.chooseBanchang = function () {
        this.isSelected0 = false;
        this.isSelected4 = true;
        this.isSelected2 = false;
        this.isSelected1 = false;
        this.isSelected3 = false;
        this.chooseIndex = 4;
        __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl = "http://ber.robotime.com/";
        // HttpService.appUrl = "http://192.168.1.244:8111/"
        this.reset();
        this.img4 = "assets/img/banchang_clicked.png";
        this.password_src = "assets/img/B_password.png";
        this.email_src = "assets/img/B_email.png";
    };
    LoginPage.prototype.getDB = function () {
        var _this = this;
        this.loadingDB = this.loading.create({
            content: '加载中',
            enableBackdropDismiss: true
        });
        setTimeout(function () {
            _this.loadingDB.dismiss(); //显示多久消失
        }, 1000);
        // if(this.chooseIndex==3){
        //   this.employee = 'odoo0720'; 
        //   this.toLogin();
        // }else{
        this.loginservice.getDBInfo().then(function (res) {
            _this.employee = res.res_data[0]; //修改
            _this.toLogin();
        });
        // }
    };
    LoginPage.prototype.isAutoLogin = function () {
        // console.log(this.autoLogin)
        this.autoLogin = !this.autoLogin;
        // console.log(this.autoLogin)
        if (this.autoLogin) {
            this.remerberPassword = true;
        }
    };
    LoginPage.prototype.isRemerberPassword = function () {
        this.remerberPassword = !this.remerberPassword;
        if (!this.remerberPassword) {
            this.autoLogin = false;
        }
    };
    // 登录
    LoginPage.prototype.toLogin = function () {
        var _this = this;
        console.log(this.employee);
        console.log(this.remerberPassword);
        try {
            this.storage.set("login", {
                autoLogin: this.autoLogin,
                remerberPassword: this.remerberPassword,
            });
        }
        catch (error) {
            __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom('手机内存不足，请清理之后重试！', this.toastCtrl);
        }
        if (this.employee == null) {
            this.ctrl.create({
                title: '提示',
                subTitle: "请选择公司",
                buttons: [{
                        text: '确定',
                        handler: function () {
                        }
                    }
                ]
            }).present();
            return;
        }
        // if (this.password == '123456') {
        //   this.ctrl.create({
        //     title: '提示',
        //     subTitle: "你的登录密码是初始密码，请立即修改。",
        //     buttons: [{
        //       text: '确定',
        //       handler: () => {
        //         this.navCtrl.push('ChangePasswordPage')
        //       }
        //     }
        //     ]
        //   }).present();
        //   return
        // }
        // this.appVersion.getVersionNumber().then((value: string) => {
        var loading = this.loading.create({
            content: '加载中',
            enableBackdropDismiss: true
        });
        loading.present();
        this.loginservice.toLogin(this.email, this.password, this.employee, 'value')
            .then(function (res) {
            loading.dismiss();
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                loading.dismiss();
                __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].user_id = res.result.res_data.user_id;
                __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].user = res.result.res_data;
                try {
                    _this.storage.set("user_psd", {
                        user_email: _this.email,
                        user_psd: _this.password,
                        db_name: _this.employee,
                        url: __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */].appUrl
                    });
                    _this.storage.set('loginIndex', _this.chooseIndex);
                }
                catch (error) {
                    __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom('手机内存不足，请清理之后重试！', _this.toastCtrl);
                }
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
                                        password: _this.password,
                                    });
                                    need_add = false;
                                    break;
                                }
                                index = index + 1;
                            }
                            if (need_add) {
                                arr.push({
                                    email: _this.email,
                                    password: _this.password,
                                });
                            }
                            try {
                                _this.storage.set("history_users", arr);
                            }
                            catch (error) {
                                __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom('手机内存不足，请清理之后重试！', _this.toastCtrl);
                            }
                        }
                        else {
                            var arr = [];
                            arr.push({
                                email: _this.email,
                                password: _this.password,
                            });
                            try {
                                _this.storage.set("history_users", arr);
                            }
                            catch (error) {
                                __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom('手机内存不足，请清理之后重试！', _this.toastCtrl);
                            }
                        }
                    });
                }
                if (_this.password == '123456' && _this.chooseIndex == 0) {
                    _this.ctrl.create({
                        title: '提示',
                        subTitle: "你的登录密码是初始密码，请立即修改。",
                        enableBackdropDismiss: false,
                        buttons: [{
                                text: '确定',
                                handler: function () {
                                    _this.navCtrl.push('ChangePasswordPage');
                                }
                            }
                        ]
                    }).present();
                    return;
                }
                try {
                    _this.storage.set("user", res).then(function () {
                        if (_this.chooseIndex == 0) {
                            _this.navCtrl.setRoot('NewTabsPage');
                        }
                        else {
                            _this.navCtrl.setRoot('TabsPage');
                            //  this.navCtrl.setRoot('NewTabsPage');
                        }
                        // this.jpush.setAlias(res.result.res_data.user_id);
                    });
                }
                catch (error) {
                    __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].toastButtom('手机内存不足，请清理之后重试！', _this.toastCtrl);
                }
            }
            else if (res.result && res.result.res_code == -1) {
                loading.dismiss();
                alert(res.result.res_data.error);
            }
        }).catch(function (error) {
            loading.dismiss();
            console.log('Error getting location', error);
        });
        // })
    };
    LoginPage.prototype.watch = function (event) {
        var _this = this;
        this.password = "";
        if (this.email) {
            this.history_arr = [];
            this.storage.get("history_users").then(function (res) {
                if (res) {
                    console.log(res);
                    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                        var item = res_1[_i];
                        // console.log((new RegExp(this.email).test(item.email)))
                        if ((new RegExp(_this.email).test(item.email))) {
                            _this.history_arr.push(item);
                        }
                    }
                }
            });
        }
    };
    LoginPage.prototype.watchPassword = function (event) {
        console.log(this.password);
        if (this.password) {
            this.isDisabled = false;
        }
        else {
            this.isDisabled = true;
        }
    };
    LoginPage.prototype.click = function (item) {
        console.log("2");
        this.email = item.email;
        this.password = item.password;
        this.isDisabled = false;
        this.history_arr = [];
        if (this.platform.is('ios')) {
            cordova.plugins.Keyboard.close();
        }
    };
    LoginPage.prototype.panEvent = function ($event) {
        this.history_arr = [];
        if (this.platform.is('ios')) {
            cordova.plugins.Keyboard.close();
        }
    };
    LoginPage.prototype.tap = function () {
        this.history_arr = [];
        if (this.platform.is('ios')) {
            cordova.plugins.Keyboard.close();
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_7__angular_core__["Component"]({
        selector: 'page-login',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<style>\n  .center_x {\n    text-align: center;\n  }\n\n</style>\n\n\n<ion-content class="total_color" (pan)="panEvent($event)">\n\n    <p class="p_heard">专注原创·天生不一样</p>\n    <div class="div_middle" (click)=\'chooseNewJiangsu()\'>\n      <ion-checkbox class="checkbox_in_middle" color="danger" (click)=\'chooseNewJiangsu()\'  [checked]=\'isSelected0\'></ion-checkbox>\n      <span class="span_in_middle" [ngClass]="{\'textcolor0\':isSelected0}" >新江苏若态</span>\n    </div>\n    <div class="div_middle" (click)=\'chooseJiangsu()\'>\n      <ion-checkbox class="checkbox_in_middle" color="danger" (click)=\'chooseJiangsu()\' [checked]=\'isSelected1\'></ion-checkbox>\n      <span class="span_in_middle" [ngClass]="{\'textcolor1\':isSelected1}" >江苏若态</span>\n    </div>\n    <div class="div_middle" (click)=\'chooseDiy()\'>\n      <ion-checkbox class="checkbox_in_middle" color="diy" (click)=\'chooseDiy()\' [checked]=\'isSelected2\'></ion-checkbox>\n      <span class="span_in_middle" [ngClass]="{\'textcolor2\':isSelected2}" >diy艺术屋</span>\n    </div>\n    <div class="div_middle" (click)=\'chooseWanju()\'>\n      <ion-checkbox class="checkbox_in_middle" color="gongdan-color" (click)=\'chooseWanju()\' [checked]=\'isSelected3\'></ion-checkbox>\n      <span class="span_in_middle" [ngClass]="{\'textcolor3\':isSelected3}" >若贝尔玩具</span>\n    </div>\n    <div class="div_middle" (click)=\'chooseBanchang()\'>\n      <ion-checkbox class="checkbox_in_middle" color="banchang" (click)=\'chooseBanchang()\' [checked]=\'isSelected4\'></ion-checkbox>\n      <span class="span_in_middle" [ngClass]="{\'textcolor4\':isSelected4}" >板厂</span>\n    </div>\n\n\n\n  <ion-item style="margin-top:30px;padding-left:10%;padding-right:10%">\n    <ion-avatar item-left>\n      <img style=" width: 31px;\n      height: 30px;\n      margin-top: 7px;" src={{email_src}}>\n    </ion-avatar>\n    <ion-input [(ngModel)]="email" placeholder="请输入公司邮箱" (ngModelChange)="watch($event)" type="email"></ion-input>\n  </ion-item>\n\n\n\n  <ion-item style="padding-left:10%;padding-right:10%">\n    <ion-avatar item-left>\n      <img style=" width: 31px;\n      height: 30px;\n      margin-top: 7px;" src={{password_src}}>\n    </ion-avatar>\n    <ion-input [(ngModel)]="password" placeholder="请输入密码" (ngModelChange)="watchPassword($event)" type="password"></ion-input>\n  </ion-item>\n\n  <!-- <ion-item style="margin-top:20px;padding-left:10%;padding-right:10%">\n    <ion-label floating>请输入公司邮箱</ion-label>\n    <ion-input  [(ngModel)]="email"  (ngModelChange)="watch($event)" type="email" ></ion-input>\n  </ion-item>\n  <ion-item style="padding-left:10%;padding-right:10%">\n    <ion-label floating>请输入密码</ion-label>\n    <ion-input [(ngModel)]="password" (ngModelChange)="watchPassword($event)" type="password"></ion-input>\n  </ion-item> -->\n\n  <ion-list *ngIf="history_arr" style="position:absolute;z-index:999;width:inherit;margin-top:-60px;width:95%;\n    padding-left:23%">\n    <ion-item *ngFor=\'let item of history_arr\' tappable (click)="click(item)">\n      <p>{{item.email}}</p>\n    </ion-item>\n    <!--<ion-item tappable (click)="click()">\n          <p>candy.guo@robotime.com</p>\n        </ion-item>\n        <ion-item tappable (click)="click()">\n          <p>julia.liu@robotime.com</p>\n        </ion-item>-->\n\n  </ion-list>\n\n  <ng-container *ngIf="isDisabled">\n    <button id="login_button" ion-button round style="\n    margin-left:10%;\n  color:white;margin-top:50px ;\n  height: 40px;\n  border-radius: 20px;\n  font-size: 140%;\n    width:80%" outline block tappable (click)="getDB()" [ngClass]="{\'backgroundcolor0\':isSelected0,\'backgroundcolor1\':isSelected1,\'backgroundcolor2\':isSelected2,\n    \'backgroundcolor3\':isSelected3,\'backgroundcolor4\':isSelected4}" disabled>\n      登录\n    </button>\n  </ng-container>\n\n  <ng-container *ngIf="!isDisabled">\n    <button id="login_button" round style="\n      margin-left:10%;\n      height: 40px;\n      border-radius: 20px;\n    color:white;margin-top:50px ;\n    font-size: 140%;\n      width:80%" outline block tappable (click)="getDB()" [ngClass]="{\'backgroundcolor0\':isSelected0,\'backgroundcolor1\':isSelected1,\'backgroundcolor2\':isSelected2,\n      \'backgroundcolor3\':isSelected3,\'backgroundcolor4\':isSelected4}">\n      登录\n    </button>\n  </ng-container>\n\n  <ion-checkbox style="margin-left:14%;border-color: #cccccc ;margin-top:10px;padding-bottom: 2px;" color="danger" *ngIf="isSelected0"\n    (click)="isAutoLogin()" [checked]="autoLogin"></ion-checkbox>\n  <ion-checkbox style="margin-left:14%;border-color: #cccccc ;margin-top:10px;padding-bottom: 2px;" color="danger" *ngIf="isSelected1"\n    (click)="isAutoLogin()" [checked]="autoLogin"></ion-checkbox>\n  <ion-checkbox style="margin-left:14%;border-color: #cccccc ;margin-top:10px;padding-bottom: 2px;" color="diy" *ngIf="isSelected2"\n    (click)="isAutoLogin()" [checked]="autoLogin"></ion-checkbox>\n  <ion-checkbox style="margin-left:14%;border-color: #cccccc ;margin-top:10px;padding-bottom: 2px;" *ngIf="isSelected3" (click)="isAutoLogin()"\n    [checked]="autoLogin"></ion-checkbox>\n  <ion-checkbox style="margin-left:14%;border-color: #cccccc ;margin-top:10px;padding-bottom: 2px;" color="banchang" *ngIf="isSelected4"\n    (click)="isAutoLogin()" [checked]="autoLogin"></ion-checkbox>\n\n  <span style="vertical-align:super;padding-top:3px" [ngClass]="{\n    \'textcolor_normal\':!autoLogin, \'textcolor0\':(isSelected0 && autoLogin),\n    \'textcolor1\':(isSelected1 && autoLogin),\'textcolor2\':(isSelected2 && autoLogin),\n    \'textcolor3\':(isSelected3 && autoLogin),\'textcolor4\':(isSelected4 && autoLogin)}"> 自动登录</span>\n\n\n  <ion-checkbox style="margin-left:100px;padding-bottom: 3px;" color="danger" *ngIf="isSelected0" (click)="isRemerberPassword()"\n  [checked]="remerberPassword"></ion-checkbox>\n  <ion-checkbox style="margin-left:100px;padding-bottom: 3px;" color="danger" *ngIf="isSelected1" (click)="isRemerberPassword()"\n    [checked]="remerberPassword"></ion-checkbox>\n  <ion-checkbox style="margin-left:100px;padding-bottom: 3px;" color="diy" *ngIf="isSelected2" (click)="isRemerberPassword()"\n    [checked]="remerberPassword"></ion-checkbox>\n  <ion-checkbox style="margin-left:100px;padding-bottom: 3px;" *ngIf="isSelected3" (click)="isRemerberPassword()" [checked]="remerberPassword"></ion-checkbox>\n  <ion-checkbox style="margin-left:100px;padding-bottom: 3px;" color="banchang" *ngIf="isSelected4" (click)="isRemerberPassword()"\n    [checked]="remerberPassword"></ion-checkbox>\n  <span style="vertical-align:super" [ngClass]="{\n    \'textcolor_normal\': !remerberPassword,\n    \'textcolor0\':isSelected0 && remerberPassword,\n    \'textcolor1\':isSelected1 && remerberPassword,\n    \'textcolor2\':isSelected2 && remerberPassword,\n    \'textcolor3\':isSelected3 && remerberPassword,\'textcolor4\':isSelected4 &&remerberPassword}"> 记住密码</span>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/login/login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_6__loginService__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_5__providers_JPush__["a" /* JPush */], UrlServer, __WEBPACK_IMPORTED_MODULE_2__app_FirService__["a" /* FirService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["t" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_6__loginService__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_app_version__["a" /* AppVersion */],
        __WEBPACK_IMPORTED_MODULE_5__providers_JPush__["a" /* JPush */], UrlServer, __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_2__app_FirService__["a" /* FirService */], __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__["a" /* NativeService */], __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toast_toast_controller__["a" /* ToastController */]])
], LoginPage);

//# sourceMappingURL=login.js.map
// CONCATENATED MODULE: ./src/pages/login/login.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic2_auto_complete__ = __webpack_require__(738);
var login_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = login_module___decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            LoginPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(LoginPage), __WEBPACK_IMPORTED_MODULE_4_ionic2_auto_complete__["a" /* AutoCompleteModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* HttpModule */]
        ],
        exports: [
            LoginPage
        ],
        providers: []
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoCompleteModule; });
/* unused harmony export AutoCompleteComponent */
/* unused harmony export BoldPrefix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);






// searchbar default options
var defaultOpts = {
    cancelButtonText: 'Cancel',
    showCancelButton: false,
    debounce: 250,
    placeholder: '搜索',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'off',
    type: 'search',
    value: '',
    noItems: '',
    clearOnEdit: false,
    clearInput: false
};
var AutoCompleteComponent = (function () {
    /**
     * create a new instace
     */
    function AutoCompleteComponent() {
        this.hideListOnSelection = true;
        this.showListChanged = false;
        this.keyword = null;
        this.suggestions = [];
        this._showList = false;
        this.itemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemClearSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.ionAutoInput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoFocus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.options = {};
        // set default options
        this.defaultOpts = defaultOpts;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "showList", {
        /**
         * @return {?}
         */
        get: function () {
            return this._showList;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._showList === value) {
                return;
            }
            this._showList = value;
            this.showListChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoCompleteComponent.prototype.ngAfterViewChecked = function () {
        if (this.showListChanged) {
            this.showListChanged = false;
            this.showList ? this.itemsShown.emit() : this.itemsHidden.emit();
        }
    };
    /**
     * get items for auto-complete
     * @return {?}
     */
    AutoCompleteComponent.prototype.getItems = function () {
        var _this = this;
        var /** @type {?} */ result;
        if (this.showResultsFirst && !this.keyword) {
            this.keyword = '';
        }
        else if (this.keyword.trim() === '') {
            this.suggestions = [];
            return;
        }
        if (typeof this.dataProvider === 'function') {
            result = this.dataProvider(this.keyword);
        }
        else {
            result = this.dataProvider.getResults(this.keyword);
        }
        // if result is instanceof Subject, use it asObservable
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]) {
            result = result.asObservable();
        }
        // if query is async
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"]) {
            result
                .subscribe(function (results) {
                _this.suggestions = results;
                _this.showItemList();
            }, function (error) { return console.error(error); });
        }
        else {
            this.suggestions = result;
            this.showItemList();
        }
        // emit event
        this.ionAutoInput.emit(this.keyword);
    };
    /**
     * show item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.showItemList = function () {
        this.showList = true;
    };
    /**
     * hide item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.hideItemList = function () {
        this.showList = this.alwaysShowList;
    };
    /**
     * select item from list
     *
     * @param {?} selection
     *
     * @return {?}
     */
    AutoCompleteComponent.prototype.select = function (selection) {
        // this.keyword = this.dataProvider.labelAttribute == null || selection[this.dataProvider.labelAttribute] == null
        //     ? selection : selection[this.dataProvider.labelAttribute];
        // if (this.hideListOnSelection) {
        //     this.hideItemList();
        // }
        // // emit selection event
        this.hideItemList();
        this.itemSelected.emit(selection);
        this.selection = selection;
    };
    /**
     * get current selection
     * @return {?}
     */
    AutoCompleteComponent.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * get current input value
     * @return {?}
     */
    AutoCompleteComponent.prototype.getValue = function () {
        return this.keyword;
    };
    /**
     * set current input value
     * @param {?} value
     * @return {?}
     */
    AutoCompleteComponent.prototype.setValue = function (value) {
        this.keyword = value;
        return;
    };
    /**
     * /**
     * clear current input value
     * @param {?=} hideItemList
     * @return {?}
     */
    AutoCompleteComponent.prototype.clearValue = function (hideItemList) {
        if (hideItemList === void 0) { hideItemList = false; }
        this.keyword = null;
        this.selection = null;
        if (hideItemList) {
            this.hideItemList();
            this.itemClearSelected.emit(true)
        }
        return;
    };
    /**
     * set focus of searchbar
     * @return {?}
     */
    AutoCompleteComponent.prototype.setFocus = function () {
        if (this.searchbarElem) {
            this.searchbarElem.setFocus();
        }
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onFocus = function () {
        this.autoFocus.emit();
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onBlur = function () {
        this.autoBlur.emit();
    };
    /**
     * handle document click
     * @param {?} event
     * @return {?}
     */
    AutoCompleteComponent.prototype.documentClickHandler = function (event) {
        if ((this.searchbarElem
            && !this.searchbarElem._elementRef.nativeElement.contains(event.target))
            ||
                (!this.inputElem && this.inputElem._elementRef.nativeElement.contains(event.target))) {
            this.hideItemList();
        }
    };
    return AutoCompleteComponent;
}());
AutoCompleteComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                host: {
                    '(document:click)': 'documentClickHandler($event)',
                },
                template: "\n      <ion-input\n              #inputElem\n              (keyup)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [clearOnEdit]=\"options.clearOnEdit == null ? defaultOpts.clearOnEdit : options.clearOnEdit\"\n              [clearInput]=\"options.clearInput == null ? defaultOpts.clearInput : options.clearInput\"\n              [ngClass]=\"{'hidden': !useIonInput}\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-input>\n      <ion-searchbar\n              #searchbarElem\n              (ionInput)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [cancelButtonText]=\"options.cancelButtonText == null ? defaultOpts.cancelButtonText : options.cancelButtonText\"\n              [showCancelButton]=\"options.showCancelButton == null ? defaultOpts.showCancelButton : options.showCancelButton\"\n              [debounce]=\"options.debounce == null ? defaultOpts.debounce : options.debounce\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [autocomplete]=\"options.autocomplete == null ? defaultOpts.autocomplete : options.autocomplete\"\n              [autocorrect]=\"options.autocorrect == null ? defaultOpts.autocorrect : options.autocorrect\"\n              [spellcheck]=\"options.spellcheck == null ? defaultOpts.spellcheck : options.spellcheck\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [ngClass]=\"{'hidden': useIonInput}\"\n              (ionClear)=\"clearValue(true)\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-searchbar>\n      <ng-template #defaultTemplate let-attrs=\"attrs\">\n          <span [innerHTML]='(attrs.labelAttribute ? attrs.data[attrs.labelAttribute] : attrs.data) | boldprefix:attrs.keyword'></span>\n      </ng-template>\n      <ul *ngIf=\"suggestions.length > 0 && showList\">\n          <li *ngFor=\"let suggestion of suggestions\" (tap)=\"select(suggestion);$event.srcEvent.stopPropagation()\">\n              <ng-template\n                      [ngTemplateOutlet]=\"template || defaultTemplate\"\n                      [ngOutletContext]=\"\n                        {attrs:{ data: suggestion, keyword: keyword, labelAttribute: dataProvider.labelAttribute }}\"></ng-template>\n          </li>\n      </ul>\n      <p *ngIf=\"suggestions.length == 0 && showList && options.noItems\">{{ options.noItems }}</p>\n  ",
                selector: 'ion-auto-complete'
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteComponent.ctorParameters = function () { return []; };
AutoCompleteComponent.propDecorators = {
    'dataProvider': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'keyword': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showResultsFirst': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'alwaysShowList': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'hideListOnSelection': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'useIonInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'autoFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'autoBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemClearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsShown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsHidden': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'ionAutoInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'searchbarElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['searchbarElem',] },],
    'inputElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['inputElem',] },],
};

/**
 * bolds the beggining of the matching string in the item
 */
var BoldPrefix = (function () {
    function BoldPrefix() {
    }
    /**
     * @param {?} value
     * @param {?} keyword
     * @return {?}
     */
    BoldPrefix.prototype.transform = function (value, keyword) {
        if (!keyword)
            return value;
        var /** @type {?} */ escaped_keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(escaped_keyword, 'gi'), function (str) { return str.bold(); });
    };
    return BoldPrefix;
}());
BoldPrefix.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"], args: [{
                name: 'boldprefix'
            },] },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BoldPrefix.ctorParameters = function () { return []; };

var AutoCompleteModule = (function () {
    function AutoCompleteModule() {
    }
    /**
     * @return {?}
     */
    AutoCompleteModule.forRoot = function () {
        return {
            ngModule: AutoCompleteModule,
            providers: []
        };
    };
    return AutoCompleteModule;
}());
AutoCompleteModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* IonicModule */]
                ],
                declarations: [
                    AutoCompleteComponent,
                    BoldPrefix
                ],
                exports: [
                    AutoCompleteComponent,
                    BoldPrefix
                ]
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteModule.ctorParameters = function () { return []; };




/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FirService = (function () {
    function FirService(http, loading) {
        this.http = http;
        this.loading = loading;
    }
    FirService.prototype.getAppPath = function (url, type) {
        if (type === void 0) { type = 0; }
        return 'http://api.fir.im/apps/latest/5961a838548b7a7a16000060?api_token=fd574d0078c5b11777cb3d8a7d4c1d5b';
    };
    //type 不填是OA,填1是linkloving_app_apu
    FirService.prototype.get = function (url, paramObj, type) {
        var _this = this;
        if (type === void 0) { type = 0; }
        // let loading = this.loadingCreate(true);  
        console.log(this.getAppPath(url, type));
        return this.http.get(this.getAppPath(url, type))
            .map(function (data) { return _this.dealRe(data, null); })
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); }).catch();
    };
    FirService.prototype.post = function (url, paramObj, type) {
        var _this = this;
        if (type === void 0) { type = 0; }
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        headers.append("Accept", "application/json");
        return this.http.post(this.getAppPath(url, type), this.toBodyString(paramObj), new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers }))
            .toPromise()
            .then(function (res) { return _this.handleSuccess(res.json()); })
            .catch(function (error) { return _this.handleError(error); });
    };
    //加载  
    FirService.prototype.loadingCreate = function (isLoading, pageIndex) {
        var loading = this.loading.create({
            content: '加载中'
        });
        pageIndex = typeof (pageIndex) == 'undefined' ? 1 : pageIndex;
        isLoading = typeof (isLoading) == 'undefined' ? true : isLoading;
        if (isLoading == true && pageIndex == 1) {
            loading.present();
        }
        return loading;
    };
    //返回处理  
    FirService.prototype.dealRe = function (re, loading) {
        // loading.dismiss();  
        return re;
    };
    FirService.prototype.postBody = function (url, paramObj, type) {
        var _this = this;
        if (type === void 0) { type = 0; }
        var loading = this.loadingCreate(true);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post(this.getAppPath(url, type), paramObj, new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers }))
            .map(function (data) { return _this.dealRe(data, loading); })
            .toPromise()
            .then(function (res) {
            return _this.handleSuccess(res.json());
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    FirService.prototype.handleSuccess = function (result) {
        return result;
    };
    FirService.prototype.handleError = function (error) {
        var msg = '请求失败';
        console.log(error.status);
        if (error.status == 0) {
            msg = '网络连接不佳';
        }
        if (error.status == 400) {
            msg = '请求无效';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        alert(msg); //这里使用ToastController
        return { success: false, msg: msg };
    };
    /**
     * @param obj　参数对象
     * @return {string}　参数字符串
     * @example
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
     */
    FirService.prototype.toQueryString = function (obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {
                var queryValues = [];
                for (var i = 0, len = values.length, value = void 0; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            }
            else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    };
    /**
     *
     * @param obj
     * @return {string}
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
     */
    FirService.prototype.toBodyString = function (obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {
                var queryValues = [];
                for (var i = 0, len = values.length, value = void 0; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            }
            else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    };
    FirService.prototype.toQueryPair = function (key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    };
    return FirService;
}());
FirService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["t" /* LoadingController */]])
], FirService);

//# sourceMappingURL=FirService.js.map

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
//# sourceMappingURL=12.js.map