import { NavController, NavParams, IonicPage, ActionSheetController, Content, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LeaveService } from './../leaveService'
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the LeaveWorkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-work-detail',
  templateUrl: 'leave-work-detail.html',
  providers: [LeaveService],
})
export class LeaveWorkDetailPage {
  leave_id
  data
  user_id
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public leaveService: LeaveService,
    public sanitizer: DomSanitizer, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController('LeaveWorkPage', this.navCtrl)
    this.data = {}
    this.leave_id = this.navParams.get('leave_id')
    this.user_id = this.navParams.get('user_id')
    this.reload_view()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveWorkDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  reload_view() {
    this.leaveService.get_dismission_detail({ 'leave_id': this.leave_id }).then(res => {
      if (res.result.res_data && res.result.res_code) {
        this.data = res.result.res_data
      }
    })
  }

  assembleHTML(str) {
    if (str) {
      var str_after = str.replace(/\n/g, "<br>")
      return this.sanitizer.bypassSecurityTrustHtml(str_after)
    }
    else {
      return ''
    }
  }

  click_refuse() {
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定拒绝？",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因(必填)'
        },
      ],
      buttons: [{
        text: '取消',
        handler: data => {
        }
      },
      {
        text: '确定',
        handler: data => {
          if (data.title) {
            let body = {
              'user_id': this.user_id,
              'dimission_id': this.data.dimission_id,
              'title': data.title,
            }
            this.leaveService.refuse_dimission(body).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.frontPage.data.need_fresh = true
                this.navCtrl.popTo(this.frontPage)
              }
            })

          }
          else {
            Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
          }

        }
      }]
    }).present()
  }

  click_confirm() {
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定同意？",
      inputs: [
        {
          name: 'title',
          placeholder: '审核意见'
        },
      ],
      buttons: [{
        text: '取消',
        handler: data => {
        }
      },
      {
        text: '确定',
        handler: data => {
          if (data.title) {
            let body = {
              'user_id': this.user_id,
              'dimission_id': this.data.dimission_id,
              'title': data.title,
            }
            this.leaveService.confirm_dimission(body).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.frontPage.data.need_fresh = true
                this.navCtrl.popTo(this.frontPage)
              }
            })

          }
          else {
            let body = {
              'user_id': this.user_id,
              'dimission_id': this.data.dimission_id,
            }
            this.leaveService.confirm_dimission(body).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.frontPage.data.need_fresh = true
                this.navCtrl.popTo(this.frontPage)
              }
            })
          }

        }
      }]
    }).present()
  }

  changeState(state) {
    if (state == 0) {
      return '草稿'
    }
    else if (state == 1) {
      return '审核中'
    }
    else if (state == 2) {
      return '人事确认'
    }
    else if (state == 3) {
      return '完成'
    }
    else if (state == 4) {
      return '被拒'
    }
    else {
      return ''
    }
  }

  click_hr_confirm() {
    // let is_system_salary = false
    // this.leaveService.get_user_is_system_salary({ 'user_id': this.user_id }).then(res => {
    //   if (res.result.res_data && res.result.res_code == 1) {
    //     is_system_salary = res.result.res_data
    //   }
    //   this.navCtrl.push('LeaveWorkHrConfirmPage', {
    //     user_id: this.user_id,
    //     dimission_id: this.data.dimission_id,
    //     // is_user_system_salary: is_system_salary,
    //   })
    // })

    this.navCtrl.push('LeaveWorkHrConfirmPage', {
        user_id: this.user_id,
        dimission_id: this.data.dimission_id,
        // is_user_system_salary: is_system_salary,
      })

  }

}
