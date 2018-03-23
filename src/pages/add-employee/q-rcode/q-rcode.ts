import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Utils } from './../../../providers/Utils';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Screenshot } from '@ionic-native/screenshot';

/**
 * Generated class for the QRcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-q-rcode',
  templateUrl: 'q-rcode.html',
})
export class QRcodePage {

  QRData;
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast: ToastController,
    public screenshot: Screenshot) {

    this.QRData = this.navParams.get("data")
    this.item = this.navParams.get("item")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QRcodePage');
  }

  savePhone() {
    this.screenshot.save('jpg', 20, "").then((res) => {
      Utils.toastButtom("保存成功", this.toast)
    }, (err) => {
      Utils.toastButtom("保存失败", this.toast)
    });
  }

}
