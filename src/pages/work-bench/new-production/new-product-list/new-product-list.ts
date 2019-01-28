import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events, Slides, LoadingController } from 'ionic-angular';
import { NewProductionService } from './../new-productionService'
import { NewProductionAutoService } from './../new-production-auto'

/**
 * Generated class for the NewProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-product-list',
  templateUrl: 'new-product-list.html',
  providers: [NewProductionService, NewProductionAutoService],
})
export class NewProductListPage {
  item = [];
  origin_arr = [];
  can_search_more = false
  can_load_more = true
  tag_1_id = 0
  tag_2_id = 0
  tag_3_id = 0
  tag_4_id = 0
  limit = 20
  offset = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public newProductionService: NewProductionService,
    public newProductionAutoService: NewProductionAutoService, public loading: LoadingController) {
    this.item = navParams.get('item')
    this.can_search_more = navParams.get('can_search_more')
    if (this.can_search_more) {
      this.tag_1_id = navParams.get('tag_1_id')
      this.tag_2_id = navParams.get('tag_2_id')
      this.tag_3_id = navParams.get('tag_3_id')
      this.tag_4_id = navParams.get('tag_4_id')
    }
    if (this.item) {
      this.origin_arr = this.item.concat()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductListPage');
  }

  showText(item) {
    return "[" + item.default_code + "]" + item.name;
  }

  showSecondText(item) {
    return "内部类别：" + item.categ_id;
  }

  showThirdText(item) {
    return "库存／预测／在产：" + item.qty_available + "/" + item.virtual_qty + "/" + item.outgoing_qty
  }

  itemClick(items) {
    this.navCtrl.push('NewProductDetailPageN', {
      item: items,
    })
  }

  itemSelected(event) {
    if (this.can_search_more) {
      this.item = []
      this.can_load_more = false

      let type;
      let search_text;
      if (event.id == 1) {
        type = "name";
        search_text = event.name.replace("搜 产品名：", "")
      }
      else if (event.id == 2) {
        type = 'default_code'
        search_text = event.name.replace("搜 料号：", "")
      }
      let body = {
        'tag_1_id': this.tag_1_id,
        'tag_2_id': this.tag_2_id,
        'tag_3_id': this.tag_3_id,
        'tag_4_id': this.tag_4_id,
        'type': type,
        'search_text': search_text,
      }

      this.newProductionService.search_product_with_tag(body).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.item = res.result.res_data
        }
      })


    }
    else {
      let loading = this.loading.create({
        enableBackdropDismiss: true
      });
      loading.present();

      if (event.id == 1) {
        let search_text = event.name.replace("搜 产品名：", "")
        let result_arr = [];
        for (let data of this.origin_arr) {
          if ((new RegExp(search_text).test(data.name)) || search_text == data.name) {
            result_arr.push(data);
          }
        }
        this.item = result_arr;
      }
      else {
        let search_text = event.name.replace("搜 料号：", "")
        let result_arr = [];
        for (let data of this.origin_arr) {
          if ((new RegExp(search_text).test(data.default_code)) || search_text == data.default_code) {
            result_arr.push(data);
          }
        }
        this.item = result_arr;
      }
      loading.dismiss();
    }
  }

  doRefresh(event) {
    if (this.can_search_more) {
      this.can_load_more = true
      this.limit = 20
      this.offset = 0
      let body_tag = {
        'tag_1_id': this.tag_1_id,
        'tag_2_id': this.tag_2_id,
        'tag_3_id': this.tag_3_id,
        'tag_4_id': this.tag_4_id,
        'limit': this.limit,
        'offset': this.offset,
      }
      event.complete()
      this.newProductionService.get_product_by_tag(body_tag).then(res_tag => {
        if (res_tag.result && res_tag.result.res_code == 1) {
          this.item = res_tag.result.res_data
        }
      })
    }
    else {
      this.item = this.origin_arr
      event.complete();
    }
  }

  goBack() {
    this.navCtrl.pop()
  }

  doInfinite(event) {
    if (this.can_load_more) {
      this.offset += 20
      let body_tag = {
        'tag_1_id': this.tag_1_id,
        'tag_2_id': this.tag_2_id,
        'tag_3_id': this.tag_3_id,
        'tag_4_id': this.tag_4_id,
        'limit': this.limit,
        'offset': this.offset,
      }
      this.newProductionService.get_product_by_tag(body_tag).then(res => {
        event.complete()
        if (res.result.res_data && res.result.res_code == 1) {
          if (res.result.res_data.length == 20) {
            this.can_load_more = true
          }
          else {
            this.can_load_more = false
          }
          for (let item of res.result.res_data) {
            this.item.push(item)
          }
        }
        else {
          this.can_load_more = false
        }
      })
    }
  }
  itemClearSelected($event) {
    if (this.can_search_more) {
      this.can_load_more = true
      this.limit = 20
      this.offset = 0
      let body_tag = {
        'tag_1_id': this.tag_1_id,
        'tag_2_id': this.tag_2_id,
        'tag_3_id': this.tag_3_id,
        'tag_4_id': this.tag_4_id,
        'limit': this.limit,
        'offset': this.offset,
      }
      this.newProductionService.get_product_by_tag(body_tag).then(res_tag => {
        if (res_tag.result && res_tag.result.res_code == 1) {
          this.item = res_tag.result.res_data
        }
      })
    }
    else {
      this.item = this.origin_arr
    }

  }

}
