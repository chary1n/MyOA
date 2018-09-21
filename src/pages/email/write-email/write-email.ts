import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, ActionSheetController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Component, ViewChild } from '@angular/core';
import { FileSaver } from '@ionic-native/file';
import { EmailService } from '../emailService';

/**
 * Generated class for the WriteEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-write-email',
  templateUrl: 'write-email.html',
  providers: [EmailService]
})
export class WriteEmailPage {

  isShow = false
  account_id;
  account_list;
  account_email;
  email_to;
  email_cc;
  email_bcc;
  subject;
  body;
  user_id;
  @ViewChild('input_email_to') input_email_to;
  constructor(public navCtrl: NavController,
    public emailService: EmailService,
    public alert: AlertController,
    public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.account_id = this.navParams.get('id')
    this.user_id = this.navParams.get('uid')
    this.account_list = this.navParams.get('account_list')
    for (let i = 0; i < this.account_list.length; i++) {
      if (this.account_list[i].id == this.account_id) {
        this.account_email = this.account_list[i].email
      }
    }

  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.input_email_to.setFocus()
      // this.setCaretPosition(this.textarea,1)
      // cordova.plugins.Keyboard.show();
    }, 300)
  }


  cancel() {
    if (this.email_to || this.email_cc || this.email_bcc || this.subject || this.body) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '',
        buttons: [
          {
            text: '保存草稿',
            handler: () => {
              this.save()
            }
          },
          {
            text: '删除草稿',
            handler: () => {
              this.navCtrl.pop()
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      this.navCtrl.pop()
    }
  }


  showEmailCC() {
    this.isShow = true
  }

  save() {
    this.send_mail(true)
  }

  testEmail(email) {
    //验证邮箱的正则
    var regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let testEmail = false
    if (email) {
      let lists = email.split(';')
      for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
          if (!regex.test(lists[i])) {
            testEmail = true
          }
        }
      }
    }
    return testEmail
  }

  send() {
    //验证邮箱的正则
    if (this.testEmail(this.email_to) || this.testEmail(this.email_bcc) || this.testEmail(this.email_cc)) {
      this.alert.create({
        title: '某些电子邮件地址无效',
        buttons: [{ text: '确定' },]
      }).present();
      return;
    }

    if (!this.email_to) {
      this.alert.create({
        title: '请输入收件人',
        buttons: [{ text: '确定' },]
      }).present();
      return;
    }
    if (!this.subject) {
      this.alert.create({
        title: '空主题',
        subTitle: '邮箱没有主题，您仍要发送吗?',
        buttons: [{ text: '取消' },
        {
          text: '发送',
          handler: () => {
            this.send_mail(false)
          }
        }
        ]
      }).present();
      return;
    }
    this.send_mail(false)
  }

  send_mail(is_draft) {
    let draft = ''
    if (is_draft) {
      draft = 'true'
    }
    this.emailService.send_mail(this.user_id, this.account_id, this.email_to,
      this.email_cc, this.email_bcc, this.subject, this.body, draft)
      .then(res => {
        console.log(res)
        if (res.result == '发送成功' || res.result == "保存成功") {
          this.alert.create({
            title: res.result,
            enableBackdropDismiss: false,
            buttons: [
              {
                text: '确定',
                handler: () => {
                  this.navCtrl.pop()
                }
              }
            ]
          }).present();

        }
      })

  }

}
