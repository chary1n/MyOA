import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,ActionSheetController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';
import { NativeService } from './../../../../providers/NativeService';
declare let cordova: any; 
/**
 * Generated class for the GongdanNewChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-new-chat',
  templateUrl: 'gongdan-new-chat.html',
  providers:[GongDanService]
})
export class GongdanNewChatPage {
  imgList = []
  pushImgList = []
  beizhuText = ""
  item
  record_item
  parent_id
  frontPage
  select_name
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
    public nativeService: NativeService,public gongDanService:GongDanService,
    public toast:ToastController) {
      this.item = this.navParams.get('item')  
    this.record_item = this.navParams.get('record_item')
    this.parent_id = this.navParams.get('parent_id')
    this.frontPage = Utils.getViewController("GongdanDetailPage", navCtrl)
    this.select_name = this.navParams.get('select_name')
    if (this.select_name){
      this.beizhuText = "@" + this.select_name.name + " "
    }
    
    window.addEventListener("native.keyboardshow", this.keyboardShowHandler);
    window.addEventListener('native.keyboardhide', this.keyboardHideHandler);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanNewChatPage');
    let elementContent = document.getElementById("main_class");
    elementContent.style.height = elementContent.clientHeight + "px"
  }

  ionViewWillEnter() {
    if (this.navParams.get('beizhuText'))
    {
      this.beizhuText = this.navParams.get('beizhuText')
      console.log(this.beizhuText)
    }
    
    
    if (this.navParams.get('select_name')){
      this.select_name = this.navParams.get('select_name')
      
    }
  }

  keyboardShowHandler(e){
        // alert('Keyboard height is: ' + e.keyboardHeight);
        
       let elementContent = document.getElementById("chat_top_div");
       elementContent.style.visibility = "visible"
       elementContent.style.marginBottom = e.keyboardHeight + 'px'
       
      //  elementContent.style.marginBottom = e.keyboardHeight + 'px'
       
    }

    keyboardHideHandler(e){
      let elementContent = document.getElementById("chat_top_div");
      elementContent.style.visibility = "hidden"
      // elementContent.style.marginBottom = 0;
    }

    addImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.getPicture(1);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            console.log('Archive clicked');
            this.getPicture(0);
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

    addUser(){
      this.navCtrl.push('GongdanChoosePeoplePage',{
        item:this.item,
        beizhuText:this.beizhuText,
        select_name:this.select_name,
      })
    }

  getPicture(type) {
    let options = {
      // targetWidth: 256,
      // targetHeight: 256
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

  private getPictureSuccess(img_url) {
    this.imgList.push(img_url)
    this.pushImgList.push(img_url.split(",")[1])
    // this.isChange = true;
    // this.user_heard = img_url;
    // this.editInformationService.pushHeardImage(img_url.split(",")[1])
    //   .then(res => {
    //     if (res.result && res.result.res_code == 1) {
    //       this.storage.get('user').then(userBean => {
    //         userBean.result.res_data.user_ava = res.result.res_data.user_ava
    //         this.storage.set('user', userBean)
    //       })
    //     }
    //   })
  }

  release(){
    // alert(this.select_name.name)
    if (this.select_name)
    {
      let name_str = "@"+this.select_name.name + " "
      this.beizhuText = this.beizhuText.replace(name_str,"")
       this.gongDanService.work_order_add_record(this.beizhuText,this.select_name.id,"reply",this.item.work_order_id,this.parent_id,this.pushImgList).then(res => {
  
      if (res.result.res_code == 1)
      {
        Utils.toastButtom("回复成功", this.toast)
        this.frontPage.data.need_fresh = true;
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }
  else
  {
    Utils.toastButtom("请选择回复对象", this.toast)
  }
}


}
