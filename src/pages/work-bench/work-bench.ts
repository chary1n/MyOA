import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardinfoPage } from './../cardinfo/cardinfo';
/**
 * Generated class for the WorkBenchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-work-bench',
  templateUrl: 'work-bench.html',
})
export class WorkBenchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkBenchPage');
  }

  card_info_clicked(){
    this.navCtrl.push(CardinfoPage)
  }

}
