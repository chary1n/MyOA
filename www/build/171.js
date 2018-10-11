webpackJsonp([171],{

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/apply/leave-detail/leave-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
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


/**
 * Generated class for the LeaveDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LeaveDetailPage = (function () {
    function LeaveDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.res_data = navParams.get('res_data');
        console.log(this.res_data);
    }
    LeaveDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveDetailPage');
    };
    LeaveDetailPage.prototype.callbackApply = function () {
    };
    return LeaveDetailPage;
}());
LeaveDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-leave-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/apply/leave-detail/leave-detail.html"*/'<!--\n  Generated template for the ApplyDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>休假单</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-item>\n    <ion-label class="left_label">休假类型</ion-label>\n    <ion-label item-end class="right_label">{{res_data.holiday_status_id}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>说明</ion-label>\n  </ion-item>\n  <ion-textarea placeholder=\'这里是休假说明\' [(ngModel)]="remark" class=\'area_class\'>\n    </ion-textarea>\n    <ion-item>\n      <ion-label class="left_label">开始时间</ion-label>\n      <ion-label item-end class="right_label">{{res_data.date_from}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="left_label">结束时间</ion-label>\n      <ion-label item-end class="right_label">{{res_data.date_to}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="total_amount">合计 : {{res_data.payment}}</ion-label>\n    </ion-item>\n\n    <div style="margin:10px;">审批记录</div>\n    <ion-list>\n      <ion-item *ngFor=\'let item of res_data.message_ids\' class="middle_item">\n        <ion-grid>\n          <ion-row class="rowStyle">\n            <ion-col col-2 class="textCenter">\n              <img src={{item.create_person_ava}}>\n            </ion-col>\n            <ion-col col-6>\n              <div>{{item.create_person}}</div>\n              <div *ngIf="item.old_state || item.new_state">{{item.old_state}}=>{{item.new_state}}</div>\n              <div text-wrap>{{item.description}}</div>\n            </ion-col>\n            <ion-col col-4>\n              <div>{{item.create_time}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n    </ion-list>\n</ion-content>\n\n<ion-footer>\n  <button *ngIf="res_data.state!=\'cancel\'" ion-button full (click)="callbackApply()">\n    撤回申请\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/apply/leave-detail/leave-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */]])
], LeaveDetailPage);

//# sourceMappingURL=leave-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/apply/leave-detail/leave-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaveDetailPageModule", function() { return LeaveDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var leave_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LeaveDetailPageModule = (function () {
    function LeaveDetailPageModule() {
    }
    return LeaveDetailPageModule;
}());
LeaveDetailPageModule = leave_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            LeaveDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(LeaveDetailPage),
        ],
    })
], LeaveDetailPageModule);

//# sourceMappingURL=leave-detail.module.js.map

/***/ })

});
//# sourceMappingURL=171.js.map