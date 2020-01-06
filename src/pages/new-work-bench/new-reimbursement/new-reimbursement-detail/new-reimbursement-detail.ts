import { HttpService } from './../../../../providers/HttpService';
import { NavController, NavParams, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NewReimbursementService } from './../new-reimbursementService';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the NewReimbursementDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-reimbursement-detail',
  templateUrl: 'new-reimbursement-detail.html',
  providers: [NewReimbursementService]
})
export class NewReimbursementDetailPage {
  item: any;
  title: any;
  isShowFooter: any;
  user_id: any;
  frontPage;

  isAdd = false;
  index;
  isChange = false;
  productList;
  taxList;
  production;
  constructor(public navCtrl: NavController, public navParams: NavParams, public baoxiaoService: NewReimbursementService,
    public alertCtrl: AlertController, public storage: Storage, public toastCtrl: ToastController) {
    this.item = this.navParams.get('item');
    this.title = this.item.expense_name;
    this.frontPage = Utils.getViewController("ApplyPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;

        if (this.user_id != 1) {
          //   this.commonService.getPaymentReminding(this.user_id).then(res => {
          //   if (res.result && res.result.res_code == 1) {
          //     console.log(res.result.res_data)
          //     this.productList = res.result.res_data.product.res_data
          //     this.taxList = res.result.res_data.taxList.res_data ;
          //     // console.log(this.taxList)
          //   }
          // })
        }

      });
    console.log(this.item.state);
    let to_approve_name = this.item.to_approve_id
    if (this.item.state == '发送' || this.item.state == '审核中') {
      this.isShowFooter = true;
      this.storage.get('user')
        .then(res => {
          if (res.result.res_data.name != to_approve_name) {
            this.isShowFooter = false;
          }
        })
    }
    else {
      this.isShowFooter = false;
    }
    // console.log(this.isShowFooter + "      this.isShowFooter" + HttpService.user_id + "   " + this.item.to_approve_id)
    // console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewReimbursementDetailPage');
  }

  getTax(items) {
    if (items.tax_ids) {
      if (items.tax_ids[0]) {
        if (items.tax_ids[0].display_name) {
          return items.tax_ids[0].display_name;
        }
        else {
          return "";
        }
      }
      else {
        return "";
      }
    }
    else {
      return "";
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  conform() {
    // let body = this.calDetail();
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
                'user_id': this.user_id,
                'remark': data.title,
                'sheet_id': this.item.sheet_id,
              }
              this.baoxiaoService.pass_bx_ok(body).then((res) => {
                if (res) {

                  if (res.result.res_data.success == 1) {
                    console.log(res.result.res_data.success)
                    ctrl.create({
                      title: '提示',
                      subTitle: "审批成功",
                      buttons: [{
                        text: '确定',
                        handler: () => {
                          this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      }
                      ]
                    }).present();
                  }
                }
              })
            }
            else {
              let body = {
                'user_id': this.user_id,
                'remark': '',
                'sheet_id': this.item.sheet_id,
              }
              this.baoxiaoService.pass_bx_ok(body).then((res) => {
                if (res) {

                  if (res.result.res_data.success == 1) {
                    console.log(res.result.res_data.success)
                    ctrl.create({
                      title: '提示',
                      subTitle: "审批成功",
                      buttons: [{
                        text: '确定',
                        handler: () => {
                          this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      }
                      ]
                    }).present();
                  }
                }
              })
            }
          }
        }]
    }).present();
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
              this.baoxiaoService.refuse(this.item.sheet_id, data.title, this.user_id).then((res) => {
                if (res) {

                  if (res.result.res_data.success == 1) {
                    console.log(res.result.res_data.success)
                    ctrl.create({
                      title: '提示',
                      subTitle: "审批成功",
                      buttons: [{
                        text: '确定',
                        handler: () => {
                          this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      }
                      ]
                    }).present();
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

  calDetail() {
    let self = this
    let productionList = []
    for (let item of this.item.line_ids) {
      let taxId;
      for (let tax_detail of this.taxList) {
        if (item.tax_ids.length > 0) {
          if (tax_detail.name == item.tax_ids[0].display_name) {
            taxId = tax_detail.id;
          }
        }
        else {
          taxId = 4;
        }
      }
      let productIndex;
      for (let i = 0; i < this.productList.length; i++) {
        if ((new RegExp(item.product_id).test(this.productList[i].name)) || item.product_id == this.productList[i].name) {
          productIndex = this.productList[i].id;
        }
      }
      let pro = {
        name: item.name,
        product_id: parseInt(productIndex),
        unit_amount: parseFloat(item.unit_amount),
        taxid: taxId,
        remarks: item.description,
        line_id: item.line_id,
      }
      productionList.push(pro)
    }
    let mbody = {
      expense_line_ids: productionList,
    }
    let body = {
      data: mbody
    }
    return body
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
}
