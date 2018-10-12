webpackJsonp([122],{

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/biao-qian/biao-qian.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__choose_ChooseService__ = __webpack_require__(748);
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
 * Generated class for the BiaoQianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BiaoQianPage = (function () {
    function BiaoQianPage(navCtrl, navParams, chooseService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chooseService = chooseService;
        this.editPage = __WEBPACK_IMPORTED_MODULE_2__providers_Utils__["a" /* Utils */].getViewController("EditCardPage", navCtrl);
        this.starArr = ['1', '1', '1', '1', '1'];
        // this.priority = 0;
        this.items = this.navParams.get("items");
        if (this.items.partner_type == "customer") {
            this.customer_selected = true;
        }
        else {
            this.customer_selected = false;
        }
        if (this.items.partner_type == "supplier") {
            this.supplier_selected = true;
        }
        else {
            this.supplier_selected = false;
        }
        if (this.items.partner_lv == 1) {
            this.level_one_selected = true;
        }
        else {
            this.level_one_selected = false;
        }
        if (this.items.partner_lv == 2) {
            this.level_two_selected = true;
        }
        else {
            this.level_two_selected = false;
        }
        if (this.items.partner_lv == 3) {
            this.level_three_selected = true;
        }
        else {
            this.level_three_selected = false;
        }
        if (this.items.star_cnt) {
            this.priority = this.items.star_cnt;
        }
        else {
            this.priority = 0;
        }
        this.chooseService.get_partner_tag_list().then(function (res) {
            _this.arr = res.result;
        });
    }
    BiaoQianPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BiaoQianPage');
    };
    BiaoQianPage.prototype.click = function (i) {
        // this.priority = (4 - i) + this.priority + 1;
        this.priority = i + 1;
    };
    BiaoQianPage.prototype.clickGray = function (i) {
        this.priority = i + 1 + this.priority;
    };
    BiaoQianPage.prototype.clickCustomer = function () {
        this.customer_selected = !this.customer_selected;
        if (this.customer_selected) {
            this.supplier_selected = false;
        }
    };
    BiaoQianPage.prototype.clickSupplier = function () {
        this.supplier_selected = !this.supplier_selected;
        if (this.supplier_selected) {
            this.customer_selected = false;
        }
    };
    BiaoQianPage.prototype.isCustomerSelected = function () {
        return this.customer_selected;
    };
    BiaoQianPage.prototype.isSupplierSelected = function () {
        return this.supplier_selected;
    };
    BiaoQianPage.prototype.click1st = function () {
        this.level_one_selected = !this.level_one_selected;
        if (this.level_one_selected) {
            this.level_two_selected = false;
            this.level_three_selected = false;
        }
    };
    BiaoQianPage.prototype.click2nd = function () {
        this.level_two_selected = !this.level_two_selected;
        if (this.level_two_selected) {
            this.level_one_selected = false;
            this.level_three_selected = false;
        }
    };
    BiaoQianPage.prototype.click3rd = function () {
        this.level_three_selected = !this.level_three_selected;
        if (this.level_three_selected) {
            this.level_one_selected = false;
            this.level_two_selected = false;
        }
    };
    BiaoQianPage.prototype.is1stSelected = function () {
        return this.level_one_selected;
    };
    BiaoQianPage.prototype.is2ndSelected = function () {
        return this.level_two_selected;
    };
    BiaoQianPage.prototype.is3rdSelected = function () {
        return this.level_three_selected;
    };
    BiaoQianPage.prototype.save_biaoqian = function () {
        var self = this;
        this.items.partner_type = "";
        this.items.category_id = "";
        this.items.partner_lv = "";
        if (this.customer_selected) {
            for (var _i = 0, _a = this.arr; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.name == "客户") {
                    this.items.partner_type = "customer";
                    this.items.category_id = item.category_id;
                    break;
                }
            }
        }
        if (this.supplier_selected) {
            for (var _b = 0, _c = this.arr; _b < _c.length; _b++) {
                var item_1 = _c[_b];
                if (item_1.name != "客户") {
                    this.items.partner_type = "supplier";
                    this.items.category_id = item_1.category_id;
                    break;
                }
            }
        }
        if (self.level_one_selected) {
            this.items.partner_lv = 1;
        }
        if (self.level_two_selected) {
            this.items.partner_lv = 2;
        }
        if (self.level_three_selected) {
            this.items.partner_lv = 3;
        }
        this.items.star_cnt = this.priority;
        self.editPage.item = this.items;
        self.navCtrl.popTo(self.editPage);
    };
    return BiaoQianPage;
}());
BiaoQianPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-biao-qian',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/biao-qian/biao-qian.html"*/'<!--\n  Generated template for the BiaoQianPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>标签</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="save_biaoqian()">\n        <p>保存</p>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h4>类型</h4>\n  <button ion-button outline icon-start style="width:80px;border-color:white;" (click) = \'clickCustomer()\' [style.background-color] = "isCustomerSelected() ? \'#159963\' : \'#f2f2f2\'" [style.color] = "isCustomerSelected() ? \'white\' : \'gray\'">客户</button>\n  <button ion-button outline icon-start style="width:80px;border-color:white;" (click) = \'clickSupplier()\' [style.background-color] = "isSupplierSelected() ? \'#159963\' : \'#f2f2f2\'" [style.color] = "isSupplierSelected() ? \'white\' : \'gray\'">供应商</button><br>\n\n  <h4>等级</h4>\n  <button ion-button outline icon-start  style="width:80px;border-color:white" (click) = \'click1st()\' [style.background-color] = "is1stSelected() ? \'#159963\' : \'#f2f2f2\'" [style.color] = "is1stSelected() ? \'white\' : \'gray\'">1st</button>\n  <button ion-button outline icon-only style="width:80px;border-color:white" (click) = \'click2nd()\' [style.background-color] = "is2ndSelected() ? \'#159963\' : \'#f2f2f2\'" [style.color] = "is2ndSelected() ? \'white\' : \'gray\'">2nd</button>\n  <button ion-button outline icon-end style="width:80px;border-color:white" (click) = \'click3rd()\' [style.background-color] = "is3rdSelected() ? \'#159963\' : \'#f2f2f2\'" [style.color] = "is3rdSelected() ? \'white\' : \'gray\'">3rd</button><br>\n\n  <div class="item row row-wrap row-no-padding" style="height: 100px;border: none;">\n    <div class="col col-center">\n      <ion-icon *ngFor=\'let item of starArr | slice:(5 - priority) ; let i = index\' tappable (click) = \'click(i)\' name="star" style="color:#fdc03b;font-size:50px;margin-top:20px;margin-left:10px;"></ion-icon>\n      <ion-icon *ngFor=\'let item of starArr | slice:(priority) ;let i = index\' tappable (click) = \'clickGray(i)\' name="star" style="color:gray;font-size:50px;margin-top:20px;margin-left:10px;"></ion-icon>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/biao-qian/biao-qian.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__choose_ChooseService__["a" /* ChooseService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__choose_ChooseService__["a" /* ChooseService */]])
], BiaoQianPage);

//# sourceMappingURL=biao-qian.js.map
// CONCATENATED MODULE: ./src/pages/customer/biao-qian/biao-qian.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BiaoQianPageModule", function() { return BiaoQianPageModule; });
/* harmony import */ var biao_qian_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var biao_qian_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var biao_qian_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BiaoQianPageModule = (function () {
    function BiaoQianPageModule() {
    }
    return BiaoQianPageModule;
}());
BiaoQianPageModule = biao_qian_module___decorate([
    biao_qian_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            BiaoQianPage,
        ],
        imports: [
            biao_qian_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(BiaoQianPage),
        ],
        exports: [
            BiaoQianPage
        ]
    })
], BiaoQianPageModule);

//# sourceMappingURL=biao-qian.module.js.map

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

/***/ })

});
//# sourceMappingURL=122.js.map