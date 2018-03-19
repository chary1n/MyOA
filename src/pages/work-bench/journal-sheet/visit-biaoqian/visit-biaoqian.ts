import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from '../../../../providers/Utils';

/**
 * Generated class for the VisitBiaoqianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-visit-biaoqian',
  templateUrl: 'visit-biaoqian.html',
})
export class VisitBiaoqianPage {
  teamPerson: any;
  person_id=-1;
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public statusBar: StatusBar) {
    this.teamPerson = this.navParams.get('item')
    this.frontPage = Utils.getViewController("VisitListPage", navCtrl)
    console.log(this.teamPerson)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitBiaoqianPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  //重置
  cancel_biaoqian(){
    this.person_id = -1
    for (let items of this.teamPerson) {
      if(items.user_id == -1){
        items.is_choose = true
        this.isCheck(items)
      }else{
        items.is_choose = false
      }
    }
  }

  //完成
  confirm_biaoqian(){
    console.log('biaoqian=>person_id = '+this.person_id)
    this.frontPage.data.person_id = this.person_id
    this.navCtrl.popTo(this.frontPage);
  }

  isCheck(item){
    let isChoose = false
    isChoose = item.is_choose
    return isChoose
  }

  checkOther(item){
    let personId = item.user_id
    this.person_id = personId
    console.log('personId = '+personId)
    for (let items of this.teamPerson) {
      if(items.user_id == personId){
        items.is_choose = true
      }else{
        items.is_choose = false
      }
    }
  }

}
