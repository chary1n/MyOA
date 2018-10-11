webpackJsonp([61],{

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance-start/performance-start.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__performance_service__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(25);
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
 * Generated class for the PerformanceStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerformanceStartPage = (function () {
    function PerformanceStartPage(navCtrl, navParams, statusBar, servicePerformance, storage, toastCtrl, sanitizer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.servicePerformance = servicePerformance;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.sanitizer = sanitizer;
        this.typeList = [];
        this.score = [1, 2, 3, 4, 5];
        this.rt_achievement = '请输入';
        this.rt_advice = '请输入';
        this.rt_insufficient = '请输入';
        this.isShowFooter = true;
        this.need_fresh = false;
        this.postedit = 0;
        this.storage.get('user')
            .then(function (res) {
            _this.uid = res.result.res_data.user_id;
        });
        this.item = this.navParams.get('item');
        console.log("item = " + this.item);
        this.typeList = this.item.typeList;
        this.rt_achievement = this.item.rt_achievement.replace(/\n/g, "<br>");
        this.rt_advice = this.item.rt_advice.replace(/\n/g, "<br>");
        this.rt_insufficient = this.item.rt_insufficient.replace(/\n/g, "<br>");
        this.rt_salary_expectation = this.item.rt_salary_expectation;
        this.description = this.item.description.replace(/\n/g, "<br>");
        this.isFirst = this.item.isFirst;
        this.user_heard = this.item.user_img;
        if (!this.rt_achievement) {
            this.rt_achievement = '请输入';
        }
        if (!this.rt_insufficient) {
            this.rt_insufficient = '请输入';
        }
        if (!this.rt_advice) {
            this.rt_advice = '请输入';
        }
    }
    PerformanceStartPage.prototype.assembleHTML = function (str) {
        return this.sanitizer.bypassSecurityTrustHtml(str);
    };
    PerformanceStartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerformanceStartPage');
    };
    PerformanceStartPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.need_fresh = this.navParams.get('need_fresh');
        if (this.need_fresh == true) {
            this.postedit = this.navParams.get('postedit');
            if (this.postedit == 1) {
                this.rt_achievement = this.navParams.get('rt_achievement');
            }
            else if (this.postedit == 2) {
                this.rt_insufficient = this.navParams.get('rt_insufficient');
            }
            else if (this.postedit == 3) {
                this.rt_advice = this.navParams.get('rt_advice');
            }
            if (!this.rt_achievement) {
                this.rt_achievement = '请输入';
            }
            if (!this.rt_insufficient) {
                this.rt_insufficient = '请输入';
            }
            if (!this.rt_advice) {
                this.rt_advice = '请输入';
            }
            this.need_fresh = false;
            var list = [];
            var endList = [];
            var midList = [];
            var length_1 = this.typeList.length;
            for (var i = 0; i < length_1; i++) {
                midList = [];
                for (var j = 0; j < this.typeList[i].tagList.length; j++) {
                    list = [];
                    for (var k = 0; k < this.typeList[i].tagList[j].subType.length; k++) {
                        list[k] = {
                            'type_id': this.typeList[i].id,
                            'id': this.typeList[i].tagList[j].subType[k].id,
                            'priority': this.typeList[i].tagList[j].subType[k].current_id
                        };
                    }
                    midList = midList.concat(list);
                }
                endList = endList.concat(midList);
            }
            var body = {
                'save': true,
                'rt_achievement': this.changeStrEdit(this.rt_achievement),
                'rt_advice': this.changeStrEdit(this.rt_advice),
                'rt_insufficient': this.changeStrEdit(this.rt_insufficient),
                'rt_salary_expectation': this.rt_salary_expectation,
                'id': this.item.id,
                'subType': endList,
            };
            this.servicePerformance.get_performance_state(body).then(function (res) {
                if (res.result.res_code == 1) {
                    console.log(res);
                }
            });
        }
    };
    PerformanceStartPage.prototype.goBack = function () {
        this.statusBar.backgroundColorByHexString("#f8f8f8");
        this.statusBar.styleDefault();
        this.navCtrl.pop();
    };
    PerformanceStartPage.prototype.select = function (subeType, item) {
        subeType.current_id = item;
    };
    PerformanceStartPage.prototype.save = function () {
        var _this = this;
        var list = [];
        var endList = [];
        var midList = [];
        var length = this.typeList.length;
        for (var i = 0; i < length; i++) {
            midList = [];
            for (var j = 0; j < this.typeList[i].tagList.length; j++) {
                list = [];
                for (var k = 0; k < this.typeList[i].tagList[j].subType.length; k++) {
                    list[k] = {
                        'type_id': this.typeList[i].id,
                        'id': this.typeList[i].tagList[j].subType[k].id,
                        'priority': this.typeList[i].tagList[j].subType[k].current_id
                    };
                }
                midList = midList.concat(list);
            }
            endList = endList.concat(midList);
        }
        var body = {
            'save': true,
            'rt_achievement': this.changeStrEdit(this.rt_achievement),
            'rt_advice': this.changeStrEdit(this.rt_advice),
            'rt_insufficient': this.changeStrEdit(this.rt_insufficient),
            'rt_salary_expectation': this.rt_salary_expectation,
            'id': this.item.id,
            'subType': endList,
        };
        this.servicePerformance.get_performance_state(body).then(function (res) {
            if (res.result.res_code == 1) {
                console.log(res);
                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("保存成功", _this.toastCtrl);
                _this.navCtrl.pop();
            }
        });
    };
    PerformanceStartPage.prototype.commit = function () {
        var _this = this;
        var myString = "";
        if (this.item.is_self) {
            if (!this.rt_achievement || this.rt_achievement == '请输入') {
                myString = "   请输入工作总结";
            }
            if (!this.rt_insufficient || this.rt_insufficient == '请输入') {
                myString = "   请输入工作计划";
            }
            if (!this.rt_salary_expectation || this.rt_salary_expectation == 0) {
                myString = "   请输入匹配年薪";
            }
        }
        else {
            if (!this.rt_advice || this.rt_advice == '请输入') {
                myString = "   请输入意见与建议";
            }
        }
        var length = this.typeList.length;
        for (var a = 0; a < length; a++) {
            for (var b = 0; b < this.typeList[a].tagList.length; b++) {
                for (var c = 0; c < this.typeList[a].tagList[b].subType.length; c++) {
                    if (this.typeList[a].tagList[b].subType[c].current_id == 0) {
                        myString = "   还有未打分项";
                        break;
                    }
                }
            }
        }
        if (myString != "") {
            __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom(myString, this.toastCtrl);
        }
        else {
            var list = [];
            var endList = [];
            var midList = [];
            var length_2 = this.typeList.length;
            for (var i = 0; i < length_2; i++) {
                midList = [];
                for (var j = 0; j < this.typeList[i].tagList.length; j++) {
                    list = [];
                    for (var k = 0; k < this.typeList[i].tagList[j].subType.length; k++) {
                        list[k] = {
                            'type_id': this.typeList[i].id,
                            'id': this.typeList[i].tagList[j].subType[k].id,
                            'priority': this.typeList[i].tagList[j].subType[k].current_id
                        };
                    }
                    midList = midList.concat(list);
                }
                endList = endList.concat(midList);
            }
            var body = {
                'commit': true,
                'rt_achievement': this.changeStrEdit(this.rt_achievement),
                'rt_advice': this.changeStrEdit(this.rt_advice),
                'rt_insufficient': this.changeStrEdit(this.rt_insufficient),
                'rt_salary_expectation': this.rt_salary_expectation,
                'id': this.item.id,
                'subType': endList,
                'uid': this.uid
            };
            this.servicePerformance.get_performance_state(body).then(function (res) {
                if (res.result.res_code == 1) {
                    console.log(res);
                    __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("提交成功", _this.toastCtrl);
                    _this.navCtrl.pop();
                }
            });
        }
    };
    PerformanceStartPage.prototype.changeStr = function (num) {
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
    PerformanceStartPage.prototype.changeCycle = function (num) {
        var str;
        if (num == '0') {
            str = "周";
        }
        else if (num == '1') {
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
        else if (num == '5') {
            str = '转正';
        }
        else {
            str = '';
        }
        return str;
    };
    PerformanceStartPage.prototype.isFinish = function (rt_state) {
        var finish = false;
        if (rt_state == 1) {
            finish = true;
        }
        else if (rt_state == 2) {
            finish = false;
        }
        return finish;
    };
    //编辑工作内容
    PerformanceStartPage.prototype.editContent = function (rt_achievement) {
        this.navCtrl.push('ContentEditPage', {
            'rt_achievement': this.changeStrEdit(rt_achievement)
        });
    };
    //编辑工作计划
    PerformanceStartPage.prototype.editInsufficient = function (rt_insufficient) {
        this.navCtrl.push('InsufficientEditPage', {
            'rt_insufficient': this.changeStrEdit(rt_insufficient)
        });
    };
    //编辑意见与建议
    PerformanceStartPage.prototype.editAdvice = function (rt_advice) {
        this.navCtrl.push('AdviceEditPage', {
            'rt_advice': this.changeStrEdit(rt_advice)
        });
    };
    PerformanceStartPage.prototype.changeStrEdit = function (str) {
        var ret = '';
        if (str == '请输入') {
            ret = '';
        }
        else {
            ret = str;
        }
        return ret;
    };
    PerformanceStartPage.prototype.notFirst = function () {
        this.isFirst = false;
    };
    PerformanceStartPage.prototype.getTitle = function () {
        var title = '';
        if (this.isFirst == false) {
            title = this.item.rt_appraisaled_employee_name + '的考评';
        }
        else {
            title = '前言';
        }
        return title;
    };
    return PerformanceStartPage;
}());
PerformanceStartPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-performance-start',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance-start/performance-start.html"*/'<!--\n  Generated template for the PerformanceStartPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="gongdan-color" hideBackButton="true">\n        <ion-buttons left>\n            <button ion-button icon-only (click)="goBack()">\n              <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n            </button>\n          </ion-buttons>\n      <ion-title>{{getTitle()}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div *ngIf="!isFirst">\n            <ion-item-group no-lines>\n                    <ion-item style="border-bottom:#f0f2f5 1px solid;">\n                        <p text-wrap style="font-size:13px;color:#fba958;margin-right:25px;float: right;margin-top: 0px"\n                        [ngClass]="{true:\'wait\',false:\'finish\'}[isFinish(item.rt_state)]">{{changeStr(item.rt_state)}}</p>\n                        <img src={{user_heard}} class="image1" style="float:left;">   \n                        <p text-wrap style="font-size:80%;color:gray;line-height:27px;margin-left: 30px;">{{item.rt_appraisaled_employee_name}}</p>\n                    </ion-item>\n                  </ion-item-group>\n                  <div>\n                    <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px;height: 15px;line-height: 15px">单号</p>\n                    <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{item.rt_name}}</p>\n                    <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">类型</p>\n                    <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{changeCycle(item.rt_appraisal_cycle)}}</p>\n                    <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">部门</p>\n                    <p style="font-size:13px;color:#949ca1;margin-left: 120px;height: 25px;">{{item.rt_department_id}}</p>\n                    <p style="font-size:13px;float: left;color:#949ca1;margin-left: 20px;margin-top: -2px">岗位</p>\n                    <p style="font-size:13px;color:#949ca1;margin-left: 120px">{{item.rt_job_id}}</p>\n                  </div>\n                  <div style="height: 10px;line-height: 10px;background:#f0f2f5;"></div>\n                  <ion-grid style="padding: 0px">\n                      <ion-row class="row_class" align-items-center>\n                        <ion-col style="padding: 0px;border-bottom:#f0f2f5 1px solid;">\n                        <div align="center">\n                          <p>KPI考评</p> \n                        </div>\n                      </ion-col>        \n                      </ion-row>\n                  </ion-grid>\n                \n                  <ion-item-group no-lines>\n                        <div *ngFor="let typeBean of typeList">\n                            <span style="margin-left: 8px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 3px"></span>\n                            <h4 style="font-size: 14px;margin-left: 20px">{{typeBean.type}}</h4>   \n                          <div *ngFor="let tagBean of typeBean.tagList" style="margin-top: 20px;">\n                                <span style="margin-left: 10px;width:5px;height:5px;border-radius:5px;background-color:#b4b4af;display:inline-block;float: left;margin-top: 7px"></span>\n                                <p style="font-size: 14px;color: #949ca1;margin-left: 20px;word-wrap:break-word;">{{tagBean.tag_name}}</p>\n                                <div class="star-div" *ngFor="let subeType of tagBean.subType" style="padding: 10px;margin-top: 5px">\n                                    <p style="font-size: 13px;color: #949ca1;margin-left: 10px;word-wrap: break-word;margin-top: 5px">{{subeType.subTp}}</p>\n                                    <div *ngFor="let item of score" style="float: left;margin-top: -7px;margin-left: 10px" tappable (click)="select(subeType,item)">\n                                        <ion-icon name="star" style="color: #fba958" *ngIf="item<=subeType.current_id;"></ion-icon>\n                                        <ion-icon name="star-outline" style="color: #b4b4af" *ngIf="item>subeType.current_id;"></ion-icon>\n                                    </div>\n                                </div>\n                                <div style="height: 1px;line-height: 1px;background-color: #f0f2f5;margin-left: 20px;margin-top: 15px"></div>\n                          </div>\n                        </div>\n                  </ion-item-group>\n                  <ion-grid style="padding: 0px">\n                      <ion-row class="row_class" align-items-center>\n                        <ion-col style="padding: 0px;border-bottom:#f0f2f5 1px solid;border-top: #f0f2f5 10px solid">\n                        <div align="center">\n                          <p>主观描述</p> \n                        </div>\n                      </ion-col>        \n                      </ion-row>\n                  </ion-grid>\n                  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="item.is_self">\n                      <div tappable (click)="editContent(rt_achievement)">\n                        <div>\n                            <span style="margin-bottom: -15px;margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;margin-top: 4px"></span>\n                            <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133;margin-top: 0px">工作总结</h4>\n                        </div>\n                        <img src="assets/img/journal_sheet/right_icon.png" style="margin-top: 13px;width:15px;height:15px;float: right;margin-right: 15px">\n                          <div [innerHTML]="assembleHTML(rt_achievement)" style="word-wrap:break-word;color:#3d3c3c;margin: 15px;padding: 10px;width:90%"></div>\n                      </div>\n                  </ion-item-group>\n                  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="item.is_self">\n                      <div tappable (click)="editInsufficient(rt_insufficient)">\n                          <div>\n                              <span style="margin-bottom: -15px;margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;margin-top: 4px"></span>\n                              <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133;margin-top: 0px">工作计划</h4>\n                          </div>\n                          <img src="assets/img/journal_sheet/right_icon.png" style="margin-top: 13px;width:15px;height:15px;float: right;margin-right: 15px">\n                          <div [innerHTML]="assembleHTML(rt_insufficient)" style="word-wrap:break-word;color:#3d3c3c;margin: 15px;padding: 10px;width:90%"></div>\n                          <!-- <p style="word-wrap:break-word;color:#666666;border-radius:8px;border-top:1px #f5f7fa solid;\n                                border-right: 1px #f5f7fa solid;\n                              border-bottom: 1px #f5f7fa solid;border-left: 1px #f5f7fa solid;margin: 15px;padding: 10px;width:90%">{{rt_insufficient}}</p> -->\n                        </div>\n                  </ion-item-group>\n                  \n                  <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="!item.is_self">\n                      <div tappable (click)="editAdvice(rt_advice)">\n                          <div>\n                              <span style="margin-bottom: -15px;margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;margin-top: 4px"></span>\n                              <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133;margin-top: 0px">意见和建议</h4>\n                          </div>\n                          <img src="assets/img/journal_sheet/right_icon.png" style="margin-top: 13px;width:15px;height:15px;float: right;margin-right: 15px">\n                          <div [innerHTML]="assembleHTML(rt_advice)" style="word-wrap:break-word;color:#3d3c3c;margin: 15px;padding: 10px;width:90%"></div>\n                      </div>\n                  </ion-item-group>\n                  <ion-item no-lines *ngIf="item.is_self" style="min-height: 20px">\n                        <ion-label style="color:#2e3133;font-size:14px;">\n                                <span style="margin-right: 10px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;"></span>\n                            匹配年薪\n                            <span style="font-size: 12px">(含年终奖及提成)</span>\n                        </ion-label>\n                        <ion-input item-end type="number" text-right [(ngModel)]="rt_salary_expectation" style="color:#5C6166;font-size:12px;margin-right:5px" placeholder="请输入(单位：万元)"></ion-input>\n                   </ion-item>\n                   <div *ngIf="item.is_self" style="word-wrap:break-word;color: #949ca1;font-size: 12px;margin-left: 15px">说明：在当前社会环境下，你自认为你的努力与能力能够匹配的年收入，你填的数据与你最终的薪资调整没有必然联系</div>\n                  <!-- <ion-item-group no-lines style="border-bottom:#f0f2f5 1px solid;" *ngIf="item.is_self">\n                      <div>\n                          <ion-input [(ngModel)]="rt_salary_expectation"  type="number" style="float: right;"></ion-input>\n                          <span style="margin-left: 15px;width:8px;height:8px;border-radius:8px;background-color:#2597ec;display:inline-block;float: left;margin-top: 4px"></span>\n                          <h4 style="font-size: 14px;margin-left: 35px;color: #2e3133">我能够匹配的年薪</h4>\n                      </div>\n                  </ion-item-group> -->\n                  \n    </div>\n    <div  padding  [innerHTML]="assembleHTML(description)" *ngIf="isFirst"></div>\n</ion-content>\n<ion-footer>\n    <div style="background:white" *ngIf="!isFirst">\n        <span align="center" style=\'width:50%;float:left; background-color:#40aae7;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="save()">\n        保存\n        </span>\n        <span align="center" style=\'width:50%;float:right;background-color:#1897f2;height:44px;line-height:44px;font-size:15px;color:white\' tappable (click)="commit()">\n        立即提交\n        </span>\n    </div>\n    <div *ngIf="isFirst" align="center">\n            <button ion-button round tappable (click)="notFirst()">我已阅读，开始考评</button>\n    </div>\n</ion-footer>'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/performance/performance-start/performance-start.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_0__performance_service__["a" /* PersonService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_0__performance_service__["a" /* PersonService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["DomSanitizer"]])
], PerformanceStartPage);

//# sourceMappingURL=performance-start.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/performance/performance-start/performance-start.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformanceStartPageModule", function() { return PerformanceStartPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var performance_start_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PerformanceStartPageModule = (function () {
    function PerformanceStartPageModule() {
    }
    return PerformanceStartPageModule;
}());
PerformanceStartPageModule = performance_start_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            PerformanceStartPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(PerformanceStartPage),
        ],
    })
], PerformanceStartPageModule);

//# sourceMappingURL=performance-start.module.js.map

/***/ }),

/***/ 882:
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
//# sourceMappingURL=61.js.map