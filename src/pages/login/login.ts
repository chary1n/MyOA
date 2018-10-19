import { Utils } from './../../providers/Utils';
import { NativeService } from './../../providers/NativeService';
import { FirService } from './../../app/FirService';

import { HttpService } from './../../providers/HttpService';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';

import { JPush } from '../../providers/JPush'

import { LoginService } from './loginService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';
import { UrlServer } from '../../providers/UrlServer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SplashScreen } from '@ionic-native/splash-screen';
declare let cordova: any;


// import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService, JPush, UrlServer, FirService]
})

export class LoginPage {
  email: string;
  password: string;
  dbs: any;
  employee: string;
  resUser: any;
  isSelected0 = true;
  isSelected1 = false;
  isSelected2 = false;
  isSelected3 = false;
  isSelected4 = false;
  db;
  history_arr = [];
  email_length = 0;
  autoLogin = false;
  remerberPassword = false;
  img1;
  img2; img3; img4;
  isDisabled;
  chooseIndex = 0;
  email_src;
  password_src;
  loadingDB;
  version: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController,
    private loginservice: LoginService, private storage: Storage, public platform: Platform, public appVersion: AppVersion,
    public jpush: JPush, public urlServer: UrlServer, public ctrl: AlertController, private inAppBrowser: InAppBrowser,
    public firService: FirService, private nativeService: NativeService, public toastCtrl: ToastController, public splashScreen: SplashScreen
  ) {
    this.storage.get("login").then(res => {
      if (res) {
        this.autoLogin = res.autoLogin
        this.remerberPassword = res.remerberPassword
      }
    })
    this.storage.get('user_psd').then(res => {
      this.email = res.user_email
      this.password = res.user_psd
      this.isDisabled = false
    })
    this.storage.get("loginIndex").then(res => {
      this.defultChoose(res)
    })
    this.isDisabled = true

    this.reset();

    if (!HttpService.need_back_login) {
      this.storage.get("login").then(res => {
        this.storage.get("user").then(user => {
          HttpService.need_back_login = true
          console.log(HttpService.need_back_login)
          if (res) {
            if (res.autoLogin && user) {
              this.toAutoLogin()
            } else if (res.remerberPassword) {
              this.storage.get('user_psd').then(res => {
                this.email = res.user_email
                this.password = res.user_psd
                this.isDisabled = false
              })
            }
          }
        })
      })
    }
  }

  getVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionCode().then((value: string) => {
        resolve(value);
        this.version = value;
        console.log(this.version)
        this.nativeService.detectionUpgrade(this.version);
      }).catch(err => {
      });
    });
  }


  getiOSVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
        this.firService.get('fir_ios', 1).then(res => {
          console.log(res)
          if (res.version > value) {
            this.ctrl.create({
              title: '发现新版本,是否立即升级？',
              subTitle: "更新内容：" + res.changelog,
              buttons: [
                {
                  text: '立即升级',
                  handler: () => {
                    this.openUrlByBrowser('http://fir.im/MyOa');
                  }
                }
              ]
            }).present();
          }
        });
      }).catch(err => {
      });
    });
  }

  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }

  ionViewDidEnter() {
    this.splashScreen.hide();
    // if (this.platform.is("android")) {
    //   this.getVersionNumber();
    // }
    // else if (this.platform.is('ios')) {
    //   this.getiOSVersionNumber();
    // }
  }

  defultChoose(index) {
    if (index == 2) {
      this.chooseDiy()
    } else if (index == 3) {
      this.chooseWanju()
    } else if (index == 4) {
      this.chooseBanchang()
    } else if (index == 1) {
      this.chooseJiangsu()
    } else {
      this.chooseNewJiangsu()
    }
  }

  ionViewWillEnter() {
    if (this.platform.is("android")) {
      this.getVersionNumber();
    } else if (this.platform.is('ios')) {
      this.getiOSVersionNumber();
    }
    this.splashScreen.hide()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toAutoLogin() {
    this.storage.get('user')
      .then(res => {
        if (res) {
          window.localStorage.setItem("id", res.result.res_data.user_id)
          this.storage.get('user_psd').then(res => {
            HttpService.appUrl = res.url
            if (res.db_name == 'odoo10') {
              this.navCtrl.setRoot('NewTabsPage');
            }
            else {
              this.navCtrl.setRoot('TabsPage');
              // this.navCtrl.setRoot('TabsPage');
            }

            console.log(res)
            this.appVersion.getVersionNumber().then((value: string) => {
              let loading = this.loading.create({
                content: '加载中',
                enableBackdropDismiss: true
              });
              loading.present();
              this.loginservice.toLogin(res.user_email, res.user_psd, res.db_name, value)
                .then(res => {
                  loading.dismiss()
                  console.log(res);
                  if (res.result && res.result.res_code == 1) {
                    loading.dismiss()
                    HttpService.user_id = res.result.res_data.user_id;
                    HttpService.user = res.result.res_data;
                    this.storage.set('loginIndex', this.chooseIndex)
                    this.storage.set("user", res).then(() => {
                    });
                    if (res.user_psd == '123456' && this.chooseIndex == 0) {
                      this.ctrl.create({
                        title: '提示',
                        subTitle: "你的登录密码是初始密码，请立即修改。",
                        enableBackdropDismiss: false,
                        buttons: [{
                          text: '确定',
                          handler: () => {
                            this.navCtrl.push('ChangePasswordPage')
                          }
                        }
                        ]
                      }).present();
                      return
                    }
                  }
                  else {
                    loading.dismiss()
                    this.navCtrl.setRoot('LoginPage')
                  }
                }).catch((error) => {
                  loading.dismiss()
                })
            })

          })
        }
      });
  }

  reset() {
    this.img1 = "assets/img/jiangsuruotai.png"
    this.img2 = "assets/img/diy.png"
    this.img3 = "assets/img/ruobeier.png"
    this.img4 = "assets/img/banchang.png"
  }


  chooseNewJiangsu() {
    this.isSelected0 = true;
    this.isSelected1 = false;
    this.isSelected2 = false;
    this.isSelected3 = false;
    this.isSelected4 = false;
    this.chooseIndex = 0;
    // HttpService.appUrl = "http://service.linkloving.net:8888/"
    HttpService.appUrl = "http://10.0.0.5:8081/"
    this.reset();
    this.img1 = "assets/img/jiangsuruotai_clicked.png"
    this.password_src = "assets/img/S_password.png"
    this.email_src = "assets/img/S_email.png"
  }

  chooseJiangsu() {
    this.isSelected0 = false;
    this.isSelected1 = true;
    this.isSelected2 = false;
    this.isSelected3 = false;
    this.isSelected4 = false;
    this.chooseIndex = 1;
    // HttpService.appUrl = "http://192.168.1.170:8069/"
    // HttpService.appUrl = "http://192.168.1.134:8111/"
    HttpService.appUrl = "http://js.robotime.com/"
    this.reset();
    this.img1 = "assets/img/jiangsuruotai_clicked.png"
    this.password_src = "assets/img/S_password.png"
    this.email_src = "assets/img/S_email.png"
  }

  chooseDiy() {
    this.isSelected0 = false;
    this.isSelected2 = true;
    this.isSelected1 = false;
    this.isSelected3 = false;
    this.isSelected4 = false;
    this.chooseIndex = 2;
    HttpService.appUrl = "http://dr.robotime.com/"
    // HttpService.appUrl = "http://192.168.1.131:8888/"
    // HttpService.appUrl = "http://192.168.2.64:8069/"
    this.reset();
    this.img2 = "assets/img/diy_clicked.png"
    this.password_src = "assets/img/D_password.png"
    this.email_src = "assets/img/D_email.png"
  }

  chooseWanju() {
    this.isSelected0 = false;
    this.isSelected3 = true;
    this.isSelected2 = false;
    this.isSelected1 = false;
    this.isSelected4 = false;
    this.chooseIndex = 3;
    HttpService.appUrl = "http://erp.robotime.com/"
    // HttpService.appUrl = "http://192.168.1.9:8081/"
    this.reset();
    this.img3 = "assets/img/ruobeier_clicked.png"
    this.password_src = "assets/img/R_password.png"
    this.email_src = "assets/img/R_email.png"

  }

  chooseBanchang() {
    this.isSelected0 = false;
    this.isSelected4 = true;
    this.isSelected2 = false;
    this.isSelected1 = false;
    this.isSelected3 = false;
    this.chooseIndex = 4;
    HttpService.appUrl = "http://ber.robotime.com/"
    // HttpService.appUrl = "http://192.168.1.244:8111/"
    this.reset();
    this.img4 = "assets/img/banchang_clicked.png"
    this.password_src = "assets/img/B_password.png"
    this.email_src = "assets/img/B_email.png"
  }


  getDB() {
    this.loadingDB = this.loading.create({
      content: '加载中',
      enableBackdropDismiss: true
    });
    setTimeout(() => {
      this.loadingDB.dismiss();//显示多久消失
    }, 1000);
    // if(this.chooseIndex==3){
    //   this.employee = 'odoo0720'; 
    //   this.toLogin();
    // }else{
    this.loginservice.getDBInfo().then(res => {
      this.employee = res.res_data[0]; //修改
      this.toLogin();
    });
    // }
  }

  isAutoLogin() {
    // console.log(this.autoLogin)
    this.autoLogin = !this.autoLogin
    // console.log(this.autoLogin)
    if (this.autoLogin) {
      this.remerberPassword = true
    }
  }

  isRemerberPassword() {
    this.remerberPassword = !this.remerberPassword
    if (!this.remerberPassword) {
      this.autoLogin = false
    }
  }




  // 登录
  toLogin() {
    console.log(this.employee)
    console.log(this.remerberPassword)
    try {
      this.storage.set("login", {
        autoLogin: this.autoLogin,
        remerberPassword: this.remerberPassword,
      })
    } catch (error) {
      Utils.toastButtom('手机内存不足，请清理之后重试！', this.toastCtrl)
    }
    if (this.employee == null) {
      this.ctrl.create({
        title: '提示',
        subTitle: "请选择公司",
        buttons: [{
          text: '确定',
          handler: () => {

          }
        }
        ]
      }).present();
      return
    }
    // if (this.password == '123456') {
    //   this.ctrl.create({
    //     title: '提示',
    //     subTitle: "你的登录密码是初始密码，请立即修改。",
    //     buttons: [{
    //       text: '确定',
    //       handler: () => {
    //         this.navCtrl.push('ChangePasswordPage')
    //       }
    //     }
    //     ]
    //   }).present();
    //   return
    // }
    // this.appVersion.getVersionNumber().then((value: string) => {
    let loading = this.loading.create({
      content: '加载中',
      enableBackdropDismiss: true
    });
    loading.present();
    this.loginservice.toLogin(this.email, this.password, this.employee, 'value')
      .then(res => {
        loading.dismiss()
        console.log(res);
        if (res.result && res.result.res_code == 1) {
          loading.dismiss()
          HttpService.user_id = res.result.res_data.user_id;
          HttpService.user = res.result.res_data;
          try {
            this.storage.set("user_psd", {
              user_email: this.email,
              user_psd: this.password,
              db_name: this.employee,
              url: HttpService.appUrl
            })
            this.storage.set('loginIndex', this.chooseIndex)
          } catch (error) {
            Utils.toastButtom('手机内存不足，请清理之后重试！', this.toastCtrl)
          }
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
                      password: this.password,
                    })
                    need_add = false;
                    break;
                  }
                  index = index + 1;
                }
                if (need_add) {
                  arr.push({
                    email: this.email,
                    password: this.password,
                  })
                }

                try {
                  this.storage.set("history_users", arr);
                } catch (error) {
                  Utils.toastButtom('手机内存不足，请清理之后重试！', this.toastCtrl)
                }
              }
              else {
                let arr = []
                arr.push({
                  email: this.email,
                  password: this.password,
                })
                try {
                  this.storage.set("history_users", arr);
                } catch (error) {
                  Utils.toastButtom('手机内存不足，请清理之后重试！', this.toastCtrl)
                }
              }
            })
          }
          if (this.password == '123456' && this.chooseIndex == 0) {
            this.ctrl.create({
              title: '提示',
              subTitle: "你的登录密码是初始密码，请立即修改。",
              enableBackdropDismiss: false,
              buttons: [{
                text: '确定',
                handler: () => {
                  this.navCtrl.push('ChangePasswordPage')
                }
              }
              ]
            }).present();
            return
          }
          try {
            this.storage.set("user", res).then(() => {
              if (this.chooseIndex == 0) {
                this.navCtrl.setRoot('NewTabsPage');
              }
              else {
                this.navCtrl.setRoot('TabsPage');
                //  this.navCtrl.setRoot('NewTabsPage');
              }
              // this.jpush.setAlias(res.result.res_data.user_id);
            });
          } catch (error) {
            Utils.toastButtom('手机内存不足，请清理之后重试！', this.toastCtrl)
          }
        }
        else if (res.result && res.result.res_code == -1) {
          loading.dismiss()
          alert(res.result.res_data.error);
        }
      }).catch((error) => {
        loading.dismiss()
        console.log('Error getting location', error);
      })
    // })

  }
  watch(event) {
    this.password = "";
    if (this.email) {
      this.history_arr = []
      this.storage.get("history_users").then(res => {
        if (res) {
          console.log(res)

          for (let item of res) {
            // console.log((new RegExp(this.email).test(item.email)))
            if ((new RegExp(this.email).test(item.email))) {
              this.history_arr.push(item);
            }
          }
        }

      })
    }
  }


  watchPassword(event) {
    console.log(this.password)
    if (this.password) {
      this.isDisabled = false
    } else {
      this.isDisabled = true
    }
  }

  click(item) {
    console.log("2")
    this.email = item.email;
    this.password = item.password;
    this.isDisabled = false
    this.history_arr = [];
    if (this.platform.is('ios')) {
      cordova.plugins.Keyboard.close();
    }
  }

  panEvent($event) {
    this.history_arr = []
    if (this.platform.is('ios')) {
      cordova.plugins.Keyboard.close();
    }

  }

  tap() {
    this.history_arr = []
    if (this.platform.is('ios')) {
      cordova.plugins.Keyboard.close();
    }
  }
}