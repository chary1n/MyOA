import { TreeModule } from 'ng2-tree';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GlobalData } from './../providers/GlobalData';
import { NativeService } from './../providers/NativeService';
import { ImagePicker } from '@ionic-native/image-picker';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import { AppVersion } from '@ionic-native/app-version';
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
import { Utils } from '../providers/Utils'
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { MsgPage } from './../pages/msg/msg';
import { DatePicker } from '@ionic-native/date-picker';
import { SupplierListPage} from '../pages/work-bench/supplier-list/supplier-list'
// import { AutocompleteServiceProvider } from '../providers/autocomplete-service/autocomplete-service';

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
    LoginPageModule,TreeModule,

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
    Camera,
    AppVersion,
    Toast,
    File,
    Transfer,
    InAppBrowser,
    Network,
    AppMinimize,
    ImagePicker,
    NativeService,
    GlobalData,
    Utils,
    BarcodeScanner,
    DatePicker,
  ]
})
export class AppModule { }
