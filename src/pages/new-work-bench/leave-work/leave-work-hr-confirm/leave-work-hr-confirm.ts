import { NavController, NavParams, IonicPage, ActionSheetController, Content, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { LeaveService } from './../leaveService'
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the LeaveWorkHrConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-work-hr-confirm',
  templateUrl: 'leave-work-hr-confirm.html',
  providers: [LeaveService],
})
export class LeaveWorkHrConfirmPage {
  frontPage
  user_id
  dimiss_date
  is_user_system_salary
  fund_end_date
  dimission_id
  fix_thing_arr = [
      { val: '主机', isChecked: false },
      { val: '显示器', isChecked: false },
      { val: '鼠键一套', isChecked: false },
      { val: '手机及手机卡', isChecked: false },
      { val: '其他', isChecked: false }
    ]
  oa_thing_arr = [
      { val: 'OA', isChecked: false },
      { val: 'QQ群及微信群', isChecked: false },
      { val: '公司邮箱', isChecked: false },
      { val: '门禁指纹', isChecked: false },
    ]
  constructor(public navCtrl: NavController, public navParams: NavParams, public leaveService: LeaveService,
  public toastCtrl: ToastController) {
    this.frontPage = Utils.getLastSecondViewController('LeaveWorkPage', this.navCtrl)
    this.dimission_id = this.navParams.get('dimission_id')
    this.dimiss_date = Utils.dateFormat(new Date(), 'yyyy-MM-dd')
    this.user_id = this.navParams.get('user_id')
    this.is_user_system_salary = this.navParams.get('is_user_system_salary')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveWorkHrConfirmPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  click_confirm_dimission(){
    let fix_arr = []
    let oa_arr = []
    for (let i = 0; i < this.fix_thing_arr.length; i ++){
      if (this.fix_thing_arr[i].isChecked){
        fix_arr.push(this.fix_thing_arr[i].val)
      }
    }
    for (let i = 0; i < this.oa_thing_arr.length; i ++){
      if (this.oa_thing_arr[i].isChecked){
        oa_arr.push(this.oa_thing_arr[i].val)
      }
    }
    let body = {
      'user_id': this.user_id,
      'dimission_id': this.dimission_id,
      'dimission_date': this.dimiss_date,
      'fix_arr': fix_arr,
      'other_arr': oa_arr,
      'fund_end_date': this.fund_end_date,
    }
    this.leaveService.hr_confirm_dimission(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('操作成功', this.toastCtrl)
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage)
      }
    })
  }

}
