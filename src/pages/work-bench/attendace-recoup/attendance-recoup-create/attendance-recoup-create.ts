import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AttendanceService} from '../attendanceService';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the AttendanceRecoupCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attendance-recoup-create',
  templateUrl: 'attendance-recoup-create.html',
  providers: [DatePipe,AttendanceService],
})
export class AttendanceRecoupCreatePage {
  user_name;
  month_time;
  department_name;
  data_arr = [];
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public datePipe :DatePipe,
              public attendanceService:AttendanceService,public alertCtrl:AlertController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceRecoupCreatePage');
    this.storage.get('user').then(res => {
      console.log(res)
      this.user = res.result.res_data
      this.user_name = res.result.res_data.name
      this.department_name = res.result.res_data.department
    })
  }

  ionViewWillEnter() {
    let data = this.navParams.get("data")
    console.log(this.navParams.get('item_index'))
    if (this.navParams.get('item_index'))
    {
      if (data){
        this.data_arr.splice(this.navParams.get('item_index'), 1, data);
        this.navParams.data.data = false
      }
      this.navParams.data.item_index = false
    }
    else
    {
      if (data){
        this.data_arr.push(data)
        this.navParams.data.data = false
      }
    }
  }

  add_detail(){
    this.navCtrl.push('AttendanceRecoupAddDetailPage',{
      is_edit:false,
    })
  }

  change_type(type){
    let str = ''
    if (type == 0){
      str = '申请补卡'
    }
    else
    {
      str = '申请销卡'
    }
    return str
  }

  change_work_type(type){
    let str = ''
    if (type == 0){
      str = '上班'
    }
    else
    {
      str = '下班'
    }

    return str
  }

  cal_time(time){
    return time.replace('T',' ').replace('Z','')
  }

  save(){
    let ctrl = this.alertCtrl;
    this.attendanceService.save_edit_attendance(this.data_arr,this.user.user_id,this.month_time).then(res => {
      if (res.result && res.result.res_code == 1) {
      ctrl.create({
      title: '提示',
      message: "保存成功",
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.navCtrl.pop()
          }
        }]}).present()
      }
    })
  }

  submit(){
    let ctrl = this.alertCtrl;
    this.attendanceService.submit_edit_attendance(this.data_arr,this.user.user_id,this.month_time).then(res => {
      if (res.result && res.result.res_code == 1) {
      ctrl.create({
      title: '提示',
      message: "提交成功",
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.navCtrl.pop()
          }
        }]}).present()
      }
    })
  }

  click_edit(item,i){
    console.log(i)
    this.navCtrl.push('AttendanceRecoupAddDetailPage',{
      is_edit:true,
      item_data:item,
      item_index:i,
    })
  }

}
