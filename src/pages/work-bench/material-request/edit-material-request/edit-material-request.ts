import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { materialService} from "./../materialService";
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the EditMaterialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-material-request',
  templateUrl: 'edit-material-request.html',
  providers:[materialService],
})
export class EditMaterialRequestPage {
  user_id;
  item;
  partner_id;
  isShow;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mService:materialService,
  public storage:Storage,public alertCtrl:AlertController,public toastCtrl:ToastController) {
    this.item = navParams.get('item')
    this.isShow = "normal"
     this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.partner_id = res.result.res_data.partner_id;
        this.mService.get_final_review().then(res => {
          console.log(res)
          if (res.result && res.result.res_code == 1 && res.result.res_data)
          {
            if (this.item.picking_type == "pick_type")
            {
              for (let items of res.result.res_data) {
                if (items.review_type == "picking_review_line")
                {
                  if (items.final_review_partner_id.id == this.partner_id)
                  {
                    this.isShow = "final"
                  }
                }
              }
            }
            else if (this.item.pick_type == "proofing")
            {
              for (let items of res.result.res_data) {
                if (items.review_type == "picking_review_project")
                {
                  if (items.final_review_partner_id.id == this.partner_id)
                  {
                    this.isShow = "final"
                  }
                }
              }
            }
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMaterialRequestPage');
  }

  changeType(state){
    if (state.toLowerCase() == "pick_type"){
      return "产线领用"
    }
    else if (state.toLowerCase() == "proofing"){
      return "工程领用"
    }
    else
    {
      return state
    }
  }

  changeState(state){
    if (state.toLowerCase() == "canceled")
    {
      return "已取消";
    }
    else if (state.toLowerCase() == "to_submit")
    {
      return "待提交";
    }
    else if (state.toLowerCase() == "submitted")
    {
      return "已提交";
    }
    else if (state.toLowerCase() == "to_approved")
    {
      return "待审批";
    }
    else if (state.toLowerCase() == "review_ing")
    {
      return "审核中";
    }
    else if (state.toLowerCase() == "approved_finish")
    {
      return "等待领料";
    }
    else if (state.toLowerCase() == "finish_pick")
    {
      return "完成";
    }
    else if (state.toLowerCase() == "refused")
    {
      return "已拒绝";
    }
  }

  changeStateWithName(item){
    if (item.who_review_now.name)
    {
      return this.changeState(item.picking_state) + '/' +item.who_review_now.name
    } 
    else
    {
      return this.changeState(item.picking_state)
    }
  }

  changeName(i,name){
    return i + "." + name;
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  changeShenpiState(state){
    if (state.toLowerCase() == "waiting_review")
    {
      return "等待审核"
    }
    else if (state.toLowerCase() == "review_success")
    {
      return "审核通过"
    }
    else if (state.toLowerCase() == "review_fail")
    {
      return "审核不通过"
    }
    else if (state.toLowerCase() == "review_canceled")
    {
      return "取消审核"
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
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title)
            {
                
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

  confirm(){

  }

  confirmFinal(){

  }

  confirmOK(){

  }

}
