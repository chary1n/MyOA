import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShopService } from './../shopService'
import { GalleryModal } from 'ionic-gallery-modal';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ShowShopTreeDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-shop-tree-data',
  templateUrl: 'show-shop-tree-data.html',
  providers: [ShopService],
})
export class ShowShopTreeDataPage {
  visit_message_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService,
    public modalController: ModalController, public sanitizer: DomSanitizer) {
    this.visit_message_arr = this.navParams.get('visit_message_arr')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowShopTreeDataPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  to_link(items) {
    this.navCtrl.push('ShopDetailPage', {
      item: { 'shop_id': items.shop_id }
    })
  }

  cal_img(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img)
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

  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }
}
