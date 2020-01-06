import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { SalaryService } from '../../salaryService'
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the SalaryContractDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage() 
@Component({
  selector: 'page-salary-contract-detail',
  templateUrl: 'salary-contract-detail.html',
  providers: [SalaryService],
})
export class SalaryContractDetailPage {
  user_id
  item
  constructor(public navCtrl: NavController, public navParams: NavParams, public salaryService: SalaryService,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.item = this.navParams.get('item')
    this.user_id = this.navParams.get('user_id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryContractDetailPage');
  }

  changeState(state) {
    if (state == 'confirm') {
      return "员工确认";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'account') {
      return "财务确认";
    }
    else {
      return state;
    }
  }

  goBack() {
    this.navCtrl.pop()
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
    else {
      return ''
    }
  }

  toFix4(amount) {
    if (amount){
      return parseFloat(amount).toFixed(4)
    }
    else
    {
      return ''
    }
  }

  cancel() {
    let ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "输入拒绝的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title) {
              let body = {
                'uid': this.user_id,
                'approval_text': data.title,
                'salary_id': this.item.salary_id,
              }
              this.salaryService.refuse_salary(body).then((res) => {
                if (res) {
                  if (res.result.res_code == 1) {
                    Utils.toastButtom("拒绝成功", this.toastCtrl)
                    this.navCtrl.pop()
                  }
                }
              })
            }
            else {
              Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
            }
          }
        }
      ]
    }).present();
  }

  conform() {
    let ctrl = this.alertCtrl;

    ctrl.create({
      title: '提示',
      message: "填写审批备注",
      inputs: [
        {
          name: 'title',
          placeholder: '审批备注(选填)'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '通过',
          handler: data => {
            if (data.title) {
              let body = {
                'uid': this.user_id,
                'approval_text': data.title,
                'salary_id': this.item.salary_id,
              }
              this.salaryService.pass_salary(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom("审核通过", this.toastCtrl)
                    this.navCtrl.pop()

                  }
                }
              })
            }
            else {
              let body = {
                'uid': this.user_id,
                'approval_text': '',
                'salary_id': this.item.salary_id,
              }
              this.salaryService.pass_salary(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom("审核通过", this.toastCtrl)
                    this.navCtrl.pop()
                  }
                }
              })
            }
          }
        }]
    }).present();
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
