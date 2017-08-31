import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactListPage} from './../../work-bench/contact-list/contact-list'

/**
 * Generated class for the XiansuoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-xiansuo-detail',
  templateUrl: 'xiansuo-detail.html',
})
export class XiansuoDetailPage {

  items:any;
  biaoqian:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('items');
    let tag = this.items.tags.length > 0 ? this.items.tags[0] : "";
    let level = '';
    let priority = '';
    if (this.items.level == 1)
    {
      level = " 1st";
    }
    else if (this.items.level == 2)
    {
      level = " 2nd";
    }
    else if (this.items.level == 3)
    {
      level = " 3rd";
    }
    if (this.items.priority)
    {
      priority = " 星级:" + this.items.priority;
    }
    this.biaoqian = tag + level + priority;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad XiansuoDetailPage');
  }

  contact_detail(){
    this.navCtrl.push(ContactListPage,{
          contactList:this.items.contracts,
       });  
  }

}
