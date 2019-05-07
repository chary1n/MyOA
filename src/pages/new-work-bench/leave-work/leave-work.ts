import { NavController, NavParams, IonicPage, ActionSheetController, Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LeaveService} from './leaveService'

/**
 * Generated class for the LeaveWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-work',
  templateUrl: 'leave-work.html',
  providers: [LeaveService],
})
export class LeaveWorkPage {
  user_id
  wait_approval_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
  public leaveService: LeaveService) {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.leaveService.get_dismission_list({'user_id': this.user_id}).then(result => {
          if (result.result.res_data && result.result.res_code == 1) {
            this.wait_approval_list = result.result.res_data
            // this.wait_approval_list.push(result.result.res_data[0])
          }
        })
      }
      )
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
       this.wait_approval_list = []
      this.leaveService.get_dismission_list({'user_id': this.user_id}).then(result => {
          if (result.result.res_data && result.result.res_code == 1) {
            this.wait_approval_list = result.result.res_data
            // this.wait_approval_list.push(result.result.res_data[0])
          }
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveWorkPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  changeState(state) {
    if (state == 0) {
      return "员工确认";
    }
    else if (state == 1) {
      return "审核中";
    }
    else if (state == 2) {
      return "人事确认";
    }
    else if (state == 3) {
      return "完成";
    }
    else if (state == 4) {
      return "被拒";
    }
    else {
      return state;
    }
  }

  approved_detail(item){
    this.navCtrl.push('LeaveWorkDetailPage', {
      'leave_id': item.dimission_id,
      'user_id': this.user_id,
    })
  }

}
