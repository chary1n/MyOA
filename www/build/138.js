webpackJsonp([138],{

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-detail/jiaohuo-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_ionic_page__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
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
 * Generated class for the JiaohuoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var JiaohuoDetailPage = (function () {
    function JiaohuoDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = this.navParams.get("item");
        this.wuliuLength = this.item.moving.length;
        if (!this.wuliuLength) {
            this.wuliuLength = 0;
        }
        console.log(this.item);
    }
    JiaohuoDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JiaohuoDetailPage');
    };
    JiaohuoDetailPage.prototype.changeState = function (state) {
        if (state == "draft") {
            return '草稿';
        }
        else if (state == "partially_available") {
            return '部分可用';
        }
        else if (state == "confirmed") {
            return '等待可用';
        }
        else if (state == "assigned") {
            return '可用';
        }
        else if (state == "done") {
            return '完成';
        }
        else if (state == "waiting") {
            return '等待其它作业';
        }
        else {
            return state;
        }
    };
    JiaohuoDetailPage.prototype.toWuliuDetail = function () {
        if (this.wuliuLength) {
            this.navCtrl.push('WuliuDetailPage', { 'item': this.item });
        }
    };
    return JiaohuoDetailPage;
}());
JiaohuoDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-jiaohuo-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-detail/jiaohuo-detail.html"*/'<!--\n  Generated template for the JiaohuoDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div style="margin-top:20px" (click)="toWuliuDetail()">\n    <div style="text-align:center;font-size:200%;color:#04aaf4"> {{wuliuLength}}</div>\n    <div style="text-align:center;margin-top:10px"> 物流</div>\n  </div>\n<div style="background-color: #f2f2f2;height:4px;margin-top:10px"></div>\n\n  <div style="margin-top:10px">\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.partner_id}} </div>\n      <div class="left_label,div_left" text-right> 合作伙伴 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.location_id}} </div>\n      <div class="left_label,div_left" text-right> 源位置区域 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.tracking_number}} </div>\n      <div class="left_label,div_left" text-right> 快递单号 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.min_date}} </div>\n      <div class="left_label,div_left" text-right> 安排的日期 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{item.origin}} </div>\n      <div class="left_label,div_left" text-right> 源单据 </div>\n    </div>\n    <div class="div_all">\n      <div text-wrap class="div_right"> {{changeState(item.state)}} </div>\n      <div class="left_label,div_left" text-right> 状态 </div>\n    </div>\n\n  </div>\n\n  <ion-label class="div_label"> 产品明细</ion-label>\n  <ion-list>\n    <ion-item *ngFor=\'let detail of item.product_id;let i  = index\' >\n      <h3 text-wrap>产品 {{i+1}} {{detail.name}}</h3>\n      <div style="display:flex ;justify-content:space-around">\n        <p style="flex :1 1 100%">待办:{{detail.ordered_qty}}</p>\n        <p style="flex :1 1 100%">完成:{{detail.qty_done}}</p>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-detail/jiaohuo-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular_navigation_nav_params__["a" /* NavParams */]])
], JiaohuoDetailPage);

//# sourceMappingURL=jiaohuo-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/salesOrder/jiaohuo-list/jiaohuo-detail/jiaohuo-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JiaohuoDetailPageModule", function() { return JiaohuoDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var jiaohuo_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var JiaohuoDetailPageModule = (function () {
    function JiaohuoDetailPageModule() {
    }
    return JiaohuoDetailPageModule;
}());
JiaohuoDetailPageModule = jiaohuo_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            JiaohuoDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(JiaohuoDetailPage),
        ],
    })
], JiaohuoDetailPageModule);

//# sourceMappingURL=jiaohuo-detail.module.js.map

/***/ })

});
//# sourceMappingURL=138.js.map