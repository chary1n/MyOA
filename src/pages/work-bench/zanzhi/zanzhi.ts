import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { getType } from '@angular/core/src/errors';
import { ZanzhiAutoService } from './zanzhi-auto';

/**
 * Generated class for the ZanzhiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-zanzhi',
  templateUrl: 'zanzhi.html',
  providers:[CommonUseServices,ZanzhiAutoService]
})
export class ZanzhiPage {
  pet: string = "0"; 
  wait_approval_list: any;
  already_approval_list: any;
  isMoreData1 = true;
  isMoreData2 = true;
  applyList: any;
  leaveList;
  user;
  user_id;
  actionSheetCtrl;
  limit = 20;
  offset = 0;
  isMoreData = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServices :CommonUseServices ,
    public zanzhiAutoServices :ZanzhiAutoService,
    public storage :Storage) {
    this.storage.get('user')
    .then(res => {
      console.log(res);
      this.user_id = res.result.res_data.user_id;
      this.commonServices.get_zanzhi_list( this.user_id,this.limit, this.offset,"apply").then((res) => {
        console.log(res);
        if (res.result && res.result.res_code == 1) {
          this.applyList = res.result.res_data
        }
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZanzhiPage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.addData()
    }
  }

  addData(){
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.commonServices.get_zanzhi_list(this.user_id,20,0,this.getType()).then(res=>{
      if(res.result&&res.result.res_code==1){
        let list = res.result.res_data ;
        if(this.pet=="0"){
          this.applyList=list
        }else if(this.pet=='1'){
          this.wait_approval_list=list
        }else if(this.pet=='2'){
          this.already_approval_list=list
        } 
      }
    })
  }

  doRefresh(refresh){
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.commonServices.get_zanzhi_list(this.user_id,20,0,this.getType()).then(res=>{
      refresh.complete();
      if(res.result&&res.result.res_code==1){
        let list = res.result.res_data ;
        if(this.pet=="0"){
          this.applyList=list
        }else if(this.pet=='1'){
          this.wait_approval_list=list
        }else if(this.pet=='2'){
          this.already_approval_list=list
        } 
      }
    })
  }

  doInfinite(infinite){
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.commonServices.get_zanzhi_list(this.user_id,this.limit,this.offset,this.getType()).then(res=>{
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
            if(this.pet=="0"){
              this.applyList.push(item)
            }else if(this.pet=='1'){
              this.wait_approval_list.push(item)
            }else if(this.pet=='2'){
              this.already_approval_list.push(item)
            } 
          }
        }
        else {
          this.isMoreData = false;
        }
        infinite.complete();
      })
    } else {
      infinite.complete();
    }
  }

  clickState(){
    this.limit = 20 ;
    this.offset = 0 ;
    this.commonServices.get_zanzhi_list(this.user_id,20,0,this.getType()).then(res=>{
      if(res.result&&res.result.res_code==1){
        let list = res.result.res_data ;
        if(this.pet=="0"){
          this.applyList=list
        }else if(this.pet=='1'){
          this.wait_approval_list=list
        }else if(this.pet=='2'){
          this.already_approval_list=list
        } 
      }
    })
  }

  itemSelected(event) {
    let type;
    let search_text;
    let data ;
    if (event.id == 1) {
      data = 'employee_id'
      search_text = event.name.replace("搜 员工:", "")
    }
    else if (event.id == 2) {
      data = 'name'
      search_text = event.name.replace("搜 SN:", "")
    }
    this.commonServices.searchZanzhiList(this.user_id, this.getType(), data,search_text).then((res) => {
      if (res.result && res.result.res_code == 1) {
        let list = res.result.res_data ;
        if(this.pet=="0"){
          this.applyList=list
        }else if(this.pet=='1'){
          this.wait_approval_list=list
        }else if(this.pet=='2'){
          this.already_approval_list=list
        } 
      }
    })
  }


  getType(){
    let type ;
    if(this.pet=="0"){
      type="apply"
    }else if(this.pet=='1'){
      type="wait_apply"
    }else if(this.pet=='2'){
      type="applyed"
    } 
    return type
  }


  click_detail(item){
    this.navCtrl.push("ZanzhiDetailPage",{item:item,pet:this.pet})
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  changeState(state) {
    if (state == 'draft') {
      return '草稿'
    } else if (state == "confirm") {
      return '确认'
    } else if (state == "manager1_approve") {
      return '1级审核'
    } else if (state == "manager2_approve") {
      return '2级审核'
    } else if (state == "manager3_approve") {
      return 'General Manager Approved'
    } else if (state == "approve") {
      return '批准'
    } else if (state == "paid") {
      return '已支付'
    } else if (state == "cancel") {
      return '取消'
    } else {
      return state;
    }
  }


}
