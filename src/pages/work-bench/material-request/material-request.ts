import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Segment } from "ionic-angular";
import { materialService} from "./materialService";
import { Storage } from '@ionic/storage';
import { MaterialAutoService} from './material-auto'
/**
 * Generated class for the MaterialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-material-request',
  templateUrl: 'material-request.html',
  providers:[materialService,MaterialAutoService],
})
export class MaterialRequestPage {
  user_id;
  limit;
  offset;
  materialList;
  pet;
  isMoreData;
  waitMeList;
  alreadyList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mService:materialService,
  public storage:Storage,public materialAutoService:MaterialAutoService) {
    this.pet = "1"
      this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.limit = 20;
        this.offset = 0;
        this.mService.get_material_request_list(this.limit,this.offset,this.user_id).then(res => {
          console.log(res)
          if (res.result && res.result.res_code == 1) {
            this.materialList = res.result.res_data;
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialRequestPage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      this.doRefresh(null);
      this.navParams.data.need_fresh = false;
    }
  }

  itemSelected(event){
    // event.name
  }

  changeType(state){
    if (state.toLowerCase() == "pick_type"){
      return "产线领用"
    }
    else if (state.toLowerCase() == "proofing"){
      return "工程领用"
    }
    else
    {
      return state
    }
  }

  clickMyApply(){
    this.doRefresh(null)
  }

  clickWaitMeApply(){
    this.doRefresh(null)
  }

  clickAlreadyApply(){
    this.doRefresh(null)
  }

  doRefresh(refresh){
    this.limit = 20;
    this.offset = 0;
    if (this.pet == 1){        
        this.mService.get_material_request_list(this.limit,this.offset,this.user_id).then(res => {
          if(refresh)
          {
            refresh.complete();
          }
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.materialList = res.result.res_data;
          }
          else
          {
            this.materialList = [];
          }
        })
    }
    else if (this.pet == "2")
    {
        this.mService.get_wait_me_material_request_list(this.limit,this.offset,this.user_id).then(res => {
          if(refresh)
          {
            refresh.complete();
          }
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.waitMeList = res.result.res_data;
          }
          else
          {
            this.waitMeList = [];
          }
        })
    }
    else if (this.pet == "3")
    {
      this.mService.get_already_material_request_list(this.limit,this.offset,this.user_id).then(res =>{
        // console.log(res)
        if(refresh)
          {
            refresh.complete();
          }
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.alreadyList = res.result.res_data;
          }
          else
          {
            this.alreadyList = [];
          }
      })
    }
  }

  doInfinite(infinite){
    this.limit = 20;
    this.offset = this.offset + 20;
    if (this.pet == 1){
      if (this.isMoreData == true) {        
        this.mService.get_material_request_list(this.limit,this.offset,this.user_id).then(res => {
          let item_data = [];
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
             item_data = res.result.res_data;
             if (item_data.length == 20) {
                this.isMoreData = true;
             }
             else {
               this.isMoreData = false;
             }
             for (let item of item_data) {
               this.materialList.push(item)
             }
          }
          else {
          this.isMoreData = false;
        }
        infinite.complete();
        })
      }
      else
      {
        infinite.complete();
      }
    }
  }

  changeState(state){
    if (state.toLowerCase() == "canceled")
    {
      return "已取消";
    }
    else if (state.toLowerCase() == "to_submit")
    {
      return "待提交";
    }
    else if (state.toLowerCase() == "submitted")
    {
      return "已提交";
    }
    else if (state.toLowerCase() == "to_approved")
    {
      return "待审批";
    }
    else if (state.toLowerCase() == "review_ing")
    {
      return "审核中";
    }
    else if (state.toLowerCase() == "approved_finish")
    {
      return "等待领料";
    }
    else if (state.toLowerCase() == "finish_pick")
    {
      return "完成";
    }
    else if (state.toLowerCase() == "refused")
    {
      return "已拒绝";
    }
  }

  changeStateWithName(item){
    if (item.who_review_now.name)
    {
      return this.changeState(item.picking_state) + '/' +item.who_review_now.name
    } 
    else
    {
      return this.changeState(item.picking_state)
    }
  }

  clickItem(item){
    this.navCtrl.push('MaterialRequestDetailPage',{
      item:item,
    })
  }

  clickEdit(item){
    this.navCtrl.push('EditMaterialRequestPage',{
      item:item,
    })
  }

}
