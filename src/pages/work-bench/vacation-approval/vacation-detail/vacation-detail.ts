import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VacationService } from '../vacationService';
import { Utils } from './../../../../providers/Utils';
declare let cordova: any;
/**
 * Generated class for the VacationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vacation-detail',
  templateUrl: 'vacation-detail.html',
  providers: [VacationService]
})
export class VacationDetailPage {
  data_arr = []
  data;
  is_manager = false;
  user;
  delete_arr = []
  is_me
  uid
  is_create
  constructor(public navCtrl: NavController, public navParams: NavParams, public vacationService: VacationService, public storage: Storage,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.is_create = this.navParams.get('is_create')
    this.is_me = this.navParams.get('is_me')
    if (!this.is_create) {
      this.data = this.navParams.get('data_item')
      this.data_arr = this.data.detail_lines
    } else {
      let body = {
        'employee_avatar': '',
        'state': '草稿',
        'department_name': '',
        'employee_name': '',
      }
      this.data = body
    }
    this.storage.get('user').then(res => {
      this.user = res.result.res_data
      this.uid = res.result.res_data.user_id
      if (res.result.res_data.user_id == this.data.to_approve_user_id) {
        this.is_manager = true
      }
      if (this.is_create) {
        let body = {
          'employee_avatar': res.result.res_data.user_ava,
          'state': '草稿',
          'department_name': res.result.res_data.department,
          'employee_name': res.result.res_data.name
        }
        this.data = body
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VacationDetailPage');
    // cordova.plugins.Keyboard.close();
  }
  ionViewWillEnter() {
    let mode = this.navParams.get('mode')
    let data_detail = this.navParams.get('data_detail')
    if (mode == 'add') {
      this.data_arr.push(data_detail)
      this.navParams.data.mode = false
      this.navParams.data.data_detail = false
    }
    else if (mode == 'edit') {
      this.data_arr.splice(this.navParams.get('data_index'), 1, data_detail);
      this.navParams.data.mode = false
      this.navParams.data.data_detail = false
      this.navParams.data.data_index = false
    }
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
          // cordova.plugins.Keyboard.close();
        }
      },
      {
        text: '确定',
        handler: data => {
          // cordova.plugins.Keyboard.close();
          if (data.title) {
            this.vacationService.pass_vacation(this.user.user_id, this.data.vacation_id, data.title).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.navCtrl.pop()
              }
            })

          }
          else {
            this.vacationService.pass_vacation(this.user.user_id, this.data.vacation_id, false).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.navCtrl.pop()
              }
            })
          }

        }
      }]
    }).present()
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
          // cordova.plugins.Keyboard.close();
        }
      },
      {
        text: '确定',
        handler: data => {
          // cordova.plugins.Keyboard.close();
          if (data.title) {
            this.vacationService.refuse_vacation(this.user.user_id, this.data.vacation_id, data.title).then(res => {
              if (res.result && res.result.res_code == 1) {

                Utils.toastButtom("操作成功", this.toastCtrl)
                this.navCtrl.pop()
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

  goBack() {
    this.navCtrl.pop()
  }

  add_detail() {
    this.navCtrl.push('EditVacationDetailPage', {
      'uid': this.uid,
      'frontPage': 'VacationDetailPage',
      'mode': 'add',
    })
  }

  click_edit(item, i) {
    if (this.data.state == '草稿' || this.data.state == '被拒') {
      this.navCtrl.push('EditVacationDetailPage', {
        'uid': this.uid,
        'frontPage': 'VacationDetailPage',
        'mode': 'edit',
        'data': item,
        'index': i,
      })
    }
  }

  click_save() {
    if (!this.is_create) {
      this.vacationService.save_vacation({ 'data_arr': this.data_arr, 'vacation_id': this.data.vacation_id, 'uid': this.uid }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          Utils.toastButtom("保存成功", this.toastCtrl)
          this.data = res.result.res_data
          this.data_arr = this.data.detail_lines
        }
      })
    }
    else {
      this.vacationService.create_save_vacation({ 'uid': this.uid, 'data_arr': this.data_arr,'need_submit':false }).then(res => {
        if (res.result.res_code == 1) {
          Utils.toastButtom("保存成功", this.toastCtrl)
          this.is_create = false
          this.data = res.result.res_data
        }
      })
    }
  }

  click_submit() {
    if (!this.is_create) {
      this.vacationService.submit_vacation({ 'vacation_id': this.data.vacation_id, 'uid': this.uid }).then(res => {
        if (res.result.res_code == 1) {
          Utils.toastButtom("提交成功", this.toastCtrl)
          this.navCtrl.pop()
        }
      })
    }
    else {
      this.vacationService.create_save_vacation({ 'uid': this.uid, 'data_arr': this.data_arr,'need_submit':true}).then(res => {
        if (res.result.res_code == 1) {
          Utils.toastButtom("提交成功", this.toastCtrl)
          this.navCtrl.pop()
        }
      })
    }
  }

  click_back() {
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定撤回？",
      inputs: [
        {
          name: 'title',
          placeholder: '撤回原因(必填)'
        },
      ],
      buttons: [{
        text: '取消',
        handler: data => {
          // cordova.plugins.Keyboard.close();
        }
      },
      {
        text: '确定',
        handler: data => {
          if (data.title) {
            this.vacationService.back_vacation({ 'vacation_id': this.data.vacation_id, 'uid': this.uid, 'back_text': data.title }).then(res => {
              if (res.result.res_code == 1) {
                Utils.toastButtom("撤回成功", this.toastCtrl)
                this.data = res.result.res_data
                this.data_arr = this.data.detail_lines
              }
            })

          }
          else {
            Utils.toastButtom("请填写撤回原因", this.toastCtrl)
          }

        }
      }]
    }).present()
  }

  refresh(vacation_id) {
    this.vacationService.get_vacation_detail({ 'vacation_id': vacation_id, 'uid': this.uid }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.data = res.result.res_data
        this.data_arr = this.data.detail_lines
      }
    })
  }

  deleteItem(item,i){
    this.data_arr.splice(i,1)
  }

}
