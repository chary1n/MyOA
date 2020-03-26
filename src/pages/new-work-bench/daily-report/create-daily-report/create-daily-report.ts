import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, Content, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { ReportService } from './../reportService'
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
import { NativeService } from './../../../../providers/NativeService';
import { DomSanitizer } from '@angular/platform-browser';
declare let cordova: any;
import 'jquery'
declare var $: any;

/**
 * Generated class for the CreateDailyReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-daily-report',
  templateUrl: 'create-daily-report.html',
  providers: [ReportService, NativeService],
})
export class CreateDailyReportPage {
  user_id
  pop_hide_footer = true
  editorContent = ''
  report_type
  title
  report_date
  jh_description = '  '
  show_zj = true // 总结
  show_jh = true // 计划
  show_jl = true // 工作记录
  img_list = []
  frontPage

  is_edit = false
  now_item
  last_plan
  can_show_last_plan = false
  last_plan_time
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public reportService: ReportService, public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
    public sanitizer: DomSanitizer) {
    this.user_id = this.navParams.get('user_id')
    this.is_edit = this.navParams.get('is_edit')
    if (this.is_edit) {
      this.frontPage = Utils.getViewController("DailyReportDetailPage", this.navCtrl)
      this.now_item = this.navParams.get('item_data')
      this.report_type = this.now_item.type
      this.report_date = this.now_item.summit_time
      this.editorContent = this.now_item.summary
      this.jh_description = this.now_item.plan
      this.last_plan = this.now_item.ago_plan
      this.last_plan_time = this.now_item.ago_summit_time
    }
    else {
      this.is_edit = false
      this.report_type = 'day_daily'
      this.frontPage = Utils.getViewController("DailyReportPage", this.navCtrl)
      this.report_date = Utils.dateFormat(new Date(), 'yyyy-MM-dd')
      this.reportService.get_daily_report_last({ 'user_id': this.user_id }).then(res => {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.last_plan = res.result.res_data.plan
          this.last_plan_time = res.result.res_data.summit_time
          if (this.last_plan.length > 0) {
            this.can_show_last_plan = true
          }
        }
      })
    }
    
    // if (this.report_type == 'day_daily') {
    //   this.title = '新建日报'
    // }
    // else if (this.report_type == 'week_daily') {
    //   this.title = '新建周报'
    // }
    // else if (this.report_type == 'mouth_daily') {
    //   this.title = '新建月报'
    // }
    // else {
    //   this.title = '新建'
    // }

    this.title = '新建'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateDailyReportPage');
    // if (this.report_type == 'day_daily') {
    //   document.getElementById('day')['checked'] = true
    // }
    // else if (this.report_type == 'week_daily') {
    //   document.getElementById('week')['checked'] = true
    // }
    // else if (this.report_type == 'mouth_daily') {
    //   document.getElementById('month')['checked'] = true
    // }
    setTimeout(() => {
      var that = this
      $('#input_date').mobiscroll().date({
        theme: 'ios',
        lang: 'zh',
        display: 'bottom',
        dateWheels: '|M d D|',
        onSet: function (event, inst) {
          that.report_date = event.valueText
        }
      });
    }, 300)
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

  goBack() {
    this.pop_hide_footer = false
    this.navCtrl.pop()
  }

  get_type_str() {
    if (this.report_type == 'day_daily') {
      return '日报'
    }
    else if (this.report_type == 'week_daily') {
      return '周报'
    }
    else if (this.report_type == 'mouth_daily') {
      return '月报'
    }

  }

  click_add_img(allowEdit: boolean = true) {
    // this.imgList.push("assets/img/photo.png")
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1, allowEdit);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0, allowEdit);
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
    actionSheet.present();
  }

  getPicture(type, allowEdit: boolean = false) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }

  ionViewWillLeave() {
    cordova.plugins.Keyboard.close();
  }

  getPictureSuccess(img_url) {
    this.editorContent = this.editorContent + "<br>" + "<img src='" + img_url + "' />" + "<br>"
    this.img_list.push(img_url)
  }

  panEvent($event) {
    cordova.plugins.Keyboard.close();
  }

  changeZJ() {
    this.show_zj = !this.show_zj
  }

  changeJH() {
    this.show_jh = !this.show_jh
  }

  changeJL() {
    this.show_jl = !this.show_jl
  }

  submit_report() {
    if (this.editorContent == '') {
      Utils.toastButtom('请填写总结', this.toastCtrl)
      return;
    }
    // var is_check_day = document.getElementById('day')['checked']
    // var is_check_week = document.getElementById('week')['checked']
    // var is_check_month = document.getElementById('month')['checked']
    // if (is_check_day) {
    //   this.report_type = 'day_daily'
    // }
    // if (is_check_week) {
    //   this.report_type = 'week_daily'
    // }
    // if (is_check_month) {
    //   this.report_type = 'mouth_daily'
    // }

    let body = {
      'type': this.report_type,
      'summary': this.editorContent,
      'summit_time': this.report_date,
      'plan': this.jh_description,
      'img_list': this.img_list,
      'user_id': this.user_id,
      'is_edit': this.is_edit,
      'state': 2,
      'ago_summit_time': this.last_plan_time,
      'ago_plan': this.last_plan,
    }
    if (this.is_edit) {
      body['report_id'] = this.now_item.report_id
    }
    this.reportService.submit_report(body).then(res => {
      if (res.result.res_code == 1) {
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }

  save_report() {
    if (this.editorContent == '') {
      Utils.toastButtom('请填写总结', this.toastCtrl)
      return;
    }

    // var is_check_day = document.getElementById('day')['checked']
    // var is_check_week = document.getElementById('week')['checked']
    // var is_check_month = document.getElementById('month')['checked']
    // if (is_check_day) {
    //   this.report_type = 'day_daily'
    // }
    // if (is_check_week) {
    //   this.report_type = 'week_daily'
    // }
    // if (is_check_month) {
    //   this.report_type = 'mouth_daily'
    // }

    let body = {
      'type': this.report_type,
      'summary': this.editorContent,
      'summit_time': this.report_date,
      'plan': this.jh_description,
      'img_list': this.img_list,
      'user_id': this.user_id,
      'is_edit': this.is_edit,
      'state': 1,
      'ago_summit_time': this.last_plan_time,
      'ago_plan': this.last_plan,
    }
    if (this.is_edit) {
      body['report_id'] = this.now_item.report_id
    }
    this.reportService.submit_report(body).then(res => {
      if (res.result.res_code == 1) {
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }

  exchange_img_id_list(img_url, id) {
    this.editorContent.replace(img_url, ('/web/image/' + id))
  }

  click_day() {
    document.getElementById('day')['checked'] = true
  }

  click_week() {
    document.getElementById('week')['checked'] = true
  }

  click_month() {
    document.getElementById('month')['checked'] = true
  }
}
