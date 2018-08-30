import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController ,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AttendanceService} from '../attendanceService';
import { DatePipe } from '@angular/common';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the AttendanceRecoupDetailEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attendance-recoup-detail-edit',
  templateUrl: 'attendance-recoup-detail-edit.html',
})
export class AttendanceRecoupDetailEditPage {
  type_arr = ['补卡','销卡'];
  type_index = 0;
  work_type_arr = ['上班','下班']
  work_type_index = 0;
  time_add ;
  time_delete = '请选择 >';
  remark;
  is_edit = false;
  attendanceRecoupCreatePage;
  attendance_id;
  month_time;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
                this.attendanceRecoupCreatePage = Utils.getViewController("AttendanceRecoupDetailPage", navCtrl);
                this.is_edit = this.navParams.get('is_edit')
                this.month_time = this.navParams.get('month_time')
                if (this.is_edit){
                  let before_data = this.navParams.get('item_data')
                  this.attendance_id = before_data.attendance_id ? before_data.attendance_id : false
                  if (before_data.attendance_type == '申请补卡'){
                      before_data.attendance_type = 0
                  }
                  else if (before_data.attendance_type == '申请销卡')
                  {
                    before_data.attendance_type = 1
                  }
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
                    this.time_add = before_data.attendance_time.replace(' ','T') + "Z"
                  }
                  else
                  {
                    this.time_delete = before_data.attendance_time
                  }
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceRecoupDetailEditPage');
  }

  ionViewWillEnter() {
    let time = this.navParams.get("time")
    let work_type = this.navParams.get('work_type')
    if (this.navParams.get('attendance_id'))
    {
      this.attendance_id = this.navParams.get('attendance_id')
    } 
    if (time && work_type){
        this.time_delete = time
        if (work_type == '上班'){
          this.work_type_index = 0
        }
        else
        {
          this.work_type_index = 1
        }
    }
  }

  confirm(){
    let mString = "";
    let time;
    let type = this.type_index;
    let work_type = this.work_type_index
    if (this.type_index == 0){
      if (this.time_add == '')
      {
        mString = "请选择补卡时间"
      }
      else
      {
        time = this.time_add.replace('T',' ').replace('Z','').substring(6,17)
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
        this.attendanceRecoupCreatePage.data.data = {
        attendance_type:type,
        attendance_work_type:work_type,
        attendance_time:time.replace('T',' ').replace('Z',''),
        remark:this.remark ? this.remark : '', 
        attendance_id: this.attendance_id ? this.attendance_id : false,
        is_edit:true,
      }
        this.attendanceRecoupCreatePage.data.item_index = this.navParams.get('item_index')
      }
      else
      {
        this.attendanceRecoupCreatePage.data.data = {
        attendance_type:type,
        attendance_work_type:work_type,
        attendance_time:time.replace('T',' ').replace('Z',''),
        remark:this.remark ? this.remark : '', 
        attendance_id: this.attendance_id ? this.attendance_id : false,
        is_create:true
      };
      this.attendanceRecoupCreatePage.data.item_index = false
      }
      this.navCtrl.pop();
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

}
