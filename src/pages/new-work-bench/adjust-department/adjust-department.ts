import { NavController, NavParams, IonicPage, ActionSheetController, Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AdjustService } from './adjustService'
// import { ApplicantAutoService } from './applicantAutoService'

/**
 * Generated class for the AdjustDepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-adjust-department',
  templateUrl: 'adjust-department.html',
  providers: [AdjustService],
})
export class AdjustDepartmentPage {
  user_id
  wait_approval_list = []
  need_all = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public adjustService: AdjustService,
    public storage: Storage) {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        for (let product of res.result.res_data.groups) {
          if (product.name == 'group_hr_manager' || product.name == 'employee_manage_manager') {
            this.need_all = true
          }
        }
        this.reload_data()
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdjustDepartmentPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.reload_data()
    }
  }

  reload_data() {
    this.wait_approval_list = []
    this.adjustService.get_total_adjust_department({ 'user_id': this.user_id, 'need_all': this.need_all }).then(result => {
      if (result.result.res_data && result.result.res_code == 1) {
        this.wait_approval_list = result.result.res_data
      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  approved_detail(item) {
    this.navCtrl.push('AdjustDepartmentDetailPage', {
      user_id: this.user_id,
      data: item,
    })
  }

}
