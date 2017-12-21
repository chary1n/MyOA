import { SalesSearvice } from './../salesService';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

/**
 * Generated class for the JiaohuoListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-jiaohuo-list',
  templateUrl: 'jiaohuo-list.html',
  providers: [SalesSearvice]
})
export class JiaohuoListPage {
  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public salesSearvice: SalesSearvice) {
    let id = this.navParams.get("id")
    this.salesSearvice.getSalesOrderDetail(id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.items = res.result.res_data.picking_ids;
        console.log(this.items)
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JiaohuoListPage');
  }

  changeState(state) {
    if (state == "draft") {
      return '草稿'
    } else if (state == "partially_available") {
      return '部分可用'
    } else if (state == "confirmed") {
      return '等待可用'
    } else if (state == "assigned") {
      return '可用'
    } else if (state == "done") {
      return '完成'
    }else if (state == "cancel") {
      return '取消'
    } else {
      return state
    }
  }
  jiaohuoDetail(item) {
    this.navCtrl.push("JiaohuoDetailPage",{
      item:item
    })
  }

  viewWuliu(item) {
      this.navCtrl.push("WuliuDetailPage",{
        'item': item
      })
  }
}
