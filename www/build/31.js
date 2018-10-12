webpackJsonp([31],{

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/work-bench.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__commonUseServices__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(67);
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
 * Generated class for the WorkBenchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var WorkBenchPage = (function () {
    function WorkBenchPage(navCtrl, navParams, storage, services, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.services = services;
        this.statusbar = statusbar;
        this.isBig = true; //是否超过10数目
        this.isBigPay = true;
        this.isShowEngineerPoint = false; //工程小红点
        this.isShowBuyPoint = false; //采购小红点
        this.isNormal = false; //通用
        this.isSale = false; //销售
        this.isBuy = false; //采购
        this.isShowPurchase = false;
        this.isShowSale = false;
        this.isShowKucun = false;
        this.isShowNormal = false;
        this.isShowEngineer = true;
        this.isHR = false;
        this.isShowZiJin = false;
        this.isZZList = false;
        this.isShenGouList = false;
        this.isBaoxiaoList = false;
        this.zz_count = 0;
        this.sg_count = 0;
        this.bx_count = 0;
        this.py_count = 0;
        this.kc_count = 0;
        this.isShowPayment = false;
        this.isShowKaoqin = true;
        this.isShowSG = true;
        this.isShowBX = true;
        this.isShowZZ = true;
        this.isShowKN = true;
        this.performance = 0;
        this.vacation_num = 0;
        this.recoup_num = 0;
    }
    WorkBenchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WorkBenchPage');
    };
    WorkBenchPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
    };
    WorkBenchPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.isShowKaoqin = true;
        this.isShowBX = false;
        this.isShowZZ = false;
        this.isShowKN = false;
        this.isShowSG = false;
        this.storage.get('user')
            .then(function (res) {
            console.log(res);
            var uid = res.result.res_data.user_id;
            _this.storage.get("loginIndex").then(function (res) {
                _this.loginIndex = res;
                console.log("loginIndex = " + _this.loginIndex);
                if (_this.loginIndex == 0) {
                    _this.isShowEngineer = false;
                    _this.isEngineer = false;
                    _this.isShowNormal = false;
                    _this.isNormal = false;
                    var body = {
                        'uid': uid
                    };
                    _this.services.get_all_num(body).then(function (res) {
                        if (res.result.res_code == 1 && res.result) {
                            console.log(res);
                            _this.performance = res.result.res_data.performance;
                            _this.vacation_num = res.result.res_data.vacation_num;
                            _this.recoup_num = res.result.res_data.recoup_num;
                        }
                    });
                }
            });
            var is_plus = false;
            var is_manager = false;
            var need_all = false;
            for (var _i = 0, _a = res.result.res_data.groups; _i < _a.length; _i++) {
                var product = _a[_i];
                if (product.name == 'group_inventory_user') {
                    _this.isShowKucun = true;
                }
                if (product.name == 'group_sale_salesman' || product.name == 'group_sale_manager' || product.name == 'group_sale_salesman_all_leads') {
                    _this.isShowSale = true;
                    _this.isSale = true;
                    _this.isBuy = false;
                    _this.isEngineer = false;
                    _this.isMoney = false;
                }
                if (product.name == 'group_purchase_user' || product.name == 'group_purchase_manager') {
                    _this.isShowPurchase = true;
                    _this.isBuy = true;
                    _this.isSale = false;
                    _this.isEngineer = false;
                    _this.isMoney = false;
                }
                if (!_this.isSale && !_this.isBuy) {
                    _this.isEngineer = true;
                    _this.isBuy = false;
                    _this.isSale = false;
                    _this.isMoney = false;
                }
                if (product.name == 'group_account_manager') {
                    _this.isShowZiJin = true;
                }
                if (product.name == 'purchase_manager_1' || product.name == 'purchase_manager_plus') {
                    if (product.name == 'purchase_manager_plus') {
                        is_plus = true;
                    }
                    else if (product.name == 'purchase_manager_1') {
                        is_manager = true;
                    }
                    _this.isShowPayment = true;
                }
            }
            if (is_plus && is_manager) {
                need_all = true;
            }
            if ((new RegExp("js.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/S-header.png";
                _this.isShowKaoqin = false;
                _this.isShowBX = true;
                _this.isShowZZ = true;
                _this.isShowKN = true;
                _this.isShowSG = true;
            }
            else if ((new RegExp("dr.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/D-header.png";
                _this.isShowKaoqin = false;
                _this.isShowBX = true;
                _this.isShowZZ = true;
                _this.isShowKN = true;
                _this.isShowSG = true;
            }
            else if ((new RegExp("erp.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/R-header.png";
                _this.isShowKaoqin = false;
                _this.isShowBX = true;
                _this.isShowZZ = true;
                _this.isShowKN = true;
                _this.isShowSG = true;
            }
            else if ((new RegExp("ber.robotime.com").test(res.result.res_data.user_ava))) {
                _this.company_type = "assets/img/B-header.png";
                _this.isShowKaoqin = false;
                _this.isShowBX = true;
                _this.isShowZZ = true;
                _this.isShowKN = true;
                _this.isShowSG = true;
            }
            _this.services.get_all_need_do(res.result.res_data.user_id, is_plus, _this.isShowKucun, need_all).then(function (res) {
                console.log(res.result.res_data.bx);
                if (res.result && res.result.res_code == 1 && res.result.res_data) {
                    _this.isZZList = res.result.res_data.zz > 0 ? true : false;
                    _this.isBaoxiaoList = res.result.res_data.bx > 0 ? true : false;
                    _this.isShenGouList = res.result.res_data.sg > 0 ? true : false;
                    _this.zz_count = res.result.res_data.zz;
                    _this.bx_count = res.result.res_data.bx;
                    _this.sg_count = res.result.res_data.sg;
                    _this.py_count = res.result.res_data.py;
                    _this.kc_count = res.result.res_data.kc;
                    if (_this.kc_count > 9) {
                        _this.isBig = false;
                    }
                    if (_this.py_count > 9) {
                        _this.isBigPay = false;
                    }
                    //判断采购小红点
                    if (_this.py_count > 0 && _this.isShowPayment) {
                        _this.isShowBuyPoint = true;
                    }
                    if (_this.kc_count > 0 && _this.isShowKucun) {
                        _this.isShowEngineerPoint = true;
                    }
                }
            });
            switch (_this.currenTab) {
                // case 5:
                // this.normal()
                // break
                case 1:
                    _this.sale();
                    break;
                case 2:
                    _this.buy();
                    break;
                case 3:
                    _this.engineer();
                    break;
                case 4:
                    _this.money();
                    break;
            }
        });
    };
    //点击通用
    WorkBenchPage.prototype.normal = function () {
        this.currenTab = 5;
        this.isNormal = true;
        this.isSale = false;
        this.isBuy = false;
        this.isEngineer = false;
        this.isMoney = false;
    };
    //点击销售
    WorkBenchPage.prototype.sale = function () {
        this.currenTab = 1;
        this.isSale = true;
        this.isBuy = false;
        this.isEngineer = false;
        this.isMoney = false;
        this.isNormal = false;
    };
    //点击采购
    WorkBenchPage.prototype.buy = function () {
        this.currenTab = 2;
        this.isSale = false;
        this.isBuy = true;
        this.isEngineer = false;
        this.isMoney = false;
        this.isNormal = false;
    };
    //点击工程
    WorkBenchPage.prototype.engineer = function () {
        this.currenTab = 3;
        this.isSale = false;
        this.isBuy = false;
        this.isEngineer = true;
        this.isMoney = false;
        this.isNormal = false;
    };
    //财务
    WorkBenchPage.prototype.money = function () {
        this.currenTab = 4;
        this.isSale = false;
        this.isBuy = false;
        this.isEngineer = false;
        this.isMoney = true;
        this.isNormal = false;
    };
    WorkBenchPage.prototype.clickInComingWareHouse = function () {
        this.navCtrl.push('IncomingPage');
    };
    WorkBenchPage.prototype.supplierList = function () {
        this.navCtrl.push('SupplierListPage');
    };
    WorkBenchPage.prototype.purchaseOrder = function () {
        this.navCtrl.push('OrderPage');
    };
    WorkBenchPage.prototype.salesOrder = function () {
        this.navCtrl.push('SalesOrderPage');
    };
    WorkBenchPage.prototype.customerSearch = function () {
        this.navCtrl.push('CustomerPage');
    };
    WorkBenchPage.prototype.camCard = function () {
        this.navCtrl.push('CamCardPage');
    };
    WorkBenchPage.prototype.ProductionSearch = function () {
        this.navCtrl.push('NewProductionPage');
    };
    WorkBenchPage.prototype.reimbursement = function () {
        this.navCtrl.push('ReimbursementPage');
    };
    // 申请
    WorkBenchPage.prototype.apply = function () {
        this.navCtrl.push('ApplyPage');
    };
    WorkBenchPage.prototype.shengou = function () {
        this.navCtrl.push('ShengoupagePage');
    };
    WorkBenchPage.prototype.material_request = function () {
        this.navCtrl.push('MaterialRequestPage');
    };
    WorkBenchPage.prototype.zanzhi = function () {
        this.navCtrl.push("ZanzhiPage");
    };
    WorkBenchPage.prototype.zhishifenxiang = function () {
    };
    WorkBenchPage.prototype.shareKnowledge = function () {
        this.navCtrl.push('ShareKnowledgePage');
    };
    WorkBenchPage.prototype.baobiao = function () {
        this.navCtrl.push('BaobiaoPage');
    };
    WorkBenchPage.prototype.gongdan = function () {
        this.navCtrl.push('GongdanPage');
    };
    WorkBenchPage.prototype.clickPayrequest = function () {
        this.navCtrl.push('PayRequestPage');
    };
    WorkBenchPage.prototype.change_kucun = function () {
        this.navCtrl.push('ChangeKucunPage');
    };
    WorkBenchPage.prototype.kaoqin = function () {
        this.navCtrl.push('KaoqinPage');
        // this.navCtrl.push('AttendaceRecoupPage')
    };
    WorkBenchPage.prototype.journalSheet = function () {
        this.navCtrl.push('JournalSheetPage');
    };
    WorkBenchPage.prototype.jixiao = function () {
        this.navCtrl.push('PerformancePage');
    };
    WorkBenchPage.prototype.attendance_recoup = function () {
        this.navCtrl.push('AttendaceRecoupPage');
    };
    WorkBenchPage.prototype.vacation = function () {
        this.navCtrl.push('VacationApprovalPage');
    };
    return WorkBenchPage;
}());
WorkBenchPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-work-bench',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/work-bench.html"*/'<ion-header no-border>\n  <ion-navbar color="gongdan-color">\n    <ion-buttons left>\n      <button ion-button icon-only>\n        <img style="width:30px" src={{company_type}} />\n      </button>\n    </ion-buttons>\n    <ion-title>工作台</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>    \n  <ion-grid>\n      <ion-row>\n        <ion-col *ngIf="isShowKaoqin" tappable (click)="kaoqin()">\n            <img src="assets/img/work_bench/dailyTime.png">\n            <div style="color:#5c6166;font-size:12px">考勤</div>\n        </ion-col>\n        <ion-col *ngIf="isShowSG" tappable (click)="shengou()">\n            <img src="assets/img/work_bench/applyPurchase.png">\n            <div style="color:#5c6166;font-size:12px">申购</div>\n            <span *ngIf="sg_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:8px;top:-8px;text-align:center;font-size:14px">{{sg_count}}</span>\n        </ion-col>\n        <ion-col *ngIf="isShowBX" tappable (click)="apply()">\n            <img src="assets/img/work_bench/submitExpense.png">\n            <div style="color:#5c6166;font-size:12px">报销</div>\n            <span *ngIf="bx_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:8px;top:-8px;text-align:center;font-size:14px">{{bx_count}}</span>\n        </ion-col>\n        <ion-col *ngIf="isShowZZ" tappable (click)="zanzhi()">\n            <img src="assets/img/work_bench/temporarySupport.png">\n            <div style="color:#5c6166;font-size:12px">暂支</div>\n            <span *ngIf="zz_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:8px;top:-8px;text-align:center;font-size:14px">{{zz_count}}</span>\n        </ion-col>\n        <ion-col *ngIf="isShowKN" tappable (click)="shareKnowledge()">\n            <img src="assets/img/work_bench/shareKnowledge.png">\n            <div style="color:#5c6166;font-size:12px">知识分享</div>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n  <div style="background:#f0f2f5;height:10px">\n    </div>\n  <ion-grid>\n    <ion-row style="max-height:50px">\n      <ion-col tappable *ngIf="isShowNormal" (click)="normal()">\n        <p style="padding-bottom:3px;width:40px;margin-left:auto;margin-right:auto"\n        [ngClass]="{true:\'selected\',false:\'normal\'}[isNormal]">通用</p>\n      </ion-col>\n      <ion-col tappable *ngIf="isShowSale" (click)="sale()">\n        <p style="padding-bottom:3px;width:40px;margin-left:auto;margin-right:auto"\n        [ngClass]="{true:\'selected\',false:\'normal\'}[isSale]">销售</p>\n      </ion-col>\n      <ion-col tappable *ngIf="isShowPurchase" (click)="buy()">\n          <p style="padding-bottom:3px;width:40px;margin-left:auto;margin-right:auto"\n          [ngClass]="{true:\'selected\',false:\'normal\'}[isBuy]">采购\n          <span  *ngIf="isShowBuyPoint" style="margin-top:6px;position:absolute;width:8px;height:8px;border-radius:8px;background-color:red;display:inline-block;color:white;text-align:center;margin-left:5px"></span>\n        </p>\n        </ion-col>\n        <ion-col tappable *ngIf="isShowEngineer" (click)="engineer()">\n            <p style="padding-bottom:3px;width:40px;margin-left:auto;margin-right:auto"\n            [ngClass]="{true:\'selected\',false:\'normal\'}[isEngineer]">工程\n            <span  *ngIf="isShowEngineerPoint" style="margin-top:6px;position:absolute;width:8px;height:8px;border-radius:8px;background-color:red;display:inline-block;color:white;text-align:center;margin-left:5px"></span>\n          </p>\n          </ion-col>\n          <ion-col tappable *ngIf="isShowZiJin" (click)="money()">\n              <p style="padding-bottom:3px;width:40px;margin-left:auto;margin-right:auto"\n              [ngClass]="{true:\'selected\',false:\'normal\'}[isMoney]">财务</p>\n            </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <div *ngIf="isNormal" style="background:#ffffff">\n    <ion-grid>\n      <ion-row style="height:100px;text-align:center;">\n              <ion-col col-6 style="\n              border-top:1px #f5f7fa solid;\n              border-right: 1px #f5f7fa solid;\n            border-bottom: 1px #f5f7fa solid;\n              " tappable (click)="jixiao()">\n              <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                  <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">绩效\n                    <span *ngIf="performance > 0" style="width: 16px;position:absolute;border-radius:8px;background-color:red;display:inline-block;color:white;line-height:16px;text-align:center;font-size:12px;margin-left:10px">{{performance}}</span>\n                  </p>\n                  <img  src="assets/img/performance.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                  <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">绩效自评和互评</p>\n              </div>\n              </ion-col>\n              <ion-col col-6 style="\n              border-top:1px #f5f7fa solid;\n            border-bottom: 1px #f5f7fa solid;\n              " tappable (click)="attendance_recoup()">\n              <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                  <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">补卡销卡审核\n                    <span *ngIf="recoup_num > 0" style="width: 16px;position:absolute;border-radius:8px;background-color:red;display:inline-block;color:white;line-height:16px;text-align:center;font-size:12px;margin-left:10px">{{recoup_num}}</span>\n                  </p>\n                  <img  src="assets/img/performance.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                  <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">审核</p>\n              </div>\n              </ion-col>\n           \n            </ion-row>\n\n            <ion-row style="height:100px;text-align:center;margin-top:-5px">\n              <ion-col col-6 style="\n              border-right: 1px #f5f7fa solid;\n            border-bottom: 1px #f5f7fa solid;\n              " tappable (click)="vacation()">\n              <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                  <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">休假审核\n                    <span *ngIf="vacation_num > 0" style="width: 16px;position:absolute;border-radius:8px;background-color:red;display:inline-block;color:white;line-height:16px;text-align:center;font-size:12px;margin-left:10px">{{vacation_num}}</span>\n                  </p>\n                  <img  src="assets/img/performance.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                  <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">审核</p>\n              </div>\n              </ion-col>\n              <ion-col col-6 style="\n              border-bottom: 1px #f5f7fa solid;">   \n              </ion-col>\n            </ion-row>\n    </ion-grid>\n  </div>\n\n  <div *ngIf="isSale" style="background:#ffffff">\n      <ion-grid>\n        <ion-row style="height:100px;text-align:center;">\n          <ion-col col-6 style="\n          border-top:1px #f5f7fa solid;\n          border-right: 1px #f5f7fa solid;\n          border-bottom: 1px #f5f7fa solid;\n          " tappable (click)="camCard()">\n          <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n              <p text-wrap class="diyP" style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">名片导入</p>\n              <img  src="assets/img/work_bench/card_import.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n              <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">扫描名片导入客户</p>\n          </div>\n          </ion-col>\n          <ion-col col-6 style="\n          border-top:1px #f5f7fa solid;\n          border-bottom: 1px #f5f7fa solid;\n          " tappable (click)="customerSearch()">\n          <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n              <p text-wrap style="font-size:14px;color:#2e3033;width:35px;margin-left:10px">客户</p>\n              <img  src="assets/img/work_bench/customer.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n              <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">潜在客户/客户/公海客户查询</p>\n          </div>\n          </ion-col>\n        </ion-row>\n        <ion-row style="height:100px;text-align:center;margin-top:-5px">\n            <ion-col col-6 style="\n            border-right: 1px #f5f7fa solid;\n          border-bottom: 1px #f5f7fa solid;\n            " tappable (click)="salesOrder()">\n            <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                <p text-wrap style="font-size:14px;color:#2e3033;width:35px;margin-left:10px">订单</p>\n                <img  src="assets/img/work_bench/orderForm.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">销售订单/交货/物流查询</p>\n            </div>\n            </ion-col>\n            <ion-col col-6 style="border-bottom: 1px #f5f7fa solid;" tappable (click)="ProductionSearch()">\n                <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                    <p text-wrap style="font-size:14px;color:#2e3033;width:35px;margin-left:10px">产品</p>\n                    <img  src="assets/img/work_bench/product.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                    <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">产品品牌系列及库存信息查询</p>\n                </div>\n            </ion-col>\n          </ion-row>\n          <ion-row style="height:100px;text-align:center;margin-top:-5px">\n              <ion-col col-6 style="\n              border-right: 1px #f5f7fa solid;\n              " tappable (click)="journalSheet()">\n              <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                  <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">日志报表</p>\n                  <img  src="assets/img/work_bench/reportForms.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                  <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">拜访记录录入及查询</p>\n              </div>\n              </ion-col>\n            </ion-row>\n      </ion-grid>\n    </div>\n\n\n\n    <div *ngIf="isBuy" style="background:#ffffff">\n        <ion-grid>\n            <ion-row style="height:100px;text-align:center;">\n                <ion-col col-6 style="\n                border-top:1px #f5f7fa solid;\n                border-right: 1px #f5f7fa solid;\n              border-bottom: 1px #f5f7fa solid;\n                " tappable (click)="supplierList()">\n                <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                    <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">供应商</p>\n                    <img  src="assets/img/work_bench/supplier.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                    <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">供应商查询</p>\n                </div>\n                </ion-col>\n                <ion-col col-6 style="\n                border-top:1px #f5f7fa solid;\n                border-bottom: 1px #f5f7fa solid;"\n                 tappable (click)="ProductionSearch()">\n                    <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                        <p text-wrap style="font-size:14px;color:#2e3033;width:35px;margin-left:10px">产品</p>\n                        <img  src="assets/img/work_bench/buy_product.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                        <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">产品品牌系列及库存信息查询</p>\n                    </div>\n                </ion-col>\n              </ion-row>\n              <ion-row style="height:100px;text-align:center;margin-top:-5px">\n                  <ion-col col-6 style="\n                  border-right: 1px #f5f7fa solid;\n                border-bottom: 1px #f5f7fa solid;\n                  " tappable (click)="purchaseOrder()">\n                  <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                      <p text-wrap style="font-size:14px;color:#2e3033;width:35px;margin-left:10px">订单</p>\n                      <img  src="assets/img/work_bench/orderForm.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                      <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">采购订单/收货查询</p>\n                  </div>\n                  </ion-col>\n                  <ion-col col-6 style="border-bottom: 1px #f5f7fa solid;" tappable (click)="clickInComingWareHouse()">\n                      <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                          <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">采购确认</p>\n                          <img  src="assets/img/work_bench/buy_confirm.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                          <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">采购收货信息确认</p>\n                      </div>\n                  </ion-col>\n                </ion-row>\n                <ion-row style="height:100px;text-align:center;margin-top:-5px">\n                    <ion-col col-6 style="\n                    border-right: 1px #f5f7fa solid;\n                    " tappable (click)="clickPayrequest()" *ngIf="isShowPayment">\n                    <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                        <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">付款确认\n                            <span *ngIf="py_count > 0" [ngClass]="{true:\'textsmall\',false:\'textbig\'}[isBigPay]" style="position:absolute;border-radius:8px;background-color:red;display:inline-block;color:white;line-height:16px;text-align:center;font-size:12px;margin-left:10px">{{py_count}}</span>\n                        </p>\n                        <img  src="assets/img/work_bench/pay_confirm.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                        <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">采购付款申请审核</p>\n                    </div>\n                    </ion-col>\n                  </ion-row>\n        </ion-grid>\n    </div>\n\n\n    <div *ngIf="isEngineer" style="background:#ffffff">\n        <ion-grid>\n            <ion-row style="height:100px;text-align:center;">\n                <ion-col col-6 style="\n                border-top:1px #f5f7fa solid;\n                border-right: 1px #f5f7fa solid;\n              border-bottom: 1px #f5f7fa solid;\n                " tappable (click)="change_kucun()" *ngIf="isShowKucun">\n                <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                    <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">库存调整\n                        <span *ngIf="kc_count > 0" [ngClass]="{true:\'textsmall\',false:\'textbig\'}[isBig]" style="position:absolute;border-radius:8px;background-color:red;display:inline-block;color:white;line-height:16px;text-align:center;font-size:12px;margin-left:10px">{{kc_count}}</span>\n                    </p>\n                    <img  src="assets/img/work_bench/change_kucun.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                    <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">库存调整单据审核</p>\n                </div>\n                </ion-col>\n                <ion-col col-6 style="\n                border-top:1px #f5f7fa solid;\n                border-right: 1px #f5f7fa solid;\n                border-bottom: 1px #f5f7fa solid;"\n                 tappable (click)="material_request()">\n                    <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                        <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">工程领料</p>\n                        <img  src="assets/img/work_bench/engineer_material.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                        <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">领料单审核</p>\n                    </div>\n                </ion-col>\n              </ion-row>\n        </ion-grid>\n    </div>\n\n\n    <div *ngIf="isMoney" style="background:#ffffff">\n        <ion-grid>\n            <ion-row style="height:100px;text-align:center;">\n                <ion-col col-6 style="\n                border-top:1px #f5f7fa solid;\n                border-right: 1px #f5f7fa solid;\n              border-bottom: 1px #f5f7fa solid;\n                " tappable (click)="baobiao()">\n                <div style="padding:1px;margin-left: 15dp;overflow:hidden;text-align:left">\n                    <p text-wrap style="font-size:14px;color:#2e3033;width:70px;margin-left:10px">财务报表</p>\n                    <img  src="assets/img/work_bench/reportForms.png" style="height:25px;width:25px;float:right;margin-top:-25px;margin-right:20px">\n                    <p style="font-size:12px;color:#c2c7cc;line-height:12px;width:100px;margin-left:10px">资金日报/香港账户查询</p>\n                </div>\n                </ion-col>\n                <ion-col col-6 style="\n                border-top:1px #f5f7fa solid;\n                border-bottom: 1px #f5f7fa solid;">   \n                </ion-col>\n              </ion-row>\n        </ion-grid>\n    </div>\n  <!-- <div class="externalDiv">\n    <div class="titleFont">常用</div>\n  </div>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-3 tappable (click)="apply()">\n        <div style="position:relative">\n          <img src="assets/img/work_bench/shenqing.png">\n          <div>报销</div>\n          <span *ngIf="bx_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:8px;top:-8px;text-align:center;font-size:14px">{{bx_count}}</span>\n        </div>\n\n      </ion-col>\n      <ion-col col-3 tappable (click)="shengou()">\n        <div style="position:relative">\n          <img src="assets/img/work_bench/shenpi.png">\n          <div>申购</div>\n          <span *ngIf="sg_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:8px;top:-8px;text-align:center;font-size:14px">{{sg_count}}</span>\n        </div>\n      </ion-col>\n      <ion-col col-3 tappable (click)="zanzhi()">\n        <div style="position:relative">\n          <img src="assets/img/work_bench/zanzhi.png">\n          <div>暂支</div>\n          <span *ngIf="zz_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:8px;top:-8px;text-align:center;font-size:14px">{{zz_count}}</span>\n        </div>\n      </ion-col>\n      <ion-col col-3 tappable (click)="shareKnowledge()">\n        <img src="assets/img/work_bench/zhishifenxiang.png">\n        <div>知识分享</div>\n      </ion-col>\n    </ion-row> -->\n    <!-- <ion-row>\n      <ion-col col-3 tappable (click)="kaoqin()">\n        <img src="assets/img/work_bench/gongdan.png">\n        <div>考勤</div>\n      </ion-col>\n  </ion-row> -->\n  <!-- </ion-grid>\n  <div class=\'dividingLine\'></div>\n\n  <div *ngIf="isShowSale">\n    <div class="externalDiv">\n      <div class="titleFont">销售</div>\n    </div>\n    <ion-grid>\n      <ion-row> -->\n        <!--<ion-col col-3>\n        <img src="assets/img/work_bench/yibiaopan.png">\n        <div>仪表盘</div>\n      </ion-col>-->\n        <!-- <ion-col col-3 tappable (click)="camCard()">\n          <img src="assets/img/work_bench/daorumingpian.png">\n          <div>导入名片</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="customerSearch()">\n          <img src="assets/img/work_bench/kehu.png">\n          <div>客户</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="ProductionSearch()">\n          <img src="assets/img/work_bench/chanping.png">\n          <div>产品</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="salesOrder()">\n          <img src="assets/img/work_bench/dingdan.png">\n          <div>订单</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="journalSheet()" *ngIf="isShowJournalSheet">\n          <img src="assets/img/work_bench/caiwubaobiao.png">\n          <div>日志报表</div>\n        </ion-col>\n      </ion-row>\n      <ion-row> -->\n        <!--<ion-col col-3 tappable (click)="salesOrder()">\n        <img src="assets/img/work_bench/dingdan.png">\n        <div>订单</div>\n      </ion-col>-->\n        <!--<ion-col col-3>\n        <img src="assets/img/work_bench/duizhang.png">\n        <div>对账</div>\n      </ion-col>-->\n        <!--<ion-col col-3>\n        <img src="assets/img/work_bench/tuihuoruku.png">\n        <div>退货入库</div>\n      </ion-col>-->\n      <!-- </ion-row>\n    </ion-grid>\n    <div class=\'dividingLine\'></div>\n  </div> -->\n\n  <!-- <div *ngIf="isShowPurchase">\n    <div class="externalDiv">\n      <div class="titleFont">采购</div>\n    </div>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3 tappable (click)="supplierList()">\n          <img src="assets/img/work_bench/gongyingshang.png">\n          <div>供应商</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="ProductionSearch()">\n          <img src="assets/img/work_bench/chanping.png">\n          <div>产品</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="purchaseOrder()">\n          <img src="assets/img/work_bench/dingdan.png">\n          <div>订单</div>\n        </ion-col>\n        <ion-col col-3 tappable (click)="clickInComingWareHouse()">\n          <img src="assets/img/work_bench/ruku.png">\n          <div>采购确认</div>\n        </ion-col>\n        <ion-col *ngIf="isShowPayment" col-3 tappable (click)="clickPayrequest()">\n          <img src="assets/img/work_bench/payment.png">\n          <div>付款审核</div>\n          <span *ngIf="py_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:12px;top:-4px;text-align:center;font-size:14px">{{py_count}}</span>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n      </ion-row>\n    </ion-grid>\n    <div class=\'dividingLine\'></div>\n  </div> -->\n\n  <!-- <div class="externalDiv">\n    <div class="titleFont">工程</div>\n  </div>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-3 tappable (click)="material_request()">\n        <img src="assets/img/work_bench/gcll.png">\n        <div>工程领料</div>\n      </ion-col>\n      <ion-col col-3 tappable (click)="change_kucun()" *ngIf="isShowKucun">\n        <img src="assets/img/work_bench/kucunchange.png">\n        <div>库存调整</div>\n        <span *ngIf="kc_count > 0" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:red;display:inline-block;color:white;line-height:20px;right:12px;top:-4px;text-align:center;font-size:14px">{{kc_count}}</span>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <div class=\'dividingLine\'></div>\n\n  <div *ngIf="isHR">\n\n\n    <div class="externalDiv">\n      <div class="titleFont">人事</div>\n    </div>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3>\n          <img src="assets/img/work_bench/ruzhi.png">\n          <div>入职</div>\n        </ion-col>\n        <ion-col col-3>\n          <img src="assets/img/work_bench/yuangong.png">\n          <div>员工</div>\n        </ion-col>\n        <ion-col col-3>\n          <img src="assets/img/work_bench/heyue.png">\n          <div>合约</div>\n        </ion-col>\n        <ion-col col-3>\n          <img src="assets/img/work_bench/lizhidan.png">\n          <div>离职单</div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n  <div *ngIf="isShowZiJin">\n    <div class="externalDiv">\n      <div class="titleFont">财务</div>\n    </div>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3 tappable (click)="baobiao()">\n          <img src="assets/img/work_bench/caiwubaobiao.png">\n          <div>财务报表</div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div> -->\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/work-bench.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__commonUseServices__["a" /* CommonUseServices */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_3__commonUseServices__["a" /* CommonUseServices */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */]])
], WorkBenchPage);

//# sourceMappingURL=work-bench.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/work-bench.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkBenchPageModule", function() { return WorkBenchPageModule; });
/* harmony import */ var work_bench_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var work_bench_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(739);
var work_bench_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import { DeliveryInitialRequestPage } from './delivery-initial-request/delivery-initial-request';
// import { DeliveryExtraPage } from './delivery-extra/delivery-extra';
// import { DeliveryPage } from './delivery/delivery';
// import { OrderDetailPage } from './order-detail/order-detail';
// import { ReturnOrderDetailPage } from './return-order-detail/return-order-detail';
// import { OrderPage } from './order/order';
// import { InspectionDetailPage } from './inspection-detail/inspection-detail';
// import { CardinfoPage } from './cardinfo/cardinfo';
// import { IncomingPage } from './incoming/incoming';



// import { IncomingDetailPage } from './incoming-detail/incoming-detail';
// import { SupplierListPage } from './supplier-list/supplier-list';
// import { SupplierDetailPage } from './supplier-detail/supplier-detail';
// import { ContactListPage } from './contact-list/contact-list';
// import { PopoverPage} from './order-detail/order-detail'
// import { PoContactPage } from './po-contact/po-contact';
// import { ReturnPopoverPage} from './return-order-detail/return-order-detail'
// import { DeliveryNotesPage } from './delivery-notes/delivery-notes';
// import { DeliveryNotesDetailPage } from './delivery-notes-detail/delivery-notes-detail';
// import { CustomerPage } from './../customer/customer';
// import { AddCustomerPage } from './../customer/add-customer/add-customer';
// import { PurchaseBackOrderPage } from './salesOrder/sales-detail/purchase-back-order/purchase-back-order';
// import { CamCardPage } from './../customer/cam-card/cam-card';
// import { ProductlistPage } from './../customer/productlist/productlist';
// import { EditCardPage } from './../customer/edit-card/edit-card';
// import { ChoosePage } from './../customer/choose/choose';
// import { BiaoQianPage } from './../customer/biao-qian/biao-qian';
// import { CustomerDetailPage } from './../customer/customer-detail/customer-detail';
// import { XiansuoDetailPage } from './../customer/xiansuo-detail/xiansuo-detail';
// import { MsgDetailPage } from './../msg/msg-detail/msg-detail';

var WorkBenchPageModule = (function () {
    function WorkBenchPageModule() {
    }
    return WorkBenchPageModule;
}());
WorkBenchPageModule = work_bench_module___decorate([
    work_bench_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            WorkBenchPage,
        ],
        imports: [
            work_bench_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(WorkBenchPage), __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */],
        ],
        entryComponents: [WorkBenchPage,
        ],
        exports: [
            WorkBenchPage
        ]
    })
], WorkBenchPageModule);

//# sourceMappingURL=work-bench.module.js.map

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

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonUseServices; });
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


var CommonUseServices = (function () {
    function CommonUseServices(httpservice) {
        this.httpservice = httpservice;
    }
    CommonUseServices.prototype.getApplyList = function (moffset, mlimit, id) {
        id = parseInt(id);
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    };
    CommonUseServices.prototype.getApplyListNoLoading = function (moffset, mlimit, id) {
        id = parseInt(id);
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_applylist", body);
    };
    CommonUseServices.prototype.searchApplyList = function (id, type, data) {
        var body = JSON.stringify({
            offset: 0,
            limit: 100,
            user_id: id,
            type: type,
            data: data
        });
        return this.httpservice.postBody("get_applylist", body);
    };
    CommonUseServices.prototype.getApplyDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_applylist_detail", body);
    };
    CommonUseServices.prototype.getLeaveDetail = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_leavelist_detail", body);
    };
    CommonUseServices.prototype.getLeaveList = function (moffset, mlimit, id) {
        var body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBodyNoLoading("get_leavelist", body);
    };
    //  获取暂支金额,部门,产品名
    CommonUseServices.prototype.getPaymentReminding = function (id) {
        var body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_payment_reminding", body);
    };
    // 撤回
    CommonUseServices.prototype.get_retract = function (descrpiction, id, userId) {
        var body = JSON.stringify({
            active_id: id,
            description: descrpiction,
            user_id: userId
        });
        return this.httpservice.postBody("get_retract", body);
    };
    // 提交审核
    CommonUseServices.prototype.submit_apply = function (id, userId) {
        var body = JSON.stringify({
            id: id,
            user_id: userId
        });
        return this.httpservice.postBody("submit_apply", body);
    };
    // 创建审批单草稿
    CommonUseServices.prototype.createApply = function (data) {
        var body = JSON.stringify(data);
        console.log("JSON 的body 是" + body);
        return this.httpservice.postBody("create_apply_order", body);
    };
    CommonUseServices.prototype.get_leaveType = function () {
        var body = JSON.stringify({
            limit: 10
        });
        return this.httpservice.postBody("get_leaveType", body);
    };
    CommonUseServices.prototype.get_shengou_item = function (employee_id) {
        var body = JSON.stringify({
            employee_id: employee_id
        });
        return this.httpservice.postBody("get_shengou_item", body);
    };
    // 暂支
    CommonUseServices.prototype.get_zanzhi_list = function (id, limit, offset, type) {
        var body = JSON.stringify({
            user_id: id,
            limit: limit,
            offset: offset,
            type: type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    };
    CommonUseServices.prototype.get_zanzhi_listNoLoading = function (id, limit, offset, type) {
        var body = JSON.stringify({
            user_id: id,
            limit: limit,
            offset: offset,
            type: type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    };
    CommonUseServices.prototype.searchZanzhiList = function (id, type, data, text) {
        var body = JSON.stringify({
            user_id: id,
            type: type,
            data: data,
            text: text
        });
        return this.httpservice.postBody("search_zanzhi_list", body);
    };
    CommonUseServices.prototype.confirm = function (sheet_id, user_id, title, type) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            user_id: user_id,
            reason: title,
            type: type
        });
        return this.httpservice.postBody("confirm_zanzhi", body);
    };
    CommonUseServices.prototype.refuse = function (sheet_id, reason, user_id) {
        var body = JSON.stringify({
            sheet_id: sheet_id,
            reason: reason,
            user_id: user_id,
        });
        return this.httpservice.postBody("refuse_zanzhi", body);
    };
    CommonUseServices.prototype.get_zanzhi_reminding = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
        });
        return this.httpservice.postBody("get_zanzhi_reminding", body);
    };
    CommonUseServices.prototype.save_zanzhi = function (amount, remark, submit) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            amount: amount,
            remark: remark,
            submit: submit
        });
        return this.httpservice.postBody("create_zanzhi", body);
    };
    CommonUseServices.prototype.save_edit_zanzhi = function (amount, remark, submit, id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            amount: amount,
            remark: remark,
            submit: submit,
            order_id: id
        });
        return this.httpservice.postBody("save_edit_zanzhi", body);
    };
    CommonUseServices.prototype.submitOrder = function (id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            id: id
        });
        return this.httpservice.postBody("submit_order", body);
    };
    CommonUseServices.prototype.callbackOrder = function (description, id) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            id: id,
            description: description
        });
        return this.httpservice.postBody("callback_order", body);
    };
    CommonUseServices.prototype.get_apply_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_apply_count", body);
    };
    CommonUseServices.prototype.get_shengou_count = function (id) {
        var body = JSON.stringify({
            user_id: id,
        });
        return this.httpservice.postBodyNoLoading("get_shengou_count", body);
    };
    CommonUseServices.prototype.get_all_need_do = function (user_id, is_plus, isShowKucun, need_all) {
        var body = JSON.stringify({
            user_id: user_id,
            is_plus: is_plus,
            is_kucun: isShowKucun,
            need_all: need_all,
        });
        return this.httpservice.postBodyNoLoading("get_all_need_do", body);
    };
    CommonUseServices.prototype.get_all_num = function (body) {
        return this.httpservice.postBodyNoLoading("get_all_num", body);
    };
    return CommonUseServices;
}());
CommonUseServices = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], CommonUseServices);

//# sourceMappingURL=commonUseServices.js.map

/***/ })

});
//# sourceMappingURL=31.js.map