import { IncomingAutoService } from './incomingAutoService';
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
  providers: [IncomingService,IncomingAutoService]
})
export class IncomingPage {

  items: any;
  limit = 20;
  offset = 0;
  isMoreData = true;
  searchName:any;
  isSearch = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public incomingService: IncomingService,
    public  incomingAuto :IncomingAutoService) {
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad IncomingPage');
    // let loading = this.loadingCtrl.create({
    //   content: '加载中...'
    // });
    // loading.present().then(() => {
    //   this.incomingService.getIncomingList(this.limit, this.offset).then((res) => {
    //     console.log(res)
    //     loading.dismiss();
    //     this.items = res.result.res_data;
    //   })
    // });
  }

  ionViewWillEnter(){
      this.incomingService.getIncomingList(20, 0).then((res) => {
        console.log(res)
        this.items = res.result.res_data;
      })
  }

  doRefresh(refresh) {
    this.searchName = '';
    this.isSearch = false;
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
      this.incomingService.getIncomingList(this.limit, this.offset).then((res) => {
        console.log(res);
        refresh.complete();
        
        this.items = res.result.res_data;
      })
  }

  itemSelected(event) {
    let search_text;
    let data ;
    if (event.id == 1) {
      search_text = event.name.replace("搜 合作伙伴:", "")
    }
    else if (event.id == 2) {
      search_text = event.name.replace("搜 源单据:", "")
    }
    else if (event.id == 3) {
      search_text = event.name.replace("搜 产品:", "")
    }
    this.incomingService.searchIncoming(event.id,search_text).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.items = res.result.res_data ;
      }
    })
  }

  

  doInfinite(infiniteScroll) {
    if (this.isSearch == false)
    {
      if (this.isMoreData == true)
    {
      this.limit = 20;
      this.offset = this.offset + 20;

    // setTimeout(() => {
      this.incomingService.getIncomingList(this.limit, this.offset).then((res) => {
        console.log(res)
        let item_data = [];
        if(res.result.res_data)
        {
          item_data = res.result.res_data;
          if (item_data.length == 20)
          {
            this.isMoreData = true;
          }
          else
          {
            this.isMoreData = false;
          }
          for (let item of item_data) {
              this.items.push(item);
            } 
        }
        else
        {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    }
    else
    {
      infiniteScroll.complete();
    }
    }
    else
    {
      infiniteScroll.complete();
    }
  }

  incoming_detail(item) {
    this.navCtrl.push("IncomingDetailPage", {
      type: "incoming_detail",
      item: item,
      isPop:false 
    });
  }

  searchClick()
  {
    this.isSearch = true;
    this.incomingService.searchInComingList(this.searchName).then((res) => {
      this.items = res.result.res_data;
    })
   
  }

  swipeEvent(e) {
    alert('1');
  }

}
