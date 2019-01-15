import { Utils } from './../../../providers/Utils';
import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


/**
 * Generated class for the FinishScheulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-finish-scheule',
  templateUrl: 'finish-scheule.html',
  providers: [FirstShowService,DatePipe]
})
export class FinishScheulePage {
  body;
  allDay = false
  start
  stop
  relly_start_time
  relly_stop_time
  frontPage
  item
  selectList = []

  remark
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar
             ,private datePipe: DatePipe,public firService: FirstShowService,public toastCtrl: ToastController,) {
      this.frontPage = Utils.getViewController("CalendarDeatilpagePage", navCtrl)
      this.body = this.navParams.get('body')
      this.start = this.datePipe.transform(new Date(new Date(this.body['start'].replace(/-/g, "/")).getTime()+2*8*60*60*1000), 'yyyy-MM-dd HH:mm')
      this.stop = this.datePipe.transform(new Date(new Date(this.body['stop'].replace(/-/g, "/")).getTime()+2*8*60*60*1000), 'yyyy-MM-dd HH:mm')
      this.relly_start_time = this.datePipe.transform(new Date(this.start.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ','T')+'Z';
      this.relly_stop_time = this.datePipe.transform(new Date(this.stop.replace(/-/g, "/")), 'yyyy-MM-dd HH:mm').replace(' ','T')+'Z';
      this.selectList = this.navParams.get('selectList')
      for (let i = 0; i < this.selectList.length; i++) {
        this.selectList[i]['score'] = 0
        this.selectList[i]['remark'] = ''
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishScheulePage');
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  finish(){
    // console.log('start = '+this.relly_start_time+'  stop = '+this.relly_stop_time)
    let startTime;
    let stopTime;
    if(this.relly_start_time.indexOf('T') != -1 ){
      startTime = new Date(this.relly_start_time).getTime()
    }else{
      startTime = new Date(this.relly_start_time.replace(/-/g, "/")).getTime()
    }
    if(this.relly_stop_time.indexOf('T') != -1){
      stopTime = new Date(this.relly_stop_time).getTime()
    }else{
      stopTime = new Date(this.relly_stop_time.replace(/-/g, "/")).getTime()
    }
    if(startTime > stopTime){
      Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
      return
    }
    let total_proportion = 0
    for (let i = 0; i < this.selectList.length; i++){
      total_proportion += parseFloat(this.selectList[i].score)
    }
    if (total_proportion != 100){
      Utils.toastButtom('占比总和需等于100%', this.toastCtrl)
      return
    }
    // console.log("过来了")
    if(this.relly_start_time.indexOf('T') != -1){
      this.relly_start_time = this.datePipe.transform(new Date(new Date(this.relly_start_time).getTime()-2*8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
    }else{
      this.relly_start_time = this.datePipe.transform(new Date(new Date(this.relly_start_time.replace(/-/g, "/")).getTime()-2*8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
    }
    if(this.relly_stop_time.indexOf('T') != -1){
      this.relly_stop_time = this.datePipe.transform(new Date(new Date(this.relly_stop_time).getTime()-2*8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
    }else{
      this.relly_stop_time = this.datePipe.transform(new Date(new Date(this.relly_stop_time.replace(/-/g, "/")).getTime()-2*8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
    }
    this.body['state'] = 'open'
    this.body['relly_start_time'] = this.relly_start_time
    this.body['relly_stop_time'] = this.relly_stop_time
    this.body['start'] = this.datePipe.transform(new Date(new Date(this.body['start'].replace(/-/g, "/")).getTime()+8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
    this.body['stop'] = this.datePipe.transform(new Date(new Date(this.body['stop'].replace(/-/g, "/")).getTime()+8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
    this.firService.write_wait_thing_new({'body':this.body,'data':{
      'selectList': this.selectList,
      'remark': this.remark
    }}).then(res =>{
      if (res.result.res_data && res.result.res_code == 1) {
        this.item = res.result.res_data
        this.frontPage.data.need_fresh = true;
        this.frontPage.data.item = this.item;
        this.frontPage.data.pet = 2;
        this.navCtrl.popTo(this.frontPage)
      }
    })
  }
}
