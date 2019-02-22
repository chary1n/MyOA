import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController, NavParams, NavController, LoadingController } from 'ionic-angular';


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
  email_list = [];
  isMoreData = true;
  account_id;
  email_type;
  state_type;
  data_id;
  title = '';
  unseenChoose;
  frontPageIsUnseen = false;
  accounts_list;
  isEdit = false;
  isChooseAll = true;
  movePageInfo: any = '';
  buttonFlag = false;
  buttonOpen = false;
  constructor(public menu: MenuController, public alertCtrl: AlertController, public navPrarams: NavParams,
    private loading: LoadingController,
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
    this.event.subscribe('closeMenu', () => {
      if (this.isEdit) {
        var tolbar = document.getElementsByClassName('tabbar').item(0);
        tolbar['style'].display = 'none';
      }
    })
  }


  ionViewDidLeave() {
    // console.log('注销事件传递')
    // this.event.unsubscribe('click_envnt')
  }
  

  ionViewWillEnter() {
    this.menu.enable(true, 'menu1')
    if (this.navPrarams.get('movePageInfo')) {
      this.movePageInfo = this.navPrarams.data.movePageInfo
      var ids = this.getSelectIds()
      this.emailService.move(ids, this.movePageInfo.state, this.movePageInfo.email_state).then(res => {
        if (res.result && res.result.res_code == 1) {
          this.toEdit()
          this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit + this.offset, 0).then(res => {
            if (res.result && res.result.res_data) {
              this.email_list = res.result.res_data.email_list
            }
          })
        }
      })
      this.navPrarams.data.movePageInfo = ''
    } else {
      var bar = document.getElementsByClassName('tabbar').item(0);
      bar['style'].display = 'flex';
      if ((this.title.indexOf('收件') != -1 && this.frontPageIsUnseen) || this.navPrarams.get('needRefresh')||
      this.title.indexOf('草稿箱')!=-1) {
        this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit + this.offset, 0).then(res => {
          if (res.result && res.result.res_data) {
            this.email_list = res.result.res_data.email_list
          }
        })
        this.navPrarams.data.needRefresh = false
      }
    }
    if (this.isEdit) {
      var tolbar = document.getElementsByClassName('tabbar').item(0);
      tolbar['style'].display = 'none';
    }
  }


  ionViewDidEnter(){
   console.log('进入了')
  }

  ionViewWillLeave() {
    this.menu.enable(false)
    var bar = document.getElementsByClassName('tabbar').item(0);
    bar['style'].display = 'none';
  }

  

  showMenu() {
    setTimeout(() => {
      var bar = document.getElementsByClassName('tabbar').item(0);
      bar['style'].display = 'none';
      var menu = this.menu.get('menu1')
      menu.enable(true)
      menu.toggle()
      
    }, 10);

  }

  get_folder_label() {
    this.emailService.get_email_label_folder(this.account_id, this.user_id).then(res => {
      if (res.result.res_data) {
        this.event.publish('label_folder', res.result.res_data)
      }
    })
  }

  get_email_list(account_id, email_type, state_type, data_id, limit, offset,isrefresh = false) {
    this.get_folder_label()
    return this.emailService.getEmailList(this.user_id, account_id, email_type, state_type, data_id, limit, offset,isrefresh)
  }

  doRefresh(event) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    let loading = this.loading.create({
      content: '加载中',
      enableBackdropDismiss: true
    });
    loading.present()
    this.emailService.refresh_email(this.user_id,this.account_id).then(res=>{
      this.get_folder_label()
      this.emailService.getEmailListNoLoading(this.user_id,this.account_id, this.email_type, this.state_type, this.data_id, this.limit, this.offset,false).then(res => {
        event.complete();
        loading.dismiss();
        if (res.result && res.result.res_data) {
          this.email_list = res.result.res_data.email_list
        }
      })
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


  email_detail(index, id, rt_is_unseen) {
    if (this.isEdit) {
      this.email_list[index].ischecked = !this.email_list[index].ischecked
      this.changeButtonState()
    } else {
      if (this.state_type == 'draft') {
        this.emailService.get_email_detail(id).then(res=>{
          this.navCtrl.push('WriteEmailPage', {
            'email_detail': res.result.res_data,
            'id': this.account_id,
            'uid': this.user_id,
            'account_list': this.accounts_list,
            'type': 'draft'
          })
        })
      } else {
        this.frontPageIsUnseen = rt_is_unseen
        this.navCtrl.push('EmailDetailPage', {
          'id': id,
          'uid': this.user_id,
          'account_id': this.account_id,
          'account_list': this.accounts_list,
        })
      }
    }
  }

  on_hold(i) {
    if (!this.isEdit) {
      this.toEdit()
      this.changeClick(i)
    }
  }



  showUnseenSelect() {
    if (this.title.indexOf('收件') != -1) {
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
  }

  toEdit() {
    if (this.email_list.length == 0) {
      return
    }
    this.isEdit = !this.isEdit
    var bar = document.getElementsByClassName('tabbar').item(0);
    if (this.isEdit) {
      bar['style'].display = 'none';
    } else {
      bar['style'].display = 'flex';
      this.chooseAllNo()
    }
  }

  changeClick(index) {
    this.email_list[index].ischecked = !this.email_list[index].ischecked
    this.changeButtonState()
  }

  changeButtonState() {
    this.buttonFlag = false
    this.buttonOpen = false
    for (let i = 0; i < this.email_list.length; i++) {
      if (this.email_list[i].ischecked == true) {
        if (!this.email_list[i].is_flag) {
          this.buttonFlag = true
        }
        if (this.email_list[i].rt_is_unseen) {
          this.buttonOpen = true
        }
      }
    }
  }


  chooseAll() {
    for (let i = 0; i < this.email_list.length; i++) {
      this.email_list[i].ischecked = true
    }
    this.isChooseAll = false
    this.changeButtonState()
  }

  chooseAllNo() {
    for (let i = 0; i < this.email_list.length; i++) {
      this.email_list[i].ischecked = false
    }
    this.isChooseAll = true
    this.changeButtonState()
  }

  edit() {
    this.navCtrl.push('WriteEmailPage', {
      id: this.account_id,
      account_list: this.accounts_list,
      uid: this.user_id
    })
  }

  getSelectIds() {
    var ids = []
    for (let i = 0; i < this.email_list.length; i++) {
      if (this.email_list[i].ischecked == true) {
        ids.push(this.email_list[i].id)
      }
    }
    return ids
  }

  flag(state) {
    var ids = this.getSelectIds()
    if (ids.length == 0) {
      return
    }
    this.emailService.flag(ids, state).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.toEdit()
        this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit + this.offset, 0).then(res => {
          if (res.result && res.result.res_data) {
            this.email_list = res.result.res_data.email_list
          }
        })
      }
    })
  }

  unseen(state) {
    var ids = this.getSelectIds()
    if (ids.length == 0) {
      return
    }
    this.emailService.unseen(ids, state).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.toEdit()
        this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit + this.offset, 0).then(res => {
          if (res.result && res.result.res_data) {
            this.email_list = res.result.res_data.email_list
          }
        })
      }
    })
  }

  move() {
    var ids = this.getSelectIds()
    if (ids.length == 0) {
      return
    }
    this.navCtrl.push('EmailMovePage', {
      'account_id': this.account_id,
      'user_id': this.user_id
    })
  }

  delete() {
    var ids = this.getSelectIds()
    if (ids.length == 0) {
      return
    }
    this.emailService.delete(ids).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.toEdit()
        this.get_email_list(this.account_id, this.email_type, this.state_type, this.data_id, this.limit + this.offset, 0).then(res => {
          if (res.result && res.result.res_data) {
            this.email_list = res.result.res_data.email_list
          }
        })
      }
    })
  }

  clickSearch(){
    this.navCtrl.push('EmailSearchPage',{
      'account_id':this.account_id
    })
  }

}