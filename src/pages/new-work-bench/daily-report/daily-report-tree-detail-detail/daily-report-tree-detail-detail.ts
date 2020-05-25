import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, ToastController } from 'ionic-angular';
import { Component, ViewChild, } from '@angular/core';
import { ReportService } from './../reportService'
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
import 'jquery'
declare var $: any;
declare let cordova: any;
/**
 * Generated class for the DailyReportTreeDetailDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-report-tree-detail-detail',
  templateUrl: 'daily-report-tree-detail-detail.html',
  providers: [ReportService],
})
export class DailyReportTreeDetailDetailPage {
  item_data
  uid
  now_report_id
  arr_index
  now_index

  show_zj = true // 总结
  show_jh = true // 计划
  show_jl = true // 工作记录

  show_yjh = true
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService: ReportService, public sanitizer: DomSanitizer,
    public modalController: ModalController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
      this.item_data = {}
      this.now_report_id = this.navParams.get('now_report_id')
      this.arr_index = this.navParams.get('arr_index')
      this.uid = this.navParams.get('uid')
      this.now_index = this.navParams.get('now_index')
      // this.reload_data()
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportTreeDetailDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  ionViewDidEnter(){
    this.reload_data()
  }

  ionViewWillLeave() {
    cordova.plugins.Keyboard.close();
  }

  reload_data() {
    var body = {
      'report_id': this.now_report_id,
      'user_id': this.uid,
    }
    this.reportService.get_report_detail(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item_data = res.result.res_data

        this.set_img_data()
      }
    })
  }

  set_img_data() {
    if (this.item_data.summary.length) {
      var imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
      var img_arr = this.item_data.summary.match(imgReg)
      var that = this
      var attachment_id_arr = []
      var search_arr = []
      for (var i = 0; i < img_arr.length; i++) {
        var now_img_url = ''
        var capture = img_arr[i].match(srcReg)[1].split('/')[img_arr[i].match(srcReg)[1].split('/').length - 1]
        attachment_id_arr.push(capture)
        search_arr.push(img_arr[i].match(srcReg)[1])
      }
      let body = {
        'img_arr': search_arr,
        'summary': this.item_data.summary,
        'attachment_id_arr': attachment_id_arr,
      }
      this.reportService.exchange_attachment_url(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          // now_img_url = '<img src="' + res.result.res_data + '" style="width:100%;" imageViewer/>'
          that.item_data.summary = res.result.res_data
        }
      })
    }
  }

  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }
  assemblePlanHTML(str) {
    if (str) {
      var str_after = str.replace(/\n/g, "<br>")
      return this.sanitizer.bypassSecurityTrustHtml(str_after)
    }
    else {
      return ''
    }
  }

  changeZJ() {
    this.show_zj = !this.show_zj
  }

  changeZH() {
    this.show_jh = !this.show_jh
  }

  changeJL() {
    this.show_jl = !this.show_jl
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

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  new_reply_to() {
    let modal = this.modalController.create("ModalChatPage", {
      item: this.item_data,
      res_id: this.item_data.report_id,
      navCtrl: 'DailyReportDetailPage',
      type: 'rt.crm.sale.daily',
      has_parent: false,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.reload_data()
      }
    });
    modal.present();
  }

  only_reply_to(items) {
    let modal = this.modalController.create("ModalChatPage", {
      item: items,
      res_id: this.item_data.report_id,
      navCtrl: 'DailyReportDetailPage',
      type: 'rt.crm.sale.daily',
      has_parent: true,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.reload_data()
      }
    });
    modal.present();
  }

  update_zan(items) {
    let body = {
      'uid': this.uid,
      'type': 'add',
      'msg_id': items.msg_id,
    }
    this.reportService.update_zan(body).then(res => {
      if (res.result.res_code == 1) {
        this.reload_data()
      }
    })
  }

  cancel_zan(items) {
    let body = {
      'uid': this.uid,
      'type': 'delete',
      'msg_id': items.msg_id,
    }
    this.reportService.update_zan(body).then(res => {
      if (res.result.res_code == 1) {
        this.reload_data()
      }
    })
  }

  can_show_back(){
    if (this.now_index == 0){
      return false
    }
    else{
      return true
    }
  }

  can_show_forward(){
    if (this.now_index == this.arr_index.length - 1){
      return false
    }
    else{
      return true
    }
  }

  back_page(){
    this.now_index -= 1
    this.now_report_id = this.arr_index[this.now_index]
    this.reload_data()
  }

  next_page(){
    this.now_index += 1
    this.now_report_id = this.arr_index[this.now_index]
    this.reload_data()
  }

  click_now_before() {
    let body = {
      'user_id': this.item_data.create_uid,
      'type': 'before',
      'summit_time': this.item_data.summit_time
    }
    this.reportService.get_employee_report_limit(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        if (res.result.res_data.is_data) {
          this.item_data = res.result.res_data.data
        } else {
          Utils.toastButtom('无更多数据', this.toastCtrl)
        }
      }
    })
  }

  click_now_next() {
    let body = {
      'user_id': this.item_data.create_uid,
      'type': 'next',
      'summit_time': this.item_data.summit_time
    }
    this.reportService.get_employee_report_limit(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        if (res.result.res_data.is_data) {
          this.item_data = res.result.res_data.data
        } else {
          Utils.toastButtom('无更多数据', this.toastCtrl)
        }
      }
    })
  }

  changeYJH() {
    this.show_yjh = !this.show_yjh
  }

}
