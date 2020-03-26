import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';
import { FirstShowAutoService } from './../firstAutoService'

/**
 * Generated class for the NewMessageReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-message-reply',
  templateUrl: 'new-message-reply.html',
  providers: [FirstShowService, FirstShowAutoService],
})
export class NewMessageReplyPage {
  message_reply_arr = []
  uid
  search_type
  search_text

  me_type = []
  quick_type
  start_date
  end_date
  message_type

  employee_ids = []

  offset = 0

  isMoreData = true

  is_manager = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public firstShowService: FirstShowService,
    public storage: Storage, public firstShowAutoService: FirstShowAutoService, public event: Events,
    public menu: MenuController) {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
      this.getAllMessageReply()
      this.firstShowService.get_is_department(this.uid).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
            this.is_manager = res.result.res_data.is_manager
        }
      })
    })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMessageReplyPage');
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'menu9')
  }

  ionViewWillLeave() {
    this.menu.enable(false)
    this.event.unsubscribe('search_domain_message')
    this.event.unsubscribe('search_domain_message_sx')
  }

  ionViewDidEnter() {
    this.event.subscribe('search_domain_message', (data) => {
      this.me_type = data.me_type
      this.quick_type = data.quick_type
      this.start_date = data.start_date
      this.end_date = data.end_date
      this.offset = 0
      this.message_type = data.message_type
      this.getAllMessageReply()
    })

    this.event.subscribe('search_domain_message_sx', (data) => {
      this.employee_ids = data.employee_ids
      this.offset = 0
      this.getAllMessageReply()
    })
  }


  goBack() {
    this.event.publish('popNavCtrlReply', {
      'data': true
    })
  }

  itemSelected(event) {
    this.search_type = ''
    this.search_text = ''
    this.isMoreData = false
    if (event.id == 1) {
      this.search_type = "rt_context";
      this.search_text = event.name.replace("搜 动态内容：", "")
    } else if (event.id == 2){
      this.search_type = "rt_comment_subject";
      this.search_text = event.name.replace("搜 主题：", "")
    }

    let body = {
      'type': this.search_type,
      'search_text': this.search_text,
      'uid': this.uid,
      'me_type': this.me_type,
      'quick_type': this.quick_type,
      'start_date': this.start_date,
      'end_date': this.end_date,
      'employee_ids': this.employee_ids,
      'message_type': this.message_type
    }
    this.message_reply_arr = []
    this.firstShowService.search_all_sch_reply(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.message_reply_arr = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.offset = 0
    this.getAllMessageReply()
  }

  gotoRw(items) {
    this.navCtrl.push('CalendarDeatilpagePage', {
      'item_id': items.sch_id,
      'isEdit': false,
      'frontPage': 'FirstShowPage',
      'msg_id': 'id' + items.msg_id.toString()
    })
  }

  getAllMessageReply() {
    this.message_reply_arr = []
    var body = {
      'uid': this.uid,
      'offset': this.offset,
      'limit': 20,
      'me_type': this.me_type,
      'quick_type': this.quick_type,
      'start_date': this.start_date,
      'end_date': this.end_date,
      'employee_ids': this.employee_ids,
      'message_type': this.message_type,
    }
    this.firstShowService.get_meesage_reply(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.message_reply_arr = res.result.res_data
      }
    })
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  clickMenu() {
    this.event.publish('exchange_menu', {
      'data': 'normal'
    })
    this.menu.toggle('right');
  }

  clickMenuSX() {
    this.event.publish('exchange_menu', {
      'data': 'sx'
    })
    this.menu.toggle('right');
  }

  doRefresh(refresh) {
    this.isMoreData = true
    this.offset = 0
    this.getAllMessageReply()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.offset = this.offset + 20;
      var body = {
        'uid': this.uid,
        'offset': this.offset,
        'limit': 20,
        'me_type': this.me_type,
        'quick_type': this.quick_type,
        'start_date': this.start_date,
        'end_date': this.end_date,
        'employee_ids': this.employee_ids,
        'message_type': this.message_type
      }
      this.firstShowService.get_meesage_reply(body).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (var j = 0; j < item_data.length; j ++) {
            this.message_reply_arr.push(item_data[j])
          }
        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

}
