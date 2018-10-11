webpackJsonp([115],{

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/@ionic-native/file-path/index.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(12);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @name File Path
 * @description
 *
 * This plugin allows you to resolve the native filesystem path for Android content URIs and is based on code in the aFileChooser library.
 *
 * @usage
 * ```typescript
 * import { FilePath } from '@ionic-native/file-path';
 *
 * constructor(private filePath: FilePath) { }
 *
 * ...
 *
 * this.filePath.resolveNativePath(path)
 *   .then(filePath => console.log(filePath))
 *   .catch(err => console.log(err));
 *
 * ```
 */
var FilePath = (function (_super) {
    __extends(FilePath, _super);
    function FilePath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Resolve native path for given content URL/path.
     * @param {string} path  Content URL/path.
     * @returns {Promise<string>}
     */
    /**
       * Resolve native path for given content URL/path.
       * @param {string} path  Content URL/path.
       * @returns {Promise<string>}
       */
    FilePath.prototype.resolveNativePath = /**
       * Resolve native path for given content URL/path.
       * @param {string} path  Content URL/path.
       * @returns {Promise<string>}
       */
    function (path) {
        return;
    };
    FilePath.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */](),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], FilePath.prototype, "resolveNativePath", null);
    /**
     * @name File Path
     * @description
     *
     * This plugin allows you to resolve the native filesystem path for Android content URIs and is based on code in the aFileChooser library.
     *
     * @usage
     * ```typescript
     * import { FilePath } from '@ionic-native/file-path';
     *
     * constructor(private filePath: FilePath) { }
     *
     * ...
     *
     * this.filePath.resolveNativePath(path)
     *   .then(filePath => console.log(filePath))
     *   .catch(err => console.log(err));
     *
     * ```
     */
    FilePath = __decorate([
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */]({
            pluginName: 'FilePath',
            plugin: 'cordova-plugin-filepath',
            pluginRef: 'window.FilePath',
            repo: 'https://github.com/hiddentao/cordova-plugin-filepath',
            platforms: ['Android']
        })
    ], FilePath);
    return FilePath;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./src/pages/email/write-email/write-email.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_NativeService__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_transfer__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_ionic_page__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__emailService__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__ = __webpack_require__(250);
var write_email___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var write_email___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


///<reference path="../../../services/jquery.d.ts"/>  









/**
 * Generated class for the WriteEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WriteEmailPage = (function () {
    function WriteEmailPage(navCtrl, emailService, alert, fileChooser, platform, nativeService, filePath, file, transfer, navParams, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.emailService = emailService;
        this.alert = alert;
        this.fileChooser = fileChooser;
        this.platform = platform;
        this.nativeService = nativeService;
        this.filePath = filePath;
        this.file = file;
        this.transfer = transfer;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        // datass = {
        //   'id': 2,
        //   'file_size': '22kb',
        //   'mimetype': '2222',
        //   'name': 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
        // }
        // datasss = {
        //   'id': 2,
        //   'file_size': '22qwkb',
        //   'mimetype': '2222',
        //   'name': 'asdsdasdasdasd'
        // }
        // attachment_list = [this.datass,this.datasss,this.datass];
        this.attachment_list = [];
        this.isShow = false;
        this.contact_list = [];
        this.contact_email_to_list = [];
        this.contact_email_cc_list = [];
        this.contact_email_bcc_list = [];
        this.chooseEmailTo = [];
        this.chooseEmailcc = [];
        this.chooseEmailbcc = [];
        this.account_id = this.navParams.get('id');
        this.user_id = this.navParams.get('uid');
        this.account_list = this.navParams.get('account_list');
        this.get_contact_list();
        for (var i = 0; i < this.account_list.length; i++) {
            if (this.account_list[i].id == this.account_id) {
                this.account_email = this.account_list[i].email;
            }
        }
    }
    WriteEmailPage.prototype.ionViewDidLoad = function () {
        var self = this;
        $("#input_email_to").bind("input propertychange", function (event) {
            console.log(self.email_to);
            self.contact_email_to_list = [];
            if (self.email_to) {
                for (var _i = 0, _a = self.contact_list; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if ((new RegExp(self.email_to).test(item.email))) {
                        self.contact_email_to_list.push(item);
                    }
                }
            }
        });
        $("#input_email_to").blur(function (event) {
            var value = $.trim($('#input_email_to').val());
            if (self.contact_email_to_list.length == 0 && value) {
                $("#input_email_to").val('');
                for (var i = 0; i < self.chooseEmailTo.length; i++) {
                    if (value == self.chooseEmailTo[i].email) {
                        return;
                    }
                }
                self.chooseEmailTo.push({
                    'name': value,
                    'email': value,
                });
                $('#input_email_to').attr('placeholder', '');
            }
        });
    };
    WriteEmailPage.prototype.ionViewDidEnter = function () {
        setTimeout(function () {
            $("#input_email_to").focus();
        }, 300);
    };
    WriteEmailPage.prototype.get_contact_list = function () {
        var _this = this;
        this.emailService.get_contact_list(this.user_id).then(function (res) {
            console.log(res.result);
            _this.contact_list = res.result.res_data;
        });
    };
    // 收件人
    WriteEmailPage.prototype.choose_contact_email_to = function (item) {
        this.contact_email_to_list = [];
        this.email_to = '';
        $("#input_email_to").focus();
        $("#input_email_to").val('');
        for (var i = 0; i < this.chooseEmailTo.length; i++) {
            if (item.email == this.chooseEmailTo[i].email) {
                return;
            }
        }
        // 隐藏提示
        $('#input_email_to').attr('placeholder', '');
        this.chooseEmailTo.push(item);
    };
    WriteEmailPage.prototype.closeEmailTo = function (index) {
        this.chooseEmailTo.splice(index, 1);
        if (this.chooseEmailTo.length == 0) {
            $('#input_email_to').attr('placeholder', '收件人:');
        }
    };
    // 抄送
    WriteEmailPage.prototype.choose_contact_email_cc = function (item) {
        this.contact_email_cc_list = [];
        this.email_cc = '';
        $("#input_email_cc").focus();
        $("#input_email_cc").val('');
        for (var i = 0; i < this.chooseEmailcc.length; i++) {
            if (item.email == this.chooseEmailcc[i].email) {
                return;
            }
        }
        $('#input_email_cc').attr('placeholder', '');
        this.chooseEmailcc.push(item);
    };
    WriteEmailPage.prototype.closeEmailcc = function (index) {
        this.chooseEmailcc.splice(index, 1);
        if (this.chooseEmailcc.length == 0) {
            $('#input_email_cc').attr('placeholder', '抄送:');
        }
    };
    // 密送
    WriteEmailPage.prototype.choose_contact_email_bcc = function (item) {
        this.contact_email_bcc_list = [];
        this.email_bcc = '';
        $("#input_email_bcc").focus();
        $("#input_email_bcc").val('');
        for (var i = 0; i < this.chooseEmailbcc.length; i++) {
            if (item.email == this.chooseEmailbcc[i].email) {
                return;
            }
        }
        $('#input_email_bcc').attr('placeholder', '');
        this.chooseEmailbcc.push(item);
    };
    WriteEmailPage.prototype.closeEmailbcc = function (index) {
        this.chooseEmailbcc.splice(index, 1);
        if (this.chooseEmailbcc.length == 0) {
            $('#input_email_bcc').attr('placeholder', '密送:');
        }
    };
    WriteEmailPage.prototype.chooseAttach = function () {
        var _this = this;
        console.log('chooseAttach');
        if (this.platform.is('ios')) {
            // if (this.platform.is('android')) {
            this.changeHeardImg();
        }
        else if (this.platform.is('android')) {
            this.fileChooser.open().then(function (uri) {
                console.log(uri);
                _this.resolveUri(uri).then(function (path) {
                    _this.uploadAttachment(path);
                });
            }).catch(function (e) {
                // reject(e);
            });
        }
    };
    WriteEmailPage.prototype.changeHeardImg = function () {
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
    WriteEmailPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            allowEdit: false,
            quality: 6,
            circle: true
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
    WriteEmailPage.prototype.getPictureSuccess = function (img) {
        var _this = this;
        this.emailService.uploadAttachment(this.user_id, 'IMG_PHOTO.jpg', img).then(function (res) {
            console.log(res);
            if (res.result.res_code == 1) {
                _this.attachment_list.push(res.result.res_data);
            }
        });
    };
    WriteEmailPage.prototype.delete_attachment = function (index, id) {
        this.attachment_list.splice(index, 1);
        this.emailService.delete_attachment(id);
    };
    WriteEmailPage.prototype.uploadAttachment = function (path) {
        var _this = this;
        console.log(path);
        console.log('genggail');
        var file_name = path.substring(path.lastIndexOf("/") + 1, path.length);
        var file_path = path.substring(0, path.lastIndexOf("/") + 1);
        this.file.readAsDataURL(file_path, file_name).then(function (res) {
            console.log('上传attachment');
            _this.emailService.uploadAttachment(_this.user_id, file_name, res).then(function (res) {
                console.log(res);
                if (res.result.res_code == 1) {
                    _this.attachment_list.push(res.result.res_data);
                }
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    /**
     * 解析uri
     * @param uri
     */
    WriteEmailPage.prototype.resolveUri = function (uri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.filePath.resolveNativePath(uri).then(function (filePath) {
                resolve(filePath);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    WriteEmailPage.prototype.cancel = function () {
        var _this = this;
        if (this.chooseEmailTo.length != 0 || this.chooseEmailcc.length != 0 || this.chooseEmailbcc.length != 0 ||
            this.attachment_list.length != 0
            || this.subject || this.body) {
            var actionSheet = this.actionSheetCtrl.create({
                title: '',
                buttons: [
                    {
                        text: '保存草稿',
                        handler: function () {
                            _this.save();
                        }
                    },
                    {
                        text: '删除草稿',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: function () {
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            this.navCtrl.pop();
        }
    };
    WriteEmailPage.prototype.showEmailCC = function () {
        this.isShow = true;
        var self = this;
        setTimeout(function () {
            $("#input_email_cc").bind("input propertychange", function (event) {
                self.contact_email_cc_list = [];
                if (self.email_cc) {
                    for (var _i = 0, _a = self.contact_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if ((new RegExp(self.email_cc).test(item.email))) {
                            self.contact_email_cc_list.push(item);
                        }
                    }
                }
            });
            $("#input_email_bcc").bind("input propertychange", function (event) {
                self.contact_email_bcc_list = [];
                if (self.email_bcc) {
                    for (var _i = 0, _a = self.contact_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if ((new RegExp(self.email_bcc).test(item.email))) {
                            self.contact_email_bcc_list.push(item);
                        }
                    }
                }
            });
            // 输入框失交事件.
            $("#input_email_cc").blur(function (event) {
                var value = $.trim($('#input_email_cc').val());
                if (self.contact_email_cc_list.length == 0 && value) {
                    $("#input_email_cc").val('');
                    for (var i = 0; i < self.chooseEmailcc.length; i++) {
                        if (value == self.chooseEmailcc[i].email) {
                            return;
                        }
                    }
                    self.chooseEmailcc.push({
                        'name': value,
                        'email': value,
                    });
                    $('#input_email_cc').attr('placeholder', '');
                }
                self.contact_email_to_list = [];
            });
            $("#input_email_bcc").blur(function (event) {
                var value = $.trim($('#input_email_bcc').val());
                if (self.contact_email_bcc_list.length == 0 && value) {
                    $("#input_email_bcc").val('');
                    for (var i = 0; i < self.chooseEmailbcc.length; i++) {
                        if (value == self.chooseEmailbcc[i].email) {
                            return;
                        }
                    }
                    self.chooseEmailbcc.push({
                        'name': value,
                        'email': value,
                    });
                    $('#input_email_bcc').attr('placeholder', '');
                }
                self.contact_email_to_list = [];
            });
        }, 100);
    };
    WriteEmailPage.prototype.save = function () {
        this.send_mail(true);
    };
    WriteEmailPage.prototype.testEmail = function (email) {
        //验证邮箱的正则
        var regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var testEmail = false;
        if (email) {
            var lists = email.split(';');
            for (var i = 0; i < lists.length; i++) {
                if (lists[i]) {
                    if (!regex.test(lists[i])) {
                        testEmail = true;
                    }
                }
            }
        }
        return testEmail;
    };
    WriteEmailPage.prototype.email_list_to_string = function (item_list) {
        var email_string = '';
        if (item_list.length > 0) {
            for (var i = 0; i < item_list.length; i++) {
                email_string = email_string + item_list[i].email + ((i == item_list.length - 1) ? '' : ';');
            }
        }
        return email_string;
    };
    WriteEmailPage.prototype.send = function () {
        var _this = this;
        //验证邮箱的正则
        if (this.testEmail(this.email_list_to_string(this.chooseEmailTo)) || this.testEmail(this.email_list_to_string(this.chooseEmailcc)) || this.testEmail(this.email_list_to_string(this.chooseEmailbcc))) {
            this.alert.create({
                title: '某些电子邮件地址无效',
                buttons: [{ text: '确定' },]
            }).present();
            return;
        }
        if (this.chooseEmailTo.length == 0) {
            this.alert.create({
                title: '请输入收件人',
                buttons: [{ text: '确定' },]
            }).present();
            return;
        }
        if (!this.subject) {
            this.alert.create({
                title: '空主题',
                subTitle: '邮箱没有主题，您仍要发送吗?',
                buttons: [{ text: '取消' },
                    {
                        text: '发送',
                        handler: function () {
                            _this.send_mail(false);
                        }
                    }
                ]
            }).present();
            return;
        }
        this.send_mail(false);
    };
    WriteEmailPage.prototype.send_mail = function (is_draft) {
        var _this = this;
        var draft = '';
        if (is_draft) {
            draft = 'true';
        }
        var attach_list = [];
        for (var i = 0; i < this.attachment_list.length; i++) {
            attach_list.push(this.attachment_list[i].id);
        }
        this.emailService.send_mail(this.user_id, this.account_id, this.email_list_to_string(this.chooseEmailTo), this.email_list_to_string(this.chooseEmailcc), this.email_list_to_string(this.chooseEmailbcc), this.subject, this.body, attach_list, draft)
            .then(function (res) {
            console.log(res);
            if (res.result == '发送成功' || res.result == "保存成功") {
                _this.alert.create({
                    title: res.result,
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                }).present();
            }
        });
    };
    return WriteEmailPage;
}());
write_email___decorate([
    __WEBPACK_IMPORTED_MODULE_6__angular_core__["ViewChild"]('input_email_to'),
    write_email___metadata("design:type", Object)
], WriteEmailPage.prototype, "input_email_to", void 0);
WriteEmailPage = write_email___decorate([
    __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_ionic_page__["a" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_6__angular_core__["Component"]({
        selector: 'page-write-email',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/email/write-email/write-email.html"*/'<!--\n  Generated template for the WriteEmailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n  <ion-navbar color="gongdan-color" hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button icon-only tappable (click)="cancel()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title style="text-align: center">新建邮件</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only tappable (click)="send()">\n        <ion-icon name="ios-send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <div class="input_div">\n    <span round class=\'chooseItemSpan\' *ngFor="let item of chooseEmailTo;let i = index" ion-button>\n      {{item.name}}\n      <ion-icon name="close" class="chooseItemIcon" tappable (click)="closeEmailTo(i)"></ion-icon>\n    </span>\n    <input class="input_c" id="input_email_to" text-wrap placeholder="收件人:" [(ngModel)]="email_to">\n  </div>\n\n\n  <ion-list *ngIf="contact_email_to_list" class=\'contact_list\'>\n    <ion-item *ngFor=\'let item of contact_email_to_list\' class="contact_c" tappable (click)="choose_contact_email_to(item)">\n      <p>{{item.name}} : {{item.email}}</p>\n    </ion-item>\n  </ion-list>\n\n  <ion-item *ngIf="!isShow" class="item_c" (click)="showEmailCC()">\n    <ion-label class="label_c">抄送/密送,发件人:{{account_email}}</ion-label>\n  </ion-item>\n  <!-- <ion-item *ngIf="isShow" class="item_c">\n    <ion-input class="input_c" text-wrap placeholder="抄送:" [(ngModel)]="email_cc"></ion-input>\n  </ion-item> -->\n\n  <div *ngIf="isShow" class="input_div">\n    <span round class=\'chooseItemSpan\' *ngFor="let item of chooseEmailcc;let i = index" ion-button>\n      {{item.name}}\n      <ion-icon name="close" class="chooseItemIcon" tappable (click)="closeEmailcc(i)"></ion-icon>\n    </span>\n    <input class="input_c" id="input_email_cc" text-wrap placeholder="抄送:" [(ngModel)]="email_cc">\n  </div>\n\n  <ion-list *ngIf="contact_email_cc_list" class=\'contact_list\'>\n    <ion-item *ngFor=\'let item of contact_email_cc_list\' class="contact_c" tappable (click)="choose_contact_email_cc(item)">\n      <p>{{item.name}} : {{item.email}}</p>\n    </ion-item>\n  </ion-list>\n\n  <!-- <ion-item *ngIf="isShow" class="item_c">\n    <ion-input class="input_c" text-wrap placeholder="密送:" [(ngModel)]="email_bcc"></ion-input>\n  </ion-item> -->\n\n  <div *ngIf="isShow" class="input_div">\n    <span round class=\'chooseItemSpan\' *ngFor="let item of chooseEmailbcc;let i = index" ion-button>\n      {{item.name}}\n      <ion-icon name="close" class="chooseItemIcon" tappable (click)="closeEmailbcc(i)"></ion-icon>\n    </span>\n    <input class="input_c" id="input_email_bcc" text-wrap placeholder="密送:" [(ngModel)]="email_bcc">\n  </div>\n\n  <ion-list *ngIf="contact_email_bcc_list" class=\'contact_list\'>\n    <ion-item *ngFor=\'let item of contact_email_bcc_list\' class="contact_c" tappable (click)="choose_contact_email_bcc(item)">\n      <p>{{item.name}} : {{item.email}}</p>\n    </ion-item>\n  </ion-list>\n\n\n\n  <ion-item *ngIf="isShow" class="item_c">\n    <ion-label class="label_c">发件人:{{account_email}}</ion-label>\n  </ion-item>\n  <ion-item class="item_c">\n    <ion-input class="input_c" style="margin-bottom:6px;margin-right: 20px" text-wrap placeholder="主题:" [(ngModel)]="subject"></ion-input>\n    <ion-icon name=\'ios-attach\' style="width: 20px;transform: rotate(270deg);margin-bottom: 15px;" tappable item-end (click)=\'chooseAttach()\'></ion-icon>\n  </ion-item>\n  <ul class="mail-attach-list" *ngIf="attachment_list.length!=0" >\n    <li class="attachment_li" *ngFor="let item of attachment_list;let i = index" >\n      <span class="name"> {{item.name}}</span>\n      <span class="size">{{item.file_size}}</span>\n      <span class="size" (click)=\'delete_attachment(i,item.id)\'>删除</span>\n    </li>\n  </ul>\n\n  <ion-textarea text-wrap rows="20" [(ngModel)]="body" placeholder="内容:" class=\'area_class\'>\n  </ion-textarea>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/email/write-email/write-email.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_8__emailService__["a" /* EmailService */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */], FilePath]
    }),
    write_email___metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_8__emailService__["a" /* EmailService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_chooser__["a" /* FileChooser */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["z" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_0__providers_NativeService__["a" /* NativeService */],
        FilePath, __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_transfer__["b" /* FileTransferObject */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* ActionSheetController */]])
], WriteEmailPage);

//# sourceMappingURL=write-email.js.map
// CONCATENATED MODULE: ./src/pages/email/write-email/write-email.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WriteEmailPageModule", function() { return WriteEmailPageModule; });
/* harmony import */ var write_email_module___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var write_email_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WriteEmailPageModule = (function () {
    function WriteEmailPageModule() {
    }
    return WriteEmailPageModule;
}());
WriteEmailPageModule = write_email_module___decorate([
    write_email_module___WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        declarations: [
            WriteEmailPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* IonicPageModule */].forChild(WriteEmailPage),
        ],
    })
], WriteEmailPageModule);

//# sourceMappingURL=write-email.module.js.map

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
//# sourceMappingURL=115.js.map