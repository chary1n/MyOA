import { HttpService } from './../../providers/HttpService';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginService } from './../login/loginService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, IonicPage , ToastController} from 'ionic-angular';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../providers/Utils';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
  providers: [LoginService,]
})
export class ForgetPasswordPage {
  account
  phone
  yz_code
  step
  code_str = "获取验证码"
  new_pwd
  new_pwd_confirm
  can_click_yz = true
  constructor(public navCtrl: NavController,public statusBar:StatusBar, public navParams: NavParams, private loginservice: LoginService,
    public ctrl: AlertController, public storage: Storage, public loginService: LoginService, public toastCrtl: ToastController) {
      this.step = 0
      this.account = this.navParams.get('account')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  ionViewWillEnter(){
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  goBack(){
    this.navCtrl.pop()
  }

  click_next_step(){
    if (!this.account){
      Utils.toastButtom( '请填写账号',this.toastCrtl)
      return;
    }
    if (!this.phone){
      Utils.toastButtom( '请填写手机号',this.toastCrtl)
      return;
    }
    if (!this.yz_code){
      Utils.toastButtom( '请填写验证码',this.toastCrtl)
      return;
    }
    let body = {
      'phone': this.phone,
      'account': this.account,
      'code' : this.yz_code,
    }
    this.loginService.confirm_phone_code(body).then(res => {
      if (res.result.res_code == 1){
        this.step = 1
      }
    })
  }

  click_finish(){
    if (!this.new_pwd){
      Utils.toastButtom( '请填写新密码',this.toastCrtl)
      return;
    }
    if (!this.new_pwd_confirm){
      Utils.toastButtom( '请确认新密码',this.toastCrtl)
      return;
    }
    if (this.new_pwd != this.new_pwd_confirm){
      Utils.toastButtom( '请确认密码输入一致',this.toastCrtl)
      return;
    }
    let body = {
      'account': this.account,
      'new_pwd': this.new_pwd,
    }
    this.loginService.change_password_now(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('修改密码成功', this.toastCrtl)
        this.navCtrl.pop()
      }
    })
  }

  click_yz_code(){
    if (this.can_click_yz){
      this.can_click_yz = false
      if (!this.account){
      Utils.toastButtom( '请填写账号',this.toastCrtl)
      this.can_click_yz = true
      return;
    }
    if (!this.phone){
      Utils.toastButtom( '请填写手机号',this.toastCrtl)
      this.can_click_yz = true
      return;
    }
    let body = {
      'phone': this.phone,
      'account': this.account,
    }
    this.code_str = "60s"
    var let_int = 60
    var self = this
    var now_interval = setInterval( function () {
      if (self.can_click_yz == false) {
        let_int = let_int - 1
        self.code_str =  let_int + 's'
        if (let_int == 0){
          self.code_str = '获取验证码'
          self.can_click_yz = true
          clearInterval(now_interval)
        }
      }
    }, 1000)
    this.loginService.get_phone_code_oa(body).then(res => {
      if (res.result){
        if (res.result.res_code == 1){
          Utils.toastButtom('验证码已发送', this.toastCrtl)
        }
        else{
          this.code_str = '获取验证码'
          this.can_click_yz = true
          clearInterval(now_interval)
        }
      }
      else{
        this.code_str = '获取验证码'
        this.can_click_yz = true
        clearInterval(now_interval)
      }
    })
    }
  }

}
