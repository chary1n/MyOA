import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ActionSheetController, AlertController } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';
import { FirstShowService } from './../first_service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DomSanitizer } from '@angular/platform-browser';
declare let cordova: any;
import 'jquery'
declare var $: any;
/**
 * Generated class for the MeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-next-meeting',
  templateUrl: 'next-meeting.html',
  providers: [FirstShowService, DatePipe]
})
export class NextMeetingPage {
  @ViewChild(Content) content: Content;
  @ViewChild('nameInput') nameInput;
  item;
  isEdit = false//是否是编辑状态
  search = false//是否显示搜索
  change = false
  frontPage;
  user;
  rt_project_principal;
  rt_project_principal_id;
  uid;
  selectList = []
  selectOtherList = []
  start_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  stop_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  start_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  stop_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  default_start_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
  default_stop_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')

  need_fresh = false
  pet = 0;
  rt_alarm_type = '不提醒';
  rt_alarm_type_id = '-1';
  rt_type_app = true;
  rt_type_notification = false;
  item_tip_name = '不提醒'
  select_type;
  rt_is_sure_time = false
  rt_allday = false
  showPeopleList = []
  employeeList = []
  storeList = []
  linshiString = ''
  linshiStringOther = ''
  name = ''
  rt_location = ''
  rt_description = ''
  rt_hint = ''
  wait_id;
  item_start;
  item_stop;
  meeting_id;
  rt_meeting_ids = [];
  rt_meeting_state;
  context_message;
  need_show_more_icon = true;
  isShowTip = false
  title_meeting = '新建会议'
  title_meeting_two = '会议'
  showIcon = false
  create_user_name

  setting
  zNodes = []
  tree_obj

  is_create_serve = false

  origin_meeting_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    private datePipe: DatePipe, public statusBar: StatusBar, public firService: FirstShowService
    , public toastCtrl: ToastController, private sanitizer: DomSanitizer, public actionSheetCtrl: ActionSheetController, public alert: AlertController) {

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
          $.fn.zTree.getZTreeObj("ztree_next").checkNode(treeNode, !treeNode.checked, "checkTruePS", null)
          var select_data = $.fn.zTree.getZTreeObj("ztree_next").getCheckedNodes(true)
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
          var select_data = $.fn.zTree.getZTreeObj("ztree_next").getCheckedNodes(true)
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
    };
    this.zNodes = [

    ]


    this.frontPage = Utils.getViewController(this.navParams.get('frontPage'), navCtrl)
    this.isEdit = this.navParams.get('isEdit')
    this.origin_meeting_id = this.navParams.get('origin_meeting_id')
    this.storage.get('user').then(res => {
      this.user = res.result.res_data
      this.uid = res.result.res_data.user_id;
      if (this.isEdit == true) {
        this.item = this.navParams.get('item')
        this.item_change()
        let current_day = new Date()
        // current_day = this.navParams.get('date')
        // this.rt_project_principal_id = this.user.partner_id
        // this.rt_project_principal = this.user.partner_name
        // this.selectList.push({
        //   'partner_id': this.rt_project_principal_id,
        //   'partner_name': this.rt_project_principal,
        //   'ischeck': true
        // })
        // this.start_datetime = new Date(current_day.getTime() + 8 * 60 * 60 * 1000).toISOString();
        // this.stop_datetime = new Date(current_day.getTime() + 8 * 60 * 60 * 1000).toISOString();
        // this.default_start_datetime = this.datePipe.transform(new Date(current_day.getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm')
        // this.default_stop_datetime = this.datePipe.transform(new Date(current_day.getTime() + 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm')
        // this.start_date = this.datePipe.transform(current_day, 'yyyy-MM-dd')
        // this.stop_date = this.datePipe.transform(current_day, 'yyyy-MM-dd')
      } else {
        this.meeting_id = this.navParams.get('meeting_id');
        this.uid = this.navParams.get('uid');
        this.get_all_data()
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextMeetingPage');
  }

  ionViewDidEnter() {
    this.tree_obj = $.fn.zTree.init($("#ztree_next"), this.setting, this.zNodes);
    this.click_start_datetime()
    this.click_start_date()
    this.click_end_date()
    this.click_end_datetime()
    // $(".calendar").flatpickr()
    // $(".flatpickr").flatpickr();
  }

  //获取页面数据
  get_all_data() {
    let body = {
      'uid': this.uid,
      'meeting_id': this.meeting_id
    }
    var that = this
    this.firService.get_meeting(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
        if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
          this.need_show_more_icon = true
        }
        else {
          this.need_show_more_icon = false
        }
        this.item_change()

      }
    })
  }
  item_change() {
    if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
      this.isShowTip = true
    }
    else {
      this.isShowTip = false
    }
    this.rt_is_sure_time = this.item.rt_is_sure_time
    this.name = this.item.name
    this.rt_project_principal = this.item.rt_project_principal.name
    this.create_user_name = this.item.create_user_name
    this.rt_meeting_ids = this.item.rt_meeting_ids
    this.selectList = this.item.rt_meeting_participant
    this.selectOtherList = this.item.rt_meeting_participant_other
    this.rt_alarm_type_id = this.item.rt_alarm_type
    this.rt_alarm_type = this.item.rt_alarm_type_name

    this.item_tip_name = ''
    if (this.item.rt_alarm_type == '-1') {
      this.item_tip_name = this.item.rt_alarm_type_name
    } else if (this.item.rt_type_app && !this.item.rt_type_notification) {
      this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒)'
    } else if (this.item.rt_type_notification && !this.item.rt_type_app) {
      this.item_tip_name = this.item.rt_alarm_type_name + '(网页提醒)'
    } else if (this.item.rt_type_app && this.item.rt_type_notification) {
      this.item_tip_name = this.item.rt_alarm_type_name + '(App提醒、网页提醒)'
    }
    this.rt_location = this.item.rt_location
    this.rt_description = this.item.rt_description.replace(/\n/g, "<br>")
    this.rt_hint = this.item.rt_hint.replace(/\n/g, "<br>")
    this.rt_meeting_state = this.item.rt_meeting_state

    if (this.item.rt_allday && this.item.rt_meeting_start && this.item.rt_meeting_stop) {
      this.item_start = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'MM-dd')
      this.item_stop = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'MM-dd')
    } else if (this.item.rt_meeting_start && this.item.rt_meeting_stop) {
      this.item_start = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'MM-dd HH:mm')
      this.item_stop = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'MM-dd HH:mm')
    }
    if (this.rt_is_sure_time == true) {

    } else {
      this.start_date = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'yyyy-MM-dd')
      this.stop_date = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'yyyy-MM-dd')
      this.start_datetime = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'
      this.stop_datetime = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ', 'T') + 'Z'
      this.default_start_datetime = this.datePipe.transform(new Date(this.item.rt_meeting_start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
      this.default_stop_datetime = this.datePipe.transform(new Date(this.item.rt_meeting_stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm')
    }
    if (this.rt_allday) {
      this.click_end_date()
      this.click_start_date()
    }
    else {
      this.click_end_datetime()
      this.click_start_datetime()
    }



  }
  //滑动事件
  panEvent($event) {
    // cordova.plugins.Keyboard.close();
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
    if (this.need_fresh == true) {
      if (this.pet == 1) {
        this.rt_alarm_type_id = this.navParams.get('alarm_id')
        this.rt_alarm_type = this.navParams.get('alarm_name')
        this.rt_type_app = this.navParams.get('type_app')
        this.rt_type_notification = this.navParams.get('type_notification')
        this.item_tip_name = ''
        if (this.rt_alarm_type_id == '-1') {
          this.item_tip_name = this.navParams.get('alarm_name')
        } else if (this.rt_type_app && !this.rt_type_notification) {
          this.item_tip_name = this.navParams.get('alarm_name') + '(App提醒)'
        } else if (this.rt_type_notification && !this.rt_type_app) {
          this.item_tip_name = this.navParams.get('alarm_name') + '(网页提醒)'
        } else if (this.rt_type_app && this.rt_type_notification) {
          this.item_tip_name = this.navParams.get('alarm_name') + '(App提醒、网页提醒)'
        }
      } else if (this.pet == 2) {
        // this.frontPage.data.need_fresh = true;
        this.navCtrl.pop()
      } else if (this.pet == 4) {
        this.get_all_data()
      }
    }
    else
        {
            this.get_all_data()
        }
    var need_fresh_reply = this.navParams.get('need_fresh_reply')

    // if (need_fresh_reply) {
    // this.get_all_data()
    // }
  }

  //取消新建待办事项
  cancel() {
    // cordova.plugins.Keyboard.close()
    if (this.search) {
      this.title_meeting = '新建会议'
      if (this.edit && this.search && this.change) {
        this.title_meeting_two = '会议'
      }
      this.search = false
      setTimeout(() => {
        if (this.rt_allday) {
          this.click_end_date()
          this.click_start_date()
        }
        else {
          this.click_end_datetime()
          this.click_start_datetime()
        }
      }, 1)
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
    // cordova.plugins.Keyboard.close()
    if (this.search) {
      this.title_meeting = '新建会议'
      if (this.edit && this.search && this.change) {
        this.title_meeting_two = '会议'
      }
      this.search = false
      setTimeout(() => {
        if (this.rt_allday) {
          this.click_end_date()
          this.click_start_date()
        }
        else {
          this.click_end_datetime()
          this.click_start_datetime()
        }
        return
      }, 10)

    }
    // else {
      // if (!this.is_create_serve) {
      //   this.is_create_serve = true
        let body = this.handleData()
        if (body) {
          body['rt_origin_meeting_id'] = this.origin_meeting_id
          this.firService.create_meeting(body).then(res => {
            if (res.result.res_code == 1) {
              // this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage);
            }
          })
        }
      // }
    // }

  }
  //时间待定的按钮
  notSureClick() {
    if (this.rt_is_sure_time && this.rt_allday) {
      this.rt_allday = false
    }
    setTimeout(() => {
      if (this.rt_allday) {
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
    if (this.rt_is_sure_time && this.rt_allday) {
      this.rt_is_sure_time = false
    }
    setTimeout(() => {
      if (this.rt_allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)
  }

  //删除一个人员
  closePartner(item) {
    for (var i = 0; i < this.showPeopleList.length; i++) {
      if (item.partner_id == this.showPeopleList[i].partner_id) {
        this.showPeopleList.splice(i, 1)
        if (this.select_type == 1) {
          var select_datas = $.fn.zTree.getZTreeObj("ztree_next").getCheckedNodes(true)
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
    this.title_meeting_two = '负责人'
    this.showPeopleList = []
    this.showPeopleList.push({
      'partner_id': this.rt_project_principal_id,
      'partner_name': this.rt_project_principal,
      'ischeck': true
    })
    this.search = true
    this.select_type = 2
    this.employeeList = []
    this.linshiString = ''
    setTimeout(() => {
      this.nameInput.setFocus();//输入框获取焦点
    })
  }
  //选择参与人员
  selectPartner() {
    this.title_meeting = '参与人员'
    this.title_meeting_two = '参与人员'
    this.showPeopleList = this.selectList
    this.storeList = []
    this.storeList = this.storeList.concat(this.selectList)
    this.search = true
    this.select_type = 1
    this.employeeList = []
    this.linshiString = ''
    // setTimeout(() => {
    //   this.nameInput.setFocus();//输入框获取焦点
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
        self.tree_obj = $.fn.zTree.init($("#ztree_next"), self.setting, self.zNodes);
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
    this.linshiStringOther = ''
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
      this.title_meeting = '新建会议'
      this.title_meeting_two = '会议'
      if (item.partner_id == this.rt_project_principal_id) {
        this.search = false
        return
      } else {
        this.search = false
        this.showPeopleList = []
        //接下来的逻辑是，（前提，负责人默认是参与人）,选的负责人如果已经在选择的人里面了，就不加，不在里面，就加，避免重复
        this.rt_project_principal_id = item.partner_id
        this.rt_project_principal = item.partner_name
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
      'page': 'MeetingPage',
      'alarm_id': this.rt_alarm_type_id,
      'alarm_name': this.rt_alarm_type,
      'type_app': this.rt_type_app,
      'type_notification': this.rt_type_notification
    })
  }

  //处理所有数据
  handleData() {
    if (!this.rt_is_sure_time) {
      if (this.rt_allday) {
        this.start_date = (<HTMLInputElement>document.getElementById('input_start_date')).value
        this.stop_date = (<HTMLInputElement>document.getElementById('input_end_date')).value
      }
      else {
        this.start_datetime = (<HTMLInputElement>document.getElementById('input_start_datetime')).value
        this.stop_datetime = (<HTMLInputElement>document.getElementById('input_end_datetime')).value
      }
    }


    let myString = ""
    if (!this.name) {
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
      if (!this.rt_alarm_type_id) {
        this.rt_alarm_type_id = '-1'
      }
      let body = {}
      if (this.rt_allday == true && this.start_date && this.stop_date && this.rt_is_sure_time == false) {
        console.log('start = ' + this.start_date + '  stop = ' + this.stop_date)
        if (new Date(this.start_date.replace(/-/g, "/")).getTime() > new Date(this.stop_date.replace(/-/g, "/")).getTime()) {
          Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
          return
        }
        body = {
          'uid': this.uid,
          'rt_is_sure_time': this.rt_is_sure_time,
          'rt_allday': this.rt_allday,
          'name': this.name,
          'rt_meeting_participant': partner_ids,
          'rt_meeting_participant_other': other_partner_ids,
          'rt_meeting_start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
          'rt_meeting_stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
          'rt_alarm_type': this.rt_alarm_type_id,
          'rt_location': this.rt_location,
          'rt_description': this.rt_description,
          'rt_project_principal': this.rt_project_principal_id,
          'rt_type_app': this.rt_type_app,
          'rt_type_notification': this.rt_type_notification,
          'rt_hint': this.rt_hint,
          'rt_start_date': this.start_date,
          'rt_stop_date': this.stop_date
        }
      } else {
        if (this.rt_is_sure_time == true) {
          body = {
            'uid': this.uid,
            'rt_is_sure_time': this.rt_is_sure_time,
            'rt_allday': this.rt_allday,
            'name': this.name,
            'rt_meeting_participant': partner_ids,
            'rt_meeting_participant_other': other_partner_ids,
            'rt_alarm_type': this.rt_alarm_type_id,
            'rt_location': this.rt_location,
            'rt_description': this.rt_description,
            'rt_project_principal': this.rt_project_principal_id,
            'rt_type_app': this.rt_type_app,
            'rt_type_notification': this.rt_type_notification,
            'rt_meeting_start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
            'rt_meeting_stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
            'rt_hint': this.rt_hint,
          }
        } else {
          if (this.start_datetime && this.stop_datetime) {
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
            'rt_allday': this.rt_allday,
            'name': this.name,
            'rt_meeting_participant': partner_ids,
            'rt_meeting_participant_other': other_partner_ids,
            'rt_meeting_start': this.start_datetime,
            'rt_meeting_stop': this.stop_datetime,
            'rt_alarm_type': this.rt_alarm_type_id,
            'rt_location': this.rt_location,
            'rt_description': this.rt_description,
            'rt_project_principal': this.rt_project_principal_id,
            'rt_type_app': this.rt_type_app,
            'rt_type_notification': this.rt_type_notification,
            'rt_hint': this.rt_hint,
          }
        }
      }
      return body
    }
  }

  addMeeting() {
    if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
      this.navCtrl.push('CalendarDeatilpagePage', {
        'isEdit': true,
        'type': 1,
        'meeting_id': this.meeting_id,
        'frontPage': 'NextMeetingPage'
      })
    } else {
      Utils.toastButtom('只有负责人和创建人可以添加任务', this.toastCtrl)
    }
  }

  lookDetail(item) {
    this.navCtrl.push('CalendarDeatilpagePage', {
      'item': item,
      'isEdit': false,
      'type': 1,
      'frontPage': 'NextMeetingPage'
    })
  }

  delete() {
    if (this.user.partner_id == this.item.rt_project_principal.partner_id_s_id || this.uid == this.item.create_uid) {
      let body = {
        'id': this.item.id,
        'uid': this.uid
      }
      this.firService.delete_meeting(body).then(res => {
        // if (res.result.res_code == 1){
        // this.frontPage.data.need_fresh = true;
        this.navCtrl.pop()
        // }
      })
    } else {
      Utils.toastButtom('只有负责人和创建人可以删除', this.toastCtrl)
    }
  }
  //点击编辑
  edit() {
    this.title_meeting_two = "会议"
    this.content.resize()
    this.rt_description = this.item.rt_description
    this.rt_hint = this.item.rt_hint
    if (this.item.state == false) {
      Utils.toastButtom('完成状态不可编辑', this.toastCtrl)
      return
    }
    if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
      this.isEdit = true
      this.change = true
    } else {
      Utils.toastButtom('只有负责人和创建人可以编辑', this.toastCtrl)
    }
    setTimeout(() => {
      if (this.rt_allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)
  }
  //编辑完成
  changeFinish() {
    // cordova.plugins.Keyboard.close()
    if (this.search) {
      this.search = false
      return
    }
    let body = this.handleData()
    body['meeting_id'] = this.item.id
    this.firService.write_meeting(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.isEdit = false
        this.change = false
        this.content.resize()
        this.item = res.result.res_data
        this.item_change()
      }
    })
  }
  //编辑取消
  changeCancel() {
    // cordova.plugins.Keyboard.close()
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
      this.content.resize()
    }
  }
  //标记完成
  finish() {
    if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
      let body = {
        'meeting_id': this.item.id,
        'uid': this.uid,
        'rt_meeting_state': 'open'
      }
      this.firService.change_meeting(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data
          this.item_change()


          this.alert.create({
            title: '是否在此单据基础上 创建一张新的单据',
            buttons: [{
              text: '取消',
              handler: () => {
                this.navCtrl.pop()
              }
            },
            {
              text: '确定',
              handler: () => {
                this.navCtrl.pop()
              }
            }
            ]
          }).present();
        }
      })
    } else {
      Utils.toastButtom('只有负责人和创建人可以标记完成', this.toastCtrl)
    }
  }
  //标记为代办
  completion_event() {
    if (this.user.partner_id == this.item.rt_project_principal.id || this.uid == this.item.create_uid) {
      let body = {
        'meeting_id': this.item.id,
        'uid': this.uid,
        'rt_meeting_state': 'draft'
      }
      this.firService.change_meeting(body).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data
          this.item_change()
        }
      })
    } else {
      Utils.toastButtom('只有负责人和创建人可以标记完成', this.toastCtrl)
    }
  }

  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  only_reply_to(items) {
    this.navCtrl.push('CalendarChatPage', {
      item: items,
      res_id: this.item.id,
      navCtrl: 'MeetingPage',
      type: 'rt.meeting',
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
                  this.get_all_data()
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
        navCtrl: 'MeetingPage',
        type: 'rt.meeting',
        has_parent: true,
      })
    }



  }

  send() {
    this.navCtrl.push('CalendarChatPage', {
      item: this.item,
      res_id: this.item.id,
      navCtrl: 'MeetingPage',
      type: 'rt.meeting',
      has_parent: false,
    })
    //   if (this.context_message.length == 0 || this.context_message.match(/^\s+$/g)){
    //   Utils.toastButtom("回复不可为空", this.toastCtrl)
    // }
    // else{
    //   let body = {
    //     'uid': this.uid,
    //     'res_id': this.item.id,
    //     'context': this.context_message,
    //     'parent_id': false,
    //     'type': 'rt.meeting',
    //   }
    //   this.firService.reply_to(body).then(res => {
    //     if (res.result.res_code == 1) {
    //       this.context_message = ''
    //       Utils.toastButtom("回复成功", this.toastCtrl)
    //       this.get_all_data()
    //     }
    //   })
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
    if (this.rt_meeting_state) {
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
        this.get_all_data()
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
        this.get_all_data()
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
                  this.get_all_data()
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

  selectExternalPartner() {
    this.title_meeting = '外部人员'
    this.title_meeting_two = '外部人员'
    this.showPeopleList = this.selectOtherList
    this.storeList = []
    this.storeList = this.storeList.concat(this.selectOtherList)
    this.search = true
    this.select_type = 3
    this.employeeList = []
    this.linshiStringOther = ''
  }

  quit_meeting() {
        var ctrl = this.alert
        ctrl.create({
            title: '提示',
            subTitle: '是否确认退出？',
            buttons: [{ text: '取消' },
            {
                text: '确定',
                handler: () => {
                    var body = {
                        'uid': this.uid,
                        'meeting_id': this.meeting_id,
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
        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [{
                text: '退出',
                handler: () => {
                    this.quit_meeting()
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


