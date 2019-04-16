import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, Events, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';
import { FirstShowPage } from './../first-show'
import { AppService } from '../../../app/appService'
import { HttpService } from '../../../providers/HttpService'
/**
 * Generated class for the FirstshowMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-firstshow-menu',
  templateUrl: 'firstshow-menu.html',
  providers: [FirstShowService, AppService],
})
export class FirstshowMenuPage {
  root = FirstShowPage;
  me_type = []
  state_type = 'all'
  // start_datetime = new Date(new Date().getTime()+8*60*60*1000).toISOString();
  end_date;
  start_date;
  is_show_me = true
  event_list = []
  uid
  select_event = []
  select_event_id = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public storage: Storage, public menu: MenuController,
    public event: Events, public firService: FirstShowService, public appService: AppService) {
       console.log('first show 333333')
    //   events.subscribe('ChooseMenuPage', (data) => {

    // });
    // events.subscribe('changeTeam',(data) => {
    //   if (data.data == 'team'){
    //     this.is_show_me = false
    //   }
    //   else if (data.data == 'me'){
    //     this.is_show_me = true
    //   }
    // })
    // events.subscribe('initData', (data) => {
    //   this.me_type = []
    //   this.state_type = 'all'
    //   this.start_date = ''
    //   this.end_date = ''
    // })

    this.storage.get('user_schedule_domain_new').then(res => {
      if (res) {
        this.me_type = res.me_type
        this.state_type = res.state_type
        this.select_event_id = res.event_type_id
      }
      else {
        this.me_type = []
        this.state_type = 'all'
        this.select_event_id = []
      }
    })
    if (HttpService.need_login) {
      this.toAutoLogin()
    }
    else {
      this.storage.get('user').then(res => {
        this.uid = res.result.res_data.user_id
        let body = {
          'uid': this.uid
        }
        this.firService.get_event_type(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.event_list = res.result.res_data
            console.log(this.event_list)
          }
        })
      })
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseMenuPage');
  }

  closeMenu() {
    console.log('closeMenu')
  }

  openMenu() {
  }

  dragMenu() {
    console.log('拖菜单')
  }

  click_me_all() {
    // this.me_type = 'all'
  }

  click_me_create() {
    if (this.me_type.indexOf('create') > -1) {
      let index = 0
      for (let i = 0; i < this.me_type.length; i++) {
        if (this.me_type[i] == 'create') {
          index = i
        }
      }
      this.me_type.splice(index, 1)
    }
    else {
      this.me_type.push('create')
    }
  }

  click_me_fuze() {
    if (this.me_type.indexOf('fuze') > -1) {
      let index = 0
      for (let i = 0; i < this.me_type.length; i++) {
        if (this.me_type[i] == 'fuze') {
          index = i
        }
      }
      this.me_type.splice(index, 1)
    }
    else {
      this.me_type.push('fuze')
    }
  }

  click_me_canyu() {
    if (this.me_type.indexOf('canyu') > -1) {
      let index = 0
      for (let i = 0; i < this.me_type.length; i++) {
        if (this.me_type[i] == 'canyu') {
          index = i
        }
      }
      this.me_type.splice(index, 1)
    }
    else {
      this.me_type.push('canyu')
    }
  }

  click_state_all() {
    this.state_type = 'all'
    // this.menu.close()
  }

  click_state_unfinish() {
    if (this.state_type == 'unfinish') {
      this.state_type = 'all'
    }
    else {
      this.state_type = 'unfinish'
    }

  }

  click_state_finish() {
    if (this.state_type == 'finish') {
      this.state_type = 'all'
    }
    else {
      this.state_type = 'finish'
    }
  }

  changeStartDate(event) {
    this.start_date = event
  }

  changeEndDate(event) {
    this.end_date = event
  }

  reset() {
    this.me_type = []
    this.state_type = 'all'
    this.end_date = ''
    this.start_date = ''
    this.select_event_id = []
    this.select_event = []
  }

  confirm() {
    this.menu.close()
    this.event.publish('search_domain_first', {
      me_type: this.me_type,
      state_type: this.state_type,
      event_type_id: this.select_event_id,
      // start_date:this.start_date,
      // end_date:this.end_date,
    })
  }

  click_event(item, i) {
    if (!(this.select_event instanceof Array)) {
      this.select_event = []
    }
    if (!(this.select_event_id instanceof Array)) {
      this.select_event_id = []
    }
    if (this.select_event_id.indexOf(item.id) > -1) {
      let index = 0
      for (let i = 0; i < this.select_event_id.length; i++) {
        if (item.id == this.select_event_id[i]) {
          index = i
        }
      }
      this.select_event_id.splice(index, 1)
    }
    else {
      this.select_event_id.push(item.id)
    }

  }

  isSelect(item) {
    if (this.select_event_id.length) {
      if (this.select_event_id.indexOf(item.id) > -1) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  isSelectMe(item) {
    if (this.me_type.length) {
      if (this.me_type.indexOf(item) > -1) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
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
                    let body = {
                      'uid': this.uid
                    }
                    this.firService.get_event_type(body).then(res => {
                      if (res.result.res_data && res.result.res_code == 1) {
                        this.event_list = res.result.res_data
                        console.log(this.event_list)
                      }
                    })
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
