import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { ShenGouService } from './../shengouService';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the AuditedPurchasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-audited-purchase',
  templateUrl: 'audited-purchase.html',
  providers: [ShenGouService]
})
export class AuditedPurchasePage {

  item: any;
  title: any;
  isShowFooter: boolean;
  user_id: any;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shengouService: ShenGouService,
    public alertCtrl: AlertController, public storage: Storage) {
    this.item = this.navParams.get('item');
    this.title = this.item.name;
    this.frontPage = Utils.getViewController("ShengoupagePage", navCtrl)
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;
      });
    console.log(this.item.state);
    if (this.item.state == 'submit'||this.item.state == 'manager1_approve'||this.item.state == 'manager2_approve') {
      this.isShowFooter = true;
    }
    else {
      this.isShowFooter = false;
    }
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementDetailPage');
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
      this.shengouService.confirm1(this.item.sheet_id, this.user_id,reason,this.item.state).then((res) => {
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
              this.shengouService.refuse(this.item.sheet_id, data.title, this.user_id).then((res) => {
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
