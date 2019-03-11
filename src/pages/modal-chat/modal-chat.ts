import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NativeService } from './../../providers/NativeService';
import { ModalChatService } from './modal-chat-service';
import { Utils } from './../../providers/Utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ModalChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-chat',
  templateUrl: 'modal-chat.html',
  providers: [NativeService,ModalChatService]
})
export class ModalChatPage {
  @ViewChild('myContent') myContent;
  imgList = []
  beizhuText = ''
  uid;
  res_id;
  type;
  has_parent = false;
  item;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  public nativeService: NativeService, public actionSheetCtrl: ActionSheetController,public modalChatService:ModalChatService,
  public toast: ToastController,public storage: Storage) {
    this.item = this.navParams.get('item')
    this.res_id = this.navParams.get('res_id')
    this.type = this.navParams.get('type')
    this.has_parent = this.navParams.get('has_parent')
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
    })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalChatPage');
  
  }

  ionViewDidEnter() {
      setTimeout(() => {
      this.myContent.setFocus();//输入框获取焦点
    },1)
  }

  click_dissmiss(){
    this.viewCtrl.dismiss()
  }

  click_add(allowEdit: boolean = true){
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
    this.imgList.unshift(img_url)
    if(this.imgList.length==10){
        this.imgList.pop()
    }
  }

  delete_img(i){
    this.imgList.splice(i,1)
  }

  onChangeText(){
    console.log(this.beizhuText)
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
      this.modalChatService.reply_to(body).then(res => {
        if (res.result.res_code == 1) {
          this.beizhuText = ''
          this.viewCtrl.dismiss({'need_fresh': true})
          Utils.toastButtom("回复成功", this.toast)
        }
      })
    }
  }

}
