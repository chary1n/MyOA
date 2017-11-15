import { NavController, NavParams, IonicPage,AlertController,ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReimbursementService} from './../reimbursementService';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { CommonUseServices } from './../../commonUseServices';

/**
 * Generated class for the ReimbursementDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reimbursement-detail',
  templateUrl: 'reimbursement-detail.html',
  providers:[ReimbursementService,CommonUseServices]
})
export class ReimbursementDetailPage {
  item:any;
  title:any;
  isShowFooter:any;
  user_id:any;
  frontPage;

  isAdd = false;
  index;
  isChange = false;
  productList;
  taxList;
  production;
  constructor(public navCtrl: NavController, public navParams: NavParams,public baoxiaoService:ReimbursementService,
  public alertCtrl:AlertController,public storage:Storage,public toastCtrl:ToastController,public commonService:CommonUseServices) {
    this.item = this.navParams.get('item');
    this.title = this.item.expense_name;
    this.frontPage = Utils.getViewController("ApplyPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;

        this.commonService.getPaymentReminding(this.user_id).then(res => {
          if (res.result && res.result.res_code == 1) {
            console.log(res.result.res_data)
            this.productList = res.result.res_data.product.res_data
            this.taxList = res.result.res_data.taxList.res_data ;
          }
        })
      });
    console.log(this.item.state);
    if (this.item.state == '发送' || this.item.state == '1级审核' || this.item.state == '2级审核')
    {
      this.isShowFooter = true;
    }
    else
    {
      this.isShowFooter = false;
    }
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementDetailPage');
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
      let changeItem = this.item.line_ids[this.item.line_ids.length - 1]
      this.item.line_ids.splice(this.index, 1, changeItem);
      this.item.line_ids.pop()
      this.navParams.data.isChange = false;
    }
    this.getTotalAmount()
  }

  getTotalAmount() {
    if (this.item.line_ids) {
      let total = 0;
      for (let item of this.item.line_ids) {
        total = total + parseFloat(item.unit_amount)
      }
      this.item.amount = total
    }
  }

  

  conform(){
    let body = this.calDetail();
    let ctrl = this.alertCtrl;
    if (this.item.state == '发送')
    {
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
            if (data.title)
            {
              this.baoxiaoService.confirm1(this.item.sheet_id,this.user_id,data.title,body).then((res) => {
        if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
              this.baoxiaoService.confirm1(this.item.sheet_id,this.user_id,null,body).then((res) => {
        if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
          }
        }]
      }).present();
  }
  else if (this.item.state == '1级审核')
  {
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
            if (data.title)
            {
              this.baoxiaoService.confirm2(this.item.sheet_id,this.user_id,data.title,body).then((res) => {
         if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
                this.baoxiaoService.confirm2(this.item.sheet_id,this.user_id,null,body).then((res) => {
         if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
          }
        }]
      }).present();


      
  }
    else if (this.item.state == '2级审核')
    {
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
            if (data.title)
            {
              this.baoxiaoService.confirm_approve3(this.item.sheet_id,this.user_id,data.title,body).then((res) => {
         if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
                this.baoxiaoService.confirm_approve3(this.item.sheet_id,this.user_id,null,body).then((res) => {
         if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
          }
        }]
      }).present();
    }
  }

  cancel(){
    this.showPrompt();
  }

  showPrompt() {
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
                this.baoxiaoService.refuse(this.item.sheet_id,data.title,this.user_id).then((res) => {
               if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "审批成功",
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
            Utils.toastButtom("请填写拒绝原因", this.toastCtrl)
          }
          }
        }
      ]
    }).present();
  }

  getTax(items)
  {
    if (items.tax_ids)
    {
      if (items.tax_ids[0])
      {
        if (items.tax_ids[0].display_name)
    {
      return items.tax_ids[0].display_name;
    }
    else
    {
      return "";
    }
      }
      else
      {
        return "";
      }
  }
  else
  {
    return "";
  }
}

changeProductItem(i) {
    this.index = i;
    console.log(this.item.line_ids[i])
    this.navCtrl.push('EditReimbursementPage', {
      item: this.item.line_ids[i],
      index: i,
      product: this.productList,
      taxList:this.taxList,
    })
  }

  calDetail(){
    let self = this
    let productionList = []
    for (let item of this.item.line_ids) {
      let taxId;
      for (let tax_detail of this.taxList) {
        if (tax_detail.name == item.tax_ids[0].display_name){
          taxId = tax_detail.id;
        }
      }
      let productIndex;
     for(let i = 0 ;i<this.productList.length;i++){
        if ((new RegExp(item.product_id).test(this.productList[i].name)) || item.product_id == this.productList[i].name){
          productIndex = this.productList[i].id;
        }
      }
      let pro = {
        name: item.name,
        product_id: parseInt(productIndex),
        unit_amount: parseFloat(item.unit_amount),
        taxid:taxId,
        remarks:item.description, 
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

}
