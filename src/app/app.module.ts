import { LoginPageModule } from './../pages/login/login.module';

import { Camera } from '@ionic-native/camera';
import { WorkBenchPageModule } from './../pages/work-bench/work-bench.module';
import { ContactPersonPageModule } from './../pages/contact-person/contact-person.module';
import { MePageModule } from './../pages/me/me.module';
import { MsgPageModule } from './../pages/msg/msg.module';
import { TabsPageModule } from './../pages/tabs/tabs.module';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpService } from '../providers/HttpService'
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import {MsgPage}  from './../pages/msg/msg';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    MePageModule,
    ContactPersonPageModule,
    WorkBenchPageModule,
    MsgPageModule,
    TabsPageModule,
    LoginPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpService,
    Camera
  ]
})
export class AppModule { }
