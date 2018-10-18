import { HttpService } from './../../../providers/HttpService';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,ActionSheetController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';
import { NativeService } from './../../../providers/NativeService';
declare let cordova: any;

/**
 * Generated class for the DeleteChatPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delete-chat-picture',
  templateUrl: 'delete-chat-picture.html',
  providers: [FirstShowService,NativeService],
})
export class DeleteChatPicturePage {
  item;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusbar: StatusBar) {
    this.frontPage = Utils.getViewController("CalendarChatPage", navCtrl)
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
