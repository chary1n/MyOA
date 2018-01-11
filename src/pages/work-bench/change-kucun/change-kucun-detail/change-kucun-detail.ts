import { ChangeKucunPage } from './../change-kucun';
import { ChangeKucunService } from './../changeKucunService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { group } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the ChangeKucunDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-kucun-detail',
  templateUrl: 'change-kucun-detail.html',
  providers: [ChangeKucunService],
})
export class ChangeKucunDetailPage {
  pet : String = "2";
  item: any;
  // move_ids: any;
  line_ids: any
  frontPage ;
  isShow = false;
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController
      ,public changeKucunService:ChangeKucunService, public toastCtrl:ToastController,public storage: Storage) {
    this.item = this.navParams.get('item');
    this.user_id = this.navParams.get('user_id')
    // this.clickKucun();
    this.clickPandian();
    this.frontPage = Utils.getViewController("ChangeKucunPage", navCtrl)
    this.isShow = this.item.isShow
  }


  changeDate(date) {
    let new_date = date.replace(' ', 'T') + 'Z';
    return new_date;
  }

  // clickKucun(){
  //     this.move_ids = this.item.move_ids;
  // }

  clickPandian(){
      this.line_ids = this.item.line_ids;
  }

  changeType(type){
      let new_type;
      switch(type){
        case 'none':
          new_type = "所有产品"
          break;
        case 'category':
          new_type = "一个产品类别"
          break;
        case 'product':
          new_type = "仅一个产品"
          break;
        case 'partial':
          new_type = "手动选择产品"
          break;
      }
      return new_type;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeKucunDetailPage');
  }

  refuse(){
    let confirm = this.alertCtrl.create({
      title: '确定拒绝?',
      message: '拒绝后将删除单据',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.changeKucunService.changeStateKucun("draft", this.item.id, this.user_id).then((res) =>{
              console.log('拒绝 '+res.result.res_data);
              if(res.result&&res.result.res_code==1){
                Utils.toastButtom("删除成功", this.toastCtrl)
                this.navCtrl.popTo(this.frontPage);
              }else if(res.error){
                Utils.toastButtom(res.error.data.message, this.toastCtrl)
              }  
            })
          }
        }
      ]
    });
    confirm.present();
  }

  pass(){
    let confirm = this.alertCtrl.create({
      title: '确定通过?',
      message: '',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.changeKucunService.changeStateKucun("done", this.item.id, this.user_id).then((res) =>{
              console.log('通过 '+res.result.res_data);
              if(res.result&&res.result.res_code==1){
                Utils.toastButtom("通过成功", this.toastCtrl)
                this.navCtrl.popTo(this.frontPage);
              }else if(res.error){
                Utils.toastButtom(res.error.data.message, this.toastCtrl)
              }
            })
          }
        }
      ]
    });
    confirm.present();
  }

  changeRemark(remark){
    let new_remark;
    if('transfer'==remark){
      new_remark = "物料转换"
    }else if('adjust'==remark){
      new_remark = "库存调整"
    }
    return new_remark;
}

}
