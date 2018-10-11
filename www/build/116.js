webpackJsonp([116],{

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/email/email.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__emailService__ = __webpack_require__(749);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EmailPage = (function () {
    function EmailPage(menu, alertCtrl, navCtrl, event, emailService, storage) {
        var _this = this;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.event = event;
        this.emailService = emailService;
        this.storage = storage;
        this.limit = 20;
        this.offset = 0;
        this.isMoreData = true;
        this.title = '';
        this.frontPageIsUnseen = false;
        storage.get('user')
            .then(function (res) {
            _this.user_id = res.result.res_data.user_id;
            _this.emailService.getAccountDetail(_this.user_id).then(function (res) {
                console.log('push了');
                _this.accounts_list = res.result.res_data;
                _this.event.publish('emailMenu', res.result.res_data);
                if (res.result.res_data) {
                    _this.account_id = res.result.res_data[0].id;
                    _this.get_folder_label();
                    _this.get_email_list(_this.account_id, 'state', 'all_received', '', 20, 0).then(function (res) {
                        _this.email_type = 'state';
                        _this.state_type = "all_received";
                        _this.data_id = '';
                        if (res.result && res.result.res_data) {
                            _this.email_list = res.result.res_data.email_list;
                            _this.title = res.result.res_data.title;
                        }
                    });
                }
            });
        });
        this.event.subscribe('click_envnt', function (account_id, email_type, state_type, data_id) {
            console.log("接收了");
            _this.account_id = account_id;
            _this.email_type = email_type;
            _this.state_type = state_type;
            _this.data_id = data_id;
            _this.isMoreData = true;
            _this.get_email_list(account_id, email_type, state_type, data_id, 20, 0).then(function (res) {
                _this.limit = 20;
                _this.offset = 0;
                _this.email_list = res.result.res_data.email_list;
                _this.title = res.result.res_data.title;
                if (state_type == 'unseen') {
                    _this.title = _this.title + "·未读";
                }
            });
        });
    }
    EmailPage.prototype.ionViewDidLeave = function () {
        // console.log('注销事件传递')
        // this.event.unsubscribe('click_envnt')
    };
    EmailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.menu.enable(true);
        var bar = document.getElementsByClassName('tabbar').item(0);
        bar['style'].display = 'flex';
        if (this.title.indexOf('收件') != -1 && this.frontPageIsUnseen) {
            this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit + this.offset, 0).then(function (res) {
                if (res.result && res.result.res_data) {
                    _this.email_list = res.result.res_data.email_list;
                }
            });
        }
    };
    EmailPage.prototype.ionViewWillLeave = function () {
        this.menu.enable(false);
        var bar = document.getElementsByClassName('tabbar').item(0);
        bar['style'].display = 'none';
    };
    EmailPage.prototype.showMenu = function () {
        var bar = document.getElementsByClassName('tabbar').item(0);
        bar['style'].display = 'none';
    };
    EmailPage.prototype.get_folder_label = function () {
        var _this = this;
        this.emailService.get_email_label_folder(this.account_id, this.user_id).then(function (res) {
            if (res.result.res_data) {
                _this.event.publish('label_folder', res.result.res_data);
            }
        });
    };
    EmailPage.prototype.get_email_list = function (account_id, email_type, state_type, data_id, limit, offset) {
        this.get_folder_label();
        return this.emailService.getEmailList(this.user_id, account_id, email_type, state_type, data_id, limit, offset);
    };
    EmailPage.prototype.doRefresh = function (event) {
        var _this = this;
        this.isMoreData = true;
        this.limit = 20;
        this.offset = 0;
        this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit, this.offset).then(function (res) {
            event.complete();
            if (res.result && res.result.res_data) {
                _this.email_list = res.result.res_data.email_list;
            }
        });
    };
    EmailPage.prototype.doInfinite = function (event) {
        var _this = this;
        if (this.isMoreData == true) {
            this.limit = 20;
            this.offset = this.offset + 20;
            this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit, this.offset).then(function (res) {
                var item_data = [];
                if (res.result.res_data) {
                    item_data = res.result.res_data.email_list;
                    if (item_data.length > 0) {
                        _this.isMoreData = true;
                    }
                    else {
                        _this.isMoreData = false;
                    }
                    for (var _i = 0, item_data_1 = item_data; _i < item_data_1.length; _i++) {
                        var item = item_data_1[_i];
                        _this.email_list.push(item);
                    }
                }
                else {
                    _this.isMoreData = false;
                }
                event.complete();
            });
        }
        else {
            event.complete();
        }
    };
    EmailPage.prototype.email_detail = function (id, rt_is_unseen) {
        this.frontPageIsUnseen = rt_is_unseen;
        this.navCtrl.push('EmailDetailPage', { 'id': id });
    };
    EmailPage.prototype.showUnseenSelect = function () {
        var _this = this;
        if (this.title.indexOf('收件') != -1) {
            var alert_1 = this.alertCtrl.create({
                cssClass: 'title_alert',
                title: '收件箱'
            });
            var unseen = {
                type: 'radio',
                label: '未读',
                value: '未读',
                handler: function (data) {
                    _this.unseenChoose = data.value;
                    _this.event.publish('click_envnt', _this.account_id, 'state', 'unseen', '');
                    alert_1.dismiss();
                }
            };
            var all = {
                type: 'radio',
                label: '全部',
                value: '全部',
                checked: true,
                handler: function (data) {
                    _this.unseenChoose = data.value;
                    _this.event.publish('click_envnt', _this.account_id, 'state', 'all_received', '');
                    alert_1.dismiss();
                }
            };
            if (this.unseenChoose == '未读') {
                unseen['checked'] = true;
                all['checked'] = false;
            }
            else {
                all['checked'] = true;
                unseen['checked'] = false;
            }
            alert_1.addInput(unseen);
            alert_1.addInput(all);
            alert_1.present();
        }
    };
    EmailPage.prototype.edit = function () {
        this.navCtrl.push('WriteEmailPage', {
            id: this.account_id,
            account_list: this.accounts_list,
            uid: this.user_id
        });
    };
    return EmailPage;
}());
EmailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'page-email',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/email/email.html"*/'<ion-header no-border>\n\n  <ion-navbar color="gongdan-color">\n    <button ion-button [menuToggle]="activeMenu" (click)="showMenu()">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title (click)="showUnseenSelect()">\n      {{title}}\n      <ion-icon *ngIf="title.indexOf(\'收件\')!=-1" name="arrow-down" ></ion-icon>\n    </ion-title>\n\n    <ion-buttons right>\n      <button ion-button (click)="edit()">\n        <img style="width: 21px;\n       margin-right: 2px;" src="assets/img/edit.png">\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n<ion-content>\n  <ng-container *ngIf="!accounts_list">\n    <p class="no_account">你还没有添加账号</p>\n  </ng-container>\n  <ng-container *ngIf="accounts_list">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-list style="padding-right:5px">\n      <ion-item tappable *ngFor="let item of email_list" (click)="email_detail(item.id,item.rt_is_unseen)" no-lines style=" border-bottom:1px solid #F0F2F5">\n        <div>\n          <div>\n            <div class="email_date">\n              {{item.date_time}}\n            </div>\n            <div [ngClass]="{true:\'email_title_bold\',false:\'email_title\'}[item.state==\'received\'&&item.rt_is_unseen]">\n              <span class="red-point" *ngIf="item.state==\'received\'&&item.rt_is_unseen"></span>\n              {{ item.state=="sent" ?item.email_to :item.email_from }}\n            </div>\n          </div>\n          <div [ngClass]="{true:\'email_summary_bold\',false:\'email_summary\'}[item.state==\'received\'&&item.rt_is_unseen]">\n            {{item.subject}}\n          </div>\n          <div class="email_content">\n            {{item.summary}}\n          </div>\n        </div>\n        <!-- <div>\n          <div *ngFor="let item of item.attachment_list" ></div>\n        </div> -->\n      </ion-item>\n    </ion-list>\n    <ion-infinite-scroll immediate-check="false" (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ng-container>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/email/email.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__emailService__["a" /* EmailService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["u" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Events */], __WEBPACK_IMPORTED_MODULE_5__emailService__["a" /* EmailService */], __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
], EmailPage);

//# sourceMappingURL=email.js.map
// CONCATENATED MODULE: ./src/pages/email/email.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailPageModule", function() { return EmailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var email_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EmailPageModule = (function () {
    function EmailPageModule() {
    }
    return EmailPageModule;
}());
EmailPageModule = email_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EmailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EmailPage),
        ],
    })
], EmailPageModule);

//# sourceMappingURL=email.module.js.map

/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailService; });
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


var EmailService = (function () {
    function EmailService(httpService) {
        this.httpService = httpService;
    }
    EmailService.prototype.getAccountDetail = function (user_id) {
        var body = JSON.stringify({
            'uid': user_id,
        });
        return this.httpService.postBody('get_account_detail', body);
    };
    EmailService.prototype.uploadAttachment = function (user_id, filename, data) {
        var body = JSON.stringify({
            'uid': user_id,
            'name': filename,
            'datas': data,
        });
        return this.httpService.postBody('rt_mail/upload_attachment', body, 2);
    };
    EmailService.prototype.delete_attachment = function (id) {
        var body = JSON.stringify({
            'id': id,
        });
        return this.httpService.postBodyNoLoading('rt_mail/delete_attachment', body, 2);
    };
    EmailService.prototype.getEmailList = function (user_id, account_id, email_type, state_type, data_id, limit, offset) {
        var body = JSON.stringify({
            'uid': user_id,
            'account_id': account_id,
            'email_type': email_type,
            'state_type': state_type,
            'data_id': data_id,
            'limit': limit,
            'offset': offset
        });
        return this.httpService.postBody('get_email_list', body);
    };
    EmailService.prototype.get_email_detail = function (id) {
        var body = JSON.stringify({
            'id': id
        });
        return this.httpService.postBody('rt_mail/get_email_detail', body, 2);
    };
    EmailService.prototype.get_email_label_folder = function (account_id, user_id) {
        var body = JSON.stringify({
            'account_id': account_id,
            'uid': user_id
        });
        return this.httpService.postBodyNoLoading('rt_mail/get_email_label_folder', body, 2);
    };
    EmailService.prototype.send_mail = function (user_id, account_id, email_to, email_cc, email_bcc, subject, body, attach_list, draft) {
        var send_body = JSON.stringify({
            'uid': user_id,
            'account_id': account_id,
            'email_to': email_to,
            'email_cc': email_cc,
            'email_bcc': email_bcc,
            'subject': subject,
            "body_html": body,
            'attachment_ids': attach_list,
            'draft': draft
        });
        return this.httpService.postBodyNoLoading('rt_mail/email_sent', send_body, 2);
    };
    EmailService.prototype.get_contact_list = function (uid) {
        var body = JSON.stringify({
            'uid': uid,
        });
        return this.httpService.postBodyNoLoading('rt_mail/get_contact_list', body, 2);
    };
    return EmailService;
}());
EmailService = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_HttpService__["a" /* HttpService */]])
], EmailService);

//# sourceMappingURL=emailService.js.map

/***/ })

});
//# sourceMappingURL=116.js.map