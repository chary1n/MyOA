import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, Keyboard, ActionSheetController, Platform, ModalController, ViewController, ToastController, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
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
  rt_task_need_charge = true
  allday = true
  type_name = ''//类型名字
  type_id//类型id
  need_fresh = false;
  event_time = ''
  alarm_id = '-1' //提醒
  alarm_name = '不提醒'//提醒名称
  selectList = [] //参与者的列表
  selectOtherList = []
  type_app = true//app提醒
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

  is_create_server = false

  hide_btn = false

  level_name
  level_list = []
  level_id
  total_score
  my_score
  my_proportion
  manyi
  is_me_in_patrner_ids = false
  detail_type = "1"
  show_reply_footer = true
  score_detail = []
  rt_task_analyze
  is_pcc = false
  now_partner_id
  now_partner_name
  rt_pcc_pm_id
  rt_pcc_pm_name
  pcc_list = []
  rt_task_level_temp = 0.0
  rt_task_progress = '0.0'
  can_change_pcc = true
  can_change_jifen = true
  can_change_partner = false

  tousuList = []

  tousu_count = 0

  tousu_enter = false

  origin_meeting = false

  is_meeting_line_pcc = false

  can_change_new = true
  rt_appoint_party//负责人id
  rt_appoint_party_name//负责人name
  rt_appoint_data // 截止时间
  popover: any
  relly_start_time_temp
  relly_stop_time
  is_pcc_enter
  can_show_time = false
  can_show_cj = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar,
    public firService: FirstShowService, public storage: Storage, public toastCtrl: ToastController,
    private datePipe: DatePipe, private sanitizer: DomSanitizer, public alertCtrl: AlertController,
    public keyboard: Keyboard, public actionSheetCtrl: ActionSheetController, public platform: Platform,
    public modalController: ModalController, public popoverCtrl: PopoverController) {
    this.is_pcc_enter = this.navParams.get('pcc_enter')
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
      this.now_partner_id = res.result.res_data.partner_id;
      this.now_partner_name = res.result.res_data.partner_name
      this.getType()

      if (this.isEdit == true) {
        let current_day
        if (this.navParams.get('type_id')) {
          this.type_id = this.navParams.get('type_id')
          this.type_name = this.navParams.get('type_name')
          if (this.type_name == '任务') {
            this.rt_appoint_party_name = this.now_partner_name
            this.rt_appoint_party = this.now_partner_id
            this.getTask()
            this.can_show_time = true
          }
          else {
            this.rt_project_principal = this.now_partner_id
            this.rt_project_principal_name = this.now_partner_name
            this.selectList.push({
              'partner_id': this.rt_project_principal,
              'partner_name': this.rt_project_principal_name,
              'ischeck': true
            })
          }
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
            this.getTask()
          }
        }

      } else {
        this.tousu_enter = this.navParams.get('tousu_enter')
        // this.item = this.navParams.get('item');
        // this.firService.read_event({ 'event_id': this.item.id, 'uid': this.uid }).then(res => {

        // })
        // this.item_change()
        // if (this.type_name == '任务') {
        //   this.getTask()

        // }

        this.firService.get_event_detail({
          'uid': this.uid,
          'event_id': this.navParams.get('item_id')
        }).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.item = res.result.res_data
            this.firService.read_event({ 'event_id': this.item.id, 'uid': this.uid }).then(res => {

            })
            this.item_change()
            if (this.type_name == '任务') {
              this.getTask()

            }
          }
        })

      }
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }

      setTimeout(() => {
        this.click_appoint_data()
      }, 100)
    })


    // var that = this
    // this.platform.registerBackButtonAction(function () {
    //   if (that.isEdit) {
    //     var ctrl = that.alertCtrl
    //     ctrl.create({
    //       title: '提示',
    //       subTitle: '数据未保存，是否确认返回？',
    //       buttons: [{ text: '取消' },
    //       {
    //         text: '确定',
    //         handler: () => {
    //           that.navCtrl.pop();
    //         }
    //       }
    //       ]
    //     }).present();
    //   }
    // }, 0)
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
    this.click_appoint_data()
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CalendarDeatilpagePage');
  }
  //根据item赋值
  item_change() {
    this.relly_start_time_temp = this.item.relly_start_time_temp
    this.relly_stop_time = this.item.relly_stop_time
    this.rt_appoint_party = this.item.rt_appoint_party
    this.rt_appoint_party_name = this.item.rt_appoint_party_name
    this.rt_appoint_data = this.item.rt_appoint_data
    this.type_name = this.item.type_name
    if (this.type_name == '任务') {
      this.origin_meeting = this.item.origin_meeting_id
      this.detail_type = '1'
      this.total_score = this.item.task_level
      if (this.item.my_score) {
        this.my_score = this.item.my_score
      } else {
        this.my_score = '暂无'
      }
      if (this.detail_type != '1') {
        this.show_reply_footer = false
        this.content.resize()
      }
      if (this.item.score_detail) {
        this.score_detail = this.item.score_detail
      }
      this.rt_task_analyze = this.item.rt_task_analyze.replace(/\n/g, "<br>")
      this.rt_pcc_pm_id = this.item.rt_pcc_pm_id.id
      this.rt_pcc_pm_name = this.item.rt_pcc_pm_id.name
      this.rt_task_level_temp = this.item.rt_task_level_temp
      this.rt_task_progress = this.item.rt_task_progress
      this.tousuList = []
      this.tousu_count = 0
      if (this.item.rt_task_complain_ids) {
        for (let i = 0; i < this.item.rt_task_complain_ids.length; i++) {
          if ((this.item.rt_task_complain_ids[i].rt_complain_who_deal_id == this.user.partner_id) && this.item.rt_task_complain_ids[i].rt_complain_state == 1) {
            this.tousu_count += 1
          }
          if (this.item.rt_task_complain_ids[i].rt_complain_who_deal_id == this.user.partner_id || this.item.rt_task_complain_ids[i].rt_complain_partner_id_id == this.user.partner_id) {
            this.tousuList.push(this.item.rt_task_complain_ids[i])
          }
        }
      }
      if (this.item.rt_pcc_pm_id.id == this.user.partner_id) {
        this.is_meeting_line_pcc = true
      }
      if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid || this.user.partner_id == this.item.rt_pcc_pm_id.id) {
        this.need_show_more_icon = true
      }
      else {
        this.need_show_more_icon = false
      }
      if (this.item.state_show == '草稿') {
        this.can_show_time = true
      }
      else {
        this.can_show_time = false
      }

      if (this.item.state_show == '已完成' || this.item.state_show == '已验收'){
        this.can_show_cj = true
      }
      else{
        this.can_show_cj = false
      }
    }

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
    this.click_appoint_data()

    this.wait_id = this.item.id
    this.selectList = this.item.partner_ids
    for (let i = 0; i < this.selectList.length; i++) {
      if (this.uid == this.selectList[i].user_id) {
        this.is_me_in_patrner_ids = true
      }
    }
    this.selectOtherList = this.item.external_partner_ids ? this.item.external_partner_ids[0] : []
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
    this.description = this.reformNoticeContent(this.item.description)
    this.user_is_read(this.selectList, this.item.check_in_ids)
    var data_arr = []
    for (let i = 0; i < this.item.message_ids.length; i++) {
      var item_one = this.item.message_ids[i]
      data_arr.push(item_one.msg_id)
      for (let j = 0; j < item_one.child_ids.length; j++) {
        var item_child = item_one.child_ids[j]
        data_arr.push(item_child.msg_id)
      }
    }
    this.firService.read_total_reply_no_loading({ 'list': data_arr, 'uid': this.uid }).then(res => {

    })
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
    else {
      this.refresh_view()
    }


    // if (need_fresh_reply) {

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
    if (this.navParams.get('pcc_enter')) {
      if (this.rt_pcc_pm_id == this.user.partner_id) {
        var ctrl = this.alertCtrl
        ctrl.create({
          title: '提示',
          subTitle: '是否完成指派？',
          buttons: [{
            text: '取消', handler: () => {
              this.write_body(body)
            }
          },
          {
            text: '确定',
            handler: () => {
              body['rt_pcc_pm_state'] = 2
              this.firService.write_wait_thing(body).then(res => {
                if (res.result.res_data && res.result.res_code == 1) {
                  this.navCtrl.pop()
                }
              })
            }
          }
          ]
        }).present();
      }
      else {
        this.write_body(body)
      }
    }
    else {
      this.write_body(body)
    }

  }

  write_body(body) {
    this.firService.write_wait_thing(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.isEdit = false
        this.change = false
        // this.content.resize()
        this.item = res.result.res_data

        this.description = this.reformNoticeContent(this.item.description)
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
        this.item_change()
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
    if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid || this.user.partner_id == this.item.rt_pcc_pm_id.id) {
      this.isEdit = true
      this.change = true
      if (this.item.state_show == 'draft1' || this.item.state_show == 'appoint') {
        this.can_change_new = true
      }
      else {
        this.can_change_new = false
      }
      // 创建人、pcc 在指派完后不可以修改pcc字段
      if (this.user.partner_id == this.item.rt_pcc_pm_id.id) {
        this.can_change_partner = true
        if (this.item.rt_pcc_pm_state == 2) {
          this.can_change_pcc = false
        }
      }
      else {
        this.can_change_pcc = false
        this.can_change_partner = false
      }

      // 负责人和pcc可以修改积分 其他不行
      if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.user.partner_id == this.item.rt_pcc_pm_id.id) {
        this.can_change_jifen = true
      }
      else {
        this.can_change_jifen = false
      }

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
        this.click_appoint_data()
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
      this.description = this.reformNoticeContent(this.item.description)
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
      setTimeout(() => {
        if (this.allday) {
          this.click_end_date()
          this.click_start_date()
        }
        else {
          this.click_end_datetime()
          this.click_start_datetime()
        }
        this.click_appoint_data()
      }, 1)
      if (this.select_type == 1) {
        this.selectList = this.storeList
      }
      else if (this.select_type == 3) {
        this.selectOtherList = this.storeList
      }
    } else {
      var ctrl = this.alertCtrl
      ctrl.create({
        title: '提示',
        subTitle: '数据未保存，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
  }
  //新建待办事项完成
  stateFinish() {
    cordova.plugins.Keyboard.close()
    if (this.search) {
      this.title_meeting = '新建'
      this.search = false
      setTimeout(() => {
        if (this.allday) {
          this.click_end_date()
          this.click_start_date()
        }
        else {
          this.click_end_datetime()
          this.click_start_datetime()
        }
        this.click_appoint_data()
        return
      }, 10)
    }
    else {
      if (!this.is_create_server) {
        let body = this.handleData(true)

        if (this.isMeeting) {
          if (body) {
            this.is_create_server = true
            body['rt_meeting_id'] = this.meeting_id
            this.firService.create_meeting_line(body).then(res => {
              this.is_create_server = false
              if (res.result.res_code == 1) {
                // this.frontPage.data.need_fresh = true;
                this.frontPage.data.pet = 4
                this.navCtrl.popTo(this.frontPage);
              }
            })
          }
        } else {
          if (body) {
            this.is_create_server = false
            if (this.item) {
              body['id'] = this.item.id
            }
            if (this.is_pcc) {
              if (this.rt_pcc_pm_id == this.user.partner_id) {
                var ctrl = this.alertCtrl
                ctrl.create({
                  title: '提示',
                  subTitle: '是否完成指派？',
                  buttons: [{
                    text: '取消',
                    handler: () => {
                      this.firService.create_new_schedule(body).then(res => {
                        this.is_create_server = false
                        if (res.result.res_code == 1) {
                          // this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      })
                    }
                  },
                  {
                    text: '确定',
                    handler: () => {
                      body['rt_pcc_pm_state'] = 2
                      this.firService.create_new_schedule(body).then(res => {
                        this.is_create_server = false
                        if (res.result.res_code == 1) {
                          // this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      })
                    }
                  }
                  ]
                }).present();
              }
              else {
                this.firService.create_new_schedule(body).then(res => {
                  this.is_create_server = false
                  if (res.result.res_code == 1) {
                    // this.frontPage.data.need_fresh = true;
                    this.navCtrl.popTo(this.frontPage);
                  }
                })
              }
            }
            else {
              this.firService.create_new_schedule(body).then(res => {
                this.is_create_server = false
                if (res.result.res_code == 1) {
                  // this.frontPage.data.need_fresh = true;
                  this.navCtrl.popTo(this.frontPage);
                }
              })
            }

          }
        }
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
    this.description = this.reformNoticeContent(this.item.description)
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
    // this.type_name = this.item.type_name
    // this.allday = this.item.allday
    // this.rt_project_principal = this.item.rt_project_principal.partner_id_s_id
    // this.rt_is_sure_time = this.item.rt_is_sure_time
    // this.subject = this.item.subject
    // this.type_id = this.item.type_id
    // if (this.rt_is_sure_time == true) {

    // } else {
    //   if (this.allday == true) {
    //     this.start_date = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd')
    //     this.stop_date = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd')
    //     console.log('this.start_date = ' + this.start_date)
    //   } else {
    //     this.start_datetime = this.datePipe.transform(new Date(this.item.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
    //     this.stop_datetime = this.datePipe.transform(new Date(this.item.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
    //     console.log('this.start_date = ' + this.start_datetime)
    //   }
    // }
    // this.location = this.item.location
    // this.description = this.reformNoticeContent(this.item.description)
    if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
      // let body = this.handleData(false)
      // body['wait_id'] = this.item.id
      // body['relly_start_time_temp'] = this.item.relly_start_time_temp
      // this.navCtrl.push('FinishScheulePage', {
      //   'body': body,
      //   'selectList': this.selectList,
      // })
      let body = {
        'user_id': this.uid,
        'meeting_line_id': this.item.res_id
      }
      this.firService.finish_meeting_line(body).then(res => {
        Utils.toastButtom('操作成功', this.toastCtrl)
        if (res.result.res_code == 1) {
          this.reload_with_no_loading()
        }
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
      this.click_appoint_data()
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
      this.click_appoint_data()
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
  levelChange(option2: any) {
    for (let i = 0; i < this.level_list.length; i++) {
      if (this.level_list[i].display_name == this.level_name) {
        this.level_id = this.level_list[i].id
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

  getTask() {
    let body = {
      'uid': this.uid
    }
    this.firService.get_pcc_list(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.pcc_list = res.result.res_data
        for (let i = 0; i < res.result.res_data.length; i++) {
          if (res.result.res_data[i].partner_id == this.now_partner_id) {
            this.is_pcc = true
          }
        }
      }
      if (this.is_pcc) {
        if (this.isEdit == true) {
          // this.rt_project_principal = this.now_partner_id
          // this.rt_project_principal_name = this.now_partner_name
          this.selectList.push({
            'partner_id': this.rt_project_principal,
            'partner_name': this.rt_project_principal_name,
            'ischeck': true
          })
        }
        else {
          if (this.navParams.get('pcc_enter')) {
            this.edit()
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

  // 选择需求方
  selectAppoint() {
    this.title_meeting = '需求方'
    this.showPeopleList = []
    this.showPeopleList.push({
      'partner_id': this.rt_appoint_party,
      'partner_name': this.rt_appoint_party_name,
      'ischeck': true
    })
    this.search = true
    this.select_type = 5
    this.employeeList = []
    this.linshiString = ''
  }

  selectPCC() {
    // this.title_meeting = 'PCC'
    this.showPeopleList = []
    if (this.rt_pcc_pm_id) {
      this.showPeopleList.push({
        'partner_id': this.rt_pcc_pm_id,
        'partner_name': this.rt_pcc_pm_name,
        'ischeck': true
      })
    }
    this.search = true
    this.select_type = 4
    this.employeeList = this.pcc_list
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
      if (this.select_type == 4) {
        this.employeeList = this.pcc_list
      }
    } else {
      let body = {
        'uid': this.uid,
        'name': $event
      }
      this.employeeList = []
      if (this.select_type == 1 || this.select_type == 2 || this.select_type == 5) {
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
      else if (this.select_type == 3) {
        // this.firService.search_one_other_partner(body).then(res => {
        //   if (res.result.res_data && res.result.res_code == 1) {
        //     this.employeeList = res.result.res_data;
        //     if (this.select_type == 3) {
        //       this.setOtherCheck()
        //     }
        //   }
        // })
        this.firService.search_one_series(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.employeeList = res.result.res_data;
            if (this.select_type == 3) {
              this.setOtherCheck()
            }
          }
        })
      }
      else if (this.select_type == 4) {
        this.firService.search_one_pcc_partner(body).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.employeeList = res.result.res_data;
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
    else if (this.select_type == 4) {
      this.search = false
      this.showPeopleList = []
      //接下来的逻辑是，（前提，负责人默认是参与人）,选的负责人如果已经在选择的人里面了，就不加，不在里面，就加，避免重复
      this.rt_pcc_pm_id = item.partner_id
      this.rt_pcc_pm_name = item.partner_name
    }
    // 选择需求方
    else if (this.select_type == 5) {
      this.search = false
      this.showPeopleList = []
      //接下来的逻辑是，（前提，负责人默认是参与人）,选的负责人如果已经在选择的人里面了，就不加，不在里面，就加，避免重复
      this.rt_appoint_party = item.partner_id
      this.rt_appoint_party_name = item.partner_name
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
      this.click_appoint_data()
    }, 100)
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
    if (is_edit) {
      if (!this.rt_is_sure_time) {
        if (this.allday) {
          if ((<HTMLInputElement>document.getElementById('input_start_date'))) {
            this.start_date = (<HTMLInputElement>document.getElementById('input_start_date')).value
          }
          if ((<HTMLInputElement>document.getElementById('input_end_date'))) {
            this.stop_date = (<HTMLInputElement>document.getElementById('input_end_date')).value
          }

        }
        else {
          if ((<HTMLInputElement>document.getElementById('input_start_datetime'))) {
            this.start_datetime = (<HTMLInputElement>document.getElementById('input_start_datetime')).value
          }
          if ((<HTMLInputElement>document.getElementById('input_end_datetime'))) {
            this.stop_datetime = (<HTMLInputElement>document.getElementById('input_end_datetime')).value
          }
        }
      }
    }
    let myString = ""
    if (!this.rt_appoint_data) {
      myString = "    请选择截止时间"
    }
    if (!this.type_id) {
      myString = "    请选择类型"
    }
    if (!this.subject) {
      myString = "    请输入主题"
    }
    if (this.navParams.get('pcc_enter')) {
      if (!this.rt_project_principal) {
        myString = "    请选择负责人"
      }
      // if (!this.selectList || this.selectList.length == 0) {
      //   myString = "    请选择参与人员"
      // }

    }

    if (this.type_name == '任务') {
      if (!this.rt_pcc_pm_name) {
        myString = "    请选择PCC"
      }
      if (parseFloat(this.rt_task_progress) > 100){
        myString = "    进度不能大于100"
      }
    }
    if (myString != "") {
      Utils.toastButtom(myString, this.toastCtrl)
    } else {
      let partner_ids = []
      if (this.selectList && this.selectList.length > 0) {
        for (var i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].partner_id) {
            partner_ids.push(this.selectList[i].partner_id)
          }

        }
      }
      let other_partner_ids = []
      if (this.selectOtherList && this.selectOtherList.length > 0) {
        for (var i = 0; i < this.selectOtherList.length; i++) {
          other_partner_ids.push(this.selectOtherList[i].partner_id)
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
          'rt_tags_series_id': other_partner_ids,
          'start_date': this.start_date,
          'stop_date': this.stop_date,
          'start': this.start_date,
          'stop': this.stop_date,
          'rt_alarm_type': this.alarm_id,
          'location': this.location,
          'description': this.description,
          'rt_project_principal': this.rt_project_principal ? this.rt_project_principal : false,
          'type_app': this.type_app,
          'type_notification': this.type_notification,
          'rt_recurrency_type': '0',
          'rt_task_need_charge': !this.rt_task_need_charge,
          'rt_task_level_id': this.level_id,
          'rt_pcc_pm_id': this.rt_pcc_pm_id,
          'rt_task_level_temp': this.rt_task_level_temp,
          'rt_task_progress': parseFloat(this.rt_task_progress),
          'rt_appoint_party': this.rt_appoint_party,
          'rt_appoint_data': this.rt_appoint_data,
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
            'rt_tags_series_id': other_partner_ids,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'rt_project_principal': this.rt_project_principal ? this.rt_project_principal : false,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type': '0',
            'start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
            'stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
            'rt_task_need_charge': !this.rt_task_need_charge,
            'rt_task_level_id': this.level_id,
            'rt_pcc_pm_id': this.rt_pcc_pm_id,
            'rt_task_level_temp': this.rt_task_level_temp,
            'rt_task_progress': parseFloat(this.rt_task_progress),
            'rt_appoint_party': this.rt_appoint_party,
            'rt_appoint_data': this.rt_appoint_data,
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
            'rt_tags_series_id': other_partner_ids,
            'start_datetime': this.start_datetime,
            'stop_datetime': this.stop_datetime,
            'start': this.start_datetime,
            'stop': this.stop_datetime,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'rt_project_principal': this.rt_project_principal ? this.rt_project_principal : false,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type': '0',
            'rt_task_need_charge': !this.rt_task_need_charge,
            'rt_task_level_id': this.level_id,
            'rt_pcc_pm_id': this.rt_pcc_pm_id,
            'rt_task_level_temp': this.rt_task_level_temp,
            'rt_task_progress': parseFloat(this.rt_task_progress),
            'rt_appoint_party': this.rt_appoint_party,
            'rt_appoint_data': this.rt_appoint_data,
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
    // this.navCtrl.push('CalendarChatPage', {
    //   item: items,
    //   res_id: this.item.id,
    //   navCtrl: 'CalendarDeatilpagePage',
    //   type: 'calendar.event',
    //   has_parent: true,
    // })
    let modal = this.modalController.create("ModalChatPage", {
      item: items,
      res_id: this.item.id,
      navCtrl: 'CalendarDeatilpagePage',
      type: 'calendar.event',
      has_parent: true,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.firService.get_event_detail({
          'uid': this.uid,
          'event_id': this.navParams.get('item_id')
        }).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.item = res.result.res_data
            this.item_change()
          }
        })
      }
    });
    modal.present();
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
    this.navCtrl.push('CalendarChatPage', {
      item: this.item,
      res_id: this.item.id,
      navCtrl: 'CalendarDeatilpagePage',
      type: 'calendar.event',
      has_parent: false,
    })
    // let modal =  this.modalController.create("ModalChatPage")
    // modal.present();
  }

  refresh_view() {
    if (this.item) {
      this.firService.get_event_detail({
        'uid': this.uid,
        'event_id': this.item.id
      }).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data
          this.item_change()
          if (this.tousu_enter) {
            this.detail_type = '3'
            this.show_reply_footer = false
            this.content.resize()
          }
        }
      })
    }
  }

  click_more() {
    let button_arr = []
    if (this.type_name == '任务') {
      if (this.item.state_show == '草稿') {
        button_arr.push({
          text: '提交',
          handler: () => {
            this.submit_meeting_line()
          }
        })
      }
      // 未完成
      if (this.state) {
        // 任务-负责人 开始、标记完成、编辑、删除
        if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.user.partner_id == this.item.rt_pcc_pm_id.id) {
          if (this.item.state_show != '草稿' && this.item.state_show != '已完成' && this.item.state_show != '已验收') {
            button_arr.push({
              text: '修改时间',
              handler: () => {
                this.navCtrl.push('ChangeMeetingLineTimePage', {
                  'uid': this.uid,
                  'meeting_line_id': this.item.res_id,
                  'rt_is_sure_time': this.rt_is_sure_time,
                  'allday': this.allday,
                  'start_date': this.start_date,
                  'stop_date': this.stop_date,
                  'default_start_datetime': this.default_start_datetime,
                  'default_stop_datetime': this.default_stop_datetime,
                })
              }
            })
          }
          if (this.user.partner_id == this.item.rt_pcc_pm_id.id && this.item.state_show == '待指派') {
            this.is_pcc_enter = true
            button_arr.push({
              text: '指派',
              handler: () => {
                this.edit()
              }
            })
          }
          if (this.item.rt_principal_can_check_one && this.item.state_show == '进行中') {
            button_arr.push({
              text: '标记完成',
              handler: () => {
                this.finish()
              }
            })
          }
          // 如果自己没有点开始
          if (this.item.state_show == '暂停' || this.item.state_show == '待开始') {
            button_arr.push({
              text: '开始',
              handler: () => {
                this.check_in_meeting_line({ 'meeting_line_id': this.item.id, 'uid': this.uid })
              }
            })
          }
          else {
            if (!this.item.rt_is_sure_time && this.item.state_show == '进行中') {
              var that = this
              button_arr.push({
                text: '暂停',
                handler: () => {
                  let ctrl = that.alertCtrl;
                  ctrl.create({
                    title: '暂停任务',
                    message: "输入备注",
                    inputs: [
                      {
                        name: 'title',
                        placeholder: '请输入备注'
                      },
                    ],
                    buttons: [
                      {
                        text: '取消',
                        handler: data => {
                        }
                      },
                      {
                        text: '确定',
                        handler: data => {
                          if (data.title) {
                            let body = {
                              'meeting_line_id': that.item.rt_meeting_line_id,
                              'text': data.title,
                              'user_id': that.uid,
                            }
                            this.firService.stop_meeting_line(body).then((res) => {
                              if (res) {
                                if (res.result.res_code == 1) {
                                  Utils.toastButtom('操作成功', this.toastCtrl)
                                  this.reload_with_no_loading()
                                }
                              }
                            })
                          }
                          else {
                            Utils.toastButtom('请填写备注', this.toastCtrl)
                          }
                        }
                      }
                    ]
                  }).present();
                }
              })
            }
          }
          button_arr.push({
            text: '编辑',
            handler: () => {
              this.edit()
            }
          })
          button_arr.push({
            text: '删除',
            handler: () => {
              this.delete()
            }
          })
        }
        // 非负责人
        else {
          // 是否是参与人
          let is_in_partner_ids = false
          if (this.item.partner_ids) {
            for (let i = 0; i < this.item.partner_ids.length; i++) {
              if (this.item.partner_ids[i].partner_id == this.user.partner_id) {
                is_in_partner_ids = true
                break
              }
            }
          }
          // 是参与人
          if (is_in_partner_ids) {
            // 是否开始过
            if (!this.item.rt_is_show_sign) {
              button_arr.push({
                text: '开始',
                handler: () => {
                  this.check_in_meeting_line({ 'meeting_line_id': this.item.id, 'uid': this.uid })
                }
              })
            }
            // 创建人或pcc
            if (this.uid == this.item.create_uid || this.is_meeting_line_pcc) {
              // 是创建人+参与人 
              if (this.uid == this.item.create_uid) {
                button_arr.push({
                  text: '编辑',
                  handler: () => {
                    this.edit()
                  }
                })
                button_arr.push({
                  text: '删除',
                  handler: () => {
                    this.delete()
                  }
                })
              }
              // 是参与人+pcc
              else {
                button_arr.push({
                  text: '编辑',
                  handler: () => {
                    this.edit()
                  }
                })
                button_arr.push({
                  text: '退出',
                  handler: () => {
                    var body = {

                    }
                    if (this.type_name == '任务') {
                      body = {
                        'uid': this.uid,
                        'meeting_line_id': this.item.id,
                      }
                    }
                    else {
                      body = {
                        'uid': this.uid,
                        'calendar_event_id': this.item.id,
                      }
                    }

                    this.firService.quit_all(body).then(res => {
                      if (res.result.res_code == 1) {
                        Utils.toastButtom('退出成功', this.toastCtrl)
                        this.navCtrl.pop()
                      }
                    })
                  }
                })
              }
            }
            else {
              button_arr.push({
                text: '退出',
                handler: () => {
                  var body = {

                  }
                  if (this.type_name == '任务') {
                    body = {
                      'uid': this.uid,
                      'meeting_line_id': this.item.id,
                    }
                  }
                  else {
                    body = {
                      'uid': this.uid,
                      'calendar_event_id': this.item.id,
                    }
                  }

                  this.firService.quit_all(body).then(res => {
                    if (res.result.res_code == 1) {
                      Utils.toastButtom('退出成功', this.toastCtrl)
                      this.navCtrl.pop()
                    }
                  })
                }
              })
            }
          }
          else {
            // 非负责人 非参与人 是创建人
            if (this.uid == this.item.create_uid) {
              if (this.item.state_show != '草稿' && this.item.state_show != '已完成' && this.item.state_show != '已验收'){
                button_arr.push({
                  text: '修改时间',
                  handler: () => {
                    this.navCtrl.push('ChangeMeetingLineTimePage', {
                      'uid': this.uid,
                      'meeting_line_id': this.item.res_id,
                      'rt_is_sure_time': this.rt_is_sure_time,
                      'allday': this.allday,
                      'start_date': this.start_date,
                      'stop_date': this.stop_date,
                      'default_start_datetime': this.default_start_datetime,
                      'default_stop_datetime': this.default_stop_datetime,
                    })
                  }
                })
              }
              if (this.item.state_show == '草稿'){
                button_arr.push({
                  text: '编辑',
                  handler: () => {
                    this.edit()
                  }
                })
              }
              if (!this.is_meeting_line_pcc) {
                button_arr.push({
                  text: '删除',
                  handler: () => {
                    this.delete()
                  }
                })
              }
            }
            else {
              // 只是pcc
              if (this.is_meeting_line_pcc) {
                button_arr.push({
                  text: '编辑',
                  handler: () => {
                    this.edit()
                  }
                })
              }
            }
          }
        }
      }
      // 任务已完成
      else {
        button_arr.push({
          text: '分享',
          handler: () => {
            this.share_moments()
          }
        })
        button_arr.push({
          text: '标记为待办',
          handler: () => {
            this.completion_event()
          }
        })
        button_arr.push({
          text: '编辑',
          handler: () => {
            this.edit()
          }
        })
        button_arr.push({
          text: '删除',
          handler: () => {
            this.delete()
          }
        })
      }

    }
    else {
      button_arr.push({
        text: '分享',
        handler: () => {
          this.share_moments()
        }
      })
      button_arr.push({
        text: '编辑',
        handler: () => {
          this.edit()
        }
      })
      button_arr.push({
        text: '删除',
        handler: () => {
          this.delete()
        }
      })

    }
    button_arr.push({
      text: '取消',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    })
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: button_arr
    });
    actionSheet.present();
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
    var that = this
    $('#input_start_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
      onSet: function (event, inst) {
        // console.log(event)
        that.default_start_datetime = event.valueText
        if (that.default_start_datetime > that.default_stop_datetime) {
          that.default_stop_datetime = event.valueText
          setTimeout(() => {
            that.click_end_datetime()
          }, 10)
        }
      },
    });
  }

  click_start_date() {
    var that = this
    $('#input_start_date').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      onSet: function (event, inst) {
        // console.log(event)
        that.start_date = event.valueText
        if (that.start_date > that.stop_date) {
          that.stop_date = event.valueText
          setTimeout(() => {
            that.click_end_date()
          }, 10)
        }
      },
    });
  }

  click_end_datetime() {
    var that = this
    $('#input_end_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
      onSet: function (event, inst) {
        that.default_stop_datetime = event.valueText
      }
    });
  }

  click_end_date() {
    var that = this
    $('#input_end_date').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      onSet: function (event, inst) {
        that.stop_date = event.valueText
      }
    });
  }

  click_appoint_data() {
    var that = this
    $('#input_appoint_data').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      onSet: function (event, inst) {
        that.rt_appoint_data = event.valueText
      }
    });
  }

  selectExternalPartner() {
    this.title_meeting = '型号'
    this.showPeopleList = this.selectOtherList
    this.storeList = []
    this.storeList = this.storeList.concat(this.selectOtherList)
    this.search = true
    this.select_type = 3
    this.employeeList = []
    this.linshiString = ''
  }

  user_is_read(canyu_arr, read_arr) {
    for (var i = 0; i < canyu_arr.length; i++) {
      if (read_arr.indexOf(canyu_arr[i].user_id) > -1) {
        canyu_arr[i]['is_read'] = true
      }
      else {
        canyu_arr[i]['is_read'] = false
      }
    }
  }

  click_check_in() {
    this.navCtrl.push('MeetingCheckInPage', {
      'meeting_line_id': this.item.id,
      'uid': this.uid,
    })
  }

  // showback(){

  // }

  hide_click() {
    this.hide_btn = true
  }

  show_click() {
    this.hide_btn = false
  }

  quit_meeting() {
    var ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      subTitle: '是否确认退出？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          var body = {

          }
          if (this.type_name == '任务') {
            body = {
              'uid': this.uid,
              'meeting_line_id': this.item.id,
            }
          }
          else {
            body = {
              'uid': this.uid,
              'calendar_event_id': this.item.id,
            }
          }

          this.firService.quit_all(body).then(res => {
            if (res.result.res_code == 1) {
              Utils.toastButtom('退出成功', this.toastCtrl)
              this.navCtrl.pop()
            }
          })
        }
      }
      ]
    }).present();


  }

  click_more_quit() {
    let button_arr = []
    if (this.item.state) {
      button_arr = [{
        text: '退出',
        handler: () => {
          this.quit_meeting()
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }
    else {
      button_arr = [{
        text: '申请重新评估',
        handler: () => {
          this.tousu()
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
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: button_arr,
    });
    actionSheet.present();
  }

  clickRe() {
    this.detail_type = "3"
    this.show_reply_footer = false
    this.content.resize()
  }

  clickJifen() {
    this.detail_type = "2"
    this.show_reply_footer = false
    this.content.resize()
  }

  clickLL() {
    this.detail_type = "3"
    this.show_reply_footer = false
    this.content.resize()
  }

  clickJH() {
    this.detail_type = "4"
    this.show_reply_footer = false
    this.content.resize()
  }

  clickZT() {
    this.detail_type = "5"
    this.show_reply_footer = false
    this.content.resize()
  }

  clickDetail() {
    this.detail_type = "1"
    if (this.type_name == '任务') {
      this.show_reply_footer = true
    }
    this.content.resize()
  }

  is_need_me_reply(one_data) {
    if (one_data.rt_complain_who_deal_id == this.user.partner_id) {
      return true
    }
    else {
      return false
    }
  }

  reply_cg(one_data) {
    this.navCtrl.push('TousuDetailPage', {
      'item': one_data,
      'uid': this.uid,
      'submit': false,
    })
  }

  tousu() {
    this.navCtrl.push('TousuDetailPage', {
      'event_id': this.item.id,
      'uid': this.uid,
      'submit': true
    })
  }

  goto(item_meeting) {
    if (item_meeting.type == 3) {
      this.navCtrl.push('MeetingProjectPage', {
        'meeting_id': item_meeting.meeting_id,
        'isEdit': false,
        'uid': this.uid,
        'frontPage': 'CalendarDeatilpagePage'
      })
    }
    else {
      this.navCtrl.push('MeetingPage', {
        'meeting_id': item_meeting.meeting_id,
        'isEdit': false,
        'uid': this.uid,
        'frontPage': 'CalendarDeatilpagePage',
      })
    }
  }

  //分享到圈子
  share_moments() {
    this.navCtrl.push('CreateMomentsPage', {
      user_id: this.uid,
      is_share: true,
      share_id: this.item.id,
      share_title: this.subject,
      share_from: '待办',
      share_model: this.item.current_model_name
    })
  }

  check_in_meeting_line(body) {
    this.firService.check_in(body).then(res => {
      if (res.result.res_code == 1) {
        Utils.toastButtom('任务开始', this.toastCtrl)
        this.firService.get_event_detail_no_loading({
          'uid': this.uid,
          'event_id': this.navParams.get('item_id')
        }).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.item = res.result.res_data
            this.firService.read_event({ 'event_id': this.item.id, 'uid': this.uid }).then(res => {

            })
            this.item_change()
            if (this.type_name == '任务') {
              this.getTask()

            }
          }
        })
      }
    })
  }

  reload_with_no_loading() {
    this.firService.get_event_detail_no_loading({
      'uid': this.uid,
      'event_id': this.navParams.get('item_id')
    }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
        this.firService.read_event({ 'event_id': this.item.id, 'uid': this.uid }).then(res => {

        })
        this.item_change()
        if (this.type_name == '任务') {
          this.getTask()

        }
      }
    })
  }

  new_reply_to() {
    let modal = this.modalController.create("ModalChatPage", {
      item: this.item,
      res_id: this.item.id,
      navCtrl: 'CalendarDeatilpagePage',
      type: 'calendar.event',
      has_parent: false,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.firService.get_event_detail({
          'uid': this.uid,
          'event_id': this.navParams.get('item_id')
        }).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.item = res.result.res_data
            this.item_change()
          }
        })
      }
    });
    modal.present();
  }

  reformNoticeContent(content) {

    content = content.split('');
    var tagBoolean = false;
    content.forEach((c, index) => {
      if ('<' === c) {
        tagBoolean = true;
      } else if ('>' === c) {
        content[index] = '';
        tagBoolean = false;
        // continue;  如果是JavaScript可以添加这句代码，angular4不行。
      }
      if (tagBoolean) {
        content[index] = '';
      }
    });
    content = content.join('');
    return content
  }

  presentPopover(ev, show_text) {

    this.popover = this.popoverCtrl.create('PopoverShowTextPage', {
      show_text: show_text
    });

    this.popover.present({
      ev: ev
    });
  }

  submit_meeting_line() {
    let body = {
      'uid': this.uid,
      'meeting_line_id': this.item.res_id,
    }
    this.firService.submit_meeting_line(body).then(res => {
      if (res.result.res_code == 1){
        this.reload_with_no_loading()
      }
    })

  }

}
