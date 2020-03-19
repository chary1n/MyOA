import { NavController, NavParams, IonicPage, ActionSheetController, Content, Platform, ModalController, ToastController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { YearEndSalaryService} from './../yearEndSalaryService'
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the YearEndSalaryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-year-end-salary-detail',
  templateUrl: 'year-end-salary-detail.html',
  providers: [YearEndSalaryService]
})
export class YearEndSalaryDetailPage {
  frontPage
  item
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public yearEndSalaryService: YearEndSalaryService,
    public toastCtrl: ToastController, public alertCtrl: AlertController) {
  
    this.frontPage = Utils.getViewController("AB", navCtrl)
    this.item = this.navParams.get('item')
    this.user_id = this.navParams.get('user_id')
    let body = {
      'allowance_id': this.item.allowance_id
    }
    this.yearEndSalaryService.get_department_allowance_detail(body).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.item = res.result.res_data
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YearEndSalaryDetailPage');
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

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  click_employee_detail(detail) {
    this.navCtrl.push('YearEndSalaryLineDetailPage', {
      item: detail
    })
  }

  goBack(){
    this.navCtrl.pop()
  }

  cancel(){
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
                'text': data.title,
                'user_id': this.user_id,
                'res_id': this.item.allowance_id, 
                'res_model': "rt.allowance.salary.department",
              }
              this.yearEndSalaryService.refuse_salary_action(body).then((res) => {
                if (res) {

                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.frontPage.data.need_fresh = true;
                    this.navCtrl.popTo(this.frontPage);
                  }
                }
              })
            }
            else {
              Utils.toastButtom('请填写拒绝原因', this.toastCtrl)
            }
          }
        }
      ]
    }).present();
  }

  conform(){
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
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            let body = {
                'text': data.title,
                'user_id': this.user_id,
                'res_id': this.item.allowance_id, 
                'res_model': "rt.allowance.salary.department",
              }
              this.yearEndSalaryService.confirm_salary_action(body).then((res) => {
                if (res) {
                  if (res.result.res_code == 1) {
                    Utils.toastButtom('操作成功', this.toastCtrl)
                    this.frontPage.data.need_fresh = true;
                    this.navCtrl.popTo(this.frontPage);
                  }
                }
              })
          }
        }
        ],
      }).present();
  }

}
