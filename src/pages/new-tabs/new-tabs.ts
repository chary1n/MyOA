import { FirstShowService } from './../first-show/first_service';
import { Tabs } from "ionic-angular";
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MomentsCircleService } from '../momengs-circle/momentsCircleService';

/**
 * Generated class for the NewTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-tabs',
  templateUrl: 'new-tabs.html',
  providers: [FirstShowService, MomentsCircleService]
})
export class NewTabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  firstRoot: any = 'FirstshowMenuPage';
  workRoot: any = 'NewWorkBenchPage';
  contactRoot: any = 'MomengsCirclePage';
  // contactRoot: any = 'ContactPersonPage';
  meRoot: any = 'MePage';
  emailRoot: any = 'EmailMenuPage';
  messageNum = 1
  quanziNum = 0
  all_approval
  uid
  constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, 
    private firshowService: FirstShowService, public storage: Storage, public momentsCircleService:MomentsCircleService 
      , public events: Events) {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
      this.get_approval_num()
      this.get_moments_num()
    })

    this.events.subscribe('change', (number)=>{
      console.log("------------->");
      this.quanziNum = number;
      if (this.quanziNum != 0) {
        this.quanziNum = 1
      } else {
        this.quanziNum = 0
      }
    })
  }

  changeTabs() {
    // this.get_approval_num()
  }

  change(i) {
    if (i == 2) {
      this.menu.enable(true)
    } else if (i == 1) {
      this.get_approval_num()
      this.menu.enable(false)
    }else {
      this.menu.enable(false)
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTabsPage');
  }
  //获取审批的数目
  get_approval_num() {
    let body = {
      'uid': this.uid
    }
    this.firshowService.get_approval_num(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.all_approval = res.result.res_data.recoup_num + res.result.res_data.vacation_num
        if (this.all_approval != 0) {
          this.messageNum = 1
        } else {
          this.messageNum = 0
        }
      }
    })
  }

  //获取圈子的回复数目
  get_moments_num(){
      let body = {
        'user_id': this.uid,
      }
      var datalist = []
      this.momentsCircleService.get_moments_message(body).then(res => {
        if (res) {
          if (res.result.res_code == 1 && res.result.res_data) {
            datalist = res.result.res_data
            this.quanziNum = datalist.length
            if (this.quanziNum != 0) {
              this.quanziNum = 1
            } else {
              this.quanziNum = 0
            }
          }
        }
      })
    }
}
