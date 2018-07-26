import { Utils } from './../../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the InsufficientEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-insufficient-edit',
  templateUrl: 'insufficient-edit.html',
})
export class InsufficientEditPage {
  rt_insufficient;
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar:StatusBar,
    private alertCtrl: AlertController) {
      this.rt_insufficient = this.navParams.get('rt_insufficient').replace(/<br>/g,"\n");
    this.frontPage = Utils.getViewController("PerformanceStartPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsufficientEditPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  cancel(){
    if(!this.rt_insufficient){
      this.navCtrl.popTo(this.frontPage);
    }else{
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.popTo(this.frontPage);
          }
        }
        ]
      }).present();
    }
  }

  save(){
    this.frontPage.data.rt_insufficient = this.rt_insufficient.replace(/\n/g,"<br>");
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.postedit = 2;
    this.navCtrl.popTo(this.frontPage);
  }
}
