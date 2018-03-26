import { EmployeeService } from './../EmployeeService';
import { CommonUseServices } from './../../work-bench/commonUseServices';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HttpService } from './../../../providers/HttpService';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Component } from '@angular/core';
// import { NFC, Ndef } from '@ionic-native/nfc';
import { Utils } from '../../../providers/Utils';

/**
 * Generated class for the PromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prompt',
  templateUrl: 'prompt.html',
  providers:[EmployeeService]
})
export class PromptPage {
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toast: ToastController,
    public employeeService:EmployeeService,
     ) {
    this.item = this.navParams.get("data")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromptPage');
  }

  finish() {
    this.navCtrl.push("EmployeeDetailPage", { item: this.item })
  }

  ionViewDidEnter() {

  }


  addEmployee() {
    this.navCtrl.push("AddEmployeePage")
  }


  perfectEmployee() {
    this.navCtrl.push("EmployeeDetailPage", {
      item: this.item, isModify: true
    })
  }


  generate_qr_code() {
    this.navCtrl.push("QRcodePage", { data: HttpService.appUrl + "," + this.item.id, item: this.item })
    // this.navCtrl.push("QRcodePage", { data:"123123123", item: this.item })
  }

  generate_nfc() {
    this.navCtrl.push("GongpaiPage")
    // this.nfc.addTagDiscoveredListener(() => {
    //   console.log("成功")
    // }, (err) => {
    //   Utils.toastButtom("激活nfc失败", this.toast)
    // }).subscribe((event) => {
    //   let NFC_id = this.nfc.bytesToHexString(event.tag.id)
    //   let upDate_item = {
    //     id: this.item.id,
    //     edit_id: HttpService.user_id,
    //     card_num :  NFC_id , 
    //   }
    //   this.employeeService.update_employee(upDate_item).then(res=>{
    //     console.log(res)
    //   })
    // })
  }
}




