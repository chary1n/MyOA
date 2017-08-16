import { ProductionListPage } from './../production-list/production-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-production',
  templateUrl: 'add-production.html',
})
export class AddProductionPage {
  mNumber  :number
  deliveryRuls : any 
  mPrice :number
  total = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductionPage');
  }

  save(){

  }

  seleteProduction(){
    this.navCtrl.push(ProductionListPage)
  }

  change(){
    if(this.mNumber&&this.mPrice){
    this.total = this.mNumber *this.mPrice
    }
  }

}
