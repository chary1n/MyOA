import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';


import { LoginService } from './loginService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { dbBean } from '../../model/dbInfoModel';




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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loginservice: LoginService, private myHttp: Http, private storage: Storage) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.getdbInfo();

  }

  getdbInfo() {
    this.loginservice.getDBInfo().then(res => {
      this.dbs = res.res_data;
    });
  }

  // 登录
  toLogin() {
      this.loginservice.toLogin(this.email,this.password,this.employee)
      .then(res=>{
       this.navCtrl.push(HomePage);
        this.storage.set("is_login", true);
        this.storage.set("login_time", new Date());
      })
  }

  chooseDb(e) {
    this.getdbInfo();
  }
}