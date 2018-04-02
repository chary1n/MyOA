import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './../kaoqinService';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Platform,AlertController ,ToastController,LoadingController,ActionSheetController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from './../../../../providers/NativeService';
import { Utils } from '../../../../providers/Utils';
import { Device } from '@ionic-native/device';

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
  providers:[Geolocation,KaoQinService,NativeService,DatePipe,Device],
})
export class KaoqinPhotoPage {
  location_str;
  pushImgList = []
  imgList = []
  deletePicture;
  isDeletePicture = false;
  user;
  frontPage;
  is_attendance_off;
  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation:Geolocation,
  public kaoQinService:KaoQinService,public nativeService: NativeService,public actionSheetCtrl: ActionSheetController,
  private datePipe:DatePipe,public storage:Storage,private device:Device) {
    this.frontPage = Utils.getViewController("KaoqinPage", navCtrl)
    this.is_attendance_off = this.navParams.get('attendance_off')
    this.location_str = this.navParams.get('location_str')
    this.storage.get('user')
      .then(res => {
        // console.log(res)
        this.user = res.result.res_data
  
      })
        
    // this.geolocation.getCurrentPosition().then((resp) => {
    //     // console.log(resp.coords.latitude)
    //     // console.log(resp.coords.longitude)
    //     this.kaoQinService.trans_location(resp.coords.latitude,resp.coords.longitude).then(res => {
    //       console.log(res)
    //       var that = this
    //       this.kaoQinService.get_location_now(res.result[0].y,res.result[0].x).then(res_location =>{
    //         console.log(res_location.result.pois[0].addr)
    //         that.location_str = res_location.result.pois[0].addr
    //       })
    //     })
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KaoqinPhotoPage');
  }

  ionViewWillEnter() {
    this.isDeletePicture =this.navParams.get('isDeletePicture')
    console.log(this.isDeletePicture)
    if(this.isDeletePicture){
       this.navParams.data.isDeletePicture= false ;
       this.imgList.splice(this.imgList.indexOf(this.deletePicture),1) 
       this.pushImgList.splice(this.pushImgList.indexOf(this.deletePicture.split(",")[1]),1) 
    }
  }
   

  addImg(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(type) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }

  private getPictureSuccess(img_url) {
    console.log(img_url)
    this.imgList.push(img_url)
    this.pushImgList.push(img_url.split(",")[1])

  }

  clickPicture(item){
    this.deletePicture = item ;
    this.navCtrl.push("DeleteKaoqinPhotoPage" ,{item:item})
  }

  release(){
    if (!this.is_attendance_off){
      let timestamp = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));;
      let timestamp_now = timestamp / 1000 - 8 * 60 * 60
      let date = new Date(timestamp_now * 1000)

      let timestamp_cal = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
      let timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60
      let date_cal = new Date(timestamp_cal_now * 1000)

      let data_obj = {
        "employee_id":this.user.user_id,
        "check_in":this.formatTime_odoo(date),
        "day_start":this.formatTime_day_start(new Date()),
        "day_end":this.formatTime_day_end(new Date()),
        "company_name":this.location_str,
        "location_imgs":this.pushImgList,
        "device_version":this.device.uuid,
        "app_version":"0.5.9",
      }
      var that = this
      this.kaoQinService.location_attendance(data_obj).then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1){
        that.frontPage.data.need_fresh = true;
        that.navCtrl.popTo(that.frontPage)
      }
      })
    }
    else
    {
      let timestamp = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));;
    let timestamp_now = timestamp / 1000 - 8 * 60 * 60
    let date = new Date(timestamp_now * 1000)

    let timestamp_cal = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
    let timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60
    let date_cal = new Date(timestamp_cal_now * 1000)

    let data_obj = {
      "employee_id":this.user.user_id,
      "check_out":this.formatTime_odoo(date),
      "day_start":this.formatTime_day_start(new Date()),
      "day_end":this.formatTime_day_end(new Date()),
      "attendance_off": true,
      "company_name":this.location_str,
      "location_imgs":this.pushImgList,
      "device_version":this.device.uuid,
      "app_version":"0.5.9",
    }

    var that = this
    this.kaoQinService.location_attendance(data_obj).then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1){
        that.frontPage.data.need_fresh = true;
        that.navCtrl.popTo(that.frontPage)
      }
    })
    }

    
  }

  formatTime_day_start(date){
    
    let timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
    let timestamp_now = timestamp / 1000 - 24 * 60 * 60
    let date_now = new Date(timestamp_now * 1000)
    let year = date_now.getFullYear()
    let month = date_now.getMonth() + 1
    let day = date_now.getDate()
    let hour = 16
    let minute = 0
    let second = 0
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

  formatTime_day_end(date){
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = 15
    let minute = 59
    let second = 59
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

  formatTime_odoo(date){
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [year, this.formatO(month), this.formatO(day)].join('-') + ' ' + [this.formatO(hour), this.formatO(minute), this.formatO(second)].join(':')
  }

  formatO(date){
    return String(date).length == 2 ? date : '0' + date
  }

  goBack(){
    this.navCtrl.popTo(this.frontPage)
  }

}
