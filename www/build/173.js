webpackJsonp([173],{

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/tabs/tabs.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TabsPage = (function () {
    function TabsPage(navCtrl, navParams, storage) {
        // this.storage.get('user')
        //   .then(res => {
        //     console.log(res)
        //     if ((new RegExp("若态").test(res.result.res_data.company)) || res.result.res_data.company == "若态"){
        //         this.need_show_gongdan = true
        //        if (this.need_show_gongdan == true){
        //           this.tabs.select(0); 
        //         }
        //         else
        //         {
        //           this.tabs.select(1); 
        //         }
        //       }
        //       else
        //       {
        //       }
        //   })
        // this.storage.get("loginIndex").then(res => {
        //   this.loginIndex = res
        //   if (this.loginIndex == 0)
        //   {
        //     this.need_show_first = true
        //     this.firstRoot= 'FirstShowPage';
        //     this.need_show_me = false
        //     this.need_show_gongdan = false
        //     this.need_show_new_work_bench = true
        //   }
        //   this.tabs.select(0) 
        //   // if(this.loginIndex==2){//发版改成1
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.need_show_me = true;
        this.meRoot = 'MePage';
        // msgRoot:any = 'FirstShowPage';
        this.msgRoot = 'GongdanPage';
        this.workRoot = 'WorkBenchPage';
        this.new_workRoot = 'NewWorkBenchPage';
        this.contactRoot = 'ContactPersonPage';
        this.need_show_gongdan = false;
        this.need_show_all = false;
        this.need_show_first = false;
        this.need_show_new_work_bench = false;
        this.need_show_contact = true;
        //   // }
        // })
    }
    TabsPage.prototype.ionViewDidLoad = function () {
    };
    return TabsPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('mainTabs'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["D" /* Tabs */])
], TabsPage.prototype, "tabs", void 0);
TabsPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'page-tabs',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/tabs/tabs.html"*/'<ion-tabs #mainTabs >\n  <ion-tab  [root]=\'msgRoot\' tabTitle=\'工单\' tabIcon =\'ionic\' tabsHideOnSubPages></ion-tab>\n\n  <ion-tab  [root]=\'workRoot\' tabTitle=\'工作台\' tabIcon =\'apps\' tabsHideOnSubPages></ion-tab>\n  <ion-tab  [root]=\'contactRoot\' tabTitle=\'通讯录\'  tabIcon =\'contacts\' tabsHideOnSubPages></ion-tab>\n  <ion-tab  [root]=\'meRoot\' tabTitle=\'我\'  tabIcon =\'person\' tabsHideOnSubPages></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/tabs/tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map
// CONCATENATED MODULE: ./src/pages/tabs/tabs.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var tabs_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabsPageModule = (function () {
    function TabsPageModule() {
    }
    return TabsPageModule;
}());
TabsPageModule = tabs_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            TabsPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(TabsPage),
        ],
        exports: [
            TabsPage
        ]
    })
], TabsPageModule);

//# sourceMappingURL=tabs.module.js.map

/***/ })

});
//# sourceMappingURL=173.js.map