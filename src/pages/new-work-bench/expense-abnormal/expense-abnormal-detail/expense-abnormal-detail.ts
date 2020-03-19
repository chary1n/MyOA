import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Utils } from './../../../../providers/Utils';
import { ExpAbService } from './../expenseAbService'

/**
 * Generated class for the ExpenseAbnormalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-expense-abnormal-detail',
  templateUrl: 'expense-abnormal-detail.html',
  providers: [ExpAbService]
})
export class ExpenseAbnormalDetailPage {
  item
  constructor(public navCtrl: NavController, public navParams: NavParams, public expAbService: ExpAbService, ) {
    this.item = this.navParams.get('item')
    this.expAbService.get_expense_abnormal_detail({'expense_id': this.item.expense_id}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.item = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseAbnormalDetailPage');
  }

  goBack() {
    this.navCtrl.pop()
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
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
    if (item) {
      return parseFloat(item).toFixed(2)
    }
    else {
      return '0.00'
    }
  }

}
