import { Utils } from './../../providers/Utils';
import { MomentsCircleService } from './momentsCircleService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { EmployeeService } from '../add-employee/EmployeeService';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { GalleryModal } from 'ionic-gallery-modal';

/**
 * Generated class for the MomengsCirclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-momengs-circle',
  templateUrl: 'momengs-circle.html',
  providers: [MomentsCircleService, EmployeeService]
})
export class MomengsCirclePage {

  selectType = 'all'
  user_id: any;
  dataList = []
  need_fresh = false
  un_read_list = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public momentsCircleService: MomentsCircleService
    , public storage: Storage, public statusBar: StatusBar, public employeeService: EmployeeService,
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public events: Events, public modalController: ModalController) {

    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;
        this.get_dataList(this.selectType)
        this.get_moments_message()
      });
  }


  get_moments_message() {
    this.un_read_list = []
    let body = {
      'user_id': this.user_id,
    }
    this.momentsCircleService.get_moments_message(body).then(res => {
      if (res) {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.un_read_list = res.result.res_data
          this.events.publish('change', this.un_read_list.length)
        } else {
          this.events.publish('change', 0)
        }
      }
    })
  }


  get_dataList(type) {
    let body = {
      'user_id': this.user_id,
      'offset': 0,
      'type': type
    }
    this.momentsCircleService.get_moments_list(body).then(res => {
      if (res) {
        if (res.result.res_code == 1) {
          this.dataList = res.result.res_data
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MomengsCirclePage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh = this.navParams.get('need_fresh')
    if (this.need_fresh == true) {
      this.get_dataList(this.selectType)
      this.get_moments_message()
      this.need_fresh = false
    }
  }

  click_All() {
    this.selectType = 'all'
    this.get_dataList(this.selectType)
  }

  click_MyPush() {
    this.selectType = 'my_push'
    this.get_dataList(this.selectType)
  }

  click_MyCollect() {
    this.selectType = 'my_collect'
    this.get_dataList(this.selectType)
  }

  to_detail(item) {
    this.navCtrl.push('MomentsDetailPage', {
      item: item,
      user_id: this.user_id
    });
  }

  cancel_shoucang(item) {
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'collect': false
    }
    this.momentsCircleService.collect_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        item.count_collect = item.count_collect - 1
        item.whether_collect = false
        // this.get_dataList(this.selectType)
      }
    })
  }

  update_shoucang(item) {
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'collect': true
    }
    this.momentsCircleService.collect_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        item.count_collect = item.count_collect + 1
        item.whether_collect = true
        // this.get_dataList(this.selectType)
      }
    })
  }

  cancel_zan(item) {
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'like': false
    }
    this.momentsCircleService.like_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        item.whether_like = false
        item.like_count = item.like_count - 1
        // this.get_dataList(this.selectType)
      }
    })
  }

  update_zan(item) {
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'like': true
    }
    this.momentsCircleService.like_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        item.whether_like = true
        item.like_count = item.like_count + 1
      }
    })
  }

  to_employee_detai(item) {
    this.employeeService.get_employee_info([item.employee_id], false).then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('EmployeeDetailPage', {
          item: res.result.res_data[0],
          origin_data: res.result.res_data[0],
          id: item.employee_id,
          user_id: item.id,
        })
      }
    })
  }

  delete_moments(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除此圈子',
      buttons: [
        {
          text: '确定',
          handler: () => {
            let body = {
              'user_id': this.user_id,
              'id': item.id
            }
            this.momentsCircleService.delete_moments_data(body).then(res => {
              if (res.result.res_code == 1) {
                Utils.toastButtom("删除成功", this.toastCtrl)
                this.get_dataList(this.selectType)
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

  search_moments() {
    this.navCtrl.push('SearchMomentsPage')
  }

  click_un_read_reply() {
    this.navCtrl.push('MomentsUnReadPage', {
      item: this.un_read_list,
      user_id: this.user_id
    })
  }

  createMoments() {
    this.navCtrl.push('CreateMomentsPage', {
      user_id: this.user_id
    })
  }

  to_link(items) {
    if (items.share_model == 'rt.meeting') {
      this.navCtrl.push('MeetingPage', {
        'meeting_id': items.share_id,
        'isEdit': false,
        'uid': this.user_id,
        'frontPage': 'MomengsCirclePage',
      })
    } else {
      let body = {
        'calendar_id': items.share_id,
        'user_id': this.user_id
      }
      this.navCtrl.push('CalendarDeatilpagePage', {
            'item_id': items.share_id,
            'isEdit': false,
            'frontPage': 'MomengsCirclePage',
          })
    }
  }

  doRefresh(refresh) {
    this.get_dataList(this.selectType);
    this.get_moments_message()
    refresh.complete();
  }

  to_slide_img(imgList, index) {
    // this.navCtrl.push('ImageSlidePage', {
    //   'imgList': imgList,
    //   'index': index
    // })
    let data = []
     for (let index = 0; index < imgList.length; index++) {
       data.push({
         url: imgList[index]
       })
     }
    let modal = this.modalController.create(GalleryModal, {
        photos: data,
        initialSlide: index
    });
    modal.present();
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }


  expandP(items){
    items.is_show_expand = !items.is_show_expand
  }
  
  reply_to(item) {
    let modal = this.modalController.create("ModalChatPage", {
      item: item,
      res_id: item.id,
      navCtrl: 'MomentsDetailPage',
      type: 'rt.colleagues.circle',
      has_parent: false,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.get_dataList(this.selectType)
        this.get_moments_message()
      }
    });
    modal.present();
  }
}
