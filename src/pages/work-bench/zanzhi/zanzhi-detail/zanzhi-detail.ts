import { Utils } from './../../../../providers/Utils';
import { CommonUseServices } from './../../commonUseServices';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';

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
  state ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl :AlertController,
    public storage :Storage,
    public commonServices :CommonUseServices,
    public toastCtrl :ToastController) {
    this.frontPage = Utils.getViewController("ZanzhiPage", navCtrl)
    this.res_data = this.navParams.get('item')
    this.state = this.res_data.state
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


  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  callbackOrder(){
    let prompt = this.alertCtrl.create({
      title: '确定撤回暂支单?',
      inputs: [
        {
          name: 'descrption',
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log(data['descrption'])
            if(data['descrption']){
              this.commonServices.callbackOrder(data['descrption'],this.res_data.id).then(res=>{
                if(res.result&&res.result.res_code==1){
                  this.alertCtrl.create({
                    title: '提示',
                    subTitle: "撤回成功",
                    buttons: [
                        {
                            text: '确定',
                            handler: () => {
                              this.frontPage.data.need_fresh=true
                              this.navCtrl.pop()
                            }
                        }
                    ]
                 }).present();
                }
              })
            }else{
              Utils.toastButtom("请填写撤回理由",this.toastCtrl)
            }
          }
        }
      ]
    });
    prompt.present();
  }

  editOrder(){
    this.navCtrl.push("ZanzhiApplyPage",{res_data:this.res_data})
  }

  
  submitOrder(){
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "确定提交审核?",
      buttons: [
      {
        text: '取消',
        handler: () => {
        }
      },
      {
        text: '确定',
        handler: () => {
          this.commonServices.submitOrder( this.res_data.id).then(res=>{
            if(res.result&&res.result.res_code==1){
              this.frontPage.data.need_fresh = true;
              this.navCtrl.pop()
            }
          })
        }
      }
      ],
    }).present();
  }


  changeState(state) {
    if (state == 'draft') {
      return '草稿'
    } else if (state == "confirm") {
      return '确认'
    } else if (state == "manager1_approve") {
      return '1级审核'
    } else if (state == "manager2_approve") {
      return '2级审核'
    } else if (state == "manager3_approve") {
      return 'General Manager Approved'
    } else if (state == "approve") {
      return '批准'
    } else if (state == "paid") {
      return '已支付'
    } else if (state == "cancel") {
      return '取消'
    } else {
      return state;
    }
  }
}
