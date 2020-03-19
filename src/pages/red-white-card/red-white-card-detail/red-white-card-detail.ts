import { NavParams } from 'ionic-angular/navigation/nav-params';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { RedWhiteService } from './../redwhiteService'
import { AlertController, ToastController } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';


/**
 * Generated class for the RedWhiteCardDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-red-white-card-detail',
  templateUrl: 'red-white-card-detail.html',
  providers: [RedWhiteService],
})
export class RedWhiteCardDetailPage {
  item
  can_submit = false
  can_reback = false
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public redWhiteService: RedWhiteService,
    public toastCtrl: ToastController, public alertCtrl: AlertController) {
    var item_id = this.navParams.get('card_id')
    this.user_id = this.navParams.get('user_id')
    this.item = {}
    this.redWhiteService.get_red_white_card_detail({ 'card_id': item_id }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
        if (this.item.create_uid_id == this.user_id) {
          if (this.item.state == '草稿') {
            this.can_submit = true
          } else {
            this.can_reback = true
          }
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedWhiteCardDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  click_card_detail() {
    var type = ''
    if (this.can_submit) {
      type = 'submit'
    }

    if (this.can_reback) {
      type = 'reback'
    }
    var body = {
      type: type,
      uid: this.user_id,
      card_id: this.item.card_id
    }
    this.redWhiteService.action_card(body).then(res => {
      if (res.result.res_code == 1) {
        this.item = res.result.res_data
        if (this.item.create_uid_id == this.user_id) {
          if (this.item.state == '草稿') {
            this.can_submit = true
            this.can_reback = false
          } else {
            this.can_submit = false
            this.can_reback = true
          }
        } else {
          this.can_reback = false
          this.can_submit = false
        }
        Utils.toastButtom('操作成功', this.toastCtrl)
      }
    })
  }

  delete() {
    var body = {
      type: 'delete',
      uid: this.user_id,
      card_id: this.item.card_id
    }


    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "是否确定删除？",
      buttons: [{
        text: '取消',
        handler: data => {
          // cordova.plugins.Keyboard.close();
        }
      },
      {
        text: '确定',
        handler: data => {
          this.redWhiteService.delete_card(body).then(res => {
            if (res.result.res_code == 1) {
              Utils.toastButtom('操作成功', this.toastCtrl)
              this.navCtrl.pop()
            }
          })

        }
      }]
    }).present()
  }

}
