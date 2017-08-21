import { Utils } from './../../../../../providers/Utils';
import { SalesSearvice } from './../../salesService';
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
  providers : [SalesSearvice]
})
export class ProductionListPage {

  searchName: any
  isMoreData =true 
  limit :any 
  offset :any 
  items :any 
  mAddProductionPage :any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,private salesSearvice :SalesSearvice) {
      this.mAddProductionPage = Utils.getViewController("AddProductionPage", navCtrl)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionListPage');
    this.addData();
  }

  addData() {
    this.salesSearvice.getProducts(0, 20)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.items = res.result.res_data
          console.log(this.items)
        }
      })
  }

  doRefresh(refresh) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.salesSearvice.getProducts(0, 20).then((res) => {
      console.log(res)
      refresh.complete();
      this.items = res.result.res_data;
    })
  }


  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.salesSearvice.getProducts(this.offset, this.limit).then((res) => {
        console.log(this.offset)
        console.log(this.limit)
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            this.items.push(item);
          }
        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  updateCucumber(i){
      let  self  = this 
      self.mAddProductionPage.data.productionItem=this.items[i]
      this.navCtrl.pop();
  }


  searchClick() {
    this.salesSearvice.searchProduction(this.searchName)
      .then(res=>{
        if(res.result && res.result.res_code == 1){
          this.items = res.result.res_data;
        }
      })
  }


  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData)
    }, (err) => {
      // An error occurred
      console.log(err)
    });
  }


}
