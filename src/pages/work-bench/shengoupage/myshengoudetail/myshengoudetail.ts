import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage ,AlertController} from 'ionic-angular';
import { ShenGouService} from './../shengouService'
import { Storage } from '@ionic/storage';
import { Utils } from './../../../../providers/Utils';


/**
 * Generated class for the MyshengoudetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myshengoudetail',
  templateUrl: 'myshengoudetail.html',
  providers:[ShenGouService],
})
export class MyshengoudetailPage {
  item:any;
  title:any;
  user_id:any;
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public shengouService:ShenGouService,public alertCtrl:AlertController,public storage:Storage) {
     this.item = this.navParams.get('item');
     this.frontPage = Utils.getViewController("ShengoupagePage", navCtrl)
     this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyshengoudetailPage');
  }

  backApply(){
    let ctrl = this.alertCtrl;
      ctrl.create({
      title: '提示',
      message: "输入拒绝的原因",
      inputs: [
        {
          name: 'title',
          placeholder: '拒绝原因'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data.title)
            {
                this.shengouService.refuse_shengou(this.user_id,data.title,this.item.sheet_id).then((res) => {
               if (res)
        {
          
          if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "拒绝成功",
                  buttons: [{
                text: '确定',
                    handler: () => {
                    this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
             }
             }
      ]
    }).present();
          }
        }
            })
          }
          else
          {
              ctrl.create({
                  title: '提示',
                  subTitle: "请填写拒绝原因",
                  buttons: [{
                text: '确定',
                    handler: () => {
                   
             }
             }
      ]
    }).present();
          }
          }
        }
      ]
    }).present();
  }


  reApply(){
    let ctrl = this.alertCtrl;
    this.shengouService.reset_shengou(this.user_id,this.item.sheet_id).then((res) => {
        if (res.result.res_data.success == 1)
          {
            console.log(res.result.res_data.success)
            ctrl.create({
                  title: '提示',
                  subTitle: "重新申请成功,等待审核",
                  buttons: [{
                text: '确定',
                    handler: () => {
                    this.frontPage.data.need_fresh = true;
              this.navCtrl.popTo(this.frontPage,{
                need_fresh:true,
              });
             }
             }
      ]
    }).present();
          }
    })
  }

  changeDate(date){
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

}
