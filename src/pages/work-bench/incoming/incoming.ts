// import { IncomingService } from './incomingService';
import { APK_DOWNLOAD } from './../../../providers/Constants';
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
// =======
//   providers: [IncomingService]
// })
// export class IncomingPage {
  
//   items : any;
//   limit = 20 ;
//   offset = 0 ;
//   constructor(public navCtrl: NavController, public navParams: NavParams,
//       public incomingService :IncomingService) {
// >>>>>>> 647901ff4eb547d4a02fab3fae2279ddd69f96fa
//   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomingPage');
// <<<<<<< HEAD
    this.incomingService.getStockList(0,1,'validate',20,0);
// =======
//     this.incomingService.getIncomingList(this.limit,this.offset).then((res)=>{
//       console.log(res)
//       this.items=res.result.res_data;
//     })
// >>>>>>> 647901ff4eb547d4a02fab3fae2279ddd69f96fa
//   }

  doRefresh(refresh) {
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

  }



}
