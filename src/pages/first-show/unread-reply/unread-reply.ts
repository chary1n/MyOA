import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UnreadReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unread-reply',
  templateUrl: 'unread-reply.html',
})
export class UnreadReplyPage {
  item = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController,
    public storage: Storage) {
    this.item = []
    var item_need = this.navParams.get('item')
    var data_arr = []
    for (let i = 0; i < item_need.length; i++) {
      var item_one = item_need[i][0]
      data_arr.push(item_one.msg_id)
      this.item.push(item_one)
    }
    this.showService.read_total_reply({'list':data_arr}).then(res => {

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnreadReplyPage');
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

}
