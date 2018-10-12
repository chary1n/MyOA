webpackJsonp([23],{

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/material-request/material-auto.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MaterialAutoService = (function () {
    function MaterialAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    MaterialAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var arr = [];
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        return arr;
    };
    return MaterialAutoService;
}());
MaterialAutoService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], MaterialAutoService);

//# sourceMappingURL=material-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/material-two-auto.ts
/* harmony import */ var material_two_auto___WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(101);
/* harmony import */ var material_two_auto___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var material_two_auto___WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(241);
/* harmony import */ var material_two_auto___WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(material_two_auto___WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var material_two_auto___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var material_two_auto___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MaterialTwoAutoService = (function () {
    function MaterialTwoAutoService(http) {
        this.http = http;
        this.labelAttribute = "name";
    }
    MaterialTwoAutoService.prototype.getResults = function (keyword) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        var obj1 = {
            name: "",
            id: 1,
        };
        var arr = [];
        obj1.name = "搜 单号：" + keyword;
        arr.push(obj1);
        var obj2 = {
            name: "",
            id: 2,
        };
        obj2.name = "搜 申请人：" + keyword;
        arr.push(obj2);
        return arr;
    };
    return MaterialTwoAutoService;
}());
MaterialTwoAutoService = material_two_auto___decorate([
    material_two_auto___WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    material_two_auto___metadata("design:paramtypes", [material_two_auto___WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], MaterialTwoAutoService);

//# sourceMappingURL=material-two-auto.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/material-request.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__materialService__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(66);
var material_request___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var material_request___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MaterialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MaterialRequestPage = (function () {
    function MaterialRequestPage(navCtrl, navParams, mService, storage, materialAutoService, twoAuto) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mService = mService;
        this.storage = storage;
        this.materialAutoService = materialAutoService;
        this.twoAuto = twoAuto;
        this.pet = "2";
        this.waitMeTitle = "待我审批";
        this.storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.limit = 20;
            _this.offset = 0;
            _this.mService.get_wait_me_material_request_list(_this.limit, _this.offset, _this.user_id).then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.waitMeList = res.result.res_data.data;
                    _this.waitMeTitle = "待我审批(" + res.result.res_data.count + ")";
                }
                else {
                    _this.waitMeList = [];
                    _this.waitMeTitle = "待我审批(0)";
                }
            });
            // this.mService.get_material_request_list(this.limit,this.offset,this.user_id).then(res => {
            //   console.log(res)
            //   if (res.result && res.result.res_code == 1) {
            //     this.materialList = res.result.res_data;
            //   }
            // })
        });
    }
    MaterialRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MaterialRequestPage');
    };
    MaterialRequestPage.prototype.ionViewDidEnter = function () {
        console.log(this.navParams);
        if (this.navParams.get('need_fresh') == true) {
            this.doRefresh(null);
            this.navParams.data.need_fresh = false;
        }
    };
    MaterialRequestPage.prototype.itemSelected = function (event) {
        var _this = this;
        var search_text = event.name.replace("搜 单号：", "");
        if (this.pet == "1") {
            this.mService.search_material_request(search_text, "my", this.user_id, "").then(function (res) {
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.materialList = res.result.res_data;
                }
            });
        }
        else if (this.pet == "2") {
        }
        else {
            this.mService.search_material_request(search_text, "already", this.user_id, "").then(function (res) {
                console.log(res);
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.alreadyList = res.result.res_data;
                }
            });
        }
    };
    MaterialRequestPage.prototype.itemSelected_two = function (event) {
        var _this = this;
        var search_text;
        if (this.pet == "2") {
            if (event.id == 1) {
                search_text = event.name.replace("搜 单号：", "");
                this.mService.search_material_request(search_text, "waitme", this.user_id, "expense_no").then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        _this.waitMeList = res.result.res_data;
                    }
                });
            }
            else {
                search_text = event.name.replace("搜 申请人：", "");
                this.mService.search_material_request(search_text, "waitme", this.user_id, "name").then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        _this.waitMeList = res.result.res_data;
                    }
                });
            }
        }
        else if (this.pet == "3") {
            if (event.id == 1) {
                search_text = event.name.replace("搜 单号：", "");
                this.mService.search_material_request(search_text, "already", this.user_id, "expense_no").then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        _this.alreadyList = res.result.res_data;
                    }
                });
            }
            else {
                search_text = event.name.replace("搜 申请人：", "");
                this.mService.search_material_request(search_text, "already", this.user_id, "name").then(function (res) {
                    console.log(res);
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        _this.alreadyList = res.result.res_data;
                    }
                });
            }
        }
    };
    MaterialRequestPage.prototype.changeType = function (state) {
        if (state.toLowerCase() == "pick_type") {
            return "产线领用";
        }
        else if (state.toLowerCase() == "proofing") {
            return "工程领用";
        }
        else {
            return state;
        }
    };
    MaterialRequestPage.prototype.clickMyApply = function () {
        this.doRefresh(null);
    };
    MaterialRequestPage.prototype.clickWaitMeApply = function () {
        this.doRefresh(null);
    };
    MaterialRequestPage.prototype.clickAlreadyApply = function () {
        this.doRefresh(null);
    };
    MaterialRequestPage.prototype.doRefresh = function (refresh) {
        var _this = this;
        this.limit = 20;
        this.offset = 0;
        if (this.pet == 1) {
            this.mService.get_material_request_list(this.limit, this.offset, this.user_id).then(function (res) {
                if (refresh) {
                    refresh.complete();
                }
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.materialList = res.result.res_data;
                }
                else {
                    _this.materialList = [];
                }
            });
        }
        else if (this.pet == "2") {
            this.mService.get_wait_me_material_request_list(this.limit, this.offset, this.user_id).then(function (res) {
                console.log(res);
                if (refresh) {
                    refresh.complete();
                }
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.waitMeList = res.result.res_data.data;
                    _this.waitMeTitle = "待我审批(" + res.result.res_data.count + ")";
                }
                else {
                    _this.waitMeList = [];
                    _this.waitMeTitle = "待我审批(0)";
                }
            });
        }
        else if (this.pet == "3") {
            this.mService.get_already_material_request_list(this.limit, this.offset, this.user_id).then(function (res) {
                // console.log(res)
                if (refresh) {
                    refresh.complete();
                }
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.alreadyList = res.result.res_data;
                }
                else {
                    _this.alreadyList = [];
                }
            });
        }
    };
    MaterialRequestPage.prototype.doInfinite = function (infinite) {
        var _this = this;
        this.limit = 20;
        this.offset = this.offset + 20;
        if (this.pet == "1") {
            if (this.isMoreData == true) {
                this.mService.get_material_request_list(this.limit, this.offset, this.user_id).then(function (res) {
                    var item_data = [];
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        item_data = res.result.res_data;
                        if (item_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, item_data_1 = item_data; _i < item_data_1.length; _i++) {
                            var item = item_data_1[_i];
                            _this.materialList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    infinite.complete();
                });
            }
            else {
                infinite.complete();
            }
        }
        else if (this.pet == "2") {
            if (this.isMoreData == true) {
                this.mService.get_wait_me_material_request_list(this.limit, this.offset, this.user_id).then(function (res) {
                    var item_data = [];
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        item_data = res.result.res_data;
                        if (item_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, item_data_2 = item_data; _i < item_data_2.length; _i++) {
                            var item = item_data_2[_i];
                            _this.waitMeList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    infinite.complete();
                });
            }
            else {
                infinite.complete();
            }
        }
        else if (this.pet == "3") {
            if (this.isMoreData == true) {
                this.mService.get_already_material_request_list(this.limit, this.offset, this.user_id).then(function (res) {
                    var item_data = [];
                    if (res.result && res.result.res_code == 1 && res.result.res_data) {
                        item_data = res.result.res_data;
                        if (item_data.length == 20) {
                            _this.isMoreData = true;
                        }
                        else {
                            _this.isMoreData = false;
                        }
                        for (var _i = 0, item_data_3 = item_data; _i < item_data_3.length; _i++) {
                            var item = item_data_3[_i];
                            _this.alreadyList.push(item);
                        }
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    infinite.complete();
                });
            }
            else {
                infinite.complete();
            }
        }
    };
    MaterialRequestPage.prototype.changeState = function (state) {
        if (state.toLowerCase() == "canceled") {
            return "已取消";
        }
        else if (state.toLowerCase() == "to_submit") {
            return "待提交";
        }
        else if (state.toLowerCase() == "submitted") {
            return "已提交";
        }
        else if (state.toLowerCase() == "to_approved") {
            return "待审批";
        }
        else if (state.toLowerCase() == "review_ing") {
            return "审核中";
        }
        else if (state.toLowerCase() == "approved_finish") {
            return "等待领料";
        }
        else if (state.toLowerCase() == "finish_pick") {
            return "完成";
        }
        else if (state.toLowerCase() == "refused") {
            return "已拒绝";
        }
    };
    MaterialRequestPage.prototype.changeStateWithName = function (item) {
        if (item.who_review_now.name) {
            if (item.picking_state == "approved_finish" || item.picking_state == "finish_pick" || item.picking_state == "cancel") {
                return this.changeState(item.picking_state);
            }
            else {
                return this.changeState(item.picking_state) + '/' + item.who_review_now.name;
            }
        }
        else {
            return this.changeState(item.picking_state);
        }
    };
    MaterialRequestPage.prototype.clickItem = function (item) {
        this.navCtrl.push('MaterialRequestDetailPage', {
            item: item,
        });
    };
    MaterialRequestPage.prototype.clickEdit = function (item) {
        this.navCtrl.push('EditMaterialRequestPage', {
            item: item,
        });
    };
    return MaterialRequestPage;
}());
MaterialRequestPage = material_request___decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-material-request',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/material-request.html"*/'<!--\n  Generated template for the MaterialRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>工程领料</ion-title>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet">\n      <ion-segment-button tappable (click)=\'clickMyApply()\' value="1">\n        我的申请\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickWaitMeApply()\' value="2">\n        {{waitMeTitle}}\n      </ion-segment-button>\n      <ion-segment-button tappable (click)=\'clickAlreadyApply()\' value="3">\n        我已审批\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content style="background:#f0f0f0">\n  <div [ngSwitch]="pet" >\n   <ng-template [ngSwitchCase]=\'1\'>\n      <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected)="itemSelected($event)" [dataProvider]="materialAutoService"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n  <ion-item-group style="background-color:#f2f2f2;">\n    <ion-item no-lines *ngFor=\'let item of materialList\' style="margin-top:10px" tappable (click) = "clickItem(item)">\n      <p style="float:right;margin-top:7px;">{{item.delivery_date}}</p>\n      <button ion-button style="background-color:white;color:#55c4f5;border-color:#55c4f5;border-width:1px;border-style:solid;margin-left:10px;border-radius:20px" small>{{changeType(item.picking_type)}}</button>\n      <p style="font-size:16px;color:black;float:left;margin-top:7px;">{{item.name}}</p>\n      <p style="margin-top:1px;">交货日期：{{item.delivery_date}}</p>\n      <p style="font-size:13px;color:orange;float:right;margin-top:-25px;">{{changeStateWithName(item)}}</p>\n      <p style="margin-top:3px;">领料原因：{{item.picking_cause}}</p>\n    </ion-item>\n  </ion-item-group>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ng-template>\n\n<ng-template [ngSwitchCase]=\'2\'>\n      <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected)="itemSelected_two($event)" [dataProvider]="twoAuto"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n  <ion-item-group style="background-color:#f2f2f2;">\n    <ion-item no-lines  *ngFor=\'let item of waitMeList\' style="margin-top:10px" tappable (click) = "clickEdit(item)">\n      <p style="float:right;margin-top:7px;">{{item.delivery_date}}</p>\n      <button ion-button style="background-color:white;color:#55c4f5;border-color:#55c4f5;border-width:1px;border-style:solid;margin-left:10px;border-radius:20px" small>{{changeType(item.picking_type)}}</button>\n      <p style="font-size:16px;color:black;float:left;margin-top:7px;">{{item.name}}</p>\n      <p style="font-size:14px;color:black;margin-top:-4px">{{item.my_create_uid.name}}</p>\n      <p style="font-size:13px;color:orange;float:right;margin-top:-15px">{{changeState(item.picking_state)}}</p>\n      <p style="margin-top:3px;">交货日期：{{item.delivery_date}}</p>\n      <p style="margin-top:3px;">领料原因：{{item.picking_cause}}</p>\n    </ion-item>\n  </ion-item-group>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ng-template>\n\n  <ng-template [ngSwitchCase]=\'3\'>\n      <ion-auto-complete style="width: 94vw;margin-left:3vw" (itemSelected)="itemSelected_two($event)" [dataProvider]="twoAuto"></ion-auto-complete>\n      <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n  <ion-item-group style="background-color:#f2f2f2;">\n    <ion-item no-lines *ngFor=\'let item of alreadyList\' style="margin-top:10px" tappable (click) = "clickItem(item)">\n      <p style="float:right;margin-top:7px;">{{item.delivery_date}}</p>\n      <button ion-button style="background-color:white;color:#55c4f5;border-color:#55c4f5;border-width:1px;border-style:solid;margin-left:10px;border-radius:20px" small>{{changeType(item.picking_type)}}</button>\n      <p style="font-size:16px;color:black;float:left;margin-top:7px;">{{item.name}}</p>\n      <p style="font-size:14px;color:black;margin-top:-4px">{{item.my_create_uid.name}}</p>\n      <p style="font-size:13px;color:orange;float:right;margin-top:-15px">{{changeStateWithName(item)}}</p>\n      <p style="margin-top:3px;">交货日期：{{item.delivery_date}}</p>\n      <p style="margin-top:3px;">领料原因：{{item.picking_cause}}</p>\n    </ion-item>\n  </ion-item-group>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ng-template>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/material-request/material-request.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__materialService__["a" /* materialService */], MaterialAutoService, MaterialTwoAutoService],
    }),
    material_request___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__materialService__["a" /* materialService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], MaterialAutoService, MaterialTwoAutoService])
], MaterialRequestPage);

//# sourceMappingURL=material-request.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/material-request/material-request.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialRequestPageModule", function() { return MaterialRequestPageModule; });
/* harmony import */ var material_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var material_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(739);
var material_request_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MaterialRequestPageModule = (function () {
    function MaterialRequestPageModule() {
    }
    return MaterialRequestPageModule;
}());
MaterialRequestPageModule = material_request_module___decorate([
    material_request_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            MaterialRequestPage,
        ],
        imports: [
            material_request_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(MaterialRequestPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */],
        ],
    })
], MaterialRequestPageModule);

//# sourceMappingURL=material-request.module.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoCompleteModule; });
/* unused harmony export AutoCompleteComponent */
/* unused harmony export BoldPrefix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);






// searchbar default options
var defaultOpts = {
    cancelButtonText: 'Cancel',
    showCancelButton: false,
    debounce: 250,
    placeholder: '搜索',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'off',
    type: 'search',
    value: '',
    noItems: '',
    clearOnEdit: false,
    clearInput: false
};
var AutoCompleteComponent = (function () {
    /**
     * create a new instace
     */
    function AutoCompleteComponent() {
        this.hideListOnSelection = true;
        this.showListChanged = false;
        this.keyword = null;
        this.suggestions = [];
        this._showList = false;
        this.itemSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemClearSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.itemsHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.ionAutoInput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoFocus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.autoBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.options = {};
        // set default options
        this.defaultOpts = defaultOpts;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "showList", {
        /**
         * @return {?}
         */
        get: function () {
            return this._showList;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._showList === value) {
                return;
            }
            this._showList = value;
            this.showListChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AutoCompleteComponent.prototype.ngAfterViewChecked = function () {
        if (this.showListChanged) {
            this.showListChanged = false;
            this.showList ? this.itemsShown.emit() : this.itemsHidden.emit();
        }
    };
    /**
     * get items for auto-complete
     * @return {?}
     */
    AutoCompleteComponent.prototype.getItems = function () {
        var _this = this;
        var /** @type {?} */ result;
        if (this.showResultsFirst && !this.keyword) {
            this.keyword = '';
        }
        else if (this.keyword.trim() === '') {
            this.suggestions = [];
            return;
        }
        if (typeof this.dataProvider === 'function') {
            result = this.dataProvider(this.keyword);
        }
        else {
            result = this.dataProvider.getResults(this.keyword);
        }
        // if result is instanceof Subject, use it asObservable
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]) {
            result = result.asObservable();
        }
        // if query is async
        if (result instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"]) {
            result
                .subscribe(function (results) {
                _this.suggestions = results;
                _this.showItemList();
            }, function (error) { return console.error(error); });
        }
        else {
            this.suggestions = result;
            this.showItemList();
        }
        // emit event
        this.ionAutoInput.emit(this.keyword);
    };
    /**
     * show item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.showItemList = function () {
        this.showList = true;
    };
    /**
     * hide item list
     * @return {?}
     */
    AutoCompleteComponent.prototype.hideItemList = function () {
        this.showList = this.alwaysShowList;
    };
    /**
     * select item from list
     *
     * @param {?} selection
     *
     * @return {?}
     */
    AutoCompleteComponent.prototype.select = function (selection) {
        // this.keyword = this.dataProvider.labelAttribute == null || selection[this.dataProvider.labelAttribute] == null
        //     ? selection : selection[this.dataProvider.labelAttribute];
        // if (this.hideListOnSelection) {
        //     this.hideItemList();
        // }
        // // emit selection event
        this.hideItemList();
        this.itemSelected.emit(selection);
        this.selection = selection;
    };
    /**
     * get current selection
     * @return {?}
     */
    AutoCompleteComponent.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * get current input value
     * @return {?}
     */
    AutoCompleteComponent.prototype.getValue = function () {
        return this.keyword;
    };
    /**
     * set current input value
     * @param {?} value
     * @return {?}
     */
    AutoCompleteComponent.prototype.setValue = function (value) {
        this.keyword = value;
        return;
    };
    /**
     * /**
     * clear current input value
     * @param {?=} hideItemList
     * @return {?}
     */
    AutoCompleteComponent.prototype.clearValue = function (hideItemList) {
        if (hideItemList === void 0) { hideItemList = false; }
        this.keyword = null;
        this.selection = null;
        if (hideItemList) {
            this.hideItemList();
            this.itemClearSelected.emit(true)
        }
        return;
    };
    /**
     * set focus of searchbar
     * @return {?}
     */
    AutoCompleteComponent.prototype.setFocus = function () {
        if (this.searchbarElem) {
            this.searchbarElem.setFocus();
        }
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onFocus = function () {
        this.autoFocus.emit();
    };
    /**
     * fired when the input focused
     * @return {?}
     */
    AutoCompleteComponent.prototype.onBlur = function () {
        this.autoBlur.emit();
    };
    /**
     * handle document click
     * @param {?} event
     * @return {?}
     */
    AutoCompleteComponent.prototype.documentClickHandler = function (event) {
        if ((this.searchbarElem
            && !this.searchbarElem._elementRef.nativeElement.contains(event.target))
            ||
                (!this.inputElem && this.inputElem._elementRef.nativeElement.contains(event.target))) {
            this.hideItemList();
        }
    };
    return AutoCompleteComponent;
}());
AutoCompleteComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                host: {
                    '(document:click)': 'documentClickHandler($event)',
                },
                template: "\n      <ion-input\n              #inputElem\n              (keyup)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [clearOnEdit]=\"options.clearOnEdit == null ? defaultOpts.clearOnEdit : options.clearOnEdit\"\n              [clearInput]=\"options.clearInput == null ? defaultOpts.clearInput : options.clearInput\"\n              [ngClass]=\"{'hidden': !useIonInput}\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-input>\n      <ion-searchbar\n              #searchbarElem\n              (ionInput)=\"getItems($event)\"\n              (tap)=\"showResultsFirst && getItems()\"\n              [(ngModel)]=\"keyword\"\n              [cancelButtonText]=\"options.cancelButtonText == null ? defaultOpts.cancelButtonText : options.cancelButtonText\"\n              [showCancelButton]=\"options.showCancelButton == null ? defaultOpts.showCancelButton : options.showCancelButton\"\n              [debounce]=\"options.debounce == null ? defaultOpts.debounce : options.debounce\"\n              [placeholder]=\"options.placeholder == null ? defaultOpts.placeholder : options.placeholder\"\n              [autocomplete]=\"options.autocomplete == null ? defaultOpts.autocomplete : options.autocomplete\"\n              [autocorrect]=\"options.autocorrect == null ? defaultOpts.autocorrect : options.autocorrect\"\n              [spellcheck]=\"options.spellcheck == null ? defaultOpts.spellcheck : options.spellcheck\"\n              [type]=\"options.type == null ? defaultOpts.type : options.type\"\n              [ngClass]=\"{'hidden': useIonInput}\"\n              (ionClear)=\"clearValue(true)\"\n              (ionFocus)=\"onFocus()\"\n              (ionBlur)=\"onBlur()\"\n      >\n      </ion-searchbar>\n      <ng-template #defaultTemplate let-attrs=\"attrs\">\n          <span [innerHTML]='(attrs.labelAttribute ? attrs.data[attrs.labelAttribute] : attrs.data) | boldprefix:attrs.keyword'></span>\n      </ng-template>\n      <ul *ngIf=\"suggestions.length > 0 && showList\">\n          <li *ngFor=\"let suggestion of suggestions\" (tap)=\"select(suggestion);$event.srcEvent.stopPropagation()\">\n              <ng-template\n                      [ngTemplateOutlet]=\"template || defaultTemplate\"\n                      [ngOutletContext]=\"\n                        {attrs:{ data: suggestion, keyword: keyword, labelAttribute: dataProvider.labelAttribute }}\"></ng-template>\n          </li>\n      </ul>\n      <p *ngIf=\"suggestions.length == 0 && showList && options.noItems\">{{ options.noItems }}</p>\n  ",
                selector: 'ion-auto-complete'
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteComponent.ctorParameters = function () { return []; };
AutoCompleteComponent.propDecorators = {
    'dataProvider': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'keyword': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showResultsFirst': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'alwaysShowList': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'hideListOnSelection': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'useIonInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'autoFocus': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'autoBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemClearSelected': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsShown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'itemsHidden': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'ionAutoInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'searchbarElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['searchbarElem',] },],
    'inputElem': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['inputElem',] },],
};

/**
 * bolds the beggining of the matching string in the item
 */
var BoldPrefix = (function () {
    function BoldPrefix() {
    }
    /**
     * @param {?} value
     * @param {?} keyword
     * @return {?}
     */
    BoldPrefix.prototype.transform = function (value, keyword) {
        if (!keyword)
            return value;
        var /** @type {?} */ escaped_keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return value.replace(new RegExp(escaped_keyword, 'gi'), function (str) { return str.bold(); });
    };
    return BoldPrefix;
}());
BoldPrefix.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"], args: [{
                name: 'boldprefix'
            },] },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
BoldPrefix.ctorParameters = function () { return []; };

var AutoCompleteModule = (function () {
    function AutoCompleteModule() {
    }
    /**
     * @return {?}
     */
    AutoCompleteModule.forRoot = function () {
        return {
            ngModule: AutoCompleteModule,
            providers: []
        };
    };
    return AutoCompleteModule;
}());
AutoCompleteModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                    __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* IonicModule */]
                ],
                declarations: [
                    AutoCompleteComponent,
                    BoldPrefix
                ],
                exports: [
                    AutoCompleteComponent,
                    BoldPrefix
                ]
            },] },
];
/**
 * @nocollapse
 */
AutoCompleteModule.ctorParameters = function () { return []; };




/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return materialService; });
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


var materialService = (function () {
    function materialService(httpservice) {
        this.httpservice = httpservice;
    }
    materialService.prototype.get_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_material_request_list", body);
    };
    materialService.prototype.get_wait_me_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_wait_me_material_request_list", body);
    };
    materialService.prototype.get_already_material_request_list = function (limit, offset, user_id) {
        var body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_already_material_request_list", body);
    };
    materialService.prototype.get_final_review = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_final_review", body);
    };
    materialService.prototype.search_employee = function (name) {
        var body = JSON.stringify({
            name: name,
        });
        return this.httpservice.postBody("search_employee", body);
    };
    materialService.prototype.action_pass = function (id, remark, create_uid) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
        });
        return this.httpservice.postBody("action_pass", body);
    };
    materialService.prototype.action_deny = function (id, remark, create_uid) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
        });
        return this.httpservice.postBody("action_deny", body);
    };
    materialService.prototype.action_to_next = function (id, remark, create_uid, to_last_review, type, partner_name, partner_id) {
        var body = JSON.stringify({
            id: id,
            remark: remark,
            create_uid: create_uid,
            to_last_review: to_last_review,
            type: type,
            partner_name: partner_name,
            partner_id: partner_id,
        });
        return this.httpservice.postBody("action_to_next", body);
    };
    materialService.prototype.search_material_request = function (search_text, type, user_id, waitme_type) {
        var body = JSON.stringify({
            search_text: search_text,
            type: type,
            user_id: user_id,
            waitme_type: waitme_type,
        });
        return this.httpservice.postBody("search_material_request", body);
    };
    return materialService;
}());
materialService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], materialService);

//# sourceMappingURL=materialService.js.map

/***/ })

});
//# sourceMappingURL=23.js.map