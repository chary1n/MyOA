import { CreateApplyPage } from './../create-apply/create-apply';
import { ApplyDetailPage } from './../apply-detail/apply-detail';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';


/**
 * Generated class for the ApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
  providers: [CommonUseServices],
})
export class ApplyPage {
  applyList: any;
  user;
  user_id;
  actionSheetCtrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonUseServices, public storage: Storage,
    actionSheetCtrl: ActionSheetController) {
      this.actionSheetCtrl = actionSheetCtrl
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        console.log(this.user_id);
        this.getApplyList(20, 0, this.user_id)
      });
  }

  getApplyList(limit, offset, id) {
    this.commonService.getApplyList(offset, limit, id).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.applyList = res.result.res_data;
      }
    })
  }

  showActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择类型',
      buttons: [
        {
          text: '报销',
          handler: () => {
          }
        },{
          text: '申购',
          handler: () => {
          }
        },{
          text: '请假',
          handler: () => {
          }
        },{
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

  clickApply(id) {
    this.commonService.getApplyDetail(id).then(res => {
      if (res.result && res.result.res_code == 1) {
        console.log(res);
        this.navCtrl.push('ApplyDetailPage', {
          res_data: res.result.res_data
        });
      }
    })

  }

}
