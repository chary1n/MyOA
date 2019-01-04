import { EmailService } from './../emailService';
import { HttpService } from './../../../providers/HttpService';
import { EmailSearchService } from './email-search-autoService';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the EmailSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email-search',
  templateUrl: 'email-search.html',
  providers: [EmailSearchService, EmailService],
})
export class EmailSearchPage {
  email_list;
  offset = 0;
  account_id;
  isMoreData = true;
  limit = 20;
  type;
  search_text;
  is_focus_input = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams, public emailSearchService: EmailSearchService
    , public emailService: EmailService) {
    this.account_id = this.navParams.get('account_id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailSearchPage');
  }


  itemMeSelected(event) {
    if (event.id == 1) {
      this.type = "mailSender";
      this.search_text = event.name.replace("搜 发件人包含：", "")
    }
    else if (event.id == 2) {
      this.type = 'mailReceiver'
      this.search_text = event.name.replace('搜 收件人包含：', '')
    }
    else if (event.id == 3) {
      this.type = 'mailsubject'
      this.search_text = event.name.replace('搜 标题包含：', '')
    }
    else if (event.id == 4) {
      this.type = 'mailbody'
      this.search_text = event.name.replace('搜 正文包含：', '')
    }
    this.email_list = []
    this.offset = 0;
    this.emailService.search_email(this.type, this.search_text, this.offset, this.account_id).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.email_list = res.result.res_data.email_list
      }
    })
  }

  search_by(event) {
    if(event.name){
      this.type = 'mailKeyword'
      this.search_text = event.name
      this.email_list = []
      this.offset = 0;
      this.emailService.search_email(this.type, this.search_text, this.offset, this.account_id).then(res => {
        if (res.result.res_data && res.result.res_code == 1) {
          this.email_list = res.result.res_data.email_list
        }
      })
    }
  }

  itemClearMeSelected(event) {
    this.email_list= []
    this.type = ''
    this.search_text = ''
  }

  // focus(){
  //   this.is_focus_input = true
  //   var idInput=$('.text-input');
  //   idInput.onkeyup=(event)=>{
  //     console.log(event)
  //     console.log(event.keyCode)
  //     if(event.keyCode==13){
  //       console.log('11112312')
  //     }
  //   }
  // }
  // blur(){
  //   this.is_focus_input =false
  // }

  goBack() {
    this.navCtrl.pop()
  }

  email_detail(index, id, rt_is_unseen) {
    this.navCtrl.push('EmailDetailPage', {
      'id': id,
      'uid': HttpService.user_id,
      'account_id': this.account_id,
    })
  }

  doRefresh(event) {
    this.isMoreData = true;
    this.limit = 20;
    this.offset = 0;
    this.emailService.search_email(this.type, this.search_text, this.offset, this.account_id).then(res => {
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
      this.emailService.search_email(this.type, this.search_text, this.offset, this.account_id).then(res => {
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
}
