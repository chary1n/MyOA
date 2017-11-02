import { Utils } from './../../../../providers/Utils';
import { CommonUseServices } from './../../commonUseServices';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the BaoxiaoApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-baoxiao-apply',
  templateUrl: 'baoxiao-apply.html',
  providers: [CommonUseServices],
})
export class BaoxiaoApplyPage {
  user_id;
  res_data;
  department;
  departmentList;
  name;
  pre_payment_reminding;
  productList;
  production;
  // 添加的报销明细
  items = [];
  total: number = 0;
  data: any = [];
  employee_id;
  isAdd = false;
  index;
  isChange = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonUseServices,
    public storage: Storage,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.name = res.result.res_data.name;
        console.log(this.user_id);
        this.commonService.getPaymentReminding(this.user_id).then(res => {
          if (res.result && res.result.res_code == 1) {
            console.log(res.result.res_data)
            this.res_data = res.result.res_data
            this.departmentList = res.result.res_data.department.res_data
            this.productList = res.result.res_data.product.res_data
            this.pre_payment_reminding = res.result.res_data.pre_payment_reminding
            this.employee_id = res.result.res_data.employee_id;
            console.log(this.employee_id)
          }
        })
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaoxiaoApplyPage');

  }

  ionViewWillEnter() {
    this.isAdd = this.navParams.get("isAdd")
    this.isChange = this.navParams.get("isChange")
    if (this.isAdd) {
      console.log(this.production)
      this.production = this.navParams.get('production')
      if (this.production) {
        this.items.push(this.production)
      }
      this.navParams.data.isAdd = false;
    }
    if (this.isChange) {
      let changeItem = this.items[this.items.length-1]
      this.items.splice(this.index, 1,changeItem);
      this.items.pop()
      this.navParams.data.isChange = false;
    }
    this.getTotalAmount()
  }

  getTotalAmount() {
    if (this.items) {
      let total = 0;
      for (let item of this.items) {
        total = total + parseInt(item.amount)
      }
      this.total = total
    }
  }

  goBack() {
    if (this.department || this.items.length > 0) {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
    else {
      this.navCtrl.pop();
    }
  }


  changeProductItem(i) {
    this.index = i;
    this.navCtrl.push('AddApplyDetailPage', {
      item: this.items[i], index: i
      , product: this.productList
    })
  }



  deleteProductItem(i) {
    this.items.splice(i, 1)
    this.getTotalAmount()
  }

  addApplyDetail() {
    this.navCtrl.push('AddApplyDetailPage', {
      product: this.productList
    })
  }
  save() {
    let mString = "";
    if (!this.department) {
      mString = mString + "   请选择部门"
    }
    if (this.items.length <= 0) {
      mString = mString + "   请填写报销明细"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '是否立即提交审核？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.createApply()
          }
        }
        ]
      }).present();
    }
  }

  createApply() {
    let productionList = []
    for (let item of this.items) {
      let pro = {
        name: item.remark,
        department_id: parseInt(this.department),
        employee_id: parseInt(this.employee_id),
        product_id: parseInt(item.productId),
        unit_amount: parseInt(item.amount)
      }
      productionList.push(pro)
    }
    let mbody = {
      department_id: parseInt(this.department),
      employee_id: parseInt(this.employee_id),
      expense_line_ids: productionList,
      user_id: window.localStorage.getItem('id')
    }
    let body = {
      data: mbody
    }
    console.log(body)
    this.commonService.createApply(body).then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.pop()
      }
    })
  }
}
