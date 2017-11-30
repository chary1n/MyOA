import { HttpService } from './../../providers/HttpService';
import { dbBean } from './../../model/dbInfoModel';
import { Storage } from '@ionic/storage';

import { JPush } from '../../providers/JPush'

import { LoginService } from './loginService';
import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';
import { UrlServer } from '../../providers/UrlServer';


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
  providers: [LoginService, JPush, UrlServer]
})
export class LoginPage {
  email: string;
  password: string;
  dbs: any;
  employee: string;
  resUser: any;
  isSelected1 = false;
  isSelected2 = false;
  isSelected3 = false;
  db;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loginservice: LoginService, private myHttp: Http, private storage: Storage, public platform: Platform, public appVersion: AppVersion,
    public jpush: JPush, public urlServer: UrlServer,
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('user')
      .then(res => {
        console.log(res);
        if (res != null) {
          window.localStorage.setItem("id", res.result.res_data.user_id)
          this.storage.get('user_psd').then(res => {
            HttpService.appUrl = res.url
            this.navCtrl.setRoot('TabsPage');
            console.log(res)
            this.loginservice.toLogin(res.user_email, res.user_psd, res.db_name)
              .then(res => {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                  this.storage.set("user", res).then(() => {
                  });
                }
              })
          })
        }
      });
  }

  chooseJiangsu() {
    this.isSelected1 = true;
    this.isSelected2 = false;
    this.isSelected3 = false;
    HttpService.appUrl = "http://js.robotime.com/"
    this.getDB();
  }

  chooseDiy() {
    this.isSelected2 = true;
    this.isSelected1 = false;
    this.isSelected3 = false;
    HttpService.appUrl = "http://dr.robotime.com/"
    this.getDB();
  }

  chooseWanju() {
    this.isSelected3 = true;
    this.isSelected2 = false;
    this.isSelected1 = false;
    HttpService.appUrl = "http://erp.robotime.com/"
    this.getDB();
  }


  getDB() {
    this.loginservice.getDBInfo().then(res => {
      console.log(res)
      this.employee = res.res_data[0];
    });
  }


  itemSelected(event){

  }


  // 登录
  toLogin() {
    if (this.employee == null) {
      alert("请选择公司")
      return
    }
    this.loginservice.toLogin(this.email, this.password, this.employee)
      .then(res => {
        console.log(res);
        if (res.result && res.result.res_code == 1) {
          this.storage.set("user_psd", {
            user_email: this.email,
            user_psd: this.password,
            db_name: this.employee,
            url: HttpService.appUrl
          })
          this.storage.set("user", res).then(() => {
            this.jpush.setAlias(res.result.res_data.user_id);
            this.navCtrl.setRoot('TabsPage');
          });
        }
        else if (res.result && res.result.res_code == -1) {
          alert(res.result.res_data.error);
        }
      })
  }
}