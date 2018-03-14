import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';
@IonicPage()
@Component({
  selector: 'page-gongdan-chat',
  templateUrl: 'gongdan-chat.html',
  providers: [GongDanService],
})
export class GongdanChatPage {
  employeeList;
  origin_data;
  select_list = [];
  beizhuText;
  item;
  parent_id;
  frontPage;
  record_item;
  select_name;
  isShowTool = false;
  keybord_height;
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongDanService:GongDanService,
    public toast:ToastController,public statusbar:StatusBar) {
    this.item = this.navParams.get('item')  
    this.record_item = this.navParams.get('record_item')
    this.parent_id = this.navParams.get('parent_id')
    this.frontPage = Utils.getViewController("GongdanDetailPage", navCtrl)
    this.select_list.push(this.record_item.create_uid.id)
    this.select_name = this.record_item.create_uid.name
    this.beizhuText = "@" + this.record_item.create_uid.name + " "
    this.gongDanService.get_department_employees(this.item.effective_department_ids).then((res) => {
        if (res.result && res.result.res_code == 1)
        {
          this.employeeList = res.result.res_data;
          this.origin_data = this.employeeList;
        }
      })
  }

  ionViewWillEnter() {
     this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanChatPage');
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.employeeList = this.origin_data.filter((item) => {
        console.log(item)
        if (item.name != '')
        {
          console.log(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    else{
      this.employeeList = this.origin_data;
    } 
  }

  reply(){
    if (this.select_list[0])
    {
      let name_str = "@"+this.select_name + " "
      this.beizhuText = this.beizhuText.replace(name_str,"")
       this.gongDanService.work_order_add_record(this.beizhuText,this.select_list[0],"reply",this.item.work_order_id,this.parent_id,[]).then(res => {
      console.log(this.select_list)
  
      if (res.result.res_code == 1)
      {
        Utils.toastButtom("回复成功", this.toast)
        this.frontPage.data.need_fresh = true;
        this.navCtrl.popTo(this.frontPage);
      }
    })
  }
  else
  {
    Utils.toastButtom("请选择回复对象", this.toast)
  }
   
  }

  itemSelect(item){
    let is_has = false;
    this.beizhuText = this.beizhuText.replace(this.select_name,item.user_id.name)
    this.select_name = item.user_id.name
    this.select_list.splice(0,1)
    this.select_list.push(item.user_id.id)
  }

  is_select(item){
    let is_has = false;
    for (let i = 0, len = this.select_list.length, value; i < len; i++) {
      if(this.select_list[i] == item.user_id.id){
        is_has = true
        break
      }
    }
    return is_has
  }

  calHeight(){
    return (window.innerHeight - 44) / window.innerHeight * 100
  }

}


