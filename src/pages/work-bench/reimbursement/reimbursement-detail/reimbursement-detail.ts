import { NavController, NavParams, IonicPage,AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ReimbursementService} from './../reimbursementService';
/**
 * Generated class for the ReimbursementDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reimbursement-detail',
  templateUrl: 'reimbursement-detail.html',
  providers:[ReimbursementService]
})
export class ReimbursementDetailPage {
  item:any;
  title:any;
  isShowFooter:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public baoxiaoService:ReimbursementService,
  public alertCtrl:AlertController) {
    this.item = this.navParams.get('item');
    this.title = this.item.expense_name;
    console.log(this.item.state);
    if (this.item.state == '发送' || this.item.state == '1级审核' || this.item.state == '2级审核')
    {
      this.isShowFooter = true;
    }
    else
    {
      this.isShowFooter = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementDetailPage');
  }

  conform(){
    if (this.item.state == '发送')
    {
      this.baoxiaoService.confirm1(this.item.sheet_id).then((res) => {
        console.log(res);
    })
  }
  else if (this.item.state == '1级审核')
  {
      this.baoxiaoService.confirm2(this.item.sheet_id).then((res) => {
        console.log(res);
      })
  }
    
  }

  cancel(){
    this.showPrompt();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
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
            // console.log(data.title);
            this.baoxiaoService.refuse(this.item.sheet_id,data.title                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ).then((res) => {
                console.log(res.result.res_data);
            })
          }
        }
      ]
    });
    prompt.present();
  }

}
