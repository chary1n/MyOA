import { ChangeSearchService } from './change-search-service';
import { ChangeKucunService } from './changeKucunService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';


/**
 * Generated class for the ShareKnowledgePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-kucun',
  templateUrl: 'change-kucun.html',
  providers: [ChangeKucunService, ChangeSearchService],
})
export class ChangeKucunPage {
  waitApplyList: any;
  user_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public changeKucunService: ChangeKucunService
  , public changesearchService: ChangeSearchService,public storage: Storage,public statusBar:StatusBar) {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeKucunPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter ChangeKucunPage');
    this.getwaitList();
  }


  changeDate(date) {
    let new_date = date.replace(' ', 'T') + 'Z';
    return new_date;
  }  

  getWaitApplyDeatil(item){
    this.navCtrl.push('ChangeKucunDetailPage', {
        item: item,
        user_id: this.user_id
    })
  }

  //获取待审批列表
  getwaitList(){
    this.changeKucunService.getwaitList('confirm',  this.user_id).then((res) =>{
      console.log('ionViewDidLoad '+res.result.res_data);
      this.waitApplyList = res.result.res_data
    })
  }

  doRefresh(refresh){
      this.getwaitList();
      refresh.complete();
  }

  itemSelected0(event){  
    let search_text;
    if (event.id == 1) {
      search_text = event.name.replace("搜 盘点名称:", "") 
      this.changeKucunService.getsearchList('confirm', search_text, 1, this.user_id).then((res) =>{
        this.waitApplyList = res.result.res_data
      })
    }
    else if (event.id == 2) {
      search_text = event.name.replace("搜 创建人:", "")
      this.changeKucunService.getsearchList('confirm', search_text, 2, this.user_id).then((res) =>{
        this.waitApplyList = res.result.res_data
      })
    } 
  }

  changeRemark(remark){
    let new_remark;
    if('transfer'==remark){
      new_remark = "物料转换"
    }else if('adjust'==remark){
      new_remark = "库存调整"
    }
    return new_remark;
}

goBack(){
  
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }
}
