import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReimbursementService } from './reimbursementService';
import { Storage } from '@ionic/storage';
import { ReimbursementAutoService } from './reimbursement-auto'
/**
 * Generated class for the ReimbursementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reimbursement',
  templateUrl: 'reimbursement.html',
  providers: [ReimbursementService, ReimbursementAutoService]
})
export class ReimbursementPage {
  pet: string = "1";
  user_id;
  wait_approval_list: any;
  already_approval_list: any;
  isMoreData1 = true;
  isMoreData2 = true;
  limit: any;
  offset: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public baoxiaoService: ReimbursementService, public storage: Storage,
    public reimbursementAutoService: ReimbursementAutoService) {
    this.limit = 20;
    this.offset = 0;
    this.storage.get('user')
      .then(res => {
        console.log(res);
        this.user_id = res.result.res_data.user_id;
        this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
          console.log(res);
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
            console.log(this.wait_approval_list)
          }
        })
      });
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      // console.log(111);
      this.reloadData();
      this.navParams.data.need_fresh = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementPage');
  }

  clickMyApply() {

  }

  clickAlreadyApply() {
    this.limit = 20;
    this.offset = 0;
    this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then((res) => {
      console.log(res);
      if (res.result && res.result.res_code == 1) {
        this.already_approval_list = res.result.res_data
        let index = 0;
        for (let item of this.already_approval_list) {
          item.state = this.changeState(item.state);
          this.already_approval_list[index] = item;
          index++;
        }
      }
    })
  }
  clickWaitMeApply() {
    this.limit = 20;
    this.offset = 0;
    this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
      console.log(res);
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
        console.log(this.wait_approval_list)
      }
    })
  }

  // 我要申请
  apply() {
    this.navCtrl.push('MyApplyPage')
  }

  approval_detail(item) {
    this.navCtrl.push('ReimbursementDetailPage', {
      item: item,
    });
  }

  approved_detail(item) {
    this.navCtrl.push('ReimbursementDetailPage', {
      item: item,
    });
  }

  changeState(state) {
    if (state == 'submit') {
      return "发送";
    }
    else if (state == 'manager1_approve') {
      return "1级审核";
    }
    else if (state == 'manager2_approve') {
      return "2级审核";
    }
    else if (state == 'manager3_approve') {
      return "General Manager Approve";
    }
    else if (state == 'approve') {
      return "已批准";
    }
    else if (state == 'post') {
      return "已过账";
    }
    else if (state == 'post') {
      return "已过账";
    }
    else if (state == 'done') {
      return "已支付";
    }
    else if (state == 'cancel') {
      return "已拒绝";
    }
    else {
      return state;
    }
  }

  reloadData() {
    this.limit = 20;
    this.offset = 0;
    this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
      console.log(res);
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
        console.log(this.wait_approval_list)

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

    if (this.pet == "1") {
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
    else {
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

  doRefresh(refresh) {
    this.limit = 20;
    this.offset = 0;
    if (this.pet == "1") {
      this.isMoreData1 = true;
      this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
        console.log(res);
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
          console.log(this.wait_approval_list)
        }
        refresh.complete();
      })
    }
    else {
      this.isMoreData2 = true;
      this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then((res) => {
        console.log(res);
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

  doInfinite(infiniteScroll) {
    if (this.pet == "1") {
      if (this.isMoreData1 == true) {
        this.limit = 20;
        this.offset = this.offset + 20;
        this.baoxiaoService.getApprovalList(this.limit, this.offset, this.user_id).then((res) => {
          console.log(res);
          if (res.result && res.result.res_code == 1) {
            if (res.result.res_data.length == 20) {
              this.isMoreData1 = true;
            }
            else {
              this.isMoreData1 = false;
            }

            let index = 0;
            if (res.result.res_data) {
              for (let item of res.result.res_data) {
                this.wait_approval_list.push(item);
              }
              for (let item of this.wait_approval_list) {
                item.state = this.changeState(item.state);
                this.wait_approval_list[index] = item;
                index++;
              }

            }
            console.log(this.wait_approval_list)

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
    }
    else {
      if (this.isMoreData2 == true) {
        this.limit = 20;
        this.offset = this.offset + 20;
        this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then((res) => {
          console.log(res);
          if (res.result && res.result.res_code == 1) {
            if (res.result.res_data.length == 20) {
              this.isMoreData2 = true;
            }
            else {
              this.isMoreData2 = false;
            }
            let index = 0;
            if (res.result.res_data) {
              for (let item of res.result.res_data) {
                this.already_approval_list.push(item);
              }
              for (let item of this.already_approval_list) {
                item.state = this.changeState(item.state);
                this.already_approval_list[index] = item;
                index++;
              }
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
    }
  }
}
