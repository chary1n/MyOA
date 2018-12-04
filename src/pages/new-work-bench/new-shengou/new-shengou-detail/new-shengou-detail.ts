import { NavController, NavParams, IonicPage, Platform ,AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import { NewShenGouService } from './../new-shengouService';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the NewShengouDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-shengou-detail',
  templateUrl: 'new-shengou-detail.html',
  providers: [NewShenGouService],
})
export class NewShengouDetailPage {
  item: any;
  title: any;
  isShowFooter: boolean;
  user_id: any;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shengouService: NewShenGouService,
    public alertCtrl: AlertController, public storage: Storage) {
      this.item = this.navParams.get('item');
    this.title = this.item.name;
    this.frontPage = Utils.getViewController("NewShengouPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        // console.log(res)
        this.user_id = res.result.res_data.user_id;
      });
    // console.log(this.item.state);
    let to_approve_name = this.item.to_approve_id
    if (this.item.state == 'reviewing') {
      
      this.storage.get('user')
      .then(res => {
        if (res.result.res_data.name != to_approve_name){
          this.isShowFooter = false;
        }
        else
        {
          this.isShowFooter = true;
        }
      })
    }
    else
    {
      this.isShowFooter = false;
    }
    // console.log(this.item)
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewShengouDetailPage');
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
                  this.navCtrl.popTo(this.frontPage);
                }
              }
              ]
            }).present();
          }
        }
      })
  }

  changeState(item) {
    if (item == "draft") {
      return "草稿";
    }
    else if (item == "submit") {
      return "提交";
    }
    else if (item == "reviewing") {
      return "审核中";
    }
    else if (item == "cancel") {
      return "被拒";
    }
    else if (item == "approve") {
      return "已批准";
    }
    else if (item == "done") {
      return "完成";
    }
    else if (item == "rejected") {
      return "拒绝";
    }
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
