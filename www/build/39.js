webpackJsonp([39],{

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/edit-card/edit-card.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__choose_ChooseService__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the EditCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditCardPage = (function () {
    function EditCardPage(navCtrl, navParams, alertCtrl, chooseService, contacts, platform, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.chooseService = chooseService;
        this.contacts = contacts;
        this.platform = platform;
        this.storage = storage;
        this.camPage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController("CamCardPage", navCtrl);
        this.item = this.navParams.get('item');
        this.index = this.navParams.get('index');
        this.index_group = this.navParams.get('index_group');
        this.sourceArr = this.navParams.get('sourceArr');
        this.reloadView();
        // this.scrollElement._scrollContent.nativeElement.onscroll = event =>{
        //   alert(1);
        // }
    }
    EditCardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditCardPage');
    };
    EditCardPage.prototype.ionViewDidEnter = function () {
        this.reloadView();
    };
    EditCardPage.prototype.ionViewWillLeave = function () {
        cordova.plugins.Keyboard.close();
    };
    EditCardPage.prototype.clickCountry = function () {
        this.saveInput();
        this.navCtrl.push('ChoosePage', {
            items: this.item,
            type: 'country',
        });
    };
    EditCardPage.prototype.clickSource = function () {
        this.saveInput();
        this.navCtrl.push('ChoosePage', {
            items: this.item,
            type: 'source',
        });
    };
    EditCardPage.prototype.clickComefrom = function () {
        this.saveInput();
        this.navCtrl.push('ChoosePage', {
            items: this.item,
            type: 'comefrom',
        });
    };
    EditCardPage.prototype.clickSeries = function () {
        this.saveInput();
        this.navCtrl.push('ProductlistPage', {
            items: this.item,
        });
    };
    EditCardPage.prototype.clickBiaoQian = function () {
        this.saveInput();
        this.navCtrl.push('BiaoQianPage', {
            items: this.item,
        });
    };
    EditCardPage.prototype.clickType = function () {
        this.saveInput();
        this.navCtrl.push('ChoosePage', {
            items: this.item,
            type: 'type',
        });
    };
    EditCardPage.prototype.clickTeam = function () {
        this.saveInput();
        this.navCtrl.push('ChoosePage', {
            items: this.item,
            type: 'team',
        });
    };
    EditCardPage.prototype.clicksaleman = function () {
        this.saveInput();
        this.navCtrl.push('ChoosePage', {
            items: this.item,
            type: 'saleman',
        });
    };
    EditCardPage.prototype.reloadView = function () {
        this.cardName = this.item.displayName;
        this.webName = this.item.web_site;
        this.telephoneName = this.item.all_phonenumers;
        this.departmentName = this.item.departmentName;
        this.emailName = this.item.email;
        this.addressName = this.item.address;
        this.companyName = this.item.companyName;
        this.commentText = this.item.comment;
        this.salePersonName = this.item.sale_person ? this.item.sale_person : "请选择 >";
        this.saleTeamName = this.item.sale_team ? this.item.sale_team : "请选择 >";
        this.typeName = this.item.type ? this.item.type : "请选择 >";
        // console.log(this.item.country_name )
        if (this.item.country_name) {
            this.countryName = this.item.country_name;
        }
        else {
            this.countryName = "请选择 >";
        }
        if (this.item.source_name) {
            this.sourceName = this.item.source_name;
        }
        else {
            this.sourceName = "请选择 >";
        }
        if (this.item.series_ids.length > 0) {
            var index = 0;
            var name_1 = '';
            for (var item_pro in this.item.series_names) {
                if (name_1 != '') {
                    name_1 = name_1 + ',' + this.item.series_names[index];
                }
                else {
                    name_1 = this.item.series_names[index];
                }
                index++;
            }
            this.productNames = name_1;
        }
        else {
            this.productNames = "请选择 >";
        }
        if (this.item.partner_type) {
            if (this.item.partner_type == "customer") {
                this.biaoqianName = "客户";
            }
            else {
                this.biaoqianName = "供应商";
            }
        }
        else {
            this.biaoqianName = " ";
        }
        if (this.item.partner_lv) {
            this.biaoqianName = this.biaoqianName + " " + "客户级别:" + this.item.partner_lv;
        }
        if (this.item.star_cnt) {
            this.biaoqianName = this.biaoqianName + " " + "星级:" + this.item.star_cnt;
        }
        if (!this.item.star_cnt && !this.item.partner_lv && !this.item.partner_type) {
            this.biaoqianName = "请选择 >";
        }
        this.seriesName = this.item.series_name ? this.item.series_name : "请选择 >";
        // this.sourceName = this.item.source_name ? this.item.source_name : "请选择 >";
        // this.seriesName = this.item.series_ids[0] ? this.item.series_ids[0] : "请选择 >";
    };
    EditCardPage.prototype.save_camcard = function () {
        var self = this;
        this.item.displayName = this.cardName;
        this.item.web_site = this.webName;
        this.item.phoneNumber = this.telephoneName;
        this.item.departmentName = this.departmentName;
        this.item.email = this.emailName;
        this.item.address = this.addressName;
        this.item.companyName = this.companyName;
        this.item.comment = this.commentText;
        if (this.item.companyName) {
            if (this.item.companyName.length > 0) {
                this.sourceArr[this.index_group].value[this.index] = this.item;
                self.camPage.formatContacts = this.sourceArr;
                self.navCtrl.popTo(self.camPage);
            }
            else {
                this.alertCtrl.create({
                    title: '提示',
                    subTitle: '请输入公司名',
                    buttons: [
                        {
                            text: '确定',
                        }
                    ]
                }).present();
            }
        }
        else {
            this.alertCtrl.create({
                title: '提示',
                subTitle: '请输入公司名',
                buttons: [
                    {
                        text: '确定',
                    }
                ]
            }).present();
        }
    };
    EditCardPage.prototype.saveInput = function () {
        this.item.displayName = this.cardName;
        this.item.web_site = this.webName;
        this.item.phoneNumber = this.telephoneName;
        this.item.departmentName = this.departmentName;
        this.item.email = this.emailName;
        this.item.address = this.addressName;
        this.item.companyName = this.companyName;
        this.item.comment = this.commentText;
    };
    EditCardPage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    EditCardPage.prototype.drag = function () {
        alert(1);
    };
    EditCardPage.prototype.goBack = function () {
        // this.alertCtrl.create({
        //               title: '升级',
        //               subTitle: '发现新版本,是否立即升级？',
        //               buttons: [{ text: '取消' },
        //              {
        //                 text: '确定',
        //                 handler: () => {
        //                   this.openUrlByBrowser('http://fir.im/MyOa');
        //              }
        //          }
        //   ]
        // }).present();
    };
    EditCardPage.prototype.upload = function () {
        var _this = this;
        this.saveInput();
        if (this.item.companyName) {
            this.chooseService.add_partners([this.item]).then(function (res) {
                if (res.result) {
                    _this.alertCtrl.create({
                        title: '提示',
                        subTitle: '导入成功',
                        buttons: [
                            {
                                text: '确定',
                                handler: function () {
                                    var options = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["a" /* ContactFindOptions */]();
                                    var fields;
                                    fields = ["displayName", "phoneNumbers"];
                                    options.filter = "";
                                    options.multiple = true;
                                    options.hasPhoneNumber = true;
                                    var list = [];
                                    _this.contacts.find(fields, options).then(function (result) {
                                        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                                            var contact = result_1[_i];
                                            // if (contact.organizations){
                                            console.log(contact);
                                            if (contact.id == _this.item.id) {
                                                contact.remove();
                                                _this.camPage.data.need_fresh = true;
                                                _this.navCtrl.popTo(_this.camPage);
                                            }
                                        }
                                    });
                                }
                            }
                        ]
                    }).present();
                    //  this.cd.detectChanges();
                }
                else {
                    if (res.error) {
                        _this.alertCtrl.create({
                            title: '提示',
                            subTitle: res.error.data.message,
                            buttons: [
                                {
                                    text: '确定',
                                    handler: function () {
                                    }
                                }
                            ]
                        }).present();
                    }
                }
            });
        }
        else {
            this.alertCtrl.create({
                title: '提示',
                subTitle: '请确保选择导入的名片的公司名填写',
                buttons: [
                    {
                        text: '确定',
                    }
                ]
            }).present();
        }
    };
    return EditCardPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('scroll'),
    __metadata("design:type", Object)
], EditCardPage.prototype, "scrollElement", void 0);
EditCardPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-edit-card',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/edit-card/edit-card.html"*/'<!--\n  Generated template for the EditCardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <!--<ion-buttons \nleft>\n\n      <button \nion-button icon-only (click)="goBack()">\n\n        <ion-icon \nios="ios-arrow-back" \nmd="md-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>-->\n  <ion-navbar color="gongdan-color">\n    <ion-title>编辑客户</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="save_camcard()">\n        <p>保存</p>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content (pan)="panEvent($event)">\n  <!--<ion-scroll scrollY = "true" #scroll>-->\n  <ion-item-group>\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">公司</ion-label>\n      <ion-textarea item-end class="input_class" [(ngModel)]="companyName" text-right></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">网址</ion-label>\n      <ion-input item-end text-wrap class="input_class" [(ngModel)]="webName" text-right></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label  class="label_class">国家</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clickCountry()\' style="margin-right:15px;" class="text_class">{{countryName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="label_class">来源</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clickSource()\' style="margin-right:15px;" class="text_class">{{seriesName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="label_class">渠道</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clickComefrom()\' style="margin-right:15px;" class="text_class">{{sourceName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="label_class">销售团队</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clickTeam()\' style="margin-right:15px;" class="text_class">{{saleTeamName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="label_class">销售员</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clicksaleman()\' style="margin-right:15px;" class="text_class">{{salePersonName}}</ion-label>\n    </ion-item>\n      <ion-item>\n      <ion-label class="label_class">标签</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clickBiaoQian()\'  style="margin-right:15px;" class="text_class">{{biaoqianName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="label_class">感兴趣的产品</ion-label>\n      <ion-label item-end text-wrap tappable (click) = \'clickSeries()\' style="margin-right:15px;" class="text_class">{{productNames}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="label_class">内部备注</ion-label>\n      <ion-textarea item-end class="input_class" [(ngModel)]="commentText" text-right></ion-textarea>\n    </ion-item>\n  </ion-item-group>\n\n  <ion-item-group >\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-item>\n      <ion-label class="label_class">联系人类型</ion-label>\n      <ion-label text-wrap style="margin-right:15px;" tappable (click) = \'clickType()\' item-end class="text_class">{{typeName}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">姓名</ion-label>\n      <ion-input item-end text-wrap class="input_class" [(ngModel)]="cardName" text-right></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">电话</ion-label>\n      <!--<ion-input item-end text-wrap class="input_class" [(ngModel)]="telephoneName" text-right></ion-input>-->\n            <ion-label item-end text-wrap  style="margin-right:15px;" class="text_class">{{telephoneName}}</ion-label>\n\n    </ion-item>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">工作岗位</ion-label>\n      <ion-input item-end class="input_class" [(ngModel)]="departmentName" text-right></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">Email</ion-label>\n      <ion-input item-end class="input_class" [(ngModel)]="emailName" text-right></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label style="color:black" class="label_class">地址</ion-label>\n      <ion-textarea item-end class="input_class" [(ngModel)]="addressName" text-right></ion-textarea>\n    </ion-item>\n  </ion-item-group>\n  <!--</ion-scroll>-->\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n      <button ion-button full tappable (click)=\'upload()\'> 导入 </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/edit-card/edit-card.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__choose_ChooseService__["a" /* ChooseService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["b" /* Contacts */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__choose_ChooseService__["a" /* ChooseService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["b" /* Contacts */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["z" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], EditCardPage);

//# sourceMappingURL=edit-card.js.map
// CONCATENATED MODULE: ./src/pages/customer/edit-card/edit-card.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCardPageModule", function() { return EditCardPageModule; });
/* harmony import */ var edit_card_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var edit_card_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var edit_card_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EditCardPageModule = (function () {
    function EditCardPageModule() {
    }
    return EditCardPageModule;
}());
EditCardPageModule = edit_card_module___decorate([
    edit_card_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EditCardPage,
        ],
        imports: [
            edit_card_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EditCardPage),
        ],
        exports: [
            EditCardPage
        ]
    })
], EditCardPageModule);

//# sourceMappingURL=edit-card.module.js.map

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseService; });
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


var ChooseService = (function () {
    function ChooseService(httpservice) {
        this.httpservice = httpservice;
    }
    ChooseService.prototype.add_partners = function (items) {
        var arr = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var obj = {
                company_name: '',
                company_id: '',
                saleman_id: '',
                saleteam_id: '',
                country_id: '',
                crm_source_id: '',
                source_id: '',
                tag_list: '',
                partner_type: '',
                star_cnt: '',
                series_ids: [],
                members: [],
                partner_lv: '',
                website: '',
                comment: '',
                user_id: '',
            };
            var member = {
                name: '',
                phone: '',
                email: '',
                street: '',
                type: '',
                job_title: '',
            };
            member.name = item.displayName;
            member.email = item.email;
            member.phone = item.phoneNumber;
            member.street = item.address;
            member.type = this.exchangeType(item.type);
            member.job_title = item.departmentName;
            obj.company_id = item.company_id;
            obj.website = item.web_site;
            obj.saleman_id = item.saleman_id;
            obj.company_name = item.companyName;
            obj.saleteam_id = item.saleteam_id;
            obj.country_id = item.country_id;
            obj.crm_source_id = item.crm_source_id;
            obj.source_id = item.source_id;
            obj.tag_list = item.tag_list;
            obj.partner_type = item.partner_type;
            obj.star_cnt = item.star_cnt;
            obj.series_ids = item.series_ids;
            obj.members = [member];
            obj.partner_lv = item.partner_lv;
            obj.comment = item.comment;
            obj.user_id = item.user_id;
            arr.push(obj);
            console.log(obj);
        }
        var body = JSON.stringify({
            partners: arr,
        });
        return this.httpservice.postBody("add_partners", body);
    };
    //销售员
    ChooseService.prototype.get_saleman_list = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_saleman_list", body);
    };
    //销售团队
    ChooseService.prototype.get_saleteam_list = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_saleteam_list", body);
    };
    //类型
    ChooseService.prototype.get_partner_tag_list = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_partner_tag_list", body);
    };
    //感兴趣的产品
    ChooseService.prototype.get_product_series = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_product_series", body);
    };
    //国家
    ChooseService.prototype.get_countries = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_countries", body);
    };
    //来源
    ChooseService.prototype.get_origins = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_origins", body);
    };
    //渠道
    ChooseService.prototype.get_sources = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_sources", body);
    };
    ChooseService.prototype.exchangeType = function (type) {
        if (type == "联系人") {
            return "contact";
        }
        else if (type == "开票地址") {
            return "invoice";
        }
        else if (type == "送货地址") {
            return "delivery";
        }
        else if (type == "其他地址") {
            return "other";
        }
    };
    return ChooseService;
}());
ChooseService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ChooseService);

//# sourceMappingURL=ChooseService.js.map

/***/ }),

/***/ 895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Contact */
/* unused harmony export ContactName */
/* unused harmony export ContactField */
/* unused harmony export ContactAddress */
/* unused harmony export ContactOrganization */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactFindOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Contacts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @hidden
 */
var Contact = (function () {
    function Contact() {
        if (__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["i" /* checkAvailability */]('navigator.contacts', 'create', 'Contacts') === true) {
            this._objectInstance = navigator.contacts.create();
        }
    }
    Contact.prototype.clone = function () {
        var newContact = new Contact();
        for (var prop in this) {
            if (prop === 'id')
                return;
            newContact[prop] = this[prop];
        }
        return newContact;
    };
    Contact.prototype.remove = function () { return; };
    Contact.prototype.save = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["j" /* getPromise */](function (resolve, reject) {
            _this._objectInstance.save(function (contact) {
                _this._objectInstance = contact;
                resolve(_this);
            }, reject);
        });
    };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", String)
    ], Contact.prototype, "id", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", String)
    ], Contact.prototype, "displayName", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Object)
    ], Contact.prototype, "name", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", String)
    ], Contact.prototype, "nickname", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "phoneNumbers", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "emails", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "addresses", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "ims", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "organizations", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Date)
    ], Contact.prototype, "birthday", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", String)
    ], Contact.prototype, "note", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "photos", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "categories", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["f" /* InstanceProperty */],
        __metadata("design:type", Array)
    ], Contact.prototype, "urls", void 0);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["e" /* InstanceCheck */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Contact)
    ], Contact.prototype, "clone", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["c" /* CordovaInstance */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Contact.prototype, "remove", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["e" /* InstanceCheck */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Contact.prototype, "save", null);
    return Contact;
}());

/**
 * @hidden
 */
var ContactName = (function () {
    function ContactName(formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix) {
        this.formatted = formatted;
        this.familyName = familyName;
        this.givenName = givenName;
        this.middleName = middleName;
        this.honorificPrefix = honorificPrefix;
        this.honorificSuffix = honorificSuffix;
    }
    return ContactName;
}());

/**
 * @hidden
 */
var ContactField = (function () {
    function ContactField(type, value, pref) {
        this.type = type;
        this.value = value;
        this.pref = pref;
    }
    return ContactField;
}());

/**
 * @hidden
 */
var ContactAddress = (function () {
    function ContactAddress(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
        this.pref = pref;
        this.type = type;
        this.formatted = formatted;
        this.streetAddress = streetAddress;
        this.locality = locality;
        this.region = region;
        this.postalCode = postalCode;
        this.country = country;
    }
    return ContactAddress;
}());

/**
 * @hidden
 */
var ContactOrganization = (function () {
    function ContactOrganization(type, name, department, title, pref) {
        this.type = type;
        this.name = name;
        this.department = department;
        this.title = title;
        this.pref = pref;
    }
    return ContactOrganization;
}());

/**
 * @hidden
 */
var ContactFindOptions = (function () {
    function ContactFindOptions(filter, multiple, desiredFields, hasPhoneNumber) {
        this.filter = filter;
        this.multiple = multiple;
        this.desiredFields = desiredFields;
        this.hasPhoneNumber = hasPhoneNumber;
    }
    return ContactFindOptions;
}());

/**
 * @name Contacts
 * @description
 * Access and manage Contacts on the device.
 *
 * @usage
 *
 * ```typescript
 * import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
 *
 * constructor(private contacts: Contacts) { }
 *
 * let contact: Contact = this.contacts.create();
 *
 * contact.name = new ContactName(null, 'Smith', 'John');
 * contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
 * contact.save().then(
 *   () => console.log('Contact saved!', contact),
 *   (error: any) => console.error('Error saving contact.', error)
 * );
 *
 * ```
 * @classes
 * Contact
 * @interfaces
 * IContactProperties
 * IContactError
 * IContactName
 * IContactField
 * IContactAddress
 * IContactOrganization
 * IContactFindOptions
 */
var Contacts = (function (_super) {
    __extends(Contacts, _super);
    function Contacts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a single contact.
     * @returns {Contact} Returns a Contact object
     */
    Contacts.prototype.create = function () {
        return new Contact();
    };
    /**
     * Search for contacts in the Contacts list.
     * @param fields {ContactFieldType[]}  Contact fields to be used as a search qualifier
     * @param options {IContactFindOptions} Optional options for the query
     * @returns {Promise<Contact[]>} Returns a Promise that resolves with the search results (an array of Contact objects)
     */
    Contacts.prototype.find = function (fields, options) {
        return __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["j" /* getPromise */](function (resolve, reject) {
            navigator.contacts.find(fields, function (contacts) {
                resolve(contacts.map(processContact));
            }, reject, options);
        });
    };
    /**
     * Select a single Contact.
     * @returns {Promise<Contact>} Returns a Promise that resolves with the selected Contact
     */
    Contacts.prototype.pickContact = function () {
        return __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["j" /* getPromise */](function (resolve, reject) {
            navigator.contacts.pickContact(function (contact) { return resolve(processContact(contact)); }, reject);
        });
    };
    Contacts.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Contacts.ctorParameters = function () { return []; };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["b" /* CordovaCheck */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", Promise)
    ], Contacts.prototype, "find", null);
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["b" /* CordovaCheck */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Contacts.prototype, "pickContact", null);
    Contacts = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'Contacts',
            plugin: 'cordova-plugin-contacts',
            pluginRef: 'navigator.contacts',
            repo: 'https://github.com/apache/cordova-plugin-contacts',
            platforms: ['Android', 'BlackBerry 10', 'Firefox OS', 'iOS', 'Ubuntu', 'Windows', 'Windows Phone 8']
        })
    ], Contacts);
    return Contacts;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

/**
 * @hidden
 */
function processContact(contact) {
    var newContact = new Contact();
    for (var prop in contact) {
        if (typeof contact[prop] === 'function')
            continue;
        newContact[prop] = contact[prop];
    }
    return newContact;
}
//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=39.js.map