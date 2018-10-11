webpackJsonp([120],{

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/productlist/productlist.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_ChooseService__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(238);
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
 * Generated class for the ProductlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductlistPage = (function () {
    function ProductlistPage(navCtrl, navParams, chooseService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chooseService = chooseService;
        this.arr = [];
        this.editPage = __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].getViewController("EditCardPage", navCtrl);
        this.items = this.navParams.get('items');
        this.chooseService.get_product_series().then(function (res) {
            console.log(res);
            _this.dataArr = res.result;
            for (var _i = 0, _a = _this.dataArr; _i < _a.length; _i++) {
                var item = _a[_i];
                var obj = {
                    name: '',
                    id: '',
                    isCheck: '',
                };
                var isCheck = false;
                obj.name = item.name;
                obj.id = item.series_id;
                for (var _b = 0, _c = _this.items.series_ids; _b < _c.length; _b++) {
                    var detail = _c[_b];
                    //  alert (item.series_id + " " + this.items.series_ids);
                    if (item.series_id == detail) {
                        // alert(this.items.series_ids + item.series_id);
                        isCheck = true;
                    }
                }
                obj.isCheck = isCheck ? "1" : "0";
                _this.arr.push(obj);
            }
        });
    }
    ProductlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductlistPage');
    };
    ProductlistPage.prototype.insertUserToArray = function (item) {
        if (item.isCheck == "1") {
            item.isCheck = "0";
        }
        else {
            item.isCheck = "1";
        }
        var i = 0;
        for (var _i = 0, _a = this.arr; _i < _a.length; _i++) {
            var items = _a[_i];
            i++;
            if (items.id == item.id) {
                this.arr[i - 1] = item;
                break;
            }
        }
    };
    ProductlistPage.prototype.isCheck = function (item) {
        if (item.isCheck == "0") {
            return false;
        }
        else {
            return true;
        }
    };
    ProductlistPage.prototype.save_series = function () {
        var series_selected = [];
        var series_ids = [];
        var series_names = [];
        var index = 0;
        for (var _i = 0, _a = this.arr; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isCheck == "1") {
                series_selected.push(item);
            }
            index++;
        }
        for (var _b = 0, series_selected_1 = series_selected; _b < series_selected_1.length; _b++) {
            var detail = series_selected_1[_b];
            series_ids.push(detail.id);
            series_names.push(detail.name);
        }
        // alert(series_ids);
        // alert(series_names);
        var self = this;
        this.items.series_ids = series_ids;
        this.items.series_names = series_names;
        self.editPage.item = this.items;
        self.navCtrl.popTo(self.editPage);
    };
    return ProductlistPage;
}());
ProductlistPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-productlist',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/productlist/productlist.html"*/'<ion-header>\n  <ion-navbar color="gongdan-color">\n    <ion-title>\n      感兴趣的产品\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only tappable (click)="save_series()">\n        <p>保存</p>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  \n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item style="height:60px" *ngFor="let item of arr ; let i = index">  \n        <ion-label>{{item.name}}</ion-label>\n        <ion-checkbox tappable style="margin-left:-10px;" (ionChange)="insertUserToArray(item)" [checked]="isCheck(item) ? true : false"></ion-checkbox>\n     </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/productlist/productlist.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__choose_ChooseService__["a" /* ChooseService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__choose_ChooseService__["a" /* ChooseService */]])
], ProductlistPage);

//# sourceMappingURL=productlist.js.map
// CONCATENATED MODULE: ./src/pages/customer/productlist/productlist.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductlistPageModule", function() { return ProductlistPageModule; });
/* harmony import */ var productlist_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var productlist_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var productlist_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProductlistPageModule = (function () {
    function ProductlistPageModule() {
    }
    return ProductlistPageModule;
}());
ProductlistPageModule = productlist_module___decorate([
    productlist_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ProductlistPage,
        ],
        imports: [
            productlist_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ProductlistPage),
        ],
        exports: [
            ProductlistPage
        ]
    })
], ProductlistPageModule);

//# sourceMappingURL=productlist.module.js.map

/***/ }),

/***/ 747:
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
//# sourceMappingURL=120.js.map