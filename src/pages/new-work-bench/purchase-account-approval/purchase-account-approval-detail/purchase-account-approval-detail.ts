import { NavController, NavParams, IonicPage, Platform , ToastController, AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import { PurchaseAccountService } from './../purchaseAccountService'
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the PurchaseAccountApprovalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-purchase-account-approval-detail',
  templateUrl: 'purchase-account-approval-detail.html',
  providers: [PurchaseAccountService],
})
export class PurchaseAccountApprovalDetailPage {
  user_id
  item
  need_show_all_detail = false
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public purchaseAccountService: PurchaseAccountService,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.user_id = this.navParams.get('user_id')
    this.frontPage = Utils.getViewController("AB", navCtrl)
    this.item = this.navParams.get('item')
    this.purchaseAccountService.get_purchase_account_detail({'purchase_account_id': this.item.id}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.item = res.result.res_data
        var str_json = this.item.deduction_json
        if (this.item.deduction_json){
          this.item.deduction_ids = JSON.parse(str_json).content
        }
      } 
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseAccountApprovalDetailPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  toFix2(amount) {
    if (amount) {
      return parseFloat(amount).toFixed(2)
    }
    else {
      return '0.00'
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  click_total(){
    this.need_show_all_detail = !this.need_show_all_detail
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
                'purchase_account_id': this.item.id, 
              }
              this.purchaseAccountService.refuse_purchase_account(body).then((res) => {
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
                'purchase_account_id': this.item.id, 
              }
              this.purchaseAccountService.confirm_purchase_account(body).then((res) => {
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
