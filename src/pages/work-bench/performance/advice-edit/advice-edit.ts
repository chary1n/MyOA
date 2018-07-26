import { Utils } from './../../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the AdviceEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-advice-edit',
  templateUrl: 'advice-edit.html',
})
export class AdviceEditPage {
  rt_advice: any;
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar: StatusBar,
    private alertCtrl: AlertController) {
    this.rt_advice = this.navParams.get('rt_advice').replace(/<br>/g,"\n");
    this.frontPage = Utils.getViewController("PerformanceStartPage", navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdviceEditPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  cancel(){
    if(!this.rt_advice){
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
    // debugger;
    this.frontPage.data.rt_advice = this.rt_advice.replace(/\n/g,"<br>");
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.postedit = 3;
    this.navCtrl.popTo(this.frontPage);
  }
}
