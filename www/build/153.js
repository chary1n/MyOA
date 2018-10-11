webpackJsonp([153],{

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/material-request/material-request-detail/material-request-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the MaterialRequestDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MaterialRequestDetailPage = (function () {
    function MaterialRequestDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = navParams.get('item');
        console.log(this.item);
    }
    MaterialRequestDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MaterialRequestDetailPage');
    };
    MaterialRequestDetailPage.prototype.changeType = function (state) {
        if (state.toLowerCase() == "pick_type") {
            return "产线领用";
        }
        else if (state.toLowerCase() == "proofing") {
            return "工程领用";
        }
        else {
            return state;
        }
    };
    MaterialRequestDetailPage.prototype.changeState = function (state) {
        if (state.toLowerCase() == "canceled") {
            return "已取消";
        }
        else if (state.toLowerCase() == "to_submit") {
            return "待提交";
        }
        else if (state.toLowerCase() == "submitted") {
            return "已提交";
        }
        else if (state.toLowerCase() == "to_approved") {
            return "待审批";
        }
        else if (state.toLowerCase() == "review_ing") {
            return "审核中";
        }
        else if (state.toLowerCase() == "approved_finish") {
            return "等待领料";
        }
        else if (state.toLowerCase() == "finish_pick") {
            return "完成";
        }
        else if (state.toLowerCase() == "refused") {
            return "已拒绝";
        }
    };
    MaterialRequestDetailPage.prototype.changeStateWithName = function (item) {
        if (item.who_review_now.name) {
            return this.changeState(item.picking_state) + '/' + item.who_review_now.name;
        }
        else {
            return this.changeState(item.picking_state);
        }
    };
    MaterialRequestDetailPage.prototype.changeName = function (i, name) {
        return i + "." + name;
    };
    MaterialRequestDetailPage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    MaterialRequestDetailPage.prototype.changeShenpiState = function (state) {
        if (state.state.toLowerCase() == "waiting_review") {
            return "等待审核";
        }
        else if (state.state.toLowerCase() == "review_success") {
            if (state.last_review_line_id) {
                return "审核通过";
            }
            else {
                return "提交审核";
            }
        }
        else if (state.state.toLowerCase() == "review_fail") {
            return "审核不通过";
        }
        else if (state.state.toLowerCase() == "review_canceled") {
            return "取消审核";
        }
    };
    return MaterialRequestDetailPage;
}());
MaterialRequestDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-material-request-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/material-request-detail/material-request-detail.html"*/'<!--\n  Generated template for the MaterialRequestDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{item.name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <ion-list>\n    <!--<ion-item>\n        <img item-start style="width:40px;float:left" src="{{item.user_ava}}">\n      <span style="margin-top:50px">{{item.my_create_uid.name}}</span>\n      <span style="float:right;color:#de5622;font-size:13px;">{{changeStateWithName(item)}}</span>\n    </ion-item>-->\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">交货日期</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.delivery_date}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">领料类型</ion-label>\n      <ion-label item-end style="font-size:75%;text-align:right;">{{changeType(item.picking_type)}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">领料原因</ion-label>\n      <ion-label item-end text-wrap style="font-size:75%;text-align:right;">{{item.picking_cause}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">备注</ion-label>\n      <ion-label text-wrap item-end style="font-size:75%;text-align:right;">{{item.remark}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-item-group >\n\n    <ion-item >\n      <ion-label style="font-size:80%;color:#00a7f1;float:left;font-weight:bold;margin-top:12px;">● 领料明细</ion-label>\n    </ion-item>\n    <ion-item  *ngFor=\'let items of item.line_ids;let i = index\'>    \n      <p text-wrap>{{changeName(i+1,items.product_id.name)}}</p>\n      <div style="margin-top:5px">\n        <span style="float:left;color:gray;font-size:80%;margin-top:-2px">需求：{{items.product_qty}}</span>\n        <span style="font-size:80%;color:gray;float:left;margin-left:20px;margin-top:-2px">库存：{{items.qty_available}}</span>\n        <span *ngIf="item.picking_state == \'approved_finish\' || item.picking_state == \'finish_pick\'" style="font-size:80%;color:gray;float:left;margin-left:20px;margin-top:-2px">领料：{{items.quantity_done}}</span>\n      </div>  \n    </ion-item>\n  </ion-item-group>\n\n  <div *ngIf="item.review_process_line_ids.length > 0" style="margin:10px;color:gray">审批记录</div>\n  <ion-list>\n    <ion-item no-lines *ngFor=\'let items of item.review_process_line_ids\' style="overflow:hidden" class="middle_item">\n          <img style="width:40px;vertical-align:top;float:left;margin-right:10px;border-radius:20px" src={{items.user_ava}}>\n\n          <div style="overflow:hidden">\n          <span style="margin-top:3px;color:black;font-size:80%;float:left">{{items.write_uid.name}}</span>\n          <span style="font-size:70%;margin-top:5px;margin-left:-5px;float:right">{{changeDate(items.write_date) | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\n          </div>\n          <p  style="font-size:80%;margin-top:2px;">{{changeShenpiState(items)}}</p>\n          <p *ngIf="items.remark" text-wrap style="font-size:80%;margin-left:50px">备注：{{items.remark}}</p> \n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/material-request-detail/material-request-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], MaterialRequestDetailPage);

//# sourceMappingURL=material-request-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/material-request-detail/material-request-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialRequestDetailPageModule", function() { return MaterialRequestDetailPageModule; });
/* harmony import */ var material_request_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var material_request_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var material_request_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MaterialRequestDetailPageModule = (function () {
    function MaterialRequestDetailPageModule() {
    }
    return MaterialRequestDetailPageModule;
}());
MaterialRequestDetailPageModule = material_request_detail_module___decorate([
    material_request_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MaterialRequestDetailPage,
        ],
        imports: [
            material_request_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MaterialRequestDetailPage),
        ],
    })
], MaterialRequestDetailPageModule);

//# sourceMappingURL=material-request-detail.module.js.map

/***/ })

});
//# sourceMappingURL=153.js.map