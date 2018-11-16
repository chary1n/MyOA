import { Utils } from './../../../providers/Utils';
import { EmailService } from './../emailService';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
  providers: [EmailService]
})
export class SignPage {

  account_id;
  user_id;
  label_list = [];
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public emailService: EmailService) {
    this.account_id = this.navParams.get('account_id')
    this.user_id = this.navParams.get('user_id')
    this.frontPage = Utils.getViewController("EmailDetailPage", navCtrl)
    this.emailService.get_email_label_folder(this.account_id, this.user_id).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.label_list = res.result.res_data.label_list
        setTimeout(() => {
          this.label_list.forEach(element => {
            let node = document.getElementById('label_' + element.id);
            if (node) {
              node.setAttribute('style', 'background-color:' + element.color);
            }
          });
        }, 100);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
  }


  sign_email_label(id) {
    this.frontPage.data.signPageInfo = {
      'sign_id': id
    }
    this.navCtrl.popTo(this.frontPage)
  }


  goBack() {
    this.navCtrl.pop()
  }
}
