import { TabsPage } from './../tabs/tabs';
import { dbBean } from './../../model/dbInfoModel';
import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';


import { LoginService } from './loginService';
import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';






/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {
  email: string;
  password: string;
  dbs: any;
  employee: string;
  resUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loginservice: LoginService, private myHttp: Http, private storage: Storage) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('user')
      .then(res => {
        console.log(res);
        if (res != null) {
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.getdbInfo();
        }
      });
  }

  getdbInfo() {
    this.loginservice.getDBInfo().then(res => {
      this.dbs = res.res_data;
    });
  }

  // 登录
  toLogin() {
    this.loginservice.toLogin(this.email, this.password, this.employee)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.storage.set("user", res).then(() => {
            this.navCtrl.setRoot(TabsPage);
          });
        }else{
          alert('登录失败');
        }
      })
  }



  chooseDb(e) {
    this.getdbInfo();
  }
}