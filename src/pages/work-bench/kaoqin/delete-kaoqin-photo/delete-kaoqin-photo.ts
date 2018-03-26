import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './../kaoqinService';
import { IonicPage, NavController, NavParams, Platform,AlertController ,ToastController,LoadingController,ActionSheetController} from 'ionic-angular';
import { Utils } from '../../../../providers/Utils';
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the DeleteKaoqinPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delete-kaoqin-photo',
  templateUrl: 'delete-kaoqin-photo.html',
})
export class DeleteKaoqinPhotoPage {
  item;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,private statusbar:StatusBar) {
     this.item = this.navParams.get("item")
     this.frontPage = Utils.getViewController("KaoqinPhotoPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteKaoqinPhotoPage');
  }

  ionViewWillEnter() {
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  delete() {
    this.frontPage.data.isDeletePicture = true
    this.navCtrl.popTo(this.frontPage)
  }

}
