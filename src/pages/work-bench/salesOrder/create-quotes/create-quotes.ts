import { CustomerListPage } from './customer-list/customer-list';
import { DatePicker } from '@ionic-native/date-picker';
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
  seleteDate :any
  products: any 
  isAdd = false ;
  items  :any[]  ;
  noTaxTotal :number ;
  taxTotal :number ;
  total :number ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private datePicker: DatePicker) {
    this.items = [] ;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CreateQuotesPage');
  }



  ionViewDidEnter(){
   let item =   this.navParams.get("productItem")
   this.isAdd = this.navParams.get("isAdd")
    if(this.isAdd){
      this.items.push(item);
    }
  }


  improveQuotation(){
    this.navCtrl.push(ImproveQuotationPage)

  }

  addProductions(){
    this.isAdd = false ;
    this.navCtrl.push(AddProductionPage)
  }

  chooseDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
    }).then(
      date =>this.seleteDate = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  seleteCustomer(){
    this.navCtrl.push(CustomerListPage);
  }

}
