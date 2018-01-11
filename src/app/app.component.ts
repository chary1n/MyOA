import { Storage } from '@ionic/storage';
import { NativeService } from './../providers/NativeService';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppVersion } from '@ionic-native/app-version';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { JPushPlugin } from '@ionic-native/jpush';


import { HttpService } from '../providers/HttpService'
import { JPush} from '../providers/JPush'
import { HttpModule } from "@angular/http";
import { FirService} from './FirService';
import {InAppBrowser} from '@ionic-native/in-app-browser';
declare let cordova: any; 
@Component({
  templateUrl: 'app.html',
  providers: [FirService,JPush]
})
export class MyApp {
  rootPage: any = 'LoginPage';
  version: any;
  user_env: any;
  constructor(public platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private appVersion: AppVersion,
    private nativeService: NativeService,public firService:FirService, private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser, private storage: Storage,public jpush: JPush) {
     
    platform.ready().then(() => {
      this.jpush.initJpush();
      
      storage.get('user')
      .then(res => {
       this.user_env = res.result.res_data;
       this.jpush.setAlias(res.result.res_data.user_id);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      // statusBar.backgroundColorByHexString("#2597ec");
      // statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#f8f8f8');
      splashScreen.hide();

      

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
            console.log(res)
              if(res.version > value)
              {
                this.alertCtrl.create({
                  title: '发现新版本,是否立即升级？',
                  subTitle: "更新内容："+res.changelog,
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

  // jPushInit(){
  //   //初始化极光
  //   this.jpush.init().then(res => { console.log(res) });
    
  //   //收到通知时会触发该事件。
  //   document.addEventListener("jpush.receiveNotification", function (event) {
  //       alert( JSON.stringify( event ) );
  //   }, false);
  // }

}

