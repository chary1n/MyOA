import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactPersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-person',
  templateUrl: 'contact-person.html',
})
export class ContactPersonPage {
  products ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.products=["222","22222","22222","2222"] 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPersonPage');
  }

}
