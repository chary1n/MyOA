import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { NewReimbursementService } from './new-reimbursementService';
import { Storage } from '@ionic/storage';
import { NewReimbursementAutoService } from './new-reimbursementautoService'
import { NewReimbursementMeAutoService } from './new-reimbursementMeautoService'

/**
 * Generated class for the NewReimbursementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-reimbursement',
  templateUrl: 'new-reimbursement.html',
  providers: [NewReimbursementService, NewReimbursementAutoService, NewReimbursementMeAutoService]
})
export class NewReimbursementPage {
  type = 'wait_approved'
  user_id;
  wait_approval_list = [];
  already_approval_list = [];
  me_list = [];
  isMoreData1 = true;
  isMoreData2 = true;
  isMoreData3 = true
  limit: any;
  offset: any;
  is_ios = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public baoxiaoService: NewReimbursementService, public storage: Storage,
    public reimbursementAutoService: NewReimbursementAutoService, public platform: Platform,
    public reimbursementMeAutoService: NewReimbursementMeAutoService, ) {
    if (this.platform.is('ios')) {
      this.is_ios = true
    }
    this.limit = 20;
    this.offset = 0;
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
          if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data
            let index = 0;
            if (this.wait_approval_list) {
              for (let item of this.wait_approval_list) {
                item.state = this.changeState(item.state);
                this.wait_approval_list[index] = item;
                index++;
              }
            }
          }
        })
      });
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      // console.log(111);
      this.reloadData();
      this.navParams.data.need_fresh = false;
    }
  }

  goBack() {
    this.navCtrl.pop()
  }

  clickAlreadyApply() {
    this.type = 'me_approved'
    this.limit = 20;
    this.offset = 0;
    let body = {
      'limit': this.limit,
      'offset': this.offset,
      'user_id': this.user_id,
    }
    this.baoxiaoService.get_before_approved_list(body).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.already_approval_list = res.result.res_data
        let index = 0;
        if (this.already_approval_list) {
          for (let item of this.already_approval_list) {
            item.state = this.changeState(item.state);
            this.already_approval_list[index] = item;
            index++;
          }
        }
      }
    })
  }

  clickWaitMeApply() {
    this.type = 'wait_approved'
    this.limit = 20;
    this.offset = 0;
    this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
        let index = 0;
        if (this.wait_approval_list) {
          for (let item of this.wait_approval_list) {
            item.state = this.changeState(item.state);
            this.wait_approval_list[index] = item;
            index++;
          }
        }
      }
    })
  }

  clickMeApply() {
    this.type = 'me'
    this.limit = 20;
    this.offset = 0;
    let body = {
      'limit': this.limit,
      'offset': this.offset,
      'user_id': this.user_id,
    }
    this.baoxiaoService.get_me_total_bx(body).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.me_list = res.result.res_data
        let index = 0;
        if (this.me_list) {
          for (let item of this.me_list) {
            item.state = this.changeState(item.state);
            this.me_list[index] = item;
            index++;
          }
        }
      }
    })
  }

  doRefresh(refresh) {
    this.limit = 20;
    this.offset = 0;
    if (this.type == "wait_approved") {
      this.isMoreData1 = true;
      this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.wait_approval_list = res.result.res_data
          let index = 0;
          if (this.wait_approval_list) {
            for (let item of this.wait_approval_list) {
              item.state = this.changeState(item.state);
              this.wait_approval_list[index] = item;
              index++;
            }

          }
        }
        refresh.complete();
      })
    }
    else if (this.type == "me_approved") {
      this.isMoreData2 = true;
      this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.already_approval_list = res.result.res_data
          let index = 0;
          for (let item of this.already_approval_list) {
            item.state = this.changeState(item.state);
            this.already_approval_list[index] = item;
            index++;
          }

        }
        refresh.complete();
      })
    }
  }

  changeState(state) {
    if (state == 'draft') {
      return "草稿";
    }
    else if (state == 'cancel') {
      return "被拒";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'rejected') {
      return "被拒";
    }
    else if (state == 'approve') {
      return "已批准";
    }
    else if (state == 'post') {
      return "已过账";
    }
    else if (state == 'done') {
      return "已支付";
    }
    else {
      return state;
    }
  }

  approved_detail(item) {
    this.baoxiaoService.get_bx_detail({ user_id: this.user_id, bx_id: item.sheet_id }).then((res) => {
      if (res.result && res.result.res_code == 1) {
        let item_request = res.result.res_data
        item_request.state = this.changeState(item.state);
        this.navCtrl.push('NewReimbursementDetailPage', {
          item: item_request,
        });
      }
    })

  }

  reloadData() {
    this.limit = 20;
    this.offset = 0;
    this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
        let index = 0;
        if (this.wait_approval_list) {
          for (let item of this.wait_approval_list) {
            item.state = this.changeState(item.state);
            this.wait_approval_list[index] = item;
            index++;
          }
        }
      }
    })
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

    if (this.type == "wait_approved") {
      this.baoxiaoService.searchApproveList(type, this.user_id, search_text).then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.wait_approval_list = res.result.res_data
          let index = 0;
          if (this.wait_approval_list) {
            for (let item of this.wait_approval_list) {
              item.state = this.changeState(item.state);
              this.wait_approval_list[index] = item;
              index++;
            }
          }
        }
      })
    }
    else if (this.type == "me_approved") {
      this.baoxiaoService.searchAlreadyApproveList(type, this.user_id, search_text).then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.already_approval_list = res.result.res_data
          let index = 0;
          if (this.already_approval_list) {
            for (let item of this.already_approval_list) {
              item.state = this.changeState(item.state);
              this.already_approval_list[index] = item;
              index++;
            }
          }
        }
      })
    }
  }

  itemClearSelected(event) {
    if (this.type == 'wait_approved') {
      this.clickWaitMeApply()
    }
    else if (this.type == 'me_approved') {
      this.clickAlreadyApply()
    }
  }

  itemMeSelected(event) {
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
    this.baoxiaoService.searchMeList(type, this.user_id, search_text).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.me_list = res.result.res_data
        let index = 0;
        if (this.me_list) {
          for (let item of this.me_list) {
            item.state = this.changeState(item.state);
            this.me_list[index] = item;
            index++;
          }
        }
      }
    })
  }

  itemClearMeSelected(event) {
    this.clickMeApply()
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

}
