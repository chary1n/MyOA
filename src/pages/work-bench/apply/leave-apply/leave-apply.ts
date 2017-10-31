import { CommonUseServices } from './../../commonUseServices';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the LeaveApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-apply',
  templateUrl: 'leave-apply.html',
  providers: [CommonUseServices]
})
export class LeaveApplyPage {
  leaveType ;
  leaveTypeList ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public commonServices : CommonUseServices) {
    this.commonServices.get_leaveType().then(res=>{
      if(res.result&&res.result.res_data){
          this.leaveTypeList = res.result.res_data.typeList
          console.log(this.leaveTypeList)
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveApplyPage');
  }
  goBack(){
    this.navCtrl.pop()
  }

}
