import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the ReimbursementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reimbursement',
  templateUrl: 'reimbursement.html',
})
export class ReimbursementPage {
  pet: string = "1";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementPage');
  }

  clickMyApply() {

  }

  clickAlreadyApply() {

  }
  clickWaitMeApply() {

  }

  // 我要申请
  apply() {
    this.navCtrl.push('MyApplyPage')
  }


}
