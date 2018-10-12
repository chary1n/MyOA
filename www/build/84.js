webpackJsonp([84],{

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-new-chat/gongdan-new-chat.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gongdanService__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_NativeService__ = __webpack_require__(103);
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
 * Generated class for the GongdanNewChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GongdanNewChatPage = (function () {
    function GongdanNewChatPage(navCtrl, navParams, actionSheetCtrl, nativeService, gongDanService, toast, statusbar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nativeService = nativeService;
        this.gongDanService = gongDanService;
        this.toast = toast;
        this.statusbar = statusbar;
        this.imgList = [];
        this.pushImgList = [];
        this.beizhuText = "";
        this.isDeletePicture = false;
        this.item = this.navParams.get('item');
        this.record_item = this.navParams.get('record_item');
        this.parent_id = this.navParams.get('parent_id');
        this.frontPage = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].getViewController("GongdanDetailPage", navCtrl);
        this.select_name = this.navParams.get('select_name');
        if (this.select_name) {
            this.beizhuText = "@" + this.select_name.name + " ";
        }
        window.addEventListener("native.keyboardshow", this.keyboardShowHandler);
        window.addEventListener('native.keyboardhide', this.keyboardHideHandler);
    }
    GongdanNewChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad GongdanNewChatPage');
        var elementContent = document.getElementById("main_class");
        elementContent.style.height = elementContent.clientHeight + "px";
        setTimeout(function () {
            _this.textarea.setFocus();
            // this.setCaretPosition(this.textarea,1)
            // cordova.plugins.Keyboard.show();
        }, 300);
    };
    GongdanNewChatPage.prototype.ionViewWillEnter = function () {
        this.statusbar.backgroundColorByHexString("#2597ec");
        this.statusbar.styleLightContent();
        if (this.navParams.get('beizhuText')) {
            this.beizhuText = this.navParams.get('beizhuText');
            console.log(this.beizhuText);
        }
        if (this.navParams.get('select_name')) {
            this.select_name = this.navParams.get('select_name');
        }
        this.isDeletePicture = this.navParams.get('isDeletePicture');
        console.log(this.isDeletePicture);
        if (this.isDeletePicture) {
            this.isDeletePicture = false;
            this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1);
            this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]), 1);
        }
    };
    GongdanNewChatPage.prototype.keyboardShowHandler = function (e) {
        // alert('Keyboard height is: ' + e.keyboardHeight);
        var elementContent = document.getElementById("chat_top_div");
        elementContent.style.visibility = "visible";
        elementContent.style.marginBottom = e.keyboardHeight + 'px';
        //  elementContent.style.marginBottom = e.keyboardHeight + 'px'
    };
    GongdanNewChatPage.prototype.keyboardHideHandler = function (e) {
        var elementContent = document.getElementById("chat_top_div");
        elementContent.style.visibility = "hidden";
        // elementContent.style.marginBottom = 0;
    };
    GongdanNewChatPage.prototype.addImg = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '拍照',
                    //  role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.getPicture(1);
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: function () {
                        console.log('Archive clicked');
                        _this.getPicture(0);
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    GongdanNewChatPage.prototype.addUser = function () {
        this.navCtrl.push('GongdanChoosePeoplePage', {
            item: this.item,
            beizhuText: this.beizhuText,
            select_name: this.select_name,
        });
    };
    GongdanNewChatPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            // targetWidth: 256,
            // targetHeight: 256
            allowEdit: false,
        };
        if (type == 1) {
            this.nativeService.getPictureByCamera(options).subscribe(function (img_url) {
                _this.getPictureSuccess(img_url);
            });
        }
        else {
            this.nativeService.getPictureByPhotoLibrary(options).subscribe(function (img_url) {
                _this.getPictureSuccess(img_url);
            });
        }
    };
    GongdanNewChatPage.prototype.getPictureSuccess = function (img_url) {
        this.imgList.push(img_url);
        this.pushImgList.push(img_url.split(",")[1]);
        // this.isChange = true;
        // this.user_heard = img_url;
        // this.editInformationService.pushHeardImage(img_url.split(",")[1])
        //   .then(res => {
        //     if (res.result && res.result.res_code == 1) {
        //       this.storage.get('user').then(userBean => {
        //         userBean.result.res_data.user_ava = res.result.res_data.user_ava
        //         this.storage.set('user', userBean)
        //       })
        //     }
        //   })
    };
    GongdanNewChatPage.prototype.release = function () {
        var _this = this;
        // alert(this.select_name.name)
        if (this.select_name) {
            var name_str = "@" + this.select_name.name + " ";
            this.beizhuText = this.beizhuText.replace(name_str, "");
            this.gongDanService.work_order_add_record(this.beizhuText, this.select_name.id, "reply", this.item.work_order_id, this.parent_id, this.pushImgList).then(function (res) {
                if (res.result.res_code == 1) {
                    __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("回复成功", _this.toast);
                    _this.frontPage.data.need_fresh = true;
                    _this.navCtrl.popTo(_this.frontPage);
                }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].toastButtom("请选择回复对象", this.toast);
        }
    };
    GongdanNewChatPage.prototype.clickPicture = function (item) {
        this.deletePicture = item;
        this.navCtrl.push("DeletePicturePage", { item: item, need_back_chat: true });
    };
    return GongdanNewChatPage;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('mytextarea'),
    __metadata("design:type", Object)
], GongdanNewChatPage.prototype, "textarea", void 0);
GongdanNewChatPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'page-gongdan-new-chat',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-new-chat/gongdan-new-chat.html"*/'<!--\n  Generated template for the GongdanNewChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <ion-title>回复</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)=\'release()\'>\n        发表\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n    <ion-textarea #mytextarea autofocus id="area_id" rows="15" placeholder="输入回复" [(ngModel)]="beizhuText" style="margin-top:10px;height:115px;margin-left:4.5%;width:91%;border: 1px solid #e2e2e4;overflow:hidden;border-radius:1px;"></ion-textarea>\n\n</ion-header>\n\n\n<ion-content id="main_class" style="position:relative;">\n <ion-grid style="margin-left:6px;">\n    <ion-row>\n      <ion-col style="height:116px" tappable (click)="clickPicture(item)" col-3 *ngFor="let item of imgList">\n        <img src={{item}} style="position:absolute;clip:rect(0px,106px,106px,0px);"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <div id="chat_top_div" style="border-top:#f0f2f5 1px solid;position:absolute;bottom:0px;height:40px;width:100%;visibility:hidden;background:white"  >\n    <img style="width:30px;margin-top:5px;margin-left:10px" src="assets/img/work_bench/pic.png" tappable (click)="addImg()">\n    <img style="width:30px;margin-top:5px;float:left;margin-left:10px;" src="assets/img/work_bench/at_me.png" tappable (click)="addUser()">\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/work-bench/gongdan/gongdan-new-chat/gongdan-new-chat.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__gongdanService__["a" /* GongDanService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_NativeService__["a" /* NativeService */], __WEBPACK_IMPORTED_MODULE_3__gongdanService__["a" /* GongDanService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]])
], GongdanNewChatPage);

//# sourceMappingURL=gongdan-new-chat.js.map
// CONCATENATED MODULE: ./src/pages/work-bench/gongdan/gongdan-new-chat/gongdan-new-chat.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GongdanNewChatPageModule", function() { return GongdanNewChatPageModule; });
/* harmony import */ var gongdan_new_chat_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var gongdan_new_chat_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var gongdan_new_chat_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GongdanNewChatPageModule = (function () {
    function GongdanNewChatPageModule() {
    }
    return GongdanNewChatPageModule;
}());
GongdanNewChatPageModule = gongdan_new_chat_module___decorate([
    gongdan_new_chat_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            GongdanNewChatPage,
        ],
        imports: [
            gongdan_new_chat_module___WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(GongdanNewChatPage),
        ],
    })
], GongdanNewChatPageModule);

//# sourceMappingURL=gongdan-new-chat.module.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GongDanService; });
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


var GongDanService = (function () {
    function GongDanService(httpservice) {
        this.httpservice = httpservice;
    }
    GongDanService.prototype.create_work_order = function (body) {
        return this.httpservice.postBody("create_work_order", body, 1);
    };
    GongDanService.prototype.my_work_order_statistics = function () {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("my_work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_search = function (body) {
        return this.httpservice.postBody("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_searchNoLoading = function (body) {
        return this.httpservice.postBodyNoLoading("work_order_search", body, 1);
    };
    GongDanService.prototype.work_order_statistics = function (start_date, end_date, brand_ids, area_ids, category_ids, user_id) {
        var body = JSON.stringify({
            uid: user_id,
            start_date: start_date,
            end_date: end_date,
            brand_ids: brand_ids,
            area_ids: area_ids,
            category_ids: category_ids,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics", body, 1);
    };
    GongDanService.prototype.work_order_statistics_search = function (start_date, end_date, tag_ids, search_type, search_text) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date,
            tag_ids: tag_ids,
            search_type: search_type,
            search_text: search_text,
        });
        return this.httpservice.postBodyNoLoading("work_order_statistics_search", body, 1);
    };
    GongDanService.prototype.work_order_statisticsWithTime = function (start_date, end_date) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            start_date: start_date,
            end_date: end_date
        });
        return this.httpservice.postBody("work_order_statistics", body, 1);
    };
    GongDanService.prototype.searchAtMe = function (body) {
        return this.httpservice.postBodyNoLoading("searchAtMe", body, 1);
    };
    GongDanService.prototype.searchAtMeWithLoading = function (body) {
        return this.httpservice.postBody("searchAtMe", body, 1);
    };
    GongDanService.prototype.getDepartment = function () {
        var body = JSON.stringify({
            partner_id: 1
        });
        return this.httpservice.postBody("get_all_departments", body);
    };
    GongDanService.prototype.getGongdanDetail = function (id) {
        var body = JSON.stringify({
            work_order_id: id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id
        });
        return this.httpservice.postBody("work_order_search_by_id", body, 1);
    };
    GongDanService.prototype.work_order_add_record = function (content, reply_uid, record_type, work_order_id, parent_id, record_imgs) {
        var body = JSON.stringify({
            content: content,
            reply_uid: reply_uid,
            record_type: record_type,
            work_order_id: work_order_id,
            parent_id: parent_id,
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            record_imgs: record_imgs,
        });
        return this.httpservice.postBody("work_order_add_record", body, 1);
    };
    GongDanService.prototype.get_all_employees = function () {
        var body = JSON.stringify({});
        return this.httpservice.postBody("get_all_employees", body);
    };
    GongDanService.prototype.get_department_employees = function (department_ids) {
        var body = JSON.stringify({
            department_ids: department_ids
        });
        return this.httpservice.postBody("get_department_employees", body);
    };
    GongDanService.prototype.work_order_action = function (uid, work_order_id, action_type, assign_uid) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            action_type: action_type,
            assign_uid: assign_uid,
        });
        return this.httpservice.postBody("work_order_action", body, 1);
    };
    GongDanService.prototype.work_order_retract = function (uid, work_order_id, need_unlink) {
        var body = JSON.stringify({
            uid: uid,
            work_order_id: work_order_id,
            need_unlink: need_unlink,
        });
        return this.httpservice.postBody("work_order_retract", body, 1);
    };
    GongDanService.prototype.commit_draft = function (body) {
        return this.httpservice.postBody("commit_draft", body, 1);
    };
    GongDanService.prototype.search_gongdan = function (search_text, search_type) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            search_text: search_text,
            search_type: search_type,
        });
        return this.httpservice.postBody("search_gongdan", body, 1);
    };
    GongDanService.prototype.get_all_biaoqian = function () {
        return this.httpservice.postBody("get_all_biaoqian", {}, 1);
    };
    GongDanService.prototype.update_biaoqian = function (work_order_id, category_ids, brand_ids, area_ids) {
        var body = JSON.stringify({
            uid: __WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */].user_id,
            work_order_id: work_order_id,
            category_ids: category_ids,
            brand_ids: brand_ids,
            area_ids: area_ids,
        });
        return this.httpservice.postBody("update_biaoqian", body, 1);
    };
    GongDanService.prototype.get_employee_detail = function (user_id) {
        var body = JSON.stringify({
            user_id: user_id,
        });
        return this.httpservice.postBody("get_employee_detail", body, 1);
    };
    GongDanService.prototype.search_biaoqian = function (search_type, search_text) {
        var body = JSON.stringify({
            search_type: search_type,
            search_text: search_text
        });
        return this.httpservice.postBody("search_biaoqian", body, 1);
    };
    return GongDanService;
}());
GongDanService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], GongDanService);

//# sourceMappingURL=gongdanService.js.map

/***/ })

});
//# sourceMappingURL=84.js.map