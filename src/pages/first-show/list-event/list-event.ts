import { Utils } from './../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ListEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-event',
  templateUrl: 'list-event.html',
})
export class ListEventPage {
  pet = ''
  title = ''
  item:any
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar) {
    this.item = this.navParams.get('item')
    this.pet = this.navParams.get('pet')
    this.title = this.navParams.get('title')
    this.frontPage = Utils.getViewController("CalendarDeatilpagePage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEventPage');
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }
//选择类型
  selectType(bean){
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.pet = 4;
    this.frontPage.data.type_name = bean.display_name;
    this.frontPage.data.type_id = bean.id;
    this.navCtrl.popTo(this.frontPage);
  }

  //选择重复
  selectRecurrency(bean){
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.recurrency = bean.name;
    this.frontPage.data.recurrency_id = bean.id;
    this.navCtrl.popTo(this.frontPage);
  }
}
