import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';
/**
 * Generated class for the JiaohuoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-jiaohuo-detail',
  templateUrl: 'jiaohuo-detail.html',
})
export class JiaohuoDetailPage {
  item;
  wuliuLength;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item")
    this.wuliuLength = this.item.moving.length
    if(!this.wuliuLength){
      this.wuliuLength = 0 
    }
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JiaohuoDetailPage');
  }


  changeState(state) {
    if (state == "draft") {
      return '草稿'
    } else if (state == "partially_available") {
      return '部分可用'
    } else if (state == "confirmed") {
      return '等待可用'
    } else if (state == "assigned") {
      return '可用'
    } else if (state == "done") {
      return '完成'
    } else {
      return state
    }
  }

  toWuliuDetail(){
    if(this.wuliuLength){
      this.navCtrl.push('WuliuDetailPage', { 'item': this.item })
    }
  }

}
