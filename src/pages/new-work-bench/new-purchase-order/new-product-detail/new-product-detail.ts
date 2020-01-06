import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

/**
 * Generated class for the NewProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-product-detail',
  templateUrl: 'new-product-detail.html',
})
export class NewProductDetailPage {

  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("data")
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  fmoney(s, n)   
  {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1].substr(0,2);   
   let t = ""; 
   let i;  
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   
   return t.split("").reverse().join("") + "." + r;   
  } 

  transInt(item){
    return parseFloat(item).toFixed(2)
  }

}