import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the PopmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-popmodal',
  templateUrl: 'popmodal.html',
})
export class PopmodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopmodalPage');
  }

}
