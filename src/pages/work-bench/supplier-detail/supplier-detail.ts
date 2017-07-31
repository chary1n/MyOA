import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierlistService } from '../supplier-list/supplierlistService';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the SupplierDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-supplier-detail',
  templateUrl: 'supplier-detail.html',
  providers: [SupplierlistService]
})
export class SupplierDetailPage {
  id:any
  items:any
  limit:any
  offset:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public supplierService :SupplierlistService , public loadingCtrl: LoadingController) {
    this.items = navParams.get('items');  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierDetailPage');
    this.limit = 20;
    this.offset = 0;
  }


  
}
