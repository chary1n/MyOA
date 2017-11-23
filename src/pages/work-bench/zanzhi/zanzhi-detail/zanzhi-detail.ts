import { Utils } from './../../../../providers/Utils';
import { CommonUseServices } from './../../commonUseServices';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Storage } from '@ionic/storage/es2015/storage';

/**
 * Generated class for the ZanzhiDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-zanzhi-detail',
  templateUrl: 'zanzhi-detail.html',
  providers :[CommonUseServices]
})
export class ZanzhiDetailPage {
  res_data;
  pet ;
  user_id ;
  frontPage ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl :AlertController,
    public storage :Storage,
    public commonServices :CommonUseServices) {
    this.frontPage = Utils.getViewController("ZanzhiPage", navCtrl)
    this.res_data = this.navParams.get('item')
    this.pet = this.navParams.get('pet')
    this.storage.get('user')
    .then(res => {
      console.log(res)
      this.user_id = res.result.res_data.user_id;
    });
    console.log(this.res_data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZanzhiDetailPage');
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
                  this.navCtrl.popTo(this.frontPage, {
                    need_fresh: true,
                  });
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
                          this.navCtrl.popTo(this.frontPage, {
                            need_fresh: true,
                          });
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

}
