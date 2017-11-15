import { Utils } from './../../../../../providers/Utils';
import { CommonUseServices } from './../../../commonUseServices';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';

/**
 * Generated class for the ShengouItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shengou-item',
  templateUrl: 'shengou-item.html',
  providers: [CommonUseServices]
})
export class ShengouItemPage {
  employee_id;
  shengou_list;
  indexList=[];
  chooseList = [];
  mBaoxiaoApplyPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonUseServices) {
    this.employee_id = this.navParams.get("employee_id")
    this.mBaoxiaoApplyPage = Utils.getViewController("BaoxiaoApplyPage", navCtrl);
    this.commonService.get_shengou_item(this.employee_id).then(res => {
      console.log(res)
      if(res.result && res.result.res_code == 1){
        this.shengou_list = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShengouItemPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  save() {
    for(let i = 0 ; i<this.indexList.length;i++){
        this.chooseList.push(this.shengou_list[this.indexList[i]])
    }
    this.mBaoxiaoApplyPage.data.chooseList = this.chooseList
    this.navCtrl.pop()
  }

  checkChange(index){
    console.log(index)
    if(this.indexList.indexOf(index)==-1){
      this.indexList.push(index)
    }else{
      this.indexList.splice(this.indexList.indexOf(index),1)  
    }
  }
}
