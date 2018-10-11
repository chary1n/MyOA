webpackJsonp([127],{

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/contact-person/employee-list/employee-list.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_persionService__ = __webpack_require__(754);
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
 * Generated class for the EmployeeListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmployeeListPage = (function () {
    function EmployeeListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = navParams.get('items');
        this.title = navParams.get('title');
        this.origin_data = this.items;
        // console.log(this.items)
    }
    EmployeeListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EmployeeListPage');
    };
    EmployeeListPage.prototype.itemSelect = function (item) {
        this.navCtrl.push('EmployeeDetailPage', {
            item: item,
        });
    };
    EmployeeListPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.items = this.origin_data.filter(function (item) {
                // console.log(item)
                if (item[0].name != '') {
                    // console.log(item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1)
                    return (item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
            });
        }
        else {
            this.items = this.origin_data;
        }
    };
    EmployeeListPage.prototype.panEvent = function ($event) {
        cordova.plugins.Keyboard.close();
    };
    return EmployeeListPage;
}());
EmployeeListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-employee-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/contact-person/employee-list/employee-list.html"*/'<!--\n  Generated template for the EmployeeListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content (pan)="panEvent($event)">\n  <ion-searchbar placeholder = "搜索" (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list>\n      <ion-item tappable (click) = "itemSelect(item[0])" *ngFor = \'let item of items\'>\n        <ion-avatar item-start>\n            <img src={{item[0].image}}>\n        </ion-avatar>\n        <h2>{{item[0].name}}</h2>\n        <p>{{item[0].job_id.name}}</p>\n      </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/contact-person/employee-list/employee-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__contact_persionService__["a" /* ContactService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], EmployeeListPage);

//# sourceMappingURL=employee-list.js.map
// CONCATENATED MODULE: ./src/pages/contact-person/employee-list/employee-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmployeeListPageModule", function() { return EmployeeListPageModule; });
/* harmony import */ var employee_list_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var employee_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var employee_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EmployeeListPageModule = (function () {
    function EmployeeListPageModule() {
    }
    return EmployeeListPageModule;
}());
EmployeeListPageModule = employee_list_module___decorate([
    employee_list_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EmployeeListPage,
        ],
        imports: [
            employee_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EmployeeListPage),
        ],
    })
], EmployeeListPageModule);

//# sourceMappingURL=employee-list.module.js.map

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
//# sourceMappingURL=127.js.map