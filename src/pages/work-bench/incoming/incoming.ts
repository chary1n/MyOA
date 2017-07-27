import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StockTransfer } from './../../../model/StockTransferModel';
import { IncomingService } from './incomingService';
/**
 * Generated class for the IncomingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-incoming',
  templateUrl: 'incoming.html',
  providers: [IncomingService],
})
export class IncomingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private incomingService: IncomingService) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomingPage');
    this.incomingService.getStockList(0,1,'validate',20,0);
  }

}
