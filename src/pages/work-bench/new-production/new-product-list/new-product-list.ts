import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,Slides,LoadingController } from 'ionic-angular';
import { NewProductionService} from './../new-productionService'
import { NewProductionAutoService} from './../new-production-auto'

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
  providers:[NewProductionService,NewProductionAutoService],
})
export class NewProductListPage {
  item;
  origin_arr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public newProductionService:NewProductionService,
  public newProductionAutoService:NewProductionAutoService,public loading:LoadingController) {
    this.item = navParams.get('item')
    if (this.item)
    {
      this.origin_arr = this.item.concat()
    }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductListPage');
  }

  showText(item){
    return "[" + item.default_code + "]" + item.name;
  }

  showSecondText(item){
    return "内部类别：" + item.categ_id;
  }

  showThirdText(item){
    return "库存／预测／在产：" + item.qty_available + "/" + item.virtual_qty + "/" + item.outgoing_qty
  }

  itemClick(items){
      this.navCtrl.push('NewProductDetailPage',{
        item:items,
      }) 
  }

  itemSelected(event){
    let loading = this.loading.create({  
      enableBackdropDismiss: true
    });  
    loading.present();  
     
    if (event.id == 1)
    {
       let search_text = event.name.replace("搜 产品名：", "")
       let result_arr = [];
       for (let data of this.origin_arr) {
          if ((new RegExp(search_text).test(data.name)) || search_text == data.name)
          {
            result_arr.push(data);
          }
       }
       this.item = result_arr;
    }
    else
    {
      let search_text = event.name.replace("搜 料号：", "")
      let result_arr = [];
       for (let data of this.origin_arr) {
          if ((new RegExp(search_text).test(data.default_code)) || search_text == data.default_code)
          {
            result_arr.push(data);
          }
       }
       this.item = result_arr;
    }
    loading.dismiss();
  }
  

}
