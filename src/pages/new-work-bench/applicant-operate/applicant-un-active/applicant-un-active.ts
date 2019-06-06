import { NavController, NavParams, IonicPage, ActionSheetController, Content, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApplicantService } from './../applicantService'
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the ApplicantUnActivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-applicant-un-active',
  templateUrl: 'applicant-un-active.html',
  providers: [ApplicantService],
})
export class ApplicantUnActivePage {
  @ViewChild('mytextarea') mytextarea
  beizhuText
  user_id
  applicant_id
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public applicantService: ApplicantService,
  public toastCtrl: ToastController) {
    this.user_id = this.navParams.get('user_id')
    this.applicant_id = this.navParams.get('applicant_id')
    this.frontPage = Utils.getViewController('ApplicantDetailPage', this.navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantUnActivePage');
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.mytextarea.setFocus();//输入框获取焦点
    })
  }

  goBack(){
    this.navCtrl.pop()
  }

  submit(){
    if (this.beizhuText.length > 0){
      let body = {
      'applicant_id': this.applicant_id,
      'user_id': this.user_id,
      'text': this.beizhuText,
    }
    this.applicantService.un_active_applicant(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('操作成功', this.toastCtrl)
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }
  else{
    Utils.toastButtom('请填写归档原因', this.toastCtrl)
  }
    
  }

}
