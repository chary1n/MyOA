import { BLE } from '@ionic-native/ble';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the KaoqinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kaoqin',
  templateUrl: 'kaoqin.html',
})
export class KaoqinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public ble: BLE) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KaoqinPage');
  }

  openBle(){
    this.ble.enable().then(res=>{
      console.log(res)
    });

 
  }

  scan(){
    this.ble.scan([], 5).subscribe(device => {
      console.log(JSON.stringify(device));
      });
  }

}
