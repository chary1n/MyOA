import { NavController, NavParams, IonicPage, AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BoxService } from './boxService'
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the BoxActivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-box-active',
  templateUrl: 'box-active.html',
  providers: [BoxService, DatePipe],
})
export class BoxActivePage {
  show_date;
  now_date;
  data = [];
  total_toy = 12455;
  constructor(public navCtrl: NavController, public navParams: NavParams, public boxService: BoxService, private datePicker: DatePicker,
    public datePipe: DatePipe) {
    var Y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDate();
    this.show_date = Y + '-' + this.format0_date('' + m) + '-' + this.format0_date('' + d)
    this.now_date = new Date(this.show_date)
    this.get_day_product_info(this.show_date)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoxActivePage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_delete_day() {
    var d = this.now_date;
    d.setDate(d.getDate() - 1);
    var m = d.getMonth() + 1;
    this.show_date = d.getFullYear() + '-' + this.format0_date('' + m) + '-' + this.format0_date('' + d.getDate());
    console.log(this.show_date)
    this.now_date = new Date(this.show_date)
    this.get_day_product_info(this.show_date)
  }

  click_add_day() {
    var d = this.now_date;
    d.setDate(d.getDate() + 1);
    var m = d.getMonth() + 1;
    this.show_date = d.getFullYear() + '-' + this.format0_date('' + m) + '-' + this.format0_date('' + d.getDate());
    console.log(this.show_date)
    this.now_date = new Date(this.show_date)
    this.get_day_product_info(this.show_date)
  }

  click_show_picker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
      maxDate: new Date()
    }).then(
      date => {
        if (date) {
          this.show_date = this.datePipe.transform(date, 'yyyy-MM-dd')
          this.now_date = new Date(this.show_date)
          this.get_day_product_info(this.show_date)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  get_day_product_info(date) {
    this.boxService.get_box_active_data(date).then(res => {
      this.data = res.data
      var total_data = 0
      for (var i = 0; i < res.data.length; i++) {
        total_data += res.data[i].product_quantity
      }
      this.total_toy = total_data
    })
  }

  format0_date(value) {
    if (parseInt(value) < 10) {
      value = "0" + value
    }
    return value
  }

}
