import { Utils } from './../../../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { SalesSearvice } from './../../../salesService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salesSearvice: SalesSearvice, private storage: Storage,
    private toastCtrl: ToastController) {
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
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesInfoPage');
  }

  save() {
    let mString = "";
    if (!this.salesTeam) {
      mString = mString + "请选择销售团队"
    }
    if (mString != "") {
      Utils.toastButtom(mString, this.toastCtrl)
    }else{
      this.mImproveQuotationPage.data.salesInfo = { 
        salesMan:this.salesMan,
        tags :this.tag,
        team:this.salesTeam,
        customerRefer :this.customerInfo ,
        analytic_account :this.analyAccount
      }
      this.navCtrl.pop();
    }

  }

}
