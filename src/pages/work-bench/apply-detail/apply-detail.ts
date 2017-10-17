import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ApplyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-detail',
  templateUrl: 'apply-detail.html',
})
export class ApplyDetailPage {
  res_data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.res_data = navParams.get('res_data');
    console.log(this.res_data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyDetailPage');
  }

}
