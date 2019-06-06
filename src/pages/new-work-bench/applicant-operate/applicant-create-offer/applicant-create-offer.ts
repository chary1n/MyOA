import { NavController, NavParams, IonicPage, ActionSheetController, Content, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApplicantService } from './../applicantService'
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the ApplicantCreateOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-applicant-create-offer',
  templateUrl: 'applicant-create-offer.html',
  providers: [ApplicantService],
})
export class ApplicantCreateOfferPage {
  applicant_id
  user_id
  syq_list = [{ name: '1个月', id: 'one_month' }, { name: '2个月', id: 'two_month' }, { name: '3个月', id: 'three_month' }, { name: '6个月', id: 'six_month' }]
  syq_date
  entry_date
  departmentList = []
  jobList = []
  department_id
  job_id
  jobChooseList = []
  deparment_name
  salary_remarks
  remarks
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public applicantService: ApplicantService,
  public toastCtrl: ToastController) {
    this.user_id = this.navParams.get('user_id')
    this.frontPage = Utils.getViewController('ApplicantDetailPage', this.navCtrl)
    this.applicant_id = this.navParams.get('applicant_id')
    if (this.navParams.get('default_job_id')){
      this.job_id = this.navParams.get('default_job_id')
    }
    if (this.navParams.get('default_department_id')){
      this.department_id = this.navParams.get('default_department_id')
      this.deparment_name = this.navParams.get('default_department_name')
    }
    this.applicantService.getDepartmentNoLoading().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.departmentList = res.result.res_data.all_departments.res_data
      }
    })
    this.entry_date = Utils.dateFormat(new Date(), 'yyyy-MM-dd')

    this.applicantService.get_all_job({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.jobList = res.result.res_data
        this.department_value_change()
      }
    })
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_update_department') == true) {
      this.deparment_name = this.navParams.get('department_name')
      this.department_id = this.navParams.get('department_id')
      this.click_job()
      this.navParams.data.need_update_department = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantCreateOfferPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  department_value_change() {
    let final_arr = []
    if (this.department_id) {
      for (let i = 0; i < this.jobList.length; i++) {
        if (this.jobList[i].department_id == this.department_id) {
          final_arr.push(this.jobList[i])
        }
      }
    }
    else {
      final_arr = this.jobList
    }
    this.jobChooseList = final_arr
  }

  click_job() {
    let final_arr = []
    if (this.department_id) {
      for (let i = 0; i < this.jobList.length; i++) {
        if (this.jobList[i].department_id == this.department_id) {
          final_arr.push(this.jobList[i])
        }
      }
    }
    else {
      final_arr = this.jobList
    }
    this.jobChooseList = final_arr
  }

  choose_departments() {
    this.navCtrl.push('SelectDepartmentPage', {
      page: 'ApplicantCreateOfferPage',
    })
  }

  click_submit_offer(){
    let mString = ''
    if (!this.deparment_name || !this.department_id) {
      mString = mString + "   请选择部门"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    if (!this.job_id) {
      mString = mString + "   请选择岗位"
      Utils.toastButtom(mString, this.toastCtrl)
      return;
    }
    let body = {
      'department_id': this.department_id,
      'entry_date': this.entry_date,
      'job_id': this.job_id,
      'sy_date': this.syq_date,
      'salary_remark': this.salary_remarks,
      'remarks': this.remarks,
      'applicant_id': this.applicant_id,
      'user_id': this.user_id,
    }
    this.applicantService.create_offer(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('操作成功', this.toastCtrl)
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }

}
