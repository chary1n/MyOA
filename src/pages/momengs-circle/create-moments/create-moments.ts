import { MomentsCircleService } from './../momentsCircleService';
import { Utils } from './../../../providers/Utils';
import { NativeService } from './../../../providers/NativeService';
import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the CreateMomentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-moments',
  templateUrl: 'create-moments.html',
  providers: [ NativeService, MomentsCircleService],
})
export class CreateMomentsPage {
  @ViewChild('mytextarea') mytextarea;

  user_id: any
  imgList = [];
  isDeletePicture = false
  deletePicture

  contentText;
  selectList=[]
  is_public = true
  need_fresh = false
  frontPage
  selectPartner=""
  is_share = false
  share_id
  share_title
  share_from
  share_model
  constructor(public navCtrl: NavController, public navParams: NavParams,public toast: ToastController,
              public actionSheetCtrl: ActionSheetController,public nativeService: NativeService
            , public statusBar: StatusBar, public momentsCircleService: MomentsCircleService) {
              this.frontPage = Utils.getViewController("MomengsCirclePage", navCtrl)
     this.user_id = this.navParams.get('user_id')
     this.is_share = this.navParams.get('is_share')
     if(this.is_share){
      this.share_id = this.navParams.get('share_id')
      this.share_title = this.navParams.get('share_title')
      this.share_from = this.navParams.get('share_from')
      this.share_model = this.navParams.get('share_model')
     }
     //默认加一张显示➕的图片
     this.imgList.push("assets/img/smalladd.png")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMomentsPage');
  }

  clickPicture(item, index){
    if(item=="assets/img/smalladd.png"){
      this.addImg()
    }else{
      this.deletePicture = item
      this.navCtrl.push("DeleteChatPicturePage", { item: item })
    }
  }


  cancel(){
    this.navCtrl.pop()
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.mytextarea.setFocus();//输入框获取焦点
    })
    this.isDeletePicture = this.navParams.get('isDeletePicture')
    if (this.isDeletePicture) {
      this.navParams.data.isDeletePicture = false;
      this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1)
    }
    this.need_fresh = this.navParams.get('need_fresh')
    if(this.need_fresh){
      this.is_public = this.navParams.get('is_public')
      if(!this.is_public){
          this.selectList = this.navParams.get('selectList')
          this.selectPartner = ''
          for (let index = 0; index < this.selectList.length; index++) {
            this.selectPartner = this.selectPartner+this.selectList[index].partner_name+','
          }
      }
    }

    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  finish(){
    if(!this.is_share){
      if(!this.contentText){
        Utils.toastButtom('请输入内容', this.toast)
        return
      }
    }
    var visible_group
    if (this.is_public) {
      visible_group = "0"
    }else{
      visible_group = "1"
    }
    var data=[]
    if(this.selectList.length>0){
      for (let index = 0; index < this.selectList.length; index++) {
        data.push(this.selectList[index].partner_id)
      }
    }
    let body;
    if(this.imgList.length==1){
      this.imgList = []
    }else{
      if(this.imgList.length>0){
        var index_this = -1
        for (let index = 0; index < this.imgList.length; index++) {
          if(this.imgList[index]=='assets/img/smalladd.png'){
              index_this = index
          }
        }
        if(index_this!=-1){
          this.imgList.splice(index_this, 1);
        }
      }
    }
    if(this.is_share){
      body = {
        'user_id': this.user_id,
        'imgList': this.imgList,
        'content': this.contentText,
        'visible_employee_ids': data,
        'visible_group':  visible_group,
        'share_model': this.share_model,
        'share_id': this.share_id,
        'is_share': true,
        'share_source': this.share_from,
        'share_title': this.share_title
      }
    }else{
      body = {
        'user_id': this.user_id,
        'imgList': this.imgList,
        'content': this.contentText,
        'visible_employee_ids': data,
        'visible_group':  visible_group,
        'is_share': false
      }
    }
    this.momentsCircleService.create_new_moments(body).then(res => {
      if (res) {
        if (res.result.res_code == 1) {
          if(this.is_share){
            Utils.toastButtom('分享成功', this.toast) 
          }else{
            Utils.toastButtom('新建成功', this.toast) 
            this.frontPage.data.need_fresh = true;
          }
          this.navCtrl.pop()
        }
      }
    })
  }

  addImg(allowEdit: boolean = true) {
    // if(this.imgList.length>9){
    //   Utils.toastButtom('最多可以选择9张图片', this.toast)
    //   return
    // }
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

  selectVisible(){
    this.navCtrl.push('SelectVisiblePage',{
      user_id: this.user_id,
      selectList: this.selectList,
      is_public: this.is_public
    })
  }
}
