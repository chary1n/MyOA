import { Component, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KaoQinService } from './../kaoqinService';
import { DatePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from './../../../../providers/NativeService';
import { Utils } from '../../../../providers/Utils';
import { Device } from '@ionic-native/device';
declare var GaoDe;
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
  providers: [Geolocation, KaoQinService, NativeService, DatePipe, Device],
})
export class ChooseLocationPage {
  pois_list = []
  attendance_off
  select_list = []
  select_index;
  frontPage
  user
  constructor(public navCtrl: NavController,
    public platform: Platform, public navParams: NavParams, public geolocation: Geolocation,
    public kaoQinService: KaoQinService, private device: Device, private datePipe: DatePipe, public storage: Storage) {
    this.frontPage = Utils.getViewController("KaoqinPage", navCtrl)
    this.attendance_off = this.navParams.get('attendance_off')
    this.storage.get('user')
      .then(res => {
        // console.log(res)
        this.user = res.result.res_data
        this.kaoQinService.get_user_regular({'uid':res.result.res_data.user_id}).then(reg => {
          console.log(reg.result.res_data.distance)
          if (res.result.res_data && res.result.res_code == 1) {
            if (this.platform.is("android")) {
              GaoDe.getCurrentPosition((success) => {
                var that = this
                console.log('gaode', success);
                this.kaoQinService.trans_location(success.latitude, success.longitude).then(res => {
                  this.kaoQinService.get_location_now(res.result[0].y, res.result[0].x,reg.result.res_data.distance).then(res_location => {
                    console.log(reg.result.res_data.distance)
                    // console.log(res_location.result.pois[0].addr)
                    // that.location_str = res_location.result.pois[0].addr
                    // that.pois_list = res_location.result.pois
                    for (let item_new of res_location.result.pois) {
                        if (new RegExp(reg.result.res_data.name).test(item_new.name)) {
                          that.pois_list.push(item_new)
                        }
                      }
                    for (let item of that.pois_list) {
                      that.select_list.push("0")
                    }
                    that.select_list[0] = "1"
                    that.select_index = 0
                  })
                })
              }, (error) => {
                console.log('Error getting location', error);
              });
            } else {
              this.geolocation.getCurrentPosition()
                .then((resp) => {
                  console.log(resp.coords.latitude)
                  console.log(resp.coords.longitude)
                  this.kaoQinService.trans_location_ios(resp.coords.latitude, resp.coords.longitude).then(res => {
                    // console.log(res)
                    var that = this
                    this.kaoQinService.get_location_now(res.result[0].y, res.result[0].x,reg.result.res_data.distance).then(res_location => {
                      // console.log(res_location.result.pois[0].addr)
                      // that.location_str = res_location.result.pois[0].addr

                      for (let item_new of res_location.result.pois) {
                        if (new RegExp(reg.result.res_data.name).test(item_new.name)) {
                          that.pois_list.push(item_new)
                        }
                      }
                      // that.pois_list = res_location.result.pois
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
          }
        })
      })





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseLocationPage');
  }

  clickLocation(index) {
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

  // goBack() {
  //   this.navCtrl.popTo('KaoqinPage')
  // }

  release() {
    if (!this.attendance_off) {
      let timestamp = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));;
      let timestamp_now = timestamp / 1000 - 8 * 60 * 60
      let date = new Date(timestamp_now * 1000)

      let timestamp_cal = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
      let timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60
      let date_cal = new Date(timestamp_cal_now * 1000)

      let data_obj = {
        "employee_id": this.user.user_id,
        "check_in": this.formatTime_odoo(date),
        "day_start": this.formatTime_day_start(new Date()),
        "day_end": this.formatTime_day_end(new Date()),
        "company_name": this.pois_list[this.select_index].name,
        // "location_imgs":this.pushImgList,
        "device_version": this.device.uuid,
        // "app_version":"0.5.9",
      }
      var that = this
      this.kaoQinService.location_attendance(data_obj).then(res => {
        console.log(res)
        if (res.result.res_data && res.result.res_code == 1) {
          that.frontPage.data.need_fresh = true;
          that.navCtrl.popTo(that.frontPage)
        }
      })
    }
    else {
      let timestamp = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));;
      let timestamp_now = timestamp / 1000 - 8 * 60 * 60
      let date = new Date(timestamp_now * 1000)

      let timestamp_cal = Date.parse(this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
      let timestamp_cal_now = timestamp_cal / 1000 - 24 * 60 * 60
      let date_cal = new Date(timestamp_cal_now * 1000)

      let data_obj = {
        "employee_id": this.user.user_id,
        "check_out": this.formatTime_odoo(date),
        "day_start": this.formatTime_day_start(new Date()),
        "day_end": this.formatTime_day_end(new Date()),
        "attendance_off": true,
        "company_name": this.pois_list[this.select_index].name,
        // "location_imgs":this.pushImgList,
        "device_version": this.device.uuid,
        // "app_version":"0.5.9",
      }

      var that = this
      this.kaoQinService.location_attendance(data_obj).then(res => {
        console.log(res)
        if (res.result.res_data && res.result.res_code == 1) {
          that.frontPage.data.need_fresh = true;
          that.navCtrl.popTo(that.frontPage)
        }
      })
    }
  }

  formatTime_day_start(date) {

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

  formatTime_day_end(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = 15
    let minute = 59
    let second = 59
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

  formatTime_odoo(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [year, this.formatO(month), this.formatO(day)].join('-') + ' ' + [this.formatO(hour), this.formatO(minute), this.formatO(second)].join(':')
  }

  formatO(date) {
    return String(date).length == 2 ? date : '0' + date
  }

  goBack(){
    this.navCtrl.pop()
  }

  reload_location(){
    this.pois_list = []
    this.kaoQinService.get_user_regular({'uid':this.user.user_id}).then(reg => {
      console.log(reg.result.res_data.distance)
      if (reg.result.res_data && reg.result.res_code == 1) {
        if (this.platform.is("android")) {
          GaoDe.getCurrentPosition((success) => {
            var that = this
            console.log('gaode', success);
            this.kaoQinService.trans_location(success.latitude, success.longitude).then(res => {
              this.kaoQinService.get_location_now(res.result[0].y, res.result[0].x,reg.result.res_data.distance).then(res_location => {
                console.log(reg.result.res_data.distance)
                // console.log(res_location.result.pois[0].addr)
                // that.location_str = res_location.result.pois[0].addr
                // that.pois_list = res_location.result.pois
                for (let item_new of res_location.result.pois) {
                    if (new RegExp(reg.result.res_data.name).test(item_new.name)) {
                      that.pois_list.push(item_new)
                    }
                  }
                for (let item of that.pois_list) {
                  that.select_list.push("0")
                }
                that.select_list[0] = "1"
                that.select_index = 0
              })
            })
          }, (error) => {
            console.log('Error getting location', error);
          });
        } else {
          this.geolocation.getCurrentPosition()
            .then((resp) => {
              console.log(resp.coords.latitude)
              console.log(resp.coords.longitude)
              this.kaoQinService.trans_location_ios(resp.coords.latitude, resp.coords.longitude).then(res => {
                // console.log(res)
                var that = this
                this.kaoQinService.get_location_now(res.result[0].y, res.result[0].x,reg.result.res_data.distance).then(res_location => {
                  // console.log(res_location.result.pois[0].addr)
                  // that.location_str = res_location.result.pois[0].addr

                  for (let item_new of res_location.result.pois) {
                    if (new RegExp(reg.result.res_data.name).test(item_new.name)) {
                      that.pois_list.push(item_new)
                    }
                  }
                  // that.pois_list = res_location.result.pois
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
      }
    })
  }

}
