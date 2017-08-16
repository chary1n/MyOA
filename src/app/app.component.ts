import { Storage } from '@ionic/storage';
import { NativeService } from './../providers/NativeService';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppVersion } from '@ionic-native/app-version';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { HttpService } from '../providers/HttpService'
import { HttpModule } from "@angular/http";
import { FirService} from './FirService';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'app.html',
  providers: [FirService]
})
export class MyApp {
  rootPage: any = LoginPage;
  version: any;
  user_env: any;
  constructor(public platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private appVersion: AppVersion,
    private nativeService: NativeService,public firService:FirService, private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser, private storage: Storage) {
    platform.ready().then(() => {
      
      storage.get('user')
      .then(res => {
       this.user_env = res.result.res_data
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#f8f8f8');
      splashScreen.hide();

      if (this.platform.is("android")) {
          this.getVersionNumber();
        }
        else if (this.platform.is('ios')) {
          // this.getiOSVersionNumber();
        }
      
    });
  }
  getVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionCode().then((value: string) => {
        resolve(value);
        this.version = value;
        console.log(this.version)
        if (this.platform.is("android")) {
          this.nativeService.detectionUpgrade(this.version);
        }
      }).catch(err => {
      });
    });
  }

  getiOSVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
          this.firService.get('fir_ios',1).then(res => {
              if(res.version > value)
              {
                this.alertCtrl.create({
                  title: '升级',
                  subTitle: '发现新版本,是否立即升级？',
                  buttons: [{ text: '取消' },
                 {
                    text: '确定',
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

  openUrlByBrowser(url:string):void {
    this.inAppBrowser.create(url, '_system');
  }

}

