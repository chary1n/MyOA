import { EditInformationPage } from './../edit-information/edit-information';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhoneNumberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
})
export class PhoneNumberPage {
  phoneNumber: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneNumberPage');
  }
  // cancel(){
  //   this.navCtrl.setRoot(EditInformationPage)
  // }
  savePhoneNumber(){
    console.log(this.phoneNumber)

  }

}
