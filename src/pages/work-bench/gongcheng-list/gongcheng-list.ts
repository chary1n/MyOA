import { GongchengService } from './gongchengService';
import { GongchengAutoService } from './gongchengAutoService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the GongchengListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongcheng-list',
  templateUrl: 'gongcheng-list.html',
  providers: [GongchengAutoService, GongchengService]
})
export class GongchengListPage {
  wait_approval_list=[]
  user_id
  type = 'me'
  is_ios = false;
  wait_num;
  waitString='待我审批'
  wait_approval=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public gongchengAutoService: GongchengAutoService,
              public gongchengService: GongchengService,  public platform: Platform,public storage: Storage) {

                if (this.platform.is('ios')) {
                  this.is_ios = true
                }

                this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id;
        this.initData('me')
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongchengListPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.initData(this.type)    
      this.navParams.data.need_fresh = false;
    }
  }

  goBack() {
    this.navCtrl.pop()
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "create";
      search_text = event.name.replace("搜 创建人：", "")
    }
    
    let body={
      'search_text': search_text,
      'type': type,
      'searchType': this.type
    }
    this.gongchengService.search_material_request(body).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data
      }
    })
  }


  itemClearSelected(event) {
    if(this.type=='me_approved'){
      this.initData('me_approved')
    }else if(this.type=='wait_approved'){
      this.initData('wait_approved')
    }else if(this.type=='me'){
      this.initData('me')
    }
  }

  clickAlreadyApply(){
    this.type = 'me_approved'
    this.initData('me_approved')
  }

  clickWaitMeApply(){
    this.type = 'wait_approved'
    this.initData('wait_approved')
  }

  clickMeApply(){
    this.type = 'me'
    this.initData('me')
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  initData(type){
    let body = {
      'user_id': this.user_id,
      'type': type
    }
      this.gongchengService.get_material_request(body).then((res) => {
        if (res.result && res.result.res_code == 1) {
          this.wait_approval_list = res.result.res_data
          if(type=='wait_approved'){
            this.wait_approval = res.result.res_data
            if(this.wait_approval){
              if(this.wait_approval.length>0){
                this.wait_num = this.wait_approval.length
                this.waitString = '待我审批('+this.wait_num+')'
              }
        }
          }
        }
      })
  }

  approved_detail(item){
    this.navCtrl.push('GongchengDetailPage', {
      item: item,
      type: this.type
    });
  }
  
  changeState(state) {
    if (state == 'draft') {
      return "草稿";
    }
    else if (state == 'reviewing') {
      return "审核中";
    }
    else if (state == 'wait_take_effect') {
      return "等待生效";
    }
    else if (state == 'rejected') {
      return "被拒";
    }
    else if (state == 'done') {
      return "完成";
    }
    else if (state == 'archived') {
      return "归档";
    }
    else {
      return state;
    }
  }
}
