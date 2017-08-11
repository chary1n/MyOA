import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierlistService } from './supplierlistService';
import { LoadingController } from 'ionic-angular';
import { SupplierDetailPage } from './../supplier-detail/supplier-detail'

/**
 * Generated class for the SupplierListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-supplier-list',
  templateUrl: 'supplier-list.html',
  providers: [SupplierlistService]
})
export class SupplierListPage {
  items_detail: any;
  items: any;
  limit = 20;
  offset = 0;
  isMoreData = true;
  searchName:any;
  isSearch = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public supplierService: SupplierlistService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierListPage');
      this.supplierService.getSupplierList(this.limit, this.offset).then((res) => {
        console.log(res)
        this.items = res.result.res_data;
      })
  }
  supplier_detail(id) {
      this.supplierService.getSupplierDetai(this.limit, this.offset, id).then((res) => {
        console.log(res)
        this.items_detail = res.result.res_data;
        this.navCtrl.push(SupplierDetailPage, {
          items: this.items_detail,
        });
      })

  }

  doRefresh(refresh) {
    this.searchName = '';
    this.isSearch = false;
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
      this.supplierService.getSupplierList(this.limit, this.offset).then((res) => {
        console.log(res)
        refresh.complete();
        this.items = res.result.res_data;
      })
  }

  doInfinite(infiniteScroll) {
    if (this.isSearch == false)
    {
      if (this.isMoreData == true) {
      this.limit = 20;
      this.offset += 20;
        this.supplierService.getSupplierList(this.limit, this.offset).then((res) => {
          console.log(res)
          let item_data = [];
          if (res.result.res_data) {
            item_data = res.result.res_data;
            if (item_data.length >= 20) {
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
    }
    else {
      infiniteScroll.complete();
    }
  }
  else
  {
    infiniteScroll.complete();
  }
    
  }

  searchClick()
  {
    this.isSearch = true;
    this.supplierService.searchSupplier(this.searchName).then((res) => {
      this.items = res.result.res_data;
    })
  }
}
