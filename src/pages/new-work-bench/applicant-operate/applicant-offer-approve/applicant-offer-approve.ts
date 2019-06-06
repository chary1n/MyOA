import { NavController, NavParams, IonicPage, ActionSheetController, Content, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApplicantService } from './../applicantService'
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the ApplicantOfferApprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-applicant-offer-approve',
  templateUrl: 'applicant-offer-approve.html',
  providers: [ApplicantService],
})
export class ApplicantOfferApprovePage {
  total_list
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public applicantService: ApplicantService,
  public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicantOfferApprovePage');
  }

  ionViewDidEnter(){
    this.total_list = []
    this.storage.get('user')
          .then(res => {
            console.log(res);
            this.user_id = res.result.res_data.user_id
            this.applicantService.get_approval_offer_applicant({'user_id': this.user_id}).then(res => {
              if (res.result.res_data && res.result.res_code == 1){
                this.total_list = res.result.res_data
              }
            })
          })
  }

  goBack(){
    this.navCtrl.pop()
  }

  applicant_offer_detail(item){
    this.navCtrl.push('ApplicantOfferApprovalDetailPage', {
      item: item,
      user_id: this.user_id,
      is_approve_enter: true,
    })
  }

}
