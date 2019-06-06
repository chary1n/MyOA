import { NavController, NavParams, IonicPage, ActionSheetController, Content, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApplicantService } from './../applicantService'
import { Utils } from './../../../../providers/Utils';
import { CallNumber } from '@ionic-native/call-number';
import 'jquery'
declare var Highcharts: any;

/**
 * Generated class for the ApplicantDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-applicant-detail',
  templateUrl: 'applicant-detail.html',
  providers: [ApplicantService, CallNumber],
})
export class ApplicantDetailPage {
  item
  detail_type = 'applicant_info'
  user_id
  can_show_btn = false
  msg_text
  constructor(public navCtrl: NavController, public navParams: NavParams, public applicantService: ApplicantService,
    public storage: Storage, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,
    public toast: ToastController, public callNumber: CallNumber) {
    this.user_id = this.navParams.get('user_id')
    this.item = this.navParams.get('item')
    this.applicantService.get_applicant_detail({ 'applicant_id': this.item.applicant_id }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
        this.storage.get('user')
          .then(res => {
            console.log(res);
            let uid = res.result.res_data.user_id

            for (let product of res.result.res_data.groups) {
              if (product.name == 'group_hr_manager' || product.name == 'recruitment_manager') {
                this.can_show_btn = true
                break
              }
            }
            if (this.item.state != 'a' && this.item.state != 'b') {
              this.can_show_btn = true
            }
            else {
              this.can_show_btn = false
            }
          })
      }
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantDetailPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.applicantService.get_applicant_detail({ 'applicant_id': this.item.applicant_id }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data
          this.storage.get('user')
            .then(res => {
              console.log(res);
              let uid = res.result.res_data.user_id

              for (let product of res.result.res_data.groups) {
                if (product.name == 'group_hr_manager' || product.name == 'recruitment_manager') {
                  this.can_show_btn = true
                  break
                }
              }
              if (this.item.state != 'a' && this.item.state != 'b') {
                this.can_show_btn = true
              }
              else {
                this.can_show_btn = false
              }
            })
        }
      })
    }
  }

  changeState(state) {
    let str = ''
    if (state == '0') {
      str = '草稿'
    }
    else if (state == '3') {
      str = '面试'
    }
    else if (state == '6') {
      str = '审核offer'
    }
    else if (state == '8') {
      str = '审核offer不通过'
    }
    else if (state == '9') {
      str = '待入职'
    }
    else if (state == 'a') {
      str = '完成'
    }
    else if (state == 'b') {
      str = '淘汰归档'
    }
    return str
  }

  changeMarryState(state) {
    let str = ''
    if (state == 'S') {
      str = '未婚'
    }
    else if (state == 'M') {
      str = '已婚'
    }
    else if (state == 'D') {
      str = '离婚'
    }
    else if (state == 'W') {
      str = '丧婚'
    }
    else if (state == 'R') {
      str = '再婚'
    }
    return str
  }

  changeEnglishLevel(state) {
    let str = ''
    if (state == '0') {
      str = '四级'
    }
    else if (state == '1') {
      str = '六级'
    }
    else if (state == '2') {
      str = '专四'
    }
    else if (state == '3') {
      str = '专八'
    }
    return str
  }

  changeEducation(state) {
    let str = ''
    if (state == '1') {
      str = '高中'
    }
    else if (state == '2') {
      str = '中专'
    }
    else if (state == '3') {
      str = '大专'
    }
    else if (state == '4') {
      str = '本科'
    }
    else if (state == '5') {
      str = '硕士'
    }
    else if (state == '6') {
      str = '博士'
    }
    return str
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_dongtai_info() {
    this.detail_type = 'dongtai_info'
  }

  click_applicant_info() {
    this.detail_type = 'applicant_info'
  }

  click_attachment_info() {
    this.detail_type = 'attachment_info'
  }

  click_test_info() {
    this.detail_type = 'test_info'
    if (this.item.rt_is_personality_test) {
      setTimeout(() => {
        var result_list = this.item.rt_is_personality_test.split(',')
        var res_red = parseInt(result_list[0]);
        var res_blue = parseInt(result_list[1]);
        var res_yellow = parseInt(result_list[2]);
        var res_green = parseInt(result_list[3]);
        var Pred = Math.round((res_red) / 30 * 10000) / 100;
        var Pblue = Math.round((res_blue) / 30 * 10000) / 100;
        var Pyellow = Math.round((res_yellow) / 30 * 10000) / 100;
        var Pgreen = Math.round((100 - Pred - Pblue - Pyellow) * 100) / 100;
        var dataArray = [
          ['红色' + res_red + '个', Pred],
          ['蓝色' + res_blue + '个', Pblue],
          ['黄色' + res_yellow + '个', Pyellow],
          ['绿色' + res_green + '个', Pgreen]
        ];
        let chart1 = new Highcharts.Chart({
          colors: ['Red', 'Blue', 'Yellow', 'Green'],
          chart: {
            renderTo: 'container',
            plotBackgroundColor: 'white',
            plotBorderWidth: null,
            plotShadow: false,
            margin: [0, 0, 0, 0],
            width: 200,
            height: 200,
          },
          title: {
            text: ''
          },
          tooltip: {
            enabled: false,
            shared: true
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              size: '30%',
              dataLabels: {
                enabled: true,
                color: '#666666',
                connectorWidth: 0,
                distance: 3,
                connectorColor: '#666666',
                style: {
                  fontSize: '12px',
                  fontWeight: 'normal'
                },
                formatter: function () {
                  return this.point.name;
                }
              },

              events: {

                click: function (e) {

                },
                mouseOver: function () {

                },
                mouseOut: function () {

                }
              },
              point: {
                events: {
                  click: function (e) {
                    this.slice(false);
                    if (e && e.stopPropagation)
                      e.stopPropagation();
                    else
                      window.event.cancelBubble = true;
                    return false;
                  },

                  mouseOut: function (evt) {

                  }
                }
              }
            }
          },
          exporting: {
            buttons: {
              exportButton: {
                enabled: false
              },
              printButton: {
                enabled: false
              }
            }
          },
          credits: {
            enabled: false
          },
          series: [{
            type: 'pie',
            name: ' ',
            data: dataArray
          }]
        });
      }, 5)
    }
  }

  click_more() {
    let button_arr = []
    // 草稿状态
    if (this.item.state == '3') {
      button_arr = [{
        text: '创建offer',
        handler: () => {
          this.navCtrl.push('ApplicantCreateOfferPage', {
            applicant_id: this.item.applicant_id,
            default_department_id: this.item.department_id,
            default_department_name: this.item.department,
            default_job_id: this.item.job_id,
            default_job_name: this.item.job,
            user_id: this.user_id,
          })
        }
      }, {
        text: '淘汰归档',
        handler: () => {
          this.set_un_active()
        }
      }]
    }
    else if (this.item.state == '9') {
      button_arr = [{
        text: '办理入职',
        handler: () => {
          this.navCtrl.push('AddEmployeePage', {
            'is_applicant_enter': true,
            'applicant_mobile_phone': this.item.partner_phone,
            'applicant_name': this.item.applicant_name,
            'applicant_gender': this.item.gender,
            'applicant_department_id': this.item.department_id,
            'applicant_department_name': this.item.department,
            'applicant_job_id': this.item.job_id,
            'applicant_identification_id': this.item.identification_id,
          })
        }
      },
      {
        text: '淘汰归档',
        handler: () => {
          this.set_un_active()
        }
      }]
    }
    else {
      button_arr = [{
        text: '淘汰归档',
        handler: () => {
          this.set_un_active()
        }
      }]
    }
    if (this.item.state > '3') {
      button_arr.push({
        text: '查看offer',
        handler: () => {
          this.watch_offer()
        }
      })
    }
    button_arr.push({
      text: '取消',
      role: 'cancel',
      handler: () => {

      }
    })

    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择操作',
      buttons: button_arr,
    });
    actionSheet.present();
  }


  set_un_active() {
    this.navCtrl.push('ApplicantUnActivePage', {
      applicant_id: this.item.applicant_id,
      user_id: this.user_id,
    })
  }

  click_phone() {
    //  alert(this.items.phone);
    if (this.item.partner_phone != 'false' && this.item.partner_phone != '') {
      let confirm = this.alertCtrl.create({
        title: this.item.partner_phone,
        buttons: [
          {
            text: '取消',
            handler: () => {
            }
          },
          {
            text: '确定',
            handler: () => {
              this.call(this.item.partner_phone);
            }
          }]
      }).present();
    }
    else {
      Utils.toastButtom("未填写手机号", this.toast)
    }

  }

  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  watch_offer(){
    this.navCtrl.push('ApplicantOfferApprovalDetailPage', {
      item: this.item,
      user_id: this.user_id,
      is_applicant_enter: true,
    })
  }

  send_msg(){
    let body = {
      'text': this.msg_text,
      'applicant_id': this.item.applicant_id,
      'user_id': this.user_id,
    }
    this.applicantService.send_msg(body).then(res => {
      if (res.result.res_code == 1){
        this.applicantService.get_applicant_detail({ 'applicant_id': this.item.applicant_id }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          Utils.toastButtom('操作成功', this.toast)
          this.msg_text = ''
          this.item = res.result.res_data
        }
      })
      }
    })
  }
}
