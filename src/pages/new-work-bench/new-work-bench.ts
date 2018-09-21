import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkBenchModel } from './../../model/WorkBenchModel';
import { Storage } from '@ionic/storage';
import { CommonUseServices} from '../work-bench/commonUseServices';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the NewWorkBenchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-work-bench',
  templateUrl: 'new-work-bench.html',
  providers: [CommonUseServices],
})
export class NewWorkBenchPage {
  inner_type = 'normal'
  loginIndex
  performance = 0
  vacation_num = 0
  recoup_num = 0
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusbar:StatusBar,public services:CommonUseServices,
              public storage: Storage) {
      
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWorkBenchPage');
  }

  ionViewWillEnter(){
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();

    
  }

  ionViewDidEnter() {
    this.storage.get('user')
      .then(res => {
        console.log(res);
        let uid = res.result.res_data.user_id

        this.storage.get("loginIndex").then(res => {
          this.loginIndex = res
          console.log("loginIndex = "+this.loginIndex)

            this.services.get_all_num({
              'uid': uid
            }).then(res => {
              if(res.result.res_code==1 && res.result){
                console.log(res)
                this.performance = res.result.res_data.performance
                this.vacation_num = res.result.res_data.vacation_num
                this.recoup_num = res.result.res_data.recoup_num
              }
            })
          })
        })
  }

  click_attendance(){
    this.navCtrl.push('KaoqinPage')
  }

  click_vacation(){
    this.navCtrl.push('VacationApprovalPage')
  }

  click_recoup(){
    this.navCtrl.push('AttendaceRecoupPage')
  }

  click_chuchai(){
    this.navCtrl.push('ChuchaiPage')
  }

  click_jixiao(){
    this.navCtrl.push('PerformancePage')
  }

  toAll(){
    this.navCtrl.push('AllSchedulePage')
  }
}
