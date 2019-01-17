import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';

/**
 * Generated class for the TousuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tousu-detail',
  templateUrl: 'tousu-detail.html',
})
export class TousuDetailPage {
  beizhuText = ''
  item
  uid
  submit = false
  submitText = ''
  event_id
  deal_id
  deal_name = ''
  need_add
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController) {
    this.item = this.navParams.get('item')
    this.uid = this.navParams.get('uid')
    this.submit = this.navParams.get('submit')
    this.event_id = this.navParams.get('event_id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TousuDetailPage');
  }

  ionViewWillEnter(){
    this.need_add = this.navParams.get("need_add")
    if (this.need_add) {
      this.deal_name = this.navParams.get("deal_name")
      this.deal_id = this.navParams.get('deal_id')
      this.navParams.data.need_add = false
    }
  }

  goBack(){
    this.navCtrl.pop()
  }

  click_finish(){
    if (this.beizhuText.length == 0){
      Utils.toastButtom('请填写回复',this.toast)
    }
    let body = {
      'uid': this.uid,
      'ts_id': this.item.rt_complain_id,
      'reply_text': this.beizhuText,
    }
    this.showService.rw_reply(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('回复成功',this.toast)
        this.navCtrl.pop()
      }
    })
  }

  click_submit(){
    if (this.deal_name.length == 0){
      Utils.toastButtom('请选择评估人',this.toast)
      return
    }
    if (this.submitText.length == 0){
      Utils.toastButtom('请填写原因',this.toast)
      return
    }

    let body = {
      'event_id': this.event_id,
      'reply_text': this.submitText,
      'uid': this.uid,
      'deal_id': this.deal_id,
    }
    this.showService.create_rw_reply(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('申请成功',this.toast)
        this.navCtrl.pop()
      }
    })

  }

  selectPeople(){
    this.navCtrl.push('TousuChoosePeoplePage',{
      'uid': this.uid,
      'event_id': this.event_id,
    })
  }

}
