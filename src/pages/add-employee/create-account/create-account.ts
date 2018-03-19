import { pinyin } from './../../customer/cam-card/pinyin';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Utils } from './../../../providers/Utils';
import { EmployeeService } from './../EmployeeService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
  providers: [EmployeeService]
})
export class CreateAccountPage {
  showInput;
  email;
  chooseOpen = false;
  chooseClose = false;
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public ctrl: AlertController,
    public employeeService: EmployeeService) {
    this.data = this.navParams.get("data")
    this.email = this.getYinName()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }


  checkOpen() {
    this.chooseOpen = !this.chooseOpen
    if (this.chooseOpen) {
      this.chooseClose = false
    }
  }


  checkClose() {
    this.chooseClose = !this.chooseClose
    if (this.chooseClose) {
      this.chooseOpen = false
    }

  }


  goBack() {
    this.navCtrl.pop();
  }

  getYinName() {
    let finalName = ""
    let name = this.data.name
    let firstName = pinyin.getLowerChars(name.substr(0, 1))
    let lastName = pinyin.getLowerChars(name.substr(1, ))
    if (this.data.english_name) {
      finalName = this.data.english_name + '.' + firstName + "@robotime.com"
    } else {
      finalName = lastName + '.' + firstName + "@robotime.com"
    }
    return finalName
  }


  next() {
    if (!this.chooseOpen && !this.chooseClose) {
      Utils.toastButtom("请选择是否开通", this.toastCtrl)
      return;
    }

    if (this.chooseOpen) {
      if (!this.email) {
        Utils.toastButtom("请输入邮箱", this.toastCtrl)
        return;
      }
    } else {
      this.email = ""
    }
    this.data.work_email = this.email
    this.employeeService.create_employee(this.data).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.navCtrl.push("PromptPage", { data: res.result.res_data })
      } else if (res.result.res_data && res.result.res_code == -1) {
        this.ctrl.create({
          title: "错误:",
          subTitle: res.result.res_data.body,
          buttons: [{
            text: '确定',
            handler: () => {
            }
          }
          ]
        }).present();
      }
    })
  }


}
