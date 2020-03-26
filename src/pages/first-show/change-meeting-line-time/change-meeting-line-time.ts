import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { DatePipe } from '@angular/common';
import { FirstShowService } from './../first_service';
/**
 * Generated class for the ChangeMeetingLineTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-meeting-line-time',
  templateUrl: 'change-meeting-line-time.html',
  providers: [DatePipe, FirstShowService],
})
export class ChangeMeetingLineTimePage {
  frontPage
  meeting_line_id
  rt_is_sure_time
  allday
  start_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  stop_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  default_start_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
  default_stop_datetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
  start_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  stop_datetime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  remark
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams, public datePipe: DatePipe,
    public firService: FirstShowService, public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.uid = this.navParams.get('uid')
    this.meeting_line_id = this.navParams.get('meeting_line_id')
    this.rt_is_sure_time = this.navParams.get('rt_is_sure_time')
    this.allday = this.navParams.get('allday')
    this.start_date = this.navParams.get('start_date')
    this.stop_date = this.navParams.get('stop_date')
    this.default_start_datetime = this.navParams.get('default_start_datetime')
    this.default_stop_datetime = this.navParams.get('default_stop_datetime')
    if (this.allday){
      this.start_date = this.start_date.split(' ')[0]
      this.stop_date = this.stop_date.split(' ')[0]
    }
    setTimeout(() => {
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeMeetingLineTimePage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  //时间待定的按钮
  notSureClick() {
    if (this.rt_is_sure_time && this.allday) {
      this.allday = false
    }
    setTimeout(() => {
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)
  }

  //全天的按钮
  allDayClick() {
    if (this.rt_is_sure_time && this.allday) {
      this.rt_is_sure_time = false
    }
    setTimeout(() => {
      if (this.allday) {
        this.click_end_date()
        this.click_start_date()
      }
      else {
        this.click_end_datetime()
        this.click_start_datetime()
      }
    }, 100)

  }

  click_start_datetime() {
    var that = this
    $('#input_start_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
      onSet: function (event, inst) {
        // console.log(event)
        that.default_start_datetime = event.valueText
        if (that.default_start_datetime > that.default_stop_datetime) {
          that.default_stop_datetime = event.valueText
          setTimeout(() => {
            that.click_end_datetime()
          }, 10)
        }
      },
    });
  }

  click_start_date() {
    var that = this
    $('#input_start_date').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      onSet: function (event, inst) {
        // console.log(event)
        that.start_date = event.valueText
        if (that.start_date > that.stop_date) {
          that.stop_date = event.valueText
          setTimeout(() => {
            that.click_end_date()
          }, 10)
        }
      },
    });
  }

  click_end_datetime() {
    var that = this
    $('#input_end_datetime').mobiscroll().datetime({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      timeWheels: 'HH ii',
      onSet: function (event, inst) {
        that.default_stop_datetime = event.valueText
      }
    });
  }

  click_end_date() {
    var that = this
    $('#input_end_date').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      onSet: function (event, inst) {
        that.stop_date = event.valueText
      }
    });
  }

  change_time(){
    let body = {
      'uid': this.uid,
      'test_test_id': this.meeting_line_id,
      'rt_is_sure_time': this.rt_is_sure_time,
      'allday': this.allday,
      'rt_task_remark': this.remark,
    }
    if (!this.rt_is_sure_time) {
      if (this.allday) {
        this.start_date = (<HTMLInputElement>document.getElementById('input_start_date')).value
        this.stop_date = (<HTMLInputElement>document.getElementById('input_end_date')).value
      }
      else {
        this.start_datetime = (<HTMLInputElement>document.getElementById('input_start_datetime')).value
        this.stop_datetime = (<HTMLInputElement>document.getElementById('input_end_datetime')).value
      }
    }
    if (this.allday == true && this.start_date != '' && this.stop_date != '' && this.start_date && this.stop_date) {
      console.log('start = ' + this.start_date + '  stop = ' + this.stop_date)
      // this.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss')
      // this.stop_date = this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss')
      if (this.start_date > this.stop_date) {
        Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
        return
      }
      body['start_date'] = this.start_date
      body['stop_date'] = this.stop_date
      // body['start'] = this.start_date
      // body['stop'] = this.stop_date
    } else {
      if (this.rt_is_sure_time == true) {
        // body['start_datetime'] = this.datePipe.transform(this.start_date, 'yyyy-MM-dd HH:mm:ss')
        // body['stop_datetime'] = this.datePipe.transform(this.stop_date, 'yyyy-MM-dd HH:mm:ss')
      } else {
        if (this.start_datetime != '' && this.stop_datetime != '' && this.start_datetime && this.stop_datetime) {

            if (this.start_datetime > this.stop_datetime) {
              Utils.toastButtom('开始时间不能大于结束时间！', this.toastCtrl)
              return
            }

            this.start_datetime = this.spec_format(new Date(new Date(this.start_datetime.replace(/-/g, "/")).getTime() - 1 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')
            this.stop_datetime = this.spec_format(new Date(new Date(this.stop_datetime.replace(/-/g, "/")).getTime() - 1 * 8 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss')

          body['start_datetime'] = this.start_datetime
          body['stop_datetime'] = this.stop_datetime
          // body['start'] = this.start_datetime
          // body['stop'] = this.stop_datetime
        }
      }
    }

    this.firService.change_time(body).then(res => {
      if (res.result.res_code == 1){
        this.navCtrl.pop()
      }
    })
  }

  spec_format(data, fmt) {
    var o = {
      "M+": data.getMonth() + 1,
      "d+": data.getDate(),
      "H+": data.getHours(),
      "m+": data.getMinutes(),
      "s+": data.getSeconds(),
      "S+": data.getMilliseconds()
    };
    //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
    if (/(y+)/.test(fmt)) {
      //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
      fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
      }
    }
    return fmt;

  }

}
