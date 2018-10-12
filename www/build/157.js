webpackJsonp([157],{

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/inspection-detail/inspectionService.ts
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


var InspectionService = (function () {
    function InspectionService(httpservice) {
        this.httpservice = httpservice;
    }
    // 全部退回
    InspectionService.prototype.requestBack = function (production_ids, pickIds) {
        var body = JSON.stringify({
            state: 'reject',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    };
    InspectionService.prototype.createDebtOrder = function (production_ids, pickIds) {
        var body = JSON.stringify({
            state: 'process',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    };
    //不创建欠单或者 不用做操作就请求这个
    InspectionService.prototype.noDebtOrder = function (production_ids, pickIds) {
        var body = JSON.stringify({
            state: 'cancel_backorder',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    };
    //去分拣
    InspectionService.prototype.goFenjian = function (production_ids, pickIds) {
        var body = JSON.stringify({
            state: 'to_picking',
            is_all: "part",
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    };
    // 全部入库
    InspectionService.prototype.allIncoming = function (production_ids, pickIds) {
        var body = JSON.stringify({
            state: 'transfer_way',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            is_all: 'all',
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    };
    // 仅良品入库，不良品退回
    InspectionService.prototype.onlyGoodProductsIncoming = function (production_ids, pickIds) {
        var body = JSON.stringify({
            state: 'transfer_way',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            is_all: 'part',
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    };
    return InspectionService;
}());
InspectionService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], InspectionService);

//# sourceMappingURL=inspectionService.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/inspection-detail/inspection-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
var inspection_detail___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var inspection_detail___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the InspectionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var InspectionDetailPage = (function () {
    function InspectionDetailPage(navCtrl, navParams, alertCtrl, inspectionService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.inspectionService = inspectionService;
        this.isClick = false;
        this.showFenjian = false;
        this.item = this.navParams.get('item');
        this.initData(this.item);
        this.frontPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("IncomingPage", navCtrl);
    }
    InspectionDetailPage.prototype.initData = function (mitem) {
        this.item = mitem;
        var rejectQTY = 0;
        for (var _i = 0, _a = this.item.pack_operation_product_ids; _i < _a.length; _i++) {
            var item = _a[_i];
            rejectQTY += item.rejects_qty;
        }
        if (rejectQTY > 0) {
            this.showFenjian = true;
        }
        if (this.item.qc_result == 'success') {
            this.qc_result = '品检通过';
        }
        else if (this.item.qc_result == 'no_result') {
            this.qc_result = '为以前的品检单,无品检结果记录	';
        }
        else {
            this.qc_result = '品检失败';
        }
        this.qc_note = this.item.qc_note;
        var picture = [];
        picture.push(this.item.qc_img);
        this.picture = picture;
        var newPack = [];
        for (var _b = 0, _c = this.item.pack_operation_product_ids; _b < _c.length; _b++) {
            var product = _c[_b];
            if (product.pack_id != -1) {
                newPack.push(product);
            }
        }
        this.pack = newPack;
        console.log(this.item);
    };
    InspectionDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InspectionDetailPage');
    };
    InspectionDetailPage.prototype.clickBack = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '是否全部退回?',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.doRequestBack();
                    }
                }
            ]
        });
        alert.present();
    };
    InspectionDetailPage.prototype.doRequestBack = function () {
        var _this = this;
        var self = this;
        this.inspectionService.requestBack(this.pack, this.item.picking_id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                // self.mIncomingDetailPage.data.item = res.result.res_data;
                // this.initData(res.result.res_data);
                // self.mIncomingDetailPage.data.isPop = true;
                // self.navCtrl.popTo(self.mIncomingDetailPage);
                _this.navCtrl.popTo(_this.frontPage);
            }
            console.log(res);
        });
    };
    //是否品检通过
    InspectionDetailPage.prototype.isSpecial = function () {
        if (this.item.qc_result == 'success') {
            return true;
        }
        else {
            return false;
        }
    };
    InspectionDetailPage.prototype.noButton = function () {
        return false;
    };
    InspectionDetailPage.prototype.agreeIncoming = function () {
        var rejectQTY = 0;
        var productQTY = 0;
        var QTYDone = 0;
        for (var _i = 0, _a = this.item.pack_operation_product_ids; _i < _a.length; _i++) {
            var item = _a[_i];
            rejectQTY += item.rejects_qty;
            productQTY += item.product_qty;
            QTYDone += item.qty_done;
        }
        if (rejectQTY > 0) {
            // 有不良品
            if (!this.isClick) {
                this.contansBadProduct(QTYDone - rejectQTY, rejectQTY, productQTY, QTYDone);
            }
            else {
                this.contansBadProduct(QTYDone, rejectQTY, productQTY, QTYDone);
            }
        }
        else {
            this.checkIfHaveDebt(productQTY, QTYDone, rejectQTY, true);
        }
    };
    // 是否有未完成数量 如果不是全部入库，要减去不良品的数量
    InspectionDetailPage.prototype.checkIfHaveDebt = function (productQTY, QTYDone, rejectQTY, isALL) {
        if (isALL) {
            if (productQTY > QTYDone) {
                // 有未完成数量
                this.alertCreateDebt();
            }
            else {
                // 入库调拨成功，等待入库
                this.alertWaitingIncoming();
            }
        }
        else {
            if (productQTY > QTYDone - rejectQTY) {
                // 有未完成数量
                this.alertCreateDebt();
            }
            else {
                // 入库调拨成功，等待入库
                this.alertWaitingIncoming();
            }
        }
    };
    InspectionDetailPage.prototype.contansBadProduct = function (goodProduct, rejectQTY, productQTY, QTYDone) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '请选择入库方式',
            message: '良品：' + goodProduct + ',不良品 ：' + rejectQTY,
            buttons: [
                {
                    text: '全部入库',
                    handler: function () {
                        _this.inspectionService.allIncoming(_this.pack, _this.item.picking_id)
                            .then(function (res) {
                            if (res.result && res.result.res_code == 1) {
                                _this.initData(res.result.res_data);
                                _this.isClick = true;
                                _this.checkIfHaveDebt(productQTY, QTYDone, rejectQTY, true);
                            }
                        });
                    }
                },
                {
                    text: '仅良品入库，不良品退回',
                    handler: function () {
                        _this.inspectionService.onlyGoodProductsIncoming(_this.pack, _this.item.picking_id)
                            .then(function (res) {
                            if (res.result && res.result.res_code == 1) {
                                _this.initData(res.result.res_data);
                                _this.isClick = true;
                                _this.checkIfHaveDebt(productQTY, QTYDone, rejectQTY, false);
                            }
                        });
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                }
            ]
        });
        alert.present();
    };
    InspectionDetailPage.prototype.alertCreateDebt = function () {
        var _this = this;
        var self = this;
        var alert = this.alertCtrl.create({
            title: '请选择入库方式',
            message: "有未完成的数量，是否创建欠单",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: '创建欠单',
                    handler: function () {
                        _this.inspectionService.createDebtOrder(_this.pack, _this.item.picking_id)
                            .then(function (res) {
                            if (res.result && res.result.res_code == 1) {
                                // self.mIncomingDetailPage.data.item = res.result.res_data;
                                // this.initData(res.result.res_data);
                                // self.mIncomingDetailPage.data.isPop = true;
                                // self.navCtrl.popTo(self.mIncomingDetailPage);
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                            console.log(res);
                        });
                    }
                },
                {
                    text: '没有欠单',
                    handler: function () {
                        _this.inspectionService.noDebtOrder(_this.pack, _this.item.picking_id)
                            .then(function (res) {
                            if (res.result && res.result.res_code == 1) {
                                // self.mIncomingDetailPage.data.item = res.result.res_data;
                                // this.initData(res.result.res_data);
                                // self.mIncomingDetailPage.data.isPop = true;
                                // self.navCtrl.popTo(self.mIncomingDetailPage);
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                            console.log(res);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    InspectionDetailPage.prototype.goFenJian = function () {
        var _this = this;
        var self = this;
        var alert = this.alertCtrl.create({
            title: "提示",
            subTitle: '确定全部送去分拣?',
            message: "说明:分拣后将按照分拣结果良品入库,不良品退回",
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.inspectionService.goFenjian(_this.pack, _this.item.picking_id)
                            .then(function (res) {
                            if (res.result && res.result.res_code == 1) {
                                _this.initData(res.result.res_data);
                                _this.isClick = true;
                                _this.alertCreateDebt();
                            }
                            console.log(res);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    InspectionDetailPage.prototype.alertWaitingIncoming = function () {
        var _this = this;
        var self = this;
        this.inspectionService.noDebtOrder(this.pack, this.item.picking_id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                // self.mIncomingDetailPage.data.item = res.result.res_data;
                _this.initData(res.result.res_data);
                // self.mIncomingDetailPage.data.isPop = true;
                var alert_1 = _this.alertCtrl.create({
                    title: '提示',
                    message: "入库调拨成功，等待入库",
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                // self.navCtrl.popTo(self.mIncomingDetailPage);
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        },
                    ]
                });
                alert_1.present();
            }
            console.log(res);
        });
    };
    InspectionDetailPage.prototype.alertWaitingFenjian = function () {
        var _this = this;
        var self = this;
        this.inspectionService.noDebtOrder(this.pack, this.item.picking_id)
            .then(function (res) {
            if (res.result && res.result.res_code == 1) {
                // self.mIncomingDetailPage.data.item = res.result.res_data;
                _this.initData(res.result.res_data);
                // self.mIncomingDetailPage.data.isPop = true;
                var alert_2 = _this.alertCtrl.create({
                    title: '提示',
                    message: "入库调拨成功，等待分拣",
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                // self.navCtrl.popTo(self.mIncomingDetailPage);
                                _this.navCtrl.popTo(_this.frontPage);
                            }
                        },
                    ]
                });
                alert_2.present();
            }
            console.log(res);
        });
    };
    return InspectionDetailPage;
}());
InspectionDetailPage = inspection_detail___decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-inspection-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/inspection-detail/inspection-detail.html"*/'<!--\n  Generated template for the InspectionDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>品检详细</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-item>\n    <ion-label>品检结果</ion-label>\n    <div style="border-radius:8%;text-align:center;width:30%" item-end [style.background]="isSpecial()?\'#4bb53a\':\'#ff6622\'">{{qc_result}}</div>\n  </ion-item>\n  <ion-item>\n    <ion-label>品检批注</ion-label>\n    <ion-label text-wrap>{{qc_note}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>品检图片</ion-label>\n  </ion-item>\n  <ion-list *ngFor=\'let pic of picture\' padding>\n    <ion-img width="100" height="100" src={{pic}}>\n    </ion-img>\n  </ion-list>\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar>\n    <div style="display:flex ;justify-content:space-around">\n    <button ion-button round ion-start tappable (click)=\'clickBack()\' style="flex :1 1 100%"> 退回 </button>\n    <button ion-button round ion-end  tappable (click)=\'agreeIncoming()\' style="flex :1 1 100%"> 采购确认</button>\n    <button  *ngIf="showFenjian" style="flex :1 1 100%"  ion-button round ion-end tappable (click)=\'goFenJian()\'> 去分拣</button>\n  </div>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/inspection-detail/inspection-detail.html"*/,
        providers: [InspectionService]
    }),
    inspection_detail___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["x" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
        InspectionService])
], InspectionDetailPage);

//# sourceMappingURL=inspection-detail.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/inspection-detail/inspection-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectionDetailPageModule", function() { return InspectionDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var inspection_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InspectionDetailPageModule = (function () {
    function InspectionDetailPageModule() {
    }
    return InspectionDetailPageModule;
}());
InspectionDetailPageModule = inspection_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            InspectionDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(InspectionDetailPage),
        ],
        exports: [
            InspectionDetailPage
        ],
    })
], InspectionDetailPageModule);

//# sourceMappingURL=inspection-detail.module.js.map

/***/ })

});
//# sourceMappingURL=157.js.map