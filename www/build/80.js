webpackJsonp([80],{

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/reback-gongdan/reback-gongdan.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gongdanService__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the RebackGongdanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RebackGongdanPage = (function () {
    function RebackGongdanPage(navCtrl, navParams, toastCtrl, gongdanService, actionSheetCtrl, nativeService, alertCtrl, statusbar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.gongdanService = gongdanService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nativeService = nativeService;
        this.alertCtrl = alertCtrl;
        this.statusbar = statusbar;
        this.companyIschoosed = true;
        this.imgList = [];
        this.pushImgList = [];
        this.whoCanSee = "全公司";
        this.priority = [{ name: '低', id: '1' }, { name: '中', id: '2' }, { name: '高', id: '3' }];
        this.brand_list = [];
        this.area_list = [];
        this.category_list = [];
        this.all_tag_list = [];
        this.isDeletePicture = false;
        this.navParams.data.companyIschoosed = true;
        this.frontPage = __WEBPACK_IMPORTED_MODULE_9__providers_Utils__["a" /* Utils */].getViewController("GongdanDetailPage", navCtrl);
        this.gongdanService.get_all_biaoqian().then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.biaoqianList = res.result.res_data.res_data;
            }
        });
    }
    RebackGongdanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RebackGongdanPage');
    };
    RebackGongdanPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
        var reback_item = this.navParams.get('reback_item');
        var need_reback = this.navParams.get('need_reback');
        if (need_reback) {
            this.is_back_gongdan = true;
            this.navParams.data.need_reback = false;
            this.title = reback_item.title;
            this.description = reback_item.description;
            this.imgList = reback_item.work_order_images;
            this.priorityId = reback_item.priority;
            this.work_order_id = reback_item.work_order_id;
        }
        else {
            this.is_back_gongdan = false;
            this.companyIschoosed = this.navParams.get('companyIschoosed');
            this.chooseList = this.navParams.get('chooseList');
            this.choosePeopleItem = this.navParams.get('choosePeopleItem');
            this.chooseDepartmentName = this.navParams.get('chooseDepartmentName');
            this.departmentList = this.navParams.get("departmentList");
            console.log(this.choosePeopleItem);
            if (this.choosePeopleItem) {
                this.choosePeopleName = this.choosePeopleItem.name;
            }
            if (this.companyIschoosed) {
                this.whoCanSee = "全公司";
            }
            else {
                this.whoCanSee = "指定部门";
            }
        }
        this.isDeletePicture = this.navParams.get('isDeletePicture');
        console.log(this.isDeletePicture);
        if (this.isDeletePicture) {
            this.isDeletePicture = false;
            this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1);
            this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]), 1);
        }
        if (this.navParams.get('brand_list') && (this.navParams.get('brand_list').length || this.navParams.get('brand_list').length == 0)) {
            this.brand_list = this.navParams.get('brand_list');
            this.navParams.data.brand_list = false;
        }
        if (this.navParams.get('area_list') && (this.navParams.get('area_list').length || this.navParams.get('area_list').length == 0)) {
            this.area_list = this.navParams.get('area_list');
            this.navParams.data.area_list = false;
        }
        if (this.navParams.get('category_list') && (this.navParams.get('category_list').length || this.navParams.get('category_list').length == 0)) {
            this.category_list = this.navParams.get('category_list');
            this.navParams.data.category_list = false;
        }
        if (this.navParams.get('all_tag_list') && (this.navParams.get('all_tag_list').length || this.navParams.get('all_tag_list').length == 0)) {
            this.all_tag_list = this.navParams.get('all_tag_list');
            this.navParams.data.all_tag_list = false;
        }
    };
    RebackGongdanPage.prototype.release = function () {
        var _this = this;
        var mString = "";
        if (!this.title) {
            mString = mString + "   请输入标题";
        }
        if (!this.description) {
            mString = mString + "   请输入问题描述";
        }
        if (!this.priorityId) {
            mString = mString + "   请选择优先级";
        }
        if (!(this.companyIschoosed || this.chooseList)) {
            mString = mString + "   请选择谁可以看";
        }
        var tags = [];
        if (this.biaoqianList) {
            for (var i = 0; i < this.biaoqianList.length; i++) {
                if (this.biaoqianList[i].ischeck) {
                    tags.push(this.biaoqianList[i].id);
                }
            }
        }
        if (mString != "") {
            __WEBPACK_IMPORTED_MODULE_9__providers_Utils__["a" /* Utils */].toastButtom(mString, this.toastCtrl);
        }
        else {
            var departments = void 0;
            if (!this.companyIschoosed) {
                departments = this.chooseList;
            }
            var assign_uid = void 0;
            if (this.choosePeopleItem) {
                assign_uid = this.choosePeopleItem.id;
            }
            var body = {
                title: this.title,
                description: this.description,
                priority: this.priorityId,
                assign_uid: assign_uid,
                departments: departments,
                uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
                wo_images: this.pushImgList,
                work_order_id: this.work_order_id,
                brand_ids: this.brand_list,
                area_ids: this.area_list,
                category_ids: this.category_list,
            };
            this.gongdanService.commit_draft(body).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                    _this.frontPage.data.need_fresh = true;
                    _this.navCtrl.popTo(_this.frontPage);
                }
            });
        }
    };
    RebackGongdanPage.prototype.chooseWhoCanSee = function () {
        this.navCtrl.push('WhoCanSeePage', { companyIschoosed: this.companyIschoosed, departmentList: this.departmentList, need_pop_reback: true, });
        // this.create_work_order()
    };
    RebackGongdanPage.prototype.addImg = function () {
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
    RebackGongdanPage.prototype.getPicture = function (type) {
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
    RebackGongdanPage.prototype.getPictureSuccess = function (img_url) {
        console.log(img_url);
        this.imgList.push(img_url);
        this.pushImgList.push(img_url.split(",")[1]);
        // this.isChange = true;
        // this.user_heard = img_url;
        // this.editInformationService.pushHeardImage(img_url.split(",")[1])
        //   .then(res => {
        //     if (res.result && res.result.res_code == 1) {
        //       this.storage.get('user').then(userBean => {
        //         userBean.result.res_data.user_ava = res.result.res_data.user_ava
        //         this.storage.set('user', userBean)
        //       })
        //     }
        //   })
    };
    RebackGongdanPage.prototype.assignPeople = function () {
        this.navCtrl.push("AssignPeoplePage", {
            need_pop_reback: true,
        });
    };
    RebackGongdanPage.prototype.goBack = function () {
        var _this = this;
        if (this.title || this.description || this.priorityId) {
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
        }
    };
    RebackGongdanPage.prototype.clickbiaoqian = function (item) {
        item.ischeck = !item.ischeck;
    };
    RebackGongdanPage.prototype.isChoose = function (item) {
        return item.ischeck;
    };
    RebackGongdanPage.prototype.chooseBiaoqian = function () {
        var _this = this;
        this.gongdanService.get_all_biaoqian().then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('BiaoqianPage', { list: res.result.res_data,
                    area_ids: _this.area_list,
                    brand_ids: _this.brand_list,
                    category_ids: _this.category_list,
                    need_pop_reback: true });
            }
        });
    };
    RebackGongdanPage.prototype.all_tags = function () {
        var all_tags = "";
        for (var _i = 0, _a = this.all_tag_list; _i < _a.length; _i++) {
            var items = _a[_i];
            all_tags += items.name + " ";
        }
        return all_tags;
    };
    RebackGongdanPage.prototype.clickPicture = function (item) {
        this.deletePicture = item;
        this.navCtrl.push("DeletePicturePage", { item: item, need_back_retry: true });
    };
    return RebackGongdanPage;
}());
RebackGongdanPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"]({
        selector: 'page-reback-gongdan',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/reback-gongdan/reback-gongdan.html"*/'<!--\n  Generated template for the CreateGongdanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n\n\n  <ion-navbar hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>重新编辑工单</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'release()\'>\n        提交\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-item>\n    <ion-input [(ngModel)]="title" placeholder="请输入标题"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-textarea rows="8" text-wrap placeholder=\'问题描述\' [(ngModel)]="description" class=\'area_class\'>\n    </ion-textarea>\n  </ion-item>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col style="height:116px" col-4 *ngFor="let item of imgList" (click)="clickPicture(item)">\n        <img src={{item}} style="position:absolute;clip:rect(0px,106px,106px,0px);" />\n      </ion-col>\n      <ion-col col-4 (click)="addImg()">\n        <img src="assets/img/add.png"  />\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n  <ion-item>\n    <ion-label style="color:black">优先级</ion-label>\n    <ion-select [(ngModel)]="priorityId" class="normal-select">\n      <ion-option *ngFor="let item of priority;let i = index;" value={{item.id}}>{{item.name}}</ion-option>\n    </ion-select>\n  </ion-item>\n\n    <button ion-item (click)="chooseWhoCanSee()">\n        <span style="float:right">{{whoCanSee}}</span>\n      谁可以看\n      <!--<span> </span>-->\n    </button>\n    <button ion-item (click)="assignPeople()">\n        <span style="float:right">{{choosePeopleName}}</span>\n      指派受理人\n      <span style="color:#999999">(不知可不填)</span>\n  </button>\n\n  <button ion-item (click)="chooseBiaoqian()">\n    <span style="float:right">{{all_tags()}}</span>\n    选择标签\n  </button>\n  <!--<div style="background:#e4e5e6;padding:4px;padding-left:10px">\n    问题标签(选填)\n  </div>\n  \n\n    <ion-grid>\n        <ion-row>\n           <ion-col col-3 tappable (click)="clickbiaoqian(item)" *ngFor="let item of biaoqianList">\n            <div  class="biaoqian_div_unchoose" [ngClass]="{true:\'biaoqian_div_choose\',false:\'biaoqian_div_unchoose\'}[isChoose(item)]" align="center">\n              {{item.name}}\n            </div>\n          </ion-col>\n\n          \n        </ion-row>\n      </ion-grid>-->\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/reback-gongdan/reback-gongdan.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_8__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__["a" /* NativeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_8__gongdanService__["a" /* GongDanService */],
        __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_10_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */]])
], RebackGongdanPage);

//# sourceMappingURL=reback-gongdan.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/reback-gongdan/reback-gongdan.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RebackGongdanPageModule", function() { return RebackGongdanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer_dist_es2015_src_module__ = __webpack_require__(243);
var reback_gongdan_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RebackGongdanPageModule = (function () {
    function RebackGongdanPageModule() {
    }
    return RebackGongdanPageModule;
}());
RebackGongdanPageModule = reback_gongdan_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            RebackGongdanPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(RebackGongdanPage), __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer_dist_es2015_src_module__["a" /* IonicImageViewerModule */]
        ],
    })
], RebackGongdanPageModule);

//# sourceMappingURL=reback-gongdan.module.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GongDanService; });
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


var GongDanService = (function () {
    function GongDanService(httpservice) {
        this.httpservice = httpservice;
    }
    GongDanService.prototype.create_work_order = function (body) {
        return this.httpservice.postBody("create_work_order", body, 1);
    };
    GongDanService.prototype.my_work_order_statistics = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("my_work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_search = function (body) {
        return this.httpservice.postBody("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_searchNoLoading = function (body) {
        return this.httpservice.postBodyNoLoading("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_statistics = function (start_date, end_date, brand_ids, area_ids, category_ids, user_id) {
        var body = JSON.stringify({
            uid: user_id,
            start_date: start_date,
            end_date: end_date,
            brand_ids: brand_ids,
            area_ids: area_ids,
            category_ids: category_ids,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_statistics_search = function (start_date, end_date, tag_ids, search_type, search_text) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date,
            tag_ids: tag_ids,
            search_type: search_type,
            search_text: search_text,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics_search", body, 1);
    };
    GongDanService.prototype.work_order_statisticsWithTime = function (start_date, end_date) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date
        });
        return this.httpservice.postBody("work_order_statistics", body, 1);
    };
    GongDanService.prototype.searchAtMe = function (body) {
        return this.httpservice.postBodyNoLoading("searchAtMe", body, 1);
    };
    GongDanService.prototype.searchAtMeWithLoading = function (body) {
        return this.httpservice.postBody("searchAtMe", body, 1);
    };
    GongDanService.prototype.getDepartment = function () {
        var body = JSON.stringify({
            partner_id: 1
        });
        return this.httpservice.postBody("get_all_departments", body);
    };
    GongDanService.prototype.getGongdanDetail = function (id) {
        var body = JSON.stringify({
            work_order_id: id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("work_order_search_by_id", body, 1);
    };
    GongDanService.prototype.work_order_add_record = function (content, reply_uid, record_type, work_order_id, parent_id, record_imgs) {
        var body = JSON.stringify({
            content: content,
            reply_uid: reply_uid,
            record_type: record_type,
            work_order_id: work_order_id,
            parent_id: parent_id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            record_imgs: record_imgs,
        });
        return this.httpservice.postBody("work_order_add_record", body, 1);
    };
    GongDanService.prototype.get_all_employees = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_employees", body);
    };
    GongDanService.prototype.get_department_employees = function (department_ids) {
        var body = JSON.stringify({
            department_ids: department_ids
        });
        return this.httpservice.postBody("get_department_employees", body);
    };
    GongDanService.prototype.work_order_action = function (uid, work_order_id, action_type, assign_uid) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            action_type: action_type,
            assign_uid: assign_uid,
        });
        return this.httpservice.postBody("work_order_action", body, 1);
    };
    GongDanService.prototype.work_order_retract = function (uid, work_order_id, need_unlink) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            need_unlink: need_unlink,
        });
        return this.httpservice.postBody("work_order_retract", body, 1);
    };
    GongDanService.prototype.commit_draft = function (body) {
        return this.httpservice.postBody("commit_draft", body, 1);
    };
    GongDanService.prototype.search_gongdan = function (search_text, search_type) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            search_text: search_text,
            search_type: search_type,
        });
        return this.httpservice.postBody("search_gongdan", body, 1);
    };
    GongDanService.prototype.get_all_biaoqian = function () {
        return this.httpservice.postBody("get_all_biaoqian", {}, 1);
    };
    GongDanService.prototype.update_biaoqian = function (work_order_id, category_ids, brand_ids, area_ids) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            work_order_id: work_order_id,
            category_ids: category_ids,
            brand_ids: brand_ids,
            area_ids: area_ids,
        });
        return this.httpservice.postBody("update_biaoqian", body, 1);
    };
    GongDanService.prototype.get_employee_detail = function (user_id) {
        var body = JSON.stringify({
            user_id: user_id,
        });
        return this.httpservice.postBody("get_employee_detail", body, 1);
    };
    GongDanService.prototype.search_biaoqian = function (search_type, search_text) {
        var body = JSON.stringify({
            search_type: search_type,
            search_text: search_text
        });
        return this.httpservice.postBody("search_biaoqian", body, 1);
    };
    return GongDanService;
}());
GongDanService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], GongDanService);

//# sourceMappingURL=gongdanService.js.map

/***/ })

});
//# sourceMappingURL=80.js.map