import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';


import { Events } from 'ionic-angular';
import { EmailService } from './emailService';

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
  providers: [EmailService]
})
export class EmailPage {
  limit = 20;
  offset = 0;
  user_id;
  email_list;
  isMoreData = true;
  account_id;
  email_type;
  state_type;
  data_id;
  title = '';
  unseenChoose;
  frontPageIsUnseen = false;
  accounts_list;
  constructor(public menu: MenuController, public alertCtrl: AlertController,
    public navCtrl: NavController, public event: Events, public emailService: EmailService, public storage: Storage) {
    storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.emailService.getAccountDetail(this.user_id).then(res => {
          console.log('push了')
          this.accounts_list = res.result.res_data
          this.event.publish('emailMenu', res.result.res_data)
          if (res.result.res_data) {
            this.account_id = res.result.res_data[0].id
            this.get_folder_label()
            this.get_email_list(this.account_id, 'state', 'all_received', '', 20, 0).then(res => {
              this.email_type = 'state'
              this.state_type = "all_received"
              this.data_id = ''
              if (res.result && res.result.res_data) {
                this.email_list = res.result.res_data.email_list
                this.title = res.result.res_data.title
              }
            })
          }
        })
      });
    this.event.subscribe('click_envnt', (account_id, email_type, state_type, data_id) => {
      console.log("接收了")
      this.account_id = account_id
      this.email_type = email_type
      this.state_type = state_type
      this.data_id = data_id
      this.isMoreData = true
      this.get_email_list(account_id, email_type, state_type, data_id, 20, 0).then(res => {
        this.limit = 20;
        this.offset = 0;
        this.email_list = res.result.res_data.email_list
        this.title = res.result.res_data.title
        if (state_type == 'unseen') {
          this.title = this.title + "·未读"
        }
      })
    });
  }


  ionViewDidLeave() {
    // console.log('注销事件传递')
    // this.event.unsubscribe('click_envnt')
  }


  ionViewWillEnter() {
    this.menu.enable(true)
    var bar = document.getElementsByClassName('tabbar').item(0);
    bar['style'].display = 'flex';
    if (this.title.indexOf('收件')!=-1&&this.frontPageIsUnseen) {
      this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit+this.offset, 0).then(res => {
        if (res.result && res.result.res_data) {
          this.email_list = res.result.res_data.email_list
        }
      })
    }
  }

  ionViewWillLeave() {
    this.menu.enable(false)
    var bar = document.getElementsByClassName('tabbar').item(0);
    bar['style'].display = 'none';
  }



  showMenu() {
    var bar = document.getElementsByClassName('tabbar').item(0);
    bar['style'].display = 'none';
  }

  get_folder_label() {
    this.emailService.get_email_label_folder(this.account_id, this.user_id).then(res => {
      if (res.result.res_data) {
        this.event.publish('label_folder', res.result.res_data)
      }
    })
  }

  get_email_list(account_id, email_type, state_type, data_id, limit, offset) {
    this.get_folder_label()
    return this.emailService.getEmailList(this.user_id, account_id, email_type, state_type, data_id, limit, offset)

  }

  doRefresh(event) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit, this.offset).then(res => {
      event.complete();
      if (res.result && res.result.res_data) {
        this.email_list = res.result.res_data.email_list
      }
    })
  }

  doInfinite(event) {
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset = this.offset + 20;
      this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit, this.offset).then(res => {
        let item_data = [];
        if (res.result.res_data) {
          item_data = res.result.res_data.email_list;
          if (item_data.length > 0) {
            this.isMoreData = true;
          }
          else {
            this.isMoreData = false;
          }
          for (let item of item_data) {
            this.email_list.push(item)
          }
        }
        else {
          this.isMoreData = false;
        }
        event.complete();
      })
    } else {
      event.complete();
    }
  }


  email_detail(id,rt_is_unseen) {
    this.frontPageIsUnseen = rt_is_unseen
    this.navCtrl.push('EmailDetailPage', { 'id': id })
  }


  showUnseenSelect() {
    let alert = this.alertCtrl.create({
      cssClass: 'title_alert',
      title: '收件箱'
    });
    let unseen = {
      type: 'radio',
      label: '未读',
      value: '未读',
      handler: (data) => {
        this.unseenChoose = data.value
        this.event.publish('click_envnt', this.account_id, 'state', 'unseen', '')
        alert.dismiss()
      }
    }
    let all = {
      type: 'radio',
      label: '全部',
      value: '全部',
      checked: true,
      handler: (data) => {
        this.unseenChoose = data.value
        this.event.publish('click_envnt', this.account_id, 'state', 'all_received', '')
        alert.dismiss()
      }
    }
    if (this.unseenChoose == '未读') {
      unseen['checked'] = true
      all['checked'] = false
    } else {
      all['checked'] = true
      unseen['checked'] = false
    }
    alert.addInput(unseen)
    alert.addInput(all)
    alert.present();
  }

  edit() {
    this.navCtrl.push('WriteEmailPage', {
      id: this.account_id,
      account_list: this.accounts_list,
      uid: this.user_id
    })
  }


}