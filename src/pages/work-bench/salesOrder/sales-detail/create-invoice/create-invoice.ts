import { SalesSearvice } from './../../salesService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateInvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-invoice',
  templateUrl: 'create-invoice.html',
  providers :[SalesSearvice]
})
export class CreateInvoicePage {
  invoice ;
  invoiceList ;
  total ;
  totalList ;


  constructor(public navCtrl: NavController, public navParams: NavParams,
   private salesSearvice :SalesSearvice) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateInvoicePage');
  }

  create(){
    

  }




}
