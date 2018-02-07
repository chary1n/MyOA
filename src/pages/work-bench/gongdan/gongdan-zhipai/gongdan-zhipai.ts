import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the GongdanZhipaiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-zhipai',
  templateUrl: 'gongdan-zhipai.html',
  providers:[GongDanService],
})
export class GongdanZhipaiPage {
  employeeList;
  origin_data;
  item;
  frontPage;
  select_list = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongDanService:GongDanService,
  public toast:ToastController,public statusbar:StatusBar) {
    this.item = this.navParams.get('item')
    console.log(this.item)   
    this.frontPage = Utils.getViewController("GongdanPage", navCtrl)
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
    console.log('ionViewDidLoad GongdanZhipaiPage');
  }

  itemSelect(item){
    let is_has = false;
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

  confirm(){
    console.log(this.select_list)
    if (!this.select_list[0]){
       Utils.toastButtom("请选择指派人", this.toast)
    }
    else
    {
      this.gongDanService.work_order_action(HttpService.user_id,this.item.work_order_id,"assign",this.select_list[0]).then(res => {
      if (res.result.res_code == 1)
      {
        Utils.toastButtom("指派成功", this.toast)
        this.frontPage.data.need_fresh = true;
        this.navCtrl.popTo(this.frontPage);
      }
    })
    }
    
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

}
