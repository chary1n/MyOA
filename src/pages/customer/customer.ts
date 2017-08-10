import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomerService } from './CustomerService';
/**
 * Generated class for the CustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
  providers: [CustomerService]
})
export class CustomerPage {
  pet: string = "3";
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public customerService:CustomerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
    this.clickCustomer()
  }

  clickCustomer(){
    
  }

  clickXianSuo(){
    this.customerService.get_clues(20,0).then((res) => {
      console.log (res);
    })
  }

  clickQianZaiCustomer(){

  }

  clickGongHaiCustomer(){

  }
  
}
