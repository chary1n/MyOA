import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';
import { ChangeBiaoQianAutoService} from './change-biaoqian-auto';

/**
 * Generated class for the ChangeBiaoqianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-biaoqian',
  templateUrl: 'change-biaoqian.html',
  providers:[GongDanService,ChangeBiaoQianAutoService]
})
export class ChangeBiaoqianPage {
  brand_select_ids = [];
  area_select_ids = [];
  cate_select_ids = [];
  brandList = [];
  areaList = [];
  cateList = [];
  allSelectList = [];
  frontPage
  gongdan_item
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongdanService:GongDanService,
    public changeBiaoQianAutoService:ChangeBiaoQianAutoService,public gongDanService:GongDanService,
    public toast:ToastController) {
      this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
      this.gongdan_item = this.navParams.get('gongdan_item')
      this.gongdanService.get_all_biaoqian().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        if (res.result.res_data.brand_list)
        {
          this.brandList = res.result.res_data.brand_list.res_data
        }
        if (res.result.res_data.area_list)
        {
          this.areaList = res.result.res_data.area_list.res_data
        }
        if (res.result.res_data.category_list)
        {
          this.cateList = res.result.res_data.category_list.res_data
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeBiaoqianPage');
  }

  cancel_biaoqian() {
    for (let items of this.brand_select_ids) {
              for (let items_in of this.brandList) {
                if (items == items_in.id){
                  items_in.ischeck = false
                  this.brandList[this.brandList.indexOf(items_in)] = items_in
                }
              }
          }
    for (let items of this.cate_select_ids) {
            for (let items_in of this.cateList) {
                if (items == items_in.id){
                  items_in.ischeck = false
                  this.cateList[this.cateList.indexOf(items_in)] = items_in
                  
                }
              }
          }  
    for (let items of this.area_select_ids) {
            for (let items_in of this.areaList) {
                if (items == items_in.id){
                  items_in.ischeck = false       
                  this.areaList[this.areaList.indexOf(items_in)] = items_in

                  
                }
              }
          }          
    this.cate_select_ids = []
    this.brand_select_ids = []
    this.area_select_ids = []
    this.allSelectList = []
  }

  confirm_biaoqian() {
      this.gongDanService.update_biaoqian(this.gongdan_item.work_order_id, this.cate_select_ids,this.brand_select_ids,this.area_select_ids).then(res => {
                            if (res.result.res_code == 1) {
                              Utils.toastButtom("修改标签成功", this.toast)
                              this.frontPage.data.need_fresh = true;
                              this.navCtrl.popTo(this.frontPage);
                            }

                          })
  }

  goBack(){
    // this.cancel_biaoqian()
    // this.frontPage.data.brand_list = this.brand_select_ids;
    // this.frontPage.data.area_list = this.area_select_ids;
    // this.frontPage.data.category_list = this.cate_select_ids
    this.frontPage.data.need_fresh = true;
    this.navCtrl.popTo(this.frontPage);
  }

  itemSelected(event){
    let search_type;
    let search_text;
    if (event.id == 1)
    {
      search_type = "brand"
      search_text = event.name.replace("搜 品牌：", "")
    }
    else if (event.id == 2)
    {
      search_type = "area"
      search_text = event.name.replace("搜 部门：", "")
    }
    else if (event.id == 3)
    {
      search_type = "category"
      search_text = event.name.replace("搜 产品：", "")
    }
    this.gongdanService.search_biaoqian(search_type,search_text).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.brandList = []
        this.areaList = []
        this.cateList = []
        if (res.result.res_data.type == "category")
        {
          this.cateList = res.result.res_data.data.res_data
          for (let items of this.cate_select_ids) {
            for (let items_in of this.cateList) {
                if (items == items_in.id){
                  items_in.ischeck = true
                  this.cateList[this.cateList.indexOf(items_in)] = items_in
                  
                }
              }
          }
        }
        if (res.result.res_data.type == "brand")
        {
          this.brandList = res.result.res_data.data.res_data
          for (let items of this.brand_select_ids) {
              for (let items_in of this.brandList) {
                if (items == items_in.id){
                  items_in.ischeck = true
                  this.brandList[this.brandList.indexOf(items_in)] = items_in
                }
              }
          }
        }
        if (res.result.res_data.type == "area")
        {
          this.areaList = res.result.res_data.data.res_data
          for (let items of this.area_select_ids) {
            for (let items_in of this.areaList) {
                if (items == items_in.id){
                  items_in.ischeck = true       
                  this.areaList[this.areaList.indexOf(items_in)] = items_in
                }
              }
          }
        }
      }
    })
  }

  all_tag(){
    this.brandList = []
    this.areaList = []
    this.cateList = []
    this.gongdanService.get_all_biaoqian().then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1) {
        if (res.result.res_data.brand_list)
        {
          this.brandList = res.result.res_data.brand_list.res_data
          for (let items of this.brand_select_ids) {
              for (let items_in of this.brandList) {
                if (items == items_in.id){
                  items_in.ischeck = true
                  this.brandList[this.brandList.indexOf(items_in)] = items_in
                }
              }
          }
        }
        if (res.result.res_data.area_list)
        {
          this.areaList = res.result.res_data.area_list.res_data
          for (let items of this.area_select_ids) {
            for (let items_in of this.areaList) {
                if (items == items_in.id){
                  items_in.ischeck = true       
                  this.areaList[this.areaList.indexOf(items_in)] = items_in
                }
              }
          }
          
        }
        if (res.result.res_data.category_list)
        {
          this.cateList = res.result.res_data.category_list.res_data
          for (let items of this.cate_select_ids) {
            for (let items_in of this.cateList) {
                if (items == items_in.id){
                  items_in.ischeck = true
                  this.cateList[this.cateList.indexOf(items_in)] = items_in
                  
                }
              }
          }
        }
      }
    })
  }

  chooseBrandItem(item){
    item.ischeck = !item.ischeck 
    if(item.ischeck){
      this.brand_select_ids.push(item.id)
      this.allSelectList.push(item)
    }else{
      this.brand_select_ids.splice(this.brand_select_ids.indexOf(item.id),1)
      this.allSelectList.splice(this.allSelectList.indexOf(item),1)  
    }
  }

  chooseAreaItem(item){
    item.ischeck = !item.ischeck 
    if(item.ischeck){
      this.area_select_ids.push(item.id)
      this.allSelectList.push(item)
    }else{
      this.area_select_ids.splice(this.area_select_ids.indexOf(item.id),1)
      this.allSelectList.splice(this.allSelectList.indexOf(item),1)  
    }
    console.log(this.areaList)
  }

  chooseCategoryItem(item){
    item.ischeck = !item.ischeck 
    if(item.ischeck){
      this.cate_select_ids.push(item.id)
      this.allSelectList.push(item)
    }else{
      this.cate_select_ids.splice(this.cate_select_ids.indexOf(item.id),1)
      this.allSelectList.splice(this.allSelectList.indexOf(item),1)  
    }
  }

}
