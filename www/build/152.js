webpackJsonp([152],{

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/new-production/new-stock-move/new-stock-move.ts
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
 * Generated class for the NewStockMovePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var NewStockMovePage = (function () {
    function NewStockMovePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = navParams.get('item');
    }
    NewStockMovePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewStockMovePage');
    };
    NewStockMovePage.prototype.getFirst = function (item) {
        return "源单据:" + item.origin;
    };
    NewStockMovePage.prototype.getSecond = function (item) {
        return "参考:" + item.picking_id;
    };
    NewStockMovePage.prototype.getThird = function (item) {
        return "说明:" + item.product_id.product_name;
    };
    NewStockMovePage.prototype.getType = function (items) {
        var str = "333";
        if (items.move_order_type == "procurement_warehousing") {
            str = "采购入库";
        }
        else if (items.move_order_type == "purchase_return") {
            str = "采购退货";
        }
        else if (items.move_order_type == "sell_return") {
            str = "销售退货";
        }
        else if (items.move_order_type == "sell_out") {
            str = "销售出库";
        }
        else if (items.move_order_type == "manufacturing_orders") {
            str = "制造入库";
        }
        else if (items.move_order_type == "manufacturing_picking") {
            str = "制造领料";
        }
        else if (items.move_order_type == "inventory_in") {
            str = "盘点入库";
        }
        else if (items.move_order_type == "inventory_out") {
            str = "盘点出库";
        }
        return str;
    };
    NewStockMovePage.prototype.getState = function (items) {
        var state_str = "";
        if (items.state == "done") {
            state_str = "完成";
        }
        else if (items.state == "confirmed") {
            state_str = "已确认";
        }
        else if (items.state == "cancel") {
            state_str = "已取消";
        }
        return state_str;
    };
    NewStockMovePage.prototype.getChuku = function (items) {
        return "出入库数量:" + items.product_uom_qty;
    };
    NewStockMovePage.prototype.getKucun = function (items) {
        return "当前库存数:" + items.quantity_adjusted_qty;
    };
    return NewStockMovePage;
}());
NewStockMovePage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-new-stock-move',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/new-stock-move/new-stock-move.html"*/'<!--\n  Generated template for the NewStockMovePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>库存移动</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list *ngIf="item">\n    <ion-item *ngFor="let items of item">\n      <button *ngIf="items.move_order_type" ion-button style="background-color:white;color:#55c4f5;border-color:#55c4f5;border-width:1px;border-style:solid;margin-left:10px;" small>{{getType(items)}}</button>\n      <p style="float:right;color:red;margin-top:6px;">{{getState(items)}}</p>\n      <p *ngIf="items.move_order_type" style="font-size:15px;color:black;float:left;margin-top:7px;">{{items.write_uid}}</p>\n      <p *ngIf="!items.move_order_type" style="font-size:15px;color:black;margin-top:7px;">{{items.write_uid}}</p>\n      <p></p>\n      <p style="float:right;margin-right:70px;margin-top:1px">{{getChuku(items)}}</p>\n      <p style="margin-top:3px;">{{getFirst(items)}}</p>\n      <p style="float:right;margin-right:70px;margin-top:1px">{{getKucun(items)}}</p>\n      <p >{{getSecond(items)}}</p>\n      <p text-wrap style="width:100%">{{getThird(items)}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/new-production/new-stock-move/new-stock-move.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */]])
], NewStockMovePage);

//# sourceMappingURL=new-stock-move.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/new-production/new-stock-move/new-stock-move.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewStockMovePageModule", function() { return NewStockMovePageModule; });
/* harmony import */ var new_stock_move_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var new_stock_move_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var new_stock_move_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NewStockMovePageModule = (function () {
    function NewStockMovePageModule() {
    }
    return NewStockMovePageModule;
}());
NewStockMovePageModule = new_stock_move_module___decorate([
    new_stock_move_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            NewStockMovePage,
        ],
        imports: [
            new_stock_move_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(NewStockMovePage),
        ],
    })
], NewStockMovePageModule);

//# sourceMappingURL=new-stock-move.module.js.map

/***/ })

});
//# sourceMappingURL=152.js.map