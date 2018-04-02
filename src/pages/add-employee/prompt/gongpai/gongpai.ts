import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
import { EmployeeService } from './../../EmployeeService';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc';

/**
 * Generated class for the GongpaiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongpai',
  templateUrl: 'gongpai.html',
  providers: [EmployeeService]
})

export class GongpaiPage {
  isFinish = false;
  isShowNotFind = false;
  isShowFail = false
  item;
  isFindNFC = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public nfc: NFC,
    public modalCtrl: ModalController,
    public toast: ToastController,
    public employeeService: EmployeeService, ) {
    this.item = this.navParams.get("item")
    this.startNFC();

  }


  startNFC() {
    this.nfc.addTagDiscoveredListener(() => {
      console.log("开启nfc成功")
      this.startFindTimer();
    }, (err) => {
      Utils.toastButtom("激活nfc失败", this.toast)
    }).subscribe((event) => {
      let NFC_id = this.nfc.bytesToHexString(event.tag.id)
      if (NFC_id) {
        this.isFindNFC = true
      }
      let upDate_item = {
        id: this.item.id,
        // id: 255,
        edit_id: HttpService.user_id,
        card_num: NFC_id,
      }
      this.startRequestTimer();
      this.employeeService.update_nfc_number(upDate_item).then(res => {
        console.log(res)
        if (res.result && res.result.res_code == 1) {
          // Utils.toastButtom("绑定成功", this.toast)
          this.isFinish = true
        } else {
          this.isShowFail = true
        }
      })
    })
  }


  startFindTimer() {
    let that = this;
    let timer = self.setTimeout(function () {
      if (!that.isFindNFC) {
        that.isShowNotFind = true
        console.log("this.isShowNotFind = true")
      }
    }, 5000)
  }


  startRequestTimer() {
    let that = this;
    let timer = self.setTimeout(function () {
      if (!that.isFinish) {
        that.isShowFail = true
      }
    }, 5000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongpaiPage');
  }




  goBack() {
    this.navCtrl.pop()
  }

  finish() {
    this.navCtrl.pop()
  }

  clickCancel() {
    this.isShowFail = false
    this.isShowNotFind = false
    this.isFinish = false
    this.startNFC();
  }

}
