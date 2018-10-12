webpackJsonp([62],{

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance-result/performance-result.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__performance_service__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the PerformanceResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerformanceResultPage = (function () {
    function PerformanceResultPage(navCtrl, navParams, statusBar, servicePerformance, toastCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.servicePerformance = servicePerformance;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.progress = 30;
        this.rt_is_need_self = false;
        this.id = this.navParams.get('id');
        console.log('this.id' + this.id);
        var body = {
            'id': this.id
        };
        this.servicePerformance.get_performance_result(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                _this.bigBean = res.result.res_data;
                _this.state = _this.bigBean.rt_state;
                _this.rt_appraisaled_employee_name = _this.bigBean.rt_appraisaled_employee_name;
                _this.rt_name = _this.bigBean.rt_name;
                _this.rt_appraisal_detail_lines = _this.bigBean.rt_appraisal_detail_lines;
                _this.rt_appraisal_cycle = _this.bigBean.rt_appraisal_cycle;
                _this.rt_department_id = _this.bigBean.rt_department_id;
                _this.rt_job_id = _this.bigBean.rt_job_id;
                _this.result_score = _this.bigBean.result_score;
                _this.listItem = res.result.res_data.performanceDetail;
                _this.rt_is_need_self = res.result.res_data.rt_is_need_self;
                _this.rt_manager_final_score = res.result.res_data.rt_manager_final_score;
                _this.rt_manager_advice = res.result.res_data.rt_manager_advice;
                _this.rt_self_proportion = res.result.res_data.rt_self_proportion;
                _this.rt_manager_proportion = res.result.res_data.rt_manager_proportion;
                _this.rt_other_proportion = res.result.res_data.rt_other_proportion;
                _this.salary_exception = res.result.res_data.salary_exception;
                _this.other_num = res.result.res_data.other_num;
                _this.show_null = res.result.res_data.show_null;
                if (_this.other_num == 0 || _this.rt_other_proportion == '') {
                    _this.resultStr = '满分5分,计算公式:员工自评*' + _this.rt_self_proportion + '%+主管评分*' + _this.rt_manager_proportion + '%';
                }
                else {
                    _this.resultStr = '满分5分,计算公式:员工自评*' + _this.rt_self_proportion + '%+主管评分*' + _this.rt_manager_proportion + '%+互评均值' + _this.other_num + '*' + _this.rt_other_proportion + '%';
                }
            }
        });
    }
    PerformanceResultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerformanceResultPage');
    };
    PerformanceResultPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.storage.get('user')
            .then(function (res) {
            _this.user_heard = res.result.res_data.user_ava;
        });
    };
    PerformanceResultPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    PerformanceResultPage.prototype.changeStr = function (num) {
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
    PerformanceResultPage.prototype.changeCycle = function (num) {
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
    PerformanceResultPage.prototype.isShowBack = function (resultScore) {
        var show = false;
        if (resultScore == "暂无") {
            show = false;
        }
        else {
            show = true;
        }
        return show;
    };
    PerformanceResultPage.prototype.whoCare = function (str) {
        var s;
        if (str == "self") {
            s = "自评";
        }
        else if (str == "other") {
            s = "考评人";
        }
        else if (str == "manager") {
            s = "主管评分";
        }
        return s;
    };
    PerformanceResultPage.prototype.lookPerformance = function (item) {
        if (item.rt_state == "1") {
            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom('暂未考评', this.toastCtrl);
        }
        else if (item.rt_state == "0") {
            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom('暂未考评', this.toastCtrl);
        }
        else if (item.rt_state == "2") {
            this.navCtrl.push('PerformanceResultDetailPage', {
                'item': item
            });
        }
    };
    PerformanceResultPage.prototype.isFinish = function (rt_state) {
        var finish = false;
        if (rt_state == 1) {
            finish = true;
        }
        else if (rt_state == 2) {
            finish = false;
        }
        return finish;
    };
    PerformanceResultPage.prototype.isHave = function (rt_manager_final_score) {
        var have = false;
        if (rt_manager_final_score == '暂无') {
            have = false;
        }
        else {
            have = true;
        }
        return have;
    };
    return PerformanceResultPage;
}());
PerformanceResultPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-performance-result',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance-result/performance-result.html"*/'<!--\n  Generated template for the PerformanceResultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n          </ion-buttons>\n      <ion-title>报告</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-item-group no-lines>\n        <ion-item style="border-bottom:#f0f2f5 1px solid;">\n            <p text-wrap style="font-size:13px;color:#1eabfe;margin-right:25px;float: right;margin-top: 0px"\n            [ngClass]="{true:\'wait\',false:\'finish\'}[isFinish(state)]">{{changeStr(state)}}</p>\n            <img src={{user_heard}} class="image1" style="float:left;">   \n            <p text-wrap style="font-size:80%;color:gray;line-height:27px;margin-left: 30px;">{{rt_appraisaled_employee_name}}</p>\n        </ion-item>\n      </ion-item-group>\n      <div style="border-bottom:#f0f2f5 1px solid;">\n            <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px;height: 15px;line-height: 15px">单号</p>\n            <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{rt_name}}</p>\n            <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">类型</p>\n            <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{changeCycle(rt_appraisal_cycle)}}</p>\n            <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">部门</p>\n            <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{rt_department_id}}</p>\n            <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">岗位</p>\n            <p style="font-size:13px;color:#949ca1;margin-left: 120px">{{rt_job_id}}</p>\n      </div>\n      <ion-item-group no-lines>\n          <ion-item no-lines>\n              <p text-wrap style="font-size:18px;margin-right:25px;float: right;margin-top: 0px"\n              [ngClass]="{true:\'redcol\',false:\'braycol\'}[isHave(rt_manager_final_score)]">{{rt_manager_final_score}}</p>\n              <p text-wrap style="font-size:14px;line-height:27px;margin-left: 5px;">  \n                最终结果\n                <span text-wrap style="font-size:12px;line-height:27px;color: #babbbd">(满分5分）</span>\n            </p>\n          </ion-item>\n          <ion-item no-lines>\n              <p text-wrap style="font-size:14px;margin-left:5px;margin-top: 0px">主管评价</p>\n              <p text-wrap style="font-size:12px;color:gray;line-height:27px;margin-left: 5px;">{{rt_manager_advice}}</p>\n          </ion-item>\n          <ion-item no-lines class="item-text-wrap">\n              <p text-wrap style="font-size:18px;margin-right:25px;float: right;margin-top: 0px">{{result_score}}</p>\n              <p text-wrap style="font-size:14px;line-height:27px;margin-left: 5px;">考评结果\n                    <span text-wrap style="font-size:12px;line-height:27px;color: #babbbd">(满分5分）</span>\n              </p>\n              <p style="font-size:10px;color:gray;margin-left: 5px;word-wrap:break-word;">{{resultStr}}</p>\n          </ion-item>\n          <ion-item-group style="padding-bottom: 80px">\n                <p text-wrap style="font-size:14px;margin-left:20px;margin-top: 0px;color: gray">考评人</p>\n                <div *ngFor="let item of rt_appraisal_detail_lines" style="float: left;margin-left: 5px" tappable (click) = "lookPerformance(item)">\n                    <span [ngClass]="{true:\'backcolor1\',false:\'backcolor_normal\'}[isShowBack(item.resultScore)]"\n                    style="margin-left: 20px;width:38px;height:38px;border-radius:38px;display:inline-block;text-align:center;padding-top: 10px;">{{item.resultScore}}</span>\n                    <p style="font-size: 12px;color: #949ca1;margin-left: 20px">{{whoCare(item.rt_appraisal_type)}}</p>\n                </div>\n                <!-- <div style="height: 10px;line-height: 10px;background:#f0f2f5;"></div> -->\n          </ion-item-group>\n      </ion-item-group>\n  <ion-grid style="padding: 0px">\n      <ion-row class="row_class" align-items-center>\n        <ion-col style="padding: 0px;border-bottom:#f0f2f5 1px solid;border-top: #f0f2f5 10px solid">\n        <div align="center">\n          <p>KPI考评</p>\n          <p *ngIf="show_null" style="color: gray;font-size: 12px">\n              暂无\n          </p> \n        </div>\n      </ion-col>        \n      </ion-row>\n  </ion-grid>\n  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;">\n        <div *ngFor="let typeBean of listItem">\n          <!-- <p style="font-size: 14px;float: right;margin-top: 0px;margin-right: 25px;height:15px">{{typeBean.score}}</p> -->\n          <span style="margin-left: 10px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 3px"></span>\n          <h4 style="font-size: 14px;margin-left: 25px">{{typeBean.type}}评价</h4>\n          <div *ngFor="let tagBean of typeBean.tagList" style="margin-top: 15px">\n                <span style="margin-left: 15px;width:5px;height:5px;border-radius:5px;background-color:#b4b4af;display:inline-block;float: left;margin-top: 5px"></span>\n                <p style="font-size: 12px;color: #949ca1;margin-left: 25px;word-wrap: break-word;" >{{tagBean.biaoqian}}</p>\n                <div *ngFor="let item of tagBean.subList">\n                        <p style="font-size: 13px;color: #949ca1;margin-left: 25px;word-wrap: break-word;">{{item.sub_type}}</p>\n                        <div class="progress-outer" style="margin-top: 0px;margin-left: 25px">\n                            <div class="progress-inner" [style.width]="item.sub_score + \'%\'">\n                            </div>\n                        </div>\n                </div>  \n          </div>\n        </div>\n  </ion-item-group>\n  <div style="height: 10px;line-height: 10px;background:#f0f2f5;"></div>\n  <ion-grid style="padding: 0px">\n      <ion-row class="row_class" align-items-center>\n        <ion-col style="padding: 0px;border-bottom:#f0f2f5 1px solid;">\n        <div align="center">\n          <p>主观描述</p> \n        </div>\n      </ion-col>        \n      </ion-row>\n  </ion-grid>\n  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;">\n      <div>\n          <span style="margin-left: 10px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n          <h4 style="font-size: 14px;margin-left: 25px;color: #2e3133">工作总结</h4>\n          <p style="color:#949ca1;font-size: 12px;margin-left: 25px">1.工作成绩：完成的重要事项，工作中的收获提升以及感悟</p>\n          <p style="color:#949ca1;font-size: 12px;margin-left: 25px">2.工作不足：遇到的内外部问题、失误，如何避免或者改进</p>\n          <p style="color:#949ca1;font-size: 14px;margin-left: 25px">详情见考评人</p>\n        </div>\n  </ion-item-group>\n  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;">\n      <div>\n          <span style="margin-left: 10px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n          <h4 style="font-size: 14px;margin-left: 25px;color: #2e3133">工作计划</h4>\n          <p style="color:#949ca1;font-size: 12px;margin-left: 25px">1.近期计划；2.长期规划</p>\n          <p style="color:#949ca1;font-size: 14px;margin-left: 25px">详情见考评人</p>\n        </div>\n  </ion-item-group>\n  \n  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;">\n      <div>\n          <span style="margin-left: 10px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n          <h4 style="font-size: 14px;margin-left: 25px;color: #2e3133">意见和建议</h4>\n          <p style="color:#949ca1;font-size: 14px;margin-left: 25px">详情见考评人</p>\n      </div>\n  </ion-item-group>\n  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="rt_is_need_self">\n      <div>\n          <span style="margin-left: 10px;width:8 px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n          <h4 style="font-size: 14px;margin-left: 25px;color: #2e3133">我能够匹配的年薪</h4>\n          <p style="font-size: 12px;color: #949ca1;margin-left: 25px">{{salary_exception}}</p>\n      </div>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance-result/performance-result.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__performance_service__["a" /* PersonService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_0__performance_service__["a" /* PersonService */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
], PerformanceResultPage);

//# sourceMappingURL=performance-result.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance-result/performance-result.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformanceResultPageModule", function() { return PerformanceResultPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var performance_result_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PerformanceResultPageModule = (function () {
    function PerformanceResultPageModule() {
    }
    return PerformanceResultPageModule;
}());
PerformanceResultPageModule = performance_result_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PerformanceResultPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PerformanceResultPage),
        ],
    })
], PerformanceResultPageModule);

//# sourceMappingURL=performance-result.module.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonService; });
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


var PersonService = (function () {
    function PersonService(httpservice) {
        this.httpservice = httpservice;
    }
    //获取绩效考核列表
    PersonService.prototype.get_performance_list = function (body) {
        return this.httpservice.postBody("get_performance_list", body);
    };
    //保存或者提交
    PersonService.prototype.get_performance_state = function (body) {
        return this.httpservice.postBody("get_performance_state", body);
    };
    //获取结果
    PersonService.prototype.get_performance_result = function (body) {
        return this.httpservice.postBody("get_performance_result", body);
    };
    //更改是第一次阅读
    PersonService.prototype.change_first = function (body) {
        return this.httpservice.postBody("change_first", body);
    };
    return PersonService;
}());
PersonService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], PersonService);

//# sourceMappingURL=performance-service.js.map

/***/ })

});
//# sourceMappingURL=62.js.map