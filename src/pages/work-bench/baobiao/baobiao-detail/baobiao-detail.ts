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

  fmoney(s, n)   
  {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   let t = ""; 
   let i;  
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
  } 
}
