import { NavController, NavParams, IonicPage, ActionSheetController, Content, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AdjustService } from './../adjustService'
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the AdjustDepartmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adjust-department-detail',
  templateUrl: 'adjust-department-detail.html',
  providers: [AdjustService],
})
export class AdjustDepartmentDetailPage {
  user_id
  data
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public adjustService: AdjustService,
  public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.data = this.navParams.get('data')
    this.user_id = this.navParams.get('user_id')
    this.adjustService.get_adjust_department_detail({ 'adjust_id': this.data.adjust_id }).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.data = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdjustDepartmentDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  cancel() {
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
              'adjust_id': this.data.adjust_id,
              'title': data.title,
              'type': 'reject',
            }
            this.adjustService.deal_adjust_department(body).then(res => {
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

  conform(){
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
              'adjust_id': this.data.adjust_id,
              'title': data.title,
              'type': 'confirm',
            }
            this.adjustService.deal_adjust_department(body).then(res => {
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
              'adjust_id': this.data.adjust_id,
              'type': 'confirm',
            }
            this.adjustService.deal_adjust_department(body).then(res => {
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

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

}
