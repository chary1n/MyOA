import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController,ToastController} from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShenGouService} from './../shengouService'
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditNewShengouPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-new-shengou',
  templateUrl: 'edit-new-shengou.html',
  providers:[ShenGouService],
})
export class EditNewShengouPage {
  item:any;
  title:any;
  user_id:any;
  frontPage:any;
  isAdd = false;
  index;
  isChange = false;
  production;
  total;
  department;
  partner_id;
  departmentList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public shengouService:ShenGouService,public alertCtrl:AlertController,public storage:Storage,
  public toastCtrl:ToastController) {
    this.item = this.navParams.get('item');
     console.log(this.item.state)
     this.frontPage = Utils.getViewController("ShengoupagePage", navCtrl)
     this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
      this.partner_id = res.result.res_data.partner_id;

      if (this.item.state == "cancel")
      {
        this.shengouService.get_all_departments(this.partner_id).then((res) => {
        if (res.result.res_data.all_departments)
        {
          this.departmentList = res.result.res_data.all_departments.res_data;
          for (let item of res.result.res_data.all_departments.res_data) {
            console.log(item + " " + this.item.department)
            if(item.id == this.item.department.id)
            {
              this.department = item.id;
            }
          }
        }
      })
      }
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNewShengouPage');
  }

  ionViewWillEnter() {
    this.isAdd = this.navParams.get("isAdd")
    this.isChange = this.navParams.get("isChange")
    if (this.isAdd) {
      console.log(this.production)
      this.production = this.navParams.get('production')
      if (this.production) {
        this.item.line_ids.push(this.production)
      }
      this.navParams.data.isAdd = false;
    }
    if (this.isChange) {
      let changeItem = this.item.line_ids[this.item.line_ids.length-1]
      this.item.line_ids.splice(this.index, 1,changeItem);
      this.item.line_ids.pop()
      this.navParams.data.isChange = false;
    }
    this.getTotalAmount()
  }

  getTotalAmount() {
    if (this.item.line_ids) {
      let total = 0;
      for (let item of this.item.line_ids) {
        total = total + parseFloat((parseFloat(item.price_unit) * parseFloat(item.quantity)).toFixed(2))
      }
      this.total = total.toFixed(2)
    }
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  changeProductItem(i){
     this.index = i;
     console.log(this.item.line_ids[i])
    this.navCtrl.push('EditShengouPage', {
      item: this.item.line_ids[i], index: i
      // , product: this.productList
    })
  }

  deleteProductItem(i) {
    this.item.line_ids.splice(i, 1)
    this.getTotalAmount()
  }

  addApplyDetail(){
    this.navCtrl.push('EditAddShengouPage')
  }

  reApply(){
     let mString = "";
    if (!this.department) {
      mString = mString + "   请选择部门"
    }
    if (this.item.line_ids.length <= 0) {
      mString = mString + "   请填写申购明细"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    }
    else
    {
      let ctrl = this.alertCtrl;

    let productionList = []
    for (let item of this.item.line_ids) {
      let pro = {
        description: item.description,
        quantity:parseInt(item.quantity),
        // department_id: parseInt(this.department),
        product_id: parseInt(item.product_id.id),
        price_unit: parseFloat(item.price_unit)
      }
      productionList.push(pro)
    }
    let mbody = {
      line_ids: productionList,
      create_uid:this.user_id,
      total_amount:this.total,
    }
    let body = {
      data: mbody
    }

    this.shengouService.reset_shengou(this.user_id,this.item.sheet_id,body,this.department).then((res) => {
        if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "重新申请成功,等待审核",
                  buttons: [{
                text: '确定',
                    handler: () => {
                    this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
             }
             }
      ]
    }).present();
          }
    })
    } 
  }

  goBack() {
      this.navCtrl.pop();
  }

  transInt(intValue,intOtherValue){
    return (parseFloat(intValue) * parseFloat(intOtherValue)).toFixed(2)
  }

}
