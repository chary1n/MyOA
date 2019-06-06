import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController,ModalController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { ShopService } from './../shopService'
import { GalleryModal } from 'ionic-gallery-modal';
import { DomSanitizer } from '@angular/platform-browser';
import { VisitAutoService} from './visitAutoService'
/**
 * Generated class for the TotalVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-total-visit',
  templateUrl: 'total-visit.html',
  providers: [ShopService, VisitAutoService],
})
export class TotalVisitPage {
  limit=20
  offset=0
  isMoreData=true
  visit_message_arr = []
  can_show_footer=true
  user_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService,
  public modalController: ModalController, public sanitizer:DomSanitizer, public visitAutoService: VisitAutoService) {
    this.user_id = this.navParams.get('user_id')
    this.reload_data()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TotalVisitPage');
  }

  reload_data(){
    this.limit = 20
    this.offset = 0
    this.shopService.get_total_shop_visit({'limit': this.limit, 'offset': this.offset}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.visit_message_arr = res.result.res_data
      }
    })
  }

  goBack(){
    this.can_show_footer=false
    this.navCtrl.pop()
  }

  doRefresh(refresh) {
    this.reload_data()
    refresh.complete();
  }

  doInfinite(infiniteScroll) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.shopService.get_total_shop_visit({'limit': this.limit, 'offset': this.offset}).then((res) => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data;
          if (item_data.length == 20) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            this.visit_message_arr.push(item);
          }
        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    } else {
      infiniteScroll.complete();
    }
  }

  to_link(items){
    this.navCtrl.push('ShopDetailPage', {
      item: {'shop_id': items.shop_id}
    })
  }

  cal_img(img){
    return this.sanitizer.bypassSecurityTrustResourceUrl(img)
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

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 门店：", "")
    }
    else if (event.id == 2) {
      type = "rt_partner_top_id";
      search_text = event.name.replace("搜 客户：", "")
    }
    else if (event.id == 3) {
      type = "create_uid";
      search_text = event.name.replace("搜 创建人：", "")
    }
    else if (event.id == 4) {
      type = "detailed_address";
      search_text = event.name.replace("搜 地址：", "")
    }
    let body = {
      'type': type,
      'search_text': search_text,
    }
    this.visit_message_arr = []
    this.shopService.search_visit_by_domain(body).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.visit_message_arr = res.result.res_data
      }
    })
  }

  itemClearSelected(event){
    this.reload_data()
  }

  click_create_shop_visit(){
    this.navCtrl.push('ShopVisitPage',{
      user_id: this.user_id,
    })
  }

  assembleHTML(str) {
    return this.sanitizer.bypassSecurityTrustHtml(str)
  }

  click_team(){
    this.navCtrl.push('ShopTreePage',{
      'user_id': this.user_id,
    })
  }

  changeDate(date) {
    if (date) {
      let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
      return new_date;
    }
  }
}
