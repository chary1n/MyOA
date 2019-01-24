import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,Slides } from 'ionic-angular';
import { NewProductionService} from './../new-productionService'

/**
 * Generated class for the MoreLevelListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-more-level-list',
  templateUrl: 'more-level-list.html',
  providers:[NewProductionService],
})
export class MoreLevelListPage {
  item;
  title;
  tag_1_id = 0
  tag_2_id = 0
  tag_3_id = 0
  tag_4_id = 0
  constructor(public navCtrl: NavController, public navParams: NavParams,public newProductionService:NewProductionService) {
    this.item = navParams.get('item')
    this.title = navParams.get('title')
    this.tag_1_id = navParams.get('tag_1_id')
    this.tag_2_id = navParams.get('tag_2_id')
    this.tag_3_id = navParams.get('tag_3_id')
    this.tag_4_id = navParams.get('tag_4_id')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreLevelListPage');
  }

  itemClick(item){
  //   if (item.child_id.length > 0)
  //   {
  //     this.newProductionService.search_product_category(null,item.id).then(res => {
  //      if (res.result && res.result.res_code == 1) {
  //           this.navCtrl.push('MoreLevelListPage',{
  //             item:res.result.res_data,
  //             title:item.name,
  //           })
  //      }
  //   })
  // }
  // else
  // {
  //   this.newProductionService.get_production_detail(item.id).then(res => {
  //       if (res.result && res.result.res_code == 1) {
  //         this.navCtrl.push('NewProductListPage',{
  //           item:res.result.res_data,
  //         })
  //       }
  //     })
  // }
  this.tag_4_id = item.id
    let body_tag = {
            'tag_1_id': this.tag_1_id,
            'tag_2_id': this.tag_2_id,
            'tag_3_id': this.tag_3_id,
            'tag_4_id': this.tag_4_id,
            'limit': 20,
            'offset': 0,
          }
          this.newProductionService.get_product_by_tag(body_tag).then(res_tag => {
            if (res_tag.result && res_tag.result.res_code == 1) {
              this.navCtrl.push('NewProductListPage', {
                item: res_tag.result.res_data,
                tag_1_id: this.tag_1_id,
                tag_2_id: this.tag_2_id,
                tag_3_id: this.tag_3_id,
                tag_4_id: this.tag_4_id,
                can_search_more: true,
              })
            }
          })
}

goBack(){
  this.navCtrl.pop()
}
}
