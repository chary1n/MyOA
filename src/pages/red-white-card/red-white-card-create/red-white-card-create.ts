import { NavParams } from 'ionic-angular/navigation/nav-params';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { RedWhiteService} from './../redwhiteService'
import { AlertController, ToastController } from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { DatePipe } from '@angular/common';
import 'jquery'
declare var $: any;
/**
 * Generated class for the RedWhiteCardCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-red-white-card-create',
  templateUrl: 'red-white-card-create.html',
  providers: [RedWhiteService, DatePipe],
})
export class RedWhiteCardCreatePage {
  @ViewChild('employee_input') employee_input;
  user_id
  date
  type_arr = [{
    'value': 'red',
    'text': '赞'
  },{
    'value': 'white',
    'text': '踩'
  }]
  type
  remark
  factor = 1
  select_employee_name
  select_employee_id
  checked_red:''
  checked_white:''
  employee_name

  is_select_employee
  search_employees
  constructor(public navCtrl: NavController, public navParams: NavParams, public redWhiteService: RedWhiteService,
    public toastCtrl: ToastController, public datePipe: DatePipe) {
      this.user_id = this.navParams.get('user_id')
      this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      this.is_select_employee = false
      this.search_employees = []
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedWhiteCardCreatePage');
    this.click_date()
  }

  ionViewWillEnter() {
    if (this.navParams.get('select_employee') == true) {
      this.select_employee_name = this.navParams.get('select_employee_name')
      this.select_employee_id = this.navParams.get('select_employee_id')
      this.navParams.data.select_employee = false;
    } 
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_date() {
    var that = this
    $('#time_input').mobiscroll().date({
      theme: 'ios',
      lang: 'zh',
      display: 'bottom',
      dateWheels: '|M d D|',
      onSet: function (event, inst) {
        that.date = event.valueText
      }
    });
  }

  choose_employee() {
    // this.navCtrl.push('ContactPersonPage', {
    //   is_select_employee_enter: true,
    // })
    this.is_select_employee = true
    setTimeout(() => {
      this.employee_input.setFocus();//输入框获取焦点
    },15)
  }


  save() {
    // var is_check_red = document.getElementById('redcard')['checked']
    // var is_check_white = document.getElementById('whitecard')['checked']
    // if (is_check_red) {
    //   this.type = 'red'
    // }
    // if (is_check_white) {
    //   this.type = 'white'
    // }
    if (this.type && this.remark && this.factor && this.date && this.select_employee_name){
      var body = {
        'user_id': this.user_id,
        'type': this.type,
        'remark': this.remark,
        'factor': this.factor,
        'select_employee_id': this.select_employee_id,
        'action_type': 'save',
        'date': this.date,
        'select_employee_name': this.select_employee_name
      }
      this.redWhiteService.create_card(body).then(res => {
        if (res.result.res_code == 1){
          Utils.toastButtom('操作成功', this.toastCtrl)
          this.navCtrl.pop()
        }
      })
    }
    else {
      Utils.toastButtom('请完善信息', this.toastCtrl)
    }
   
  }

  submit() {
    // var is_check_red = document.getElementById('redcard')['checked']
    // var is_check_white = document.getElementById('whitecard')['checked']
    // if (is_check_red) {
    //   this.type = 'red'
    // }
    // if (is_check_white) {
    //   this.type = 'white'
    // }
    if (this.type && this.remark && this.factor && this.date && this.select_employee_name){
      var body = {
        'user_id': this.user_id,
        'type': this.type,
        'remark': this.remark,
        'factor': this.factor,
        'select_employee_id': this.select_employee_id,
        'action_type': 'submit',
        'date': this.date,
        'select_employee_name': this.select_employee_name
      }
      this.redWhiteService.create_card(body).then(res => {
        if (res.result.res_code == 1){
          Utils.toastButtom('操作成功', this.toastCtrl)
          this.navCtrl.pop()
        }
      })
    }
    else {
      Utils.toastButtom('请完善信息', this.toastCtrl)
    }
  }

  employee_name_change (){
    this.select_employee_id = false
    this.search_employees = []
    if (this.select_employee_name != ''){
      this.redWhiteService.search_employee_by_name({'name': this.select_employee_name}).then(res => {
        if (res.result.res_code == 1 && res.result.res_data){
          this.search_employees = res.result.res_data
        }
      })
    }
    
  }

  employee_name_blur (){
    setTimeout(() => {
      this.is_select_employee = false
    }, 100)
  }

  click_select_employee(item_employee) {
    this.select_employee_name = item_employee.employee_name
    this.select_employee_id = item_employee.employee_id
  }

  employee_name_focus() {
    this.is_select_employee = true
  }

  click_red_card() {
    // document.getElementById('redcard')['checked'] = true
    this.type = 'red'
  }

  click_white_card() {
    this.type = 'white'
    // document.getElementById('whitecard')['checked'] = true
  }
}
