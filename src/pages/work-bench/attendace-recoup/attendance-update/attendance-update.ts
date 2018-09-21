import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController ,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AttendanceService} from '../attendanceService';
import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the AttendanceUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attendance-update',
  templateUrl: 'attendance-update.html',
  providers: [DatePipe],
})
export class AttendanceUpdatePage {
  type_arr = ['补卡','销卡'];
  type_index = 0;
  work_type_arr = ['上班','下班']
  work_type_index = 0;
  time_add = '';
  time_delete = '请选择 >';
  remark;
  is_edit = false;
  attendanceRecoupCreatePage;
  attendance_id;
  month_time;
  time = '请选择时间 >' ;
  time_str = '请选择日期 >';
  show_work_type;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public toastCtrl: ToastController, private datePipe: DatePipe,
    private datePicker: DatePicker) {

                this.is_edit = this.navParams.get('is_edit')
                this.month_time = this.navParams.get('month_time')
                if (this.is_edit){
                  let before_data = this.navParams.get('item_data')
                  this.attendance_id = before_data.attendance_id ? before_data.attendance_id : false
                  before_data.attendance_type = 0
                  this.show_work_type = before_data.attendance_work_type
                  if (before_data.attendance_work_type == '上班'){
                      before_data.attendance_work_type = 0
                  }
                  else if (before_data.attendance_work_type == '下班')
                  {
                    before_data.attendance_work_type = 1
                  }
                  this.remark = before_data.remark
                  this.type_index = before_data.attendance_type
                  this.work_type_index = before_data.attendance_work_type
                  if (this.type_index == 0){
                    this.time = before_data.attendance_time.split(' ')[1]
                    this.time_str = before_data.attendance_time.split(' ')[0]
                    // this.time_add = before_data.attendance_time.replace(' ','T') + "Z"
                    this.time_add = before_data.attendance_time
                  }
                  else
                  {
                    this.time_delete = before_data.attendance_time
                  }
                }
                else
                {
                  this.time_add = this.month_time + "-01 00:00"
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceUpdatePage');
  }

  ionViewWillEnter() {
    // let time = this.navParams.get("time")
    // let work_type = this.navParams.get('work_type')
    // if (this.navParams.get('attendance_id'))
    // {
    //   this.attendance_id = this.navParams.get('attendance_id')
    // } 
    // if (time && work_type){
    //     this.time_delete = time
    //     if (work_type == '上班'){
    //       this.work_type_index = 0
    //     }
    //     else
    //     {
    //       this.work_type_index = 1
    //     }
    // }
  }

  confirm(){
    let mString = "";
    let time;
    let type = this.type_index;
    let work_type = this.work_type_index
    if (this.type_index == 0){
      if (this.time_add == '' || this.time == '请选择时间 >' || this.time_str == '请选择日期 >')
      {
        mString = "请选择日期和时间"
      }
      else
      {
        time = this.time_add.replace('T',' ').replace('Z','')
      }
    }
    else
    {
      time = this.time_delete
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      if (this.is_edit)
      {
      //   this.attendanceRecoupCreatePage.data.data = {
      //   attendance_type:type,
      //   attendance_work_type:work_type,
      //   attendance_time:time.replace('T',' ').replace('Z',''),
      //   remark:this.remark ? this.remark : '', 
      //   attendance_id: this.attendance_id ? this.attendance_id : false,
      //   is_edit:true,
      // }
      //   this.attendanceRecoupCreatePage.data.item_index = this.navParams.get('item_index')
      
    }
    }
  }

  cancel(){
    this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
  }

  click_time(){
    this.navCtrl.push('AttendanceAllDataPage',{
      edit:true,
    })
  }

  chooseDate() {
    var month_start = this.month_time + "-01 00:00:00"
    var month_end = this.month_time + '-' + new Date(this.month_time.split('-')[0],this.month_time.split('-')[1],0).getDate() + ' 23:59:59'
    this.datePicker.show({
      date: new Date(this.datePipe.transform(new Date(new Date(this.time_add.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ','T') + 'Z'), 
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
      maxDate: new Date(this.datePipe.transform(new Date(new Date(month_end.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ','T') + 'Z'),
      minDate: new Date(this.datePipe.transform(new Date(new Date(month_start.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ','T') + 'Z'),
    }).then(
      date => {
          this.time_add = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm')
          this.time_str = this.datePipe.transform(date, 'yyyy-MM-dd')
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  chooseTime() {
    var month_start = this.month_time + "-01 00:00:00"
    var month_end = this.month_time + '-' + new Date(this.month_time.split('-')[0],this.month_time.split('-')[1],0).getDate() + ' 23:59:59'
    this.datePicker.show({
      date: new Date(this.datePipe.transform(new Date(new Date(this.time_add.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:MM').replace(' ','T') + 'Z'),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
      maxDate: new Date(this.datePipe.transform(new Date(new Date(month_end.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ','T') + 'Z'),
      minDate: new Date(this.datePipe.transform(new Date(new Date(month_start.replace(/-/g, "/")).getTime() - 3600000 * 8), 'yyyy-MM-dd HH:mm').replace(' ','T') + 'Z'),
    }).then(
      date => {
          this.time_add = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm')
          this.time = this.datePipe.transform(date, 'HH:mm')
  
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

}
