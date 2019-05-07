import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, Content } from 'ionic-angular';
import { Component, ViewChild, } from '@angular/core';
import { ReportService } from './../reportService'
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the DailyReportTreeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-report-tree-detail',
  templateUrl: 'daily-report-tree-detail.html',
  providers: [ReportService],
})
export class DailyReportTreeDetailPage {
  total_data_list = []
  arr_index = [] 
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService: ReportService) {
    this.total_data_list = this.navParams.get('total_data_list')
    this.arr_index = this.navParams.get('arr_index')
    this.uid = this.navParams.get('uid')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportTreeDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  changeType(type) {
    if (type == 'day_daily') {
      return '日报'
    }
    else if (type == 'week_daily') {
      return '周报'
    }
    else if (type == 'mouth_daily') {
      return '月报'
    }
    else {
      return ''
    }
  }

  changeState(state) {
    if (state == 1) {
      return '草稿'
    }
    else if (state == 2) {
      return '正式'
    }
    else {
      return ''
    }
  }

  team_detail(item,i){
    let now_index = 0
    for(let index=0;index<this.arr_index.length;index++){
      if (item.report_id == this.arr_index[index]){
        now_index = index
      }
    }
    this.navCtrl.push('DailyReportTreeDetailDetailPage', {
      now_report_id: item.report_id,
      uid: this.uid,
      arr_index: this.arr_index,
      now_index: now_index,
    })
  }

}
