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
  constructor(public navCtrl: NavController, public navParams: NavParams,public newProductionService:NewProductionService) {
    this.item = navParams.get('item')
    this.title = navParams.get('title')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreLevelListPage');
  }

  itemClick(item){
    if (item.child_id.length > 0)
    {
      this.newProductionService.search_product_category(null,item.id).then(res => {
       if (res.result && res.result.res_code == 1) {
            this.navCtrl.push('MoreLevelListPage',{
              item:res.result.res_data,
              title:item.name,
            })
       }
    })
  }
  else
  {
    this.newProductionService.get_production_detail(item.id).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('NewProductListPage',{
            item:res.result.res_data,
          })
        }
      })
  }
    
  }
}
