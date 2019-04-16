import { FirstShowService } from './../first-show/first_service';
import { Tabs } from "ionic-angular";
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MomentsCircleService } from '../momengs-circle/momentsCircleService';
import { FirstshowMenuPage } from '../first-show/firstshow-menu/firstshow-menu'
import { AppService } from '../../app/appService'
import { HttpService } from '../../providers/HttpService'
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
  providers: [FirstShowService, MomentsCircleService, AppService]
})
export class NewTabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  firstRoot: any = FirstshowMenuPage;
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
    private firshowService: FirstShowService, public storage: Storage, public momentsCircleService: MomentsCircleService
    , public events: Events, public appService: AppService) {
      console.log('new tabs 222222')
    if (HttpService.need_login) {
      this.toAutoLogin()
    }
    else {
      this.storage.get('user').then(res => {
        this.uid = res.result.res_data.user_id;
        this.get_approval_num()
        this.get_moments_num()
      })
    }


    this.events.subscribe('change', (number) => {
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
    if (HttpService.need_login) {
      this.storage.get('user')
        .then(res => {
          if (res) {
            this.uid = res.result.res_data.user_id;
            window.localStorage.setItem("id", res.result.res_data.user_id)
            this.storage.get('user_psd').then(res_db => {
              this.storage.get("loginIndex").then(res_index => {
                this.defultChoose(res_index)

                let db_name = res_db.db_name
                this.appService.toLogin(res_db.user_email, res_db.user_psd, res_db.db_name, "0.8.0")
                  .then(res => {
                    if (res.result && res.result.res_code == 1) {
                      HttpService.user_id = res.result.res_data.user_id;
                      HttpService.user = res.result.res_data;
                      HttpService.need_login = false;
                      if (i == 2) {
                        this.menu.enable(true)
                      } else if (i == 1) {
                        this.get_approval_num()
                        this.menu.enable(false)
                      } else {
                        this.menu.enable(false)
                      }
                    }
                    else {
                    }
                  }).catch((error) => {
                  })
              })
            })
          }
        });
    }
    else {
      if (i == 2) {
        this.menu.enable(true)
      } else if (i == 1) {
        this.get_approval_num()
        this.menu.enable(false)
      } else {
        this.menu.enable(false)
      }
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
  get_moments_num() {
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

  toAutoLogin() {
    this.storage.get('user')
      .then(res => {
        if (res) {
          this.uid = res.result.res_data.user_id;
          window.localStorage.setItem("id", res.result.res_data.user_id)
          this.storage.get('user_psd').then(res_db => {
            this.storage.get("loginIndex").then(res_index => {
              this.defultChoose(res_index)

              let db_name = res_db.db_name
              this.appService.toLogin(res_db.user_email, res_db.user_psd, res_db.db_name, "0.8.0")
                .then(res => {
                  if (res.result && res.result.res_code == 1) {
                    HttpService.user_id = res.result.res_data.user_id;
                    HttpService.user = res.result.res_data;
                    HttpService.need_login = false;
                    this.get_approval_num()
                    this.get_moments_num()
                  }
                  else {
                  }
                }).catch((error) => {
                })
            })
          })
        }
      });
  }

  defultChoose(index) {
    if (index == 2) {
      HttpService.appUrl = "http://dr.robotime.com/"
    } else if (index == 3) {
      HttpService.appUrl = "http://erp.robotime.com/"
    } else if (index == 4) {
      HttpService.appUrl = "http://121.43.196.231:8888/"
    } else if (index == 1) {
      HttpService.appUrl = "http://js.robotime.com/"
    } else {
      HttpService.appUrl = HttpService.now_server_url
      // HttpService.appUrl = "http://192.168.2.10:8081/"
    }
  }
}
