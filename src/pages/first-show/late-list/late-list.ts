import { FirstShowService } from './../first_service';
import { Utils } from './../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-late-list',
  templateUrl: 'late-list.html',
  providers: [FirstShowService]
})
export class LateListPage {
  item;
  frontPage:any;
  uid
  me_type
  event_type_id
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusBar:StatusBar,
              public firService: FirstShowService, public storage:Storage) {
      this.frontPage = Utils.getViewController("FirstShowPage", navCtrl)
      this.me_type = this.navParams.get('me_type')
      this.event_type_id = this.navParams.get('event_type_id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LateListPage');
  }

  goBack(){
    this.frontPage.data.need_fresh = true;
    this.navCtrl.pop()
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user').then(res => {
      this.uid = res.result.res_data.user_id
      let body = {
        'uid': res.result.res_data.user_id,
        'me_type': this.me_type,
        'event_type_id': this.event_type_id,
      }
      this.firService.get_late_list(body).then(res =>{
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data.late
          if(this.item && this.item.length==0){
            this.navCtrl.pop()
          }
        }
      })
    })
  }

  toDetail(sub){
    if (sub.type_name == '项目') {
            this.navCtrl.push('MeetingProjectPage', {
                'meeting_id': sub.rt_meeeting_s_id,
                'isEdit': false,
                'uid': this.uid,
                'frontPage': 'AllSchedulePage'
            })
        }
        else {
            if (sub.type_name == '会议') {
                this.navCtrl.push('MeetingPage', {
                    'meeting_id': sub.rt_meeeting_s_id,
                    'isEdit': false,
                    'uid': this.uid,
                    'frontPage': 'AllSchedulePage',
                })
            } else {
                this.navCtrl.push('CalendarDeatilpagePage', {
                    'item': sub,
                    'isEdit': false,
                    'frontPage': 'AllSchedulePage',
                })
            }
        }
  }
}
