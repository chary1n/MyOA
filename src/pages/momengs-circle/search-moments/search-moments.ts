import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { EmployeeService } from './../../add-employee/EmployeeService';
import { MomentsCircleService } from './../momentsCircleService';
import { SearchMomentsAutoService } from './searchAutoService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utils } from '../../../providers/Utils';
import { GalleryModal } from 'ionic-gallery-modal';


/**
 * Generated class for the SearchMomentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-moments',
  templateUrl: 'search-moments.html',
  providers: [SearchMomentsAutoService, MomentsCircleService, EmployeeService]
})
export class SearchMomentsPage {

  dataList = []
  user_id: any
  type: any
  search_text: any
  is_search = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public searchMomentsAutoService: SearchMomentsAutoService,
      public momentsCircleService: MomentsCircleService, public storage: Storage, public employeeService: EmployeeService,
      public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchMomentsPage');
  }

  search_data(){
    this.storage.get('user')
    .then(res => {
      console.log(res)
      this.user_id = res.result.res_data.user_id
      let body={
        'search_text': this.search_text,
        'type': this.type,
        'user_id': this.user_id
      }
      this.momentsCircleService.search_moments_data(body).then((res) => {
        if (res) {
          if (res.result.res_code == 1) {
            this.dataList = res.result.res_data
            this.is_search = false
          }
        }
      })
    });
  }

  itemSelected(event) {
    this.is_search = true
    if (event.id == 1) {
      this.type = "name";
      this.search_text = event.name.replace("搜 内容：", "")
    }
    else if (event.id == 2) {
      this.type = "creater";
      this.search_text = event.name.replace("搜 创建人：", "")
    }
    
    this.search_data()
  }

  clickback(){
    this.navCtrl.pop()
  }

  to_detail(item){
    if(this.is_search){
      return
    }
    this.navCtrl.push('MomentsDetailPage', {
      item: item,
      user_id: this.user_id
    });
  }

  cancel_shoucang(item){
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'collect': false
    }
    this.momentsCircleService.collect_moments_data(body).then(res =>{
      if (res.result.res_code == 1) {      
        item.count_collect = item.count_collect-1
        item.whether_collect = false
    }
    })
  }

  update_shoucang(item){
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'collect': true
    }
    this.momentsCircleService.collect_moments_data(body).then(res =>{
      if (res.result.res_code == 1) {
        item.count_collect = item.count_collect+1
        item.whether_collect = true
    }
    })
  }

  cancel_zan(item){
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'like': false
    }
    this.momentsCircleService.like_moments_data(body).then(res =>{
      if (res.result.res_code == 1) {
        item.whether_like = false
        item.like_count = item.like_count-1
    }
    })
  }

  update_zan(item){
    let body = {
      'user_id': this.user_id,
      'id': item.id,
      'like': true
    }
    this.momentsCircleService.like_moments_data(body).then(res =>{
      if (res.result.res_code == 1) {
        item.whether_like = true
        item.like_count = item.like_count+1
    }
    })
  }

  to_employee_detai(item){
     
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

  delete_moments(item){
    let actionSheet = this.actionSheetCtrl.create({
      title: '是否删除此回复',
      buttons: [
          {
              text: '确定',
              handler: () => {
                let body = {
                  'user_id': this.user_id,
                  'id': item.id
                }
                this.momentsCircleService.delete_moments_data(body).then(res =>{
                  if (res.result.res_code == 1) {
                    Utils.toastButtom("删除成功", this.toastCtrl)
                    this.search_data()
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

  to_slide_img(imgList, index){
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
}
