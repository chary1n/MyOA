import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';
import { GongDanAutoService} from './gongdan-search-auto'
import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';
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
  providers:[GongDanAutoService,GongDanService,DatePipe]
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
  has_data = false
  endDate_gongdan
  startDate_gongdan
  brand_ids = []
  area_ids = []
  category_ids = []
  page_issue_state
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongDanAutoService:GongDanAutoService,
    public gongdanService:GongDanService,public datePipe:DatePipe,public toastCtrl:ToastController,
    public datePicker:DatePicker) {
      this.endDate_gongdan = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    this.startDate_gongdan = this.datePipe.transform('2018-01-01', 'yyyy-MM-dd')
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

  ionViewDidEnter() {
    let need_load = false
    if (this.navParams.get('brand_list') && (this.navParams.get('brand_list').length || this.navParams.get('brand_list').length == 0)){
      this.brand_ids = this.navParams.get('brand_list')
      this.navParams.data.brand_list = false;
      need_load = true
    }
    if (this.navParams.get('area_list') && (this.navParams.get('area_list').length || this.navParams.get('area_list').length == 0)){
      this.area_ids = this.navParams.get('area_list')
      this.navParams.data.area_list = false;
      need_load = true
    }
    if (this.navParams.get('category_list') && (this.navParams.get('category_list').length || this.navParams.get('category_list').length == 0)){
      this.category_ids = this.navParams.get('category_list')
      this.navParams.data.category_list = false;
      need_load = true
    }
    if(need_load)
    {
      if (this.search_text){
        this.getDataList(this.page_issue_state)
      }
      
    }
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
    this.page_issue_state = state;
    if (!state){
       this.has_data = false
    }
   
    this.gongdanService.work_order_search(JSON.stringify({
      start_date: this.startDate_gongdan,
      end_date: this.datePipe.transform(new Date(new Date(this.endDate_gongdan).getTime() + 3600000 * 24), 'yyyy-MM-dd'),
      uid: HttpService.user_id,
      issue_state: state,
      search_type:this.search_type,
      search_text:this.search_text,
      category_ids: this.category_ids,
      brand_ids:this.brand_ids,
      area_ids:this.area_ids,
    })).then(res => {
      console.log(res)
      if (res.result.res_data) {
        for (let item of res.result.res_data) {
          this.dataList.push(item)
        }
      }
      if (!state)
      {
        if (this.dataList.length > 0){
        this.has_data = true
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

  clickMenu(){
    this.navCtrl.push('GongdanBiaoqianPage',{
      brand_ids:this.brand_ids,
      area_ids:this.area_ids,
      category_ids:this.category_ids,
      need_back_search:true,
    })
  }

  chooseStartDate_gongdan() {
    this.datePicker.show({
      date: new Date(this.startDate_gongdan),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.endDate_gongdan >= this.datePipe.transform(date, 'yyyy-MM-dd')) {
          this.startDate_gongdan = this.datePipe.transform(date, 'yyyy-MM-dd')
    this.getDataList(this.page_issue_state)
  
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  chooseEndDate_gongdan() {
    this.datePicker.show({
      date: new Date(this.endDate_gongdan),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.datePipe.transform(date, 'yyyy-MM-dd') >= this.startDate_gongdan) {
          this.endDate_gongdan = this.datePipe.transform(date, 'yyyy-MM-dd')
          // this.reload_statics()
    this.getDataList(this.page_issue_state)
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }
}
