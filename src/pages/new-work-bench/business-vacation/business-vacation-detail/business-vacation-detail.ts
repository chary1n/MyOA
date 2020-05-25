import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { BusinessService } from './../businessService'
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the BusinessVacationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-business-vacation-detail',
  templateUrl: 'business-vacation-detail.html',
  providers: [BusinessService],
})
export class BusinessVacationDetailPage {
  data
  user_id
  is_approve_user = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public businessService: BusinessService,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.user_id = this.navParams.get('user_id')
    this.data = this.navParams.get('data')
    this.businessService.get_bus_vacation_detail({'user_id': this.user_id, 'bus_vacation_id': this.data.bus_vacation_id}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.data = res.result.res_data
        if (this.data.state == '审核中') {
          for (var i = 0; i < this.data.to_approve_user_ids.length; i ++) {
            if (this.data.to_approve_user_ids[i] == this.user_id) {
              this.is_approve_user = true
              break;
            }
          }
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessVacationDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  refuse() {
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
          if (data.title) {
            let body = {
              'user_id': this.user_id,
              'text': data.title,
              'type': 'reject',
              'bus_vacation_id': this.data.bus_vacation_id
            }
            this.businessService.action_bus_vacation(body).then(res => {
              if (res.result && res.result.res_code == 1) {

                Utils.toastButtom("操作成功", this.toastCtrl)
                this.navCtrl.pop()
              }
            })

          }
          else {
            Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
          }

        }
      }]
    }).present()
  }

  confirm() {
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
          let body = {
            'user_id': this.user_id,
            'type': 'confirm',
            'bus_vacation_id': this.data.bus_vacation_id
          }
          
          if (data.title) {
            body['text'] = data.title
            this.businessService.action_bus_vacation(body).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.navCtrl.pop()
              }
            })

          }
          else {
            this.businessService.action_bus_vacation(body).then(res => {
              if (res.result && res.result.res_code == 1) {
                Utils.toastButtom("操作成功", this.toastCtrl)
                this.navCtrl.pop()
              }
            })
          }

        }
      }]
    }).present()
  }


  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

}
