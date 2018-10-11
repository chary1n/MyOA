webpackJsonp([40],{

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/customer/customer.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomerService__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customer_add_customer_add_customer__ = __webpack_require__(893);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the CustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerPage = (function () {
    function CustomerPage(navCtrl, navParams, customerService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.customerService = customerService;
        this.storage = storage;
        this.pet = "3";
        this.limit = 20;
        this.offset = 0;
        this.isMoreData1 = true;
        this.isMoreData2 = true;
        this.isMoreData3 = true;
        this.isMoreData4 = true;
        this.starArr = ['1', '1', '1', '1', '1'];
    }
    CustomerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CustomerPage');
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.clickCustomer();
        });
    };
    CustomerPage.prototype.clickCustomer = function () {
        var _this = this;
        this.customerService.getNormalCustomer(20, 0, this.user_id).then(function (res) {
            console.log(res);
            _this.dataSourceThird = res.result.res_data;
        });
    };
    CustomerPage.prototype.clickXianSuo = function () {
        var _this = this;
        this.storage.get('user')
            .then(function (res) {
            _this.customerService.get_clues(20, 0, _this.user_id).then(function (resa) {
                console.log(resa);
                _this.dataSourceFirst = resa.result.res_data;
            });
        });
    };
    CustomerPage.prototype.clickQianZaiCustomer = function () {
        var _this = this;
        this.customerService.getQianZaiCustomer(20, 0, this.user_id).then(function (res) {
            console.log(res);
            _this.dataSourceSecond = res.result.res_data;
        });
    };
    CustomerPage.prototype.clickGongHaiCustomer = function () {
        var _this = this;
        this.customerService.getPublicCustomer(20, 0, this.user_id).then(function (res) {
            console.log(res);
            _this.dataSourceFourth = res.result.res_data;
        });
    };
    CustomerPage.prototype.addCustomer = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__customer_add_customer_add_customer__["a" /* AddCustomerPage */], {});
    };
    CustomerPage.prototype.doRefresh1 = function (refresh) {
        var _this = this;
        this.isMoreData1 = true;
        this.limit = 20;
        this.offset = 0;
        this.customerService.get_clues(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.dataSourceFirst = res.result.res_data;
        });
    };
    CustomerPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData1 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.customerService.get_clues(this.limit, this.offset, this.user_id).then(function (res) {
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData1 = true;
                    }
                    else {
                        _this.isMoreData1 = false;
                    }
                    for (var _i = 0, item_data_1 = item_data; _i < item_data_1.length; _i++) {
                        var item = item_data_1[_i];
                        _this.dataSourceFirst.push(item);
                    }
                }
                else {
                    _this.isMoreData1 = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    CustomerPage.prototype.searchClick1 = function () {
        var _this = this;
        this.isMoreData1 = false;
        this.customerService.searchClues(this.searchName1, this.user_id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.dataSourceFirst = res.result.res_data;
            }
        });
    };
    CustomerPage.prototype.doRefresh2 = function (refresh) {
        var _this = this;
        this.isMoreData2 = true;
        this.limit = 20;
        this.offset = 0;
        this.customerService.getQianZaiCustomer(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.dataSourceSecond = res.result.res_data;
        });
    };
    CustomerPage.prototype.doInfinite2 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData2 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.customerService.getQianZaiCustomer(this.limit, this.offset, this.user_id).then(function (res) {
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData2 = true;
                    }
                    else {
                        _this.isMoreData2 = false;
                    }
                    for (var _i = 0, item_data_2 = item_data; _i < item_data_2.length; _i++) {
                        var item = item_data_2[_i];
                        _this.dataSourceSecond.push(item);
                    }
                }
                else {
                    _this.isMoreData2 = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    CustomerPage.prototype.searchClick2 = function () {
        var _this = this;
        this.isMoreData2 = false;
        this.customerService.searchHiddenCustomer(this.searchName2, this.user_id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res.result.res_data);
                _this.dataSourceSecond = res.result.res_data;
            }
        });
    };
    CustomerPage.prototype.doRefresh3 = function (refresh) {
        var _this = this;
        this.isMoreData3 = true;
        this.limit = 20;
        this.offset = 0;
        this.customerService.getNormalCustomer(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.dataSourceThird = res.result.res_data;
        });
    };
    CustomerPage.prototype.doInfinite3 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData3 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.customerService.getNormalCustomer(this.limit, this.offset, this.user_id).then(function (res) {
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData3 = true;
                    }
                    else {
                        _this.isMoreData3 = false;
                    }
                    for (var _i = 0, item_data_3 = item_data; _i < item_data_3.length; _i++) {
                        var item = item_data_3[_i];
                        _this.dataSourceThird.push(item);
                    }
                }
                else {
                    _this.isMoreData3 = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    CustomerPage.prototype.searchClick3 = function () {
        var _this = this;
        this.isMoreData3 = false;
        this.customerService.searchNormalCustomer(this.searchName3, this.user_id)
            .then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.dataSourceThird = res.result.res_data;
            }
        });
    };
    CustomerPage.prototype.doRefresh4 = function (refresh) {
        var _this = this;
        this.isMoreData4 = true;
        this.limit = 20;
        this.offset = 0;
        this.customerService.getPublicCustomer(this.limit, this.offset, this.user_id).then(function (res) {
            console.log(res);
            refresh.complete();
            _this.dataSourceFourth = res.result.res_data;
        });
    };
    CustomerPage.prototype.doInfinite4 = function (infiniteScroll) {
        var _this = this;
        if (this.isMoreData4 == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.customerService.getPublicCustomer(this.limit, this.offset, this.user_id).then(function (res) {
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data;
                    if (item_data.length == 20) {
                        _this.isMoreData4 = true;
                    }
                    else {
                        _this.isMoreData4 = false;
                    }
                    for (var _i = 0, item_data_4 = item_data; _i < item_data_4.length; _i++) {
                        var item = item_data_4[_i];
                        _this.dataSourceFourth.push(item);
                    }
                }
                else {
                    _this.isMoreData4 = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    CustomerPage.prototype.searchClick4 = function () {
        var _this = this;
        this.isMoreData4 = false;
        this.customerService.searchPublicCustomer(this.searchName4, this.user_id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.dataSourceFourth = res.result.res_data;
            }
        });
    };
    CustomerPage.prototype.clickOne = function (item) {
        var _this = this;
        console.log(item.id);
        this.customerService.curstomer_clues_details(item.id).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.navCtrl.push('XiansuoDetailPage', {
                    items: res.result.res_data
                });
            }
        });
    };
    CustomerPage.prototype.clickTwo = function (item) {
        var _this = this;
        this.customerService.customer_details(item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.navCtrl.push('CustomerDetailPage', {
                    items: res.result.res_data,
                });
            }
        });
    };
    CustomerPage.prototype.clickThree = function (item) {
        var _this = this;
        this.customerService.customer_details(item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.navCtrl.push('CustomerDetailPage', {
                    items: res.result.res_data,
                });
            }
        });
    };
    CustomerPage.prototype.clickFour = function (item) {
        var _this = this;
        this.customerService.customer_details(item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                console.log(res);
                _this.navCtrl.push('CustomerDetailPage', {
                    items: res.result.res_data,
                });
            }
        });
    };
    return CustomerPage;
}());
CustomerPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-customer',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/customer.html"*/'<!--\n  Generated template for the CustomerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>客户</ion-title>\n    <!-- <ion-buttons end>\n      <button ion-button icon-only tappable (click)="addCustomer()">\n        <p>添加</p>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet">\n      <ion-segment-button tappable (click)=\'clickXianSuo()\' value="1">线索\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickQianZaiCustomer()\' value="2">\n        潜在客户\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickCustomer()\' value="3">\n        客户\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickGongHaiCustomer()\' value="4">\n        公海客户\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div [ngSwitch]="pet">\n\n    <ng-template [ngSwitchCase]=\'1\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <div>\n              <ion-input [(ngModel)]="searchName1" placeholder="请输入名称" text-wrap style="margin-left:20px;;"></ion-input>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div><button (click)=\'searchClick1()\' class="searchFont">搜索</button></div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-refresher (ionRefresh)="doRefresh1($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of dataSourceFirst\' tappable (click) = \'clickOne(item)\'>\n          <h2 text-wrap>{{item.name}}</h2>\n          <p text-wrap class="team_p">联系人：{{item.contact_name}}</p>\n          <p text-wrap class="team_p">销售团队：{{item.team}}</p>\n          <p text-wrap class="team_p">销售员：{{item.user}}</p>\n          <!--<div class="item row row-wrap row-no-padding" style="height: 30px;border: none;">-->\n            <!--<button ion-button style="background-color:#d9f2e4;color:#48ce3d" small>客户</button> -->\n            <!--<div class="col col-center">-->\n              <!--<ion-icon *ngFor=\'let item of starArr | slice:(5 - item.priority)\' name="star" style="color:#fdc03b"></ion-icon>-->\n            <!--</div>-->\n          <!--</div>-->\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite1($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'2\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <div>\n              <ion-input [(ngModel)]="searchName2" placeholder="请输入名称" style="margin-left:20px;;"></ion-input>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div><button (click)=\'searchClick2()\' class="searchFont">搜索</button></div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-refresher (ionRefresh)="doRefresh2($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of dataSourceSecond\' tappable (click) = \'clickTwo(item)\'>\n          <h2 text-wrap>{{item.name}}</h2>\n          <p text-wrap class="team_p">销售团队：{{item.team}}</p>\n          <p text-wrap class="team_p">销售员：{{item.user}}</p>\n          <div *ngIf=\'item.level == "1" || item.level == "2" || item.level == "3" || item.category.length > 0 || item.priority > 0\' class="item row row-wrap row-no-padding" style="height: 30px;border: none;">\n            <button ion-button *ngFor=\'let detail of item.category\' style="background-color:#d9f2e4;color:#48ce3d" small>{{detail}}</button>\n            <button ion-button *ngIf=\'item.level == "1" || item.level == "2" || item.level == "3"\' style="background-color:#d4f3fc;color:#4c8dfb" small>{{item.level}}st</button>\n            <div class="col col-center">\n              <ion-icon *ngFor=\'let item of starArr | slice:(5 - item.priority)\' name="star" style="color:#fdc03b"></ion-icon>\n            </div>\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite2($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'3\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <div>\n              <ion-input [(ngModel)]="searchName3" placeholder="请输入名称" style="margin-left:20px;;"></ion-input>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div><button (click)=\'searchClick3()\' class="searchFont">搜索</button></div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-refresher (ionRefresh)="doRefresh3($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of dataSourceThird\' tappable (click) = \'clickThree(item)\'>\n          <h2 text-wrap>{{item.name}}</h2>\n          <p text-wrap class="team_p">销售团队：{{item.team}}</p>\n          <p text-wrap class="team_p">销售员：{{item.user}}</p>\n          <div *ngIf=\'item.level == "1" || item.level == "2" || item.level == "3" || item.category.length > 0 || item.priority > 0\' class="item row row-wrap row-no-padding" style="height: 30px;border: none;">\n            <button ion-button *ngFor=\'let detail of item.category\' style="background-color:#d9f2e4;color:#48ce3d" small>{{detail}}</button>\n            <button ion-button *ngIf=\'item.level == "1" || item.level == "2" || item.level == "3"\' style="background-color:#d4f3fc;color:#4c8dfb" small>{{item.level}}st</button>\n            <div class="col col-center">\n              <ion-icon *ngFor=\'let item of starArr | slice:(5 - item.priority)\' name="star" style="color:#fdc03b"></ion-icon>\n            </div>\n          </div>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll (ionInfinite)="doInfinite3($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\'4\'>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6>\n            <div>\n              <ion-input [(ngModel)]="searchName4" placeholder="请输入名称" style="margin-left:20px;;"></ion-input>\n            </div>\n          </ion-col>\n          <ion-col>\n            <div><button (click)=\'searchClick4()\' class="searchFont">搜索</button></div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-refresher (ionRefresh)="doRefresh4($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n      <ion-list>\n        <ion-item *ngFor=\'let item of dataSourceFourth\' tappable (click) = \'clickFour(item)\'>\n          <h2 text-wrap>{{item.name}}</h2>\n          <p text-wrap class="team_p">销售团队：{{item.team}}</p>\n          <p text-wrap class="team_p">销售员：{{item.user}}</p>\n          <div *ngIf=\'item.level == "1" || item.level == "2" || item.level == "3" || item.category.length > 0 || item.priority > 0\' class="item row row-wrap row-no-padding" style="height: 30px;border: none;">\n            <button ion-button *ngFor=\'let detail of item.category\' style="background-color:#d9f2e4;color:#48ce3d" small>{{detail}}</button>\n            <button ion-button *ngIf=\'item.level == "1" || item.level == "2" || item.level == "3"\' style="background-color:#d4f3fc;color:#4c8dfb" small>{{item.level}}st</button>\n            <div class="col col-center">\n              <ion-icon *ngFor=\'let item of starArr | slice:(5 - item.priority)\' name="star" style="color:#fdc03b"></ion-icon>\n            </div>\n          </div>\n        </ion-item>\n      </ion-list>\n      <ion-infinite-scroll immediate-check="false" (ionInfinite)="doInfinite4($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </ng-template>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/customer.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__CustomerService__["a" /* CustomerService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__CustomerService__["a" /* CustomerService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], CustomerPage);

//# sourceMappingURL=customer.js.map
// CONCATENATED MODULE: ./src/pages/customer/customer.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerPageModule", function() { return CustomerPageModule; });
/* harmony import */ var customer_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var customer_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var customer_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerPageModule = (function () {
    function CustomerPageModule() {
    }
    return CustomerPageModule;
}());
CustomerPageModule = customer_module___decorate([
    customer_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            CustomerPage,
        ],
        imports: [
            customer_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(CustomerPage),
        ],
        exports: [
            CustomerPage
        ]
    })
], CustomerPageModule);

//# sourceMappingURL=customer.module.js.map

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

/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
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
 * Generated class for the AddCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddCustomerPage = (function () {
    function AddCustomerPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.company_name = '苏州麦田科技有限公司';
        this.country = '请选择 >';
        this.come_from = '请选择 >';
        this.qudao = '请选择 >';
    }
    AddCustomerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AddCustomerPage');
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            _this.team = res.result.res_data.department;
            _this.people = res.result.res_data.name;
        });
    };
    return AddCustomerPage;
}());
AddCustomerPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-add-customer',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/customer/add-customer/add-customer.html"*/'<!--\n  Generated template for the AddCustomerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>addCustomer</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group >\n    <ion-item-divider color="light"></ion-item-divider>\n    <ion-item>\n      <ion-label style="font-size:85%;font-weight:bold">公司</ion-label>\n      <ion-label text-wrap item-end style="font-size:65%;text-align:right;">{{company_name}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label  style="font-size:85%;font-weight:bold">国家</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{country}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">来源</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{come_from}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">渠道</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{qudao}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">销售团队</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{team}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">销售员</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{people}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">标签</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{tips}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label style="font-size:90%;font-weight:bold">感兴趣的产品</ion-label>\n      <ion-label item-end style="font-size:65%;text-align:right;">{{products}}</ion-label>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/customer/add-customer/add-customer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], AddCustomerPage);

//# sourceMappingURL=add-customer.js.map

/***/ })

});
//# sourceMappingURL=40.js.map