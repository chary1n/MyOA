import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from '../../../../providers/Utils';

/**
 * Generated class for the VisitDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-visit-detail',
  templateUrl: 'visit-detail.html',
})
export class VisitDetailPage {
  item:any;
  imgList: any;
  user_img
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public statusBar:StatusBar) {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();

    this.item = this.navParams.get('item');
    this.imgList = this.item.visit_image;
    this.user_img = this.item.user_image
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitDetailPage');
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  clickPicture(item){
    this.navCtrl.push("NewDeletePage" ,{item:item})
  }

  //更改时间
  getTime(startT, endT){
    return startT + " ~ " + endT.split(" ")[1]
  }
}
