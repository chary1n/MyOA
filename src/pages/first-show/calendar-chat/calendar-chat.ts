import { HttpService } from './../../../providers/HttpService';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,ActionSheetController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';

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
  item;
  beizhuText;
  uid;
  res_id;
  frontPage;
  type;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public showService: FirstShowService,public toast:ToastController,
              public storage:Storage) {
                this.frontPage = Utils.getViewController(this.navParams.get('navCtrl'), navCtrl)
                this.item = this.navParams.get('item')
                this.res_id = this.navParams.get('res_id')
                this.type = this.navParams.get('type')
                this.storage.get('user').then(res =>{
                  this.uid = res.result.res_data.user_id;
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarChatPage');
  }

  release(){
    if (this.beizhuText.length == 0 || this.beizhuText.match(/^\s+$/g)){
      Utils.toastButtom("回复不可为空", this.toast)
    }
    else
    {
      let body = {
        'uid': this.uid,
        'res_id': this.res_id,
        'context': this.beizhuText,
        'parent_id': this.item.msg_id,
        'type': this.type,
      }
      this.showService.reply_to(body).then(res => {
        if (res.result.res_code == 1) {
          this.beizhuText = ''
          Utils.toastButtom("回复成功", this.toast)
          this.frontPage.data.need_fresh_reply = true;
          this.navCtrl.popTo(this.frontPage);
        }
      })
    }
  }

}
