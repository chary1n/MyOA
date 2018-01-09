import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { GongDanService } from '../gongdanService';

/**
 * Generated class for the MyGongdanListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-gongdan-list',
  templateUrl: 'my-gongdan-list.html',
  providers:[GongDanService]
})
export class MyGongdanListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public gongdanService :GongDanService) {
      this.gongdanService.work_order_statistics().then(res=>{
        console.log(res)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGongdanListPage');
  }

}
