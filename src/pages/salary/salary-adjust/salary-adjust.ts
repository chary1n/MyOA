import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SalaryService } from '../salaryService'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SalaryAdjustPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salary-adjust',
  templateUrl: 'salary-adjust.html',
  providers: [SalaryService],
})
export class SalaryAdjustPage {
  user_id
  wait_approval_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public salaryService: SalaryService,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryAdjustPage');
  }

  ionViewDidEnter() {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        let body = {
          'uid': this.user_id,
        }
        this.salaryService.get_wait_approved_adjust_salary(body).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data
          }
        })
      })
  }

  approved_detail(item) {
    let body = {
      'salary_adjust_id': item.salary_adjust_id,
    }
    this.salaryService.get_adjust_salary_detail(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('SalaryAdjustDetailPage', {
          item: res.result.res_data,
          user_id: this.user_id,
        })
      }
    })
  }

  goBack(){
    this.navCtrl.pop()
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
    else {
      return ''
    }
  }

  changeState(state) {
    if (state == 'confirm') {
      return "员工确认";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'account') {
      return "财务确认";
    }
    else {
      return state;
    }
  }

}
