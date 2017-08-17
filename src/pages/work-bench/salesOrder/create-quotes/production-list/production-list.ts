import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ProductionListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-list',
  templateUrl: 'production-list.html',
})
export class ProductionListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner :BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionListPage');
  }
  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData)
     }, (err) => {
         // An error occurred
         console.log(err)
     });
  }

}
