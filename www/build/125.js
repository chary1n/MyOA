webpackJsonp([125],{

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/create-info/create-info.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomerService__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(238);
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
 * Generated class for the CreateInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CreateInfoPage = (function () {
    function CreateInfoPage(navCtrl, navParams, customerService, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.customerService = customerService;
        this.storage = storage;
        this.arr = [];
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("CustomerDetailPage", navCtrl);
        this.res_id = navParams.get('res_id');
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.create_uid = res.result.res_data.user_id;
            _this.author_id = res.result.res_data.partner_id;
        });
        this.customerService.get_all_message_label().then(function (res) {
            console.log(res);
            if (res.result.res_code == 1) {
                for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var obj = {
                        id: item.id,
                        name: item.name,
                        isCheck: false,
                    };
                    _this.arr.push(obj);
                }
            }
        });
    }
    CreateInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateInfoPage');
    };
    CreateInfoPage.prototype.isCheck = function (item) {
        if (item.isCheck == "0") {
            return false;
        }
        else {
            return true;
        }
        // return false;
    };
    CreateInfoPage.prototype.insertUserToArray = function (item) {
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
    CreateInfoPage.prototype.upload = function () {
        var _this = this;
        var result_arr = ["question"];
        for (var _i = 0, _a = this.arr; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isCheck == "1") {
                result_arr.push(item.id);
            }
        }
        var obj = {
            body: "<p>" + this.info + "</p>",
            res_id: this.res_id,
            create_uid: this.create_uid,
            message_label_ids: result_arr,
            author_id: this.author_id,
        };
        this.customerService.createInfo(obj).then(function (res) {
            console.log(res);
            if (res) {
                if (res.result.res_data.success == 1) {
                    _this.frontPage.data.need_fresh = true;
                    _this.navCtrl.popTo(_this.frontPage);
                }
            }
        });
    };
    CreateInfoPage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    return CreateInfoPage;
}());
CreateInfoPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-create-info',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/create-info/create-info.html"*/'<!--\n  Generated template for the CreateInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="gongdan-color">\n    <ion-title>新增记录</ion-title>\n    <ion-buttons end>\n      <button style="color:black" ion-button icon-only tappable (click)="upload()">\n         <p>提交</p>\n      </button>\n    </ion-buttons> \n  </ion-navbar>\n</ion-header>\n\n<ion-content (pan)="panEvent($event)">\n  <ion-list>\n    <ion-item no-lines style="height:10px" *ngFor="let item of arr ; let i = index">  \n        <ion-label>{{item.name}}</ion-label>\n        <ion-checkbox tappable style="margin-left:-10px;" (ionChange)="insertUserToArray(item)" [checked]="isCheck(item) ? true : false"></ion-checkbox>\n     </ion-item>\n  </ion-list>\n  \n  <ion-textarea class="textarea_class" placeholder="写些什么" [(ngModel)]="info"></ion-textarea>\n  \n  \n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/create-info/create-info.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__CustomerService__["a" /* CustomerService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__CustomerService__["a" /* CustomerService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], CreateInfoPage);

//# sourceMappingURL=create-info.js.map
// CONCATENATED MODULE: ./src/pages/customer/create-info/create-info.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateInfoPageModule", function() { return CreateInfoPageModule; });
/* harmony import */ var create_info_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var create_info_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var create_info_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreateInfoPageModule = (function () {
    function CreateInfoPageModule() {
    }
    return CreateInfoPageModule;
}());
CreateInfoPageModule = create_info_module___decorate([
    create_info_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CreateInfoPage,
        ],
        imports: [
            create_info_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CreateInfoPage),
        ],
    })
], CreateInfoPageModule);

//# sourceMappingURL=create-info.module.js.map

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerService; });
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


var CustomerService = (function () {
    function CustomerService(httpservice) {
        this.httpservice = httpservice;
    }
    CustomerService.prototype.customer_details = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("customer_details", body);
    };
    CustomerService.prototype.curstomer_clues_details = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_clue_details", body);
    };
    //获取线索
    CustomerService.prototype.get_clues = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_clues", body);
    };
    //潜在客户
    CustomerService.prototype.getQianZaiCustomer = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            is_order: "False",
            public_partners: "!=",
            user_id: user_id,
        });
        return this.httpservice.postBody("get_customers", body);
    };
    //客户
    CustomerService.prototype.getNormalCustomer = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            is_order: "True",
            user_id: user_id
        });
        return this.httpservice.postBody("get_customers", body);
    };
    //公海客户
    CustomerService.prototype.getPublicCustomer = function (limit, offset, user_id) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
            public_partners: "=",
            user_id: user_id
        });
        return this.httpservice.postBody("get_customers", body);
    };
    CustomerService.prototype.searchClues = function (mName, mId) {
        var body = JSON.stringify({
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_clues", body);
    };
    CustomerService.prototype.searchHiddenCustomer = function (mName, mId) {
        var body = JSON.stringify({
            type: "not_public",
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_customer", body);
    };
    CustomerService.prototype.searchNormalCustomer = function (mName, mId) {
        var body = JSON.stringify({
            type: "simple",
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_customer", body);
    };
    CustomerService.prototype.searchPublicCustomer = function (mName, mId) {
        var body = JSON.stringify({
            type: "public",
            name: mName,
            user_id: mId
        });
        return this.httpservice.postBody("search_customer", body);
    };
    CustomerService.prototype.createInfo = function (obj) {
        var body = JSON.stringify({
            body: obj.body,
            res_id: obj.res_id,
            message_label_ids: obj.message_label_ids,
            author_id: obj.author_id,
            create_uid: obj.create_uid,
        });
        return this.httpservice.postBody("create_info", body);
    };
    CustomerService.prototype.get_all_message_label = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_message_label", body);
    };
    return CustomerService;
}());
CustomerService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], CustomerService);

//# sourceMappingURL=CustomerService.js.map

/***/ })

});
//# sourceMappingURL=125.js.map