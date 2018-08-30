import { Utils } from './../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the LateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-late-list',
  templateUrl: 'late-list.html',
})
export class LateListPage {
  item;
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar:StatusBar,) {
      this.item = this.navParams.get('item');
      this.frontPage = Utils.getViewController("FirstShowPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LateListPage');
  }

  goBack(){
    this.frontPage.data.need_fresh = true;
    this.navCtrl.pop()
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  toDetail(sub){
    this.navCtrl.push('CalendarDeatilpagePage',{
      'isEdit': false,
      'item': sub
    })
  }
}
