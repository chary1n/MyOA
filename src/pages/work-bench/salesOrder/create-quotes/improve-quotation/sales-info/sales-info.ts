import { Utils } from './../../../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { SalesSearvice } from './../../../salesService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SalesInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sales-info',
  templateUrl: 'sales-info.html',
  providers: [SalesSearvice]
})
export class SalesInfoPage {
  salesMan: any;
  tag: any;
  analyAccountList: any;
  analyAccount: any;
  customerInfo: any;
  salesTeamList: any;
  salesTeam: any;
  tagsList: any;
  mImproveQuotationPage;
  salesManId;
  salesInfo;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salesSearvice: SalesSearvice, private storage: Storage,
    private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.mImproveQuotationPage = Utils.getViewController("ImproveQuotationPage", navCtrl);

    this.salesSearvice.getTagsList().then(res => {
      this.tagsList = res.result.res_data
    })
    this.salesSearvice.getTeamList().then(res => {
      this.salesTeamList = res.result.res_data
    })
    this.salesSearvice.getAnalyticAccountList().then(res => {
      this.analyAccountList = res.result.res_data
    })
    this.storage.get('user')
      .then(res => {
        this.salesMan = res.result.res_data.name;
        this.salesManId = res.result.res_data.user_id;
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesInfoPage');

  }

  ionViewDidEnter() {
    let self = this;
    self.initView()
  }

  initView() {
    this.salesInfo = this.navParams.get("salesInfo");
    console.log(this.salesInfo)
    if (this.salesInfo) {
      this.salesManId = this.salesInfo.salesMan
      this.tag = this.salesInfo.tags
      this.salesTeam = this.salesInfo.team
      this.customerInfo = this.salesInfo.customerRefer
      this.analyAccount = this.salesInfo.analytic_account
    }
  }

  goBack() {
    if (this.salesManId || this.tag || this.salesTeam || this.customerInfo || this.analyAccount) {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '已输入内容，是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
        ]
      }).present();
    }
    else {
      this.navCtrl.pop();
    }
  }

  save() {
    let mString = "";
    if (!this.salesTeam) {
      mString = mString + "请选择销售团队"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    } else {
      this.mImproveQuotationPage.data.salesInfo = {
        salesMan: this.salesManId,
        tags: this.tag,
        team: this.salesTeam,
        customerRefer: this.customerInfo,
        analytic_account: this.analyAccount
      }
      this.navCtrl.pop();
    }

  }

}
