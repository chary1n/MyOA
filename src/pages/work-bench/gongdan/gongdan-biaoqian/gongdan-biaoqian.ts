import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';
import { BiaoQianAutoService} from './gongdan-biaoqian-auto';
/**
 * Generated class for the GongdanBiaoqianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-biaoqian',
  templateUrl: 'gongdan-biaoqian.html',
  providers:[GongDanService,BiaoQianAutoService],
})
export class GongdanBiaoqianPage {
  brand_select_ids = [];
  area_select_ids = [];
  cate_select_ids = [];
  brandList = [];
  areaList = [];
  cateList = [];
  allSelectList = [];
  frontPage
  need_back_search
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongdanService:GongDanService,
    public biaoQianAutoService:BiaoQianAutoService,public statusbar:StatusBar) {
    this.need_back_search = this.navParams.get('need_back_search')
    if (this.need_back_search)
    {
      this.frontPage = Utils.getViewController("GongdanSearchPage", navCtrl)
    }
    else
    {
      this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
    }
    this.brand_select_ids =  this.navParams.get('brand_ids')
    this.area_select_ids = this.navParams.get('area_ids')
    this.cate_select_ids = this.navParams.get('category_ids')
    console.log(this.cate_select_ids)
    
    this.gongdanService.get_all_biaoqian().then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        if (res.result.res_data.brand_list)
        {
          this.brandList = res.result.res_data.brand_list.res_data
          for (let items of this.brand_select_ids) {
              for (let items_in of this.brandList) {
                if (items == items_in.id){
                  this.allSelectList.push(items_in)
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
                  this.allSelectList.push(items_in)
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
                  this.allSelectList.push(items_in)
                  items_in.ischeck = true
                  this.cateList[this.cateList.indexOf(items_in)] = items_in
                }
              }
          }
        }
      }
    })
  }

  ionViewWillEnter() {
     this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanBiaoqianPage');
  }

  clickbrand(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.brand_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.brand_select_ids.push(item.id)
      this.allSelectList.push(item)
    }
    else {
      this.brand_select_ids.splice(index - 1, 1)
      let index_biaoqian = 0
      for (let biaoqian of this.allSelectList) {
      index_biaoqian++
      if (biaoqian.name == item.name) {
        this.allSelectList.splice(index_biaoqian - 1,1)
        break
      }
    }
    }
  }

  clickarea(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.area_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.area_select_ids.push(item.id)
      this.allSelectList.push(item)
    }
    else {
      this.area_select_ids.splice(index - 1, 1)
      let index_biaoqian = 0
      for (let biaoqian of this.allSelectList) {
      index_biaoqian++
      if (biaoqian.name == item.name) {
        this.allSelectList.splice(index_biaoqian - 1,1)
        break
      }
    }
    }
  }

  clickcate(item) {
    let is_has = false
    let index = 0
    for (let biaoqian of this.cate_select_ids) {
      index++
      if (biaoqian == item.id) {
        is_has = true
        break
      }
    }
    if (!is_has) {
      this.cate_select_ids.push(item.id)
      this.allSelectList.push(item)
    }
    else {
      this.cate_select_ids.splice(index - 1, 1)
      let index_biaoqian = 0
      for (let biaoqian of this.allSelectList) {
      index_biaoqian++
      if (biaoqian.name == item.name) {
        this.allSelectList.splice(index_biaoqian - 1,1)
        break
      }
    }
    }
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
    this.frontPage.data.brand_list = this.brand_select_ids;
    this.frontPage.data.area_list = this.area_select_ids;
    this.frontPage.data.category_list = this.cate_select_ids
    this.navCtrl.popTo(this.frontPage);
  }

  isChooseBrand(item) {
    let isChoose = false;
    for (let biaoqian of this.brand_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }
  isChooseArea(item) {
    let isChoose = false;
    for (let biaoqian of this.area_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }

  isChooseCate(item) {
    let isChoose = false;
    for (let biaoqian of this.cate_select_ids) {
      if (biaoqian == item.id) {
        isChoose = true
      }
    }
    return isChoose
  }

  goBack(){
    this.cancel_biaoqian()
    this.frontPage.data.brand_list = this.brand_select_ids;
    this.frontPage.data.area_list = this.area_select_ids;
    this.frontPage.data.category_list = this.cate_select_ids
    this.navCtrl.pop();
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

  clearValue(show_clean){
    console.log(show_clean)
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
