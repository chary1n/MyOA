import { IMAGE_SIZE } from './../../../providers/Constants';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController ,Platform} from 'ionic-angular';
import { Component } from '@angular/core';
import { getType } from '@angular/core/src/errors';
import { ZanzhiAutoService } from './new-zanzhiautoService'
import { ZanzhiMeAutoService } from './new-zanzhiMeautoService'
import { NewZanZhiService } from './new-zanzhiService'

/**
 * Generated class for the NewZanzhiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-zanzhi',
  templateUrl: 'new-zanzhi.html',
  providers: [NewZanZhiService, ZanzhiAutoService, ZanzhiMeAutoService]
})
export class NewZanzhiPage {
  zz_type
  type: string = "wait_approved";
  wait_approval_list: any;
  wait_approval_count;
  already_approval_list: any;
  isMoreData1 = true;
  isMoreData2 = true;
  applyList;
  leaveList;
  user;
  user_id;
  actionSheetCtrl;
  limit = 20;
  offset = 0;
  isMoreData = true;
  waitMeNumber;
  need_fresh;
  already_approval_count;
  apply_count;
  department = false;
  is_ios = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServices: NewZanZhiService,
    public zanzhiAutoServices: ZanzhiAutoService,
    public zanzhiMeAutoServices: ZanzhiMeAutoService,
    public storage: Storage,
    public alertCtrl: AlertController,public platform: Platform) {
      if (this.platform.is('ios')) {
      this.is_ios = true
    }
    this.zz_type = this.navParams.get('zz_type')
    this.storage.get('user')
      .then(res => {
        console.log(res);
        if (res.result.res_data.department) {
          this.department = true;
        }
        this.user_id = res.result.res_data.user_id;
        this.refreshCount()
      });
  }

  refreshCount() {
    this.commonServices.get_zanzhi_listNoLoading(this.user_id, this.limit, this.offset, "wait_apply",this.zz_type).then((res) => {
      console.log(res);
      if (res.result && res.result.res_code == 1) {
        this.wait_approval_list = res.result.res_data.data
        this.wait_approval_count = res.result.res_data.count
      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewZanzhiPage');
  }

  ionViewDidEnter() {
    if (this.navParams.get('need_fresh') == true) {
      this.navParams.data.need_fresh = false;
      this.addData()
    }
    this.refreshCount()
  }

  changeState(state) {
    if (state == 'draft') {
      return '草稿'
    } else if (state == "confirm") {
      return '确认'
    } else if (state == "reviewing") {
      return '审核中'
    }else if (state == "approve") {
      return '批准'
    } else if (state == "rejected") {
      return '被拒'
    } else if (state == "cancel") {
      return '被拒'
    } else if (state == "done") {
      return '已支付'
    }else {
      return state;
    }
  }

  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }

  addData(){
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.commonServices.get_zanzhi_list(this.user_id,20,0,this.getType(),this.zz_type).then(res=>{
      if(res.result&&res.result.res_code==1){
        let list = res.result.res_data.data ;
        if(this.type=="me"){
          this.applyList=list
        }else if(this.type=='wait_approved'){
          this.wait_approval_list=list
        }else if(this.type=='me_approved'){
          this.already_approval_list=list
        } 
      }
    })
  }

  getType(){
    let type ;
    if(this.type=="me"){
      type="apply"
    }else if(this.type=='wait_approved'){
      type="wait_apply"
    }else if(this.type=='me_approved'){
      type="applyed"
    } 
    return type
  }

  clickAlreadyApply(){
    this.type = 'me_approved'
    this.addData()
  }

  clickWaitMeApply(){
    this.type = 'wait_approved'
    this.addData()
  }

  clickMeApply(){
    this.type = 'me'
    this.addData()
  }

  itemClearSelected(event){
    this.addData()
  }

  itemClearMeSelected(event){
    this.addData()
  }

  approved_detail(item){
    this.commonServices.get_zz_detail({user_id:this.user_id,zz_id:item.id}).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push("NewZanzhiDetailPage",{item:res.result.res_data,type:this.type})
      }
    })
    
  }

  itemSelected(event) {
    let type;
    let search_text;
    let data ;
    if (event.id == 2) {
      data = 'employee_id'
      search_text = event.name.replace("搜 申请人：", "")
    }
    else if (event.id == 1) {
      data = 'name'
      search_text = event.name.replace("搜 单号：", "")
    }
    this.commonServices.searchZanzhiList(this.user_id, this.getType(), data,search_text,this.zz_type).then((res) => {
      if (res.result && res.result.res_code == 1) {
        let list = res.result.res_data ;
        if(this.type=="me"){
          this.applyList=list
        }else if(this.type=='wait_approved'){
          this.wait_approval_list=list
        }else if(this.type=='me_approved'){
          this.already_approval_list=list
        } 
      }
    })
  }

  itemMeSelected(event){
    let type;
    let search_text;
    let data ;
    if (event.id == 2) {
      data = 'rt_to_approval_employee_id'
      search_text = event.name.replace("搜 待审核人：", "")
    }
    else if (event.id == 1) {
      data = 'name'
      search_text = event.name.replace("搜 单号：", "")
    }
    this.commonServices.searchZanzhiList(this.user_id, this.getType(), data,search_text,this.zz_type).then((res) => {
      if (res.result && res.result.res_code == 1) {
        let list = res.result.res_data ;
        if(this.type=="me"){
          this.applyList=list
        }else if(this.type=='wait_approved'){
          this.wait_approval_list=list
        }else if(this.type=='me_approved'){
          this.already_approval_list=list
        } 
      }
    })
  }

}
