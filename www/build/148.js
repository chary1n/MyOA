webpackJsonp([148],{

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance-result-detail/performance-result-detail.ts
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
 * Generated class for the PerformanceResultDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerformanceResultDetailPage = (function () {
    function PerformanceResultDetailPage(navCtrl, navParams, statusBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.score = [1, 2, 3, 4, 5];
        this.item = this.navParams.get('item');
        this.typeList = this.item.typeList;
        this.rt_achievement = this.item.rt_achievement.replace(/<br>/g, "\n");
        this.rt_insufficient = this.item.rt_insufficient.replace(/<br>/g, "\n");
        this.rt_advice = this.item.rt_advice.replace(/<br>/g, "\n");
        this.rt_salary_expectation = this.item.rt_salary_expectation;
    }
    PerformanceResultDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerformanceResultDetailPage');
    };
    PerformanceResultDetailPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
    };
    PerformanceResultDetailPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    PerformanceResultDetailPage.prototype.changeStr = function (num) {
        var str;
        if (num == "1") {
            str = "考核中";
        }
        else if (num == "0") {
            str = "草稿";
        }
        else {
            str = "完成";
        }
        return str;
    };
    PerformanceResultDetailPage.prototype.changeCycle = function (num) {
        var str = '';
        if (num == '0') {
            str = "周";
        }
        else if (num == "1") {
            str = "月";
        }
        else if (num == '2') {
            str = "季";
        }
        else if (num == '3') {
            str = "半年";
        }
        else if (num == '4') {
            str = "年";
        }
        else {
            str = '';
        }
        return str;
    };
    return PerformanceResultDetailPage;
}());
PerformanceResultDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-performance-result-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance-result-detail/performance-result-detail.html"*/'<!--\n  Generated template for the PerformanceResultDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n          </ion-buttons>\n      <ion-title>考评结果</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-item-group no-lines>\n        <ion-item style="border-bottom:#f0f2f5 1px solid;">\n            <p text-wrap style="font-size:13px;color:#fba958;margin-right:25px;float: right;margin-top: 0px">{{changeStr(item.rt_state)}}</p>\n            <img src="assets/img/work_bench/reportForms.png" class="image1" style="float:left;">   \n            <p text-wrap style="font-size:80%;color:gray;line-height:27px;margin-left: 30px;">{{item.rt_appraisaled_employee_name}}</p>\n        </ion-item>\n      </ion-item-group>\n      <div>\n          <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px;height: 15px;line-height: 15px">单号</p>\n          <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{item.rt_name}}</p>\n          <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">类型</p>\n          <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{changeCycle(item.rt_appraisal_cycle)}}</p>\n          <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">部门</p>\n          <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{item.rt_department_id}}</p>\n          <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">岗位</p>\n          <p style="font-size:13px;color:#949ca1;margin-left: 120px">{{item.rt_job_id}}</p>\n      </div>\n      <div style="height: 10px;line-height: 10px;background:#f0f2f5;"></div>\n      <ion-grid style="padding: 0px">\n          <ion-row class="row_class" align-items-center>\n            <ion-col style="padding: 0px;border-bottom:#f0f2f5 1px solid;">\n            <div align="center">\n              <p>KPI考评</p> \n            </div>\n          </ion-col>        \n          </ion-row>\n      </ion-grid>\n      <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;">\n            <div *ngFor="let typeBean of typeList">\n                    <span style="margin-left: 5px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 3px"></span>\n                    <h4 style="font-size: 14px;margin-left: 20px">{{typeBean.type}}</h4>   \n                  <div *ngFor="let tagBean of typeBean.tagList" style="margin-top: 20px">\n                        <span style="margin-left: 10px;width:5px;height:5px;border-radius:5px;background-color:#b4b4af;display:inline-block;float: left;margin-top: 7px"></span>\n                        <p style="font-size: 14px;color: #949ca1;margin-left: 20px;word-wrap:break-word;">{{tagBean.tag_name}}</p>\n                        <div class="star-div" *ngFor="let subeType of tagBean.subType" style="padding: 10px;margin-top: 5px">\n                            <p style="font-size: 13px;color: #949ca1;margin-left: 10px;word-wrap: break-word;margin-top: -10px">{{subeType.subTp}}</p>\n                            <div *ngFor="let item of score" style="float: left;margin-top: -10px;margin-left: 10px" tappable>\n                                <ion-icon name="star" style="color: #fba958" *ngIf="item<=subeType.current_id;"></ion-icon>\n                                <ion-icon name="star-outline" style="color: #b4b4af" *ngIf="item>subeType.current_id;"></ion-icon>\n                            </div>\n                        </div>\n                        <div style="height: 1px;line-height: 1px;background-color: #f0f2f5;margin-left: 20px;margin-top: 15px"></div>\n                  </div>\n            </div>\n            <!-- <ion-item no-lines *ngFor="let typeBean of typeList">\n\n                    <div>\n                        <span style="margin-left: 5px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 5px"></span>\n                        <h4 style="font-size: 14px;margin-left: 20px">{{typeBean.type}}</h4>\n                      </div>\n                      <div *ngFor="let tagBean of typeBean.tagList" style="margin-top: 20px">\n                            <span style="margin-left: 10px;width:5px;height:5px;border-radius:5px;background-color:#b4b4af;display:inline-block;float: left;margin-top: 5px"></span>\n                            <p style="font-size: 10px;color: #949ca1;margin-left: 20px;word-wrap: break-word;">{{tagBean.tag_name}}</p>\n                            <div class="star-div" *ngFor="let subeType of tagBean.subType" style="padding: 10px;margin-top: 5px">\n                                <p style="font-size: 13px;color: #949ca1;padding-bottom: 5px;margin-left: 10px;word-wrap: break-word;">{{subeType.subTp}}</p>\n                                <div *ngFor="let item of score" style="float: left;margin-top: 0px;margin-left: 10px" tappable (click)="select(subeType,subeType.score,item)">\n                                    <ion-icon name="star" style="color: #fba958" *ngIf="item<=subeType.current_id;"></ion-icon>\n                                    <ion-icon name="star-outline" style="color: #b4b4af" *ngIf="item>subeType.current_id;"></ion-icon>\n                                </div>\n                            </div>\n                      </div>\n                </ion-item> -->\n      </ion-item-group>\n      <div style="height: 10px;line-height: 10px;background:#f0f2f5;"></div>\n      <ion-grid style="padding: 0px">\n          <ion-row class="row_class" align-items-center>\n            <ion-col style="padding: 0px;border-bottom:#f0f2f5 1px solid;">\n            <div align="center">\n              <p>主观描述</p> \n            </div>\n          </ion-col>        \n          </ion-row>\n      </ion-grid>\n      <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="item.is_self">\n          <div>\n              <span style="margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n              <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133">工作总结</h4>\n                <p style="color:#949ca1;font-size: 12px;margin-left: 25px">1.工作成绩：完成的重要事项，工作中的收获提升以及感悟</p>\n                <p style="color:#949ca1;font-size: 12px;margin-left: 25px">2.工作不足：遇到的内外部问题、失误，如何避免或者改进</p>\n                <p style="word-wrap:break-word;color:#3d3c3c;border-radius:8px;border-top:1px #d6d6db solid;\n                border-right: 1px #d6d6db solid;\n              border-bottom: 1px #d6d6db solid;border-left: 1px #d6d6db solid;margin: 15px;padding: 10px;width:90%">{{rt_achievement}}</p>\n            </div>\n      </ion-item-group>\n      <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="item.is_self">\n          <div>\n              <span style="margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n              <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133">工作计划</h4>\n                <p style="color:#949ca1;font-size: 12px;margin-left: 25px">1.近期计划；2.长期规划</p>\n                <p style="word-wrap:break-word;color:#3d3c3c;border-radius:8px;border-top:1px #d6d6db solid;\n                border-right: 1px #d6d6db solid;\n              border-bottom: 1px #d6d6db solid;border-left: 1px #d6d6db solid;margin: 15px;padding: 10px;width:90%">{{rt_insufficient}}</p>\n            </div>\n      </ion-item-group>\n      \n      <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="!item.is_self">\n          <div>\n              <span style="margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n              <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133">意见和建议</h4>\n          <p style="word-wrap:break-word;color:#3d3c3c;border-radius:8px;border-top:1px #d6d6db solid;\n                border-right: 1px #d6d6db solid;\n              border-bottom: 1px #d6d6db solid;border-left: 1px #d6d6db solid;margin: 15px;padding: 10px;width:90%">{{rt_advice}}</p>\n          </div>\n      </ion-item-group>\n      <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="item.is_self">\n          <div>\n              <span style="margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n              <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133">我能够匹配的年薪</h4>\n              <ion-input readonly="true" [(ngModel)]="rt_salary_expectation"  type="number" placeholder="不代表最终结果" style="margin-top: 5px;border-radius:8px;border-top:1px #d6d6db solid;\n              border-right: 1px #d6d6db solid;\n            border-bottom: 1px #d6d6db solid;border-left: 1px #d6d6db solid;margin: 15px;height: 35px;padding-left: 10px;width:90%;padding-top: -5px"></ion-input>\n          </div>\n      </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance-result-detail/performance-result-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
], PerformanceResultDetailPage);

//# sourceMappingURL=performance-result-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance-result-detail/performance-result-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformanceResultDetailPageModule", function() { return PerformanceResultDetailPageModule; });
/* harmony import */ var performance_result_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var performance_result_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var performance_result_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PerformanceResultDetailPageModule = (function () {
    function PerformanceResultDetailPageModule() {
    }
    return PerformanceResultDetailPageModule;
}());
PerformanceResultDetailPageModule = performance_result_detail_module___decorate([
    performance_result_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PerformanceResultDetailPage,
        ],
        imports: [
            performance_result_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PerformanceResultDetailPage),
        ],
    })
], PerformanceResultDetailPageModule);

//# sourceMappingURL=performance-result-detail.module.js.map

/***/ })

});
//# sourceMappingURL=148.js.map