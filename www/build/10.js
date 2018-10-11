webpackJsonp([10],{

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/kaoqin-photo/kaoqin-photo.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kaoqinService__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_NativeService__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__ = __webpack_require__(898);
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
 * Generated class for the KaoqinPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KaoqinPhotoPage = (function () {
    function KaoqinPhotoPage(navCtrl, navParams, geolocation, kaoQinService, nativeService, actionSheetCtrl, datePipe, storage, device) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.kaoQinService = kaoQinService;
        this.nativeService = nativeService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.datePipe = datePipe;
        this.storage = storage;
        this.device = device;
        this.pushImgList = [];
        this.imgList = [];
        this.isDeletePicture = false;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_7__providers_Utils__["a" /* Utils */].getViewController("KaoqinPage", navCtrl);
        this.is_attendance_off = this.navParams.get('attendance_off');
        this.location_str = this.navParams.get('location_str');
        this.storage.get('user')
            .then(function (res) {
            // console.log(res)
            _this.user = res.result.res_data;
        });
        // this.geolocation.getCurrentPosition().then((resp) => {
        //     // console.log(resp.coords.latitude)
        //     // console.log(resp.coords.longitude)
        //     this.kaoQinService.trans_location(resp.coords.latitude,resp.coords.longitude).then(res => {
        //       console.log(res)
        //       var that = this
        //       this.kaoQinService.get_location_now(res.result[0].y,res.result[0].x).then(res_location =>{
        //         console.log(res_location.result.pois[0].addr)
        //         that.location_str = res_location.result.pois[0].addr
        //       })
        //     })
        // }).catch((error) => {
        //   console.log('Error getting location', error);
        // })
    }
    KaoqinPhotoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KaoqinPhotoPage');
    };
    KaoqinPhotoPage.prototype.ionViewWillEnter = function () {
        this.isDeletePicture = this.navParams.get('isDeletePicture');
        console.log(this.isDeletePicture);
        if (this.isDeletePicture) {
            this.navParams.data.isDeletePicture = false;
            this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1);
            this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]), 1);
        }
    };
    KaoqinPhotoPage.prototype.addImg = function () {
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
    KaoqinPhotoPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            allowEdit: false,
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
    KaoqinPhotoPage.prototype.getPictureSuccess = function (img_url) {
        console.log(img_url);
        this.imgList.push(img_url);
        this.pushImgList.push(img_url.split(",")[1]);
    };
    KaoqinPhotoPage.prototype.clickPicture = function (item) {
        this.deletePicture = item;
        this.navCtrl.push("DeleteKaoqinPhotoPage", { item: item });
    };
    KaoqinPhotoPage.prototype.release = function () {
        if (!this.is_attendance_off) {
            var timestamp = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
            ;
            var timestamp_now = timestamp / 1000 - 8 * 60 * 60;
            var date = new Date(timestamp_now * 1000);
            var timestamp_cal = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
            var timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60;
            var date_cal = new Date(timestamp_cal_now * 1000);
            var data_obj = {
                "employee_id": this.user.user_id,
                "check_in": this.formatTime_odoo(date),
                "day_start": this.formatTime_day_start(new Date()),
                "day_end": this.formatTime_day_end(new Date()),
                "company_name": this.location_str,
                "location_imgs": this.pushImgList,
                "device_version": this.device.uuid,
                "app_version": "0.5.9",
            };
            var that = this;
            this.kaoQinService.location_attendance(data_obj).then(function (res) {
                console.log(res);
                if (res.result.res_data && res.result.res_code == 1) {
                    that.frontPage.data.need_fresh = true;
                    that.navCtrl.popTo(that.frontPage);
                }
            });
        }
        else {
            var timestamp = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
            ;
            var timestamp_now = timestamp / 1000 - 8 * 60 * 60;
            var date = new Date(timestamp_now * 1000);
            var timestamp_cal = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
            var timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60;
            var date_cal = new Date(timestamp_cal_now * 1000);
            var data_obj = {
                "employee_id": this.user.user_id,
                "check_out": this.formatTime_odoo(date),
                "day_start": this.formatTime_day_start(new Date()),
                "day_end": this.formatTime_day_end(new Date()),
                "attendance_off": true,
                "company_name": this.location_str,
                "location_imgs": this.pushImgList,
                "device_version": this.device.uuid,
                "app_version": "0.5.9",
            };
            var that = this;
            this.kaoQinService.location_attendance(data_obj).then(function (res) {
                console.log(res);
                if (res.result.res_data && res.result.res_code == 1) {
                    that.frontPage.data.need_fresh = true;
                    that.navCtrl.popTo(that.frontPage);
                }
            });
        }
    };
    KaoqinPhotoPage.prototype.formatTime_day_start = function (date) {
        var timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
        var timestamp_now = timestamp / 1000 - 24 * 60 * 60;
        var date_now = new Date(timestamp_now * 1000);
        var year = date_now.getFullYear();
        var month = date_now.getMonth() + 1;
        var day = date_now.getDate();
        var hour = 16;
        var minute = 0;
        var second = 0;
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    };
    KaoqinPhotoPage.prototype.formatTime_day_end = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = 15;
        var minute = 59;
        var second = 59;
        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    };
    KaoqinPhotoPage.prototype.formatTime_odoo = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return [year, this.formatO(month), this.formatO(day)].join('-') + ' ' + [this.formatO(hour), this.formatO(minute), this.formatO(second)].join(':');
    };
    KaoqinPhotoPage.prototype.formatO = function (date) {
        return String(date).length == 2 ? date : '0' + date;
    };
    KaoqinPhotoPage.prototype.goBack = function () {
        this.navCtrl.popTo(this.frontPage);
    };
    return KaoqinPhotoPage;
}());
KaoqinPhotoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-kaoqin-photo',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/kaoqin-photo/kaoqin-photo.html"*/'<!--\n  Generated template for the KaoqinPhotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar hideBackButton="true" color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>考勤异常补签</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'release()\'>\n        提交\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content id="main_class" style="position:relative;">\n  <ion-item class="header_items">\n    <ion-grid style="background:white">\n      <ion-row>\n        <ion-col col-2>\n          <!--<div class="alert_icon_class"></div>-->\n          <img class="alert_icon_class" src="assets/img/daka_location.png" />\n        </ion-col>\n        <ion-col col-7 >\n          <p  class="name_message">\n            <span style="color:#409eff">{{location_str}}</span>\n          </p>\n        </ion-col>\n\n      </ion-row>\n    </ion-grid>\n  </ion-item>\n <ion-grid style="margin-left:6px;">\n    <ion-row>\n      <ion-col style="position:relative;height:106px;margin-top:5px"  col-4 *ngFor="let item of imgList">\n        <img tappable (click)="clickPicture(item)" src={{item}} style="position:absolute;clip:rect(0px,106px,106px,0px);"/>\n      </ion-col>\n      <ion-col col-4 tappable (click)="addImg()" style="margin-top:5px">\n        <img src="assets/img/add.png"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <!--<div id="chat_top_div" style="border-top:#f0f2f5 1px solid;position:absolute;bottom:0px;height:40px;width:100%;visibility:hidden;background:white"  >\n    <img style="width:30px;margin-top:5px;margin-left:10px" src="assets/img/work_bench/pic.png" tappable (click)="addImg()">\n    <img style="width:30px;margin-top:5px;float:left;margin-left:10px;" src="assets/img/work_bench/at_me.png" tappable (click)="addUser()">\n  </div>-->\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/kaoqin/kaoqin-photo/kaoqin-photo.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2__kaoqinService__["a" /* KaoQinService */], __WEBPACK_IMPORTED_MODULE_6__providers_NativeService__["a" /* NativeService */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_2__kaoqinService__["a" /* KaoQinService */], __WEBPACK_IMPORTED_MODULE_6__providers_NativeService__["a" /* NativeService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */]])
], KaoqinPhotoPage);

//# sourceMappingURL=kaoqin-photo.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/kaoqin/kaoqin-photo/kaoqin-photo.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KaoqinPhotoPageModule", function() { return KaoqinPhotoPageModule; });
/* harmony import */ var kaoqin_photo_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__ = __webpack_require__(244);
var kaoqin_photo_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var KaoqinPhotoPageModule = (function () {
    function KaoqinPhotoPageModule() {
    }
    return KaoqinPhotoPageModule;
}());
KaoqinPhotoPageModule = kaoqin_photo_module___decorate([
    kaoqin_photo_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            KaoqinPhotoPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(KaoqinPhotoPage), __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__["a" /* IonicImageViewerModule */]
        ],
    })
], KaoqinPhotoPageModule);

//# sourceMappingURL=kaoqin-photo.module.js.map

/***/ }),

/***/ 752:
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

/***/ 898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Device; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
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
 * @name Device
 * @description
 * Access information about the underlying device and platform.
 *
 * @usage
 * ```typescript
 * import { Device } from '@ionic-native/device';
 *
 * constructor(private device: Device) { }
 *
 * ...
 *
 * console.log('Device UUID is: ' + this.device.uuid);
 * ```
 */
var Device = (function (_super) {
    __extends(Device, _super);
    function Device() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Device.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Device.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "cordova", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "model", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "platform", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "uuid", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "version", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "manufacturer", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", Boolean)
    ], Device.prototype, "isVirtual", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* CordovaProperty */],
        __metadata("design:type", String)
    ], Device.prototype, "serial", void 0);
    Device = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'Device',
            plugin: 'cordova-plugin-device',
            pluginRef: 'device',
            repo: 'https://github.com/apache/cordova-plugin-device',
            platforms: ['Android', 'Browser', 'iOS', 'macOS', 'Windows']
        })
    ], Device);
    return Device;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 899:
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
//# sourceMappingURL=10.js.map