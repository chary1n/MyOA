import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierlistService } from './supplierlistService';
import { LoadingController } from 'ionic-angular';
import { SupplierDetailPage} from './../supplier-detail/supplier-detail'

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

  items : any;
  limit = 20 ;
  offset = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public supplierService :SupplierlistService , public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierListPage');
    let load = this.loadingCtrl.create({
      content: '加载中...',
      dismissOnPageChange: true
    });
    load.present().then(() => {
        this.supplierService.getSupplierList(this.limit,this.offset).then((res)=>{
       console.log(res)
       load.dismiss();
       this.items=res.result.res_data;
     })
    });
     
  }
  supplier_detail(id)
  {
    this.navCtrl.push(SupplierDetailPage,{
      id:id,
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the ev target
    // var val = ev.target.value;

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }
}
