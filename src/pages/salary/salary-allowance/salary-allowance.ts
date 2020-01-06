import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SalaryService } from '../salaryService'
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SalaryAllowancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-salary-allowance',
  templateUrl: 'salary-allowance.html',
  providers: [SalaryService],
})
export class SalaryAllowancePage {
  user_id;
  wait_approval_list = []
  type;
  title
  constructor(public navCtrl: NavController, public navParams: NavParams, public salaryService: SalaryService,
    public storage: Storage) {
      this.type = this.navParams.get('type')
      if (this.type == '1'){
        this.title = '绩效奖'
      }
      else{
        this.title = '提成'
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryAllowancePage');

    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        let body = {
          'uid': this.user_id,
          'type': this.type,
        }
        this.salaryService.get_approval_tc(body).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data
          }
        })
      })
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      let body = {
        'uid': this.user_id,
        'type': this.type,
      }
      this.salaryService.get_approval_tc(body).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.wait_approval_list = res.result.res_data
        }
      })
    }
  }

  goBack() {
    this.navCtrl.pop()
  }

  doRefresh(refresh) {
    this.wait_approval_list = []
    let body = {
      'uid': this.user_id,
      'type': this.type,
    }
    this.salaryService.get_approval_tc(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
      }
      refresh.complete()
    })
  }

  approved_detail(item){
    this.navCtrl.push('SalaryAllowanceDetailPage', {
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
