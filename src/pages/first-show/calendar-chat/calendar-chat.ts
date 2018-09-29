import { HttpService } from './../../../providers/HttpService';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,ActionSheetController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
declare let cordova: any;


/**
 * Generated class for the CalendarChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calendar-chat',
  templateUrl: 'calendar-chat.html',
  providers: [FirstShowService],
})
export class CalendarChatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public showService: FirstShowService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarChatPage');
  }

  release(){

  }

}
