import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SalaryService } from './salaryService'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
  providers: [SalaryService],
})
export class SalaryPage {
  uid
  salary_approval_num = 0
  salary_adjust_approval_num = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public salaryService: SalaryService,
  public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryPage');
  }

  ionViewDidEnter(){
     this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id
      this.salaryService.get_approval_num({ 'uid': this.uid }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
           this.salary_approval_num = res.result.res_data.salary_approval_num
          this.salary_adjust_approval_num = res.result.res_data.salary_adjust_approval_num
        }
      })
     })
  }

  click_tax_deduct(){
    this.navCtrl.push('TaxDeductPage')
  }

  goBack(){
    this.navCtrl.pop()
  }

  click_contract(){
    this.navCtrl.push('SalaryContractPage')
  }

  click_adjust(){
    this.navCtrl.push('SalaryAdjustPage')
  }
}
