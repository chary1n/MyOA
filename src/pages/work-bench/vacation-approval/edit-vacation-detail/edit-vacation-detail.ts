import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VacationService } from '../vacationService';
import { Utils } from './../../../../providers/Utils';
import { DatePipe } from '@angular/common';

declare let cordova: any;
import 'jquery'
declare var $: any;
/**
 * Generated class for the EditVacationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-vacation-detail',
  templateUrl: 'edit-vacation-detail.html',
  providers: [VacationService, DatePipe],
})
export class EditVacationDetailPage {
  remarks
  show_str
  default_start_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
  type_arr = []
  type_name
  type_id
  start_date
  end_date
  duration = 0
  uid
  frontPage
  mode
  index
  constructor(public navCtrl: NavController, public navParams: NavParams, public vacationService: VacationService, public storage: Storage,
    public alertCtrl: AlertController, public toastCtrl: ToastController, public datePipe: DatePipe) {
    this.uid = navParams.get('uid')
    this.mode = navParams.get('mode')
    this.frontPage = Utils.getViewController(navParams.get('frontPage'), navCtrl)
    this.vacationService.get_vacation_warning({}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.show_str = res.result.res_data.show_str
        this.type_arr = res.result.res_data.data
      }
    })
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id
    })
    if (this.mode == 'edit'){
      this.index = navParams.get('index')
      let data = navParams.get('data')
      this.type_name = data.type
      this.start_date = data.start
      this.end_date = data.end
      this.remarks = data.remark
      this.duration = data.sub_total
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditVacationDetailPage');
  }

  ionViewDidEnter() {
    this.click_end_datetime()
    this.click_start_datetime()
  }

  goBack() {
    cordova.plugins.Keyboard.close()
    this.navCtrl.pop()
  }

  click_start_datetime() {
    var that = this
    $('#input_start_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
      onSet: function (valueText) {
        if ((<HTMLInputElement>document.getElementById('input_end_datetime')).value){
          that.vacationService.get_vacation_duration({'start_date':valueText.valueText,'end_date':(<HTMLInputElement>document.getElementById('input_end_datetime')).value,'uid':that.uid}).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
                that.duration = res.result.res_data
            }
          })
        } 
      }
    });

  }

  click_end_datetime() {
    var that = this
    $('#input_end_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
      onSet: function (valueText) {
        if ((<HTMLInputElement>document.getElementById('input_start_datetime')).value){
          that.vacationService.get_vacation_duration({'start_date':(<HTMLInputElement>document.getElementById('input_start_datetime')).value,'end_date':valueText.valueText,'uid':that.uid}).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
                that.duration = res.result.res_data
            }
          })
        } 
      }
    });
  }

  typeChange(option1: any) {
    for (let i = 0; i < this.type_arr.length; i++) {
      if (this.type_arr[i].type_name == this.type_name) {
        this.type_id = this.type_arr[i].type_id
        break
      }
    }
  }

  add_detail() {
    cordova.plugins.Keyboard.close()
    if (!this.type_name) {
      Utils.toastButtom('休假类型必填', this.toastCtrl)
      return
    }
    if (!(<HTMLInputElement>document.getElementById('input_start_datetime')).value || !(<HTMLInputElement>document.getElementById('input_end_datetime')).value) {
      Utils.toastButtom('开始时间、结束时间必填', this.toastCtrl)
      return
    }
    if (!this.remarks) {
      Utils.toastButtom('备注必填', this.toastCtrl)
      return
    }
    if ((<HTMLInputElement>document.getElementById('input_start_datetime')).value >= (<HTMLInputElement>document.getElementById('input_end_datetime')).value) {
      Utils.toastButtom('结束时间应大于开始时间', this.toastCtrl)
      return
    }

    let type_id = 0
    for (let item_type of this.type_arr){
      if (item_type.type_name == this.type_name){
        type_id = item_type.type_id
      }
    }

    let body = {
      'type': this.type_name,
      'sub_total': this.duration,
      'start': (<HTMLInputElement>document.getElementById('input_start_datetime')).value,
      'end': (<HTMLInputElement>document.getElementById('input_end_datetime')).value,
      'remark': this.remarks,
      'type_id': type_id,
    }
    this.frontPage.data.data_detail = body
    this.frontPage.data.mode = this.mode
    this.frontPage.data.data_index = this.index
    this.navCtrl.popTo(this.frontPage);
  }
}
