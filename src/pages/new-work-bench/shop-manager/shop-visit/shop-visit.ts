import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController,ModalController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { ShopService } from './../shopService'
import { NativeService } from './../../../../providers/NativeService';
/**
 * Generated class for the ShopVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-visit',
  templateUrl: 'shop-visit.html',
  providers: [NativeService, ShopService]
})
export class ShopVisitPage {
  @ViewChild('mytextarea') mytextarea;
  visit_date
  visit_to
  visit_shop_id
  visitText
  user_id

  imgList = []
  deletePicture
  isDeletePicture

  belong_partner
  belong_partner_id

  can_show_footer=true

  frontPage

  contact_list = []
  contact_id

  choose_partner

  choose_index
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
  public nativeService: NativeService, public shopService: ShopService, public toastCtrl: ToastController) {
    // var now_date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 )
    
    this.user_id = this.navParams.get('user_id')
    this.frontPage = Utils.getViewController('A', this.navCtrl)

    if (this.navParams.get('partner_id')){
      this.belong_partner = this.navParams.get('partner_name')
      this.belong_partner_id = this.navParams.get('partner_id')
    }

    if (this.navParams.get('shop_id')){
      this.visit_shop_id = this.navParams.get('shop_id')
      this.visit_to = this.navParams.get('shop_name')
      this.shopService.get_total_contacts({'shop_id': this.visit_shop_id}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data){
          this.contact_list = res.result.res_data
          for (let item of this.contact_list) {
            item['is_origin'] = true
          }
        }
      })
    }
    var date = new Date()
    console.log(date.getFullYear())
    this.visit_date = date.getFullYear() + "-" + this.fetch_month((date.getMonth() + 1)) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":00.000" + "Z"

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopVisitPage');
    var date = new Date()
    this.visit_date = date.getFullYear() + "-" + this.fetch_month((date.getMonth() + 1)) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":00.000" + "Z"
  }

  fetch_month(num){
    if (num >= 10){
      return num
    }
    else{
      return "0" + num
    }
  }

  ionViewWillEnter() {
    this.isDeletePicture = this.navParams.get('isDeletePicture')
    if (this.isDeletePicture) {
      this.navParams.data.isDeletePicture = false;

      this.imgList.splice(this.imgList.indexOf(this.deletePicture), 1)

    }
     if (this.navParams.get('need_update_shop') == true) {
      this.visit_shop_id = this.navParams.data.visit_shop_id
      this.visit_to = this.navParams.data.visit_shop_name
      this.belong_partner = this.navParams.data.partner_name
      this.belong_partner_id = this.navParams.data.partner_id
      this.navParams.data.need_update_shop = false;
      this.contact_list = []
      this.shopService.get_total_contacts({'shop_id': this.visit_shop_id}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data){
          this.contact_list = res.result.res_data
        }
      })
    }

    if (this.navParams.get('need_update') == true) {
      if (this.belong_partner_id != this.navParams.data.partner_id){
        this.visit_shop_id = ''
        this.visit_to = ''
        this.contact_list = []
        this.contact_id = ''
      }
      this.belong_partner_id = this.navParams.data.partner_id
      this.belong_partner = this.navParams.data.partner_name
      this.navParams.data.need_update = false;
    }
    if (this.navParams.get('need_update_choose_main_contact') == true) {
      this.contact_list = this.navParams.get('main_contact_list')
      this.choose_partner = this.navParams.get('choosed_contact').name 
      this.choose_index = this.navParams.get('choose_index')
      if (this.navParams.get('choosed_contact').get('value')) {
        this.contact_id = this.navParams.get('choosed_contact').get('value')
      }
      this.navParams.data.need_update_choose_main_contact = false
    }
  
  }

  goBack(){
    this.can_show_footer = false
    this.navCtrl.pop()
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
      quality: 100,
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

  choose_shop(){
    this.navCtrl.push('SelectShopListPage',{
      partner_top_id: this.belong_partner_id,
    })
  }

  submit(){
    if (!this.visit_shop_id){
      Utils.toastButtom('请选择门店', this.toastCtrl)
      return
    }
    if (!this.visitText){
      Utils.toastButtom('请填写记录', this.toastCtrl)
      return
    }
    let body = {
      'user_id' :this.user_id,
      'text': this.visitText,
      'shop_id': this.visit_shop_id,
      'visit_date': this.cal_time(this.visit_date),
      'imgList': this.imgList,
      'contacts_partner_id': this.contact_id,
      'contact_list': this.contact_list,
      'choose_index': this.choose_index,
    }
    this.shopService.submit_visit_record(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('提交成功', this.toastCtrl)
        this.frontPage.data.need_refresh_view = true
        this.navCtrl.popTo(this.frontPage)
      }
    })
  }

  click_near_shop(){
    this.navCtrl.push('SearchGpsPage', {
      is_need_back: true,
      user_id: this.user_id,
    })
  }

  choose_shop_partner(){
    this.navCtrl.push('SelectPartnerPage')
  }

  cal_time(time){
    return time.replace('T',' ').replace('Z','')
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

  setFocus(mytextarea){
    mytextarea.setFocus()
  }

  choose_main_contact() {
    this.navCtrl.push('MainContactListPage', {
      contact_arr: this.contact_list
    })
  }

}
