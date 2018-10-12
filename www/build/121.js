webpackJsonp([121],{

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/choose/choose.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChooseService__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(239);
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
 * Generated class for the ChoosePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChoosePage = (function () {
    function ChoosePage(navCtrl, navParams, chooseService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chooseService = chooseService;
        this.data = [];
        this.origin_data = [];
        this.editPage = __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].getViewController("EditCardPage", navCtrl);
        this.items = this.navParams.get('items');
        this.type = this.navParams.get('type');
        if (this.type == 'country') {
            this.title = "国家";
            this.chooseService.get_countries().then(function (res) {
                console.log(res);
                for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var obj = {
                        name: '',
                        id: '',
                    };
                    obj.name = item.name;
                    obj.id = item.country_id;
                    _this.data.push(obj);
                }
            });
        }
        else if (this.type == 'source') {
            this.title = "来源";
            this.chooseService.get_origins().then(function (res) {
                console.log(res);
                for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var obj = {
                        name: '',
                        id: '',
                    };
                    obj.name = item.name;
                    obj.id = item.src_id;
                    // alert(item.src_id);
                    _this.data.push(obj);
                }
            });
        }
        else if (this.type == 'comefrom') {
            this.title = "渠道";
            this.chooseService.get_sources().then(function (res) {
                for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var obj = {
                        name: '',
                        id: '',
                    };
                    obj.name = item.name;
                    obj.id = item.source_id;
                    _this.data.push(obj);
                }
            });
        }
        else if (this.type == 'type') {
            this.title = "联系人类型";
            var obj_one = {
                name: '',
                id: '',
            };
            var obj_two = {
                name: '',
                id: '',
            };
            var obj_three = {
                name: '',
                id: '',
            };
            var obj_four = {
                name: '',
                id: '',
            };
            obj_one.name = "联系人";
            this.data.push(obj_one);
            obj_two.name = "开票地址";
            this.data.push(obj_two);
            obj_three.name = "送货地址";
            this.data.push(obj_three);
            obj_four.name = "其他地址";
            this.data.push(obj_four);
        }
        else if (this.type == 'team') {
            this.title = "销售团队";
            this.chooseService.get_saleteam_list().then(function (res) {
                for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var obj = {
                        name: '',
                        id: '',
                    };
                    obj.name = item.name;
                    obj.id = item.team_id;
                    _this.data.push(obj);
                }
            });
        }
        else if (this.type == 'saleman') {
            this.title = "销售员";
            this.chooseService.get_saleman_list().then(function (res) {
                for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var obj = {
                        name: '',
                        id: '',
                    };
                    obj.name = item.name;
                    obj.id = item.partner_id;
                    _this.data.push(obj);
                }
            });
        }
        this.origin_data = this.data;
    }
    ChoosePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChoosePage');
    };
    ChoosePage.prototype.itemSelected = function (item) {
        if (this.type == 'country') {
            var self_1 = this;
            this.items.country_id = item.id;
            this.items.country_name = item.name;
            self_1.editPage.item = this.items;
            self_1.navCtrl.popTo(self_1.editPage);
        }
        else if (this.type == 'source') {
            // alert(item.id + item.name);
            var self_2 = this;
            this.items.series_name = item.name;
            this.items.crm_source_id = item.id;
            self_2.editPage.item = this.items;
            self_2.navCtrl.popTo(self_2.editPage);
        }
        else if (this.type == 'comefrom') {
            var self_3 = this;
            // this.items.series_id[0] = item.id;
            this.items.source_id = item.id;
            this.items.source_name = item.name;
            self_3.editPage.item = this.items;
            self_3.navCtrl.popTo(self_3.editPage);
        }
        else if (this.type == 'type') {
            var self_4 = this;
            this.items.type = item.name;
            self_4.editPage.item = this.items;
            self_4.navCtrl.popTo(self_4.editPage);
        }
        else if (this.type == 'team') {
            var self_5 = this;
            this.items.sale_team = item.name;
            this.items.saleteam_id = item.id;
            self_5.editPage.item = this.items;
            self_5.navCtrl.popTo(self_5.editPage);
        }
        else if (this.type == 'saleman') {
            var self_6 = this;
            this.items.sale_person = item.name;
            this.items.saleman_id = item.id;
            self_6.editPage.item = this.items;
            self_6.navCtrl.popTo(self_6.editPage);
        }
    };
    ChoosePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        // this.initializeItems();
        var _this = this;
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.data = this.origin_data.filter(function (item) {
                if (item.name != '') {
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
                else {
                    return _this.origin_data;
                }
            });
        }
    };
    return ChoosePage;
}());
ChoosePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-choose',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/choose/choose.html"*/'<!--\n  Generated template for the ChoosePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list>\n    <button ion-item *ngFor="let item of data" (click)="itemSelected(item)">\n      {{item.name}}\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/choose/choose.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__ChooseService__["a" /* ChooseService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ChooseService__["a" /* ChooseService */]])
], ChoosePage);

//# sourceMappingURL=choose.js.map
// CONCATENATED MODULE: ./src/pages/customer/choose/choose.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChoosePageModule", function() { return ChoosePageModule; });
/* harmony import */ var choose_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var choose_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var choose_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChoosePageModule = (function () {
    function ChoosePageModule() {
    }
    return ChoosePageModule;
}());
ChoosePageModule = choose_module___decorate([
    choose_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ChoosePage,
        ],
        imports: [
            choose_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ChoosePage),
        ],
        exports: [
            ChoosePage
        ]
    })
], ChoosePageModule);

//# sourceMappingURL=choose.module.js.map

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
//# sourceMappingURL=121.js.map