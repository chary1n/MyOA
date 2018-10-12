webpackJsonp([60],{

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__performance_service__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(35);
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
 * Generated class for the PerformancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerformancePage = (function () {
    function PerformancePage(navCtrl, navParams, statusBar, servicePerformance, storage, datePipe) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.servicePerformance = servicePerformance;
        this.storage = storage;
        this.datePipe = datePipe;
        this.isMine = true;
        this.isOther = false;
        this.lists = [];
        this.storage.get('user')
            .then(function (res) {
            _this.uid = res.result.res_data.user_id;
            var body = {
                uid: _this.uid,
                mine: true
            };
            _this.servicePerformance.get_performance_list(body).then(function (res) {
                if (res.result.res_code == 1 && res.result) {
                    console.log(res);
                    _this.lists = res.result.res_data.dataList;
                    _this.num1 = res.result.res_data.lenghthMine;
                    _this.num2 = res.result.res_data.lenghthOther;
                }
            });
        });
    }
    PerformancePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerformancePage');
    };
    PerformancePage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        if (this.isMine) {
            this.mine();
        }
        else if (this.isOther) {
            this.others();
        }
    };
    PerformancePage.prototype.different = function (item) {
        var str = '';
        if (this.isMine) {
            str = item.rt_department_id + '/' + item.rt_job_id;
        }
        else if (this.isOther) {
            str = item.rt_department_id + '/' + item.rt_job_id + '    ' + item.rt_appraisaled_employee_name;
        }
        return str;
    };
    PerformancePage.prototype.mine = function () {
        var _this = this;
        var body = {
            uid: this.uid,
            mine: true
        };
        this.servicePerformance.get_performance_list(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.lists = res.result.res_data.dataList;
                _this.num1 = res.result.res_data.lenghthMine;
                _this.num2 = res.result.res_data.lenghthOther;
            }
        });
        this.isMine = true;
        this.isOther = false;
    };
    PerformancePage.prototype.others = function () {
        var _this = this;
        var body = {
            uid: this.uid,
            other: true
        };
        this.servicePerformance.get_performance_list(body).then(function (res) {
            if (res.result.res_code == 1 && res.result) {
                console.log(res);
                _this.lists = res.result.res_data.dataList;
                _this.num1 = res.result.res_data.lenghthMine;
                _this.num2 = res.result.res_data.lenghthOther;
            }
        });
        this.isMine = false;
        this.isOther = true;
    };
    PerformancePage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    // itemSelected0(event){
    //   let type;
    //   let search_text;
    //   if (event.id == 1) {
    //     type = "name";
    //     search_text = event.name.replace("搜 标题:", "")
    //   }
    //   else if (event.id == 2) {
    //     type = "content";
    //     search_text = event.name.replace("搜 正文:", "")
    //   } 
    //   else if (event.id == 3) {
    //     type = "create_uid";
    //     search_text = event.name.replace("搜 发布人:", "")
    //   }
    //   console.log(search_text);
    // }
    PerformancePage.prototype.startPerformance = function (item) {
        if (this.isMine) {
            this.navCtrl.push('PerformanceStartPage', {
                'item': item.performanceDetail
            });
        }
        else if (this.isOther) {
            this.navCtrl.push('PerformanceStartPage', {
                'item': item
            });
        }
    };
    PerformancePage.prototype.lookPerformance = function (item) {
        this.navCtrl.push('PerformanceResultPage', {
            'id': item.id
        });
    };
    PerformancePage.prototype.changeStr = function (num) {
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
    // isShowStart(item){
    //   let start = false
    //   if(item.rt_state=='2' || item.rt_is_need_self && item.performanceDetail && item.performanceDetail.rt_state=='2'){
    //     start = false
    //   }else{
    //     start = true
    //   }
    //   return start
    // }
    PerformancePage.prototype.changeDate = function (date) {
        var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
        return new_date;
    };
    PerformancePage.prototype.isFinish = function (rt_state) {
        var finish = false;
        if (rt_state == 1) {
            finish = true;
        }
        else if (rt_state == 2) {
            finish = false;
        }
        return finish;
    };
    return PerformancePage;
}());
PerformancePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-performance',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance.html"*/'<!--\n  Generated template for the PerformancePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n        <button ion-button icon-only (click)="goBack()">\n          <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n        </button>\n      </ion-buttons>\n  <ion-title>绩效考核</ion-title>\n</ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #f0f2f5">\n    <ion-item align="center" no-lines style="height:40px;min-height:40px;background-color:white;">\n\n        <ion-grid>\n            <ion-row class="row_class" align-items-center>\n              <ion-col tappable (click) = "mine()">\n              <div align="center">\n                <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[isMine]">我的（{{num1}}）</p> \n              </div>\n            </ion-col>\n            <ion-col tappable (click) = "others()">\n               <div align="center" >\n                <p [ngClass]="{true:\'under_line_style\',false:\'normal_style\'}[isOther]">互评（{{num2}}）</p>\n              </div>\n            </ion-col>         \n            </ion-row>\n        </ion-grid>\n    </ion-item>\n    <!-- <ion-auto-complete style="width: 94vw; margin-left:3vw" (itemSelected)="itemSelected0($event)" [dataProvider]="perSearchService"></ion-auto-complete> -->\n    <ion-list>\n      <ion-item no-lines *ngFor="let item of lists" tappable style="height: 120px;border-bottom: #f0f2f5 10px solid" (click)="startPerformance(item)">\n          <p text-wrap style="font-size:13px;margin-right:25px;float: right;margin-top: 3px"\n          [ngClass]="{true:\'wait\',false:\'finish\'}[isFinish(item.rt_state)]">{{changeStr(item.rt_state)}}</p>\n          <h3 text-wrap style="margin-left: 10px;font-size:14px;color:#2e3133;margin-top: 5px">{{item.rt_name}}</h3>\n          <p style="font-size:13px;color:#949ca1;margin-left: 10px;margin-top: 10px;">{{different(item)}}</p>\n          <span style="margin-left: 10px;font-size:12px;color:#b8c4cc;margin-top: 10px;">创建人:{{item.create_uid}}</span>\n          <span style="font-size:12px;color:#b8c4cc;margin-left: 10px;margin-top: 10px;">{{changeDate(item.create_date) | date:"yyyy-MM-dd HH:mm"}}</span>\n          <!-- <ion-item no-lines style="max-height: 20px;height: 20px;line-height: 20px">\n              <p text-wrap style="font-size:13px;margin-right:25px;float: right;"\n          [ngClass]="{true:\'wait\',false:\'finish\'}[isFinish(item.rt_state)]">{{changeStr(item.rt_state)}}</p>\n          <h3 text-wrap style="font-size:14px;color:#2e3133;">{{item.rt_name}}</h3>\n          </ion-item>\n          <p style="font-size:13px;color:#949ca1;margin-left: 15px;margin-top: 0px;">{{different(item)}}</p>\n          <p style="margin-left: 15px;font-size:10px;color:#b8c4cc;float: left;margin-top: -3px;">创建人:{{item.create_uid}}</p>\n          <p style="font-size:10px;color:#b8c4cc;margin-left: 145px;">{{changeDate(item.create_date) | date:"yyyy-MM-dd HH:mm"}}</p> -->\n      </ion-item> \n    </ion-list>\n    <div align="center" *ngIf="!lists || !lists.length || lists.length == 0">\n      <img style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% - 60px)" src="assets/img/journal_sheet/null_state.png">\n      <p style="width:100px;position:absolute;left:calc(50% - 50px);top:calc(50% + 30px);color:#c2c8cc;font-size:15px">空空如也～</p>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__performance_service__["a" /* PersonService */], __WEBPACK_IMPORTED_MODULE_5__angular_common__["DatePipe"]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_0__performance_service__["a" /* PersonService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__angular_common__["DatePipe"]])
], PerformancePage);

//# sourceMappingURL=performance.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformancePageModule", function() { return PerformancePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var performance_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PerformancePageModule = (function () {
    function PerformancePageModule() {
    }
    return PerformancePageModule;
}());
PerformancePageModule = performance_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PerformancePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PerformancePage),
        ],
    })
], PerformancePageModule);

//# sourceMappingURL=performance.module.js.map

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
//# sourceMappingURL=60.js.map