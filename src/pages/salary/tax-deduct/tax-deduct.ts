import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { SalaryService } from '../salaryService';

/**
 * Generated class for the TaxDeductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tax-deduct',
  templateUrl: 'tax-deduct.html',
  providers: [SalaryService]
})
export class TaxDeductPage {
  applyList = []

  constructor(public navCtrl: NavController, public navParams: NavParams,public salaryService:SalaryService) {
   
  }

  ionViewWillEnter(){
    this.salaryService.get_list().then(res=>{
      if(res.result.res_data){
        this.applyList = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxDeductPage');
  }

  apply(){
    this.navCtrl.push('ApplyNewPage')
  }

  detail(id){
    this.navCtrl.push('TaxApplyDetailPage',{id:id})
  }


  goBack(){
    this.navCtrl.pop()
  }
}
