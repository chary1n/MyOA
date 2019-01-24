import { PandianService } from './../pandianService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,  AlertController, ToastController} from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PandianDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pandian-detail',
  templateUrl: 'pandian-detail.html',
  providers: [PandianService]
})
export class PandianDetailPage {
  item: any;
  title: any;
  isShowFooter: any;
  user_id: any;
  frontPage;
  type='kucun'
  kucunList=[]
  pandianList=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,  public storage: Storage, public toastCtrl: ToastController
      , public pandianService: PandianService) {

      this.item = this.navParams.get('item');
    this.title = this.item.expense_name;
    if(this.item.state=='confirm'){
      this.isShowFooter = true
    }else{
      this.isShowFooter = false
    }
    this.frontPage = Utils.getViewController("PandianListPage", navCtrl)
    this.storage.get('user')
      .then(res => {
        console.log(res)
        this.user_id = res.result.res_data.user_id;
      });
      this.kucunList = this.item.move_ids
      this.pandianList = this.item.line_ids
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PandianDetailPage');
  }

  clickMove(){
    this.type = 'kucun'
  }

  clickLine(){
    this.type = 'pandian'
  }

  goBack(){
    this.navCtrl.pop()
  }

  conform() {
    let ctrl = this.alertCtrl;

    ctrl.create({
      title: '提示',
      message: "填写审批备注",
      inputs: [
        {
          name: 'title',
          placeholder: '审批备注(选填)'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '通过',
          handler: data => {
              let body = {
                'user_id':this.user_id,
                'id': this.item.id
              }
              this.pandianService.confirm_stock_inventory(body).then((res) => {
                if (res) {
                  if (res.result.res_code == 1) {
                    ctrl.create({
                      title: '提示',
                      subTitle: "审批成功",
                      buttons: [{
                        text: '确定',
                        handler: () => {
                          this.frontPage.data.need_fresh = true;
                          this.navCtrl.popTo(this.frontPage);
                        }
                      }
                      ]
                    }).present();
                  }
                }
              })
          }
        }]
    }).present();
  }

}
