import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ShenGouService} from './shengouService'
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ShengoupagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shengoupage',
  templateUrl: 'shengoupage.html',
  providers:[ShenGouService],
})
export class ShengoupagePage {
  pet: string = "1";
  items:any;
  user_id:any;
  myApplyList:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public shengouService:ShenGouService
            ,public storage:Storage) {
    this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
      this.shengouService.getshengouList(10,0,this.user_id).then((res) =>{
        console.log(res.result.res_data)
        if (res.result.res_data)
        {
          this.myApplyList = res.result.res_data;
        } 
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShengoupagePage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      // console.log(111);
      this.reloadData();
      this.navParams.data.need_fresh = false;
    }
  }

  clickMyApply(){
    this.reloadData();
  }

  clickWaitMeApply(){
    this.reloadData();
  }

  clickAlreadyApply(){
    this.reloadData();
  }

  changeState(item){
    if (item == "draft"){
      return "草稿";
    }
    else if (item == "submit"){
      return "提交";
    }
    else if (item == "manager1_approve"){
      return "一级审核";
    }
    else if (item == "manager2_approve"){
      return "二级审核";
    }
    else if (item == "cancel"){
      return "取消";
    }
    else if (item == "approve"){
      return "批准";
    }
    else if (item == "done"){
      return "完成";
    }
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  shengou_detail(item){
    this.navCtrl.push('MyshengoudetailPage',{
      item:item,
    })
  }

  reloadData(){
    if (this.pet == "1")
    {
      this.shengouService.getshengouList(10,0,this.user_id).then((res) =>{
        console.log(res.result.res_data)
        if (res.result.res_data)
        {
          this.myApplyList = res.result.res_data;
        } 
      })
    }
  }

  createApply(){
    this.navCtrl.push('CreateShengouPage',{
      // item:this.item,
    });
  }
}
