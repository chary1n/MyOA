import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VacationService } from '../vacationService';
import { Utils } from './../../../../providers/Utils';
declare let cordova: any;
/**
 * Generated class for the CreateVacationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-vacation',
  templateUrl: 'create-vacation.html',
})
export class CreateVacationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVacationPage');
  }

}
