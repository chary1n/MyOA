import { NavController, NavParams, IonicPage, ActionSheetController, Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApplicantAutoService } from './applicantAutoService'
import { ApplicantService } from './applicantService'
declare let cordova: any;
/**
 * Generated class for the ApplicantOperatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-applicant-operate',
  templateUrl: 'applicant-operate.html',
  providers: [ApplicantAutoService, ApplicantService],
})
export class ApplicantOperatePage {
  type = 'total'
  user_id
  total_list = []
  other_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public applicantAutoService: ApplicantAutoService,
    public storage: Storage, public applicantService: ApplicantService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantOperatePage');
  }

  ionViewDidEnter(){
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.reload_data()
      })
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_total() {
    this.type = 'total'
    this.reload_data()
  }

  click_interview() {
    this.type = 'interview'
    this.reload_data()
  }

  click_offer() {
    this.type = 'offer'
    this.reload_data()
  }

  click_entry() {
    this.type = 'entry'
    this.reload_data()
  }

  itemSelected(event) {
    let data = ''
    let search_text = ''
    if (event.id == 1) {
      data = 'partner_name'
      search_text = event.name.replace("搜 姓名：", "")
    }
    else if (event.id == 2) {
      data = 'job_id'
      search_text = event.name.replace("搜 岗位：", "")
    }
    else if (event.id == 3) {
      data = 'department_id'
      search_text = event.name.replace("搜 部门：", "")
    }
    let body = {
      'data': data,
      'search_text': search_text,
      'type': this.type,
      'user_id': this.user_id,
    }
    this.total_list = []
    this.other_list = []
    this.applicantService.search_applicant(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        if (this.type == 'total'){
          this.total_list = res.result.res_data
        }
        else{
          this.other_list = res.result.res_data
        }
      }
    })
  }

  itemClearSelected(event) {
    this.reload_data()
  }

  reload_data() {
    this.total_list = []
    this.other_list = []
    this.applicantService.get_total_applicant({ 'user_id': this.user_id,'type': this.type}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        if (this.type == 'total'){
          this.total_list = res.result.res_data
        }
        else{
          this.other_list = res.result.res_data
        }
      }
    })
  }

  changeState(state){
    let str = ''
    if (state == '0'){
      str = '草稿'
    }
    else if (state == '3'){
      str = '面试'
    }
    else if (state == '6'){
      str = '审核offer'
    }
    else if (state == '8'){
      str = '审核offer不通过'
    }
    else if (state == '9'){
      str = '待入职'
    }
    else if (state == 'a'){
      str = '完成'
    }
    else if (state == 'b'){
      str = '淘汰归档'
    }
    return str
  }

  applicant_detail(item){
    this.navCtrl.push('ApplicantDetailPage', {
      item: item,
      user_id: this.user_id,
    })
  }

}
