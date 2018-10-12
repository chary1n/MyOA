webpackJsonp([25],{

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/choose-location/choose-location.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kaoqinService__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_NativeService__ = __webpack_require__(103);
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
 * Generated class for the ChooseLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChooseLocationPage = (function () {
    function ChooseLocationPage(navCtrl, platform, navParams, geolocation, kaoQinService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.kaoQinService = kaoQinService;
        this.pois_list = [];
        this.select_list = [];
        this.attendance_off = this.navParams.get('attendance_off');
        if (this.platform.is("android")) {
            GaoDe.getCurrentPosition(function (success) {
                var that = _this;
                console.log('gaode', success);
                _this.kaoQinService.trans_location(success.latitude, success.longitude).then(function (res) {
                    _this.kaoQinService.get_location_now(res.result[0].y, res.result[0].x).then(function (res_location) {
                        // console.log(res_location.result.pois[0].addr)
                        // that.location_str = res_location.result.pois[0].addr
                        that.pois_list = res_location.result.pois;
                        for (var _i = 0, _a = that.pois_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            that.select_list.push("0");
                        }
                        that.select_list[0] = "1";
                        that.select_index = 0;
                    });
                });
            }, function (error) {
                console.log('Error getting location', error);
            });
        }
        else {
            this.geolocation.getCurrentPosition()
                .then(function (resp) {
                console.log(resp.coords.latitude);
                console.log(resp.coords.longitude);
                _this.kaoQinService.trans_location(resp.coords.latitude, resp.coords.longitude).then(function (res) {
                    // console.log(res)
                    var that = _this;
                    _this.kaoQinService.get_location_now(res.result[0].y, res.result[0].x).then(function (res_location) {
                        // console.log(res_location.result.pois[0].addr)
                        // that.location_str = res_location.result.pois[0].addr
                        that.pois_list = res_location.result.pois;
                        for (var _i = 0, _a = that.pois_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            that.select_list.push("0");
                        }
                        that.select_list[0] = "1";
                        that.select_index = 0;
                    });
                });
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
        }
    }
    ChooseLocationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChooseLocationPage');
    };
    ChooseLocationPage.prototype.clickLocation = function (index) {
        this.select_index = index;
        var i = 0;
        for (var _i = 0, _a = this.select_list; _i < _a.length; _i++) {
            var item = _a[_i];
            this.select_list[i] = "0";
            i = i + 1;
        }
        this.select_list[this.select_index] = "1";
        // this.navCtrl.push('KaoqinPhotoPage',{
        //   "attendance_off":this.attendance_off,
        //   "location_str":item.name,
        // })
    };
    ChooseLocationPage.prototype.goBack = function () {
        this.navCtrl.popTo('KaoqinPage');
    };
    ChooseLocationPage.prototype.release = function () {
        this.navCtrl.push('KaoqinPhotoPage', {
            "attendance_off": this.attendance_off,
            "location_str": this.pois_list[this.select_index].name,
        });
    };
    return ChooseLocationPage;
}());
ChooseLocationPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-choose-location',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/choose-location/choose-location.html"*/'<!--\n  Generated template for the ChooseLocationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    \n    <ion-title>选择位置</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'release()\'>\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <div style="border-bottom:#f0f2f5 1px solid;" *ngFor="let item of pois_list;let i = index" tappable (click)="clickLocation(i)">\n      <p style="margin-left:10px;font-size:13px">{{item.name}}</p>\n      <img *ngIf="select_list[i] == \'1\'" src="assets/img/choose_location.png" class="select_class" />\n      <p style="color:gray;margin-left:10px;font-size:12px">{{item.addr}}</p>\n    </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/choose-location/choose-location.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1__kaoqinService__["a" /* KaoQinService */], __WEBPACK_IMPORTED_MODULE_5__providers_NativeService__["a" /* NativeService */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["DatePipe"]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1__kaoqinService__["a" /* KaoQinService */]])
], ChooseLocationPage);

//# sourceMappingURL=choose-location.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/choose-location/choose-location.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseLocationPageModule", function() { return ChooseLocationPageModule; });
/* harmony import */ var choose_location_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var choose_location_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseLocationPageModule = (function () {
    function ChooseLocationPageModule() {
    }
    return ChooseLocationPageModule;
}());
ChooseLocationPageModule = choose_location_module___decorate([
    choose_location_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ChooseLocationPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ChooseLocationPage),
        ],
    })
], ChooseLocationPageModule);

//# sourceMappingURL=choose-location.module.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KaoQinService; });
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


var KaoQinService = (function () {
    function KaoQinService(httpservice) {
        this.httpservice = httpservice;
    }
    KaoQinService.prototype.get_today_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_today_attendance", body);
    };
    KaoQinService.prototype.employee_attendance = function (data_params) {
        var body = JSON.stringify(data_params);
        return this.httpservice.postBodyNoLoading("employee_attendance", body);
    };
    KaoQinService.prototype.get_ble_device = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_ble_device", body);
    };
    KaoQinService.prototype.get_employee_attendance = function (day_start, day_end, user_id) {
        var body = JSON.stringify({
            day_start: day_start,
            day_end: day_end,
            user_id: user_id,
        });
        return this.httpservice.postBodyNoLoading("get_employee_attendance", body);
    };
    KaoQinService.prototype.get_is_department = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id,
        });
        return this.httpservice.postBodyNoLoading("get_is_department", body);
    };
    KaoQinService.prototype.get_department_employee_attendance = function (manager_id, day_start, day_end) {
        var body = JSON.stringify({
            manager_id: manager_id,
            day_start: day_start,
            day_end: day_end,
        });
        return this.httpservice.postBody("get_department_employee_attendance", body);
    };
    KaoQinService.prototype.trans_location = function (latitude, longti) {
        var url_str = "http://api.map.baidu.com/geoconv/v1/?coords=" + longti + "," + latitude + "&from=1&to=5&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7";
        return this.httpservice.getWithUrl(url_str);
    };
    KaoQinService.prototype.get_location_now = function (latitude, longti) {
        var url_str = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latitude + "," + longti + "&output=json&pois=1&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7";
        return this.httpservice.getLocationWithUrl(url_str);
    };
    KaoQinService.prototype.location_attendance = function (data_params) {
        var body = JSON.stringify(data_params);
        return this.httpservice.postBody("location_attendance", body);
    };
    KaoQinService.prototype.get_month_attendance = function (month_str, user_id) {
        var body = JSON.stringify({
            month_str: month_str,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_month_attendance", body);
    };
    return KaoQinService;
}());
KaoQinService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], KaoQinService);

//# sourceMappingURL=kaoqinService.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Geolocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @name Geolocation
 * @description
 * This plugin provides information about the device's location, such as latitude and longitude. Common sources of location information include Global Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs.
 *
 *  This API is based on the W3C Geolocation API Specification, and only executes on devices that don't already provide an implementation.
 *
 * For iOS you have to add this configuration to your configuration.xml file
 * ```xml
 * <edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
 *    <string>We want your location! Best regards NSA</string>
 * </edit-config>
 * ```
 *
 *
 * @usage
 *
 * ```typescript
 * import { Geolocation } from '@ionic-native/geolocation';
 *
 * ...
 *
 * constructor(private geolocation: Geolocation) {}
 *
 * ...
 *
 * this.geolocation.getCurrentPosition().then((resp) => {
 *  // resp.coords.latitude
 *  // resp.coords.longitude
 * }).catch((error) => {
 *   console.log('Error getting location', error);
 * });
 *
 * let watch = this.geolocation.watchPosition();
 * watch.subscribe((data) => {
 *  // data can be a set of coordinates, or an error (if an error occurred).
 *  // data.coords.latitude
 *  // data.coords.longitude
 * });
 * ```
 * @interfaces
 * Coordinates
 * Geoposition
 * PositionError
 * GeolocationOptions
 */
var Geolocation = (function (_super) {
    __extends(Geolocation, _super);
    function Geolocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the device's current position.
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Promise<Geoposition>} Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
     */
    Geolocation.prototype.getCurrentPosition = function (options) { return; };
    /**
     * Watch the current device's position.  Clear the watch by unsubscribing from
     * Observable changes.
     *
     * ```typescript
     * const subscription = this.geolocation.watchPosition()
     *                               .filter((p) => p.coords !== undefined) //Filter Out Errors
     *                               .subscribe(position => {
     *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
     * });
     *
     * // To stop notifications
     * subscription.unsubscribe();
     * ```
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Observable<Geoposition>} Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
     */
    Geolocation.prototype.watchPosition = function (options) {
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            var watchId = navigator.geolocation.watchPosition(observer.next.bind(observer), observer.next.bind(observer), options);
            return function () { return navigator.geolocation.clearWatch(watchId); };
        });
    };
    Geolocation.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Geolocation.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */]({
            callbackOrder: 'reverse'
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], Geolocation.prototype, "getCurrentPosition", null);
    Geolocation = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'Geolocation',
            plugin: 'cordova-plugin-geolocation',
            pluginRef: 'navigator.geolocation',
            repo: 'https://github.com/apache/cordova-plugin-geolocation',
            install: 'ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"',
            installVariables: ['GEOLOCATION_USAGE_DESCRIPTION'],
            platforms: ['Amazon Fire OS', 'Android', 'Browser', 'iOS', 'Windows']
        })
    ], Geolocation);
    return Geolocation;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=25.js.map