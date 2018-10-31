import { FileChooser } from '@ionic-native/file-chooser';
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
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
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
import { WebIntent} from '@ionic-native/web-intent';



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
import { SupplierListPage } from '../pages/work-bench/supplier-list/supplier-list'
import {IonicImageViewerModule} from 'ionic-img-viewer'
import { QRCodeModule } from 'angular2-qrcode';
import { Screenshot } from '@ionic-native/screenshot';
import { NFC, Ndef } from '@ionic-native/nfc';
// import { AutocompleteServiceProvider } from '../providers/autocomplete-service/autocomplete-service';
// import { BLE } from '@ionic-native/ble';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileOpener } from '@ionic-native/file-opener';
import { CodePush } from '@ionic-native/code-push';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
       backButtonText: '',
       iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
       mode: 'ios',//样式强制使用ios样式
    }),
    HttpModule,
    IonicStorageModule.forRoot(),
    TreeModule,
    IonicImageViewerModule,
    QRCodeModule,
  //   IonicModule.forRoot(MyApp,{
  //     backButtonText: '',
  //  },{
  //     links:[
  //     { component: SupplierListPage, name: 'Edit', segment: 'edit' }
  //   ]})
    
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
    WebIntent,
    Toast,
    File,
    Transfer,FileTransferObject,FileTransfer,FileOpener,FileChooser,
    InAppBrowser,
    Network,
    AppMinimize,
    ImagePicker,
    NativeService,
    GlobalData,
    Utils,
    BarcodeScanner,
    DatePicker,
    Screenshot,
    NFC,Ndef,
    PhotoLibrary,
    CodePush,
    // BLE,
  ]
})
export class AppModule { }
