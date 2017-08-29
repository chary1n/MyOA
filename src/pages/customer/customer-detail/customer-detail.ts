import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactListPage} from './../../work-bench/contact-list/contact-list'
/**
 * Generated class for the CustomerDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {
  items:any;
  biaoqian:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('items');
    let tag = this.items.tag.length > 0 ? this.items.tag[0] : "";

    this.biaoqian = tag;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  contact_detail(){
    this.navCtrl.push(ContactListPage,{
          contactList:this.items.contracts,
       });  
  }

}
