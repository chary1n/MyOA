import { NavController, NavParams, IonicPage, Platform ,AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import { NewShenGouService } from './new-shengouService';
import { Storage } from '@ionic/storage';
import { NewShenGouAutoService } from './new-shengouautoService'
import { HttpService } from '../../../providers/HttpService';
import { NewShenGouMeAutoService } from './new-shengouMeautoService'
/**
 * Generated class for the NewShengouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-shengou',
  templateUrl: 'new-shengou.html',
  providers: [NewShenGouAutoService, NewShenGouService,NewShenGouMeAutoService],
})
export class NewShengouPage {
  type = 'wait_approved'
  items: any;
  user_id: any;
  myApplyList: any;
  limit;
  offset;
  audited_list;
  wait_me_audit_list;
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true;
  wait_approval_count=0;
  department = false;
  is_ios = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shengouService: NewShenGouService
    , public storage: Storage, public shenGouAutoService: NewShenGouAutoService,public alertCtrl:AlertController,
    public platform:Platform, public shenGouMeAutoService: NewShenGouMeAutoService) {
      if (this.platform.is('ios')) {
      this.is_ios = true
    }
      this.storage.get('user')
      .then(res => {
        if (res.result.res_data.department)
        {
          this.department = true;
        }
        this.user_id = res.result.res_data.user_id;
        this.limit = 20;
        this.offset = 0;
        this.shengouService.get_wait_audit_purchase(this.limit, this.offset, this.user_id).then((res) => {
          console.log(res)
          if (res.result && res.result.res_code == 1) {
            this.wait_me_audit_list = res.result.res_data;
          }
        })
      });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewShengouPage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      this.reloadData(null);
      this.navParams.data.need_fresh = false;
    }
    // this.shengouService.get_shengou_count(HttpService.user_id).then((res) => {
    //   console.log(res);
    //   if (res.result && res.result.res_code == 1) {
    //     this.wait_approval_count = res.result.res_data.acount
    //   }
    // })
  }

  changeState(item) {
    if (item == "draft") {
      return "草稿";
    }
    else if (item == "submit") {
      return "提交";
    }
    else if (item == "reviewing") {
      return "审核中";
    }
    else if (item == "cancel") {
      return "被拒";
    }
    else if (item == "approve") {
      return "已批准";
    }
    else if (item == "done") {
      return "完成";
    }
    else if (item == "rejected") {
      return "拒绝";
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  goBack() {
    this.navCtrl.pop()
  }

  approved_detail(item){
    let item_id = 0
    if (this.type == 'me'){
      item_id = item.sheet_id
    }
    else
    {
      item_id = item.id
    }
    this.shengouService.getAuditDetail(item_id).then(res=>{
      if(res.result&&res.result.res_code == 1){
        this.navCtrl.push("NewShengouDetailPage", { item: res.result.res_data })
      }
    })
  }

  reloadData(refresh) {
    this.limit = 20;
    this.offset = 0;
    if (this.type == "me") {
      this.isMoreData1 = true;
      this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then((res) => {
        console.log(res.result.res_data)
        if (refresh) {
          refresh.complete();
        }
           if (res.result && res.result.res_code == 1) {
            this.myApplyList = res.result.res_data;
          }
      })
    } else if (this.type == "me_approved") {
      this.isMoreData3 = true;
      this.shengouService.get_audited_purchase(this.limit, this.offset, this.user_id).then((res) => {
        console.log(res.result.res_data)
        if (refresh) {
          refresh.complete();
        }
        if (res.result && res.result.res_code == 1) {
          this.audited_list = res.result.res_data;
        }
      })
    } else if (this.type == "wait_approved") {
      this.isMoreData2 = true;
      this.shengouService.get_wait_audit_purchase(this.limit, this.offset, this.user_id).then((res) => {
        console.log(res.result.res_data)
        if (refresh) {
          refresh.complete();
        }
        if (res.result && res.result.res_code == 1) {
          this.wait_me_audit_list = res.result.res_data;
        }
      })
    }
  }

  clickAlreadyApply(){
    this.type = 'me_approved'
    this.reloadData(null)
  }

  clickWaitMeApply(){
    this.type = 'wait_approved'
    this.reloadData(null)
  }

  clickMeApply(){
    this.type = 'me'
    this.reloadData(null)
  }

  itemClearSelected(event){
    this.reloadData(null)
  }

  itemSelected(event) {
   let type;
    let search_text;
    if (event.id == 1) {
      type = "expense_no";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "name";
      search_text = event.name.replace("搜 申请人：", "")
    }
    if(this.type == "me"){
      this.shengouService.search_shengou(type,search_text, this.user_id).then((res) => {
        console.log(res)
        if (res.result&&res.result.res_code == 1) {
          this.myApplyList = res.result.res_data;
        }
        else {
          this.myApplyList = [];
        }
      })
    }else if(this.type == "wait_approved"){
      this.shengouService.search_wait_me_audit(type,search_text, this.user_id).then((res) => {
        console.log(res)
        if (res.result&&res.result.res_code == 1) {
          this.wait_me_audit_list = res.result.res_data;
        }
        else {
          this.wait_me_audit_list = [];
        }
      })
    }else if(this.type == "me_approved"){
      this.shengouService.search_audited(type,search_text, this.user_id).then((res) => {
        console.log(res)
        if (res.result&&res.result.res_code == 1) {
          this.audited_list = res.result.res_data;
        }
        else {
          this.audited_list = [];
        }
      })
    }
   
  }

  itemMeSelected(event){
      let type;
    let search_text;
    if (event.id == 1) {
      type = "expense_no";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "name";
      search_text = event.name.replace("搜 待审核人：", "")
    }
    this.shengouService.search_shengou(type,search_text, this.user_id).then((res) => {
        console.log(res)
        if (res.result&&res.result.res_code == 1) {
          this.myApplyList = res.result.res_data;
        }
        else {
          this.myApplyList = [];
        }
      })
  }

  itemClearMeSelected(event){
    this.reloadData(null)
  }
  
}
