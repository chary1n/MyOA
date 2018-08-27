import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController } from 'ionic-angular';
import { AttendanceAutoService } from './attendance-recoup-auto'
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
  providers: [AttendanceAutoService],
})
export class AttendaceRecoupPage {
  inner_type = 'me'
  me_list = ['1','2','1']
  wait_me_list = ['1','1','1']
  constructor(public navCtrl: NavController, public navParams: NavParams,public attendanceAutoService: AttendanceAutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendaceRecoupPage');
  }

  click_me(){
    this.inner_type = 'me'
  }

  click_wait_me(){
     this.inner_type = 'wait_me'
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
  }

}
