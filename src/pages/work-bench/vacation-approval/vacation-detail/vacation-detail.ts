import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VacationService } from '../vacationService';
import { Utils } from './../../../../providers/Utils';
declare let cordova: any;
/**
 * Generated class for the VacationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vacation-detail',
  templateUrl: 'vacation-detail.html',
  providers: [VacationService]
})
export class VacationDetailPage {
  data_arr = []
  data ;
  is_manager = false;
  user;
  delete_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams,public vacationService:VacationService,public storage:Storage,
              public alertCtrl: AlertController,public toastCtrl:ToastController) {
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
    console.log('ionViewDidLoad VacationDetailPage');
    // cordova.plugins.Keyboard.close();
  }
   ionViewWillEnter() {
     
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
            // cordova.plugins.Keyboard.close();
          }
        },
        {
          text: '确定',
          handler: data => {
            // cordova.plugins.Keyboard.close();
            if (data.title)
            {
              this.vacationService.pass_vacation(this.user.user_id,this.data.vacation_id,data.title).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("操作成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
              })
              
            }
            else
            {
               this.vacationService.pass_vacation(this.user.user_id,this.data.vacation_id,false).then(res => {
                if (res.result && res.result.res_code == 1) {
                  Utils.toastButtom("操作成功", this.toastCtrl)
                   this.navCtrl.pop()
                }
              })
            }
            
          }
        }]}).present()
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
            // cordova.plugins.Keyboard.close();
          }
        },
        {
          text: '确定',
          handler: data => {
            // cordova.plugins.Keyboard.close();
            if (data.title)
            {
              this.vacationService.refuse_vacation(this.user.user_id,this.data.vacation_id,data.title).then(res => {
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

  goBack(){
    this.navCtrl.pop()
  }

}
