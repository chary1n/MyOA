import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { PaymentRequestService} from './pay-requestService';
import { Storage } from '@ionic/storage';
import { PaymentAutoService} from './pay-request-auto';
import { PaymentTwoAutoService} from './pay-two-request-auto'
import { StatusBar } from '@ionic-native/status-bar';
/**
 * Generated class for the PayRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay-request',
  templateUrl: 'pay-request.html',
  providers:[PaymentRequestService,PaymentAutoService,PaymentTwoAutoService],
})
export class PayRequestPage {
  user_id;
  limit;
  offset;
  paymentList;
  pet;
  isMoreData = true;
  meList;
  waitMeList;
  alreadyList;
  waitMeTitle;
  is_plus = false;
  count = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public paymentService: PaymentRequestService,
  public storage :Storage,public paymentAutoService:PaymentAutoService,public paymentTwoAutoService:PaymentTwoAutoService,
  public statusBar:StatusBar) {
      this.statusBar.backgroundColorByHexString("#2597ec");
      this.statusBar.styleLightContent();
      this.pet = "2"
      this.waitMeTitle = "待我审批"
      this.storage.get('user')
      .then(res => {
        for (let product of res.result.res_data.groups) {
          if (product.name == 'purchase_manager_plus')
          {
            this.is_plus = true;
          }
        }
        this.user_id = res.result.res_data.user_id
        this.limit = 20;
        this.offset = 0;
        this.paymentService.get_payment_request_list("wait_me",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.waitMeList = res.result.res_data;
            this.count = res.result.res_data.length;
            if (res.result.res_data.length){
              this.waitMeTitle = "待我审批(" + res.result.res_data.length + ")"
            }
            else
            {
               this.waitMeTitle = "待我审批(0)" 
               this.count = 0;
            }
            
          }
          else
          {
            this.waitMeList = [];
            this.waitMeTitle = "待我审批(0)"
            this.count = 0;
          }
        })
      })
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayRequestPage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.paymentService.get_payment_request_list("wait_me",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.waitMeList = res.result.res_data;
            this.count = res.result.res_data.length;
            if (res.result.res_data.length){
              this.waitMeTitle = "待我审批(" + res.result.res_data.length + ")"
            }
            else
            {
               this.waitMeTitle = "待我审批(0)" 
               this.count = 0;
            }
            
          }
          else
          {
            this.waitMeList = [];
            this.waitMeTitle = "待我审批(0)"
            this.count = 0;
          }
        })
    }
  }

  clickMyApply(){
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.paymentService.get_payment_request_list("me",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
          console.log(res.result.res_data.length)
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.meList = res.result.res_data;
          }
          else
          {
            this.meList = [];
          }
        })
  }

  clickWaitMeApply(){
    this.pet = "2"
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.paymentService.get_payment_request_list("wait_me",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.waitMeList = res.result.res_data;
            this.count = res.result.res_data.length;
            if (res.result.res_data.length){
              this.waitMeTitle = "待我审批(" + res.result.res_data.length + ")"
            }
            else
            {
               this.waitMeTitle = "待我审批(0)" 
               this.count = 0;
            }
            
          }
          else
          {
            this.waitMeList = [];
            this.waitMeTitle = "待我审批(0)"
            this.count = 0;
          }
        })
  }

  clickAlreadyApply(){
    this.pet = "3"
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
      this.paymentService.get_payment_request_list("already",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
          // console.log(res.result.res_data.length)
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.alreadyList = res.result.res_data;
          }
          else
          {
            this.alreadyList = [];
          }
        })
  }

  clickMe(item){
    this.navCtrl.push('PayRequestDetailPage',{
      item:item,
    })
  }

  clickEdit(item){
    this.navCtrl.push('PayRequestDetailPage',{
      item:item,
    })
  }

  clickALready(item){
    this.navCtrl.push('PayRequestDetailPage',{
      item:item,
    })
  }

  doRefresh(refresh){
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    if (this.pet == "1")
    {
      this.clickMyApply();
      refresh.complete();
    }
    else if (this.pet == "2")
    {
      this.clickWaitMeApply();
      refresh.complete();
    }
    else if (this.pet == "3")
    {
      this.clickAlreadyApply();
      refresh.complete();
    }
  }

  doInfinite(infinite){
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      if (this.pet == "1")
      {
          this.paymentService.get_payment_request_list("me",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
            let item_data = [];
            console.log(res)
            if (res.result.res_data) {
              item_data = res.result.res_data;
              if (item_data.length == 20) {
               this.isMoreData = true;
             }
             else {
                this.isMoreData = false;
             }
             for (let item of item_data) {
                this.meList.push(item)
             }
            }
            else {
          this.isMoreData = false;
        }
        infinite.complete();
            })
      }
      if (this.pet == "2")
      {
          this.paymentService.get_payment_request_list("wait_me",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
            let item_data = [];
            if (res.result.res_data) {
              item_data = res.result.res_data;
              if (item_data.length == 20) {
               this.isMoreData = true;
             }
             else {
                this.isMoreData = false;
             }
             for (let item of item_data) {
                this.waitMeList.push(item)
             }
            }
            else {
          this.isMoreData = false;
        }
        infinite.complete();
            })
      }
      else if (this.pet == "3")
      {
          this.paymentService.get_payment_request_list("already",this.limit,this.offset,this.user_id,this.is_plus).then(res => {
            let item_data = [];
            if (res.result.res_data) {
              item_data = res.result.res_data;
              if (item_data.length == 20) {
               this.isMoreData = true;
             }
             else {
                this.isMoreData = false;
             }
             for (let item of item_data) {
                this.alreadyList.push(item)
             }
            }
            else {
          this.isMoreData = false;
        }
        infinite.complete();
            })
      }
    }
    else {
        infinite.complete();
      }
  }

  itemSelected(event){
    let search_text;
    let payment_type;
    let search_type;
    let search_domain;
    if (event.id == 1)
    {
      search_text = event.name.replace("搜 单号：", "")
      search_domain = "name"
    }
    else if (event.id == 2)
    {
      search_text = event.name.replace("搜 创建人：", "")
      search_domain = "create_uid"
    }
    else if (event.id == 3)
    {
      search_text = event.name.replace("搜 合作伙伴：", "")
      search_domain = "partner_id"
    }
    if (this.pet == "1")
    {
      payment_type = "me"
      search_type = ""
    }
    else if (this.pet == "2")
    {
      payment_type = "wait_me"
      search_type = this.is_plus?"need":"no_need"
    }
    else
    {
      payment_type = "already"
      search_type = ""
    }
    this.paymentService.search_payment(search_text,payment_type,this.user_id,search_type,search_domain).then(res => {
        if (res.result && res.result.res_code == 1 && res.result.res_data) {
          this.isMoreData = false;
          if (this.pet == "1")
          {
            this.meList = res.result.res_data;
          }
          else if (this.pet == "2")
          {
            this.waitMeList = res.result.res_data;
          }
          else
          {
            this.alreadyList = res.result.res_data;;
          }
          
        }
        else
        {
          this.meList = [];
        }
    })
  }

  changeState(item){
    let state = ""
    if (item == "draft"){
      state = "草稿"
    }
    else if (item == "posted")
    {
      state = "提交"
    }
    else if (item == "confirm")
    {
      state = "确认"
    }
    else if (item == "manager")
    {
      state = "经理审核"
    }
    else if (item == "done")
    {
      state = "完成"
    }
    else if (item == "cancel")
    {
      state = "取消"
    }
    return state
  }

  goBack(){
  
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
<<<<<<< HEAD
    
=======
    this.navCtrl.pop();
>>>>>>> f79a333139bf7a906a7eff39f8d221d777f012f2
  }
}
