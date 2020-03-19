import { NavController, NavParams, IonicPage} from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { YearEndSalaryService} from './yearEndSalaryService'
/**
 * Generated class for the YearEndSalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-year-end-salary',
  templateUrl: 'year-end-salary.html',
  providers: [YearEndSalaryService]
})
export class YearEndSalaryPage {
  wait_approval_list=[]
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public yearEndSalaryService: YearEndSalaryService,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YearEndSalaryPage');

    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        let body = {
          'uid': this.user_id,
        }
        this.yearEndSalaryService.get_all_department_allowance(body).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data
          }
        })
      })
  }

  goBack (){
    this.navCtrl.pop()
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      let body = {
        'uid': this.user_id,
      }
      this.yearEndSalaryService.get_all_department_allowance(body).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.wait_approval_list = res.result.res_data
        }
      })
    }
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

  approved_detail(item){
    this.navCtrl.push('YearEndSalaryDetailPage', {
      'item': item,
      'user_id': this.user_id,
    })
  }

}
