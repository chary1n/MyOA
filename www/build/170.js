webpackJsonp([170],{

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-recoup-add-detail/attendance-recoup-add-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(238);
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
 * Generated class for the AttendanceRecoupAddDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AttendanceRecoupAddDetailPage = (function () {
    function AttendanceRecoupAddDetailPage(navCtrl, navParams, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.type_arr = ['补卡', '销卡'];
        this.type_index = 0;
        this.work_type_arr = ['上班', '下班'];
        this.work_type_index = 0;
        this.time_add = '';
        this.time_delete = '请选择 >';
        this.is_edit = false;
        this.attendanceRecoupCreatePage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController("AttendanceRecoupCreatePage", navCtrl);
        this.is_edit = this.navParams.get('is_edit');
        if (this.is_edit) {
            var before_data = this.navParams.get('item_data');
            this.remark = before_data.remark;
            this.type_index = before_data.type;
            this.work_type_index = before_data.work_type;
            if (this.type_index == 0) {
                this.time_add = before_data.time;
            }
            else {
                this.time_delete = before_data.time;
            }
        }
    }
    AttendanceRecoupAddDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AttendanceRecoupAddDetailPage');
    };
    AttendanceRecoupAddDetailPage.prototype.ionViewWillEnter = function () {
        var time = this.navParams.get("time");
        var work_type = this.navParams.get('work_type');
        this.attendance_id = this.navParams.get('attendance_id');
        if (time && work_type) {
            this.time_delete = time;
            if (work_type == '上班') {
                this.work_type_index = 0;
            }
            else {
                this.work_type_index = 1;
            }
        }
    };
    AttendanceRecoupAddDetailPage.prototype.confirm = function () {
        var mString = "";
        var time;
        var type = this.type_index;
        var work_type = this.work_type_index;
        if (this.type_index == 0) {
            if (this.time_add == '') {
                mString = "请选择补卡时间";
            }
            else {
                time = this.time_add;
            }
        }
        else {
            time = this.time_delete;
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            if (this.is_edit) {
                this.attendanceRecoupCreatePage.data.data = {
                    type: type,
                    work_type: work_type,
                    time: time,
                    remark: this.remark ? this.remark : '',
                    attendance_id: this.attendance_id ? this.attendance_id : false,
                };
                this.attendanceRecoupCreatePage.data.item_index = this.navParams.get('item_index');
            }
            else {
                this.attendanceRecoupCreatePage.data.data = {
                    type: type,
                    work_type: work_type,
                    time: time,
                    remark: this.remark ? this.remark : '',
                    attendance_id: this.attendance_id ? this.attendance_id : false,
                };
                this.attendanceRecoupCreatePage.data.item_index = false;
            }
            this.navCtrl.pop();
        }
    };
    AttendanceRecoupAddDetailPage.prototype.cancel = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '提示',
            subTitle: '已输入内容，是否确认返回？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        }).present();
    };
    AttendanceRecoupAddDetailPage.prototype.click_time = function () {
        this.navCtrl.push('AttendanceAllDataPage');
    };
    return AttendanceRecoupAddDetailPage;
}());
AttendanceRecoupAddDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-attendance-recoup-add-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendance-recoup-add-detail/attendance-recoup-add-detail.html"*/'<!--\n  Generated template for the AttendanceRecoupAddDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar hideBackButton="true" color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button (click)="cancel()">\n        取消\n      </button>\n    </ion-buttons>\n    <ion-title>补卡销卡明细</ion-title>\n    <ion-buttons right>\n      <button ion-button (click)="confirm()">\n        确定\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color:#f0f2f5">\n  <ion-item class="item_class">\n    <ion-label class="left_label">补卡销卡类型</ion-label>\n    <ion-select [(ngModel)]="type_index" cancelText="取消" okText="确定" class="normal_select">\n      <ion-option *ngFor="let item of type_arr;let i = index;" value={{i}}>{{item}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item class="item_class">\n    <ion-label class="left_label">上下班类型</ion-label>\n    <ion-select [(ngModel)]="work_type_index" cancelText="取消" okText="确定" class="normal_select">\n      <ion-option *ngFor="let item of work_type_arr;let i = index;" value={{i}}>{{item}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item *ngIf="type_index == 0" no-lines class="item_class">\n    <ion-label class="left_label">时间</ion-label>\n    <ion-datetime placeholder=\'请选择 >\' style="font-size:80%" item-end displayFormat="YYYY-MM-DD HH:mm" pickerFormat="YYYY MM DD HH mm" [(ngModel)]="time_add" cancelText="取消" doneText="确定"></ion-datetime>\n  </ion-item>\n  <ion-item *ngIf="type_index == 1" no-lines class="item_class">\n    <ion-label class="left_label">时间</ion-label>\n    <ion-label placeholder=\'请选择 >\' style="font-size:80%" item-end class="right_label" tappable (click)="click_time()">{{time_delete}}</ion-label>\n  </ion-item>\n  <div style="background-color:white;margin-top:10px;">\n    <div class="textarea_title">\n      备注\n    </div>\n    <ion-textarea class="textarea_class" placeholder="请输入原因" [(ngModel)]="remark"></ion-textarea>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/attendace-recoup/attendance-recoup-add-detail/attendance-recoup-add-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */]])
], AttendanceRecoupAddDetailPage);

//# sourceMappingURL=attendance-recoup-add-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/attendace-recoup/attendance-recoup-add-detail/attendance-recoup-add-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceRecoupAddDetailPageModule", function() { return AttendanceRecoupAddDetailPageModule; });
/* harmony import */ var attendance_recoup_add_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var attendance_recoup_add_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var attendance_recoup_add_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AttendanceRecoupAddDetailPageModule = (function () {
    function AttendanceRecoupAddDetailPageModule() {
    }
    return AttendanceRecoupAddDetailPageModule;
}());
AttendanceRecoupAddDetailPageModule = attendance_recoup_add_detail_module___decorate([
    attendance_recoup_add_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AttendanceRecoupAddDetailPage,
        ],
        imports: [
            attendance_recoup_add_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AttendanceRecoupAddDetailPage),
        ],
    })
], AttendanceRecoupAddDetailPageModule);

//# sourceMappingURL=attendance-recoup-add-detail.module.js.map

/***/ })

});
//# sourceMappingURL=170.js.map