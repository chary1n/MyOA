import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';

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
})
export class BiaoqianPage {
  list ;
  brand_list ;
  category_list;
  area_list ;
  chooseList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.list =  this.navParams.get('list')
  this.brand_list =   this.list.brand_list.res_data
  this.category_list =   this.list.category_list.res_data
  this.area_list =   this.list.area_list.res_data
   console.log(this.list)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiaoqianPage');
  }


  chooseBrandItem(item){
    item.isCheck = !item.isCheck 
    if(item.isCheck){
      this.chooseList.push(item.name)
    }else{
      this.chooseList.splice(this.chooseList.indexOf(item.name),1)  
    }
  }

  chooseAreaItem(item){
    item.isCheck = !item.isCheck 
    if(item.isCheck){
      this.chooseList.push(item.name)
    }else{
      this.chooseList.splice(this.chooseList.indexOf(item.name),1)  
    }
  }

  chooseCategoryItem(item){
    item.isCheck = !item.isCheck 
    if(item.isCheck){
      this.chooseList.push(item.name)
    }else{
      this.chooseList.splice(this.chooseList.indexOf(item.name),1)  
    }
  }



}
