import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SalaryService } from '../salaryService'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SalaryContractPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salary-contract',
  templateUrl: 'salary-contract.html',
  providers: [SalaryService],
})
export class SalaryContractPage {
  user_id
  wait_approval_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public salaryService: SalaryService,
    public storage: Storage) {
  }

  ionViewDidEnter() {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        let body = {
          'uid': this.user_id,
        }
        this.salaryService.get_wait_approved_salary(body).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryContractPage');
  }

  approved_detail(item) {
    let body = {
      'salary_id': item.salary_id,
    }
    this.salaryService.get_salary_detail(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('SalaryContractDetailPage', {
          item: res.result.res_data,
          user_id: this.user_id,
        })
      }
    })
  }

  goBack() {
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
