import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SalaryService } from '../../salaryService';

/**
 * Generated class for the ApplyNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-new',
  templateUrl: 'apply-new.html',
  providers: [SalaryService]
})
export class ApplyNewPage {
  YearList;
  year;
  name;
  department;
  children;
  continue;
  big;
  house_tax;
  house;
  old_person;
  total = 0;
  user_id;
  id;
  data;
  extras;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public toast: ToastController, public alertCtrl: AlertController,
    public salaryService: SalaryService
  ) {
    var yearlist = []
    for (let i = 0; i < 20; i++) {
      yearlist.push(2018 + i)
    }
    this.YearList = yearlist

    this.storage.get('user')
      .then(res => {
        if (res) {
          var user = res.result.res_data
          console.log(user)
          this.name = user.name
          this.department = user.department
          this.user_id = user.user_id
        }
      });

    this.id = this.navParams.get('id')
    if (this.id) {
      this.salaryService.get_detail(this.id).then(res => {
        if (res.result.res_data) {
          this.data = res.result.res_data
          this.year = this.data.rt_show_year.substr(0, this.data.rt_show_year.length - 1)
          this.extras = this.data.extras
          this.total = this.data.rt_total
          this.set_by_string()
        }
      })
    } else {
      this.year = new Date().getFullYear()
    }
  }


  set_by_string() {
    for (let i = 0; i < this.extras.length; i++) {
      if (this.extras[i].name == '子女教育') {
        this.children = this.extras[i].detail
      } else if (this.extras[i].name == '继续教育') {
        this.continue = this.extras[i].detail
      } else if (this.extras[i].name == '大病医疗') {
        this.big = this.extras[i].detail
      } else if (this.extras[i].name == '住房贷款利息') {
        this.house_tax = this.extras[i].detail
      } else if (this.extras[i].name == '住房租金') {
        this.house = this.extras[i].detail
      } else if (this.extras[i].name == '赡养老人') {
        this.old_person = this.extras[i].detail
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyNewPage');
    let self = this
    $(".input_number").bind("input propertychange", function (event) {
      self.total = parseFloat(self.children ? self.children : 0)
        + parseFloat(self.continue ? self.continue : 0)
        + parseFloat(self.big ? self.big : 0)
        + parseFloat(self.house_tax ? self.house_tax : 0)
        + parseFloat(self.house ? self.house : 0)
        + parseFloat(self.old_person ? self.old_person : 0);
    });
  }


  get_total(children, continues, big, house_tax, house, old_person) {
    this.total = children + continues + big + house_tax + house + old_person
  }


  save() {
    if (this.children < 0 || this.continue < 0 || this.big < 0 || this.house_tax < 0 || this.house < 0 || this.old_person < 0) {
      Utils.toastButtom('填写金额不能小于0', this.toast)
      return
    }
    if (this.total <= 0) {
      Utils.toastButtom('请填写扣除金额', this.toast)
      return
    }
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "保存后将提交财务验证，确定保存？",
      buttons: [{
        text: '取消',
        handler: data => {
        }
      },
      {
        text: '确定',
        handler: data => {
          this.salaryService.create(this.user_id, this.year + '-01-01', this.children,
            this.continue, this.big, this.house_tax, this.house, this.old_person, this.total, this.id).then(res => {
              if (res.result.res_data) {
                Utils.toastButtom('保存成功', this.toast)
                this.navCtrl.pop()
              }
            })
        }
      }]
    }).present()

  }
  goBack() {
    let ctrl = this.alertCtrl
    ctrl.create({
      title: '提示',
      message: "已输入内容,是否确认返回?",
      buttons: [{
        text: '取消',
        handler: data => {
        }
      },
      {
        text: '确定',
        handler: data => {
          this.navCtrl.pop()
        }
      }]
    }).present()

  }

}
