import { WriteJournalService } from './writejournalService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Utils } from '../../../providers/Utils';

/**
 * Generated class for the JournalSheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-journal-sheet',
  templateUrl: 'journal-sheet.html',
  providers: [WriteJournalService],
})
export class JournalSheetPage {
  isWrite = true;
  isLook = false;
  writeImg;
  lookImg;
  num;
  user_id;
  title = '写日志';
  team_id
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,
              public writejournalService: WriteJournalService,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalSheetPage');
    this.writeImg = "assets/img/journal_sheet/write_logcolor.png"
    this.lookImg = "assets/img/journal_sheet/look_log.png"
  }



  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
      this.team_id = res.result.res_data.team.team_id;
      let body = {
        today: true,
        num: true,
        todayTime: Utils.dateFormat(new Date(), 'yyyy-MM-dd'),
        uid: this.user_id,
        team_id: this.team_id
    }
    this.writejournalService.get_visit_list(body).then(res =>{
      if(res.result.res_code==1 && res.result){
        console.log(res)
        this.num = res.result.res_data.num
      }
    })
    });
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  visit(){
    this.navCtrl.push('WriteJournalPage')
  }

  chooseWrite(){
      this.isWrite = true
      this.isLook = false
      this.writeImg = "assets/img/journal_sheet/write_logcolor.png"
      this.lookImg = "assets/img/journal_sheet/look_log.png"
      this.title = '写日志'
  }

  chooseLook(){
    this.isWrite = false
    this.isLook = true
    this.writeImg = "assets/img/journal_sheet/write_log.png"
    this.lookImg = "assets/img/journal_sheet/look_logcolor.png"
    this.title = '看日志'
  }

  get_visit_list(){
    this.navCtrl.push("VisitListPage")
  }
}
