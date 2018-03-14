// import { ProductionDetailPage } from './production-detail/production-detail';
import { Utils } from './../../../providers/Utils';
import { SalesSearvice } from './../salesOrder/salesService';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductionSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-search',
  templateUrl: 'production-search.html',
  providers:[SalesSearvice]
})
export class ProductionSearchPage {

  searchName: any
  isMoreData = true
  limit=  20 ;
  offset =  0 ;
  items: any
  mAddProductionPage: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner, private salesSearvice: SalesSearvice) {
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
    let self = this ;
    if (this.isMoreData == true) {
      self.limit = 20;
      self.offset = self.offset + 20;
      this.salesSearvice.getProducts(self.offset, self.limit).then((res) => {
        console.log(self.offset)
        console.log(self.limit)
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

  toDetail(index){
    this.salesSearvice.getProductionDetailById(this.items[index].id).then(res=>{
      if(res.result&&res.result.res_code==1){
        this.navCtrl.push('ProductionDetailPage',{item :res.result.res_data})
      }
    });
  }


  searchClick() {
    this.isMoreData = false ;
    this.salesSearvice.searchProduction(this.searchName)
      .then(res => {
        if (res.result && res.result.res_code == 1) {
          this.items = res.result.res_data;
        }
      })
  }


  scan() {
    let self = this
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData)
      this.salesSearvice.getProductionDetailByCode(barcodeData.text).then(res => {
        console.log(res)
        this.navCtrl.push('ProductionDetailPage',{item : res.result.res_data})
      })
    }, (err) => {
      // An error occurred
      console.log(err)
    });
  }

}
