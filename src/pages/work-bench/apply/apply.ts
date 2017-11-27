import { ReimbursementAutoService } from './../reimbursement/reimbursement-auto';
import { ReimbursementService } from './../reimbursement/reimbursementService';
import { ApplyAutoService } from './apply-auto';
import { CreateApplyPage } from './../create-apply/create-apply';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
declare let cordova: any;

/**
 * Generated class for the ApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
  providers: [CommonUseServices, ApplyAutoService, ReimbursementService, ReimbursementAutoService],
})
export class ApplyPage {
  pet: string = "0"; 
  wait_approval_list: any;
  already_approval_list: any;
  isMoreData1 = true;
  isMoreData2 = true;
  applyList: any;
  leaveList;
  user;
  user_id;
  actionSheetCtrl;
  limit = 20;
  offset = 0;
  isMoreData = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonUseServices, public storage: Storage,
    actionSheetCtrl: ActionSheetController,
    public baoxiaoService: ReimbursementService,
    public reimbursementAutoService: ReimbursementAutoService,
    public applyAutoService: ApplyAutoService) {
    this.actionSheetCtrl = actionSheetCtrl

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');

  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      // console.log(111);
      this.reloadData();
      this.navParams.data.need_fresh = false;
    }
    let self = this
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        self.getApplyList(20, 0, this.user_id)
      });
  }

  itemSelected0(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "number";
      search_text = event.name.replace("搜 单号:", "")
    }
    else if (event.id == 2) {
      type = "department";
      search_text = event.name.replace("搜 部门:", "")
    } else if (event.id == 3) {
      type = "employee";
      search_text = event.name.replace("搜 员工:", "")
    }
    this.commonService.searchApplyList(this.user_id, type, search_text).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.isMoreData = false;
        this.applyList = res.result.res_data
        let index = 0;
        if (this.applyList) {
          for (let item of this.applyList) {
            item.stateCN = this.changeState(item.state)
            this.applyList[index] = item;
            index++;
          }
        }
      }
    })

  }


  doRefresh0(refresh) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.commonService.getApplyList(this.offset, this.limit, this.user_id).then(res => {
      refresh.complete();
      if (res.result && res.result.res_data) {
        this.applyList = res.result.res_data;
        if (this.applyList.length > 0) {
          for (let item of this.applyList) {
            item.stateCN = this.changeState(item.state)
          }
        }
      }
    })
  }


  doInfinite0(infinite) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.commonService.getApplyList(this.offset, this.limit, this.user_id).then(res => {
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
            item.stateCN = this.changeState(item.state)
            console.log(item.stateCN)
            this.applyList.push(item)
          }
        }
        else {
          this.isMoreData = false;
        }
        infinite.complete();
      })
    } else {
      infinite.complete();
    }
  }



  getApplyList(limit, offset, id) {
    this.commonService.getApplyList(offset, limit, id).then(res => {
      if (res.result && res.result.res_data) {
        this.applyList = res.result.res_data;
        if (this.applyList.length > 0) {
          for (let item of this.applyList) {
            item.stateCN = this.changeState(item.state)
          }
        }
      }
    })
  }
  // 请假
  getLeaveList(limit, offset, id) {
    this.commonService.getLeaveList(offset, limit, id).then(res => {
      if (res.result && res.result.res_data) {
        this.leaveList = res.result.res_data;
        if (this.leaveList.length > 0) {
          for (let item of this.leaveList) {
            item.stateCN = this.changeLeave(item.state)
            console.log(item.stateCN)
          }
        }
      }
    })
  }




  showActionSheet() {
    this.navCtrl.push('BaoxiaoApplyPage')
  }

  clickApply(id) {
    this.commonService.getApplyDetail(id).then(res => {
      if (res.result && res.result.res_data) {
        console.log(res);
        this.navCtrl.push('ApplyDetailPage', {
          res_data: res.result.res_data
        });
      }
    })
  }


  clickLeave(id) {
    this.commonService.getLeaveDetail(id).then(res => {
      if (res.result && res.result.res_data) {
        console.log(res);
        this.navCtrl.push('LeaveDetailPage', {
          res_data: res.result.res_data
        });
      }
    })
  }


  changeState(state) {
    if (state == 'draft') {
      return '草稿'
    } else if (state == "submit") {
      return '发送'
    } else if (state == "manager1_approve") {
      return '1级审核'
    } else if (state == "manager2_approve") {
      return '2级审核'
    } else if (state == "manager3_approve") {
      return 'General Manager Approved'
    } else if (state == "approve") {
      return '已批准'
    } else if (state == "post") {
      return '已过账'
    } else if (state == "done") {
      return '已支付'
    } else if (state == "cancel") {
      return '已拒绝'
    } else {
      return state;
    }
  }

  changeLeave(state) {
    if (state == 'draft') {
      return '待提交'
    } else if (state == "cancel") {
      return '已取消'
    } else if (state == "confirm") {
      return '待批准'
    } else if (state == "refuse") {
      return '已拒绝'
    } else if (state == "validate1") {
      return '第二次审批'
    } else if (state == "validate") {
      return '已批准'
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

  clickMyApply() {

  }

  clickAlreadyApply() {
    this.limit = 20;
    this.offset = 0;
    this.baoxiaoService.getAlreadApprovalList(this.limit, this.offset, this.user_id).then((res) => {
      console.log(res);
      if (res.result && res.result.res_code == 1 && res.result.res_data) {
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
        if (res.result && res.result.res_code == 1 && res.result.res_data) {
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
          if (res.result.res_data && res.result.res_code == 1) {
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
          if (res.result.res_data && res.result.res_code == 1) {
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

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }
}
