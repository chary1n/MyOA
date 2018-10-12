webpackJsonp([118],{

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/email/email-detail/email-detail.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_Utils__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__emailService__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__ = __webpack_require__(256);
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
 * Generated class for the EmailDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailDetailPage = (function () {
    function EmailDetailPage(sanitizer, transfer, file, fileOpener, navCtrl, navParams, emailService) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.transfer = transfer;
        this.file = file;
        this.fileOpener = fileOpener;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.emailService = emailService;
        this.attachment_list = [];
        this.id = this.navParams.get('id');
        this.EmailPage = __WEBPACK_IMPORTED_MODULE_0__providers_Utils__["a" /* Utils */].getViewController("EmailPage", this.navCtrl);
        this.emailService.get_email_detail(this.id).then(function (res) {
            console.log(res.result.res_data);
            _this.email_detail = res.result.res_data;
            _this.body_html = _this.email_detail.body_html;
            _this.subject = _this.email_detail.subject;
            _this.email_from = _this.email_detail.email_from;
            _this.email_to = _this.email_detail.email_to;
            _this.email_cc = _this.email_detail.email_cc;
            _this.email_bcc = _this.email_detail.email_bcc;
            _this.date = _this.email_detail.date;
            _this.attachment_list = _this.transAttachUrl(_this.email_detail.attachment_list);
            console.log(_this.attachment_list);
        });
    }
    EmailDetailPage.prototype.transAttachUrl = function (attachment_list) {
        for (var i = 0; i < attachment_list.length; i++) {
            var icon_src = "assets/img/attach_icon/attachment_icon.jpeg";
            if (attachment_list[i].mimetype.indexOf('jpeg') > 0) {
                icon_src = "assets/img/attach_icon/jpg.png";
            }
            else if (attachment_list[i].mimetype.indexOf('excel') > 0) {
                icon_src = "assets/img/attach_icon/xls.png";
                // preview_str = ''
            }
            else if (attachment_list[i].mimetype.indexOf('png') > 0) {
                icon_src = "assets/img/attach_icon/png.png";
            }
            else if (attachment_list[i].mimetype.indexOf('pdf') > 0) {
                icon_src = "assets/img/attach_icon/pdf.png";
            }
            else if (attachment_list[i].mimetype.indexOf('video') > 0) {
                icon_src = "assets/img/attach_icon/video.png";
            }
            else if (attachment_list[i].mimetype.indexOf('gif') > 0) {
                icon_src = "assets/img/attach_icon/gif.png";
            }
            attachment_list[i].icon_src = icon_src;
        }
        return attachment_list;
    };
    EmailDetailPage.prototype.assembleHTML = function (strHTML) {
        return this.sanitizer.bypassSecurityTrustHtml(strHTML);
    };
    EmailDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EmailDetailPage');
    };
    EmailDetailPage.prototype.clickAttach = function (id, mimeType) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var url = __WEBPACK_IMPORTED_MODULE_1__providers_HttpService__["a" /* HttpService */].appUrl + "web/content/" + id + "?download=true";
        fileTransfer.download(url, this.file.dataDirectory + id).then(function (entry) {
            console.log('download complete: ' + entry.toURL());
            _this.fileOpener.open(entry.nativeURL, mimeType)
                .then(function () {
                console.log('打开成功');
            })
                .catch(function () {
                console.log('打开失败');
            });
        }, function (error) {
            console.log(error);
        });
    };
    EmailDetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    return EmailDetailPage;
}());
EmailDetailPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_6__angular_core__["Component"]({
        selector: 'page-email-detail',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/email/email-detail/email-detail.html"*/'<!--\n  Generated template for the EmailDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="email_subject">\n    {{subject}}\n  </div>\n  <ul class="email_content_ul">\n    <li class="li_c">\n      <span class="span_c">发件人 :</span>\n      <span class="span_c" *ngFor="let item of email_from"> {{item}}</span>\n    </li>\n    <li class="li_c">\n      <div style="float:left">\n        <span class="span_c">收件人 :</span>\n      </div>\n      <div style="padding-left:46px">\n        <span *ngIf="!email_to" >&nbsp; </span>\n        <span class="span_c" *ngFor="let item of email_to;let i = index;">{{item}}{{i!=email_to.length-1?\';\':\'\'}}</span>\n      </div>\n    </li>\n    <li class="li_c" *ngIf="email_cc">\n      <div style="float:left">\n        <span class="span_c">抄&nbsp;&nbsp;&nbsp;&nbsp;送 :</span>\n      </div>\n      <div style="padding-left:46px">\n          <span *ngIf="!email_cc" >&nbsp; </span>\n        <span class="span_c" *ngFor="let item of email_cc;let i = index;">{{item}}{{i!=email_cc.length-1?\';\':\'\'}}</span>\n      </div>\n    </li>\n    <li class="li_c" *ngIf="email_bcc">\n      <div style="float:left">\n        <span class="span_c">密&nbsp;&nbsp;&nbsp;&nbsp;送 :</span>\n      </div>\n      <div style="padding-left:46px">\n          <span *ngIf="!email_bcc" >&nbsp; </span>\n        <span class="span_c" *ngFor="let item of email_bcc;let i = index;">{{item}}{{i!=email_bcc.length-1?\';\':\'\'}}</span>\n      </div>\n    </li>\n    <li class="li_c">\n      <span class="span_c">时&nbsp;&nbsp;&nbsp;&nbsp;间 :</span>\n      <span class="span_c">{{date}}</span>\n    </li>\n  </ul>\n  <div style="width:100%">\n    <div class="html_div" [innerHTML]="assembleHTML(body_html)"> </div>\n  </div>\n  <ion-list *ngIf="attachment_list.length!=0" no-lines class="ion-list-account" style="border-top: 0.55px solid #c8c7cce0">\n    <ion-item nolines class="attach_item" style="border-bottom: 0.55px solid #c8c7cce0" *ngFor=\'let item of attachment_list\'\n      (click)=\'clickAttach(item.id,item.mimetype)\'>\n      <div class="checkmark">\n        <img class="attach_img" src={{item.icon_src}}>\n      </div>\n      <div>\n        <div class="account_name">\n          {{item.fname}}\n        </div>\n        <div class="attach_size">\n          {{item.size}}\n        </div>\n      </div>\n      <div class="border_div"></div>\n    </ion-item>\n  </ion-list>\n\n  <div class="content_footer"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/email/email-detail/email-detail.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__emailService__["a" /* EmailService */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__["a" /* FileOpener */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DomSanitizer"],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__["a" /* FileOpener */],
        __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__emailService__["a" /* EmailService */]])
], EmailDetailPage);

//# sourceMappingURL=email-detail.js.map
// CONCATENATED MODULE: ./src/pages/email/email-detail/email-detail.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailDetailPageModule", function() { return EmailDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var email_detail_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EmailDetailPageModule = (function () {
    function EmailDetailPageModule() {
    }
    return EmailDetailPageModule;
}());
EmailDetailPageModule = email_detail_module___decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            EmailDetailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(EmailDetailPage)
        ],
    })
], EmailDetailPageModule);

//# sourceMappingURL=email-detail.module.js.map

/***/ }),

/***/ 750:
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
//# sourceMappingURL=118.js.map