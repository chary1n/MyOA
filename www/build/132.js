webpackJsonp([132],{

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/me/groups.directive.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GroupsDirective = (function () {
    function GroupsDirective(el) {
        el.nativeElement.style.backgroundColor = 'green';
    }
    return GroupsDirective;
}());
GroupsDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[groups]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], GroupsDirective);

//# sourceMappingURL=groups.directive.js.map
// CONCATENATED MODULE: ./src/pages/me/me.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Constants__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_FirService__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_JPush__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_HttpService__ = __webpack_require__(100);
var me___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var me___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the MePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MePage = (function () {
    function MePage(navCtrl, navParams, storage, menu, alertCtrl, modalctrl, platform, appVersion, jpush, event, statusbar, firService, inAppBrowser, httpService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.modalctrl = modalctrl;
        this.platform = platform;
        this.appVersion = appVersion;
        this.jpush = jpush;
        this.event = event;
        this.statusbar = statusbar;
        this.firService = firService;
        this.inAppBrowser = inAppBrowser;
        this.httpService = httpService;
        this.from = false;
        if (this.platform.is("android")) {
            this.appVersion.getVersionNumber().then(function (value) {
                _this.versionNumber = value;
            });
        }
        else if (this.platform.is('ios')) {
            this.appVersion.getVersionNumber().then(function (value) {
                _this.versionNumber = value;
            });
        }
        this.storage.get("loginIndex").then(function (res) {
            _this.loginIndex = res;
        });
    }
    MePage.prototype.checkVersion = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is("android")) {
                _this.getVersionNumber();
            }
            else if (_this.platform.is('ios')) {
                _this.getiOSVersionNumber();
            }
        });
    };
    MePage.prototype.getVersionNumber = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getVersionCode().then(function (value) {
                resolve(value);
                _this.version = value;
                console.log(_this.version);
                _this.detectionUpgrade(_this.version);
            }).catch(function (err) {
            });
        });
    };
    /**
     * 检查app是否需要升级
     */
    MePage.prototype.detectionUpgrade = function (version) {
        //这里连接后台判断是否需要升级,不需要升级就return
        this.checkNeedToUpdate(version);
    };
    MePage.prototype.checkNeedToUpdate = function (version) {
        var _this = this;
        return this.httpService.getWithUrlNoLoadingNoCatch(__WEBPACK_IMPORTED_MODULE_0__providers_Constants__["d" /* AndroidAppVersion */]).then(function (res) {
            console.log(res);
            console.log(res.changelog);
            var changelog = res.changelog;
            if (res.version) {
                if (res.version > version) {
                    _this.alertCtrl.create({
                        title: '发现新版本,是否立即升级?',
                        subTitle: changelog,
                        buttons: [{ text: '稍后再说' },
                            {
                                text: '立即升级',
                                handler: function () {
                                    _this.openUrlByBrowser(__WEBPACK_IMPORTED_MODULE_0__providers_Constants__["a" /* APK_DOWNLOAD */]);
                                }
                            }
                        ]
                    }).present();
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: '提示!',
                        subTitle: '已是最新版本，无需更新!',
                        buttons: ['好的']
                    });
                    alert_1.present();
                }
            }
        });
    };
    MePage.prototype.getiOSVersionNumber = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getVersionNumber().then(function (value) {
                _this.firService.get('fir_ios', 1).then(function (res) {
                    console.log(res);
                    if (res.version > value) {
                        _this.alertCtrl.create({
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
                    else {
                        var alert_2 = _this.alertCtrl.create({
                            title: '提示!',
                            subTitle: '已是最新版本，无需更新!',
                            buttons: ['好的']
                        });
                        alert_2.present();
                    }
                });
            }).catch(function (err) {
            });
        });
    };
    MePage.prototype.openUrlByBrowser = function (url) {
        this.inAppBrowser.create(url, '_system');
    };
    MePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MePage');
    };
    MePage.prototype.ionViewWillEnter = function () {
        this.initData();
        this.statusbar.backgroundColorByHexString("#409eff");
        this.statusbar.styleLightContent();
    };
    MePage.prototype.initData = function () {
        var _this = this;
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.name = res.result.res_data.name;
            _this.job = res.result.res_data.job;
            if (_this.job == false) {
                _this.job = " ";
            }
            _this.user_heard = res.result.res_data.user_ava;
            _this.company = res.result.res_data.company;
        });
    };
    MePage.prototype.outToLogin = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '退出当前账号?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.storage.set('user', null)
                            .then(function () {
                            _this.storage.get("login").then(function (res) {
                                if (!(res && res.remerberPassword)) {
                                    _this.storage.set('user_psd', null);
                                    console.log("密码设置为空");
                                }
                            });
                            _this.statusbar.backgroundColorByHexString("#f0f2f5");
                            _this.statusbar.styleLightContent();
                            // this.jpush.setAlias(null);
                            var modal = _this.modalctrl.create("LoginPage");
                            modal.present();
                            var tabs = document.getElementsByClassName('tabbar').item(0);
                            tabs.remove();
                            var menus = _this.menu.getMenus();
                            if (menus) {
                                menus.pop();
                                // this.menu.enable(false)
                            }
                            console.log('注销事件传递');
                            _this.event.unsubscribe('click_envnt');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    MePage.prototype.editInformation = function () {
        this.navCtrl.push("EditInformationPage");
    };
    MePage.prototype.changePassword = function () {
        this.navCtrl.push('ChangePasswordPage', { is_me: true });
    };
    return MePage;
}());
MePage = me___decorate([
    __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"]({
        selector: 'page-me',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/me/me.html"*/'<!--\n  Generated template for the MePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n    <!-- <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-title>首页</ion-title>\n    </ion-navbar> -->\n<ion-grid style="background-image:url(\'assets/img/meBacground.png\');background-repeat:round;">\n  <ion-row style="min-height:230px">\n    <ion-col>\n        <!-- <ion-buttons right *ngIf="from==true">\n            <button  icon-only (click)="goBack()" style="background-color: transparent">\n              <ion-icon name="arrow-forward" style="color: white"></ion-icon>\n            </button>\n        </ion-buttons> -->\n      <div style="margin-left:auto;margin-right:auto;text-align:center;margin-top:45px" tappable (click)=\'editInformation()\'>\n        <img src={{user_heard}} class="image1" alt="">\n        <p style="color:white;font-size:18px;margin-top:1px">{{name}}</p>\n        <p style="color:#bfdfff;font-size:12px;margin-top:-9px">{{company}}</p>\n      </div>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-header>\n\n  <ion-content class="outer-content" style="background:#f0f2f5">\n    \n    <ion-list no-lines>\n      <ion-item style="min-height:50px" tappable (click)="checkVersion()">\n        <img item-start src="assets/img/version_icon.png" style="width:23px;height:23px"> \n        <!-- <ion-icon name="brush" item-start color="secondary"></ion-icon> -->\n        <ion-label style="color:2e3033;font-size:14px">版本号{{versionNumber}}</ion-label>\n        <img src="assets/img/journal_sheet/right_icon.png" item-end style="width:15px;height:15px;">\n      </ion-item>\n      <ion-item   tappable  *ngIf="loginIndex==0"   style="min-height:50px" (click)=\'changePassword()\'>\n          <img item-start src="assets/img/edit_password.png" style="width:23px;height:23px"> \n          <!-- <ion-icon name="brush" item-start color="secondary"></ion-icon> -->\n          <ion-label style="color:2e3033;font-size:14px">修改密码</ion-label>\n        </ion-item>\n    </ion-list>\n    <div  style="text-align:center;background:white;line-height:50px;height:50px" tappable (click)="outToLogin()">\n        <p style="color:2e3033;font-size:18px">退出登录</p>\n    </div>\n  </ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/me/me.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_6__providers_JPush__["a" /* JPush */], __WEBPACK_IMPORTED_MODULE_1__app_FirService__["a" /* FirService */]],
    }),
    me___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["u" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["v" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */],
        __WEBPACK_IMPORTED_MODULE_6__providers_JPush__["a" /* JPush */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* Events */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1__app_FirService__["a" /* FirService */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_9__providers_HttpService__["a" /* HttpService */]])
], MePage);

//# sourceMappingURL=me.js.map
// CONCATENATED MODULE: ./src/pages/me/me.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MePageModule", function() { return MePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var me_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MePageModule = (function () {
    function MePageModule() {
    }
    return MePageModule;
}());
MePageModule = me_module___decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            GroupsDirective,
            MePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(MePage),
        ],
    })
], MePageModule);

//# sourceMappingURL=me.module.js.map

/***/ }),

/***/ 884:
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

/***/ })

});
//# sourceMappingURL=132.js.map