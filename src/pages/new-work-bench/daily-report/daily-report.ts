import { NavController, NavParams, IonicPage, ActionSheetController, Content, Events, MenuController} from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { ReportAutoService } from './reportAutoService'
import { ReportMeAutoService } from './reportMeAutoService'
import { ReportService } from './reportService'
import { Storage } from '@ionic/storage';
declare let cordova: any;
/**
 * Generated class for the DailyReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-report',
  templateUrl: 'daily-report.html',
  providers: [ReportAutoService, ReportMeAutoService, ReportService],
})
export class DailyReportPage {
  @ViewChild('contentmain') contentmain: Content;
  editorContent = ''
  type = 'me'
  team_list = []
  me_list = []
  user_id
  pop_hide_footer = true
  is_manager = false

  arr_index = []

  start_date
  end_date
  quick_type = 'month'
  employee_type = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
    public reportService: ReportService,
    public reportAutoServices: ReportAutoService,
    public reportMeAutoServices: ReportMeAutoService,
    public storage: Storage, public event: Events, public menu: MenuController) {
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.reportService.get_is_department_new(this.user_id).then(result => {
          if (result.result.res_data && result.result.res_code == 1) {
            this.is_manager = result.result.res_data.is_manager
          }
          this.reload_me_data()
        })
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportPage');
  }

  ionViewWillLeave() {
    cordova.plugins.Keyboard.close();
    this.menu.enable(false)
    this.event.unsubscribe('search_domain_report')
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'menu_daily55')
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      if (this.type == 'me') {
        this.reload_me_data()
      }
      else {
        // this.reload_team_data()
      }
    }
    else{
      if (this.type == 'me') {
        this.reload_me_data()
      }
    }

    this.event.subscribe('search_domain_report', (data) => {
      this.quick_type = data.quick_type
      this.start_date = data.start_date
      this.end_date = data.end_date
      this.employee_type = data.employee_type
      this.reload_team_data_noloading()
    })
  }

  goBack() {
    // this.pop_hide_footer = false
    // this.navCtrl.pop()
    setTimeout(() => {
      this.event.publish('popNavCtrlReport', {
        'data': true
      })
    }, 100)
    
  }

  click_add_img(allowEdit: boolean = true) {
    // this.imgList.push("assets/img/photo.png")
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1, allowEdit);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0, allowEdit);
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

  getPicture(type, allowEdit: boolean = false) {//1拍照,0从图库选择
    // let options = {
    //   allowEdit: false,
    // };
    // if (type == 1) {
    //   this.nativeService.getPictureByCamera(options).subscribe(img_url => {
    //     this.getPictureSuccess(img_url);
    //   });
    // } else {
    //   this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
    //     this.getPictureSuccess(img_url);
    //   });
    // }
  }

  getPictureSuccess(img_url) {
    this.editorContent = this.editorContent + "<br>" + "<img src='" + img_url + "' />" + "<br>"
  }

  click_me() {
    this.type = 'me'
    this.contentmain.resize()
    this.reload_me_data()
  }

  click_team() {
    this.type = 'team'
    this.contentmain.resize()
    this.reload_team_data()
  }

  changeType(type) {
    if (type == 'day_daily') {
      return '日报'
    }
    else if (type == 'week_daily') {
      return '周报'
    }
    else if (type == 'mouth_daily') {
      return '月报'
    }
    else {
      return ''
    }
  }

  changeState(state) {
    if (state == 1) {
      return '草稿'
    }
    else if (state == 2) {
      return '正式'
    }
    else {
      return ''
    }
  }

  reload_me_data() {
    this.me_list = []
    this.reportService.get_me_daily_report({ 'user_id': this.user_id }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.me_list = res.result.res_data
      }
    })
  }

  reload_team_data_noloading() {
    this.me_list = []
    let body = {
      'user_id': this.user_id,
      'start_date': this.start_date,
      'end_date': this.end_date,
      'quick_type': this.quick_type,
      'employee_type': this.employee_type
    }
    this.reportService.get_team_daily_report_new_noloading(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.team_list = res.result.res_data.final_arr
        this.arr_index = res.result.res_data.arr_index
      }
    })
  }

  reload_team_data() {
    this.me_list = []
    let body = {
      'user_id': this.user_id,
      'start_date': this.start_date,
      'end_date': this.end_date,
      'quick_type': this.quick_type
    }
    this.reportService.get_team_daily_report_new(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.team_list = res.result.res_data.final_arr
        this.arr_index = res.result.res_data.arr_index
      }
    })
  }

  click_add_report() {
    this.reportService.check_draft_daily({'user_id': this.user_id}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        if (res.result.res_data.is_draft) {
          this.navCtrl.push('CreateDailyReportPage', {
            'is_edit': true,
            'user_id': this.user_id,
            'item_data': res.result.res_data.data,
          })
        } else {
          this.navCtrl.push('CreateDailyReportPage', {
            'report_type': 'day_daily',
            'user_id': this.user_id
          })
        }
      }
    })

    
    // let button_arr = []
    // button_arr.push({
    //   text: '日报',
    //   handler: () => {
    //     this.navCtrl.push('CreateDailyReportPage', {
    //       'report_type': 'day_daily',
    //       'user_id': this.user_id
    //     })
    //   }
    // })
    // button_arr.push({
    //   text: '周报',
    //   handler: () => {
    //     this.navCtrl.push('CreateDailyReportPage', {
    //       'report_type': 'week_daily',
    //       'user_id': this.user_id
    //     })
    //   }
    // })
    // button_arr.push({
    //   text: '月报',
    //   handler: () => {
    //     this.navCtrl.push('CreateDailyReportPage', {
    //       'report_type': 'mouth_daily',
    //       'user_id': this.user_id
    //     })
    //   }
    // })
    // button_arr.push({
    //   text: '取消',
    //   role: 'cancel',
    //   handler: () => {
    //     console.log('Cancel clicked');
    //   }
    // })
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: '',
    //   buttons: button_arr,
    // });
    // actionSheet.present();
  }

  me_detail(item) {
    var can_jump_draft = false
    if (item.rt_state == 1) {
      can_jump_draft = true
    } 
    this.navCtrl.push('DailyReportDetailPage', {
      item: item,
      uid: this.user_id,
      can_jump_draft: can_jump_draft,
      
    })
  }

  // team_detail(item) {
  //   this.navCtrl.push('DailyReportDetailPage', {
  //     item: item,
  //     uid: this.user_id,
  //   })
  // }
  team_detail(item,i){
    let now_index = 0
    for(let index=0;index<this.arr_index.length;index++){
      if (item.report_id == this.arr_index[index]){
        now_index = index
      }
    }

    this.navCtrl.push('DailyReportTreeDetailDetailPage', {
      now_report_id: item.report_id,
      uid: this.user_id,
      arr_index: this.arr_index,
      now_index: now_index,
    })
  }

  itemSelected(event) {
    let type;
    let search_text;
    let data;
    if (event.id == 1) {
      data = 'create_uid'
      search_text = event.name.replace("搜 创建人：", "")
    }
    else if (event.id == 2) {
      data = 'summary'
      search_text = event.name.replace("搜 总结：", "")
    }
    else if (event.id == 3) {
      data = 'plan'
      search_text = event.name.replace("搜 计划：", "")
    }

    let body = {
      'data': data,
      'search_text': search_text,
      'type': 'team',
      'user_id': this.user_id,
      'start_date': this.start_date,
      'end_date': this.end_date,
      'quick_type': this.quick_type,
    }
    this.team_list = []
    this.reportService.search_report_by_domain(body).then((res) => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.team_list = res.result.res_data.final_arr
        this.arr_index = res.result.res_data.arr_index
      }
    })
  }

  itemMeSelected(event) {
    let type;
    let search_text;
    let data;
    if (event.id == 1) {
      data = 'summary'
      search_text = event.name.replace("搜 总结：", "")
    }
    else if (event.id == 2) {
      data = 'plan'
      search_text = event.name.replace("搜 计划：", "")
    }

    let body = {
      'data': data,
      'search_text': search_text,
      'type': 'me',
      'user_id': this.user_id
    }
    this.me_list = []
    this.reportService.search_report_by_domain(body).then((res) => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.me_list = res.result.res_data
      }
    })
  }

  itemClearSelected(event) {
    this.reload_team_data()
  }

  itemClearMeSelected(event) {
    this.reload_me_data()
  }

  choose_tree(){
    this.navCtrl.push('DailyReportTreePage', {
      'user_id': this.user_id,
    })
  }

  choose_menu() {
    this.menu.toggle('right');
  }

}
