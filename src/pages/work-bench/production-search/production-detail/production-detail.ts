// import { BomPage } from './bom/bom';
// import { WarehouseMovePage } from './warehouse-move/warehouse-move';
// import { ContactPersonPageModule } from './../../../contact-person/contact-person.module';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-detail',
  templateUrl: 'production-detail.html',
})
export class ProductionDetailPage {
  item ;
  imgRes ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.item =  navParams.get("item")
     console.log(this.item)
     this.imgRes = this.item.image ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionDetailPage');
  }

  warehouseMobile(){
    this.navCtrl.push('WarehouseMovePage',{item:this.item})
  }

  clickBOM(){
    this.navCtrl.push('BomPage',{item:this.item})
  }

}
