import { NavController, NavParams, IonicPage, ActionSheetController, Content, Platform, ModalController, ToastController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { YearEndSalaryService} from './../yearEndSalaryService'
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the YearEndSalaryMePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-year-end-salary-me',
  templateUrl: 'year-end-salary-me.html',
  providers: [YearEndSalaryService],
})
export class YearEndSalaryMePage {
  wait_approval_list=[]
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public yearEndSalaryService: YearEndSalaryService,
    public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YearEndSalaryMePage');

    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        let body = {
          'uid': this.user_id,
        }
        this.yearEndSalaryService.get_me_allowance_jj(body).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data.data
          }
        })
      })
  }

  goBack() {
    this.navCtrl.pop()
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
    this.navCtrl.push('YearEndSalaryLineDetailPage', {
      'item': item,
    })
  }

}
