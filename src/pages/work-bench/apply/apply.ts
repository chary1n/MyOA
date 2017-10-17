import { CreateApplyPage } from './../create-apply/create-apply';
import { ApplyDetailPage } from './../apply-detail/apply-detail';
import { Storage } from '@ionic/storage';
import { CommonUseServices } from './../commonUseServices';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';


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
  applyList :any ;
  user ;
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService :CommonUseServices,public storage : Storage,
    public alertCtrl: AlertController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyPage');
    this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
      console.log(this.user_id);
      this.getApplyList(20,0,this.user_id)
    });
  }
/**
 * 
 * create_time:"2017-10-11 07:37:23"
department:"董事长 / 总经理wiliam / 工程部"
id:2505
name:"BX1710112075"
payment:10
state:"submit"
*/
  getApplyList(limit,offset,id){
    this.commonService.getApplyList(offset,limit,id).then(res=>{
      if(res.result && res.result.res_code == 1){
       this.applyList = res.result.res_data;
      }
    })
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择类型');
    alert.addInput({
        type: 'radio',
        label: '报销',
        value: '1',
        checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '申购',
      value: '2',
      checked: false
  });
  alert.addInput({
    type: 'radio',
    label: '请假',
    value: '3',
    checked: false
});
    alert.addButton('取消');
    alert.addButton({
        text: '确定',
        handler: data => {
        this.navCtrl.push('CreateApplyPage');
        }
    });
    alert.present();
}

clickApply(id){
  this.commonService.getApplyDetail(id).then(res=>{
    if(res.result && res.result.res_code == 1){
        console.log(res);
        this.navCtrl.push('ApplyDetailPage',{
          res_data : res.result.res_data
        });
    }
  })

}

}
