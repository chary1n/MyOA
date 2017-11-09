import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController} from 'ionic-angular';
import { ShenGouService} from './../shengouService'
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';


/**
 * Generated class for the MyshengoudetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myshengoudetail',
  templateUrl: 'myshengoudetail.html',
  providers:[ShenGouService],
})
export class MyshengoudetailPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public shengouService:ShenGouService,public alertCtrl:AlertController,public storage:Storage) {
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
    console.log('ionViewDidLoad MyshengoudetailPage');
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
        total = total + parseInt(item.price_unit) * parseInt(item.quantity)
      }
      this.total = total
    }
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

  backApply(){
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
            if (data.title)
            {
                this.shengouService.refuse_shengou(this.user_id,data.title,this.item.sheet_id).then((res) => {
               if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "拒绝成功",
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
        }
            })
          }
          else
          {
              ctrl.create({
                  title: '提示',
                  subTitle: "请填写拒绝原因",
                  buttons: [{
                text: '确定',
                    handler: () => {
                   
             }
             }
      ]
    }).present();
          }
          }
        }
      ]
    }).present();
  }


  reApply(){
    let ctrl = this.alertCtrl;

    let productionList = []
    for (let item of this.item.line_ids) {
      let pro = {
        description: item.description,
        quantity:parseInt(item.quantity),
        // department_id: parseInt(this.department),
        product_id: parseInt(item.product_id.id),
        price_unit: parseInt(item.price_unit)
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

    this.shengouService.reset_shengou(this.user_id,this.item.sheet_id,body).then((res) => {
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

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  addApplyDetail(){
    this.navCtrl.push('EditAddShengouPage')
  }

  edit(i){
    if (this.item.state == 'cancel'){
      this.index = i;
      console.log(this.item.line_ids[i])
      this.navCtrl.push('EditShengouPage', {
      item: this.item.line_ids[i], index: i
      })
    }
  }

  pushApply(){
    let ctrl = this.alertCtrl;
    this.shengouService.push_apply(this.item.sheet_id,this.user_id).then((res) => {
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
