import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Utils } from '../../../../../providers/Utils';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the DeletePicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delete-picture',
  templateUrl: 'delete-picture.html',
})
export class DeletePicturePage {
  item;
  frontPage;
  need_back_chat
  need_back_retry
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusbar: StatusBar) {
    this.need_back_chat = this.navParams.get('need_back_chat')
    this.need_back_retry = this.navParams.get('need_back_retry')
    if (this.need_back_chat) {
      this.frontPage = Utils.getViewController("GongdanNewChatPage", navCtrl)
    }
    else {
      if (this.need_back_retry) {
        this.frontPage = Utils.getViewController("RebackGongdanPage", navCtrl)
      }
      else {
        this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)
      }
    }

    if (this.navParams.get('AddEmployeePage')) {
      this.frontPage = Utils.getViewController("AddEmployeePage", navCtrl)
    } else if (this.navParams.get('EmployeeDetailPage')) {
      this.frontPage = Utils.getViewController("EmployeeDetailPage", navCtrl)
    } else if (this.navParams.get('EditEmployeeInfoPage')){
      this.frontPage = Utils.getViewController('EditEmployeeInfoPage', navCtrl)
    }

    this.item = this.navParams.get("item")
  }

  ionViewWillEnter() {
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePicturePage');
  }

  delete() {
    this.frontPage.data.isDeletePicture = true
    this.navCtrl.popTo(this.frontPage)
  }


}
