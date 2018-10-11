webpackJsonp([42],{

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/contact-person/contact-person.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_employee_EmployeeService__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_persionService__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(66);
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






// import { NFC, Ndef } from '@ionic-native/nfc';
/**
 * Generated class for the ContactPersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ContactPersonPage = (function () {
    function ContactPersonPage(navCtrl, navParams, contactService, employeeService, storage, statusbar) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contactService = contactService;
        this.employeeService = employeeService;
        this.storage = storage;
        this.statusbar = statusbar;
        this.isMoreData = true;
        this.need_refresh = false;
        this.isShowEdit = false;
        this.originTotalList = [];
        this.breadcrumbsList = [];
        this.originEmployeeList = [];
        this.showAll = "YES";
        this.limit = 20;
        this.offset = 0;
        this.storage.get('user')
            .then(function (res) {
            if ((new RegExp("js.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/S-header.png";
            }
            else if ((new RegExp("dr.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/D-header.png";
            }
            else if ((new RegExp("erp.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/R-header.png";
            }
            else if ((new RegExp("ber.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/B-header.png";
            }
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == 'group_hr_manager') {
                    _this.isShowEdit = true;
                }
            }
        });
        this.employeeService.get_all_department().then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.originTotalList = res.result.res_data[0];
            }
        });
        this.contactService.get_employees(this.limit, this.offset).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.originEmployeeList = res.result.res_data;
                _this.employeeList = res.result.res_data;
                _this.origin_data = _this.employeeList;
            }
        });
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
        this.showAll = "YES";
    }
    ContactPersonPage.prototype.ionViewWillEnter = function () {
        // 获取组织架构
        // this.need_refresh = this.navParams.get("need_refresh")
        // if (this.need_refresh) {
        //   this.contactService.get_employees(this.limit, this.offset).then((res) => {
        //     if (res.result && res.result.res_code == 1) {
        //       this.employeeList = res.result.res_data;
        //       this.origin_data = this.employeeList;
        //     }
        //   })
        //   this.need_refresh = false
        // }
    };
    ContactPersonPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactPersonPage');
    };
    ContactPersonPage.prototype.clickShowAll = function () {
        this.clickAll();
        this.employeeList = this.originEmployeeList;
    };
    ContactPersonPage.prototype.clickItem = function (item) {
        var _this = this;
        this.contactService.get_department_detail(item.id).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('EmployeeListPage', {
                    items: res.result.res_data,
                    title: item.name,
                });
            }
        });
    };
    ContactPersonPage.prototype.itemSelect = function (item) {
        var _this = this;
        // this.navCtrl.push('EmployeeDetailPage',{
        //   item:item,
        // })
        this.employeeService.get_employee_info([item.employee_id], false).then(function (res) {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
                _this.navCtrl.push('EmployeeDetailPage', {
                    item: res.result.res_data[0],
                    origin_data: res.result.res_data[0],
                    id: item.employee_id,
                    user_id: item.id,
                });
            }
        });
    };
    ContactPersonPage.prototype.clickAll = function () {
        if (this.showAll == "YES") {
            this.breadcrumbsList = [];
            this.breadcrumbsList.push(this.originTotalList);
            this.childList = this.originTotalList.child;
            this.employeeList = this.originTotalList.employees;
            this.showAll = "NO";
        }
        else {
            this.showAll = "YES";
        }
    };
    ContactPersonPage.prototype.addBreadcrumbs = function (item) {
        this.breadcrumbsList.push(item);
        this.childList = item.child;
        this.employeeList = item.employees;
    };
    ContactPersonPage.prototype.clickBreadcrumbs = function (item, i) {
        this.childList = item.child;
        this.employeeList = item.employees;
        this.breadcrumbsList.splice(i + 1, this.breadcrumbsList.length - 1 - i);
    };
    ContactPersonPage.prototype.getItems = function (ev) {
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
    ContactPersonPage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    ContactPersonPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.showAll == "NO") {
            infiniteScroll.complete();
            return;
        }
        if (this.isMoreData == true) {
            this.limit = 20;
            this.offset += 20;
            this.contactService.get_employees(this.limit, this.offset).then(function (res) {
                if (res.result && res.result.res_code == 1) {
                    if (res.result.res_data) {
                        if (res.result.res_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, _a = res.result.res_data; _i < _a.length; _i++) {
                            var item = _a[_i];
                            _this.employeeList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                }
                else {
                    _this.isMoreData = false;
                }
                infiniteScroll.complete();
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    ContactPersonPage.prototype.searchByKeyword = function (event) {
        var _this = this;
        this.showAll = "YES";
        console.log(event.target.value);
        this.isMoreData = false;
        this.contactService.search_employees(event.target.value).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.employeeList = res.result.res_data;
            }
        });
    };
    ContactPersonPage.prototype.clearText = function () {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        this.isMoreData = true;
        this.contactService.get_employees(this.limit, this.offset).then(function (res) {
            if (res.result && res.result.res_code == 1) {
                _this.employeeList = res.result.res_data;
                _this.origin_data = _this.employeeList;
            }
        });
    };
    ContactPersonPage.prototype.add = function () {
        // this.navCtrl.push('AddEmployeePage')
        this.navCtrl.push("PromptPage");
    };
    return ContactPersonPage;
}());
ContactPersonPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-contact-person',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/contact-person/contact-person.html"*/'\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button icon-only>\n        <img style="width:30px" src={{company_type}} />\n      </button>\n    </ion-buttons>\n    <ion-title>通讯录</ion-title>\n    <ion-buttons end *ngIf="isShowEdit">\n      <button ion-button (click)=\'add()\'>\n        <img style="width: 21px;\n            margin-right: 2px;" src="assets/img/addEmployee.png">\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content (pan)="panEvent($event)">\n  <ion-searchbar placeholder="搜索" (search)="searchByKeyword($event)" (ionClear)="clearText()"></ion-searchbar>\n\n  <ion-item *ngIf="showAll == \'YES\'" (click)="clickAll()">\n    <ion-label>组织架构</ion-label>\n    <ion-label tappable text-right item-end style="font-size:150%">></ion-label>\n  </ion-item>\n\n  <ion-scroll *ngIf="showAll == \'NO\'" zooming="true" scrollX="true" style="height:50px;width:100%">\n    <div style="white-space:nowrap;font-size:16px;padding-top:10px;padding-left:20px">\n      <span (click)=clickShowAll()>\n        组织架构\n      </span>\n      <span *ngFor="let item of breadcrumbsList;let i = index" (click)=clickBreadcrumbs(item,i)>\n        >{{item.name}}\n      </span>\n    </div>\n  </ion-scroll>\n\n  <ion-item-group *ngIf="showAll == \'NO\'">\n    <ion-item tappable (click)="addBreadcrumbs(item)" *ngFor=\'let item of childList\'>\n      <ion-label>\n        {{item.name}} ({{item.childEmployeeNumber}})\n      </ion-label>\n      <ion-label style="color:gray;margin-right:25px;" text-right item-end>\n        >\n      </ion-label>\n    </ion-item>\n  </ion-item-group>\n\n\n\n\n\n\n\n  <!-- <ion-item no-lines *ngIf = "showAll == \'NO\'">\n    <ion-label>组织架构</ion-label>\n    <ion-label tappable (click) = "clickAll()" text-right item-end style="font-size:150%">+</ion-label>\n  </ion-item> -->\n\n  <!-- <ion-item-group *ngIf = "showAll == \'YES\'">\n    <ion-item  style="margin-left:20px;" tappable (click) = "clickItem(item)" *ngFor=\'let item of departmentList\'>\n      <ion-label >\n        {{item.name}} ({{item.total_employee}})\n      </ion-label>\n      <ion-label style="color:gray;margin-right:25px;" text-right item-end>\n        >\n      </ion-label>    \n  </ion-item>\n  </ion-item-group> -->\n\n  <ion-item-divider color="light"></ion-item-divider>\n  <ion-list>\n    <ion-item tappable (click)="itemSelect(item)" *ngFor=\'let item of employeeList\'>\n      <ion-avatar item-start>\n        <img src={{item.image}}>\n      </ion-avatar>\n      <h2>{{item.name}}</h2>\n      <p>{{item.job_id.name}}</p>\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/contact-person/contact-person.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__contact_persionService__["a" /* ContactService */], __WEBPACK_IMPORTED_MODULE_0__add_employee_EmployeeService__["a" /* EmployeeService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__contact_persionService__["a" /* ContactService */],
        __WEBPACK_IMPORTED_MODULE_0__add_employee_EmployeeService__["a" /* EmployeeService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]])
], ContactPersonPage);

//# sourceMappingURL=contact-person.js.map
// CONCATENATED MODULE: ./src/pages/contact-person/contact-person.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPersonPageModule", function() { return ContactPersonPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var contact_person_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContactPersonPageModule = (function () {
    function ContactPersonPageModule() {
    }
    return ContactPersonPageModule;
}());
ContactPersonPageModule = contact_person_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ContactPersonPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ContactPersonPage),
        ],
        exports: [
            ContactPersonPage
        ]
    })
], ContactPersonPageModule);

//# sourceMappingURL=contact-person.module.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
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


var EmployeeService = (function () {
    function EmployeeService(httpservice) {
        this.httpservice = httpservice;
    }
    EmployeeService.prototype.get_all_department = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_all_department", body);
    };
    // 获取民族
    EmployeeService.prototype.get_employee_list = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBodyNoLoading("get_employee_list", body);
    };
    EmployeeService.prototype.getDepartmentNoLoading = function () {
        var body = JSON.stringify({
            partner_id: 1
        });
        return this.httpservice.postBodyNoLoading("get_all_departments", body);
    };
    EmployeeService.prototype.create_employee = function (data) {
        var body = JSON.stringify(data);
        return this.httpservice.postBody("create_employee", body);
    };
    EmployeeService.prototype.get_employee_info = function (id_list, is_all) {
        var body = JSON.stringify({
            id_list: id_list,
            is_all: is_all
        });
        return this.httpservice.postBodyNoLoading("get_employee_info", body);
    };
    EmployeeService.prototype.update_employee = function (data) {
        var body = JSON.stringify(data);
        return this.httpservice.postBody("update_employee", body);
    };
    EmployeeService.prototype.update_nfc_number = function (data) {
        var body = JSON.stringify(data);
        return this.httpservice.postBody("update_nfc_number", body);
    };
    return EmployeeService;
}());
EmployeeService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], EmployeeService);

//# sourceMappingURL=EmployeeService.js.map

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
//# sourceMappingURL=42.js.map