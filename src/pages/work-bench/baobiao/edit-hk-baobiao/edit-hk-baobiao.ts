import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { BaoBiaoService } from './../baobiaoService'
import { Utils } from './../../../../providers/Utils';

declare let cordova: any;

/**
 * Generated class for the EditHkBaobiaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-hk-baobiao',
  templateUrl: 'edit-hk-baobiao.html',
  providers: [BaoBiaoService]
})
export class EditHkBaobiaoPage {
  line_ids = []
  show_ids = []
  frontPage
  total_amount = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public baoBiaoService: BaoBiaoService,
  public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController('HkBaobiaoPage', this.navCtrl)
    this.line_ids = this.navParams.get('line_ids')
    this.show_ids = []
    for (let i = 0; i < this.line_ids.length; i ++){
      this.show_ids.push(this.line_ids[i])
      this.total_amount += this.line_ids[i].sub_total
    }
  }

  ionViewDidLoad() {
    
  }

  goBack(){
    this.frontPage.data.need_fresh = true
    this.navCtrl.popTo(this.frontPage)
  }

  onChangeNum(){
    this.total_amount = 0
    for (let i = 0;i < this.show_ids.length; i ++){
      this.show_ids[i].sub_total = (parseFloat(this.show_ids[i].rate) * parseFloat(this.show_ids[i].amount))
      this.total_amount += this.show_ids[i].sub_total
    }
  }

  toFix(data){
    if (data){
      return parseFloat(data).toFixed(2)
    }
    else
    {
      return ''
    }
  }

  click_save(){
    let body = {
      'line_ids': this.show_ids
    }
    this.baoBiaoService.update_hk_account(body).then(res => {
      if (res.result.res_code == 1){
        Utils.toastButtom('更新成功', this.toastCtrl)
        this.frontPage.data.need_fresh = true
        this.navCtrl.popTo(this.frontPage)
      }
    })
  }

}
