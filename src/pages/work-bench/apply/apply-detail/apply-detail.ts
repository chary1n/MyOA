import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';
import { Toast } from '@ionic-native/toast';
import { CommonUseServices } from './../../commonUseServices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

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
  userId ;
  id ; 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,public commonService:CommonUseServices,
    public toastCtrl :ToastController,
    public storage :Storage) {
    this.res_data = navParams.get('res_data');
    this.id = this.res_data.id
    console.log(this.res_data);
    this.storage.get('user')
    .then(res => {
      console.log(res)
      this.userId = res.result.res_data.user_id;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyDetailPage');
  }

  ionViewWillEnter(){
    this.commonService.getApplyDetail(this.id).then(res => {
      if (res.result && res.result.res_data) {
        console.log(res);
          this.res_data= res.result.res_data
      }
    })
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
            if(data['descrption']){
              this.commonService.get_retract(data['descrption'],this.res_data.id,this.userId).then(res=>{
                if(res.result&&res.result.res_code==1){
                  alert("撤回成功")
                  this.navCtrl.pop()
                }
              })
            }else{
              Utils.toastButtom("请填写撤回理由",this.toastCtrl)
            }
          }
        }
      ]
    });
    prompt.present();
  }

  submitApply(){
    let prompt = this.alertCtrl.create({
      title: '确定提交审核?',
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
            this.commonService.submit_apply(this.res_data.id,this.userId).then(res=>{
              if(res.result&&res.result.res_code==1){
                alert("提交成功")
                this.navCtrl.pop()
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }

  edit_apply(){
      this.navCtrl.push("BaoxiaoApplyPage",{data :this.res_data} )
  }
}


