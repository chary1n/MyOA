webpackJsonp([126],{

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/assign-people/assign-people.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_person_contact_persionService__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the AssignPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.≈
 */
var AssignPeoplePage = (function () {
    function AssignPeoplePage(navCtrl, navParams, contactService, statusbar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contactService = contactService;
        this.statusbar = statusbar;
        this.chooseList = [];
        this.need_pop_reback = this.navParams.get('need_pop_reback');
        this.choosePeopleName = this.navParams.get('choosePeopleName');
        if (this.need_pop_reback) {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("RebackGongdanPage", navCtrl);
        }
        else {
            this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("CreateGongdanPage", navCtrl);
        }
        this.departments = this.navParams.get("departments");
        if (this.departments) {
            this.contactService.get_department_employees(this.departments).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.employeeList = res.result.res_data;
                    _this.origin_data = _this.employeeList;
                    if (_this.choosePeopleName) {
                        for (var i = 0; i < _this.employeeList.length; i++) {
                            if (_this.employeeList[i].name == _this.choosePeopleName) {
                                _this.employeeList[i].ischeck = true;
                            }
                        }
                    }
                }
            });
        }
        else {
            this.contactService.get_all_employees().then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    _this.employeeList = res.result.res_data;
                    _this.origin_data = _this.employeeList;
                    if (_this.choosePeopleName) {
                        for (var i = 0; i < _this.employeeList.length; i++) {
                            if (_this.employeeList[i].name == _this.choosePeopleName) {
                                _this.employeeList[i].ischeck = true;
                            }
                        }
                    }
                }
            });
        }
    }
    AssignPeoplePage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    AssignPeoplePage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.employeeList = this.origin_data.filter(function (item) {
                console.log(item);
                if (item.name != '') {
                    console.log(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.employeeList = this.origin_data;
        }
    };
    AssignPeoplePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AssignPeoplePage');
    };
    AssignPeoplePage.prototype.choosePeople = function (item) {
        item.ischeck = !item.ischeck;
        if (item.ischeck) {
            this.frontPage.data.choosePeopleItem = item;
        }
        else {
            this.frontPage.data.choosePeopleItem = undefined;
        }
        this.navCtrl.popTo(this.frontPage);
    };
    AssignPeoplePage.prototype.conform = function () {
        for (var i = 0; i < this.employeeList.length; i++) {
            if (this.employeeList[i].ischeck) {
                this.chooseList.push(this.employeeList[i].id);
            }
        }
        console.log(this.chooseList);
        this.frontPage.data.assignList = this.chooseList;
        this.navCtrl.popTo(this.frontPage);
    };
    AssignPeoplePage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    return AssignPeoplePage;
}());
AssignPeoplePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-assign-people',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/assign-people/assign-people.html"*/'<!--\n  Generated template for the AssignPeoplePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>指派受理人</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content (pan)="panEvent($event)">\n    <ion-searchbar placeholder = "搜索" (ionInput)="getItems($event)"></ion-searchbar>\n\n    <ion-list >\n      <ion-item *ngFor = \'let item of employeeList\'>\n          <ion-label>{{item.name}}</ion-label>\n          <ion-checkbox  (click)="choosePeople(item)" [checked]=item.ischeck></ion-checkbox>\n        </ion-item>\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/create-gongdan/assign-people/assign-people.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__contact_person_contact_persionService__["a" /* ContactService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__contact_person_contact_persionService__["a" /* ContactService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], AssignPeoplePage);

//# sourceMappingURL=assign-people.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/create-gongdan/assign-people/assign-people.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignPeoplePageModule", function() { return AssignPeoplePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var assign_people_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AssignPeoplePageModule = (function () {
    function AssignPeoplePageModule() {
    }
    return AssignPeoplePageModule;
}());
AssignPeoplePageModule = assign_people_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            AssignPeoplePage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(AssignPeoplePage),
        ],
    })
], AssignPeoplePageModule);

//# sourceMappingURL=assign-people.module.js.map

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactService; });
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


var ContactService = (function () {
    function ContactService(httpservice) {
        this.httpservice = httpservice;
    }
    ContactService.prototype.get_department_employees = function (departments) {
        var body = JSON.stringify({
            department_ids: departments
        });
        return this.httpservice.postBody("get_department_employees", body);
    };
    ContactService.prototype.get_departments = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_departments", body);
    };
    ContactService.prototype.get_department_detail = function (department_id) {
        var body = JSON.stringify({
            department_id: department_id,
        });
        return this.httpservice.postBody("get_department_detail", body);
    };
    ContactService.prototype.get_all_employees = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_employees", body);
    };
    ContactService.prototype.get_employees = function (limit, offset) {
        var body = JSON.stringify({
            limit: limit,
            offset: offset,
        });
        return this.httpservice.postBody("get_employees", body);
    };
    ContactService.prototype.search_employees = function (name) {
        var body = JSON.stringify({
            name: name,
        });
        return this.httpservice.postBody("search_employees", body);
    };
    return ContactService;
}());
ContactService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], ContactService);

//# sourceMappingURL=contact-persionService.js.map

/***/ })

});
//# sourceMappingURL=126.js.map