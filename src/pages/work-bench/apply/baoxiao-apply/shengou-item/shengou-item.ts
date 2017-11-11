import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the ShengouItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shengou-item',
  templateUrl: 'shengou-item.html',
})
export class ShengouItemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShengouItemPage');
  }

  goBack(){

  }

  save(){
      
  }
}
