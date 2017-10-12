import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the ApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
  providers: [CommonUseServices],
})
export class ApplyPage {
  applyList :any ;
  user ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService :CommonUseServices,public storage : Storage) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
    this.storage.get('user')
    .then(res => {
    });
  }

  getApplyList(limit,offset,id){
    this.commonService.getApplyList(offset,limit,id).then(res=>{
      if(res.result && res.result.res_code == 1){
        this.applyList = res.result.res_data
      }
    })
  }

}
