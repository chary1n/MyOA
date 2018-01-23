import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController,Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the GongdanDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-detail',
  templateUrl: 'gongdan-detail.html',
  providers:[GongDanService],
})
export class GongdanDetailPage {
  item;
  message_item;
  isShowZhiPai = false;
  isShowCheHui = false;
  isShowRefuse = false;
  isShowConfirm = false;
  isShowFinish = false;
  frontPage;
  rebackPage;
  is_ios;
  biaoqian_list;
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar:StatusBar,
    public gongDanService:GongDanService,public alertCtrl:AlertController,
    public toast:ToastController,public platform:Platform) {
      this.biaoqian_list = this.navParams.get('biaoqian_list')
    this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
    this.rebackPage = Utils.getViewController("CreateGongdanPage", navCtrl)
    this.item = this.navParams.get('items').work_order
    this.message_item = this.navParams.get('items').records
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.is_ios = this.platform.is('ios')
    if (this.item.issue_state == "unaccept" || this.item.issue_state == "process"){
      this.isShowZhiPai = true
      this.isShowRefuse = false
      this.isShowConfirm = false
      if (this.item.create_user.id == HttpService.user_id){
        this.isShowCheHui = true
      }
      if (this.item.issue_state == "process"){
        if (this.item.assign_user.id == HttpService.user_id){
          this.isShowFinish = true
        }
      } 
    }
    else {
      this.isShowRefuse = false
      this.isShowConfirm = false
       this.isShowZhiPai = false
       this.isShowCheHui = false
      if (this.item.issue_state == "check"){
      if (this.item.create_user.id == HttpService.user_id){
        this.isShowRefuse = true
        this.isShowConfirm = true
      }
    }
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanDetailPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.reload()
    }
  }

  reload(){
    this.gongDanService.getGongdanDetail(this.item.work_order_id).then(res => {
      console.log(res)
      if(res.result.res_data && res.result.res_code == 1){
        this.item = res.result.res_data.work_order;
        this.message_item = res.result.res_data.records;
        if (this.item.issue_state == "unaccept" || this.item.issue_state == "process"){
      this.isShowZhiPai = true
      this.isShowRefuse = false
      this.isShowConfirm = false
      if (this.item.create_user.id == HttpService.user_id){
        this.isShowCheHui = true
      }
      if (this.item.issue_state == "process"){
        if (this.item.assign_user.id == HttpService.user_id){
          this.isShowFinish = true
        }
      } 
    }
    else {
      this.isShowRefuse = false
      this.isShowConfirm = false
       this.isShowZhiPai = false
       this.isShowCheHui = false
      if (this.item.issue_state == "check"){
      if (this.item.create_user.id == HttpService.user_id){
        this.isShowRefuse = true
        this.isShowConfirm = true
      }
    }
    }
      }
    })
  }

  changeState(item){
    let state_str="";
    if (item == "unaccept"){
      state_str = "等待受理"
    }
    else if (item == "process"){
      state_str = "受理中"
    }
    else if (item == "check"){
      state_str = "待验收"
    }
    else if (item == "done"){
      state_str = "已完成"
    }
    else if (item == "draft"){
      state_str = "草稿"
    }
    return state_str
  }

  replyClick(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "填写回复",
        inputs: [
          {
            name: 'title',
            placeholder: '回复内容(不能为空)'
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
            if (data.title){
              this.gongDanService.work_order_add_record(data.title,null,"reply",this.item.work_order_id,null).then(res => {
  
      if (res.result.res_code == 1)
      {
        Utils.toastButtom("回复成功", this.toast)
        this.reload()
      }
    })
            }
            else
            {
              Utils.toastButtom("回复不能为空", this.toast)
            }
          }
        }
        ],
      }).present();

    
  }

  reply_to(items){
    console.log(items)
    this.navCtrl.push('GongdanChatPage',{
      item:this.item,
      parent_id:items.record_id,
      record_item:items,
    })
  }

  getContent(items){
    let content = ""
    if (items.record_type == "reply"){
      content = "回复：" + items.content
    }
    return content
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  chehui(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否确定撤回该工单？",
        buttons: [
        {
          text: '重新编辑',
          handler: () => {
            this.gongDanService.work_order_retract(HttpService.user_id,this.item.work_order_id).then(res => {
              if (res.result.res_code == 1)
              {
                
                Utils.toastButtom("撤回成功", this.toast)
                // this.frontPage.data.need_fresh = true;
                // this.navCtrl.popTo(this.frontPage);
                this.reload()
              }
            
            })
            
          }
        },
        {
          text: '直接删除',
          handler: data => {
            this.gongDanService.work_order_retract(HttpService.user_id,this.item.work_order_id).then(res => {
              if (res.result.res_code == 1)
              {
                Utils.toastButtom("删除成功", this.toast)
                this.frontPage.data.need_fresh = true;
                this.navCtrl.popTo(this.frontPage);
              }
            })
          }
        }
        ],
      }).present();
  }

  zhipai(){
    this.navCtrl.push('GongdanZhipaiPage',{
      item:this.item,
    })
  }

  confirm(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否验证通过该工单",
        buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            this.gongDanService.work_order_action(HttpService.user_id,this.item.work_order_id,"finish",this.item.create_user.id).then(res => {
              if (res.result.res_code == 1)
              {
                Utils.toastButtom("验证通过", this.toast)
                


    let biaoqian_arr = []
    let id_index = 0
    console.log(this.biaoqian_list)
    for (let biaoqian of this.biaoqian_list) {
        biaoqian_arr.push({
          type:'checkbox',
          label:biaoqian.name,
          check:false,
          value:biaoqian.id,
        })
        id_index ++
    }
    console.log(biaoqian_arr)

                let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否需要修改该工单标签？",
        inputs: biaoqian_arr,
        buttons: [
        {
          text: '取消',
          handler: () => {
            this.frontPage.data.need_fresh = true;
                this.navCtrl.popTo(this.frontPage);
          }
        },
        {
          text: '确定',
          handler: data => {
              if (data){
                this.gongDanService.update_biaoqian(this.item.work_order_id,data).then(res => {
                  if (res.result.res_code == 1)
                  {
                    Utils.toastButtom("添加标签成功", this.toast)
                  this.frontPage.data.need_fresh = true;
                this.navCtrl.popTo(this.frontPage);
                  }
                  
                })
              }
          }
        }
        ],
      }).present();

              }
            })
          }
        }
        ],
      }).present();
  }

  refuse(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否不通过该工单",
        buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            this.gongDanService.work_order_action(HttpService.user_id,this.item.work_order_id,"reject",this.item.create_user.id).then(res => {
              if (res.result.res_code == 1)
              {
                Utils.toastButtom("拒绝成功,等待受理", this.toast)
                this.frontPage.data.need_fresh = true;
                this.navCtrl.popTo(this.frontPage);
              }
            })
          }
        }
        ],
      }).present();
  }

  finish(){
    let ctrl = this.alertCtrl;
      ctrl.create({
        title: '提示',
        message: "是否处理成功该工单",
        buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: data => {
            this.gongDanService.work_order_action(HttpService.user_id,this.item.work_order_id,"check",this.item.create_user.id).then(res => {
              if (res.result.res_code == 1)
              {
                Utils.toastButtom("处理成功,等待验收", this.toast)
                this.frontPage.data.need_fresh = true;
                this.navCtrl.popTo(this.frontPage);
              }
            })
          }
        }
        ],
      }).present();
  }

  release(){
     this.navCtrl.push('RebackGongdanPage',{
              reback_item:this.item,
              need_reback:true,
      })
  }

  

   

  // 回复类型 ：('reply', '回复'),
  //       ('create ', '创建'),
  //       ('assign', '指派'),
  //       ('check', '审核'),
  //       ('reject', '驳回'),
  //       ('finish', '完成')

}
