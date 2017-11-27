import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShareknowlelistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shareknowlelist',
  templateUrl: 'shareknowlelist.html',
})
export class ShareknowlelistPage {
  blogList: any;
  tag_name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.blogList = this.navParams.get('item')
      this.tag_name = this.navParams.get('tag_name')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareknowlelistPage');
  }

  getblogDetail(item){
    this.navCtrl.push('ShareknowledgedetailPage', {
      item: item,
    })
  }
}
