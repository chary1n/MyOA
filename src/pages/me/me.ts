import { AppVersion } from '@ionic-native/app-version';
import { EditInformationPage } from './edit-information/edit-information';
import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Platform } from 'ionic-angular';

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
})
export class MePage {
  name: string;
  user_heard: string;
  company:any;
  job:any;
  versionNumber :any ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController,
    private modalctrl:ModalController, public platform :Platform,public appVersion:AppVersion) {
      if (this.platform.is("android")) {
        this.appVersion.getVersionCode().then((value: string) => {
          this.versionNumber = value
        });
      }
      else if (this.platform.is('ios')) {
        this.appVersion.getVersionNumber().then((value: string) => {
          this.versionNumber = value
        });
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
    
  }
 ionViewWillEnter(){
  this.initData();
 }

  initData() {
    this.storage.get('user')
      .then(res => {
        console.log(res);
        this.name = res.result.res_data.name;
        this.job=res.result.res_data.job;
        if(this.job==false){
          this.job=" "
        }
        this.user_heard = res.result.res_data.user_ava;
        this.company=res.result.res_data.company;
      })

  }

  toAccountSafePage() {
    console.log('')
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
            this.storage.set('user', null)
              .then(() => {
                // this.navCtrl.setRoot(LoginPage);
               let modal = this.modalctrl.create(LoginPage);
                modal.present();
              });
          }
        }
      ]
    });
    alert.present();
  }

  editInformation(){
    this.navCtrl.push(EditInformationPage)
  }

}
