import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController } from 'ionic-angular';
import { AttendanceAutoService } from './attendance-recoup-auto'
import { Storage } from '@ionic/storage';
import { AttendanceService} from './attendanceService';
declare let cordova: any;

/**
 * Generated class for the AttendaceRecoupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attendace-recoup',
  templateUrl: 'attendace-recoup.html',
  providers: [AttendanceAutoService,AttendanceService],
})
export class AttendaceRecoupPage {
  // inner_type = 'me'
  inner_type = 'wait_me'
  me_list = []
  wait_me_list = []
  is_manager = false
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public attendanceAutoService: AttendanceAutoService,
              public storage:Storage,public attendanceService:AttendanceService) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendaceRecoupPage');
  }

  ionViewWillEnter() {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.attendanceService.get_is_department(res.result.res_data.user_id).then(result => {
            if (result.result.res_data && result.result.res_code == 1) {
              this.is_manager = result.result.res_data.is_manager
            }
            if (this.inner_type == 'wait_me')
            {
              this.click_wait_me()
            }
            else
            {
              this.click_me()
            }
          }
        )
      }
      )
  }

  panEvent($event) {
    cordova.plugins.Keyboard.close();
  }

  click_me(){
    this.inner_type = 'me'
    this.me_list = []
    this.attendanceService.get_all_edit_card(this.user_id,false).then(res => {
      console.log(res)
                if (res.result.res_data && res.result.res_code == 1) {
                    console.log(res.result.res_data)
                    this.me_list = res.result.res_data
                }
              })
  }

  click_wait_me(){
     this.inner_type = 'wait_me'
     this.wait_me_list = []
     this.attendanceService.get_all_edit_card(this.user_id,true).then(my_data => {
                if (my_data.result.res_data && my_data.result.res_code == 1) {
                    this.wait_me_list = my_data.result.res_data
                }
              })         
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "rt_name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "rt_employee_id";
      search_text = event.name.replace("搜 申请人：", "")
    }
    this.wait_me_list = []
    this.attendanceService.search_edit_card(type,search_text,this.user_id).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.wait_me_list = res.result.res_data
      }
    })
  }

  approval_detail(item){
    this.navCtrl.push('AttendanceRecoupDetailPage',{
      data_item:item,
    })
  }

  approval_detail_no_approve(item){
    this.navCtrl.push('AttendanceRecoupDetailPage',{
      data_item:item,
    })
  }

  changeDate(date){
    // let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return date;
  }

  click_submit(){
    this.navCtrl.push('AttendanceRecoupCreatePage')
  }

}
