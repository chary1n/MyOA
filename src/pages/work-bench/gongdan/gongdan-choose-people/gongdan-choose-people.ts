import { HttpService } from './../../../../providers/HttpService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { GongDanService } from './../gongdanService';
import { Utils } from './../../../../providers/Utils';

/**
 * Generated class for the GongdanChoosePeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gongdan-choose-people',
  templateUrl: 'gongdan-choose-people.html',
  providers:[GongDanService]
})
export class GongdanChoosePeoplePage {
  employeeList;
  origin_data;
  item
  select_list = [];
  frontPage
  beizhuText=""
  select_name
  constructor(public navCtrl: NavController, public navParams: NavParams,public gongDanService:GongDanService,public toast:ToastController,
    public statusbar:StatusBar) {
    this.item = this.navParams.get('item')
    this.beizhuText = this.navParams.get('beizhuText')
    this.select_name = this.navParams.get('select_name')
    this.frontPage = Utils.getViewController("GongdanNewChatPage", navCtrl)
    this.gongDanService.get_department_employees(this.item.effective_department_ids).then((res) => {
        if (res.result && res.result.res_code == 1)
        {
          this.employeeList = res.result.res_data;
          this.origin_data = this.employeeList;
        }
      })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GongdanChoosePeoplePage');
  }

  ionViewWillEnter() {
     this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  itemSelect(item){
    let is_has = false;
    this.select_list.splice(0,1)
    this.select_list.push(item.user_id)
    
  }

  is_select(item){
    let is_has = false;
    for (let i = 0, len = this.select_list.length, value; i < len; i++) {
      if(this.select_list[i].id == item.user_id.id){
        is_has = true
        break
      }
    }
    return is_has
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

  confirm(){
    console.log(this.select_list)
    if (!this.select_list[0]){
       Utils.toastButtom("请选择@的人", this.toast)
    }
    else
    {
      // this.select_list[0]

      if (this.select_name){
        this.beizhuText = this.beizhuText.replace(this.select_name.name,this.select_list[0].name)
        this.select_name = this.select_list[0]  
    }
    else
    {
      this.beizhuText = "@" + this.select_list[0].name + " " + this.beizhuText
      this.select_name = this.select_list[0] 
    }
       this.frontPage.data.select_name = this.select_list[0]
       this.frontPage.data.beizhuText = this.beizhuText
       this.navCtrl.popTo(this.frontPage)
    }
    
  }

}
