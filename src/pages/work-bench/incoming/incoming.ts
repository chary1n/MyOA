import { IncomingService } from './incomingService';
import { APK_DOWNLOAD } from './../../../providers/Constants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomingDetailPage} from './../incoming-detail/incoming-detail'

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
  providers: [IncomingService]
})
export class IncomingPage {
  
  items : any;
  limit = 20 ;
  offset = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      public incomingService :IncomingService) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomingPage');
     this.incomingService.getIncomingList(this.limit,this.offset).then((res)=>{
       console.log(res)
       this.items=res.result.res_data;
     })
  }

  doRefresh(refresh) {
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

  }

incoming_detail(){
}

}
