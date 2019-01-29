import { GongchengService } from './../gongchengService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the GongchengDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongcheng-detail',
  templateUrl: 'gongcheng-detail.html',
  providers: [GongchengService]
})
export class GongchengDetailPage {
  item: any;
  type='kucun'
  fontType=''
  kucunList=[]
  isShowFooter = false
  frontPage;
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public toastCtrl: ToastController, public storage: Storage, public gongchengService: GongchengService) {
    this.item = this.navParams.get('item');
    this.fontType = this.navParams.get('type');
    this.frontPage = Utils.getViewController("GongchengListPage", navCtrl)
    this.kucunList = this.item.line_ids
    if(this.item.state=='reviewing' && this.fontType=='wait_approved'){
        this.isShowFooter = true
    }
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongchengDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  changeState(state) {
    if (state == 'draft') {
      return "草稿";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'wait_take_effect') {
      return "等待生效";
    }
    else if (state == 'rejected') {
      return "被拒";
    }
    else if (state == 'done') {
      return "完成";
    }
    else if (state == 'archived') {
      return "归档";
    }
    else {
      return state;
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  conform() {
    // let body = this.calDetail();
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
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '通过',
          handler: data => {
            if (data.title) {
              let body = {
                'user_id':this.user_id,
                'remark': data.title,
                'id': this.item.id,
                'type': true,
              }
              this.gongchengService.approval_material_request(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
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
            else {
              let body = {
                'user_id':this.user_id,
                'remark': '',
                'id': this.item.id,
                'type': true,
              }
              this.gongchengService.approval_material_request(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
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
          }
        }]
    }).present();
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
            if (data.title)
            {
              let body = {
                'user_id':this.user_id,
                'remark': data.title,
                'id': this.item.id,
                'type': false,
              }
                this.gongchengService.approval_material_request(body).then((res) => {
               if (res)
        {
          
          if (res.result.res_code == 1)
          {
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
          else
          {
            Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
          }
          }
        }
      ]
    }).present();
  }

  changeStatus(status){
    if (status == 'none') {
      return "等待审核";
    }
    else if (status == 'comment') {
      return "评价";
    }
    else if (status == 'retract') {
      return "撤回";
    }
    else if (status == 'submit') {
      return "提交";
    }
    else if (status == 'approved') {
      return "通过";
    }
    else if (status == 'rejected') {
      return "拒绝";
    }
    else {
      return status;
    }
  }
}
