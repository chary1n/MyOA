webpackJsonp([165],{

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/contact-list/contact-list.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
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
 * Generated class for the ContactListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ContactListPage = (function () {
    function ContactListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contactList = navParams.get('contactList');
    }
    ContactListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactListPage');
    };
    ContactListPage.prototype.exchangeContact = function (name) {
        var name_str;
        if (name == 'Shipping address') {
            name_str = '送货地址';
        }
        else if (name == 'Contact') {
            name_str = '联系人';
        }
        else if (name == 'Other address') {
            name_str = '其他地址';
        }
        else {
            name_str = '开票地址';
        }
        return name_str;
    };
    return ContactListPage;
}());
ContactListPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-contact-list',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/contact-list/contact-list.html"*/'<!--\n  Generated template for the ContactListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>联系人&地址</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-item-group *ngFor=\'let item of contactList\'>\n    <ion-item-divider class="divider" color="light"></ion-item-divider>\n    <ion-item>\n      <button ion-button  style="background-color:#c9c9c9;color:gray" small>{{item.type[1]}}</button><h1 style="font-weight:bold;">{{item.name}}</h1>\n      <h4>地址：{{item.street}}</h4>\n      <p>Email：{{item.email}}</p>\n      <p>电话：{{item.phone}}</p>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/contact-list/contact-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], ContactListPage);

//# sourceMappingURL=contact-list.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/contact-list/contact-list.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListPageModule", function() { return ContactListPageModule; });
/* harmony import */ var contact_list_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var contact_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var contact_list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ContactListPageModule = (function () {
    function ContactListPageModule() {
    }
    return ContactListPageModule;
}());
ContactListPageModule = contact_list_module___decorate([
    contact_list_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            ContactListPage,
        ],
        imports: [
            contact_list_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(ContactListPage),
        ],
        exports: [
            ContactListPage
        ]
    })
], ContactListPageModule);

//# sourceMappingURL=contact-list.module.js.map

/***/ })

});
//# sourceMappingURL=165.js.map