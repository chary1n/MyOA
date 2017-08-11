import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
/**
 * Generated class for the ContactListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {
  contactList : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contactList = navParams.get('contactList'); 
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  exchangeContact(name)
  {
    let name_str;
    if (name == 'Shipping address')
    {
      name_str = '送货地址';
    }
    else if (name == 'Contact')
    {
      name_str = '联系人';
    }
    else if (name == 'Other address')
    {
      name_str = '其他地址';
    }
    else
    {
      name_str = '开票地址';
    }
    return name_str;
  }
}
