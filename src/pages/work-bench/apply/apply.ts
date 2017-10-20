import { CreateApplyPage } from './../create-apply/create-apply';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';


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
  providers: [CommonUseServices],
})
export class ApplyPage {
  applyList: any;
  user;
  user_id;
  actionSheetCtrl;
  limit = 20;
  offset = 0;
  isMoreData = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonUseServices, public storage: Storage,
    actionSheetCtrl: ActionSheetController) {
    this.actionSheetCtrl = actionSheetCtrl
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        console.log(this.user_id);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');

  }

  ionViewWillEnter() {
    this.getApplyList(20, 0, this.user_id)
  }

  doRefresh(refresh) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.commonService.getApplyList(this.offset, this.limit, this.user_id).then(res => {
      if (res.result && res.result.res_code == 1) {
        refresh.complete();
        this.applyList = res.result.res_data;
        if (this.applyList.length > 0) {
          for (let item of this.applyList) {
            item.stateCN = this.change(item.state)
          }
        }
      }
    })
  }


  doInfinite(infinite) {
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
          for (let item of this.applyList) {
            item.stateCN = this.change(item.state)
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
      if (res.result && res.result.res_code == 1) {
        this.applyList = res.result.res_data;
        if (this.applyList.length > 0) {
          for (let item of this.applyList) {
            item.stateCN = this.change(item.state)
          }
        }
      }
    })
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择类型',
      buttons: [
        {
          text: '报销',
          handler: () => {
            this.navCtrl.push('BaoxiaoApplyPage')
          }
        }, {
          text: '申购',
          handler: () => {
          }
        }, {
          text: '请假',
          handler: () => {
            
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  clickApply(id) {
    this.commonService.getApplyDetail(id).then(res => {
      if (res.result && res.result.res_code == 1) {
        console.log(res);
        this.navCtrl.push('ApplyDetailPage', {
          res_data: res.result.res_data
        });
      }
    })

  }

  change(state) {
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
    }
  }

}
