import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the GongpaiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongpai',
  templateUrl: 'gongpai.html',
})

export class GongpaiPage {
  isFinish = false ;
  isShowOnAlert = true ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl :ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongpaiPage');
  }


  openCertificationModal() {
        // let myModal = this.modalCtrl.create('PopmodalPage', {}, {
        //     cssClass: 'custom-modal'
        // });
        // myModal.present();
    this.isFinish = true ;
    }

}
