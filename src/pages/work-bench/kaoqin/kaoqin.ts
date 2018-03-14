// import { BLE } from '@ionic-native/ble';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Storage } from '@ionic/storage';
import { KaoQinService} from './kaoqinService';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the KaoqinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kaoqin',
  templateUrl: 'kaoqin.html',
  providers:[KaoQinService,DatePipe],
})
export class KaoqinPage {
  isWrite = true;
  isLook = false;
  writeImg;
  lookImg;
  show_type = "me"
  user_ava;
  user_name;
  user;
  items;
  divHeight;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
    public kaoqinService:KaoQinService,private datePipe: DatePipe,) {
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalSheetPage');
    this.change_divClass_height(400)
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user = res.result.res_data
        this.user_ava = res.result.res_data.user_ava
        this.user_name = res.result.res_data.name
        this.kaoqinService.get_today_attendance(this.formatTime_day_start(new Date()),this.formatTime_day_end(new Date()),this.user.user_id).then(res => {
            console.log(res)
            if (res.result.res_data && res.result.res_code == 1) {
              this.items = res.result.res_data
              if (this.items.length * 140 + 30 > 400){
                this.change_divClass_height(this.items.length * 140 + 30)
              }
            }
        })
      }) 
    this.writeImg = "assets/img/journal_sheet/write_logcolor.png"
    this.lookImg = "assets/img/journal_sheet/look_log.png"
    
    
  }

  openBle(){
    // this.ble.enable().then(res=>{
    //   console.log(res)
    // });
  }

  scan(){
    // this.ble.scan([], 5).subscribe(device => {
    //   console.log(JSON.stringify(device));
    //   });
  }

  chooseWrite(){
      this.isWrite = true
      this.isLook = false
      this.writeImg = "assets/img/journal_sheet/write_logcolor.png"
      this.lookImg = "assets/img/journal_sheet/look_log.png"
  }

  chooseLook(){
    this.isWrite = false
    this.isLook = true
    this.writeImg = "assets/img/journal_sheet/write_log.png"
    this.lookImg = "assets/img/journal_sheet/look_logcolor.png"
    this.show_type = "me"
  }

  click_me(){
    this.show_type = "me"
  }

  click_day(){
    this.show_type = "day"
  }

  click_month(){
    this.show_type = "month"
  }

  formatTime_day_start(date){
    
    let timestamp = Date.parse(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss').replace(/-/g, '/'));
    let timestamp_now = timestamp / 1000 - 24 * 60 * 60
    let date_now = new Date(timestamp_now * 1000)
    let year = date_now.getFullYear()
    let month = date_now.getMonth() + 1
    let day = date_now.getDate()
    let hour = 16
    let minute = 0
    let second = 0
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

  formatTime_day_end(date){
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = 15
    let minute = 59
    let second = 59
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  }

  calcStart(item){
    let timestamp_e = Date.parse(item.check_in.replace(/-/g, '/'))
    console.log(timestamp_e)
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    return time_str
  }

  calcEnd(item){
    let timestamp_e = Date.parse(item.check_out.replace(/-/g, '/'))
    console.log(timestamp_e)
    let timestamp_end = timestamp_e / 1000 + 8 * 60 * 60
    let date_end = new Date(timestamp_end * 1000)
    let time_str = [this.formatO(date_end.getHours()), this.formatO(date_end.getMinutes())].join(':')
    return time_str
  }

  formatO(date){
    return String(date).length == 2 ? date : '0' + date
  }

  change_divClass_height(height){
     let elementContent = document.getElementById("divClass");
     return elementContent.style.height = height + "px"
  }

}
