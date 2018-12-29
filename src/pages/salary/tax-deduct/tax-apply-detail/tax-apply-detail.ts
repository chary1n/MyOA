import { Storage } from '@ionic/storage';
import { SalaryService } from './../../salaryService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaxApplyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tax-apply-detail',
  templateUrl: 'tax-apply-detail.html',
  providers: [SalaryService]
})
export class TaxApplyDetailPage {
  id
  data ;
  state
  year;
  total ;
  name
  department
  user_ava;
  extras;
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public navParams: NavParams, public salaryService: SalaryService) {
    this.id = this.navParams.get('id')

    this.storage.get('user')
    .then(res => {
      if (res) {
        var user = res.result.res_data
        console.log(user)
        this.name = user.name
        this.department = user.department
        this.user_ava = user.user_ava
      }
    });

  }

  ionViewWillEnter(){
    this.salaryService.get_detail(this.id).then(res=>{
      if(res.result.res_data){
        this.data = res.result.res_data
        this.state = this.data.rt_state
        this.year = this.data.rt_show_year
        this.total = this.data.rt_total
        this.extras = this.data.extras
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaxApplyDetailPage');
  }

  edit(){
    this.navCtrl.push('ApplyNewPage',{id:this.id})
  }

  goBack(){
    this.navCtrl.pop()
  }

}
