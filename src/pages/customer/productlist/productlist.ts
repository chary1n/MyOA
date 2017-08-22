import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseService} from './../choose/ChooseService';
import { Utils } from './../../../providers/Utils';
import { EditCardPage } from './../edit-card/edit-card';

/**
 * Generated class for the ProductlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
  providers: [ChooseService],
})
export class ProductlistPage {
  dataArr:any;
  items:any;
  arr:any = [];
  editPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public chooseService:ChooseService) {
    this.editPage = Utils.getViewController("EditCardPage", navCtrl)
    this.items = this.navParams.get('items');
    this.chooseService.get_product_series().then((res) => {
        console.log(res);
        this.dataArr = res.result;
       
        for (var item of this.dataArr) {
           let obj = {
              name:'',
              id:'',
              isCheck:'',
           }
           obj.name = item.name;
           obj.id = item.series_id;
           obj.isCheck = "0";
          this.arr.push(obj);
        }
      }); 
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }

  insertUserToArray(item){
    if (item.isCheck == "1")
    {
      item.isCheck = "0"
    }
    else
    {
      item.isCheck = "1";
    }
    let i = 0;
    for (var items of this.arr) {
      i ++;
      if (items.id == item.id)
      {
        this.arr[i - 1] = item;
        break;
      }
    }
  }

  isCheck(item)
  {
    if (item.isCheck == "0")
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  save_series(){
    let series_selected = [];
    let series_ids = [];
    let series_names = [];
    let index = 0;
    for (var item of this.arr) {
      if (item.isCheck == "1")
      {
        // alert()
        series_selected.push(item);
      }
      
      index ++;
    }
    for (var detail of series_selected) {
       series_ids.push(detail.id);
       series_names.push(detail.name);     
    }
    
    // alert(series_ids);
    // alert(series_names);
    let self = this;
      this.items.series_ids = series_ids;
      this.items.series_names = series_names;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
  }
  
}
