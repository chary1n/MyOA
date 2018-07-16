import { Utils } from './../../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the ContentEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-content-edit',
  templateUrl: 'content-edit.html',
})
export class ContentEditPage {
  rt_achievement: any;
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar:StatusBar,
              private alertCtrl: AlertController) {
    this.rt_achievement = this.navParams.get('rt_achievement');
    this.frontPage = Utils.getViewController("PerformanceStartPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentEditPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  cancel(){
    if(!this.rt_achievement){
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
    this.frontPage.data.rt_achievement = this.rt_achievement;
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.postedit = 1;
    this.navCtrl.popTo(this.frontPage);
  }
}
