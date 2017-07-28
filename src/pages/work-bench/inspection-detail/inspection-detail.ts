import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the InspectionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspection-detail',
  templateUrl: 'inspection-detail.html',
})
export class InspectionDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionDetailPage');
  }
  clickBack(){
    let alert = this.alertCtrl.create({
      message: '是否全部退回?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
           this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  
  agreeIncoming(){

  }

}
