import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../../commonUseServices';
import { ShenGouService} from './../shengouService'
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the CreateShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-shengou',
  templateUrl: 'create-shengou.html',
  providers: [CommonUseServices,ShenGouService],
})
export class CreateShengouPage {
  item:any;
  user_id:any;
  user_name:any;
  departmentList;
  department_name;
  department_id;
  department;
  production;
  // 添加的报销明细
  items = [];
  total: number = 0;
  data: any = [];
  employee_id;
  isAdd = false;
  index;
  isChange = false;
  partner_id;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage :Storage,
  public commonService:CommonUseServices,public shenGouService:ShenGouService,public alertCtrl:AlertController,
  public toastCtrl:ToastController) {
    this.frontPage = Utils.getViewController("ShengoupagePage", navCtrl)
    this.storage.get('user')
    .then(res => {
      console.log(res)
      this.user_id = res.result.res_data.user_id;
      this.user_name = res.result.res_data.name;
      this.partner_id = res.result.res_data.partner_id;
      // this.department_id = res.result.res_data.department_id
      this.shenGouService.get_all_departments(this.user_id).then((res) => {
        console.log(res)
        if (res.result.res_data.employee_id)
        {
          this.employee_id = res.result.res_data.employee_id;
        }
        if (res.result.res_data.all_departments)
        {
           this.departmentList = res.result.res_data.all_departments.res_data;
        }  
        if (res.result.res_data.default_department)
        {
           this.department = res.result.res_data.default_department.res_data[0].id;
        }
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShengouPage');
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

  changeProductItem(i) {
    this.index = i;
    this.navCtrl.push('AddShengouDetailPage', {
      item: this.items[i], index: i
      // , product: this.productList
    })
  }

  addApplyDetail() {
    this.navCtrl.push('AddShengouDetailPage', {
      // product: this.productList
    })
  }

  getTotalAmount() {
    if (this.items) {
      let total = 0;
      for (let item of this.items) {
        console.log(parseFloat((parseFloat(item.amount) * parseFloat(item.unit)).toFixed(2)))
        total = total + parseFloat((parseFloat(item.amount) * parseFloat(item.unit)).toFixed(2))
      }
      this.total = parseFloat(total.toFixed(2))
    }
  }

  goBack() {
    if (this.items.length > 0) {
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

  deleteProductItem(i) {
    this.items.splice(i, 1)
    this.getTotalAmount()
  }

  save() {
    let mString = "";
    if (!this.department) {
      mString = mString + "   请选择部门"
    }
    if (this.items.length <= 0) {
      mString = mString + "   请填写申购明细"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '是否提交?',
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
    let ctrl = this.alertCtrl;
    let productionList = []
    for (let item of this.items) {
      let pro = {
        description: item.remark,
        quantity:parseInt(item.unit),
        // department_id: parseInt(this.department),
        product_id: parseInt(item.productId),
        price_unit: parseFloat(item.amount)
      }
      productionList.push(pro)
    }
    let mbody = {
      department_id: parseInt(this.department),
      employee_id: parseInt(this.employee_id),
      line_ids: productionList,
      create_uid:this.user_id,
      total_amount:this.total,
    }
    let body = {
      data: mbody
    }
    // console.log(body)
    this.shenGouService.create_shengou(body).then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1) {
        // this.navCtrl.pop()
        ctrl.create({
                  title: '提示',
                  subTitle: "是否立即提交审核？",
                  buttons: [
                  {
                text: '暂不提交',
                    handler: () => {
                    this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage);
             }
             },{
                    text: '立即提交',
                    handler: () => {
                      this.shenGouService.push_apply(res.result.res_data.sheet_id,this.user_id).then((res) => {
                        if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "提交审核成功",
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
                      })
                    }
                  }
      ]
    }).present();
      }
    })
  }

  transInt(intValue,intOtherValue){
    return (parseFloat(intValue) * parseInt(intOtherValue)).toFixed(2)
  }
}
