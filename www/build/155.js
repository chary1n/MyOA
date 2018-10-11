webpackJsonp([155],{

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/visit-detail/visit-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the VisitDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisitDetailPage = (function () {
    function VisitDetailPage(navCtrl, navParams, statusBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.item = this.navParams.get('item');
        this.imgList = this.item.visit_image;
        this.user_img = this.item.user_image;
        console.log(this.item);
    }
    VisitDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitDetailPage');
    };
    VisitDetailPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    VisitDetailPage.prototype.clickPicture = function (item) {
        this.navCtrl.push("NewDeletePage", { item: item });
    };
    //更改时间
    VisitDetailPage.prototype.getTime = function (startT, endT) {
        return startT + " ~ " + endT.split(" ")[1];
    };
    return VisitDetailPage;
}());
VisitDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-visit-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/visit-detail/visit-detail.html"*/'<!--\n  Generated template for the VisitDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>详情</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>  \n    <ion-item no-lines>\n        <img src="{{item.user_image}}" item-start style="height:35px;width:35px" class="image1">\n        <ion-note style="font-size:14px;color:#2e3133" item-start>{{item.name}}</ion-note>\n        <ion-note style="font-size:14px;color:#2e3133" item-end>{{item.team.team_name}}</ion-note>\n    </ion-item>\n  <div style="background:#f0f2f5;padding:1px">\n      <p style="font-size:12px;color:#8a9399;margin-left:15px;line-height:5px">客户资料</p>\n  </div>\n  <ion-list no-lines>\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">客户名称</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px">{{item.partner_name}}</ion-note>\n      </ion-item>\n      <ion-item class="itemClass"> \n          <ion-label item-start style="color:#2e3133;font-size:14px">客户地址</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px">{{item.partner_address}}</ion-note>\n      </ion-item>\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">客户渠道</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px">{{item.partner_channel}}</ion-note>\n      </ion-item>\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">拜访日期</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px;text-align:right">{{getTime(item.visit_date_begin,item.visit_date_end)}}</ion-note>\n      </ion-item>\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">拜访对象</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px" >{{item.visit_name}}</ion-note>\n      </ion-item>\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">客户电话</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px" >{{item.partner_phone}}</ion-note>\n      </ion-item>\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">QQ/Email</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px" >{{item.partner_contact_way}}</ion-note>\n      </ion-item>\n      <!-- <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">客户状态</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px" >{{item.partner_state}}</ion-note>\n      </ion-item> -->\n      <ion-item class="itemClass">\n          <ion-label item-start style="color:#2e3133;font-size:14px">拜访目的</ion-label>\n          <ion-note item-end style="color:#8a9299;font-size:12px" >{{item.visit_target}}</ion-note>\n      </ion-item>\n  </ion-list>\n  <ion-grid style="margin-top:-25px">\n      <ion-row>\n          <ion-col col-4  style="position:relative;height:106px;" *ngFor="let item of imgList" on-hold="onHold()" (click)="clickPicture(item)">\n            <img src={{item}} style="position:absolute;\n          clip:rect(0px,106px,106px,0px);"/>\n          </ion-col>\n      </ion-row>\n  </ion-grid>\n  <div style="background:#f0f2f5;padding:1px;margin-top:15px">\n      <p style="font-size:12px;color:#8a9399;margin-left:15px;line-height:5px">沟通内容</p>\n  </div>\n  <div style="background:white;padding:1px">\n      <p style="font-size:12px;color:#8a9399;margin-left:15px;">{{item.content_description}}</p>\n  </div>\n  <div style="background:#f0f2f5;padding:1px">\n      <p style="font-size:12px;color:#8a9399;margin-left:15px;line-height:5px">总结</p>\n  </div>\n  <div style="background:white;padding:1px">\n      <p style="font-size:12px;color:#8a9399;margin-left:15px;">{{item.summary}}</p>\n  </div>\n  <div style="background:#f0f2f5;height:10px">\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/visit-detail/visit-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
], VisitDetailPage);

//# sourceMappingURL=visit-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/visit-detail/visit-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitDetailPageModule", function() { return VisitDetailPageModule; });
/* harmony import */ var visit_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var visit_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var visit_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VisitDetailPageModule = (function () {
    function VisitDetailPageModule() {
    }
    return VisitDetailPageModule;
}());
VisitDetailPageModule = visit_detail_module___decorate([
    visit_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            VisitDetailPage,
        ],
        imports: [
            visit_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(VisitDetailPage),
        ],
    })
], VisitDetailPageModule);

//# sourceMappingURL=visit-detail.module.js.map

/***/ })

});
//# sourceMappingURL=155.js.map