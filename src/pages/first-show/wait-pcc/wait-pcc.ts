import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WaitPccPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wait-pcc',
  templateUrl: 'wait-pcc.html',
})
export class WaitPccPage {
  uid
  wait_arr = []
  item_id
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController,
    public storage: Storage) {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;


    })
  }

  ionViewWillEnter() {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
      let body = {
        'uid': this.uid
      }
      this.showService.get_event_type(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          for (let i = 0; i < res.result.res_data.length; i++) {
            if (res.result.res_data[0].display_name == '任务') {
              this.item_id = res.result.res_data[0].id
            }
          }
        }
        this.get_total_arr()
      })

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitPccPage');
  }

  get_total_arr() {
    let body = {
      'uid': this.uid
    }
    this.showService.get_total_need_pcc_list(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.wait_arr = res.result.res_data
      }
    })
  }
  gotoDeatil(item) {
    this.navCtrl.push('CalendarDeatilpagePage', {
                'item_id': item.id,
                'isEdit': false,
                'frontPage': 'WaitPccPage',
                'pcc_enter': true,
              })

    // this.showService.get_event_detail({
    //   'uid': this.uid,
    //   'event_id': item.id
    // }).then(res => {
    //   if (res.result.res_data && res.result.res_code == 1) {
    //     item = res.result.res_data
    //     this.navCtrl.push('CalendarDeatilpagePage', {
    //       'item': item,
    //       'isEdit': false,
    //       'frontPage': 'WaitPccPage',
    //       'pcc_enter': true,
    //     })
    //   }
    // })
  }

  goBack() {
    this.navCtrl.pop()
  }

}
