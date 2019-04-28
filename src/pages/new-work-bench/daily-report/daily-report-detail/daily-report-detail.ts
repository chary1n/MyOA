import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, Content } from 'ionic-angular';
import { Component, ViewChild,  } from '@angular/core';
import { ReportService } from './../reportService'
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the DailyReportDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-report-detail',
  templateUrl: 'daily-report-detail.html',
  providers: [ReportService],
})
export class DailyReportDetailPage {
  @ViewChild('detailcontent') detailcontent: Content;
  uid
  item_data
  frontPage
  show_zj = true // 总结
  show_jh = true // 计划
  show_jl = true // 工作记录

  can_show_more = false // 是否显示更多操作
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public reportService: ReportService, public sanitizer: DomSanitizer,
    public modalController: ModalController, public actionSheetCtrl: ActionSheetController) {
    this.item_data = this.navParams.get('item')
    this.uid = this.navParams.get('uid')
    this.frontPage = Utils.getViewController("DailyReportPage", this.navCtrl)
    this.reload_data_with_img()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportDetailPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh')) {
      this.navParams.data.need_fresh = false;
      this.reload_data()
      this.detailcontent.resize()
    }
  }

  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }
  assemblePlanHTML(str){
    if (str){
      var str_after = str.replace(/\n/g, "<br>")
    return this.sanitizer.bypassSecurityTrustHtml(str_after)
  }
  else{
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

  goBack() {
    this.navCtrl.pop()
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

  reload_data() {
    var body = {
      'report_id': this.item_data.report_id,
      'user_id': this.uid,
    }
    this.reportService.get_report_detail(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item_data = res.result.res_data
        if (this.item_data.create_uid == this.uid) {
          this.can_show_more = true
        }
        else {
          this.can_show_more = false
        }
        this.set_img_data()
      }
    })
  }

  reload_data_with_img(){
    var body = {
      'report_id': this.item_data.report_id,
      'user_id': this.uid,
    }
    this.reportService.get_report_detail(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item_data = res.result.res_data
        if (this.item_data.create_uid == this.uid) {
          this.can_show_more = true
        }
        else {
          this.can_show_more = false
        }
        this.set_img_data()
      }
    })
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

  click_more() {
    let actionSheet
    if (this.item_data.rt_state == 1) {
      actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: [
          {
            text: '提交',
            //  role: 'destructive',
            handler: () => {
              this.submit_2_item()
            }
          },
          {
            text: '编辑',
            handler: () => {
              this.enter_edit()
            }
          }, {
            text: '删除',
            handler: () => {
              this.delete_item()
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    }
    else {
      actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: [
          {
            text: '删除',
            handler: () => {
              this.delete_item()
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    }

    actionSheet.present();

  }

  delete_item() {
    let body = {
      'report_id': this.item_data.report_id
    }
    this.reportService.delete_report(body).then(res => {
      if (res.result.res_code == 1) {
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }

  // 提交报告
  submit_2_item() {
    let body = {
      'report_id': this.item_data.report_id
    }
    this.reportService.send_submit_report(body).then(res => {
      if (res.result.res_code == 1) {
        this.reload_data()
      }
    })
  }

  enter_edit(){
    this.navCtrl.push('CreateDailyReportPage',{
      'is_edit': true,
      'user_id': this.uid,
      'item_data': this.item_data,
    })
  }

  reformNoticeContent(content) {

    content = content.split('');
    var tagBoolean = false;
    content.forEach((c, index) => {
      if ('<' === c) {
        tagBoolean = true;
      } else if ('>' === c) {
        content[index] = '';
        tagBoolean = false;
        // continue;  如果是JavaScript可以添加这句代码，angular4不行。
      }
      if (tagBoolean) {
        content[index] = '';
      }
    });
    content = content.join('');
    return content
  }

}
