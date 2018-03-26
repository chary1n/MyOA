import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './../kaoqinService';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Platform,AlertController ,ToastController,LoadingController,ActionSheetController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from './../../../../providers/NativeService';
import { Utils } from '../../../../providers/Utils';

/**
 * Generated class for the ChooseLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-choose-location',
  templateUrl: 'choose-location.html',
  providers:[Geolocation,KaoQinService,NativeService,DatePipe],
})
export class ChooseLocationPage {
  pois_list = []
  attendance_off
  select_list = []
  select_index ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation:Geolocation,
  public kaoQinService:KaoQinService) {
    this.attendance_off = this.navParams.get('attendance_off')
     this.geolocation.getCurrentPosition().then((resp) => {
        // console.log(resp.coords.latitude)
        // console.log(resp.coords.longitude)
        this.kaoQinService.trans_location(resp.coords.latitude,resp.coords.longitude).then(res => {
          // console.log(res)
          var that = this
          this.kaoQinService.get_location_now(res.result[0].y,res.result[0].x).then(res_location =>{
            // console.log(res_location.result.pois[0].addr)
            // that.location_str = res_location.result.pois[0].addr
            that.pois_list = res_location.result.pois
            for (let item of that.pois_list) {
              that.select_list.push("0")
            }
            that.select_list[0] = "1"
            that.select_index = 0
          })
        })
    }).catch((error) => {
      console.log('Error getting location', error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseLocationPage');
  }

  clickLocation(index){
    this.select_index = index
    let i = 0
    for (let item of this.select_list) {
      this.select_list[i] = "0"
      i = i + 1
    }
    this.select_list[this.select_index] = "1"
    // this.navCtrl.push('KaoqinPhotoPage',{
    //   "attendance_off":this.attendance_off,
    //   "location_str":item.name,
    // })
  }

  goBack(){
    this.navCtrl.popTo('KaoqinPage')
  }

  release(){
    this.navCtrl.push('KaoqinPhotoPage',{
      "attendance_off":this.attendance_off,
      "location_str":this.pois_list[this.select_index].name,
    })
  }

}
