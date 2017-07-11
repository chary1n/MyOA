import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';


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

})
export class LoginPage {
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HTTP

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // 登录
  toLogin() {
    console.log("email" + this.email);
    console.log("password" + this.password);
    this.http.get('http://erp.robotime.com/linkloving_app_api/get_db_list', {}, {})
  .then(data => {
    alert(data.status);
    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {
    alert(error.status);
    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
    // this.service.get("http://erp.robotime.com/linkloving_app_api/get_db_list").then(data=>{console.log(data)})
  }
}
