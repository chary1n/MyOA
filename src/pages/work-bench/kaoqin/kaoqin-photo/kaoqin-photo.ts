import { BLE } from '@ionic-native/ble';
import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './../kaoqinService';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Platform,AlertController ,ToastController,LoadingController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the KaoqinPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kaoqin-photo',
  templateUrl: 'kaoqin-photo.html',
  providers:[Geolocation,KaoQinService],
})
export class KaoqinPhotoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation:Geolocation,
  public kaoQinService:KaoQinService) {
    // this.geolocation.getCurrentPosition().then((resp) => {
        // console.log(resp.coords.latitude)
        // console.log(resp.coords.longitude)
        // this.kaoQinService.trans_location("31.30721890169565","120.6689012405321").then(res => {
          // console.log(res)
          this.kaoQinService.get_location_now("120.6689012405321","31.30721890169565").then(res_location =>{
            console.log(res_location.pois[0].addr)
          })
        // })
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KaoqinPhotoPage');
  }

}
