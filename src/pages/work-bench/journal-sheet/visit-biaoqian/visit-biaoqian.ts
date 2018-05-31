import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from '../../../../providers/Utils';
import {WriteJournalService } from './../writejournalService';
import { Storage } from '@ionic/storage';

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
  providers: [WriteJournalService],
})
export class VisitBiaoqianPage {
  teamPerson: any;
  person_id=-1;
  frontPage;
  teamList;
  isShowTeam = false;
  user_id;
  team_id = -1;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public statusBar: StatusBar, public writeService: WriteJournalService
  ,public storage: Storage,) {
    this.teamPerson = this.navParams.get('item')
    this.team_id = this.navParams.get('team_id')
    this.frontPage = Utils.getViewController("VisitListPage", navCtrl)
    console.log(this.teamPerson)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitBiaoqianPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
      console.log(res.result.res_data.groups)
      for(let product of res.result.res_data.groups){
        if (product.name == "group_sale_manager"){
          this.isShowTeam = true;
          this.writeService.get_all_sale_team().then(res =>{
            res.res_data;
            if(res.result.res_code==1 && res.result){
              console.log(res)
              this.teamList = res.result.res_data  
            }
           }
          )
          break;
        }
        if(product.name == "group_sale_salesman_all_leads"){
          this.isShowTeam = true;
          this.writeService.get_sale_team(this.user_id).then(res =>{
            res.res_data;
            if(res.result.res_code==1 && res.result){
              console.log(res)
              this.teamList = res.result.res_data  
            }
           }
          )
        }
      }
    });
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
    this.team_id = -1
    for (let items of this.teamList) {
        items.isChoose = false
    }
  }

  //完成
  confirm_biaoqian(){
    console.log('biaoqian=>person_id = '+this.person_id)
    this.frontPage.data.person_id = this.person_id
    this.frontPage.data.team_id = this.team_id
    this.navCtrl.popTo(this.frontPage);
  }

  isCheck(item){
    let isChoose = false
    isChoose = item.is_choose
    return isChoose
  }

  isShowBack(item){
    let isShow = false
    isShow = item.isChoose
    return isShow
  }

  //点击团队
  checkTeam(item){
    this.team_id = item.team_id
    for (let items of this.teamList) {
      if(items.team_id == this.team_id){
        items.isChoose = true
      }else{
        items.isChoose = false
      }
    }
    let body = {
      team_id: item.team_id
    }
    this.writeService.get_saleteam_person(body).then(res =>{
      if(res.result.res_code==1 && res.result){
        console.log(res)
        this.teamPerson = res.result.res_data
      }
    })
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
