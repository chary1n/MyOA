import { MomentsCircleService } from './../momentsCircleService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FirstShowService } from '../../first-show/first_service';
import { GalleryModal } from 'ionic-gallery-modal';

/**
 * Generated class for the MomentsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-moments-detail',
  templateUrl: 'moments-detail.html',
  providers: [MomentsCircleService]
})
export class MomentsDetailPage {
  item: any
  need_fresh = false
  user_id: any;
  frontPage
  id: any
  is_author = false
  attachments = []
  comment_count = 0
  whether_like = false
  whether_collect = false
  whether_share = false
  count_collect = 0
  like_count = 0
  comments = []
  header_img: any
  creater: any
  content: any
  create_date: any
  visible_employee_ids=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public statusBar: StatusBar, public momentsCircleService: MomentsCircleService,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public firService: FirstShowService,
    public modalController: ModalController) {
    this.item = this.navParams.get('item');
    this.id = this.navParams.get('id');
    this.user_id = this.navParams.get('user_id');
    this.frontPage = Utils.getViewController("MomengsCirclePage", navCtrl)
    if (this.id) {
      this.get_data()
    } else {
      this.set_value()
      this.id = this.item.id
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MomentsDetailPage');
  }

  //赋值
  set_value() {
    this.is_author = this.item.is_author
    this.attachments = this.item.attachments
    this.comment_count = this.item.comment_count
    this.whether_like = this.item.whether_like
    this.whether_collect = this.item.whether_collect
    this.count_collect = this.item.count_collect
    this.like_count = this.item.like_count
    this.comments = this.item.comments
    this.header_img = this.item.header_img
    this.creater = this.item.creater
    this.content = this.item.content
    this.create_date = this.item.create_date
    this.whether_share = this.item.whether_share
    this.visible_employee_ids = this.item.visible_employee_ids
    var data_arr = []
    for (let i = 0; i < this.item.comments.length; i++) {
      var item_one = this.item.comments[i]
      data_arr.push(item_one.msg_id)
    }
    this.momentsCircleService.read_total_reply({ 'list': data_arr, 'uid': this.user_id }).then(res => {
      // if (res.result.res_code == 1) {

      // }
    })
  }

  goBack() {
    this.frontPage.data.need_fresh = this.need_fresh;
    this.navCtrl.popTo(this.frontPage);
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh = this.navParams.get('need_fresh')
    if (this.need_fresh == true) {
      this.get_data()
    }
  }

  get_data() {
    let body = {
      'user_id': this.user_id,
      'id': this.id
    }
    this.momentsCircleService.get_moments_data_by_id(body).then(res => {
      if (res) {
        if (res.result.res_code == 1) {
          this.item = res.result.res_data
          this.set_value()
        }
      }
    })
  }


  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }

  only_reply(item) {
    //   this.navCtrl.push('CalendarChatPage', {
    //     item: item,
    //     res_id: this.item.id,
    //     navCtrl: 'MomentsDetailPage',
    //     type: 'rt.colleagues.circle',
    //     has_parent: false,
    // })

    let modal = this.modalController.create("ModalChatPage", {
      item: item,
      res_id: this.item.id,
      navCtrl: 'MomentsDetailPage',
      type: 'rt.colleagues.circle',
      has_parent: false,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.get_data()
        this.need_fresh = true
      }
    });
    modal.present();
  }

  only_reply_to(items) {
    // this.navCtrl.push('CalendarChatPage', {
    //   item: items,
    //   res_id: this.item.id,
    //   navCtrl: 'MomentsDetailPage',
    //   type: 'rt.colleagues.circle',
    //   has_parent: true,
    // })

    let modal = this.modalController.create("ModalChatPage", {
      item: items,
      res_id: this.item.id,
      navCtrl: 'MomentsDetailPage',
      type: 'rt.colleagues.circle',
      has_parent: true,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.get_data()
        this.need_fresh = true
      }
    });
    modal.present();
  }

  send() {
    // this.navCtrl.push('CalendarChatPage', {
    //   item: this.item,
    //   res_id: this.item.id,
    //   navCtrl: 'MomentsDetailPage',
    //   type: 'rt.colleagues.circle',
    //   has_parent: false,
    // })
    let modal = this.modalController.create("ModalChatPage", {
      item: this.item,
      res_id: this.item.id,
      navCtrl: 'MomentsDetailPage',
      type: 'rt.colleagues.circle',
      has_parent: false,
    })
    let that = this
    modal.onDidDismiss(data => {
      if (data.need_fresh) {
        this.get_data()
        this.need_fresh = true
      }
    });
    modal.present();
  }

  cancel_shoucang() {
    let body = {
      'user_id': this.user_id,
      'id': this.item.id,
      'collect': false
    }
    this.momentsCircleService.collect_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        this.count_collect = this.count_collect - 1
        this.whether_collect = false
        this.need_fresh = true
      }
    })
  }

  update_shoucang() {
    let body = {
      'user_id': this.user_id,
      'id': this.item.id,
      'collect': true
    }
    this.momentsCircleService.collect_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        this.count_collect = this.count_collect + 1
        this.whether_collect = true
        this.need_fresh = true
      }
    })
  }

  cancel_zan() {
    let body = {
      'user_id': this.user_id,
      'id': this.item.id,
      'like': false
    }
    this.momentsCircleService.like_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        this.whether_like = false
        this.like_count = this.like_count - 1
        this.need_fresh = true
      }
    })
  }

  update_zan() {
    let body = {
      'user_id': this.user_id,
      'id': this.item.id,
      'like': true
    }
    this.momentsCircleService.like_moments_data(body).then(res => {
      if (res.result.res_code == 1) {
        this.whether_like = true
        this.like_count = this.like_count + 1
        this.need_fresh = true
      }
    })
  }

  delete_reply(items) {
    if (items.create_uid_id == this.user_id) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '是否删除此回复',
        buttons: [
          {
            text: '确定',
            handler: () => {
              this.momentsCircleService.delete_reply({ 'uid': this.user_id, 'reply_id': items.msg_id }).then(res => {
                if (res.result.res_code == 1) {
                  Utils.toastButtom("删除成功", this.toastCtrl)
                  this.need_fresh = true
                  this.get_data()
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

  to_link() {
    if (this.item.share_model == 'rt.meeting') {
      this.navCtrl.push('MeetingPage', {
        'meeting_id': this.item.share_id,
        'isEdit': false,
        'uid': this.user_id,
        'frontPage': 'MomengsCirclePage',
      })
    } else if (this.item.share_model == 'rt.red.white.card'){
      this.navCtrl.push('RedWhiteCardDetailPage', {
        'card_id': this.item.share_id,
        'user_id': this.user_id
      })
    }  else {
      let body = {
        'calendar_id': this.item.share_id,
        'user_id': this.user_id
      }
      this.momentsCircleService.get_calendar_by_id(body).then(res => {
        if (res.result.res_code == 1 && res.result.res_data) {
          this.navCtrl.push('CalendarDeatilpagePage', {
            'item': res.result.res_data,
            'isEdit': false,
            'frontPage': 'MomengsCirclePage',
          })
        }
      })
    }
  }


  cancel_zan_small(items) {
    let body = {
      'uid': this.user_id,
      'type': 'delete',
      'msg_id': items.msg_id,
    }
    this.firService.update_zan(body).then(res => {
      if (res.result.res_code == 1) {
        items.is_me_zan = false
        items.zan_count = items.zan_count - 1
      }
    })
  }

  update_zan_small(items) {
    let body = {
      'uid': this.user_id,
      'type': 'add',
      'msg_id': items.msg_id,
    }
    this.firService.update_zan(body).then(res => {
      if (res.result.res_code == 1) {
        items.is_me_zan = true
        items.zan_count = items.zan_count + 1
      }
    })
  }

  to_slide_img(imgList, index) {
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

}