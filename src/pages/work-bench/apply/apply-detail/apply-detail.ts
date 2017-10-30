import { CommonUseServices } from './../../commonUseServices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ApplyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-detail',
  templateUrl: 'apply-detail.html',
  providers:[CommonUseServices]
})
export class ApplyDetailPage {
  res_data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,public commonService:CommonUseServices) {
    this.res_data = navParams.get('res_data');
    console.log(this.res_data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyDetailPage');
  }

  callbackApply() {
    let prompt = this.alertCtrl.create({
      title: '请填写撤回理由',
      inputs: [
        {
          name: 'descrption',
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log(data['descrption'])
            this.commonService.get_retract(data['descrption'],this.res_data.id).then(res=>{
              if(res.result&&res.result.res_code==1){
                alert("撤回成功")
                this.navCtrl.pop()
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }
}


