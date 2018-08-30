import {Tabs} from "ionic-angular";
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  need_show_me = true;
  @ViewChild('mainTabs') tabs:Tabs;
  meRoot :any ='MePage';
  firstRoot:any;
  // msgRoot:any = 'FirstShowPage';
  msgRoot:any = 'GongdanPage';
  workRoot :any = 'WorkBenchPage';
  contactRoot  = 'ContactPersonPage';
  need_show_gongdan = false
  need_show_all = false;
  need_show_first = false
  loginIndex;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage:Storage) {
    
    // this.storage.get('user')
    //   .then(res => {
    //     console.log(res)
    //     if ((new RegExp("若态").test(res.result.res_data.company)) || res.result.res_data.company == "若态"){
    //         this.need_show_gongdan = true
    //        if (this.need_show_gongdan == true){
    //           this.tabs.select(0); 
    //         }
    //         else
    //         {
    //           this.tabs.select(1); 
    //         }
    //       }
    //       else
    //       {
    //       }
    //   })
      this.storage.get("loginIndex").then(res => {
        this.loginIndex = res
        // if(this.loginIndex==2){//发版改成1
          this.need_show_first = true
          this.firstRoot= 'FirstShowPage';
          this.need_show_me = false
          this.need_show_gongdan = false
        // }
      })
  }

  ionViewDidLoad() {
    
   
  //  this.navCtrl.parent.select(1);   
  }

}
