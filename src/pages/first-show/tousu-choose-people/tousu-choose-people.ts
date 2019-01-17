import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';

/**
 * Generated class for the TousuChoosePeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tousu-choose-people',
  templateUrl: 'tousu-choose-people.html',
})
export class TousuChoosePeoplePage {
  uid
  event_id
  data_arr = []
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController) {
      this.uid = this.navParams.get('uid')
      this.event_id = this.navParams.get('event_id')
      this.frontPage = Utils.getViewController("TousuDetailPage", navCtrl)
      let body = {
        'uid': this.uid,
        'event_id': this.event_id,
      }
      this.showService.get_all_manager(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1){
          this.data_arr = res.result.res_data
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TousuChoosePeoplePage');
  }

  choose_people(one_data){
    this.frontPage.data.need_add = true
    this.frontPage.data.deal_name = one_data.partner_name
    this.frontPage.data.deal_id = one_data.partner_id
    this.navCtrl.pop()
  }

  goBack(){  
    this.navCtrl.pop()
  }

}
