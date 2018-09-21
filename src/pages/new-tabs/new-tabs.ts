import { FirstShowService } from './../first-show/first_service';
import {Tabs} from "ionic-angular";
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NewTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-tabs',
  templateUrl: 'new-tabs.html',
  providers: [FirstShowService]
})
export class NewTabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  firstRoot:any= 'FirstShowPage';
  workRoot :any = 'NewWorkBenchPage';
  contactRoot:any  = 'ContactPersonPage';
  meRoot :any ='MePage';
  emailRoot: any = 'EmailMenuPage';
  messageNum = 1
  all_approval
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams,private firshowService: FirstShowService,public storage:Storage,) {
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id;
      this.get_approval_num()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTabsPage');
  }
  //获取审批的数目
  get_approval_num(){
    let body ={
      'uid': this.uid
    }
    this.firshowService.get_approval_num(body).then(res =>{
      if(res.result.res_data && res.result.res_code == 1){
         this.all_approval = res.result.res_data.recoup_num+res.result.res_data.vacation_num
         if(this.all_approval!=0){
          this.messageNum = 1
         }else{
           this.messageNum = 0
         }
      }
    })
  }
}
