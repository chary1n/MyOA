import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ShenGouService } from './shengouService'
import { Storage } from '@ionic/storage';
import { ShenGouAutoService } from './shengouAutoService'
import { HttpService } from '../../../providers/HttpService';


/**
 * Generated class for the ShengoupagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shengoupage',
  templateUrl: 'shengoupage.html',
  providers: [ShenGouService, ShenGouAutoService],
})
export class ShengoupagePage {
  pet: string = "2";
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
  wait_approval_count
  constructor(public navCtrl: NavController, public navParams: NavParams, public shengouService: ShenGouService
    , public storage: Storage, public shenGouAutoService: ShenGouAutoService) {
    this.storage.get('user')
      .then(res => {
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
    console.log('ionViewDidLoad ShengoupagePage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      this.reloadData(null);
      this.navParams.data.need_fresh = false;
    }
    this.shengouService.get_shengou_count(HttpService.user_id).then((res) => {
      console.log(res);
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_count = res.result.res_data
      }
    })
  }

  clickMyApply() {
    this.reloadData(null);
  }

  clickWaitMeApply() {
    this.reloadData(null);
  }

  clickAlreadyApply() {
    this.reloadData(null);
  }

  changeState(item) {
    if (item == "draft") {
      return "草稿";
    }
    else if (item == "submit") {
      return "提交";
    }
    else if (item == "manager1_approve") {
      return "一级审核";
    }
    else if (item == "manager2_approve") {
      return "二级审核";
    }
    else if (item == "cancel") {
      return "取消";
    }
    else if (item == "approve") {
      return "批准";
    }
    else if (item == "done") {
      return "完成";
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  shengou_detail(item) {
    this.navCtrl.push('MyshengoudetailPage', {
      item: item,
    })
  }

  reloadData(refresh) {
    this.limit = 20;
    this.offset = 0;
    if (this.pet == "1") {
      this.isMoreData1 = true;

      this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then((res) => {
          // console.log(res.result.res_data)
          if (res.result && res.result.res_code == 1) {
            this.myApplyList = res.result.res_data;
          }
        })


      this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then((res) => {
        console.log(res.result.res_data)
        if (refresh) {
          refresh.complete();
        }
           if (res.result && res.result.res_code == 1) {
            this.myApplyList = res.result.res_data;
          }
      })
    } else if (this.pet == "3") {
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
    } else if (this.pet == "2") {
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

  createApply() {
    this.navCtrl.push('CreateShengouPage', {
      // item:this.item,
    });
  }

  doRefresh(refresh) {
    this.reloadData(refresh);
  }
  doInfinite(infiniteScroll) {
    if (this.pet == "1") {
      if (this.isMoreData1 == true) {
        this.limit = 20;
        this.offset += 20;
        this.shengouService.getshengouList(this.limit, this.offset, this.user_id).then((res) => {
          // console.log(res)
          if (res.result && res.result.res_code == 1) {
            if (res.result.res_data)
            {
               if (res.result.res_data.length == 20) {
                  this.isMoreData1 = true;
                  
               }
               else {
                  this.isMoreData1 = false;
               }
               for (let item of res.result.res_data) {
                  this.myApplyList.push(item);
               }
            }
            else
            {
              this.isMoreData1 = false;
            }
            
          }
          else {
            this.isMoreData1 = false;
          }
          infiniteScroll.complete();
        })
      }
      else {
        infiniteScroll.complete();
      }
    } else if (this.pet == "2") {
      if (this.isMoreData2 == true) {
        this.limit = 20;
        this.offset += 20;
        this.shengouService.get_wait_audit_purchase(this.limit, this.offset, this.user_id).then((res) => {
          // console.log(res.result.res_data)
          if (res.result && res.result.res_code == 1) {
            if (res.result.res_data)
            {
              if (res.result.res_data.length == 20) {
              this.isMoreData2 = true;
            }
            else {
              this.isMoreData2 = false;
            }
            for (let item of res.result.res_data) {
              this.wait_me_audit_list.push(item);
            }
          }
          else
          {
            this.isMoreData2 = false;
          }
            
          }
          else {
            this.isMoreData2 = false;
          }
          infiniteScroll.complete();
        })
      }
      else {
        infiniteScroll.complete();
      }
    } else if (this.pet == "3") {
      if (this.isMoreData3 == true) {
        this.limit = 20;
        this.offset += 20;
        this.shengouService.get_audited_purchase(this.limit, this.offset, this.user_id).then((res) => {
          // console.log(res.result.res_data)
          if (res.result && res.result.res_code == 1) {
            if (res.result.res_data)
            {
              if (res.result.res_data.length == 20) {
              this.isMoreData3 = true;
            }
            else {
              this.isMoreData3 = false;
            }
            for (let item of res.result.res_data) {
              this.myApplyList.push(item);
            }
          }
          else
          {
            this.isMoreData3 = false;
          }
            
          }
          else {
            this.isMoreData3 = false;
          }
          infiniteScroll.complete();
        })
      }
      else {
        infiniteScroll.complete();
      }
    }
  }

  itemSelected(event) {
    let search_text = event.name.replace("搜 单号：", "")
    if(this.pet == "1"){
      this.shengouService.search_shengou(search_text, this.user_id).then((res) => {
        console.log(res)
        if (res.result&&res.result.res_code == 1) {
          this.myApplyList = res.result.res_data;
        }
        else {
          this.myApplyList = [];
        }
      })
    }else if(this.pet == "2"){
      this.shengouService.search_wait_me_audit(search_text, this.user_id).then((res) => {
        console.log(res)
        if (res.result&&res.result.res_code == 1) {
          this.wait_me_audit_list = res.result.res_data;
        }
        else {
          this.wait_me_audit_list = [];
        }
      })
    }else if(this.pet == "3"){
      this.shengouService.search_audited(search_text, this.user_id).then((res) => {
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

  audited_detail(item) {
    this.shengouService.getAuditDetail(item.id).then(res=>{
      if(res.result && res.result.res_code == 1){
        this.navCtrl.push("AuditedPurchasePage", { item: res.result.res_data })
      }
    })
  }

  wait_audit_detail(item) {
    this.shengouService.getAuditDetail(item.id).then(res=>{
      if(res.result&&res.result.res_code == 1){
        this.navCtrl.push("AuditedPurchasePage", { item: res.result.res_data })
      }
    })
  }



}
