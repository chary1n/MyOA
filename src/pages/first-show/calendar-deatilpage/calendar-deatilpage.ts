import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, Keyboard, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Searchbar } from 'ionic-angular';
declare let cordova: any;
import 'jquery'
declare var $: any;

/**
 * Generated class for the CalendarDeatilpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calendar-deatilpage',
  templateUrl: 'calendar-deatilpage.html',
  providers: [FirstShowService, DatePipe]
})
export class CalendarDeatilpagePage {
  @ViewChild(Content) content: Content;
  @ViewChild('searchbar') searchbar: Searchbar;
  @ViewChild('contextInput') contextInput;
  @ViewChild('nameInput') nameInput;
  item;
  uid
  isEdit = false//是否是编辑状态
  search = false//是否显示搜索
  rt_is_sure_time = false
  allday = true
  type_name = ''//类型名字
  type_id//类型id
  need_fresh = false;
  event_time = ''
  alarm_id = '-1' //提醒
  alarm_name = '不提醒'//提醒名称
  selectList = [] //参与者的列表
  selectOtherList = []
  type_app = false//app提醒
  type_notification = false//网页提醒
  rt_project_principal//负责人id
  rt_project_principal_name//负责人name
  create_user_name
  partner_id_name
  subject//主题
  start_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  stop_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  start_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  stop_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  default_start_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
  default_stop_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
  location = ''//地点
  description = ''//内容
  change = false//从查看到编辑状态为true
  user;
  frontPage: any;
  wait_id = ''
  pet = 0//跳转返回值的类型
  item_start
  item_stop
  item_tip_name = '不提醒'
  employeeList = []//搜索的人员列表
  select_type = 1;
  linshiString = ''
  showPeopleList = []//用于选择人员的临时数组
  storeList = []
  isMeeting = false
  meeting_id;
  state;
  event_list = [];
  meeting_type = 0;
  context_message;
  need_show_more_icon = true;
  title_meeting = '新建';
  showIcon = false;

  setting
  zNodes = []
  tree_obj
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar,
    public firService: FirstShowService, public storage: Storage, public toastCtrl: ToastController,
    private datePipe: DatePipe, private sanitizer: DomSanitizer, public alertCtrl: AlertController,
    public keyboard: Keyboard, public actionSheetCtrl: ActionSheetController) {
    var self = this
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
          self.showPeopleList = []
          self.selectList = []
          // this.tree_obj = $.fn.zTree.init($("#ztree"),this.setting,this.zNodes);
          $.fn.zTree.getZTreeObj("ztree").checkNode(treeNode, !treeNode.checked, "checkTruePS", null)
          var select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
          for (let i = 0; i < select_data.length; i++) {
            if (select_data[i].partner_id) {
              select_data[i]['ischeck'] = true
              if (self.fetch_is_in_arr(select_data[i])) {
                self.showPeopleList.push(select_data[i])
                self.selectList.push(select_data[i])
              }

            }
          }
        },
        onCheck: function (e, treeId, treeNode) {
          self.showPeopleList = []
          self.selectList = []
          var select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
          for (let i = 0; i < select_data.length; i++) {
            if (select_data[i].partner_id) {
              select_data[i]['ischeck'] = true
              if (self.fetch_is_in_arr(select_data[i])) {
                self.showPeopleList.push(select_data[i])
                self.selectList.push(select_data[i])
              }
            }
          }
        }
      }
    }
    this.zNodes = [

    ]


    // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    this.frontPage = Utils.getViewController(this.navParams.get('frontPage'), navCtrl)
    this.isEdit = this.navParams.get('isEdit')
    this.storage.get('user').then(res => {
      this.user = res.result.res_data
      this.uid = res.result.res_data.user_id;
      this.getType()
      if (this.isEdit == true) {
        let current_day
        if (this.navParams.get('type_id')) {
          this.type_id = this.navParams.get('type_id')
          this.type_name = this.navParams.get('type_name')
        }
        if (this.navParams.get('date')) {
          current_day = this.navParams.get('date')
          this.start_datetime = new Date(current_day.getTime() + 8 * 60 * 60 * 1000).toISOString();
          this.stop_datetime = new Date(current_day.getTime() + 8 * 60 * 60 * 1000).toISOString();
          this.default_start_datetime = this.datePipe.transform(new Date(current_day.getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm')
          this.default_stop_datetime = this.datePipe.transform(new Date(current_day.getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm')
          this.start_date = this.datePipe.transform(current_day, 'yyyy-MM-dd')
          this.stop_date = this.datePipe.transform(current_day, 'yyyy-MM-dd')
        }
        if (this.navParams.get('type')) {
          this.meeting_type = this.navParams.get('type')
          if (this.meeting_type == 1) {
            this.isMeeting = true
            this.allday = false
            this.meeting_id = this.navParams.get('meeting_id')
          }
        }
        this.rt_project_principal = res.result.res_data.partner_id
        this.rt_project_principal_name = res.result.res_data.partner_name
        this.selectList.push({
          'partner_id': this.rt_project_principal,
          'partner_name': this.rt_project_principal_name,
          'ischeck': true
        })
      } else {
        this.item = this.navParams.get('item');
        this.item_change()
      }

      if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
        this.need_show_more_icon = true
      }
      else {
        this.need_show_more_icon = false
      }
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    })
  }

  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }

  ionViewDidEnter() {
    this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
    this.click_end_date()
    this.click_end_datetime()
    this.click_start_date()
    this.click_start_datetime()
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CalendarDeatilpagePage');
  }
  //根据item赋值
  item_change() {
    this.state = this.item.state
    this.location = this.item.location
    this.rt_project_principal_name = this.item.rt_project_principal.partner_id_s_name
    this.create_user_name = this.item.create_user_name
    this.subject = this.item.subject
    this.rt_is_sure_time = this.item.rt_is_sure_time
    this.allday = this.item.allday
    if (this.allday) {
      this.click_end_date()
      this.click_start_date()
    }
    else {
      this.click_end_datetime()
      this.click_start_datetime()
    }
    this.type_name = this.item.type_name
    this.wait_id = this.item.id
    this.selectList = this.item.partner_ids
    this.selectOtherList = this.item.external_partner_ids
    this.alarm_id = this.item.rt_alarm_type
    this.alarm_name = this.item.rt_alarm_type_name
    if (this.allday && this.item.start && this.item.stop) {
      this.item_start = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd')
      this.item_stop = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd')
    } else if (this.item.start && this.item.stop) {
      this.item_start = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
      this.item_stop = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
    }
    this.item_tip_name = ''
    if (this.item.rt_alarm_type == '-1') {
      this.item_tip_name = this.item.rt_alarm_type_name
    } else if (this.item.type_app && !this.item.type_notification) {
      this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒)'
    } else if (this.item.type_notification && !this.item.type_app) {
      this.item_tip_name = this.item.rt_alarm_type_name + '(网页提醒)'
    } else if (this.item.type_app && this.item.type_notification) {
      this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒、网页提醒)'
    }
    this.description = this.item.description.replace(/\n/g, "<br>")


  }
  //滑动事件
  panEvent($event) {
    cordova.plugins.Keyboard.close();
  }
  goBack() {
    // this.frontPage.data.need_fresh = true;
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh = this.navParams.get('need_fresh')
    this.pet = this.navParams.get('pet')
    var need_fresh_reply = this.navParams.get('need_fresh_reply')

    if (this.need_fresh == true) {
      if (this.pet == 1) {
        this.alarm_id = this.navParams.get('alarm_id')
        this.alarm_name = this.navParams.get('alarm_name')
        this.type_app = this.navParams.get('type_app')
        this.type_notification = this.navParams.get('type_notification')
        this.item_tip_name = ''
        if (this.alarm_id == '-1') {
          this.item_tip_name = this.navParams.get('alarm_name')
        } else if (this.type_app && !this.type_notification) {
          this.item_tip_name = this.navParams.get('alarm_name') + '(App提醒)'
        } else if (this.type_notification && !this.type_app) {
          this.item_tip_name = this.navParams.get('alarm_name') + '(网页提醒)'
        } else if (this.type_app && this.type_notification) {
          this.item_tip_name = this.navParams.get('alarm_name') + '(App提醒、网页提醒)'
        }
      } else if (this.pet == 2) {
        // this.frontPage.data.need_fresh = true;
        this.navCtrl.pop()
      } else if (this.pet == 3) {
        this.selectList = this.navParams.get('selectList')
      }
    }


    // if (need_fresh_reply) {
    this.refresh_view()
    // }
  }

  //删除一个待办事项
  delete() {
    var that = this
    var ctrl = this.alertCtrl;
    ctrl.create({
      title: '提示',
      message: "是否确定删除？",
      buttons: [{
        text: '取消',
        handler: function (data) {
          cordova.plugins.Keyboard.close();
        }
      },
      {
        text: '确定',
        handler: function (data) {
          if (that.user.partner_id == that.item.rt_project_principal.partner_id_s_id || that.uid == that.item.create_uid) {
            let body = {
              'id': that.item.id,
              'uid': that.uid
            }
            that.firService.delete_res_model(body).then(res => {
              that.frontPage.data.need_fresh = true;
              that.navCtrl.pop()
            })
          } else {
            Utils.toastButtom('只有负责人和创建人可以删除', this.toastCtrl)
          }
        }
      }]
    }).present();

  }
  //编辑状态下取消
  changeCancel() {
    cordova.plugins.Keyboard.close()
    if (this.search) {
      this.search = false
      if (this.select_type == 1) {
        this.selectList = this.storeList
      }
      else if (this.select_type == 3) {
        this.selectOtherList = this.storeList
      }
    } else {
      this.isEdit = false
      this.change = false
      // this.content.resize()
    }
  }
  //编辑状态下完成
  changeFinish() {
    cordova.plugins.Keyboard.close()
    if (this.search) {
      this.search = false
      return
    }
    let body = this.handleData(true)
    body['wait_id'] = this.item.id
    this.firService.write_wait_thing(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.isEdit = false
        this.change = false
        // this.content.resize()
        this.item = res.result.res_data
        this.description = this.item.description.replace(/\n/g, "<br>")
        if (this.allday && this.item.start && this.item.stop) {
          this.item_start = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd')
          this.item_stop = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd')
        } else if (this.item.start && this.item.stop) {
          this.item_start = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
          this.item_stop = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
        }
        this.item_tip_name = ''
        if (this.item.rt_alarm_type == '-1') {
          this.item_tip_name = this.item.rt_alarm_type_name
        } else if (this.item.type_app && !this.item.type_notification) {
          this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒)'
        } else if (this.item.type_notification && !this.item.type_app) {
          this.item_tip_name = this.item.rt_alarm_type_name + '(网页提醒)'
        } else if (this.item.type_app && this.item.type_notification) {
          this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒、网页提醒)'
        }
      }
    })
  }
  //编辑
  edit() {
    this.down_view()
    // this.content.resize()
    if (this.item.state == false) {
      Utils.toastButtom('完成状态不可编辑', this.toastCtrl)
      return
    }
    if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
      this.isEdit = true
      this.change = true
      this.type_name = this.item.type_name
      this.allday = this.item.allday
      setTimeout(() => {
        if (this.allday) {
          this.click_end_date()
          this.click_start_date()
        }
        else {
          this.click_end_datetime()
          this.click_start_datetime()
        }
      }, 100)
      this.rt_project_principal_name = this.item.rt_project_principal.partner_id_s_name
      this.rt_project_principal = this.item.rt_project_principal.partner_id_s_id
      this.create_user_name = this.item.create_user_name
      this.rt_is_sure_time = this.item.rt_is_sure_time
      this.subject = this.item.subject
      this.type_name = this.item.type_name
      this.type_id = this.item.type_id
      if (this.rt_is_sure_time == true) {

      } else {
        this.start_date = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd')
        this.stop_date = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd')
        this.start_datetime = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'
        this.stop_datetime = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'
        this.default_start_datetime = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
        this.default_stop_datetime = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
      }
      this.location = this.item.location
      this.description = this.item.description
      this.type_app = this.item.type_app
      this.type_notification = this.item.type_notification
    } else {
      Utils.toastButtom('只有负责人和创建人可以编辑', this.toastCtrl)
    }
  }
  //取消新建待办事项
  cancel() {
    cordova.plugins.Keyboard.close()
    if (this.search) {
      this.title_meeting = '新建'
      this.search = false
      if (this.select_type == 1) {
        this.selectList = this.storeList
      }
      else if (this.select_type == 3) {
        this.selectOtherList = this.storeList
      }
    } else {
      this.navCtrl.pop();
    }
  }
  //新建待办事项完成
  stateFinish() {
    cordova.plugins.Keyboard.close()
    if (this.search) {
      this.title_meeting = '新建'
      this.search = false
      return
    }
    let body = this.handleData(true)
    if (this.isMeeting) {
      if (body) {
        body['rt_meeting_id'] = this.meeting_id
        this.firService.create_meeting_line(body).then(res => {
          if (res.result.res_code == 1) {
            // this.frontPage.data.need_fresh = true;
            this.frontPage.data.pet = 4
            this.navCtrl.popTo(this.frontPage);
          }
        })
      }
    } else {
      if (body) {
        this.firService.create_new_schedule(body).then(res => {
          if (res.result.res_code == 1) {
            // this.frontPage.data.need_fresh = true;
            this.navCtrl.popTo(this.frontPage);
          }
        })
      }
    }
  }
  //标记为待办
  completion_event() {
    this.type_name = this.item.type_name
    this.allday = this.item.allday
    this.rt_project_principal = this.item.rt_project_principal.partner_id_s_id
    this.rt_is_sure_time = this.item.rt_is_sure_time
    this.subject = this.item.subject
    this.type_id = this.item.type_id
    if (this.rt_is_sure_time == true) {

    } else {
      if (this.allday == true) {
        this.start_date = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd')
        this.stop_date = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd')
        console.log('this.start_date = ' + this.start_date)
      } else {
        this.start_datetime = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'
        this.stop_datetime = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'
        console.log('this.start_date = ' + this.start_datetime)
      }
    }
    this.location = this.item.location
    this.description = this.item.description
    if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
      let body = this.handleData(false)
      body['wait_id'] = this.item.id
      body['state'] = 'draft'
      this.firService.cancel_wait_thing(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data
          this.item_change()
        }
      })
    } else {
      Utils.toastButtom('只有负责人和创建人可以标记为待办', this.toastCtrl)
    }
  }
  //标记完成
  finish() {
    this.type_name = this.item.type_name
    this.allday = this.item.allday
    this.rt_project_principal = this.item.rt_project_principal.partner_id_s_id
    this.rt_is_sure_time = this.item.rt_is_sure_time
    this.subject = this.item.subject
    this.type_id = this.item.type_id
    if (this.rt_is_sure_time == true) {

    } else {
      if (this.allday == true) {
        this.start_date = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd')
        this.stop_date = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd')
        console.log('this.start_date = ' + this.start_date)
      } else {
        this.start_datetime = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
        this.stop_datetime = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
        console.log('this.start_date = ' + this.start_datetime)
      }
    }
    this.location = this.item.location
    this.description = this.item.description
    if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
      let body = this.handleData(false)
      body['wait_id'] = this.item.id
      this.navCtrl.push('FinishScheulePage', {
        'body': body
      })
    } else {
      Utils.toastButtom('只有负责人和创建人可以标记完成', this.toastCtrl)
    }
  }

  //时间待定的按钮
  notSureClick() {
    if (this.rt_is_sure_time && this.allday) {
      this.allday = false
    }
    setTimeout(() => {
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)
  }

  //全天的按钮
  allDayClick() {
    if (this.rt_is_sure_time && this.allday) {
      this.rt_is_sure_time = false
    }
    setTimeout(() => {
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)

  }
  typeChange(option1: any) {
    for (let i = 0; i < this.event_list.length; i++) {
      if (this.event_list[i].display_name == this.type_name) {
        this.type_id = this.event_list[i].id
        break
      }
    }
  }
  //获取所有的待办类型
  getType() {
    let body = {
      'uid': this.uid
    }
    this.firService.get_event_type(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.event_list = res.result.res_data
        if (this.meeting_type == 1) {
          for (let i = 0; i < this.event_list.length; i++) {
            if (this.event_list[i].display_name == '任务') {
              this.type_name = '任务'
              this.type_id = this.event_list[i].id
              break
            }
          }
        }
      }
    })
  }
  //删除一个人员
  closePartner(item) {
    for (var i = 0; i < this.showPeopleList.length; i++) {
      if (item.partner_id == this.showPeopleList[i].partner_id) {
        this.showPeopleList.splice(i, 1)
        if (this.select_type == 1) {
          var select_datas = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
          for (var j = 0; j < select_datas.length; j++) {
            if (select_datas[j].partner_id) {
              if (select_datas[j].partner_id == item.partner_id) {
                this.tree_obj.checkNode(select_datas[j], false, "checkTruePS", null)
              }
            }
          }
        }

        break
      }
    }
  }
  //选择负责人
  selectPartnerId() {
    this.title_meeting = '负责人'
    this.showPeopleList = []
    this.showPeopleList.push({
      'partner_id': this.rt_project_principal,
      'partner_name': this.rt_project_principal_name,
      'ischeck': true
    })
    this.search = true
    this.select_type = 2
    this.employeeList = []
    this.linshiString = ''
    // setTimeout(() => {
    //   this.nameInput.setFocus();//输入框获取焦点
    //   // cordova.plugins.Keyboard.show();
    // })
  }
  //选择参与人员
  selectPartner() {
    this.title_meeting = '参与人员'
    this.showPeopleList = this.selectList
    this.storeList = []
    this.storeList = this.storeList.concat(this.selectList)
    this.search = true
    this.select_type = 1
    this.employeeList = []
    this.linshiString = ''
    // setTimeout(() => {
    //   this.nameInput.setFocus();//输入框获取焦点
    //   // cordova.plugins.Keyboard.show();
    // })
    var self = this
    this.firService.get_all_department({ 'uid': this.uid, 'need_total': true }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        self.zNodes = res.result.res_data
        for (let i = 0; i < self.selectList.length; i++) {
          var select_data = self.selectList[i]
          for (let j = 0; j < self.zNodes.length; j++) {
            var node_data = self.zNodes[j]
            if (node_data.partner_id) {
              if (select_data.partner_id == node_data.partner_id) {
                self.zNodes[j]['checked'] = true
              }
            }
          }
        }

        self.tree_obj = $.fn.zTree.init($("#ztree"), self.setting, self.zNodes);
      }
    })
  }

  searchInput($event) {
    console.log('sadfasd= ' + $event)
    if ($event == '') {
      this.employeeList = []
    } else {
      let body = {
        'uid': this.uid,
        'name': $event
      }
      this.employeeList = []
      if (this.select_type != 3) {
        this.firService.search_one_partner(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.employeeList = res.result.res_data;
            if (this.select_type == 1) {
              this.setCheck()
            } else if (this.select_type == 2) {
              for (let j = 0; j < this.employeeList.length; j++) {
                if (this.employeeList[j].partner_id == this.rt_project_principal) {
                  this.employeeList[j].ischeck = true
                }
              }
            }
          }
          // else{
          //   Utils.toastButtom('未查找到相关人员', this.toastCtrl)
          // }
        })
      }
      else {
        this.firService.search_one_other_partner(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.employeeList = res.result.res_data;
            if (this.select_type == 3) {
              this.setOtherCheck()
            }
          }
        })
      }
    }
  }

  searchOtherInput($event) {
    if ($event == '') {
      this.employeeList = []
    } else {
      let body = {
        'uid': this.uid,
        'name': $event
      }
      this.employeeList = []
      this.firService.search_one_other_partner(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.employeeList = res.result.res_data;
          if (this.select_type == 3) {
            this.setOtherCheck()
          }
        }
      })
    }
  }

  //比较选中的人
  setCheck() {
    for (let i = 0; i < this.selectList.length; i++) {
      for (let j = 0; j < this.employeeList.length; j++) {
        if (this.selectList[i].partner_id == this.employeeList[j].partner_id) {
          this.employeeList[j].ischeck = true
          break
        }
      }
    }
  }

  //比较选中的外部
  setOtherCheck() {
    for (let i = 0; i < this.selectOtherList.length; i++) {
      for (let j = 0; j < this.employeeList.length; j++) {
        if (this.selectOtherList[i].partner_id == this.employeeList[j].partner_id) {
          this.employeeList[j].ischeck = true
          break
        }
      }
    }
  }

  choosePeople(item) {
    this.linshiString = ''
    this.employeeList = []
    if (this.select_type == 1) {
      item.ischeck = !item.ischeck
      if (item.ischeck) {
        if (this.fetch_is_in_arr(item)) {
          this.showPeopleList.push(item)
          let need_select = this.tree_obj.getNodesByParam('partner_id', item.partner_id, null)
          for (let i = 0; i < need_select.length; i++) {
            this.tree_obj.checkNode(need_select[i], true, "checkTruePS", null)
          }
        }

      } else {
        for (var i = 0; i < this.showPeopleList.length; i++) {
          if (item.partner_id == this.showPeopleList[i].partner_id) {
            break
          }
        }
      }
    } else if (this.select_type == 2) {
      this.title_meeting = '新建'
      if (item.partner_id == this.rt_project_principal) {
        this.search = false
        return
      } else {
        this.search = false
        this.showPeopleList = []
        //接下来的逻辑是，（前提，负责人默认是参与人）,选的负责人如果已经在选择的人里面了，就不加，不在里面，就加，避免重复
        this.rt_project_principal = item.partner_id
        this.rt_project_principal_name = item.partner_name
        if (!this.selectList || this.selectList.length <= 0) {
          return
        }
        let plus = false
        for (let i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].partner_id == item.partner_id) {
            plus = false
            break
          } else {
            plus = true
          }
        }
        if (plus) {
          this.selectList.push({
            'partner_id': item.partner_id,
            'partner_name': item.partner_name,
            'ischeck': true
          })
        }
      }
    }
    else if (this.select_type == 3) {
      item.ischeck = !item.ischeck
      if (item.ischeck) {
        if (this.fetch_is_in_arr(item)) {
          this.showPeopleList.push(item)
        }
      } else {
        for (var i = 0; i < this.showPeopleList.length; i++) {
          if (item.partner_id == this.showPeopleList[i].partner_id) {
            break
          }
        }
      }
    }
  }

  //选择提醒
  selectTip() {
    this.navCtrl.push('TipPage', {
      'page': 'CalendarDeatilpagePage',
      'alarm_id': this.alarm_id,
      'alarm_name': this.alarm_name,
      'type_app': this.type_app,
      'type_notification': this.type_notification
    })
  }
  //处理所有数据
  handleData(is_edit) {
    if (is_edit){
        if (this.allday) {
      this.start_date = (<HTMLInputElement>document.getElementById('input_start_date')).value
      this.stop_date = (<HTMLInputElement>document.getElementById('input_end_date')).value
    }
    else {
      this.start_datetime = (<HTMLInputElement>document.getElementById('input_start_datetime')).value
      this.stop_datetime = (<HTMLInputElement>document.getElementById('input_end_datetime')).value
    }
  }
    let myString = ""
    if (!this.type_id) {
      myString = "    请选择类型"
    }
    if (!this.subject) {
      myString = "    请输入主题"
    }
    if (!this.selectList || this.selectList.length == 0) {
      myString = "    请选择参与人员"
    }
    if (myString != "") {
      Utils.toastButtom(myString, this.toastCtrl)
    } else {
      let partner_ids = []
      if (this.selectList && this.selectList.length > 0) {
        for (var i = 0; i < this.selectList.length; i++) {
          partner_ids[i] = this.selectList[i].partner_id
        }
      }
      let other_partner_ids = []
      if (this.selectOtherList && this.selectOtherList.length > 0) {
        for (var i = 0; i < this.selectOtherList.length; i++) {
          other_partner_ids[i] = this.selectOtherList[i].partner_id
        }
      }
      if (!this.alarm_id) {
        this.alarm_id = '-1'
      }
      let body = {}
      if (this.allday == true && this.start_date != '' && this.stop_date != '' && this.start_date && this.stop_date) {
        console.log('start = ' + this.start_date + '  stop = ' + this.stop_date)
        this.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss')
        this.stop_date = this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss')
        if (new Date(this.start_date.replace(/-/g, "/")).getTime() > new Date(this.stop_date.replace(/-/g, "/")).getTime()) {
          Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
          return
        }
        body = {
          'uid': this.uid,
          'rt_is_sure_time': this.rt_is_sure_time,
          'allday': this.allday,
          'event_type_id': this.type_id,
          'subject_name': this.subject,
          'partner_ids': partner_ids,
          'external_partner_ids': other_partner_ids,
          'start_date': this.start_date,
          'stop_date': this.stop_date,
          'start': this.start_date,
          'stop': this.stop_date,
          'rt_alarm_type': this.alarm_id,
          'location': this.location,
          'description': this.description,
          'rt_project_principal': this.rt_project_principal,
          'type_app': this.type_app,
          'type_notification': this.type_notification,
          'rt_recurrency_type': '0',
        }
      } else {
        if (this.rt_is_sure_time == true) {
          body = {
            'uid': this.uid,
            'rt_is_sure_time': this.rt_is_sure_time,
            'allday': this.allday,
            'event_type_id': this.type_id,
            'subject_name': this.subject,
            'partner_ids': partner_ids,
            'external_partner_ids': other_partner_ids,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'rt_project_principal': this.rt_project_principal,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type': '0',
            'start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
            'stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
          }
        } else {
          if (this.start_datetime != '' && this.stop_datetime != '' && this.start_datetime && this.stop_datetime) {
            let startTime;
            let stopTime;
            if (this.start_datetime.indexOf('T') != -1) {
              startTime = new Date(this.start_datetime).getTime()
            } else {
              startTime = new Date(this.start_datetime.replace(/-/g, "/")).getTime()
            }
            if (this.stop_datetime.indexOf('T') != -1) {
              stopTime = new Date(this.stop_datetime).getTime()
            } else {
              stopTime = new Date(this.stop_datetime.replace(/-/g, "/")).getTime()
            }
            if (startTime > stopTime) {
              Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
              return
            }
            if (this.start_datetime.indexOf('T') != -1) {
              this.start_datetime = this.datePipe.transform(new Date(new Date(this.start_datetime).getTime() - 1 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
            } else {
              this.start_datetime = this.datePipe.transform(new Date(new Date(this.start_datetime.replace(/-/g, "/")).getTime() - 1 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
            }
            if (this.stop_datetime.indexOf('T') != -1) {
              this.stop_datetime = this.datePipe.transform(new Date(new Date(this.stop_datetime).getTime() - 1 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
            } else {
              this.stop_datetime = this.datePipe.transform(new Date(new Date(this.stop_datetime.replace(/-/g, "/")).getTime() - 1 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
            }
          }
          body = {
            'uid': this.uid,
            'rt_is_sure_time': this.rt_is_sure_time,
            'allday': this.allday,
            'event_type_id': this.type_id,
            'subject_name': this.subject,
            'partner_ids': partner_ids,
            'external_partner_ids': other_partner_ids,
            'start_datetime': this.start_datetime,
            'stop_datetime': this.stop_datetime,
            'start': this.start_datetime,
            'stop': this.stop_datetime,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'rt_project_principal': this.rt_project_principal,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type': '0',
          }
        }
      }
      return body
    }
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  focusInput() {
    //   var idInput=document.getElementById("contextInput");
    // idInput.onkeyup=(event)=>{
    //   console.log(event)
    //   console.log(event.keyCode)
    //   if(event.keyCode==13){
    //     console.log('11112312')
    //   }
    // }

  }

  blurInput() {
  }

  only_reply_to(items) {
    this.navCtrl.push('CalendarChatPage', {
      item: items,
      res_id: this.item.id,
      navCtrl: 'CalendarDeatilpagePage',
      type: 'calendar.event',
      has_parent: true,
    })
  }

  reply_to(items) {
    if (items.create_uid_id == this.uid) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '是否删除此回复',
        buttons: [
          {
            text: '确定',
            handler: () => {
              this.firService.delete_reply({ 'uid': this.uid, 'reply_id': items.msg_id }).then(res => {
                if (res.result.res_code == 1) {
                  Utils.toastButtom("删除成功", this.toastCtrl)
                  this.refresh_view()
                }
              })
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
    else {
      this.navCtrl.push('CalendarChatPage', {
        item: items,
        res_id: this.item.id,
        navCtrl: 'CalendarDeatilpagePage',
        type: 'calendar.event',
        has_parent: true,
      })
    }

  }

  send() {

    // if (this.context_message.length == 0 || this.context_message.match(/^\s+$/g)) {
    //   Utils.toastButtom("回复不可为空", this.toastCtrl)
    // }
    // else {
    this.navCtrl.push('CalendarChatPage', {
      item: this.item,
      res_id: this.item.id,
      navCtrl: 'CalendarDeatilpagePage',
      type: 'calendar.event',
      has_parent: false,
    })

    // let body = {
    //   'uid': this.uid,
    //   'res_id': this.item.id,
    //   'context': this.context_message,
    //   'parent_id': false,
    //   'type': 'calendar.event',
    // }
    // this.firService.reply_to(body).then(res => {
    //   if (res.result.res_code == 1) {
    //     this.context_message = ''
    //     Utils.toastButtom("回复成功", this.toastCtrl)
    //     this.refresh_view()
    //   }
    // })
    // }
  }

  refresh_view() {
    this.firService.get_event_detail({
      'uid': this.uid,
      'event_id': this.item.id
    }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
      }
    })
  }

  click_more() {
    if (this.state) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: [
          {
            text: '标记完成',
            handler: () => {
              this.finish()
            }
          }, {
            text: '编辑',
            handler: () => {
              this.edit()
            }
          },
          {
            text: '删除',
            handler: () => {
              this.delete()
            }
          },

          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
    else {
      let actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: [
          {
            text: '标记为待办',
            //  role: 'destructive',
            handler: () => {
              this.completion_event()
            }
          },
          {
            text: '删除',
            handler: () => {
              this.delete()
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  cancel_zan(items) {
    let body = {
      'uid': this.uid,
      'type': 'delete',
      'msg_id': items.msg_id,
    }
    this.firService.update_zan(body).then(res => {
      if (res.result.res_code == 1) {
        this.refresh_view()
      }
    })
  }

  update_zan(items) {
    let body = {
      'uid': this.uid,
      'type': 'add',
      'msg_id': items.msg_id,
    }
    this.firService.update_zan(body).then(res => {
      if (res.result.res_code == 1) {
        this.refresh_view()
      }
    })
  }

  delete_reply(items) {
    if (items.create_uid_id == this.uid) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '是否删除此回复',
        buttons: [
          {
            text: '确定',
            handler: () => {
              this.firService.delete_reply({ 'uid': this.uid, 'reply_id': items.msg_id }).then(res => {
                if (res.result.res_code == 1) {
                  Utils.toastButtom("删除成功", this.toastCtrl)
                  this.refresh_view()
                }
              })
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  onScroll() {
    console.log('111')
    var node = document.getElementById('mytextarea');
    if (node.style.textShadow === '') {
      node.style.textShadow = 'rgba(0,0,0,0) 0 0 0';
    } else {
      node.style.textShadow = '';
    }


  }

  down_view() {
    this.showIcon = false
  }

  up_view() {
    this.showIcon = true
  }

  fetch_is_in_arr(item) {
    let is_has = false
    for (let i = 0; i < this.showPeopleList.length; i++) {
      if (this.showPeopleList[i].partner_id == item.partner_id) {
        is_has = true
      }
    }
    return !is_has
  }

  click_start_datetime() {
    $('#input_start_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
    });
  }

  click_start_date() {
    $('#input_start_date').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
    });
  }

  click_end_datetime() {
    $('#input_end_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
    });
  }

  click_end_date() {
    $('#input_end_date').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
    });
  }

  selectExternalPartner() {
    this.title_meeting = '外部人员'
    this.showPeopleList = this.selectOtherList
    this.storeList = []
    this.storeList = this.storeList.concat(this.selectOtherList)
    this.search = true
    this.select_type = 3
    this.employeeList = []
    this.linshiString = ''
  }



}
