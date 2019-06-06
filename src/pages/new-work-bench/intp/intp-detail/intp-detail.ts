import { NavController, NavParams, IonicPage, ActionSheetController, Content, AlertController, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IntpService} from './../intpService'
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the IntpDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intp-detail',
  templateUrl: 'intp-detail.html',
  providers: [IntpService],
})
export class IntpDetailPage {
  item
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public intpService: IntpService,
  public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.item = this.navParams.get('item')
    this.user_id = this.navParams.get('user_id')
    this.intpService.get_intp_detail({'intp_id': this.item.intp_id}).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.item = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntpDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  cancel(){
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "输入拒绝的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title) {
              let body = {
                'text': data.title,
                'user_id': this.user_id,
                'intp_id': this.item.intp_id, 
              }
              this.intpService.refuse_intp(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.navCtrl.pop()
                  }
                }
              })
            }
            else {
              Utils.toastButtom('请填写拒绝原因', this.toastCtrl)
            }
          }
        }
      ]
    }).present();
  }

  conform(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "填写审批备注",
        inputs: [
          {
            name: 'title',
            placeholder: '审批备注(选填)'
          },
        ],
        buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            let body = {
                'text': data.title,
                'user_id': this.user_id,
                'intp_id': this.item.intp_id, 
              }
              this.intpService.confirm_intp(body).then((res) => {
                if (res) {
                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.navCtrl.pop()
                  }
                }
              })
          }
        }
        ],
      }).present();
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

}
