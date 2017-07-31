import { IncomingService } from './incomingService';
import { APK_DOWNLOAD } from './../../../providers/Constants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomingDetailPage } from './../incoming-detail/incoming-detail'
import { Loading, LoadingController } from 'ionic-angular';
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

  items: any;
  limit = 20;
  offset = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public incomingService: IncomingService, public loadingCtrl: LoadingController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomingPage');
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.incomingService.getIncomingList(this.limit, this.offset).then((res) => {
        console.log(res)
        loading.dismiss();
        this.items = res.result.res_data;
      })
    });
  }

  doRefresh(refresh) {
    this.limit = 20;
    this.offset = 0;
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present().then(() => {
      this.incomingService.getIncomingList(this.limit, this.offset).then((res) => {
        console.log(res)
        loading.dismiss();
        this.items = res.result.res_data;
      })
    });
  }

  doInfinite(infiniteScroll) {
    // alert('123');
    infiniteScroll.complete();
  }

  incoming_detail(item) {
    this.navCtrl.push(IncomingDetailPage, {
      item: item,
    });
  }

}
