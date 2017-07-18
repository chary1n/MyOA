import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
   name :string ;
   user_heard :string ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage:Storage) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
    this.initData();
  }

  initData(){
     this.storage.get('user')
     .then(res=>{
       console.log(res);
       this.name = res.result.res_data.name;
       console.log(res.result.res_data.user_ava);
       this.user_heard= res.result.res_data.user_ava;
      //  this.user_heard = res.result.res_data.user_ava;
     })

  }

 toAccountSafePage(){
   console.log('')
 }
  outToLogin(){
    this.storage.set('user',null)
    .then(()=>{
    this.navCtrl.setRoot(LoginPage);
    });

  }

}
