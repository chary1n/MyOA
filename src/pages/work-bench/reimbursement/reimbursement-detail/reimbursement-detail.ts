import { NavController, NavParams, IonicPage,AlertController,ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReimbursementService} from './../reimbursementService';
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';

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
  providers:[ReimbursementService]
})
export class ReimbursementDetailPage {
  item:any;
  title:any;
  isShowFooter:any;
  user_id:any;
  frontPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public baoxiaoService:ReimbursementService,
  public alertCtrl:AlertController,public storage:Storage,public toastCtrl:ToastController) {
    this.item = this.navParams.get('item');
    this.title = this.item.expense_name;
    this.frontPage = Utils.getViewController("ApplyPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;
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

  conform(){
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
              this.baoxiaoService.confirm1(this.item.sheet_id,this.user_id,data.title).then((res) => {
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
              this.baoxiaoService.confirm1(this.item.sheet_id,this.user_id,null).then((res) => {
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
              this.baoxiaoService.confirm2(this.item.sheet_id,this.user_id,data.title).then((res) => {
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
                this.baoxiaoService.confirm2(this.item.sheet_id,this.user_id,null).then((res) => {
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
}
