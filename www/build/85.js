webpackJsonp([85],{

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-detail/gongdan-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gongdanService__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(239);
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
 * Generated class for the GongdanDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var GongdanDetailPage = (function () {
    function GongdanDetailPage(navCtrl, navParams, statusBar, gongDanService, alertCtrl, toast, platform, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.gongDanService = gongDanService;
        this.alertCtrl = alertCtrl;
        this.toast = toast;
        this.platform = platform;
        this.statusbar = statusbar;
        this.isShowZhiPai = false;
        this.isShowCheHui = false;
        this.isShowRefuse = false;
        this.isShowConfirm = false;
        this.isShowFinish = false;
        this.isMine = false;
        this.all_tag_ids = [];
        this.biaoqian_list = this.navParams.get('biaoqian_list');
        this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("GongdanPage", navCtrl);
        this.rebackPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("CreateGongdanPage", navCtrl);
        this.item = this.navParams.get('items').work_order;
        console.log(this.item);
        this.message_item = this.navParams.get('items').records;
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        if (this.item.area_ids.res_data) {
            for (var _i = 0, _a = this.item.area_ids.res_data; _i < _a.length; _i++) {
                var items = _a[_i];
                this.all_tag_ids.push(items);
            }
        }
        if (this.item.brand_ids.res_data) {
            for (var _b = 0, _c = this.item.brand_ids.res_data; _b < _c.length; _b++) {
                var items = _c[_b];
                this.all_tag_ids.push(items);
            }
        }
        if (this.item.category_ids.res_data) {
            for (var _d = 0, _e = this.item.category_ids.res_data; _d < _e.length; _d++) {
                var items = _e[_d];
                this.all_tag_ids.push(items);
            }
        }
        if (this.item.create_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
            this.isMine = true;
        }
        this.is_ios = this.platform.is('ios');
        if (this.item.issue_state == "unaccept" || this.item.issue_state == "process") {
            if (this.item.issue_state == "process") {
                if (__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id == this.item.create_user.id || __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id == this.item.assign_user.id) {
                    this.isShowZhiPai = true;
                }
            }
            else {
                this.isShowZhiPai = true;
            }
            this.isShowRefuse = false;
            this.isShowConfirm = false;
            if (this.item.create_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
                this.isShowCheHui = true;
            }
            if (this.item.issue_state == "process") {
                if (this.item.assign_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
                    this.isShowFinish = true;
                }
            }
        }
        else {
            this.isShowRefuse = false;
            this.isShowConfirm = false;
            this.isShowZhiPai = false;
            this.isShowCheHui = false;
            if (this.item.issue_state == "check") {
                if (this.item.create_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
                    this.isShowRefuse = true;
                    this.isShowConfirm = true;
                }
            }
        }
    }
    GongdanDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GongdanDetailPage');
    };
    GongdanDetailPage.prototype.ionViewDidEnter = function () {
        if (this.navParams.get('need_fresh') == true) {
            this.navParams.data.need_fresh = false;
            this.reload();
        }
    };
    GongdanDetailPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    GongdanDetailPage.prototype.reload = function () {
        var _this = this;
        this.gongDanService.getGongdanDetail(this.item.work_order_id).then(function (res) {
            console.log(res);
            _this.all_tag_ids = [];
            if (res.result.res_data && res.result.res_code == 1) {
                _this.item = res.result.res_data.work_order;
                if (_this.item.area_ids.res_data) {
                    for (var _i = 0, _a = _this.item.area_ids.res_data; _i < _a.length; _i++) {
                        var items = _a[_i];
                        _this.all_tag_ids.push(items);
                    }
                }
                if (_this.item.brand_ids.res_data) {
                    for (var _b = 0, _c = _this.item.brand_ids.res_data; _b < _c.length; _b++) {
                        var items = _c[_b];
                        _this.all_tag_ids.push(items);
                    }
                }
                if (_this.item.category_ids.res_data) {
                    for (var _d = 0, _e = _this.item.category_ids.res_data; _d < _e.length; _d++) {
                        var items = _e[_d];
                        _this.all_tag_ids.push(items);
                    }
                }
                _this.message_item = res.result.res_data.records;
                if (_this.item.issue_state == "unaccept" || _this.item.issue_state == "process") {
                    if (__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id == _this.item.create_user.id || __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id == _this.item.assign_user.id) {
                        _this.isShowZhiPai = true;
                    }
                    _this.isShowRefuse = false;
                    _this.isShowConfirm = false;
                    if (_this.item.create_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
                        _this.isShowCheHui = true;
                    }
                    if (_this.item.issue_state == "process") {
                        if (_this.item.assign_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
                            _this.isShowFinish = true;
                        }
                    }
                }
                else {
                    _this.isShowRefuse = false;
                    _this.isShowConfirm = false;
                    _this.isShowZhiPai = false;
                    _this.isShowCheHui = false;
                    if (_this.item.issue_state == "check") {
                        if (_this.item.create_user.id == __WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id) {
                            _this.isShowRefuse = true;
                            _this.isShowConfirm = true;
                        }
                    }
                }
            }
        });
    };
    GongdanDetailPage.prototype.changeState = function (item) {
        var state_str = "";
        if (item == "unaccept") {
            state_str = "等待受理";
        }
        else if (item == "process") {
            state_str = "受理中";
        }
        else if (item == "check") {
            state_str = "待验收";
        }
        else if (item == "done") {
            state_str = "已完成";
        }
        else if (item == "draft") {
            state_str = "草稿";
        }
        return state_str;
    };
    GongdanDetailPage.prototype.replyClick = function () {
        this.navCtrl.push('GongdanNewChatPage', {
            item: this.item,
            parent_id: null,
            record_item: null,
            select_name: this.item.create_user
        });
        // let ctrl = this.alertCtrl;
        // ctrl.create({
        //   title: '提示',
        //   message: "填写回复",
        //   inputs: [
        //     {
        //       name: 'title',
        //       placeholder: '回复内容(不能为空)'
        //     },
        //   ],
        //   buttons: [
        //     {
        //       text: '取消',
        //       handler: () => {
        //       }
        //     },
        //     {
        //       text: '确定',
        //       handler: data => {
        //         if (data.title) {
        //           this.gongDanService.work_order_add_record(data.title, this.item.create_user.id, "reply", this.item.work_order_id,null,[]).then(res => {
        //             if (res.result.res_code == 1) {
        //               Utils.toastButtom("回复成功", this.toast)
        //               this.reload()
        //             }
        //           })
        //         }
        //         else {
        //           Utils.toastButtom("回复不能为空", this.toast)
        //         }
        //       }
        //     }
        //   ],
        // }).present();
    };
    GongdanDetailPage.prototype.reply_to = function (items) {
        console.log(items);
        this.navCtrl.push('GongdanNewChatPage', {
            item: this.item,
            parent_id: items.record_id,
            record_item: items,
            select_name: items.create_uid
        });
    };
    GongdanDetailPage.prototype.getContent = function (items) {
        var content = "";
        if (items.record_type == "reply") {
            content = "回复：" + items.content;
        }
        return content;
    };
    GongdanDetailPage.prototype.changeDate = function (date) {
        if (date) {
            var new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
            return new_date;
        }
    };
    GongdanDetailPage.prototype.chehui = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否确定撤回该工单？",
            buttons: [
                {
                    text: '重新编辑',
                    handler: function () {
                        _this.gongDanService.work_order_retract(__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id, _this.item.work_order_id, false).then(function (res) {
                            if (res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("撤回成功", _this.toast);
                                // this.frontPage.data.need_fresh = true;
                                // this.navCtrl.popTo(this.frontPage);
                                _this.reload();
                            }
                        });
                    }
                },
                {
                    text: '直接删除',
                    handler: function (data) {
                        _this.gongDanService.work_order_retract(__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id, _this.item.work_order_id, true).then(function (res) {
                            if (res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("删除成功", _this.toast);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    GongdanDetailPage.prototype.zhipai = function () {
        this.navCtrl.push('GongdanZhipaiPage', {
            item: this.item,
        });
    };
    GongdanDetailPage.prototype.confirm = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否验证通过该工单",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.gongDanService.work_order_action(__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id, _this.item.work_order_id, "finish", _this.item.create_user.id).then(function (res) {
                            if (res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("验证通过", _this.toast);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                                // let biaoqian_arr = []
                                // let id_index = 0
                                // console.log(this.biaoqian_list)
                                // for (let biaoqian of this.biaoqian_list) {
                                //   biaoqian_arr.push({
                                //     type: 'checkbox',
                                //     label: biaoqian.name,
                                //     check: false,
                                //     value: biaoqian.id,
                                //   })
                                //   id_index++
                                // }
                                // console.log(biaoqian_arr)
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    GongdanDetailPage.prototype.refuse = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否不通过该工单",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.gongDanService.work_order_action(__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id, _this.item.work_order_id, "reject", _this.item.create_user.id).then(function (res) {
                            if (res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("拒绝成功,等待受理", _this.toast);
                                _this.frontPage.data.need_fresh = true;
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    GongdanDetailPage.prototype.finish = function () {
        var _this = this;
        var ctrl = this.alertCtrl;
        ctrl.create({
            title: '提示',
            message: "是否处理成功该工单",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.gongDanService.work_order_action(__WEBPACK_IMPORTED_MODULE_4__providers_HttpService__["a" /* HttpService */].user_id, _this.item.work_order_id, "check", _this.item.create_user.id).then(function (res) {
                            if (res.result.res_code == 1) {
                                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom("处理成功,等待验收", _this.toast);
                                var ctrl_1 = _this.alertCtrl;
                                ctrl_1.create({
                                    title: '提示',
                                    message: "是否需要修改该工单标签？",
                                    // inputs: biaoqian_arr,
                                    buttons: [
                                        {
                                            text: '取消',
                                            handler: function () {
                                                _this.frontPage.data.need_fresh = true;
                                                _this.navCtrl.popTo(_this.frontPage);
                                            }
                                        },
                                        {
                                            text: '确定',
                                            handler: function (data) {
                                                _this.navCtrl.push('ChangeBiaoqianPage', {
                                                    gongdan_item: _this.item,
                                                });
                                            }
                                        }
                                    ],
                                }).present();
                            }
                        });
                    }
                }
            ],
        }).present();
    };
    GongdanDetailPage.prototype.release = function () {
        this.navCtrl.push('RebackGongdanPage', {
            reback_item: this.item,
            need_reback: true,
        });
    };
    GongdanDetailPage.prototype.clickUser = function (item) {
        var _this = this;
        this.gongDanService.get_employee_detail(item.id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('EmployeeDetailPage', {
                    item: res.result.res_data,
                });
            }
        });
    };
    return GongdanDetailPage;
}());
GongdanDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-gongdan-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-detail/gongdan-detail.html"*/'<!--\n  Generated template for the GongdanDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>工单详情</ion-title>\n    <ion-buttons *ngIf="item.issue_state == \'draft\' && isMine" end>\n      <button ion-button (click)=\'release()\'>\n        编辑\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background:#f4f4f4">\n  <ion-item-group no-lines style="background:#f0f2f5;margin-top:-10px">\n    <div style="margin-top:10px;background-color:white" tappable (click)="gongdanDetail(item)">\n      <div>\n        <img *ngIf="item.priority == 3" src="assets/img/work_bench/up_one.png" class="priority_icon">\n        <img *ngIf="item.priority == 2" src="assets/img/work_bench/up_two.png" class="priority_icon">\n        <img *ngIf="item.priority == 1" src="assets/img/work_bench/up_three.png" class="priority_icon">\n        <span class="title_class_style">\n          {{item.title}}\n        </span>\n        <span p class="data_list_state">\n          {{changeState(item.issue_state)}}\n        </span>\n\n\n      </div>\n\n      <!--<div *ngIf="all_tag_ids.length > 0"  style="justify-content:space-around">\n    <span round style=\'background-color:#fba958;flex :1 1 100%\' *ngFor="let item_tag of all_tag_ids;let i = index"  ion-button>\n      {{item_tag.name}}\n    </span>\n  </div>-->\n\n      <div *ngIf="all_tag_ids.length > 0">\n        <ion-grid style="height:30px;">\n          <ion-row>\n            <ion-col col-3 tappable *ngFor="let item_tag of all_tag_ids;let i = index">\n              <div class="biaoqian_div_choose" align="center">\n                {{item_tag.name}}\n              </div>\n            </ion-col>\n\n          </ion-row>\n        </ion-grid>\n      </div>\n      <P text-wrap class="data_list_desprition">\n        {{item.description}}\n      </P>\n      <ion-grid *ngIf="item.work_order_images" style="margin-top:-20px;margin-left:5px">\n        <ion-row style="margin-right:5px;">\n          <ion-col style="height:80px" *ngFor="let image of item.work_order_images" col-3>\n            <img style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" src={{image}} imageViewer/>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <div class="creater_div">\n        <img src={{item.create_user.user_ava}} class="create_ava">\n        <span p class="creater_name">\n          {{item.create_user.name + " " + (changeDate(item.create_time) | date:\'MM-dd HH:mm\')}}\n        </span>\n        <span *ngIf="item.assign_user.name" class="assign_name">\n          {{"受理人： "+ item.assign_user.name}}\n        </span>\n        <span *ngIf="!item.assign_user.name" class="assign_name">\n            未指派受理人\n          </span>\n        <img *ngIf="item.assign_user.name" src="assets/img/work_bench/lianjie.png" class="assign_ava">\n      </div>\n      <div style="height:1px;background:white">\n      </div>\n    </div>\n  </ion-item-group>\n  <p class="divided_p">{{"操作记录" + "（" + message_item.length + "）"}}</p>\n  <ion-list class="message_list">\n    <div *ngFor="let items of message_item" class="div_message">\n      <ion-item no-lines style="height:40px;min-height:50px">\n        <ion-grid style="background:white">\n          <ion-row>\n            <ion-col col-2>\n              <img src={{items.create_uid.user_ava}} class="img_message_ava">\n            </ion-col>\n            <ion-col col-7>\n              <p class="name_message">\n                <span>{{items.create_uid.name}}</span><span style="margin-left:10px">{{changeDate(items.create_date) | date:\'MM-dd HH:mm\'}}</span>\n              </p>\n            </ion-col>\n            <ion-col col-3 tappable (click)="reply_to(items)">\n              <img src="assets/img/work_bench/feedback.png" class="reply_small_icon">\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n      <ion-item no-lines *ngIf="items.record_type == \'reply\'" style="margin-top:-5px">\n        <p text-wrap [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]"\n          class="">\n          <span>回复：</span><span style="color:#1f6699;" tappable (click)="clickUser(items.reply_uid)">{{"@" + items.reply_uid.name + " "}}</span><span>{{items.content}}</span>\n          <ion-grid *ngIf="items.record_images.length > 0" style="margin-top:-5px;margin-bottom:5px">\n            <ion-row style="margin-right:5px;">\n              <ion-col style="height:80px" *ngFor="let image of items.record_images" col-3>\n                <img style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" src={{image}} imageViewer/>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </p>\n\n      </ion-item>\n      <ion-item no-lines *ngIf="items.record_type == \'assign\'" style="height:20px;min-height:40px;margin-top:-5px">\n        <p [ngClass]="{true:\'content_message_zhipai\',false:\'content_message_zhipai_no_lines\'}[items.reply_record_line_ids.length > 0]"\n          class="">{{items.content}}</p>\n        <p *ngIf="items.reply_uid.name" [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]"\n          style="color:#1f6699" tappable (click)="clickUser(items.reply_uid)">{{"@" + items.reply_uid.name}}</p>\n        <p *ngIf="!items.reply_uid.name" [ngClass]="{true:\'content_message_empty\',false:\'content_message_empty_no_lines\'}[items.reply_record_line_ids.length > 0]">Empty</p>\n      </ion-item>\n      <ion-item no-lines *ngIf="items.record_type == \'check\'" style="height:20px;min-height:40px;margin-top:-5px">\n        <p [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]" class="">处理完成</p>\n      </ion-item>\n      <ion-item no-lines *ngIf="items.record_type == \'reject\'" style="height:20px;min-height:40px;margin-top:-5px">\n        <p [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]" class="">验收不通过</p>\n      </ion-item>\n      <ion-item no-lines *ngIf="items.record_type == \'finish\'" style="height:20px;min-height:40px;margin-top:-5px">\n        <p [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]" class="">验收通过</p>\n      </ion-item>\n      <ion-item no-lines *ngIf="items.record_type == \'draft\'" style="height:20px;min-height:40px;margin-top:-5px">\n        <p [ngClass]="{true:\'content_message\',false:\'content_message_no_lines\'}[items.reply_record_line_ids.length > 0]" class="">{{items.content}}</p>\n      </ion-item>\n      <ion-item no-lines *ngFor="let line of items.reply_record_line_ids;" [ngClass]="{true:\'item_class_image\',false:\'item_calss_one\'}[line.record_images.length > 0]">\n        <p [ngClass]="{true:\'item_class_image_p\',false:\'item_class_normal_p\'}[line.record_images.length > 0]">\n          <span style="color:#1f6699;" tappable (click)="clickUser(line.reply_uid)">{{line.create_uid.name + "：@" + line.reply_uid.name}} </span>\n          <span\n            style="color:8a9299">{{line.content}}</span>\n        </p>\n\n        <ion-grid *ngIf="line.record_images.length > 0">\n          <ion-row style="margin-right:5px;">\n            <ion-col style="height:80px" *ngFor="let image of line.record_images" col-3>\n              <img style="position:absolute;clip:rect(0px,70px,70px,0px);background-color:#f0f2f5" src={{image}} imageViewer/>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n\n      <!--<ion-item *ngIf="items.reply_record_line_ids.length > 0" no-lines class="item_divide">\n  </ion-item> -->\n    </div>\n  </ion-list>\n\n</ion-content>\n<ion-footer>\n  <div class="buttom_div">\n    <ion-grid style="width:100%;">\n      <ion-row class="row_class" align-items-center>\n        <ion-col *ngIf="isShowCheHui" tappable (click)="chehui()">\n          <div align="center">\n            <img [ngClass]="{true:\'bottom_img_ios\',false:\'bottom_img_md\'}[is_ios]" src="assets/img/work_bench/chehui.png"><br>\n            <p [ngClass]="{true:\'bottom_p_ios\',false:\'bottom_p_md\'}[is_ios]">撤回</p>\n          </div>\n        </ion-col>\n        <ion-col *ngIf="item.issue_state != \'draft\'" tappable (click)="replyClick()">\n          <div align="center">\n            <img [ngClass]="{true:\'bottom_img_ios\',false:\'bottom_img_md\'}[is_ios]" src="assets/img/work_bench/re_back.png"><br>\n            <p [ngClass]="{true:\'bottom_p_ios\',false:\'bottom_p_md\'}[is_ios]">回复</p>\n          </div>\n        </ion-col>\n        <ion-col *ngIf="isShowZhiPai" tappable (click)="zhipai()">\n          <div align="center">\n            <img [ngClass]="{true:\'bottom_img_ios\',false:\'bottom_img_md\'}[is_ios]" src="assets/img/work_bench/zhipai.png"><br>\n            <p [ngClass]="{true:\'bottom_p_ios\',false:\'bottom_p_md\'}[is_ios]">指派</p>\n          </div>\n        </ion-col>\n        <ion-col *ngIf="isShowConfirm" tappable (click)="confirm()">\n          <div align="center">\n            <img [ngClass]="{true:\'bottom_img_ios\',false:\'bottom_img_md\'}[is_ios]" src="assets/img/work_bench/ok_icon.png"><br>\n            <p [ngClass]="{true:\'bottom_p_ios\',false:\'bottom_p_md\'}[is_ios]">同意</p>\n          </div>\n        </ion-col>\n        <ion-col *ngIf="isShowRefuse" tappable (click)="refuse()">\n          <div align="center">\n            <img [ngClass]="{true:\'bottom_img_ios\',false:\'bottom_img_md\'}[is_ios]" src="assets/img/work_bench/refuse_icon.png"><br>\n            <p [ngClass]="{true:\'bottom_p_ios\',false:\'bottom_p_md\'}[is_ios]">拒绝</p>\n          </div>\n        </ion-col>\n        <ion-col *ngIf="isShowFinish" tappable (click)="finish()">\n          <div align="center">\n            <img [ngClass]="{true:\'bottom_img_ios\',false:\'bottom_img_md\'}[is_ios]" src="assets/img/work_bench/finish.png"><br>\n            <p [ngClass]="{true:\'bottom_p_ios\',false:\'bottom_p_md\'}[is_ios]">处理完成</p>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-footer>'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-detail/gongdan-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__gongdanService__["a" /* GongDanService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__gongdanService__["a" /* GongDanService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
], GongdanDetailPage);

//# sourceMappingURL=gongdan-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-detail/gongdan-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GongdanDetailPageModule", function() { return GongdanDetailPageModule; });
/* harmony import */ var gongdan_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var gongdan_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer_dist_es2015_src_module__ = __webpack_require__(244);
var gongdan_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GongdanDetailPageModule = (function () {
    function GongdanDetailPageModule() {
    }
    return GongdanDetailPageModule;
}());
GongdanDetailPageModule = gongdan_detail_module___decorate([
    gongdan_detail_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            GongdanDetailPage,
        ],
        imports: [
            gongdan_detail_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(GongdanDetailPage), __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer_dist_es2015_src_module__["a" /* IonicImageViewerModule */]
        ],
    })
], GongdanDetailPageModule);

//# sourceMappingURL=gongdan-detail.module.js.map

/***/ }),

/***/ 740:
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
//# sourceMappingURL=85.js.map