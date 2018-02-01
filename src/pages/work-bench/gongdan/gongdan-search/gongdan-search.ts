import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';
import { GongDanAutoService} from './gongdan-search-auto'
/**
 * Generated class for the GongdanSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-search',
  templateUrl: 'gongdan-search.html',
  providers:[GongDanAutoService,GongDanService]
})
export class GongdanSearchPage {
  dataList = []
  biaoqianList
  inner_type
  unacceptTitle = "待受理";
  unassignTitle = "待验收";
  processTitle = "受理中";
  search_type
  search_text
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongDanAutoService:GongDanAutoService,
    public gongdanService:GongDanService) {
      this.gongdanService.get_all_biaoqian().then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1)
      {
        this.biaoqianList = res.result.res_data.res_data;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanSearchPage');
  }

  itemSelected(event){
    this.dataList = []
    let search_text;
    let search_type;
    if (event.id == 1){
      search_text = event.name.replace("搜 申请人：", "")
      search_type = "write_uid"
    }
    else if (event.id == 2){
      search_text = event.name.replace("搜 受理人：", "")
      search_type = "assign_uid"
    }
    else if (event.id == 3){
      search_text = event.name.replace("搜 标题：", "")
      search_type = "name"
    }
    this.search_text = search_text
    this.search_type = search_type
    // this.gongdanService.search_gongdan(search_text,search_type).then(res => {
    //     if (res.result.res_data) {
    //     for (let item of res.result.res_data) {
    //       this.dataList.push(item)
    //     }
    //   }
    // })
    this.inner_type = "all"
    this.getDataList(null)
  }

  gongdanDetail(item){
    this.gongdanService.getGongdanDetail(item.work_order_id).then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1) {
        this.navCtrl.push('GongdanDetailPage', {
          items: res.result.res_data,
          biaoqian_list:this.biaoqianList,
        })
      }
    })
  }

  changeState(item) {
    let state_str = "";
    if (item == "unaccept") {
      state_str = "等待受理"
    }
    else if (item == "process") {
      state_str = "受理中"
    }
    else if (item == "check"){
      state_str = "待验收"
    }
    else if (item == "done"){
      state_str = "已完成"
    }
    else if (item == "draft"){
      state_str = "草稿"
    }
    return state_str
  }

  getDataList(state) {
    this.dataList = [];
    // this.page_issue_state = state;
    
    this.gongdanService.work_order_search(JSON.stringify({
      uid: HttpService.user_id,
      issue_state: state,
      search_type:this.search_type,
      search_text:this.search_text,
      // tag_ids: this.biaoqian_select_ids,
    })).then(res => {
      console.log(res)
      if (res.result.res_data) {
        for (let item of res.result.res_data) {
          this.dataList.push(item)
        }
      }
    })

    this.reload_statics()
  }

  reload_statics(){
    this.gongdanService.work_order_statistics_search(null,null,[],this.search_type,this.search_text).then(res => {
      console.log(res)
      if (res.result.res_data) {
        if (res.result.res_data.unaccept) {
          this.unacceptTitle = "待受理" + " (" + res.result.res_data.unaccept + ")";
        }
        else {
          this.unacceptTitle = "待受理"
        }
        if (res.result.res_data.check) {
          this.unassignTitle = "待验收" + " (" + res.result.res_data.check + ")";
        }
        else {
          this.unassignTitle = "待验收"
        }
        if (res.result.res_data.process) {
          this.processTitle = "受理中" + " (" + res.result.res_data.process + ")";
        }
        else {
          this.processTitle = "受理中"
        }
      }
      else
      {
        this.unacceptTitle = "待受理"
        this.unassignTitle = "待验收"
        this.processTitle = "受理中"
      }
    })
  }

   click_all(){
    this.inner_type = "all"
    this.allClick()
  }

  click_one(){
    this.inner_type = "first"
    this.unacceptClick()
  }

  click_two(){
    this.inner_type = "second"
    this.processClick()
  }

  click_three(){
    this.inner_type = "third"
    this.unassignClick()
  }

  unacceptClick() {
    this.getDataList("unaccept")
  }

  processClick() {
    this.getDataList("process")
  }

  unassignClick() {
    this.getDataList("check")
  }

  allClick(){
    this.getDataList(null)
  }

  clickback(){
    this.navCtrl.pop()
  }
}
