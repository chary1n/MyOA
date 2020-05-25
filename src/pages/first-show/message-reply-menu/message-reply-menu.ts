import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, Events, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';
import 'jquery'

/**
 * Generated class for the MessageReplyMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message-reply-menu',
  templateUrl: 'message-reply-menu.html',
  providers: [FirstShowService]
})
export class MessageReplyMenuPage {
  root = 'NewMessageReplyPage';
  me_type = []
  state_type = 'all'
  // start_datetime = new Date(new Date().getTime()+8*60*60*1000).toISOString();
  end_date;
  start_date;
  is_show_me = true

  quick_type = ''

  menu_type = 'normal'

  setting
  zNodes = []
  tree_obj

  uid

  is_manager

  message_type = ''

  tree_type = 'main'
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public storage: Storage, public menu: MenuController,
    public event: Events, public firstShowService: FirstShowService) {
    this.uid = this.navParams.get('uid')
    this.setting = {
      check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: { "Y": "s", "N": "ps" }
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onClick: function (event, treeId, treeNode, clickFlag) {
          $.fn.zTree.getZTreeObj("ztree").checkNode(treeNode, !treeNode.checked, "checkTruePS", null)
        },
      }
    };
    this.zNodes = [

    ]

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageReplyMenuPage');
    this.event.subscribe('popNavCtrlReply', (data) => {
      if (data.data == true) {
        this.navCtrl.pop()
        this.event.unsubscribe('popNavCtrlReply')
      }
    })

    this.events.subscribe('exchange_menu', (data) => {
      this.menu_type = data.data
      if (this.menu_type == 'sx') {
        setTimeout(() => {
          if (this.zNodes.length == 0) {
            this.firstShowService.get_all_department_tree_simple_new({ 'uid': this.uid , 'type': this.tree_type}).then(res => {
              if (res.result.res_data && res.result.res_code == 1) {
                this.zNodes = res.result.res_data
                this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
              }
            })
          } else {
            this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
          }
        }, 100)
      }
    })
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

  click_wait() {
    if (this.me_type.indexOf('wait') > -1) {
      let index = 0
      for (let i = 0; i < this.me_type.length; i++) {
        if (this.me_type[i] == 'wait') {
          index = i
        }
      }
      this.me_type.splice(index, 1)
    }
    else {
      this.me_type.push('wait')
    }
  }

  click_ing() {
    if (this.me_type.indexOf('doing') > -1) {
      let index = 0
      for (let i = 0; i < this.me_type.length; i++) {
        if (this.me_type[i] == 'doing') {
          index = i
        }
      }
      this.me_type.splice(index, 1)
    }
    else {
      this.me_type.push('doing')
    }
  }

  click_cancel() {
    if (this.me_type.indexOf('cancel') > -1) {
      let index = 0
      for (let i = 0; i < this.me_type.length; i++) {
        if (this.me_type[i] == 'cancel') {
          index = i
        }
      }
      this.me_type.splice(index, 1)
    }
    else {
      this.me_type.push('cancel')
    }
  }

  click_state_today() {
    this.quick_type = 'today'
  }

  click_state_yestoday() {
    this.quick_type = 'yestoday'
  }

  click_state_sevenday() {
    this.quick_type = 'sevenday'
  }

  closeMenu() {
    console.log('closeMenu')
  }

  openMenu() {
  }

  dragMenu() {
    console.log('拖菜单')
  }
  
  goBack() {
    this.navCtrl.pop()
  }

  changeStartDate(event) {
    this.start_date = event
  }

  changeEndDate(event) {
    this.end_date = event
  }

  reset() {
    this.me_type = []
    this.quick_type = ''
    this.end_date = ''
    this.start_date = ''
    this.message_type = ''
  }

  confirm() {
    this.menu.close()
    if (this.menu_type == 'normal') {
      this.event.publish('search_domain_message', {
        me_type: this.me_type,
        quick_type: this.quick_type,
        start_date: this.start_date,
        end_date: this.end_date,
        message_type: this.message_type,
      })
    }
    else {
      let line_ids = []
      let select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
      for (let i = 0; i < select_data.length; i++) {
        if (select_data[i].res_model == 'hr.employee') {
          line_ids.push(select_data[i].res_id)
        }
      }
      this.event.publish('search_domain_message_sx', {
        employee_ids: line_ids
      })
    }

  }

  click_remark() {
    this.message_type = 'remark'
  }

  click_system_remark() {
    this.message_type = 'system_remark'
  }

  click_main() {
    this.tree_type = 'main'
    this.firstShowService.get_all_department_tree_simple_new({ 'uid': this.uid , 'type': this.tree_type}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.zNodes = res.result.res_data
        this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
      }
    })
  }

  click_all() {
    this.tree_type = 'all'
    this.firstShowService.get_all_department_tree_simple_new({ 'uid': this.uid , 'type': this.tree_type}).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.zNodes = res.result.res_data
        this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
      }
    })
  }
}
