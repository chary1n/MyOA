import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService} from './../baobiaoService'
import { HttpService } from './../../../../providers/HttpService';
declare let cordova: any;

/**
 * Generated class for the BaobiaoDetailLinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-baobiao-detail-line',
  templateUrl: 'baobiao-detail-line.html',
  providers: [BaoBiaoService],
})
export class BaobiaoDetailLinePage {
  user_id
  type = 'enter'
  data_arr = []
  limit = 20
  offset = 0
  account_id

  header_name
  header_amount
  header_type

  date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public baoBiaoService:BaoBiaoService) {
    this.user_id = this.navParams.get('user_id')
    this.type = this.navParams.get('type')
    this.account_id = this.navParams.get('account_id')
    this.header_name = this.navParams.get('header_name')
    this.header_amount = this.navParams.get('header_amount')
    this.header_type = this.navParams.get('header_type')
    this.date = this.navParams.get('date')
    this.reload_data(null)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaobiaoDetailLinePage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  doRefresh(refresh) {
    this.limit = 20
    this.offset = 0
    this.reload_data(refresh)
  }

  doInfinite(infiniteScroll) {
  }

  reload_data(refresh){
    let body = {
      'type': this.type,
      'limit': this.limit,
      'offset': this.offset,
      'date': this.date,
    }
    if (this.account_id){
      body['account_id'] = this.account_id
    }
    this.baoBiaoService.get_today_data(body).then(res => {
      if (refresh){
        refresh.complete()
      }
      if (res.result.res_code == 1 && res.result.res_data){
        this.data_arr = res.result.res_data
      }
    })
  }

  item_detail(item){
    this.navCtrl.push('CustInDetailPage', {
      user_id: HttpService.user_id,
      item: item,
    })
  }

  fmoney(s, n)   
  {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1].substr(0,2);   
   let t = ""; 
   let i;  
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   
   return t.split("").reverse().join("") + "." + r;   
  } 

  transInt(item){
    return parseFloat(item).toFixed(2)
  }

}
