import { AddProductionPage } from './add-production/add-production';
import { ImproveQuotationPage } from './improve-quotation/improve-quotation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateQuotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-quotes',
  templateUrl: 'create-quotes.html',
})
export class CreateQuotesPage {
  deliveryRuls :string  = "一次性发货" 
  tax :string 
  seleteDate :string
  products: any 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuotesPage');
  }

  improveQuotation(){
    this.navCtrl.push(ImproveQuotationPage)

  }

  addProductions(){

    this.navCtrl.push(AddProductionPage)

  }
}
