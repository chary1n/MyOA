import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { MeServices } from './../meService'
import { Utils } from './../../../providers/Utils';
import { HttpService } from './../../../providers/HttpService';
/**
 * Generated class for the EditMeInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-me-info',
  templateUrl: 'edit-me-info.html',
  providers: [MeServices],
})
export class EditMeInfoPage {
  phone
  home_address
  emecy_name
  emecy_type_name
  emecy_type
  emecy_contact
  emecy_type_list = [{ name: '亲人', id: 1 }, { name: '朋友', id: 2 }, { name: '其他', id: 3 }]
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public meServices: MeServices, public toastCtrl: ToastController,
    public storage: Storage, public loading: LoadingController) {
    this.user_id = this.navParams.get('user_id')
    this.phone = this.navParams.get('phone')
    this.home_address = this.navParams.get('home_address')
    this.emecy_name = this.navParams.get('emecy_name')
    this.emecy_type_name = this.navParams.get('emecy_type')
    this.emecy_contact = this.navParams.get('emecy_contact')
    if (this.emecy_type_name == '亲人') {
      this.emecy_type = 1
    }
    else if (this.emecy_type_name == '朋友') {
      this.emecy_type = 2
    }
    else if (this.emecy_type_name == '其他') {
      this.emecy_type = 3
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMeInfoPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  save_info() {
    if (!this.phone) {
      Utils.toastButtom('请填写手机号', this.toastCtrl)
      return;
    }
    if (!this.home_address) {
      Utils.toastButtom('请填写家庭住址', this.toastCtrl)
      return;
    }
    if (!this.emecy_name) {
      Utils.toastButtom('请填写紧急联系人', this.toastCtrl)
      return;
    }
    if (!this.emecy_type) {
      Utils.toastButtom('请填写紧急联系人关系', this.toastCtrl)
      return;
    }
    if (!this.emecy_contact) {
      Utils.toastButtom('请填写联系方式', this.toastCtrl)
      return;
    }
    let body = {
      'phone': this.phone,
      'home_address': this.home_address,
      'emecy_name': this.emecy_name,
      'emecy_type': this.emecy_type,
      'emecy_contact': this.emecy_contact,
      'user_id': this.user_id,
    }
    this.meServices.save_info(body).then(res => {
      if (res.result.res_code == 1) {
        Utils.toastButtom('修改成功', this.toastCtrl)
        this.toAutoLogin()
      }
    })
  }

  toAutoLogin() {
    let loading = this.loading.create({
      enableBackdropDismiss: true
    });
    this.storage.get('user')
      .then(res => {
        if (res) {
          window.localStorage.setItem("id", res.result.res_data.user_id)
          this.storage.get('user_psd').then(res => {
            HttpService.appUrl = res.url
            loading.present();
            let db_name = res.db_name
            this.meServices.toLogin(res.user_email, res.user_psd, res.db_name, '0.9.1')
              .then(res => {
                loading.dismiss()

                var tag_arr = []
                tag_arr.push(db_name)
                console.log(tag_arr);
                if (res.result && res.result.res_code == 1) {
                  loading.dismiss()

                  HttpService.user_id = res.result.res_data.user_id;
                  HttpService.user = res.result.res_data;

                  this.storage.set("user", res).then(() => {
                    this.navCtrl.pop()
                  });

                }
                else {
                  loading.dismiss()
                }
              }).catch((error) => {
                loading.dismiss()
              })

          })
        }
      });
  }

}
