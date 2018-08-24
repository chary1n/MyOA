import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tip',
  templateUrl: 'tip.html',
  providers: [FirstShowService]
})
export class TipPage {
  frontPage:any;
  alarmList=[];
  uid;
  alarm_id='-1'
  alarm_name='不提醒'
  ischeck=false
  type_app = false
  type_notification = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public firService: FirstShowService,public storage:Storage,) {
    this.frontPage = Utils.getViewController("CalendarDeatilpagePage", navCtrl) 
    this.alarm_id = this.navParams.get('alarm_id') 
    if(this.alarm_id=='-1'){
      this.ischeck = true
    }
  }

  ionViewWillEnter() {
    this.storage.get('user').then(res =>{
      this.uid = res.result.res_data.user_id;
      let body = {
        'uid': this.uid
      }
      this.firService.get_calendar_alarms(body).then(res =>{
        if (res.result.res_data && res.result.res_code == 1) {
            this.alarmList = res.result.res_data
            for (let i = 0; i < this.alarmList.length; i++) {
              if(this.alarm_id==this.alarmList[i].alarm_id){
                this.alarmList[i].ischeck = true
              }    
            }
        }
      })
  })      
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TipPage');
  }

  cancel(){
    this.navCtrl.pop()
  }

  finish(){
    this.frontPage.data.need_fresh = true;
    this.frontPage.data.pet = 1;
    this.frontPage.data.alarm_id = this.alarm_id;
    this.frontPage.data.alarm_name = this.alarm_name;
    this.frontPage.data.type_app = this.type_app;
    this.frontPage.data.type_notification = this.type_notification;
    this.navCtrl.popTo(this.frontPage);
  }

  selectAlarm(item){
    this.ischeck = false
    for(var i=0;i<this.alarmList.length;i++){
        if(this.alarmList[i].alarm_id==item.alarm_id){
          item.ischeck = true
          this.alarm_id = item.alarm_id
          this.alarm_name = item.alarm_name
        }else{
          this.alarmList[i].ischeck = false
        }
    }
  }

  selectNo(){
      this.type_notification = false
      this.type_app = false
      this.ischeck = true
      this.alarm_id = '-1'
      this.alarm_name = '不提醒'
      for (let i = 0; i < this.alarmList.length; i++) {
        this.alarmList[i].ischeck = false
      }
  }
}
