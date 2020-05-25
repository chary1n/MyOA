import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, Content, ToastController, AlertController } from 'ionic-angular';
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
  show_yjh = true
  img_list = []
  frontPage

  is_edit = false
  now_item
  last_plan
  can_show_last_plan = false
  last_plan_time

  imgList = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public reportService: ReportService, public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
    public sanitizer: DomSanitizer, public alertCtrl: AlertController) {
    this.user_id = this.navParams.get('user_id')
    this.is_edit = this.navParams.get('is_edit')
    if (this.is_edit) {
      this.frontPage = Utils.getViewController("DailyReportDetailPage", this.navCtrl)
      this.now_item = this.navParams.get('item_data')
      this.report_type = this.now_item.type
      this.report_date = this.now_item.summit_time
      this.editorContent = this.now_item.summary
      this.jh_description = this.reformNoticeContent(this.now_item.plan)
      this.last_plan = this.now_item.ago_plan
      this.last_plan_time = this.now_item.ago_summit_time
      if (this.last_plan.length > 0) {
        this.can_show_last_plan = true
      }
      for (var i = 0; i < this.now_item.attachments.length; i++) {
        this.imgList.push({
          'value': this.now_item.attachments[i].value,
          'attachment_id': this.now_item.attachments[i].attachment_id,
        })
      }
      this.imgList.push({
        'value': "assets/img/smalladd.png",
        'attachment_id': false,
      })
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
      this.imgList.push({
        'value': "assets/img/smalladd.png",
        'attachment_id': false,
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
    if (this.jh_description.trim() != '' || this.editorContent.trim() != '') {
      var ctrl = this.alertCtrl
      ctrl.create({
        title: '提示',
        subTitle: '数据未保存，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.pop_hide_footer = false
            this.navCtrl.pop()
          }
        }
        ]
      }).present();
    } else {
      this.pop_hide_footer = false
      this.navCtrl.pop()
    }


    
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
    this.editorContent = this.editorContent + "<br>" + "<img style='height: 100px;width:25%' src='" + img_url + "' />" + "<br>"
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

    var final_arr = []
    if (this.imgList.length == 1) {
      final_arr = []
    } else {
      for (var i = 0; i < this.imgList.length; i++) {
        if (this.imgList[i].value != 'assets/img/smalladd.png') {
          final_arr.push(this.imgList[i])
        }
      }
    }

    // if(this.imgList.length==1){
    //   this.imgList = []
    // }else{
    //   if(this.imgList.length>0){
    //     var index_this = -1
    //     for (let index = 0; index < this.imgList.length; index++) {
    //       if(this.imgList[index].value=='assets/img/smalladd.png'){
    //           index_this = index
    //       }
    //     }
    //     if(index_this!=-1){
    //       this.imgList.splice(index_this, 1);
    //     }
    //   }
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
      'imgList': final_arr,
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

    var final_arr = []
    if (this.imgList.length == 1) {
      final_arr = []
    } else {
      for (var i = 0; i < this.imgList.length; i++) {
        if (this.imgList[i].value != 'assets/img/smalladd.png') {
          final_arr.push(this.imgList[i])
        }
      }
      // if(this.imgList.length>0){
      //   var index_this = -1
      //   for (let index = 0; index < this.imgList.length; index++) {
      //     if(this.imgList[index].value=='assets/img/smalladd.png'){
      //         index_this = index
      //     }
      //   }
      //   if(index_this!=-1){
      //     this.imgList.splice(index_this, 1);
      //   }
      // }
    }

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
      'imgList': final_arr,
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

  clickPicture(item, index) {
    if (item.value == "assets/img/smalladd.png") {
      this.addImg()
    }
  }

  addImg(allowEdit: boolean = true) {
    // if(this.imgList.length>9){
    //   Utils.toastButtom('最多可以选择9张图片', this.toast)
    //   return
    // }
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture1(1, allowEdit);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture1(0, allowEdit);
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

  getPicture1(type, allowEdit: boolean = false) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
      quality: 50
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess_1(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess_1(img_url);
      });
    }
  }

  getPictureSuccess_1(img_url) {
    this.imgList.unshift({
      'value': img_url,
      'attachment_id': false,
    })
    // if(this.imgList.length==10){
    //     this.imgList.pop()
    // }
  }

  delete_img(i) {
    if (this.imgList[i].attachment_id) {
      this.reportService.delete_attachment({ 'attachment_id': this.imgList[i].attachment_id }).then(res => {
        if (res.result.res_code == 1) {
          this.imgList.splice(i, 1)
        }
      })
    } else {
      this.imgList.splice(i, 1)
    }
  }

  reformNoticeContent(content) {
    content = content.replace(/<\/p>/g, '\n')
    content = content.replace(/<br>/g, '\n')
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

  changeYJH() {
    this.show_yjh = !this.show_yjh
  }
}
