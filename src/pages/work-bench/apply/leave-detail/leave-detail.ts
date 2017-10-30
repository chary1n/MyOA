import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the LeaveDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-detail',
  templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {
  res_data: any;
  remark;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.res_data = navParams.get('res_data');
    console.log(this.res_data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveDetailPage');
  }

  callbackApply(){

  }

}
