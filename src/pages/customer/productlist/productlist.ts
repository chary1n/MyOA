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
        for (var item in this.dataArr) {
          this.arr.push("0");
        }
      }); 
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }

  insertUserToArray(i){
    if (this.arr[i] == "1")
    {
      this.arr[i] = "0"
    }
    else
    {
      this.arr[i] = "1";
    }
  }

  isCheck(i)
  {
    if (this.arr[i] == "0")
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
      if (this.arr[index] == "1")
      {
        series_selected.push(index);
      }
      index ++;
    }
    for (var i in series_selected) {
       series_ids.push(this.dataArr[i].series_id);
       series_names.push(this.dataArr[i].name);     
    }
    
    let self = this;
      this.items.series_ids = series_ids;
      this.items.series_names = series_names;
      self.editPage.item = this.items;
      self.navCtrl.popTo(self.editPage);
  }
  
}
