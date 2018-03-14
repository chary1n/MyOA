import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { GongDanService } from '../../gongdanService';
import { CreateBiaoQianAutoService } from './biaoqian-auto'
import { Utils } from './../../../../../providers/Utils';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the BiaoqianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-biaoqian',
  templateUrl: 'biaoqian.html',
  providers: [GongDanService, CreateBiaoQianAutoService]
})
export class BiaoqianPage {
  list;
  brand_list;
  category_list;
  area_list;
  chooseList = [];
  brand_select_ids = [];
  area_select_ids = [];
  cate_select_ids = [];
  frontPage
  need_pop_reback
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public gongdanService: GongDanService, public createBiaoQianAutoService: CreateBiaoQianAutoService,
    public statusbar: StatusBar) {
    this.need_pop_reback = this.navParams.get('need_pop_reback')
    if (this.need_pop_reback) {
      this.frontPage = Utils.getViewController("RebackGongdanPage", navCtrl)
    }
    else {
      this.frontPage = Utils.getViewController("CreateGongdanPage", navCtrl)
    }

    this.gongdanService.get_all_biaoqian().then(res => {
      if (res.result && res.result.res_code == 1) {
        this.list = res.result.res_data
        this.brand_list = this.list.brand_list.res_data
        this.category_list = this.list.category_list.res_data
        this.area_list = this.list.area_list.res_data
        this.brand_select_ids = this.brand_list
        this.area_select_ids = this.area_list
        this.cate_select_ids = this.category_list
        for (let items of this.brand_select_ids) {
          for (let items_in of this.brand_list) {
            if (items == items_in.id) {
              this.chooseList.push(items_in)
              items_in.ischeck = true
              this.brand_list[this.brand_list.indexOf(items_in)] = items_in
            }
          }
        }

        for (let items of this.area_select_ids) {
          for (let items_in of this.area_list) {
            if (items == items_in.id) {
              this.chooseList.push(items_in)
              items_in.ischeck = true
              this.area_list[this.area_list.indexOf(items_in)] = items_in
            }
          }
        }
        for (let items of this.cate_select_ids) {
          for (let items_in of this.category_list) {
            if (items == items_in.id) {
              this.chooseList.push(items_in)
              items_in.ischeck = true
              this.category_list[this.category_list.indexOf(items_in)] = items_in
            }
          }
        }


      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiaoqianPage');
  }

  ionViewWillEnter() {
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  chooseBrandItem(item) {
    item.ischeck = !item.ischeck
    if (item.ischeck) {
      this.brand_select_ids.push(item.id)
      this.chooseList.push(item)
    } else {
      this.brand_select_ids.splice(this.brand_select_ids.indexOf(item.id), 1)
      this.chooseList.splice(this.chooseList.indexOf(item), 1)
    }
  }

  chooseAreaItem(item) {
    item.ischeck = !item.ischeck
    if (item.ischeck) {
      this.area_select_ids.push(item.id)
      this.chooseList.push(item)
    } else {
      this.area_select_ids.splice(this.area_select_ids.indexOf(item.id), 1)
      this.chooseList.splice(this.chooseList.indexOf(item), 1)
    }
  }

  chooseCategoryItem(item) {
    item.ischeck = !item.ischeck
    if (item.ischeck) {
      this.cate_select_ids.push(item.id)
      this.chooseList.push(item)
    } else {
      this.cate_select_ids.splice(this.cate_select_ids.indexOf(item.id), 1)
      this.chooseList.splice(this.chooseList.indexOf(item), 1)
    }
  }

  itemSelected(event) {
    let search_type;
    let search_text;
    if (event.id == 1) {
      search_type = "brand"
      search_text = event.name.replace("搜 品牌：", "")
    }
    else if (event.id == 2) {
      search_type = "area"
      search_text = event.name.replace("搜 部门：", "")
    }
    else if (event.id == 3) {
      search_type = "category"
      search_text = event.name.replace("搜 产品：", "")
    }
    this.gongdanService.search_biaoqian(search_type, search_text).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.brand_list = []
        this.area_list = []
        this.category_list = []
        if (res.result.res_data.type == "category") {
          this.category_list = res.result.res_data.data.res_data
          for (let items of this.cate_select_ids) {
            for (let items_in of this.category_list) {
              if (items == items_in.id) {
                items_in.ischeck = true
                this.category_list[this.category_list.indexOf(items_in)] = items_in

              }
            }
          }
        }
        if (res.result.res_data.type == "brand") {
          this.brand_list = res.result.res_data.data.res_data
          for (let items of this.brand_select_ids) {
            for (let items_in of this.brand_list) {
              if (items == items_in.id) {
                items_in.ischeck = true
                this.brand_list[this.brand_list.indexOf(items_in)] = items_in
              }
            }
          }
        }
        if (res.result.res_data.type == "area") {
          this.area_list = res.result.res_data.data.res_data
          for (let items of this.area_select_ids) {
            for (let items_in of this.area_list) {
              if (items == items_in.id) {
                items_in.ischeck = true
                this.area_list[this.area_list.indexOf(items_in)] = items_in
              }
            }
          }
        }
      }
    })
  }

  cancel_biaoqian() {
    for (let items of this.brand_select_ids) {
      for (let items_in of this.brand_list) {
        if (items == items_in.id) {
          items_in.ischeck = false
          this.brand_list[this.brand_list.indexOf(items_in)] = items_in
        }
      }
    }
    for (let items of this.cate_select_ids) {
      for (let items_in of this.category_list) {
        if (items == items_in.id) {
          items_in.ischeck = false
          this.category_list[this.category_list.indexOf(items_in)] = items_in

        }
      }
    }
    for (let items of this.area_select_ids) {
      for (let items_in of this.area_list) {
        if (items == items_in.id) {
          items_in.ischeck = false
          this.area_list[this.area_list.indexOf(items_in)] = items_in


        }
      }
    }
    this.cate_select_ids = []
    this.brand_select_ids = []
    this.area_select_ids = []
    this.chooseList = []
  }

  confirm_biaoqian() {
    this.frontPage.data.brand_list = this.brand_select_ids;
    this.frontPage.data.area_list = this.area_select_ids;
    this.frontPage.data.category_list = this.cate_select_ids
    this.frontPage.data.all_tag_list = this.chooseList
    this.navCtrl.popTo(this.frontPage);
  }

  goBack() {
    this.cancel_biaoqian()
    this.frontPage.data.brand_list = this.brand_select_ids;
    this.frontPage.data.area_list = this.area_select_ids;
    this.frontPage.data.category_list = this.cate_select_ids
    this.frontPage.data.all_tag_list = this.chooseList
    this.navCtrl.pop();
  }

  all_tag() {
    this.brand_list = []
    this.area_list = []
    this.category_list = []
    this.gongdanService.get_all_biaoqian().then(res => {
      console.log(res)
      if (res.result.res_data && res.result.res_code == 1) {
        if (res.result.res_data.brand_list) {
          this.brand_list = res.result.res_data.brand_list.res_data
          for (let items of this.brand_select_ids) {
            for (let items_in of this.brand_list) {
              if (items == items_in.id) {
                items_in.ischeck = true
                this.brand_list[this.brand_list.indexOf(items_in)] = items_in
              }
            }
          }
        }
        if (res.result.res_data.area_list) {
          this.area_list = res.result.res_data.area_list.res_data
          for (let items of this.area_select_ids) {
            for (let items_in of this.area_list) {
              if (items == items_in.id) {
                items_in.ischeck = true
                this.area_list[this.area_list.indexOf(items_in)] = items_in
              }
            }
          }

        }
        if (res.result.res_data.category_list) {
          this.category_list = res.result.res_data.category_list.res_data
          for (let items of this.cate_select_ids) {
            for (let items_in of this.category_list) {
              if (items == items_in.id) {
                items_in.ischeck = true
                this.category_list[this.category_list.indexOf(items_in)] = items_in
              }
            }
          }
        }
      }
    })
  }

}
