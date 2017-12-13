import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService} from './../baobiaoService'
declare let cordova: any;

/**
 * Generated class for the BaobiaoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-baobiao-detail',
  templateUrl: 'baobiao-detail.html',
  providers:[BaoBiaoService],
})
export class BaobiaoDetailPage {
  now;
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams,public baoBiaoService:BaoBiaoService) {
      this.now = new Date();
      this.item = navParams.get('item')
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaobiaoDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  transInt(item){
    return parseFloat(item).toFixed(2)
  }
}
