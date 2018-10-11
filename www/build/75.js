webpackJsonp([75],{

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/write-journal/write-journal.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_action_sheet_action_sheet_controller__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__writejournalService__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the WriteJournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WriteJournalPage = (function () {
    function WriteJournalPage(navCtrl, navParams, statusBar, actionSheetCtrl, toastCtrl, writeService, storage, alertCtrl, platform, nativeService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.writeService = writeService;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.nativeService = nativeService;
        this.timeStarts = '12:00'; //开始时间
        this.timeEnds = '12:00'; //结束时间
        this.visitArm = '请选择'; //拜访目的
        this.isFirst = true;
        this.isSecond = false;
        this.imgList = [];
        this.pushImgList = [];
        this.isDeletePicture = false;
        this.stateOperate = '下一步';
        this.title = '填客户资料';
        // this.team = this.navParams.get("team")
        this.frontPage = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].getViewController("JournalSheetPage", navCtrl);
        this.storage.get('user')
            .then(function (res) {
            _this.name = res.result.res_data.name;
            _this.user_id = res.result.res_data.user_id;
            if (res.result.res_data.team) {
                _this.saleTeam = res.result.res_data.team.team_name;
                if (res.result.res_data.team.team_id) {
                    _this.team_id = res.result.res_data.team.team_id;
                }
            }
            else {
                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom('没有所属的销售团队！', _this.toastCtrl);
            }
            console.log("saleTeam= " + _this.saleTeam);
        });
        this.month = __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].dateFormat(new Date(), 'yyyy-MM-dd');
    }
    WriteJournalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WriteJournalPage');
    };
    WriteJournalPage.prototype.ionViewWillEnter = function () {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.isDeletePicture = this.navParams.get('isDeletePicture');
        console.log(this.isDeletePicture);
        if (this.isDeletePicture) {
            this.navParams.data.isDeletePicture = false;
            this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1);
            this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]), 1);
        }
    };
    WriteJournalPage.prototype.goBack = function () {
        var _this = this;
        if (this.isSecond) {
            this.stateOperate = '下一步';
            this.isFirst = true;
            this.isSecond = false;
            this.title = '填客户资料';
        }
        else {
            if (this.companyName || this.companyAddress || this.companyFrom ||
                this.visitPhone || this.visitLink || this.visitObject) {
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
            else {
                this.statusBar.backgroundColorByHexString("#f8f8f8");
                this.statusBar.styleDefault();
                this.navCtrl.pop();
            }
        }
    };
    WriteJournalPage.prototype.selectArm = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '拜访目的',
            buttons: [
                {
                    text: '初次拜访',
                    handler: function () {
                        _this.visitArm = "初次拜访";
                    }
                },
                {
                    text: '维护客户',
                    handler: function () {
                        _this.visitArm = "维护客户";
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
    WriteJournalPage.prototype.clickPicture = function (item) {
        this.deletePicture = item;
        console.log("this.deletePicture = " + this.deletePicture);
        this.navCtrl.push("NewDeletePage", { item: item, need_back_write: true });
    };
    WriteJournalPage.prototype.addImg = function () {
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
    WriteJournalPage.prototype.getPicture = function (type) {
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
    WriteJournalPage.prototype.getPictureSuccess = function (img_url) {
        console.log(img_url);
        this.imgList.push(img_url);
        this.pushImgList.push(img_url.split(",")[1]);
    };
    WriteJournalPage.prototype.commite = function () {
        var _this = this;
        if (this.isFirst) {
            var myString = "";
            if (!this.saleTeam) {
                myString = "   请选择销售团队";
            }
            if (!this.companyName) {
                myString = "   请输入客户名称";
            }
            if (!this.companyAddress) {
                myString = "   请输入客户地址";
            }
            if (!this.companyFrom) {
                myString = "   请输入客户渠道";
            }
            if (!this.timeStarts) {
                myString = "   请选择开始时间";
            }
            if (!this.timeEnds) {
                myString = "   请选择结束时间";
            }
            if (!this.visitObject) {
                myString = "   请输入拜访对象";
            }
            // if(!this.visitPhone){
            //   myString = "   请输入客户电话"
            // }
            // if(!this.visitLink){
            //   myString = "   请输入QQ/Email"
            // }
            // if(!this.visitState){
            //   myString = "   请输入客户状态"
            // }
            if (!this.visitArm || this.visitArm == '请选择') {
                myString = "   请选择拜访目的";
            }
            if (this.timeStarts && this.timeEnds) {
                if (this.month > __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].dateFormat(new Date(), 'yyyy-MM-dd')) {
                    __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom('拜访日期不可超过今天！', this.toastCtrl);
                    return;
                }
                else {
                    this.timeOne = this.month + " " + this.timeStarts;
                    this.timeTwo = this.month + " " + this.timeEnds;
                    if (new Date(this.timeOne.replace(/-/g, "/")).getTime() >= new Date(this.timeTwo.replace(/-/g, "/")).getTime()) {
                        __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom('开始时间不能比结束时间晚！', this.toastCtrl);
                        return;
                    }
                }
            }
            if (myString != "") {
                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom(myString, this.toastCtrl);
            }
            else {
                this.stateOperate = '提交';
                this.isFirst = false;
                this.isSecond = true;
                this.title = '总结';
            }
        }
        else if (this.isSecond) {
            var myString = "";
            if (!this.contentChat) {
                myString = myString + "   请输入沟通内容";
            }
            if (!this.sumChat) {
                myString = myString + "   请输入总结";
            }
            if (myString != "") {
                __WEBPACK_IMPORTED_MODULE_5__providers_Utils__["a" /* Utils */].toastButtom(myString, this.toastCtrl);
            }
            else {
                // this.timeOne = Utils.dateFormat(new Date(this.timeOne), 'yyyy-MM-dd HH:MM:SS')
                // this.timeTwo = Utils.dateFormat(new Date(this.timeTwo), 'yyyy-MM-dd HH:MM:SS')
                var body = {
                    uid: this.user_id,
                    name: this.name,
                    team: this.saleTeam,
                    team_id: this.team_id,
                    partner_name: this.companyName,
                    partner_address: this.companyAddress,
                    partner_channel: this.companyFrom,
                    visit_date_begin: this.timeOne,
                    visit_date_end: this.timeTwo,
                    visit_name: this.visitObject,
                    partner_phone: this.visitPhone,
                    partner_contact_way: this.visitLink,
                    // partner_state: this.visitState,
                    visit_target: this.visitArm,
                    content_description: this.contentChat,
                    summary: this.sumChat,
                    imageList: this.pushImgList
                };
                this.writeService.create_visit_journal(body).then(function (res) {
                    res.res_data;
                    if (res.result.res_code == 1 && res.result) {
                        console.log(res);
                        _this.navCtrl.popTo(_this.frontPage);
                    }
                });
            }
        }
    };
    WriteJournalPage.prototype.selectTeam = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '销售团队',
            buttons: [
                {
                    text: '跨境电商',
                    handler: function () {
                        _this.saleTeam = "跨境电商";
                    }
                },
                {
                    text: '国内市场',
                    handler: function () {
                        _this.saleTeam = "国内市场";
                    }
                },
                {
                    text: '国内线上电商',
                    handler: function () {
                        _this.saleTeam = "国内线上电商";
                    }
                },
                {
                    text: '国内线下销售',
                    handler: function () {
                        _this.saleTeam = "国内线下销售";
                    }
                },
                {
                    text: '国外OEM业务部',
                    handler: function () {
                        _this.saleTeam = "国外OEM业务部";
                    }
                },
                {
                    text: '国外品牌业务部',
                    handler: function () {
                        _this.saleTeam = "国外品牌业务部";
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
        // actionSheet.addButton({
        //   text: 'zouwansheng',
        //       handler: () => {
        //         this.saleTeam = "zouwansheng"
        //       }
        // })
        actionSheet.present();
    };
    return WriteJournalPage;
}());
WriteJournalPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-write-journal',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/write-journal/write-journal.html"*/'<!--\n  Generated template for the WriteJournalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n      <ion-buttons left>\n          <button ion-button icon-only (click)="goBack()">\n            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div style="height:40px;border-bottom:#dedede 1px solid;" align="center" >\n        <ion-grid class="gridDiy">\n            <ion-row style="text-align:center;">\n              <ion-col width-33 style="display:flex; align-items:center">\n                  <p text-wrap style="font-size:12px;line-height:12px;margin-left:20px;text-align:center;width:100%"\n                  [ngClass]="{true:\'textcolor1\',false:\'textcolor_normal\'}[isFirst]">1.填客户资料</p>\n              </ion-col>\n              <ion-col width-34 row-center style="display:flex; align-items:center">\n                      <img src="assets/img/journal_sheet/right_arrow.png" style="width:20px;height:20px;margin-left:calc(50% - 10px)">\n                  </ion-col>\n              <ion-col width-33 style="display:flex; align-items:center">\n                  <p text-wrap style="font-size:12px;line-height:12px;;margin-left:20px;text-align:center;width:100%"\n                  [ngClass]="{true:\'textcolor1\',false:\'textcolor_normal\'}[isSecond]">2.总结</p>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n    </div>\n  <div *ngIf="isFirst">\n    <!--<div style="background:#fffced;padding:1px">\n      <p style="font-size:10px;color:#fa7d3e;margin-left:15px;">* 以下信息均为必填项</p>\n    </div>-->\n    <ion-item-group>\n        <ion-item>\n            <ion-label style="color:#2e3133;font-size:14px">表格记录人</ion-label>\n            <ion-note item-end style="color:#5C6166;font-size:12px">{{name}}</ion-note>\n        </ion-item>\n        <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">销售团队</ion-label>\n                <ion-note item-end style="color:#5C6166;font-size:12px" >{{saleTeam}}</ion-note>\n        </ion-item>\n        <!-- <button ion-item (click)="selectTeam()">\n            <ion-label style="color:#2e3133;font-size:14px">销售团队</ion-label>\n            <ion-note item-end style="color:#c2c6cc;font-size:12px" >{{saleTeam}}</ion-note>\n        </button> -->\n        <ion-item>\n            <ion-label style="color:#2e3133;font-size:14px">客户名称</ion-label>\n            <ion-input item-end type="text" text-right [(ngModel)]="companyName" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入公司名称"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label style="color:#2e3133;font-size:14px">客户地址</ion-label>\n            <ion-input item-end type="text" text-right [(ngModel)]="companyAddress" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label style="color:#2e3133;font-size:14px">客户渠道</ion-label>\n            <ion-input item-end type="text"  text-right [(ngModel)]="companyFrom" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入"></ion-input>\n        </ion-item>\n    </ion-item-group>\n        <div style="background:#f0f2f5;height:10px"></div>\n        <ion-item-group>\n            <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">拜访日期</ion-label>\n                <ion-datetime cancelText="取消" doneText="确定" min="2017" max="2088" placeholder="2018-01-01" style="color:#5C6166;font-size:12px;margin-right:-6px" displayFormat="YYYY-MM-DD" [(ngModel)]="month"></ion-datetime>\n                <img item-end src="assets/img/journal_sheet/right_icon.png" style="height:10px;margin-right:-4px">\n            </ion-item>\n            <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">开始时间</ion-label>\n                <ion-datetime cancelText="取消" doneText="确定" placeholder="请选择" [(ngModel)]="timeStarts"\n                 style="color:#5C6166;font-size:12px;margin-right:-6px" displayFormat="HH:mm" pickerFormat="HH mm"></ion-datetime>\n                 <img item-end src="assets/img/journal_sheet/right_icon.png" style="height:10px;margin-right:-4px">\n            </ion-item>\n            <ion-item>\n                  <ion-label style="color:#2e3133;font-size:14px">结束时间</ion-label>\n                  <ion-datetime cancelText="取消" doneText="确定" placeholder="请选择"\n                   style="color:#5C6166;font-size:12px;margin-right:-6px" displayFormat="HH:mm" pickerFormat="HH mm" [(ngModel)]="timeEnds"></ion-datetime>\n                   <img item-end src="assets/img/journal_sheet/right_icon.png" style="height:10px;margin-right:-4px">\n            </ion-item>\n        </ion-item-group>\n        <div style="background:#f0f2f5;height:10px"></div>\n        <ion-item-group>\n            <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">拜访对象</ion-label>\n                <ion-input item-end type="text" text-right [(ngModel)]="visitObject" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入姓名"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">客户电话</ion-label><ion-label style="font-size:14px;color:#919599">(选填)</ion-label>\n                <ion-input item-end type="tel" text-right [(ngModel)]="visitPhone" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">QQ/Email</ion-label><ion-label style="font-size:14px;color:#919599">(选填)</ion-label>\n                <ion-input item-end type="text" text-right [(ngModel)]="visitLink" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入"></ion-input>\n            </ion-item>\n            <!--<ion-item>\n                <ion-label style="color:#2e3133;font-size:14px">客户状态</ion-label>\n                <ion-input item-end type="text" text-right [(ngModel)]="visitState" style="color:#5C6166;font-size:12px;margin-right:-2px" placeholder="请输入"></ion-input>\n            </ion-item>-->\n            <ion-item tappable (click)="selectArm()">\n                <ion-label style="color:#2e3133;font-size:14px">拜访目的</ion-label>\n                <ion-note item-end style="color:#1897f2;font-size:12px;">{{visitArm}}</ion-note>\n                <img item-end src="assets/img/journal_sheet/right_icon.png" style="height:10px;margin-right:-2px">\n            </ion-item>\n        </ion-item-group>\n        <div style="background:#f0f2f5;height:10px"></div>\n        <ion-item-group>\n          <ion-item>\n              <ion-label style="color:#2e3133;font-size:14px">客户名片照片</ion-label>\n          </ion-item>\n        </ion-item-group>\n        <ion-grid>\n            <ion-row>\n                <ion-col col-4  style="position:relative;height:106px;margin-top:5px" *ngFor="let item of imgList" on-hold="onHold()" (click)="clickPicture(item)">     \n                  <img src={{item}} style="position:absolute;\n                clip:rect(0px,106px,106px,0px);" />\n                </ion-col>\n              <ion-col col-4 tappable (click)="addImg()" style="margin-top:5px">\n                <img src="assets/img/add.png" />\n              </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n    <div *ngIf="isSecond">\n        <div style="background:#f0f2f5;height:1px"></div>\n        <ion-item-group>\n            <ion-item>\n                <ion-label style="color:#2e3133;font-size:14px;margin-left:10px">客户沟通内容</ion-label>\n            </ion-item>\n            <ion-item>\n                <ion-textarea rows="8" style="color:#999999;font-size:12px;" text-wrap  placeholder=\'输入客户沟通内容\' [(ngModel)]="contentChat" class=\'area_class\'>\n                </ion-textarea>\n              </ion-item>\n          </ion-item-group>\n          <div style="background:#f0f2f5;height:10px"></div>\n          <ion-item-group>\n              <ion-item>\n                  <ion-label style="color:#2e3133;font-size:14px;margin-left:10px">总结</ion-label>\n              </ion-item>\n              <ion-item>\n                  <ion-textarea rows="8" text-wrap  style="color:#999999;font-size:12px;" placeholder=\'销售对该客户的总结和需要解决的问题\' [(ngModel)]="sumChat" class=\'area_class\'>\n                  </ion-textarea>\n                </ion-item>\n            </ion-item-group>\n    </div>\n</ion-content>\n\n\n<ion-footer>\n    <button ion-button tappable full (click)="commite()">{{stateOperate}}</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/journal-sheet/write-journal/write-journal.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_7__writejournalService__["a" /* WriteJournalService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_action_sheet_action_sheet_controller__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_7__writejournalService__["a" /* WriteJournalService */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */]])
], WriteJournalPage);

//# sourceMappingURL=write-journal.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/journal-sheet/write-journal/write-journal.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WriteJournalPageModule", function() { return WriteJournalPageModule; });
/* harmony import */ var write_journal_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var write_journal_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var write_journal_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WriteJournalPageModule = (function () {
    function WriteJournalPageModule() {
    }
    return WriteJournalPageModule;
}());
WriteJournalPageModule = write_journal_module___decorate([
    write_journal_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            WriteJournalPage,
        ],
        imports: [
            write_journal_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(WriteJournalPage),
        ],
    })
], WriteJournalPageModule);

//# sourceMappingURL=write-journal.module.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WriteJournalService; });
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


var WriteJournalService = (function () {
    function WriteJournalService(httpservice) {
        this.httpservice = httpservice;
    }
    //创建拜访记录
    WriteJournalService.prototype.create_visit_journal = function (body) {
        return this.httpservice.postBody("create_visit", body);
    };
    //获取拜访列表
    WriteJournalService.prototype.get_visit_list = function (body) {
        return this.httpservice.postBody("get_visit_list", body);
    };
    //获取管理的销售团队
    WriteJournalService.prototype.get_sale_team = function (uid) {
        var body = JSON.stringify({
            uid: uid
        });
        return this.httpservice.postBody("get_sale_team", body);
    };
    //获取所有的销售团队
    WriteJournalService.prototype.get_all_sale_team = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_sale_team", body);
    };
    //获取团队的销售员
    WriteJournalService.prototype.get_saleteam_person = function (body) {
        return this.httpservice.postBody("get_saleteam_person", body);
    };
    return WriteJournalService;
}());
WriteJournalService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], WriteJournalService);

//# sourceMappingURL=writejournalService.js.map

/***/ })

});
//# sourceMappingURL=75.js.map