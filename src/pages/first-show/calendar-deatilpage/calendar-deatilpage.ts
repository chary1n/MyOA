import { Utils } from './../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { FirstShowService } from './../first_service';
import { Component , ViewChild} from '@angular/core';
import { IonicPage , NavController, NavParams, Content} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Generated class for the CalendarDeatilpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calendar-deatilpage',
  templateUrl: 'calendar-deatilpage.html',
  providers: [FirstShowService,DatePipe]
})
export class CalendarDeatilpagePage {
  @ViewChild(Content) content: Content;
  item;
  // recurrency=''//重复name
  // recurrency_id=''//重复id
  uid
  isEdit = false//是否是编辑状态
  not_sure_time = false
  allDay = true
  type_name=''//类型名字
  type_id//类型id
  need_fresh = false;
  event_time=''
  alarm_id='-1' //提醒
  alarm_name='不提醒'//提醒名称
  selectList=[] //参与者的列表
  type_app = false//app提醒
  type_notification = false//网页提醒
  partner_id_s_id//负责人id
  partner_id_s_name//负责人name
  subject//主题
  start_datetime = new Date(new Date().getTime()+8*60*60*1000).toISOString();
  stop_datetime = new Date(new Date().getTime()+8*60*60*1000).toISOString();
  start_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  stop_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  location=''//地点
  description=''//内容
  change = false//从查看到编辑状态为true
  user;
  frontPage:any;
  wait_id = ''
  pet=0//跳转返回值的类型
  item_start
  item_stop
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,
              public firService: FirstShowService, public storage:Storage,public toastCtrl: ToastController,
              private datePipe: DatePipe,private sanitizer: DomSanitizer) {
                this.frontPage = Utils.getViewController("FirstShowPage", navCtrl)
                this.isEdit = this.navParams.get('isEdit')
                this.storage.get('user').then(res =>{
                  this.user = res.result.res_data
                  this.uid = res.result.res_data.user_id;
                  if(this.isEdit==true){
                  let current_day = new Date()
                  current_day = this.navParams.get('date')
                  this.partner_id_s_id = res.result.res_data.partner_id
                  this.partner_id_s_name = res.result.res_data.partner_name
                  this.selectList.push({
                      'partner_id': this.partner_id_s_id,
                      'partner_name': this.partner_id_s_name,
                      'ischeck': true
                    })
                  this.start_datetime = new Date(current_day.getTime()+8*60*60*1000).toISOString();
                  this.stop_datetime = new Date(current_day.getTime()+8*60*60*1000).toISOString();
                  this.start_date = this.datePipe.transform(current_day, 'yyyy-MM-dd')
                  this.stop_date = this.datePipe.transform(current_day, 'yyyy-MM-dd')
                  }
                })
                if(this.isEdit==false){
                  this.item = this.navParams.get('item');
                  this.wait_id = this.item.id
                  this.selectList = this.item.partner_ids
                  this.alarm_id = this.item.rt_alarm_type
                  this.alarm_name = this.item.rt_alarm_type_name
                  if(this.item.allday && this.item.start && this.item.stop){
                    this.item_start = this.datePipe.transform(this.item.start, 'yyyy-MM-dd')
                    this.item_stop = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd')
                  }else if(this.item.start && this.item.stop){
                    this.item_start = this.datePipe.transform(this.item.start, 'yyyy-MM-dd HH:mm')
                    this.item_stop = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd HH:mm')
                  }
                  this.description = this.item.description.replace(/\n/g,"<br>")
                }
  }

  assembleHTML(str){ 
    　　return this.sanitizer.bypassSecurityTrustHtml(str)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarDeatilpagePage');
  }

  goBack(){
    this.frontPage.data.need_fresh = true;
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
    this.need_fresh =this.navParams.get('need_fresh')
    this.pet = this.navParams.get('pet')
    if(this.need_fresh==true){
      if(this.pet==1){
        this.alarm_id = this.navParams.get('alarm_id')
        this.alarm_name = this.navParams.get('alarm_name')
        this.type_app = this.navParams.get('type_app')
        this.type_notification = this.navParams.get('type_notification')
      }else if(this.pet==2){
        this.item = this.navParams.get('item')
      }else if(this.pet==3){
        this.selectList = this.navParams.get('selectList')
      }else if(this.pet==4){
        this.type_name = this.navParams.get('type_name')
        this.type_id = this.navParams.get('type_id')
      }else if(this.pet==5){
        this.partner_id_s_id = this.navParams.get('partner_id_s_id')
        this.partner_id_s_name = this.navParams.get('partner_id_s_name')
        if(!this.selectList || this.selectList.length<=0){
          return
        }
        let plus = false
        for(let i=0;i<this.selectList.length;i++){
          if(this.selectList[i].partner_id==this.partner_id_s_id){
            plus = false
            break
          }else{
            plus = true
          }
        }
        if(plus){
          this.selectList.push({
            'partner_id': this.partner_id_s_id,
            'partner_name': this.partner_id_s_name,
            'ischeck': true
          })
        }
      }
      // this.recurrency = this.navParams.get('recurrency')
      // this.recurrency_id = this.navParams.get('recurrency_id')
    }
  }

  //删除一个待办事项
  delete(){
    if(this.user.partner_id==this.item.partner_id_s.partner_id_s_id || this.uid==this.item.create_uid){
      let body = {
        'id': this.item.id,
        'uid': this.uid
    }
    this.firService.delete_res_model(body).then(res => {
      if (res.result.res_code == 1) {
        this.navCtrl.pop();
      }
    })
    }else{
      Utils.toastButtom('只有负责人和创建人可以删除', this.toastCtrl)
    }
  }
  //编辑状态下取消
  changeCancel(){
    this.isEdit = false
    this.change = false
    this.content.resize()
  }
  //编辑状态下完成
  changeFinish(){
    let body = this.handleData()
    body['wait_id'] = this.item.id
    this.firService.write_wait_thing(body).then(res =>{
      if (res.result.res_data && res.result.res_code == 1) {
        this.isEdit = false
        this.change = false
        this.content.resize()
        this.item = res.result.res_data
        this.description = this.item.description.replace(/\n/g,"<br>")
      }
    })
  }
  //编辑
  edit(){
    this.content.resize()
    if(this.item.state==false){
      Utils.toastButtom('完成状态不可编辑', this.toastCtrl)
      return
    }
    if(this.user.partner_id==this.item.partner_id_s.partner_id_s_id ||  this.uid==this.item.create_uid){
      this.isEdit = true
      this.change = true
      this.type_name = this.item.type_name
      this.allDay = this.item.allday
      this.partner_id_s_name = this.item.partner_id_s.partner_id_s_name
      this.partner_id_s_id = this.item.partner_id_s.partner_id_s_id
      this.not_sure_time = this.item.rt_is_sure_time
      this.subject = this.item.subject
      this.type_name = this.item.type_name
      this.type_id = this.item.type_id
      if(this.not_sure_time==true){
        
      }else{
          this.start_date = this.datePipe.transform(this.item.start, 'yyyy-MM-dd')
          this.stop_date = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd')
          this.start_datetime = this.datePipe.transform(this.item.start, 'yyyy-MM-dd HH:mm').replace(' ','T')+'Z'
          this.stop_datetime = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd HH:mm').replace(' ','T')+'Z'
      }
      this.location = this.item.location
      this.description = this.item.description
    }else{
      Utils.toastButtom('只有负责人和创建人可以编辑', this.toastCtrl)
    }
  }
  //取消新建待办事项
  cancel(){
    this.navCtrl.pop();
  }
  //新建待办事项完成
  stateFinish(){
    let body = this.handleData() 
    if(body){
      this.firService.create_new_schedule(body).then(res =>{
        if (res.result.res_code == 1) {
          this.frontPage.data.need_fresh = true;
          this.navCtrl.popTo(this.frontPage);
        }
      })
    }
  }
  //标记为待办
  completion_event(){
    this.type_name = this.item.type_name
      this.allDay = this.item.allday
      this.partner_id_s_id = this.item.partner_id_s.partner_id_s_id
      this.not_sure_time = this.item.rt_is_sure_time
      this.subject = this.item.subject
      this.type_id = this.item.type_id
      if(this.not_sure_time==true){
        
      }else{
        if(this.allDay==true){
          this.start_date = this.datePipe.transform(this.item.start, 'yyyy-MM-dd')
          this.stop_date = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd')
          console.log('this.start_date = '+this.start_date)
        }else{
          this.start_datetime = this.datePipe.transform(this.item.start, 'yyyy-MM-dd HH:mm').replace(' ','T')+'Z'
          this.stop_datetime = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd HH:mm').replace(' ','T')+'Z'
          console.log('this.start_date = '+this.start_datetime)
        }
      }
      this.location = this.item.location
      this.description = this.item.description
    if(this.user.partner_id==this.item.partner_id_s.partner_id_s_id ||  this.uid==this.item.create_uid){
      let body = this.handleData()
      body['wait_id'] = this.item.id
      body['state'] = 'draft'
      this.firService.cancel_wait_thing(body).then(res =>{
        if (res.result.res_data && res.result.res_code == 1) {
          this.item = res.result.res_data
        }
      })
    }else{
      Utils.toastButtom('只有负责人和创建人可以标记为待办', this.toastCtrl)
    }
  }
  //标记完成
  finish(){
      this.type_name = this.item.type_name
      this.allDay = this.item.allday
      this.partner_id_s_id = this.item.partner_id_s.partner_id_s_id
      this.not_sure_time = this.item.rt_is_sure_time
      this.subject = this.item.subject
      this.type_id = this.item.type_id
      if(this.not_sure_time==true){
        
      }else{
        if(this.allDay==true){
          this.start_date = this.datePipe.transform(this.item.start, 'yyyy-MM-dd')
          this.stop_date = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd')
          console.log('this.start_date = '+this.start_date)
        }else{
          this.start_datetime = this.datePipe.transform(this.item.start, 'yyyy-MM-dd HH:mm')
          this.stop_datetime = this.datePipe.transform(this.item.stop, 'yyyy-MM-dd HH:mm')
          console.log('this.start_date = '+this.start_datetime)
        }
      }
      this.location = this.item.location
      this.description = this.item.description
    if(this.user.partner_id==this.item.partner_id_s.partner_id_s_id ||  this.uid==this.item.create_uid){
      let body = this.handleData()
      body['wait_id'] = this.item.id
      this.navCtrl.push('FinishScheulePage',{
        'body': body
      })
    }else{
      Utils.toastButtom('只有负责人和创建人可以标记完成', this.toastCtrl)
    }
  }

  //时间待定的按钮
  notSureClick(){
    if(this.not_sure_time && this.allDay){
      this.allDay = false
    }
  }

  //全天的按钮
  allDayClick(){
    if(this.not_sure_time && this.allDay){
      this.not_sure_time = false
    }
  }
  //获取所有的待办类型
  getType(){
    let body = {
      'uid':this.uid
    }
    this.firService.get_event_type(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.navCtrl.push('ListEventPage',{
          'item': res.result.res_data,
          'pet': 'type',
          'title': '类型'
        })
      }
    })
  }
  //选择参与人员
  selectPartner(){
    this.navCtrl.push('SelectPersonPage',{
      'type':1,
      'selectList': this.selectList
    })
  }
  //选择提醒
  selectTip(){
      this.navCtrl.push('TipPage',{
        'alarm_id': this.alarm_id,
        'alarm_name': this.alarm_name,
        'type_app': this.type_app,
        'type_notification': this.type_notification
      })
  }

  // selectRecurrency(){
  //   this.navCtrl.push('ListEventPage',{
  //     'item':[{'id':'0',
  //             'name': '永不'},{'id':'daily',
  //             'name': '每天'},{'id':'weekly',
  //             'name': '每周'},{'id':'monthly',
  //             'name': '每月'},{'id':'yearly',
  //             'name': '每年'}],
  //     'pet': 'recurrency',
  //     'title': '重复'
  //   })
  // }

  //选择负责人
  selectPartnerId(){
    this.navCtrl.push('SelectPersonPage',{
      'type': 2,
      'partner_id_s_id': this.partner_id_s_id
    })
  }
  //处理所有数据
  handleData(){
    let myString = ""
      if(!this.type_id){
        myString = "    请选择类型"
      }
      if(!this.subject){
        myString = "    请输入主题"
      }
      if(!this.selectList || this.selectList.length==0){
        myString = "    请选择参与人员"
      }
      if(myString != ""){
        Utils.toastButtom(myString, this.toastCtrl)
      }else{
        let partner_ids = []
        if(this.selectList && this.selectList.length>0){
          for(var i=0;i<this.selectList.length;i++){
            partner_ids[i] = this.selectList[i].partner_id
          }
        }
        if(!this.alarm_id){
            this.alarm_id = '-1'
        }
        let body = {}
        if(this.allDay==true && this.start_date!='' && this.stop_date!='' && this.start_date && this.stop_date){
          this.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss')
          this.stop_date = this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss')
          if(new Date(this.start_date.replace(/-/g, "/")).getTime() > new Date(this.stop_date.replace(/-/g, "/")).getTime()){
            Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
            return
          }
          body = {
            'uid': this.uid,
            'rt_is_sure_time': this.not_sure_time,
            'allday': this.allDay,
            'event_type_id': this.type_id,
            'subject_name': this.subject,
            'partner_ids': partner_ids,
            'start_date': this.start_date,
            'stop_date': this.stop_date,
            'start': this.start_date,
            'stop': this.stop_date,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'partner_id_s': this.partner_id_s_id,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type':'0',
        }
      }else{
        if(this.not_sure_time==true){
          body = {
            'uid': this.uid,
            'rt_is_sure_time': this.not_sure_time,
            'allday': this.allDay,
            'event_type_id': this.type_id,
            'subject_name': this.subject,
            'partner_ids': partner_ids,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'partner_id_s': this.partner_id_s_id,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type':'0',
            'start': this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss'),
            'stop': this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss'),
        }
        }else{
          if(this.start_datetime!='' && this.stop_datetime!='' && this.start_datetime && this.stop_datetime){
            this.start_datetime = this.datePipe.transform(new Date(new Date(this.start_datetime).getTime()-2*8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
            this.stop_datetime = this.datePipe.transform(new Date(new Date(this.stop_datetime).getTime()-2*8*60*60*1000), 'yyyy-MM-dd HH:mm:ss')
            if(new Date(this.start_datetime.replace(/-/g, "/")).getTime() > new Date(this.stop_datetime.replace(/-/g, "/")).getTime()){
              Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
              return
            }
          }
          body = {
            'uid': this.uid,
            'rt_is_sure_time': this.not_sure_time,
            'allday': this.allDay,
            'event_type_id': this.type_id,
            'subject_name': this.subject,
            'partner_ids': partner_ids,
            'start_datetime': this.start_datetime,
            'stop_datetime': this.stop_datetime,
            'start': this.start_datetime,
            'stop': this.stop_datetime,
            'rt_alarm_type': this.alarm_id,
            'location': this.location,
            'description': this.description,
            'partner_id_s': this.partner_id_s_id,
            'type_app': this.type_app,
            'type_notification': this.type_notification,
            'rt_recurrency_type':'0',
          }
        }
      }
      return body
    }
  }
}
