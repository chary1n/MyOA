import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WaitDealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wait-deal',
  templateUrl: 'wait-deal.html',
})
export class WaitDealPage {
  uid
  data_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController,
    public storage: Storage) {
      this.uid = this.navParams.get('uid')
  }

  ionViewWillEnter(){
    this.data_arr = []
    let body = {
      'uid': this.uid
    }
    this.showService.get_all_rw_reply(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.data_arr = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitDealPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  choose_tousu(one_data){
    this.navCtrl.push('CalendarDeatilpagePage', {
                'item_id': one_data.rt_complain_task_id,
                'isEdit': false,
                'tousu_enter': true,
              })

    // this.showService.get_event_detail({
    //         'uid': this.uid,
    //         'event_id': one_data.rt_complain_task_id
    //       }).then(res => {
    //         if (res.result.res_data && res.result.res_code == 1) {
    //           let item = res.result.res_data
    //           this.navCtrl.push('CalendarDeatilpagePage', {
    //             'item': item,
    //             'isEdit': false,
    //             'tousu_enter': true,
    //           })
    //         }
    //       })
  }

}
