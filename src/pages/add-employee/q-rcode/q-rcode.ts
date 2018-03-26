import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Utils } from './../../../providers/Utils';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { Screenshot } from '@ionic-native/screenshot';
import { PhotoLibrary } from '@ionic-native/photo-library';
declare var cordova: any;
/**
 * Generated class for the QRcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-q-rcode',
  templateUrl: 'q-rcode.html',
  providers: [PhotoLibrary]
})
export class QRcodePage {

  QRData;
  item;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public toast: ToastController,
    public photoLibrary: PhotoLibrary,
    public screenshot: Screenshot) {

    this.QRData = this.navParams.get("data")
    this.item = this.navParams.get("item")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QRcodePage');
  }

  savePhone() {
    this.screenshot.save('jpg', 20, "name").then((res) => {
      if (this.platform.is("ios")) {
        this.saveImage(res.filePath)
      }
    }, (err) => {
      Utils.toastButtom("保存失败", this.toast)
    });

  }

  saveImage(imgUrl) {
    cordova.plugins.photoLibrary.requestAuthorization(
      function () {
        // User gave us permission to his library, retry reading it!   
        cordova.plugins.photoLibrary.getLibrary(
          function ({ library }) {
            //var url = 'file:///...'; // file or remote URL. url can also be dataURL, but giving it a file path is much faster   
            var album = 'OA';
            cordova.plugins.photoLibrary.saveImage("file://"+imgUrl, album,
              function (libraryItem) {
                Utils.toastButtom("保存失败", this.toast)
              }, function (err) {
                Utils.toastButtom("保存失败", this.toast)
              });
          },
          function (err) {
            if (err.startsWith('Permission')) {
              // call requestAuthorization, and retry   
            }
            // Handle error - it's not permission-related   
            console.log('权限' + err);

          }
        );
      },
      function (err) {
        // User denied the access   
        alert('用户拒绝访问' + err);
      }, // if options not provided, defaults to {read: true}.   
      {
        read: true,
        write: true
      }
    );
  }

}
