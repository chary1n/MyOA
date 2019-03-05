import { MomentsCircleService } from './../momentsCircleService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../../providers/Utils';

/**
 * Generated class for the MomentsUnReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-moments-un-read',
  templateUrl: 'moments-un-read.html',
  providers: [MomentsCircleService]
})
export class MomentsUnReadPage {

  item=[]
  user_id: any
  isAllRead = false
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public momentsCircleService: MomentsCircleService) {
      this.item = this.navParams.get('item')
      this.user_id = this.navParams.get('user_id')
      this.frontPage = Utils.getViewController("MomengsCirclePage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MomentsUnReadPage');
  }


  goBack(){
      this.frontPage.data.need_fresh = this.isAllRead;
      this.navCtrl.popTo(this.frontPage);
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  gotoDeatil(items){
    this.isAllRead = true
      this.navCtrl.push('MomentsDetailPage',{
        'id': items.res_id,
        'user_id': this.user_id
      } )
  }

  readAll() {
    var data_arr = []
    for (let i = 0; i < this.item.length; i++) {
      var item_one = this.item[i]
      data_arr.push(item_one.msg_id)
    }
    this.momentsCircleService.read_total_reply({ 'list': data_arr, 'uid': this.user_id }).then(res => {
      if (res.result.res_code == 1) {
        this.isAllRead = true
      }
    })
  }
}
