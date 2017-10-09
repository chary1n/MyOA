import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the MyApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-apply',
  templateUrl: 'my-apply.html',
})
export class MyApplyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyApplyPage');
  }

  goBack(){
    this.navCtrl.pop()
  }
  save(){
    this.navCtrl.pop()
  }

}
