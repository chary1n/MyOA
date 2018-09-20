import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController,ToastController } from 'ionic-angular';
import { AttendanceAutoService } from '../attendance-recoup-auto'
import { Storage } from '@ionic/storage';
import { AttendanceService} from '../attendanceService';
import { Utils } from './../../../../providers/Utils';
declare let cordova: any;
/**
 * Generated class for the AttendanceRecoupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attendance-recoup-detail',
  templateUrl: 'attendance-recoup-detail.html',
  providers: [AttendanceService],
})
export class AttendanceRecoupDetailPage {
  data_arr = []
  data ;
  is_manager = false;
  user;
  delete_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public alertCtrl:AlertController,
              public attendanceService: AttendanceService,public toastCtrl:ToastController) {
    this.data = this.navParams.get('data_item')
    this.data_arr = this.data.detail_lines
    this.storage.get('user').then(res => {
      this.user = res.result.res_data
      if (res.result.res_data.user_id == this.data.to_approve_user_id){
        this.is_manager = true
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceRecoupDetailPage');
    cordova.plugins.Keyboard.close();
  }

  ionViewWillEnter() {
    cordova.plugins.Keyboard.close();
    let data = this.navParams.get("data")
    console.log(this.navParams.get('item_index'))
    if (this.navParams.get('item_index') >= 0)
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

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return date;
  }

  click_refuse(){
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定拒绝？",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因(必填)'
        },
      ],
      buttons: [{
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title)
            {
              this.attendanceService.refuse_edit_card(this.user.user_id,data.title,this.data.edit_card_id).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("操作成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
              })
              
            }
            else
            {
                Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
            }
            
          }
        }]}).present()
  }

  click_confirm(){
      let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定同意？",
      inputs: [
        {
          name: 'title',
          placeholder: '审核意见'
        },
      ],
      buttons: [{
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title)
            {
              this.attendanceService.confirm_edit_card(this.user.user_id,data.title,this.data.edit_card_id).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("操作成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
              })
              
            }
            else
            {
               this.attendanceService.confirm_edit_card(this.user.user_id,false,this.data.edit_card_id).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("操作成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
              })
            }
            
          }
        }]}).present()
  }

  click_back(){
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定撤回？",
      inputs: [
        {
          name: 'title',
          placeholder: '撤回原因(必填)'
        },
      ],
      buttons: [{
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title)
            {
              this.attendanceService.back_edit_card(this.user.user_id,data.title,this.data.edit_card_id).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("操作成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
              })
              
            }
            else
            {
                Utils.toastButtom("请填写撤回原因", this.toastCtrl)
            }
            
          }
        }]}).present()
  }

  click_submit(){
    this.attendanceService.submit_edit_card(this.user.user_id,this.data_arr,this.data.edit_card_id,this.delete_arr).then(res => {
      if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("提交成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
    })
  }

  click_save(){
    this.attendanceService.save_edit_card(this.user.user_id,this.data_arr,this.data.edit_card_id,this.delete_arr).then(res => {
      if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("保存成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
    })
  }

  click_edit(item,i){
    if (this.data.state == '草稿'){
      this.navCtrl.push('AttendanceRecoupDetailEditPage',{
        is_edit:true,
        item_data:item,
        item_index:i,
        month_time:this.data.month_time,
      })
    }
  }

  add_detail(){
    this.navCtrl.push('AttendanceRecoupDetailEditPage',{
        is_edit:false,
        month_time:this.data.month_time,
      })
  }

  change_type(type){
    let str = ''
    if (type == 0){
      str = '申请补卡'
    }
    else if(type == 1)
    {
      str = '申请销卡'
    }
    else
    {
      str = type
    }
    return str
  }

  change_work_type(type){
    let str = ''
    if (type == 0){
      str = '上班'
    }
    else if (type == 1)
    {
      str = '下班'
    }
    else
    {
      str = type
    }

    return str
  }

  deleteItem(item,i){
    this.data_arr.splice(i,1)
    this.delete_arr.push(item)
  }

}
