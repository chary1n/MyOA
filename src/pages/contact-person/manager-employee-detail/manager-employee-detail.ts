import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform, ActionSheetController, LoadingController } from 'ionic-angular';
import { ContactService } from './../contact-persionService'
import { CallNumber } from '@ionic-native/call-number';
import { Utils } from './../../../providers/Utils';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { WebIntent } from "@ionic-native/web-intent";
import { EmployeeService } from './../../add-employee/EmployeeService';
import { Clipboard } from '@ionic-native/clipboard/ngx';
declare let startApp: any;
declare let cordova: any;
/**
 * Generated class for the ManagerEmployeeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-manager-employee-detail',
  templateUrl: 'manager-employee-detail.html',
  providers: [CallNumber, AppAvailability, WebIntent, EmployeeService,Clipboard],
})
export class ManagerEmployeeDetailPage {
  detail_type = 'hr_info'
  item
  origin_data
  origin_email
  origin_identification_id
  me_enter
  constructor(public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber,
    public alertCtrl: AlertController, public toast: ToastController, private appAvailability: AppAvailability,
    public platform: Platform, private webintent: WebIntent, public actionSheetCtrl: ActionSheetController, public employeeService: EmployeeService,
    public loading: LoadingController, public clipboard: Clipboard) {
    this.me_enter = this.navParams.get('me_enter')
    if (this.me_enter) {
      this.item = {}
      this.employeeService.get_me_info({'uid':this.navParams.get('uid') }).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.item = res.result.res_data
        }
      })
    } else {
      this.item = this.navParams.get("item")
      this.origin_data = this.navParams.get("origin_data")
      console.log(this.item)
      this.origin_email = this.item.work_email
      this.origin_identification_id = this.item.identification_id
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerEmployeeDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_hr_info() {
    this.detail_type = "hr_info"
  }

  click_employee_info() {
    this.detail_type = "employee_info"
  }

  click_salary_info() {
    this.detail_type = "salary_info"
  }

  click_attachment_info() {
    this.detail_type = "attachment_info"
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.employeeService.get_employee_info([this.item.id], false).then(res => {
        console.log(res)
        if (res.result && res.result.res_code == 1) {
          this.item = res.result.res_data[0]
        }
        this.navParams.data.need_fresh = false;
      })
    }
  }


  click_phone() {
    //  alert(this.items.phone);
    if (this.item.mobile_phone != 'false' && this.item.mobile_phone != '') {
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
    else {
      Utils.toastButtom("该员工未填写手机号", this.toast)
    }

  }

  click_email() {
    this.openAppWith('alicloudmail://', 'com.alibaba.cloudmail')
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
      return;
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

  click_more() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [{
        text: '编辑',
        handler: () => {
          this.click_edit()
        }
      }, {
        text: '办理离职',
        handler: () => {
          this.click_lizhi()
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    actionSheet.present();
  }

  click_edit() {
    let loading = this.loading.create({
      enableBackdropDismiss: true
    });
    loading.present()
    setTimeout(() => {
      loading.dismissAll()
    }, 200)
    this.navCtrl.push('EditEmployeeInfoPage', {
      'item': this.item,
    })
  }

  click_lizhi() {
    var is_salary = false
    if (this.item.rt_is_system_salary == "是") {
      is_salary = true
    }
    this.navCtrl.push('QuickLeavePage', {
      'employee_id': this.item.id,
      'is_system_salary': is_salary
    })
  }

  click_dump_code(code){
    Utils.toastButtom("已复制到粘贴板", this.toast)
    cordova.plugins.clipboard.copy(code);
  }
}
