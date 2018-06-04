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
  num = 0;
  user_id;
  title = '写日志';
  team_id;
  team: any;
  admin = false;
  manager = false;
  team_list = [];
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
      if(res.result.res_data.team){
        this.team_id = res.result.res_data.team.team_id;
        this.getStartList()
      }
      for(let product of res.result.res_data.groups){
        if (product.name == "group_sale_manager"){
          this.admin = true
          this.getStartList()
          break;
        }
        if(product.name == "group_sale_salesman_all_leads"){
          this.manager = true
          this.writejournalService.get_sale_team(this.user_id).then(res =>{
            if(res.result.res_code==1 && res.result){
              console.log(res)
              var list = res.result.res_data
              var length = list.length;
              for (var i=0; i < length; i++) {
                this.team_list[i] = list[i].team_id
                }
                this.getStartList();
            }
           }
          )
        }
      }
    });
  }

  //获取数目
  getStartList(){
    let body = {
      today: true,
      num: true,
      todayTime: Utils.dateFormat(new Date(), 'yyyy-MM-dd'),
      uid: this.user_id,
      team_id: this.team_id,
      admin: this.admin,
      manager: this.manager,
      team_list: this.team_list
  }
  this.writejournalService.get_visit_list(body).then(res =>{
    if(res.result.res_code==1 && res.result){
      console.log(res)
      this.num = res.result.res_data.num
    }
  })
  }
  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  visit(){
    this.navCtrl.push('WriteJournalPage')
    // this.navCtrl.push('WriteJournalPage',{team: this.team})
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
