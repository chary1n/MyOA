import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MsgDetailPage } from './msg-detail/msg-detail';
/**
 * Generated class for the MsgPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-msg',
  templateUrl: 'msg.html',
})
export class MsgPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsgPage');
  }

  click_detail(){
    this.navCtrl.push('MsgDetailPage', {
      
    });
  }
}
