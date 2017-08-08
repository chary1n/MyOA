import { NativeService } from './../providers/NativeService';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AppVersion } from '@ionic-native/app-version';
import { SplashScreen } from '@ionic-native/splash-screen';


<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
import { HttpService } from '../providers/HttpService'
import { HttpModule } from "@angular/http";

=======
import { LoginPage} from '../pages/login/login';
import {HttpService} from '../providers/HttpService'
import {HttpModule} from "@angular/http";
>>>>>>> 1d30ae08c866c66657f6933a004962b992a167d6
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
<<<<<<< HEAD
  rootPage: any = LoginPage;
  version: any;
  constructor(public platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private appVersion: AppVersion,
    private nativeService: NativeService) {
=======
  rootPage:any = LoginPage;
  version:any;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private appVersion: AppVersion) {
>>>>>>> 1d30ae08c866c66657f6933a004962b992a167d6
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#f8f8f8');
      splashScreen.hide();
<<<<<<< HEAD
      this.getVersionNumber();
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
        else if (this.platform.is('ios')) {

        }
      }).catch(err => {
      });
    });
  }

=======
      
      
    });
  }
  
  
>>>>>>> 1d30ae08c866c66657f6933a004962b992a167d6
}

