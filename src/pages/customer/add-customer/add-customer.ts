import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage';
/**
 * Generated class for the AddCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  company_name:any;
  country:any;
  come_from:any;
  qudao:any;
  team:any;
  people:any;
  tips:any;
  products:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
    this.company_name = '苏州麦田科技有限公司';
    this.country = '请选择 >';
    this.come_from = '请选择 >';
    this.qudao = '请选择 >';  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
    this.storage.get('user')
      .then(res => {
        console.log(res);
         this.team = res.result.res_data.department;
         this.people = res.result.res_data.name;
      });
    
   
  }

}
