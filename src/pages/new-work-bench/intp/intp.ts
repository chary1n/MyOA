import { NavController, NavParams, IonicPage, ActionSheetController, Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IntpAutoService} from './intpAutoService'
import { IntpService} from './intpService'
/**
 * Generated class for the IntpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intp',
  templateUrl: 'intp.html',
  providers: [IntpService, IntpAutoService],
})
export class IntpPage {
  wait_approval_list = []
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public intpAutoService: IntpAutoService,
  public intpService: IntpService, public storage: Storage) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntpPage');
  }

  ionViewDidEnter(){
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.reload_data()
      })
  }

  reload_data(){
    this.wait_approval_list = []
    let body = {
      'user_id': this.user_id
    }
    this.intpService.get_total_approval_intp(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.wait_approval_list = res.result.res_data
      }
    })
  }

  itemSelected(event) {
    let type;
    let search_text;
    let data ;
    if (event.id == 2) {
      data = 'picking_line_ids.product_id'
      search_text = event.name.replace("搜 产品：", "")
    }
    else if (event.id == 1) {
      data = 'name'
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 3) {
      data = 'note'
      search_text = event.name.replace("搜 备注：", "")
    }
    else if (event.id == 4) {
      data = 'src_location_id'
      search_text = event.name.replace("搜 源位置：", "")
    }
    let body = {
      'data': data,
      'search_text': search_text,
      'user_id': this.user_id,
    }
    this.wait_approval_list = []
    this.intpService.search_intp(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.wait_approval_list = res.result.res_data
      }
    })
  }

  itemClearSelected(event){
    this.reload_data()
  }

  goBack(){
    this.navCtrl.pop()
  }

  approved_detail(item){
    this.navCtrl.push('IntpDetailPage',{
      item: item,
      user_id: this.user_id,
    })
  }

}
