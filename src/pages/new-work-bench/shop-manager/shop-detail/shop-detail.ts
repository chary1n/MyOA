import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController, ModalController, AlertController, Platform } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { ShopService } from './../shopService'
import { GalleryModal } from 'ionic-gallery-modal';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { DomSanitizer } from '@angular/platform-browser';
declare let startApp: any;
/**
 * Generated class for the ShopDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
  providers: [ShopService, CallNumber, AppAvailability],
})
export class ShopDetailPage {
  item
  user_id
  detail_type = 'info'
  starArr = ['1', '1', '1', '1', '1']
  can_show_footer = true
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService,
    public modalController: ModalController, public alertCtrl: AlertController, public platform: Platform,
    public callNumber: CallNumber, public appAvailability: AppAvailability, public sanitizer: DomSanitizer) {
    this.item = this.navParams.get('item')
    this.user_id = this.navParams.get('user_id')
    this.shopService.get_shop_detail({ 'shop_id': this.item.shop_id }).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
  }

  ionViewWillEnter() {
    if (this.navParams.get('need_refresh_view') == true) {
      this.shopService.get_shop_detail({ 'shop_id': this.item.shop_id }).then(res => {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.item = res.result.res_data
        }
      })
      this.navParams.data.need_refresh_view = false;
    }
  }

  goBack() {
    this.can_show_footer = false
    this.navCtrl.pop()
  }

  click_dongtai() {
    this.detail_type = 'dongtai'
  }

  click_info() {
    this.detail_type = 'info'
  }

  click_contact() {
    this.detail_type = 'contact'
  }

  click_shops() {
    this.detail_type = 'shops'
  }

  click_attachments() {
    this.detail_type = 'attachment'
  }

  exchangeType(type) {
    if (type == "contact") {
      return "联系人";
    }
    else if (type == "invoice") {
      return "开票地址";
    }
    else if (type == "delivery") {
      return "送货地址";
    }
    else if (type == "other") {
      return "其他地址";
    }
    else {
      return type;
    }
  }

  to_slide_img(imgList, index) {
    // this.navCtrl.push('ImageSlidePage', {
    //   'imgList': imgList,
    //   'index': index
    // })
    let data = []
    for (let index = 0; index < imgList.length; index++) {
      data.push({
        url: imgList[index]
      })
    }
    let modal = this.modalController.create(GalleryModal, {
      photos: data,
      initialSlide: index
    });
    modal.present();
  }

  click_phone(phone) {
    if (phone != 'false' && phone != '') {
      let confirm = this.alertCtrl.create({
        title: phone,
        buttons: [
          {
            text: '取消',
            handler: () => {
            }
          },
          {
            text: '确定',
            handler: () => {
              this.call(phone);
            }
          }]
      }).present();
    }
  }

  click_email(email) {
    if (email) {
      this.sendEmail()
    }
  }

  click_address() {
    if (this.item.detailed_address || this.item.rt_partner_shop_x || this.item.rt_partner_shop_y) {
      this.navCtrl.push('LocateShopPage', {
        item: this.item,
      })
    }
  }

  click_website() {
    let browser = new InAppBrowser();
    browser.create(this.item.website, 'system', { location: 'yes' });
  }

  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  sendEmail() {
    this.openAppWith('alicloudmail://', 'com.alibaba.cloudmail')
  }

  openAppWith(ios_bundle_id, android_bundle_id) {
    let app;

    if (this.platform.is('ios')) {
      app = ios_bundle_id;
    }
    else if (this.platform.is('android')) {
      let sApp = startApp.set({
        "component": ["com.alibaba.cloudmail", "com.alibaba.alimei.activity.Welcome"]
      });
      sApp.start(function () { /* success */
        console.log("OK");
      }, function (error) { /* fail */
        alert("请先下载阿里邮箱");
      });
      return;
    }
    let ctrl = this.alertCtrl;

    this.appAvailability.check(app).then(

      function () { // success callback

        let browser = new InAppBrowser();
        browser.create(app, '_system', 'location=yes');
        // window.open('camcard://','_system',  'location=yes');
      },
      function () {
        console.log('1');
        ctrl.create({
          title: '提示',
          subTitle: "请先下载阿里邮箱",
          buttons: [
            {
              text: '取消',
              handler: () => {

              }
            }, {
              text: '跳转下载',
              handler: () => {
                let browser = new InAppBrowser();
                browser.create('https://itunes.apple.com/cn/app/a-li-you-xiang/id923828102?mt=8');
              }
            }
          ]
        }).present();
      }
    );
  }



  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }

  click_edit() {
    this.navCtrl.push('AddShopPage', {
      item: this.item,
      is_edit: true,
      user_id: this.user_id
    })
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  click_create_shop_visit() {
    this.navCtrl.push('ShopVisitPage', {
      user_id: this.user_id,
      shop_id: this.item.shop_id,
      shop_name: this.item.name,
      partner_name: this.item.rt_partner_top_id,
      partner_id: this.item.rt_partner_top_id_id,
    })
  }
}
