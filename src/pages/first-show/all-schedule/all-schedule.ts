import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the AllSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-schedule',
  templateUrl: 'all-schedule.html',
  providers: [FirstShowService]
})
export class AllSchedulePage {
  uid
  dataList=[]
  type_list=[]
  meeting_id
  constructor(public navCtrl: NavController, public navParams: NavParams, private firshowService: FirstShowService,
              public storage:Storage,public statusBar:StatusBar) {
                this.storage.get('user').then(res => {
                  this.uid = res.result.res_data.user_id;
                  let body = {
                    'uid': this.uid
                  }
                  this.firshowService.get_all_schedule(body).then(res=>{
                    if (res.result.res_data && res.result.res_code == 1) {
                        this.dataList = res.result.res_data.data
                        this.meeting_id = res.result.res_data.meeting_id
                        for (let i = 0; i < this.dataList.length; i++) {
                          if(this.dataList[i].id==-1){
                            this.type_list = this.dataList[i].dataList
                          }
                        }
                    }
                  })
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllSchedulePage');
  }

    goBack(){
      this.navCtrl.pop()
    }
  
    ionViewWillEnter(){
      this.statusBar.backgroundColorByHexString("#2597ec");
      this.statusBar.styleLightContent();
  }

  selectType(item){
    item.select = true
    for (let i = 0; i < this.dataList.length; i++) {
      if(this.dataList[i].id!=item.id){
        this.dataList[i].select = false
      }
    }
    this.type_list = item.dataList
  }

  toDetail(item){
    if(this.meeting_id==item.id){
      this.navCtrl.push('MeetingPage',{
        'meeting_id': item.rt_meeeting_s_id,
        'isEdit': false,
        'uid': this.uid
      })
    }else{
      this.navCtrl.push('CalendarDeatilpagePage',{
        'item': item,
        'isEdit': false
      })
    }
  }
}
