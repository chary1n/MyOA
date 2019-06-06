import { NavController, NavParams, IonicPage, ActionSheetController, Content, ToastController, AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { ApplicantService } from './../applicantService'
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the ApplicantOfferApprovalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-applicant-offer-approval-detail',
  templateUrl: 'applicant-offer-approval-detail.html',
  providers: [ApplicantService],
})
export class ApplicantOfferApprovalDetailPage {
  user_id
  item
  is_applicant_enter = false
  can_show_back = false
  is_approve_enter = false
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public applicantService: ApplicantService,
    public alertCtrl: AlertController, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
    this.user_id = this.navParams.get('user_id')
    this.item = this.navParams.get('item')
    this.is_applicant_enter = this.navParams.get('is_applicant_enter')
    this.is_approve_enter = this.navParams.get('is_approve_enter')
    this.frontPage = Utils.getViewController('AA', this.navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantOfferApprovalDetailPage');
  }

  ionViewDidEnter() {
    let body = {
      'applicant_id': this.item.applicant_id,
      'user_id': this.user_id
    }
    this.applicantService.get_applicant_offer_detail(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
        if (this.item.create_uid == this.user_id){
          this.can_show_back = true
        }
      }
    })
  }

  ionViewWillLeave(){
    this.is_applicant_enter = false
    this.is_approve_enter = false
  }

  changeSyq(date) {
    let str = ''
    if (date == 'one_month') {
      str = '一个月'
    }
    else if (date == 'two_month') {
      str = '两个月'
    }
    else if (date == 'three_month') {
      str = '三个月'
    }
    else if (date == 'six_month') {
      str = '六个月'
    }
    return str
  }

  goBack() {
    this.navCtrl.pop()
  }

  conform() {
    // let body = this.calDetail();
    let ctrl = this.alertCtrl;

    ctrl.create({
      title: '提示',
      message: "填写审批备注",
      inputs: [
        {
          name: 'title',
          placeholder: '审批备注(选填)'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '通过',
          handler: data => {
            if (data.title) {
              let body = {
                'offer_id': this.item.offer_id,
                'user_id': this.user_id,
                'text': data.title,
              }
              this.applicantService.confirm_offer(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.navCtrl.pop()
                    // console.log(res.result.res_code)
                    // ctrl.create({
                    //   title: '提示',
                    //   subTitle: "审批成功",
                    //   buttons: [{
                    //     text: '确定',
                    //     handler: () => {
                    //       // this.frontPage.data.need_fresh = true;
                    //       // this.navCtrl.popTo(this.frontPage);
                          
                    //     }
                    //   }
                    //   ]
                    // }).present();
                  }
                }
              })
            }
            else {
              let body = {
                'offer_id': this.item.offer_id,
                'user_id': this.user_id,
                'text': '',
              }
              this.applicantService.confirm_offer(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.navCtrl.pop()
                    // ctrl.create({
                    //   title: '提示',
                    //   subTitle: "审批成功",
                    //   buttons: [{
                    //     text: '确定',
                    //     handler: () => {
                    //       // this.frontPage.data.need_fresh = true;
                    //       this.navCtrl.pop()
                    //     }
                    //   }
                    //   ]
                    // }).present();
                  }
                }
              })
            }
          }
        }]
    }).present();
  }

  cancel() {
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "输入拒绝的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title) {
              let body = {
                'offer_id': this.item.offer_id,
                'user_id': this.user_id,
                'text': data.title,
              }
              this.applicantService.refuse_offer(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.navCtrl.pop()
                    // console.log(res.result.res_code)
                    // ctrl.create({
                    //   title: '提示',
                    //   subTitle: "审批成功",
                    //   buttons: [{
                    //     text: '确定',
                    //     handler: () => {
                    //       // this.frontPage.data.need_fresh = true;
                    //       this.navCtrl.pop()
                    //     }
                    //   }
                    //   ]
                    // }).present();
                  }
                }
              })
            }
            else {
              Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
            }
          }
        }
      ]
    }).present();
  }

  changeDate(date) {
    if (date != ''){
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
    
  }

  click_back_offer(){
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "输入撤回的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '撤回原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title) {
              let body = {
                'offer_id': this.item.offer_id,
                'user_id': this.user_id,
                'text': data.title,
              }
              this.applicantService.reback_offer(body).then((res) => {
                if (res) {
                  if (res.result.res_code == 1) {
                    this.frontPage.data.need_fresh = true
                    this.navCtrl.popTo(this.frontPage);
                  }
                }
              })
            }
            else {
              Utils.toastButtom("请填写撤回原因", this.toastCtrl)
            }
          }
        }
      ]
    }).present();
  }

  click_more(){
    let button_arr = [{
      text: '查看人才库',
      handler: () => {
        this.watch_applicant()
      }
    },{
      text: '取消',
      role: 'cancel',
      handler: () => {

      }
    }]

    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择操作',
      buttons: button_arr,
    });
    actionSheet.present();
  }

  watch_applicant(){
    this.navCtrl.push('ApplicantDetailPage', {
      item: this.item,
      user_id: this.user_id,
    })
  }

}
