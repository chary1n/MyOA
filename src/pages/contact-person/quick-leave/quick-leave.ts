import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform, ActionSheetController } from 'ionic-angular';
import { ContactService } from './../contact-persionService'
import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the QuickLeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quick-leave',
  templateUrl: 'quick-leave.html',
  providers: [ContactService],
})
export class QuickLeavePage {
  is_system_salary
  uid
  employee_id
  leave_date
  fund_end_date
  constructor(public navCtrl: NavController, public navParams: NavParams, public contactService:ContactService,
  public storage:Storage, public toast:ToastController) {
    this.leave_date = Utils.dateFormat(new Date(), 'yyyy-MM-dd')
    this.is_system_salary = this.navParams.get('is_system_salary')
    this.employee_id = this.navParams.get('employee_id')
    this.storage.get('user')
      .then(res => {
        this.uid = res.result.res_data.user_id
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickLeavePage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  click_leave(){
    var body = {
      'employee_id': this.employee_id,
      'uid': this.uid,
      'leave_date': this.leave_date,
      'fund_end_date': this.fund_end_date,
    }
    this.contactService.un_active_employee(body).then(res => {
      if (res.result.res_code == 1) {
        Utils.toastButtom("操作成功", this.toast)
        this.navCtrl.pop()
      }
    })
  }

}
