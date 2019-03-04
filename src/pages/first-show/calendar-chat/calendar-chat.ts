import { HttpService } from './../../../providers/HttpService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Storage } from '@ionic/storage';
import { NativeService } from './../../../providers/NativeService';
declare let cordova: any;


/**
 * Generated class for the CalendarChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calendar-chat',
  templateUrl: 'calendar-chat.html',
  providers: [FirstShowService, NativeService],
})
export class CalendarChatPage {
  @ViewChild('mytextarea') mytextarea;
  item;
  beizhuText;
  uid;
  res_id;
  frontPage;
  type;
  imgList = [];
  isDeletePicture = false
  deletePicture
  has_parent = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public showService: FirstShowService, public toast: ToastController,
    public storage: Storage, public actionSheetCtrl: ActionSheetController, public nativeService: NativeService) {
    this.frontPage = Utils.getViewController(this.navParams.get('navCtrl'), navCtrl)
    this.item = this.navParams.get('item')
    this.res_id = this.navParams.get('res_id')
    this.type = this.navParams.get('type')
    this.has_parent = this.navParams.get('has_parent')
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarChatPage');
  }

  ionViewWillEnter() {
    this.isDeletePicture = this.navParams.get('isDeletePicture')
    if (this.isDeletePicture) {
      this.navParams.data.isDeletePicture = false;

      this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1)

    }
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.mytextarea.setFocus();//输入框获取焦点
    })
  }

  release() {
    if (this.beizhuText.length == 0 || this.beizhuText.match(/^\s+$/g)) {
      Utils.toastButtom("回复不可为空", this.toast)
    }
    else {
      let body = {
        'uid': this.uid,
        'res_id': this.res_id,
        'context': this.beizhuText,
        'parent_id': this.item.msg_id,
        'type': this.type,
        'imgList': this.imgList,
      }
      if (!this.has_parent) {
        body = {
          'uid': this.uid,
          'res_id': this.res_id,
          'context': this.beizhuText,
          'parent_id': false,
          'type': this.type,
          'imgList': this.imgList,
        }
      }
      this.showService.reply_to(body).then(res => {
        if (res.result.res_code == 1) {
          this.beizhuText = ''
          Utils.toastButtom("回复成功", this.toast)
          this.frontPage.data.need_fresh = true;
          this.navCtrl.popTo(this.frontPage);
        }
      })
    }
  }

  clickPicture(item) {
    this.deletePicture = item
    this.navCtrl.push("DeleteChatPicturePage", { item: item })
  }

  addImg(allowEdit: boolean = true) {
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
    let options = {
      allowEdit: false,
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }

  getPictureSuccess(img_url) {
    this.imgList.push(img_url)
  }

  goBack(){
    this.navCtrl.pop()
  }
  

}
