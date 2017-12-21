import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';


/**
 * Generated class for the WuliuDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wuliu-detail',
  templateUrl: 'wuliu-detail.html',
})
export class WuliuDetailPage {
  item ;
  details ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item")
    this.details = this.item.moving
    console.log(this.details)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WuliuDetailPage');
  }

}
