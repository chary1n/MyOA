import { AllScheduleService } from './all-schedule-service';
import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { FirstshowMenuPage } from '../firstshow-menu/firstshow-menu'
import { FirstShowPage } from '../first-show'
import 'jquery'
declare var $: any;
/**
 * Generated class for the AllSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-all-schedule',
    templateUrl: 'all-schedule.html',
    providers: [FirstShowService, AllScheduleService]
})
export class AllSchedulePage {
    uid
    dataList = []
    type_list = []
    meeting_id
    type_id = -1
    need_fresh = false;
    me_type = []
    state_type = 'all'
    start_date
    end_date
    show_me = true
    need_show_choose = false
    title = '我的'
    is_manager = false

    setting
    zNodes = []
    tree_obj

    from_work_bench = false

    type = []

    limit = 15
    offset = 0
    search_type
    search_text
    isMoreData = true
    constructor(public navCtrl: NavController, public navParams: NavParams, private firshowService: FirstShowService,
        public storage: Storage, public statusBar: StatusBar, public allScheduleService: AllScheduleService,
        public menu: MenuController, public event: Events) {
        this.from_work_bench = this.navParams.get('is_work_bench')
        this.me_type = []
        this.state_type = 'all'
        this.show_me = true
        this.title = '我的'
        this.event.publish('ChooseMenuPage')
        this.storage.get('user').then(res => {
            this.firshowService.get_is_department(res.result.res_data.user_id).then(res => {
                if (res.result.res_data && res.result.res_code == 1) {
                    this.is_manager = res.result.res_data.is_manager
                }
            })
        })

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
                    // this.tree_obj = $.fn.zTree.init($("#ztree"),this.setting,this.zNodes);
                    $.fn.zTree.getZTreeObj("ztree").checkNode(treeNode, !treeNode.checked, "checkTruePS", null)
                },
            }
        };
        this.zNodes = [

        ]

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AllSchedulePage');
    }

    ionViewDidEnter() {


        this.event.subscribe('search_domain', (data) => {
            console.log(data)
            this.me_type = data.me_type
            this.state_type = data.state_type
            this.start_date = data.start_date
            this.end_date = data.end_date
            if (this.show_me) {
                this.offset = 0
                this.get_all_data()
            }

        })

        if (this.show_me) {
            this.offset = 0
            this.storage.get('user').then(res => {
                this.uid = res.result.res_data.user_id;
                this.type_id = -1
                let body = {
                    'uid': this.uid,
                    'me_type': this.me_type,
                    'state_type': this.state_type,
                    'event_type': this.type_id,
                    'limit': this.limit,
                    'offset': this.offset,
                }

                this.firshowService.get_all_schedule_new_test(body).then(res => {
                    if (res.result.res_data && res.result.res_code == 1) {
                        this.dataList = res.result.res_data.data

                        this.meeting_id = res.result.res_data.meeting_id
                        for (let i = 0; i < this.dataList.length; i++) {
                            if (this.dataList[i].id == -1) {
                                this.type_list = this.dataList[i].dataList
                                this.type = this.dataList[i].type
                            }
                        }
                    }
                })
            })
        }
        else {
            this.firshowService.get_all_department({ 'uid': this.uid }).then(res => {
                if (res.result.res_data && res.result.res_code == 1) {
                    this.zNodes = res.result.res_data
                    this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
                }
            })
        }
    }

    goBack() {
        if (this.from_work_bench) {
            this.navCtrl.pop()
        }
        else {
            // var element = document.getElementById("contact_body");
            // if (element && element.parentNode) {
            //     element.parentNode.removeChild(element);
            // }
            // this.navCtrl.setRoot('NewTabsPage')
            // console.log(this.event)
            this.event.publish('popNavCtrl', {
                'data': true
            })
            // this.navCtrl.setPages([{page:FirstShowPage}])

            // var tolbar = document.getElementsByClassName('tabbar').item(0);
            // tolbar['style'].display = 'flex';
            // this.navCtrl.popTo('FirstShowPage')
        }
    }

    ionViewWillLeave() {
        this.menu.enable(false)
        this.event.unsubscribe('search_domain')
        // this.event.unsubscribe('popNavCtrl')
        this.event.publish('initData', {
            'data': true
        })
    }

    ionViewWillEnter() {
        this.statusBar.backgroundColorByHexString("#2597ec");
        this.statusBar.styleLightContent();
        this.menu.enable(true, 'menu2')
        // this.need_fresh = this.navParams.get('need_fresh')
        // this.type_list = []
        // if (this.need_fresh) {
        //   let body = {
        //     'uid': this.uid
        //   }
        //   this.firshowService.get_all_schedule(body).then(res => {
        //     if (res.result.res_data && res.result.res_code == 1) {
        //       this.meeting_id = res.result.res_data.meeting_id
        //       if (this.type_id == -1) {
        //         this.dataList = res.result.res_data.data
        //       } else {
        //         let listData = []
        //         listData = res.result.res_data.data
        //         for (let i = 0; i < listData.length; i++) {
        //           if (listData[i].id == this.type_id) {
        //             this.type_list = listData[i].dataList
        //             listData[i].select = true
        //           } else {
        //             listData[i].select = false
        //           }
        //         }
        //         this.dataList = listData
        //       }
        //     }
        //   })
        // }
    }

    selectType(item) {
        this.offset = 0
        document.getElementsByClassName('searchbar-input')[0]['value'] = ''
        this.type_id = item.id
        item.select = true
        for (let i = 0; i < this.type.length; i++) {
            if (this.type[i].id != item.id) {
                this.type[i].select = false
            }
        }
        if (this.show_me) {
            this.offset = 0
            this.get_all_data()
        }



        // this.type_list = item.dataList
    }

    toDetail(item) {
        this.need_show_choose = false
        if (item.type_name == '项目') {
            this.navCtrl.push('MeetingProjectPage', {
                'meeting_id': item.rt_meeeting_s_id,
                'isEdit': false,
                'uid': this.uid,
                'frontPage': 'AllSchedulePage'
            })
        }
        else {
            if (this.meeting_id == item.type_id) {
                this.navCtrl.push('MeetingPage', {
                    'meeting_id': item.rt_meeeting_s_id,
                    'isEdit': false,
                    'uid': this.uid,
                    'frontPage': 'AllSchedulePage',
                })
            } else {
                this.navCtrl.push('CalendarDeatilpagePage', {
                    'item_id': item.id,
                    'isEdit': false,
                    'frontPage': 'AllSchedulePage',
                })
            }
        }

    }

    itemSelected(event) {
        this.search_type = ''
        this.search_text = ''
        if (event.id == 1) {
            this.search_type = "subject";
            this.search_text = event.name.replace("搜 主题：", "")
        }
        else if (event.id == 2) {
            this.search_type = "create_uid";
            this.search_text = event.name.replace("搜 创建人：", "")
        }
        else if (event.id == 3) {
            this.search_type = "rt_project_principal";
            this.search_text = event.name.replace("搜 负责人：", "")
        }
        else if (event.id == 4) {
            this.search_type = "partner_ids";
            this.search_text = event.name.replace("搜 参与人：", "")
        }
        if (this.search_text)
            this.type_list = []
        let body = {
            'type': this.search_type,
            'search_text': this.search_text,
            'uid': this.uid,
            'event_type': this.type_id,
            'me_type': this.me_type,
            'state_type': this.state_type,
            'start_date': this.start_date,
            'end_date': this.end_date,
            'limit': this.limit,
            'offset': this.offset,
        }
        this.firshowService.search_all_schedule(body).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
                if (this.show_me) {
                    this.type_list = res.result.res_data
                }
                else {
                    this.navCtrl.push('SearchScheduleListPage', {
                        data_list: res.result.res_data,
                        meeting_id: this.meeting_id,
                        uid: this.uid,
                    })
                }

            }
        })
    }

    itemClearSelected(event) {
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].id == this.type_id) {
                this.type_list = this.dataList[i].dataList
                this.dataList[i].select = true
            } else {
                this.dataList[i].select = false
            }
        }
    }

    clickMenu() {
        this.menu.toggle('right');
    }

    get_all_data() {
        this.type_list = []
        this.storage.get('user').then(res => {
            this.uid = res.result.res_data.user_id;
            let body = {
                'uid': this.uid,
                'me_type': this.me_type,
                'state_type': this.state_type,
                'event_type': this.type_id,
                'start_date': this.start_date,
                'end_date': this.end_date,
                'limit': this.limit,
                'offset': this.offset,
            }
            this.firshowService.get_all_schedule_new_test(body).then(res => {
                if (res.result.res_data && res.result.res_code == 1) {
                    this.dataList = res.result.res_data.data
                    this.meeting_id = res.result.res_data.meeting_id
                    for (let i = 0; i < this.dataList.length; i++) {
                        if (this.dataList[i].id == this.type_id) {
                            this.type_list = this.dataList[i].dataList
                            this.dataList[i].select = true
                        }
                        else {
                            this.dataList[i].select = false
                        }
                    }
                }
            })
        })
    }

    click_search_peopkle() {
        this.need_show_choose = !this.need_show_choose
    }

    click_team_div() {
        this.show_me = false
        this.need_show_choose = false
        this.title = '团队'
        this.event.publish('changeTeam', {
            'data': 'team'
        })
        this.firshowService.get_all_department({ 'uid': this.uid }).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
                this.zNodes = res.result.res_data
                this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
            }
        })
    }

    click_me_div() {
        this.show_me = true
        this.need_show_choose = false
        this.title = '我的'
        this.event.publish('changeTeam', {
            'data': 'me'
        })
        this.offset = 0
        this.get_all_data()
    }

    click_watch() {
        let line_ids = []
        let select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
        for (let i = 0; i < select_data.length; i++) {
            if (select_data[i].partner_id) {
                line_ids.push(select_data[i].partner_id)
            }
        }
        let body = {
            'list_ids': line_ids,
            'uid': this.uid,
            'me_type': this.me_type,
            'state_type': this.state_type,
            'event_type': this.type_id,
            'start_date': this.start_date,
            'end_date': this.end_date,
        }
        this.firshowService.get_calendar_all(body).then(res => {
            if (res.result.res_data && res.result.res_code == 1) {
                console.log(res.result.res_data)
                this.navCtrl.push('SearchScheduleListPage', {
                    data_list: res.result.res_data.data,
                    meeting_id: res.result.res_data.data.meeting_id,
                    uid: this.uid,
                })
            }
        })
    }

    doInfinite(infiniteScroll) {

        if (this.isMoreData) {
            this.offset += 15
            let body = {
                'uid': this.uid,
                'me_type': this.me_type,
                'state_type': this.state_type,
                'event_type': this.type_id,
                'start_date': this.start_date,
                'end_date': this.end_date,
                'limit': this.limit,
                'offset': this.offset,
                'type': this.search_type,
                'search_text': this.search_text,
            }
            this.firshowService.get_more_schedule(body).then(res => {
                infiniteScroll.complete()
                if (res.result.res_data && res.result.res_code == 1) {
                    for (let item of res.result.res_data) {
                        this.type_list.push(item)
                    }
                    if (res.result.res_data.length == 15) {
                        this.isMoreData = true
                    }
                    else {
                        this.isMoreData = false
                    }
                }
                else {
                    this.isMoreData = false
                }
            })
        }
        else {
            infiniteScroll.complete()
        }
    }

}
