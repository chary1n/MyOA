webpackJsonp([117],{

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/pages/email/email-menu/email-menu.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__emailService__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
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
 * Generated class for the EmailMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailMenuPage = (function () {
    function EmailMenuPage(navCtrl, navParams, emailService, events, storage, menu) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.emailService = emailService;
        this.events = events;
        this.storage = storage;
        this.menu = menu;
        this.root = 'EmailPage';
        this.account_list = [];
        this.showLabel = false;
        this.tabs = document.getElementsByClassName('tabbar').item(0);
        events.subscribe('emailMenu', function (data) {
            console.log("接收了");
            _this.account_list = data;
            if (_this.account_list) {
                _this.account_id = _this.account_list[0].id;
            }
            console.log(_this.account_list);
        });
        events.subscribe('label_folder', function (data) {
            _this.unseen_count = data.unseen_count;
            _this.tree = {
                value: '文件夹',
                id: '',
                children: _this.tranFolderToTree(data.folder_list, 0)
            };
            console.log(_this.tree);
            _this.label_list = data.label_list;
            _this.changeLabelColor();
        });
    }
    EmailMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FriendsPage');
        // let menus = this.menu.getMenus()
        // if(menus.length>1){
        //   for(let i=0;i<menus.length;i++){
        //     menus[i].id
        //   }
        // }
    };
    EmailMenuPage.prototype.ionViewDidLeave = function () {
        // this.events.unsubscribe('emailMenu');
        // this.events.unsubscribe('label_folder');
    };
    EmailMenuPage.prototype.tranFolderToTree = function (folders_list, id) {
        var folders = this.getFolderListByPid(folders_list, id);
        var child = [];
        for (var i = 0; i < folders.length; i++) {
            var bomItem = { value: "", children: [], id: '' };
            bomItem.value = folders[i].name;
            bomItem.id = folders[i].id;
            if (this.tranFolderToTree(folders_list, folders[i].id).length > 0) {
                bomItem.children = this.tranFolderToTree(folders_list, folders[i].id);
            }
            else {
                bomItem.children = undefined;
            }
            child.push(bomItem);
        }
        return child;
    };
    EmailMenuPage.prototype.getFolderListByPid = function (folders, pid) {
        var list = [];
        for (var i = 0; i < folders.length; i++) {
            if (folders[i].pId == pid) {
                list.push(folders[i]);
            }
        }
        return list;
    };
    EmailMenuPage.prototype.transFolders = function (folder_list) {
        var children = [];
        // this.id = this.id + 1;
        // bomItem.value = bom.name + "      " + (bom.process_id[1] ? bom.process_id[1] : "") + "      " + (bom.qty ? bom.qty : "");
        // if (bom.bom_ids && bom.bom_ids.length > 0) {
        //   for (let item of bom.bom_ids) {
        //     {
        //       bomItem.children.push(this.analaysisBom(item))
        //     }
        //   }
        // } else {
        //   bomItem.children = undefined;
        // }
        // return bomItem;
    };
    EmailMenuPage.prototype.click_box = function (email_type, state_type, event, data_id) {
        if (data_id === void 0) { data_id = ''; }
        this.menu.close();
        var elements = document.getElementsByClassName('box_item');
        for (var i = 0; i < elements.length; i++) {
            var class_list = elements[i].classList;
            class_list.remove('box_item_choose');
        }
        this.events.publish('click_envnt', this.account_id, email_type, state_type, data_id);
        if (event != '') {
            var target = event.target || event.srcElement;
            this.getParentByClass(target).classList.add('box_item_choose');
        }
    };
    EmailMenuPage.prototype.getParentByClass = function (target) {
        if (target.classList.contains('box_item')) {
            return target;
        }
        if (target.parentNode.classList.contains('box_item')) {
            return target.parentNode;
        }
        else {
            return this.getParentByClass(target.parentNode);
        }
    };
    EmailMenuPage.prototype.changeLabel = function () {
        this.showLabel = !this.showLabel;
        this.changeLabelColor();
    };
    EmailMenuPage.prototype.changeLabelColor = function () {
        var _this = this;
        setTimeout(function () {
            _this.label_list.forEach(function (element) {
                var node = document.getElementById('label_' + element.id);
                if (node) {
                    node.setAttribute('style', 'background-color:' + element.color);
                }
            });
        }, 10);
    };
    EmailMenuPage.prototype.click_label = function (data_id) {
        this.click_box('label', '', '', data_id);
    };
    EmailMenuPage.prototype.closeMenu = function () {
        console.log('closeMenu');
        this.tabs['style'].display = 'flex';
    };
    EmailMenuPage.prototype.openMenu = function () {
        this.tabs['style'].display = 'none';
    };
    EmailMenuPage.prototype.dragMenu = function () {
        console.log('拖菜单');
        this.tabs['style'].display = 'none';
    };
    EmailMenuPage.prototype.chooseAccount = function (account_id) {
        this.account_id = account_id;
        this.click_box('state', 'all_received', '');
    };
    // 文件夹选中
    EmailMenuPage.prototype.handleSelected = function (event) {
        var id = event.node.id;
        var value = event.node.value;
        console.log(id);
        console.log(value);
        this.menu.close();
        if (id) {
            this.events.publish('click_envnt', this.account_id, 'folder', '', id);
        }
        else {
            this.events.publish('click_envnt', this.account_id, 'folder', '', '');
        }
    };
    return EmailMenuPage;
}());
EmailMenuPage = __decorate([
    __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* IonicPage */](),
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"]({
        selector: 'page-email-menu',template:/*ion-inline-start:"/Users/bin/Downloads/OA项目备份/src/pages/email/email-menu/email-menu.html"*/'<!--\n  Generated template for the EmailMenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-menu [content]="content" type="overlay" (ionDrag)="dragMenu()" (ionClose)="closeMenu()" (ionOpen)="openMenu()" id="menu1">\n\n  <ion-content >\n    <div class="top_div"></div>\n    <ion-list class="ion-list-account">\n      <ion-item no-lines class="account_item" *ngFor=\'let item of account_list\' (click)=\'chooseAccount(item.id)\'>\n        <div class="checkmark">\n          <img   *ngIf="item.id==account_id" class="img_account" src="assets/img/work_bench/checkbox_true.png">\n          <div *ngIf="item.id!=account_id" class="img_account"></div>\n        </div>\n        <div>\n          <div class="account_name">\n            {{item.name}}\n          </div>\n          <div class="\n            account_address">\n            {{item.email}}\n          </div>\n        </div>\n      </ion-item>\n    </ion-list>\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'state\',\'all_received\',$event)">\n      <ion-icon   class="box_icon" item-start name="ios-archive-outline"></ion-icon>\n      <ion-label class="box_name">收件箱</ion-label>\n      <ion-label class="box_numebr">{{unseen_count}}</ion-label>\n    </ion-item>\n\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'flag\',\'\',$event)">\n       <ion-icon class="box_icon"item-start name="ios-attach-outline"></ion-icon>\n      <ion-label class="box_name">已固定</ion-label>\n    </ion-item>\n\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'state\',\'draft\',$event)">\n       <ion-icon class="box_icon"item-start name="ios-paper-outline"></ion-icon>\n      <ion-label class="box_name">草稿箱</ion-label>\n    </ion-item>\n\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'state\',\'all_sent\',$event)">\n       <ion-icon class="box_icon"item-start name="ios-navigate-outline"></ion-icon>\n      <ion-label class="box_name">发件箱</ion-label>\n    </ion-item>\n\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'state\',\'junk\',$event)">\n       <ion-icon class="box_icon"item-start name="ios-trash-outline"></ion-icon>\n      <ion-label class="box_name">垃圾箱</ion-label>\n    </ion-item>\n\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'state\',\'deleted\',$event)">\n       <ion-icon class="box_icon"item-start name="ios-cut-outline"></ion-icon>\n      <ion-label class="box_name">已删除</ion-label>\n    </ion-item>\n\n    <ion-item class="box_item" no-lines  tappable (click)="click_box(\'label\',\'\',\'\')">\n       <ion-icon class="box_icon"item-start name="ios-bookmark-outline"></ion-icon>\n      <ion-label class="box_name">标签</ion-label>\n      <ion-icon item-end name="arrow-down" *ngIf="!showLabel" (click)=\'changeLabel();$event.stopPropagation();\'></ion-icon>\n      <ion-icon item-end name="arrow-up" *ngIf="showLabel" (click)=\'changeLabel();$event.stopPropagation();\'></ion-icon>\n    </ion-item>\n\n    <div *ngIf="showLabel" style="background:#fff">\n      <ion-item style="margin-left:40px" class="box_item" no-lines *ngFor="let item of label_list" (click)="click_label(item.id)">\n        <div class="tag_class" id="label_{{item.id}}" style="background-color:burlywood">\n        </div>\n        <div  class="label_c box_name">\n          {{item.name}}\n        </div>\n      </ion-item>\n    </div>\n\n    <div class="line" style="padding:0.5px"></div>\n    <span class="folder_span"> 智能文件夹</span>\n    <div *ngIf="tree" class="tree_div" >\n        <tree [tree]="tree"   (nodeSelected)="handleSelected($event)"></tree>\n    </div>\n\n\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="root" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/bin/Downloads/OA项目备份/src/pages/email/email-menu/email-menu.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__emailService__["a" /* EmailService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__emailService__["a" /* EmailService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Events */], __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["u" /* MenuController */]])
], EmailMenuPage);

//# sourceMappingURL=email-menu.js.map
// CONCATENATED MODULE: ./src/pages/email/email-menu/email-menu.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailMenuPageModule", function() { return EmailMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_tree__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng2_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var email_menu_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EmailMenuPageModule = (function () {
    function EmailMenuPageModule() {
    }
    return EmailMenuPageModule;
}());
EmailMenuPageModule = email_menu_module___decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        declarations: [
            EmailMenuPage,
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* IonicPageModule */].forChild(EmailMenuPage), __WEBPACK_IMPORTED_MODULE_0_ng2_tree__["TreeModule"]
        ],
    })
], EmailMenuPageModule);

//# sourceMappingURL=email-menu.module.js.map

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
//# sourceMappingURL=117.js.map