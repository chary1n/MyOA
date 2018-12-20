import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, Events, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';

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
  providers: [FirstShowService],
})
export class FirstshowMenuPage {
  root = 'FirstShowPage';
  me_type = 'all'
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
    public event: Events, public firService: FirstShowService) {

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
    events.subscribe('initData', (data) => {
      this.me_type = 'all'
      this.state_type = 'all'
      this.start_date = ''
      this.end_date = ''
    })

    this.storage.get('user_schedule_domain').then(res => {
        this.me_type = res.me_type
        this.state_type = res.state_type
        this.select_event_id = res.event_type_id
        this.select_event = res.event_type
      })

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
    this.me_type = 'all'
  }

  click_me_create() {
    this.me_type = 'create'
  }

  click_me_fuze() {
    this.me_type = 'fuze'
  }

  click_me_canyu() {
    this.me_type = 'canyu'
  }

  click_state_all() {
    this.state_type = 'all'
    // this.menu.close()
  }

  click_state_unfinish() {
    this.state_type = 'unfinish'
  }

  click_state_finish() {
    this.state_type = 'finish'
  }

  changeStartDate(event) {
    this.start_date = event
  }

  changeEndDate(event) {
    this.end_date = event
  }

  reset() {
    this.me_type = 'all'
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
      event_type: this.select_event
      // start_date:this.start_date,
      // end_date:this.end_date,
    })
  }

  click_event(item){
    if (!(this.select_event instanceof Array)){
      this.select_event = []
    }
    if (!(this.select_event_id instanceof Array)){
      this.select_event_id = []
    }
    this.select_event.push(item.display_name)
    this.select_event_id.push(item.id)
  }

  isSelect(item){
    if (this.select_event_id.length){
      if (this.select_event_id.indexOf(item.id) > -1) {
        return true
      }
      else
      {
        return false
      }
    }
    else
    {
      return false
    }
  }
}
