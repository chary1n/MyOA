import { AndroidAppVersion, APK_DOWNLOAD } from './../../providers/Constants';
import { FirService } from './../../app/FirService';
import { AppVersion } from '@ionic-native/app-version';
import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Platform, MenuController, Events } from 'ionic-angular';
import { JPush } from '../../providers/JPush'
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpService } from '../../providers/HttpService';
import { MeServices} from './meService'
import { GalleryModal } from 'ionic-gallery-modal';
/**
 * Generated class for the MePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
  providers:[JPush, FirService,MeServices],
})
export class MePage {
  name: string;
  user_heard: string;
  company: any;
  job: any;
  versionNumber: any;
  user_id;
  loginIndex;
  version: any;
  from = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public menu: MenuController,
    private alertCtrl: AlertController,
    private modalctrl: ModalController, public platform: Platform, public appVersion: AppVersion,
    public jpush: JPush,
    public event:Events,
    public statusbar:StatusBar, public firService: FirService,
    private inAppBrowser: InAppBrowser,private httpService: HttpService,
    public meService: MeServices, public modalController: ModalController) {
      if (this.platform.is("android")) {
        this.appVersion.getVersionNumber().then((value: string) => {
          this.versionNumber = value
        });
      }
      else if (this.platform.is('ios')) {
        this.appVersion.getVersionNumber().then((value: string) => {
          this.versionNumber = value
        });
      }
      this.storage.get("loginIndex").then(res => {
        this.loginIndex = res
      })
  }

  checkVersion() {
    this.platform.ready().then(() => {
      if (this.platform.is("android")) {
        this.getVersionNumber();
      }
      else if (this.platform.is('ios')) {
        this.getiOSVersionNumber();
      }
    });
  }

  getVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionCode().then((value: string) => {
        resolve(value);
        this.version = value;
        console.log(this.version)
        this.detectionUpgrade(this.version);
      }).catch(err => {
      });
    });
  }

  /**
   * 检查app是否需要升级
   */
  detectionUpgrade(version): void {
    //这里连接后台判断是否需要升级,不需要升级就return
    this.checkNeedToUpdate(version)
  }

  checkNeedToUpdate(version) {
    return this.httpService.getWithUrlNoLoadingNoCatch(AndroidAppVersion).then(res => {
      console.log(res)
      console.log(res.changelog)
      let changelog = res.changelog
      if (res.version) {
        if (res.version > version) {
          this.alertCtrl.create({
            title: '发现新版本,是否立即升级?',
            subTitle: changelog,
            buttons: [{ text: '稍后再说' },
            {
              text: '立即升级',
              handler: () => {
                this.openUrlByBrowser(APK_DOWNLOAD);
              }
            }
            ]
          }).present();
        } else {
          const alert = this.alertCtrl.create({
            title: '提示!',
            subTitle: '已是最新版本，无需更新!',
            buttons: ['好的']
          });
          alert.present();
        }
      }
    })
  }

  getiOSVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
        this.firService.get('fir_ios', 1).then(res => {
          console.log(res)
          if (res.version > value) {
            this.alertCtrl.create({
              title: '发现新版本,是否立即升级？',
              subTitle: "更新内容：" + res.changelog,
              buttons: [
                {
                  text: '立即升级',
                  handler: () => {
                    this.openUrlByBrowser('http://fir.robotime.cn/MyOa');
                  }
                }
              ]
            }).present();
          } else {
            const alert = this.alertCtrl.create({
              title: '提示!',
              subTitle: '已是最新版本，无需更新!',
              buttons: ['好的']
            });
            alert.present();
          }
        });
      }).catch(err => {
      });
    });
  }

  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');

  }
  ionViewWillEnter() {
    this.initData();
    this.statusbar.backgroundColorByHexString("#409eff");
    this.statusbar.styleLightContent();
  }

  initData() {
    this.storage.get('user')
      .then(res => {
        console.log(res);
        this.name = res.result.res_data.name;
        this.job = res.result.res_data.job;
        if (this.job == false) {
          this.job = " "
        }
        this.user_heard = res.result.res_data.user_ava;
        this.company = res.result.res_data.company;
      })

  }

  outToLogin() {
    let alert = this.alertCtrl.create({
      message: '退出当前账号?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            // this.meService.logoutApp({}).then(res =>{

            // })

            this.storage.set('user_schedule_domain_new', {
              'me_type': ['fuze'],
              'state_type': 'unfinish',
              'event_type_id': [],
            })  

            this.storage.set('user', null)
              .then(() => {
                this.storage.get("login").then(res => {
                  if (!(res && res.remerberPassword)) {
                    this.storage.set('user_psd', null)
                    console.log("密码设置为空")
                  }
                })
                this.statusbar.backgroundColorByHexString("#f0f2f5");
                this.statusbar.styleLightContent();
                // this.jpush.setAlias(null);
                let modal = this.modalctrl.create("LoginPage");
                modal.present();
                let tabs = document.getElementsByClassName('tabbar').item(0);
                tabs.remove();
                let menus =  this.menu.getMenus()
                if (menus) {
                  menus.pop()
                  // this.menu.enable(false)
                }
                console.log('注销事件传递')
                this.event.unsubscribe('click_envnt')
                this.event.unsubscribe('closeMenu')
              });
          }
        }
      ]
    });
    alert.present();
  }

  editInformation() {
    this.navCtrl.push("EditInformationPage")
  }


  changePassword() {
    this.navCtrl.push('ChangePasswordPage', { is_me: true })
  }

  to_slide_img(imgList, index) {

    let data = []
     for (let index = 0; index < imgList.length; index++) {
       data.push({
         url: imgList[index]
       })
     }
    let modal = this.modalController.create(GalleryModal, {
        photos: data,
        initialSlide: index
    });
    modal.present();
  }

  // goBack(){
  //   let options: NativeTransitionOptions = {
  //     direction: 'left',
  //     duration: 400,
  //     fixedPixelsTop: 0,
  //     fixedPixelsBottom: 60
  //    };
  //    this.nativePageTransitions.slide(options);
  //   this.navCtrl.pop()
  // }
}
