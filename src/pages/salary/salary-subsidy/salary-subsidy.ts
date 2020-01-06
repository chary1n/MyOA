import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SalaryService } from '../salaryService'
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SalarySubsidyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salary-subsidy',
  templateUrl: 'salary-subsidy.html',
  providers: [SalaryService],
})
export class SalarySubsidyPage {
  user_id;
  wait_approval_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public salaryService: SalaryService,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalarySubsidyPage');
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.reload_data()
      })
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.reload_data()
    }
  }

  goBack(){
    this.navCtrl.pop()
  }

  doRefresh(refresh){
    this.reload_data()
    refresh.complete()
  }

  reload_data(){
    let body = {
      'uid': this.user_id,
    }
    this.salaryService.get_approval_bt(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
      }
    })
  }

  approved_detail(item){
    this.navCtrl.push('SalarySubsidyDetailPage', {
      'item': item,
      'user_id': this.user_id,
    })
  }

  fmoney(s, n)   
  {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1].substr(0,2);   
   let t = ""; 
   let i;  
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   
   return t.split("").reverse().join("") + "." + r;   
  } 

  transInt(item){
    return parseFloat(item).toFixed(2)
  }

}
