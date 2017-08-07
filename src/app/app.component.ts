import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {AppVersion} from '@ionic-native/app-version';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage} from '../pages/login/login';
import {HttpService} from '../providers/HttpService'
import {HttpModule} from "@angular/http";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  version:any;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private appVersion: AppVersion,) {
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#f8f8f8');
      splashScreen.hide();
      this.getVersionNumber();
      
    });
  }
  getVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
        resolve(value);
        this.version = value;
        if(this.platform.is("android")){

        } 
        else if (this.platform.is('ios'))
        {
          
        }
      }).catch(err => {
      });
    });
  }
  
}

