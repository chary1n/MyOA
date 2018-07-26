import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the FirstShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-first-show',
  templateUrl: 'first-show.html',
})
export class FirstShowPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstShowPage');
  }

}
