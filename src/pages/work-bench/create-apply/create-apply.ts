import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
/**
 * Generated class for the CreateApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-apply',
  templateUrl: 'create-apply.html',
  providers: [CommonUseServices],
})
export class CreateApplyPage {
  dataBean : any;
  user_id;
  name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService :CommonUseServices,public storage : Storage) {
      this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        console.log(this.user_id); 
        this.getPaymentReminding(this.user_id)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateApplyPage');
    
  }

  getPaymentReminding(id){
      this.commonService.getPaymentReminding(id)
      .then(res => {
        console.log(res);
        this.dataBean = res.result.res_data;


        this.name = res.result.res_data.name;
      })
  }
}
