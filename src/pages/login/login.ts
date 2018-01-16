
import { HttpService } from './../../providers/HttpService';
import { dbBean } from './../../model/dbInfoModel';
import { Storage } from '@ionic/storage';

import { JPush } from '../../providers/JPush'

import { LoginService } from './loginService';
import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';
import { UrlServer } from '../../providers/UrlServer';

declare let cordova: any;


// import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

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
  history_arr = [];
  email_length = 0;
  autoLogin = false;
  remerberPassword = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loginservice: LoginService, private myHttp: Http, private storage: Storage, public platform: Platform, public appVersion: AppVersion,
    public jpush: JPush, public urlServer: UrlServer,public ctrl:AlertController
  ) {
    this.storage.get("login").then(res => {
      if (res) {
        this.autoLogin = res.autoLogin
        this.remerberPassword = res.remerberPassword
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get("login").then(res => {
      this.storage.get("user").then(user=>{
        if (res) {
          if (res.autoLogin&&user) {
            this.toAutoLogin()
          } else if (res.remerberPassword) {
            this.storage.get('user_psd').then(res => {
              this.email = res.user_email
              this.password = res.user_psd
            })
          }
        }
      })
    })
  }

  toAutoLogin() {
    this.storage.get('user')
      .then(res => {
        if (res) {
          window.localStorage.setItem("id", res.result.res_data.user_id)
          this.storage.get('user_psd').then(res => {
            HttpService.appUrl = res.url
            this.navCtrl.setRoot('TabsPage');
            console.log(res)
            this.loginservice.toLogin(res.user_email, res.user_psd, res.db_name)
              .then(res => {
                console.log(res);
                if (res.result && res.result.res_code == 1) {
                  HttpService.user_id = res.result.res_data.user_id;
                  HttpService.user = res.result.res_data ;
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
    // 
  }

  chooseDiy() {
    this.isSelected2 = true;
    this.isSelected1 = false;
    this.isSelected3 = false;
    // HttpService.appUrl = "http://dr.robotime.com/"
    HttpService.appUrl = "http://192.168.2.44:8069/"
  }

  chooseWanju() {
    this.isSelected3 = true;
    this.isSelected2 = false;
    this.isSelected1 = false;
    // HttpService.appUrl = "http://erp.robotime.com/"
    HttpService.appUrl = "http://192.168.2.44:8069/"
    // HttpService.appUrl = "http://192.168.2.157:8069/"
    
  }


  getDB() {
    this.loginservice.getDBInfo().then(res => {
      this.employee = res.res_data[0]; //修改
      this.toLogin();
    });
  }

  isAutoLogin() {
    console.log(this.autoLogin)
    this.autoLogin = !this.autoLogin
    console.log(this.autoLogin)
    if (this.autoLogin) {
      this.remerberPassword = true
    }
  }

  isRemerberPassword() {
    this.remerberPassword = !this.remerberPassword
    if (!this.remerberPassword) {
      this.autoLogin = false
    }
  }



  // 登录
  toLogin() {
    console.log(this.employee)
    console.log(this.remerberPassword)
    this.storage.set("login", {
      autoLogin: this.autoLogin,
      remerberPassword: this.remerberPassword,
    })
    if (this.employee == null) {
      this.ctrl.create({
                  title: '提示',
                  subTitle: "请选择公司",
                  buttons: [{
                text: '确定',
                    handler: () => {
                   
             }
             }
      ]
    }).present();
      return
    }
    this.loginservice.toLogin(this.email, this.password, this.employee)
      .then(res => {
        console.log(res);
        if (res.result && res.result.res_code == 1) {
          HttpService.user_id = res.result.res_data.user_id;
          HttpService.user = res.result.res_data ;
          this.storage.set("user_psd", {
            user_email: this.email,
            user_psd: this.password,
            db_name: this.employee,
            url: HttpService.appUrl
          })
          if (this.remerberPassword)
          {
            this.storage.get("history_users").then(res => {
            if (res) {
              let arr = res
              let need_add = true;
              let index = 0;
              for (let item of arr) {

                if (item.email == this.email) {
                  arr.splice(index, 1);
                  arr.push({
                    email: this.email,
                    password: this.password,
                  })
                  need_add = false;
                  break;
                }
                index = index + 1;
              }
              if (need_add) {
                arr.push({
                  email: this.email,
                  password: this.password,
                })
              }
              this.storage.set("history_users", arr);
            }
            else {
              let arr = []
              arr.push({
                email: this.email,
                password: this.password,
              })
              this.storage.set("history_users", arr);
            }
          })
          }
          


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
  watch(event){
    this.password = "";
    if (this.email)
    {
      this.history_arr = []
    this.storage.get("history_users").then(res => {
      if(res){
        console.log(res)
        
        for (let item of res) {
          // console.log((new RegExp(this.email).test(item.email)))
        if ((new RegExp(this.email).test(item.email)))
        {
          this.history_arr.push(item);
        }
       }
      }  
    })
    }
  }
  click(item){
    console.log("2")
    this.email = item.email;
    this.password = item.password;
    this.history_arr = [];
    if (this.platform.is('ios'))
    {
      cordova.plugins.Keyboard.close();
    }
  }

  panEvent($event){
    this.history_arr = []
    if (this.platform.is('ios'))
    {
      cordova.plugins.Keyboard.close();
    }
     
  }

  tap(){
    this.history_arr = []
    if (this.platform.is('ios'))
    {
      cordova.plugins.Keyboard.close();
    }
  }

}