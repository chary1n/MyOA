import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReimbursementService} from './reimbursementService';
import { Storage } from '@ionic/storage';

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
  providers: [ReimbursementService]
})
export class ReimbursementPage {
  pet: string = "1";
  user_id;
  wait_approval_list:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public baoxiaoService:ReimbursementService,public storage:Storage) {
     this.storage.get('user')
      .then(res => {
        console.log(res);
        this.user_id = res.result.res_data.user_id;
        this.baoxiaoService.getApprovalList(10,0,this.user_id).then((res) => {
            console.log(res);
            if (res.result && res.result.res_code == 1) {
            this.wait_approval_list = res.result.res_data
            let index = 0;
            for (let item of this.wait_approval_list) {
              item.state = this.changeState(item.state);
              this.wait_approval_list[index] = item;
              index ++;
            }
            console.log(this.wait_approval_list)
        }
    })
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementPage');

  }

  clickMyApply() {

  }

  clickAlreadyApply() {
    
  }
  clickWaitMeApply() {

  }

  // 我要申请
  apply() {
    this.navCtrl.push('MyApplyPage')
  }

  approval_detail(){

  }

  changeState(state)
  {
    if (state == 'submit')
    {
      return "发送";
    }
    else if (state == 'manager1_approve')
    {
      return "1级审核";
    }
    else if (state == 'manager2_approve')
    {
      return "2级审核";
    }
  }

}
