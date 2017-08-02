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
  constructor(public navCtrl: NavController, public navParams: NavParams, public supplierService: SupplierlistService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierListPage');
    let load = this.loadingCtrl.create({
      content: '加载中...',
      dismissOnPageChange: true
    });
    load.present().then(() => {
      this.supplierService.getSupplierList(this.limit, this.offset).then((res) => {
        console.log(res)
        load.dismiss();
        this.items = res.result.res_data;
      })
    });

  }
  supplier_detail(id) {
    let load = this.loadingCtrl.create({
      // content: '加载中...',
      // dismissOnPageChange: true
    });
    load.present().then(() => {
      this.supplierService.getSupplierDetai(this.limit, this.offset, id).then((res) => {
        console.log(res)
        load.dismiss();
        this.items_detail = res.result.res_data;
        this.navCtrl.push(SupplierDetailPage, {
          items: this.items_detail,
        });
      })
    });



  }

  doRefresh(refresh) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.supplierService.getSupplierList(this.limit, this.offset).then((res) => {
        console.log(res)
        loading.dismiss();
        refresh.complete();
        this.items = res.result.res_data;
      })
    });
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset += 20;
      let loading = this.loadingCtrl.create({
        content: '加载中...'
      });

      loading.present().then(() => {
        this.supplierService.getSupplierList(this.limit, this.offset).then((res) => {
          console.log(res)
          loading.dismiss();
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
      });
    }
    else {
      infiniteScroll.complete();
    }
  }

  getItems(ev) {

  }
}
