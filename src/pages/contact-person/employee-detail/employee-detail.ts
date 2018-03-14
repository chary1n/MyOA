import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,ToastController,Platform} from 'ionic-angular';
import { ContactService} from './../contact-persionService'
import { CallNumber } from '@ionic-native/call-number';
import { Utils } from './../../../providers/Utils';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { WebIntent } from "@ionic-native/web-intent";
declare let startApp: any;

/**
 * Generated class for the EmployeeDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-employee-detail',
  templateUrl: 'employee-detail.html',
  providers:[ContactService,CallNumber,AppAvailability,WebIntent],
})
export class EmployeeDetailPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public callNumber:CallNumber,
  public alertCtrl:AlertController,public toast:ToastController,private appAvailability: AppAvailability,
    public platform: Platform,private webintent: WebIntent) {
      this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailPage');
  }

  callPhone() {
    //  alert(this.items.phone);
     if(this.item.mobile_phone != 'false' && this.item.mobile_phone != '')
     {
        let confirm = this.alertCtrl.create({  
      title: this.item.mobile_phone,  
      buttons: [  
        {  
          text: '取消',  
          handler: () => {  
          }  
        },  
        {  
          text: '确定',  
          handler: () => {  
            this.call(this.item.mobile_phone);
          }
        }]
      }).present();
     }
     else
     {
        Utils.toastButtom("该员工未填写手机号", this.toast)
     }
  }


  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  sendEmail() {
    this.openAppWith('alicloudmail://', 'com.alibaba.cloudmail')
  }

  openAppWith(ios_bundle_id, android_bundle_id) {
    let app;

    if (this.platform.is('ios')) {
      app = ios_bundle_id;
    }
    else if (this.platform.is('android')) {
      let sApp = startApp.set({
        "component": ["com.alibaba.cloudmail", "com.alibaba.alimei.activity.Welcome"]
      });
      sApp.start(function () { /* success */
        console.log("OK");
      }, function (error) { /* fail */
        alert("请先下载阿里邮箱");
      });
      return ;
    }
    let ctrl = this.alertCtrl;

    this.appAvailability.check(app).then(

      function () { // success callback

        let browser = new InAppBrowser();
        browser.create(app, '_system', 'location=yes');
        // window.open('camcard://','_system',  'location=yes');
      },
      function () {
        console.log('1');
        ctrl.create({
          title: '提示',
          subTitle: "请先下载阿里邮箱",
          buttons: [
            {
              text: '取消',
              handler: () => {

              }
            }, {
              text: '跳转下载',
              handler: () => {
                let browser = new InAppBrowser();
                browser.create('https://itunes.apple.com/cn/app/a-li-you-xiang/id923828102?mt=8');
              }
            }
          ]
        }).present();
      }
    );
  }

}
