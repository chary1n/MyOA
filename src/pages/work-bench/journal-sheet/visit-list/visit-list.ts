import { WriteJournalService } from './../writejournalService';
import { Utils } from './../../../../providers/Utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the VisitListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-visit-list',
  templateUrl: 'visit-list.html',
  providers: [WriteJournalService]
})
export class VisitListPage {
  startDate_visit;
  endDate_visit;
  user_id;
  saleTeam;
  dataList = [];
  isMine = false;
  visit_date_begin;//为了显示用
  visit_date_end;
  showTime;
  // person = '我的';
  team_id;
  team_list = [];
  teamGroup: any;
  person_id;
  isShowNull = false;
  admin = false
  manager = false
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public statusBar:StatusBar, 
    private datePicker: DatePicker,
    public storage: Storage,
    public writejournalService: WriteJournalService,
    private toastCtrl: ToastController) {
    this.person_id=-1
    this.startDate_visit = Utils.dateFormat(new Date(), 'yyyy-MM-dd')
    this.endDate_visit = Utils.dateFormat(new Date(), 'yyyy-MM-dd')

    this.storage.get('user')
    .then(res => {
      this.user_id = res.result.res_data.user_id;
      if(res.result.res_data.team){
        this.saleTeam = res.result.res_data.team.team_name;
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
      //请求team成员
        let body = {
          team_id: this.team_id
        }
        this.writejournalService.get_saleteam_person(body).then(res =>{
          if(res.result.res_code==1 && res.result){
            console.log(res)
            this.teamGroup = res.result.res_data
          }
        })
    });
  }

  //初始请求
  getStartList(){
      let bodyone = {
        today: true,
        todayTime: Utils.dateFormat(new Date(), 'yyyy-MM-dd'),
        uid: this.user_id,
        team_id: this.team_id,
        admin: this.admin,
        manager: this.manager,
        team_list: this.team_list
      }
      this.writejournalService.get_visit_list(bodyone).then(res =>{
        if(res.result.res_code==1 && res.result){
          console.log(res)
          this.dataList = res.result.res_data
        }
      })
  }
  ionViewDidEnter() {
    console.log('visit   person_id = '+this.navParams.get('person_id'))
    console.log('visit   team_id = '+this.navParams.get('team_id'))
    if(this.navParams.get('person_id') || this.navParams.get('team_id')){
      this.admin = false
      this.manager = false
      this.person_id = this.navParams.get('person_id')
      this.team_id = this.navParams.get('team_id')
      this.navParams.data.person_id = false;
      this.navParams.data.team_id = false;
      this.getList()
    }
  }
  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }
  getList(){
    this.dataList = []
    let body;
    if(this.person_id==-1){
      body = {
        startTime: Utils.dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
        endTime: Utils.dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
        uid: this.user_id,
        team_id: this.team_id,
        admin: this.admin,
        manager: this.manager,
        team_list: this.team_list
      }
    }else{
      body = {
        mine: true,
        startTime: Utils.dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
        endTime: Utils.dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
        uid: this.person_id,
        team_id: this.team_id,
        admin: this.admin,
        manager: this.manager,
        team_list: this.team_list
      }
    }
      this.writejournalService.get_visit_list(body).then(res =>{
        if(res.result.res_code==1 && res.result){
          console.log(res)
          this.dataList = res.result.res_data
        }
      })
  }
  
  getTime(startT, endT){
    // return Utils.dateFormat(new Date(startT), 'yyyy-MM-dd HH:mm')+" ~ "+Utils.dateFormat(new Date(endT), 'HH:mm')
    return startT + "~" + endT.split(" ")[1]
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitListPage');
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  //筛选
  clickMenu(){
      this.navCtrl.push('VisitBiaoqianPage', {  
        item: this.teamGroup,
        team_id: this.team_id
      })
  }


  chooseStartDate_visit(){
    this.datePicker.show({
      date: new Date(this.startDate_visit),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (this.endDate_visit >= Utils.dateFormat(new Date(date), 'yyyy-MM-dd')) {
          this.startDate_visit = Utils.dateFormat(new Date(date), 'yyyy-MM-dd')
          this.dateChanged()
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  chooseEndDate_visit(){
    this.datePicker.show({
      date: new Date(this.endDate_visit),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      cancelButtonLabel: "取消",
      cancelText: "取消",
      doneButtonLabel: "确定",
      locale: "zh-Hans",
    }).then(
      date => {
        if (Utils.dateFormat(new Date(date), 'yyyy-MM-dd') >= this.startDate_visit) {
          this.endDate_visit = Utils.dateFormat(new Date(date), 'yyyy-MM-dd')
          this.dateChanged()
        } else {
          Utils.toastButtom("请选择正确的日期", this.toastCtrl)
        }
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  //日期更改后刷新数据
  dateChanged() {
    let body;
    if(this.person_id==-1){
      body = {
        startTime: Utils.dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
        endTime: Utils.dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
        uid: this.user_id,
        team_id: this.team_id,
        admin: this.admin,
        manager: this.manager,
        team_list: this.team_list
      }
    }else{
      body = {
        mine: true,
        startTime: Utils.dateFormat(new Date(this.startDate_visit), 'yyyy-MM-dd'),
        endTime: Utils.dateFormat(new Date(this.endDate_visit), 'yyyy-MM-dd'),
        uid: this.person_id,
        team_id: this.team_id,
        admin: this.admin,
        manager: this.manager,
        team_list: this.team_list
      }
    }
    this.writejournalService.get_visit_list(body).then(res =>{
      if(res.result.res_code==1 && res.result){
        console.log(res)
        this.dataList = res.result.res_data
      }
    })
  }


  visitDetail(item){
    this.navCtrl.push('VisitDetailPage', {
      item: item
    })
  }
}
