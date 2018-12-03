import { Utils } from './../../../../providers/Utils';
import { NewZanZhiService } from './../new-zanzhiService'
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NewZanzhiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-zanzhi-detail',
  templateUrl: 'new-zanzhi-detail.html',
  providers: [NewZanZhiService],
})
export class NewZanzhiDetailPage {
  res_data;
  type ;
  user_id ;
  frontPage ;
  state ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl :AlertController,
    public storage :Storage,
    public commonServices :NewZanZhiService,
    public toastCtrl :ToastController) {
      this.frontPage = Utils.getViewController("NewZanzhiPage", navCtrl)
    this.res_data = this.navParams.get('item')
    this.state = this.res_data.state
    this.type = this.navParams.get('type')
    this.storage.get('user')
    .then(res => {
      console.log(res)
      this.user_id = res.result.res_data.user_id;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewZanzhiDetailPage');
  }

  changeState(state) {
    if (state == 'draft') {
      return '草稿'
    } else if (state == "confirm") {
      return '确认'
    } else if (state == "reviewing") {
      return '审核中'
    }else if (state == "approve") {
      return '批准'
    } else if (state == "rejected") {
      return '被拒'
    } else if (state == "cancel") {
      return '被拒'
    } else if (state == "done") {
      return '已支付'
    }else {
      return state;
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  conform() {
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
            this.submit(data.title)
          }
        }
        ],
      }).present();
  }

  submit(reason){
    let ctrl = this.alertCtrl;
      this.commonServices.confirm(this.res_data.id, this.user_id,reason,this.res_data.state).then((res) => {
        if (res) {
          if (res.result.res_data.success == 1) {
            console.log(res.result.res_data.success)
            ctrl.create({
              title: '提示',
              subTitle: "审批成功",
              buttons: [{
                text: '确定',
                handler: () => {
                  this.frontPage.data.need_fresh = true;
                  this.navCtrl.popTo(this.frontPage);
                }
              }
              ]
            }).present();
          }
        }
      })
  }

  cancel() {
    this.showPrompt();
  }

  showPrompt() {
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
              this.commonServices.refuse(this.res_data.id,data.title, this.user_id).then((res) => {
                if (res) {

                  if (res.result.res_data.success == 1) {
                    console.log(res.result.res_data.success)
                    ctrl.create({
                      title: '提示',
                      subTitle: "拒绝成功",
                      buttons: [{
                        text: '确定',
                        handler: () => {
                          this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      }
                      ]
                    }).present();
                  }
                }
              })
            }
            else {
              ctrl.create({
                title: '提示',
                subTitle: "请填写拒绝原因",
                buttons: [{
                  text: '确定',
                  handler: () => {

                  }
                }
                ]
              }).present();
            }
          }
        }
      ]
    }).present();
  }

  goBack(){
    this.navCtrl.pop()
  }

}
