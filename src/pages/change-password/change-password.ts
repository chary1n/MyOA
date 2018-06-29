import { HttpService } from './../../providers/HttpService';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginService } from './../login/loginService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  providers: [LoginService,]
})
export class ChangePasswordPage {
  confirm_pwd;
  new_password;
  old_pwd;
  dbname;
  user_id
  email;
  remerberPassword;
  is_me;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginservice: LoginService,
    public ctrl: AlertController, public storage: Storage) {
    this.storage.get("user_psd").then(res => {
      if (res) {
        this.dbname = res.db_name
        this.email = res.user_email
      }
    })
    // this.storage.get("user").then((res) => {
    //   if (res.result) {
    //     this.user_id = res.result.res_data.user_id
    //   }
    // });
    this.storage.get("login").then(res => {
      if (res) {
        this.remerberPassword = res.remerberPassword
      }
    })
    this.is_me=this.navParams.get('is_me')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }


  finish() {
    this.loginservice.change_password(this.old_pwd, this.new_password, this.confirm_pwd, this.dbname, HttpService.user_id).then(res => {
      console.log(res)
      if (res.result.new_password) {
        this.ctrl.create({
          title: '提示',
          subTitle: '密码修改成功',
          buttons: [{
            text: '确定',
            handler: () => {
              this.loginservice.toLogin(this.email, this.new_password, this.dbname, 'value')
                .then(res => {
                  console.log(res);
                  if (res.result && res.result.res_code == 1) {
                    HttpService.user_id = res.result.res_data.user_id;
                    HttpService.user = res.result.res_data;
                    this.storage.set("user_psd", {
                      user_email: this.email,
                      user_psd: this.new_password,
                      db_name: this.dbname,
                      url: HttpService.appUrl
                    })
                    if (this.remerberPassword) {
                      this.storage.get("history_users").then(res => {
                        if (res) {
                          let arr = res
                          let need_add = true;
                          let index = 0;
                          for (let item of arr) {

                            if (item.email == this.email) {
                              arr.splice(index, 1);
                              arr.push({
                                email: this.email,
                                password: this.new_password,
                              })
                              need_add = false;
                              break;
                            }
                            index = index + 1;
                          }
                          if (need_add) {
                            arr.push({
                              email: this.email,
                              password: this.new_password,
                            })
                          }
                          this.storage.set("history_users", arr);
                        }
                        else {
                          let arr = []
                          arr.push({
                            email: this.email,
                            password: this.new_password,
                          })
                          this.storage.set("history_users", arr);
                        }
                      })
                    }
                    this.storage.set("user", res).then(() => {
                      if(this.is_me){
                        this.navCtrl.pop()
                      }else{

                        this.navCtrl.setRoot('TabsPage');
                      }
                      // this.jpush.setAlias(res.result.res_data.user_id);
                    });
                  }
                  else if (res.result && res.result.res_code == -1) {
                    alert(res.result.res_data.error);
                  }
                })
            }
          }
          ]
        }).present();
      } else {
        this.ctrl.create({
          title: res.result.title,
          subTitle: res.result.error,
          buttons: [{
            text: '确定',
          }
          ]
        }).present();
      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }
}
