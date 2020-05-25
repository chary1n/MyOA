import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, Events, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DailyReportMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-report-menu',
  templateUrl: 'daily-report-menu.html',
})
export class DailyReportMenuPage {
  quick_type = 'month'
  start_date
  end_date

  root = 'DailyReportPage';

  employee_type = ''
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public menu: MenuController,
    public event: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportMenuPage');
    this.event.subscribe('popNavCtrlReport', (data) => {
      if (data.data == true) {
        this.navCtrl.pop()
        this.event.unsubscribe('popNavCtrlReport')
      }
    })
  }

  closeMenu() {
    console.log('closeMenu')
  }

  openMenu() {
  }

  dragMenu() {
    console.log('拖菜单')
  }
  
  goBack() {
    this.navCtrl.pop()
  }

  click_week() {
    this.quick_type = 'week'
  }

  click_month() {
    this.quick_type = 'month'
  }

  changeStartDate(event) {
    this.start_date = event
  }

  changeEndDate(event) {
    this.end_date = event
  }

  reset() {
    this.quick_type = ''
    this.end_date = ''
    this.start_date = ''
    this.employee_type = ''
  }

  confirm() {
    this.menu.close()
    this.event.publish('search_domain_report', {
      quick_type: this.quick_type,
      start_date: this.start_date,
      end_date: this.end_date,
      employee_type: this.employee_type
    })
  }

  click_syq() {
    this.employee_type = 'syq'
  }
}
